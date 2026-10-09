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
        </motion.div>

        {/* ========================================================= */}
        {/* CONNECTED ENGINEERING TIMELINE                            */}
        {/* ========================================================= */}
        <div className="relative">
          
          {/* Continuous Vertical Backbone Rail (Visible on md and above) */}
          <div 
            className="pointer-events-none absolute left-6 top-8 bottom-32 w-px z-0 hidden md:block" 
            aria-hidden="true"
          >
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <line 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="100%" 
                stroke="currentColor" 
                className="text-brand-border dark:text-slate-800" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
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
              className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start md:pl-16"
            >
              {/* Timeline Node Indicator on the Backbone Rail */}
              <div 
                className="hidden md:flex absolute -left-6 top-7 w-12 h-12 -translate-x-1/2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500/50 shadow-md shadow-emerald-500/10 items-center justify-center text-emerald-600 dark:text-emerald-400 z-20"
                aria-hidden="true"
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="md:col-span-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
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

                  {/* Right Column: Engineering Schematic Illustration */}
                  <div className="lg:col-span-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                      <span>PROJECT REVIEW ARSENAL</span>
                      <span className="text-emerald-600 dark:text-emerald-400">ACTIVE PRACTICE</span>
                    </div>

                    <svg className="w-full h-32 text-slate-400 dark:text-slate-600" viewBox="0 0 280 120" fill="none">
                      {/* Grid background */}
                      <rect x="10" y="10" width="260" height="100" rx="8" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Project Input Node */}
                      <rect x="25" y="30" width="60" height="60" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                      <text x="55" y="55" textAnchor="middle" className="text-[10px] font-mono fill-slate-600 dark:fill-slate-400" fontSize="10">BIM MODEL</text>
                      <text x="55" y="70" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 dark:fill-slate-500" fontSize="9">DATA INPUT</text>

                      {/* Path to Review */}
                      <path d="M 85 60 L 115 60" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="113,57 119,60 113,63" fill="currentColor" />

                      {/* Engineering Review Hub */}
                      <rect x="120" y="22" width="76" height="76" rx="8" className="fill-emerald-50 dark:fill-emerald-950/30 stroke-emerald-500/40" strokeWidth="1.5" />
                      <text x="158" y="52" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-400" fontSize="10">COORDINATION</text>
                      <text x="158" y="67" textAnchor="middle" className="text-[9px] font-mono fill-emerald-600 dark:fill-emerald-400" fontSize="9">&amp; AUDIT</text>

                      {/* Path to Verified Deliverable */}
                      <path d="M 196 60 L 220 60" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="218,57 224,60 218,63" fill="currentColor" />

                      {/* Verified Deliverable Node */}
                      <circle cx="238" cy="60" r="14" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="1.5" />
                      <path d="M 233 60 L 237 64 L 244 56" stroke="currentColor" className="text-emerald-600 dark:text-emerald-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span>ISO 19650 ALIGNMENT</span>
                      <span>HUMAN DISCIPLINE</span>
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
              className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start md:pl-16"
            >
              {/* Timeline Node Indicator on the Backbone Rail */}
              <div 
                className="hidden md:flex absolute -left-6 top-7 w-12 h-12 -translate-x-1/2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-brand-primary/60 shadow-md shadow-brand-primary/15 items-center justify-center text-brand-primary z-20"
                aria-hidden="true"
              >
                <Network className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="md:col-span-12 rounded-2xl border-2 border-brand-primary/35 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-lg shadow-brand-primary/5 dark:shadow-brand-primary/10 transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-mono font-bold text-brand-primary tracking-wider uppercase">
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

                  {/* Right Column: Engineering Schematic Illustration */}
                  <div className="lg:col-span-5 rounded-xl border border-brand-primary/20 bg-brand-primary/[0.03] dark:bg-blue-950/20 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-brand-primary mb-3">
                      <span>INTERNAL AUTOMATION LAYER</span>
                      <span>TECH VALIDATION</span>
                    </div>

                    <svg className="w-full h-32 text-brand-primary" viewBox="0 0 280 120" fill="none">
                      {/* Main Orchestration Bus */}
                      <rect x="10" y="10" width="260" height="100" rx="8" className="stroke-brand-primary/30" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Public Engineering Delivery Layer */}
                      <rect x="25" y="24" width="105" height="34" rx="5" className="fill-emerald-500/10 stroke-emerald-500/40" strokeWidth="1.5" />
                      <text x="77" y="45" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-400" fontSize="10">BIM DELIVERY</text>

                      {/* Internal Automation Hub */}
                      <rect x="150" y="24" width="105" height="34" rx="5" className="fill-brand-primary/15 stroke-brand-primary" strokeWidth="1.5" />
                      <text x="202" y="45" textAnchor="middle" className="text-[10px] font-mono font-bold fill-brand-primary" fontSize="10">AUTOMATION LAB</text>

                      {/* Bi-directional feedback arrows */}
                      <path d="M 130 36 L 150 36" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="148,33 154,36 148,39" fill="currentColor" />

                      <path d="M 150 46 L 130 46" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="132,43 126,46 132,49" fill="currentColor" />

                      {/* Bottom Pipeline: Engineering Feedback */}
                      <rect x="25" y="72" width="230" height="26" rx="5" className="fill-white dark:fill-slate-900 stroke-brand-primary/30" strokeWidth="1" />
                      <circle cx="45" cy="85" r="4" className="fill-brand-primary" />
                      <text x="145" y="89" textAnchor="middle" className="text-[9px] font-mono fill-brand-textSecondary" fontSize="9">FEEDBACK LOOP · WORKFLOW REFINEMENT</text>
                      <circle cx="245" cy="85" r="4" className="fill-brand-primary" />
                    </svg>

                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-brand-primary pt-2 border-t border-brand-primary/15">
                      <span>REVIT API / PYTHON C#</span>
                      <span>IN-HOUSE TESTING</span>
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
              className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start md:pl-16"
            >
              {/* Timeline Node Indicator on the Backbone Rail */}
              <div 
                className="hidden md:flex absolute -left-6 top-7 w-12 h-12 -translate-x-1/2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-400 dark:border-slate-600 shadow-md shadow-slate-500/10 items-center justify-center text-slate-700 dark:text-slate-300 z-20"
                aria-hidden="true"
              >
                <FlaskConical className="w-5 h-5" />
              </div>

              {/* Stage Card */}
              <div className="md:col-span-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm transition-colors">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                  
                  {/* Left Column: Narrative Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
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

                  {/* Right Column: Conceptual Research Schematic */}
                  <div className="lg:col-span-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-950/50 p-5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                      <span>CONTROLLED INFERENCE R&amp;D</span>
                      <span>HUMAN-IN-THE-LOOP</span>
                    </div>

                    <svg className="w-full h-32 text-slate-400 dark:text-slate-600" viewBox="0 0 280 120" fill="none">
                      <rect x="10" y="10" width="260" height="100" rx="8" className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="1" strokeDasharray="4 4" />

                      {/* Engineering Data Ingestion */}
                      <rect x="25" y="35" width="65" height="50" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                      <text x="57" y="58" textAnchor="middle" className="text-[10px] font-mono fill-slate-700 dark:fill-slate-300" fontSize="10">BIM DATA</text>
                      <text x="57" y="72" textAnchor="middle" className="text-[9px] font-mono fill-slate-400 dark:fill-slate-500" fontSize="9">SCHEMA</text>

                      {/* Connective Vector */}
                      <path d="M 90 60 L 115 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Sovereign Edge Inference Hub */}
                      <rect x="115" y="25" width="70" height="70" rx="8" className="fill-slate-200/60 dark:fill-slate-800/60 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                      <text x="150" y="55" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300" fontSize="10">PRIVATE AI</text>
                      <text x="150" y="70" textAnchor="middle" className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400" fontSize="9">INFERENCE</text>

                      {/* Connective Vector */}
                      <path d="M 185 60 L 210 60" stroke="currentColor" strokeWidth="1.5" />
                      <polygon points="208,57 214,60 208,63" fill="currentColor" />

                      {/* Human-in-the-Loop Validation */}
                      <rect x="210" y="35" width="45" height="50" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
                      <text x="232" y="58" textAnchor="middle" className="text-[9px] font-mono font-bold fill-brand-primary" fontSize="9">HUMAN</text>
                      <text x="232" y="72" textAnchor="middle" className="text-[9px] font-mono fill-slate-500" fontSize="9">REVIEW</text>
                    </svg>

                    <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span>LONG-TERM ROADMAP</span>
                      <span>LOCAL INFERENCE</span>
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
              className="relative z-10 md:pl-16 pt-2"
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
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-brand-primary">
                    <span>EXPLORATORY HORIZON</span>
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
