"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import {
  FileText,
  Boxes,
  FileCheck2,
  ArrowRight,
  ArrowDown,
  Users,
  Workflow,
  ShieldCheck
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const CAPABILITY_ICONS = {
  flexible_engineering: Users,
  automation: Workflow,
  quality_review: ShieldCheck,
};

export default function DeploymentModels() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).deploymentModels;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  return (
    <section
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family A — Base Architectural Background */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Centered Editorial Intro
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-18">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-widest uppercase mb-5 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Semantic Single H2 Heading */}
          <h2
            id={`${sectionId}-heading`}
            className="text-section font-extrabold text-brand-textPrimary tracking-tight mb-5"
          >
            {data.heading}
          </h2>

          {/* Editorial Introduction */}
          <p className="text-lead text-brand-textSecondary font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* =========================================================================
            THREE-BLOCK DELIVERY FLOW: 3 / 6 / 3 Desktop Grid Ratio
            Equal Height & Aligned Edges with subtle directional connectors
            1. LEFT: col-span-12 lg:col-span-3 (Neutral Slate Project Input)
            2. CENTER: col-span-12 lg:col-span-6 (pyBIM Coordinated Delivery - Dominant, Brand Blue Accent)
            3. RIGHT: col-span-12 lg:col-span-3 (Delivery Output - Subtle Emerald Tint)
            ========================================================================= */}
        <div
          role="region"
          aria-label={data.diagram_aria_label}
          className="relative"
        >
          {/* 12-Column Grid for precise 3 / 6 / 3 desktop distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-stretch">

            {/* -----------------------------------------------------------------------
                BLOCK 1: LEFT — col-span-12 lg:col-span-3 (Neutral Slate Input)
                ----------------------------------------------------------------------- */}
            <motion.article
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 flex flex-col justify-between rounded-2xl lg:rounded-3xl bg-brand-card/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 lg:p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 relative group cursor-default"
              aria-labelledby={`${sectionId}-input-title`}
            >
              <div>
                {/* Header: Label & Icon */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-caption font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                    {data.input.label}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                    <FileText className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                {/* Heading & Supporting Line */}
                <h3
                  id={`${sectionId}-input-title`}
                  className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2"
                >
                  {data.input.title}
                </h3>

                <p className="font-mono text-caption font-semibold text-brand-primary tracking-wide mb-4">
                  {data.input.supporting}
                </p>

                {/* Description */}
                <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                  {data.input.description}
                </p>
              </div>

              {/* Step indicator & mobile down arrow */}
              <div className="mt-8 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-brand-textSecondary">
                <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  Step 01 · Input
                </span>
                <div className="lg:hidden flex items-center gap-1 font-mono text-[11px] font-semibold text-brand-primary">
                  <span>Next</span>
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
            </motion.article>

            {/* -----------------------------------------------------------------------
                BLOCK 2: CENTER — col-span-12 lg:col-span-6 (pyBIM Coordinated Delivery)
                DOMINANT VISUAL ELEMENT: Elevated card, subtle Brand Blue tint & border
                Contains Three Lightweight Internal Capability Rows
                ----------------------------------------------------------------------- */}
            <motion.article
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="lg:col-span-6 flex flex-col justify-between rounded-2xl lg:rounded-3xl bg-brand-cardElevated border border-brand-primary/40 dark:border-brand-primary/50 bg-blue-50/20 dark:bg-blue-950/20 p-6 sm:p-8 lg:p-9 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-brand-primary relative group cursor-default"
              aria-labelledby={`${sectionId}-center-title`}
            >
              <div>
                {/* Header: Label & Brand Icon */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                    <span className="font-mono text-caption font-bold text-brand-primary tracking-wider uppercase">
                      {data.center.label}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                    <Boxes className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>

                {/* Dominant Heading & Supporting Line */}
                <h3
                  id={`${sectionId}-center-title`}
                  className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-brand-textPrimary tracking-tight mb-2.5 leading-snug"
                >
                  {data.center.title}
                </h3>

                <p className="font-mono text-caption font-semibold text-brand-primary tracking-wide mb-4">
                  {data.center.supporting}
                </p>

                {/* Main Description */}
                <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-6">
                  {data.center.description}
                </p>

                {/* Three Concise Supporting Capabilities (Internal rows, no nested cards) */}
                <div className="pt-4 border-t border-brand-border/60 space-y-3.5">
                  {data.center.capabilities.map((cap) => {
                    const Icon = CAPABILITY_ICONS[cap.id] || Users;
                    return (
                      <div key={cap.id} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-md bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-body-sm font-semibold text-brand-textPrimary leading-snug">
                            {cap.title}
                          </h4>
                          <p className="text-[12px] sm:text-caption text-brand-textSecondary leading-snug">
                            {cap.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Execution indicator & mobile down arrow */}
              <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-center justify-between text-brand-textSecondary">
                <span className="font-mono text-[11px] tracking-wider uppercase text-brand-textSecondary/80">
                  Step 02 · Execution & Review
                </span>
                <div className="lg:hidden flex items-center gap-1 font-mono text-[11px] font-semibold text-brand-primary">
                  <span>Next</span>
                  <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </div>
            </motion.article>

            {/* -----------------------------------------------------------------------
                BLOCK 3: RIGHT — col-span-12 lg:col-span-3 (Reviewed BIM Deliverables)
                Subtle Emerald Tint & Restrained Emerald Border for Meaningful Delivery Stage
                ----------------------------------------------------------------------- */}
            <motion.article
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="lg:col-span-3 flex flex-col justify-between rounded-2xl lg:rounded-3xl bg-brand-card/90 dark:bg-slate-900/60 border border-emerald-500/30 dark:border-emerald-500/40 bg-emerald-50/15 dark:bg-emerald-950/15 p-6 sm:p-7 lg:p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-emerald-500/40 relative group cursor-default"
              aria-labelledby={`${sectionId}-output-title`}
            >
              <div>
                {/* Header: Label & Icon */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <span className="font-mono text-caption font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                    {data.output.label}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>

                {/* Heading & Supporting Line */}
                <h3
                  id={`${sectionId}-output-title`}
                  className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2"
                >
                  {data.output.title}
                </h3>

                <p className="font-mono text-caption font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide mb-4">
                  {data.output.supporting}
                </p>

                {/* Description */}
                <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                  {data.output.description}
                </p>
              </div>

              {/* Completion Indicator */}
              <div className="mt-8 pt-4 border-t border-emerald-200/50 dark:border-emerald-900/40 flex items-center justify-between text-brand-textSecondary">
                <span className="font-mono text-[11px] tracking-wider uppercase text-emerald-600/90 dark:text-emerald-400/90">
                  Step 03 · Handover
                </span>
                <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Ready for Project
                </span>
              </div>
            </motion.article>

          </div>
        </div>

        {/* =========================================================================
            BOTTOM STRATEGY BAR: Supporting Statement (Preserved after CTA Consolidation)
            ========================================================================= */}
        <div className="mt-12 lg:mt-14 pt-6 border-t border-brand-border/60 text-center">
          <p className="font-mono text-caption text-brand-textSecondary tracking-wide">
            {data.supporting_statement}
          </p>
        </div>

      </div>
    </section>
  );
}
