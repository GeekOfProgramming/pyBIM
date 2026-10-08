"use client";

import { useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { 
  ArrowRight, 
  Check, 
  Compass, 
  CloudCog, 
  Server, 
  Boxes, 
  Sparkles,
  Info
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesIntegrationPathways({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Fallback defaults if data is missing or loading
  const pathways = data || {
    tag: "ENGAGEMENT PATHWAYS",
    headline: "Choose the Right Engagement Path for Your BIM Team.",
    subtitle: "Work with pyBIM on practical engineering challenges today, or explore the connected automation and private AI solutions on our development roadmap. Each pathway has a different scope and availability.",
    columns: []
  };

  const columns = pathways.columns || [];
  const primaryPathway = columns[0] || {};
  const roadmapPathways = columns.slice(1);

  return (
    <section 
      id="integration-pathways" 
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
              {pathways.tag}
            </span>
          </div>

          <h2 
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {pathways.headline}
          </h2>

          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed max-w-3xl">
            {pathways.subtitle}
          </p>
        </motion.div>

        {/* Asymmetrical Engagement Pathways Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Featured Pathway 01 (Engineering Project Delivery — Available Now) */}
          {primaryPathway && (
            <motion.article
              id={`${baseId}-pathway-0`}
              aria-labelledby={`${baseId}-pathway-title-0`}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-brand-card border-2 border-brand-primary p-6 sm:p-8 lg:p-10 shadow-xl shadow-brand-primary/5 ring-1 ring-brand-primary/20 relative"
            >
              {/* Featured Badge */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-brand-primary to-blue-600 text-white text-technical font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-brand-primary/20 flex items-center gap-1.5 z-10 pointer-events-none">
                <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
                <span>ACTIVE ENGAGEMENT</span>
              </div>

              <div>
                {/* Top Bar: Icon + Category Tag + Status Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-mono font-bold text-caption shrink-0">
                      {primaryPathway.num || "01"}
                    </span>
                    <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary">
                      {primaryPathway.category}
                    </span>
                  </div>

                  {/* Status Badge: Available Now */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-technical font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                    <span 
                      className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${!shouldReduceMotion ? "animate-pulse" : ""}`} 
                      aria-hidden="true" 
                    />
                    {primaryPathway.statusLabel || "AVAILABLE NOW"}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  id={`${baseId}-pathway-title-0`}
                  className="text-2xl sm:text-3xl font-extrabold text-brand-textPrimary tracking-tight mb-4 leading-snug"
                >
                  {primaryPathway.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm sm:text-body text-brand-textSecondary font-medium leading-relaxed mb-6">
                  {primaryPathway.desc}
                </p>

                {/* Supporting Topics Grid */}
                {primaryPathway.topics && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {primaryPathway.topics.map((topic, i) => (
                      <div 
                        key={i}
                        className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-surface border border-brand-border/80 text-body-sm font-medium text-brand-textPrimary"
                      >
                        <div className="w-5 h-5 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <span className="text-caption font-semibold leading-tight">{topic}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Engagement Detail / How To Start Box */}
                {primaryPathway.engagementText && (
                  <div className="p-5 rounded-2xl bg-brand-surface border border-brand-border mb-8">
                    <div className="flex items-center gap-2 mb-2 text-technical font-mono font-bold text-brand-primary uppercase tracking-wider">
                      <Compass className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                      <span>{primaryPathway.engagementLabel || "HOW TO START"}</span>
                    </div>
                    <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-4">
                      {primaryPathway.engagementText}
                    </p>

                    {/* Engagement Schematic Flow */}
                    {primaryPathway.schematic && (
                      <div className="pt-3 border-t border-brand-border/70 flex flex-wrap items-center gap-2 text-technical font-mono">
                        <span className="px-2.5 py-1 rounded-md bg-brand-card border border-brand-border text-brand-textPrimary font-semibold">
                          {primaryPathway.schematic.step1}
                        </span>
                        <ArrowRight className="w-3 h-3 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="px-2.5 py-1 rounded-md bg-brand-card border border-brand-border text-brand-textPrimary font-semibold">
                          {primaryPathway.schematic.step2}
                        </span>
                        <ArrowRight className="w-3 h-3 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="px-2.5 py-1 rounded-md bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-bold">
                          {primaryPathway.schematic.step3}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Primary CTA */}
              <div className="pt-6 border-t border-brand-border/70">
                <Link
                  href={primaryPathway.ctaHref || "/contact#audit"}
                  className="w-full sm:w-auto inline-flex items-center justify-center text-center bg-brand-primary hover:bg-brand-primary/90 text-white px-7 py-4 rounded-full text-caption font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/35 group/cta"
                >
                  <span>{primaryPathway.ctaText || "Discuss Your Project"}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/cta:translate-x-1 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          )}

          {/* Right Column: Future Roadmap Offerings (Pathways 02 & 03 — In Development) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {roadmapPathways.map((pathway, idx) => {
              const actualIdx = idx + 1;
              const isCloud = pathway.id === "cloud-connect";

              return (
                <motion.article
                  key={pathway.id || actualIdx}
                  id={`${baseId}-pathway-${actualIdx}`}
                  aria-labelledby={`${baseId}-pathway-title-${actualIdx}`}
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                  className="rounded-3xl bg-brand-card border border-brand-border p-6 sm:p-7 hover:border-brand-primary/40 transition-colors flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Top Bar: Icon + Category + In Development Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border text-brand-textSecondary flex items-center justify-center font-mono font-bold text-technical shrink-0">
                          {pathway.num || `0${actualIdx + 1}`}
                        </span>
                        <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textSecondary">
                          {pathway.category}
                        </span>
                      </div>

                      {/* Status Badge: In Development (Neutral, No Pulse) */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-technical font-mono font-bold uppercase tracking-wider ${
                        isCloud
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                          : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                      }`}>
                        {pathway.statusLabel || "IN DEVELOPMENT"}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      id={`${baseId}-pathway-title-${actualIdx}`}
                      className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5 leading-snug"
                    >
                      {pathway.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-4">
                      {pathway.desc}
                    </p>

                    {/* Supporting Topics Chips */}
                    {pathway.topics && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pathway.topics.map((t, i) => (
                          <span 
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-technical font-mono text-brand-textSecondary"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Development Stage Clarification / Disclaimer */}
                    {pathway.disclaimer && (
                      <div className="p-3 rounded-xl bg-brand-surface/70 border border-brand-border/60 text-technical font-mono text-brand-textSecondary flex items-start gap-2 mb-5">
                        <Info className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-normal">{pathway.disclaimer}</span>
                      </div>
                    )}
                  </div>

                  {/* Secondary Outline CTA */}
                  <div className="pt-4 border-t border-brand-border/60">
                    <Link
                      href={pathway.ctaHref || "/contact#priority-queue"}
                      className="w-full inline-flex items-center justify-center text-center border border-brand-border bg-brand-surface hover:bg-brand-card hover:border-brand-primary/40 text-brand-textSecondary hover:text-brand-primary px-5 py-3 rounded-full text-caption font-bold uppercase tracking-wider transition-all duration-300 group/cta"
                    >
                      <span>{pathway.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/cta:translate-x-1 shrink-0" aria-hidden="true" />
                    </Link>
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
