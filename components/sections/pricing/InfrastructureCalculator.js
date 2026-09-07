"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { Server, TerminalSquare, ArrowRight, HardDrive, Cpu } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/pricing.json";
import deData from "@/lib/translations/de/pricing.json";
import itData from "@/lib/translations/it/pricing.json";

export default function InfrastructureCalculator() {
  const { language } = useLanguage();
  const pricingData = language === 'it' ? itData : language === 'de' ? deData : enData;
  const data = pricingData.infrastructure;

  const [dataVolume, setDataVolume] = useState(50); // 0 to 100
  const [vram, setVram] = useState(50); // 0 to 100

  // Calculation Logic
  const baseCapEx = 15000;
  const maxCapEx = 50000;
  const capExRange = maxCapEx - baseCapEx;
  
  const currentCapEx = baseCapEx + (capExRange * (dataVolume / 100 * 0.4 + vram / 100 * 0.6));

  const baseOpEx = 1500;
  const maxOpEx = 5000;
  const opExRange = maxOpEx - baseOpEx;

  const currentOpEx = baseOpEx + (opExRange * (dataVolume / 100 * 0.3 + vram / 100 * 0.7));

  // Formatting helpers
  const formatVolume = (val) => {
    if (val === 0) return "10GB";
    if (val === 100) return "5TB+";
    const gb = 10 + (val / 100) * 4990;
    return gb > 1000 ? `${(gb/1000).toFixed(1)}TB` : `${Math.round(gb)}GB`;
  };

  const formatVram = (val) => {
    if (val === 0) return "16GB VRAM (Base)";
    if (val === 100) return "Multi-GPU Cluster";
    const v = 16 + (val / 100) * 112; // up to ~128GB before cluster
    return `${Math.round(v)}GB VRAM`;
  };

  return (
    <section className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#18181b] border border-emerald-200 dark:border-gray-800 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
          {data.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-sm leading-relaxed font-medium">
          {data.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Sliders Panel */}
        <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col justify-center shadow-sm">
          
          {/* Data Volume Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                {data.inputs.volume_label}
              </label>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold">{formatVolume(dataVolume)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={dataVolume} 
              onChange={(e) => setDataVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500 transition-all"
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 dark:text-gray-600 font-mono font-medium">
              <span>{data.inputs.volume_min}</span>
              <span>{data.inputs.volume_max}</span>
            </div>
          </div>

          {/* Compute Slider */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                {data.inputs.vram_label}
              </label>
              <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-bold">{formatVram(vram)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={vram} 
              onChange={(e) => setVram(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-500 transition-all"
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-500 dark:text-gray-600 font-mono font-medium">
              <span>{data.inputs.vram_min}</span>
              <span>{data.inputs.vram_max}</span>
            </div>
          </div>
        </div>

        {/* Outputs Panel */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* Edge Box */}
          <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-emerald-500">
              <Server className="w-32 h-32" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-1 rounded inline-block mb-4 uppercase tracking-widest font-semibold">
                {data.edge.badge}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{data.edge.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-500 mb-6 leading-relaxed font-medium">
                {data.edge.description}
              </p>
            </div>
            
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                €{(currentCapEx / 1000).toFixed(1)}k <span className="text-sm text-gray-500 dark:text-gray-600 font-normal">{data.edge.estimate}</span>
              </div>
            </div>
          </div>

          {/* Cloud Box */}
          <div className="bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-blue-500">
              <Server className="w-32 h-32" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2 py-1 rounded inline-block mb-4 uppercase tracking-widest font-semibold">
                {data.cloud.badge}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{data.cloud.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-500 mb-6 leading-relaxed font-medium">
                {data.cloud.description}
              </p>
            </div>
            
            <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
                €{Math.round(currentOpEx)} <span className="text-sm text-gray-500 dark:text-gray-600 font-normal">{data.cloud.mo}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <Link 
          href={`/contact?volume=${dataVolume}&vram=${vram}`}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-md"
        >
          <span>{data.cta}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  );
}
