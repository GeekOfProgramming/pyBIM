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


      {/* 9. METRICS CARDS (SYSTEM BENCHMARKS) */}
      <section className="relative py-24 bg-brand-base overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.systemBenchmarks.tag}
            </h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
            {t.systemBenchmarks.headline}
          </h2>
          <p className="text-lg text-brand-textSecondary max-w-3xl font-medium mb-16 leading-relaxed">
            {t.systemBenchmarks.subtitle}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {t.systemBenchmarks.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-left hover:border-brand-primary/50 transition-all font-mono shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-4 border-b border-brand-border pb-3">
                    {metric.tag}
                  </h4>
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Target:
                      </span>
                      <span className="text-brand-textPrimary font-medium">
                        {metric.target}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Manual:
                      </span>
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        {metric.manualLabor}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        pyBIM Exec:
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                        {metric.pyBimExec}
                      </span>
                    </div>
                    <div className="grid grid-cols-[90px_1fr] gap-3 pt-2 border-t border-brand-border/60">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">
                        Protocol:
                      </span>
                      <span className="text-brand-textSecondary leading-relaxed font-normal">
                        {metric.protocol}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
