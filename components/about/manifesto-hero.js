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
  Code2
} from "lucide-react";

/**
 * ManifestoHero Component (Section 01 - The Manifesto Hero)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Visual Concept: Engineering Evolution (01 Delivery -> 02 Connected Automation -> 03 Private AI)
 * Background Family B: variant="surface" (#F1F5F9 light / #0F172A dark)
 * 
 * Strict Scope:
 * - Preserves original brand headline: "Scale Your BIM Execution Through Code, Not Headcount."
 * - Replaces exaggerated claims with factual engineering capabilities.
 * - Represents ISO 19650 and UNI 11337 accurately.
 * - Distinctive custom SVG schematic with restrained, finite entrance animation and useReducedMotion.
 */
export default function ManifestoHero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

  // Animation variants
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
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.96 },
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
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center"
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
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider text-brand-primary uppercase">
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t("about.manifesto.badge")}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-brand-textSecondary shadow-xs backdrop-blur-xs">
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

            {/* Approved Factual Engineering Paragraph */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-textSecondary leading-relaxed font-normal mb-8 max-w-2xl"
            >
              {t("about.manifesto.subtitle")}
            </motion.p>

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
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-xs">
                    ISO 19650
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-xs">
                    UNI 11337
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-xs">
                    Revit API
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs font-medium text-brand-textPrimary shadow-xs">
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
              className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md p-6 sm:p-7 shadow-lg shadow-slate-900/5 dark:shadow-black/20 overflow-hidden"
              role="region"
              aria-label={t("about.manifesto.aria_label")}
            >
              {/* Subtle top ambient sheen */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-brand-primary/[0.08] rounded-full blur-3xl" 
                aria-hidden="true" 
              />

              {/* Schematic Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/80 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                  <span className="text-[11px] font-mono font-bold tracking-widest text-brand-primary uppercase">
                    {t("about.manifesto.diagram_eyebrow")}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-brand-textSecondary">
                  {t("about.manifesto.diagram_title")}
                </span>
              </div>

              {/* Architectural Evolution Flow (3 Layers) */}
              <div className="space-y-4 relative">
                
                {/* Connecting Axis Linework SVG */}
                <div 
                  className="pointer-events-none absolute left-6 top-8 bottom-8 w-px z-0 hidden sm:block" 
                  aria-hidden="true"
                >
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line 
                      x1="0" 
                      y1="0" 
                      x2="0" 
                      y2="100%" 
                      stroke="currentColor" 
                      className="text-slate-300 dark:text-slate-700" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4" 
                    />
                  </svg>
                </div>

                {/* --------------------------------------------------- */}
                {/* LAYER 01: Engineering Delivery (AVAILABLE NOW)      */}
                {/* --------------------------------------------------- */}
                <motion.div 
                  variants={itemVariants}
                  className="relative z-10 rounded-xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
                            {t("about.manifesto.phase1_num")}
                          </span>
                          <h3 className="text-sm font-bold text-brand-textPrimary">
                            {t("about.manifesto.phase1_title")}
                          </h3>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          {t("about.manifesto.phase1_status")}
                        </span>
                      </div>
                      <p className="text-xs text-brand-textSecondary leading-relaxed">
                        {t("about.manifesto.phase1_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* --------------------------------------------------- */}
                {/* LAYER 02: Connected Automation (INTERNAL TESTING)  */}
                {/* --------------------------------------------------- */}
                <motion.div 
                  variants={itemVariants}
                  className="relative z-10 rounded-xl border border-brand-primary/30 bg-brand-primary/[0.04] dark:bg-blue-950/20 p-4 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-primary/15 border border-brand-primary/30 text-brand-primary flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                      <Network className="w-4 h-4" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-primary">
                            {t("about.manifesto.phase2_num")}
                          </span>
                          <h3 className="text-sm font-bold text-brand-textPrimary">
                            {t("about.manifesto.phase2_title")}
                          </h3>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide bg-brand-primary/15 text-brand-primary dark:text-blue-300 border border-brand-primary/30">
                          {t("about.manifesto.phase2_status")}
                        </span>
                      </div>
                      <p className="text-xs text-brand-textSecondary leading-relaxed">
                        {t("about.manifesto.phase2_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* --------------------------------------------------- */}
                {/* LAYER 03: Private AI Infrastructure (R&D)          */}
                {/* --------------------------------------------------- */}
                <motion.div 
                  variants={itemVariants}
                  className="relative z-10 rounded-xl border border-slate-300 dark:border-slate-700/70 bg-slate-100/60 dark:bg-slate-800/40 p-4 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono text-xs font-bold shadow-xs">
                      <FlaskConical className="w-4 h-4" />
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                            {t("about.manifesto.phase3_num")}
                          </span>
                          <h3 className="text-sm font-bold text-brand-textPrimary">
                            {t("about.manifesto.phase3_title")}
                          </h3>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {t("about.manifesto.phase3_status")}
                        </span>
                      </div>
                      <p className="text-xs text-brand-textSecondary leading-relaxed">
                        {t("about.manifesto.phase3_desc")}
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Factual Architectural Linework Footer */}
              <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-brand-textSecondary/70">
                <span>ISO 19650 / UNI 11337 ALIGNED</span>
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                  REVIT API / CLOUD ENGINE
                </span>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
