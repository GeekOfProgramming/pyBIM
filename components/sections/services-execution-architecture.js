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
  ArrowRight, 
  ArrowDown, 
  Info 
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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

  // Fallback defaults if data is missing or loading
  const arch = data || {
    tag: "ENGINEERING WORKFLOW ARCHITECTURE",
    headline: "Connecting BIM Requirements, Engineering Logic, and Deliverables.",
    subtitle: "A practical reference architecture for organizing project requirements, BIM data, tailored automation, and engineering review into a connected delivery workflow. The tools and level of automation are selected according to each project's scope.",
    labels: {
      referenceArchitecture: "REFERENCE ARCHITECTURE",
      supportingNote: "Illustrative structure. Actual workflows and deliverables depend on project requirements, available data, and the agreed scope of work.",
      flowIndicator: "CONNECTED INFORMATION FLOW",
      inputsLayer: "INPUTS",
      logicLayer: "ENGINEERING CONTROLS",
      outputsLayer: "REVIEWED OUTPUTS"
    },
    nodes: []
  };

  const labels = arch.labels || {};
  const nodes = arch.nodes || [];

  return (
    <section
      id="execution-architecture"
      className="py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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

        {/* Integrated Technical Reference Architecture Board */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="rounded-3xl bg-brand-surface border border-brand-border p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden"
        >
          {/* Top Rail: Reference Badge & Architecture Flow Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-brand-border/70">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/5 px-3.5 py-1.5 text-technical font-mono font-bold text-brand-primary uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
              <span>{labels.referenceArchitecture || "REFERENCE ARCHITECTURE"}</span>
            </div>

            <div className="inline-flex items-center gap-2 text-caption font-mono text-brand-textSecondary tracking-wider">
              <span className="text-brand-textPrimary font-semibold">{labels.flowIndicator || "CONNECTED INFORMATION FLOW"}</span>
              <span className="text-brand-primary" aria-hidden="true">:</span>
              <span className="hidden sm:inline text-technical font-mono text-brand-textSecondary/80">
                01 → 02 → 03
              </span>
            </div>
          </div>

          {/* Three Connected Architecture Zones */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-6 items-stretch relative">
            {nodes.map((node, idx) => {
              const isCenterLogic = idx === 1;
              const hasNextNode = idx < nodes.length - 1;

              return (
                <div key={node.num || idx} className="flex flex-col relative">
                  <article
                    id={`${baseId}-layer-${idx}`}
                    aria-labelledby={`${baseId}-layer-title-${idx}`}
                    className={`h-full flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-200 relative ${
                      isCenterLogic
                        ? "bg-brand-card border-2 border-brand-primary/40 shadow-sm hover:border-brand-primary/70"
                        : "bg-brand-card/80 border border-brand-border hover:border-brand-primary/30"
                    }`}
                  >
                    <div>
                      {/* Layer Header Metadata */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-caption shrink-0 border ${
                              isCenterLogic
                                ? "bg-brand-primary text-white border-brand-primary"
                                : "bg-brand-base text-brand-primary border-brand-border"
                            }`}
                          >
                            {node.num}
                          </span>
                          <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary">
                            {node.technicalLabel}
                          </span>
                        </div>

                        {isCenterLogic && (
                          <span className="text-technical font-mono text-brand-primary font-semibold px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20">
                            CORE
                          </span>
                        )}
                      </div>

                      {/* Layer Title */}
                      <h3
                        id={`${baseId}-layer-title-${idx}`}
                        className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5 leading-snug"
                      >
                        {node.title}
                      </h3>

                      {/* Layer Description */}
                      <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                        {node.desc}
                      </p>

                      {/* Stacked Technical Item Panels */}
                      <div className="space-y-2.5 mb-6">
                        {node.items?.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                              isCenterLogic
                                ? "bg-brand-base border-brand-border hover:border-brand-primary/40"
                                : "bg-brand-base/80 border-brand-border/70 hover:border-brand-border"
                            }`}
                          >
                            <div
                              className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${
                                isCenterLogic
                                  ? "bg-brand-surface border-brand-primary/30 text-brand-primary"
                                  : "bg-brand-surface border-brand-border text-brand-textSecondary"
                              }`}
                            >
                              {getNodeItemIcon(item.type)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-mono text-body-sm font-semibold text-brand-textPrimary leading-snug">
                                {item.label}
                              </div>
                              <div className="text-caption text-brand-textSecondary mt-0.5 leading-normal">
                                {item.sub}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Layer Footer Identifier */}
                    <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                      <span className="text-technical font-mono font-semibold uppercase tracking-widest text-brand-textSecondary/90">
                        {node.footerLabel || node.technicalLabel}
                      </span>
                      <span className="text-technical font-mono text-brand-primary font-bold">
                        // {node.num}
                      </span>
                    </div>
                  </article>

                  {/* Flow Directional Connectors (Desktop & Mobile) */}
                  {hasNextNode && (
                    <>
                      {/* Mobile / Tablet Vertical Flow Connector */}
                      <div
                        className="xl:hidden flex justify-center py-3 text-brand-primary/60"
                        aria-hidden="true"
                      >
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-base border border-brand-border text-technical font-mono text-brand-textSecondary">
                          <span>FLOW</span>
                          <ArrowDown className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                      </div>

                      {/* Desktop Horizontal Flow Connector between zones */}
                      <div
                        className="hidden xl:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-brand-primary/70 pointer-events-none"
                        aria-hidden="true"
                      >
                        <div className="w-7 h-7 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center shadow-xs">
                          <ArrowRight className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Board Footer Rail: Supporting Engineering Note */}
          <div className="mt-8 pt-6 border-t border-brand-border/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-brand-textSecondary text-caption font-mono">
            <div className="flex items-start sm:items-center gap-2 leading-relaxed">
              <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
              <span>{labels.supportingNote}</span>
            </div>
            <div className="inline-flex items-center gap-2 text-technical tracking-widest uppercase text-brand-textSecondary/80 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>pyBIM · REF-ARCH-07</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
