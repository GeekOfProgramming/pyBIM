import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pybim_enterprise_sovereign_secret_key_2026'
);

const DEMO_EMAIL = (process.env.DEMO_PORTAL_EMAIL || 'demo@pybim.it').toLowerCase();
const DEMO_PASSWORD = process.env.DEMO_PORTAL_PASSWORD || 'pyBIM2026Secure';

// Mock Database for Enterprise MVP Showcase
export const mockUsers = [
  {
    id: 'usr_pybim_01',
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    company: 'Studio Ingegneria BIM Italia',
    name: 'Executive Director'
  },
  {
    id: 'usr_admin_02',
    email: 'admin@enterprise.com',
    password: 'password123',
    company: 'Enterprise General Contractor',
    name: 'Admin User'
  }
];

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

// Simple mock auth check
export async function authenticateUser(email, password) {
  // In a real app, hash the incoming password and compare with DB hash
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) return null;
  
  // Don't leak password in token
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
