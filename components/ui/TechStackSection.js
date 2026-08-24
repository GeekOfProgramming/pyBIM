import { motion } from 'framer-motion';

export default function TechStackSection() {
  const categories = [
    {
      title: "Core Automation & Code (BIM 8D-10D)",
      skills: ["Python", "C# & Revit API", "Dynamo & pyRevit", "Autodesk APS (Forge)", "REST APIs & IoT", "IFC.js & Web 3D", "LangChain & AI (RAG)"]
    },
    {
      title: "Engineering & 3D/4D/5D Tools",
      skills: ["Autodesk Revit (3D/7D)", "Navisworks Manage (4D)", "PriMus-IFC & CostX (5D)", "Solibri Office (QA Audit)", "Synchro PRO (4D)", "ReCap Pro (Scan-to-BIM)", "BIMcollab / Dalux", "Tekla Structures"]
    },
    {
      title: "CDE, Data & Cloud (BIM 6D)",
      skills: ["Autodesk Construction Cloud (ACC)", "dRofus (Spatial Data)", "Power BI (Analytics)", "Speckle (Open Data)", "SQL / PostgreSQL", "Revizto (VR)"]
    },
    {
      title: "Standards & OpenBIM Protocols",
      skills: ["ISO 19650 (Information Mgmt)", "UNI 11337 (Italian Standard)", "COBie (Facility Mgmt)", "IFC (ISO 16739) & BCF", "Decreto BIM (D.M. 560/312)", "EIR / BEP (Safety 8D, Lean 9D)", "bsDD & IDM (ISO 29481)"]
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-16 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-[#3B82F6] font-mono text-sm tracking-widest uppercase mb-2">// Powered by Custom Code</h3>
          <h2 className="text-[#FAFAFA] text-3xl font-bold">Our Technical Arsenal</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-[#171717] border border-[#262626] p-6 rounded-xl hover:border-[#3B82F6] transition-colors duration-300">
              <h4 className="text-[#FAFAFA] font-semibold mb-4">{category.title}</h4>
              <ul className="space-y-2">
                {category.skills.map((skill, i) => (
                  <li key={i} className="text-[#A3A3A3] text-sm flex items-center">
                    <span className="text-[#3B82F6] mr-2">▹</span> {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
