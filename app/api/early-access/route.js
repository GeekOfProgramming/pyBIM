import nodemailer from "nodemailer";
import dns from "dns/promises";

const FREE_EMAIL_PROVIDERS = [
  "gmail.com", "yahoo.com", "yahoo.it", "hotmail.com", "hotmail.it", 
  "outlook.com", "outlook.it", "live.com", "live.it", "icloud.com", 
  "msn.com", "aol.com", "libero.it", "virgilio.it", "alice.it", "tin.it",
  "fastwebnet.it", "tiscali.it", "ymail.com", "mail.com", "gmx.com", "proton.me", "protonmail.com"
];

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      name, 
      companyName, 
      email, 
      phone, 
      architecture, 
      teamScale, 
      ecosystem, 
      securityLevel, 
      notes 
    } = body;

    if (!name || !companyName || !email || !architecture || !teamScale || !ecosystem || !securityLevel) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Extract domain from email
    const emailParts = email.toLowerCase().trim().split("@");
    if (emailParts.length !== 2) {
      return Response.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }
    const domain = emailParts[1];

    const isDev = process.env.NODE_ENV !== "production";
    const isPybimInternal = domain.includes("pybim");

    // Check if free email provider
    if (!isDev && !isPybimInternal && FREE_EMAIL_PROVIDERS.includes(domain)) {
      return Response.json(
        { ok: false, error: "Priority Queue registration is exclusively available to verified corporate email domains." },
        { status: 400 }
      );
    }

    // MX Record Lookup
    if (!isDev && !isPybimInternal) {
      try {
        const records = await dns.resolveMx(domain);
        if (!records || records.length === 0) {
          throw new Error("No MX records found");
        }
      } catch (mxError) {
        return Response.json(
          { ok: false, error: "Priority Queue registration is exclusively available to verified corporate email domains." },
          { status: 400 }
        );
      }
    }

    // Generate unique queue ticket reference
    const randomTicketNum = Math.floor(1000 + Math.random() * 9000);
    const queueReference = `PYBIM-WAITLIST-${randomTicketNum}`;

    // Configure Mail Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // 1. Send Internal Notification Email to pyBIM Engineering / Admin
    try {
      await transporter.sendMail({
        from: `pyBIM Priority Queue <${process.env.SMTP_FROM}>`,
        to: process.env.CONTACT_TO,
        subject: `[Early Access Application] ${companyName} (${queueReference})`,
        replyTo: email,
        html: `
          <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
            <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
              <span style="font-size: 11px; font-family: monospace; color: #10b981; font-weight: bold; text-transform: uppercase;">// PRIORITY QUEUE DISPATCH</span>
              <h2 style="margin: 6px 0 0 0; color: #0f172a; font-size: 20px;">New Sovereign AI Early Access Request</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">Reference ID: <strong>${queueReference}</strong></p>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0; width: 35%;"><strong>Applicant Name:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${name}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Company:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${companyName}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Corporate Email:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Phone:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${phone || "Not specified"}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Target Architecture:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0; color: #2563eb; font-weight: bold;">${architecture}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Practice Scale:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${teamScale}</td></tr>
              <tr style="background: #f8fafc;"><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Software Ecosystem:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0;">${ecosystem}</td></tr>
              <tr><td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Security Level:</strong></td><td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #dc2626;">${securityLevel}</td></tr>
            </table>

            <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px; line-height: 1.6;">
              <strong style="display: block; margin-bottom: 4px; color: #334155;">Workflow Bottlenecks & Notes:</strong>
              <div style="white-space: pre-wrap; color: #475569;">${notes || "None provided"}</div>
            </div>
          </div>
        `
      });
    } catch (adminMailErr) {
      console.error("Failed to dispatch internal notification:", adminMailErr);
    }

    // 2. Send Auto-Responder Email directly to Applicant (The Prestige Strategy)
    try {
      await transporter.sendMail({
        from: `pyBIM Engineering Team <${process.env.SMTP_FROM}>`,
        to: email,
        subject: `Your Request for pyBIM Early Access`,
        replyTo: process.env.CONTACT_TO,
        text: `Thank you for your interest in deploying the pyBIM AI infrastructure.

We have received your request and added your firm to our priority waitlist. At pyBIM, we strictly limit our onboarding cohorts to ensure that every Edge AI deployment and Cloud integration meets our rigorous standards for speed, security, and precision.

Currently, our deployment capacity is fully allocated. Our engineering team will review your application and contact you directly as soon as a slot becomes available for your organization.

In the meantime, if you have immediate project deadlines, our internal team is fully available to execute your BIM modeling and ISO 19650 audits as a service.

Best regards,
The pyBIM Engineering Team`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
            <div style="margin-bottom: 24px;">
              <span style="display: inline-block; font-family: monospace; font-size: 11px; font-weight: 700; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; rounded: 6px; letter-spacing: 1px; text-transform: uppercase;">
                // APPLICATION RECEIPT CONFIRMED
              </span>
              <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b; font-family: monospace;">Reference: ${queueReference}</p>
            </div>

            <h2 style="font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 16px 0; letter-spacing: -0.5px;">
              Your Request for pyBIM Early Access
            </h2>

            <div style="font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
              <p style="margin: 0 0 16px 0;">
                Thank you for your interest in deploying the pyBIM AI infrastructure.
              </p>
              
              <p style="margin: 0 0 16px 0;">
                We have received your request and added your firm to our priority waitlist. At pyBIM, we strictly limit our onboarding cohorts to ensure that every Edge AI deployment and Cloud integration meets our rigorous standards for speed, security, and precision.
              </p>
              
              <p style="margin: 0 0 16px 0;">
                Currently, our deployment capacity is fully allocated. Our engineering team will review your application and contact you directly as soon as a slot becomes available for your organization.
              </p>
              
              <div style="background: #f8fafc; border-left: 3px solid #2563eb; padding: 14px 18px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 14px; color: #1e293b; font-weight: 500;">
                  In the meantime, if you have immediate project deadlines, our internal team is fully available to execute your BIM modeling and ISO 19650 audits as a service.
                </p>
              </div>
            </div>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 14px; color: #475569;">
              <p style="margin: 0 0 4px 0; font-weight: 700; color: #0f172a;">The pyBIM Engineering Team</p>
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">pyBIM Algorithmic R&D Lab • Padua, Veneto, Italy</p>
            </div>
          </div>
        `
      });
    } catch (applicantMailErr) {
      console.error("Failed to send auto-responder email to applicant:", applicantMailErr);
    }

    return Response.json({ ok: true, queueReference });
  } catch (error) {
    console.error("Early Access API Error:", error);
    return Response.json({ ok: false, error: "Failed to process application" }, { status: 500 });
  }
}
