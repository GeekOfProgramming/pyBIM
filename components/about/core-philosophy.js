"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { 
  Users, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Clock, 
  GitBranch, 
  Package, 
  ArrowRight,
  Sparkles
} from "lucide-react";

/**
 * CorePhilosophy Component (Section 02 - Core Philosophy)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Three-Part Comparison:
 * 01 Conventional Approach (Traditional BIM Delivery)
 * 02 The pyBIM Approach (Engineering First. Technology Next.) -> FEATURED CENTER
 * 03 Standardized Approach (Standard Software Platforms)
 * 
 * Background Family A: variant="base" (#FFFFFF light / #080C14 dark)
 * 
 * Commercial & Technical Reality:
 * - Current BIM engineering services available today.
 * - Connected automation & private AI in active internal testing / R&D.
 * - No exaggerated claims, no zero-error guarantees, no fake launch dates or custom plugin CTAs.
 */
export default function CorePhilosophy() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

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

  const cardVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="philosophy"
      className="relative w-full py-24 lg:py-32 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Background Family A (Base / Architectural) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Editorial Introduction                    */}
        {/* ========================================================= */}
        <motion.div 
          className="max-w-3xl mb-16 lg:mb-20"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("about.philosophy.eyebrow")}
            </span>
          </div>

          <h2 
            id={`${sectionId}-heading`}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-textPrimary leading-tight mb-5"
          >
            {t("about.philosophy.title")}
          </h2>

          <p className="text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            {t("about.philosophy.subtitle")}
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* THREE COMPARISON PANELS                                   */}
        {/* ========================================================= */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-7 xl:gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          
          {/* ------------------------------------------------------- */}
          {/* PANEL 01: Traditional BIM Delivery                      */}
          {/* ------------------------------------------------------- */}
          <motion.div 
            variants={cardVariants}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 flex flex-col justify-between shadow-xs transition-colors duration-200"
          >
            <div>
              {/* Header: Label & Icon */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  {t("about.philosophy.col1_label")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              {/* Technical Schematic: Repeated Manual Coordination Paths */}
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 p-4 mb-6">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <span>WORKFLOW PATH</span>
                  <span>FRAGMENTED HANDOFFS</span>
                </div>
                <svg className="w-full h-12 text-slate-400 dark:text-slate-600" viewBox="0 0 240 48" fill="none">
                  {/* Nodes */}
                  <circle cx="20" cy="24" r="6" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                  <circle cx="95" cy="14" r="6" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                  <circle cx="160" cy="34" r="6" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                  <circle cx="220" cy="24" r="6" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                  
                  {/* Handoff lines with gaps / steps */}
                  <path d="M 26 24 L 89 14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 101 14 L 154 34" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M 166 34 L 214 24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3 leading-snug">
                {t("about.philosophy.col1_title")}
              </h3>

              {/* Primary Message */}
              <p className="text-sm text-brand-textSecondary leading-relaxed mb-4">
                {t("about.philosophy.col1_primary")}
              </p>

              {/* Supporting Message */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t("about.philosophy.col1_supporting")}
              </p>
            </div>

            {/* Micro Tag Footer */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>PROJECT-BY-PROJECT</span>
              <span>MANUAL AUDIT</span>
            </div>
          </motion.div>

          {/* ------------------------------------------------------- */}
          {/* PANEL 02: The pyBIM Approach (FEATURED CENTER)          */}
          {/* ------------------------------------------------------- */}
          <motion.div 
            variants={cardVariants}
            className="rounded-2xl border-2 border-brand-primary/45 bg-white dark:bg-slate-900 p-8 flex flex-col justify-between shadow-xl shadow-brand-primary/5 dark:shadow-brand-primary/10 relative overflow-hidden transition-all duration-200"
          >
            {/* Ambient top light */}
            <div 
              className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-brand-primary/[0.08] rounded-full blur-3xl"
              aria-hidden="true" 
            />

            <div className="relative z-10">
              {/* Header: Label & Icon */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/25 uppercase">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  {t("about.philosophy.col2_label")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shadow-xs">
                  <Cpu className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              {/* Technical Schematic: Structured Engineering Control & Connected Modules */}
              <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/[0.03] dark:bg-blue-950/20 p-4 mb-6">
                <div className="flex items-center justify-between text-[10px] font-mono text-brand-primary mb-2">
                  <span>ENGINEERING CORE</span>
                  <span>STRUCTURED ORCHESTRATION</span>
                </div>
                <svg className="w-full h-12 text-brand-primary" viewBox="0 0 240 48" fill="none">
                  {/* Central Bus */}
                  <line x1="20" y1="24" x2="220" y2="24" stroke="currentColor" strokeWidth="2" />
                  
                  {/* Connected Core Nodes */}
                  <rect x="14" y="18" width="12" height="12" rx="2" className="fill-brand-primary stroke-brand-primary" />
                  <rect x="80" y="18" width="12" height="12" rx="2" className="fill-brand-primary stroke-brand-primary" />
                  <rect x="146" y="18" width="12" height="12" rx="2" className="fill-white dark:fill-slate-900 stroke-brand-primary" strokeWidth="2" />
                  <rect x="214" y="18" width="12" height="12" rx="2" className="fill-white dark:fill-slate-900 stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" strokeDasharray="2 2" />

                  {/* Vertical Control Pins */}
                  <line x1="86" y1="6" x2="86" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="152" y1="30" x2="152" y2="42" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3 leading-snug">
                {t("about.philosophy.col2_title")}
              </h3>

              {/* Primary Message */}
              <p className="text-sm text-brand-textSecondary leading-relaxed mb-4">
                {t("about.philosophy.col2_primary")}
              </p>

              {/* Supporting Message */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {t("about.philosophy.col2_supporting")}
              </p>

              {/* Availability Clarification Block */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-brand-textPrimary">
                    {t("about.philosophy.col2_status_services")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" aria-hidden="true" />
                  <span className="font-medium text-brand-textPrimary">
                    {t("about.philosophy.col2_status_rd")}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-brand-textSecondary/80 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 leading-normal">
                  {t("about.philosophy.col2_status_note")}
                </p>
              </div>
            </div>

            {/* Micro Tag Footer */}
            <div className="pt-6 mt-6 border-t border-brand-primary/15 flex items-center justify-between text-xs font-mono text-brand-primary">
              <span>DISCIPLINED DELIVERY</span>
              <span>ENGINEERED ROADMAP</span>
            </div>
          </motion.div>

          {/* ------------------------------------------------------- */}
          {/* PANEL 03: Standard Software Platforms                   */}
          {/* ------------------------------------------------------- */}
          <motion.div 
            variants={cardVariants}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 flex flex-col justify-between shadow-xs transition-colors duration-200"
          >
            <div>
              {/* Header: Label & Icon */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                  {t("about.philosophy.col3_label")}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Package className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              {/* Technical Schematic: Standardized Software Modules */}
              <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 p-4 mb-6">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-2">
                  <span>PREDEFINED MODULES</span>
                  <span>FIXED SPECIFICATION</span>
                </div>
                <svg className="w-full h-12 text-slate-400 dark:text-slate-600" viewBox="0 0 240 48" fill="none">
                  {/* Grid of standard boxes */}
                  <rect x="20" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="66" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="112" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="158" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />

                  {/* Standard slot indicators */}
                  <line x1="28" y1="18" x2="48" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="74" y1="18" x2="94" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="120" y1="18" x2="140" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="166" y1="18" x2="186" y2="18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3 leading-snug">
                {t("about.philosophy.col3_title")}
              </h3>

              {/* Primary Message */}
              <p className="text-sm text-brand-textSecondary leading-relaxed mb-4">
                {t("about.philosophy.col3_primary")}
              </p>

              {/* Supporting Message */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {t("about.philosophy.col3_supporting")}
              </p>
            </div>

            {/* Micro Tag Footer */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
              <span>STANDARDIZED SUITE</span>
              <span>NEEDS INTEGRATION</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}
