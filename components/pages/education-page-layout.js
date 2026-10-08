"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  BookOpen, 
  FileText, 
  Wrench, 
  GraduationCap,
  Clock,
  Info,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";

export default function EducationPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  const previewAreas = [
    {
      num: "01",
      icon: BookOpen,
      title: t("education.area1.title") || "BIM Tutorials & Guides",
      desc: t("education.area1.desc") || "Practical learning material for BIM workflows and engineering software.",
      status: t("education.statusBadge") || "IN PREPARATION"
    },
    {
      num: "02",
      icon: FileText,
      title: t("education.area2.title") || "Engineering Notes & Updates",
      desc: t("education.area2.desc") || "Technical articles and updates focused on relevant engineering topics.",
      status: t("education.statusBadge") || "IN PREPARATION"
    },
    {
      num: "03",
      icon: Wrench,
      title: t("education.area3.title") || "Workflow & Tool Guides",
      desc: t("education.area3.desc") || "Guidance on engineering workflows and selected tools as material becomes available.",
      status: t("education.statusBadge") || "IN PREPARATION"
    }
  ];

  // Headline extraction supporting two-part display across all locales
  const headlinePart1 = t("education.headlinePart1") || "Engineering Knowledge.";
  const headlinePart2 = t("education.headlinePart2") || "Coming Soon.";
  const eyebrowText = t("education.eyebrow") || "pyBIM Education & Training";

  // Animation variants respecting reduced motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] bg-brand-base flex flex-col justify-center overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 35%, black 30%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient Lighting Gradient */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-gradient-to-b from-blue-500/12 via-cyan-500/08 to-transparent blur-3xl opacity-75 dark:opacity-60" 
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20 lg:py-24 w-full z-10">
        
        {/* Asymmetrical Editorial Composition: 60% Left Hero / 40% Right Knowledge Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* ================= LEFT COLUMN: Editorial Hero & Actions ================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow & Calm In Preparation Status */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              {/* Brand Eyebrow Badge (Guarantees pyBIM is never uppercase-forced) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/25 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-caption font-mono font-bold tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>
                  {eyebrowText.includes("pyBIM") ? (
                    <>
                      <span className="normal-case">pyBIM</span>
                      {eyebrowText.replace("pyBIM", "")}
                    </>
                  ) : (
                    eyebrowText
                  )}
                </span>
              </div>

              {/* Calm, Dignified Status Badge without intrusive pulse */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                <span>{t("education.statusBadge") || "IN PREPARATION"}</span>
              </div>
            </motion.div>

            {/* Two-Part Editorial Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-6 leading-[1.1]"
            >
              <span>{headlinePart1}</span>{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                {headlinePart2}
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {t("education.description")}
            </motion.p>

            {/* CTA Group Standardized with Shared CtaLink Component */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6"
            >
              <CtaLink
                href="/services"
                variant="primary"
              >
                {t("education.primaryCta") || "Explore Our Services"}
              </CtaLink>

              <CtaLink
                href="/contact"
                variant="secondary"
              >
                {t("education.secondaryCta") || "Contact pyBIM"}
              </CtaLink>
            </motion.div>

            {/* Secondary Preparation Note */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
            >
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
              <span>{t("education.secondaryNote")}</span>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Architectural Knowledge Preview Panel ================= */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
            role="region"
            aria-labelledby={`${baseId}-preview-heading`}
          >
            {/* Single Architectural Knowledge Panel */}
            <div className="rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 border border-brand-border/80 shadow-xl shadow-brand-base/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md p-6 sm:p-7 relative overflow-hidden">
              
              {/* Panel Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-border/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                  <h2 
                    id={`${baseId}-preview-heading`}
                    className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary"
                  >
                    {t("education.previewEyebrow") || "KNOWLEDGE AREAS"}
                  </h2>
                </div>

                <span className="text-technical font-mono uppercase tracking-widest text-brand-textSecondary px-2.5 py-0.5 rounded-md bg-brand-surface border border-brand-border/60">
                  {t("education.moduleCount") || "3 CONTENT AREAS"}
                </span>
              </div>

              {/* Three Structured Informational Areas */}
              <div className="space-y-3">
                {previewAreas.map((area, idx) => {
                  const IconComponent = area.icon;

                  return (
                    <article
                      key={area.num}
                      className="p-4 rounded-2xl bg-brand-surface/70 border border-brand-border/70 hover:border-brand-primary/30 transition-colors flex items-start gap-3.5"
                    >
                      {/* Numeric Index Badge */}
                      <span className="w-8 h-8 rounded-xl bg-brand-card border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0 mt-0.5">
                        {area.num}
                      </span>

                      {/* Content Area Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                          <h3 className="text-body-sm font-bold text-brand-textPrimary tracking-tight leading-snug">
                            {area.title}
                          </h3>
                        </div>
                        <p className="text-caption text-brand-textSecondary font-medium leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Panel Footer Annotation */}
              <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                  <span>pyBIM · KNOWLEDGE-PREVIEW</span>
                </span>
                <span className="text-brand-primary font-bold">
                  // 2026
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
