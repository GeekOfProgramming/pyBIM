"use client";

import { useId } from "react";
import { 
  FileText, 
  SlidersHorizontal, 
  Cpu, 
  ClipboardCheck, 
  Workflow, 
  Boxes, 
  FileCheck2, 
  Layers, 
  GitBranch, 
  ShieldAlert,
  FileSpreadsheet
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ServicesSectionBackdrop from "@/components/sections/services-section-backdrop";

export default function ServicesExecutionPipeline({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  const pipeline = data || {
    tag: "ENGINEERING DELIVERY PROCESS",
    headline: "From Project Requirements to Reviewed BIM Deliverables.",
    subtitle: "A structured delivery approach connects project information requirements, practical automation, controlled implementation, and engineering review. Each workflow is adapted to the needs of the project.",
    labels: {
      outputLabel: "TYPICAL OUTPUT",
      illustrativeLabel: "ILLUSTRATIVE PROCESS",
      mapTitle: "DELIVERY TIMELINE"
    },
    steps: []
  };

  const steps = pipeline.steps || [];
  const labels = pipeline.labels || {
    outputLabel: "TYPICAL OUTPUT",
    illustrativeLabel: "ILLUSTRATIVE PROCESS",
    mapTitle: "DELIVERY TIMELINE"
  };

  const getStageTheme = (idx) => {
    switch (idx) {
      case 0:
        return {
          icon: <FileText className="w-5 h-5 text-brand-primary" aria-hidden="true" />,
          accentText: "text-brand-primary",
          accentBg: "bg-brand-primary/10",
          accentBorder: "border-brand-primary/30",
          borderHover: "hover:border-brand-primary/40",
          spineColor: "#2563eb",
          badgeColor: "bg-brand-primary text-white"
        };
      case 1:
        return {
          icon: <SlidersHorizontal className="w-5 h-5 text-sky-500 dark:text-sky-400" aria-hidden="true" />,
          accentText: "text-sky-600 dark:text-sky-400",
          accentBg: "bg-sky-500/10",
          accentBorder: "border-sky-500/30",
          borderHover: "hover:border-sky-500/40",
          spineColor: "#0ea5e9",
          badgeColor: "bg-sky-600 text-white"
        };
      case 2:
        return {
          icon: <Cpu className="w-5 h-5 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />,
          accentText: "text-indigo-600 dark:text-indigo-400",
          accentBg: "bg-indigo-500/10",
          accentBorder: "border-indigo-500/30",
          borderHover: "hover:border-indigo-500/40",
          spineColor: "#6366f1",
          badgeColor: "bg-indigo-600 text-white"
        };
      case 3:
      default:
        return {
          icon: <ClipboardCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />,
          accentText: "text-emerald-600 dark:text-emerald-400",
          accentBg: "bg-emerald-500/10",
          accentBorder: "border-emerald-500/30",
          borderHover: "hover:border-emerald-500/40",
          spineColor: "#10b981",
          badgeColor: "bg-emerald-600 text-white"
        };
    }
  };

  return (
    <section 
      id="execution-pipeline"
      className="py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border relative overflow-hidden scroll-mt-20 lg:scroll-mt-24"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Background Architectural Canvas (Family A - Base) */}
      <ServicesSectionBackdrop variant="base" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header with Process Overview Badge */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-14 lg:mb-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
              <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
                {pipeline.tag}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-technical font-mono font-semibold text-brand-textSecondary">
                <Workflow className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                {labels.mapTitle}
              </span>
              <span className="text-technical font-mono font-semibold px-2 py-0.5 rounded bg-brand-card border border-brand-border text-brand-textSecondary/80 hidden sm:inline-block">
                {labels.illustrativeLabel}
              </span>
            </div>
          </div>

          <h2 
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {pipeline.headline}
          </h2>

          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed max-w-3xl">
            {pipeline.subtitle}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* FOUR-STAGE STORYBOARD WITH DEDICATED PROCESS SPINE GUTTER                 */}
        {/* The spine has its own column on desktop and connects directly into stages */}
        {/* ========================================================================= */}
        <div className="space-y-8 lg:space-y-10">
          {steps.map((step, idx) => {
            const theme = getStageTheme(idx);
            const artifact = step.artifact || {};
            const diagram = step.diagram || {};
            const actionLabel = artifact.actionLabel || "SPEC";
            const isLast = idx === steps.length - 1;

            return (
              <div 
                key={step.num || idx} 
                className="relative lg:grid lg:grid-cols-[56px_1fr] lg:gap-8 items-start"
              >
                {/* ------------------------------------------------------------- */}
                {/* DEDICATED PROCESS SPINE COLUMN (Desktop Visible Rail)         */}
                {/* ------------------------------------------------------------- */}
                <div className="hidden lg:flex flex-col items-center self-stretch relative pt-6" aria-hidden="true">
                  {/* Milestone Node */}
                  <div 
                    className={`w-12 h-12 rounded-2xl ${theme.accentBg} border-2 ${theme.accentBorder} flex items-center justify-center font-mono font-bold text-caption text-brand-textPrimary shrink-0 z-10 shadow-sm bg-brand-surface`}
                  >
                    {step.num || `0${idx + 1}`}
                  </div>

                  {/* Horizontal Branch Connector into Card */}
                  <div className="absolute top-12 left-12 w-8 h-px border-t-2 border-dashed border-brand-border dark:border-slate-700 pointer-events-none z-0" />

                  {/* Vertical Spine Segment to next milestone or terminal completion */}
                  {!isLast ? (
                    <div className="w-0.5 flex-1 relative my-2 bg-brand-border/60 dark:bg-slate-800">
                      <motion.div
                        className="w-full absolute inset-0 origin-top"
                        style={{ backgroundColor: theme.spineColor }}
                        initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center my-2 flex-1 max-h-56 min-h-[140px]">
                      <div className="w-0.5 flex-1 relative bg-brand-border/60 dark:bg-slate-800">
                        <motion.div
                          className="w-full absolute inset-0 origin-top"
                          style={{ backgroundColor: theme.spineColor }}
                          initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      {/* Terminal Endpoint Node communicating finished delivery pipeline */}
                      <motion.div 
                        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.45 }}
                        className="w-4 h-4 rounded-full border-2 border-emerald-500 bg-brand-surface shadow-sm shadow-emerald-500/25 flex items-center justify-center shrink-0 mt-1 ring-4 ring-emerald-500/10"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* ------------------------------------------------------------- */}
                {/* MILESTONE CARD ARTICLE                                        */}
                {/* ------------------------------------------------------------- */}
                <motion.article
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative rounded-2xl lg:rounded-3xl bg-brand-cardElevated backdrop-blur-sm border border-brand-border/80 ${theme.borderHover} p-6 sm:p-8 lg:p-10 shadow-sm transition-colors duration-200`}
                >
                  {/* Milestone Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-brand-border/60">
                    <div className="flex items-center gap-3.5">
                      {/* Mobile-only milestone number tag */}
                      <span className="lg:hidden text-technical font-mono font-bold text-brand-textSecondary px-2.5 py-1 rounded-lg bg-brand-surface border border-brand-border shrink-0">
                        {step.num || `0${idx + 1}`}
                      </span>

                      {/* Icon Badge */}
                      <div className={`w-10 h-10 rounded-2xl ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center shrink-0`}>
                        {theme.icon}
                      </div>

                      <div>
                        <span className={`text-technical font-mono font-bold ${theme.accentText} uppercase tracking-wider block`}>
                          {step.mapLabel || `STAGE 0${idx + 1}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-technical font-mono font-bold text-brand-textSecondary/80 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border">
                        {artifact.badge || `PHASE // 0${idx + 1}`}
                      </span>
                    </div>
                  </div>

                  {/* Asymmetric 5/7 Grid Composition */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    
                    {/* Left Narrative Area (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-card-title font-bold text-brand-textPrimary mb-3 tracking-tight leading-snug">
                          {step.title}
                        </h3>

                        <p className="text-body-sm sm:text-body text-brand-textSecondary font-medium leading-relaxed mb-6">
                          {step.desc}
                        </p>
                      </div>

                      {/* Typical Output Box */}
                      {step.output && (
                        <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border/80 flex items-start gap-3 mt-auto">
                          <div className={`w-5 h-5 rounded-md ${theme.accentBg} border ${theme.accentBorder} flex items-center justify-center shrink-0 mt-0.5`}>
                            <span className={`text-caption font-bold ${theme.accentText}`}>→</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-technical font-mono font-bold text-brand-textSecondary block uppercase tracking-wider mb-1">
                              {labels.outputLabel}
                            </span>
                            <span className="text-caption sm:text-body-sm font-semibold text-brand-textPrimary block break-words leading-relaxed">
                              {step.output}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Visual HUD Panel (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                      <figure 
                        className="rounded-xl border border-brand-border/80 bg-brand-surface/70 dark:bg-slate-950/60 p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between h-full m-0"
                        aria-label={step.title}
                      >
                        <figcaption className="sr-only">
                          {step.srDescription || step.desc}
                        </figcaption>

                        {/* Visual Top Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-brand-border/60 text-technical font-mono">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${theme.badgeColor} shrink-0`} aria-hidden="true" />
                            <span className="font-bold text-brand-textPrimary uppercase tracking-wider">
                              {artifact.heading || "STAGE SPECIFICATION"}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${theme.accentBg} ${theme.accentText} border ${theme.accentBorder}`}>
                            {actionLabel}
                          </span>
                        </div>

                        {/* --- STAGE 01 GRAPHIC: Requirements Specification & Scope Mapping --- */}
                        {idx === 0 && (
                          <div className="space-y-3.5 my-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                              {/* Source Inputs Block */}
                              <div className="sm:col-span-5 bg-brand-card p-3 rounded-lg border border-brand-border/70 shadow-sm text-technical font-mono">
                                <div className="flex items-center gap-1.5 text-brand-textSecondary mb-1 font-semibold">
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.sourceBadge || "CLIENT EIR / BEP"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.sourceLabel || "Project Requirements"}
                                </span>
                              </div>

                              {/* Directional Connector Arrow */}
                              <div className="sm:col-span-2 flex items-center justify-center py-1 sm:py-0" aria-hidden="true">
                                <svg className="w-8 h-6 overflow-visible hidden sm:block" viewBox="0 0 32 24" fill="none">
                                  <motion.path
                                    d="M 2 12 L 23 12"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeDasharray="3 3"
                                    className="text-brand-primary/70"
                                    initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: 0.2 }}
                                  />
                                  <polygon points="21,8 29,12 21,16" fill="currentColor" className="text-brand-primary" />
                                </svg>
                                <span className="sm:hidden text-caption text-brand-primary font-bold">↓</span>
                              </div>

                              {/* Scope Target Block */}
                              <div className="sm:col-span-5 bg-brand-primary/10 dark:bg-brand-primary/15 p-3 rounded-lg border border-brand-primary/30 text-technical font-mono shadow-sm">
                                <div className="flex items-center gap-1.5 text-brand-primary mb-1 font-bold">
                                  <FileCheck2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.targetBadge || "TECHNICAL SCOPE"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.targetLabel || "Defined Acceptance Criteria"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* --- STAGE 02 GRAPHIC: Connected Rule Logic & Automation Flow --- */}
                        {/* Parameter Mapping → Validation Logic → API Task Scoping */}
                        {idx === 1 && (
                          <div className="space-y-3.5 my-auto">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 font-mono text-technical">
                              {/* Node 1: Parameter Mapping */}
                              <motion.div 
                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.15 }}
                                className="flex-1 bg-brand-card p-3 rounded-lg border border-brand-border/70 text-center shadow-sm"
                              >
                                <span className="block text-brand-textSecondary font-semibold mb-1 uppercase tracking-wider text-technical">
                                  {diagram.node1Badge || "RULE LAYER"}
                                </span>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.node1Label || "Parameter Mapping"}
                                </span>
                              </motion.div>

                              {/* Vector Connector 1 -> 2 */}
                              <div className="hidden sm:flex items-center justify-center w-8 shrink-0" aria-hidden="true">
                                <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 20" fill="none">
                                  <motion.path
                                    d="M 2 10 L 22 10"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeDasharray="3 3"
                                    className="text-sky-500/70"
                                    initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.2 }}
                                  />
                                  <polygon points="20,6 28,10 20,14" fill="currentColor" className="text-sky-500" />
                                </svg>
                              </div>
                              <div className="sm:hidden flex justify-center py-0.5 text-sky-500" aria-hidden="true">
                                <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none">
                                  <path d="M 8 2 L 8 14" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 2" />
                                  <polygon points="4,12 8,18 12,12" fill="currentColor" />
                                </svg>
                              </div>

                              {/* Node 2: Validation Rules (Logic Gate) */}
                              <motion.div 
                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.28 }}
                                className="flex-1 bg-sky-500/10 dark:bg-sky-950/40 p-3 rounded-lg border border-sky-500/40 text-center shadow-sm"
                              >
                                <span className="block text-sky-600 dark:text-sky-400 font-bold mb-1 uppercase tracking-wider text-technical">
                                  {diagram.node2Badge || "LOGIC GATE"}
                                </span>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.node2Label || "Validation Rules"}
                                </span>
                              </motion.div>

                              {/* Vector Connector 2 -> 3 */}
                              <div className="hidden sm:flex items-center justify-center w-8 shrink-0" aria-hidden="true">
                                <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 20" fill="none">
                                  <motion.path
                                    d="M 2 10 L 22 10"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeDasharray="3 3"
                                    className="text-sky-500/70"
                                    initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.35 }}
                                  />
                                  <polygon points="20,6 28,10 20,14" fill="currentColor" className="text-sky-500" />
                                </svg>
                              </div>
                              <div className="sm:hidden flex justify-center py-0.5 text-sky-500" aria-hidden="true">
                                <svg className="w-4 h-5" viewBox="0 0 16 20" fill="none">
                                  <path d="M 8 2 L 8 14" stroke="currentColor" strokeWidth="1.75" strokeDasharray="2 2" />
                                  <polygon points="4,12 8,18 12,12" fill="currentColor" />
                                </svg>
                              </div>

                              {/* Node 3: API Task Scoping */}
                              <motion.div 
                                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.42 }}
                                className="flex-1 bg-brand-card p-3 rounded-lg border border-brand-border/70 text-center shadow-sm"
                              >
                                <span className="block text-brand-textSecondary font-semibold mb-1 uppercase tracking-wider text-technical">
                                  {diagram.node3Badge || "AUTOMATION"}
                                </span>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.node3Label || "API Task Scoping"}
                                </span>
                              </motion.div>
                            </div>
                          </div>
                        )}

                        {/* --- STAGE 03 GRAPHIC: Engineering Execution & Coordination Pathways --- */}
                        {idx === 2 && (
                          <div className="space-y-3.5 my-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                              {/* Source Host Model */}
                              <div className="sm:col-span-5 bg-brand-card p-3 rounded-lg border border-brand-border/70 shadow-sm text-technical font-mono">
                                <div className="flex items-center gap-1.5 text-brand-textSecondary mb-1 font-semibold">
                                  <Boxes className="w-3.5 h-3.5 text-indigo-500 shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.sourceBadge || "MODEL HOST"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.sourceLabel || "Revit API Execution"}
                                </span>
                              </div>

                              {/* Connector */}
                              <div className="sm:col-span-2 flex items-center justify-center py-1 sm:py-0" aria-hidden="true">
                                <svg className="w-8 h-6 overflow-visible hidden sm:block" viewBox="0 0 32 24" fill="none">
                                  <motion.path
                                    d="M 2 12 L 23 12"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeDasharray="3 3"
                                    className="text-indigo-500/70"
                                    initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: 0.2 }}
                                  />
                                  <polygon points="21,8 29,12 21,16" fill="currentColor" className="text-indigo-500" />
                                </svg>
                                <span className="sm:hidden text-caption text-indigo-500 font-bold">↓</span>
                              </div>

                              {/* Multi-discipline Coordinated Target */}
                              <div className="sm:col-span-5 bg-indigo-500/10 dark:bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/35 text-technical font-mono shadow-sm">
                                <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 mb-1 font-bold">
                                  <Layers className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.targetBadge || "COORDINATION"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.targetLabel || "Synchronized Outputs"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* --- STAGE 04 GRAPHIC: Quality Review Gate & Handover Package --- */}
                        {idx === 3 && (
                          <div className="space-y-3.5 my-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                              {/* Audit & Issue Tracking */}
                              <div className="sm:col-span-5 bg-brand-card p-3 rounded-lg border border-brand-border/70 shadow-sm text-technical font-mono">
                                <div className="flex items-center gap-1.5 text-brand-textSecondary mb-1 font-semibold">
                                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.sourceBadge || "AUDIT DOSSIER"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.sourceLabel || "BCF Issue Tracking"}
                                </span>
                              </div>

                              {/* Connector */}
                              <div className="sm:col-span-2 flex items-center justify-center py-1 sm:py-0" aria-hidden="true">
                                <svg className="w-8 h-6 overflow-visible hidden sm:block" viewBox="0 0 32 24" fill="none">
                                  <motion.path
                                    d="M 2 12 L 23 12"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeDasharray="3 3"
                                    className="text-emerald-500/70"
                                    initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: 0.2 }}
                                  />
                                  <polygon points="21,8 29,12 21,16" fill="currentColor" className="text-emerald-500" />
                                </svg>
                                <span className="sm:hidden text-caption text-emerald-500 font-bold">↓</span>
                              </div>

                              {/* Handover Package Target */}
                              <div className="sm:col-span-5 bg-emerald-500/10 dark:bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/35 text-technical font-mono shadow-sm">
                                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1 font-bold">
                                  <ClipboardCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                  <span className="truncate">{diagram.targetBadge || "HANDOVER PACKAGE"}</span>
                                </div>
                                <span className="text-caption font-bold text-brand-textPrimary block">
                                  {diagram.targetLabel || "Reviewed Deliverables"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Artifact Tags Bottom Footer */}
                        {artifact.tags && (
                          <div className="pt-3 mt-4 border-t border-brand-border/60">
                            <div className="flex flex-wrap gap-2">
                              {artifact.tags.map((tag, tIdx) => (
                                <span 
                                  key={tIdx}
                                  className="inline-flex items-center text-caption font-mono font-medium px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary"
                                >
                                  <GitBranch className="w-3 h-3 mr-1 text-brand-textSecondary/70" aria-hidden="true" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                      </figure>
                    </div>

                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
