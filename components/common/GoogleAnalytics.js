"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  isEligibleAnalyticsRoute,
  cleanPagePath,
  cleanupGoogleAnalyticsCookies,
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * GoogleAnalytics Component
 *
 * Privacy-First, Basic Consent Mode GA4 loader.
 * Lifecycle Architecture:
 * 1. Initial State: If user has not consented, zero scripts load (Basic Consent Mode).
 * 2. First Acceptance: Script is mounted and loads gtag.js. Once loaded, dataLayer & consent default are set.
 * 3. Consent Revocation: Updates analytics_storage to 'denied', wipes _ga* cookies, pauses tracking.
 * 4. Consent Reactivation: Updates analytics_storage to 'granted', resumes tracking without remounting or duplicate page views.
 * 5. Private-Route Shielding:
 *    - On private routes (/portal/*, /login, /register, api, error), analytics_storage is dynamically paused ('denied').
 *    - Returning to an approved public route restores analytics_storage to 'granted' (if user consent is active).
 * 6. Deduplicated page_view: Emits exactly one manual page_view on eligible public route transitions.
 */
export default function GoogleAnalytics({ locale = "en" }) {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);
  const [shouldLoadScript, setShouldLoadScript] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const lastTrackedPathRef = useRef(null);
  const isScriptLoadedRef = useRef(false);
  const isConfiguredRef = useRef(false);

  // 1. Synchronize consent state from localStorage and listen for updates
  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    // Read stored consent on mount
    const initialConsent = getStoredAnalyticsConsent();
    setHasConsent(initialConsent);
    if (initialConsent) {
      setShouldLoadScript(true);
    }

    const handleConsentUpdate = (e) => {
      const allowed = e?.detail?.analytics === true;
      setHasConsent(allowed);

      if (allowed) {
        // User accepted consent: ensure script is triggered to load
        setShouldLoadScript(true);

        // If tag is already loaded in page memory from earlier, explicitly re-grant consent
        if (typeof window !== "undefined" && typeof window.gtag === "function" && isConfiguredRef.current) {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      } else {
        // Consent revoked: update Google tag consent state to denied and wipe cookies
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
        cleanupGoogleAnalyticsCookies();
        lastTrackedPathRef.current = null;
      }
    };

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
    };
  }, []);

  // 2. Handle private-route transitions when Google Tag is already loaded
  useEffect(() => {
    if (!isAnalyticsConfigured() || !hasConsent || !isReady) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const isPublic = isEligibleAnalyticsRoute(pathname);

    if (!isPublic) {
      // Navigated into private route: pause analytics storage to prevent automatic event collection
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
      lastTrackedPathRef.current = null;
    } else {
      // Navigated back to an approved public route: restore analytics storage
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, [pathname, hasConsent, isReady]);

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

  // Helper called when external gtag script has finished loading
  const handleScriptLoad = () => {
    isScriptLoadedRef.current = true;
    if (typeof window === "undefined") return;

    // Deterministic initialization sequence:
    // 1. Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    // 2. Set timestamp
    window.gtag("js", new Date());

    // 3. Set default consent state: advertising always denied, analytics granted
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });

    // 4. Configure measurement ID with privacy restrictions and disabled auto page views
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      restricted_data_processing: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    isConfiguredRef.current = true;
    setIsReady(true);
  };

  // If GA4 is not configured via valid build-time Measurement ID, render nothing
  if (!isAnalyticsConfigured()) {
    return null;
  }

  // If user has never consented, do not inject the Script (Basic Consent Mode)
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
