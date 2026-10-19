"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { ShieldCheck, FileText, Scale, ExternalLink } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";

export default function TermsAndConditionsClient() {
  const { t } = useLanguage();

  return (
    <div className="bg-brand-base min-h-[70vh] py-16 md:py-24 px-6 lg:px-8 border-b border-brand-border">
      <div className="mx-auto max-w-4xl space-y-8">

        {/* Header Section */}
        <div className="bg-brand-surface rounded-2xl border border-brand-border p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3.5 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-textPrimary tracking-tight">
                {t("terms.hero.title")}
              </h1>
              <p className="text-sm font-mono text-brand-textSecondary mt-1">
                pybim.com — Terms of Use & B2B Service Framework
              </p>
            </div>
          </div>
          <p className="text-base text-brand-textSecondary leading-relaxed">
            {t("terms.intro")}
          </p>
        </div>

        {/* B2B Framework Clarification Notice */}
        <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-brand-textPrimary">
                {t("terms.notice.title")}
              </h2>
              <p className="text-sm text-brand-textSecondary leading-relaxed">
                {t("terms.notice.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Structured Sections */}
        <div className="space-y-6">
          {/* Section 1: Scope */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec1.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec1.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("terms.sec1.item1")}</li>
              <li>{t("terms.sec1.item2")}</li>
            </ul>
          </section>

          {/* Section 2: Inquiries & ROI */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec2.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec2.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("terms.sec2.item1")}</li>
              <li>{t("terms.sec2.item2")}</li>
            </ul>
          </section>

          {/* Section 3: Intellectual Property */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec3.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec3.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("terms.sec3.item1")}</li>
              <li>{t("terms.sec3.item2")}</li>
            </ul>
          </section>

          {/* Section 4: Conduct */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec4.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec4.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("terms.sec4.item1")}</li>
              <li>{t("terms.sec4.item2")}</li>
            </ul>
          </section>

          {/* Section 5: Liability */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec5.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec5.desc")}
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-textSecondary pl-1">
              <li>{t("terms.sec5.item1")}</li>
              <li>{t("terms.sec5.item2")}</li>
            </ul>
          </section>

          {/* Section 6: Contact & Desks */}
          <section className="bg-brand-surface rounded-2xl border border-brand-border p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-primary" />
              {t("terms.sec6.title")}
            </h2>
            <p className="text-sm text-brand-textSecondary leading-relaxed">
              {t("terms.sec6.desc")}
            </p>
            <p className="text-sm text-brand-textSecondary">
              {t("terms.sec6.contact")}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
              <Link href="/privacy-policy" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                <span>Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="/security" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                <span>Enterprise Security</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <Link href="/contact" className="text-brand-primary hover:underline inline-flex items-center gap-1">
                <span>Contact Desk</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
