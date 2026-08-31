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
    const { name, companyName, email, phone, architecture, fileSize, message } = body;

    if (!name || !companyName || !email || !architecture || !fileSize || !message) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // Extract domain from email
    const emailParts = email.toLowerCase().split("@");
    if (emailParts.length !== 2) {
      return Response.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }
    const domain = emailParts[1];

    // Check if free email provider
    if (FREE_EMAIL_PROVIDERS.includes(domain)) {
      return Response.json(
        { ok: false, error: "ثبت درخواست انحصارا از طریق آدرس ایمیل شرکتی معتبر امکانپذیر است." },
        { status: 400 }
      );
    }

    // MX Record Lookup
    try {
      const records = await dns.resolveMx(domain);
      if (!records || records.length === 0) {
        throw new Error("No MX records found");
      }
    } catch (mxError) {
      return Response.json(
        { ok: false, error: "ثبت درخواست انحصارا از طریق آدرس ایمیل شرکتی معتبر امکانپذیر است." },
        { status: 400 }
      );
    }

    // Send Email
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `pyBIM Website <${process.env.SMTP_FROM}>`,
        to: process.env.CONTACT_TO,
        subject: `New Technical Audit Request: ${companyName}`,
        replyTo: email,
        html: `
          <h2>New Technical Audit Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${companyName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone || "-"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Requested Architecture:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${architecture}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Revit File Size:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fileSize}</td></tr>
          </table>
          <p><strong>Message / Project Description:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 4px;">${message}</p>
        `
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ ok: false, error: "Failed to save message" }, { status: 500 });
  }
}
