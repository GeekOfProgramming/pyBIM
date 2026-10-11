"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import CtaLink from "@/components/ui/cta-link";
import { motion, useReducedMotion } from "framer-motion";

export default function SystemBenchmarks() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).systemBenchmarks;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  return (
    <section
      id="system-benchmarks"
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family A — Base Architectural Background */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Left-Aligned Editorial Architecture
            ========================================================================= */}
        <div className="max-w-3xl mb-14 lg:mb-20">

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
          <p className="text-lead text-brand-textSecondary font-normal leading-relaxed mb-4">
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
            Sitting directly on canvas with NO cards, NO dashboard boxes, NO fake numbers
            ========================================================================= */}
        <ol
          role="list"
          aria-label={data.blueprint_aria_label}
          className="w-full border-t border-b border-brand-border/80 divide-y divide-brand-border/70"
        >
          {data.stages.map((stage, index) => (
            <motion.li
              key={stage.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="py-8 md:py-10 lg:py-12 group transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                {/* Column A: Process Label (~17% width on desktop) */}
                <div className="lg:col-span-2">
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

                {/* Column B: Narrative Title & Description (~58% width on desktop) */}
                <div className="lg:col-span-7 xl:col-span-7 min-w-0">
                  <h3 className="text-card-title lg:text-xl font-bold text-brand-textPrimary tracking-tight mb-2.5 leading-snug">
                    {stage.title}
                  </h3>
                  <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Column C: Typical Output (~25% width on desktop) */}
                <div className="lg:col-span-3 xl:col-span-3 lg:pl-4 lg:border-l lg:border-brand-border/40">
                  <span className="font-mono text-[11px] font-bold text-brand-textSecondary/70 tracking-wider uppercase block mb-1">
                    {data.output_label}
                  </span>
                  <p className="font-mono text-caption text-brand-textPrimary/90 leading-relaxed">
                    {stage.output}
                  </p>
                </div>

              </div>
            </motion.li>
          ))}
        </ol>

        {/* =========================================================================
            BOTTOM STRATEGY BAR: Closing Statement & Primary CTA
            ========================================================================= */}
        <div className="mt-14 lg:mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-mono text-caption text-brand-textSecondary tracking-wide">
            {data.closing_statement}
          </p>

          <CtaLink href={data.cta.href} variant="primary">
            {data.cta.label}
          </CtaLink>
        </div>

      </div>
    </section>
  );
}
