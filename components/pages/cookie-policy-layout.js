"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Cookie, ShieldCheck, Settings, ExternalLink, FileText, CheckCircle2, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import LegalPageShell from "@/components/common/LegalPageShell";

export default function CookiePolicyLayout() {
  const { t } = useLanguage();

  const handleOpenPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open_cookie_preferences"));
    }
  };

  return (
    <LegalPageShell maxWidthClass="max-w-4xl">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pt-2">
        <ol className="flex items-center gap-2 text-xs font-mono text-brand-textSecondary">
          <li>
            <Link href="/" className="hover:text-brand-primary transition-colors">
              pybim.com
            </Link>
          </li>
          <li aria-hidden="true" className="text-brand-border">/</li>
          <li className="text-brand-textPrimary font-semibold" aria-current="page">
            {t("cookie_policy.hero.title")}
          </li>
        </ol>
      </nav>

      {/* Header / Hero Section */}
      <header className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
            <Cookie className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <span className="text-technical font-mono uppercase tracking-wider text-brand-primary font-semibold block mb-1">
              Storage & Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-textPrimary">
              {t("cookie_policy.hero.title")}
            </h1>
          </div>
        </div>
        <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7] max-w-3xl">
          {t("cookie_policy.intro")}
        </p>
      </header>

      {/* Iubenda Hosted Verification Card */}
      <section
        aria-labelledby="cookie-iubenda-heading"
        className="rounded-2xl border border-brand-primary/25 bg-brand-surface p-6 sm:p-8 space-y-4 shadow-xs"
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-technical font-mono font-semibold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              {t("cookie_policy.iubenda.badge")}
            </span>
            <h2 id="cookie-iubenda-heading" className="text-lg sm:text-xl font-bold text-brand-textPrimary pt-1">
              {t("cookie_policy.iubenda.title")}
            </h2>
          </div>
        </div>
        <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
          {t("cookie_policy.iubenda.desc")}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://www.iubenda.com/privacy-policy/49952074/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
          >
            <span>{t("cookie_policy.iubenda.button")}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-base border border-brand-border text-brand-textPrimary hover:bg-brand-surface text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <span>{t("cookie_policy.iubenda.privacy_link")}</span>
            <ChevronRight className="w-4 h-4 text-brand-textSecondary" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Structured Legal Sections */}
      <div className="space-y-6">

        {/* Section 1: Definition */}
        <section
          aria-labelledby="cookie-sec1-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="cookie-sec1-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("cookie_policy.sec1.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("cookie_policy.sec1.desc")}
          </p>
        </section>

        {/* Section 2: Storage Categories (Elevated Background) */}
        <section
          aria-labelledby="cookie-sec2-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="cookie-sec2-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("cookie_policy.sec2.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("cookie_policy.sec2.desc")}
          </p>

          <div className="space-y-4 pt-1">
            {/* Strictly Necessary */}
            <div className="p-5 sm:p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <strong className="text-sm sm:text-base font-semibold text-brand-textPrimary">
                  {t("cookie_policy.sec2.item1.title")}
                </strong>
                <span className="text-technical font-mono font-semibold uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {t("cookie.category.necessary.badge")}
                </span>
              </div>
              <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                {t("cookie_policy.sec2.item1.desc")}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm font-mono text-brand-textSecondary pl-1 pt-1 border-t border-brand-border">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold shrink-0">›</span>
                  <span>{t("cookie_policy.sec2.item1.bullet1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold shrink-0">›</span>
                  <span>{t("cookie_policy.sec2.item1.bullet2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold shrink-0">›</span>
                  <span>{t("cookie_policy.sec2.item1.bullet3")}</span>
                </li>
              </ul>
            </div>

            {/* Optional Analytics */}
            <div className="p-5 sm:p-6 rounded-xl bg-brand-base border border-brand-border space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <strong className="text-sm sm:text-base font-semibold text-brand-textPrimary">
                  {t("cookie_policy.sec2.item2.title")}
                </strong>
                <span className="text-technical font-mono font-semibold uppercase px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  User Configurable
                </span>
              </div>
              <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                {t("cookie_policy.sec2.item2.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Third Parties */}
        <section
          aria-labelledby="cookie-sec3-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="cookie-sec3-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("cookie_policy.sec3.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("cookie_policy.sec3.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("cookie_policy.sec3.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("cookie_policy.sec3.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("cookie_policy.sec3.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Preferences Control (Elevated Background & Prominent Action) */}
        <section
          aria-labelledby="cookie-sec4-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Settings className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="cookie-sec4-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("cookie_policy.sec4.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("cookie_policy.sec4.desc")}
          </p>
          <div>
            <button
              type="button"
              onClick={handleOpenPreferences}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              <span>{t("cookie_policy.sec4.button")}</span>
            </button>
          </div>
          <div className="pt-3 border-t border-brand-border">
            <p className="text-xs sm:text-sm font-mono text-brand-textSecondary leading-relaxed">
              {t("cookie_policy.sec4.browser_info")}
            </p>
          </div>
        </section>

      </div>
    </LegalPageShell>
  );
}
