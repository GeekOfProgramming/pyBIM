"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ShieldCheck, Lock, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";

export default function PrivacyPolicyClient() {
  const { t } = useLanguage();

  return (
    <div className="bg-brand-base min-h-[70vh] py-16 md:py-24 px-6 lg:px-8 border-b border-brand-border">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header Section */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3.5 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-textPrimary tracking-tight">
                {t("privacy.hero.title")}
              </h1>
              <p className="text-sm font-mono text-brand-textSecondary mt-1">
                pybim.com — GDPR & Privacy Compliance Policy
              </p>
            </div>
          </div>
          <p className="text-base text-brand-textSecondary leading-relaxed">
            {t("privacy.intro")}
          </p>
        </div>

        {/* Iubenda Hosted Verification Card */}
        <div className="rounded-2xl border border-brand-primary/20 bg-brand-surface p-6 md:p-8 space-y-4 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t("privacy.iubenda.badge")}
              </span>
              <h2 className="text-lg font-bold text-brand-textPrimary pt-1">
                {t("privacy.iubenda.title")}
              </h2>
            </div>
          </div>
          <p className="text-sm text-brand-textSecondary leading-relaxed">
            {t("privacy.iubenda.desc")}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://www.iubenda.com/privacy-policy/49952074"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-actionPrimary hover:bg-brand-actionPrimaryHover text-white text-sm font-medium transition shadow-xs"
            >
              <span>{t("privacy.iubenda.button")}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/cookie-policy"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-base border border-brand-border text-brand-textPrimary hover:bg-brand-surface text-sm font-medium transition"
            >
              <span>{t("privacy.iubenda.cookie_link")}</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Structured Legal Sections */}
        <div className="space-y-6">

          {/* Section 1: Controller */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec1.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec1.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-brand-textSecondary pl-1 font-mono">
              <li>{t("privacy.sec1.list1")}</li>
              <li>{t("privacy.sec1.list2")}</li>
              <li>{t("privacy.sec1.list3")}</li>
              <li>{t("privacy.sec1.list4")}</li>
            </ul>
          </section>

          {/* Section 2: Data Types */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec2.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec2.desc")}
            </p>
            <div className="space-y-3 pl-2 border-l-2 border-brand-border">
              <div>
                <strong className="text-sm font-semibold text-brand-textPrimary block">
                  {t("privacy.sec2.item1.title")}
                </strong>
                <span className="text-sm text-brand-textSecondary leading-relaxed">
                  {t("privacy.sec2.item1.desc")}
                </span>
              </div>
              <div>
                <strong className="text-sm font-semibold text-brand-textPrimary block">
                  {t("privacy.sec2.item2.title")}
                </strong>
                <span className="text-sm text-brand-textSecondary leading-relaxed">
                  {t("privacy.sec2.item2.desc")}
                </span>
              </div>
            </div>
          </section>

          {/* Section 3: Purposes */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec3.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec3.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("privacy.sec3.item1")}</li>
              <li>{t("privacy.sec3.item2")}</li>
              <li>{t("privacy.sec3.item3")}</li>
              <li>{t("privacy.sec3.item4")}</li>
            </ul>
          </section>

          {/* Section 4: Legal Basis */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec4.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec4.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("privacy.sec4.item1")}</li>
              <li>{t("privacy.sec4.item2")}</li>
              <li>{t("privacy.sec4.item3")}</li>
            </ul>
          </section>

          {/* Section 5: Retention */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec5.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec5.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("privacy.sec5.item1")}</li>
              <li>{t("privacy.sec5.item2")}</li>
              <li>{t("privacy.sec5.item3")}</li>
            </ul>
          </section>

          {/* Section 6: Data Sharing */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec6.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec6.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("privacy.sec6.item1")}</li>
              <li>{t("privacy.sec6.item2")}</li>
              <li>{t("privacy.sec6.item3")}</li>
            </ul>
          </section>

          {/* Section 7: Security */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <Lock className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec7.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec7.desc")}
            </p>
          </section>

          {/* Section 8: User Rights */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-primary" />
              {t("privacy.sec8.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("privacy.sec8.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("privacy.sec8.item1")}</li>
              <li>{t("privacy.sec8.item2")}</li>
              <li>{t("privacy.sec8.item3")}</li>
              <li>{t("privacy.sec8.item4")}</li>
            </ul>
            <p className="text-sm text-brand-textSecondary pt-2 font-mono">
              {t("privacy.sec8.contact")}
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
