"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  Boxes, 
  CloudCog, 
  Server, 
  Target, 
  Terminal, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { servicesPageData } from "@/lib/data/servicesPageData";

export default function ServicesExecutionRoadmap({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Reuse canonical English roadmap data as fallback if data is missing
  const fallbackRoadmap = servicesPageData.en.roadmap;
  const roadmap = data || fallbackRoadmap;
  const labels = roadmap.labels || fallbackRoadmap.labels;
  const cards = roadmap.cards || fallbackRoadmap.cards;

  const getPhaseIcon = (index) => {
    switch (index) {
      case 0:
        return <Boxes className="w-5 h-5 text-brand-primary" aria-hidden="true" />;
      case 1:
        return <CloudCog className="w-5 h-5 text-sky-500 dark:text-sky-400" aria-hidden="true" />;
      case 2:
      default:
        return <Server className="w-5 h-5 text-cyan-500 dark:text-cyan-400" aria-hidden="true" />;
    }
  };

  const getProgressBarStyles = (index) => {
    switch (index) {
      case 0:
        return {
          bar: "bg-emerald-500 dark:bg-emerald-400",
          track: "bg-emerald-500/15 dark:bg-emerald-500/20",
          text: "text-emerald-600 dark:text-emerald-400"
        };
      case 1:
        return {
          bar: "bg-brand-primary dark:bg-blue-500",
          track: "bg-brand-primary/15 dark:bg-brand-primary/20",
          text: "text-brand-primary dark:text-blue-400"
        };
      case 2:
      default:
        return {
          bar: "bg-cyan-500 dark:bg-cyan-400",
          track: "bg-cyan-500/15 dark:bg-cyan-500/20",
          text: "text-cyan-600 dark:text-cyan-400"
        };
    }
  };

  return (
    <section 
      id="roadmap" 
      className="scroll-mt-28 relative py-20 md:py-28 lg:py-32 bg-brand-surface border-y border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-headline`}
    >
      {/* Family B (Surface) Architectural Background */}
      <EngineeringBackdrop variant="surface" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION INTRODUCTION (Editorial Heading & Description)                    */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 md:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-wider uppercase">
              {roadmap.tag}
            </span>
          </div>

          <h2 
            id={`${baseId}-headline`}
            className="text-3xl sm:text-[34px] lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-[1.2] sm:leading-[1.2] lg:leading-[1.2]"
          >
            {roadmap.headline}
          </h2>

          <p className="text-[17px] sm:text-lead text-brand-textSecondary font-medium leading-relaxed">
            {roadmap.subtitle}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* THREE ALIGNED ROADMAP INFORMATION LANES (Shared-Row Subgrid Comparison)   */}
        {/* Stacked up to lg (1024px) to avoid narrow columns; 3-col subgrid at xl+  */}
        {/* ========================================================================= */}
        <div
          role="region"
          aria-label={labels.timelineAriaLabel || fallbackRoadmap.labels.timelineAriaLabel}
          className="grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-[repeat(10,auto)] gap-8 xl:gap-x-8 xl:gap-y-5 items-stretch"
        >
          {cards.map((card, idx) => {
            const isHighlight = Boolean(card.isPrimary);
            const isAvailable = isHighlight;
            const progress = typeof card.progressPercent === "number" ? card.progressPercent : (idx === 0 ? 100 : idx === 1 ? 70 : 30);
            const progressStyle = getProgressBarStyles(idx);

            return (
              <motion.article
                key={idx}
                id={`${baseId}-card-${idx}`}
                aria-labelledby={`${baseId}-card-title-${idx}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group rounded-3xl p-6 sm:p-7 xl:p-8 flex flex-col xl:grid xl:grid-rows-subgrid xl:row-span-10 gap-5 xl:gap-0 transition-all duration-200 relative min-w-0 ${
                  isHighlight
                    ? "bg-brand-cardElevated border-2 border-brand-primary shadow-lg shadow-brand-primary/10 ring-1 ring-brand-primary/20"
                    : "bg-brand-cardElevated border border-brand-border/90 shadow-sm hover:border-brand-primary/40 hover:shadow-md"
                }`}
              >
                {/* Featured Badge for Phase I */}
                {isHighlight && (
                  <div className="absolute -top-3.5 right-5 sm:right-6 max-w-[calc(100%-2.5rem)] bg-gradient-to-r from-brand-primary to-blue-600 text-white text-technical font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-brand-primary/20 flex items-center gap-1.5 z-10 pointer-events-none">
                    <Sparkles className="w-3 h-3 text-white shrink-0" aria-hidden="true" />
                    <span className="truncate">{labels.featuredOffering || fallbackRoadmap.labels.featuredOffering}</span>
                  </div>
                )}

                {/* Row 1: Phase Icon, Identifier & Category */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isHighlight
                        ? "bg-brand-primary/10 border border-brand-primary/25"
                        : idx === 1
                        ? "bg-sky-500/10 border border-sky-500/25"
                        : "bg-cyan-500/10 border border-cyan-500/25"
                    }`}
                    aria-hidden="true"
                  >
                    {getPhaseIcon(idx)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-technical font-mono font-bold uppercase tracking-widest text-brand-primary">
                      {card.phase || fallbackRoadmap.cards[idx]?.phase}
                    </span>
                    <span className="block text-technical font-mono text-brand-textSecondary uppercase leading-snug break-words">
                      {idx === 0
                        ? (labels.currentOffering || fallbackRoadmap.labels.currentOffering)
                        : idx === 1
                        ? (labels.softwareRoadmap || fallbackRoadmap.labels.softwareRoadmap)
                        : (labels.enterpriseRoadmap || fallbackRoadmap.labels.enterpriseRoadmap)}
                    </span>
                  </div>
                </div>

                {/* Row 2: Independent Status Badge Row */}
                <div className="flex items-start min-w-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-technical font-mono font-bold uppercase tracking-wider max-w-full ${
                      isAvailable
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : idx === 1
                        ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/25"
                        : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25"
                    }`}
                  >
                    {isAvailable ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    )}
                    <span className="break-words">{card.statusTag}</span>
                  </span>
                </div>

                {/* Row 3: Single Phase Title (H3) */}
                <h3 
                  id={`${baseId}-card-title-${idx}`}
                  className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary tracking-tight leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] min-w-0 break-words"
                >
                  {card.title}
                </h3>
                
                {/* Row 4: Description */}
                <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed min-w-0 break-words">
                  {card.description}
                </p>

                {/* Row 5: Phase-Specific Commercial Availability / Progress Panel */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-surface/60 border border-brand-border/60 flex flex-col justify-between gap-2.5 min-w-0">
                  {idx === 0 ? (
                    <>
                      <span className="text-technical font-mono font-semibold uppercase tracking-wider text-brand-textSecondary">
                        {labels.availabilityHeading || fallbackRoadmap.labels.availabilityHeading}
                      </span>
                      <div className="flex items-center gap-2 text-body-sm font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{labels.availabilityValue || fallbackRoadmap.labels.availabilityValue}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-technical font-mono font-semibold uppercase tracking-wider text-brand-textSecondary min-w-0">
                            {idx === 1
                              ? (labels.progressHeading || fallbackRoadmap.labels.progressHeading)
                              : (labels.sharedProgressHeading || fallbackRoadmap.labels.sharedProgressHeading)}
                          </span>
                          <span className={`text-technical font-mono font-bold shrink-0 ${progressStyle.text}`}>
                            {progress}%
                          </span>
                        </div>

                        {/* Accessible Progress Bar */}
                        <div
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${card.title} - ${
                            idx === 1
                              ? (labels.progressHeading || fallbackRoadmap.labels.progressHeading)
                              : (labels.sharedProgressHeading || fallbackRoadmap.labels.sharedProgressHeading)
                          }: ${progress}%`}
                          className={`w-full h-2 rounded-full overflow-hidden ${progressStyle.track}`}
                        >
                          <motion.div
                            className={`h-full rounded-full ${progressStyle.bar}`}
                            initial={{ width: shouldReduceMotion ? `${progress}%` : "0%" }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                              duration: shouldReduceMotion ? 0 : 0.85,
                              delay: shouldReduceMotion ? 0 : 0.2 + idx * 0.1,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                          />
                        </div>
                      </div>

                      {idx === 1 ? (
                        <div className="pt-2 border-t border-brand-border/50 space-y-1 text-technical font-mono">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                            <span className="text-brand-textSecondary uppercase">
                              {labels.targetReleaseLabel || fallbackRoadmap.labels.targetReleaseLabel}
                            </span>
                            <span className="font-bold text-brand-textPrimary">
                              {labels.targetReleaseValue || fallbackRoadmap.labels.targetReleaseValue}
                            </span>
                          </div>
                          <p className="text-brand-textSecondary/80 leading-relaxed">
                            {labels.targetReleaseNote || fallbackRoadmap.labels.targetReleaseNote}
                          </p>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-brand-border/50 space-y-1.5 text-technical font-mono">
                          <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                            <span className="text-brand-textSecondary uppercase">
                              {labels.noReleaseLabel || fallbackRoadmap.labels.noReleaseLabel}
                            </span>
                            <span className="font-bold text-brand-textPrimary">
                              {labels.noReleaseValue || fallbackRoadmap.labels.noReleaseValue}
                            </span>
                          </div>
                          {labels.progressNote && (
                            <p className="text-brand-textSecondary/80 leading-relaxed">
                              {labels.progressNote}
                            </p>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Row 6: Horizontal Divider */}
                <div className="border-t border-brand-border/70 w-full my-auto" aria-hidden="true" />

                {/* Row 7: Outcome Block */}
                <div className="text-body-sm min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                    <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                      {labels.outcome}:
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5 break-words">
                    {card.outcome}
                  </p>
                </div>

                {/* Row 8: Execution Block */}
                <div className="text-body-sm min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Terminal className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                    <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                      {labels.execution}:
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5 break-words">
                    {card.execution}
                  </p>
                </div>

                {/* Row 9: Impact Block */}
                <div className="text-body-sm min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                    <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                      {labels.impact}:
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5 break-words">
                    {card.impact}
                  </p>
                </div>

                {/* Row 10: Bottom Baseline CTA Button */}
                <div className="pt-5 border-t border-brand-border/60 w-full mt-auto">
                  <CtaLink
                    href={card.ctaHref || fallbackRoadmap.cards[idx]?.ctaHref || (isHighlight ? "/contact#audit" : "/contact#priority-queue")}
                    variant={isHighlight ? "primary" : "secondary"}
                    fullWidth={true}
                  >
                    {card.ctaText || fallbackRoadmap.cards[idx]?.ctaText}
                  </CtaLink>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
