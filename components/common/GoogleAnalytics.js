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
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * GoogleAnalytics Component
 *
 * Privacy-First, Complete Tracking Isolation GA4 loader.
 * Lifecycle Architecture:
 * 1. Initial State:
 *    - Unconfigured Measurement ID: renders null.
 *    - No consent OR private initial route: renders null, zero script injection.
 * 2. Script Injection:
 *    - ONLY triggers when BOTH user consent === true AND current route is an eligible public route.
 * 3. Race Condition Defense during Script Loading:
 *    - Before executing gtag initialization in onLoad, re-verifies the latest consent and route state.
 *    - If consent was revoked or route became private while the script downloaded, initializes with
 *      analytics_storage: 'denied' and window['ga-disable-G-XXXX'] = true.
 * 4. Tracking Shutdown:
 *    - When consent is revoked OR route is private:
 *      a) window['ga-disable-G-XXXX'] = true
 *      b) gtag('consent', 'update', { analytics_storage: 'denied' })
 *      c) Cookies wiped
 * 5. Tracking Restore:
 *    - When consent is valid AND route is public:
 *      a) window['ga-disable-G-XXXX'] = false
 *      b) gtag('consent', 'update', { analytics_storage: 'granted' })
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

    // 1. Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    // 2. Set timestamp
    window.gtag("js", new Date());

    // 3. RACE CONDITION DEFENSE: Check latest state before configuring granted consent
    const latestConsent = hasConsentRef.current;
    const latestRouteEligible = isEligibleAnalyticsRoute(pathnameRef.current);
    const allowTracking = latestConsent && latestRouteEligible;

    if (!allowTracking) {
      // Consent was revoked or user navigated to private route while script was downloading
      applyTrackingShutdown(GA_MEASUREMENT_ID);
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });
    } else {
      // Safe to initialize tracking
      applyTrackingRestore(GA_MEASUREMENT_ID);
      window.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });
    }

    // 4. Configure measurement ID with privacy restrictions and disabled auto page views
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      restricted_data_processing: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
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
