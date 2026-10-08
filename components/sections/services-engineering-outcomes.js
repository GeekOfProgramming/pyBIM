"use client";

import { useId } from "react";
import { 
  Workflow, 
  ShieldCheck, 
  Boxes, 
  Check 
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesEngineeringOutcomes({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Fallback defaults if data is missing or loading
  const outcomes = data || {
    tag: "ENGINEERING OUTCOMES",
    headline: "More Control Across the BIM Delivery Process.",
    subtitle: "Practical engineering workflows can help teams reduce repetitive operations, improve the consistency of model information, and make better use of their existing BIM environment. The approach and results depend on each project's requirements.",
    columns: []
  };

  const columns = outcomes.columns || [];

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

  return (
    <section 
      id="engineering-outcomes"
      className="py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border overflow-hidden"
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

        {/* Unified Premium Engineering Outcomes Rail */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="rounded-3xl bg-brand-card border border-brand-border shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-brand-border/70 items-stretch">
            {columns.map((col, idx) => {
              const diagram = col.diagram || {};

              return (
                <article
                  key={col.id || idx}
                  id={`${baseId}-outcome-${col.id || idx}`}
                  aria-labelledby={`${baseId}-outcome-title-${col.id || idx}`}
                  className="p-6 sm:p-7 xl:p-8 flex flex-col group transition-colors duration-200 hover:bg-brand-surface/30 relative"
                >
                  <div>
                    {/* Top Bar: Icon + Category Tag + Numerical Index */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 ${
                            idx === 0
                              ? "bg-brand-primary/10 border border-brand-primary/20 text-brand-primary"
                              : idx === 1
                              ? "bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400"
                              : "bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400"
                          }`}
                          aria-hidden="true"
                        >
                          {getOutcomeIcon(col.icon || col.id, "w-5 h-5")}
                        </div>
                        <span className="text-technical font-mono font-bold text-brand-primary uppercase tracking-wider">
                          {col.category}
                        </span>
                      </div>

                      <span className="text-technical font-mono font-bold text-brand-textSecondary px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border shrink-0">
                        {col.num || `0${idx + 1}`}
                      </span>
                    </div>

                    {/* Outcome Title */}
                    <h3 
                      id={`${baseId}-outcome-title-${col.id || idx}`}
                      className="text-xl lg:text-card-title font-bold text-brand-textPrimary mb-3 tracking-tight leading-snug"
                    >
                      {col.title}
                    </h3>

                    {/* Explanatory Paragraph */}
                    <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                      {col.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    {/* Technical Schematic Illustration Motif */}
                    {diagram.title && (
                      <div 
                        className="rounded-2xl border border-brand-border/70 bg-brand-surface/70 p-4 mb-6 overflow-hidden"
                        aria-hidden="true"
                      >
                        {/* Motif Header */}
                        <div className="flex items-center justify-between text-technical font-mono font-semibold text-brand-textSecondary pb-2.5 mb-3 border-b border-brand-border/60">
                          <span className="uppercase tracking-wider">{diagram.title}</span>
                          <span className="text-brand-primary font-bold shrink-0">{diagram.badge}</span>
                        </div>

                        {/* Motif 01: Process Evolution (Workflow Efficiency) */}
                        {idx === 0 && Array.isArray(diagram.steps) && (
                          <div className="space-y-1.5">
                            {diagram.steps.map((st, sIdx) => (
                              <div 
                                key={sIdx}
                                className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded-lg border border-brand-border/50 text-technical font-mono"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                  <span className="text-brand-textPrimary font-medium">{st.label}</span>
                                </div>
                                <span className="text-technical font-bold text-brand-primary uppercase">
                                  {st.tag || "STEP"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Motif 02: Information Review (Information Quality) */}
                        {idx === 1 && Array.isArray(diagram.fields) && (
                          <div className="space-y-1.5">
                            {diagram.fields.map((f, fIdx) => (
                              <div 
                                key={fIdx}
                                className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded-lg border border-brand-border/50 text-technical font-mono"
                              >
                                <span className="text-brand-textPrimary font-medium">{f.name}</span>
                                <span className="text-sky-600 dark:text-sky-400 font-bold uppercase inline-flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  {f.tag}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Motif 03: Connected Ecosystem (Workflow Integration) */}
                        {idx === 2 && Array.isArray(diagram.nodes) && (
                          <div className="space-y-1.5">
                            {diagram.nodes.map((n, nIdx) => (
                              <div 
                                key={nIdx}
                                className="flex items-center justify-between bg-brand-card px-2.5 py-1.5 rounded-lg border border-brand-border/50 text-technical font-mono"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-teal-600 dark:text-teal-400 font-bold">
                                    {n.code}
                                  </span>
                                  <span className="text-brand-textPrimary font-medium">{n.label}</span>
                                </div>
                                <span className="text-teal-600 dark:text-teal-400 font-bold uppercase">
                                  {n.tag || "FLOW"}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Supporting Topic Pills */}
                    {Array.isArray(col.topics) && (
                      <div className="pt-4 border-t border-brand-border/60">
                        <div className="flex flex-wrap gap-1.5">
                          {col.topics.map((topic, tIdx) => (
                            <span 
                              key={tIdx}
                              className="inline-flex items-center text-technical font-mono font-medium px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary group-hover:border-brand-primary/30 transition-colors"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
