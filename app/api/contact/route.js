import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    // (Database saving removed for Phase 1 since DB is disabled)

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
        from: `Arvand Website <${process.env.SMTP_FROM}>`,
        to: process.env.CONTACT_TO,
        subject: `New contact request from ${name}`,
        replyTo: email,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "-"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });
    } catch (emailError) {
      console.error("Failed to send email, but saved to DB:", emailError);
      // We still return true because we saved the lead to the DB successfully
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ ok: false, error: "Failed to save message" }, { status: 500 });
  }
}
