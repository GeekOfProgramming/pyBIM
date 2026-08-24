import { motion } from 'framer-motion';

export default function TechStackSection() {
  const categories = [
    {
      title: "01. Core Automation & Scripts",
      tagline: "Programmatic execution to eliminate manual bottlenecks.",
      skills: [
        { name: "Automated Parameter Injection", desc: "Bulk data mapping and entry utilizing Python." },
        { name: "Workflow Scripting", desc: "Visual and text-based automation via Dynamo and pyRevit." },
        { name: "Algorithmic Auditing", desc: "Automated rule-based model checking for zero-error delivery." },
        { name: "API Integration", desc: "Connecting geometric models to external relational databases." },
        { name: "Custom Add-in Development", desc: "Proprietary C#/.NET tool creation addressing firm-specific structural constraints." },
        { name: "Batch Documentation Generation", desc: "Automated creation of views, sheets, and viewport alignments." },
        { name: "Data Extraction Pipelines", desc: "Programmatic export of model metadata directly to SQL databases or BI platforms." },
      ]
    },
    {
      title: "02. 3D/4D/5D Rapid Delivery",
      tagline: "High-speed coordination, sequencing, and dynamic estimation.",
      skills: [
        { name: "Algorithmic Clash Resolution (3D)", desc: "Automated clash detection, grouping, and BCF routing." },
        { name: "Scan-to-BIM & As-Built", desc: "Conversion of point cloud data to precise LOD-compliant models." },
        { name: "Construction Sequencing (4D)", desc: "Linking federated models to Gantt charts for visual planning." },
        { name: "Dynamic Costing (5D)", desc: "Automated Quantity Take-Off (QTO) for real-time budget control." },
        { name: "Federated Model Assembly", desc: "Structuring multi-disciplinary matrices for unified coordination." },
        { name: "Automated Model Upgrades", desc: "Algorithmic escalation of LOD 200 elements to fabrication-ready LOD 400." },
        { name: "Constructability Mock-ups", desc: "Virtual testing of spatial tolerances prior to site execution." },
      ]
    },
    {
      title: "03. 6D+ Lifecycle & Operations",
      tagline: "Structuring asset data for post-construction facility management.",
      skills: [
        { name: "COBie & FM Handover (6D)", desc: "Extraction and formatting of asset data for maintenance integration." },
        { name: "Energy Analysis Prep (7D)", desc: "Structuring spatial boundaries and thermal properties for LCA." },
        { name: "CDE Management", desc: "Maintaining the Single Source of Truth within cloud environments." },
        { name: "Digital Twin Baselines", desc: "Establishing geometric and data foundations for IoT sensors." },
        { name: "As-Built Verification", desc: "Reconciling final contractor deviations with the central BIM database." },
        { name: "Asset & Space Management", desc: "Synchronizing spatial logic and equipment schedules utilizing dRofus." },
      ]
    },
    {
      title: "04. Compliance & BIM Mandates",
      tagline: "Strict alignment with EU, UK, and Italian legal frameworks.",
      skills: [
        { name: "ISO 19650 Execution", desc: "International information management and delivery protocols." },
        { name: "UNI 11337 Validation", desc: "Italian National BIM standardization and public tender compliance." },
        { name: "EIR & BEP Alignment", desc: "Execution of models according to strategic project documentation." },
        { name: "OpenBIM Interoperability", desc: "Vendor-neutral data exchange utilizing IFC and BCF formats." },
        { name: "Classification Mapping", desc: "Automated assignment of OmniClass, UniClass, or MasterFormat codes." },
        { name: "Model Health Dashboards", desc: "Real-time Power BI reporting on data compliance and coordination progress." },
        { name: "LOIN Validation", desc: "Auditing Level of Information Need against contractual data requirements." },
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
