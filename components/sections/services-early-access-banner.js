"use client";

import { useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import CtaLink from "@/components/ui/cta-link";
import { 
  ArrowRight, 
  Cpu, 
  Database, 
  Workflow, 
  ShieldCheck, 
  ArrowDown
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesEarlyAccessBanner({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Fallback defaults if data is loading or missing
  const banner = data || {
    tag: "ENTERPRISE AI · IN DEVELOPMENT",
    headline: "Private AI. Designed Around Your BIM Environment.",
    description: "We're developing enterprise AI infrastructure options that bring local inference and intelligent automation closer to your engineering workflows. Share your deployment, security, and BIM requirements as we shape the next stage of pyBIM.",
    buttonText: "Join the Enterprise Priority Queue",
    buttonHref: "/contact#priority-queue",
    microcopy: "Expression of interest only. Product availability and deployment options are subject to further development and technical review.",
    diagram: {
      conceptualArchitecture: "CONCEPTUAL ARCHITECTURE",
      engineeringData: "ENGINEERING DATA",
      engineeringDataSub: "Revit · IFC · Model Data",
      privateAiCore: "PRIVATE AI CORE",
      privateAiCoreSub: "Controlled Local Inference",
      bimWorkflows: "BIM WORKFLOWS",
      bimWorkflowsSub: "Assisted Automation",
      plannedInfrastructure: "PLANNED INFRASTRUCTURE",
      coreBadge: "LOCAL CONTROL · CONCEPT",
      inBadge: "INPUT // 01",
      outBadge: "OUTPUT // 02"
    }
  };

  const diagram = banner.diagram || {
    conceptualArchitecture: "CONCEPTUAL ARCHITECTURE",
    engineeringData: "ENGINEERING DATA",
    engineeringDataSub: "Revit · IFC · Model Data",
    privateAiCore: "PRIVATE AI CORE",
    privateAiCoreSub: "Controlled Local Inference",
    bimWorkflows: "BIM WORKFLOWS",
    bimWorkflowsSub: "Assisted Automation",
    plannedInfrastructure: "PLANNED INFRASTRUCTURE",
    coreBadge: "LOCAL CONTROL · CONCEPT",
    inBadge: "INPUT // 01",
    outBadge: "OUTPUT // 02"
  };

  return (
    <section 
      id="early-access"
      className="scroll-mt-28 py-20 md:py-24 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Banner Shell Container */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative rounded-3xl p-8 sm:p-10 lg:p-12 overflow-hidden border border-brand-border/80 bg-gradient-to-br from-brand-surface via-brand-card to-blue-500/[0.04] dark:from-slate-900/90 dark:via-slate-900/95 dark:to-blue-950/30 shadow-xl shadow-brand-primary/[0.04]"
        >
          {/* Subtle Ambient Glows */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          {/* 60 / 40 Asymmetrical Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (~60% on desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Status Eyebrow Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3.5 py-1 text-caption font-mono font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-5">
                  <span 
                    className={`w-2 h-2 rounded-full bg-sky-500 ${!shouldReduceMotion ? "animate-pulse" : ""}`} 
                    aria-hidden="true" 
                  />
                  <span>{banner.tag}</span>
                </div>

                {/* Primary Headline (h2 for correct document heading hierarchy) */}
                <h2 
                  id={`${baseId}-title`}
                  className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
                >
                  {banner.headline}
                </h2>

                {/* Descriptive Copy */}
                <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed mb-8 max-w-2xl">
                  {banner.description || banner.subtitle}
                </p>
              </div>

              {/* Action Area */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <CtaLink
                    href={banner.buttonHref || "/contact#priority-queue"}
                    variant="primary"
                  >
                    {banner.buttonText}
                  </CtaLink>
                </div>

                {/* Supporting Microcopy */}
                {banner.microcopy && (
                  <p className="text-caption text-brand-textSecondary/80 font-medium leading-relaxed tracking-wide mt-3 max-w-xl">
                    {banner.microcopy}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column (~40% on desktop) — Technical Architecture Visualization */}
            <div 
              className="lg:col-span-5 w-full"
              aria-label={diagram.conceptualArchitecture}
              role="region"
            >
              <div className="rounded-2xl border border-brand-border/90 bg-brand-card/90 dark:bg-slate-950/70 p-5 sm:p-6 backdrop-blur-sm relative shadow-sm">
                
                {/* Header Tag of the Conceptual Diagram */}
                <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-brand-border/70">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                    <span className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary">
                      {diagram.conceptualArchitecture}
                    </span>
                  </div>
                  <span className="text-technical font-mono uppercase tracking-widest text-brand-textSecondary/70 px-2 py-0.5 rounded bg-brand-surface border border-brand-border/60">
                    {diagram.plannedInfrastructure}
                  </span>
                </div>

                {/* Conceptual Architecture Nodes (Engineering Data -> Private AI Core -> BIM Workflows) */}
                <div className="space-y-2 relative">
                  
                  {/* 1. Engineering Data Node */}
                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface/80 p-3 flex items-center justify-between gap-3 group transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                        <Database className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-caption font-mono font-bold tracking-tight text-brand-textPrimary">
                          {diagram.engineeringData}
                        </span>
                        <span className="block text-technical font-mono text-brand-textSecondary font-medium">
                          {diagram.engineeringDataSub}
                        </span>
                      </div>
                    </div>
                    <span className="text-technical font-mono text-brand-textSecondary/60 uppercase">
                      {diagram.inBadge || "INPUT // 01"}
                    </span>
                  </div>

                  {/* Flow Connector 1 -> 2 */}
                  <div className="flex justify-center py-0.5" aria-hidden="true">
                    <div className="relative flex flex-col items-center">
                      <div className="h-4 w-px bg-brand-border relative overflow-hidden">
                        {!shouldReduceMotion && (
                          <motion.div
                            className="absolute top-0 left-0 w-full h-2 bg-brand-primary"
                            animate={{ top: ["-100%", "100%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </div>
                      <ArrowDown className="w-3 h-3 text-brand-primary/60 -mt-1" />
                    </div>
                  </div>

                  {/* 2. Central Private AI Core (Enclosed Processing Perimeter) */}
                  <div className="relative rounded-xl border-2 border-brand-primary/50 bg-gradient-to-r from-brand-primary/10 via-sky-500/10 to-brand-primary/10 p-3.5 shadow-sm shadow-brand-primary/10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-brand-primary text-white flex items-center justify-center shadow-md shadow-brand-primary/30 shrink-0">
                          <Cpu className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div>
                          <span className="block text-caption font-mono font-extrabold tracking-tight text-brand-textPrimary">
                            {diagram.privateAiCore}
                          </span>
                          <span className="block text-technical font-mono text-brand-textSecondary font-medium">
                            {diagram.privateAiCoreSub}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                        <span className="text-technical font-mono font-bold text-brand-primary uppercase">
                          {diagram.coreBadge || "LOCAL CONTROL · CONCEPT"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flow Connector 2 -> 3 */}
                  <div className="flex justify-center py-0.5" aria-hidden="true">
                    <div className="relative flex flex-col items-center">
                      <div className="h-4 w-px bg-brand-border relative overflow-hidden">
                        {!shouldReduceMotion && (
                          <motion.div
                            className="absolute top-0 left-0 w-full h-2 bg-brand-primary"
                            animate={{ top: ["-100%", "100%"] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.9 }}
                          />
                        )}
                      </div>
                      <ArrowDown className="w-3 h-3 text-brand-primary/60 -mt-1" />
                    </div>
                  </div>

                  {/* 3. BIM Workflows Node */}
                  <div className="rounded-xl border border-brand-border/80 bg-brand-surface/80 p-3 flex items-center justify-between gap-3 group transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                        <Workflow className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-caption font-mono font-bold tracking-tight text-brand-textPrimary">
                          {diagram.bimWorkflows}
                        </span>
                        <span className="block text-technical font-mono text-brand-textSecondary font-medium">
                          {diagram.bimWorkflowsSub}
                        </span>
                      </div>
                    </div>
                    <span className="text-technical font-mono text-brand-textSecondary/60 uppercase">
                      {diagram.outBadge || "OUTPUT // 02"}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
