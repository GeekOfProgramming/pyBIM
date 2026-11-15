"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  isAnalyticsConfigured,
  getStoredAnalyticsConsent,
  cleanPagePath,
  cleanupGoogleAnalyticsCookies,
  GA_MEASUREMENT_ID,
} from "@/lib/analytics";

/**
 * GoogleAnalytics Component
 *
 * Privacy-First, Basic Consent Mode GA4 loader.
 * - Remains completely unrendered if NEXT_PUBLIC_GA4_MEASUREMENT_ID is missing/invalid.
 * - Inactive by default; only loads gtag.js and initializes after user accepts analytics in CookieConsent.
 * - Subscribes to 'cookie_consent_updated' custom events for real-time activation/revocation.
 * - Intercepts client-side App Router route changes and emits clean page_view events without PII.
 * - Defaults all advertising, ad_storage, ad_user_data, and ad_personalization signals to 'denied'.
 */
export default function GoogleAnalytics({ locale = "en" }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastTrackedPathRef = useRef(null);

  // 1. Synchronize consent state from localStorage and listen for updates
  useEffect(() => {
    if (!isAnalyticsConfigured()) return;

    // Read stored consent on mount
    const consent = getStoredAnalyticsConsent();
    setHasConsent(consent);

    const handleConsentUpdate = (e) => {
      const allowed = Boolean(e?.detail?.analytics);
      setHasConsent(allowed);

      if (!allowed) {
        // Consent revoked: update Google tag consent state and wipe GA cookies
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "denied",
          });
        }
        cleanupGoogleAnalyticsCookies();
      }
    };

    window.addEventListener("cookie_consent_updated", handleConsentUpdate);
    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentUpdate);
    };
  }, []);

  // 2. Track client-side page views when consent is active and path changes
  useEffect(() => {
    if (!isAnalyticsConfigured() || !hasConsent || !isInitialized) return;
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;

    const queryString = searchParams ? searchParams.toString() : "";
    const cleanPath = cleanPagePath(pathname, queryString);

    // Deduplicate identical paths (e.g. hash changes or rapid re-renders)
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
  }, [pathname, searchParams, hasConsent, isInitialized, locale]);

  // If GA4 is not configured via valid Measurement ID, render nothing
  if (!isAnalyticsConfigured()) {
    return null;
  }

  // If user has not consented, render nothing (Basic Consent Mode: zero network requests)
  if (!hasConsent) {
    return null;
  }

  return (
    <>
      {/* Load gtag.js library asynchronously once consent is granted */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => {
          setIsInitialized(true);
        }}
      />
      {/* Initialize dataLayer and default consent state */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'send_page_view': false,
              'anonymize_ip': true,
              'restricted_data_processing': true,
              'allow_google_signals': false,
              'allow_ad_personalization_signals': false
            });
          `,
        }}
      />
    </>
  );
}
