"use client";

import InfrastructureCalculator from "@/components/sections/pricing/InfrastructureCalculator";
import ProjectExecutionCalculator from "@/components/sections/pricing/ProjectExecutionCalculator";
import EducationPricingCards from "@/components/sections/pricing/EducationPricingCards";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/pricing.json";
import deData from "@/lib/translations/de/pricing.json";
import itData from "@/lib/translations/it/pricing.json";

export default function PricingPageLayout() {
  const { language } = useLanguage();
  const pricingData = language === 'it' ? itData : language === 'de' ? deData : enData;
  const data = pricingData.layout;

  return (
    <div className="w-full bg-[#09090b] text-gray-300 font-sans selection:bg-emerald-500/30">
      
      {/* Header Space matching white theme */}
      <div className="w-full pt-32 pb-16 px-6 lg:px-8 text-center bg-white border-b border-gray-100">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          {data.title}
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="w-full bg-[#09090b] py-24">
          <InfrastructureCalculator />
        </div>
        <div className="w-full bg-[#18181b] py-24 border-y border-gray-800">
          <ProjectExecutionCalculator />
        </div>
        <div className="w-full bg-[#09090b] py-24">
          <EducationPricingCards />
        </div>
      </div>
    </div>
  );
}
