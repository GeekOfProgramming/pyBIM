"use client";

import { useId } from "react";
import { 
  FileText, 
  Boxes, 
  SlidersHorizontal, 
  Workflow, 
  Cpu, 
  ShieldCheck, 
  ClipboardCheck, 
  Database, 
  Layers, 
  ArrowDown, 
  Info,
  Lock
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

function getNodeItemIcon(type, className = "w-4 h-4") {
  switch (type) {
    case "spec":
      return <FileText className={className} aria-hidden="true" />;
    case "model":
      return <Boxes className={className} aria-hidden="true" />;
    case "criteria":
      return <SlidersHorizontal className={className} aria-hidden="true" />;
    case "rules":
      return <Workflow className={className} aria-hidden="true" />;
    case "code":
      return <Cpu className={className} aria-hidden="true" />;
    case "review":
      return <ShieldCheck className={className} aria-hidden="true" />;
    case "report":
      return <ClipboardCheck className={className} aria-hidden="true" />;
    case "data":
    case "handover":
      return <Database className={className} aria-hidden="true" />;
    default:
      return <Layers className={className} aria-hidden="true" />;
  }
}

export default function ServicesExecutionArchitecture({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  if (!data) return null;

  const arch = data;
  const labels = arch.labels || {};
  const nodes = arch.nodes || [];

  const layer1 = nodes[0] || {};
  const layer2 = nodes[1] || {};
  const layer3 = nodes[2] || {};

  return (
    <section
      id="execution-architecture"
      className="scroll-mt-28 relative py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Family A (Base) Architectural Background */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
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
              {arch.tag}
            </span>
          </div>

          <h2
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {arch.headline}
          </h2>

          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed max-w-3xl">
            {arch.subtitle}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* INTEGRATED ENGINEERING INFORMATION ARCHITECTURE CANVAS                   */}
        {/* A single coherent technical canvas with 3 connected layers and shared rows*/}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-brand-surface/90 dark:bg-slate-900/95 border border-brand-border/80 shadow-xl p-6 sm:p-8 lg:p-10 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Top Control Bar: Factual Technical Title & Flow Direction Legend */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-border/70 text-caption font-mono">
            {/* Status Indicator (Static, No fake pulsing) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-950/40 px-3.5 py-1.5 text-caption font-mono font-bold text-blue-700 dark:text-cyan-300 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400" aria-hidden="true" />
              <span>{labels.referenceArchitecture}</span>
            </div>

            {/* Directional Flow Legend */}
            <div className="inline-flex items-center gap-2 text-caption font-mono text-brand-textSecondary">
              <span className="text-brand-textPrimary font-semibold uppercase">{labels.flowIndicator}</span>
              <span className="text-brand-primary" aria-hidden="true">:</span>
              <span className="hidden sm:inline font-bold text-brand-primary tracking-wider">
                01 {labels.inputsLayer} → 02 {labels.logicLayer} → 03 {labels.outputsLayer}
              </span>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 3-LAYER ARCHITECTURE GRID (Desktop: Subgrid Shared Rows / Mobile: Stack) */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-6 xl:grid-rows-[auto_auto_auto_auto_auto_auto_auto] items-stretch relative">
            
            {/* --------------------------------------------------------------------- */}
            {/* LAYER 01: PROJECT INPUTS                                              */}
            {/* --------------------------------------------------------------------- */}
            <div className="flex flex-col gap-4 xl:gap-y-4 xl:grid xl:grid-rows-subgrid xl:row-span-7 rounded-2xl p-6 sm:p-7 bg-brand-cardElevated border border-brand-border/80 shadow-sm transition-all duration-200 relative">
              {/* Row 1: Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-caption shrink-0 bg-brand-surface border border-brand-border text-brand-primary">
                    {layer1.num}
                  </span>
                  <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-primary">
                    {layer1.technicalLabel}
                  </span>
                </div>
              </div>

              {/* Row 2: Title */}
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight leading-snug">
                {layer1.title}
              </h3>

              {/* Row 3: Description */}
              <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                {layer1.desc}
              </p>

              {/* Rows 4, 5, 6: 3 Input Modules */}
              {(layer1.items || []).map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="p-3.5 rounded-xl border border-brand-border/70 bg-brand-surface/60 hover:bg-brand-surface flex items-start gap-3 transition-colors relative group h-full"
                >
                  <div className="p-2 rounded-lg border border-brand-border bg-brand-card text-brand-primary shrink-0 mt-0.5">
                    {getNodeItemIcon(item.type, "w-4 h-4")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-body-sm font-bold text-brand-textPrimary leading-snug">
                      {item.label}
                    </div>
                    <div className="text-caption text-brand-textSecondary mt-0.5 leading-normal">
                      {item.sub}
                    </div>
                  </div>

                  {/* Desktop Outflow Terminal Point & Gap Conduit Bridge */}
                  <span className="hidden xl:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500/20 border-2 border-blue-500 z-10" aria-hidden="true" />
                  <span className="hidden xl:block absolute -right-6 top-1/2 w-6 border-t border-dashed border-blue-500/40 pointer-events-none" aria-hidden="true" />
                </div>
              ))}

              {/* Row 7: Layer Footer */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-caption font-mono text-brand-textSecondary self-end w-full">
                <span className="font-semibold uppercase tracking-wider">{layer1.footerLabel}</span>
                <span className="text-brand-primary font-bold">// 01</span>
              </div>
            </div>

            {/* Mobile / Tablet Connector 1 → 2 */}
            <div className="xl:hidden flex justify-center -my-2 text-brand-primary" aria-hidden="true">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-border text-caption font-mono text-brand-textSecondary shadow-sm">
                <span>{labels.flowBadge}</span>
                <ArrowDown className="w-3.5 h-3.5 text-brand-primary" />
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* LAYER 02: ENGINEERING LOGIC & VERIFICATION CORE (Center)               */}
            {/* Prominent visual core highlighting human engineering review gate      */}
            {/* --------------------------------------------------------------------- */}
            <div className="flex flex-col gap-4 xl:gap-y-4 xl:grid xl:grid-rows-subgrid xl:row-span-7 rounded-2xl p-6 sm:p-7 bg-brand-cardElevated border-2 border-brand-primary/50 shadow-md shadow-brand-primary/5 ring-1 ring-brand-primary/20 transition-all duration-200 relative">
              {/* Highlight Core Top Tag */}
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-brand-primary text-white text-[11px] font-mono font-bold uppercase tracking-widest pointer-events-none">
                {labels.coreBadge}
              </div>

              {/* Row 1: Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-caption shrink-0 bg-brand-primary text-white border border-brand-primary">
                    {layer2.num}
                  </span>
                  <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-primary">
                    {layer2.technicalLabel}
                  </span>
                </div>

                {labels.governedBadge && (
                  <span className="text-caption font-mono font-bold text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                    {labels.governedBadge}
                  </span>
                )}
              </div>

              {/* Row 2: Title */}
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight leading-snug">
                {layer2.title}
              </h3>

              {/* Row 3: Description */}
              <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                {layer2.desc}
              </p>

              {/* Rows 4, 5, 6: 3 Engineering Control Modules */}
              {(layer2.items || []).map((item, iIdx) => {
                const isReviewGate = item.type === "review" || iIdx === 2;

                return (
                  <div
                    key={iIdx}
                    className={`p-3.5 rounded-xl border transition-colors relative h-full flex flex-col justify-center ${
                      isReviewGate
                        ? "bg-emerald-500/10 dark:bg-emerald-950/25 border-emerald-500/40 ring-1 ring-emerald-500/20"
                        : "bg-brand-surface/70 border-brand-border/80 hover:bg-brand-surface"
                    }`}
                  >
                    {/* Desktop Inflow Terminal */}
                    <span className="hidden xl:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500/20 border-2 border-blue-500 z-10" aria-hidden="true" />

                    <div className="flex items-start gap-3">
                      <div 
                        className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                          isReviewGate
                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400"
                            : "bg-brand-card border-brand-border text-brand-primary"
                        }`}
                      >
                        {getNodeItemIcon(item.type, "w-4 h-4")}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-mono text-body-sm font-bold text-brand-textPrimary leading-snug">
                            {item.label}
                          </div>
                          {isReviewGate && labels.reviewGateBadge && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shrink-0">
                              <Lock className="w-3 h-3" aria-hidden="true" />
                              <span>{labels.reviewGateBadge}</span>
                            </span>
                          )}
                        </div>
                        <div className="text-caption text-brand-textSecondary mt-0.5 leading-normal">
                          {item.sub}
                        </div>
                      </div>
                    </div>

                    {/* Desktop Outflow Terminal Point & Gap Conduit Bridge */}
                    <span className={`hidden xl:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 z-10 ${
                      isReviewGate ? "bg-emerald-500/20 border-emerald-500" : "bg-cyan-500/20 border-cyan-500"
                    }`} aria-hidden="true" />
                    <span className="hidden xl:block absolute -right-6 top-1/2 w-6 border-t border-dashed border-cyan-500/40 pointer-events-none" aria-hidden="true" />
                  </div>
                );
              })}

              {/* Row 7: Layer Footer */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-caption font-mono text-brand-textSecondary self-end w-full">
                <span className="font-semibold uppercase tracking-wider">{layer2.footerLabel}</span>
                <span className="text-brand-primary font-bold">// 02</span>
              </div>
            </div>

            {/* Mobile / Tablet Connector 2 → 3 */}
            <div className="xl:hidden flex justify-center -my-2 text-brand-primary" aria-hidden="true">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-border text-caption font-mono text-brand-textSecondary shadow-sm">
                <span>{labels.flowBadge}</span>
                <ArrowDown className="w-3.5 h-3.5 text-brand-primary" />
              </div>
            </div>

            {/* --------------------------------------------------------------------- */}
            {/* LAYER 03: REVIEWED OUTPUTS (Right)                                   */}
            {/* --------------------------------------------------------------------- */}
            <div className="flex flex-col gap-4 xl:gap-y-4 xl:grid xl:grid-rows-subgrid xl:row-span-7 rounded-2xl p-6 sm:p-7 bg-brand-cardElevated border border-brand-border/80 shadow-sm transition-all duration-200 relative">
              {/* Row 1: Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-caption shrink-0 bg-brand-surface border border-brand-border text-brand-primary">
                    {layer3.num}
                  </span>
                  <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-primary">
                    {layer3.technicalLabel}
                  </span>
                </div>
              </div>

              {/* Row 2: Title */}
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight leading-snug">
                {layer3.title}
              </h3>

              {/* Row 3: Description */}
              <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                {layer3.desc}
              </p>

              {/* Rows 4, 5, 6: 3 Deliverable Modules */}
              {(layer3.items || []).map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="p-3.5 rounded-xl border border-brand-border/70 bg-brand-surface/60 hover:bg-brand-surface flex items-start gap-3 transition-colors relative h-full flex flex-col justify-center"
                >
                  {/* Desktop Inflow Terminal */}
                  <span className="hidden xl:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500/20 border-2 border-cyan-500 z-10" aria-hidden="true" />

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg border border-brand-border bg-brand-card text-brand-primary shrink-0 mt-0.5">
                      {getNodeItemIcon(item.type, "w-4 h-4")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-body-sm font-bold text-brand-textPrimary leading-snug">
                        {item.label}
                      </div>
                      <div className="text-caption text-brand-textSecondary mt-0.5 leading-normal">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Row 7: Layer Footer */}
              <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-caption font-mono text-brand-textSecondary self-end w-full">
                <span className="font-semibold uppercase tracking-wider">{layer3.footerLabel}</span>
                <span className="text-brand-primary font-bold">// 03</span>
              </div>
            </div>

          </div>

          {/* Board Footer: Coherent Reference Note Band */}
          {labels.supportingNote && (
            <div className="mt-8 pt-6 border-t border-brand-border/70">
              <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-brand-surface/70 border border-brand-border/60 text-brand-textSecondary text-caption font-mono leading-relaxed">
                <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="flex-1">
                  {labels.supportingNote}
                </p>
              </div>
            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
