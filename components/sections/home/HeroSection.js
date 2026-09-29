"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function HeroSection() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).hero;

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 lg:px-8 w-full bg-white dark:bg-brand-base text-gray-900 dark:text-white overflow-hidden border-b border-gray-200 dark:border-slate-800 transition-colors">
      {/* Background Glow & Subtle Tech Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-widest mb-8 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
          <span>{data.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.08] mb-8">
          {data.title_main} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-blue-500">
            {data.title_highlight}
          </span>
        </h1>

        {/* Sub-headline Narrative */}
        <p className="text-gray-600 dark:text-slate-400 text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mb-12">
          {data.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
          <Link
            href="/contact#audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-brand-primary dark:hover:bg-brand-primaryHover text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
          >
            <span>{data.cta_primary}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm shadow-sm"
          >
            <span>{data.cta_secondary}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 dark:text-slate-400" />
          </Link>
        </div>

        {/* Microcopy below buttons */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-mono text-gray-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{data.microcopy_primary}</span>
        </div>
      </div>
    </section>
  );
}
