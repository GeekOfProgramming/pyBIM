"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function ValidationProtocol() {
  const data = homeData.validationProtocol;

  return (
    <section className="py-32 px-6 lg:px-8 relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-[url('/Pictures/BIM/bim-0022.jpg')] bg-cover bg-center opacity-5 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center border border-gray-200 bg-white/80 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-xl flex flex-col items-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          {data.section_title}
        </h2>
        
        <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {data.points && (
          <div className="flex flex-col gap-5 text-left max-w-2xl mx-auto mb-12 bg-white/50 p-6 rounded-2xl border border-gray-100">
            {data.points.map((point, i) => (
              <div key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-900 block mb-0.5">{point.title}</strong>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-col items-center gap-3 w-full max-w-xl">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-lg bg-gray-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 shadow-md hover:-translate-y-1"
          >
            <span>{data.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-xs text-gray-500 font-medium text-center leading-relaxed">
            {data.microcopy}
          </span>
        </div>
      </div>
    </section>
  );
}
