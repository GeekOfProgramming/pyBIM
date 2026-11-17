/**
 * pyBIM Privacy-First Analytics (GA4) Architecture
 *
 * Implements Google Analytics 4 in a dormant, consent-aware configuration:
 * 1. Requires valid NEXT_PUBLIC_GA4_MEASUREMENT_ID build-time environment variable (e.g. G-XXXXXXXXXX).
 * 2. Disabled by default unless explicit analytics consent is granted in CookieConsent (analytics === true).
 * 3. Default Basic Consent Mode: ad_storage, ad_user_data, and ad_personalization are denied unconditionally.
 * 4. PII scrubbing: Strict sanitization and parameter allowlists ensure zero personal data or credentials reach GA4.
 * 5. Private-route shielding: Private routes (/portal, /login, /register, api, error) are strictly excluded.
 * 6. Route change deduplication: Pure pathname tracking without arbitrary query parameters.
 * 7. Complete Tracking Shutdown: Uses window['ga-disable-G-XXXX'] alongside consent:update and cookie deletion.
 */

export const GA_MEASUREMENT_ID = (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "").trim();

/**
 * 8 Approved Core Public Routes (per locale).
 * Analytics is exclusively restricted to these verified public pages.
 */
export const GA_APPROVED_PUBLIC_ROUTES = [
  "",
  "/services",
  "/about",
  "/contact",
  "/careers",
  "/privacy-policy",
  "/cookie-policy",
  "/terms-and-conditions",
];

const VALID_LOCALES = ["en", "it", "de"];

/**
 * Validates whether a pathname is an approved public route.
 * Strictly excludes:
 * - /portal and any subpaths
 * - /login, /register, or any auth/admin flows
 * - /api routes
 * - Any unapproved dynamic or catch-all routes
 */
export function isEligibleAnalyticsRoute(pathname = "") {
  if (!pathname || typeof pathname !== "string") return false;

  // Clean trailing slashes (except root) and normalize
  let normalized = pathname.trim();
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  // Strictly block private, auth, api, or error paths anywhere in pathname
  const lower = normalized.toLowerCase();
  if (
    lower.includes("/portal") ||
    lower.includes("/login") ||
    lower.includes("/register") ||
    lower.startsWith("/api") ||
    lower.includes("/_not-found") ||
    lower.includes("/404") ||
    lower.includes("/500")
  ) {
    return false;
  }

  // Parse locale and subpath: e.g. /en/services -> locale="en", subpath="/services"
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) {
    // Root "/" (redirect route)
    return true;
  }

  const [firstSegment, ...restSegments] = segments;
  if (VALID_LOCALES.includes(firstSegment)) {
    const subpath = restSegments.length > 0 ? `/${restSegments.join("/")}` : "";
    return GA_APPROVED_PUBLIC_ROUTES.includes(subpath);
  }

  // Unprefixed entry path e.g. /services
  return GA_APPROVED_PUBLIC_ROUTES.includes(`/${segments.join("/")}`);
}

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
 * Validates GA4 measurement ID format (e.g. G-XXXXXXXXXX)
 */
export function isAnalyticsConfigured(measurementId = GA_MEASUREMENT_ID) {
  const id = typeof measurementId === "string" ? measurementId.trim() : "";
  return typeof id === "string" && /^G-[A-Za-z0-9]+$/.test(id);
}

/**
 * Strict evaluation of user consent decision from localStorage.
 * Accepts consent ONLY when explicitly set to boolean true (or legitimate legacy 'all').
 * Rejects malformed JSON, strings, truthy non-booleans, missing keys, and invalid objects.
 */
export function getStoredAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("cookie_consent");
    if (!raw || typeof raw !== "string") return false;
    if (raw === "all") return true;
    if (raw === "rejected") return false;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return false;
    }
    // Strict boolean check: must be strictly true, never truthy coercion
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

/**
 * Synchronizes global tracking readiness in window memory.
 * Used to coordinate custom event emission with Google Tag configuration lifecycle.
 */
export function setAnalyticsReady(ready = false) {
  if (typeof window === "undefined") return;
  window._pybim_ga_ready = Boolean(ready);
}

/**
 * Checks whether Google Analytics is fully configured, active, and ready for custom events.
 */
export function isAnalyticsReady() {
  if (typeof window === "undefined") return false;
  return window._pybim_ga_ready === true;
}

/**
 * Controls Google's official opt-out window['ga-disable-G-XXXX'] flag.
 * When disabled (disabled = true), Google tag halts all data transmission for that ID.
 */
export function setGoogleAnalyticsDisabled(disabled = true, measurementId = GA_MEASUREMENT_ID) {
  if (typeof window === "undefined" || !measurementId) return;
  const flagKey = `ga-disable-${measurementId}`;
  window[flagKey] = Boolean(disabled);
}

