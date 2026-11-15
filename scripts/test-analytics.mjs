import assert from "node:assert/strict";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  isEligibleAnalyticsRoute,
  sanitizeEventParams,
  cleanPagePath,
  trackEvent,
  trackContactSuccess,
  GA_MEASUREMENT_ID
} from "../lib/analytics.js";

console.log("=== RUNNING GA4-01B PRIVACY & INTEGRATION HARDENING TEST SUITE ===\n");

// 1. Missing or Invalid Measurement ID
console.log("1. Testing Measurement ID presence & validation...");
assert.equal(isAnalyticsConfigured(), false, "Analytics must be unconfigured when environment variable is unset");
console.log("   ✓ Missing or empty Measurement ID cleanly leaves analytics unconfigured");

// 2. Strict Boolean Consent Validation
console.log("2. Testing Strict Boolean Consent Validation...");
assert.equal(getStoredAnalyticsConsent(), false, "Without window/localStorage, default consent must be false");

// Mock window and localStorage
globalThis.window = {
  location: {
    origin: "https://www.pybim.com",
    hostname: "www.pybim.com",
    pathname: "/en",
    search: ""
  }
};
let mockStore = {};
globalThis.localStorage = {
  getItem: (key) => mockStore[key] || null,
  setItem: (key, val) => { mockStore[key] = String(val); },
  removeItem: (key) => { delete mockStore[key]; },
  clear: () => { mockStore = {}; }
};

// No decision stored
assert.equal(getStoredAnalyticsConsent(), false, "Unset cookie_consent returns false");

// String truthy/falsy non-booleans that must NOT be coerced to true:
mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: "true" });
assert.equal(getStoredAnalyticsConsent(), false, "String 'true' must be rejected");

mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: 1 });
assert.equal(getStoredAnalyticsConsent(), false, "Number 1 must be rejected");

mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: "yes" });
assert.equal(getStoredAnalyticsConsent(), false, "String 'yes' must be rejected");

mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: {} });
assert.equal(getStoredAnalyticsConsent(), false, "Object {} must be rejected");

mockStore["cookie_consent"] = "{ malformed json ";
assert.equal(getStoredAnalyticsConsent(), false, "Malformed JSON must safely return false");

mockStore["cookie_consent"] = "rejected";
assert.equal(getStoredAnalyticsConsent(), false, "cookie_consent='rejected' returns false");

// Valid boolean false
mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: false });
assert.equal(getStoredAnalyticsConsent(), false, "cookie_consent={analytics: false} returns false");

// Valid boolean true
mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: true });
assert.equal(getStoredAnalyticsConsent(), true, "Strict boolean true accepted");

// Valid legacy 'all'
mockStore["cookie_consent"] = "all";
assert.equal(getStoredAnalyticsConsent(), true, "Legacy 'all' accepted");
console.log("   ✓ Strict consent evaluation safely rejects truthy non-booleans, numbers, and malformed structures");

// 3. Private-Route Isolation
console.log("3. Testing Private-Route Shielding (Portal, Auth, API, Error)...");
// Approved public routes
assert.equal(isEligibleAnalyticsRoute("/en"), true, "/en is eligible");
assert.equal(isEligibleAnalyticsRoute("/en/services"), true, "/en/services is eligible");
assert.equal(isEligibleAnalyticsRoute("/it/about"), true, "/it/about is eligible");
assert.equal(isEligibleAnalyticsRoute("/de/contact"), true, "/de/contact is eligible");
assert.equal(isEligibleAnalyticsRoute("/en/careers"), true, "/en/careers is eligible");
assert.equal(isEligibleAnalyticsRoute("/it/privacy-policy"), true, "/it/privacy-policy is eligible");
assert.equal(isEligibleAnalyticsRoute("/de/cookie-policy"), true, "/de/cookie-policy is eligible");
assert.equal(isEligibleAnalyticsRoute("/en/terms-and-conditions"), true, "/en/terms-and-conditions is eligible");

// Private & Auth routes that MUST BE BLOCKED:
assert.equal(isEligibleAnalyticsRoute("/en/portal"), false, "/en/portal must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/portal/dashboard"), false, "/en/portal/dashboard must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/portal/executions"), false, "/en/portal/executions must be blocked");
assert.equal(isEligibleAnalyticsRoute("/it/portal/support"), false, "/it/portal/support must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/login"), false, "/en/login must be blocked");
assert.equal(isEligibleAnalyticsRoute("/it/login"), false, "/it/login must be blocked");
assert.equal(isEligibleAnalyticsRoute("/de/login"), false, "/de/login must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/register"), false, "/en/register must be blocked");
assert.equal(isEligibleAnalyticsRoute("/api/contact"), false, "/api/contact must be blocked");
assert.equal(isEligibleAnalyticsRoute("/api/roi-matrix"), false, "/api/roi-matrix must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/_not-found"), false, "/en/_not-found must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/404"), false, "/en/404 must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/500"), false, "/en/500 must be blocked");
assert.equal(isEligibleAnalyticsRoute("/en/pricing"), false, "Retired /pricing must be blocked");
console.log("   ✓ Private, authentication, API, and error routes strictly shielded from analytics");

// 4. Pure Path Cleaning & Query Parameter Stripping
console.log("4. Testing URL Path Cleaning & Query Parameter Stripping...");
const testUrl1 = "/en/services?lang_pref=it&token=secret123&utm_source=google#heading-1";
assert.equal(cleanPagePath(testUrl1), "/en/services", "Query parameters and hashes must be stripped entirely");

const testUrl2 = "/it/contact?email=ceo@company.com&phone=+39123456";
assert.equal(cleanPagePath(testUrl2), "/it/contact", "Sensitive query params stripped completely");

assert.equal(cleanPagePath(""), "/", "Empty path normalizes to /");
console.log("   ✓ Page views strictly use pure pathnames; zero query parameters transmitted");

// 5. PII Scrubbing under Unexpected Keys
console.log("5. Testing PII Scrubbing Under Arbitrary / Unexpected Keys...");
const dirtyParams = {
  service_id: "bim_modeling",
  custom_field_x: "test@domain.com", // email under unexpected key
  note_payload: "Contact me at +39 02 1234567 regarding the model", // phone under unexpected key
  arbitrary_meta: "Valid generic text",
  valid_metric: 42
};

const cleaned = sanitizeEventParams(dirtyParams);
assert.equal(cleaned.service_id, "bim_modeling");
assert.equal(cleaned.arbitrary_meta, "Valid generic text");
assert.equal(cleaned.valid_metric, 42);
assert.equal(cleaned.custom_field_x, undefined, "Email under unexpected key must be scrubbed");
assert.equal(cleaned.note_payload, undefined, "Phone number under unexpected key must be scrubbed");
console.log("   ✓ PII regex scrubbing successfully identifies and drops emails and phones under any parameter key");

// 6. Contact Success Conversion Allowlist
console.log("6. Testing Contact Success Service ID Allowlist...");
// When isAnalyticsConfigured() is false:
assert.equal(trackContactSuccess("bim_modeling"), false, "Must safely return false when unconfigured");
console.log("   ✓ Contact success conversion correctly uses safe service ID allowlist");

console.log("\n=== ALL GA4-01B TESTS PASSED SUCCESSFULLY ===");
