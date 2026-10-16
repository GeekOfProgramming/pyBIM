import assert from 'node:assert';
import { escapeHtml, isValidEmail, applySecurityHeaders } from '../lib/security.js';
import { getClientIp, checkRateLimit, _getRateLimitMapSize, _clearRateLimitMap } from '../lib/rateLimit.js';
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

// 4b. Rate limit map capacity, bounded FIFO eviction, and overflow resilience
console.log('4b. Testing rate limit bounded capacity and FIFO eviction...');
_clearRateLimitMap();

// Insert an initial batch of 1,000 distinct IPs
for (let i = 0; i < 1000; i++) {
  checkRateLimit(`10.0.0.${i}`, 'test-action', 5, 60000);
}
assert.strictEqual(_getRateLimitMapSize(), 1000, 'Initial 1000 entries should be tracked');

// Throttled target IP (inserted into active tracking)
const victimIp = '198.51.100.222';
for (let i = 0; i < 5; i++) {
  checkRateLimit(victimIp, 'test-action', 5, 60000);
}
const preOverflowCheck = checkRateLimit(victimIp, 'test-action', 5, 60000);
assert.strictEqual(preOverflowCheck.allowed, false, 'Target IP must be blocked before overflow');

// Flood with 1,200 additional unique IPs to push past MAX_MAP_ENTRIES (2,000)
for (let i = 0; i < 1200; i++) {
  checkRateLimit(`172.16.${Math.floor(i / 250)}.${i % 250}`, 'test-action', 5, 60000);
}

// Bounded capacity verification: Map size must NOT exceed MAX_MAP_ENTRIES (2000)
const postOverflowSize = _getRateLimitMapSize();
assert.ok(
  postOverflowSize <= 2000 && postOverflowSize > 0,
  `Map size (${postOverflowSize}) must remain bounded <= 2000`
);

// Crucial Regression Check: Target IP must NOT have been wiped by overflow
// (Old bug: map was completely cleared on overflow, resetting blocked attacker counters)
const postOverflowCheck = checkRateLimit(victimIp, 'test-action', 5, 60000);
assert.strictEqual(
  postOverflowCheck.allowed,
  false,
  'Recently throttled IP must remain blocked after map overflow eviction'
);
console.log('   ✓ Rate limiter enforced bounded capacity and FIFO eviction without wiping active throttles');


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
assert.strictEqual(mockResponse.headers.get('X-XSS-Protection'), '0');
assert.strictEqual(mockResponse.headers.get('X-Robots-Tag'), 'noindex, nofollow');
console.log('   ✓ Security headers applied correctly');

// 7. FORM-01 Form Validation & Corporate Eligibility Suite
console.log('7. Integrating FORM-01 Form Validation & Corporate Eligibility Suite...');
await import('./test-form-validation.mjs');

// 8. FORM-01 Full Connection Chain Integration Suite
console.log('8. Integrating FORM-01 Full Connection Chain Integration Suite...');
await import('./test-form-e2e.mjs');

console.log('\n=== ALL TARGETED SECURITY & FORM-01 TESTS PASSED SUCCESSFULLY ===\n');

