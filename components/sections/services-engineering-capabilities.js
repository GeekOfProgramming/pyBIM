"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  ShieldCheck, 
  Code2, 
  Layers, 
  Terminal, 
  Boxes, 
  Cpu, 
  FileCode2, 
  FileText, 
  Tag, 
  Workflow, 
  GitMerge, 
  Hash,
  Database,
  CheckCircle2
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesEngineeringCapabilities({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Fallback defaults if data is loading or missing
  const capabilities = data || {
    tag: "ENGINEERING CAPABILITIES",
    headline: "Turn BIM Requirements Into Repeatable Engineering Workflows.",
    subtitle: "From model information checks to Revit automation and structured handovers, pyBIM combines engineering expertise with practical software tools to make complex project delivery more manageable.",
    schematicNotice: "Illustrative engineering schema",
    cards: [],
    buttonText: "Discuss an Engineering Challenge",
    buttonHref: "/contact",
    microcopy: "Share your project requirements or a repetitive workflow you'd like to improve. We'll explore a practical starting point."
  };

  const cards = capabilities.cards || [];
  const schematicNotice = capabilities.schematicNotice || "Illustrative engineering schema";

  const getCapabilityIcon = (idx) => {
    switch (idx) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-brand-primary" aria-hidden="true" />;
      case 1:
        return <Code2 className="w-5 h-5 text-sky-500 dark:text-sky-400" aria-hidden="true" />;
      case 2:
      default:
        return <Layers className="w-5 h-5 text-teal-500 dark:text-teal-400" aria-hidden="true" />;
    }
  };

  return (
    <section 
      id="capabilities"
      className="py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border relative overflow-hidden scroll-mt-20 lg:scroll-mt-24"
      aria-labelledby={`${baseId}-title`}
    >
      {/* Background CAD Drafting Canvas with Subtle Grid & Crosshairs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Fine Architectural Grid Pattern */}
        <svg 
          className="absolute inset-0 w-full h-full stroke-slate-400/20 dark:stroke-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`${baseId}-drafting-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${baseId}-drafting-grid)`} />
        </svg>

        {/* CAD Coordinate Crosshairs at corners */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-brand-textSecondary/40 select-none hidden sm:block">
          + 04.ENG.CAP // 45°24′N 11°52′E
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-brand-textSecondary/40 select-none hidden sm:block">
          SYS.SPEC_REV.03 +
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-14 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {capabilities.tag}
            </span>
          </div>
          <h2 
            id={`${baseId}-title`}
            className="text-section-sm lg:text-section font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {capabilities.headline}
          </h2>
          <p className="text-body sm:text-lead text-brand-textSecondary font-medium leading-relaxed">
            {capabilities.subtitle}
          </p>
        </motion.div>

        {/* Interactive Engineering Workbench: Three Asymmetric Horizontal Modules */}
        <div className="space-y-6 lg:space-y-8 mb-14 lg:mb-16">
          {cards.map((card, idx) => {
            const diagram = card.diagram || {};

            return (
              <motion.article
                key={card.id || idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="group rounded-2xl lg:rounded-3xl bg-brand-card/90 dark:bg-slate-900/80 backdrop-blur-sm border border-brand-border/80 shadow-sm hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 items-stretch">
                  
                  {/* Left Column: Module Metadata, Title, Description, Topics */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
                            {getCapabilityIcon(idx)}
                          </div>
                          <div>
                            <span className="text-caption font-mono font-bold text-brand-textSecondary/80 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border">
                              {card.num || `0${idx + 1}`}
                            </span>
                          </div>
                        </div>

                        <span className="text-technical font-mono font-semibold uppercase tracking-wider text-brand-primary/90 px-2 py-0.5 rounded bg-brand-primary/10 border border-brand-primary/20">
                          WORKBENCH_M{card.num || `0${idx + 1}`}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-card-title font-bold text-brand-textPrimary mb-3 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-body-sm sm:text-body text-brand-textSecondary font-medium leading-relaxed mb-6">
                        {card.desc}
                      </p>
                    </div>

                    {/* Technical Topic Pills */}
                    {card.topics && (
                      <div className="pt-4 border-t border-brand-border/60 mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {card.topics.map((topic, tIdx) => (
                            <span 
                              key={tIdx}
                              className="inline-flex items-center text-caption font-mono font-medium px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary group-hover:border-brand-primary/30 transition-colors"
                            >
                              <Hash className="w-3 h-3 mr-1 text-brand-primary/70" aria-hidden="true" />
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Distinctive Technical Visual HUD */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <div 
                      className="rounded-xl border border-brand-border/80 bg-brand-surface/70 dark:bg-slate-950/60 p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between h-full"
                      aria-hidden="true"
                    >
                      {/* Diagram Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-brand-border/60 text-technical font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                          <span className="font-bold text-brand-textPrimary uppercase tracking-wider">
                            {diagram.title || `MODULE_0${idx + 1}_SPEC`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-brand-textSecondary font-semibold">
                            {diagram.badge || "SPEC"}
                          </span>
                          <span className="text-brand-textSecondary/70 text-[10px] hidden sm:inline-block">
                            {schematicNotice}
                          </span>
                        </div>
                      </div>

                      {/* --- MODULE 01 DIAGRAM: Validation Matrix --- */}
                      {idx === 0 && (
                        <div className="space-y-3 my-auto">
                          {/* Neutral structured verification schema rows */}
                          <div className="space-y-2">
                            {(diagram.items || [
                              { label: "EIR.Naming_Convention", tag: "SYNTAX RULE", type: "FORMAT" },
                              { label: "ISO_19650.PropertySets", tag: "SCHEMA REF", type: "STRUCTURE" },
                              { label: "OmniClass.Classification", tag: "TABLE CODE", type: "TAXONOMY" }
                            ]).map((item, itemIdx) => (
                              <motion.div
                                key={itemIdx}
                                initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.15 + itemIdx * 0.08, ease: "easeOut" }}
                                className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 bg-brand-card/90 px-3 py-2.5 rounded-lg border border-brand-border/70 shadow-xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  {itemIdx === 0 && <FileCode2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />}
                                  {itemIdx === 1 && <FileText className="w-3.5 h-3.5 text-sky-500 shrink-0" />}
                                  {itemIdx === 2 && <Tag className="w-3.5 h-3.5 text-teal-500 shrink-0" />}
                                  <span className="text-caption font-mono text-brand-textPrimary font-semibold truncate">
                                    {item.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-auto font-mono text-technical">
                                  {item.type && (
                                    <span className="text-brand-textSecondary/70 px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border/60">
                                      {item.type}
                                    </span>
                                  )}
                                  {/* Neutral rule/reference marker - replaced universal green check */}
                                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold border border-brand-primary/20">
                                    {item.tag}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Controlled review summary bar */}
                          <div className="pt-2">
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-brand-card/60 border border-brand-border/60 text-technical font-mono">
                              <span className="text-brand-textSecondary flex items-center gap-1.5 font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                                {diagram.outputSummary || "STRUCTURED AUDIT DOSSIER"}
                              </span>
                              <span className="text-brand-textPrimary font-bold px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
                                {diagram.statusLabel || "SCHEMA CHECK"}
                              </span>
                            </div>
                          </div>

                          {/* Finite single-pass scan bar */}
                          {!shouldReduceMotion && (
                            <motion.div 
                              className="h-[1.5px] bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                              initial={{ opacity: 0, x: "-100%" }}
                              whileInView={{ opacity: [0, 1, 0], x: ["0%", "100%"] }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                            />
                          )}
                        </div>
                      )}

                      {/* --- MODULE 02 DIAGRAM: Revit Automation Pipeline --- */}
                      {idx === 1 && (
                        <div className="space-y-4 my-auto">
                          {/* 3-Stage Connected Pipeline Flow */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                            
                            {/* Station 1: Revit Model Host */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.15 }}
                              className="bg-brand-card p-3 rounded-lg border border-brand-border/70 flex flex-col items-center text-center shadow-xs"
                            >
                              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 border border-brand-primary/20">
                                <Boxes className="w-4 h-4" />
                              </div>
                              <span className="text-caption font-mono font-bold text-brand-textPrimary">
                                {diagram.modelLabel || ".RVT Model Host"}
                              </span>
                              <span className="text-[10px] font-mono text-brand-textSecondary mt-0.5">
                                {diagram.modelSub || "Geometry & Instances"}
                              </span>
                            </motion.div>

                            {/* Station 2: Python & C# Algorithmic Execution Core */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.28 }}
                              className="bg-sky-500/10 dark:bg-sky-950/40 p-3 rounded-lg border border-sky-500/30 flex flex-col items-center text-center shadow-xs relative"
                            >
                              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-2 border border-sky-500/30">
                                <Cpu className="w-4 h-4" />
                              </div>
                              <span className="text-caption font-mono font-bold text-sky-600 dark:text-sky-400">
                                {diagram.codeLabel || "Python & C# Engine"}
                              </span>
                              <span className="text-[10px] font-mono text-sky-700/80 dark:text-sky-300/80 mt-0.5">
                                {diagram.codeSub || "Revit API Routines"}
                              </span>
                              {/* Station connector badge */}
                              <span className="absolute -top-2 px-1.5 py-0.2 rounded bg-sky-600 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                                RUNTIME
                              </span>
                            </motion.div>

                            {/* Station 3: Parameter Injection Output */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.4 }}
                              className="bg-brand-card p-3 rounded-lg border border-brand-border/70 flex flex-col items-center text-center shadow-xs"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/20">
                                <Terminal className="w-4 h-4" />
                              </div>
                              <span className="text-caption font-mono font-bold text-brand-textPrimary">
                                {diagram.outputLabel || "Parameter Injection"}
                              </span>
                              <span className="text-[10px] font-mono text-brand-textSecondary mt-0.5">
                                {diagram.outputSub || "Controlled Metadata"}
                              </span>
                            </motion.div>

                          </div>

                          {/* Process Rail Caption */}
                          <div className="flex items-center justify-between p-2 rounded-lg bg-brand-card/60 border border-brand-border/60 text-technical font-mono">
                            <span className="text-brand-textSecondary text-center w-full">
                              {diagram.caption || "Deterministic parameter updates & scripted routines"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* --- MODULE 03 DIAGRAM: Multidisciplinary BIM Coordination --- */}
                      {idx === 2 && (
                        <div className="space-y-4 my-auto">
                          {/* Disciplines Converging into OpenBIM Coordination Layer */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                            
                            {/* Discipline Sources (3 Stacked / Integrated Nodes) */}
                            <div className="sm:col-span-5 space-y-1.5">
                              {(diagram.disciplines || [
                                { code: "ARC", name: "Arch", role: "Design Model" },
                                { code: "STR", name: "Struct", role: "Analytical Model" },
                                { code: "MEP", name: "Services", role: "Systems Model" }
                              ]).map((disc, discIdx) => (
                                <motion.div
                                  key={discIdx}
                                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.15 + discIdx * 0.08 }}
                                  className="flex items-center justify-between p-2 rounded bg-brand-card border border-brand-border/70 text-technical font-mono shadow-xs"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold">
                                      {disc.code}
                                    </span>
                                    <span className="font-semibold text-brand-textPrimary">
                                      {disc.name}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-brand-textSecondary/70 hidden sm:inline">
                                    {disc.role || "Model"}
                                  </span>
                                </motion.div>
                              ))}
                            </div>

                            {/* Directional Convergence Indicator */}
                            <div className="sm:col-span-2 flex items-center justify-center py-1 sm:py-0">
                              <div className="w-8 h-8 rounded-full bg-brand-surface border border-brand-border flex items-center justify-center text-brand-primary">
                                <GitMerge className="w-4 h-4" />
                              </div>
                            </div>

                            {/* Shared Coordination Zone & Deliverable Target */}
                            <div className="sm:col-span-5 space-y-2">
                              <motion.div
                                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.3 }}
                                className="p-3 rounded-lg bg-teal-500/10 dark:bg-teal-950/40 border border-teal-500/30 text-center font-mono"
                              >
                                <span className="block text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                                  {diagram.coordinationZone || "COORDINATION EXCHANGE LAYER"}
                                </span>
                                <div className="text-caption font-bold text-teal-700 dark:text-teal-300">
                                  {diagram.output || "IFC4 / BCF COORDINATED DELIVERABLE"}
                                </div>
                              </motion.div>
                            </div>

                          </div>

                          {/* Standards Indicator Footer */}
                          <div className="flex items-center justify-between p-2 rounded-lg bg-brand-card/60 border border-brand-border/60 text-technical font-mono">
                            <span className="text-brand-textSecondary flex items-center gap-1.5">
                              <Workflow className="w-3 h-3 text-teal-500" />
                              OpenBIM Information Exchange
                            </span>
                            <span className="text-brand-textSecondary/80 font-bold">
                              IFC4 · BCF 2.1
                            </span>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Integrated Consultation Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-brand-card border border-brand-border shadow-sm">
          <div className="shrink-0">
            <CtaLink
              href={capabilities.buttonHref || "/contact"}
              variant="primary"
            >
              {capabilities.buttonText || "Discuss an Engineering Challenge"}
            </CtaLink>
          </div>

          <p className="text-body-sm font-medium text-brand-textSecondary max-w-xl leading-relaxed">
            {capabilities.microcopy}
          </p>
        </div>

      </div>
    </section>
  );
}
