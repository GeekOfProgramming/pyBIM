"use client";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Box, Code, Database, ChevronRight, HardHat, Building2, Factory, ShieldCheck, FileText, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TechStackSection from "@/components/ui/TechStackSection";
import ComplianceSection from "@/components/ui/ComplianceSection";

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
            
            {/* Card 1: Tech-Enabled BIM */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-8">
                <Box className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Core BIM (3D / 4D / 5D)</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                We provide standard BIM services, but our competitive edge is our tooling. We use custom scripts for <strong className="text-brand-textPrimary">Algorithmic Clash Detection</strong> and automated workflows to deliver 100% precision with <strong className="text-brand-textPrimary">Zero Human Error</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">Algorithmic Clash Detection</span>
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">Zero Error</span>
                <span className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">4D Scheduling</span>
              </div>
              <Link href="/services/core-bim" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-yellow-400/30 text-yellow-600 font-bold hover:bg-yellow-400 hover:text-white hover:border-yellow-400 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                Explore BIM Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Custom Development */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden border-b-4 border-b-brand-primary">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
                <Code className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Custom Plugins & Automation</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                Software has limits; our code doesn't. We develop bespoke <strong className="text-brand-textPrimary">Revit Add-ins</strong> using <strong className="text-brand-textPrimary">Python</strong> and C#. Turn a 3-hour repetitive task into a 3-second click.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">Python</span>
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">Revit Add-ins</span>
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">C#</span>
                <span className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">Revit API</span>
              </div>
              <Link href="/services/custom-plugins" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-brand-primary/30 text-brand-primary font-bold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                Request a Plugin <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Data Infrastructure */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                <Database className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Data & API Integration (6D - 11D)</h3>
              <p className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8">
                We prepare and program your models to connect seamlessly with <strong className="text-brand-textPrimary">Facility Management</strong> systems, <strong className="text-brand-textPrimary">IoT</strong> sensors, and immersive <strong className="text-brand-textPrimary">Digital Twins</strong>.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">Digital Twin</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">IoT</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">Facility Management</span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">Forge / APS</span>
              </div>
              <Link href="/services/data-integration" className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-purple-500/30 text-purple-600 font-bold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                Discover Data Solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: AUTOMATION WORKFLOW */}
      <section className="py-32 bg-brand-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-24 tracking-tight">The Automation Workflow</h2>
          
          <div className="grid md:grid-cols-3 gap-16 md:gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[2px] bg-brand-border" />
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-surface border-4 border-white flex items-center justify-center shadow-md z-10 text-xl font-bold text-brand-textPrimary mb-8">
                1
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-4">Input</h4>
              <p className="text-brand-textSecondary font-medium leading-relaxed max-w-xs mx-auto">
                You send us the 2D CAD or raw models.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-primary border-4 border-white flex items-center justify-center shadow-lg shadow-brand-primary/30 z-10 text-xl font-bold text-white mb-8">
                2
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-4">Processing</h4>
              <p className="text-brand-textSecondary font-medium leading-relaxed max-w-xs mx-auto">
                Our scripts and algorithms automate the heavy lifting and detect errors.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-lg shadow-emerald-500/30 z-10 text-xl font-bold text-white mb-8">
                3
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-4">Output</h4>
              <p className="text-brand-textSecondary font-medium leading-relaxed max-w-xs mx-auto">
                Delivery of a clean, data-rich, error-free BIM database.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 5. WHO WE SERVE */}
      <section className="py-24 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">Built for Enterprise.</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto">We understand the specific bottlenecks of your industry.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-background border border-[#262626] p-8 rounded-3xl shadow-sm hover:shadow-md transition">
              <HardHat className="w-10 h-10 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-brand-textPrimary mb-4">General Contractors</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium">
                Eliminate on-site surprises. We use 4D algorithms and automated clash detection to ensure constructability before the first brick is laid.
              </p>
            </div>
            <div className="bg-brand-background border border-[#262626] p-8 rounded-3xl shadow-sm hover:shadow-md transition">
              <Building2 className="w-10 h-10 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-brand-textPrimary mb-4">Architecture & MEP Studios</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium">
                Stop wasting billable hours on repetitive tasks. We build custom pyRevit plugins so your team can focus on design, not data entry.
              </p>
            </div>
            <div className="bg-brand-background border border-[#262626] p-8 rounded-3xl shadow-sm hover:shadow-md transition">
              <Factory className="w-10 h-10 text-brand-primary mb-6" />
              <h3 className="text-xl font-bold text-brand-textPrimary mb-4">Manufacturers</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium">
                Turn your products into smart data. We develop lightweight, highly parametric BIM families ready for Digital Twin integration.
              </p>
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
