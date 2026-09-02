"use client";

import { Cpu, Server, Network } from "lucide-react";
import homeData from "@/lib/data/home-page-data.json";

export default function DeploymentModels() {
  const data = homeData.deploymentModels;

  const iconMap = {
    edge: <Cpu className="w-6 h-6 text-blue-600" />,
    enterprise: <Network className="w-6 h-6 text-purple-600" />,
    cloud: <Server className="w-6 h-6 text-emerald-600" />
  };

  const colorMap = {
    edge: "bg-blue-100 group-hover:border-blue-300 text-blue-600",
    enterprise: "bg-purple-100 group-hover:border-purple-300 text-purple-600",
    cloud: "bg-emerald-100 group-hover:border-emerald-300 text-emerald-600"
  };

  return (
    <section className="py-24 px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {data.section_title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.section_subtitle}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {data.models.map((model) => (
            <div key={model.id} className={`bg-gray-50 border border-gray-100 rounded-2xl p-8 transition-colors group shadow-sm hover:border-${model.id === 'edge' ? 'blue' : model.id === 'enterprise' ? 'purple' : 'emerald'}-300`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${model.id === 'edge' ? 'bg-blue-100' : model.id === 'enterprise' ? 'bg-purple-100' : 'bg-emerald-100'}`}>
                {iconMap[model.id]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{model.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {model.description}
              </p>
              <div className={`text-xs font-mono uppercase tracking-wider ${model.id === 'edge' ? 'text-blue-600' : model.id === 'enterprise' ? 'text-purple-600' : 'text-emerald-600'}`}>
                {model.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
