import { motion } from 'framer-motion';

export default function TechStackSection() {
  const categories = [
    {
      title: "Core Automation & Development Stack",
      tagline: "Programmatic control over manual workflows.",
      skills: [
        { name: "Python", desc: "Automated Parameter Injection & Bulk Processing" },
        { name: "C# & Revit API", desc: "Custom Code & Rule-Based Logic" },
        { name: "Dynamo / pyRevit", desc: "Visual Scripting & Rapid Prototyping" },
        { name: "Autodesk APS (Forge)", desc: "Cloud Automation & CDE Integration" },
        { name: "REST APIs", desc: "Cross-Platform Data Synchronization" },
        { name: "SQL / PostgreSQL", desc: "Relational BIM Database Management" },
        { name: "LangChain (RAG)", desc: "Automated BEP/EIR Document Auditing" },
      ]
    },
    {
      title: "Engineering & BIM Platforms",
      tagline: "ISO-compliant authoring and clash resolution.",
      skills: [
        { name: "Autodesk Revit", desc: "Multidisciplinary 3D Coordination" },
        { name: "Navisworks Manage", desc: "Advanced Clash Detection & Federated Models" },
        { name: "Solibri Office", desc: "Automated Code Checking & QA/QC" },
        { name: "PriMus-IFC / CostX", desc: "Dynamic 5D Quantity Take-off" },
        { name: "Synchro PRO", desc: "4D Construction Sequencing" },
        { name: "ReCap Pro", desc: "Point Cloud-to-BIM Conversion" },
      ]
    },
    {
      title: "CDE, Cloud & Data Management",
      tagline: "Secure, centralized Single Source of Truth (SSOT).",
      skills: [
        { name: "Autodesk Construction Cloud", desc: "Cloud Worksharing & CDE Hosting" },
        { name: "dRofus", desc: "Master Data & Room Requirements Management" },
        { name: "BIMcollab / Dalux", desc: "Cloud-Based Issue Tracking (BCF)" },
        { name: "Power BI", desc: "Live Project Analytics & Clash Dashboards" },
        { name: "Speckle", desc: "Open Data Infrastructure & Version Control" },
      ]
    },
    {
      title: "Standards & OpenBIM Protocols",
      tagline: "Strict compliance with EU & UK mandates.",
      skills: [
        { name: "ISO 19650", desc: "International Information Management Framework" },
        { name: "UNI 11337", desc: "Italian National BIM Mandates" },
        { name: "IFC (ISO 16739) & BCF", desc: "OpenBIM Interoperability Formats" },
        { name: "COBie", desc: "Standardized Facility Management Handover" },
        { name: "Decreto BIM (D.M. 560/312)", desc: "Italian Public Procurement Compliance" },
        { name: "EIR, BEP & MIDP", desc: "Strategic Information Delivery Planning" },
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
            <div key={index} className="bg-[#171717] border border-[#262626] p-6 rounded-xl hover:border-[#3B82F6] transition-colors duration-300 flex flex-col justify-between">
              <div>
                <h4 className="text-[#FAFAFA] font-semibold text-base leading-snug mb-1">{category.title}</h4>
                <p className="text-[#3B82F6] text-xs font-mono italic mb-5 pb-3 border-b border-[#262626]">{category.tagline}</p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
