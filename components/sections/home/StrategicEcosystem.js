"use client";

import { GraduationCap, Building, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function StrategicEcosystem() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).strategicEcosystem;

  const getIcon = (id) => {
    switch (id) {
      case "unipd":
        return <GraduationCap className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />;
      case "polito":
        return <Building className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />;
      case "tier1":
        return <CheckCircle2 className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />;
      case "iso":
        return <ShieldCheck className="w-8 h-8 text-emerald-500 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />;
      default:
        return <Building className="w-8 h-8 text-brand-primary mb-4 group-hover:scale-110 transition-transform" />;
    }
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-white dark:bg-brand-base text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-500 dark:text-slate-400 tracking-tight mb-4">
          {data.title_part1} <span className="text-gray-900 dark:text-white">{data.title_part2}</span>
        </h2>
        <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm mb-16 max-w-2xl mx-auto uppercase tracking-wider leading-relaxed">
          {data.description}
        </p>

        {/* 4 Credential Badges Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {data.partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-2xl bg-gray-50 dark:bg-slate-900/70 border border-gray-200 dark:border-slate-800 p-6 md:p-8 flex flex-col items-center justify-between text-center hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 shadow-sm group backdrop-blur-sm"
            >
              {getIcon(partner.id)}
              <div className="font-mono text-xs md:text-sm font-bold tracking-widest text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 uppercase">
                {partner.name}
              </div>
              {partner.subtitle && (
                <div className="text-[11px] font-mono text-gray-500 dark:text-slate-400 leading-relaxed">
                  {partner.subtitle}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
