"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";

export default function IsolatedAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial state
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "all") {
      setHasConsent(true);
    }

    // Listen for consent changes without reloading
    const handleConsent = () => {
      const updatedConsent = localStorage.getItem("cookie_consent");
      if (updatedConsent === "all") {
        setHasConsent(true);
      }
    };

    window.addEventListener("cookie_consent_accepted", handleConsent);
    return () => window.removeEventListener("cookie_consent_accepted", handleConsent);
  }, []);

  if (!hasConsent) return null;

  // Once consent is given, render the tracking scripts
  return <Analytics />;
}
