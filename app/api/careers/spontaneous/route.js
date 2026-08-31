import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, githubUrl } = body;

    // Basic Validation
    if (!name || !email || !githubUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, email, githubUrl)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // In a real application, you would save this to a database 
    // or send an email to the HR department via Resend/SendGrid etc.
    
    // For now, we simulate a successful database insertion or email transmission.
    console.log(`[CAREERS API] New spontaneous application from ${name} (${email}) with portfolio: ${githubUrl}`);

    // Return success
    return NextResponse.json({ ok: true, message: "Application routed successfully." }, { status: 200 });

  } catch (error) {
    console.error("[CAREERS API ERROR]", error);
    return NextResponse.json(
      { ok: false, error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
