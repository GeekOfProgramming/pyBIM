"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { motion, useReducedMotion } from "framer-motion";

export default function StrategicEcosystem() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).strategicEcosystem;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  return (
    <section
      id="strategic-ecosystem"
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family A — Architectural BIM Canvas Background */}
      <EngineeringBackdrop variant="home-base" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Left-Aligned Editorial Architecture
            ========================================================================= */}
        <div className="max-w-3xl mb-16 md:mb-24 lg:mb-28">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-wider uppercase mb-5 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>{data.eyebrow}</span>
          </div>

          {/* Semantic Single H2 Heading */}
          <h2
            id={`${sectionId}-heading`}
            className="text-3xl sm:text-[34px] lg:text-section font-extrabold text-brand-textPrimary tracking-tight leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] mb-5"
          >
            {data.heading}
          </h2>

          {/* Editorial Introduction */}
          <p className="text-[17px] sm:text-lead text-brand-textSecondary font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* =========================================================================
            MAIN CANVAS: AEC Editorial Typography Installation
            Oversized Asymmetric Compositions (Architecture · Engineering · Construction)
            Sitting on open architectural canvas with ZERO cards, ZERO borders, ZERO grids
            ========================================================================= */}
        <div className="space-y-20 md:space-y-28 lg:space-y-36">

          {data.audiences.map((audience, index) => {
            const isHighlight = audience.id === "engineering";
            const isShifted = index === 1;

            return (
              <motion.article
                key={audience.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className={`w-full flex flex-col ${
                  isShifted ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left"
                }`}
                aria-labelledby={`${sectionId}-${audience.id}-title`}
              >
                <div className={`w-full max-w-4xl ${isShifted ? "lg:mr-0 lg:ml-auto" : "lg:ml-0 lg:mr-auto"}`}>

                  {/* Oversized Expressive Typographic Word */}
                  <div
                    className={`font-sans font-black tracking-tighter select-none leading-[0.92] mb-5 lg:mb-7 transition-colors ${
                      isHighlight
                        ? "text-brand-primary"
                        : "text-brand-textPrimary"
                    } text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-9xl`}
                    aria-hidden="true"
                  >
                    {audience.display}
                  </div>

                  {/* Subordinate Audience Heading, Capability Line & Description */}
                  <div
                    className={`flex flex-col space-y-3.5 ${
                      isShifted ? "lg:items-end" : "lg:items-start"
                    }`}
                  >
                    {/* Audience Subtitle & Capability Rail */}
                    <div
                      className={`flex flex-wrap items-center gap-3 ${
                        isShifted ? "lg:justify-end" : "lg:justify-start"
                      }`}
                    >
                      <h3
                        id={`${sectionId}-${audience.id}-title`}
                        className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary tracking-tight leading-[1.25] sm:leading-[1.25] lg:leading-[1.25]"
                      >
                        {audience.name}
                      </h3>

                      <span
                        className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-brand-border"
                        aria-hidden="true"
                      />

                      <span className="font-mono text-caption font-semibold text-brand-primary tracking-wide">
                        {audience.capability_line}
                      </span>
                    </div>

                    {/* Explanatory Narrative Description */}
                    <p className="max-w-2xl text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed">
                      {audience.description}
                    </p>
                  </div>

                </div>
              </motion.article>
            );
          })}

        </div>

        {/* =========================================================================
            CLOSING STATEMENT: Quiet Editorial Closing Line (Zero CTA Buttons)
            ========================================================================= */}
        <div className="mt-20 md:mt-28 lg:mt-32 pt-8 border-t border-brand-border/70 text-center">
          <p className="font-mono text-caption text-brand-textSecondary tracking-wide max-w-2xl mx-auto">
            {data.closing_statement}
          </p>
        </div>

      </div>
    </section>
  );
}
