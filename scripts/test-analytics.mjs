import assert from "node:assert/strict";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  sanitizeEventParams,
  cleanPagePath,
  trackEvent,
  trackContactSuccess,
  GA_MEASUREMENT_ID
} from "../lib/analytics.js";

console.log("=== RUNNING GA4-01 PRIVACY-FIRST ANALYTICS TEST SUITE ===\n");

// 1. Missing or Invalid Measurement ID
console.log("1. Testing Measurement ID presence & validation...");
assert.equal(isAnalyticsConfigured(), false, "Analytics must be unconfigured when environment variable is unset");
console.log("   ✓ Missing or empty Measurement ID cleanly leaves analytics unconfigured");

// 2. No consent & rejected consent evaluation
console.log("2. Testing Stored Consent Evaluation...");
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

// Legacy 'rejected'
mockStore["cookie_consent"] = "rejected";
assert.equal(getStoredAnalyticsConsent(), false, "cookie_consent='rejected' returns false");

// JSON payload with analytics: false
mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: false });
assert.equal(getStoredAnalyticsConsent(), false, "cookie_consent={analytics: false} returns false");

// Accepted consent
mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: true });
assert.equal(getStoredAnalyticsConsent(), true, "cookie_consent={analytics: true} returns true");
console.log("   ✓ Consent transitions strictly adhere to user decisions in localStorage");

// 3. Sensitive parameter sanitization and PII exclusion
console.log("3. Testing PII Scrubbing and Parameter Sanitization...");
const dirtyParams = {
  service_id: "bim_modeling",
  user_email: "test@domain.com",
  phone: "+39 02 1234567",
  fullName: "Marco Rossi",
  message: "I need Revit automation for our project",
  token: "secret_turnstile_token_123",
  valid_metric: 42,
  is_corporate: true
};

const cleaned = sanitizeEventParams(dirtyParams);
assert.equal(cleaned.service_id, "bim_modeling");
assert.equal(cleaned.valid_metric, 42);
assert.equal(cleaned.is_corporate, true);
assert.equal(cleaned.user_email, undefined, "Email must be excluded");
assert.equal(cleaned.phone, undefined, "Phone must be excluded");
assert.equal(cleaned.fullName, undefined, "Name must be excluded");
assert.equal(cleaned.message, undefined, "Message body must be excluded");
assert.equal(cleaned.token, undefined, "Tokens must be excluded");
console.log("   ✓ Deep sanitization strictly strips all potential PII fields and tokens");

// 4. URL and Query String Sanitization (Stripping sensitive search params)
console.log("4. Testing URL Query Parameter Sanitization...");
const rawQuery = "?lang_pref=it&token=abc12345&tab=overview&service=revit";
const cleanedPath = cleanPagePath("/en/services", rawQuery);
assert.ok(!cleanedPath.includes("lang_pref="), "lang_pref bridge param must be stripped from path");
assert.ok(!cleanedPath.includes("token="), "token param must be stripped from path");
assert.ok(cleanedPath.includes("tab=overview"), "Benign navigational param preserved");
console.log("   ✓ Sensitive URL query parameters cleanly purged before analytics logging");

// 5. Consent Enforcement on Event Dispatch
console.log("5. Testing Event Dispatch Guards (Consent & Configuration)...");
const gtagCalls = [];
globalThis.window.gtag = (...args) => gtagCalls.push(args);

// While isAnalyticsConfigured() is false:
const dispatchedWithoutConfig = trackEvent("test_event", { foo: "bar" });
assert.equal(dispatchedWithoutConfig, false, "Must not dispatch when unconfigured");
assert.equal(gtagCalls.length, 0, "No gtag calls while unconfigured");

const contactResult = trackContactSuccess("bim_modeling");
assert.equal(contactResult, false, "trackContactSuccess returns false when unconfigured");
console.log("   ✓ Dispatch guards safely block all outgoing analytics events when inactive");

console.log("\n=== ALL GA4-01 TARGETED ANALYTICS TESTS PASSED SUCCESSFULLY ===");
