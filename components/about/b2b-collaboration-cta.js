"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Briefcase, Code2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function B2BCollaborationCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-base w-full py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("about.cta.section_tag")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4">
            {t("about.cta.section_title")}
          </h2>
          <p className="text-base sm:text-lg font-sans text-brand-textSecondary leading-relaxed">
            {t("about.cta.section_subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-12">

          {/* Card 1 For Clients */}
          <div className="xl:col-span-7 rounded-[2.5rem] border-2 border-brand-primary/40 dark:border-brand-primary/50 bg-brand-cardElevated shadow-md p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/70 transition-colors">
            <div className="relative z-10 w-full mb-10">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="rounded-xl p-2.5 bg-brand-primary/10 text-brand-primary">
                  <Briefcase className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">{t("about.cta.c1_tag")}</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-textPrimary leading-tight mb-4 tracking-tight">
                {t("about.cta.c1_title")}
              </h3>
              <p className="text-brand-textSecondary text-base font-normal leading-relaxed mb-8">
                {t("about.cta.c1_subtitle")}
              </p>
              <div className="bg-brand-surface/70 dark:bg-slate-900/60 border border-brand-border/80 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-textSecondary mb-2">{t("about.cta.c1_box_title")}</div>
                
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c1_item1_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item1_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c1_item2_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item2_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c1_item3_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item3_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c1_item4_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item4_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c1_item5_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item5_desc") }} />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <Link href="/contact#calculator" className="inline-flex w-full md:w-auto items-center justify-center gap-2.5 rounded-full bg-brand-accentAction px-8 py-4 min-h-[52px] font-bold text-brand-accentOnAction hover:bg-brand-accentHover hover:shadow-lg transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-accentAction focus:ring-offset-2 dark:focus:ring-offset-slate-900 mb-6 uppercase text-sm tracking-wider shadow-sm">
                {t("about.cta.c1_btn")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-brand-textSecondary italic leading-relaxed border-t border-brand-border/60 dark:border-slate-800/60 pt-4">
                {t("about.cta.c1_sub")}
              </p>
            </div>
          </div>

          {/* Card 2 For Talent */}
          <div className="xl:col-span-5 rounded-[2.5rem] border border-brand-border/80 dark:border-slate-800/80 bg-brand-cardElevated shadow-sm p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-border dark:hover:border-slate-700 transition-colors">
            <div className="relative z-10 w-full mb-10">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="rounded-xl p-2.5 bg-slate-100 dark:bg-slate-800/80 text-brand-textSecondary border border-slate-200/60 dark:border-slate-700/60">
                  <Code2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <div className="text-xs font-mono font-bold text-brand-textSecondary tracking-widest uppercase">{t("about.cta.c2_tag")}</div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-textPrimary leading-tight mb-4 tracking-tight">
                {t("about.cta.c2_title")}
              </h3>
              <p className="text-brand-textSecondary text-base font-normal leading-relaxed mb-8">
                {t("about.cta.c2_subtitle")}
              </p>
              <div className="bg-brand-surface/40 dark:bg-slate-900/40 border border-brand-border/70 dark:border-slate-800/70 rounded-2xl p-6 sm:p-7 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-textSecondary mb-2">{t("about.cta.c2_box_title")}</div>
                
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c2_item1_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item1_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c2_item2_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item2_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c2_item3_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item3_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c2_item4_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item4_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm font-semibold block mb-1">{t("about.cta.c2_item5_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item5_desc") }} />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <Link href="/careers#positions" className="inline-flex w-full md:w-auto items-center justify-center gap-2.5 rounded-full border border-brand-border hover:border-brand-primary/50 dark:border-slate-700 dark:hover:border-slate-600 bg-brand-surface/60 hover:bg-brand-surface dark:bg-slate-800/40 dark:hover:bg-slate-800/80 px-8 py-4 min-h-[52px] font-bold text-brand-textPrimary hover:text-brand-primary transition-all focus:outline-hidden focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-2 dark:focus:ring-offset-slate-900 mb-6 uppercase text-sm tracking-wider shadow-sm">
                {t("about.cta.c2_btn")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-brand-textSecondary/80 italic leading-relaxed border-t border-brand-border/60 dark:border-slate-800/60 pt-4">
                {t("about.cta.c2_sub")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
