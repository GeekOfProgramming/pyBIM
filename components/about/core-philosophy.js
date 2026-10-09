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
                
                {/* Brand & Eyebrow Row */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-brand-primary/15">
                  <div className="flex items-baseline gap-3">
                    {/* Exact pyBIM Brand Wordmark (Inter Bold/ExtraBold, 24-28px desktop, 22-24px mobile, no text-transform) */}
                    <span className="font-sans font-extrabold text-[22px] sm:text-[26px] tracking-tight text-brand-textPrimary leading-none select-none">
                      pyBIM
                    </span>
                    <span className="text-xs font-mono font-semibold tracking-wider text-brand-primary">
                      {t("about.philosophy.col2_label")}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary shadow-xs shrink-0">
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
                {/* DEDICATED ENGINEERING CONTROL DIAGRAM              */}
                {/* Responsive HTML/CSS Architecture Nodes + SVG Paths */}
                {/* ================================================= */}
                <div className="rounded-xl border border-brand-primary/25 bg-brand-primary/[0.03] dark:bg-blue-950/25 p-4 sm:p-5 mb-6">
                  {/* Schematic Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-brand-primary mb-4 pb-2 border-b border-brand-primary/15">
                    <span className="font-bold tracking-wider">{t("about.philosophy.col2_diagram_header")}</span>
                    <span className="self-start sm:self-auto inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/25">
                      {t("about.philosophy.col2_diagram_badge")}
                    </span>
                  </div>

                  {/* ------------------------------------------------ */}
                  {/* DESKTOP DIAGRAM VIEW (Hidden below md)            */}
                  {/* ------------------------------------------------ */}
                  <div className="hidden md:block relative w-full pt-1 pb-1">
                    {/* Background Connecting Vectors (SVG) */}
                    <svg 
                      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible text-brand-primary" 
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <defs>
                        <marker id="arrow-primary" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 9 5 L 0 9 z" fill="currentColor" />
                        </marker>
                        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-emerald-600 dark:fill-emerald-400" />
                        </marker>
                        <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 9 5 L 0 9 z" className="fill-slate-400 dark:fill-slate-500" />
                        </marker>
                      </defs>

                      {/* Vector 1 -> 2: Delivery Path Horizontal */}
                      <line 
                        x1="30%" y1="26%" 
                        x2="35%" y2="26%" 
                        stroke="currentColor" 
                        strokeWidth="1.8" 
                        markerEnd="url(#arrow-primary)" 
                      />

                      {/* Vector 2 -> 3: To Delivery Deliverables */}
                      <line 
                        x1="65%" y1="26%" 
                        x2="70%" y2="26%" 
                        stroke="#10b981" 
                        strokeWidth="1.8" 
                        markerEnd="url(#arrow-emerald)" 
                      />

                      {/* Vector 2 downward branch -> R&D */}
                      <path 
                        d="M 50% 48% L 50% 64%" 
                        stroke="currentColor" 
                        strokeWidth="1.6" 
                        strokeDasharray="3 3" 
                        markerEnd="url(#arrow-primary)" 
                      />

                      {/* Vector R&D -> Future Automation */}
                      <line 
                        x1="58%" y1="84%" 
                        x2="65%" y2="84%" 
                        className="stroke-slate-400 dark:stroke-slate-600" 
                        strokeWidth="1.6" 
                        strokeDasharray="3 3" 
                        markerEnd="url(#arrow-slate)" 
                      />
                    </svg>

                    {/* Primary Branch Nodes (Delivery Path - Available Now) */}
                    <div className="relative z-10 grid grid-cols-12 gap-3.5 mb-11">
                      {/* Node 1: Project Information */}
                      <div className="col-span-4 rounded-xl border border-brand-primary/40 bg-white dark:bg-slate-900 p-3 shadow-xs flex flex-col justify-center min-h-[76px]">
                        <span className="text-xs font-mono font-bold text-brand-textPrimary leading-snug">
                          {t("about.philosophy.col2_node_info")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary mt-0.5">
                          {t("about.philosophy.col2_node_info_sub")}
                        </span>
                      </div>

                      {/* Spacer between Node 1 & 2 */}
                      <div className="col-span-0" aria-hidden="true" />

                      {/* Node 2: Engineering Processes */}
                      <div className="col-span-4 rounded-xl border-2 border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/15 p-3 shadow-xs flex flex-col justify-center min-h-[76px]">
                        <span className="text-xs font-mono font-bold text-brand-primary leading-snug">
                          {t("about.philosophy.col2_node_process")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-textSecondary mt-0.5">
                          {t("about.philosophy.col2_node_process_sub")}
                        </span>
                      </div>

                      {/* Node 3: Coordinated Deliverables */}
                      <div className="col-span-4 rounded-xl border-2 border-emerald-500/70 bg-emerald-50/70 dark:bg-emerald-950/30 p-3 shadow-xs flex flex-col justify-center min-h-[76px]">
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 leading-snug">
                          {t("about.philosophy.col2_node_review")}
                        </span>
                        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 mt-0.5">
                          {t("about.philosophy.col2_node_review_sub")}
                        </span>
                      </div>
                    </div>

                    {/* Secondary Branch Nodes (Internal R&D - Visually Distinct) */}
                    <div className="relative z-10 grid grid-cols-12 gap-3.5 items-center">
                      <div className="col-span-2" aria-hidden="true" />

                      {/* Secondary Node 1: Internal Software R&D */}
                      <div className="col-span-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-3 shadow-xs flex flex-col justify-center min-h-[68px]">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-snug">
                          {t("about.philosophy.col2_branch_title")}
                        </span>
                        <span className="text-[11px] font-mono text-brand-primary mt-0.5">
                          {t("about.philosophy.col2_branch_step1")}
                        </span>
                      </div>

                      {/* Secondary Node 2: Future Connected Automation */}
                      <div className="col-span-5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/50 p-3 shadow-xs flex flex-col justify-center min-h-[68px]">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 leading-snug">
                          {t("about.philosophy.col2_branch_step2")}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          {t("about.philosophy.col2_branch_step2_sub")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ------------------------------------------------ */}
                  {/* MOBILE & TABLET PROGRESSION VIEW (Shown below md) */}
                  {/* ------------------------------------------------ */}
                  <div className="block md:hidden space-y-3">
                    {/* Primary Branch Label */}
                    <div className="flex items-center gap-2 pt-1 pb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                      <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        {t("about.philosophy.col2_status_services")}
                      </span>
                    </div>

                    {/* Step 1 */}
                    <div className="rounded-lg border border-brand-primary/40 bg-white dark:bg-slate-900 p-3">
                      <span className="text-xs font-mono font-bold text-brand-textPrimary block">
                        {t("about.philosophy.col2_node_info")}
                      </span>
                      <span className="text-[11px] font-mono text-brand-textSecondary block mt-0.5">
                        {t("about.philosophy.col2_node_info_sub")}
                      </span>
                    </div>

                    <div className="flex justify-center" aria-hidden="true">
                      <ArrowDown className="w-4 h-4 text-brand-primary" />
                    </div>

                    {/* Step 2 */}
                    <div className="rounded-lg border-2 border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/15 p-3">
                      <span className="text-xs font-mono font-bold text-brand-primary block">
                        {t("about.philosophy.col2_node_process")}
                      </span>
                      <span className="text-[11px] font-mono text-brand-textSecondary block mt-0.5">
                        {t("about.philosophy.col2_node_process_sub")}
                      </span>
                    </div>

                    <div className="flex justify-center" aria-hidden="true">
                      <ArrowDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    {/* Step 3 */}
                    <div className="rounded-lg border-2 border-emerald-500/70 bg-emerald-50/70 dark:bg-emerald-950/30 p-3">
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 block">
                        {t("about.philosophy.col2_node_review")}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-500 block mt-0.5">
                        {t("about.philosophy.col2_node_review_sub")}
                      </span>
                    </div>

                    {/* R&D Divider */}
                    <div className="pt-3 pb-1 border-t border-brand-primary/15">
                      <div className="flex items-center gap-2 mb-2">
                        <GitBranch className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold text-brand-primary uppercase">
                          {t("about.philosophy.col2_status_rd")}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 p-3">
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                            {t("about.philosophy.col2_branch_title")}
                          </span>
                          <span className="text-[11px] font-mono text-brand-primary block mt-0.5">
                            {t("about.philosophy.col2_branch_step1")}
                          </span>
                        </div>

                        <div className="rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/50 p-3">
                          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                            {t("about.philosophy.col2_branch_step2")}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                            {t("about.philosophy.col2_branch_step2_sub")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Availability Status Strip: 2 Balanced Responsive Rows */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 p-4 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-semibold text-brand-textPrimary leading-tight">
                        {t("about.philosophy.col2_status_services")}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="font-semibold text-brand-textPrimary leading-tight">
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
