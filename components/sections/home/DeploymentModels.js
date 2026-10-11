"use client";

import { useId } from "react";
import LocalizedLink from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import {
  Users,
  Workflow,
  ShieldCheck,
  FileText,
  FileCheck2,
  Network,
  ArrowRight,
  ArrowDown
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

  const flexibleCap = data.capabilities.find((c) => c.id === "flexible_engineering") || data.capabilities[0];
  const automationCap = data.capabilities.find((c) => c.id === "automation") || data.capabilities[1];
  const qualityCap = data.capabilities.find((c) => c.id === "quality_review") || data.capabilities[2];

  const FlexIcon = CAPABILITY_ICONS[flexibleCap?.id] || Users;
  const AutoIcon = CAPABILITY_ICONS[automationCap?.id] || Workflow;
  const QualIcon = CAPABILITY_ICONS[qualityCap?.id] || ShieldCheck;

  return (
    <section
      id="deployment-models"
      className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary border-b border-brand-border overflow-hidden transition-colors"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Family A — Base Background */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* =========================================================================
            SECTION HEADER: Editorial Hierarchy (Inter + JetBrains Mono)
            ========================================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-20">

          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-widest uppercase mb-5 select-none shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>
              {data.eyebrow.split("pyBIM").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="normal-case">pyBIM</span>}
                </span>
              ))}
            </span>
          </div>

          {/* Semantic H2 Heading */}
          <h2
            id={`${sectionId}-heading`}
            className="text-section font-extrabold text-brand-textPrimary tracking-tight mb-5"
          >
            {data.heading_part1}{" "}
            <span className="text-brand-primary">{data.heading_part2}</span>
          </h2>

          {/* Editorial Description */}
          <p className="text-lead text-brand-textSecondary font-normal leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* =========================================================================
            DESKTOP & TABLET NETWORK DIAGRAM (Hidden on mobile <lg)
            Open Canvas: Input (Left) -> Central Hub with 3 Satellites -> Output (Right)
            ========================================================================= */}
        <div
          role="region"
          aria-label={data.diagram_aria_label}
          className="hidden lg:flex items-center justify-between gap-2 xl:gap-4 w-full"
        >
          {/* 1. LEFT INPUT NODE: Project Requirements (~24% width) */}
          <div className="w-[24%] xl:w-[23%] shrink-0">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-brand-border/90 bg-brand-card/90 backdrop-blur-sm p-6 shadow-sm hover:border-brand-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-caption font-bold text-brand-textSecondary tracking-wider uppercase">
                  {data.input.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border/70 flex items-center justify-center text-brand-textSecondary group-hover:text-brand-primary group-hover:border-brand-primary/40 transition-colors shrink-0">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1.5 leading-snug">
                {data.input.title}
              </h3>
              <p className="font-mono text-caption text-brand-textSecondary leading-relaxed">
                {data.input.subtitle}
              </p>
            </motion.div>
          </div>

          {/* Horizontal Connector: Input -> Central Hub (~5% width) */}
          <div
            className="flex-1 flex items-center justify-center min-w-[28px] max-w-[60px] select-none px-1"
            aria-hidden="true"
          >
            <div className="w-full h-px border-t border-dashed border-brand-border relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-brand-primary" />
            </div>
          </div>

          {/* 2. CENTER CORE: Delivery Hub & 3 Concurrent Capabilities (~46% width) */}
          <div className="w-[46%] xl:w-[48%] shrink-0 flex flex-col items-center">

            {/* Satellite 1: Flexible Engineering Capacity (Top) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="w-full rounded-2xl border border-brand-border/80 bg-brand-card/90 backdrop-blur-sm p-5 shadow-xs hover:border-brand-primary/40 transition-all group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-surface border border-brand-border/70 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-colors shrink-0 mt-0.5">
                  <FlexIcon className="w-4.5 h-4.5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-body-sm font-bold text-brand-textPrimary tracking-tight">
                      {flexibleCap.title}
                    </h4>
                    <span className="font-mono text-[11px] font-bold text-brand-primary tracking-wider uppercase px-2 py-0.5 rounded-md bg-brand-primary/10 border border-brand-primary/20 shrink-0">
                      {flexibleCap.tag}
                    </span>
                  </div>
                  <p className="text-caption text-brand-textSecondary leading-relaxed">
                    {flexibleCap.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vertical Connector: Top Capability -> Central Hub */}
            <div
              className="flex flex-col items-center justify-center h-7 select-none"
              aria-hidden="true"
            >
              <div className="h-full w-px border-l border-dashed border-brand-primary/50 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary" />
              </div>
            </div>

            {/* Central Delivery Hub (Primary Visual Anchor) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="w-full rounded-3xl border-2 border-brand-primary/40 bg-brand-cardElevated p-6 lg:p-7 shadow-xl shadow-brand-primary/5 text-center relative backdrop-blur-md"
            >
              {/* Hub Eyebrow Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary font-mono text-caption font-bold tracking-wider mb-3 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                <span>{data.hub.badge}</span>
              </div>

              {/* Hub Icon & Title */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-brand-actionPrimary text-brand-actionOnPrimary flex items-center justify-center shadow-sm">
                  <Network className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl lg:text-2xl font-extrabold text-brand-textPrimary tracking-tight">
                  {data.hub.title}
                </h3>
              </div>

              {/* Hub Subtitle */}
              <p className="font-mono text-caption text-brand-textSecondary">
                {data.hub.subtitle}
              </p>
            </motion.div>

            {/* Vertical Connector: Central Hub -> Bottom Capabilities */}
            <div
              className="flex flex-col items-center justify-center h-7 select-none"
              aria-hidden="true"
            >
              <div className="h-full w-px border-l border-dashed border-brand-primary/50 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary" />
              </div>
            </div>

            {/* Bottom Satellites: Automation (Left) & Quality Review (Right) */}
            <div className="w-full grid grid-cols-2 gap-3.5">

              {/* Satellite 2: Purpose-Built Automation */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="rounded-2xl border border-brand-border/80 bg-brand-card/90 backdrop-blur-sm p-4.5 shadow-xs hover:border-brand-primary/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-surface border border-brand-border/70 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary/10 transition-colors shrink-0">
                      <AutoIcon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-brand-primary tracking-wider uppercase px-2 py-0.5 rounded-md bg-brand-primary/10 border border-brand-primary/20 shrink-0">
                      {automationCap.tag}
                    </span>
                  </div>
                  <h4 className="text-body-sm font-bold text-brand-textPrimary tracking-tight mb-1 leading-snug">
                    {automationCap.title}
                  </h4>
                </div>
                <p className="text-caption text-brand-textSecondary leading-relaxed mt-1">
                  {automationCap.description}
                </p>
              </motion.div>

              {/* Satellite 3: Human-Led Quality Review */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="rounded-2xl border border-brand-border/80 bg-brand-card/90 backdrop-blur-sm p-4.5 shadow-xs hover:border-brand-primary/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-surface border border-brand-border/70 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors shrink-0">
                      <QualIcon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                      {qualityCap.tag}
                    </span>
                  </div>
                  <h4 className="text-body-sm font-bold text-brand-textPrimary tracking-tight mb-1 leading-snug">
                    {qualityCap.title}
                  </h4>
                </div>
                <p className="text-caption text-brand-textSecondary leading-relaxed mt-1">
                  {qualityCap.description}
                </p>
              </motion.div>

            </div>
          </div>

          {/* Horizontal Connector: Central Hub -> Output (~5% width) */}
          <div
            className="flex-1 flex items-center justify-center min-w-[28px] max-w-[60px] select-none px-1"
            aria-hidden="true"
          >
            <div className="w-full h-px border-t border-dashed border-emerald-500/50 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 border-t-2 border-r-2 border-emerald-600 dark:border-emerald-400" />
            </div>
          </div>

          {/* 3. RIGHT OUTPUT NODE: Reviewed BIM Deliverables (~24% width) */}
          <div className="w-[24%] xl:w-[23%] shrink-0">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] dark:bg-emerald-950/20 backdrop-blur-sm p-6 shadow-sm hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-caption font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
                  {data.output.tag}
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FileCheck2 className="w-5 h-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-1.5 leading-snug">
                {data.output.title}
              </h3>
              <p className="font-mono text-caption text-brand-textSecondary leading-relaxed">
                {data.output.subtitle}
              </p>
            </motion.div>
          </div>

        </div>

        {/* =========================================================================
            MOBILE DEDICATED LINEAR NETWORK (lg:hidden)
            Clear step-by-step interpretation with vertical precision connectors
            ========================================================================= */}
        <div
          role="region"
          aria-label={data.diagram_aria_label}
          className="lg:hidden flex flex-col items-stretch max-w-xl mx-auto space-y-3"
        >
          {/* M1. Input Node */}
          <div className="rounded-2xl border border-brand-border/90 bg-brand-card/90 p-5 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="font-mono text-[11px] font-bold text-brand-textSecondary tracking-wider uppercase">
                {data.input.tag}
              </span>
              <div className="w-8 h-8 rounded-lg bg-brand-surface border border-brand-border/70 flex items-center justify-center text-brand-primary shrink-0">
                <FileText className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <h3 className="text-body font-bold text-brand-textPrimary tracking-tight mb-1">
              {data.input.title}
            </h3>
            <p className="font-mono text-caption text-brand-textSecondary">
              {data.input.subtitle}
            </p>
          </div>

          {/* M Connector Down */}
          <div className="flex justify-center select-none py-0.5" aria-hidden="true">
            <div className="h-6 w-px border-l border-dashed border-brand-border relative">
              <ArrowDown className="w-3.5 h-3.5 text-brand-primary absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* M2. Central Delivery Hub */}
          <div className="rounded-2xl border-2 border-brand-primary/40 bg-brand-cardElevated p-6 shadow-md text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary font-mono text-[11px] font-bold tracking-wider mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>{data.hub.badge}</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 mb-1.5">
              <Network className="w-5 h-5 text-brand-primary" aria-hidden="true" />
              <h3 className="text-card-title font-extrabold text-brand-textPrimary tracking-tight">
                {data.hub.title}
              </h3>
            </div>
            <p className="font-mono text-caption text-brand-textSecondary">
              {data.hub.subtitle}
            </p>
          </div>

          {/* M Connector Down */}
          <div className="flex justify-center select-none py-0.5" aria-hidden="true">
            <div className="h-6 w-px border-l border-dashed border-brand-border relative">
              <ArrowDown className="w-3.5 h-3.5 text-brand-primary absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* M3. Three Concurrent Supporting Capabilities */}
          <div className="rounded-2xl border border-brand-border/80 bg-brand-surface/60 p-4 space-y-3">
            <div className="text-center pb-2 border-b border-brand-border/60">
              <span className="font-mono text-[11px] font-bold text-brand-textSecondary uppercase tracking-wider">
                {data.capabilities_heading}
              </span>
            </div>

            {/* M Cap 1: Flexible Engineering */}
            <div className="rounded-xl border border-brand-border/70 bg-brand-card p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <FlexIcon className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <h4 className="text-body-sm font-bold text-brand-textPrimary">
                    {flexibleCap.title}
                  </h4>
                </div>
                <span className="font-mono text-[10px] font-bold text-brand-primary uppercase px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20 shrink-0">
                  {flexibleCap.tag}
                </span>
              </div>
              <p className="text-caption text-brand-textSecondary leading-relaxed">
                {flexibleCap.description}
              </p>
            </div>

            {/* M Cap 2: Automation */}
            <div className="rounded-xl border border-brand-border/70 bg-brand-card p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <AutoIcon className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <h4 className="text-body-sm font-bold text-brand-textPrimary">
                    {automationCap.title}
                  </h4>
                </div>
                <span className="font-mono text-[10px] font-bold text-brand-primary uppercase px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20 shrink-0">
                  {automationCap.tag}
                </span>
              </div>
              <p className="text-caption text-brand-textSecondary leading-relaxed">
                {automationCap.description}
              </p>
            </div>

            {/* M Cap 3: Quality Review */}
            <div className="rounded-xl border border-brand-border/70 bg-brand-card p-4">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <QualIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  <h4 className="text-body-sm font-bold text-brand-textPrimary">
                    {qualityCap.title}
                  </h4>
                </div>
                <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                  {qualityCap.tag}
                </span>
              </div>
              <p className="text-caption text-brand-textSecondary leading-relaxed">
                {qualityCap.description}
              </p>
            </div>
          </div>

          {/* M Connector Down */}
          <div className="flex justify-center select-none py-0.5" aria-hidden="true">
            <div className="h-6 w-px border-l border-dashed border-emerald-500/50 relative">
              <ArrowDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>
          </div>

          {/* M4. Output Node */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] dark:bg-emerald-950/20 p-5 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
                {data.output.tag}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <FileCheck2 className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <h3 className="text-body font-bold text-brand-textPrimary tracking-tight mb-1">
              {data.output.title}
            </h3>
            <p className="font-mono text-caption text-brand-textSecondary">
              {data.output.subtitle}
            </p>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM STRATEGY BAR: Supporting Statement & Single Contextual CTA
            ========================================================================= */}
        <div className="mt-14 lg:mt-16 pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-caption text-brand-textSecondary tracking-wide">
            {data.supporting_statement}
          </p>

          <LocalizedLink
            href={data.cta.href}
            className="group inline-flex items-center gap-2 text-body-sm font-semibold text-brand-primary hover:text-brand-primaryHover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg py-1 px-2 -mx-2 cursor-pointer"
          >
            <span>{data.cta.label}</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 shrink-0"
              aria-hidden="true"
            />
          </LocalizedLink>
        </div>

      </div>
    </section>
  );
}
