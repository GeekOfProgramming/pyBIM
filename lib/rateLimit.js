// In-Memory Sliding Window Rate Limiter for Authentication Protection

const ipRequestMap = new Map();

// Periodic cleanup of stale entries every 5 minutes to prevent memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of ipRequestMap.entries()) {
      if (now > record.resetTime) {
        ipRequestMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
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
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}
