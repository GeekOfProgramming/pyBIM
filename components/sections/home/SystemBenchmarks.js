"use client";

import { Activity, Terminal } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function SystemBenchmarks() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).systemBenchmarks;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-white dark:bg-brand-base text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Background glow behind terminal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-wider leading-relaxed">
            {data.section_subtitle}
          </p>
        </div>

        {/* High-Tech Terminal Window */}
        <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md relative">
          {/* Top Edge Accent */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Terminal Window Header */}
          <div className="bg-slate-900/90 px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs text-slate-400 font-mono tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>{data.terminal_header}</span>
            </div>
            <div className="w-12" /> {/* Spacer for centering */}
          </div>

          {/* Terminal Console Content */}
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 mb-6 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500">&gt;</span> 
              <span className="font-bold">{data.command}</span>
            </div>

            {/* Test Results */}
            <div className="space-y-4">
              {data.tests.map((test, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-2 ${
                    i < data.tests.length - 1 ? 'border-b border-slate-800/80' : ''
                  }`}
                >
                  <span className="text-slate-300 font-medium">{test.name}</span>
                  <span className="text-blue-400 font-bold tracking-wider font-mono">
                    {test.result}
                  </span>
                </div>
              ))}
            </div>

            {/* System Status Banner */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center gap-2.5 text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
              <span>{data.status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
