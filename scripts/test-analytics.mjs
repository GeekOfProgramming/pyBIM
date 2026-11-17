import assert from "node:assert/strict";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  isEligibleAnalyticsRoute,
  setGoogleAnalyticsDisabled,
  applyTrackingShutdown,
  applyTrackingRestore,
  initializeGtagConsentDefaults,
  setAnalyticsReady,
  isAnalyticsReady,
  sanitizeEventParams,
  cleanPagePath,
  trackEvent,
  trackContactSuccess,
  GA_MEASUREMENT_ID
} from "../lib/analytics.js";

console.log("=== RUNNING GA4 CONSENT INITIALIZATION ORDERING & TRACKING SAFETY TESTS ===\n");

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

// 4. Test Production Consent Mode Initialization Ordering
console.log("4. Testing Google Consent Mode Initialization Ordering...");

class GoogleAnalyticsTestHarness {
  constructor(measurementId, initialPath, initialConsent = false) {
    this.measurementId = measurementId;
    this.pathname = initialPath;
    this.hasConsent = initialConsent;
    this.shouldLoadScript = false;
    this.isReady = false;
    this.isConfigured = false;
    this.lastTrackedPath = null;
    this.pageViewCount = 0;

    // Reset window tracking state
    delete globalThis.window.dataLayer;
    delete globalThis.window.gtag;
    delete globalThis.window._gtagConsentDefaultsInitialized;
    delete globalThis.window[`ga-disable-${measurementId}`];

    // Mirror Component Effect 0: initialize Consent Mode defaults before any script is requested
    initializeGtagConsentDefaults();
    setAnalyticsReady(this.isReady);

    // Mirror Component Effect 1: Initial mount check
    if (this.hasConsent && isEligibleAnalyticsRoute(this.pathname)) {
      this.shouldLoadScript = true;
    }
  }

  // Get all dataLayer items pushed so far
  getDataLayerEvents() {
    return (globalThis.window.dataLayer || []).map(args => Array.from(args));
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
        setAnalyticsReady(true);
      }
    } else {
      applyTrackingShutdown(this.measurementId);
      this.isReady = false;
      setAnalyticsReady(false);
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
        setAnalyticsReady(false);
        this.lastTrackedPath = null;
      } else {
        applyTrackingRestore(this.measurementId);
        this.isReady = true;
        setAnalyticsReady(true);
      }
    }

    if (isPublic && this.hasConsent && this.isReady) {
      this.triggerPageView();
    }
  }

  // Script onLoad callback (mirrors handleScriptLoad in GoogleAnalytics.js)
  onScriptLoaded() {
    // Ensure dataLayer & gtag are ready
    initializeGtagConsentDefaults();

    // 1. RACE CONDITION DEFENSE: Check latest state before configuring granted consent
    const latestConsent = this.hasConsent;
    const latestRouteEligible = isEligibleAnalyticsRoute(this.pathname);
    const allowTracking = latestConsent && latestRouteEligible;

    if (!allowTracking) {
      applyTrackingShutdown(this.measurementId);
      setAnalyticsReady(false);
    } else {
      applyTrackingRestore(this.measurementId);
    }

    // 2. Configure measurement ID
    globalThis.window.gtag("config", this.measurementId, {
      send_page_view: false,
      anonymize_ip: true,
      restricted_data_processing: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    this.isConfigured = true;

    if (allowTracking) {
      this.isReady = true;
      setAnalyticsReady(true);
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
      page_title: "pyBIM",
      page_location: `${globalThis.window.location.origin}${clean}`,
      page_path: clean,
      hostname: globalThis.window.location.hostname,
      locale: "en",
      send_to: this.measurementId
    });
  }
}

// Case 1: Default consent denied established BEFORE external script injection
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST01", "/en", false);
  assert.equal(harness.shouldLoadScript, false, "External script must NOT load without explicit consent");

  const events = harness.getDataLayerEvents();
  assert.ok(events.length >= 2, "dataLayer must have consent default and js timestamp");

  // First command MUST be 'consent', 'default' with all signals denied
  const firstCommand = events[0];
  assert.equal(firstCommand[0], "consent");
  assert.equal(firstCommand[1], "default");
  assert.deepEqual(firstCommand[2], {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });

  // Second command MUST be 'js'
  const secondCommand = events[1];
  assert.equal(secondCommand[0], "js");

  // Advertising consent must remain denied
  assert.equal(firstCommand[2].ad_storage, "denied");
  assert.equal(firstCommand[2].ad_user_data, "denied");
  assert.equal(firstCommand[2].ad_personalization, "denied");
}
console.log("   ✓ Step 1: Default consent (all denied) established BEFORE external script injection");

