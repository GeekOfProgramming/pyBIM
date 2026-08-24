import { motion } from 'framer-motion';

export default function TechStackSection() {
  const categories = [
    {
      title: "Core Automation & Code",
      skills: ["Python", "C#", "Dynamo", "pyRevit", "Autodesk Forge (APS)", "REST APIs"]
    },
    {
      title: "3D/4D/5D Engines",
      skills: ["Autodesk Revit", "Navisworks Manage", "Solibri", "Synchro 4D"]
    },
    {
      title: "Advanced Dimensions (6D-11D)",
      skills: ["One Click LCA", "dRofus / COBie", "Autodesk Tandem", "PowerBI"]
    },
    {
      title: "CDE & Scan-to-BIM",
      skills: ["Autodesk Construction Cloud", "BIMcollab", "ReCap Pro", "Leica Cyclone"]
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