/**
 * Applies the complete tracking shutdown:
 * 1. Sets window['ga-disable-G-XXXX'] = true
 * 2. Updates consent to 'denied' in gtag if available
 * 3. Removes all Google Analytics cookies
 */
export function applyTrackingShutdown(measurementId = GA_MEASUREMENT_ID) {
  setGoogleAnalyticsDisabled(true, measurementId);
  setAnalyticsReady(false);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    } catch {
      // Fail-safe
    }
  }

  cleanupGoogleAnalyticsCookies();
}

/**
 * Initializes the global dataLayer and gtag command queue with Consent Mode defaults:
 * 1. window.dataLayer = window.dataLayer || []
 * 2. window.gtag = function() { window.dataLayer.push(arguments); }
 * 3. gtag('consent', 'default', { ...all denied... })
 * 4. gtag('js', new Date())
 *
 * This MUST execute before injecting or loading the external gtag.js script,
 * guaranteeing that default consent (denied) is established before any network activity or script execution.
 */
export function initializeGtagConsentDefaults() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Idempotency check: only enqueue 'consent default' and 'js' once
  if (!window._gtagConsentDefaultsInitialized) {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    window.gtag("js", new Date());
    window._gtagConsentDefaultsInitialized = true;
  }
}

/**
 * Restores tracking when user consent is verified and route is an approved public route:
 * 1. Sets window['ga-disable-G-XXXX'] = false
 * 2. Updates consent to 'granted' in gtag if available
 * Note: Advertising signals (ad_storage, ad_user_data, ad_personalization) always remain denied.
 */
export function applyTrackingRestore(measurementId = GA_MEASUREMENT_ID) {
  setGoogleAnalyticsDisabled(false, measurementId);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    } catch {
      // Fail-safe
    }
  }
}

/**
 * Known valid service IDs for contact conversions (strict allowlist)
 */
export const APPROVED_CONTACT_SERVICE_IDS = [
  "bim_modeling",
  "bim_coordination",
  "bim_qa",
  "revit_automation",
  "computational_design",
  "software_integrations",
  "other"
];

/**
 * Deep sanitization for custom event parameters.
 * Eliminates disallowed keys and scrubs potential PII strings.
 */
export function sanitizeEventParams(params = {}) {
  if (!params || typeof params !== "object" || Array.isArray(params)) return {};
  const cleaned = {};

  for (const [key, value] of Object.entries(params)) {
    const lowerKey = key.toLowerCase();

    // 1. Strip disallowed keys
    if (GA_DISALLOWED_PARAM_KEYS.some((disallowed) => lowerKey.includes(disallowed))) {
      continue;
    }

    // 2. Value sanitization & PII detection
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
 * Returns a clean, normalized page path strictly stripped of all query parameters and hashes.
 * Ensures zero query strings (benign or sensitive) are transmitted with page_view events.
 */
export function cleanPagePath(pathname = "") {
  if (!pathname || typeof pathname !== "string") return "/";
  // Strip any query or hash that might be present in the path string
  const clean = pathname.split("?")[0].split("#")[0].trim();
  return clean || "/";
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
 * Dispatches a trackEvent call to window.gtag if consent, configuration, and route eligibility are active.
 * Strict Readiness Guard: Fails closed if Google Tag is not fully ready/configured.
 */
export function trackEvent(eventName, rawParams = {}, currentPath = "", measurementId = GA_MEASUREMENT_ID) {
  if (typeof window === "undefined" || !window.gtag) return false;
  if (!isAnalyticsConfigured(measurementId) || !getStoredAnalyticsConsent()) return false;

  // Protect private application routes from event emission
  const pathToCheck = currentPath || window.location.pathname;
  if (!isEligibleAnalyticsRoute(pathToCheck)) return false;

  // Strict Readiness Guard: Ensure Google Tag has finished configuration
  // and tracking is actively ready before enqueuing custom events.
  if (!isAnalyticsReady()) return false;

  // Guard against ga-disable flag
  const activeId = measurementId || GA_MEASUREMENT_ID;
  if (activeId && window[`ga-disable-${activeId}`] === true) return false;

  const sanitized = sanitizeEventParams(rawParams);
  try {
    window.gtag("event", eventName, sanitized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tracks generic contact form success conversion (Zero PII payload, allowlisted service IDs only)
 */
export function trackContactSuccess(serviceId = "", measurementId = GA_MEASUREMENT_ID) {
  const safeServiceId = APPROVED_CONTACT_SERVICE_IDS.includes(serviceId) ? serviceId : "other";
  return trackEvent("contact_form_submit", {
    service_id: safeServiceId,
    method: "contact_form"
  }, "", measurementId);
}
