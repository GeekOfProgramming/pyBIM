"use client";

import { Code, CheckCircle2 } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function ParadigmShift() {
  const data = homeData.paradigmShift;

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.section_subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-red-100 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-red-600 font-mono text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {data.traditional.badge}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{data.traditional.title}</h3>
              <ul className="space-y-4 text-gray-600 text-sm">
                {data.traditional.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold mt-0.5">✕</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col justify-between relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <Code className="w-32 h-32 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <div className="text-emerald-700 font-mono text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                {data.autonomous.badge}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{data.autonomous.title}</h3>
              <ul className="space-y-4 text-gray-700 text-sm">
                {data.autonomous.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" /> {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
