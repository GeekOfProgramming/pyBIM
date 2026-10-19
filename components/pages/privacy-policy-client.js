"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ShieldCheck, Lock, ExternalLink, FileText, CheckCircle2, ChevronRight, Scale } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import LegalPageShell from "@/components/common/LegalPageShell";

export default function PrivacyPolicyClient() {
  const { t } = useLanguage();

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
            {t("privacy.hero.title")}
          </li>
        </ol>
      </nav>

      {/* Header / Hero Section */}
      <header className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <span className="text-technical font-mono uppercase tracking-wider text-brand-primary font-semibold block mb-1">
              Data Protection & Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-textPrimary">
              {t("privacy.hero.title")}
            </h1>
          </div>
        </div>
        <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7] max-w-3xl">
          {t("privacy.intro")}
        </p>
      </header>

      {/* Iubenda Hosted Verification Card */}
      <section
        aria-labelledby="iubenda-registry-heading"
        className="rounded-2xl border border-brand-primary/25 bg-brand-surface p-6 sm:p-8 space-y-4 shadow-xs"
      >
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-technical font-mono font-semibold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              {t("privacy.iubenda.badge")}
            </span>
            <h2 id="iubenda-registry-heading" className="text-lg sm:text-xl font-bold text-brand-textPrimary pt-1">
              {t("privacy.iubenda.title")}
            </h2>
          </div>
        </div>
        <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
          {t("privacy.iubenda.desc")}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://www.iubenda.com/privacy-policy/49952074"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-brand-actionOnPrimary text-xs sm:text-sm font-semibold transition shadow-xs cursor-pointer"
          >
            <span>{t("privacy.iubenda.button")}</span>
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
          <Link
            href="/cookie-policy"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-base border border-brand-border text-brand-textPrimary hover:bg-brand-surface text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <span>{t("privacy.iubenda.cookie_link")}</span>
            <ChevronRight className="w-4 h-4 text-brand-textSecondary" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Structured Legal Sections with Controlled Alternation */}
      <div className="space-y-6">

        {/* Section 1: Data Controller */}
        <section
          aria-labelledby="sec1-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec1-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec1.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec1.desc")}
          </p>
          <div className="rounded-xl border border-brand-border bg-brand-base p-4 sm:p-5">
            <ul className="space-y-2 text-xs sm:text-sm font-mono text-brand-textSecondary">
              <li className="flex items-start gap-2">
                <span className="text-brand-primary shrink-0 font-bold">›</span>
                <span>{t("privacy.sec1.list1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary shrink-0 font-bold">›</span>
                <span>{t("privacy.sec1.list2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary shrink-0 font-bold">›</span>
                <span>{t("privacy.sec1.list3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-primary shrink-0 font-bold">›</span>
                <span>{t("privacy.sec1.list4")}</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Data Types (Elevated background) */}
        <section
          aria-labelledby="sec2-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec2-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec2.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec2.desc")}
          </p>
          <div className="space-y-3 pt-1">
            <div className="rounded-xl border border-brand-border bg-brand-base p-4 sm:p-5 space-y-1.5">
              <strong className="text-sm font-semibold text-brand-textPrimary block">
                {t("privacy.sec2.item1.title")}
              </strong>
              <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                {t("privacy.sec2.item1.desc")}
              </p>
            </div>
            <div className="rounded-xl border border-brand-border bg-brand-base p-4 sm:p-5 space-y-1.5">
              <strong className="text-sm font-semibold text-brand-textPrimary block">
                {t("privacy.sec2.item2.title")}
              </strong>
              <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
                {t("privacy.sec2.item2.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Purposes */}
        <section
          aria-labelledby="sec3-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec3-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec3.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec3.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec3.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec3.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec3.item3")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec3.item4")}</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Legal Basis (Elevated background) */}
        <section
          aria-labelledby="sec4-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Scale className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec4-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec4.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec4.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec4.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec4.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec4.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Retention */}
        <section
          aria-labelledby="sec5-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec5-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec5.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec5.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec5.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec5.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec5.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 6: Data Sharing (Elevated background) */}
        <section
          aria-labelledby="sec6-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec6-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec6.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec6.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec6.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec6.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec6.item3")}</span>
            </li>
          </ul>
        </section>

        {/* Section 7: Security */}
        <section
          aria-labelledby="sec7-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Lock className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec7-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec7.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec7.desc")}
          </p>
        </section>

        {/* Section 8: User Rights */}
        <section
          aria-labelledby="sec8-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="sec8-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("privacy.sec8.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("privacy.sec8.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec8.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec8.item2")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec8.item3")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("privacy.sec8.item4")}</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-brand-border">
            <p className="text-xs sm:text-sm font-mono text-brand-textSecondary">
              {t("privacy.sec8.contact")}
            </p>
          </div>
        </section>

      </div>
    </LegalPageShell>
  );
}
