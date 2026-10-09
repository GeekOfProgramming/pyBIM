"use client";

import { useState, useId } from "react";
import { 
  Workflow, 
  ShieldCheck, 
  Boxes, 
  Layers, 
  Cpu, 
  Eye, 
  CheckCircle2,
  FileCheck2,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ServicesSectionBackdrop from "@/components/sections/services-section-backdrop";

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
      activeFocus: "ACTIVE FOCUS",
      inspectButton: "Inspect Workflow",
      selectedStatus: "Active",
      outcome1: {
        manualHeading: "Manual Operations",
        items: [
          { name: "Parameter Transcription", code: "01" },
          { name: "Repetitive Sheet QA", code: "02" },
          { name: "Naming Verification", code: "03" }
        ],
        routineBadge: "AUTOMATION",
        routineTitle: "Defined Routine",
        routineDesc: "Targeted scripts & batch rules",
        gateBadge: "GATEWAY",
        gateTitle: "Engineer Review",
        gateDesc: "Supervision & decisions",
        footerLeft: "WORKFLOW STRUCTURE",
        footerRight: "SUPERVISED AUTOMATION"
      },
      outcome2: {
        rulesHeading: "Rule Definition Framework",
        reportHeading: "EXCEPTION AUDIT REPORT",
        reportStatus: "REVIEW PROCESS",
        exceptions: [
          { name: "Inconsistent Parameter Types", tag: "IDENTIFIED" },
          { name: "Missing Classification Tags", tag: "FLAGGED" },
          { name: "Naming Convention Discrepancies", tag: "REPORTED" }
        ],
        reportNote: "Clear criteria turn vague model issues into actionable, reviewable line items.",
        footerLeft: "INFORMATION ASSURANCE",
        footerRight: "STRUCTURED REPORTING"
      },
      outcome3: {
        envHeading: "Existing Environments",
        envRvt: "Autodesk Revit",
        envRvtSub: "Native API & Parameter Workflows",
        envIfc: "OpenBIM IFC4",
        envIfcSub: "Vendor-neutral Model Exchange",
        envBcf: "Issue Tracking",
        envBcfSub: "Open Issue Collaboration",
        coreHeading: "CONNECTED WORKFLOW FABRIC",
        coreBadge: "OPEN ECOSYSTEM",
        disciplinesLabel: "DISCIPLINES",
        disciplinesVal: "ARC · STR · MEP",
        interfaceLabel: "INTERFACE",
        interfaceVal: "Python / C# / API",
        coreNote: "Solutions integrate alongside your established software stack, avoiding unnecessary workflow disruptions.",
        footerLeft: "ECOSYSTEM INTEGRATION",
        footerRight: "PRACTICAL ADAPTATION"
      },
      mobileSummaries: [
        "PROCESS: REPETITIVE → ROUTINE → REVIEW",
        "QUALITY: RULES → AUDIT → ACTIONABLE REPORT",
        "INTEGRATION: REVIT + IFC + BCF WORKFLOW"
      ]
    },
    columns: []
  };

  const columns = outcomes.columns || [];
  const labels = outcomes.labels || {};
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

  const c1 = labels.outcome1 || {};
  const c2 = labels.outcome2 || {};
  const c3 = labels.outcome3 || {};

  return (
    <section 
      id="engineering-outcomes"
      className="scroll-mt-28 relative py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      {/* ========================================================================= */}
      {/* BACKGROUND: Family B (Surface) — Soft Architectural Drafting & Tone       */}
      {/* ========================================================================= */}
      <ServicesSectionBackdrop variant="surface" />

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
        {/* DESKTOP: ENGINEERING IMPACT CANVAS (Left 3 Narratives + Right Canvas)      */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT COLUMN (5 COLS): 3 Semantic Articles with Accessible Select Buttons */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {columns.map((col, idx) => {
              const isSelected = selectedIdx === idx;
              const accent = getOutcomeAccent(idx);

              return (
                <article
                  key={col.id || idx}
                  aria-labelledby={`${baseId}-outcome-heading-${idx}`}
                  className={`p-6 xl:p-7 rounded-2xl transition-all duration-200 relative ${
                    isSelected
                      ? `bg-brand-card border-2 ${accent.border} shadow-md ring-2 ${accent.ring}`
                      : "bg-brand-card/80 border border-brand-border/70 hover:border-brand-border hover:bg-brand-card"
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {isSelected && (
                    <motion.div
                      layoutId={`${baseId}-active-pill`}
                      className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${accent.solidBg}`}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                    />
                  )}

                  {/* Header Row */}
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

                  {/* Full Title (H3) */}
                  <h3 
                    id={`${baseId}-outcome-heading-${idx}`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5"
                  >
                    {col.title}
                  </h3>

                  {/* Complete Description (Always readable) */}
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-4">
                    {col.desc}
                  </p>

                  {/* Topics Pills */}
                  {Array.isArray(col.topics) && (
                    <div className="flex flex-wrap gap-1.5 pt-3 mb-4 border-t border-brand-border/50">
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

                  {/* Accessible Native Focus/Inspect Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedIdx(idx)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-technical font-mono font-bold uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                        isSelected
                          ? `${accent.bg} ${accent.text} border ${accent.lightBorder}`
                          : "bg-brand-surface border border-brand-border text-brand-textSecondary hover:text-brand-textPrimary hover:border-brand-primary/40"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
                      <span>{isSelected ? (labels.selectedStatus || "Active") : (labels.inspectButton || "Inspect Workflow")}</span>
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT COLUMN (7 COLS): Unified Engineering Impact Canvas Visual         */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 sticky top-28">
            <figure 
              className="rounded-3xl bg-brand-card/95 border border-brand-border shadow-lg p-6 xl:p-8 backdrop-blur-sm relative overflow-hidden"
              aria-label={`${activeColumn.title} - ${labels.canvasLabel || "ENGINEERING IMPACT CANVAS"}`}
            >
              <figcaption className="sr-only">
                {activeColumn.title}: {activeColumn.desc}
              </figcaption>

              {/* Canvas HUD Header with Static Status Indicator */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-brand-border/70 text-technical font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="font-bold text-brand-textPrimary uppercase tracking-wider">
                    {labels.canvasLabel || "ENGINEERING IMPACT CANVAS"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-technical font-mono text-brand-textSecondary uppercase">
                    {labels.activeFocus || "ACTIVE FOCUS"}:
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
                            {c1.manualHeading || "Manual Operations"}
                          </span>
                          {(c1.items || [
                            { name: "Parameter Transcription", code: "01" },
                            { name: "Repetitive Sheet QA", code: "02" },
                            { name: "Naming Verification", code: "03" }
                          ]).map((item, i) => (
                            <motion.div
                              key={i}
                              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : i * 0.1 }}
                              className="bg-brand-surface p-2.5 rounded-xl border border-brand-border/70 flex items-center justify-between"
                            >
                              <span className="text-brand-textSecondary text-technical font-medium leading-tight">
                                {item.name}
                              </span>
                              <span className="text-caption font-mono text-brand-textSecondary/60 shrink-0 ml-2">
                                #{item.code || `0${i + 1}`}
                              </span>
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
                            {c1.routineBadge || "AUTOMATION"}
                          </span>
                          <span className="text-caption font-bold text-brand-textPrimary block mb-1">
                            {c1.routineTitle || "Defined Routine"}
                          </span>
                          <span className="text-technical text-brand-textSecondary block leading-snug">
                            {c1.routineDesc || "Targeted scripts & batch rules"}
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
                            {c1.gateBadge || "GATEWAY"}
                          </span>
                          <span className="text-caption font-bold text-brand-textPrimary block mb-1">
                            {c1.gateTitle || "Engineer Review"}
                          </span>
                          <span className="text-technical text-brand-textSecondary block leading-snug">
                            {c1.gateDesc || "Supervision & decisions"}
                          </span>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>{c1.footerLeft || "WORKFLOW STRUCTURE"}</span>
                        <span className="text-brand-primary font-bold">{c1.footerRight || "SUPERVISED AUTOMATION"}</span>
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
                            {c2.rulesHeading || "Rule Definition Framework"}
                          </span>
                          {[
                            { rule: "ISO 19650 PropertySets", tag: "SCHEMA" },
                            { rule: "OmniClass / UniFormat", tag: "CLASSIFICATION" },
                            { rule: "Model Naming Syntax", tag: "SYNTAX" },
                            { rule: "Discipline Model Bounds", tag: "COORDINATION" }
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
                                <span className="text-brand-textPrimary font-semibold leading-tight">{item.rule}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-sky-600 dark:text-sky-400 font-bold uppercase text-technical ml-2 shrink-0">
                                {item.tag}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Coordinated Review Ledger */}
                        <div className="col-span-6 bg-sky-500/10 dark:bg-sky-950/30 p-5 rounded-2xl border border-sky-500/35 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-sky-500/30 text-technical">
                            <span className="font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                              {c2.reportHeading || "EXCEPTION AUDIT REPORT"}
                            </span>
                            <span className="text-brand-textSecondary text-technical">
                              {c2.reportStatus || "REVIEW PROCESS"}
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-technical">
                            {(c2.exceptions || [
                              { name: "Inconsistent Parameter Types", tag: "IDENTIFIED" },
                              { name: "Missing Classification Tags", tag: "FLAGGED" },
                              { name: "Naming Convention Discrepancies", tag: "REPORTED" }
                            ]).map((exc, eIdx) => (
                              <div key={eIdx} className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border flex items-center justify-between">
                                <span className="text-brand-textPrimary font-medium leading-tight">{exc.name}</span>
                                <span className="px-2 py-0.5 rounded bg-brand-surface font-mono font-bold text-brand-textSecondary text-technical shrink-0 ml-2">
                                  {exc.tag}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p className="text-technical text-brand-textSecondary pt-1 leading-relaxed">
                            {c2.reportNote || "Clear criteria turn vague model issues into actionable, reviewable line items."}
                          </p>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>{c2.footerLeft || "INFORMATION ASSURANCE"}</span>
                        <span className="text-sky-600 dark:text-sky-400 font-bold">{c2.footerRight || "STRUCTURED REPORTING"}</span>
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
                            {c3.envHeading || "Existing Environments"}
                          </span>
                          
                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold shrink-0">
                              RVT
                            </span>
                            <div className="min-w-0">
                              <span className="text-brand-textPrimary font-bold block leading-tight">{c3.envRvt || "Autodesk Revit"}</span>
                              <span className="text-brand-textSecondary text-technical leading-tight block">{c3.envRvtSub || "Native API & Parameter Workflows"}</span>
                            </div>
                          </div>

                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 font-bold shrink-0">
                              IFC
                            </span>
                            <div className="min-w-0">
                              <span className="text-brand-textPrimary font-bold block leading-tight">{c3.envIfc || "OpenBIM IFC4"}</span>
                              <span className="text-brand-textSecondary text-technical leading-tight block">{c3.envIfcSub || "Vendor-neutral Model Exchange"}</span>
                            </div>
                          </div>

                          <div className="bg-brand-surface p-3 rounded-xl border border-brand-border/70 flex items-center gap-3">
                            <span className="px-2 py-1 rounded bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 font-bold shrink-0">
                              BCF
                            </span>
                            <div className="min-w-0">
                              <span className="text-brand-textPrimary font-bold block leading-tight">{c3.envBcf || "Issue Tracking"}</span>
                              <span className="text-brand-textSecondary text-technical leading-tight block">{c3.envBcfSub || "Open Issue Collaboration"}</span>
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
                              {c3.coreHeading || "CONNECTED WORKFLOW FABRIC"}
                            </span>
                            <span className="text-brand-textSecondary text-technical">
                              {c3.coreBadge || "OPEN ECOSYSTEM"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-technical">
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border">
                              <span className="text-technical text-brand-textSecondary block uppercase mb-0.5">{c3.disciplinesLabel || "DISCIPLINES"}</span>
                              <span className="font-bold text-brand-textPrimary">{c3.disciplinesVal || "ARC · STR · MEP"}</span>
                            </div>
                            <div className="p-2.5 rounded-lg bg-brand-card/90 border border-brand-border">
                              <span className="text-technical text-brand-textSecondary block uppercase mb-0.5">{c3.interfaceLabel || "INTERFACE"}</span>
                              <span className="font-bold text-brand-textPrimary">{c3.interfaceVal || "Python / C# / API"}</span>
                            </div>
                          </div>

                          <p className="text-technical text-brand-textSecondary pt-1 leading-relaxed">
                            {c3.coreNote || "Solutions integrate alongside your established software stack, avoiding unnecessary workflow disruptions."}
                          </p>
                        </div>

                      </div>

                      {/* Technical Footnote Banner */}
                      <div className="p-3 rounded-xl bg-brand-surface/60 border border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                        <span>{c3.footerLeft || "ECOSYSTEM INTEGRATION"}</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{c3.footerRight || "PRACTICAL ADAPTATION"}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Canvas Interactive Hint */}
              <div className="pt-4 mt-6 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span>{labels.interactiveNote || "Select an outcome to inspect the workflow architecture"}</span>
                <span className="text-brand-textSecondary/60 hidden sm:inline-block">pyBIM</span>
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
            const mobileSummary = labels.mobileSummaries?.[idx] || (
              idx === 0 
                ? "PROCESS: REPETITIVE → ROUTINE → REVIEW" 
                : idx === 1 
                ? "QUALITY: RULES → AUDIT → ACTIONABLE REPORT" 
                : "INTEGRATION: REVIT + IFC + BCF WORKFLOW"
            );

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

                {/* Localized Compact Schematic Summary for Mobile */}
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border font-mono text-technical space-y-2">
                  <span className="block font-bold text-brand-textSecondary uppercase tracking-wider leading-snug">
                    {mobileSummary}
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
