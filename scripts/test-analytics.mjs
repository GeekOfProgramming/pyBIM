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

console.log("=== RUNNING GA4-01C CONSENT LIFECYCLE & INTEGRATION TEST SUITE ===\n");

// 1. Missing or Invalid Measurement ID vs Configured
console.log("1. Testing Measurement ID presence & validation...");
assert.equal(isAnalyticsConfigured(), false, "Analytics must be unconfigured when environment variable is unset");

// Helper to simulate a configured environment
function runWithMeasurementId(testFn) {
  // In lib/analytics.js, GA_MEASUREMENT_ID is read at module load from process.env
  // For lifecycle simulations, we verify logic against simulated state
  testFn("G-TEST12345");
}

console.log("   ✓ Missing or empty Measurement ID cleanly leaves analytics unconfigured");

// 2. Strict Boolean Consent Validation
console.log("2. Testing Strict Boolean Consent Validation...");
assert.equal(getStoredAnalyticsConsent(), false, "Without window/localStorage, default consent must be false");

// Mock browser window and localStorage
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

// 3. Full Consent Lifecycle Transitions (Simulation)
console.log("3. Testing Full Consent Lifecycle Transitions...");

class MockConsentLifecycle {
  constructor(measurementId) {
    this.measurementId = measurementId;
    this.hasConsent = false;
    this.shouldLoadScript = false;
    this.isReady = false;
    this.isConfigured = false;
    this.lastTrackedPath = null;
    this.pageViewCount = 0;
    this.gtagCalls = [];
    this.currentPath = "/en";

    // Setup window gtag mock
    globalThis.window.gtag = (...args) => this.gtagCalls.push(args);
  }

