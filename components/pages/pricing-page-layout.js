"use client";

import InfrastructureCalculator from "@/components/sections/pricing/InfrastructureCalculator";
import ProjectExecutionCalculator from "@/components/sections/pricing/ProjectExecutionCalculator";
import EducationPricingCards from "@/components/sections/pricing/EducationPricingCards";

export default function PricingPageLayout() {
  return (
    <div className="w-full bg-[#09090b] text-gray-300 font-sans selection:bg-emerald-500/30">
      
      {/* Header Space matching dark theme */}
      <div className="w-full pt-32 pb-16 px-6 lg:px-8 text-center bg-gradient-to-b from-[#18181b] to-[#09090b] border-b border-gray-800">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Pricing & Deployment Models
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Sovereign AI Infrastructure. No B2C marketing fluff. Purely algorithmic engineering and enterprise deployment baselines.
        </p>
      </div>

      <div className="flex flex-col gap-24 py-24">
        <InfrastructureCalculator />
        <ProjectExecutionCalculator />
        <EducationPricingCards />
      </div>
    </div>
  );
}
