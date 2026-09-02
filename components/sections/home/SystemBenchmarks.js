"use client";

import { Activity } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function SystemBenchmarks() {
  const data = homeData.systemBenchmarks;

  return (
    <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{data.section_title}</h2>
          <p className="text-gray-600">{data.section_subtitle}</p>
        </div>
        
        {/* Terminal Window stays dark for the aesthetic */}
        <div className="rounded-xl bg-[#09090b] border border-gray-800 p-1 overflow-hidden shadow-2xl">
          <div className="bg-[#18181b] px-4 py-3 flex items-center gap-2 border-b border-gray-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-xs text-gray-500 font-mono ml-4">{data.terminal_header}</div>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-gray-300">
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <span className="text-gray-500">$</span> {data.command}
            </div>
            <div className="space-y-4">
              {data.tests.map((test, i) => (
                <div key={i} className={`flex flex-col md:flex-row md:justify-between ${i < data.tests.length - 1 ? 'border-b border-gray-800/50 pb-3' : 'pb-3'} gap-2`}>
                  <span>{test.name}</span>
                  <span className="text-blue-400 font-bold">{test.result}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-emerald-500/80 flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              {data.status}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
