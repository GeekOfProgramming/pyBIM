import dns from "dns/promises";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail } from "@/lib/security";

const FREE_EMAIL_PROVIDERS = [
  "gmail.com", "yahoo.com", "yahoo.it", "hotmail.com", "hotmail.it", 
  "outlook.com", "outlook.it", "live.com", "live.it", "icloud.com", 
  "msn.com", "aol.com", "libero.it", "virgilio.it", "alice.it", "tin.it",
  "fastwebnet.it", "tiscali.it", "ymail.com", "mail.com", "gmx.com", "proton.me", "protonmail.com"
];

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: Max 5 subscription requests per 60 seconds per IP
    const rateCheck = checkRateLimit(clientIp, 'newsletter', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded newsletter limit.`);
      return Response.json(
        { ok: false, error: `Too many subscription attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.` },
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

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ ok: false, error: "Missing email" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Invalid email format." }, { status: 400 });
    }

    // Extract domain from email
    const emailParts = email.toLowerCase().trim().split("@");
    const domain = emailParts[1];

    // Check if free email provider
    if (FREE_EMAIL_PROVIDERS.includes(domain)) {
      return Response.json(
        { ok: false, error: "A valid corporate email address is required. Public email providers are not permitted." },
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
        { ok: false, error: "A valid corporate email address is required. Public email providers are not permitted." },
        { status: 400 }
      );
    }

    // Fail-closed staging check: storage is disabled until managed database is attached
    if (process.env.NEWSLETTER_ENABLED !== "true") {
      console.warn("[STAGING NOTICE] Newsletter subscriptions are disabled on staging.");
      return Response.json(
        { ok: false, error: "Newsletter subscription service is disabled on this staging environment." },
        { status: 503 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Newsletter API Error:", error);
    return Response.json({ ok: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
