"use client";

import Link from "@/components/LocalizedLink";
import { ArrowRight, Code, Database, Cpu, Layers, CheckCircle2, ShieldCheck, Zap, Terminal, ExternalLink } from "lucide-react";
import ProjectsGrid from "./projects-grid";
import projectsData from "@/lib/data/projects-data.json";

export default function HomePageLayout() {
  return (
    <div className="w-full bg-[#0A0A0A] text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-28 md:py-36 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Ambient Radial Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#3B82F6]/20 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Top Tech Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#3B82F6] font-mono text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>ENGINEERING AUTOMATION & OPEN BIM</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight max-w-5xl leading-[1.1] mb-6">
          Engineering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">BIM & Custom Code.</span>
        </h1>

        {/* Hero Sub-title */}
        <p className="text-gray-400 text-lg sm:text-xl font-medium max-w-3xl leading-relaxed mb-10">
          Programmatic coordination, Revit API plugins, and ISO 19650 compliance engineered for high-precision European AEC firms.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16">
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#171717] hover:bg-[#262626] border border-[#262626] hover:border-[#3B82F6]/50 text-gray-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300"
          >
            <span>Request Audit</span>
          </Link>
        </div>

        {/* Stat Bar */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-[#262626] w-full max-w-2xl text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Data Accuracy</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 font-mono">+10,000h</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Hours Saved</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">ISO 19650</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mt-1">Certified Compliant</div>
          </div>
        </div>
      </section>


      {/* 2. THE 3 CORE PILLARS GATEWAY */}
      <section className="py-24 bg-[#0F0F0F] border-y border-[#262626] px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              CORE SPECIALIZATIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-4">
              Three Pillars of Engineering Excellence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-[#171717] border border-[#262626] hover:border-[#3B82F6]/50 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-6 text-yellow-400">
                  <Layers className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Algorithmic Engineering</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
                  Rule-based 3D clash resolution, point cloud processing (Scan-to-BIM), 4D sequencing, and dynamic 5D QTO cost extraction.
                </p>
              </div>
              <Link
                href="/services/algorithmic-engineering"
                className="inline-flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-widest hover:gap-3 transition-all mt-4"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#171717] border border-[#262626] hover:border-[#3B82F6]/50 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                  <Code className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Code & Automation</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
                  Bespoke C# Revit API Add-ins, Python data pipelines, pyRevit toolbars, and firm-wide Dynamo graph standardization.
                </p>
              </div>
              <Link
                href="/services/code-automation"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest hover:gap-3 transition-all mt-4"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group bg-[#171717] border border-[#262626] hover:border-[#3B82F6]/50 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                  <Database className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">CDE & Lifecycle Data</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
                  COBie asset schedules, Autodesk Construction Cloud (ACC) CDE administration, and API bridges for Digital Twins.
                </p>
              </div>
              <Link
                href="/services/cde-lifecycle-data"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest hover:gap-3 transition-all mt-4"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 3. TECHNICAL ARSENAL TEASER */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-[#262626] rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-4 inline-block">
              TECH STACK & STANDARDS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Engineered with 37+ Industry-Standard Tools & Protocols
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              We leverage Revit API, C#, Python, Solibri, and OpenBIM specifications (ISO 19650 / UNI 11337) to deliver zero-error constructible models.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {["Python", "C# / .NET", "Revit API", "Autodesk APS", "Solibri", "Navisworks", "Synchro PRO", "ISO 19650", "UNI 11337", "COBie"].map((tool, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-xl bg-[#1F1F1F] border border-[#333] text-xs font-mono text-gray-300 font-semibold">
                  {tool}
                </span>
              ))}
            </div>

            <Link
              href="/about#tech-stack"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>View Full Technical Arsenal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* 4. THE ALGORITHMIC EDGE (COMPARISON) */}
      <section className="py-20 bg-[#0F0F0F] border-y border-[#262626] px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              PARADIGM SHIFT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-4">
              Traditional Modeling vs. pyBIM Automation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="bg-[#141414] border border-red-500/20 rounded-3xl p-8">
              <div className="text-red-400 font-mono text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                TRADITIONAL MANUAL WORKFLOW
              </div>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span> Slow, manual 3D clash resolution prone to human oversight.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span> Thousands of billable hours wasted on repetitive parameter entry.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✕</span> High risk of public tender rejection due to non-compliant COBie data.
                </li>
              </ul>
            </div>

            {/* pyBIM Engine */}
            <div className="bg-[#141414] border border-emerald-500/30 rounded-3xl p-8 relative overflow-hidden">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                pyBIM PROGRAMMATIC ENGINE
              </div>
              <ul className="space-y-4 text-gray-200 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Programmatic clash grouping, automated BCF routing & zero-error QA.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> Instantaneous C# & Python parameter injection pipelines.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> 100% compliance with ISO 19650, UNI 11337 & European BIM mandates.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* 5. FEATURED PROJECTS SHOWCASE */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              FEATURED CASE STUDIES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-4">
              Proven Engineering Execution
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#3B82F6] uppercase tracking-widest hover:gap-3 transition-all"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProjectsGrid projects={projectsData} />
      </section>


      {/* 6. ENTERPRISE CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-b from-[#0F0F0F] to-[#050505] border-t border-[#262626] px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
            TECHNICAL CONSULTATION
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">
            Ready to Automate Your BIM Workflows?
          </h2>
          <p className="text-gray-400 text-lg font-medium max-w-xl mb-10">
            Schedule a technical consultation or request a demo of our custom Revit API plugins and Python pipelines.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-base uppercase tracking-wider transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] hover:-translate-y-1"
          >
            <span>Get in Touch With Us</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
