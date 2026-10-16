import { checkRateLimit, getClientIp } from "../../../lib/rateLimit.js";
import { escapeHtml } from "../../../lib/security.js";
import {
  parseBoundedJson,
  validateTextField,
  validateCorporateEmail,
  verifyDomainMx,
  validatePrivacyAcknowledgment,
  verifyTurnstileToken
} from "../../../lib/formValidation.js";
import { getEmailConfig, checkEmailConfiguration, buildEmailPayload, sendEmail } from "../../../lib/emailDelivery.js";

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: Max 5 submissions per 60 seconds per IP
    const rateCheck = checkRateLimit(clientIp, 'early-access', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded early-access limit.`);
      return Response.json(
        { ok: false, error: `Too many submissions. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.` },
        { 
          status: 429, 
          headers: { 
            'Retry-After': String(rateCheck.retryAfterSeconds),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
          } 
        }
      );
    }

    // Safely parse bounded JSON payload (64KB stream limit)
    const jsonResult = await parseBoundedJson(req, 64 * 1024);
    if (!jsonResult.ok) {
      return Response.json({ ok: false, error: jsonResult.error }, { status: jsonResult.status });
    }
    const body = jsonResult.body || {};

    const { 
      name, 
      companyName, 
      email, 
      phone, 
      architecture, 
      teamScale, 
      ecosystem, 
      securityLevel, 
      notes,
      privacyAccepted,
      turnstileToken
    } = body;

    // 1. Validate Required Text Fields and Bounds
    const nameCheck = validateTextField(name, "Applicant Name", 100, true);
    if (!nameCheck.valid) return Response.json({ ok: false, error: nameCheck.error }, { status: 400 });

    const companyCheck = validateTextField(companyName, "Company Name", 120, true);
    if (!companyCheck.valid) return Response.json({ ok: false, error: companyCheck.error }, { status: 400 });

    const phoneCheck = validateTextField(phone, "Phone Number", 40, false);
    if (!phoneCheck.valid) return Response.json({ ok: false, error: phoneCheck.error }, { status: 400 });

    const archCheck = validateTextField(architecture, "Target Architecture", 100, true);
    if (!archCheck.valid) return Response.json({ ok: false, error: archCheck.error }, { status: 400 });

    const scaleCheck = validateTextField(teamScale, "Practice Scale", 80, true);
    if (!scaleCheck.valid) return Response.json({ ok: false, error: scaleCheck.error }, { status: 400 });

    const ecoCheck = validateTextField(ecosystem, "Software Ecosystem", 120, true);
    if (!ecoCheck.valid) return Response.json({ ok: false, error: ecoCheck.error }, { status: 400 });

    const secCheck = validateTextField(securityLevel, "Security Level", 120, true);
    if (!secCheck.valid) return Response.json({ ok: false, error: secCheck.error }, { status: 400 });

    const notesCheck = validateTextField(notes, "Workflow Bottlenecks", 3000, false);
    if (!notesCheck.valid) return Response.json({ ok: false, error: notesCheck.error }, { status: 400 });

    // 2. Mandatory Explicit Privacy Acknowledgment
    const privacyCheck = validatePrivacyAcknowledgment(privacyAccepted);
    if (!privacyCheck.valid) {
      return Response.json({ ok: false, error: privacyCheck.error }, { status: 400 });
    }

    // 3. Anti-Bot Turnstile Verification
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp, "early-access");
    if (!turnstileCheck.ok) {
      return Response.json(
        { ok: false, code: turnstileCheck.code || "TURNSTILE_FAILED", error: turnstileCheck.error },
        { status: turnstileCheck.status }
      );
    }

    // 4. Corporate Email Eligibility
    const emailPolicy = validateCorporateEmail(email);
    if (!emailPolicy.valid) {
      return Response.json({ ok: false, error: emailPolicy.error }, { status: 400 });
    }

    // 5. Server-Side DNS/MX Capability Verification
    const isDev = process.env.NODE_ENV !== "production";
    const mxCheck = await verifyDomainMx(emailPolicy.domain, isDev);
    if (!mxCheck.valid) {
      return Response.json({ ok: false, error: mxCheck.error }, { status: mxCheck.status });
    }

    // Generate collision-resistant application receipt reference
    const timestampPart = Date.now().toString(36).toUpperCase();
    const entropyPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const applicationReference = `PYBIM-APP-${timestampPart}-${entropyPart}`;
    const queueReference = applicationReference; // maintain compatibility for UI ticket slot

    // 6. Check Outbound Delivery Configuration (Fail-Closed)
    const configCheck = checkEmailConfiguration();
    if (!configCheck.ok) {
      console.warn(`[FORM NOTICE] Outbound email service unconfigured. Early access registration from ${emailPolicy.domain} rejected fail-closed.`);
      return Response.json({ ok: false, error: configCheck.error }, { status: configCheck.statusCode });
    }

    // 7. Dispatch Emails via Configured Delivery Transport
    try {
      const safeName = escapeHtml(nameCheck.sanitized);
      const safeCompany = escapeHtml(companyCheck.sanitized);
      const safeEmail = escapeHtml(email.trim());
      const safePhone = escapeHtml(phoneCheck.sanitized || "Not specified");
      const safeArchitecture = escapeHtml(archCheck.sanitized);
      const safeTeamScale = escapeHtml(scaleCheck.sanitized);
      const safeEcosystem = escapeHtml(ecoCheck.sanitized);
      const safeSecurityLevel = escapeHtml(secCheck.sanitized);
      const safeNotes = escapeHtml(notesCheck.sanitized || "None provided");
      const safeTimestamp = escapeHtml(privacyCheck.timestamp);

      // A. Internal Notification to support@pybim.com (Primary Successful Outcome)
      const internalPayload = buildEmailPayload({
        type: "internal_notification",
        customerEmail: safeEmail,
        subject: `[Early Access Application] ${companyCheck.sanitized} (${applicationReference})`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
              <span style="font-size: 11px; font-family: monospace; color: #10b981; font-weight: bold; text-transform: uppercase;">// EARLY ACCESS APPLICATION RECEIPT</span>
              <h2 style="margin: 6px 0 0 0; color: #0f172a; font-size: 20px;">New Sovereign AI Early Access Application</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Receipt Reference: <strong>${applicationReference}</strong></p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0; width: 35%;"><strong>Applicant Name:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safeName}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Company:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safeCompany}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Corporate Email:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safeEmail}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Phone:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safePhone}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Target Architecture:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;">${safeArchitecture}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Practice Scale:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safeTeamScale}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Software Ecosystem:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${safeEcosystem}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Security Level:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #dc2626;">${safeSecurityLevel}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Consent Verified:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">Privacy Policy & Terms Accepted (${safeTimestamp})</td></tr>
            </table>

            <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px; line-height: 1.6;">
              <strong style="display: block; margin-bottom: 4px; color: #334155;">Workflow Bottlenecks & Notes:</strong>
              <div style="white-space: pre-wrap; color: #475569;">${safeNotes}</div>
            </div>
          </div>
        `
      });

      await sendEmail(internalPayload);

      // B. Auto-Responder Email to Applicant (separate delivery outcome)
      try {
        const autoPayload = buildEmailPayload({
          type: "applicant_autoresponder",
          customerEmail: safeEmail,
          subject: `Receipt: Your pyBIM Early Access Application (${applicationReference})`,
          text: `Thank you for your interest in pyBIM AI infrastructure. Application Reference: ${applicationReference}. Submissions are evaluated individually and do not guarantee acceptance.`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
              <div style="margin-bottom: 24px;">
                <span style="display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 6px; letter-spacing: 1px; text-transform: uppercase;">
                  // APPLICATION RECEIPT RECORDED
                </span>
                <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b; font-family: monospace;">Receipt Reference: ${applicationReference}</p>
              </div>

              <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                Application Receipt Confirmed
              </h2>

              <div style="font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
                <p style="margin: 0 0 16px 0;">
                  Thank you for your interest in deploying pyBIM sovereign AI infrastructure.
                </p>
                <p style="margin: 0 0 16px 0;">
                  We have successfully received your organization's technical evaluation application. Candidate submissions are reviewed individually based on architecture fit, security profile, and pilot cohort capacity.
                </p>
                <p style="margin: 0; font-size: 13px; color: #64748b;">
                  *Submission of this application constitutes a request for private access evaluation and does not guarantee participation or fixed timeline availability.
                </p>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #475569;">
                <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">The pyBIM Engineering Team</p>
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">pyBIM Algorithmic R&D Lab • Padua, Veneto, Italy</p>
              </div>
            </div>
          `
        });
        await sendEmail(autoPayload);
      } catch (autoErr) {
        console.error("Auto-responder dispatch error (non-fatal):", autoErr.message || autoErr);
      }

      return Response.json({ ok: true, applicationReference, queueReference });
    } catch (emailError) {
      console.error("Failed to dispatch early access notification:", emailError.message || emailError);
      return Response.json(
        { ok: false, error: "Failed to dispatch application. Please try again later." },
        { status: emailError.statusCode || 502 }
      );
    }
  } catch (error) {
    console.error("Early Access API Error:", error);
    return Response.json({ ok: false, error: "Failed to process application" }, { status: 500 });
  }
}

