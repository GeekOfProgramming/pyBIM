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
      <HeroSection />
      <ParadigmShift />
      <DeploymentModels />
      <ExecutionPipeline />
      <SystemBenchmarks />
      <CoreArchitects />
      <StrategicEcosystem />
      <FinalProjectCtaBanner />
    </div>
  );
}
