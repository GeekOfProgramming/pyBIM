"use client";

import { useState, useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { 
  ArrowRight, 
  Boxes, 
  CloudCog, 
  Server, 
  Target, 
  Terminal, 
  Zap, 
  Sparkles 
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesExecutionRoadmap({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
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
      timelineAriaLabel: "Roadmap progression phases"
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
    timelineAriaLabel: "Roadmap progression phases"
  };

  const cards = roadmap.cards || [];

  const getPhaseIcon = (index) => {
    switch (index) {
      case 0:
        return <Boxes className="w-5 h-5 lg:w-6 lg:h-6 text-brand-primary" />;
      case 1:
        return <CloudCog className="w-5 h-5 lg:w-6 lg:h-6 text-sky-500 dark:text-sky-400" />;
      case 2:
      default:
        return <Server className="w-5 h-5 lg:w-6 lg:h-6 text-teal-500 dark:text-teal-400" />;
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % cards.length;
      setActivePhaseIndex(next);
      document.getElementById(`${baseId}-node-${next}`)?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + cards.length) % cards.length;
      setActivePhaseIndex(prev);
      document.getElementById(`${baseId}-node-${prev}`)?.focus();
    }
  };

  return (
    <section 
      id="roadmap" 
      className="relative py-24 md:py-32 bg-brand-surface border-y border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-headline`}
    >
      {/* Subtle ambient background glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-xs md:text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {roadmap.tag}
            </span>
          </div>
          <h2 
            id={`${baseId}-headline`}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {roadmap.headline}
          </h2>
          <p className="text-base sm:text-lg text-brand-textSecondary font-medium leading-relaxed">
            {roadmap.subtitle}
          </p>
        </motion.div>

        {/* Desktop & Tablet Interactive Roadmap Progression Timeline */}
        <div className="hidden md:block mb-12">
          <div 
            className="relative"
            role="tablist"
            aria-label={labels.timelineAriaLabel || "Roadmap progression phases"}
          >
            {/* Horizontal Track Line */}
            <div 
              className="absolute top-6 left-[16.6%] right-[16.6%] h-[2px] bg-brand-border pointer-events-none"
              aria-hidden="true"
            >
              {/* Subtle animated blue pulse along the track */}
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                  animate={{
                    left: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>

            {/* Three Technical Milestone Nodes */}
            <div className="grid grid-cols-3 gap-5 lg:gap-8">
              {cards.map((card, idx) => {
                const isSelected = activePhaseIndex === idx;
                const isAvailable = card.isPrimary || card.statusTag === "AVAILABLE NOW" || card.statusTag === "DISPONIBILE ORA" || card.statusTag === "JETZT VERFÜGBAR";

                return (
                  <button
                    key={idx}
                    id={`${baseId}-node-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`${baseId}-card-${idx}`}
                    aria-label={`${card.phase || `Phase 0${idx + 1}`}: ${card.title}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActivePhaseIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="group relative flex flex-col items-center text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl p-2 transition-all duration-200"
                  >
                    {/* Node Circle */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 relative z-10 ${
                        isSelected
                          ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/30 ring-4 ring-brand-primary/20 scale-110"
                          : isAvailable
                          ? "bg-brand-card text-brand-primary border-2 border-brand-primary/50 group-hover:border-brand-primary group-hover:scale-105"
                          : "bg-brand-card text-brand-textSecondary border border-brand-border group-hover:border-brand-primary/40 group-hover:text-brand-textPrimary"
                      }`}
                    >
                      {card.num || `0${idx + 1}`}
                      
                      {/* Active indicator dot */}
                      {isAvailable && (
                        <span 
                          className={`absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-brand-surface ring-1 ring-emerald-500/40 ${
                            !shouldReduceMotion ? "animate-pulse" : ""
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Node Meta Label */}
                    <div className="mt-3">
                      <span className={`block text-[11px] font-mono uppercase tracking-widest transition-colors ${
                        isSelected 
                          ? "text-brand-primary font-bold" 
                          : "text-brand-textSecondary group-hover:text-brand-textPrimary font-semibold"
                      }`}>
                        {card.phase || `PHASE 0${idx + 1}`}
                      </span>
                      <span className={`block text-xs font-bold tracking-tight transition-colors line-clamp-1 ${
                        isSelected ? "text-brand-textPrimary" : "text-brand-textSecondary"
                      }`}>
                        {card.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Three Phase Cards Grid (Aligned with Tablet md:grid-cols-3 and Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 items-stretch">
          {cards.map((card, idx) => {
            const isHighlight = card.isPrimary;
            const isSelected = activePhaseIndex === idx;
            const isAvailable = card.isPrimary || card.statusTag === "AVAILABLE NOW" || card.statusTag === "DISPONIBILE ORA" || card.statusTag === "JETZT VERFÜGBAR";

            return (
              <motion.article
                key={idx}
                id={`${baseId}-card-${idx}`}
                aria-labelledby={`${baseId}-card-title-${idx}`}
                tabIndex={0}
                onMouseEnter={() => setActivePhaseIndex(idx)}
                onFocus={() => setActivePhaseIndex(idx)}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className={`group rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                  isHighlight
                    ? "bg-brand-card border-2 border-brand-primary shadow-xl shadow-brand-primary/10 ring-1 ring-brand-primary/30"
                    : isSelected
                    ? "bg-brand-card border-2 border-brand-primary/60 shadow-lg shadow-brand-primary/5"
                    : "bg-brand-card border border-brand-border shadow-sm hover:shadow-md hover:border-brand-primary/40"
                }`}
              >
                {/* Featured Badge for Phase 01 */}
                {isHighlight && (
                  <div className="absolute -top-3.5 right-5 sm:right-6 bg-gradient-to-r from-brand-primary to-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md shadow-brand-primary/20 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-white" aria-hidden="true" />
                    <span>{labels.featuredOffering || "FEATURED OFFERING"}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Phase Identifier, Icon & Status Badge */}
                  <div className="flex items-center justify-between gap-2 sm:gap-3 mb-6">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div 
                        className={`w-10 h-10 lg:w-11 lg:h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                          isHighlight 
                            ? "bg-brand-primary/10 border border-brand-primary/20" 
                            : idx === 1
                            ? "bg-sky-500/10 border border-sky-500/20"
                            : "bg-teal-500/10 border border-teal-500/20"
                        }`}
                        aria-hidden="true"
                      >
                        {getPhaseIcon(idx)}
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono font-bold uppercase tracking-widest text-brand-primary">
                          {card.phase || `PHASE 0${idx + 1}`}
                        </span>
                        <span className="text-[10px] font-mono text-brand-textSecondary uppercase">
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
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                        isAvailable
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                          : idx === 1
                          ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                          : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"
                      }`}
                    >
                      {isAvailable && (
                        <span 
                          className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${!shouldReduceMotion ? "animate-pulse" : ""}`} 
                          aria-hidden="true" 
                        />
                      )}
                      {card.statusTag}
                    </span>
                  </div>

                  {/* Title & Concise Description */}
                  <h3 
                    id={`${baseId}-card-title-${idx}`}
                    className="text-xl sm:text-2xl font-bold text-brand-textPrimary tracking-tight mb-3"
                  >
                    {card.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {card.description}
                  </p>

                  {/* 3 Structured Information Blocks: Outcome, Execution, Impact */}
                  <div className="space-y-4 pt-6 border-t border-brand-border text-sm">
                    {/* The Outcome */}
                    <div className="group/item">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Target className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.outcome}:
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-textSecondary font-medium leading-relaxed pl-5">
                        {card.outcome}
                      </p>
                    </div>

                    {/* The Execution */}
                    <div className="group/item">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Terminal className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.execution}:
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-textSecondary font-medium leading-relaxed pl-5">
                        {card.execution}
                      </p>
                    </div>

                    {/* The Impact */}
                    <div className="group/item">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                          {labels.impact}:
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-textSecondary font-medium leading-relaxed pl-5">
                        {card.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-6 border-t border-brand-border/60">
                  {isHighlight ? (
                    <Link
                      href={card.ctaHref || "/contact#audit"}
                      className="w-full inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white px-5 sm:px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/35 group/cta"
                    >
                      <span>{card.ctaText || "Discuss Your Project"}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
                    </Link>
                  ) : (
                    <Link
                      href={card.ctaHref || "/contact#priority-queue"}
                      className="w-full inline-flex items-center justify-center border border-brand-border bg-brand-surface hover:bg-brand-card hover:border-brand-primary/40 text-brand-textSecondary hover:text-brand-primary px-5 sm:px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 group/cta"
                    >
                      <span>{card.ctaText || "Join Priority Queue"}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover/cta:translate-x-1" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
