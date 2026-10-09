"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { 
  Terminal, 
  MapPin, 
  Layers, 
  Cpu, 
  Network, 
  CheckCircle2, 
  Clock, 
  FlaskConical,
  Code2,
  Workflow
} from "lucide-react";

/**
 * ManifestoHero Component (Section 01 - The Manifesto Hero)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Task A01-R2: Editorial Readability & Engineering Progression Rail
 * Background Family B: variant="surface" (#F1F5F9 light / #0F172A dark)
 * 
 * Refinements:
 * - Clear editorial measure on left column: Lead for current delivery + Paragraph 2 for R&D/Standards.
 * - Right panel transformed into an integrated Engineering Progression Rail rather than 3 standalone nested boxes.
 * - Continuous visual connector with distinct stage nodes (01 Established -> 02 In-house Testing -> 03 R&D).
 * - Factual localized capability labels: no custom plugin products, no cloud engine claim.
 * - Strictly >= 12px micro-labels, full reduced-motion support.
 */
export default function ManifestoHero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const diagramItemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="manifesto" 
      className="relative w-full py-20 md:py-28 lg:py-32 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={titleId}
    >
      {/* Background Family B (Surface / Technical) */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial & Value Proposition (Cols 1 to 7)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Eyebrow & Verified Location Context */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t("about.manifesto.badge")}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-brand-textSecondary shadow-sm backdrop-blur-sm">
                <MapPin className="w-3.5 h-3.5 text-brand-primary/80" aria-hidden="true" />
                <span>{t("about.manifesto.location")}</span>
              </div>
            </motion.div>

            {/* Approved Brand Slogan Headline */}
            <motion.h1 
              id={titleId}
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-brand-textPrimary leading-[1.12] mb-6"
            >
              {t("about.manifesto.title")}
            </motion.h1>

            {/* Structured Editorial Copy: Paragraph 1 (Lead) + Paragraph 2 (R&D & Standards) */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8 max-w-2xl">
              <p className="text-base sm:text-lg text-brand-textPrimary font-medium leading-relaxed">
                {t("about.manifesto.lead")}
              </p>
              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed">
                {t("about.manifesto.rd_note")}
              </p>
            </motion.div>

            {/* Standards & Engineering Core Stack Row */}
            <motion.div 
              variants={itemVariants}
              className="w-full pt-6 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
                <span className="font-mono text-xs font-semibold text-brand-textSecondary tracking-wider uppercase">
                  {t("about.manifesto.standards_title")}
                </span>
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-sm">
                    ISO 19650
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-sm">
                    UNI 11337
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-sm">
                    Revit API
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-sm">
                    Python / C#
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Engineering Evolution Schematic (Cols 8-12) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              variants={diagramItemVariants}
              className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-slate-900/5 dark:shadow-black/20 overflow-hidden"
              role="region"
              aria-label={t("about.manifesto.aria_label")}
            >
              {/* Subtle top ambient sheen */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-brand-primary/[0.08] rounded-full blur-3xl" 
                aria-hidden="true" 
              />

              {/* Schematic Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">
                    {t("about.manifesto.diagram_eyebrow")}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-brand-textSecondary">
                  {t("about.manifesto.diagram_title")}
                </span>
              </div>

              {/* Coherent Connected Progression Rail */}
              <div className="relative pl-9 sm:pl-10 space-y-5">
                
                {/* Continuous Connecting Rail Line: perfectly centered with circular node centers (14px from left) */}
                <div 
                  className="pointer-events-none absolute left-[13px] top-4 bottom-5 w-px z-0" 
                  aria-hidden="true"
                >
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line 
                      x1="0.5" 
                      y1="0" 
                      x2="0.5" 
                      y2="100%" 
                      stroke="currentColor" 
                      className="text-slate-300 dark:text-slate-700" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4" 
                    />
                  </svg>
                </div>

                {/* --------------------------------------------------- */}
                {/* STAGE 01: Engineering Delivery (AVAILABLE NOW)      */}
                {/* --------------------------------------------------- */}
                <motion.div variants={itemVariants} className="relative z-10">
                  {/* Rail Node: centered at x = 14px (left: 0, w: 28px) */}
                  <div 
                    className="absolute left-[-36px] sm:left-[-40px] top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 transition-colors">
                    {/* Unified Stage Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-x-2.5 gap-y-1.5 items-start sm:items-baseline mb-2">
                      <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 w-5">
                        {t("about.manifesto.phase1_num")}
                      </span>
                      <h3 className="text-sm font-bold text-brand-textPrimary leading-snug">
                        {t("about.manifesto.phase1_title")}
                      </h3>
                      <div className="sm:text-right">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide whitespace-nowrap bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          {t("about.manifesto.phase1_status")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-textSecondary leading-relaxed sm:pl-[29px]">
                      {t("about.manifesto.phase1_desc")}
                    </p>
                  </div>
                </motion.div>

                {/* --------------------------------------------------- */}
                {/* STAGE 02: Connected Automation (INTERNAL TESTING)  */}
                {/* --------------------------------------------------- */}
                <motion.div variants={itemVariants} className="relative z-10">
                  {/* Rail Node: centered at x = 14px (left: 0, w: 28px) */}
                  <div 
                    className="absolute left-[-36px] sm:left-[-40px] top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-brand-primary text-brand-primary flex items-center justify-center shadow-xs"
                    aria-hidden="true"
                  >
                    <Network className="w-3.5 h-3.5" />
                  </div>

                  <div className="rounded-xl border border-brand-primary/25 bg-brand-primary/[0.04] dark:bg-blue-950/20 p-4 transition-colors">
                    {/* Unified Stage Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-x-2.5 gap-y-1.5 items-start sm:items-baseline mb-2">
                      <span className="font-mono text-xs font-bold text-brand-primary w-5">
                        {t("about.manifesto.phase2_num")}
                      </span>
                      <h3 className="text-sm font-bold text-brand-textPrimary leading-snug">
                        {t("about.manifesto.phase2_title")}
                      </h3>
                      <div className="sm:text-right">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide whitespace-nowrap bg-brand-primary/15 text-brand-primary dark:text-blue-300 border border-brand-primary/30">
                          {t("about.manifesto.phase2_status")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-textSecondary leading-relaxed sm:pl-[29px]">
                      {t("about.manifesto.phase2_desc")}
                    </p>
                  </div>
                </motion.div>

                {/* --------------------------------------------------- */}
                {/* STAGE 03: Private AI Infrastructure (R&D)          */}
                {/* --------------------------------------------------- */}
                <motion.div variants={itemVariants} className="relative z-10">
                  {/* Rail Node: centered at x = 14px (left: 0, w: 28px) */}
                  <div 
                    className="absolute left-[-36px] sm:left-[-40px] top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-xs"
                    aria-hidden="true"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                  </div>

                  <div className="rounded-xl border border-slate-300/80 dark:border-slate-700/70 bg-slate-100/60 dark:bg-slate-800/40 p-4 transition-colors">
                    {/* Unified Stage Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-x-2.5 gap-y-1.5 items-start sm:items-baseline mb-2">
                      <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 w-5">
                        {t("about.manifesto.phase3_num")}
                      </span>
                      <h3 className="text-sm font-bold text-brand-textPrimary leading-snug">
                        {t("about.manifesto.phase3_title")}
                      </h3>
                      <div className="sm:text-right">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide whitespace-nowrap bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {t("about.manifesto.phase3_status")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-textSecondary leading-relaxed sm:pl-[29px]">
                      {t("about.manifesto.phase3_desc")}
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* Factual Architectural Linework Footer: 2 naturally balanced columns */}
              <div className="mt-6 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono text-brand-textSecondary">
                <span className="truncate">{t("about.manifesto.footer_standards")}</span>
                <span className="flex items-center gap-1.5 text-brand-textPrimary shrink-0 sm:self-auto">
                  <Code2 className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                  <span>{t("about.manifesto.footer_delivery")}</span>
                </span>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
