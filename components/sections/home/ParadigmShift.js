"use client";

import { CheckCircle2, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function ParadigmShift() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).paradigmShift;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-gray-50 dark:bg-brand-surface text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-wider">
            {data.section_subtitle}
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Legacy Traditional */}
          <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950/40 flex flex-col justify-between shadow-sm dark:shadow-lg relative overflow-hidden backdrop-blur-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{data.traditional.badge}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                {data.traditional.title}
              </h3>

              <ul className="space-y-5 text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
                {data.traditional.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 mt-0.5">
                      <X className="w-3 h-3 text-red-600 dark:text-red-400 stroke-[2.5]" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: pyBIM Algorithmic */}
          <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-900/50 flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-2xl backdrop-blur-sm">
            {/* Top Glowing Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span>{data.autonomous.badge}</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                {data.autonomous.title}
              </h3>

              <ul className="space-y-5 text-gray-700 dark:text-slate-200 text-sm leading-relaxed">
                {data.autonomous.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
