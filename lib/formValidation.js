/**
 * pyBIM Form Validation & Email Security Module
 * Provider-agnostic validation, normalization, and sanitization for customer-facing forms.
 */

import dns from "node:dns";
import dnsPromises from "node:dns/promises";
import { escapeHtml, isValidEmail } from "./security.js";

// Ensure DNS resolver can resolve across varied runtime hosts (including Windows dev without 127.0.0.1:53)
try {
  const currentServers = dns.getServers();
  if (!currentServers || currentServers.length === 0 || currentServers[0] === "127.0.0.1") {
    dns.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8"]);
  }
} catch {
  // Gracefully continue in environments where setServers is restricted
}

export const FREE_EMAIL_PROVIDERS = Object.freeze([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.it", "yahoo.co.uk", "yahoo.fr", "yahoo.de", "yahoo.es",
  "hotmail.com", "hotmail.it", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es",
  "outlook.com", "outlook.it", "outlook.de", "outlook.fr", "live.com", "live.it", "msn.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "aim.com",
  "libero.it", "virgilio.it", "alice.it", "tin.it", "fastwebnet.it", "tiscali.it", "poste.it",
  "gmx.com", "gmx.de", "gmx.net", "web.de", "freenet.de", "t-online.de",
  "mail.com", "email.it", "inwind.it", "blu.it",
  "proton.me", "protonmail.com", "tutanota.com", "tutamail.com", "zoho.com",
  "mailinator.com", "tempmail.com", "guerrillamail.com", "10minutemail.com", "throwawaymail.com", "yopmail.com"
]);

export const ALLOWED_INTERNAL_DOMAINS = Object.freeze([
  "pybim.com",
  "pybim.it"
]);

/**
 * Checks whether an email domain is an authentic, authorized pyBIM internal domain.
 * Strictly checks exact match or exact dot-subdomain against ALLOWED_INTERNAL_DOMAINS.
 * Does NOT trust pybim.co unless explicitly authorized and verified.
 * 
 * @param {string} domain 
 * @returns {boolean}
 */
export function isInternalDomain(domain) {
  if (!domain || typeof domain !== "string") return false;
  const cleanDomain = domain.toLowerCase().trim();
  return ALLOWED_INTERNAL_DOMAINS.some(
    allowed => cleanDomain === allowed || cleanDomain.endsWith(`.${allowed}`)
  );
}

/**
 * Normalizes an email address (trims whitespace, converts domain to lowercase).
 * 
 * @param {string} email 
 * @returns {string}
 */
export function normalizeEmail(email) {
  if (!email || typeof email !== "string") return "";
  const parts = email.trim().split("@");
  if (parts.length !== 2) return email.trim().toLowerCase();
  return `${parts[0].trim()}@${parts[1].trim().toLowerCase()}`;
}

/**
 * Strips carriage returns and newlines to prevent email header injection (CRLF injection).
 * 
 * @param {string} value 
 * @returns {string}
 */
export function sanitizeHeader(value) {
  if (value === null || value === undefined) return "";
  return String(value).replace(/[\r\n\t]/g, " ").trim();
}

/**
 * Validates a string field with required check and maximum length.
 * 
 * @param {unknown} value 
 * @param {string} fieldName 
 * @param {number} maxLen 
 * @param {boolean} required 
 * @returns {{ valid: boolean, error?: string, sanitized: string }}
 */
export function validateTextField(value, fieldName, maxLen = 500, required = true) {
  if (value === null || value === undefined || (typeof value === "string" && !value.trim())) {
    if (required) {
      return { valid: false, error: `Missing required field: ${fieldName}`, sanitized: "" };
    }
    return { valid: true, sanitized: "" };
  }
  const str = String(value).trim();
  if (str.length > maxLen) {
    return { valid: false, error: `${fieldName} exceeds maximum length of ${maxLen} characters.`, sanitized: "" };
  }
  return { valid: true, sanitized: str };
}

/**
 * Validates an explicit legal/privacy acknowledgment.
 * Must be strictly boolean true.
 *
 * @param {unknown} value
 * @returns {{ valid: boolean, error?: string, timestamp: string }}
 */
export function validatePrivacyAcknowledgment(value) {
  if (value !== true) {
    return {
      valid: false,
      error: "You must accept the Privacy Policy and Terms to proceed.",
      timestamp: ""
    };
  }
  return {
    valid: true,
    timestamp: new Date().toISOString()
  };
}

/**
 * Validates corporate email policy (consumer/disposable domain blocking & normalization).
 * 
 * @param {string} email 
 * @param {boolean} isDev 
 * @returns {{ valid: boolean, error?: string, domain?: string, isInternal?: boolean }}
 */
export function validateCorporateEmail(email, isDev = false) {
  if (!isValidEmail(email)) {
    return { valid: false, error: "Invalid email format." };
  }
  const normalized = normalizeEmail(email);
  const domain = normalized.split("@")[1];
  const internal = isInternalDomain(domain);

  if (!isDev && !internal && FREE_EMAIL_PROVIDERS.includes(domain)) {
    return {
      valid: false,
      error: "A valid corporate email address is required. Public email providers are not permitted.",
      domain,
      isInternal: false
    };
  }

  return { valid: true, domain, isInternal: internal };
}

/**
 * Short-lived in-memory cache for MX verification results to bound DNS subrequests.
 * Map: domain -> { valid: boolean, isTransient: boolean, expiresAt: number }
 */