// Case 2: Consent accepted after page load (consent:default -> consent:update -> config)
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST02", "/en/services", false);
  assert.equal(harness.shouldLoadScript, false, "Tag script not injected before consent");

  // User accepts consent:
  harness.updateConsent(true);
  assert.equal(harness.shouldLoadScript, true, "Tag script allowed to inject on public route");

  // External script completes loading:
  harness.onScriptLoaded();
  assert.equal(harness.isReady, true, "Harness is ready for tracking");
  assert.equal(harness.pageViewCount, 1, "Exactly one initial page view dispatched");

  const events = harness.getDataLayerEvents();
  const consentDefaultIndex = events.findIndex(e => e[0] === "consent" && e[1] === "default");
  const consentUpdateIndex = events.findIndex(e => e[0] === "consent" && e[1] === "update");
  const configIndex = events.findIndex(e => e[0] === "config");
  const pageViewIndex = events.findIndex(e => e[0] === "event" && e[1] === "page_view");

  assert.ok(consentDefaultIndex !== -1, "consent:default must exist");
  assert.ok(consentUpdateIndex !== -1, "consent:update must exist");
  assert.ok(configIndex !== -1, "config must exist");
  assert.ok(pageViewIndex !== -1, "page_view must exist");

  // Strict ordering check: consent:default < consent:update < config < page_view
  assert.ok(consentDefaultIndex < consentUpdateIndex, "consent:default MUST precede consent:update");
  assert.ok(consentUpdateIndex < configIndex, "consent:update MUST precede config");
  assert.ok(configIndex < pageViewIndex, "config MUST precede page_view");

  // Verify advertising consent remains denied during update
  const updatePayload = events[consentUpdateIndex][2];
  assert.equal(updatePayload.analytics_storage, "granted");
  assert.equal(updatePayload.ad_storage, "denied");
  assert.equal(updatePayload.ad_user_data, "denied");
  assert.equal(updatePayload.ad_personalization, "denied");
}
console.log("   ✓ Step 2: Strict ordering verified: consent:default -> consent:update -> config -> page_view");

// Case 3: Consented user opening a private route directly (/en/login or /en/portal/dashboard)
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST03", "/en/login", true);
  assert.equal(harness.shouldLoadScript, false, "Consented user opening /en/login directly must NOT load Google Tag");
  assert.equal(harness.pageViewCount, 0, "No page views on direct private route entry");
}
console.log("   ✓ Consented user opening a private route directly strictly blocks Google Tag injection");

// Case 4: Consent revoked while script is actively loading (race condition defense)
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST04", "/en/services", true);
  assert.equal(harness.shouldLoadScript, true, "Script started loading on public route");

  // User revokes consent before script finishes downloading:
  harness.updateConsent(false);
  assert.equal(globalThis.window["ga-disable-G-TEST04"], true, "Shutdown applied on revocation");

  // Now script finishes downloading:
  harness.onScriptLoaded();
  assert.equal(harness.isReady, false, "Must not become ready if consent was revoked during load");
  assert.equal(harness.pageViewCount, 0, "Zero page views emitted");
  assert.equal(globalThis.window["ga-disable-G-TEST04"], true, "Disable flag remains strictly true");

  const events = harness.getDataLayerEvents();
  const lastConsentUpdate = [...events].reverse().find(e => e[0] === "consent" && e[1] === "update");
  assert.equal(lastConsentUpdate[2].analytics_storage, "denied", "Consent update enforced denied");
  assert.equal(lastConsentUpdate[2].ad_storage, "denied", "Advertising consent remains denied");
}
console.log("   ✓ Race condition defense: revoking consent during script load enforces denied consent and ga-disable");

// Case 5: Public -> Private -> Public Navigation (Tag already loaded)
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST05", "/en", true);
  harness.onScriptLoaded();
  assert.equal(harness.pageViewCount, 1, "Initial homepage view");

  // Navigate to /en/portal/executions
  harness.navigate("/en/portal/executions");
  assert.equal(harness.pageViewCount, 1, "No page views on private route");
  assert.equal(globalThis.window["ga-disable-G-TEST05"], true, "ga-disable set to true on private route");

  // Return to public /en/contact
  harness.navigate("/en/contact");
  assert.equal(harness.pageViewCount, 2, "Page view emitted for /en/contact");
  assert.equal(globalThis.window["ga-disable-G-TEST05"], false, "ga-disable restored to false on public route");
}
console.log("   ✓ Public -> Private -> Public toggles ga-disable and safely resumes tracking");

