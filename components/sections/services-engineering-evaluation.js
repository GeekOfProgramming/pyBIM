"use client";

import { useId } from "react";
import { 
  Workflow, 
  FileCheck2, 
  Layers, 
  FileText,
  SlidersHorizontal,
  ArrowRight,
  GitBranch
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

const assessmentIcons = {
  "workflow-efficiency": Workflow,
  "information-quality": FileCheck2,
  "coordination-handover": Layers
};

export default function ServicesEngineeringEvaluation({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  if (!data) return null;

  const evaluation = data;
  const assessments = evaluation.assessments || [];
  const colLabels = evaluation.columnLabels || {};

  return (
    <section 
      id="engineering-evaluation"
      className="scroll-mt-28 py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border relative overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Background Rhythm: Family A (Base / Architectural) */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* AREA A: METHODOLOGY INTRODUCTION (Typographically crisp editorial lead)    */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-12 lg:mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {evaluation.tag}
            </span>
          </div>

          {/* Headline */}
          <h2 
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {evaluation.headline}
          </h2>

          {/* Subtitle */}
          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed mb-6 max-w-3xl">
            {evaluation.subtitle}
          </p>

          {/* Project-Specific Methodology Note */}
          {evaluation.methodologyNote && (
            <div className="inline-flex items-start sm:items-center gap-3 px-4 py-3 rounded-xl bg-brand-surface border border-brand-border/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary shrink-0">
                  {evaluation.badge}
                </span>
                <span className="hidden sm:inline text-brand-border" aria-hidden="true">·</span>
                <span className="text-caption text-brand-textSecondary font-medium">
                  {evaluation.methodologyNote}
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ========================================================================= */}
        {/* AREA B: ENGINEERING VERIFICATION MATRIX (Unified Precision Review Sheet) */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-brand-cardElevated border border-brand-border shadow-lg shadow-black/5 overflow-hidden"
          role="region"
          aria-label={evaluation.matrixAriaLabel || evaluation.tag}
        >
          {/* Matrix Header Row (Visible on Desktop 1024px+: Strictly 5 / 4 / 3 = 12 columns) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 px-8 py-4 bg-brand-surface/90 border-b border-brand-border/80 text-technical font-mono font-bold uppercase tracking-wider text-brand-textSecondary">
            <div className="col-span-5 flex items-center gap-2">
              <GitBranch className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
              <span>{colLabels.domain}</span>
            </div>
            <div className="col-span-4 flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
              <span>{colLabels.criteria}</span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
              <span>{colLabels.evidence}</span>
            </div>
          </div>

          {/* Three Integrated Evaluation Tracks */}
          <div className="divide-y divide-brand-border/80">
            {assessments.map((item, idx) => {
              const IconComponent = assessmentIcons[item.id] || SlidersHorizontal;

              return (
                <motion.article
                  key={item.id || idx}
                  id={`${baseId}-track-${idx}`}
                  aria-labelledby={`${baseId}-track-title-${idx}`}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 lg:px-8 lg:py-7 hover:bg-brand-surface/30 transition-colors"
                >
                  {/* Exactly 3 direct children in 12 cols: 5 cols + 4 cols + 3 cols = 12 */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    
                    {/* 1. Review Domain (5 cols on Desktop) */}
                    <div className="lg:col-span-5 relative flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                          {item.num}
                        </span>
                        <div className="flex items-center gap-2 text-brand-primary">
                          <IconComponent className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span className="text-caption font-mono font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <h3 
                        id={`${baseId}-track-title-${idx}`}
                        className="text-card-title sm:text-xl font-bold text-brand-textPrimary tracking-tight mb-2 leading-snug"
                      >
                        {item.title}
                      </h3>

                      <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Directional Traceability Indicator between Domain & Criteria (Non-participating in grid tracks) */}
                      <div 
                        className="hidden lg:flex items-center absolute -right-6 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
                        aria-hidden="true"
                      >
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-brand-primary/50" />
                        </motion.div>
                      </div>
                    </div>

                    {/* 2. Evaluation Criteria (4 cols on Desktop) */}
                    <div className="lg:col-span-4 relative flex flex-col justify-center">
                      <span className="lg:hidden block text-technical font-mono font-bold uppercase tracking-wider text-brand-textSecondary mb-2">
                        {evaluation.criteriaLabel || colLabels.criteria}
                      </span>
                      <div className="flex flex-col gap-2">
                        {item.criteria && item.criteria.map((crit, cIdx) => (
                          <div 
                            key={cIdx}
                            className="flex items-center gap-2.5 p-2 rounded-lg bg-brand-surface/80 border border-brand-border/70 text-body-sm text-brand-textPrimary"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                            <span className="font-mono text-caption font-semibold leading-tight">{crit}</span>
                          </div>
                        ))}
                      </div>

                      {/* Directional Traceability Indicator between Criteria & Evidence (Non-participating in grid tracks) */}
                      <div 
                        className="hidden lg:flex items-center absolute -right-6 top-1/2 -translate-y-1/2 pointer-events-none z-10" 
                        aria-hidden="true"
                      >
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.35 + idx * 0.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-brand-primary/50" />
                        </motion.div>
                      </div>
                    </div>

                    {/* 3. Possible Review Evidence (3 cols on Desktop) */}
                    <div className="lg:col-span-3 flex flex-col justify-center">
                      <span className="lg:hidden block text-technical font-mono font-bold uppercase tracking-wider text-brand-primary mb-2">
                        {item.evidenceLabel || colLabels.evidence}
                      </span>
                      <div className="p-3.5 rounded-xl bg-brand-surface/90 border border-brand-border/90 flex items-start gap-2.5 shadow-sm">
                        <FileText className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-caption font-medium text-brand-textSecondary leading-relaxed">
                          {item.evidence}
                        </span>
                      </div>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
