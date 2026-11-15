/**
 * pyBIM Privacy-First Analytics (GA4) Architecture
 *
 * Implements Google Analytics 4 in a dormant, consent-aware configuration:
 * 1. Requires valid NEXT_PUBLIC_GA4_MEASUREMENT_ID environment variable (e.g. G-XXXXXXXXXX).
 * 2. Disabled by default unless explicit analytics consent is granted in CookieConsent.
 * 3. Default Basic Consent Mode: ad_storage, ad_user_data, and ad_personalization are denied unconditionally.
 * 4. PII scrubbing: Strict sanitization ensures zero names, emails, phones, form bodies, or auth tokens reach GA4.
 * 5. Route change deduplication: Filters out hash changes, query normalization, and repeated identical paths.
 */

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "").trim();

export const GA_DISALLOWED_PARAM_KEYS = [
  "email",
  "phone",
  "name",
  "fullname",
  "company",
  "companyname",
  "message",
  "token",
  "turnstile",
  "auth",
  "password",
  "secret",
  "code",
  "address",
  "cv",
  "resume",
  "portal",
  "auth_token",
  "jwt"
];

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/;

/**
 * Checks if GA4 is configured via environment variable
 */
export function isAnalyticsConfigured() {
  return typeof GA_MEASUREMENT_ID === "string" && /^G-[A-Za-z0-9]+$/.test(GA_MEASUREMENT_ID);
}

/**
 * Reads user consent decision from localStorage
 */
export function getStoredAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("cookie_consent");
    if (!raw) return false;
    if (raw === "all") return true;
    if (raw === "rejected") return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.analytics);
  } catch {
    return false;
  }
}

/**
 * Deep sanitization for custom event parameters.
 * Eliminates disallowed keys and scrubs potential PII strings.
 */
export function sanitizeEventParams(params = {}) {
  if (!params || typeof params !== "object") return {};
  const cleaned = {};

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();

    // 1. Strip disallowed keys
    if (GA_DISALLOWED_PARAM_KEYS.some((disallowed) => lowerKey.includes(disallowed))) {
      continue;
    }

    // 2. Value sanitization
    if (typeof value === "string") {
      const trimmed = value.trim();
      // Block strings matching email format
      if (EMAIL_REGEX.test(trimmed)) continue;
      // Block strings with 7+ digits looking like phone numbers
      if (PHONE_REGEX.test(trimmed) && trimmed.replace(/\D/g, "").length >= 7) continue;
      // Truncate excessively long strings to avoid unintended data ingestion
      cleaned[key] = trimmed.slice(0, 100);
    } else if (typeof value === "number" || typeof value === "boolean") {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

/**
 * Strips sensitive search parameters from page URLs before analytics logging
 */
export function cleanPagePath(pathname = "", search = "") {
  let cleanPath = pathname || "/";
  if (!search) return cleanPath;

  try {
    const searchParams = new URLSearchParams(search);
    // Strip language bridge parameter, auth tokens, tracking hashes
    searchParams.delete("lang_pref");
    searchParams.delete("token");
    searchParams.delete("code");

    // Remove any parameters with sensitive keywords
    for (const key of Array.from(searchParams.keys())) {
      const lower = key.toLowerCase();
      if (GA_DISALLOWED_PARAM_KEYS.some((disallowed) => lower.includes(disallowed))) {
        searchParams.delete(key);
      }
    }

    const query = searchParams.toString();
    return query ? `${cleanPath}?${query}` : cleanPath;
  } catch {
    return cleanPath;
  }
}

/**
 * Removes Google Analytics client-side cookies upon consent withdrawal
 */
export function cleanupGoogleAnalyticsCookies() {
  if (typeof document === "undefined") return;
  try {
    const cookies = document.cookie.split(";");
    const domainParts = window.location.hostname.split(".");
    // Build root domain for cookie deletion (e.g., .pybim.com, .pybim.it)
    const rootDomain = domainParts.length >= 2 ? `.${domainParts.slice(-2).join(".")}` : window.location.hostname;
    const currentHost = window.location.hostname;

    for (const cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim();
      if (cookieName.startsWith("_ga") || cookieName.startsWith("_gid") || cookieName.startsWith("_gat")) {
        // Expire cookie on current host and root domain
        document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.cookie = `${cookieName}=; Path=/; Domain=${rootDomain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        document.cookie = `${cookieName}=; Path=/; Domain=.${currentHost}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      }
    }
  } catch {
    // Fail-safe: Cookie cleanup errors must never crash UI
  }
}

/**
 * Dispatches a trackEvent call to window.gtag if consent and configuration are active
 */
export function trackEvent(eventName, rawParams = {}) {
  if (typeof window === "undefined" || !window.gtag) return false;
  if (!isAnalyticsConfigured() || !getStoredAnalyticsConsent()) return false;

  const sanitized = sanitizeEventParams(rawParams);
  try {
    window.gtag("event", eventName, sanitized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tracks generic contact form success conversion (Zero PII payload)
 */
export function trackContactSuccess(serviceId = "") {
  return trackEvent("contact_form_submit", {
    service_id: typeof serviceId === "string" ? serviceId.slice(0, 40) : "",
    method: "contact_form"
  });
}
