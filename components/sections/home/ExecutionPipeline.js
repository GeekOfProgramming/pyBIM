"use client";

import { Database, Bot, Terminal, ShieldCheck } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function ExecutionPipeline() {
  const data = homeData.executionPipeline;

  const getIcon = (step) => {
    switch (step) {
      case "01": return <Database />;
      case "02": return <Bot />;
      case "03": return <Terminal />;
      case "04": return <ShieldCheck />;
      default: return <Database />;
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">{data.section_subtitle}</p>
        </div>
        
        <div className="relative pt-4">
          {/* Changed top-1/2 to top-12 (48px) which exactly aligns with the center of the h-16 (64px) boxes when accounting for the pt-4 padding */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200 z-0" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {data.steps.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 mb-6 group-hover:border-blue-400 group-hover:text-blue-600 group-hover:shadow-[0_4px_20px_rgba(37,99,235,0.15)] transition-all relative shadow-sm z-10">
                  <div className="absolute -top-3 -right-3 text-[10px] font-mono text-gray-500 bg-white border border-gray-100 rounded-md px-1.5 py-0.5">{item.step}</div>
                  {getIcon(item.step)}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
