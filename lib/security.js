/**
 * Application Security Utilities
 * - HTML Sanitization for Email and Template Interpolation
 * - Email format validation
 * - Common HTTP security headers
 */

/**
 * Escapes characters with special meaning in HTML to prevent HTML Injection and Stored XSS.
 * @param {unknown} value 
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const str = String(value);
  const matchHtmlRegExp = /["'&<>/]/;
  const match = matchHtmlRegExp.exec(str);
  if (!match) {
    return str;
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates RFC-compliant email structure with basic sanity checks.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Applies defense-in-depth HTTP security headers to Next.js responses.
 * @param {import('next/server').NextResponse} response 
 * @param {boolean} isStagingPreview 
 * @returns {import('next/server').NextResponse}
 */
export function applySecurityHeaders(response, isStagingPreview = false) {
  const headers = response.headers;

  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');

  // Clickjacking defense
  headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Referrer leakage defense
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Disable sensitive hardware/browser permissions pyBIM does not use
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Legacy XSS filter defense-in-depth
  headers.set('X-XSS-Protection', '1; mode=block');

  // Staging preview isolation
  if (isStagingPreview) {
    headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}
