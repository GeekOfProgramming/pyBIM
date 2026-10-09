"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  GitBranch, 
  CheckCircle, 
  Layers, 
  FileCheck2, 
  Settings2, 
  Activity, 
  Cpu, 
  BookOpen, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Boxes,
  Workflow,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

export default function EngineeringImpact() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="impact"
      className="relative w-full py-24 lg:py-32 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Background Family B: Surface / Technical */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Editorial Introduction                    */}
        {/* ========================================================= */}
        <motion.div
          className="max-w-3xl mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {/* Eyebrow with blue architectural guide line */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-brand-primary" aria-hidden="true" />
            <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">
              {t("about.impact.v2.eyebrow")}
            </span>
          </motion.div>

          {/* Main Section Heading */}
          <motion.h2
            id={`${sectionId}-heading`}
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-textPrimary leading-[1.15]"
          >
            {t("about.impact.v2.title")}
          </motion.h2>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg text-brand-textSecondary leading-relaxed"
          >
            {t("about.impact.v2.subtitle")}
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* THREE ENGINEERING OUTCOME CARDS                           */}
        {/* ========================================================= */}
        <motion.div
          className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12 lg:mb-16 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >

          {/* CARD 01: Less Repetitive Work */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-brand-border bg-brand-base/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 lg:p-9 shadow-sm hover:border-brand-primary/40 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-brand-primary/10 transition-colors" />

            {/* Header Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-brand-primary border border-blue-500/20">
                  {t("about.impact.v2.outcome1.num")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-brand-primary">
                  <Workflow className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary tracking-tight mb-3">
                {t("about.impact.v2.outcome1.title")}
              </h3>

              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed mb-8">
                {t("about.impact.v2.outcome1.desc")}
              </p>
            </div>

            {/* Inset Process Diagram 01: Manual Tasks -> Structured Workflow -> Engineering Review */}
            <div className="relative z-10 mt-auto pt-6 border-t border-brand-border/70">
              <div 
                className="rounded-xl border border-brand-border bg-brand-surface/90 dark:bg-slate-950/60 p-4 sm:p-5"
                role="region"
                aria-label={t("about.impact.v2.outcome1.title")}
              >
                <div className="flex items-center justify-between text-xs font-mono text-brand-textSecondary/80 mb-3 px-1">
                  <span className="uppercase tracking-wider font-semibold text-brand-primary">Process Sequence</span>
                  <span>3 Stages</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {/* Stage 1: Manual Tasks */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome1.diag_step1_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome1.diag_step1_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                      Stage 01
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-brand-primary/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Stage 2: Structured Workflow */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 truncate">
                          {t("about.impact.v2.outcome1.diag_step2_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome1.diag_step2_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 shrink-0 border border-cyan-500/20">
                      Automated
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-brand-primary/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Stage 3: Engineering Review */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-blue-500/40 bg-blue-500/10 dark:bg-blue-950/30">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome1.diag_step3_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome1.diag_step3_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-brand-primary font-medium shrink-0 border border-blue-500/30">
                      Expert Gate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 02: More Reliable Model Information */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-brand-border bg-brand-base/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 lg:p-9 shadow-sm hover:border-brand-primary/40 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors" />

            {/* Header Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {t("about.impact.v2.outcome2.num")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <FileCheck2 className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary tracking-tight mb-3">
                {t("about.impact.v2.outcome2.title")}
              </h3>

              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed mb-8">
                {t("about.impact.v2.outcome2.desc")}
              </p>
            </div>

            {/* Inset Process Diagram 02: Model Data -> Defined Rules -> Reviewable Issues */}
            <div className="relative z-10 mt-auto pt-6 border-t border-brand-border/70">
              <div 
                className="rounded-xl border border-brand-border bg-brand-surface/90 dark:bg-slate-950/60 p-4 sm:p-5"
                role="region"
                aria-label={t("about.impact.v2.outcome2.title")}
              >
                <div className="flex items-center justify-between text-xs font-mono text-brand-textSecondary/80 mb-3 px-1">
                  <span className="uppercase tracking-wider font-semibold text-cyan-600 dark:text-cyan-400">Verification Schema</span>
                  <span>Audit Layers</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {/* Layer 1: Model Data */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome2.diag_step1_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome2.diag_step1_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                      Input Data
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-cyan-600/60 dark:text-cyan-400/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Layer 2: Defined Rules */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome2.diag_step2_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome2.diag_step2_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-brand-primary shrink-0 border border-blue-500/20">
                      Rule Matrix
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-cyan-600/60 dark:text-cyan-400/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Layer 3: Reviewable Issues */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome2.diag_step3_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome2.diag_step3_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-500/20">
                      Flagged Action
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 03: Connected Multidisciplinary Delivery */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-brand-border bg-brand-base/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 sm:p-8 lg:p-9 shadow-sm hover:border-brand-primary/40 transition-colors duration-300 relative overflow-hidden group"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />

            {/* Header Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {t("about.impact.v2.outcome3.num")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Boxes className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary tracking-tight mb-3">
                {t("about.impact.v2.outcome3.title")}
              </h3>

              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed mb-8">
                {t("about.impact.v2.outcome3.desc")}
              </p>
            </div>

            {/* Inset Process Diagram 03: ARC / STR / MEP -> OpenBIM Exchange -> Reviewed Outputs */}
            <div className="relative z-10 mt-auto pt-6 border-t border-brand-border/70">
              <div 
                className="rounded-xl border border-brand-border bg-brand-surface/90 dark:bg-slate-950/60 p-4 sm:p-5"
                role="region"
                aria-label={t("about.impact.v2.outcome3.title")}
              >
                <div className="flex items-center justify-between text-xs font-mono text-brand-textSecondary/80 mb-3 px-1">
                  <span className="uppercase tracking-wider font-semibold text-indigo-600 dark:text-indigo-400">Coordination Model</span>
                  <span>Handover Rail</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {/* Discipline Inputs */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome3.diag_step1_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome3.diag_step1_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                      3 Disciplines
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-indigo-600/60 dark:text-indigo-400/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* OpenBIM Exchange */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 truncate">
                          {t("about.impact.v2.outcome3.diag_step2_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome3.diag_step2_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shrink-0 border border-indigo-500/20">
                      IFC & BCF
                    </span>
                  </div>

                  {/* Connector Arrow */}
                  <div className="flex justify-center -my-1 text-indigo-600/60 dark:text-indigo-400/60" aria-hidden="true">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" className="rotate-90">
                      <path d="M8 0L8 10M8 10L3 5M8 10L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Reviewed Outputs */}
                  <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-brand-primary/40 bg-brand-primary/10 dark:bg-blue-950/30">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-brand-textPrimary truncate">
                          {t("about.impact.v2.outcome3.diag_step3_title")}
                        </div>
                        <div className="text-xs text-brand-textSecondary truncate">
                          {t("about.impact.v2.outcome3.diag_step3_sub")}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-brand-primary font-medium shrink-0 border border-blue-500/30">
                      Coordinated
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* ========================================================= */}
        {/* LOWER ARCHITECTURAL SUMMARY STRIP: 2 Coordinated Zones     */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl sm:rounded-3xl border border-brand-border bg-brand-base/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Zone A: Applied Automation / Internal Development */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">
                  {t("about.impact.v2.automation.label")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-brand-primary border border-blue-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                  {t("about.impact.v2.automation.status")}
                </span>
              </div>
              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed">
                {t("about.impact.v2.automation.text")}
              </p>
            </div>

            {/* Zone B: Information Management & Standards */}
            <div className="space-y-3 lg:border-l lg:border-brand-border/70 lg:pl-12 pt-6 lg:pt-0 border-t lg:border-t-0 border-brand-border/50">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                <span className="text-xs font-mono font-bold tracking-widest text-brand-textPrimary uppercase">
                  {t("about.impact.v2.standards.label")}
                </span>
              </div>
              <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed">
                {t("about.impact.v2.standards.text")}
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
