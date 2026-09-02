"use client";

import HeroSection from "@/components/sections/home/HeroSection";
import ParadigmShift from "@/components/sections/home/ParadigmShift";
import DeploymentModels from "@/components/sections/home/DeploymentModels";
import ExecutionPipeline from "@/components/sections/home/ExecutionPipeline";
import SystemBenchmarks from "@/components/sections/home/SystemBenchmarks";
import CoreArchitects from "@/components/sections/home/CoreArchitects";
import StrategicEcosystem from "@/components/sections/home/StrategicEcosystem";
import ValidationProtocol from "@/components/sections/home/ValidationProtocol";

export default function HomePageLayout() {
  return (
    <div className="w-full bg-white text-gray-900 font-sans selection:bg-blue-500/30">
      <HeroSection />
      <ParadigmShift />
      <DeploymentModels />
      <ExecutionPipeline />
      <SystemBenchmarks />
      <CoreArchitects />
      <StrategicEcosystem />
      <ValidationProtocol />
    </div>
  );
}
