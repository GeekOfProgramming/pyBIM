"use client";

import Link from "@/components/layout/LocalizedLink";
import { 
  ArrowRight, 
  BookOpen, 
  FileText, 
  Wrench, 
  GraduationCap,
  Clock
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";

export default function EducationPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const previewAreas = [
    {
      num: "01",
      icon: BookOpen,
      title: t("education.area1.title"),
      desc: t("education.area1.desc"),
      status: t("education.statusBadge")
    },
    {
      num: "02",
      icon: FileText,
      title: t("education.area2.title"),
      desc: t("education.area2.desc"),
      status: t("education.statusBadge")
    },
    {
      num: "03",
      icon: Wrench,
      title: t("education.area3.title"),
      desc: t("education.area3.desc"),
      status: t("education.statusBadge")
    }
  ];

  return (
    <main className="w-full bg-brand-base flex flex-col justify-center">
      {/* Hero / Main Holding Message Section */}
      <section 
        id="education-hero"
        className="py-16 md:py-20 lg:py-24 border-b border-brand-border bg-brand-surface relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          
          {/* Eyebrow & Preparation Status Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-caption font-mono font-bold tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
              <span>{t("education.eyebrow")}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
              <span 
                className={`w-1.5 h-1.5 rounded-full bg-amber-500 ${!shouldReduceMotion ? "animate-pulse" : ""}`} 
                aria-hidden="true" 
              />
              <span>{t("education.statusBadge")}</span>
            </div>
          </motion.div>

          {/* Main H1 Headline */}
          <motion.h1 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-6 leading-tight max-w-4xl mx-auto"
          >
            {t("education.headline")}
          </motion.h1>

          {/* Supporting Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {t("education.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white min-h-[48px] sm:min-h-[52px] px-8 py-3.5 rounded-full text-caption font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-lg group"
            >
              <span>{t("education.primaryCta")}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" aria-hidden="true" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-brand-border bg-brand-card hover:bg-brand-surface hover:border-brand-primary/40 text-brand-textSecondary hover:text-brand-primary min-h-[48px] sm:min-h-[52px] px-8 py-3.5 rounded-full text-caption font-bold uppercase tracking-wider transition-all duration-300 group"
            >
              <span>{t("education.secondaryCta")}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1 shrink-0" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Secondary Note */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.32, ease: "easeOut" }}
            className="text-caption font-mono text-brand-textSecondary/80"
          >
            {t("education.secondaryNote")}
          </motion.p>

        </div>
      </section>

      {/* Planned Knowledge Areas Preview Strip */}
      <section 
        id="education-preview"
        aria-labelledby="education-preview-heading"
        className="py-14 md:py-16 bg-brand-base"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          {/* Section Sub-header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-brand-border">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
              <h2 
                id="education-preview-heading"
                className="text-caption font-mono font-bold uppercase tracking-widest text-brand-textPrimary"
              >
                {t("education.previewEyebrow")}
              </h2>
            </div>
            <span className="text-technical font-mono text-brand-textSecondary">
              3 MODULES
            </span>
          </div>

          {/* Three Compact Horizontal Preview Rows */}
          <div className="rounded-2xl border border-brand-border bg-brand-card divide-y divide-brand-border/70 overflow-hidden shadow-sm">
            {previewAreas.map((area, idx) => {
              const IconComp = area.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-brand-surface/40 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                      {area.num}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IconComp className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                        <h3 className="text-body font-bold text-brand-textPrimary tracking-tight">
                          {area.title}
                        </h3>
                      </div>
                      <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed">
                        {area.desc}
                      </p>
                    </div>
                  </div>

                  <div className="sm:shrink-0 self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border text-technical font-mono font-semibold text-brand-textSecondary">
                      <Clock className="w-3 h-3 text-brand-primary shrink-0" aria-hidden="true" />
                      <span>{area.status}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </main>
  );
}
