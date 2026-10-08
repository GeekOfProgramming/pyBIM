"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { servicesPageData } from "@/lib/data/servicesPageData";
import ServicesHero from "@/components/sections/services-hero";
import ServicesExecutionRoadmap from "@/components/sections/services-execution-roadmap";
import ServicesEarlyAccessBanner from "@/components/sections/services-early-access-banner";
import ServicesEngineeringCapabilities from "@/components/sections/services-engineering-capabilities";
import ServicesExecutionPipeline from "@/components/sections/services-execution-pipeline";
import ServicesEngineeringOutcomes from "@/components/sections/services-engineering-outcomes";
import ServicesExecutionArchitecture from "@/components/sections/services-execution-architecture";
import ServicesIntegrationPathways from "@/components/sections/services-integration-pathways";
import ServicesEngineeringEvaluation from "@/components/sections/services-engineering-evaluation";

export default function ServicesPageLayout() {
  const { language } = useLanguage();
  const t = servicesPageData[language] || servicesPageData.en;

  return (
    <div className="w-full bg-brand-base">
      
      {/* 1. HERO SECTION */}
      <ServicesHero data={t.hero} />

      {/* 2. THREE CARDS (THE pyBIM EXECUTION ROADMAP) */}
      <ServicesExecutionRoadmap data={t.roadmap} />

      {/* 3. SOVEREIGN AI EARLY ACCESS BANNER */}
      <ServicesEarlyAccessBanner data={t.ctaBanner} />

      {/* 4. ENGINEERING CAPABILITIES */}
      <ServicesEngineeringCapabilities data={t.coreCapabilities} />

      {/* 5. ENGINEERING DELIVERY PROCESS */}
      <ServicesExecutionPipeline data={t.executionPipeline} />

      {/* 6. CORE ENGINEERING OUTCOMES */}
      <ServicesEngineeringOutcomes data={t.engineeringOutcomes} />

      {/* 7. ARCHITECTURE FLOW (ENGINEERING WORKFLOW ARCHITECTURE) */}
      <ServicesExecutionArchitecture data={t.executionArchitecture} />

      {/* 8. ENGAGEMENT PATHWAYS */}
      <ServicesIntegrationPathways data={t.integrationPathways} />

      {/* 9. ENGINEERING EVALUATION */}
      <ServicesEngineeringEvaluation data={t.systemBenchmarks} />

    </div>
  );
}
