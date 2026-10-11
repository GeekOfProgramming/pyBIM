import { SignJWT, jwtVerify } from 'jose';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  return new TextEncoder().encode(secret);
}

export async function signToken(payload) {
  const secretKey = getJwtSecret();
  if (!secretKey) {
    throw new Error('JWT_SECRET is not configured. Token signing refused.');
  }

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function verifyToken(token) {
  const secretKey = getJwtSecret();
  if (!secretKey || !token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

// Access-Controlled Staging Authentication Handler
// Public hardcoded demo/admin credentials removed.
// When deployed to staging, credentials must be provided via encrypted environment variables.
export async function authenticateUser(email, password) {
  if (!email || !password) return null;

  const stagingEmail = process.env.STAGING_PORTAL_EMAIL?.toLowerCase()?.trim();
  const stagingPassword = process.env.STAGING_PORTAL_PASSWORD;

  // If staging credentials are not configured via environment variables, fail-closed
  if (!stagingEmail || !stagingPassword) {
    return null;
  }

  if (email.toLowerCase().trim() === stagingEmail && password === stagingPassword) {
    return {
      id: 'usr_staging_authorized',
      email: stagingEmail,
      company: 'pyBIM Staging Verified Partner',
      name: 'Staging Reviewer'
    };
  }

  return null;
}
