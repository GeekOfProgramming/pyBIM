"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { 
  Users, 
  Cpu, 
  Package, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ArrowRight,
  GitBranch,
  Layers,
  ArrowDown
} from "lucide-react";

/**
 * CorePhilosophy Component (Section 02 - Core Philosophy)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Task A02-R1: Asymmetric 5/7 Engineering Philosophy Comparison
 * Background Family A: variant="base" (#FFFFFF light / #080C14 dark)
 * 
 * Layout Architecture:
 * - Left 5 Columns: Alternative Approaches (Stacked compact panels: Traditional BIM Delivery & Standard Platforms)
 * - Right 7 Columns: The pyBIM Engineering Core (Dominated by an expressive dual-branch Engineering Control Schematic)
 * 
 * Commercial & Technical Reality:
 * - Current BIM engineering services available today.
 * - Connected automation & private AI in active internal testing / R&D.
 * - Clear visual distinction between public delivery branch and internal validation branch.
 * - Strictly >= 12px labels, no text-[10px], no unsupported shadow-xs, fully localized.
 */
export default function CorePhilosophy() {
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
          className="max-w-3xl mb-14 lg:mb-18"
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
        {/* ASYMMETRIC 5/7 COMPARISON COMPOSITION                     */}
        {/* ========================================================= */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          
          {/* ======================================================= */}
          {/* LEFT 5 COLUMNS: Alternative Approaches (Stacked)        */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 lg:gap-8">
            
            {/* Panel 01: Traditional BIM Delivery */}
            <motion.div 
              variants={itemVariants}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    {t("about.philosophy.col1_label")}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Users className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-textPrimary mb-2 leading-snug">
                  {t("about.philosophy.col1_title")}
                </h3>

                <p className="text-sm text-brand-textSecondary leading-relaxed mb-3">
                  {t("about.philosophy.col1_primary")}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {t("about.philosophy.col1_supporting")}
                </p>

                {/* Compact Schematic: Fragmented Handoffs */}
                <div className="rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 p-3 mb-2">
                  <svg className="w-full h-8 text-slate-400 dark:text-slate-600" viewBox="0 0 240 32" fill="none">
                    <circle cx="20" cy="16" r="4" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400" strokeWidth="1.5" />
                    <circle cx="90" cy="10" r="4" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400" strokeWidth="1.5" />
                    <circle cx="160" cy="22" r="4" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400" strokeWidth="1.5" />
                    <circle cx="220" cy="16" r="4" className="fill-slate-300 dark:fill-slate-700 stroke-slate-400" strokeWidth="1.5" />
                    <path d="M 26 16 L 84 10" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <path d="M 96 10 L 154 22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                    <path d="M 166 22 L 214 16" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
                  </svg>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/70 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t("about.philosophy.col1_tag")}
              </div>
            </motion.div>

            {/* Panel 02: Standard Software Platforms */}
            <motion.div 
              variants={itemVariants}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                    {t("about.philosophy.col3_label")}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Package className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-brand-textPrimary mb-2 leading-snug">
                  {t("about.philosophy.col3_title")}
                </h3>

                <p className="text-sm text-brand-textSecondary leading-relaxed mb-3">
                  {t("about.philosophy.col3_primary")}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {t("about.philosophy.col3_supporting")}
                </p>

                {/* Compact Schematic: Predefined Fixed Modules */}
                <div className="rounded-lg border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40 p-3 mb-2">
                  <svg className="w-full h-8 text-slate-400 dark:text-slate-600" viewBox="0 0 240 32" fill="none">
                    <rect x="15" y="6" width="45" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="75" y="6" width="45" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="135" y="6" width="45" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="195" y="6" width="35" height="20" rx="3" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
                    <line x1="22" y1="16" x2="53" y2="16" stroke="currentColor" strokeWidth="1" />
                    <line x1="82" y1="16" x2="113" y2="16" stroke="currentColor" strokeWidth="1" />
                    <line x1="142" y1="16" x2="173" y2="16" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/70 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {t("about.philosophy.col3_tag")}
              </div>
            </motion.div>

          </div>

          {/* ======================================================= */}
          {/* RIGHT 7 COLUMNS: The pyBIM Engineering Core (Canvas)     */}
          {/* ======================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div 
              variants={itemVariants}
              className="rounded-2xl border-2 border-brand-primary/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-7 sm:p-9 lg:p-10 shadow-xl shadow-brand-primary/5 dark:shadow-brand-primary/10 relative overflow-hidden flex flex-col justify-between h-full"
            >
              {/* Subtle Ambient Sheen */}
              <div 
                className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-brand-primary/[0.08] rounded-full blur-3xl"
                aria-hidden="true" 
              />

              <div className="relative z-10">
                
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/25 uppercase">
                    <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                    {t("about.philosophy.col2_label")}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shadow-xs">
                    <Cpu className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                {/* Primary Narrative */}
                <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary mb-3 leading-snug">
                  {t("about.philosophy.col2_title")}
                </h3>

                <p className="text-base text-brand-textPrimary font-medium leading-relaxed mb-3">
                  {t("about.philosophy.col2_primary")}
                </p>

                <p className="text-sm text-brand-textSecondary leading-relaxed mb-6">
                  {t("about.philosophy.col2_supporting")}
                </p>

                {/* ================================================= */}
                {/* DEDICATED ENGINEERING CONTROL DIAGRAM (Large SVG)  */}
                {/* ================================================= */}
                <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/[0.03] dark:bg-blue-950/25 p-5 mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-brand-primary mb-4 pb-2 border-b border-brand-primary/15">
                    <span>{t("about.philosophy.col2_diagram_header")}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">DUAL-BRANCH ORCHESTRATION</span>
                  </div>

                  <svg className="w-full h-auto text-brand-primary" viewBox="0 0 460 170" fill="none">
                    
                    {/* Background Grid Pattern */}
                    <rect x="5" y="5" width="450" height="160" rx="8" className="stroke-brand-primary/20" strokeWidth="1" strokeDasharray="4 4" />

                    {/* ------------------------------------------------ */}
                    {/* PRIMARY BRANCH: Current Engineering Delivery     */}
                    {/* ------------------------------------------------ */}
                    
                    {/* Node 1: Project Information */}
                    <rect x="20" y="24" width="115" height="44" rx="6" className="fill-white dark:fill-slate-900 stroke-brand-primary/50" strokeWidth="1.5" />
                    <text x="77" y="44" textAnchor="middle" className="text-[10px] font-mono font-bold fill-brand-textPrimary" fontSize="10">
                      {t("about.philosophy.col2_node_info")}
                    </text>
                    <text x="77" y="58" textAnchor="middle" className="text-[9px] font-mono fill-brand-textSecondary" fontSize="9">
                      MODELS &amp; SPECS
                    </text>

                    {/* Vector 1 -> 2 */}
                    <path d="M 135 46 L 165 46" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="163,43 169,46 163,49" fill="currentColor" />

                    {/* Node 2: Engineering Processes */}
                    <rect x="170" y="24" width="115" height="44" rx="6" className="fill-brand-primary/15 stroke-brand-primary" strokeWidth="1.5" />
                    <text x="227" y="44" textAnchor="middle" className="text-[10px] font-mono font-bold fill-brand-primary" fontSize="10">
                      {t("about.philosophy.col2_node_process")}
                    </text>
                    <text x="227" y="58" textAnchor="middle" className="text-[9px] font-mono fill-brand-textSecondary" fontSize="9">
                      DISCIPLINE &amp; AUDIT
                    </text>

                    {/* Vector 2 -> 3 */}
                    <path d="M 285 46 L 315 46" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="313,43 319,46 313,49" fill="currentColor" />

                    {/* Node 3: Human Review / Coordinated Deliverables */}
                    <rect x="320" y="18" width="125" height="56" rx="6" className="fill-emerald-500/15 stroke-emerald-500" strokeWidth="1.5" />
                    <text x="382" y="42" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-700 dark:fill-emerald-400" fontSize="10">
                      {t("about.philosophy.col2_node_review")}
                    </text>
                    <text x="382" y="58" textAnchor="middle" className="text-[9px] font-mono fill-emerald-600 dark:fill-emerald-400" fontSize="9">
                      DELIVERY STAGE
                    </text>

                    {/* ------------------------------------------------ */}
                    {/* SECONDARY BRANCH: Internal Software R&D          */}
                    {/* ------------------------------------------------ */}
                    
                    {/* Branch connector from Node 2 downward */}
                    <path d="M 227 68 L 227 98" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <polygon points="224,96 227,102 230,96" fill="currentColor" />

                    {/* Secondary Branch Hub */}
                    <rect x="90" y="104" width="130" height="46" rx="6" className="fill-white dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="155" y="124" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300" fontSize="10">
                      {t("about.philosophy.col2_branch_title")}
                    </text>
                    <text x="155" y="139" textAnchor="middle" className="text-[9px] font-mono fill-brand-primary font-medium" fontSize="9">
                      {t("about.philosophy.col2_branch_step1")}
                    </text>

                    {/* Vector Secondary -> Future automation */}
                    <path d="M 220 127 L 275 127" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <polygon points="273,124 279,127 273,130" fill="currentColor" />

                    {/* Secondary Destination Node: Future Connected Automation */}
                    <rect x="280" y="104" width="150" height="46" rx="6" className="fill-slate-100/70 dark:fill-slate-800/70 stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />
                    <text x="355" y="124" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-300" fontSize="10">
                      {t("about.philosophy.col2_branch_step2")}
                    </text>
                    <text x="355" y="139" textAnchor="middle" className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400" fontSize="9">
                      VALIDATION PIPELINE
                    </text>

                  </svg>
                </div>

                {/* Compact Availability Status Strip */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-brand-textPrimary">
                        {t("about.philosophy.col2_status_services")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-brand-textPrimary">
                        {t("about.philosophy.col2_status_rd")}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] font-mono text-brand-textSecondary pt-2 border-t border-slate-200/60 dark:border-slate-800/60 leading-normal">
                    {t("about.philosophy.col2_status_note")}
                  </p>
                </div>

              </div>

            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
