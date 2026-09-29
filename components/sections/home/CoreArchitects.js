"use client";

import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function CoreArchitects() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).coreArchitects;

  const getRoleImage = (id) => {
    return id === 'lead_sys_eng' ? "/Pictures/BIM/bim-0080.jpg" : "/Pictures/BIM/bim-0071.jpg";
  };

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-gray-50 dark:bg-brand-surface text-gray-900 dark:text-white border-b border-gray-200 dark:border-slate-800 relative transition-colors">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          {data.section_subtitle && (
            <p className="text-gray-600 dark:text-slate-400 font-mono text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-wider leading-relaxed">
              {data.section_subtitle}
            </p>
          )}
        </div>

        {/* 2-Card Engineering Unit Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {data.architects.map((architect) => (
            <div
              key={architect.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 overflow-hidden hover:border-blue-500/50 dark:hover:border-brand-primary/50 transition-all duration-300 shadow-sm dark:shadow-xl backdrop-blur-sm group flex flex-col h-full"
            >
              {/* Engineering Setup Image */}
              <div className="h-60 relative overflow-hidden bg-gray-100 dark:bg-slate-950 flex-shrink-0">
                <img
                  src={getRoleImage(architect.id)}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
                  alt={architect.role}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/50 dark:via-slate-900/60 to-transparent" />
              </div>

              {/* Personnel Data Body */}
              <div className="p-8 relative z-10 flex-1 flex flex-col justify-between">
                <div className="mb-6 min-h-[64px] flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1.5 tracking-tight group-hover:text-blue-600 dark:group-hover:text-brand-primary transition-colors">
                    {architect.role}
                  </h3>
                  <div className="text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    {architect.department}
                  </div>
                </div>

                {/* Operational Note Dossier Box - Perfect Height & Symmetry */}
                <div className="bg-gray-50 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700/80 rounded-2xl p-6 flex-1 flex flex-col justify-between min-h-[200px]">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider mb-3 flex items-center justify-between pb-2.5 border-b border-gray-200 dark:border-slate-700/60 flex-shrink-0">
                    <span className="text-gray-500 dark:text-slate-400">OPERATIONAL NOTE</span>
                    <span className="text-blue-600 dark:text-blue-400 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 font-bold">
                      {architect.note_id}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-slate-200 text-xs md:text-sm italic font-mono leading-relaxed flex-1 flex items-start pt-1">
                    {architect.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
