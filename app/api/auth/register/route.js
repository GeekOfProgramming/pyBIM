import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);

    // Rate Limiting: Max 5 registration attempts per 60 seconds
    const rateCheck = checkRateLimit(clientIp, 'register', 5, 60 * 1000);
    if (!rateCheck.allowed) {
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

    // Fail-closed staging policy: Self-registration is intentionally disabled
    // Production user accounts must be provisioned via managed D1/database storage
    return NextResponse.json(
      {
        error: 'Client Portal self-registration is disabled on this staging environment. Access is granted by invitation only.'
      },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
