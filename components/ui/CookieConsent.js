"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    setIsVisible(false);
    // Emit event to enable isolated scripts (e.g. Analytics)
    window.dispatchEvent(new Event("cookie_consent_accepted"));
    // Alternatively, reload to apply scripts cleanly
    // window.location.reload();
  };

  const handleCustomize = () => {
    // Placeholder for Iubenda customization modal
    alert("Iubenda customization preferences will open here.");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-24 lg:pb-6 pointer-events-none">
      <div className="mx-auto max-w-5xl rounded-3xl border border-brand-border bg-white shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row items-center justify-between p-6 gap-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-brand-primary/10 p-3 rounded-full hidden sm:block">
            <ShieldCheck className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h3 className="font-bold text-brand-textPrimary text-lg mb-2">Your Privacy is Our Priority</h3>
            <p className="text-brand-textSecondary text-sm leading-relaxed max-w-2xl font-medium">
              We use cookies to improve your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with our <Link href="/privacy-policy" className="text-brand-primary font-bold hover:underline">Privacy Policy</Link> and <Link href="/cookie-policy" className="text-brand-primary font-bold hover:underline">Cookie Policy</Link>.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <button 
            onClick={handleCustomize}
            className="px-6 py-3 rounded-xl border border-brand-border bg-brand-surface text-brand-textPrimary font-semibold hover:border-brand-primary/30 transition-colors w-full sm:w-auto"
          >
            Customize
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-6 py-3 rounded-xl bg-brand-accent text-white font-bold hover:bg-brand-accentHover hover:-translate-y-0.5 transition-all w-full sm:w-auto shadow-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
