/**
 * pyBIM Form Validation & Email Security Module
 * Provider-agnostic validation, normalization, and sanitization for customer-facing forms.
 */

import { escapeHtml, isValidEmail } from "./security.js";

export const FREE_EMAIL_PROVIDERS = Object.freeze([
  "gmail.com", "yahoo.com", "yahoo.it", "hotmail.com", "hotmail.it", 
  "outlook.com", "outlook.it", "live.com", "live.it", "icloud.com", 
  "msn.com", "aol.com", "libero.it", "virgilio.it", "alice.it", "tin.it",
  "fastwebnet.it", "tiscali.it", "ymail.com", "mail.com", "gmx.com", 
  "proton.me", "protonmail.com"
]);

export const ALLOWED_INTERNAL_DOMAINS = Object.freeze([
  "pybim.com",
  "pybim.it",
  "pybim.co"
]);

/**
 * Checks whether an email domain is an authentic, authorized pyBIM internal domain.
 * Strictly checks exact match or exact dot-subdomain against ALLOWED_INTERNAL_DOMAINS
 * to eliminate substring attack vectors (e.g. evil-pybim.com or notpybim.org).
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
 * Validates corporate email policy.
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
 * Safely parses and bounds JSON request body.
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
    const body = await req.json();
    return { ok: true, body };
  } catch (err) {
    return { ok: false, error: "Malformed JSON payload.", status: 400 };
  }
}
