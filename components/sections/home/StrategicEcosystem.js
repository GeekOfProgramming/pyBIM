"use client";

import { GraduationCap, Building, ShieldCheck } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function StrategicEcosystem() {
  const data = homeData.strategicEcosystem;

  const getIcon = (id) => {
    switch (id) {
      case "unipd":
      case "polito":
        return <GraduationCap className="w-10 h-10 text-gray-500" />;
      case "tier1":
        return <Building className="w-10 h-10 text-gray-500" />;
      case "iso":
        return <ShieldCheck className="w-10 h-10 text-gray-500" />;
      default:
        return <Building className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-500 tracking-tight mb-4">
          {data.title_part1} <span className="text-gray-900">{data.title_part2}</span>
        </h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto text-sm">
          {data.description}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start justify-center">
          {data.partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center justify-start gap-3 opacity-60 hover:opacity-100 transition-opacity text-center">
              {getIcon(partner.id)}
              <span className="font-mono text-sm font-bold tracking-widest text-gray-800">{partner.name}</span>
              {partner.subtitle && (
                <span className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                  {partner.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
