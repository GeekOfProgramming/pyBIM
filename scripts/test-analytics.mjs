import assert from "node:assert/strict";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  isEligibleAnalyticsRoute,
  setGoogleAnalyticsDisabled,
  applyTrackingShutdown,
  applyTrackingRestore,
  sanitizeEventParams,
  cleanPagePath,
  trackEvent,
  trackContactSuccess,
  GA_MEASUREMENT_ID
} from "../lib/analytics.js";

console.log("=== RUNNING GA4-01D TRACKING ISOLATION & CONSENT SAFETY TESTS ===\n");

// Setup Global Browser Mocks
globalThis.window = {
  location: {
    origin: "https://www.pybim.com",
    hostname: "www.pybim.com",
    pathname: "/en",
    search: ""
  }
};
globalThis.document = {
  cookie: ""
};

let mockStore = {};
globalThis.localStorage = {
  getItem: (key) => mockStore[key] || null,
  setItem: (key, val) => { mockStore[key] = String(val); },
  removeItem: (key) => { delete mockStore[key]; },
  clear: () => { mockStore = {}; }
};

// 1. Missing or Invalid Measurement ID vs Configured
console.log("1. Testing Measurement ID presence & validation...");
assert.equal(isAnalyticsConfigured(), false, "Analytics must be unconfigured when environment variable is unset");
console.log("   ✓ Missing or empty Measurement ID cleanly leaves analytics unconfigured");

// 2. Strict Boolean Consent Validation
console.log("2. Testing Strict Boolean Consent Validation...");
assert.equal(getStoredAnalyticsConsent(), false, "Unset cookie_consent returns false");

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

mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: false });
assert.equal(getStoredAnalyticsConsent(), false, "cookie_consent={analytics: false} returns false");

mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: true });
assert.equal(getStoredAnalyticsConsent(), true, "Strict boolean true accepted");

mockStore["cookie_consent"] = "all";
assert.equal(getStoredAnalyticsConsent(), true, "Legacy 'all' accepted");
console.log("   ✓ Strict consent evaluation safely rejects truthy non-booleans, numbers, and malformed structures");

// 3. Shared GA-Disable & Tracking Shutdown Functions
console.log("3. Testing Shared Tracking Shutdown & Disable Flag Helpers...");
const testId = "G-TEST12345";
assert.equal(globalThis.window[`ga-disable-${testId}`], undefined);

// Apply shutdown
applyTrackingShutdown(testId);
assert.equal(globalThis.window[`ga-disable-${testId}`], true, "Disable flag must be true on shutdown");

// Apply restore
applyTrackingRestore(testId);
assert.equal(globalThis.window[`ga-disable-${testId}`], false, "Disable flag must be false on restore");
console.log("   ✓ applyTrackingShutdown and applyTrackingRestore correctly control ga-disable flag");

// 4. Test Script Loading and Tracking State Controller (Direct Unit Simulation of GoogleAnalytics component)
console.log("4. Testing GoogleAnalytics Component Controller Logic...");

class GoogleAnalyticsController {
  constructor(measurementId, initialPath, initialConsent = false) {
    this.measurementId = measurementId;
    this.pathname = initialPath;
    this.hasConsent = initialConsent;
    this.shouldLoadScript = false;
    this.isReady = false;
    this.isConfigured = false;
    this.lastTrackedPath = null;
    this.pageViewCount = 0;
    this.gtagCalls = [];

    globalThis.window.gtag = (...args) => this.gtagCalls.push(args);

    // Initial mount check (mirrors component Effect 1)
    if (this.hasConsent && isEligibleAnalyticsRoute(this.pathname)) {
      this.shouldLoadScript = true;
    }
  }

  // User consent update
  updateConsent(allowed) {
    this.hasConsent = allowed;
    if (allowed) {
      if (isEligibleAnalyticsRoute(this.pathname)) {
        this.shouldLoadScript = true;
      }
      if (this.isConfigured && isEligibleAnalyticsRoute(this.pathname)) {
        applyTrackingRestore(this.measurementId);
        this.isReady = true;
      }
    } else {
      applyTrackingShutdown(this.measurementId);
      this.isReady = false;
      this.lastTrackedPath = null;
    }
  }

  // Navigation
  navigate(newPath) {
    this.pathname = newPath;
    const isPublic = isEligibleAnalyticsRoute(newPath);

    if (this.hasConsent && isPublic && !this.shouldLoadScript) {
      this.shouldLoadScript = true;
    }

    if (this.isConfigured) {
      if (!isPublic || !this.hasConsent) {
        applyTrackingShutdown(this.measurementId);
        this.isReady = false;
        this.lastTrackedPath = null;
      } else {
        applyTrackingRestore(this.measurementId);
        this.isReady = true;
      }
    }

    if (isPublic && this.hasConsent && this.isReady) {
      this.triggerPageView();
    }
  }

  // Script onLoad callback (mirrors handleScriptLoad)
  onScriptLoaded() {
    // Race condition defense: check latest consent & route eligibility
    const allowTracking = this.hasConsent && isEligibleAnalyticsRoute(this.pathname);

    if (!allowTracking) {
      applyTrackingShutdown(this.measurementId);
      globalThis.window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    } else {
      applyTrackingRestore(this.measurementId);
      globalThis.window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }

    globalThis.window.gtag("config", this.measurementId, { send_page_view: false });
    this.isConfigured = true;

    if (allowTracking) {
      this.isReady = true;
      this.triggerPageView();
    }
  }

  triggerPageView() {
    if (!isEligibleAnalyticsRoute(this.pathname)) return;
    const clean = cleanPagePath(this.pathname);
    if (this.lastTrackedPath === clean) return;
    this.lastTrackedPath = clean;
    this.pageViewCount++;
    globalThis.window.gtag("event", "page_view", {
      page_path: clean,
      send_to: this.measurementId
    });
  }
}

