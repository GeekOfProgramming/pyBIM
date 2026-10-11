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

  const flexibleCap =
    data.center.capabilities.find((c) => c.id === "flexible_engineering") ||
    data.center.capabilities[0];
  const automationCap =
    data.center.capabilities.find((c) => c.id === "automation") ||
    data.center.capabilities[1];
  const qualityCap =
    data.center.capabilities.find((c) => c.id === "quality_review") ||
    data.center.capabilities[2];

  const FlexIcon = CAPABILITY_ICONS[flexibleCap?.id] || Users;
  const AutoIcon = CAPABILITY_ICONS[automationCap?.id] || Workflow;
  const QualIcon = CAPABILITY_ICONS[qualityCap?.id] || ShieldCheck;

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
            THREE-BLOCK DELIVERY FLOW: 3 / 6 / 3 Desktop Grid Ratio with Animated Ribbon Connectors
            1. LEFT: col-span-12 lg:col-span-3 (Project Input - Vertically aligned with Center Hub)
            2. CENTER: col-span-12 lg:col-span-6 (Four-Card pyBIM Architecture: Top Card, Center Hub, Two Lower Cards)
            3. RIGHT: col-span-12 lg:col-span-3 (Delivery Output - Vertically aligned with Center Hub)
            ========================================================================= */}
        <div
          role="region"
          aria-label={data.diagram_aria_label}
          className="relative"
        >
          {/* Desktop 12-Column Grid */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-start relative">

            {/* -----------------------------------------------------------------------
                COLUMN 1: LEFT — col-span-3 (Project Input)
                Positioned on central row (aligned with pyBIM Hub)
                ----------------------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col pt-36">
              <motion.article
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between rounded-2xl bg-brand-card/95 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-slate-300 dark:hover:ring-slate-700 min-h-[310px] relative group cursor-default"
                aria-labelledby={`${sectionId}-input-title`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-caption font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
                      {data.input.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                      <FileText className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  <h3
                    id={`${sectionId}-input-title`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1.5"
                  >
                    {data.input.title}
                  </h3>

                  <p className="font-mono text-caption font-semibold text-brand-primary tracking-wide mb-3">
                    {data.input.supporting}
                  </p>

                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                    {data.input.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-brand-textSecondary">
                  <span className="font-mono text-[11px] tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    Step 01
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] font-semibold text-brand-primary">
                    <span>To pyBIM</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </motion.article>
            </div>

            {/* -----------------------------------------------------------------------
                COLUMN 2: CENTER — col-span-6 (Four-Card Connected pyBIM Architecture)
                Stack:
                1. Top Card: Flexible Engineering Capacity
                   ↕ Vertical Ribbon Connector
                2. Center Hub: pyBIM Coordinated Delivery (Dominant)
                   ↕ Branched Ribbon Connector
                3. Bottom Cards: Purpose-Built Automation | Human-Led Quality Review
                ----------------------------------------------------------------------- */}
            <div className="lg:col-span-6 flex flex-col items-center relative">

              {/* TOP CARD: Flexible Engineering Capacity */}
              <motion.article
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg rounded-2xl bg-brand-card/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-brand-primary/40 text-center relative group cursor-default"
                aria-labelledby={`${sectionId}-flex-title`}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-[11px] font-bold tracking-wider mb-2 uppercase">
                  <span>{flexibleCap.tag}</span>
                </div>

                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <FlexIcon className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <h4
                    id={`${sectionId}-flex-title`}
                    className="text-body font-bold text-brand-textPrimary tracking-tight"
                  >
                    {flexibleCap.title}
                  </h4>
                </div>

                <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                  {flexibleCap.description}
                </p>
              </motion.article>

              {/* VERTICAL CONNECTOR: Top Card to Center Hub with Animated Ribbon */}
              <div className="w-full flex justify-center py-2 h-10 select-none relative" aria-hidden="true">
                <svg className="w-8 h-10 overflow-visible" viewBox="0 0 32 40">
                  <line x1="16" y1="0" x2="16" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-slate-700" strokeDasharray="3 3" />
                  {!shouldReduceMotion && (
                    <motion.line
                      x1="16"
                      y1="0"
                      x2="16"
                      y2="40"
                      stroke="#22D3EE"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0.15, 0.35, 0.55, 0.75],
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </svg>
              </div>

              {/* MAIN CENTER HUB: pyBIM Coordinated Delivery (Dominant) */}
              <div className="w-full relative">

                {/* HORIZONTAL CONNECTOR A (LEFT to CENTER) with Animated Traveling Ribbon */}
                <div
                  className="absolute -left-6 top-1/2 -translate-y-1/2 -translate-x-full w-6 h-8 pointer-events-none z-20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-6 h-8 overflow-visible" viewBox="0 0 24 32">
                    <line x1="0" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
                    <polygon points="22,12 28,16 22,20" fill="currentColor" className="text-brand-primary" />
                    {!shouldReduceMotion && (
                      <motion.circle
                        cx="0"
                        cy="16"
                        r="3.5"
                        fill="#22D3EE"
                        animate={{
                          cx: [0, 24],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          times: [0, 0.25],
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </svg>
                </div>

                {/* HORIZONTAL CONNECTOR B (CENTER to RIGHT) with Animated Traveling Ribbon */}
                <div
                  className="absolute -right-6 top-1/2 -translate-y-1/2 translate-x-full w-6 h-8 pointer-events-none z-20 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <svg className="w-6 h-8 overflow-visible" viewBox="0 0 24 32">
                    <line x1="0" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="2" className="text-slate-300 dark:text-slate-700" />
                    <polygon points="22,12 28,16 22,20" fill="currentColor" className="text-emerald-500" />
                    {!shouldReduceMotion && (
                      <motion.circle
                        cx="0"
                        cy="16"
                        r="3.5"
                        fill="#10B981"
                        animate={{
                          cx: [0, 24],
                          opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          times: [0.35, 0.6],
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </div>

                <motion.article
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="w-full flex flex-col justify-between rounded-2xl lg:rounded-3xl bg-brand-cardElevated border-2 border-brand-primary/50 bg-blue-50/25 dark:bg-blue-950/25 p-7 lg:p-8 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-1 hover:ring-brand-primary min-h-[310px] relative group cursor-default"
                  aria-labelledby={`${sectionId}-center-title`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                        <span className="font-mono text-caption font-bold text-brand-primary tracking-wider uppercase">
                          {data.center.label}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                        <Boxes className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    <h3
                      id={`${sectionId}-center-title`}
                      className="text-2xl lg:text-[26px] font-extrabold text-brand-textPrimary tracking-tight mb-2 leading-snug"
                    >
                      {data.center.title}
                    </h3>

                    <p className="font-mono text-caption font-semibold text-brand-primary tracking-wide mb-4">
                      {data.center.supporting}
                    </p>

                    <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                      {data.center.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-brand-border/70 flex items-center justify-between text-brand-textSecondary">
                    <span className="font-mono text-[11px] tracking-wider uppercase text-brand-textSecondary/80">
                      Step 02 · Execution & Review
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-brand-primary">
                      Engineering Core
                    </span>
                  </div>
                </motion.article>
              </div>

              {/* BRANCHED CONNECTOR: Center Hub to Lower Two Cards */}
              <div className="w-full flex justify-center py-2 h-10 select-none relative" aria-hidden="true">
                <svg className="w-full max-w-md h-10 overflow-visible" viewBox="0 0 200 40">
                  <path d="M 100,0 L 100,20 L 50,40 M 100,20 L 150,40" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300 dark:text-slate-700" strokeDasharray="3 3" />
                  {!shouldReduceMotion && (
                    <motion.path
                      d="M 100,0 L 100,20 L 50,40 M 100,20 L 150,40"
                      fill="none"
                      stroke="#22D3EE"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: [0, 1, 1, 0],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        times: [0.2, 0.4, 0.6, 0.8],
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </svg>
              </div>

              {/* LOWER CARDS (Side by side): Automation | Quality Review */}
              <div className="w-full grid grid-cols-2 gap-4">

                {/* Lower Card 1: Purpose-Built Automation */}
                <motion.article
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="rounded-xl bg-brand-card/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-cyan-500/30 text-left relative group cursor-default flex flex-col justify-between"
                  aria-labelledby={`${sectionId}-auto-title`}
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold tracking-wider mb-2 uppercase">
                      <span>{automationCap.tag}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <AutoIcon className="w-4 h-4 text-cyan-500 shrink-0" aria-hidden="true" />
                      <h4
                        id={`${sectionId}-auto-title`}
                        className="text-body-sm font-bold text-brand-textPrimary"
                      >
                        {automationCap.title}
                      </h4>
                    </div>

                    <p className="text-caption text-brand-textSecondary leading-relaxed">
                      {automationCap.description}
                    </p>
                  </div>
                </motion.article>

                {/* Lower Card 2: Human-Led Quality Review */}
                <motion.article
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.16 }}
                  className="rounded-xl bg-brand-card/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-emerald-500/30 text-left relative group cursor-default flex flex-col justify-between"
                  aria-labelledby={`${sectionId}-qual-title`}
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold tracking-wider mb-2 uppercase">
                      <span>{qualityCap.tag}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-1.5">
                      <QualIcon className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                      <h4
                        id={`${sectionId}-qual-title`}
                        className="text-body-sm font-bold text-brand-textPrimary"
                      >
                        {qualityCap.title}
                      </h4>
                    </div>

                    <p className="text-caption text-brand-textSecondary leading-relaxed">
                      {qualityCap.description}
                    </p>
                  </div>
                </motion.article>

              </div>

            </div>

            {/* -----------------------------------------------------------------------
                COLUMN 3: RIGHT — col-span-3 (Reviewed BIM Deliverables)
                Positioned on central row (aligned with pyBIM Hub)
                ----------------------------------------------------------------------- */}
            <div className="lg:col-span-3 flex flex-col pt-36">
              <motion.article
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-between rounded-2xl bg-brand-card/95 dark:bg-slate-900/70 border border-emerald-500/35 bg-emerald-50/15 dark:bg-emerald-950/15 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:ring-1 hover:ring-emerald-500/40 min-h-[310px] relative group cursor-default"
                aria-labelledby={`${sectionId}-output-title`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-caption font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                      {data.output.label}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>

                  <h3
                    id={`${sectionId}-output-title`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1.5"
                  >
                    {data.output.title}
                  </h3>

                  <p className="font-mono text-caption font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide mb-3">
                    {data.output.supporting}
                  </p>

                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                    {data.output.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-emerald-200/50 dark:border-emerald-900/40 flex items-center justify-between text-brand-textSecondary">
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
              MOBILE & TABLET STACK: Clean Vertical Order (Preserving All 4 Central Cards)
              ========================================================================= */}
          <div className="lg:hidden flex flex-col space-y-4">

            {/* M1: Project Input */}
            <div className="rounded-2xl bg-brand-card border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {data.input.label}
                </span>
                <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </div>
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1">
                {data.input.title}
              </h3>
              <p className="font-mono text-caption font-semibold text-brand-primary mb-2">
                {data.input.supporting}
              </p>
              <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                {data.input.description}
              </p>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-brand-primary" />
            </div>

            {/* M2: Four-Card pyBIM Subsystem Container */}
            <div className="rounded-2xl border-2 border-brand-primary/40 bg-brand-surface/40 p-4 sm:p-5 space-y-3">
              {/* Top Card: Flexible Engineering */}
              <div className="rounded-xl border border-brand-border/80 bg-brand-card p-4">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-brand-primary uppercase">
                    {flexibleCap.tag}
                  </span>
                  <FlexIcon className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                </div>
                <h4 className="text-body-sm font-bold text-brand-textPrimary mb-1">
                  {flexibleCap.title}
                </h4>
                <p className="text-caption text-brand-textSecondary leading-relaxed">
                  {flexibleCap.description}
                </p>
              </div>

              {/* pyBIM Hub Card */}
              <div className="rounded-xl border border-brand-primary/50 bg-brand-cardElevated p-5 shadow-sm text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary font-mono text-[11px] font-bold tracking-wider mb-2 uppercase">
                  <span>{data.center.label}</span>
                </div>
                <h3 className="text-card-title font-extrabold text-brand-textPrimary tracking-tight mb-1">
                  {data.center.title}
                </h3>
                <p className="font-mono text-caption text-brand-primary font-medium mb-2">
                  {data.center.supporting}
                </p>
                <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                  {data.center.description}
                </p>
              </div>

              {/* Lower Cards (stacked on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-brand-border/80 bg-brand-card p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                      {automationCap.tag}
                    </span>
                    <AutoIcon className="w-3.5 h-3.5 text-cyan-500" aria-hidden="true" />
                  </div>
                  <h4 className="text-body-sm font-bold text-brand-textPrimary mb-1">
                    {automationCap.title}
                  </h4>
                  <p className="text-caption text-brand-textSecondary leading-relaxed">
                    {automationCap.description}
                  </p>
                </div>

                <div className="rounded-xl border border-brand-border/80 bg-brand-card p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      {qualityCap.tag}
                    </span>
                    <QualIcon className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  </div>
                  <h4 className="text-body-sm font-bold text-brand-textPrimary mb-1">
                    {qualityCap.title}
                  </h4>
                  <p className="text-caption text-brand-textSecondary leading-relaxed">
                    {qualityCap.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Down Connector */}
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown className="w-4 h-4 text-emerald-500" />
            </div>

            {/* M3: Reviewed BIM Deliverables */}
            <div className="rounded-2xl border border-emerald-500/35 bg-emerald-50/15 dark:bg-emerald-950/15 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  {data.output.label}
                </span>
                <FileCheck2 className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              </div>
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1">
                {data.output.title}
              </h3>
              <p className="font-mono text-caption font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                {data.output.supporting}
              </p>
              <p className="text-body-sm text-brand-textSecondary leading-relaxed">
                {data.output.description}
              </p>
            </div>

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
