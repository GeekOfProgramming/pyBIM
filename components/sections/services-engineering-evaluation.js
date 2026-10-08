"use client";

import { useId } from "react";
import { 
  Workflow, 
  FileCheck2, 
  Layers, 
  FileText,
  SlidersHorizontal 
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const assessmentIcons = {
  "workflow-efficiency": Workflow,
  "information-quality": FileCheck2,
  "coordination-handover": Layers
};

export default function ServicesEngineeringEvaluation({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  const evaluation = data || {
    tag: "ENGINEERING EVALUATION",
    badge: "PROJECT-SPECIFIC EVALUATION",
    headline: "Clear Criteria. Reviewable Engineering Results.",
    subtitle: "BIM workflows should be assessed against agreed project requirements, available model data, and relevant engineering checks—not universal speed or accuracy promises.",
    methodologyNote: "Evaluation criteria, checks, and reporting methods are defined according to the project scope. The examples below illustrate possible assessment areas, not measured performance results.",
    criteriaLabel: "EVALUATION CRITERIA",
    assessments: []
  };

  const assessments = evaluation.assessments || [];

  return (
    <section 
      id="engineering-evaluation"
      className="py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left Column: Evaluation Introduction (35-40% width on desktop) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Section Eyebrow */}
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
            <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed mb-8">
              {evaluation.subtitle}
            </p>

            {/* Supporting Methodology Note Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-brand-surface border border-brand-border/80 shadow-sm">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary">
                  {evaluation.badge}
                </span>
              </div>
              <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed">
                {evaluation.methodologyNote}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Engineering Evaluation Ledger (60-65% width on desktop) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-brand-card border border-brand-border divide-y divide-brand-border/80 overflow-hidden shadow-sm">
              {assessments.map((item, idx) => {
                const IconComponent = assessmentIcons[item.id] || SlidersHorizontal;

                return (
                  <article
                    key={item.id || idx}
                    id={`${baseId}-assessment-${idx}`}
                    aria-labelledby={`${baseId}-assessment-title-${idx}`}
                    className="p-6 sm:p-8 hover:bg-brand-surface/40 transition-colors"
                  >
                    {/* Header Row: Num + Icon + Category */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                          {item.num}
                        </span>
                        <div className="flex items-center gap-2 text-brand-primary">
                          <IconComponent className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span className="text-technical font-mono font-bold uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      id={`${baseId}-assessment-title-${idx}`}
                      className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5 leading-snug"
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {/* Structured Evaluation Specification: Criteria + Evidence */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5 border-t border-brand-border/60">
                      
                      {/* Evaluation Criteria */}
                      <div>
                        <span className="block text-technical font-mono font-bold uppercase tracking-wider text-brand-textSecondary mb-2">
                          {evaluation.criteriaLabel || "EVALUATION CRITERIA"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.criteria && item.criteria.map((crit, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-caption font-mono font-medium text-brand-textPrimary"
                            >
                              {crit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Evidence Example */}
                      <div>
                        <span className="block text-technical font-mono font-bold uppercase tracking-wider text-brand-primary mb-2">
                          {item.evidenceLabel || "POSSIBLE REVIEW EVIDENCE"}
                        </span>
                        <div className="p-2.5 rounded-xl bg-brand-surface border border-brand-border/70 flex items-start gap-2">
                          <FileText className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-caption font-medium text-brand-textSecondary leading-normal">
                            {item.evidence}
                          </span>
                        </div>
                      </div>

                    </div>
                  </article>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
