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
    const rateCheck = checkRateLimit(clientIp, 'contact', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded contact form limit.`);
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
      service,
      teamScale,
      architecture,
      fileSize,
      message,
      privacyAccepted,
      disciplines,
      otherScope,
      turnstileToken
    } = body;

    // 1. Validate Required Text Fields and Bounds
    const nameCheck = validateTextField(name, "Full Name", 100, true);
    if (!nameCheck.valid) return Response.json({ ok: false, error: nameCheck.error }, { status: 400 });

    const companyCheck = validateTextField(companyName, "Company Name", 120, true);
    if (!companyCheck.valid) return Response.json({ ok: false, error: companyCheck.error }, { status: 400 });

    const phoneCheck = validateTextField(phone, "Phone Number", 40, true);
    if (!phoneCheck.valid) return Response.json({ ok: false, error: phoneCheck.error }, { status: 400 });

    const selectedService = service || architecture;
    const serviceCheck = validateTextField(selectedService, "Service", 80, true);
    if (!serviceCheck.valid) return Response.json({ ok: false, error: serviceCheck.error }, { status: 400 });

    const selectedTeamScale = teamScale || fileSize;
    const scaleCheck = validateTextField(selectedTeamScale, "Company Size", 80, true);
    if (!scaleCheck.valid) return Response.json({ ok: false, error: scaleCheck.error }, { status: 400 });

    const messageCheck = validateTextField(message, "Project Requirements", 5000, true);
    if (!messageCheck.valid) return Response.json({ ok: false, error: messageCheck.error }, { status: 400 });

    // 2. Conditional Field Validation
    let formattedDisciplines = "-";
    if (selectedService === "BIM Modeling & Coordination" || selectedService === "bim_modeling") {
      if (!Array.isArray(disciplines) || disciplines.length === 0) {
        return Response.json({ ok: false, error: "Please select at least one engineering discipline." }, { status: 400 });
      }
      formattedDisciplines = disciplines.map(d => String(d).trim()).slice(0, 10).join(", ");
    }

    let customScope = "-";
    if (selectedService === "Other / Custom Scope" || selectedService === "other") {
      const otherCheck = validateTextField(otherScope, "Custom Scope Specification", 500, true);
      if (!otherCheck.valid) return Response.json({ ok: false, error: otherCheck.error }, { status: 400 });
      customScope = otherCheck.sanitized;
    }

    // 3. Mandatory Explicit Privacy Acknowledgment
    const privacyCheck = validatePrivacyAcknowledgment(privacyAccepted);
    if (!privacyCheck.valid) {
      return Response.json({ ok: false, error: privacyCheck.error }, { status: 400 });
    }

    // 4. Anti-Bot Turnstile Verification
    const turnstileCheck = await verifyTurnstileToken(turnstileToken, clientIp, "contact");
    if (!turnstileCheck.ok) {
      return Response.json(
        { ok: false, code: turnstileCheck.code || "TURNSTILE_FAILED", error: turnstileCheck.error },
        { status: turnstileCheck.status }
      );
    }

    // 5. Corporate Email Eligibility
    const emailPolicy = validateCorporateEmail(email);
    if (!emailPolicy.valid) {
      return Response.json({ ok: false, error: emailPolicy.error }, { status: 400 });
    }

    // 6. Server-Side DNS/MX Capability Verification
    const isDev = process.env.NODE_ENV !== "production";
    const mxCheck = await verifyDomainMx(emailPolicy.domain, isDev);
    if (!mxCheck.valid) {
      return Response.json({ ok: false, error: mxCheck.error }, { status: mxCheck.status });
    }

    // 7. Check Outbound Delivery Configuration (Fail-Closed)
    const configCheck = checkEmailConfiguration();
    if (!configCheck.ok) {
      console.warn(`[FORM NOTICE] Outbound email service unconfigured. Inquiry from ${emailPolicy.domain} rejected fail-closed.`);
      return Response.json({ ok: false, error: configCheck.error }, { status: configCheck.statusCode });
    }

    // 8. Dispatch Email via Configured Delivery Transport
    try {
      const safeName = escapeHtml(nameCheck.sanitized);
      const safeCompany = escapeHtml(companyCheck.sanitized);
      const safeEmail = escapeHtml(email.trim());
      const safePhone = escapeHtml(phoneCheck.sanitized);
      const safeService = escapeHtml(serviceCheck.sanitized);
      const safeTeamScale = escapeHtml(scaleCheck.sanitized);
      const safeDisciplines = escapeHtml(formattedDisciplines);
      const safeCustomScope = escapeHtml(customScope);
      const safeMessage = escapeHtml(messageCheck.sanitized);
      const safeTimestamp = escapeHtml(privacyCheck.timestamp);

      const payload = buildEmailPayload({
        type: "internal_notification",
        customerEmail: safeEmail,
        subject: `New Technical Audit Request: ${companyCheck.sanitized}`,
        html: `
          <h2>New Technical Audit Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeCompany}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeEmail}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safePhone}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service of Interest:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeService}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Engineering Disciplines:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeDisciplines}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Custom Scope:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeCustomScope}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Team / Practice Scale:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${safeTeamScale}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Consent Verified:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">Privacy Policy & Terms Accepted (${safeTimestamp})</td></tr>
          </table>
          <p><strong>Message / Project Description:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 4px;">${safeMessage}</p>
        `
      });

      await sendEmail(payload);
      return Response.json({ ok: true });
    } catch (emailError) {
      console.error("Failed to dispatch email:", emailError.message || emailError);
      return Response.json(
        { ok: false, error: "Failed to dispatch email. Please try again later." },
        { status: emailError.statusCode || 502 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ ok: false, error: "Failed to process request" }, { status: 500 });
  }
}
