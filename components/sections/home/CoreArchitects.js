"use client";

import { useId } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import CtaLink from "@/components/ui/cta-link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function CoreArchitects() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).coreArchitects;
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  return (
    <section
      id="core-architects"
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-surface text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family B — Surface Technical Background */}
      <EngineeringBackdrop variant="surface" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Left-Aligned Editorial Architecture
            ========================================================================= */}
        <div className="max-w-3xl mb-14 lg:mb-18">
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
            PRIMARY SHOWCASE: PHASE II — pyBIM Cloud Connect (75–80% visual emphasis)
            Deep Navy Architectural Engineering Surface with Subtle Roman Numeral 'II'
            ========================================================================= */}
        <motion.article
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="relative w-full rounded-2xl lg:rounded-3xl bg-[#0F172A] text-slate-100 border border-slate-700/80 shadow-2xl overflow-hidden p-8 sm:p-10 lg:p-14 mb-10 lg:mb-12 group"
          aria-labelledby={`${sectionId}-phase2-title`}
        >
          {/* Blueprint-inspired subtle ambient glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            aria-hidden="true"
          />

          {/* Decorative Oversized Roman Numeral 'II' in Background */}
          <div
            className="absolute right-6 sm:right-12 bottom-6 sm:bottom-10 pointer-events-none select-none font-mono font-black text-slate-800/40 text-[120px] sm:text-[180px] lg:text-[240px] leading-none tracking-tighter"
            aria-hidden="true"
          >
            II
          </div>

          <div className="relative z-10 flex flex-col justify-between min-h-full">

            {/* Upper Area: Phase Identifier & Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8 sm:mb-10">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-0.5 bg-cyan-400 rounded-full shrink-0"
                  aria-hidden="true"
                />
                <span className="font-mono text-caption font-bold text-cyan-400 tracking-widest uppercase">
                  {data.phase2.label}
                </span>
              </div>

              {/* Status Pill: Controlled Private Testing */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 font-mono text-[11px] font-semibold tracking-wider uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                <span>{data.phase2.status}</span>
              </div>
            </div>

            {/* Main Content Area: Typography-forward product statement */}
            <div className="max-w-3xl mb-10 sm:mb-12">
              <h3
                id={`${sectionId}-phase2-title`}
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3"
              >
                {data.phase2.title}
              </h3>

              <p className="text-lg sm:text-xl font-semibold text-cyan-200/90 tracking-tight mb-4">
                {data.phase2.positioning}
              </p>

              <p className="text-body-sm sm:text-body text-slate-300 font-normal leading-relaxed">
                {data.phase2.description}
              </p>
            </div>

            {/* Lower Area: Metadata Rail, Timing Note & Single Clear Action */}
            <div className="pt-8 border-t border-slate-800/90">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

                {/* Metadata Rails (Col span 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {data.phase2.metadata.map((meta, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800"
                      >
                        <span className="font-mono text-[11px] font-bold text-slate-400 tracking-wider uppercase block mb-1">
                          {meta.label}
                        </span>
                        <span className="font-mono text-caption font-bold text-slate-100 tracking-wide">
                          {meta.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="font-mono text-[11px] text-slate-400/90 leading-relaxed">
                    {data.phase2.timing_note}
                  </p>
                </div>

                {/* Single Primary Action & Qualification (Col span 5) */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right space-y-2.5">
                  <CtaLink href={data.phase2.cta.href} variant="primary">
                    {data.phase2.cta.label}
                  </CtaLink>
                  <p className="font-mono text-[11px] text-slate-400 max-w-sm leading-snug">
                    {data.phase2.qualification}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </motion.article>

        {/* =========================================================================
            SECONDARY HORIZON: PHASE III — Private AI Infrastructure (20–25% visual emphasis)
            Light Editorial Integration, Integrated into Family B Section Canvas
            ========================================================================= */}
        <motion.article
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="p-6 sm:p-8 rounded-2xl bg-brand-card border border-brand-border/80 relative"
          aria-labelledby={`${sectionId}-phase3-title`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left Column: Identifiers & Badges */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-brand-primary tracking-widest uppercase">
                  {data.phase3.label}
                </span>
                <span className="text-brand-border font-mono" aria-hidden="true">/</span>
                <span className="font-mono text-[11px] font-semibold text-brand-textSecondary tracking-widest uppercase">
                  {data.phase3.eyebrow}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary font-mono text-[11px] font-semibold tracking-wider uppercase select-none">
                <Sparkles className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                <span>{data.phase3.status}</span>
              </div>
            </div>

            {/* Right Column: Title, Description, and Availability Note (No Action CTA) */}
            <div className="lg:col-span-8 space-y-2.5">
              <h3
                id={`${sectionId}-phase3-title`}
                className="text-card-title font-bold text-brand-textPrimary tracking-tight"
              >
                {data.phase3.title}
              </h3>

              <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                {data.phase3.description}
              </p>

              <div className="pt-2">
                <p className="font-mono text-caption text-brand-textSecondary/80 tracking-wide">
                  {data.phase3.availability_note}
                </p>
              </div>
            </div>

          </div>
        </motion.article>

      </div>
    </section>
  );
}
