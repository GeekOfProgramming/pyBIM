import { checkRateLimit, getClientIp } from "../../../../lib/rateLimit.js";
import {
  parseBoundedJson,
  validateTextField,
  validateCorporateEmail,
  verifyDomainMx,
  verifyTurnstileToken,
  validatePrivacyAcknowledgment,
} from "../../../../lib/formValidation.js";
import {
  validateQuickEstimate,
  validateAdvancedAssessment,
  calculateRoiPreview,
  ROI_SCHEMA_VERSION,
} from "../../../../lib/roi/roiSchema.js";

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

    // 10. Generate Non-Persistent Random Verification Identifier (Stateless)
    let randomToken;
    try {
      const { randomUUID } = await import("node:crypto");
      randomToken = randomUUID().substring(0, 8).toUpperCase();
    } catch {
      randomToken = Date.now().toString(36).toUpperCase();
    }
    const referenceId = `ROI-SESS-${new Date().getFullYear()}-${randomToken}`;

    return Response.json({
      ok: true,
      eligible: true,
      schemaVersion: ROI_SCHEMA_VERSION,
      referenceId,
      verifiedAt: new Date().toISOString(),
      clientSummary: {
        name: nameCheck.sanitized,
        companyName: companyCheck.sanitized,
        domain: emailCheck.domain,
        isInternal: emailCheck.isInternal || false,
      },
      preview,
      downloadContract: {
        status: "eligible_for_browser_export",
        targetEngine: "browser_exceljs",
        targetLocale: "en",
        disclaimer: "Stateless verification receipt for browser-side export guidance. Submissions are NOT durably stored or emailed. Client-side download gating does not constitute an access-controlled security barrier."
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