const mxCache = new Map();
const MX_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Verifies that a domain has valid, mail-receiving MX records.
 * Handles timeouts, transient DNS outages, null MX records (RFC 7505), and nonexistent domains.
 * Does NOT probe SMTP mailboxes or perform SSRF-vulnerable HTTP fetching.
 *
 * @param {string} domain
 * @param {boolean} isDev
 * @returns {Promise<{ valid: boolean, error?: string, status: number, isTransient?: boolean }>}
 */
export async function verifyDomainMx(domain, isDev = false) {
  if (!domain || typeof domain !== "string") {
    return { valid: false, error: "Invalid domain format.", status: 400 };
  }
  const cleanDomain = domain.toLowerCase().trim();

  // Internal pyBIM domains are verified infrastructure
  if (isInternalDomain(cleanDomain) || isDev) {
    return { valid: true, status: 200 };
  }

  const now = Date.now();
  const cached = mxCache.get(cleanDomain);
  if (cached && now < cached.expiresAt) {
    if (cached.valid) {
      return { valid: true, status: 200 };
    }
    return {
      valid: false,
      error: cached.isTransient
        ? "Temporary DNS verification failure. Please try again shortly."
        : "Corporate domain does not possess valid mail receiving records.",
      status: cached.isTransient ? 503 : 400,
      isTransient: cached.isTransient
    };
  }

  try {
    const records = await dnsPromises.resolveMx(cleanDomain);

    if (!records || records.length === 0) {
      mxCache.set(cleanDomain, { valid: false, isTransient: false, expiresAt: now + MX_CACHE_TTL_MS });
      return {
        valid: false,
        error: "Corporate domain does not possess valid mail receiving records.",
        status: 400
      };
    }

    // Check for Null MX (RFC 7505): single record with exchange: "." or priority: 0 denoting no mail service
    const isNullMx = records.some(r => r.exchange === "." || (records.length === 1 && r.exchange === "" && r.priority === 0));
    if (isNullMx) {
      mxCache.set(cleanDomain, { valid: false, isTransient: false, expiresAt: now + MX_CACHE_TTL_MS });
      return {
        valid: false,
        error: "Domain explicitly advertises that it does not accept email.",
        status: 400
      };
    }

    mxCache.set(cleanDomain, { valid: true, isTransient: false, expiresAt: now + MX_CACHE_TTL_MS });
    return { valid: true, status: 200 };
  } catch (err) {
    const code = err.code || "";
    if (code === "ENOTFOUND" || code === "ENODATA") {
      mxCache.set(cleanDomain, { valid: false, isTransient: false, expiresAt: now + MX_CACHE_TTL_MS });
      return {
        valid: false,
        error: "Corporate domain could not be verified. Please use a valid corporate email address.",
        status: 400
      };
    }

    // Transient resolver errors (timeout, server failure)
    return {
      valid: false,
      error: "Temporary DNS resolution issue verifying email domain. Please try again in a few moments.",
      status: 503,
      isTransient: true
    };
  }
}

/**
 * Safely parses and bounds JSON request body by actual stream byte length.
 * Prevents memory exhaustion even if Content-Length header is missing, incorrect, or omitted.
 * 
 * @param {Request} req 
 * @param {number} maxBytes (default 64KB)
 * @returns {Promise<{ ok: boolean, body?: any, error?: string, status?: number }>}
 */
export async function parseBoundedJson(req, maxBytes = 64 * 1024) {
  try {
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > maxBytes) {
      return { ok: false, error: "Payload too large. Maximum allowed size is 64KB.", status: 413 };
    }

    // Stream-based byte counting
    if (req.body && typeof req.body.getReader === "function") {
      const reader = req.body.getReader();
      const chunks = [];
      let totalBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.length;
        if (totalBytes > maxBytes) {
          return { ok: false, error: "Payload too large. Maximum allowed size is 64KB.", status: 413 };
        }
        chunks.push(value);
      }

      const totalBuffer = new Uint8Array(totalBytes);
      let offset = 0;
      for (const chunk of chunks) {
        totalBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      const rawText = new TextDecoder().decode(totalBuffer);
      const body = JSON.parse(rawText);
      return { ok: true, body };
    }

    // Fallback for mock requests
    const rawText = await req.text();
    const byteLength = new TextEncoder().encode(rawText).length;
    if (byteLength > maxBytes) {
      return { ok: false, error: "Payload too large. Maximum allowed size is 64KB.", status: 413 };
    }
    const body = JSON.parse(rawText);
    return { ok: true, body };
  } catch (err) {
    return { ok: false, error: "Malformed JSON payload.", status: 400 };
  }
}

/**
 * Verifies Cloudflare Turnstile token server-side.
 * Operates fail-closed when TURNSTILE_SECRET_KEY is configured in production.
 * In development or when unconfigured, gracefully skips verification.
 *
 * @param {string} token
 * @param {string} remoteIp
 * @returns {Promise<{ ok: boolean, error?: string, status: number }>}
 */
export async function verifyTurnstileToken(token, remoteIp) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If unconfigured (e.g. dev/CI), allow submission to avoid blocking testing without credentials
    return { ok: true, status: 200 };
  }

  if (!token || typeof token !== "string") {
    return {
      ok: false,
      error: "Bot protection verification required. Please complete the security check.",
      status: 403
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token.trim());
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    const result = await res.json();
    if (!result.success) {
      return {
        ok: false,
        error: "Security verification failed or expired. Please refresh and try again.",
        status: 403
      };
    }

    return { ok: true, status: 200 };
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return {
      ok: false,
      error: "Unable to verify security challenge. Please try again shortly.",
      status: 503
    };
  }
}
