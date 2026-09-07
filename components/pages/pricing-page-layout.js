"use client";

import InfrastructureCalculator from "@/components/sections/pricing/InfrastructureCalculator";
import ProjectExecutionCalculator from "@/components/sections/pricing/ProjectExecutionCalculator";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/pricing.json";
import deData from "@/lib/translations/de/pricing.json";
import itData from "@/lib/translations/it/pricing.json";

export default function PricingPageLayout() {
  const { language } = useLanguage();
  const pricingData = language === 'it' ? itData : language === 'de' ? deData : enData;
  const data = pricingData.layout;

  return (
    <div className="w-full bg-white dark:bg-[#09090b] text-gray-900 dark:text-gray-300 font-sans">
      
      {/* Header Space */}
      <div className="w-full pt-32 pb-16 px-6 lg:px-8 text-center bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
          {data.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          {data.subtitle}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="w-full bg-gray-50 dark:bg-[#09090b] py-24 border-b border-gray-200 dark:border-gray-800">
          <InfrastructureCalculator />
        </div>
        <div className="w-full bg-white dark:bg-[#18181b] py-24">
          <ProjectExecutionCalculator />
        </div>
      </div>
    </div>
  );
}
