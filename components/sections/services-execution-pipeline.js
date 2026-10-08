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
        return <FileText className="w-4 h-4 text-brand-primary" aria-hidden="true" />;
      case 1:
        return <SlidersHorizontal className="w-4 h-4 text-sky-500 dark:text-sky-400" aria-hidden="true" />;
      case 2:
        return <Cpu className="w-4 h-4 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />;
      case 3:
      default:
        return <ClipboardCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />;
    }
  };

  const getActionColor = (idx) => {
    switch (idx) {
      case 0:
        return "text-brand-primary";
      case 1:
        return "text-sky-600 dark:text-sky-400";
      case 2:
        return "text-indigo-600 dark:text-indigo-400";
      case 3:
      default:
        return "text-emerald-600 dark:text-emerald-400";
    }
  };

  return (
    <section 
      id="execution-pipeline"
      className="py-16 md:py-20 lg:py-24 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Full-Width Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl mb-10 lg:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {pipeline.tag}
            </span>
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

        {/* Compact Horizontal 4-Stage Process Overview (Desktop / Tablet Only) */}
        <div className="hidden md:block mb-10 lg:mb-12">
          <div className="rounded-2xl bg-brand-card border border-brand-border p-4 lg:p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-brand-border/60">
              <div className="flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                <span className="text-technical font-mono font-bold text-brand-textPrimary uppercase tracking-wider">
                  {labels.mapTitle}
                </span>
              </div>
              <span className="text-technical font-mono font-medium px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-textSecondary">
                {labels.illustrativeLabel}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4 relative">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-center gap-3 group">
                  {/* Step Connector */}
                  {idx < steps.length - 1 && (
                    <div 
                      className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-brand-border pointer-events-none z-0" 
                      aria-hidden="true" 
                    />
                  )}

                  {/* Step Marker */}
                  <div className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border group-hover:border-brand-primary/50 flex items-center justify-center shrink-0 z-10 transition-colors">
                    <span className="text-technical font-mono font-bold text-brand-textPrimary">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Label */}
                  <div className="min-w-0 flex-1">
                    <span className="text-technical font-mono font-semibold text-brand-textSecondary block uppercase tracking-wider truncate">
                      {step.mapLabel || step.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Width 2x2 Grid for the Four Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {steps.map((step, idx) => {
            const artifact = step.artifact || {};
            const actionLabel = artifact.actionLabel || "INSPECT";

            return (
              <motion.article
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                className="rounded-3xl bg-brand-card border border-brand-border p-6 lg:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all duration-300 relative group"
              >
                <div>
                  {/* Top Bar: Icon + Stage Indicator + Stage Index Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        {getStageIcon(idx)}
                      </div>
                      <span className="text-technical font-mono font-bold text-brand-primary uppercase tracking-wider">
                        {step.mapLabel || `STAGE 0${idx + 1}`}
                      </span>
                    </div>

                    <span className="text-technical font-mono font-bold text-brand-textSecondary px-2 py-0.5 rounded-md bg-brand-surface border border-brand-border shrink-0">
                      {step.num}
                    </span>
                  </div>

                  {/* Stage Heading */}
                  <h3 className="text-lg sm:text-xl lg:text-card-title font-bold text-brand-textPrimary mb-2.5 tracking-tight leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div>
                  {/* Typical Output Box (No truncate: allows full multi-line wrapping) */}
                  {step.output && (
                    <div className="mb-4 p-3 rounded-xl bg-brand-surface border border-brand-border flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-technical font-mono font-bold text-brand-textSecondary block uppercase tracking-wider mb-0.5">
                          {labels.outputLabel}
                        </span>
                        <span className="text-body-sm font-semibold text-brand-textPrimary block break-words leading-snug">
                          {step.output}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Compact Illustrative Artifact Block */}
                  <div 
                    className="rounded-xl border border-brand-border/70 bg-brand-surface/70 p-3 overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="flex items-center justify-between text-technical font-mono font-semibold text-brand-textSecondary pb-2 mb-2 border-b border-brand-border/60">
                      <span className="uppercase tracking-wider">{artifact.heading || "STAGE ARTIFACT"}</span>
                      <span className="text-brand-primary font-bold shrink-0">{artifact.badge || `PHASE // 0${idx + 1}`}</span>
                    </div>

                    {/* Artifact Tags with Localized Action Label */}
                    <div className="space-y-1.5 text-technical font-mono">
                      {(artifact.tags || []).slice(0, 3).map((tag, tIdx) => (
                        <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded border border-brand-border/50 gap-2">
                          <span className="text-brand-textSecondary truncate">{tag}</span>
                          <span className={`font-bold uppercase shrink-0 ${getActionColor(idx)}`}>
                            {actionLabel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
