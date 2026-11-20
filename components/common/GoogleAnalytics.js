"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  isEligibleAnalyticsRoute,
  cleanPagePath,
  applyTrackingShutdown,
  applyTrackingRestore,
  initializeGtagConsentDefaults,
  setAnalyticsReady,
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * GoogleAnalytics Component
 *
 * Privacy-First, Complete Tracking Isolation GA4 loader.
 * Google documented Consent Mode initialization sequence:
 * 1. Step 1 (Prior to Script Injection):
 *    - Global dataLayer and gtag command queue are initialized.
 *    - Consent Mode defaults are established:
 *      analytics_storage: 'denied'
 *      ad_storage: 'denied'
 *      ad_user_data: 'denied'
 *      ad_personalization: 'denied'
 * 2. Step 2 (Script Injection):
 *    - ONLY occurs when BOTH explicit user consent === true AND current route is an eligible public route.
 *    - If user has not consented or is on a private route, external script is NEVER injected into the DOM.
 * 3. Step 3 (External Script Loaded):
 *    - Verifies the latest in-flight consent and route eligibility.
 *    - If eligible and consent is granted:
 *      a) applyTrackingRestore(GA_MEASUREMENT_ID) -> updates analytics_storage to 'granted'
 *      b) gtag('config', GA_MEASUREMENT_ID, { send_page_view: false, ...privacy flags... })
 *      c) marks ready to track client-side page transitions
 *    - If revoked during script loading:
 *      a) applyTrackingShutdown(GA_MEASUREMENT_ID) -> updates analytics_storage to 'denied' & sets ga-disable
 * 4. Step 4 (Consent Revocation & Private Routes):
 *    - Enforces window['ga-disable-G-XXXX'] = true, updates consent to 'denied', and purges cookies.
 * 5. Step 5 (Consent Reactivation):
 *    - Enforces window['ga-disable-G-XXXX'] = false, updates consent to 'granted', and restores tracking readiness.
 * 6. Page View Deduplication: Exactly one manual page_view per distinct public route transition.
 */
export default function GoogleAnalytics({ locale = "en" }) {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const [shouldLoadScript, setShouldLoadScript] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const lastTrackedPathRef = useRef(null);
  const isConfiguredRef = useRef(false);

  // Keep live refs for callbacks to avoid race conditions with stale closures
  const hasConsentRef = useRef(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    setAnalyticsReady(isReady);
  }, [isReady]);

  // Establish dataLayer and Consent Mode defaults (all denied) on mount if GA4 is configured.
  // This executes BEFORE any external script is requested or injected.
  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    initializeGtagConsentDefaults();
  }, []);

  // 1. Synchronize consent state from localStorage and listen for updates
  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    const initialConsent = getStoredAnalyticsConsent();
    setHasConsent(initialConsent);
    hasConsentRef.current = initialConsent;

    // Only allow script loading if user has consent AND initial entry route is public
    if (initialConsent && isEligibleAnalyticsRoute(pathname)) {
      setShouldLoadScript(true);
    }

    const handleConsentUpdate = (e) => {
      const allowed = e?.detail?.analytics === true;
      setHasConsent(allowed);
      hasConsentRef.current = allowed;

      if (allowed) {
        // User granted consent:
        // Only load script if current route is an approved public route
        if (isEligibleAnalyticsRoute(pathnameRef.current)) {
          setShouldLoadScript(true);
        }

        // If tag is already loaded and configured in page memory, restore tracking
        if (typeof window !== "undefined" && isConfiguredRef.current) {
          if (isEligibleAnalyticsRoute(pathnameRef.current)) {
            applyTrackingRestore(GA_MEASUREMENT_ID);
            setIsReady(true);
          }
        }
      } else {
        // Consent revoked: Apply complete shutdown (disable flag + consent denied + cookie purge)
        applyTrackingShutdown(GA_MEASUREMENT_ID);
        setIsReady(false);
        lastTrackedPathRef.current = null;
      }
    };

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
    };
  }, [pathname]);

  // 2. Handle route transitions: dynamic private-route shielding
  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    const isPublic = isEligibleAnalyticsRoute(pathname);

    // If returning user navigates from private route to public route for the first time
    if (hasConsent && isPublic && !shouldLoadScript) {
      setShouldLoadScript(true);
    }

    // Dynamic tracking pause / resume when tag is already configured
    if (typeof window !== "undefined" && isConfiguredRef.current) {
      if (!isPublic || !hasConsent) {
        // Private route or consent absent: apply tracking shutdown
        applyTrackingShutdown(GA_MEASUREMENT_ID);
        setIsReady(false);
        lastTrackedPathRef.current = null;
      } else {
        // Public route with active consent: restore tracking
        applyTrackingRestore(GA_MEASUREMENT_ID);
        setIsReady(true);
      }
    }
  }, [pathname, hasConsent, shouldLoadScript]);

  // 3. Track client-side page views on eligible public route transitions
  useEffect(() => {
    if (!isAnalyticsConfigured() || !hasConsent || !isReady) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    // Guard: Prevent tracking on private routes (/portal, /login, /register, error pages)
    if (!isEligibleAnalyticsRoute(pathname)) {
      return;
    }

    const cleanPath = cleanPagePath(pathname);

    // Deduplicate identical paths (e.g. repeated re-renders or hash changes)
    if (lastTrackedPathRef.current === cleanPath) return;
    lastTrackedPathRef.current = cleanPath;

    try {
      window.gtag("event", "page_view", {
        page_title: document.title || "pyBIM",
        page_location: `${window.location.origin}${cleanPath}`,
        page_path: cleanPath,
        hostname: window.location.hostname,
        locale: locale || "en",
        send_to: GA_MEASUREMENT_ID,
      });
    } catch {
      // Fail-safe: analytics logging errors must never affect user experience
    }
  }, [pathname, hasConsent, isReady, locale]);

  // Callback when external gtag script has finished loading
  const handleScriptLoad = () => {
    if (typeof window === "undefined") return;

    // Ensure dataLayer & gtag are ready (defensive in case not yet created)
    initializeGtagConsentDefaults();

    // 1. RACE CONDITION DEFENSE: Check latest state before configuring granted consent
    const latestConsent = hasConsentRef.current;
    const latestRouteEligible = isEligibleAnalyticsRoute(pathnameRef.current);
    const allowTracking = latestConsent && latestRouteEligible;

    if (!allowTracking) {
      // Consent was revoked or user navigated to private route while script was downloading
      applyTrackingShutdown(GA_MEASUREMENT_ID);
    } else {
      // Safe to initialize tracking: update analytics_storage to granted
      applyTrackingRestore(GA_MEASUREMENT_ID);
    }

    // 2. Configure measurement ID with privacy restrictions and disabled auto page views.
    // Explicitly configure linker domains for multi-domain canonicals (pybim.com & pybim.it)
    // so Google Tag decorates cross-domain anchors with _gl and accepts incoming linker parameters.
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      restricted_data_processing: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      linker: {
        domains: ["pybim.com", "pybim.it", "www.pybim.com", "www.pybim.it"],
        accept_incoming: true,
      },
    });

    isConfiguredRef.current = true;
    if (allowTracking) {
      setIsReady(true);
    }
  };

  // If GA4 is not configured via valid build-time Measurement ID, render nothing
  if (!isAnalyticsConfigured()) {
    return null;
  }

  // If script loading condition is not met, do not inject the Script
  if (!shouldLoadScript) {
    return null;
  }

  return (
    <Script
      id="ga4-tag-script"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      onLoad={handleScriptLoad}
    />
  );
}
