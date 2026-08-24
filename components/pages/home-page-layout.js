"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Code, Database, Cpu, Layers, CheckCircle2, ShieldCheck, Zap, Terminal, ExternalLink } from "lucide-react";
import ProjectsGrid from "@/components/ui/projects-grid";
import projectsData from "@/lib/data/projects-data.json";

export default function HomePageLayout() {
  return (
    <div className="w-full bg-brand-base text-brand-textPrimary">
      
      {/* 1. HERO SECTION WITH FULL VISIBLE BACKGROUND IMAGE & UNBOXED TEXT */}
      <section className="relative py-28 md:py-36 px-6 lg:px-8 w-full bg-brand-base overflow-hidden border-b border-brand-border">
        {/* Full Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/Pictures/BIM/bim-0080.jpg"
            alt="BIM Engineering Background"
            className="w-full h-full object-cover opacity-35 mix-blend-multiply scale-105"
          />
          {/* Gradient fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-base via-brand-base/80 to-brand-base/30" />
          {/* Center glow radial shadow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl flex flex-col items-start text-left">
            
            {/* Top Tech Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
              <Terminal className="w-3.5 h-3.5" />
              <span>ENGINEERING AUTOMATION & OPEN BIM</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold text-brand-textPrimary tracking-tight leading-[1.1] mb-6">
              Engineering the Future of <span className="text-brand-primary">BIM & Custom Code.</span>
            </h1>

            {/* Hero Sub-title */}
            <p className="text-brand-textSecondary text-lg sm:text-xl font-medium leading-relaxed max-w-2xl mb-10">
              Programmatic coordination, Revit API plugins, and ISO 19650 & UNI 11337 compliance engineered for high-precision European AEC firms.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-gray-50 border border-brand-border text-brand-textPrimary font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <span>Request Audit</span>
              </Link>
            </div>

            {/* Stat Bar with ISO 19650 & UNI 11337 */}
            <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-brand-border/80 w-full text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-textPrimary font-mono">100%</div>
                <div className="text-xs text-brand-textSecondary uppercase tracking-widest font-semibold mt-1">Data Accuracy</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-primary font-mono">+10,000h</div>
                <div className="text-xs text-brand-textSecondary uppercase tracking-widest font-semibold mt-1">Hours Saved</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-600 font-mono">ISO 19650 & UNI 11337</div>
                <div className="text-xs text-brand-textSecondary uppercase tracking-widest font-semibold mt-1">Certified Compliance</div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. THE 3 CORE PILLARS GATEWAY (WITH CARD THUMBNAILS) */}
      <section className="py-24 bg-brand-surface border-y border-brand-border px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              CORE SPECIALIZATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mt-4">
              Three Pillars of Engineering Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white border border-brand-border hover:border-brand-primary rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="/Pictures/BIM/bim-0080.jpg"
                  alt="Algorithmic Engineering"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-yellow-400/90 text-slate-900 flex items-center justify-center shadow-md">
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="p-8 pt-2 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-3">Algorithmic Engineering</h3>
                  <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                    Rule-based 3D clash resolution, point cloud processing (Scan-to-BIM), 4D sequencing, and dynamic 5D QTO cost extraction.
                  </p>
                </div>
                <Link
                  href="/services/algorithmic-engineering"
                  className="inline-flex items-center gap-2 text-xs font-bold text-yellow-600 uppercase tracking-widest hover:gap-3 transition-all mt-4"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white border border-brand-border hover:border-brand-primary rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="/Pictures/Uncategorized/uncategorized-005.jpg"
                  alt="Code & Automation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center shadow-md">
                  <Code className="w-5 h-5" />
                </div>
              </div>

              <div className="p-8 pt-2 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-3">Code & Automation</h3>
                  <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                    Bespoke C# Revit API Add-ins, Python data pipelines, pyRevit toolbars, and firm-wide Dynamo graph standardization.
                  </p>
                </div>
                <Link
                  href="/services/code-automation"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest hover:gap-3 transition-all mt-4"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white border border-brand-border hover:border-brand-primary rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-1">
              <div className="h-44 relative overflow-hidden">
                <img
                  src="/Pictures/BIM/bim-0032.jpg"
                  alt="CDE & Lifecycle Data"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Database className="w-5 h-5" />
                </div>
              </div>

              <div className="p-8 pt-2 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold text-brand-textPrimary mb-3">CDE & Lifecycle Data</h3>
                  <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                    COBie asset schedules, Autodesk Construction Cloud (ACC) CDE administration, and API bridges for Digital Twins.
                  </p>
                </div>
                <Link
                  href="/services/cde-lifecycle-data"
                  className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-widest hover:gap-3 transition-all mt-4"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. TECHNICAL ARSENAL TEASER WITH IMAGE OVERLAY */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0A0A0A] border border-[#262626] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8 relative z-10">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4 inline-block">
              TECH STACK & STANDARDS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Engineered with 37+ Industry-Standard Tools & Protocols
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-2xl">
              We leverage Revit API, C#, Python, Solibri, and OpenBIM specifications (ISO 19650 / UNI 11337) to deliver zero-error constructible models.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {["Python", "C# / .NET", "Revit API", "Autodesk APS", "Solibri", "Navisworks", "Synchro PRO", "ISO 19650", "UNI 11337", "COBie"].map((tool, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#1A1A1A] border border-[#333] text-xs font-mono text-gray-300 font-semibold">
                  {tool}
                </span>
              ))}
            </div>

            <Link
              href="/about#tech-stack"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>View Full Technical Arsenal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Overlay Image */}
          <div className="lg:col-span-4 relative h-64 lg:h-full rounded-2xl overflow-hidden border border-[#262626]">
            <img
              src="/Pictures/BIM/bim-0071.jpg"
              alt="BIM Engineering Software Stack"
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
          </div>

        </div>
      </section>


      {/* 4. THE ALGORITHMIC EDGE (COMPARISON) */}
      <section className="py-20 bg-brand-surface border-y border-brand-border px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              PARADIGM SHIFT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mt-4">
              Traditional Modeling vs. pyBIM Automation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-white border border-red-200 rounded-3xl p-8 shadow-sm">
              <div className="text-red-600 font-mono text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                TRADITIONAL MANUAL WORKFLOW
              </div>
              <ul className="space-y-4 text-brand-textSecondary text-sm font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span> Slow, manual 3D clash resolution prone to human oversight.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span> Thousands of billable hours wasted on repetitive parameter entry.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span> High risk of public tender rejection due to non-compliant COBie data.
                </li>
              </ul>
            </div>

            {/* pyBIM Engine */}
            <div className="bg-white border border-emerald-300 rounded-3xl p-8 shadow-sm relative overflow-hidden">
              <div className="text-emerald-700 font-mono text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                pyBIM PROGRAMMATIC ENGINE
              </div>
              <ul className="space-y-4 text-brand-textPrimary text-sm font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Programmatic clash grouping, automated BCF routing & zero-error QA.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> Instantaneous C# & Python parameter injection pipelines.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> 100% compliance with ISO 19650, UNI 11337 & European BIM mandates.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* 5. FEATURED PROJECTS SHOWCASE */}
      <section className="py-24 bg-brand-base px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              FEATURED CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mt-4">
              Proven Engineering Execution
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-widest hover:gap-3 transition-all"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProjectsGrid projects={projectsData} />
      </section>


      {/* 6. ENTERPRISE CALL TO ACTION WITH BACKGROUND IMAGE */}
      <section className="relative py-28 bg-[#0A0A0A] text-white border-t border-[#262626] px-6 lg:px-8 text-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Pictures/BIM/bim-0022.jpg"
            alt="Engineering Infrastructure"
            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
            TECHNICAL CONSULTATION
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-6">
            Ready to Automate Your BIM Workflows?
          </h2>
          <p className="text-gray-400 text-lg font-medium max-w-xl mb-10">
            Schedule a technical consultation or request a demo of our custom Revit API plugins and Python pipelines.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-bold text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            <span>Get in Touch With Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
