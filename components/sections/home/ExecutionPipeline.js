"use client";

import { Layers, Cpu, Terminal, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function ExecutionPipeline() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).executionPipeline;

  const getIcon = (step) => {
    switch (step) {
      case "01": return <Layers className="w-6 h-6" />;
      case "02": return <Cpu className="w-6 h-6" />;
      case "03": return <Terminal className="w-6 h-6" />;
      case "04": return <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-gray-50 dark:bg-brand-surface text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm max-w-3xl mx-auto uppercase tracking-wider leading-relaxed">
            {data.section_subtitle}
          </p>
        </div>

        {/* 4-Step Connected Pipeline */}
        <div className="relative">
          {/* Horizontal Track (Desktop) */}
          <div className="hidden md:block absolute top-[32px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-500/10 via-blue-500/40 to-blue-500/10 z-0 pointer-events-none" />

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {data.steps.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                {/* Step Circle & Badge */}
                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 group-hover:border-blue-500 dark:group-hover:border-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:shadow-[0_4px_20px_rgba(37,99,235,0.15)] transition-all relative z-10 shadow-sm dark:shadow-lg backdrop-blur-md mb-6">
                  <div className="absolute -top-2.5 -right-2.5 text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-blue-900/40 rounded-md px-2 py-0.5 shadow-sm">
                    {item.step}
                  </div>
                  {getIcon(item.step)}
                </div>

                {/* Step Title & Description */}
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-slate-400 font-mono leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
