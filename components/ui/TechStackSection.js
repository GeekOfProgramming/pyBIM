import { motion } from 'framer-motion';

export default function TechStackSection() {
  const categories = [
    {
      title: "Core Automation & Development Stack",
      skills: [
        { name: "Python", desc: "Data Processing & Bulk Automation" },
        { name: "C# & Revit API", desc: "Custom Engineering Plugins" },
        { name: "Dynamo & pyRevit", desc: "Visual Scripting & Workflow Automation" },
        { name: "Autodesk APS (Forge)", desc: "Cloud Data Extraction & Integration" },
        { name: "REST APIs & Webhooks", desc: "System Connectivity & IoT" },
        { name: "SQL / PostgreSQL", desc: "Relational BIM Database Management" },
        { name: "LangChain & AI", desc: "RAG-based Automated Document Auditing" },
      ]
    },
    {
      title: "Engineering & BIM Platforms",
      skills: [
        { name: "Autodesk Revit", desc: "Multidisciplinary 3D Coordination" },
        { name: "Navisworks Manage", desc: "Clash Detection & 4D Simulation" },
        { name: "Solibri Office", desc: "Rule-based Model Checking & QA/QC" },
        { name: "PriMus-IFC & CostX", desc: "Dynamic 5D Quantity Take-off" },
        { name: "Synchro PRO", desc: "Advanced Construction Scheduling" },
        { name: "ReCap Pro", desc: "Point Cloud Processing (Scan-to-BIM)" },
        { name: "Tekla Structures", desc: "Structural Detailing (LOD 400)" },
      ]
    },
    {
      title: "CDE, Cloud & Data Management",
      skills: [
        { name: "Autodesk Construction Cloud (ACC)", desc: "Common Data Environment" },
        { name: "dRofus", desc: "Spatial & Equipment Data Management" },
        { name: "BIMcollab / Dalux", desc: "Cloud-based Issue Tracking & BCF" },
        { name: "Power BI", desc: "Project Analytics & Data Dashboards" },
        { name: "Speckle", desc: "Open Data Infrastructure & Version Control" },
        { name: "Revizto", desc: "Immersive VR & Visual Coordination" },
      ]
    },
    {
      title: "Standards & OpenBIM Protocols",
      skills: [
        { name: "ISO 19650", desc: "International Information Management Framework" },
        { name: "UNI 11337", desc: "Italian National BIM Standard" },
        { name: "IFC (ISO 16739) & BCF", desc: "OpenBIM Exchange Formats" },
        { name: "COBie", desc: "Facility Management Data Handover" },
        { name: "Decreto BIM (D.M. 560/312)", desc: "Italian Public Procurement Mandates" },
        { name: "EIR & BEP", desc: "Employer Requirements & Execution Planning" },
        { name: "bsDD & IDM (ISO 29481)", desc: "Data Dictionaries & Delivery Manuals" },
      ]
    }
  ];

  return (
    <section className="bg-[#0A0A0A] py-16 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h3 className="text-[#3B82F6] font-mono text-sm tracking-widest uppercase mb-2">// POWERED BY CUSTOM CODE</h3>
          <h2 className="text-[#FAFAFA] text-3xl font-bold">Our Technical Arsenal</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-[#171717] border border-[#262626] p-6 rounded-xl hover:border-[#3B82F6] transition-colors duration-300">
              <h4 className="text-[#FAFAFA] font-semibold mb-5 pb-3 border-b border-[#262626] text-base leading-snug">{category.title}</h4>
              <ul className="space-y-3.5">
                {category.skills.map((skill, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex items-start">
                      <span className="text-[#3B82F6] mr-2 shrink-0 font-bold">▹</span>
                      <div>
                        <span className="text-[#FAFAFA] font-semibold block leading-tight">{skill.name}</span>
                        <span className="text-[#A3A3A3] text-xs font-normal block leading-snug mt-0.5">{skill.desc}</span>
                      </div>
                    </div>
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
