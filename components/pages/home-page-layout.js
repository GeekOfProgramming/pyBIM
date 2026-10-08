"use client";

import HeroSection from "@/components/sections/home/HeroSection";
import ParadigmShift from "@/components/sections/home/ParadigmShift";
import DeploymentModels from "@/components/sections/home/DeploymentModels";
import ExecutionPipeline from "@/components/sections/home/ExecutionPipeline";
import SystemBenchmarks from "@/components/sections/home/SystemBenchmarks";
import CoreArchitects from "@/components/sections/home/CoreArchitects";
import StrategicEcosystem from "@/components/sections/home/StrategicEcosystem";
import FinalProjectCtaBanner from "@/components/sections/home/FinalProjectCtaBanner";

export default function HomePageLayout() {
  return (
    <div className="w-full bg-white dark:bg-brand-base text-gray-900 dark:text-white font-sans">
      <div id="hero" className="scroll-mt-28">
        <HeroSection />
      </div>
      <div id="paradigm-shift" className="scroll-mt-28">
        <ParadigmShift />
      </div>
      <div id="deployment-models" className="scroll-mt-28">
        <DeploymentModels />
      </div>
      <div id="execution-pipeline" className="scroll-mt-28">
        <ExecutionPipeline />
      </div>
      <div id="system-benchmarks" className="scroll-mt-28">
        <SystemBenchmarks />
      </div>
      <div id="core-architects" className="scroll-mt-28">
        <CoreArchitects />
      </div>
      <div id="strategic-ecosystem" className="scroll-mt-28">
        <StrategicEcosystem />
      </div>
      <div id="project-consultation" className="scroll-mt-28">
        <FinalProjectCtaBanner />
      </div>
    </div>
  );
}
