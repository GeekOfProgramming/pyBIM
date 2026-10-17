import { checkRateLimit, getClientIp } from "../../../../lib/rateLimit.js";
import {
  parseBoundedJson,
  validateTextField,
  validateCorporateEmail,
  verifyDomainMx,
  verifyTurnstileToken,
  validatePrivacyAcknowledgment,
  sanitizeHeader,
} from "../../../../lib/formValidation.js";
import {
  validateQuickEstimate,
  validateAdvancedAssessment,
  calculateRoiPreview,
  ROI_SCHEMA_VERSION,
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  HUMAN_VERIFICATION_RATE,
} from "../../../../lib/roi/roiSchema.js";
import {
  checkEmailConfiguration,
  buildEmailPayload,
  sendEmail,
} from "../../../../lib/emailDelivery.js";
import { escapeHtml } from "../../../../lib/security.js";

/**
 * POST /api/roi-matrix/eligibility
 *
 * Lightweight, secure corporate eligibility verification for the pyBIM ROI Matrix.
 * Validates:
 * 1. IP rate limiting (5 requests / 60 seconds)
 * 2. Payload size bounds (32KB max)
 * 3. Cloudflare Turnstile token validation
 * 4. Corporate domain policy (rejects public consumer and disposable providers)
 * 5. DNS MX mail-receiving records verification
 * 6. Explicit privacy acknowledgment
 * 7. Typed, versioned ROI benchmark calculation parameters
 *
 * NOTE: Server-side XLSX generation in Cloudflare Workers is avoided.
 * The browser-side lazy-loaded ExcelJS engine (ROI-02) uses this verified receipt.
 */
