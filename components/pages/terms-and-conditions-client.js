"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Info, FileText, Scale, ExternalLink, ChevronRight, Handshake, HelpCircle } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import LegalPageShell from "@/components/common/LegalPageShell";

export default function TermsAndConditionsClient() {
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
            {t("terms.hero.title")}
          </li>
        </ol>
      </nav>

      {/* Header / Hero Section */}
      <header className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 md:p-10 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
            <Scale className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <span className="text-technical font-mono uppercase tracking-wider text-brand-primary font-semibold block mb-1">
              Legal Notice & Engagement Framework
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-textPrimary">
              {t("terms.hero.title")}
            </h1>
          </div>
        </div>
        <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7] max-w-3xl">
          {t("terms.intro")}
        </p>
      </header>

      {/* Publication Status & Framework Clarification Notice */}
      <section
        aria-labelledby="terms-status-heading"
        className="rounded-2xl border border-brand-primary/25 bg-brand-surface p-6 sm:p-8 space-y-3 shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-technical font-mono font-semibold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            {t("terms.status.badge")}
          </span>
        </div>
        <h2 id="terms-status-heading" className="text-lg sm:text-xl font-bold text-brand-textPrimary pt-1">
          {t("terms.status.title")}
        </h2>
        <p className="text-[15px] text-brand-textSecondary leading-[1.7]">
          {t("terms.status.desc")}
        </p>
      </section>

      {/* Structured Legal Sections */}
      <div className="space-y-6">

        {/* Section 1: Scope */}
        <section
          aria-labelledby="terms-sec1-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="terms-sec1-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("terms.sec1.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("terms.sec1.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec1.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec1.item2")}</span>
            </li>
          </ul>
        </section>

        {/* Section 2: Inquiries & ROI (Elevated background) */}
        <section
          aria-labelledby="terms-sec2-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <FileText className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="terms-sec2-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("terms.sec2.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("terms.sec2.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec2.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec2.item2")}</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Intellectual Property */}
        <section
          aria-labelledby="terms-sec3-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Scale className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="terms-sec3-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("terms.sec3.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("terms.sec3.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec3.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec3.item2")}</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Separate B2B Agreements (Elevated background) */}
        <section
          aria-labelledby="terms-sec4-heading"
          className="rounded-2xl border border-brand-border bg-brand-cardElevated p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Handshake className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="terms-sec4-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("terms.sec4.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("terms.sec4.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec4.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec4.item2")}</span>
            </li>
          </ul>
        </section>

        {/* Section 5: Availability & Contact */}
        <section
          aria-labelledby="terms-sec5-heading"
          className="rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <HelpCircle className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2 id="terms-sec5-heading" className="text-xl sm:text-card-title font-bold text-brand-textPrimary">
              {t("terms.sec5.title")}
            </h2>
          </div>
          <p className="text-[15px] sm:text-body text-brand-textSecondary leading-[1.7]">
            {t("terms.sec5.desc")}
          </p>
          <ul className="space-y-2.5 text-[15px] sm:text-body text-brand-textSecondary pl-1">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec5.item1")}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2.5 shrink-0" />
              <span className="leading-[1.7]">{t("terms.sec5.item2")}</span>
            </li>
          </ul>

          <div className="pt-4 mt-2 border-t border-brand-border flex flex-wrap gap-3">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-base border border-brand-border hover:bg-brand-surface text-brand-textPrimary text-xs font-mono font-medium transition"
            >
              <span>Privacy Policy</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-base border border-brand-border hover:bg-brand-surface text-brand-textPrimary text-xs font-mono font-medium transition"
            >
              <span>Enterprise Security</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-base border border-brand-border hover:bg-brand-surface text-brand-textPrimary text-xs font-mono font-medium transition"
            >
              <span>Contact Desk</span>
              <ChevronRight className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
            </Link>
          </div>
        </section>

      </div>
    </LegalPageShell>
  );
}
