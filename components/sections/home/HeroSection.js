"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Download, Lock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function HeroSection() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).hero;

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 lg:px-8 w-full bg-white dark:bg-brand-base overflow-hidden border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_60%)]" />
      <div className="absolute inset-0 z-0 bg-[url('/Pictures/BIM/bim-0080.jpg')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-widest mb-8">
          <Lock className="w-3.5 h-3.5" />
          <span>{data.badge}</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.05] mb-8 max-w-5xl">
          {data.title_main} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {data.title_highlight}
          </span>
        </h1>
        
        <p className="text-gray-600 dark:text-slate-400 text-lg sm:text-xl font-medium leading-relaxed max-w-3xl mb-12">
          {data.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start justify-center gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
            >
              <span>{data.cta_primary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-xs text-gray-500 dark:text-slate-500 font-medium text-center">{data.microcopy_primary}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2 w-full sm:w-1/2">
            <Link
              href="/contact#calculator"
              className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{data.cta_secondary}</span>
            </Link>
            <span className="text-xs text-gray-500 dark:text-slate-500 font-medium text-center">{data.microcopy_secondary}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
