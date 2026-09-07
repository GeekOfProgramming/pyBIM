"use client";

import { GraduationCap, Building, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function StrategicEcosystem() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).strategicEcosystem;

  const getIcon = (id) => {
    switch (id) {
      case "unipd":
      case "polito":
        return <GraduationCap className="w-10 h-10 text-gray-500" />;
      case "tier1":
        return <Building className="w-10 h-10 text-gray-500" />;
      case "iso":
        return <ShieldCheck className="w-10 h-10 text-gray-500" />;
      default:
        return <Building className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-white dark:bg-brand-base border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 dark:text-slate-400 tracking-tight mb-4">
          {data.title_part1} <span className="text-gray-900 dark:text-white">{data.title_part2}</span>
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto text-sm">
          {data.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start justify-center">
          {data.partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center justify-start gap-3 opacity-70 hover:opacity-100 transition-opacity text-center">
              {getIcon(partner.id)}
              <span className="font-mono text-sm font-bold tracking-widest text-gray-800 dark:text-slate-200">{partner.name}</span>
              {partner.subtitle && (
                <span className="text-xs text-gray-500 dark:text-slate-400 max-w-[200px] leading-relaxed">
                  {partner.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
