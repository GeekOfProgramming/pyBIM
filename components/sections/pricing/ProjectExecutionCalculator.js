"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { TerminalSquare, UploadCloud, Check, FileCode2, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/pricing.json";
import deData from "@/lib/translations/de/pricing.json";
import itData from "@/lib/translations/it/pricing.json";

export default function ProjectExecutionCalculator() {
  const { language } = useLanguage();
  const pricingData = language === 'it' ? itData : language === 'de' ? deData : enData;
  const data = pricingData.execution;

  const [lod, setLod] = useState("300");
  const [modelSize, setModelSize] = useState(30); // 0 to 100
  
  const [isoActive, setIsoActive] = useState(false);
  const [uniActive, setUniActive] = useState(false);
  const [dmActive, setDmActive] = useState(false);
  const [cobieActive, setCobieActive] = useState(false);

  const [clashActive, setClashActive] = useState(false);
  const [metaActive, setMetaActive] = useState(false);
  const [paramActive, setParamActive] = useState(false);

  // Base pricing based on LOD
  const getLodBase = () => {
    switch (lod) {
      case "200": return 1500;
      case "300": return 3000;
      case "400": return 6000;
      case "500": return 10000;
      default: return 3000;
    }
  };

  // Size multiplier: 0 to 100 maps to 1x to 3x multiplier
  const sizeMultiplier = 1 + (modelSize / 100) * 2;

  // Compliance flat fees
  const isoFee = isoActive ? 2000 : 0;
  const uniFee = uniActive ? 1500 : 0;
  const dmFee = dmActive ? 1200 : 0;
  const cobieFee = cobieActive ? 1500 : 0;

  // Algorithmic Complexity fees
  const clashFee = clashActive ? 2500 : 0;
  const metaFee = metaActive ? 1800 : 0;
  const paramFee = paramActive ? 3500 : 0;

  const calculateEstimate = () => {
    const base = getLodBase() * sizeMultiplier;
    const total = base + isoFee + uniFee + dmFee + cobieFee + clashFee + metaFee + paramFee;
    
    // Provide a range -10% to +15%
    const min = Math.round(total * 0.9 / 100) * 100;
    const max = Math.round(total * 1.15 / 100) * 100;
    
    return { min, max };
  };

  const { min, max } = calculateEstimate();

  const formatSize = (val) => {
    if (val === 0) return "100MB";
    if (val === 100) return "5GB+";
    const mb = 100 + (val / 100) * 4900;
    return mb > 1000 ? `${(mb/1000).toFixed(1)}GB` : `${Math.round(mb)}MB`;
  };

  return (
    <section className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-[#18181b] border border-purple-200 dark:border-gray-800 text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
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

      <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm">
        
        {/* Input Matrix */}
        <div className="p-8 lg:p-10 lg:w-3/5 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800">
          
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">{data.inputs.lod}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["200", "300", "400", "500"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLod(lvl)}
                  className={`py-3 rounded-xl font-mono text-sm transition-all border ${
                    lod === lvl 
                      ? "bg-purple-50 dark:bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-400 font-bold shadow-sm" 
                      : "bg-gray-50 dark:bg-[#09090b] border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-500 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  LOD {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-purple-600 dark:text-gray-400" />
                {data.inputs.model_size}
              </label>
              <span className="text-gray-700 dark:text-gray-300 font-mono text-sm font-bold">{formatSize(modelSize)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={modelSize} 
              onChange={(e) => setModelSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#09090b] border border-gray-300 dark:border-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500 transition-all"
            />
          </div>

          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">{data.inputs.mandates}</label>
            <div className="flex flex-col gap-3">
              {[
                { label: "ISO 19650 (Information Management)", state: isoActive, setter: setIsoActive },
                { label: "UNI 11337 (Italian BIM Standard)", state: uniActive, setter: setUniActive },
                { label: "D.M. 312/2021 (Public Procurement)", state: dmActive, setter: setDmActive },
                { label: "COBie / IFC4 Data Handover", state: cobieActive, setter: setCobieActive }
              ].map((mandate, idx) => (
                <button 
                  key={idx}
                  onClick={() => mandate.setter(!mandate.state)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    mandate.state 
                      ? "bg-purple-50 dark:bg-purple-500/10 border-purple-500/50" 
                      : "bg-gray-50 dark:bg-[#09090b] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <span className={`text-sm font-medium ${mandate.state ? 'text-purple-950 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-400'}`}>
                    {mandate.label}
                  </span>
                  <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-all ${mandate.state ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mandate.state ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Algorithmic Complexity Vectors</label>
            <div className="flex flex-col gap-3">
              {[
                { label: "Automated Clash Resolution", state: clashActive, setter: setClashActive },
                { label: "Custom Metadata Injection", state: metaActive, setter: setMetaActive },
                { label: "Parametric Generative Execution", state: paramActive, setter: setParamActive }
              ].map((vector, idx) => (
                <button 
                  key={idx}
                  onClick={() => vector.setter(!vector.state)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    vector.state 
                      ? "bg-purple-50 dark:bg-purple-500/10 border-purple-500/50" 
                      : "bg-gray-50 dark:bg-[#09090b] border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                  }`}
                >
                  <span className={`text-sm font-medium ${vector.state ? 'text-purple-950 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-400'}`}>
                    {vector.label}
                  </span>
                  <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-all ${vector.state ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${vector.state ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Output */}
        <div className="p-8 lg:p-10 lg:w-2/5 bg-gray-50 dark:bg-[#121215] flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#09090b] border border-gray-200 dark:border-gray-800 flex items-center justify-center text-purple-600 dark:text-purple-500 mb-8 shadow-sm">
            <TerminalSquare className="w-8 h-8" />
          </div>
          
          <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4 font-semibold">
            {data.output.baseline}
          </div>
          
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 font-mono tracking-tighter">
            €{min.toLocaleString()} <span className="text-2xl text-gray-400 dark:text-gray-600">-</span> €{max.toLocaleString()}
          </div>
          
          <div className="flex items-start gap-3 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 p-4 rounded-xl mb-10 text-left">
            <ShieldAlert className="w-5 h-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-800 dark:text-yellow-500/80 leading-relaxed font-semibold">
              Algorithmic baseline. Final execution cost dictates absolute auditing of structural Information Exchange Requirements (EIR) and BEP.
            </p>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-purple-700 dark:hover:bg-purple-500 transition-all shadow-md"
          >
            <UploadCloud className="w-5 h-5" />
            <span>{data.output.cta}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
