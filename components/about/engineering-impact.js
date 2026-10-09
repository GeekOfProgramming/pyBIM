"use client";

import { useState, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  FileCheck2, 
  ShieldCheck, 
  Boxes, 
  Workflow, 
  ArrowDown
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

export default function EngineeringImpact() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  // Selected outcome state: "outcome1" | "outcome2" | "outcome3"
  const [activeOutcomeId, setActiveOutcomeId] = useState("outcome1");

  // Outcomes definition metadata
  const outcomes = [
    {
      id: "outcome1",
      numKey: "about.impact.v2.outcome1.num",
      titleKey: "about.impact.v2.outcome1.title",
      descKey: "about.impact.v2.outcome1.desc",
      icon: Workflow,
      accentColor: "blue",
      badgeStyle: "bg-blue-500/10 text-brand-primary border-blue-500/20",
      activeBorder: "border-brand-primary ring-1 ring-brand-primary/30 bg-brand-base dark:bg-slate-900 shadow-md",
      inactiveBorder: "border-brand-border bg-brand-base/60 dark:bg-slate-900/50 hover:border-brand-primary/40",
      iconBoxStyle: "bg-blue-500/10 text-brand-primary border-blue-500/20",
    },
    {
      id: "outcome2",
      numKey: "about.impact.v2.outcome2.num",
      titleKey: "about.impact.v2.outcome2.title",
      descKey: "about.impact.v2.outcome2.desc",
      icon: FileCheck2,
      accentColor: "cyan",
      badgeStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
      activeBorder: "border-cyan-500 ring-1 ring-cyan-500/30 bg-brand-base dark:bg-slate-900 shadow-md",
      inactiveBorder: "border-brand-border bg-brand-base/60 dark:bg-slate-900/50 hover:border-cyan-500/40",
      iconBoxStyle: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    },
    {
      id: "outcome3",
      numKey: "about.impact.v2.outcome3.num",
      titleKey: "about.impact.v2.outcome3.title",
      descKey: "about.impact.v2.outcome3.desc",
      icon: Boxes,
      accentColor: "indigo",
      badgeStyle: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
      activeBorder: "border-indigo-500 ring-1 ring-indigo-500/30 bg-brand-base dark:bg-slate-900 shadow-md",
      inactiveBorder: "border-brand-border bg-brand-base/60 dark:bg-slate-900/50 hover:border-indigo-500/40",
      iconBoxStyle: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
  ];

  const currentOutcome = outcomes.find((o) => o.id === activeOutcomeId) || outcomes[0];

  // Container variants for entrance
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
          className="max-w-3xl mb-14 lg:mb-18"
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
        {/* INTERACTIVE ENGINEERING OUTCOMES INSPECTOR                */}
        {/* Asymmetric 5 / 7 Desktop Architecture                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 lg:mb-16 items-start">
          
          {/* ------------------------------------------------------- */}
          {/* LEFT: Outcome Selector (5 Columns on Desktop)            */}
          {/* ------------------------------------------------------- */}
          <div 
            className="lg:col-span-5 flex flex-col gap-4"
            role="tablist"
            aria-label={t("about.impact.v2.eyebrow")}
          >
            {outcomes.map((item) => {
              const isSelected = activeOutcomeId === item.id;
              const IconComponent = item.icon;

              return (
                <button
                  key={item.id}
                  id={`outcome-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`outcome-panel-${item.id}`}
                  onClick={() => setActiveOutcomeId(item.id)}
                  className={`text-left w-full rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 relative ${
                    isSelected ? item.activeBorder : item.inactiveBorder
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`inline-flex items-center justify-center font-mono text-xs font-bold px-2.5 py-1 rounded-md border shrink-0 ${item.badgeStyle}`}>
                        {t(item.numKey)}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-brand-textPrimary tracking-tight break-words">
                        {t(item.titleKey)}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${item.iconBoxStyle}`}>
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed break-words">
                    {t(item.descKey)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT: Technical Inspector Panel (7 Columns on Desktop)  */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7">
            <div 
              id={`outcome-panel-${currentOutcome.id}`}
              role="tabpanel"
              aria-labelledby={`outcome-tab-${currentOutcome.id}`}
              className="rounded-2xl sm:rounded-3xl border border-brand-border bg-brand-base/90 dark:bg-slate-900/90 backdrop-blur-md p-6 sm:p-8 lg:p-9 shadow-md relative overflow-hidden"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div 
                className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 transition-colors duration-500 ${
                  currentOutcome.id === "outcome1" 
                    ? "bg-blue-500/10" 
                    : currentOutcome.id === "outcome2" 
                    ? "bg-cyan-500/10" 
                    : "bg-indigo-500/10"
                }`} 
                aria-hidden="true"
              />

              {/* Inspector Content with smooth 250ms crossfade */}
              <motion.div
                key={currentOutcome.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: shouldReduceMotion ? 0.05 : 0.25, ease: "easeOut" }}
                className="relative z-10 flex flex-col justify-between"
              >
                {/* Inspector Header */}
                <div className="mb-6 pb-5 border-b border-brand-border/70">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                      {t("about.impact.v2.inspector.badge")} // {t(currentOutcome.numKey)}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-brand-surface text-brand-textSecondary border border-brand-border/60">
                      {t("about.impact.v2.inspector.flow_direction")}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary tracking-tight mb-2 break-words">
                    {t(currentOutcome.titleKey)}
                  </h3>

                  <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed break-words">
                    {t(currentOutcome.descKey)}
                  </p>
                </div>

                {/* Dedicated Engineering Process Diagram Area */}
                <div 
                  className="rounded-xl border border-brand-border bg-brand-surface/90 dark:bg-slate-950/70 p-5 sm:p-6"
                  role="region"
                  aria-label={t("about.impact.v2.inspector.diagram_label")}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-brand-textSecondary/80 mb-4 px-1">
                    <span className="uppercase tracking-wider font-semibold text-brand-primary">
                      {currentOutcome.id === "outcome1" 
                        ? t("about.impact.v2.diag.process_sequence")
                        : currentOutcome.id === "outcome2"
                        ? t("about.impact.v2.diag.verification_schema")
                        : t("about.impact.v2.diag.coordination_model")}
                    </span>
                    <span>
                      {currentOutcome.id === "outcome1"
                        ? t("about.impact.v2.diag.stages_count")
                        : currentOutcome.id === "outcome2"
                        ? t("about.impact.v2.diag.audit_layers")
                        : t("about.impact.v2.diag.handover_rail")}
                    </span>
                  </div>

                  {/* DIAGRAM 01: Workflow Efficiency */}
                  {currentOutcome.id === "outcome1" && (
                    <div className="flex flex-col gap-3">
                      {/* Step 1: Manual Tasks */}
                      <div className="rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row: Status dot + Full process title */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome1.diag_step1_title")}
                          </h4>
                        </div>
                        {/* Lower row: Full process description + wrapped badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-brand-border/30">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome1.diag_step1_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                            {t("about.impact.v2.diag.stage_01")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-brand-primary" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 2: Structured Workflow */}
                      <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 dark:bg-cyan-950/20 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-cyan-700 dark:text-cyan-300 break-words">
                            {t("about.impact.v2.outcome1.diag_step2_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-cyan-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome1.diag_step2_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 shrink-0 border border-cyan-500/20 font-medium">
                            {t("about.impact.v2.diag.automated")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-brand-primary" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Step 3: Engineering Review */}
                      <div className="rounded-lg border border-blue-500/40 bg-blue-500/10 dark:bg-blue-950/30 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome1.diag_step3_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-blue-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome1.diag_step3_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/20 text-brand-primary font-medium shrink-0 border border-blue-500/30">
                            {t("about.impact.v2.diag.expert_gate")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DIAGRAM 02: Information Quality */}
                  {currentOutcome.id === "outcome2" && (
                    <div className="flex flex-col gap-3">
                      {/* Layer 1: Model Data */}
                      <div className="rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome2.diag_step1_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-brand-border/30">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome2.diag_step1_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                            {t("about.impact.v2.diag.input_data")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-cyan-600 dark:text-cyan-400" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Layer 2: Defined Rules */}
                      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/20 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome2.diag_step2_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-blue-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome2.diag_step2_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-brand-primary shrink-0 border border-blue-500/20 font-medium">
                            {t("about.impact.v2.diag.rule_matrix")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-cyan-600 dark:text-cyan-400" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Layer 3: Reviewable Issues */}
                      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome2.diag_step3_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome2.diag_step3_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-500/20 font-medium">
                            {t("about.impact.v2.diag.flagged_action")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DIAGRAM 03: Connected Delivery */}
                  {currentOutcome.id === "outcome3" && (
                    <div className="flex flex-col gap-3">
                      {/* Inputs: 3 Disciplines */}
                      <div className="rounded-lg border border-brand-border/60 bg-brand-base/60 dark:bg-slate-900/60 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome3.diag_step1_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-brand-border/30">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome3.diag_step1_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-brand-surface text-brand-textSecondary shrink-0 border border-brand-border/40">
                            {t("about.impact.v2.diag.three_disciplines")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Exchange: OpenBIM */}
                      <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 dark:bg-indigo-950/20 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-indigo-700 dark:text-indigo-300 break-words">
                            {t("about.impact.v2.outcome3.diag_step2_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-indigo-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome3.diag_step2_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 shrink-0 border border-indigo-500/20 font-medium">
                            {t("about.impact.v2.diag.ifc_bcf")}
                          </span>
                        </div>
                      </div>

                      {/* Directional Downward Connector Arrow */}
                      <div className="flex justify-center -my-1 text-indigo-600 dark:text-indigo-400" aria-hidden="true">
                        <ArrowDown className="w-4 h-4" />
                      </div>

                      {/* Output: Reviewed Deliverables */}
                      <div className="rounded-lg border border-brand-primary/40 bg-brand-primary/10 dark:bg-blue-950/30 p-3 sm:p-3.5 space-y-2">
                        {/* Upper row */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0" />
                          <h4 className="text-sm sm:text-base font-semibold text-brand-textPrimary break-words">
                            {t("about.impact.v2.outcome3.diag_step3_title")}
                          </h4>
                        </div>
                        {/* Lower row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-blue-500/20">
                          <p className="text-xs sm:text-sm text-brand-textSecondary leading-snug break-words">
                            {t("about.impact.v2.outcome3.diag_step3_sub")}
                          </p>
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/20 text-brand-primary font-medium shrink-0 border border-blue-500/30">
                            {t("about.impact.v2.diag.coordinated")}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          </div>

        </div>

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
                  {/* Clean static status dot (no infinite pulse) */}
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
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
