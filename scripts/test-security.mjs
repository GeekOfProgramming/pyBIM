import assert from 'node:assert';
import { escapeHtml, isValidEmail, applySecurityHeaders } from '../lib/security.js';
import { getClientIp, checkRateLimit } from '../lib/rateLimit.js';
import { signToken, verifyToken, authenticateUser } from '../lib/auth.js';

console.log('=== RUNNING TARGETED SECURITY TESTS ===');

// 1. escapeHtml tests
console.log('1. Testing escapeHtml...');
assert.strictEqual(escapeHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;&#x2F;script&gt;');
assert.strictEqual(escapeHtml('hello & "world" \'test\' / path'), 'hello &amp; &quot;world&quot; &#39;test&#39; &#x2F; path');
assert.strictEqual(escapeHtml(null), '');
assert.strictEqual(escapeHtml(undefined), '');
assert.strictEqual(escapeHtml(123), '123');
assert.strictEqual(escapeHtml('Normal Company Name'), 'Normal Company Name');
console.log('   ✓ escapeHtml sanitized all test vectors correctly');

// 2. isValidEmail tests
console.log('2. Testing isValidEmail...');
assert.strictEqual(isValidEmail('test@pybim.com'), true);
assert.strictEqual(isValidEmail('first.last@enterprise.co.uk'), true);
assert.strictEqual(isValidEmail('invalid-email'), false);
assert.strictEqual(isValidEmail(''), false);
assert.strictEqual(isValidEmail('<script>@company.com'), false);
assert.strictEqual(isValidEmail('user@company..com'), false);
assert.strictEqual(isValidEmail('user@.company.com'), false);
console.log('   ✓ isValidEmail filtered email formats correctly');

// 3. getClientIp tests
console.log('3. Testing getClientIp header precedence...');
const cfReq = {
  headers: new Headers([
    ['cf-connecting-ip', '203.0.113.195'],
    ['x-real-ip', '198.51.100.1'],
    ['x-forwarded-for', '192.0.2.1']
  ])
};
assert.strictEqual(getClientIp(cfReq), '203.0.113.195', 'cf-connecting-ip must take precedence over forwarded-for');

const proxyReq = {
  headers: new Headers([
    ['x-forwarded-for', '198.51.100.77, 10.0.0.1']
  ])
};
assert.strictEqual(getClientIp(proxyReq), '198.51.100.77', 'first IP from x-forwarded-for must be selected when no cf-connecting-ip');
console.log('   ✓ getClientIp verified Cloudflare header priority');

// 4. checkRateLimit tests
console.log('4. Testing checkRateLimit...');
const ip = '198.51.100.99';
for (let i = 0; i < 5; i++) {
  const result = checkRateLimit(ip, 'test-burst', 5, 10000);
  assert.strictEqual(result.allowed, true);
  assert.strictEqual(result.remaining, 4 - i);
}
const overLimit = checkRateLimit(ip, 'test-burst', 5, 10000);
assert.strictEqual(overLimit.allowed, false);
assert.strictEqual(overLimit.remaining, 0);
console.log('   ✓ checkRateLimit correctly enforced window and throttled excessive requests');

// 5. Auth tests (fail-closed behavior)
console.log('5. Testing auth fail-closed behavior...');
delete process.env.JWT_SECRET;
await assert.rejects(
  async () => await signToken({ user: 'test' }),
  /JWT_SECRET is not configured/
);
assert.strictEqual(await verifyToken('dummy-token'), null);
assert.strictEqual(await authenticateUser('test@pybim.com', 'wrongpassword'), null);

process.env.JWT_SECRET = 'super-secret-test-key-minimum-32-characters-long';
const token = await signToken({ sub: 'user-123', email: 'test@pybim.com' });
assert.ok(typeof token === 'string' && token.length > 20);
const payload = await verifyToken(token);
assert.strictEqual(payload.sub, 'user-123');
assert.strictEqual(payload.email, 'test@pybim.com');
console.log('   ✓ Auth verified token signing, verification, and fail-closed state');

// 6. Security headers test
console.log('6. Testing applySecurityHeaders...');
const mockResponse = {
  headers: new Headers()
};
applySecurityHeaders(mockResponse, true);
assert.strictEqual(mockResponse.headers.get('X-Content-Type-Options'), 'nosniff');
assert.strictEqual(mockResponse.headers.get('X-Frame-Options'), 'SAMEORIGIN');
assert.strictEqual(mockResponse.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
assert.strictEqual(mockResponse.headers.get('X-Robots-Tag'), 'noindex, nofollow');
console.log('   ✓ Security headers applied correctly');

console.log('\n=== ALL TARGETED SECURITY TESTS PASSED SUCCESSFULLY ===\n');
