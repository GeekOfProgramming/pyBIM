"use client";

import { useState, useId } from "react";
import { 
  Workflow, 
  ShieldCheck, 
  Boxes, 
  Sparkles,
  ArrowRight,
  Layers,
  Code2,
  FileCheck2,
  GitBranch,
  Terminal,
  Cpu,
  Eye,
  CheckCircle2,
  Radio
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function ServicesEngineeringOutcomes({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const [selectedIdx, setSelectedIdx] = useState(0);

  // Fallback defaults if data is missing or loading
  const outcomes = data || {
    tag: "ENGINEERING OUTCOMES",
    headline: "More Control Across the BIM Delivery Process.",
    subtitle: "Practical engineering workflows can help teams reduce repetitive operations, improve the consistency of model information, and make better use of their existing BIM environment. The approach and results depend on each project's requirements.",
    labels: {
      canvasLabel: "ENGINEERING IMPACT CANVAS",
      interactiveNote: "Select an outcome to inspect the workflow architecture",
      activeFocus: "ACTIVE FOCUS"
    },
    columns: []
  };

  const columns = outcomes.columns || [];
  const labels = outcomes.labels || {
    canvasLabel: "ENGINEERING IMPACT CANVAS",
    interactiveNote: "Select an outcome to inspect the workflow architecture",
    activeFocus: "ACTIVE FOCUS"
  };

  const activeColumn = columns[selectedIdx] || columns[0] || {};

  const getOutcomeIcon = (iconKey, className = "w-5 h-5") => {
    switch (iconKey) {
      case "Workflow":
      case "efficiency":
        return <Workflow className={className} aria-hidden="true" />;
      case "ShieldCheck":
      case "quality":
        return <ShieldCheck className={className} aria-hidden="true" />;
      case "Boxes":
      case "integration":
      default:
        return <Boxes className={className} aria-hidden="true" />;
    }
  };

  const getOutcomeAccent = (idx) => {
    switch (idx) {
      case 0:
        return {
          text: "text-brand-primary",
          border: "border-brand-primary",
          ring: "ring-brand-primary/20",
          bg: "bg-brand-primary/10",
          solidBg: "bg-brand-primary",
          lightBorder: "border-brand-primary/30"
        };
      case 1:
        return {
          text: "text-sky-600 dark:text-sky-400",
          border: "border-sky-500",
          ring: "ring-sky-500/20",
          bg: "bg-sky-500/10",
          solidBg: "bg-sky-500",
          lightBorder: "border-sky-500/30"
        };
      case 2:
      default:
        return {
          text: "text-indigo-600 dark:text-indigo-400",
          border: "border-indigo-500",
          ring: "ring-indigo-500/20",
          bg: "bg-indigo-500/10",
          solidBg: "bg-indigo-500",
          lightBorder: "border-indigo-500/30"
        };
    }
  };

  return (
    <section 
      id="engineering-outcomes"
      className="scroll-mt-28 relative py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      {/* ========================================================================= */}
      {/* ARCHITECTURAL BACKGROUND: Precision Engineering Connected Field           */}
      {/* Layered information contours, technical registration marks & subtle glow */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Localized focal lighting */}
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-brand-primary/[0.04] via-sky-500/[0.02] to-transparent dark:from-brand-primary/[0.08] dark:via-sky-500/[0.03] dark:to-transparent rounded-full blur-[100px] pointer-events-none" />

        {/* Technical Coordinate Field (Sparse precision lines, not a generic dense grid) */}
        <svg 
          className="absolute inset-0 w-full h-full stroke-slate-400/25 dark:stroke-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`${baseId}-outcomes-field`} width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.4" />
              <line x1="2" y1="2" x2="16" y2="2" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
              <line x1="2" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${baseId}-outcomes-field)`} />
        </svg>

        {/* Architectural Structural Axis Guides */}
        <div className="max-w-7xl mx-auto h-full px-6 lg:px-8 relative">
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px border-l border-dashed border-slate-300/30 dark:border-slate-800/50" />
          <div className="absolute right-6 lg:right-8 top-0 bottom-0 w-px border-r border-dashed border-slate-300/30 dark:border-slate-800/50" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {outcomes.tag}
            </span>
          </div>

          <h2 
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {outcomes.headline}
          </h2>

          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed max-w-3xl">
            {outcomes.subtitle}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* DESKTOP: ENGINEERING IMPACT CANVAS (Left 3 Narratives + Right Large Canvas) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN (5 COLS): 3 Outcome Narratives with Interactive Focus       */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {columns.map((col, idx) => {
              const isSelected = selectedIdx === idx;
              const accent = getOutcomeAccent(idx);

              return (
                <div
                  key={col.id || idx}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIdx(idx);
                    }
                  }}
                  className={`text-left p-6 xl:p-7 rounded-2xl transition-all duration-200 cursor-pointer relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                    isSelected
                      ? `bg-brand-card border-2 ${accent.border} shadow-md ring-2 ${accent.ring}`
                      : "bg-brand-card/80 border border-brand-border/70 hover:border-brand-border hover:bg-brand-card"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isSelected && (
                    <motion.div
                      layoutId={`${baseId}-active-pill`}
                      className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${accent.solidBg}`}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    />
                  )}

                  {/* Header Row: Num + Category + Selection Tag */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl ${accent.bg} border ${accent.lightBorder} flex items-center justify-center shrink-0`}>
                        {getOutcomeIcon(col.icon || col.id, "w-4 h-4")}
                      </div>
                      <span className={`text-technical font-mono font-bold uppercase tracking-wider ${accent.text}`}>
                        {col.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-technical font-mono font-bold text-brand-textSecondary px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
                        {col.num || `0${idx + 1}`}
                      </span>
                    </div>
                  </div>

                  {/* Outcome Title (H3) */}
                  <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5">
                    {col.title}
                  </h3>

                  {/* Full Description (Never clipped or hidden) */}
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-4">
                    {col.desc}
                  </p>

                  {/* Topics Pills */}
                  {Array.isArray(col.topics) && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-border/50">
                      {col.topics.map((topic, tIdx) => (
                        <span 
                          key={tIdx}
                          className="inline-flex items-center text-technical font-mono font-medium px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-textSecondary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN (7 COLS): Unified Engineering Impact Canvas Visual         */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 sticky top-28">
            <figure 
              className="rounded-3xl bg-brand-card/95 border border-brand-border shadow-lg p-6 xl:p-8 backdrop-blur-sm relative overflow-hidden"
              aria-label={`${activeColumn.title} - ${labels.canvasLabel}`}
            >
              <figcaption className="sr-only">
                {activeColumn.title}: {activeColumn.desc}
              </figcaption>

              {/* Canvas HUD Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-brand-border/70 text-technical font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                  <span className="font-bold text-brand-textPrimary uppercase tracking-wider">
                    {labels.canvasLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-technical font-mono text-brand-textSecondary uppercase">
                    {labels.activeFocus}:
                  </span>
                  <span className="px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-brand-surface border border-brand-border text-brand-primary">
                    {activeColumn.num} · {activeColumn.category}
                  </span>
                </div>
              </div>

              {/* Dynamic Engineering Impact Visualizer */}
              <div className="min-h-[380px] flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                  {/* ============================================================== */}
                  {/* CANVAS STATE 01: WORKFLOW EFFICIENCY                           */}
                  {/* Repeated Manual Tasks → Structured Routine → Engineering Review */}
                  {/* ============================================================== */}
                  {selectedIdx === 0 && (
                    <motion.div
                      key="state-0"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-12 gap-3 items-center">
                        
                        {/* Step 1: Repeated Manual Operations */}
                        <div className="col-span-4 space-y-2 font-mono text-technical">
                          <span className="block text-caption font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                            Manual Repetitions
                          </span>
                          {["Parameter Transcription", "Repetitive Sheet QA", "Naming Verification"].map((item, i) => (
                            <motion.div
                              key={i}
                              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                              className="bg-brand-surface p-2.5 rounded-xl border border-brand-border/70 flex items-center justify-between shadow-xs"
                            >
                              <span className="text-brand-textSecondary text-technical truncate font-medium">{item}</span>
                              <span className="text-caption font-mono text-brand-textSecondary/60 shrink-0">#0{i + 1}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Connector Arrow 1 */}
                        <div className="col-span-1 flex items-center justify-center" aria-hidden="true">
                          <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24" fill="none">
                            <motion.path
                              d="M 2 12 L 22 12"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeDasharray="3 3"
                              className="text-brand-primary/70"
                              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                            />
                            <polygon points="20,8 28,12 20,16" fill="currentColor" className="text-brand-primary" />
                          </svg>
                        </div>

                        {/* Step 2: Structured Routine / Automation Layer */}
                        <div className="col-span-3 bg-brand-primary/10 dark:bg-brand-primary/15 p-4 rounded-2xl border border-brand-primary/30 text-center font-mono">
                          <div className="w-10 h-10 rounded-xl bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center mx-auto mb-2 text-brand-primary">
                            <Cpu className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <span className="block text-technical font-bold text-brand-primary uppercase tracking-wider mb-1">
                            AUTOMATION
                          </span>
                          <span className="text-caption font-bold text-brand-textPrimary block mb-1">
                            Defined Routine
                          </span>
                          <span className="text-technical text-brand-textSecondary block">
                            Targeted scripts & batch rules
                          </span>
                        </div>

                        {/* Connector Arrow 2 */}
                        <div className="col-span-1 flex items-center justify-center" aria-hidden="true">
                          <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24" fill="none">
                            <motion.path
                              d="M 2 12 L 22 12"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeDasharray="3 3"
                              className="text-emerald-500/70"
                              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: 0.15 }}
                            />
                            <polygon points="20,8 28,12 20,16" fill="currentColor" className="text-emerald-500" />
                          </svg>
                        </div>

                        {/* Step 3: Human Engineering Review Gate */}
                        <div className="col-span-3 bg-emerald-500/10 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-500/35 text-center font-mono">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2 text-emerald-600 dark:text-emerald-400">
                            <Eye className="w-5 h-5" aria-hidden="true" />
                          </div>
                          <span className="block text-technical font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                            GATEWAY
                          </span>
                          <span className="text-caption font-bold text-brand-textPrimary block mb-1">
                            Engineer Review
                          </span>
                          <span className="text-technical text-brand-textSecondary block">
                            Supervision & decisions
                          </span>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>WORKFLOW CONTROL // STRUCTURED AUTOMATION APPLIED</span>
                        <span className="text-brand-primary font-bold">100% AUDITABLE ROUTINE</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ============================================================== */}
                  {/* CANVAS STATE 02: INFORMATION QUALITY                           */}
                  {/* Model Information → Defined Rules → Reviewable Exceptions       */}
                  {/* ============================================================== */}
                  {selectedIdx === 1 && (
                    <motion.div
                      key="state-1"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-12 gap-4 items-center font-mono">
                        
                        {/* Information Rules Matrix (Neutral markers, no fake checkmarks) */}
                        <div className="col-span-6 space-y-2.5">
                          <span className="block text-caption font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                            Rule Definition Framework
                          </span>
                          {[
                            { rule: "ISO 19650 PropertySets", tag: "SCHEMA", code: "PAR.01" },
                            { rule: "OmniClass / UniFormat", tag: "CLASSIFICATION", code: "CLS.02" },
                            { rule: "Model Naming Syntax", tag: "SYNTAX", code: "NOM.03" },
                            { rule: "Discipline Model Bounds", tag: "COORDINATION", code: "GEO.04" }
                          ].map((item, i) => (
                            <motion.div
                              key={i}
                              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, delay: shouldReduceMotion ? 0 : i * 0.08 }}
                              className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center justify-between text-technical"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" aria-hidden="true" />
                                <span className="text-brand-textPrimary font-semibold">{item.rule}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-sky-600 dark:text-sky-400 font-bold uppercase">
                                {item.tag}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Coordinated Review Ledger */}
                        <div className="col-span-6 bg-sky-500/10 dark:bg-sky-950/30 p-5 rounded-2xl border border-sky-500/35 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-sky-500/30 text-technical">
                            <span className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                              EXCEPTION AUDIT REPORT
                            </span>
                            <span className="text-brand-textSecondary">STATUS: VERIFIED</span>
                          </div>
                          
                          <div className="space-y-2 text-technical">
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border flex items-center justify-between">
                              <span className="text-brand-textPrimary font-medium">Inconsistent Parameter Types</span>
                              <span className="px-2 py-0.5 rounded bg-brand-surface font-mono font-bold text-brand-textSecondary">
                                IDENTIFIED
                              </span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border flex items-center justify-between">
                              <span className="text-brand-textPrimary font-medium">Missing Classification Tags</span>
                              <span className="px-2 py-0.5 rounded bg-brand-surface font-mono font-bold text-brand-textSecondary">
                                FLAGGED
                              </span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border flex items-center justify-between">
                              <span className="text-brand-textPrimary font-medium">Naming Convention Discrepancies</span>
                              <span className="px-2 py-0.5 rounded bg-brand-surface font-mono font-bold text-brand-textSecondary">
                                REPORTED
                              </span>
                            </div>
                          </div>

                          <p className="text-technical text-brand-textSecondary pt-1 leading-relaxed">
                            Clear criteria turn vague model issues into actionable, reviewable line items.
                          </p>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>DATA DISCREPANCY MANAGEMENT // MODEL QUALITY ASSURANCE</span>
                        <span className="text-sky-600 dark:text-sky-400 font-bold">STRUCTURED REPORTING</span>
                      </div>
                    </motion.div>
                  )}

                  {/* ============================================================== */}
                  {/* CANVAS STATE 03: WORKFLOW INTEGRATION                          */}
                  {/* Revit / IFC / Multidisciplinary Coordination → Connected Flow   */}
                  {/* ============================================================== */}
                  {selectedIdx === 2 && (
                    <motion.div
                      key="state-2"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-12 gap-3 items-center font-mono">
                        
                        {/* Source Software Platforms */}
                        <div className="col-span-4 space-y-2.5 text-technical">
                          <span className="block text-caption font-bold text-brand-textSecondary uppercase tracking-wider mb-2">
                            Existing Environments
                          </span>
                          
                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold">
                              RVT
                            </span>
                            <div>
                              <span className="text-brand-textPrimary font-bold block">Autodesk Revit</span>
                              <span className="text-brand-textSecondary text-technical">Native API & Parameter Workflows</span>
                            </div>
                          </div>

                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 font-bold">
                              IFC
                            </span>
                            <div>
                              <span className="text-brand-textPrimary font-bold block">OpenBIM IFC4</span>
                              <span className="text-brand-textSecondary text-technical">Vendor-neutral Model Exchange</span>
                            </div>
                          </div>

                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold">
                              BCF
                            </span>
                            <div>
                              <span className="text-brand-textPrimary font-bold block">Issue Tracking</span>
                              <span className="text-brand-textSecondary text-technical">Open Issue Collaboration</span>
                            </div>
                          </div>
                        </div>

                        {/* Central Synchronization Hub */}
                        <div className="col-span-1 flex items-center justify-center" aria-hidden="true">
                          <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24" fill="none">
                            <motion.path
                              d="M 2 12 L 22 12"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeDasharray="3 3"
                              className="text-indigo-500/70"
                              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
                            />
                            <polygon points="20,8 28,12 20,16" fill="currentColor" className="text-indigo-500" />
                          </svg>
                        </div>

                        {/* Unified Integration Core */}
                        <div className="col-span-7 bg-indigo-500/10 dark:bg-indigo-950/30 p-5 rounded-2xl border border-indigo-500/35 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-indigo-500/30 text-technical">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                              CONNECTED WORKFLOW FABRIC
                            </span>
                            <span className="text-brand-textSecondary">OPEN ECOSYSTEM</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-technical">
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border">
                              <span className="text-technical text-brand-textSecondary block uppercase mb-0.5">DISCIPLINES</span>
                              <span className="font-bold text-brand-textPrimary">ARC · STR · MEP</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border">
                              <span className="text-technical text-brand-textSecondary block uppercase mb-0.5">INTERFACE</span>
                              <span className="font-bold text-brand-textPrimary">Python / C# / API</span>
                            </div>
                          </div>

                          <p className="text-technical text-brand-textSecondary pt-1 leading-relaxed">
                            Solutions integrate seamlessly with your established software stack, avoiding disruptive migrations or vendor lock-in.
                          </p>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>ECOSYSTEM INTEGRATION // BUILT AROUND ESTABLISHED TOOLS</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">ZERO DISRUPTION</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Canvas Interactive Hint */}
              <div className="pt-4 mt-6 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span>{labels.interactiveNote}</span>
                <span className="text-brand-textSecondary/60 hidden sm:inline-block">pyBIM // SYS.OUTCOMES</span>
              </div>

            </figure>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE / TABLET (< lg): Clean Sequential Module Presentation              */}
        {/* ========================================================================= */}
        <div className="lg:hidden space-y-6">
          {columns.map((col, idx) => {
            const accent = getOutcomeAccent(idx);

            return (
              <article
                key={col.id || idx}
                id={`${baseId}-outcome-mobile-${col.id || idx}`}
                className="p-6 rounded-2xl bg-brand-card border border-brand-border shadow-sm space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl ${accent.bg} border ${accent.lightBorder} flex items-center justify-center shrink-0`}>
                      {getOutcomeIcon(col.icon || col.id, "w-4 h-4")}
                    </div>
                    <span className={`text-technical font-mono font-bold uppercase tracking-wider ${accent.text}`}>
                      {col.category}
                    </span>
                  </div>

                  <span className="text-technical font-mono font-bold text-brand-textSecondary px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
                    {col.num || `0${idx + 1}`}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight">
                  {col.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                  {col.desc}
                </p>

                {/* Simplified Compact Graphic for Mobile */}
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border font-mono text-technical space-y-2">
                  <span className="block font-bold text-brand-textSecondary uppercase tracking-wider">
                    {idx === 0 
                      ? "PROCESS: REPETITIVE → ROUTINE → REVIEW" 
                      : idx === 1 
                      ? "QUALITY: RULES → AUDIT → ACTIONABLE REPORT" 
                      : "INTEGRATION: REVIT + IFC + BCF WORKFLOW"}
                  </span>

                  {Array.isArray(col.topics) && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brand-border/60">
                      {col.topics.map((topic, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-brand-textSecondary text-technical"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
