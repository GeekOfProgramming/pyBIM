"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Zap, Target, Layers, CheckCircle2, Clock, Shield, Terminal, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { servicesPageData } from "@/lib/data/servicesPageData";

export default function ServicesPageLayout() {
  const { language } = useLanguage();
  const t = servicesPageData[language] || servicesPageData.en;

  const getOutcomeIcon = (iconName) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-7 h-7 text-brand-primary" />;
      case "Target":
        return <Target className="w-7 h-7 text-brand-primary" />;
      case "Layers":
      default:
        return <Layers className="w-7 h-7 text-brand-primary" />;
    }
  };

  return (
    <div className="w-full bg-brand-base">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center py-28 md:py-36 px-6 overflow-hidden bg-brand-base">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_70%)]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            ISO 19650 & UNI 11337 ALGORITHMIC BIM
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-brand-textPrimary tracking-tight mb-8 leading-[1.1]">
            {t.hero.headline1} <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-500 to-cyan-400">
              {t.hero.headline2}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-brand-textSecondary max-w-4xl mx-auto font-medium leading-relaxed">
            {t.hero.subheadline}
          </p>
        </div>
      </section>

      {/* 2. THREE CARDS (THE pyBIM EXECUTION ROADMAP) */}
      <section id="roadmap" className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.roadmap.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.roadmap.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary mb-14 max-w-3xl font-medium leading-relaxed">
            {t.roadmap.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {t.roadmap.cards.map((card, idx) => {
              const isHighlight = card.isPrimary;
              return (
                <div
                  key={idx}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isHighlight
                      ? "bg-brand-card border-2 border-brand-primary shadow-xl shadow-brand-primary/10 ring-1 ring-brand-primary/30 md:-translate-y-2"
                      : "bg-brand-card border border-brand-border shadow-sm hover:shadow-md hover:border-brand-primary/40"
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute -top-3 right-6 bg-gradient-to-r from-brand-primary to-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      FEATURED OFFERING
                    </div>
                  )}

                  <div>
                    {/* Status Tag */}
                    <div className="mb-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                          isHighlight
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {card.statusTag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">
                      {card.title}
                    </h3>
                    
                    <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                      {card.description}
                    </p>

                    <div className="space-y-4 pt-6 border-t border-brand-border text-sm">
                      <div>
                        <span className="font-bold text-brand-textPrimary block mb-1">
                          The Outcome:
                        </span>
                        <span className="text-brand-textSecondary font-medium leading-relaxed">
                          {card.outcome}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-brand-textPrimary block mb-1">
                          The Execution:
                        </span>
                        <span className="text-brand-textSecondary font-medium leading-relaxed">
                          {card.execution}
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-brand-textPrimary block mb-1">
                          The Impact:
                        </span>
                        <span className="text-brand-textSecondary font-medium leading-relaxed">
                          {card.impact}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6">
                    {isHighlight ? (
                      <Link
                        href="/contact#audit"
                        className="w-full inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
                      >
                        Deploy Workload Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Link>
                    ) : (
                      <Link
                        href="/contact#priority-queue"
                        className="w-full inline-flex items-center justify-center border border-brand-border bg-brand-surface hover:bg-brand-card text-brand-textSecondary hover:text-brand-primary px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
                      >
                        Join Priority Queue <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA BANNER (GREEN BANNER // DEPLOYMENT QUEUE) */}
      <section className="py-20 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-teal-950/30 border-2 border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">
                    {t.ctaBanner.tag}
                  </span>
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold text-brand-textPrimary tracking-tight mb-4">
                  {t.ctaBanner.headline}
                </h3>

                <p className="text-base md:text-lg text-brand-textSecondary font-medium leading-relaxed mb-4">
                  {t.ctaBanner.subtitle}
                </p>

                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold tracking-wide">
                  {t.ctaBanner.microcopy}
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href={t.ctaBanner.buttonHref || "/contact"}
                  className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:-translate-y-1 hover:shadow-emerald-600/40"
                >
                  {t.ctaBanner.buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THREE TEXT BLOCKS (CORE AI CAPABILITIES) */}
      <section className="py-24 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.coreCapabilities.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.coreCapabilities.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary mb-12 max-w-3xl font-medium leading-relaxed">
            {t.coreCapabilities.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {t.coreCapabilities.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-brand-card border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-brand-textSecondary font-medium leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href={t.coreCapabilities.buttonHref || "/contact"}
              className="inline-flex items-center justify-center bg-brand-card border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm"
            >
              {t.coreCapabilities.buttonText}
            </Link>
            <span className="text-xs font-medium text-brand-textSecondary">
              {t.coreCapabilities.microcopy}
            </span>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP LIST (THE ALGORITHMIC PIPELINE) */}
      <section className="py-24 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.executionPipeline.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.executionPipeline.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary mb-14 max-w-3xl font-medium leading-relaxed">
            {t.executionPipeline.subtitle}
          </p>

          <div className="relative">
            <div className="space-y-10">
              {t.executionPipeline.steps.map((step, idx) => (
                <div key={idx} className="relative pl-16 md:pl-20 group">
                  {/* Connecting Line */}
                  {idx < t.executionPipeline.steps.length - 1 && (
                    <div className="absolute left-[23px] md:left-[27px] top-12 h-full w-[2px] bg-brand-primary/20 pointer-events-none" />
                  )}

                  {/* Step Number Badge */}
                  <div className="absolute left-0 top-0 z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-brand-primary/30 group-hover:border-brand-primary group-hover:shadow-[0_0_15px_rgba(37,99,235,0.25)] flex items-center justify-center font-bold text-sm md:text-base text-brand-primary transition-all duration-300 shadow-sm">
                    {step.num}
                  </div>

                  <div className="bg-brand-card border border-brand-border rounded-2xl p-6 shadow-sm group-hover:border-brand-primary/40 transition-all duration-300">
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-brand-textSecondary font-medium text-sm leading-relaxed max-w-4xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. THREE ICON COLUMNS (CORE ENGINEERING OUTCOMES) */}
      <section className="py-24 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.engineeringOutcomes.tag}
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {t.engineeringOutcomes.columns.map((col, idx) => (
              <div
                key={idx}
                className="group rounded-3xl bg-brand-card border border-brand-border p-8 shadow-sm hover:shadow-md hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    {getOutcomeIcon(col.icon)}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">
                    {col.title}
                  </h3>
                  <p className="text-brand-textSecondary font-medium leading-relaxed text-sm">
                    {col.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ARCHITECTURE FLOW (SYSTEMATIC EXECUTION ARCHITECTURE) */}
      <section className="py-24 md:py-32 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
            {t.executionArchitecture.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 tracking-tight">
            {t.executionArchitecture.headline}
          </h2>
          <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-3xl mx-auto mb-20 leading-relaxed">
            {t.executionArchitecture.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative text-left">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-brand-border z-0" />

            {t.executionArchitecture.nodes.map((node, idx) => (
              <div key={idx} className="relative flex flex-col items-center group text-center">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg z-10 text-xl font-bold mb-8 transition-all duration-300 ${
                    idx === 0
                      ? "bg-brand-card border-2 border-brand-border group-hover:border-brand-primary text-brand-textPrimary"
                      : idx === 1
                      ? "bg-brand-primary border-4 border-white dark:border-brand-surface text-white shadow-brand-primary/30 group-hover:scale-105"
                      : "bg-emerald-500 border-4 border-white dark:border-brand-surface text-white shadow-emerald-500/30 group-hover:scale-105"
                  }`}
                >
                  {node.num}
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-3">
                  {node.title}
                </h3>
                <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THREE COLUMNS (SCALABLE INTEGRATION PATHWAYS) */}
      <section className="py-24 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.integrationPathways.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.integrationPathways.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary max-w-3xl font-medium mb-16 leading-relaxed">
            {t.integrationPathways.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.integrationPathways.columns.map((col, idx) => (
              <div
                key={idx}
                className="bg-brand-card border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-brand-textPrimary mb-1">
                    {col.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-primary uppercase tracking-wider mb-6 font-semibold">
                    {col.subtitle}
                  </p>
                  <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                    {col.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. METRICS CARDS (SYSTEM BENCHMARKS) */}
      <section className="relative py-24 bg-brand-base overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.systemBenchmarks.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.systemBenchmarks.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary max-w-3xl font-medium mb-16 leading-relaxed">
            {t.systemBenchmarks.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.systemBenchmarks.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-left hover:border-brand-primary/50 transition-all font-mono shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-4 border-b border-brand-border pb-3">
                    {metric.tag}
                  </h4>
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Target:
                      </span>
                      <span className="text-brand-textPrimary font-medium">
                        {metric.target}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Manual:
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        {metric.manualLabor}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        pyBIM Exec:
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        {metric.pyBimExec}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3 pt-2 border-t border-brand-border/60">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Protocol:
                      </span>
                      <span className="text-brand-textSecondary leading-relaxed font-normal">
                        {metric.protocol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
