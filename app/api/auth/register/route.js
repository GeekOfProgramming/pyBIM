import { NextResponse } from 'next/server';
import { mockUsers, signToken } from '@/lib/auth'; // For MVP we'd add to this array or a DB
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Rate Limiting: Max 5 registration attempts per 60 seconds
    const rateCheck = checkRateLimit(clientIp, 'register', 5, 60 * 1000);
    if (!rateCheck.allowed) {
      console.warn(`[SECURITY ALERT - RATE LIMIT EXCEEDED] IP: ${clientIp} exceeded register rate limit.`);
      return NextResponse.json(
        { error: `Too many registration attempts. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.` },
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
    const { email, password, company, name, company_website_url } = body;

    // Honeypot Trap Validation
    if (company_website_url && typeof company_website_url === 'string' && company_website_url.trim() !== '') {
      console.warn(`[SECURITY ALERT - BOT TRAPPED IN REGISTER] IP: ${clientIp} filled honeypot field with: "${company_website_url}"`);
      // Artificial delay to simulate processing and deceive the bot
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json({ success: true, message: 'Account registered.' }, { status: 200 });
    }

    if (!email || !password || !company) {
      return NextResponse.json({ error: 'Email, password, and company are required' }, { status: 400 });
    }

    // MVP Mock Check: Check if user already exists
    const userExists = mockUsers.some(u => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Normally we would hash the password and insert into the database here
    const newUser = {
      id: `usr_${Date.now()}`,
      email,
      password, // In reality, Hash this!
      company,
      name: name || 'New User'
    };
    
    // For MVP, we mutate the mock array
    mockUsers.push(newUser);

    // Auto-login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    const token = await signToken(userWithoutPassword);

    const response = NextResponse.json({ success: true, message: 'Registration successful', user: userWithoutPassword }, { status: 201 });
    
    // Set the cookie for immediate authentication
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
