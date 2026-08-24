"use client";

import Link from "@/components/LocalizedLink";
import { ArrowRight, Code2, Cpu, Cog, Briefcase, Terminal } from "lucide-react";

export default function AboutPageLayout() {
  return (
    <div className="w-full bg-brand-base">
      {/* SECTION 1: Hero Section (The Manifesto) */}
      <section id="manifesto" className="relative flex min-h-[85vh] items-center justify-center overflow-hidden border-b border-brand-border bg-brand-surface pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10 py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-8 backdrop-blur-sm shadow-sm">
            <Terminal className="w-4 h-4" /> THE MANIFESTO
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-textPrimary tracking-tight mb-8">
            We are engineers who speak the <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">language of machines.</span>
          </h1>
          <h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-4xl mx-auto font-medium">
            We are not just another BIM studio; we are a software development lab for the AEC industry. Our mission is to eliminate human error and automate repetitive workflows in complex construction projects.
          </h2>
        </div>
      </section>

      {/* SECTION 2: Who We Are (Split Design Layout) */}
      <section className="bg-brand-base w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            
            {/* The Traditional Way */}
            <div className="rounded-3xl border border-red-200 bg-white p-10 md:p-14 relative overflow-hidden group hover:border-red-300 transition-colors shadow-sm">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 blur-[80px] rounded-full group-hover:bg-red-100 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100">
                    <Cog className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary">The Traditional Way</h3>
                </div>
                <p className="text-brand-textSecondary text-lg leading-relaxed font-medium">
                  "The industry wastes thousands of hours on manual clicks, visual clash detection, and redundant data entry. This drains both time and budget."
                </p>
              </div>
            </div>

            {/* Our Approach */}
            <div className="rounded-3xl border border-brand-primary/20 bg-white p-10 md:p-14 relative overflow-hidden group shadow-lg hover:shadow-xl hover:border-brand-primary/40 transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary">Our Approach</h3>
                </div>
                <p className="text-brand-textSecondary text-lg leading-relaxed font-medium">
                  "We believe that if a task is done twice in Revit, it deserves a script. Our team blends Senior BIM Managers with Full-Stack Developers, leveraging Python and custom APIs to make the impossible possible."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Our Journey (Vertical Timeline Component) */}
      <section id="journey" className="bg-brand-surface w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-6">Our Journey</h2>
            <p className="text-brand-textSecondary text-lg font-medium">The evolution from manual coordination to automated engineering.</p>
          </div>
          
          <div className="relative space-y-24 md:space-y-32">
            {/* Vertical Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-border md:-translate-x-1/2" />
            
            {/* Phase 1 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 1</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Operational Bottleneck</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  Managing complex BIM projects exposed a systemic industry flaw: highly skilled engineers waste up to 40% of their billable hours on repetitive data entry, parameter mapping, and manual quality control.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:pr-16 md:text-right">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 2</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Algorithmic Shift</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  Instead of scaling through headcount, we transitioned to code. By integrating Python, C#, and Revit APIs into our core workflow, we replaced manual drafting with programmatic execution, reducing processing time from days to seconds.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-brand-primary border-2 border-brand-primary shadow-[0_0_0_6px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.3)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 3</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Hybrid B2B Agency</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  Today, pyBIM operates as a silent technical partner for AEC firms. We deliver zero-error BIM coordination and develop the custom software infrastructure required to scale your project capacity without increasing overhead.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Tech Stack & Standards (Logo & Engineering Arsenal Grid) */}
      <section id="tech-stack" className="bg-brand-base w-full border-b border-brand-border py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
              <Cpu className="w-3.5 h-3.5" /> 3D to 10D BIM Dimensions & Tech Arsenal
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
              The tools & standards we use to engineer the process.
            </h2>
            <p className="text-brand-textSecondary text-base md:text-lg font-medium">
              From 3D geometric modeling and 4D/5D time-cost estimation to 10D Digital Twins, local AI models, and ISO/UNI compliance.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* 1. ENGINEERING TOOLS */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between border-b border-brand-border pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block mb-1">01. SOFTWARE & COORDINATION</span>
                    <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
                      <Cog className="w-5 h-5 text-brand-primary" /> Engineering Tools
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">
                    13 Tools
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Autodesk Revit", tag: "BIM 3D / 7D", desc: "3D geometric modeling & foundation for sustainability & energy analysis" },
                    { name: "Navisworks Manage", tag: "BIM 3D / 4D", desc: "Clash detection, 3D coordination & 4D time/Gantt chart integration" },
                    { name: "ACC (Autodesk Construction Cloud)", tag: "BIM 6D CDE", desc: "Common Data Environment for As-Built models & Facility Management" },
                    { name: "PriMus-IFC", tag: "BIM 5D AI", desc: "AI-driven dynamic quantity surveying & automatic cost estimation" },
                    { name: "ReCap Pro / Point Cloud", tag: "Scan-to-BIM", desc: "Laser scan & drone point cloud processing into BIM models" },
                    { name: "Solibri Office", tag: "Quality Audit", desc: "Rule-based automated model checking & geometric/data QA" },
                    { name: "BIMcollab / Dalux", tag: "Issue Mgmt", desc: "Cloud-based BCF issue tracking & multi-party collaboration" },
                    { name: "Synchro PRO", tag: "BIM 4D Simulation", desc: "4D construction sequence simulation & advanced scheduling" },
                    { name: "dRofus", tag: "Data Mgmt", desc: "Centralized spatial data, room functional specs & equipment management" },
                    { name: "Tekla Structures", tag: "LOD 400 Structural", desc: "High-detail steel & reinforced concrete structural modeling" },
                    { name: "Civil 3D / InfraWorks", tag: "GIS & Infra", desc: "Infrastructure modeling, terrain analysis & GIS data exchange" },
                    { name: "CostX", tag: "BIM 5D Cost", desc: "Dynamic 2D/3D quantity takeoff & cost estimation engine" },
                    { name: "Revizto", tag: "VR & Coordination", desc: "2D/3D VR coordination environment & real-time clash tracking" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary group-hover:text-brand-primary transition-colors">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. DEVELOPMENT STACK */}
            <div className="rounded-3xl bg-white border border-brand-primary/30 shadow-lg p-8 flex flex-col justify-between relative group hover:border-brand-primary/50 transition-all">
              <div className="absolute inset-0 bg-brand-primary/[0.02] rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-brand-primary/20 pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block mb-1">02. CODE & AUTOMATION</span>
                    <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-brand-primary" /> Development Stack
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
                    12 Techs
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "Python", tag: "Core Automation", desc: "Data cleaning, parameter management & bulk model automation core" },
                    { name: "Dynamo & pyRevit", tag: "Revit Scripting", desc: "Visual & text Python scripting for Revit modeling automation" },
                    { name: "C# & Revit API", tag: "Deep Plugins", desc: "Native plugin development & external data integration add-ins" },
                    { name: "REST APIs", tag: "BIM 10D / Digital Twin", desc: "Real-time IoT sensors & Smart City Digital Twin data integration" },
                    { name: "Autodesk Platform Services (APS)", tag: "Cloud Web BIM", desc: "Cloud app development & web BIM data processing (Forge)" },
                    { name: "Power BI", tag: "Data Viz", desc: "Custom project management analytics dashboards from BIM data" },
                    { name: "Speckle", tag: "Open Data Stream", desc: "Open-source real-time data streaming & database infrastructure" },
                    { name: "FastAPI / Node.js", tag: "Backend APIs", desc: "Custom backend architecture for network automation APIs" },
                    { name: "React.js / Next.js", tag: "Web Portals", desc: "Custom client web dashboards for real-time model monitoring" },
                    { name: "SQL / PostgreSQL", tag: "BIM Database", desc: "Relational database for thousands of BIM element parameters" },
                    { name: "IFC.js", tag: "Browser 3D", desc: "In-browser 3D BIM rendering without desktop software" },
                    { name: "LangChain & ChromaDB", tag: "AI / RAG", desc: "Local AI infrastructure for automated BEP/EIR document processing" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-primary/5 border border-brand-primary/15 hover:bg-white hover:border-brand-primary/40 hover:shadow-sm transition-all group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary group-hover:text-brand-primary transition-colors">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-brand-primary text-white">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. STANDARDS */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between border-b border-brand-border pb-6 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block mb-1">03. COMPLIANCE & OPENBIM</span>
                    <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-brand-primary" /> Standards & Protocols
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">
                    12 Standards
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: "ISO 19650", tag: "Global Standard", desc: "International framework for Information Management across building lifecycles" },
                    { name: "UNI 11337", tag: "Italian Standard", desc: "Italian national standard for project validation, LOD & public tenders" },
                    { name: "COBie", tag: "BIM 6D / FM", desc: "Construction Operations Building Information Exchange for Facility Management" },
                    { name: "EIR / BEP", tag: "BIM 8D / 9D", desc: "Employer Information Requirements & BEP protocols (Safety 8D, Lean 9D)" },
                    { name: "IFC (ISO 16739)", tag: "OpenBIM", desc: "Universal open format for vendor-neutral engineering data exchange" },
                    { name: "BCF (BIM Collaboration Format)", tag: "OpenBIM Protocol", desc: "Standardized issue reporting & clash communication protocol" },
                    { name: "Decreto BIM (D.M. 560 & 312)", tag: "Italian Mandate", desc: "Italian legal mandates for BIM implementation in public works" },
                    { name: "LOD / LOIN (EN 17412)", tag: "Level of Need", desc: "Level of Development & Information Need specification protocols" },
                    { name: "OmniClass / MasterFormat / UniClass", tag: "Classification", desc: "International classification & coding systems for BIM elements" },
                    { name: "MIDP / TIDP", tag: "ISO 19650 Delivery", desc: "Master & Task Information Delivery Plans for project workflows" },
                    { name: "bsDD (buildingSMART Data Dict)", tag: "Data Dictionary", desc: "Global dictionary for semantic interoperability in OpenBIM" },
                    { name: "IDM (ISO 29481)", tag: "Workflow Standard", desc: "Information Delivery Manual standard for defining exchange processes" },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary group-hover:text-brand-primary transition-colors">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Our Impact (Stats/Counters) */}
      <section id="impact" className="bg-brand-surface w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-3">
            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                +10,000
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">
                Hours saved through custom automation
              </div>
            </div>
            
            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                100%
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">
                Algorithmic precision <br />(Zero human error)
              </div>
            </div>

            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                +500
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto">
                Custom scripts and plugins deployed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Call to Action (Two side-by-side cards) */}
      <section className="bg-brand-base w-full py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            
            {/* Card 1 For Clients */}
            <div className="rounded-[2.5rem] border border-brand-border bg-white shadow-lg p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-primary/5 transition-colors" />
              <div className="relative z-10 w-full">
                <Briefcase className="w-12 h-12 text-brand-primary/60 mb-10 group-hover:text-brand-primary transition-colors" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">
                  Are your company's BIM workflows slowing you down? Let's optimize them.
                </h3>
              </div>
              <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-surface px-8 py-4 font-bold text-brand-textPrimary hover:bg-white hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Card 2 For Talent */}
            <div className="rounded-[2.5rem] border border-brand-primary/20 bg-white shadow-xl p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
              <div className="relative z-10 w-full">
                <Code2 className="w-12 h-12 text-brand-primary mb-10" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">
                  Are you an architect who fell in love with Python? You belong here.
                </h3>
              </div>
              <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-bold text-white hover:bg-brand-accentHover transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                Work With Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
