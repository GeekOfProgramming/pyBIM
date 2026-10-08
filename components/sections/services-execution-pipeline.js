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
        
        {/* Desktop Split Layout (Option A): Left Anchor + Right 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          
          {/* Left Area (~35-40% on Desktop): Section Intro & Compact Process Timeline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px bg-brand-primary w-8 md:w-12" aria-hidden="true" />
                <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">
                  {pipeline.tag}
                </span>
              </div>

              <h2 
                id={`${baseId}-title`}
                className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-brand-textPrimary tracking-tight mb-4 leading-tight"
              >
                {pipeline.headline}
              </h2>

              <p className="text-sm sm:text-base text-brand-textSecondary font-medium leading-relaxed mb-6 lg:mb-8">
                {pipeline.subtitle}
              </p>

              {/* Compact Technical Process Map - Desktop Only to prevent mobile duplication */}
              <div className="hidden lg:block rounded-2xl bg-brand-card border border-brand-border p-5 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-brand-border/60">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                    <span className="text-[11px] font-mono font-bold text-brand-textPrimary uppercase tracking-wider">
                      {labels.mapTitle}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-textSecondary">
                    {labels.illustrativeLabel}
                  </span>
                </div>

                {/* Vertical Process Steps Tracker */}
                <div className="space-y-3 relative">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-center gap-3 group">
                      {/* Connecting Line between steps */}
                      {idx < steps.length - 1 && (
                        <div 
                          className="absolute left-3.5 top-7 bottom-[-12px] w-[2px] bg-brand-border pointer-events-none" 
                          aria-hidden="true"
                        />
                      )}

                      {/* Step Marker */}
                      <div className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border group-hover:border-brand-primary/50 flex items-center justify-center shrink-0 z-10 transition-colors">
                        <span className="text-[11px] font-mono font-bold text-brand-textPrimary">
                          {step.num}
                        </span>
                      </div>

                      {/* Step Label */}
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-mono font-semibold text-brand-textSecondary block uppercase tracking-wider truncate">
                          {step.mapLabel || step.title}
                        </span>
                      </div>

                      <div className="text-[9px] font-mono text-brand-textSecondary/60">
                        0{idx + 1}/04
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Area (~60-65% on Desktop): Four Stage Panels in a 2x2 Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4.5 items-stretch">
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
                    className="rounded-2xl bg-brand-card border border-brand-border p-5 sm:p-5.5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all duration-300 relative group"
                  >
                    <div>
                      {/* Top Bar: Icon + Stage Indicator + Stage Index Badge */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            {getStageIcon(idx)}
                          </div>
                          <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-wider truncate max-w-[120px] sm:max-w-none">
                            {step.mapLabel || `STAGE 0${idx + 1}`}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono font-bold text-brand-textSecondary px-2 py-0.5 rounded-md bg-brand-surface border border-brand-border shrink-0">
                          {step.num}
                        </span>
                      </div>

                      {/* Stage Heading */}
                      <h3 className="text-base sm:text-lg font-bold text-brand-textPrimary mb-2 tracking-tight leading-snug">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed mb-4">
                        {step.desc}
                      </p>
                    </div>

                    <div>
                      {/* Typical Output Box */}
                      {step.output && (
                        <div className="mb-3 p-2.5 rounded-xl bg-brand-surface border border-brand-border flex items-start gap-2">
                          <div className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[9px] font-mono font-bold text-brand-textSecondary block uppercase tracking-wider">
                              {labels.outputLabel}
                            </span>
                            <span className="text-[11px] font-semibold text-brand-textPrimary block truncate">
                              {step.output}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Compact Illustrative Artifact Block */}
                      <div 
                        className="rounded-xl border border-brand-border/70 bg-brand-surface/70 p-2.5 overflow-hidden"
                        aria-hidden="true"
                      >
                        <div className="flex items-center justify-between text-[9px] font-mono font-semibold text-brand-textSecondary pb-1.5 mb-1.5 border-b border-brand-border/60">
                          <span className="uppercase truncate max-w-[130px]">{artifact.heading || "STAGE ARTIFACT"}</span>
                          <span className="text-brand-primary font-bold shrink-0">{artifact.badge || `PHASE // 0${idx + 1}`}</span>
                        </div>

                        {/* Artifact Tags with Localized Action Label */}
                        <div className="space-y-1 text-[9px] font-mono">
                          {(artifact.tags || []).slice(0, 3).map((tag, tIdx) => (
                            <div key={tIdx} className="flex items-center justify-between bg-brand-card px-2 py-1 rounded border border-brand-border/50">
                              <span className="text-brand-textSecondary truncate max-w-[130px] sm:max-w-[140px]">{tag}</span>
                              <span className={`text-[8px] font-bold uppercase shrink-0 ${getActionColor(idx)}`}>
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

        </div>

      </div>
    </section>
  );
}
