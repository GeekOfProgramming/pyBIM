"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Cookie, ShieldCheck, Settings, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";

export default function CookiePolicyLayout() {
  const { t } = useLanguage();

  const handleOpenPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open_cookie_preferences"));
    }
  };

  return (
    <div className="bg-brand-base min-h-[70vh] py-16 md:py-24 px-6 lg:px-8 border-b border-brand-border">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header Section */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3.5 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20">
              <Cookie className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-textPrimary tracking-tight">
                {t("cookie_policy.hero.title")}
              </h1>
              <p className="text-sm font-mono text-brand-textSecondary mt-1">
                pybim.com — Cookie & Storage Transparency Policy
              </p>
            </div>
          </div>
          <p className="text-base text-brand-textSecondary leading-relaxed">
            {t("cookie_policy.intro")}
          </p>
        </div>

        {/* Iubenda Hosted Verification Card */}
        <div className="rounded-2xl border border-brand-primary/20 bg-brand-surface p-6 md:p-8 space-y-4 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("cookie_policy.iubenda.badge")}
              </span>
              <h2 className="text-lg font-bold text-brand-textPrimary pt-1">
                {t("cookie_policy.iubenda.title")}
              </h2>
            </div>
          </div>
          <p className="text-sm text-brand-textSecondary leading-relaxed">
            {t("cookie_policy.iubenda.desc")}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://www.iubenda.com/privacy-policy/49952074/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-white text-sm font-medium transition shadow-xs"
            >
              <span>{t("cookie_policy.iubenda.button")}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-base border border-brand-border text-brand-textPrimary hover:bg-brand-surface text-sm font-medium transition"
            >
              <span>{t("cookie_policy.iubenda.privacy_link")}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Structured Legal Sections */}
        <div className="space-y-6">

          {/* Section 1: Definition */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("cookie_policy.sec1.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("cookie_policy.sec1.desc")}
            </p>
          </section>

          {/* Section 2: Storage Categories */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              {t("cookie_policy.sec2.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("cookie_policy.sec2.desc")}
            </p>

            {/* Strictly Necessary */}
            <div className="space-y-2 p-4 rounded-xl bg-brand-base border border-brand-border">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-semibold text-brand-textPrimary">
                  {t("cookie_policy.sec2.item1.title")}
                </strong>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {t("cookie.category.necessary.badge")}
                </span>
              </div>
              <p className="text-sm text-brand-textSecondary">
                {t("cookie_policy.sec2.item1.desc")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs font-mono text-brand-textSecondary pl-1">
                <li>{t("cookie_policy.sec2.item1.bullet1")}</li>
                <li>{t("cookie_policy.sec2.item1.bullet2")}</li>
                <li>{t("cookie_policy.sec2.item1.bullet3")}</li>
              </ul>
            </div>

            {/* Analytics */}
            <div className="space-y-2 p-4 rounded-xl bg-brand-base border border-brand-border">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-semibold text-brand-textPrimary">
                  {t("cookie_policy.sec2.item2.title")}
                </strong>
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  User Configurable
                </span>
              </div>
              <p className="text-sm text-brand-textSecondary">
                {t("cookie_policy.sec2.item2.desc")}
              </p>
            </div>
          </section>

          {/* Section 3: Third Parties */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("cookie_policy.sec3.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("cookie_policy.sec3.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("cookie_policy.sec3.item1")}</li>
              <li>{t("cookie_policy.sec3.item2")}</li>
              <li>{t("cookie_policy.sec3.item3")}</li>
            </ul>
          </section>

          {/* Section 4: Preferences Control */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-primary" />
              {t("cookie_policy.sec4.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("cookie_policy.sec4.desc")}
            </p>
            <div>
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-white text-sm font-medium transition cursor-pointer shadow-xs"
              >
                <Settings className="w-4 h-4" />
                <span>{t("cookie_policy.sec4.button")}</span>
              </button>
            </div>
            <p className="text-xs text-brand-textSecondary pt-2 leading-relaxed">
              {t("cookie_policy.sec4.browser_info")}
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
