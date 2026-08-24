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
            <p className="text-brand-textSecondary text-lg font-medium">The evolution of our tech-enabled architecture.</p>
          </div>
          
          <div className="relative space-y-24 md:space-y-32">
            {/* Vertical Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-border md:-translate-x-1/2" />
            
            {/* Phase 1 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 1</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Identifying the Bottleneck</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  Years of managing massive BIM projects revealed a harsh truth: powerful tools like Revit are still hindered by slow, manual processes.
                </p>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:pr-16 md:text-right">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 2</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">The Code Paradigm Shift</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  Instead of hiring more manual modelers, we transitioned to coding (Python, C#, DesignScript) to break software limitations and automate the workflows.
                </p>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-brand-primary border-2 border-brand-primary shadow-[0_0_0_6px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.3)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">Phase 3</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">Birth of a Tech-Enabled Agency</h3>
                <p className="text-brand-textSecondary leading-relaxed text-lg font-medium">
                  We launched as a hybrid studio. We don't just deliver 3D to 11D models; we build the software infrastructure, plugins, and APIs behind them.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Tech Stack & Standards (Logo Grid) */}
      <section id="tech-stack" className="bg-brand-base w-full border-b border-brand-border py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary mb-16">The tools we use to engineer the process.</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Engineering Tools */}
            <div className="p-10 rounded-3xl bg-white border border-brand-border shadow-sm">
              <h3 className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-8">Engineering Tools</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-surface text-brand-textPrimary border border-brand-border hover:bg-white hover:shadow-sm transition cursor-default font-medium">Revit</span>
                <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-surface text-brand-textPrimary border border-brand-border hover:bg-white hover:shadow-sm transition cursor-default font-medium">Navisworks</span>
                <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-surface text-brand-textPrimary border border-brand-border hover:bg-white hover:shadow-sm transition cursor-default font-medium">ACC</span>
              </div>
            </div>

            {/* Development Stack */}
            <div className="p-10 rounded-3xl bg-white border border-brand-primary/20 relative shadow-lg hover:border-brand-primary/40 transition-colors group">
              <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors" />
              <div className="relative z-10">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-8">Development Stack</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition cursor-default font-bold">Python</span>
                  <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition cursor-default font-bold">pyRevit</span>
                  <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition cursor-default font-bold">Dynamo</span>
                  <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition cursor-default font-bold">C#</span>
                  <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary border border-brand-primary/20 hover:bg-brand-primary hover:text-white transition cursor-default font-bold">REST APIs</span>
                </div>
              </div>
            </div>

            {/* Standards */}
            <div className="p-10 rounded-3xl bg-white border border-brand-border shadow-sm">
              <h3 className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-8">Standards</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="font-mono text-sm px-4 py-2 rounded-lg bg-brand-surface text-brand-textPrimary border border-brand-border hover:bg-white hover:shadow-sm transition cursor-default font-medium">ISO 19650</span>
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
