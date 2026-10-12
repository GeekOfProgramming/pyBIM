"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { motion, useReducedMotion } from "framer-motion";

export default function SystemBenchmarks() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).systemBenchmarks;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  return (
    <section
      className="relative py-16 md:py-24 lg:py-28 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family A — Architectural BIM Canvas Background */}
      <EngineeringBackdrop variant="home-base" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Left-Aligned Editorial Architecture
            Balanced header-to-blueprint gap (mb-10 lg:mb-12)
            ========================================================================= */}
        <div className="max-w-3xl mb-10 lg:mb-12">

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-widest uppercase mb-4 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Semantic Single H2 Heading */}
          <h2
            id={`${sectionId}-heading`}
            className="text-section font-extrabold text-brand-textPrimary tracking-tight mb-4"
          >
            {data.heading}
          </h2>

          {/* Editorial Introduction */}
          <p className="text-lead text-brand-textSecondary font-normal leading-relaxed mb-3">
            {data.description}
          </p>

          {/* Process Overview Subtitle */}
          <p className="font-mono text-caption text-brand-textSecondary/80 tracking-wide">
            {data.process_note}
          </p>
        </div>

        {/* =========================================================================
            MAIN BLUEPRINT: Open Editorial Engineering Sheet
            Sequence of four horizontal content rows separated by hairline rules
            2 : 8 : 4 Editorial Grid Ratio on Desktop:
            - Column A (~14.3%): Label
            - Column B (~57.1%): Stage Title & Narrative Description
            - Column C (~28.6%): Typical Output
            Enlarged Typography: text-card-title (24px), text-lead (18px), Inter text-lead (18px output)
            Compact padding: py-5 md:py-6 lg:py-7
            ========================================================================= */}
        <ol
          role="list"
          aria-label={data.blueprint_aria_label}
          className="w-full border-t border-b border-brand-border/80 divide-y divide-brand-border/70"
        >
          {data.stages.map((stage, index) => (
            <motion.li
              key={stage.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="py-5 md:py-6 lg:py-7 group transition-colors"
            >
              {/* Responsive Grid: Stacks on mobile/tablet, 2fr 8fr 4fr on desktop (lg:) */}
              <div className="grid grid-cols-1 lg:[grid-template-columns:minmax(0,2fr)_minmax(0,8fr)_minmax(0,4fr)] gap-5 lg:gap-6 items-start">

                {/* Column A: Process Label (~14.3% width on desktop) */}
                <div className="pt-1">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-0.5 bg-brand-primary/70 rounded-full shrink-0 group-hover:w-4 group-hover:bg-brand-primary transition-all duration-200"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-caption font-bold text-brand-primary tracking-widest uppercase">
                      {stage.label}
                    </span>
                  </div>
                </div>

                {/* Column B: Narrative Title & Description (~57.1% width on desktop) */}
                <div className="min-w-0 pr-0 lg:pr-4">
                  <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-lead text-brand-textSecondary font-normal leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Column C: Typical Output (~28.6% width on desktop) */}
                <div className="lg:pl-6 lg:border-l lg:border-brand-border/40">
                  <span className="font-mono text-[11px] font-bold text-brand-textSecondary/70 tracking-wider uppercase block mb-1.5">
                    {data.output_label}
                  </span>
                  <p className="font-sans text-lead font-medium text-brand-textPrimary leading-relaxed">
                    {stage.output}
                  </p>
                </div>

              </div>
            </motion.li>
          ))}
        </ol>

        {/* =========================================================================
            BOTTOM STRATEGY BAR: Closing Statement (Preserved after CTA consolidation)
            Refined spacing and clear readable text-body-sm Inter typography
            ========================================================================= */}
        <div className="mt-8 lg:mt-10 pt-5 text-center">
          <p className="font-sans text-body-sm text-brand-textSecondary font-normal tracking-normal max-w-2xl mx-auto">
            {data.closing_statement}
          </p>
        </div>

      </div>
    </section>
  );
}
