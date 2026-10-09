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

export default function ServicesExecutionRoadmap({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Fallback defaults if data is missing
  const roadmap = data || {
    tag: "OUR EXECUTION ROADMAP",
    headline: "Engineering Delivery Today. Intelligent Infrastructure Tomorrow.",
    subtitle: "pyBIM combines practical BIM engineering services with a phased technology roadmap — from hands-on project delivery to connected automation and private AI infrastructure.",
    labels: {
      outcome: "The Outcome",
      execution: "The Execution",
      impact: "The Impact",
      featuredOffering: "FEATURED OFFERING",
      currentOffering: "CURRENT OFFERING",
      softwareRoadmap: "SOFTWARE ROADMAP",
      enterpriseRoadmap: "ENTERPRISE ROADMAP",
      progressHeading: "Indicative Development Progress",
      progressNote: "Estimates subject to phased engineering scope"
    },
    cards: []
  };

  const labels = roadmap.labels || {
    outcome: "The Outcome",
    execution: "The Execution",
    impact: "The Impact",
    featuredOffering: "FEATURED OFFERING",
    currentOffering: "CURRENT OFFERING",
    softwareRoadmap: "SOFTWARE ROADMAP",
    enterpriseRoadmap: "ENTERPRISE ROADMAP",
    progressHeading: "Indicative Development Progress",
    progressNote: "Estimates subject to phased engineering scope"
  };

  const cards = roadmap.cards || [];

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
      {/* ========================================================================= */}
      {/* ARCHITECTURAL BACKGROUND: Technical Coordinate Grid & Directional Glow   */}
      {/* ========================================================================= */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 text-slate-800 dark:text-blue-200"
        style={{
          maskImage: "radial-gradient(ellipse 80% 65% at 50% 30%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 50% 30%, black 20%, transparent 80%)",
        }}
        aria-hidden="true"
      >
        <svg className="w-full h-full opacity-[0.035] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roadmap-tech-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.6" />
              <circle cx="64" cy="64" r="1.5" fill="currentColor" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roadmap-tech-grid)" />
        </svg>
      </div>

      {/* Atmospheric Multi-Point Lighting */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[380px] bg-gradient-to-b from-blue-500/[0.08] via-cyan-500/[0.04] to-transparent dark:from-blue-500/[0.14] dark:via-cyan-500/[0.06] dark:to-transparent rounded-full blur-[110px] z-0" 
        aria-hidden="true" 
      />

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
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {roadmap.tag}
            </span>
          </div>

          <h2 
            id={`${baseId}-headline`}
            className="text-section-sm sm:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {roadmap.headline}
          </h2>

          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed">
            {roadmap.subtitle}
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* THREE ALIGNED ROADMAP INFORMATION LANES (Clean, Non-Duplicated Cards)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
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
                className={`group rounded-3xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  isHighlight
                    ? "bg-brand-card border-2 border-brand-primary shadow-lg shadow-brand-primary/10 ring-1 ring-brand-primary/20"
                    : "bg-brand-card/90 border border-brand-border/90 shadow-sm hover:border-brand-primary/40 hover:shadow-md"
                }`}
              >
                {/* Featured Badge for Phase 01 */}
                {isHighlight && (
                  <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-brand-primary to-blue-600 text-white text-technical font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-brand-primary/20 flex items-center gap-1.5 z-10 pointer-events-none">
                    <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
                    <span>{labels.featuredOffering || "FEATURED OFFERING"}</span>
                  </div>
                )}

                {/* Top Section */}
                <div className="flex flex-col flex-grow">
                  
                  {/* Row 1: Header / Category & Status Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
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

                      <div>
                        <span className="block text-technical font-mono font-bold uppercase tracking-widest text-brand-primary">
                          {card.phase || `PHASE 0${idx + 1}`}
                        </span>
                        <span className="text-technical font-mono text-brand-textSecondary uppercase block">
                          {idx === 0 
                            ? (labels.currentOffering || "CURRENT OFFERING") 
                            : idx === 1 
                            ? (labels.softwareRoadmap || "SOFTWARE ROADMAP") 
                            : (labels.enterpriseRoadmap || "ENTERPRISE ROADMAP")}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-technical font-mono font-bold uppercase tracking-wider shrink-0 ${
                        isAvailable
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : idx === 1
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/25"
                          : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25"
                      }`}
                    >
                      {isAvailable ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      <span>{card.statusTag}</span>
                    </span>
                  </div>

                  {/* Row 2: Single Phase Title (H3) */}
                  <h3 
                    id={`${baseId}-card-title-${idx}`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-3 min-h-[1.75rem]"
                  >
                    {card.title}
                  </h3>
                  
                  {/* Row 3: Description */}
                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* Row 4: Owner-Defined Indicative Progress Bar */}
                  <div className="mb-6 p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-technical font-mono font-semibold uppercase tracking-wider text-brand-textSecondary">
                        {labels.progressHeading || "Indicative Development Progress"}
                      </span>
                      <span className={`text-technical font-mono font-bold ${progressStyle.text}`}>
                        {progress}%
                      </span>
                    </div>

                    {/* Accessible Progress Bar */}
                    <div 
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${card.title} - ${labels.progressHeading || "Development progress"}: ${progress}%`}
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

                    {labels.progressNote && (
                      <p className="text-technical text-brand-textSecondary/80 mt-2 font-mono">
                        * {labels.progressNote}
                      </p>
                    )}
                  </div>

                  {/* Row 5: Horizontal Divider */}
                  <div className="border-t border-brand-border/70 w-full mb-6" aria-hidden="true" />

                  {/* Rows 6, 7, 8: Outcome, Execution, Impact Detailed Ledger */}
                  <div className="space-y-4 mb-8">
                    
                    {/* Outcome Block */}
                    <div className="text-body-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.outcome}:
                        </span>
                      </div>
                      <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5">
                        {card.outcome}
                      </p>
                    </div>

                    {/* Execution Block */}
                    <div className="text-body-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Terminal className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.execution}:
                        </span>
                      </div>
                      <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5">
                        {card.execution}
                      </p>
                    </div>

                    {/* Impact Block */}
                    <div className="text-body-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.impact}:
                        </span>
                      </div>
                      <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed pl-5.5">
                        {card.impact}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Bottom Baseline CTA Button */}
                <div className="pt-5 border-t border-brand-border/60 w-full mt-auto">
                  <CtaLink
                    href={card.ctaHref || (isHighlight ? "/contact#audit" : "/contact#priority-queue")}
                    variant={isHighlight ? "primary" : "secondary"}
                    fullWidth={true}
                  >
                    {card.ctaText || (isHighlight ? "Discuss Your Project" : "Join Priority Queue")}
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
