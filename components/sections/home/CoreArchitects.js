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
    <section className="py-24 px-6 lg:px-8 bg-gray-50 dark:bg-brand-base border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">{data.section_title}</h2>
          {data.section_subtitle && (
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {data.section_subtitle}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.architects.map((architect) => (
            <div key={architect.id} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col hover:border-gray-300 dark:hover:border-slate-700 transition-all shadow-sm hover:shadow-md">
              <div className="h-64 bg-gray-200 dark:bg-slate-800 relative">
                <img src={getRoleImage(architect.id)} className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-700" alt={architect.role} />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent"></div>
                {/* Solid mask to eliminate bottom edge bleed */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-white dark:bg-slate-900"></div>
              </div>
              <div className="p-8 relative z-10 bg-white dark:bg-slate-900">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{architect.role}</h3>
                <div className="text-blue-600 dark:text-blue-400 text-sm font-mono mb-4">{architect.department}</div>
                <div className="bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 rounded-lg p-4 mb-4">
                  <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-mono font-bold mb-2 flex justify-between">
                    <span>Operational Note</span>
                    <span>{architect.note_id}</span>
                  </div>
                  <p className="text-gray-600 dark:text-slate-300 text-sm italic">
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
