"use client";

import { useId } from "react";
import { 
  FileText, 
  SlidersHorizontal, 
  Cpu, 
  ClipboardCheck, 
  Check, 
  Workflow
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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

  const getStageIcon = (idx) => {
    switch (idx) {
      case 0:
        return <FileText className="w-5 h-5 text-brand-primary" aria-hidden="true" />;
      case 1:
        return <SlidersHorizontal className="w-5 h-5 text-sky-500 dark:text-sky-400" aria-hidden="true" />;
      case 2:
        return <Cpu className="w-5 h-5 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />;
      case 3:
      default:
        return <ClipboardCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />;
    }
  };

  return (
    <section 
      id="execution-pipeline"
      className="py-24 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Area (~35-40% on Desktop): Sticky Context & Process Map */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
                <span className="text-xs md:text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                  {pipeline.tag}
                </span>
              </div>

              <h2 
                id={`${baseId}-title`}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
              >
                {pipeline.headline}
              </h2>

              <p className="text-base sm:text-lg text-brand-textSecondary font-medium leading-relaxed mb-10">
                {pipeline.subtitle}
              </p>

              {/* Technical Process Map Overview Card */}
              <div className="rounded-3xl bg-brand-card border border-brand-border p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                    <span className="text-xs font-mono font-bold text-brand-textPrimary uppercase tracking-wider">
                      {labels.mapTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-textSecondary">
                    {labels.illustrativeLabel}
                  </span>
                </div>

                {/* Vertical Process Steps Tracker */}
                <div className="space-y-4 relative">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-center gap-4 group">
                      {/* Connecting Line between steps */}
                      {idx < steps.length - 1 && (
                        <div 
                          className="absolute left-4 top-8 bottom-[-16px] w-[2px] bg-brand-border pointer-events-none" 
                          aria-hidden="true"
                        />
                      )}

                      {/* Step Marker */}
                      <div className="w-8 h-8 rounded-xl bg-brand-surface border border-brand-border group-hover:border-brand-primary/50 flex items-center justify-center shrink-0 z-10 transition-colors">
                        <span className="text-xs font-mono font-bold text-brand-textPrimary">
                          {step.num}
                        </span>
                      </div>

                      {/* Step Label */}
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-mono font-semibold text-brand-textSecondary block uppercase tracking-wider truncate">
                          {step.mapLabel || step.title}
                        </span>
                      </div>

                      <div className="text-[10px] font-mono text-brand-textSecondary/60 hidden sm:block">
                        0{idx + 1}/04
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Area (~60-65% on Desktop): Four Connected Execution Panels */}
          <div className="lg:col-span-7 space-y-8 relative">
            {steps.map((step, idx) => {
              const artifact = step.artifact || {};

              return (
                <motion.article
                  key={idx}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="rounded-3xl bg-brand-card border border-brand-border p-7 sm:p-9 shadow-sm hover:shadow-lg hover:border-brand-primary/50 transition-all duration-300 relative group"
                >
                  {/* Top Bar: Icon + Stage Index Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {getStageIcon(idx)}
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest">
                        {step.mapLabel || `STAGE 0${idx + 1}`}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-brand-textSecondary px-3 py-1 rounded-lg bg-brand-surface border border-brand-border">
                      {step.num}
                    </span>
                  </div>

                  {/* Stage Heading & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-textPrimary mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  {/* Typical Output Container */}
                  {step.output && (
                    <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-brand-surface border border-brand-border flex items-start sm:items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono font-bold text-brand-textSecondary block uppercase tracking-wider">
                          {labels.outputLabel}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-brand-textPrimary block">
                          {step.output}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bespoke Illustrative Artifact per Stage */}
                  <div 
                    className="rounded-2xl border border-brand-border/70 bg-brand-surface/70 p-4 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-brand-textSecondary pb-2.5 mb-2.5 border-b border-brand-border/60">
                      <span className="uppercase">{artifact.heading || "STAGE ARTIFACT"}</span>
                      <span className="text-brand-primary font-bold">{artifact.badge || `PHASE // 0${idx + 1}`}</span>
                    </div>

                    {/* Stage 01: Scope & Intake Schematic */}
                    {idx === 0 && (
                      <div className="space-y-1.5 text-[10px] font-mono">
                        {(artifact.tags || ["EIR / BEP Review", "Model Conventions", "Acceptance Criteria"]).map((tag, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary">{tag}</span>
                            <span className="text-[9px] font-bold text-brand-primary uppercase">INSPECT</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stage 02: Rules & Automation Mapping */}
                    {idx === 1 && (
                      <div className="space-y-1.5 text-[10px] font-mono">
                        {(artifact.tags || ["Validation Logic", "Parameter Mapping", "API Task Scoping"]).map((tag, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary">{tag}</span>
                            <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400 uppercase">SPEC</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stage 03: Engineering Execution Diagram */}
                    {idx === 2 && (
                      <div className="space-y-1.5 text-[10px] font-mono">
                        {(artifact.tags || ["Revit API Operations", "Parameter Updates", "Discipline Coordination"]).map((tag, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary">{tag}</span>
                            <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">EXECUTE</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stage 04: Quality & Handover Artifact */}
                    {idx === 3 && (
                      <div className="space-y-1.5 text-[10px] font-mono">
                        {(artifact.tags || ["Quality Review Notes", "Issue Records (BCF)", "Handover Package"]).map((tag, tIdx) => (
                          <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary">{tag}</span>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">HANDOVER</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </motion.article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
