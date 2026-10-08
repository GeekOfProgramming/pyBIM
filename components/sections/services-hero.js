"use client";

import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import CtaLink from "@/components/ui/cta-link";
import { 
  ArrowRight, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Workflow, 
  CheckCircle2, 
  Terminal
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesHero({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback defaults if data is loading or missing
  const hero = data || {
    eyebrow: "BIM ENGINEERING · WORKFLOW AUTOMATION",
    headline1: "Complex BIM Workflows.",
    headline2: "Engineered to Run Better.",
    subheadline: "From demanding BIM deliverables to custom Revit automation, pyBIM helps architecture, engineering, and construction teams reduce repetitive work, improve model consistency, and deliver with greater control.",
    primaryCta: "Discuss Your Project",
    secondaryCta: "Explore Our Capabilities",
    primaryCtaHref: "/contact#audit",
    secondaryCtaHref: "#roadmap",
    trustBadges: [
      "ISO 19650-Aligned Workflows",
      "Autodesk Revit API & IFC4",
      "Deterministic QA / QC"
    ],
    pipeline: {
      badge: "ILLUSTRATIVE WORKFLOW",
      monitorLabel: "WORKFLOW_ARCHITECTURE // 4 INTEGRATED PHASES",
      windowTitle: "pyBIM_ARCHITECTURE // WORKFLOW_SPEC",
      nodes: [
        {
          id: "revit",
          step: "01",
          title: "Revit Model Ingestion",
          sub: "Source Geometry & Parameter Sets",
          badge: "INPUT // .RVT / IFC",
          meta: "Geometry & Property Sets",
          icon: "box"
        },
        {
          id: "validation",
          step: "02",
          title: "Data Validation",
          sub: "Algorithmic QA/QC & Schema Auditing",
          badge: "SCHEMA AUDIT",
          meta: "EIR & ISO 19650 Rules",
          icon: "shield"
        },
        {
          id: "engine",
          step: "03",
          title: "Automation Engine",
          sub: "Python & C# Algorithmic Core",
          badge: "EXECUTION CORE",
          meta: "Scripted Parameter Pipelines",
          icon: "cpu"
        },
        {
          id: "deliverables",
          step: "04",
          title: "Structured Deliverables",
          sub: "Standardized OpenBIM & Documentation",
          badge: "DELIVERABLES",
          meta: "IFC4 · COBie · Reports",
          icon: "database"
        }
      ],
      logs: [
        "[PHASE 01] Standardized ingestion of Revit elements, properties, and IFC classifications.",
        "[PHASE 02] Rule-based schema validation aligned with project EIR and ISO 19650 guidelines.",
        "[PHASE 03] Execution of algorithmic parameter injection and coordinate auditing via Revit API.",
        "[PHASE 04] Deterministic generation of verified IFC4 models, COBie sheets, and audit dossiers."
      ]
    }
  };

  const nodes = hero.pipeline?.nodes || [];
  const logs = hero.pipeline?.logs || [];

  // Cycle through nodes automatically unless user is hovering, focusing, or reduced motion is preferred
  useEffect(() => {
    if (shouldReduceMotion || isHovered || nodes.length === 0) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, isHovered, nodes.length]);

  const getNodeIcon = (iconName, className) => {
    switch (iconName) {
      case "box":
        return <Layers className={className} />;
      case "shield":
        return <ShieldCheck className={className} />;
      case "cpu":
        return <Cpu className={className} />;
      case "database":
      default:
        return <Database className={className} />;
    }
  };

  const scrollToRoadmap = (e) => {
    e.preventDefault();
    const roadmapEl = document.getElementById("roadmap");
    if (roadmapEl) {
      roadmapEl.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
    } else {
      window.location.hash = "roadmap";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % nodes.length;
      setActiveNodeIndex(next);
      const nextBtn = document.getElementById(`pipeline-tab-${nodes[next]?.id}`);
      if (nextBtn) nextBtn.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + nodes.length) % nodes.length;
      setActiveNodeIndex(prev);
      const prevBtn = document.getElementById(`pipeline-tab-${nodes[prev]?.id}`);
      if (prevBtn) prevBtn.focus();
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section 
      id="services-hero"
      aria-label="Services Hero"
      className="scroll-mt-28 relative w-full overflow-hidden bg-brand-base pt-20 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-36 border-b border-brand-border/60 transition-colors"
    >
      {/* Background Architectural Subtle Grid & Ambient Lighting */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-blue-500/15 via-cyan-500/10 to-transparent blur-3xl opacity-70 dark:opacity-60" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl" 
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Typography & CTAs ================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Technical Eyebrow Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 dark:border-blue-400/30 bg-blue-500/10 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono text-caption font-bold tracking-widest uppercase shadow-sm">
                <span className="relative flex h-2 w-2">
                  {!shouldReduceMotion && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  )}
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400" />
                </span>
                <span>{hero.eyebrow}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-section-sm sm:text-section lg:text-display font-extrabold tracking-tight text-brand-textPrimary leading-[1.08] mb-6"
            >
              <span>{hero.headline1}</span>{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                {hero.headline2}
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              variants={itemVariants}
              className="text-body sm:text-lead text-brand-textSecondary max-w-2xl font-normal leading-relaxed mb-9"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTA Group */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              {/* Primary CTA */}
              <CtaLink
                href={hero.primaryCtaHref || "/contact#audit"}
                variant="primary"
              >
                {hero.primaryCta}
              </CtaLink>

              {/* Secondary CTA */}
              <CtaLink
                href={hero.secondaryCtaHref || "#roadmap"}
                variant="secondary"
                onClick={scrollToRoadmap}
                icon={
                  <ChevronDown className="w-4 h-4 ml-2 text-brand-textSecondary group-hover:text-brand-primary transition-transform duration-200 group-hover:translate-y-0.5 shrink-0" aria-hidden="true" />
                }
              >
                {hero.secondaryCta}
              </CtaLink>
            </motion.div>

            {/* Engineering Standards Badges */}
            <motion.div 
              variants={itemVariants}
              className="w-full pt-6 border-t border-brand-border/60"
            >
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 text-caption font-mono text-brand-textSecondary">
                {(hero.trustBadges || []).map((badge, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="tracking-tight">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Technical BIM Workflow Visualization ================= */}
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Technical HUD Frame */}
            <div className="relative rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-blue-950/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/10">
              
              {/* HUD Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100/80 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-technical font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                  <span className="ml-2 font-semibold text-slate-700 dark:text-slate-300 tracking-wide">
                    {hero.pipeline?.windowTitle || "pyBIM_ARCHITECTURE // WORKFLOW_SPEC"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                  <Workflow className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-technical tracking-wider uppercase font-bold">
                    {hero.pipeline?.badge || "ILLUSTRATIVE WORKFLOW"}
                  </span>
                </div>
              </div>

              {/* Status Sub-bar */}
              <div className="px-4 py-2 bg-blue-50/50 dark:bg-blue-950/20 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-technical font-mono text-slate-500 dark:text-slate-400">
                <span className="truncate">{hero.pipeline?.monitorLabel || "WORKFLOW_ARCHITECTURE // 4 INTEGRATED PHASES"}</span>
                <span className="shrink-0 text-blue-600 dark:text-blue-400 font-semibold tracking-wide">
                  FRAMEWORK: OPENBIM & API
                </span>
              </div>

              {/* Main Workflow Visualization Canvas with Accessible Tab List */}
              <div 
                role="tablist" 
                aria-label="BIM engineering workflow phases"
                className="p-4 sm:p-5 space-y-3"
              >
                {nodes.map((node, index) => {
                  const isActive = activeNodeIndex === index;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      role="tab"
                      id={`pipeline-tab-${node.id}`}
                      aria-selected={isActive}
                      aria-controls="pipeline-spec-console"
                      aria-label={`Inspect ${node.step}: ${node.title}`}
                      tabIndex={0}
                      onClick={() => setActiveNodeIndex(index)}
                      onFocus={() => setActiveNodeIndex(index)}
                      onMouseEnter={() => setActiveNodeIndex(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`group relative w-full text-left rounded-xl p-3 sm:p-3.5 transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                        isActive
                          ? "bg-blue-50/90 dark:bg-blue-950/35 border-blue-500/60 dark:border-blue-400/50 shadow-md shadow-blue-500/10"
                          : "bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/70 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Left: Node Step & Icon */}
                        <div className="flex items-center gap-3">
                          <div 
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                                : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                            }`}
                          >
                            {getNodeIcon(node.icon, "w-4 h-4 sm:w-5 sm:h-5")}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-technical font-bold text-blue-600 dark:text-blue-400">
                                {node.step}
                              </span>
                              <span className="text-body-sm sm:text-body font-bold text-slate-900 dark:text-white leading-tight block">
                                {node.title}
                              </span>
                            </div>
                            <p className="text-caption text-slate-600 dark:text-slate-400 font-medium">
                              {node.sub}
                            </p>
                          </div>
                        </div>

                        {/* Right: Technical Tag & Indicator */}
                        <div className="flex flex-col items-end shrink-0">
                          <span 
                            className={`font-mono text-technical font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                              isActive
                                ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950"
                                : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {node.badge}
                          </span>
                          <span className="mt-1 font-mono text-technical text-slate-500 dark:text-slate-400 hidden sm:inline">
                            {node.meta}
                          </span>
                        </div>
                      </div>

                      {/* Active Node Bottom Progress Rail */}
                      {isActive && (
                        <div 
                          className={`absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full ${
                            shouldReduceMotion ? "" : "animate-pulse"
                          }`} 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Specification Log Console */}
              <div 
                id="pipeline-spec-console"
                role="tabpanel"
                aria-label="Workflow Phase Specification"
                className="px-4 py-3 bg-slate-950 text-slate-300 border-t border-slate-200 dark:border-slate-800 font-mono text-technical leading-relaxed"
              >
                <div className="flex items-center justify-between text-slate-500 text-technical mb-1.5 pb-1 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-blue-400" />
                    <span>SPECIFICATION // PHASE OVERVIEW</span>
                  </div>
                  <span className="text-blue-400 font-medium">PIPELINE: DETERMINISTIC</span>
                </div>
                <div className="text-slate-300 leading-relaxed break-words text-xs sm:text-technical">
                  {logs[activeNodeIndex] || logs[0]}
                </div>
                <div className="flex items-center gap-1.5 text-blue-400/80 text-technical mt-1.5">
                  <span>pyBIM-spec &gt;</span>
                  <span className={`w-1.5 h-3 bg-blue-400 inline-block ${shouldReduceMotion ? "" : "animate-pulse"}`} />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
