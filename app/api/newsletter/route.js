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
    const { email } = body;

    if (!email) {
      return Response.json({ ok: false, error: "Missing email" }, { status: 400 });
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

    // (Database saving removed for Phase 1 since DB is disabled)
    // For now, we just pretend it was successful so the UI shows a success message.

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return Response.json({ ok: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
