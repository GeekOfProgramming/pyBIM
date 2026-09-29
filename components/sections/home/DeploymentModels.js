"use client";

import Link from "@/components/layout/LocalizedLink";
import { Layers, Terminal, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function DeploymentModels() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).deploymentModels;

  const iconMap = {
    bim: <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    code: <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    ai: <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-white dark:bg-brand-base text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-wider">
            {data.section_subtitle}
          </p>
        </div>

        {/* 3 Core Vectors Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {data.models.map((model) => (
            <Link
              key={model.id}
              href={model.link || "/services"}
              className="bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-400/50 rounded-3xl p-8 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden"
            >
              {/* Subtle card top glow on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors" />

              <div>
                {/* Header with Vector tag and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/40">
                    {model.vector || "VECTOR"}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/80 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-500/50 transition-all shadow-sm">
                    {iconMap[model.id] || <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {model.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                  {model.description}
                </p>
              </div>

              {/* Bottom Metadata & Arrow */}
              <div className="pt-4 border-t border-gray-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-700 dark:text-slate-300 font-medium tracking-wider uppercase text-[11px]">
                  {model.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
