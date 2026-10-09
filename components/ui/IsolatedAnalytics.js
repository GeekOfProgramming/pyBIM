"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function IsolatedAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      try {
        if (typeof window === "undefined") return false;
        const raw = localStorage.getItem("cookie_consent");
        if (!raw) return false;
        if (raw === "all") return true;
        if (raw === "rejected") return false;
        const parsed = JSON.parse(raw);
        return Boolean(parsed?.analytics);
      } catch {
        return false;
      }
    };

    setHasConsent(readConsent());

    const handleConsentUpdated = (e) => {
      const allowed = e?.detail?.analytics !== undefined ? Boolean(e.detail.analytics) : readConsent();
      setHasConsent(allowed);
      if (!allowed && typeof window !== "undefined") {
        // Invalidate in-memory tracker when user revokes analytics consent
        if (window.va) {
          window.va = () => {};
        }
        if (window.vaq) {
          window.vaq = [];
        }
      }
    };

    window.addEventListener("cookie_consent_updated", handleConsentUpdated);
    window.addEventListener("cookie_consent_accepted", () => handleConsentUpdated({ detail: { analytics: true } }));

    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentUpdated);
    };
  }, []);

  if (!hasConsent) return null;

  return <Analytics />;
}