export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // 1. IP Rate Limiting
    const rateCheck = checkRateLimit(clientIp, "roi-eligibility", 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT] IP ${clientIp} exceeded ROI eligibility rate limit.`);
      return Response.json(
        {
          ok: false,
          error: `Too many eligibility verification requests. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateCheck.retryAfterSeconds),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }

    // 2. Parse and bound request body
    const parseResult = await parseBoundedJson(req, 32 * 1024);
    if (!parseResult.ok) {
      return Response.json(
        { ok: false, error: parseResult.error || "Malformed request payload." },
        { status: parseResult.status || 400 }
      );
    }

    const body = parseResult.body || {};
    const {
      name,
      companyName,
      email,
      privacyAccepted,
      turnstileToken,
      quickEstimate = {},
      useAdvanced = false,
      advancedAssessment = {},
    } = body;

    // 3. Validate Turnstile token
    if (!turnstileToken || typeof turnstileToken !== "string" || !turnstileToken.trim()) {
      return Response.json(
        {
          ok: false,
          code: "TURNSTILE_TOKEN_REQUIRED",
          error: "Human security verification required. Please complete the security check.",
        },
        { status: 403 }
      );
    }

    const isDev = process.env.NODE_ENV !== "production";
    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      clientIp,
      "roi_matrix"
    );
    if (!turnstileResult.ok) {
      return Response.json(
        {
          ok: false,
          code: turnstileResult.code || "TURNSTILE_VERIFICATION_FAILED",
          error: turnstileResult.error || "Human security verification failed. Please refresh the page and try again."
        },
        { status: turnstileResult.status || 403 }
      );
    }

    // 4. Validate Business Identity Fields
    const nameCheck = validateTextField(name, "Full Name", 120, true);
    if (!nameCheck.valid) {
      return Response.json({ ok: false, error: nameCheck.error }, { status: 400 });
    }

    const companyCheck = validateTextField(companyName, "Company Name", 120, true);
    if (!companyCheck.valid) {
      return Response.json({ ok: false, error: companyCheck.error }, { status: 400 });
    }

    // 5. Corporate Email Policy
    const emailCheck = validateCorporateEmail(email);
    if (!emailCheck.valid) {
      return Response.json({ ok: false, error: emailCheck.error }, { status: 400 });
    }

    // 6. DNS MX Verification
    const mxCheck = await verifyDomainMx(emailCheck.domain, isDev);
    if (!mxCheck.valid) {
      return Response.json(
        { ok: false, error: mxCheck.error },
        { status: mxCheck.status || 400 }
      );
    }

    // 7. Privacy Policy Acknowledgment
    const privacyCheck = validatePrivacyAcknowledgment(privacyAccepted);
    if (!privacyCheck.valid) {
      return Response.json({ ok: false, error: privacyCheck.error }, { status: 400 });
    }

    // 8. Validate ROI Calculation Schema Inputs
    const quickEstimateResult = validateQuickEstimate(quickEstimate);
    if (!quickEstimateResult.valid) {
      return Response.json(
        {
          ok: false,
          error: "Invalid Quick Estimate parameters.",
          details: quickEstimateResult.errors
        },
        { status: 400 }
      );
    }

    let sanitizedAdvanced = null;
    if (useAdvanced) {
      const advancedResult = validateAdvancedAssessment(advancedAssessment);
      if (!advancedResult.valid) {
        return Response.json(
          {
            ok: false,
            error: "Invalid Advanced Workflow Assessment parameters.",
            details: advancedResult.errors
          },
          { status: 400 }
        );
      }
      sanitizedAdvanced = advancedResult.sanitized;
    }

    // 9. Calculate Verified Preview
    const preview = calculateRoiPreview({
      quickEstimate: quickEstimateResult.sanitized,
      useAdvanced,
      advancedAssessment: sanitizedAdvanced
    });

    // 10. Generate Stable Export-Attempt Identifier & Verification Reference
    // Reused across legitimate retries of the unchanged request to ensure consistent Reference ID and idempotent notification delivery
    let attemptHash;
    try {
      const { createHash } = await import("node:crypto");
      const attemptSignature = JSON.stringify({
        email: emailCheck.sanitized,
        name: nameCheck.sanitized,
        company: companyCheck.sanitized,
        quick: quickEstimateResult.sanitized,
        useAdvanced: Boolean(useAdvanced),
        advanced: useAdvanced && sanitizedAdvanced ? sanitizedAdvanced : null,
      });
      attemptHash = createHash("sha256").update(attemptSignature).digest("hex").substring(0, 8).toUpperCase();
    } catch {
      attemptHash = Math.abs(
        (emailCheck.sanitized + nameCheck.sanitized).split("").reduce((acc, c) => ((acc << 5) - acc + c.charCodeAt(0)) | 0, 0)
      ).toString(36).substring(0, 8).toUpperCase();
    }

    const referenceId = body.referenceId && typeof body.referenceId === "string" && /^ROI-SESS-\d{4}-[A-Z0-9]{6,16}$/.test(body.referenceId.trim())
      ? body.referenceId.trim()
      : `ROI-SESS-${new Date().getFullYear()}-${attemptHash}`;
    const timestamp = body.attemptTimestamp && typeof body.attemptTimestamp === "string" && !isNaN(Date.parse(body.attemptTimestamp))
      ? new Date(body.attemptTimestamp).toISOString()
      : new Date().toISOString();

    // 11. Support Lead Notification via Resend (support@pybim.com)
    // Every legitimate export initiation must notify support@pybim.com
    const emailConfigCheck = checkEmailConfiguration();
    let notificationDispatched = false;

    if (process.env.NODE_ENV === "production" && !emailConfigCheck.ok) {
      console.error("[ROI ELIGIBILITY ERROR] Outbound email service unconfigured in production. Failing closed.");
      return Response.json(
        { ok: false, error: "Outbound notification service is not configured. Export cannot proceed." },
        { status: 503 }
      );
    }

    if (emailConfigCheck.ok) {
      const safeName = escapeHtml(nameCheck.sanitized);
      const safeCompany = escapeHtml(companyCheck.sanitized);
      const safeEmail = escapeHtml(emailCheck.sanitized);
      const safeRateType = quickEstimateResult.sanitized.rateType === "internal_labor"
        ? "Internal Loaded Labor Cost"
        : "Illustrative Consulting Rate";
      const safeRateOrigin = quickEstimateResult.sanitized.isRateCustom
        ? "Customer-Supplied Custom Rate"
        : "Default Illustrative Baseline (€85/h)";
      const safeEffectiveRate = quickEstimateResult.sanitized.hourlyRate;
      const safeModelers = quickEstimateResult.sanitized.modelerCount;
      const safeWeeks = quickEstimateResult.sanitized.workingWeeks;

      const stableIdempotencyKey = body.idempotencyKey
        ? sanitizeHeader(String(body.idempotencyKey).trim())
        : `roi-export-${emailCheck.domain}-${attemptHash}`;

      const textBody = `
=== PYBIM ROI MATRIX — EXPORT INITIATED ===
Event: EXPORT_INITIATED
Timestamp (UTC): ${timestamp}
Reference ID: ${referenceId}

CLIENT INFORMATION:
- Name: ${nameCheck.sanitized}
- Company: ${companyCheck.sanitized}
- Corporate Email: ${emailCheck.sanitized}
- Corporate Domain: ${emailCheck.domain}

MODEL OPERATIONAL INPUTS:
- Rate Type: ${safeRateType}
- Effective Hourly Rate: €${safeEffectiveRate}/h
- Rate Origin: ${safeRateOrigin}
- BIM Professionals (Team Size): ${safeModelers}
- Effective Working Weeks / Year: ${safeWeeks}
- Autodesk Weekly Benchmark: ${AUTODESK_REFERENCE_HOURS_PER_WEEK} hrs/week/person (Fixed)
- Human Verification Allowance: ${HUMAN_VERIFICATION_RATE * 100}% (0.10, Fixed)

FIVE AI ADOPTION SCENARIO ESTIMATES:
- 20% Adoption: ${preview.scenarios.scenario_20.annualRecoveredHours} hrs/yr | €${preview.scenarios.scenario_20.annualIllustrativeValue.toLocaleString()}
- 40% Adoption: ${preview.scenarios.scenario_40.annualRecoveredHours} hrs/yr | €${preview.scenarios.scenario_40.annualIllustrativeValue.toLocaleString()}
- 60% Adoption: ${preview.scenarios.scenario_60.annualRecoveredHours} hrs/yr | €${preview.scenarios.scenario_60.annualIllustrativeValue.toLocaleString()}
- 80% Adoption: ${preview.scenarios.scenario_80.annualRecoveredHours} hrs/yr | €${preview.scenarios.scenario_80.annualIllustrativeValue.toLocaleString()}
- 100% Adoption: ${preview.scenarios.scenario_100.annualRecoveredHours} hrs/yr | €${preview.scenarios.scenario_100.annualIllustrativeValue.toLocaleString()}
${useAdvanced && sanitizedAdvanced ? `
DIAGNOSTIC WORKFLOW BREAKDOWN:
- Information Search: ${sanitizedAdvanced.searchHours} hrs/wk
- Manual Data Entry: ${sanitizedAdvanced.manualDataEntryHours} hrs/wk
- Discipline BIM Workflows: ${sanitizedAdvanced.disciplineWorkflowsHours} hrs/wk
- Protected Engineering Judgment: ${sanitizedAdvanced.nonAutomatableJudgmentHours} hrs/wk
- Repetitive Total: ${sanitizedAdvanced.repetitiveWeeklyHours} hrs/wk
- Total Assessed: ${sanitizedAdvanced.totalAssessedHours} hrs/wk` : ""}

Notice: Browser download initiated by client. Does not guarantee file saved to local disk.
`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.5;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">pyBIM ROI Matrix — Lead Export Initiated</h2>
          <p><strong>Status:</strong> <span style="display: inline-block; padding: 2px 8px; background: #dbeafe; color: #1e40af; border-radius: 4px; font-weight: bold;">EXPORT_INITIATED</span></p>
          <p><strong>Timestamp (UTC):</strong> ${timestamp}<br><strong>Session Reference:</strong> <code>${referenceId}</code></p>

          <h3 style="color: #1e3a8a; margin-top: 20px;">Client Information</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Name:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeName}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Company:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeCompany}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Corporate Email:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeEmail}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Domain:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${escapeHtml(emailCheck.domain)}</td></tr>
          </table>

          <h3 style="color: #1e3a8a; margin-top: 20px;">Operational Model Parameters</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Rate Type:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeRateType}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Effective Rate:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${safeEffectiveRate}/h (${safeRateOrigin})</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">BIM Professionals:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeModelers}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Working Weeks / Year:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${safeWeeks}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Autodesk Benchmark:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">13 hrs/wk/person (Fixed)</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0; font-weight: bold;">Verification Allowance:</td><td style="padding: 6px; border: 1px solid #e2e8f0;">10% Retained (Fixed)</td></tr>
          </table>

          <h3 style="color: #1e3a8a; margin-top: 20px;">Five AI Adoption Scenario Estimates</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
            <tr style="background: #f1f5f9;">
              <th style="padding: 6px; border: 1px solid #e2e8f0;">Scenario</th>
              <th style="padding: 6px; border: 1px solid #e2e8f0;">Annual Team Hours</th>
              <th style="padding: 6px; border: 1px solid #e2e8f0;">Illustrative Capacity Value</th>
            </tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0;">20% Adoption</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${preview.scenarios.scenario_20.annualRecoveredHours} hrs/yr</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${preview.scenarios.scenario_20.annualIllustrativeValue.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0;">40% Adoption</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${preview.scenarios.scenario_40.annualRecoveredHours} hrs/yr</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${preview.scenarios.scenario_40.annualIllustrativeValue.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0;">60% Adoption</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${preview.scenarios.scenario_60.annualRecoveredHours} hrs/yr</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${preview.scenarios.scenario_60.annualIllustrativeValue.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0;">80% Adoption</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${preview.scenarios.scenario_80.annualRecoveredHours} hrs/yr</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${preview.scenarios.scenario_80.annualIllustrativeValue.toLocaleString()}</td></tr>
            <tr><td style="padding: 6px; border: 1px solid #e2e8f0;">100% Adoption</td><td style="padding: 6px; border: 1px solid #e2e8f0;">${preview.scenarios.scenario_100.annualRecoveredHours} hrs/yr</td><td style="padding: 6px; border: 1px solid #e2e8f0;">&euro;${preview.scenarios.scenario_100.annualIllustrativeValue.toLocaleString()}</td></tr>
          </table>

          <p style="font-size: 11px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
            This email was sent via pyBIM Resend server integration. Browser download triggered client-side; delivery does not verify local filesystem save.
          </p>
        </div>
      `;

      try {
        const emailPayload = buildEmailPayload({
          type: "internal_notification",
          customerEmail: emailCheck.sanitized,
          subject: `[pyBIM ROI Matrix Export] ${companyCheck.sanitized} - ${nameCheck.sanitized} (${referenceId})`,
          html: htmlBody,
          text: textBody,
          idempotencyKey: stableIdempotencyKey
        });

        await sendEmail(emailPayload, { idempotencyKey: stableIdempotencyKey });
        notificationDispatched = true;
      } catch (dispatchErr) {
        console.error("[ROI NOTIFICATION ERROR]:", dispatchErr);
        return Response.json(
          { ok: false, error: "Failed to dispatch lead notification to support. Please try again." },
          { status: dispatchErr.statusCode || 502 }
        );
      }
    } else {
      console.warn("[ROI NOTICE] Outbound email service unconfigured in development. Proceeding with export.");
    }

    return Response.json({
      ok: true,
      eligible: true,
      schemaVersion: ROI_SCHEMA_VERSION,
      referenceId,
      verifiedAt: timestamp,
      notificationDispatched,
      clientSummary: {
        name: nameCheck.sanitized,
        companyName: companyCheck.sanitized,
        domain: emailCheck.domain,
        isInternal: emailCheck.isInternal || false,
      },
      preview,
      sanitizedInputs: {
        modelerCount: quickEstimateResult.sanitized.modelerCount,
        hourlyRate: quickEstimateResult.sanitized.hourlyRate,
        isRateCustom: quickEstimateResult.sanitized.isRateCustom,
        rateType: quickEstimateResult.sanitized.rateType,
        workingWeeks: quickEstimateResult.sanitized.workingWeeks,
        searchHours: quickEstimateResult.sanitized.searchHours,
        useAdvanced,
        advancedAssessment: sanitizedAdvanced
      },
      downloadContract: {
        status: "eligible_for_browser_export",
        targetEngine: "browser_exceljs",
        targetLocale: "en",
        worksheets: [
          "Executive Summary",
          "Workflow Inputs",
          "AI Adoption Scenarios",
          "Assumptions & Sources"
        ],
        workbookStructure: {
          worksheets: [
            "Executive Summary",
            "Workflow Inputs",
            "AI Adoption Scenarios",
            "Assumptions & Sources"
          ],
          editableCells: ["modelerCount", "hourlyRate", "workingWeeks"],
          protectedCells: [
            "AUTODESK_REFERENCE_HOURS_PER_WEEK",
            "AI_ADOPTION_SCENARIOS",
            "HUMAN_VERIFICATION_RATE",
            "formulas",
            "outputs"
          ]
        },
        supportNotification: {
          recipient: "support@pybim.com",
          eventStatus: "EXPORT_INITIATED",
          dispatched: notificationDispatched
        },
        disclaimer: "Stateless verification receipt for browser-side export guidance. Submissions are not durably stored in a database or CRM. On export initiation, lead parameters are transmitted to pyBIM Support (support@pybim.com) via transactional email. Client-side download gating does not constitute an access-controlled security barrier."
      }
    });
  } catch (error) {
    console.error("[ROI ELIGIBILITY ERROR]:", error);
    return Response.json(
      { ok: false, error: "An unexpected error occurred during eligibility verification." },
      { status: 500 }
    );
  }
}
