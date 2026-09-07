import { NextResponse } from 'next/server';
import { authenticateUser, signToken } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Rate Limiting: Max 5 attempts per 60 seconds
    const rateCheck = checkRateLimit(clientIp, 'login', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded login rate limit.`);
      return NextResponse.json(
        { error: `Too many login attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.` },
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

    const body = await request.json();
    const { email, password, company_website_url } = body;

    // Honeypot Trap Validation
    if (company_website_url && typeof company_website_url === 'string' && company_website_url.trim() !== '') {
      console.warn(`[SECURITY ALERT - BOT TRAPPED IN LOGIN] IP: ${clientIp} filled honeypot field with: "${company_website_url}"`);
      // Artificial delay to simulate processing and deceive the bot
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json({ success: true, message: 'Authentication completed.' }, { status: 200 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken(user);

    const response = NextResponse.json({ success: true, user }, { status: 200 });
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
