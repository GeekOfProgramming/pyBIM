"use client";

import { Cpu, Server, Network } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";

export default function DeploymentModels() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).deploymentModels;

  const iconMap = {
    edge: <Cpu className="w-6 h-6 text-blue-600" />,
    enterprise: <Network className="w-6 h-6 text-purple-600" />,
    cloud: <Server className="w-6 h-6 text-emerald-600" />
  };

  const colorMap = {
    edge: "bg-blue-100 group-hover:border-blue-300 text-blue-600",
    enterprise: "bg-purple-100 group-hover:border-purple-300 text-purple-600",
    cloud: "bg-emerald-100 group-hover:border-emerald-300 text-emerald-600"
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-white dark:bg-brand-base border-b border-gray-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            {data.section_subtitle}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {data.models.map((model) => (
            <div key={model.id} className="bg-gray-50 dark:bg-slate-900/70 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 transition-colors group shadow-sm">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${model.id === 'edge' ? 'bg-blue-100 dark:bg-blue-950/50' : model.id === 'enterprise' ? 'bg-purple-100 dark:bg-purple-950/50' : 'bg-emerald-100 dark:bg-emerald-950/50'}`}>
                {iconMap[model.id]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{model.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                {model.description}
              </p>
              <div className={`text-xs font-mono uppercase tracking-wider ${model.id === 'edge' ? 'text-blue-600 dark:text-blue-400' : model.id === 'enterprise' ? 'text-purple-600 dark:text-purple-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                {model.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
