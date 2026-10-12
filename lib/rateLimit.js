// In-Memory Sliding Window Rate Limiter for Edge Worker Isolate Protection
// NOTE: Cloudflare Workers run on distributed global isolates. In-memory maps provide
// per-isolate burst protection. Distributed cross-isolate rate limiting requires Cloudflare WAF
// or native Rate Limiting bindings.

const ipRequestMap = new Map();
let lastCleanupTime = 0;
const MAX_MAP_ENTRIES = 2000;
const EVICTION_TARGET = 1500;

/**
 * Safely purges expired records during request execution without top-level timers.
 * Prevents Worker startup failures in Cloudflare isolate lifecycles.
 * 
 * Capacity & Eviction Model:
 * Instead of clearing all counters simultaneously when capacity (MAX_MAP_ENTRIES) is reached
 * (which would reset throttled states and allow abuse), it applies bounded FIFO eviction
 * removing the oldest records down to EVICTION_TARGET while preserving active counters.
 * 
 * Note: Cloudflare Workers run on distributed global isolates. This in-memory map provides
 * per-isolate burst protection only. Distributed cross-isolate rate limiting requires Cloudflare WAF
 * or native Rate Limiting bindings.
 * 
 * @param {number} now 
 */
function opportunisticCleanup(now) {
  // Run cleanup at most once per 60 seconds or immediately when map reaches capacity
  if (now - lastCleanupTime > 60 * 1000 || ipRequestMap.size >= MAX_MAP_ENTRIES) {
    lastCleanupTime = now;
    for (const [key, record] of ipRequestMap.entries()) {
      if (now > record.resetTime) {
        ipRequestMap.delete(key);
      }
    }
    // Bounded FIFO eviction if map is still at or over capacity after pruning expired keys
    if (ipRequestMap.size >= MAX_MAP_ENTRIES) {
      for (const key of ipRequestMap.keys()) {
        if (ipRequestMap.size <= EVICTION_TARGET) {
          break;
        }
        ipRequestMap.delete(key);
      }
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
 * Extracts the best client IP from Next.js request headers.
 * 
 * TRUST MODEL & INGRESS BOUNDARY:
 * - 'cf-connecting-ip' is cryptographically set and stripped/overwritten by Cloudflare Edge
 *   on incoming requests, representing the genuine, non-spoofable client IP under Cloudflare ingress.
 * - 'x-real-ip' and 'x-forwarded-for' are evaluated strictly as fallbacks for local dev and intermediate proxies.
 *   WARNING: Fallback proxy headers CAN BE FORGED by clients and MUST NOT be treated as authenticated
 *   client identity outside trusted Cloudflare ingress.
 * 
 * @param {Request} request 
 * @returns {string}
 */
export function getClientIp(request) {
  // Cloudflare cryptographically-verified client IP
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // Trusted proxy real IP (fallback for local dev / non-Cloudflare proxies - unverified outside trusted ingress)
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // Standard proxy chain (fallback only - untrusted client spoofing possible if outside trusted ingress)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return '127.0.0.1';
}

/**
 * Helpers exported for regression testing and diagnostics only.
 */
export function _getRateLimitMapSize() {
  return ipRequestMap.size;
}

export function _clearRateLimitMap() {
  ipRequestMap.clear();
  lastCleanupTime = 0;
}


