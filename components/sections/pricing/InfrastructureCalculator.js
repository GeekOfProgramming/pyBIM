"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { Server, TerminalSquare, ArrowRight, HardDrive, Cpu } from "lucide-react";

export default function InfrastructureCalculator() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-gray-800 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>SOVEREIGN AI INFRASTRUCTURE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          Infrastructure Calculator
        </h2>
        <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
          Hardware and server deployment estimation. Configure your required data thresholds and computational load to estimate Edge AI CapEx and Cloud VPS OpEx.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Sliders Panel */}
        <div className="bg-[#18181b] border border-gray-800 rounded-2xl p-8 flex flex-col justify-center">
          
          {/* Data Volume Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-500" />
                Local Data Processing Volume
              </label>
              <span className="text-emerald-400 font-mono text-sm font-bold">{formatVolume(dataVolume)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={dataVolume} 
              onChange={(e) => setDataVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
              <span>10GB (RAG DB)</span>
              <span>5TB+ (Enterprise BIM)</span>
            </div>
          </div>

          {/* Compute Slider */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-500" />
                Required LLM Compute / VRAM
              </label>
              <span className="text-blue-400 font-mono text-sm font-bold">{formatVram(vram)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={vram} 
              onChange={(e) => setVram(Number(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
            />
            <div className="flex justify-between mt-2 text-[10px] text-gray-600 font-mono">
              <span>16GB (Base Model)</span>
              <span>Multi-GPU Cluster (Agents)</span>
            </div>
          </div>
        </div>

        {/* Outputs Panel */}
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* Edge Box */}
          <div className="bg-[#09090b] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-emerald-500">
              <Server className="w-32 h-32" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded inline-block mb-4 uppercase tracking-widest">
                CapEx (Hardware)
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Edge AI Appliance</h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Physical hardware + initial setup fee. Deployed directly into your local area network (LAN).
              </p>
            </div>
            
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">
                €{(currentCapEx / 1000).toFixed(1)}k <span className="text-sm text-gray-600 font-normal">estimate</span>
              </div>
            </div>
          </div>

          {/* Cloud Box */}
          <div className="bg-[#09090b] border border-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-blue-500">
              <Server className="w-32 h-32" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-blue-500 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded inline-block mb-4 uppercase tracking-widest">
                OpEx (Cloud)
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dedicated GPU-VPS</h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Monthly rental of isolated, single-tenant cloud servers located in secure European datacenters.
              </p>
            </div>
            
            <div>
              <div className="text-3xl font-extrabold text-white mb-1">
                €{Math.round(currentOpEx)} <span className="text-sm text-gray-600 font-normal">/ mo</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <Link 
          href={`/contact?volume=${dataVolume}&vram=${vram}`}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wider hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <span>REQUEST TECHNICAL AUDIT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </section>
  );
}
