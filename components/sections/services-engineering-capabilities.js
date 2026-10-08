"use client";

import { useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Layers, 
  CheckCircle2, 
  Terminal, 
  Boxes, 
  Check, 
  Cpu, 
  Network 
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
    cards: [],
    buttonText: "Discuss an Engineering Challenge",
    buttonHref: "/contact",
    microcopy: "Share your project requirements or a repetitive workflow you'd like to improve. We'll explore a practical starting point."
  };

  const cards = capabilities.cards || [];

  const getCardIcon = (idx) => {
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
      className="py-24 bg-brand-surface border-b border-brand-border overflow-hidden"
      aria-labelledby={`${baseId}-title`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mb-14 lg:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-10 md:w-14" aria-hidden="true" />
            <span className="text-xs md:text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {capabilities.tag}
            </span>
          </div>
          <h2 
            id={`${baseId}-title`}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-textPrimary tracking-tight mb-5 leading-tight"
          >
            {capabilities.headline}
          </h2>
          <p className="text-base sm:text-lg text-brand-textSecondary font-medium leading-relaxed">
            {capabilities.subtitle}
          </p>
        </motion.div>

        {/* Three Engineering Capability Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-14">
          {cards.map((card, idx) => {
            return (
              <motion.article
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: "easeOut" }}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group rounded-3xl bg-brand-card border border-brand-border p-6 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:border-brand-primary/50 transition-all duration-300 relative focus-within:ring-2 focus-within:ring-brand-primary"
              >
                <div>
                  
                  {/* Top Bar: Icon + Step Index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      {getCardIcon(idx)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-brand-textSecondary/80 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border">
                      {card.num || `0${idx + 1}`}
                    </span>
                  </div>

                  {/* Bespoke Illustrative Diagram Per Capability */}
                  <div 
                    className="mb-6 rounded-2xl border border-brand-border/70 bg-brand-surface/70 p-4 overflow-hidden relative"
                    aria-hidden="true"
                  >
                    
                    {/* CARD 01 DIAGRAM: Model Information Validation */}
                    {idx === 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-brand-textSecondary pb-2 border-b border-brand-border/60">
                          <span className="uppercase">VALIDATION_SCHEMA</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">QA/QC</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] font-mono">
                          <div className="flex items-center justify-between bg-brand-card px-2 py-1 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary truncate">EIR.Naming_Convention</span>
                            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                              <Check className="w-2.5 h-2.5 mr-0.5" /> VERIFIED
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-brand-card px-2 py-1 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary truncate">ISO_19650.PropertySets</span>
                            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                              <Check className="w-2.5 h-2.5 mr-0.5" /> ALIGNED
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-brand-card px-2 py-1 rounded border border-brand-border/60">
                            <span className="text-brand-textSecondary truncate">OmniClass.Classification</span>
                            <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                              <Check className="w-2.5 h-2.5 mr-0.5" /> AUDITED
                            </span>
                          </div>
                        </div>
                        {/* Subtle scan bar */}
                        {!shouldReduceMotion && (
                          <motion.div 
                            className="h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </div>
                    )}

                    {/* CARD 02 DIAGRAM: Revit Automation & Parameter Engineering */}
                    {idx === 1 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-brand-textSecondary pb-2 border-b border-brand-border/60">
                          <span className="uppercase">AUTOMATION_PIPELINE</span>
                          <span className="text-sky-600 dark:text-sky-400 font-bold">API CORE</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                          <div className="bg-brand-card p-1.5 rounded border border-brand-border/60 flex flex-col items-center justify-center">
                            <Boxes className="w-3.5 h-3.5 text-brand-primary mb-1" />
                            <span className="text-[9px] text-brand-textSecondary">.RVT Model</span>
                          </div>
                          <div className="bg-sky-500/10 border border-sky-500/30 p-1.5 rounded flex flex-col items-center justify-center relative">
                            <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 mb-1" />
                            <span className="text-[9px] font-bold text-sky-600 dark:text-sky-400">py / C#</span>
                            {!shouldReduceMotion && (
                              <motion.span 
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-500"
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <div className="bg-brand-card p-1.5 rounded border border-brand-border/60 flex flex-col items-center justify-center">
                            <Terminal className="w-3.5 h-3.5 text-emerald-500 mb-1" />
                            <span className="text-[9px] text-brand-textSecondary">Params Out</span>
                          </div>
                        </div>
                        <div className="text-[9px] font-mono text-center text-brand-textSecondary/70 pt-0.5">
                          Deterministic parameter updates & API execution
                        </div>
                      </div>
                    )}

                    {/* CARD 03 DIAGRAM: Coordinated BIM Data Workflows */}
                    {idx === 2 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-brand-textSecondary pb-2 border-b border-brand-border/60">
                          <span className="uppercase">MULTIDISCIPLINARY_FLOW</span>
                          <span className="text-teal-600 dark:text-teal-400 font-bold">OpenBIM</span>
                        </div>
                        <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
                          <div className="flex-1 bg-brand-card p-1 rounded border border-brand-border/60 text-center">
                            <span className="block text-[8px] text-brand-textSecondary">ARC</span>
                            <span className="text-[9px] font-bold text-brand-textPrimary">Arch</span>
                          </div>
                          <span className="text-brand-textSecondary/40 text-xs">+</span>
                          <div className="flex-1 bg-brand-card p-1 rounded border border-brand-border/60 text-center">
                            <span className="block text-[8px] text-brand-textSecondary">STR</span>
                            <span className="text-[9px] font-bold text-brand-textPrimary">Struct</span>
                          </div>
                          <span className="text-brand-textSecondary/40 text-xs">+</span>
                          <div className="flex-1 bg-brand-card p-1 rounded border border-brand-border/60 text-center">
                            <span className="block text-[8px] text-brand-textSecondary">MEP</span>
                            <span className="text-[9px] font-bold text-brand-textPrimary">Services</span>
                          </div>
                        </div>
                        <div className="bg-teal-500/10 border border-teal-500/30 rounded px-2 py-1 text-center text-[9px] font-mono font-bold text-teal-700 dark:text-teal-300">
                          → IFC4 / BCF COORDINATED DELIVERABLE
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-brand-textPrimary mb-3 tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                {/* Technical Topic Pills */}
                {card.topics && (
                  <div className="pt-4 border-t border-brand-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {card.topics.map((topic, tIdx) => (
                        <span 
                          key={tIdx}
                          className="inline-flex items-center text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary group-hover:border-brand-primary/30 transition-colors"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </motion.article>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-brand-card border border-brand-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              href={capabilities.buttonHref || "/contact"}
              className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary/90 text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/30 group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span>{capabilities.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm font-medium text-brand-textSecondary max-w-xl leading-relaxed">
            {capabilities.microcopy}
          </p>
        </div>

      </div>
    </section>
  );
}
