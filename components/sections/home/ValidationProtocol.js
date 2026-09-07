"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function ValidationProtocol() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).validationProtocol;

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50 dark:bg-brand-surface border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-4xl mx-auto text-center border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-3xl p-10 md:p-16 shadow-md flex flex-col items-center transition-colors">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 mb-8 border border-blue-100 dark:border-blue-900/40 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
          {data.section_title}
        </h2>
        
        <p className="text-gray-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {data.points && (
          <div className="flex flex-col gap-5 text-left max-w-2xl mx-auto mb-12 bg-gray-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-700">
            {data.points.map((point, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  <strong className="text-gray-900 dark:text-white block mb-0.5">{point.title}</strong>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-lg bg-gray-900 dark:bg-blue-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:-translate-y-1"
          >
            <span>{data.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-gray-500 dark:text-slate-400 font-medium text-center leading-relaxed">
            {data.microcopy}
          </span>
        </div>
      </div>
    </section>
  );
}
