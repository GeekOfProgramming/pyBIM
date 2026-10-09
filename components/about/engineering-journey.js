"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { 
  Activity, 
  Layers, 
  Network, 
  Cpu, 
  Compass, 
  CheckCircle2, 
  Clock, 
  FlaskConical, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";

/**
 * EngineeringJourney Component (Section 03 - Our Journey)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Visual Concept: Connected Engineering Evolution Timeline
 * Background Family B: variant="surface" (#F1F5F9 light / #0F172A dark)
 * 
 * Narrative Progression:
 * 01 - BIM Engineering Foundations (Established / Available Now)
 * 02 - Engineering Meets Automation (Active Development / Internal Testing)
 * 03 - Private AI Infrastructure (Long-Term Roadmap / R&D)
 * + Understated "Beyond the Current Roadmap" continuation note
 */
export default function EngineeringJourney() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const headingId = useId();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="journey" 
      className="relative w-full py-24 lg:py-32 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={headingId}
    >
      {/* Background Family B (Surface / Technical) */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <motion.div 
          className="max-w-3xl mb-16 lg:mb-24"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest shadow-sm">
              <Activity className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t("about.journey.tag")}</span>
            </div>
          </div>

          <h2 
            id={headingId}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-textPrimary leading-tight mb-5"
          >
            {t("about.journey.title")}
          </h2>

          <p className="text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            {t("about.journey.subtitle")}
          </p>
        </motion.div>        {/* ========================================================= */}
        {/* CONNECTED ENGINEERING TIMELINE                            */}
        {/* ========================================================= */}
        <div className="relative">
          
          {/* Continuous Vertical Backbone Rail (Visible on md and above) */}
          {/* Gutter: left-6 is 24px. Node width is w-12 (48px) centered at 24px (left-0, w-12). */}
          <div 
            className="pointer-events-none absolute left-6 top-8 bottom-36 w-px z-0 hidden md:block" 
            aria-hidden="true"
          >
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <motion.line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="100%" 
                stroke="currentColor" 
                className="text-slate-300 dark:text-slate-700" 
                strokeWidth="2" 
                strokeDasharray="6 6"
                initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
          </div>

          <motion.div 
            className="space-y-12 lg:space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >

            {/* ----------------------------------------------------- */}
            {/* STAGE 01: BIM Engineering Foundations                 */}
            {/* ----------------------------------------------------- */}
            <motion.div 
              variants={itemVariants}
              className="relative z-10 md:pl-20"
            >
              {/* Timeline Node Indicator centered at x = 24px (left: 0, w: 48px) */}
              <div 
                className="hidden md:flex absolute left-0 top-7 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-md shadow-emerald-500/10 items-center justify-center text-emerald-600 dark:text-emerald-400 z-20"
                aria-hidden="true"
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Mobile Node Badge */}
                      <div className="flex md:hidden items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                          {t("about.journey.p1_stage")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="hidden md:inline-block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                          {t("about.journey.p1_stage")}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wide bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                          {t("about.journey.p1_status")}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary mb-4">
                        {t("about.journey.p1_title")}
                      </h3>

                      <p className="text-base text-brand-textPrimary font-medium leading-relaxed mb-3">
                        {t("about.journey.p1_primary")}
                      </p>

                      <p className="text-sm text-brand-textSecondary leading-relaxed">
                        {t("about.journey.p1_supporting")}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-500 dark:text-slate-400">
                      {t("about.journey.p1_focus")}
                    </div>
                  </div>

                  {/* Right Column: Engineering Schematic Illustration (Readable HTML/CSS nodes + SVG connectors) */}
                  <div className="lg:col-span-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-semibold">{t("about.journey.p1_diag_header")}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{t("about.journey.p1_diag_status")}</span>
                    </div>

                    {/* Desktop & Tablet Process Flow */}
                    <div className="hidden sm:grid grid-cols-3 gap-2.5 items-stretch relative">
                      {/* Step 1 */}
                      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-snug">
                          {t("about.journey.p1_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {t("about.journey.p1_diag_step1_sub")}
                        </span>
                      </div>

                      {/* Step 2 */}
                      <div className="rounded-lg border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 leading-snug">
                          {t("about.journey.p1_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 mt-0.5">
                          {t("about.journey.p1_diag_step2_sub")}
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="rounded-lg border border-emerald-500 bg-white dark:bg-slate-900 p-2.5 flex flex-col justify-center min-h-[72px] shadow-xs">
                        <span className="text-xs font-mono font-bold text-brand-textPrimary leading-snug">
                          {t("about.journey.p1_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          {t("about.journey.p1_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Process Flow (Stacked) */}
                    <div className="grid sm:hidden grid-cols-1 gap-2">
                      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                          {t("about.journey.p1_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {t("about.journey.p1_diag_step1_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                          {t("about.journey.p1_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 block mt-0.5">
                          {t("about.journey.p1_diag_step2_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border border-emerald-500 bg-white dark:bg-slate-900 p-2.5">
                        <span className="text-xs font-mono font-bold text-brand-textPrimary block">
                          {t("about.journey.p1_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">
                          {t("about.journey.p1_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span>{t("about.journey.p1_diag_footer1")}</span>
                      <span>{t("about.journey.p1_diag_footer2")}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------- */}
            {/* STAGE 02: Engineering Meets Automation                */}
            {/* ----------------------------------------------------- */}
            <motion.div 
              variants={itemVariants}
              className="relative z-10 md:pl-20"
            >
              {/* Timeline Node Indicator centered at x = 24px (left: 0, w: 48px) */}
              <div 
                className="hidden md:flex absolute left-0 top-7 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-brand-primary shadow-md shadow-brand-primary/15 items-center justify-center text-brand-primary z-20"
                aria-hidden="true"
              >
                <Network className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="rounded-2xl border-2 border-brand-primary/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-lg shadow-brand-primary/5 dark:shadow-brand-primary/10 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Mobile Node Badge */}
                      <div className="flex md:hidden items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
                          <Network className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-brand-primary tracking-wider uppercase">
                          {t("about.journey.p2_stage")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="hidden md:inline-block text-xs font-mono font-bold text-brand-primary tracking-wider uppercase">
                          {t("about.journey.p2_stage")}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wide bg-brand-primary/15 text-brand-primary dark:text-blue-300 border border-brand-primary/30">
                          {t("about.journey.p2_status")}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary mb-4">
                        {t("about.journey.p2_title")}
                      </h3>

                      <p className="text-base text-brand-textPrimary font-medium leading-relaxed mb-3">
                        {t("about.journey.p2_primary")}
                      </p>

                      <p className="text-sm text-brand-textSecondary leading-relaxed">
                        {t("about.journey.p2_supporting")}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-brand-primary/15 text-xs font-mono text-brand-primary">
                      {t("about.journey.p2_focus")}
                    </div>
                  </div>

                  {/* Right Column: Engineering Schematic Illustration (Readable HTML/CSS nodes + SVG connectors) */}
                  <div className="lg:col-span-5 rounded-xl border border-brand-primary/25 bg-brand-primary/[0.04] dark:bg-blue-950/20 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-brand-primary mb-4 pb-2 border-b border-brand-primary/15">
                      <span className="font-semibold">{t("about.journey.p2_diag_header")}</span>
                      <span className="font-bold">{t("about.journey.p2_diag_status")}</span>
                    </div>

                    {/* Desktop & Tablet Process Flow */}
                    <div className="hidden sm:grid grid-cols-2 gap-2.5 items-stretch mb-2.5">
                      {/* Step 1: BIM Delivery */}
                      <div className="rounded-lg border border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 leading-snug">
                          {t("about.journey.p2_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary mt-0.5">
                          {t("about.journey.p2_diag_step1_sub")}
                        </span>
                      </div>

                      {/* Step 2: Automation Sandbox */}
                      <div className="rounded-lg border-2 border-brand-primary bg-brand-primary/15 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-brand-primary leading-snug">
                          {t("about.journey.p2_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary mt-0.5">
                          {t("about.journey.p2_diag_step2_sub")}
                        </span>
                      </div>
                    </div>

                    {/* Step 3: Bottom Full-Width Pipeline */}
                    <div className="hidden sm:block rounded-lg border border-brand-primary/30 bg-white dark:bg-slate-900 p-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-brand-primary">
                          {t("about.journey.p2_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                          {t("about.journey.p2_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Process Flow (Stacked) */}
                    <div className="grid sm:hidden grid-cols-1 gap-2">
                      <div className="rounded-lg border border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-2.5">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                          {t("about.journey.p2_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary block mt-0.5">
                          {t("about.journey.p2_diag_step1_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border-2 border-brand-primary bg-brand-primary/15 p-2.5">
                        <span className="text-xs font-mono font-bold text-brand-primary block">
                          {t("about.journey.p2_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary block mt-0.5">
                          {t("about.journey.p2_diag_step2_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border border-brand-primary/30 bg-white dark:bg-slate-900 p-2.5">
                        <span className="text-xs font-mono font-bold text-brand-primary block">
                          {t("about.journey.p2_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {t("about.journey.p2_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono text-brand-primary pt-2.5 border-t border-brand-primary/15">
                      <span>{t("about.journey.p2_diag_footer1")}</span>
                      <span>{t("about.journey.p2_diag_footer2")}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------- */}
            {/* STAGE 03: Private AI Infrastructure                   */}
            {/* ----------------------------------------------------- */}
            <motion.div 
              variants={itemVariants}
              className="relative z-10 md:pl-20"
            >
              {/* Timeline Node Indicator centered at x = 24px (left: 0, w: 48px) */}
              <div 
                className="hidden md:flex absolute left-0 top-7 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 shadow-md shadow-slate-500/10 items-center justify-center text-slate-700 dark:text-slate-300 z-20"
                aria-hidden="true"
              >
                <FlaskConical className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      {/* Mobile Node Badge */}
                      <div className="flex md:hidden items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                          <FlaskConical className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                          {t("about.journey.p3_stage")}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="hidden md:inline-block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                          {t("about.journey.p3_stage")}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-wide bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          {t("about.journey.p3_status")}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary mb-4">
                        {t("about.journey.p3_title")}
                      </h3>

                      <p className="text-base text-brand-textPrimary font-medium leading-relaxed mb-3">
                        {t("about.journey.p3_primary")}
                      </p>

                      <p className="text-sm text-brand-textSecondary leading-relaxed">
                        {t("about.journey.p3_supporting")}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono text-slate-500 dark:text-slate-400">
                      {t("about.journey.p3_focus")}
                    </div>
                  </div>

                  {/* Right Column: Conceptual Research Schematic (Readable HTML/CSS nodes + SVG connectors) */}
                  <div className="lg:col-span-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 pb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                      <span className="font-semibold">{t("about.journey.p3_diag_header")}</span>
                      <span className="font-bold">{t("about.journey.p3_diag_status")}</span>
                    </div>

                    {/* Desktop & Tablet Process Flow */}
                    <div className="hidden sm:grid grid-cols-3 gap-2 items-stretch">
                      {/* Step 1 */}
                      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-snug">
                          {t("about.journey.p3_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {t("about.journey.p3_diag_step1_sub")}
                        </span>
                      </div>

                      {/* Step 2 */}
                      <div className="rounded-lg border border-dashed border-slate-400 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-800/60 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-snug">
                          {t("about.journey.p3_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {t("about.journey.p3_diag_step2_sub")}
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="rounded-lg border border-brand-primary/40 bg-white dark:bg-slate-900 p-2.5 flex flex-col justify-center min-h-[72px]">
                        <span className="text-xs font-mono font-bold text-brand-primary leading-snug">
                          {t("about.journey.p3_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {t("about.journey.p3_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Process Flow (Stacked) */}
                    <div className="grid sm:hidden grid-cols-1 gap-2">
                      <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-2.5">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                          {t("about.journey.p3_diag_step1")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {t("about.journey.p3_diag_step1_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border border-dashed border-slate-400 dark:border-slate-600 bg-slate-100/60 dark:bg-slate-800/60 p-2.5">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                          {t("about.journey.p3_diag_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {t("about.journey.p3_diag_step2_sub")}
                        </span>
                      </div>
                      <div className="rounded-lg border border-brand-primary/40 bg-white dark:bg-slate-900 p-2.5">
                        <span className="text-xs font-mono font-bold text-brand-primary block">
                          {t("about.journey.p3_diag_step3")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                          {t("about.journey.p3_diag_step3_sub")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span>{t("about.journey.p3_diag_footer1")}</span>
                      <span>{t("about.journey.p3_diag_footer2")}</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* ----------------------------------------------------- */}
            {/* BEYOND THE CURRENT ROADMAP: Subtle Continuation Note   */}
            {/* ----------------------------------------------------- */}
            <motion.div 
              variants={itemVariants}
              className="relative z-10 md:pl-20 pt-2"
            >
              <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    <h4 className="text-sm font-bold text-brand-textPrimary">
                      {t("about.journey.beyond_title")}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed">
                    {t("about.journey.beyond_desc")}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-primary">
                    <span>{t("about.journey.beyond_badge")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