// Case 1: Consented user opening a private route directly (/en/login or /en/portal/dashboard)
{
  const ctrl = new GoogleAnalyticsController("G-TEST01", "/en/login", true);
  assert.equal(ctrl.shouldLoadScript, false, "Consented user opening /en/login directly must NOT load Google Tag");
  assert.equal(ctrl.pageViewCount, 0, "No page views on direct private route entry");
}
console.log("   ✓ Consented user opening a private route directly strictly blocks Google Tag injection");

// Case 2: Consent revoked while script is actively loading (race condition defense)
{
  const ctrl = new GoogleAnalyticsController("G-TEST02", "/en/services", true);
  assert.equal(ctrl.shouldLoadScript, true, "Script started loading on public route");

  // User revokes consent before script finishes downloading:
  ctrl.updateConsent(false);
  assert.equal(globalThis.window["ga-disable-G-TEST02"], true, "Shutdown applied on revocation");

  // Now script finishes downloading:
  ctrl.onScriptLoaded();
  assert.equal(ctrl.isReady, false, "Must not become ready if consent was revoked during load");
  assert.equal(ctrl.pageViewCount, 0, "Zero page views emitted");
  assert.equal(globalThis.window["ga-disable-G-TEST02"], true, "Disable flag remains strictly true");

  const consentCalls = ctrl.gtagCalls.filter(c => c[0] === "consent" && c[1] === "default");
  assert.equal(consentCalls[0][2].analytics_storage, "denied", "Default consent initialized to denied");
}
console.log("   ✓ Race condition defense: revoking consent during script load enforces denied consent and ga-disable");

// Case 3: User navigates to private route while script is actively loading (race condition defense)
{
  const ctrl = new GoogleAnalyticsController("G-TEST03", "/en/about", true);
  assert.equal(ctrl.shouldLoadScript, true, "Script started loading on public route");

  // User navigates to /en/portal before script finishes downloading:
  ctrl.pathname = "/en/portal/dashboard";

  // Now script finishes downloading:
  ctrl.onScriptLoaded();
  assert.equal(ctrl.isReady, false, "Must not become ready if route became private during load");
  assert.equal(ctrl.pageViewCount, 0, "Zero page views emitted");
  assert.equal(globalThis.window["ga-disable-G-TEST03"], true, "Disable flag set to true for private route");
}
console.log("   ✓ Race condition defense: navigating to private route during load enforces denied consent and ga-disable");

// Case 4: Private to Public Navigation
{
  // User visits /en/login first (no script loaded):
  const ctrl = new GoogleAnalyticsController("G-TEST04", "/en/login", true);
  assert.equal(ctrl.shouldLoadScript, false);

  // User navigates from /en/login to /en/services:
  ctrl.navigate("/en/services");
  assert.equal(ctrl.shouldLoadScript, true, "Script loads upon entering public route");

  // Script finishes loading on public route:
  ctrl.onScriptLoaded();
  assert.equal(ctrl.isReady, true);
  assert.equal(ctrl.pageViewCount, 1, "Page view emitted for public route");
  assert.equal(globalThis.window["ga-disable-G-TEST04"], false, "Disable flag set to false on public route");
}
console.log("   ✓ Private to public navigation cleanly activates script and starts tracking");

// Case 5: Public -> Private -> Public Navigation (Tag already loaded)
{
  const ctrl = new GoogleAnalyticsController("G-TEST05", "/en", true);
  ctrl.onScriptLoaded();
  assert.equal(ctrl.pageViewCount, 1, "Initial homepage view");

  // Navigate to /en/portal/executions
  ctrl.navigate("/en/portal/executions");
  assert.equal(ctrl.pageViewCount, 1, "No page views on private route");
  assert.equal(globalThis.window["ga-disable-G-TEST05"], true, "ga-disable set to true on private route");

  // Return to public /en/contact
  ctrl.navigate("/en/contact");
  assert.equal(ctrl.pageViewCount, 2, "Page view emitted for /en/contact");
  assert.equal(globalThis.window["ga-disable-G-TEST05"], false, "ga-disable restored to false on public route");
}
console.log("   ✓ Public -> Private -> Public toggles ga-disable and safely resumes tracking");

// Case 6: Reactivation after Consent Restoration (Accepted -> Rejected -> Accepted)
{
  const ctrl = new GoogleAnalyticsController("G-TEST06", "/en", true);
  ctrl.onScriptLoaded();
  assert.equal(ctrl.pageViewCount, 1);

  // Revoke consent
  ctrl.updateConsent(false);
  assert.equal(globalThis.window["ga-disable-G-TEST06"], true);

  // Navigate while revoked
  ctrl.navigate("/en/services");
  assert.equal(ctrl.pageViewCount, 1, "Tracking blocked while consent revoked");

  // Restore consent
  ctrl.updateConsent(true);
  assert.equal(globalThis.window["ga-disable-G-TEST06"], false, "ga-disable restored upon consent re-acceptance");

  // Navigate to new page
  ctrl.navigate("/en/about");
  assert.equal(ctrl.pageViewCount, 2, "Page view emitted upon route transition after consent restoration");

  // Navigating to same page does not duplicate
  ctrl.navigate("/en/about");
  assert.equal(ctrl.pageViewCount, 2, "Deduplication prevents repeat page views");
}
console.log("   ✓ Reactivation after consent restoration verifies zero duplicate views and proper flag updates");

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

console.log("\n=== ALL GA4-01D TESTS PASSED SUCCESSFULLY ===");
