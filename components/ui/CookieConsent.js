"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { ShieldCheck, Lock, BarChart3, X, Check } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function CookieConsent() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const { t } = useLanguage();
  const titleId = useId();

  // Read current saved preferences
  const getStoredConsent = useCallback(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("cookie_consent");
      if (!raw) return null;
      if (raw === "all") return { analytics: true };
      if (raw === "rejected") return { analytics: false };
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.analytics === "boolean") {
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      // First visit or unconfigured: banner is displayed, analytics disabled
      setIsBannerVisible(true);
      setAnalyticsEnabled(false);
    } else {
      setAnalyticsEnabled(Boolean(existing.analytics));
    }

    // Global listener to reopen settings from footer or policy links
    const handleReopen = () => {
      const current = getStoredConsent();
      setAnalyticsEnabled(Boolean(current?.analytics));
      setIsModalOpen(true);
    };

    window.addEventListener("open_cookie_preferences", handleReopen);
    return () => {
      window.removeEventListener("open_cookie_preferences", handleReopen);
    };
  }, [getStoredConsent]);

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const savePreferences = (analyticsAllowed) => {
    try {
      const consentPayload = {
        version: 1,
        necessary: true,
        analytics: Boolean(analyticsAllowed),
        timestamp: Date.now(),
      };
      localStorage.setItem("cookie_consent", JSON.stringify(consentPayload));
      setAnalyticsEnabled(Boolean(analyticsAllowed));
      setIsBannerVisible(false);
      setIsModalOpen(false);

      window.dispatchEvent(
        new CustomEvent("cookie_consent_updated", {
          detail: { analytics: Boolean(analyticsAllowed) },
        })
      );
    } catch {
      setIsBannerVisible(false);
      setIsModalOpen(false);
    }
  };

  const handleAcceptAll = () => savePreferences(true);
  const handleRejectOptional = () => savePreferences(false);
  const handleSaveModal = () => savePreferences(analyticsEnabled);

  return (
    <>
      {/* ================= COMPACT FIRST-LAYER BANNER ================= */}
      {isBannerVisible && (
        <aside
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 sm:bottom-4 inset-x-0 sm:max-w-4xl sm:mx-auto z-[60] p-2.5 sm:p-0 pointer-events-auto"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-brand-border dark:border-slate-800 bg-brand-surface/98 dark:bg-slate-900/98 shadow-2xl backdrop-blur-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
            {/* Informational Copy */}
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="hidden sm:flex shrink-0 bg-blue-500/10 dark:bg-blue-900/30 p-2.5 rounded-xl text-brand-primary dark:text-blue-400 mt-0.5">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 text-left">
                <h2 className="text-xs sm:text-sm font-bold text-brand-textPrimary mb-1 tracking-tight">
                  {t("cookie.banner.title")}
                </h2>
                <p className="text-[11px] sm:text-xs text-brand-textSecondary leading-relaxed">
                  {t("cookie.banner.desc_prefix")}{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-brand-primary dark:text-blue-400 font-semibold hover:underline"
                  >
                    {t("cookie.banner.privacy_policy")}
                  </Link>{" "}
                  {t("cookie.banner.and")}{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-brand-primary dark:text-blue-400 font-semibold hover:underline"
                  >
                    {t("cookie.banner.cookie_policy")}
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Three Real Functional Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                type="button"
                onClick={handleRejectOptional}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-base dark:bg-slate-800/80 hover:bg-brand-surface dark:hover:bg-slate-800 text-brand-textPrimary font-semibold text-xs transition-colors text-center cursor-pointer min-h-[38px]"
              >
                {t("cookie.banner.btn_reject_optional")}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-base dark:bg-slate-800/80 hover:bg-brand-surface dark:hover:bg-slate-800 text-brand-textPrimary font-semibold text-xs transition-colors text-center cursor-pointer min-h-[38px]"
              >
                {t("cookie.banner.btn_customize")}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xs transition-all text-center cursor-pointer shadow-sm min-h-[38px]"
              >
                {t("cookie.banner.btn_accept_all")}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ================= FUNCTIONAL PREFERENCES MODAL ================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-brand-card dark:bg-slate-900 border border-brand-border dark:border-slate-800 shadow-2xl p-6 sm:p-7 text-left my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-brand-textSecondary hover:text-brand-textPrimary hover:bg-brand-surface dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t("cookie.modal.btn_cancel")}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-brand-primary/10 dark:bg-blue-900/30 text-brand-primary dark:text-blue-400">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 id={titleId} className="text-xl font-bold text-brand-textPrimary tracking-tight">
                {t("cookie.modal.title")}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed mb-6">
              {t("cookie.modal.desc")}
            </p>

            {/* Preference Categories */}
            <div className="space-y-4 mb-6">
              {/* Category 1: Strictly Necessary */}
              <div className="rounded-2xl border border-brand-border dark:border-slate-800 bg-brand-surface/60 dark:bg-slate-800/50 p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold text-brand-textPrimary">
                      {t("cookie.category.necessary.title")}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    {t("cookie.category.necessary.badge")}
                  </span>
                </div>
                <p className="text-xs text-brand-textSecondary leading-relaxed">
                  {t("cookie.category.necessary.desc")}
                </p>
              </div>

              {/* Category 2: Optional Analytics */}
              <div className="rounded-2xl border border-brand-border dark:border-slate-800 bg-brand-surface/60 dark:bg-slate-800/50 p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brand-primary dark:text-blue-400 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-bold text-brand-textPrimary">
                      {t("cookie.category.analytics.title")}
                    </span>
                  </div>
                  {/* Accessible Toggle Button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analyticsEnabled}
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                      analyticsEnabled ? "bg-brand-accent" : "bg-slate-300 dark:bg-slate-700"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        analyticsEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-brand-textSecondary leading-relaxed">
                  {t("cookie.category.analytics.desc")}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-brand-border/60 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleSaveModal}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-sm text-center min-h-[40px]"
              >
                {t("cookie.modal.btn_save")}
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-xl border border-brand-border dark:border-slate-700 bg-brand-surface dark:bg-slate-800 hover:bg-brand-base dark:hover:bg-slate-700 text-brand-textPrimary font-semibold text-xs sm:text-sm transition-colors cursor-pointer text-center min-h-[40px]"
              >
                {t("cookie.modal.btn_accept_all")}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-brand-textSecondary hover:text-brand-textPrimary font-medium text-xs sm:text-sm transition-colors cursor-pointer text-center min-h-[40px]"
              >
                {t("cookie.modal.btn_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
