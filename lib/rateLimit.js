// In-Memory Sliding Window Rate Limiter for Edge Worker Isolate Protection
// NOTE: Cloudflare Workers run on distributed global isolates. In-memory maps provide
// per-isolate burst protection. Distributed cross-isolate rate limiting requires Cloudflare WAF
// or native Rate Limiting bindings.

const ipRequestMap = new Map();
let lastCleanupTime = 0;
const MAX_MAP_ENTRIES = 2000;

/**
 * Safely purges expired records during request execution without top-level timers.
 * Prevents Worker startup failures in Cloudflare isolate lifecycles.
 * @param {number} now 
 */
function opportunisticCleanup(now) {
  // Run cleanup at most once per 60 seconds or when map size grows large
  if (now - lastCleanupTime > 60 * 1000 || ipRequestMap.size > MAX_MAP_ENTRIES) {
    lastCleanupTime = now;
    for (const [key, record] of ipRequestMap.entries()) {
      if (now > record.resetTime) {
        ipRequestMap.delete(key);
      }
    }
    // Hard boundary if spam attacks flood unique IPs in a single minute
    if (ipRequestMap.size > MAX_MAP_ENTRIES) {
      ipRequestMap.clear();
    }
  }
}


/**
 * Checks and records a request against a rate limit window.
 * @param {string} ip - Client IP identifier
 * @param {string} action - Action key (e.g., 'login', 'register')
 * @param {number} maxAttempts - Maximum attempts allowed in window
 * @param {number} windowMs - Window duration in milliseconds (default: 60,000ms = 1 minute)
 * @returns {{ allowed: boolean, remaining: number, retryAfterSeconds: number }}
 */
export function checkRateLimit(ip, action = 'auth', maxAttempts = 5, windowMs = 60 * 1000) {
  const key = `${action}:${ip || 'unknown'}`;
  const now = Date.now();

  opportunisticCleanup(now);

  const record = ipRequestMap.get(key);

  if (!record || now > record.resetTime) {
    // New window or expired window
    ipRequestMap.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxAttempts - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= maxAttempts) {
    const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds,
    };
  }

  // Increment count within active window
  record.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
  return {
    allowed: true,
    remaining: maxAttempts - record.count,
    retryAfterSeconds,
  };
}

/**
 * Extracts the best client IP from Next.js request headers
 * @param {Request} request 
 * @returns {string}
 */
export function getClientIp(request) {
  // Cloudflare cryptographically-verified client IP
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Trusted proxy real IP
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Standard proxy chain
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return '127.0.0.1';
}

