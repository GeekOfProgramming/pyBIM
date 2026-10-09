"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { 
  Check, 
  Compass, 
  Sparkles,
  Info,
  Layers,
  Cpu,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesIntegrationPathways({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  if (!data) return null;

  const pathways = data;
  const columns = pathways.columns || [];
  const primaryPathway = columns.find(c => c.id === "engineering" || c.statusKey === "available") || columns[0] || {};
  const roadmapPathways = columns.filter(c => c.id !== primaryPathway.id);

  return (
    <section 
      id="integration-pathways" 
      className="scroll-mt-28 py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border relative overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Family B (Surface / Technical) Background */}
      <EngineeringBackdrop variant="surface" />

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

        {/* Content-Driven Asymmetric Engineering Engagement Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: PRIMARY ACTIVE OFFERING (Engineering Project Delivery — Available)  */}
          {/* Dominant editorial card (~7 cols) with capability grid & initiation flow */}
          {/* ========================================================================= */}
          {primaryPathway && (
            <motion.article
              id={`${baseId}-pathway-0`}
              aria-labelledby={`${baseId}-pathway-title-0`}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col rounded-3xl bg-brand-cardElevated border-2 border-brand-primary/60 p-6 sm:p-8 lg:p-10 shadow-xl shadow-brand-primary/5 ring-1 ring-brand-primary/20 relative"
            >
              {/* Active Engagement Highlight Ribbon */}
              {pathways.activeBadge && (
                <div className="absolute -top-3.5 right-6 bg-brand-primary text-white text-technical font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-brand-primary/20 flex items-center gap-1.5 z-10 pointer-events-none">
                  <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
                  <span>{pathways.activeBadge}</span>
                </div>
              )}

              {/* Top Bar: Sequence Number + Category Tag + Verified Availability Badge */}
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-mono font-bold text-caption shrink-0">
                    {primaryPathway.num || "01"}
                  </span>
                  <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-primary">
                    {primaryPathway.category}
                  </span>
                </div>

                {/* Status Badge: Available Now (Static Precision Indicator, No Pulse) */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span>{primaryPathway.statusLabel}</span>
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
              <p className="text-body-sm sm:text-body text-brand-textSecondary font-normal leading-relaxed mb-6">
                {primaryPathway.desc}
              </p>

              {/* Capability Areas Grid */}
              {primaryPathway.topics && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {primaryPathway.topics.map((topic, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-surface/80 border border-brand-border/80 text-body-sm font-medium text-brand-textPrimary transition-colors hover:bg-brand-surface"
                    >
                      <div className="w-5 h-5 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="text-caption font-semibold leading-tight">{topic}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Engagement Initiation Flow — Distinctive Engineering Schematic */}
              {primaryPathway.engagementText && (
                <div className="p-5 sm:p-6 rounded-2xl bg-brand-surface/70 border border-brand-border/90 mb-8 relative">
                  <div className="flex items-center gap-2 mb-3 text-caption font-mono font-bold text-brand-primary uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                    <span>{primaryPathway.engagementLabel}</span>
                  </div>

                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-6">
                    {primaryPathway.engagementText}
                  </p>

                  {/* Connected Initiation Flow Path (Desktop: Horizontal / Mobile: Vertical) */}
                  {primaryPathway.schematic && (
                    <div 
                      className="pt-4 border-t border-brand-border/80"
                      aria-label={`${primaryPathway.schematic.step1} → ${primaryPathway.schematic.step2} → ${primaryPathway.schematic.step3}`}
                    >
                      {/* Desktop Horizontal Conduit Flow */}
                      <div className="hidden sm:grid grid-cols-3 gap-3 items-center relative">
                        {/* Connecting Flow Conduit Bar */}
                        <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-brand-border/90 pointer-events-none -z-0">
                          <motion.div 
                            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="h-full bg-brand-primary/50 origin-left"
                          />
                        </div>

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center relative z-10">
                          <span className="w-7 h-7 rounded-full bg-brand-card border-2 border-brand-border text-brand-textPrimary font-mono font-bold text-[11px] flex items-center justify-center mb-1.5 shadow-sm">
                            01
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-textPrimary px-2 py-0.5 rounded bg-brand-card/90 border border-brand-border/60">
                            {primaryPathway.schematic.step1}
                          </span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center relative z-10">
                          <span className="w-7 h-7 rounded-full bg-brand-card border-2 border-brand-primary text-brand-primary font-mono font-bold text-[11px] flex items-center justify-center mb-1.5 shadow-sm">
                            02
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-textPrimary px-2 py-0.5 rounded bg-brand-card/90 border border-brand-border/60">
                            {primaryPathway.schematic.step2}
                          </span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center relative z-10">
                          <span className="w-7 h-7 rounded-full bg-brand-primary text-white font-mono font-bold text-[11px] flex items-center justify-center mb-1.5 shadow-sm">
                            03
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-primary px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/30">
                            {primaryPathway.schematic.step3}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Vertical Flow */}
                      <div className="sm:hidden flex flex-col gap-2.5">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brand-card border border-brand-border text-brand-textPrimary font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                            01
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-textPrimary">
                            {primaryPathway.schematic.step1}
                          </span>
                        </div>
                        <div className="pl-3 py-0.5 text-brand-primary/60" aria-hidden="true">
                          <ArrowDown className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brand-card border border-brand-primary text-brand-primary font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                            02
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-textPrimary">
                            {primaryPathway.schematic.step2}
                          </span>
                        </div>
                        <div className="pl-3 py-0.5 text-brand-primary/60" aria-hidden="true">
                          <ArrowDown className="w-3.5 h-3.5 text-brand-primary" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-brand-primary text-white font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                            03
                          </span>
                          <span className="font-mono text-caption font-bold text-brand-primary">
                            {primaryPathway.schematic.step3}
                          </span>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-6 border-t border-brand-border/80 mt-auto">
                <CtaLink
                  href={primaryPathway.ctaHref || "/contact#audit"}
                  variant="primary"
                >
                  {primaryPathway.ctaText}
                </CtaLink>
              </div>
            </motion.article>
          )}

          {/* ========================================================================= */}
          {/* RIGHT: FUTURE ENGAGEMENT PATHWAYS (Pathways 02 & 03 — In Development)    */}
          {/* Two compact, visually restrained panels (~5 cols) with clear disclaimers */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
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
                  transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-brand-cardElevated border border-brand-border/90 p-6 sm:p-7 hover:border-brand-primary/40 transition-colors flex flex-col shadow-sm"
                >
                  {/* Top Bar: Index + Category + In Development Status */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border text-brand-textSecondary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                        {pathway.num || `0${actualIdx + 1}`}
                      </span>
                      <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-textSecondary">
                        {pathway.category}
                      </span>
                    </div>

                    {/* Status Badge: In Development (Restrained Neutral Styling) */}
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-caption font-mono font-bold uppercase tracking-wider ${
                      isCloud
                        ? "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30"
                        : "bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/30"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isCloud ? "bg-sky-500" : "bg-slate-500"}`} aria-hidden="true" />
                      <span>{pathway.statusLabel}</span>
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
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-4">
                    {pathway.desc}
                  </p>

                  {/* Supporting Topic Chips */}
                  {pathway.topics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pathway.topics.map((t, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-brand-surface/80 border border-brand-border/70 text-caption font-mono text-brand-textSecondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Development Stage Clarification / Disclaimer Box */}
                  {pathway.disclaimer && (
                    <div className="p-3.5 rounded-xl bg-brand-surface/70 border border-brand-border/60 text-caption text-brand-textSecondary flex items-start gap-2.5 mb-5">
                      <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="leading-relaxed">{pathway.disclaimer}</span>
                    </div>
                  )}

                  {/* Secondary Outline CTA */}
                  <div className="mt-auto pt-5 border-t border-brand-border/70">
                    <CtaLink
                      href={pathway.ctaHref || "/contact#priority-queue"}
                      variant="secondary"
                      fullWidth={true}
                    >
                      {pathway.ctaText}
                    </CtaLink>
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
