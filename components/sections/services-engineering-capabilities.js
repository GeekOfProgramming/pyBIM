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
  Hash
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
    exchangeStandard: "OpenBIM Exchange Workflow",
    exchangeFormat: "IFC4 · BCF",
    cards: [],
    buttonText: "Discuss an Engineering Challenge",
    buttonHref: "/contact",
    microcopy: "Share your project requirements or a repetitive workflow you'd like to improve. We'll explore a practical starting point."
  };

  const cards = capabilities.cards || [];
  const schematicNotice = capabilities.schematicNotice || "Illustrative engineering schema";
  const exchangeStandard = capabilities.exchangeStandard || "OpenBIM Exchange Workflow";
  const exchangeFormat = capabilities.exchangeFormat || "IFC4 · BCF";

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
      {/* Background Architectural Canvas with Subtle Drafting Grid & Linework */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Ambient Engineering Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-brand-primary/[0.03] dark:bg-brand-primary/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Fine Architectural Grid Pattern */}
        <svg 
          className="absolute inset-0 w-full h-full stroke-slate-300/30 dark:stroke-slate-700/30 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`${baseId}-drafting-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${baseId}-drafting-grid)`} />
        </svg>

        {/* Structural Blueprint Axis Hairlines */}
        <div className="absolute left-8 top-0 bottom-0 w-px border-l border-dashed border-slate-300/20 dark:border-slate-700/25 hidden xl:block" />
        <div className="absolute right-8 top-0 bottom-0 w-px border-r border-dashed border-slate-300/20 dark:border-slate-700/25 hidden xl:block" />
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
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="rounded-2xl lg:rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 backdrop-blur-sm border border-brand-border/80 shadow-sm transition-colors duration-200 relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 items-stretch">
                  
                  {/* Left Column: Capability Metadata, Title, Description, Topics */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      {/* Top Header Row with Icon and Sequential Number */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0">
                            {getCapabilityIcon(idx)}
                          </div>
                          <span className="text-caption font-mono font-bold text-brand-textSecondary px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border">
                            {card.num || `0${idx + 1}`}
                          </span>
                        </div>
                      </div>

                      {/* Capability Title */}
                      <h3 className="text-card-title font-bold text-brand-textPrimary mb-3 tracking-tight">
                        {card.title}
                      </h3>

                      {/* Capability Description */}
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
                              className="inline-flex items-center text-caption font-mono font-medium px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary"
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
                    <figure 
                      className="rounded-xl border border-brand-border/80 bg-brand-surface/70 dark:bg-slate-950/60 p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between h-full m-0"
                      aria-label={card.title}
                    >
                      <figcaption className="sr-only">
                        {diagram.srDescription || card.desc}
                      </figcaption>

                      {/* Diagram Top Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-brand-border/60 text-technical font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                          <span className="font-bold text-brand-textPrimary uppercase tracking-wider">
                            {diagram.title || `MODULE_0${idx + 1}_SPEC`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-brand-card border border-brand-border text-brand-textSecondary font-semibold">
                            {diagram.badge || "SPEC"}
                          </span>
                          <span className="text-brand-textSecondary/70 text-technical hidden sm:inline-block">
                            {schematicNotice}
                          </span>
                        </div>
                      </div>

                      {/* --- MODULE 01 DIAGRAM: Validation Matrix --- */}
                      {idx === 0 && (
                        <div className="space-y-3 my-auto relative">

                          {/* Neutral structured verification schema rows */}
                          <div className="space-y-2 relative">
                            {/* Scanning Hairline Reveal */}
                            {!shouldReduceMotion && (
                              <motion.div 
                                className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-primary to-transparent z-10 pointer-events-none"
                                initial={{ opacity: 0, top: "0%" }}
                                whileInView={{ opacity: [0, 0.9, 0.9, 0], top: ["0%", "100%"] }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.9, delay: 0.25, ease: "easeInOut" }}
                                aria-hidden="true"
                              />
                            )}

                            {(diagram.items || [
                              { label: "EIR.Naming_Convention", tag: "SYNTAX RULE", type: "FORMAT" },
                              { label: "ISO_19650.PropertySets", tag: "SCHEMA REF", type: "STRUCTURE" },
                              { label: "OmniClass.Classification", tag: "TABLE CODE", type: "TAXONOMY" }
                            ]).map((item, itemIdx) => (
                              <motion.div
                                key={itemIdx}
                                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.12 + itemIdx * 0.08, ease: "easeOut" }}
                                className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 bg-brand-card/90 px-3 py-2.5 rounded-lg border border-brand-border/70 shadow-sm"
                              >
                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                  {itemIdx === 0 && <FileCode2 className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />}
                                  {itemIdx === 1 && <FileText className="w-3.5 h-3.5 text-sky-500 shrink-0" aria-hidden="true" />}
                                  {itemIdx === 2 && <Tag className="w-3.5 h-3.5 text-teal-500 shrink-0" aria-hidden="true" />}
                                  <span className="text-caption font-mono text-brand-textPrimary font-semibold break-words">
                                    {item.label}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 font-mono text-technical">
                                  {item.type && (
                                    <span className="text-brand-textSecondary/80 px-2 py-0.5 rounded bg-brand-surface border border-brand-border/60">
                                      {item.type}
                                    </span>
                                  )}
                                  {/* Neutral rule/reference marker - replaces universal green check */}
                                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold border border-brand-primary/20">
                                    {item.tag}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Controlled review summary bar */}
                          <motion.div 
                            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.45 }}
                            className="pt-2"
                          >
                            <div className="flex items-center justify-between p-2.5 rounded-lg bg-brand-card/70 border border-brand-border/60 text-technical font-mono">
                              <span className="text-brand-textSecondary flex items-center gap-1.5 font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                                {diagram.outputSummary || "STRUCTURED AUDIT DOSSIER"}
                              </span>
                              <span className="text-brand-textPrimary font-bold px-2 py-0.5 rounded bg-brand-surface border border-brand-border">
                                {diagram.statusLabel || "SCHEMA CHECK"}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      )}

                      {/* --- MODULE 02 DIAGRAM: Revit Automation Pipeline --- */}
                      {idx === 1 && (
                        <div className="space-y-4 my-auto">

                          {/* 3-Stage Connected Pipeline Flow with Responsive Vector Rails */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
                            
                            {/* Station 1: Revit Model Host */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.1 }}
                              className="flex-1 bg-brand-card p-3 rounded-lg border border-brand-border/70 flex flex-col items-center text-center shadow-sm"
                            >
                              <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-2 border border-brand-primary/20">
                                <Boxes className="w-4 h-4" aria-hidden="true" />
                              </div>
                              <span className="text-caption font-mono font-bold text-brand-textPrimary">
                                {diagram.modelLabel || ".RVT Model Host"}
                              </span>
                              <span className="text-technical font-mono text-brand-textSecondary mt-0.5">
                                {diagram.modelSub || "Geometry & Instances"}
                              </span>
                            </motion.div>

                            {/* Horizontal Connector 1 (Desktop / Tablet) */}
                            <div className="hidden sm:flex items-center justify-center w-8 shrink-0" aria-hidden="true">
                              <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24" fill="none">
                                <motion.path
                                  d="M 2 12 L 23 12"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-brand-primary/70"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
                                />
                                <motion.polygon
                                  points="21,8 29,12 21,16"
                                  fill="currentColor"
                                  className="text-brand-primary"
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.55 }}
                                />
                              </svg>
                            </div>

                            {/* Vertical Connector 1 (Mobile) */}
                            <div className="flex sm:hidden items-center justify-center h-6 py-1" aria-hidden="true">
                              <svg className="w-6 h-6 overflow-visible" viewBox="0 0 24 24" fill="none">
                                <motion.path
                                  d="M 12 2 L 12 16"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-brand-primary/70"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.25, ease: "easeOut" }}
                                />
                                <motion.polygon
                                  points="8,14 12,21 16,14"
                                  fill="currentColor"
                                  className="text-brand-primary"
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.55 }}
                                />
                              </svg>
                            </div>

                            {/* Station 2: Python & C# Execution Core */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.35 }}
                              className="flex-1 bg-sky-500/10 dark:bg-sky-950/40 p-3 rounded-lg border border-sky-500/40 flex flex-col items-center text-center shadow-sm relative"
                            >
                              <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-2 border border-sky-500/30">
                                <Cpu className="w-4 h-4" aria-hidden="true" />
                              </div>
                              <span className="text-caption font-mono font-bold text-sky-600 dark:text-sky-400">
                                {diagram.codeLabel || "Python & C# Engine"}
                              </span>
                              <span className="text-technical font-mono text-sky-700/80 dark:text-sky-300/80 mt-0.5">
                                {diagram.codeSub || "Revit API Routines"}
                              </span>
                              {/* Station execution core tag */}
                              {diagram.runtimeBadge && (
                                <span className="absolute -top-2.5 px-2 py-0.5 rounded bg-sky-600 text-white font-mono text-technical font-bold uppercase tracking-wider shadow-sm">
                                  {diagram.runtimeBadge}
                                </span>
                              )}
                            </motion.div>

                            {/* Horizontal Connector 2 (Desktop / Tablet) */}
                            <div className="hidden sm:flex items-center justify-center w-8 shrink-0" aria-hidden="true">
                              <svg className="w-8 h-6 overflow-visible" viewBox="0 0 32 24" fill="none">
                                <motion.path
                                  d="M 2 12 L 23 12"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-sky-500/70"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                                />
                                <motion.polygon
                                  points="21,8 29,12 21,16"
                                  fill="currentColor"
                                  className="text-sky-500"
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.75 }}
                                />
                              </svg>
                            </div>

                            {/* Vertical Connector 2 (Mobile) */}
                            <div className="flex sm:hidden items-center justify-center h-6 py-1" aria-hidden="true">
                              <svg className="w-6 h-6 overflow-visible" viewBox="0 0 24 24" fill="none">
                                <motion.path
                                  d="M 12 2 L 12 16"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-sky-500/70"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
                                />
                                <motion.polygon
                                  points="8,14 12,21 16,14"
                                  fill="currentColor"
                                  className="text-sky-500"
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.75 }}
                                />
                              </svg>
                            </div>

                            {/* Station 3: Parameter Injection Output */}
                            <motion.div
                              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.6 }}
                              className="flex-1 bg-brand-card p-3 rounded-lg border border-brand-border/70 flex flex-col items-center text-center shadow-sm"
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-500/20">
                                <Terminal className="w-4 h-4" aria-hidden="true" />
                              </div>
                              <span className="text-caption font-mono font-bold text-brand-textPrimary">
                                {diagram.outputLabel || "Parameter Injection"}
                              </span>
                              <span className="text-technical font-mono text-brand-textSecondary mt-0.5">
                                {diagram.outputSub || "Controlled Metadata"}
                              </span>
                            </motion.div>

                          </div>

                          {/* Process Rail Caption */}
                          <div className="flex items-center justify-center p-2 rounded-lg bg-brand-card/70 border border-brand-border/60 text-technical font-mono">
                            <span className="text-brand-textSecondary text-center">
                              {diagram.caption || "Deterministic parameter updates & scripted routines"}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* --- MODULE 03 DIAGRAM: Multidisciplinary BIM Coordination --- */}
                      {idx === 2 && (
                        <div className="space-y-4 my-auto">

                          {/* Desktop & Tablet Coordination Geometry */}
                          <div className="hidden sm:grid sm:grid-cols-12 gap-2 items-center">
                            
                            {/* Discipline Sources (Left Column) */}
                            <div className="sm:col-span-5 space-y-2">
                              {(diagram.disciplines || [
                                { code: "ARC", name: "Arch", role: "Design Model" },
                                { code: "STR", name: "Struct", role: "Analytical Model" },
                                { code: "MEP", name: "Services", role: "Systems Model" }
                              ]).map((disc, discIdx) => (
                                <motion.div
                                  key={discIdx}
                                  initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.12 + discIdx * 0.08 }}
                                  className="flex items-center justify-between p-2 rounded-lg bg-brand-card border border-brand-border/70 text-technical font-mono shadow-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-bold">
                                      {disc.code}
                                    </span>
                                    <span className="font-semibold text-brand-textPrimary">
                                      {disc.name}
                                    </span>
                                  </div>
                                  <span className="text-technical text-brand-textSecondary/80">
                                    {disc.role || "Model"}
                                  </span>
                                </motion.div>
                              ))}
                            </div>

                            {/* SVG Converging Rails (Center Column) */}
                            <div className="sm:col-span-2 flex items-center justify-center h-28" aria-hidden="true">
                              <svg className="w-full h-28 overflow-visible" viewBox="0 0 50 110" fill="none">
                                {/* Top Line from ARC */}
                                <motion.path
                                  d="M 2 18 C 24 18, 28 55, 42 55"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.2 }}
                                />
                                {/* Middle Line from STR */}
                                <motion.path
                                  d="M 2 55 L 42 55"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.28 }}
                                />
                                {/* Bottom Line from MEP */}
                                <motion.path
                                  d="M 2 92 C 24 92, 28 55, 42 55"
                                  stroke="currentColor"
                                  strokeWidth="1.75"
                                  strokeDasharray="3 3"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.36 }}
                                />
                                {/* Directional Convergence Arrowhead */}
                                <motion.polygon
                                  points="40,51 48,55 40,59"
                                  fill="currentColor"
                                  className="text-teal-500"
                                  initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.2, delay: shouldReduceMotion ? 0 : 0.6 }}
                                />
                              </svg>
                            </div>

                            {/* Shared Coordination Target (Right Column) */}
                            <div className="sm:col-span-5 flex flex-col justify-center">
                              <motion.div
                                initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.4 }}
                                className="p-3.5 rounded-lg bg-teal-500/10 dark:bg-teal-950/40 border border-teal-500/35 text-center font-mono shadow-sm"
                              >
                                <span className="block text-technical font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1.5">
                                  {diagram.coordinationZone || "COORDINATION EXCHANGE LAYER"}
                                </span>
                                <div className="text-caption font-bold text-teal-700 dark:text-teal-300">
                                  {diagram.output || "IFC4 / BCF COORDINATED DELIVERABLE"}
                                </div>
                              </motion.div>
                            </div>

                          </div>

                          {/* Mobile Coordination Stack */}
                          <div className="flex sm:hidden flex-col gap-2">
                            {/* 3 Discipline Badges Row */}
                            <div className="grid grid-cols-3 gap-1.5">
                              {(diagram.disciplines || [
                                { code: "ARC", name: "Arch" },
                                { code: "STR", name: "Struct" },
                                { code: "MEP", name: "Services" }
                              ]).map((disc, discIdx) => (
                                <div key={discIdx} className="p-1.5 rounded bg-brand-card border border-brand-border/70 text-center font-mono">
                                  <span className="block text-caption font-bold text-brand-primary">{disc.code}</span>
                                  <span className="text-technical text-brand-textSecondary">{disc.name}</span>
                                </div>
                              ))}
                            </div>

                            {/* Mobile Downward Convergence SVG */}
                            <div className="flex items-center justify-center h-6 py-1" aria-hidden="true">
                              <svg className="w-16 h-6 overflow-visible" viewBox="0 0 64 24" fill="none">
                                <motion.path
                                  d="M 10 2 C 20 12, 32 12, 32 18"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeDasharray="2 2"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4 }}
                                />
                                <motion.path
                                  d="M 32 2 L 32 18"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeDasharray="2 2"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4 }}
                                />
                                <motion.path
                                  d="M 54 2 C 44 12, 32 12, 32 18"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeDasharray="2 2"
                                  className="text-teal-500/80"
                                  initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4 }}
                                />
                                <polygon points="29,16 32,22 35,16" fill="currentColor" className="text-teal-500" />
                              </svg>
                            </div>

                            {/* Target Box */}
                            <div className="p-2.5 rounded-lg bg-teal-500/10 dark:bg-teal-950/40 border border-teal-500/35 text-center font-mono">
                              <span className="block text-technical font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                                {diagram.coordinationZone || "COORDINATION EXCHANGE LAYER"}
                              </span>
                              <div className="text-caption font-bold text-teal-700 dark:text-teal-300">
                                {diagram.output || "IFC4 / BCF COORDINATED DELIVERABLE"}
                              </div>
                            </div>
                          </div>

                          {/* Standards Indicator Footer */}
                          <div className="flex items-center justify-between p-2 rounded-lg bg-brand-card/70 border border-brand-border/60 text-technical font-mono">
                            <span className="text-brand-textSecondary flex items-center gap-1.5">
                              <Workflow className="w-3 h-3 text-teal-500" aria-hidden="true" />
                              {exchangeStandard}
                            </span>
                            <span className="text-brand-textSecondary/80 font-bold">
                              {exchangeFormat}
                            </span>
                          </div>
                        </div>
                      )}

                    </figure>
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
