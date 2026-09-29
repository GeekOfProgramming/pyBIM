"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function ValidationProtocol() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).validationProtocol;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-gray-50 dark:bg-brand-surface text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-4xl mx-auto text-center border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-16 shadow-sm dark:shadow-xl flex flex-col items-center transition-colors">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-8 border border-blue-100 dark:border-blue-900/40 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          {data.section_title}
        </h2>
        
        <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {data.points && (
          <div className="flex flex-col gap-5 text-left max-w-2xl mx-auto mb-12 bg-gray-50 dark:bg-slate-950/60 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-slate-800 w-full">
            {data.points.map((point, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-mono">
                  <strong className="text-gray-900 dark:text-white block mb-0.5 text-sm font-sans font-bold">{point.title}</strong>
                  {point.desc}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          <Link
            href="/contact#audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-brand-primary dark:hover:bg-brand-primaryHover text-white font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:-translate-y-0.5 shadow-blue-500/20"
          >
            <span>{data.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-gray-500 dark:text-slate-400 font-mono text-center leading-relaxed mt-2">
            {data.microcopy}
          </span>
        </div>
      </div>
    </section>
  );
}
