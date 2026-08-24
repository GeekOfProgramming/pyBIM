"use client";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Box, Code, Database, ChevronRight, HardHat, Building2, Factory, ShieldCheck, FileText, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TechStackSection from "@/components/ui/TechStackSection";
import ComplianceSection from "@/components/ui/ComplianceSection";
import BimCalculatorCta from "@/components/sections/bim-calculator-cta";
import FAQSection from "@/components/sections/faq-section";

export default function ServicesPageLayout() {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-brand-base">
      {/* SECTION 1: PAGE HEADER */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-brand-base">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_70%)]" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-brand-textPrimary text-center mb-8 tracking-tight max-w-5xl relative z-10">
          Our Services. <span className="text-brand-primary">Re-engineering the Building Process.</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-textSecondary text-center max-w-3xl font-medium leading-relaxed relative z-10">
          We don't just model. By integrating AI, Python programming, and BIM methodologies, we accelerate your projects and eliminate human error.
        </p>
      </section>

      <TechStackSection />

      {/* SECTION 2: 3 PILLARS (GRID) */}
      <section className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Card 1: Algorithmic Engineering */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-8">
                <Box className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Algorithmic Engineering</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                Execution of constructible models utilizing <strong className="text-brand-textPrimary font-bold">Navisworks</strong> and <strong className="text-brand-textPrimary font-bold">Solibri</strong>. Coordination cycles are accelerated through <strong className="text-brand-textPrimary font-bold">rule-based clash detection</strong> and <strong className="text-brand-textPrimary font-bold">programmatic BCF routing</strong>. Standard delivery encompasses <strong className="text-brand-textPrimary font-bold">Scan-to-BIM</strong>, <strong className="text-brand-textPrimary font-bold">4D sequencing</strong>, and dynamic <strong className="text-brand-textPrimary font-bold">5D QTO workflows</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">ALGORITHMIC COORDINATION</span>
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">SCAN-TO-BIM</span>
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">RULE-BASED QA</span>
              </div>
              <Link href="/services/algorithmic-engineering" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-yellow-400/30 text-yellow-600 font-bold hover:bg-yellow-400 hover:text-white hover:border-yellow-400 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                EXPLORE ENGINEERING <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Code & Automation */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden border-b-4 border-b-brand-primary">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
                <Code className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Code & Automation</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                Elimination of manual data entry and software limitations. Custom <strong className="text-brand-textPrimary font-bold">Python pipelines</strong> and <strong className="text-brand-textPrimary font-bold">C# Add-ins</strong> automate parameter injection, naming conventions, and repetitive modeling tasks. Execution times are reduced from multi-hour manual processes to <strong className="text-brand-textPrimary font-bold">immediate algorithmic outputs</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">PYTHON PIPELINES</span>
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">REVIT API</span>
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">AUTOMATED INJECTION</span>
              </div>
              <Link href="/services/code-automation" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-brand-primary/30 text-brand-primary font-bold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                REQUEST AUTOMATION <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: CDE & Lifecycle Data */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                <Database className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">CDE & Lifecycle Data</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                Structuring of geometric and metadata baselines for post-construction operations. Automated extraction of <strong className="text-brand-textPrimary font-bold">COBie deliverables</strong>, maintenance of <strong className="text-brand-textPrimary font-bold">Cloud CDE protocols</strong>, and establishment of strictly <strong className="text-brand-textPrimary font-bold">ISO-compliant databases</strong> for <strong className="text-brand-textPrimary font-bold">digital twin integration</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">CDE MANAGEMENT</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">COBIE HANDOVER</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">ISO 19650</span>
              </div>
              <Link href="/services/cde-lifecycle-data" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-purple-500/30 text-purple-600 font-bold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                DISCOVER DATA SOLUTIONS <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: AUTOMATION WORKFLOW */}
      <section className="py-32 bg-brand-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
            SYSTEMATIC METHODOLOGY
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 tracking-tight">
            Stop coordinating by hand. Engineer the process.
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-4">
            The Algorithmic Execution Pipeline
          </h3>
          <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-3xl mx-auto mb-20 leading-relaxed">
            Manual clash detection and repetitive data entry are destroying your project margins. We replace human error with a structured, three-stage programmatic workflow ensuring absolute data precision and legal compliance.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative text-left">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-brand-border z-0" />
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-border group-hover:border-brand-primary flex items-center justify-center shadow-md z-10 text-xl font-bold text-brand-textPrimary mb-8 transition-all duration-300">
                01
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">Data Parsing & Requirements Ingestion</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <strong className="text-brand-textPrimary font-bold">Garbage in, garbage out.</strong> Before a single clash is run, our scripts algorithmically parse your native Revit databases, point cloud arrays, and EIR/BEP protocols. Spatial boundaries and geometric parameters are validated via code to ensure strict data integrity.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-brand-primary border-4 border-white flex items-center justify-center shadow-xl shadow-brand-primary/30 z-10 text-xl font-bold text-white mb-8 transition-all duration-300 group-hover:scale-105">
                02
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">Programmatic Processing & Rule Auditing</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <strong className="text-brand-textPrimary font-bold">If a task is repeated twice, we script it.</strong> Instead of manual clicking, we deploy bespoke Python data pipelines and custom C# APIs. We execute automated clash grouping, metadata injection, and dynamic QTO extraction with zero human error.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-xl shadow-emerald-500/30 z-10 text-xl font-bold text-white mb-8 transition-all duration-300 group-hover:scale-105">
                03
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">ISO-Compliant Handover & Cloud API Sync</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <strong className="text-brand-textPrimary font-bold">Tender rejection is not an option.</strong> We deliver compiled, clash-free BIM databases and automated COBie asset schedules. Our API-driven synchronization pushes models directly into your Common Data Environment (CDE), guaranteeing absolute compliance with ISO 19650 and UNI 11337 standards.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 5. WHO WE SERVE */}
      <section className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
              SECTOR-SPECIFIC AUTOMATION
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">Built for Enterprise. Engineered for Precision.</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">Tailored software automation addressing specific operational bottlenecks for high-precision AEC firms.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <HardHat className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">General Contractors & Design-Build</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  Site rework and budget overruns are burning your margins.
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  Instead of relying on slow, manual 3D coordination, we deploy algorithmic clash resolution scripts, programmatic 4D sequencing, and dynamic 5D QTO data extraction. We guarantee constructability and mitigate financial risk long before site mobilization.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">ALGORITHMIC CONSTRUCTABILITY</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">ZERO HUMAN ERROR</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">RISK MITIGATION</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">Architecture & Engineering Studios</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  Your senior engineers are wasting thousands of hours on repetitive data entry.
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  We reallocate your billable hours from mechanical tasks to core design. Our developers engineer proprietary pyRevit toolbars, custom C# add-ins, and batch documentation pipelines to automate your workflows and exponentially accelerate delivery timelines.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">CUSTOM REVIT APIs</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">SCRIPTED WORKFLOWS</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">BILLABLE EFFICIENCY</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Factory className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">Asset Owners & Product Manufacturers</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  Static 3D components fail modern public tender requirements.
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  We programmatically convert your physical catalogs into data-rich, parametric BIM assets (LOD 100-500). We script asset metadata for automated COBie extraction, API-based CDE hosting, and real-time Digital Twin telemetry, ensuring you win strict European mandates (Decreto BIM).
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">PARAMETRIC ASSETS</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">AUTOMATED COBIE</span>
                <span className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">D.M. 560/312 COMPLIANCE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI METRICS */}
      <section className="relative py-24 bg-brand-surface border-b border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">The Cost of Manual vs. Automation</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">Don't rely on human data entry when a script is 100% accurate.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-5xl md:text-7xl font-black text-brand-textPrimary mb-4 tracking-tighter">-60%</span>
              <span className="text-lg font-bold text-brand-primary uppercase tracking-wider mb-2">Time Spent</span>
              <p className="text-brand-textSecondary font-medium">On Clash Detection & Reporting</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-5xl md:text-7xl font-black text-brand-textPrimary mb-4 tracking-tighter">100%</span>
              <span className="text-lg font-bold text-brand-primary uppercase tracking-wider mb-2">Accuracy</span>
              <p className="text-brand-textSecondary font-medium">Data Parameter Injection</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <span className="text-5xl md:text-7xl font-black text-brand-textPrimary mb-4 tracking-tighter">10x</span>
              <span className="text-lg font-bold text-brand-primary uppercase tracking-wider mb-2">Faster</span>
              <p className="text-brand-textSecondary font-medium">Sheet Creation and QTO Extraction</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FEATURED CASE STUDIES */}
      <section className="py-24 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">Proven Execution</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">See how our automation tools are transforming real projects.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Case Study 1 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg border border-brand-border">
              <img src="/Pictures/Uncategorized/uncategorized-005.jpg" alt="Python Scripting" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">How a Custom Python Script Saved Studio X 200 Hours in Sheet Creation.</h3>
                <Link href="/projects" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-white transition group/link">
                  Read Case Study <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition" />
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg border border-brand-border">
              <img src="/Pictures/BIM/bim-0078.jpg" alt="4D Scheduling" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">Algorithmic 4D Scheduling for a 50,000 sqm Commercial Complex.</h3>
                <Link href="/projects" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-white transition group/link">
                  Read Case Study <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ComplianceSection />

      {/* 9. FINAL CTA */}
      <section className="py-28 bg-brand-base border-y border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-12 tracking-tight leading-tight">
            Ready to automate your BIM workflows?
          </h2>
          <Link href="/contact" className="inline-flex items-center justify-center bg-brand-accent hover:bg-brand-accentHover text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] hover:-translate-y-1">
            Calculate Your ROI / Technical Audit
          </Link>
        </div>
      </section>

    </div>
  );
}