// Case 6: Reactivation after Consent Restoration (Accepted -> Rejected -> Accepted)
{
  const harness = new GoogleAnalyticsTestHarness("G-TEST06", "/en", true);
  harness.onScriptLoaded();
  assert.equal(harness.pageViewCount, 1);

  // Revoke consent
  harness.updateConsent(false);
  assert.equal(globalThis.window["ga-disable-G-TEST06"], true);

  // Navigate while revoked
  harness.navigate("/en/services");
  assert.equal(harness.pageViewCount, 1, "Tracking blocked while consent revoked");

  // Restore consent
  harness.updateConsent(true);
  assert.equal(globalThis.window["ga-disable-G-TEST06"], false, "ga-disable restored upon consent re-acceptance");

  // Navigate to new page
  harness.navigate("/en/about");
  assert.equal(harness.pageViewCount, 2, "Page view emitted upon route transition after consent restoration");

  // Navigating to same page does not duplicate
  harness.navigate("/en/about");
  assert.equal(harness.pageViewCount, 2, "Deduplication prevents repeat page views");
}
console.log("   ✓ Reactivation after consent restoration verifies zero duplicate views and proper flag updates");

// 5. Custom Event Readiness Guard Tests (trackEvent & trackContactSuccess)
console.log("5. Testing Custom Event Readiness Guard (trackEvent & trackContactSuccess)...");
{
  const measurementId = "G-EVENTTEST";

  // Case A: Before consent or tag load, trackContactSuccess must fail closed (return false)
  const harness = new GoogleAnalyticsTestHarness(measurementId, "/en/contact", false);
  mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: false });
  assert.equal(isAnalyticsReady(), false, "Analytics must not be ready initially");
  assert.equal(trackContactSuccess("bim_modeling"), false, "Must fail closed before consent and tag load");

  // Case B: User accepts consent, but tag script has NOT yet loaded/configured
  harness.updateConsent(true);
  mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: true });
  // window.gtag exists because initializeGtagConsentDefaults created the queue, but tag is NOT ready
  assert.equal(typeof globalThis.window.gtag, "function", "Command queue exists");
  assert.equal(isAnalyticsReady(), false, "Analytics must NOT be ready before onScriptLoaded");
  assert.equal(trackContactSuccess("bim_modeling"), false, "Must fail closed while tag is downloading/unconfigured");

  // Case C: Tag script finishes loading & configures
  harness.onScriptLoaded();
  assert.equal(isAnalyticsReady(), true, "Analytics is now ready");
  assert.equal(trackContactSuccess("bim_modeling", measurementId), true, "Custom event allowed when tag is ready & consented");

  // Verify event payload in dataLayer
  const events = harness.getDataLayerEvents();
  const contactEvent = events.find(e => e[0] === "event" && e[1] === "contact_form_submit");
  assert.ok(contactEvent, "contact_form_submit event recorded");
  assert.equal(contactEvent[2].service_id, "bim_modeling");
  assert.equal(contactEvent[2].method, "contact_form");

  // Case D: User revokes consent -> trackEvent must immediately fail closed
  harness.updateConsent(false);
  mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: false });
  assert.equal(isAnalyticsReady(), false, "Analytics must NOT be ready when consent is revoked");
  assert.equal(trackContactSuccess("bim_modeling", measurementId), false, "Must fail closed after consent revocation");

  // Case E: Consent restored -> trackEvent succeeds again
  harness.updateConsent(true);
  mockStore["cookie_consent"] = JSON.stringify({ version: 1, necessary: true, analytics: true });
  assert.equal(isAnalyticsReady(), true, "Analytics is ready again after consent restoration");
  assert.equal(trackContactSuccess("revit_automation", measurementId), true, "Must succeed after consent restoration");

  // Case F: Private route navigation -> trackEvent fails closed even if consent granted
  harness.navigate("/en/portal/dashboard");
  assert.equal(isAnalyticsReady(), false, "Analytics must NOT be ready on private route");
  assert.equal(trackContactSuccess("bim_modeling", measurementId), false, "Must fail closed on private route");

  // Return to public route -> trackEvent succeeds
  harness.navigate("/en/contact");
  assert.equal(isAnalyticsReady(), true, "Analytics must be ready upon returning to public route");
  assert.equal(trackContactSuccess("other", measurementId), true, "Must succeed on return to public route");
}
console.log("   ✓ trackContactSuccess and trackEvent strictly fail closed until tag is configured and ready");

// 6. PII and Query Parameter Scrubbing
console.log("6. Testing PII and URL Query Sanitization...");
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

console.log("\n=== ALL GA4 PRELAUNCH CONSENT ORDERING TESTS PASSED SUCCESSFULLY ===");
