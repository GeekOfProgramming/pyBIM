"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Briefcase, Code2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function B2BCollaborationCTA() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-base w-full py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">

          {/* Card 1 For Clients */}
          <div className="rounded-[2.5rem] border border-brand-border bg-white dark:bg-slate-900 shadow-lg p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-primary/5 transition-colors" />
            <div className="relative z-10 w-full mb-10">
              <div className="flex items-center gap-4 mb-6">
                <Briefcase className="w-10 h-10 text-brand-primary/60 group-hover:text-brand-primary transition-colors" />
                <div className="text-sm font-mono font-bold text-brand-primary tracking-wider">{t("about.cta.c1_tag")}</div>
              </div>
              <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-4">
                {t("about.cta.c1_title")}
              </h3>
              <p className="text-brand-textSecondary text-base font-medium leading-relaxed mb-8">
                {t("about.cta.c1_subtitle")}
              </p>
              <div className="bg-brand-surface/50 border border-brand-border rounded-2xl p-6 space-y-5">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-textSecondary mb-2">{t("about.cta.c1_box_title")}</div>
                
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c1_item1_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item1_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c1_item2_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item2_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c1_item3_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item3_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c1_item4_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item4_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c1_item5_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c1_item5_desc") }} />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <Link href="/contact#calculator" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-surface px-8 py-4 font-bold text-brand-textPrimary hover:bg-white dark:hover:bg-slate-800 hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all mb-6 uppercase text-sm tracking-wider">
                {t("about.cta.c1_btn")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-brand-textSecondary italic leading-relaxed border-t border-brand-border/60 pt-4">
                {t("about.cta.c1_sub")}
              </p>
            </div>
          </div>

          {/* Card 2 For Talent */}
          <div className="rounded-[2.5rem] border border-brand-primary/20 bg-white dark:bg-slate-900 shadow-xl p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
            <div className="relative z-10 w-full mb-10">
              <div className="flex items-center gap-4 mb-6">
                <Code2 className="w-10 h-10 text-brand-primary" />
                <div className="text-sm font-mono font-bold text-brand-primary tracking-wider">{t("about.cta.c2_tag")}</div>
              </div>
              <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-4">
                {t("about.cta.c2_title")}
              </h3>
              <p className="text-brand-textSecondary text-base font-medium leading-relaxed mb-8">
                {t("about.cta.c2_subtitle")}
              </p>
              <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 space-y-5">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2">{t("about.cta.c2_box_title")}</div>
                
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c2_item1_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item1_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c2_item2_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item2_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c2_item3_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item3_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c2_item4_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item4_desc") }} />
                </div>
                <div>
                  <strong className="text-brand-textPrimary text-sm block mb-1">{t("about.cta.c2_item5_title")}</strong>
                  <span className="text-brand-textSecondary text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.cta.c2_item5_desc") }} />
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full">
              <Link href="/careers#positions" className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-bold text-white hover:bg-brand-accentHover transition-all shadow-md hover:shadow-lg hover:-translate-y-1 mb-6 uppercase text-sm tracking-wider">
                {t("about.cta.c2_btn")} <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-brand-textSecondary/80 italic leading-relaxed border-t border-brand-primary/10 pt-4">
                {t("about.cta.c2_sub")}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