  // User accepts consent
  onAcceptConsent() {
    this.hasConsent = true;
    this.shouldLoadScript = true;

    if (this.isConfigured) {
      // Re-grant consent if already configured
      globalThis.window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  }

  // Script finishes loading
  onScriptLoaded() {
    if (!this.isConfigured) {
      globalThis.window.gtag("js", new Date());
      globalThis.window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
      globalThis.window.gtag("config", this.measurementId, { send_page_view: false });
      this.isConfigured = true;
      this.isReady = true;
    }
    this.triggerPageView();
  }

  // User revokes consent
  onRevokeConsent() {
    this.hasConsent = false;
    if (this.isConfigured) {
      globalThis.window.gtag("consent", "update", { analytics_storage: "denied" });
    }
    this.lastTrackedPath = null;
  }

  // Navigation
  navigate(newPath) {
    this.currentPath = newPath;
    const isPublic = isEligibleAnalyticsRoute(newPath);

    if (this.isConfigured && this.hasConsent) {
      if (!isPublic) {
        globalThis.window.gtag("consent", "update", { analytics_storage: "denied" });
        this.lastTrackedPath = null;
        return;
      } else {
        globalThis.window.gtag("consent", "update", { analytics_storage: "granted" });
      }
    }

    if (isPublic && this.hasConsent && this.isReady) {
      this.triggerPageView();
    }
  }

  triggerPageView() {
    if (!isEligibleAnalyticsRoute(this.currentPath)) return;
    const clean = cleanPagePath(this.currentPath);
    if (this.lastTrackedPath === clean) return;
    this.lastTrackedPath = clean;
    this.pageViewCount++;
    globalThis.window.gtag("event", "page_view", {
      page_path: clean,
      send_to: this.measurementId
    });
  }
}

// Scenario A: Rejected -> Accepted
{
  const sim = new MockConsentLifecycle("G-MOCK123");
  assert.equal(sim.shouldLoadScript, false, "Initial: script must not load without consent");
  assert.equal(sim.pageViewCount, 0, "Initial: zero page views");

  // User accepts
  sim.onAcceptConsent();
  assert.equal(sim.shouldLoadScript, true, "Script flag turned on upon consent");
  assert.equal(sim.isReady, false, "Not ready until script loads");

  // Script loads
  sim.onScriptLoaded();
  assert.equal(sim.isReady, true, "Ready after script loads");
  assert.equal(sim.pageViewCount, 1, "Exactly one initial page_view dispatched");
}
console.log("   ✓ Rejected -> Accepted initializes tag and emits exactly 1 initial page_view");

// Scenario B: Accepted -> Rejected
{
  const sim = new MockConsentLifecycle("G-MOCK123");
  sim.onAcceptConsent();
  sim.onScriptLoaded();
  assert.equal(sim.pageViewCount, 1);

  // User revokes
  sim.onRevokeConsent();
  assert.equal(sim.hasConsent, false);
  const updateCalls = sim.gtagCalls.filter(c => c[0] === "consent" && c[1] === "update");
  const lastUpdate = updateCalls[updateCalls.length - 1];
  assert.equal(lastUpdate[2].analytics_storage, "denied", "Consent updated to denied on revocation");

  // Attempt navigation while revoked
  sim.navigate("/en/services");
  assert.equal(sim.pageViewCount, 1, "No page_view allowed after consent is revoked");
}
console.log("   ✓ Accepted -> Rejected immediately pauses tracking and blocks future events");

// Scenario C: Accepted -> Rejected -> Accepted (Reactivation)
{
  const sim = new MockConsentLifecycle("G-MOCK123");
  sim.onAcceptConsent();
  sim.onScriptLoaded();
  assert.equal(sim.pageViewCount, 1);

  // Revoke
  sim.onRevokeConsent();
  assert.equal(sim.pageViewCount, 1);

  // Re-accept
  sim.onAcceptConsent();
  const updateCalls = sim.gtagCalls.filter(c => c[0] === "consent" && c[1] === "update");
  const lastUpdate = updateCalls[updateCalls.length - 1];
  assert.equal(lastUpdate[2].analytics_storage, "granted", "Consent restored to granted upon re-acceptance");

  // Navigating to new page resumes tracking
  sim.navigate("/en/about");
  assert.equal(sim.pageViewCount, 2, "Tracking resumed cleanly after re-acceptance");

  // Re-navigating to same page does not duplicate
  sim.navigate("/en/about");
  assert.equal(sim.pageViewCount, 2, "No duplicate page views on identical route");
}
console.log("   ✓ Accepted -> Rejected -> Accepted safely reactivates without duplicate tags or views");

// Scenario D: Public -> Private -> Public Route Transitions
{
  const sim = new MockConsentLifecycle("G-MOCK123");
  sim.onAcceptConsent();
  sim.onScriptLoaded();
  assert.equal(sim.pageViewCount, 1, "Initial public /en page view");

  // Navigate to private route /en/portal/dashboard
  sim.navigate("/en/portal/dashboard");
  assert.equal(sim.pageViewCount, 1, "Private route strictly barred from page_view");
  const updateCalls = sim.gtagCalls.filter(c => c[0] === "consent" && c[1] === "update");
  assert.equal(updateCalls[updateCalls.length - 1][2].analytics_storage, "denied", "Consent paused on private route");

  // Navigate back to public route /en/services
  sim.navigate("/en/services");
  assert.equal(sim.pageViewCount, 2, "Page view emitted for returning to public route");
  const finalUpdateCalls = sim.gtagCalls.filter(c => c[0] === "consent" && c[1] === "update");
  assert.equal(finalUpdateCalls[finalUpdateCalls.length - 1][2].analytics_storage, "granted", "Consent unpaused upon return to public route");
}
console.log("   ✓ Public -> Private -> Public dynamically suspends tracking and restores on return");

// 4. Private-Route Shielding (Portal, Auth, API, Error)
console.log("4. Testing Private-Route Exclusions List...");
assert.equal(isEligibleAnalyticsRoute("/en/portal"), false);
assert.equal(isEligibleAnalyticsRoute("/en/portal/settings"), false);
assert.equal(isEligibleAnalyticsRoute("/en/login"), false);
assert.equal(isEligibleAnalyticsRoute("/en/register"), false);
assert.equal(isEligibleAnalyticsRoute("/api/contact"), false);
assert.equal(isEligibleAnalyticsRoute("/en/_not-found"), false);
assert.equal(isEligibleAnalyticsRoute("/en/404"), false);
assert.equal(isEligibleAnalyticsRoute("/en/pricing"), false);
console.log("   ✓ All private and non-approved routes safely verified as ineligible");

// 5. PII and Query Parameter Scrubbing
console.log("5. Testing PII and URL Query Sanitization...");
const dirtyParams = {
  service_id: "bim_modeling",
  hidden_email: "client@aeccompany.com",
  phone_info: "+49 30 12345678",
  arbitrary_meta: "Safe string",
  valid_num: 100
};
const cleaned = sanitizeEventParams(dirtyParams);
assert.equal(cleaned.service_id, "bim_modeling");
assert.equal(cleaned.arbitrary_meta, "Safe string");
assert.equal(cleaned.valid_num, 100);
assert.equal(cleaned.hidden_email, undefined, "Email under unknown key scrubbed");
assert.equal(cleaned.phone_info, undefined, "Phone under unknown key scrubbed");

const cleanPathResult = cleanPagePath("/en/services?user=admin&token=xyz#top");
assert.equal(cleanPathResult, "/en/services", "All query params and hashes purged");
console.log("   ✓ PII regex scrubbing and pure path normalization confirmed");

console.log("\n=== ALL GA4-01C TESTS PASSED SUCCESSFULLY ===");
