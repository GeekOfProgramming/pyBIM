"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { TerminalSquare, UploadCloud, Check, FileCode2, ShieldAlert } from "lucide-react";

export default function ProjectExecutionCalculator() {
  const [lod, setLod] = useState("300");
  const [modelSize, setModelSize] = useState(30); // 0 to 100
  
  const [isoActive, setIsoActive] = useState(false);
  const [cobieActive, setCobieActive] = useState(false);
  const [dmActive, setDmActive] = useState(false);

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
  const cobieFee = cobieActive ? 1500 : 0;
  const dmFee = dmActive ? 1200 : 0;

  const calculateEstimate = () => {
    const base = getLodBase() * sizeMultiplier;
    const total = base + isoFee + cobieFee + dmFee;
    
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-gray-800 text-purple-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>ALGORITHMIC PROJECT EXECUTION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Execution Estimator
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Outsourcing complex workflows to pyBIM algorithmic execution. Select project LOD, federated model size, and compliance mandates to generate an automated baseline.
        </p>
      </div>

      <div className="bg-[#18181b] border border-gray-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Input Matrix */}
        <div className="p-8 lg:p-10 lg:w-3/5 border-b lg:border-b-0 lg:border-r border-gray-800">
          
          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-200 mb-4">Target Level of Development (LOD)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["200", "300", "400", "500"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLod(lvl)}
                  className={`py-3 rounded-xl font-mono text-sm transition-all border ${
                    lod === lvl 
                      ? "bg-purple-500/20 border-purple-500 text-purple-400 font-bold" 
                      : "bg-[#09090b] border-gray-800 text-gray-500 hover:border-gray-600"
                  }`}
                >
                  LOD {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-gray-400" />
                Federated Model Size
              </label>
              <span className="text-gray-300 font-mono text-sm font-bold">{formatSize(modelSize)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={modelSize} 
              onChange={(e) => setModelSize(Number(e.target.value))}
              className="w-full h-2 bg-[#09090b] border border-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-4">Compliance Mandates</label>
            <div className="flex flex-col gap-3">
              {[
                { label: "ISO 19650 Compliance", state: isoActive, setter: setIsoActive },
                { label: "COBie Data Extraction", state: cobieActive, setter: setCobieActive },
                { label: "D.M. 560/312 (Italian Decree)", state: dmActive, setter: setDmActive }
              ].map((mandate, idx) => (
                <button 
                  key={idx}
                  onClick={() => mandate.setter(!mandate.state)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    mandate.state 
                      ? "bg-purple-500/10 border-purple-500/50" 
                      : "bg-[#09090b] border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <span className={`text-sm font-medium ${mandate.state ? 'text-white' : 'text-gray-400'}`}>
                    {mandate.label}
                  </span>
                  <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-all ${mandate.state ? 'bg-purple-500' : 'bg-gray-800'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mandate.state ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Output */}
        <div className="p-8 lg:p-10 lg:w-2/5 bg-[#121215] flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#09090b] border border-gray-800 flex items-center justify-center text-purple-500 mb-8 shadow-inner">
            <TerminalSquare className="w-8 h-8" />
          </div>
          
          <div className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-4">
            Estimated Execution Baseline
          </div>
          
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-mono tracking-tighter">
            €{min.toLocaleString()} <span className="text-2xl text-gray-600">-</span> €{max.toLocaleString()}
          </div>
          
          <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-10 text-left">
            <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-500/80 leading-relaxed">
              This is a baseline algorithmic estimation. Final pricing requires structural document auditing (EIR/BEP).
            </p>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-purple-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
          >
            <UploadCloud className="w-5 h-5" />
            <span>UPLOAD EIR/BEP FOR PROPOSAL</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
