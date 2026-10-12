import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail } from "@/lib/security";

export async function POST(req) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting: Max 5 applications per 60 seconds per IP
    const rateCheck = checkRateLimit(clientIp, 'careers', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded careers application limit.`);
      return NextResponse.json(
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

    const body = await req.json();
    const { name, email, githubUrl } = body;

    // Basic Validation
    if (!name || !email || !githubUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, email, githubUrl)." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Fail-closed staging check: Application intake is disabled until HR email/DB integration is attached
    if (process.env.CAREERS_INTAKE_ENABLED !== "true") {
      console.warn(`[STAGING NOTICE] Careers intake is disabled on staging. Submission from ${email} rejected.`);
      return NextResponse.json(
        { ok: false, error: "Spontaneous applications intake is disabled on this staging environment." },
        { status: 503 }
      );
    }

    // Return success when intake service is explicitly enabled
    return NextResponse.json({ ok: true, message: "Application routed successfully." }, { status: 200 });

  } catch (error) {
    console.error("[CAREERS API ERROR]", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
