"use client";

import { useState, useRef } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Workflow, 
  CheckCircle2, 
  Info,
  Sliders,
  FileCode2,
  FileCheck2,
  Compass
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { servicesPageData } from "@/lib/data/servicesPageData";

export default function ServicesHero({ data }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const tabRefs = useRef([]);

  // Reuse canonical English hero data as fallback if data is loading or missing
  const fallbackHero = servicesPageData.en.hero;
  const hero = data || fallbackHero;

  const nodes = hero.pipeline?.nodes || fallbackHero.pipeline.nodes;
  const logs = hero.pipeline?.logs || fallbackHero.pipeline.logs;
  const activeNode = nodes[activeNodeIndex] || nodes[0] || {};
  const labels = hero.pipeline?.labels || fallbackHero.pipeline.labels;

  const getNodeIcon = (iconName, className) => {
    switch (iconName) {
      case "box":
        return <Layers className={className} aria-hidden="true" />;
      case "shield":
        return <ShieldCheck className={className} aria-hidden="true" />;
      case "cpu":
        return <Cpu className={className} aria-hidden="true" />;
      case "database":
      default:
        return <Database className={className} aria-hidden="true" />;
    }
  };

  // Secondary CTA: smoothly scroll to #roadmap while updating browser URL hash naturally
  const handleRoadmapClick = (e) => {
    e.preventDefault();
    const roadmapEl = document.getElementById("roadmap");
    if (roadmapEl) {
      roadmapEl.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
      if (typeof window !== "undefined" && window.history?.pushState) {
        window.history.pushState(null, "", "#roadmap");
      } else {
        window.location.hash = "roadmap";
      }
    } else {
      window.location.hash = "roadmap";
    }
  };

  // Keyboard navigation strictly following WAI-ARIA tabs specification
  const handleKeyDown = (e, currentIndex) => {
    let targetIndex = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      targetIndex = (currentIndex + 1) % nodes.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      targetIndex = (currentIndex - 1 + nodes.length) % nodes.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = nodes.length - 1;
    }

    if (targetIndex !== null) {
      setActiveNodeIndex(targetIndex);
      tabRefs.current[targetIndex]?.focus();
    }
  };

  // Animation variants respecting user reduced-motion preference
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Casing safety for brand: pyBIM is always formatted with lowercase 'py' and uppercase 'BIM'
  const rawEyebrow = hero.eyebrow || fallbackHero.eyebrow;

  return (
    <section 
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="scroll-mt-28 relative w-full overflow-hidden bg-brand-base pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-28 lg:pb-32 border-b border-brand-border/60 transition-colors"
    >
      {/* Custom Services Hero — Engineering Signal Flow */}
      <EngineeringBackdrop variant="services-hero" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Editorial Typography, CTAs & Verified Engineering Standards  */}
          {/* ========================================================================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Technical Eyebrow Badge with Brand Casing Guard */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 dark:border-blue-400/30 bg-blue-500/10 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-mono text-caption font-bold tracking-wider shadow-sm">
                <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>
                  {rawEyebrow.includes("pyBIM") ? (
                    <>
                      <span className="normal-case font-bold">pyBIM</span>
                      {rawEyebrow.replace("pyBIM", "")}
                    </>
                  ) : (
                    <>
                      <span className="normal-case font-bold">pyBIM</span>
                      {" · "}
                      <span className="uppercase">{rawEyebrow}</span>
                    </>
                  )}
                </span>
              </div>
            </motion.div>

            {/* Dominant H1 Title */}
            <motion.h1 
              id="services-hero-heading"
              variants={itemVariants} 
              className="text-4xl sm:text-[44px] lg:text-display font-extrabold tracking-tight text-brand-textPrimary leading-[1.12] sm:leading-[1.12] lg:leading-[1.14] mb-5"
            >
              <span>{hero.headline1}</span>{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                {hero.headline2}
              </span>
            </motion.h1>

            {/* Supporting Editorial Description */}
            <motion.p 
              variants={itemVariants}
              className="text-[17px] sm:text-lead text-brand-textSecondary max-w-2xl font-normal leading-relaxed mb-8"
            >
              {hero.subheadline}
            </motion.p>

            {/* Action CTAs Group */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-9"
            >
              {/* Primary CTA */}
              <CtaLink
                href={hero.primaryCtaHref || "/contact#audit"}
                variant="primary"
              >
                {hero.primaryCta}
              </CtaLink>

              {/* Secondary CTA: Natural navigation to #roadmap */}
              <CtaLink
                href={hero.secondaryCtaHref || "#roadmap"}
                variant="secondary"
                onClick={handleRoadmapClick}
                icon={
                  <ChevronDown className="w-4 h-4 ml-1.5 text-brand-textSecondary group-hover:text-brand-primary transition-transform duration-200 group-hover:translate-y-0.5 shrink-0" aria-hidden="true" />
                }
              >
                {hero.secondaryCta}
              </CtaLink>
            </motion.div>

            {/* Verified Engineering Capability Badges */}
            <motion.div 
              variants={itemVariants}
              className="w-full pt-6 border-t border-brand-border/60"
            >
              <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5 sm:gap-x-7 text-caption font-mono text-brand-textSecondary">
                {(hero.trustBadges || []).map((badge, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                    <span className="tracking-tight">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Integrated Engineering Blueprint Panel (No Fake OS HUD)      */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            {/* Engineering Blueprint Card Container */}
            <div className="relative rounded-3xl bg-brand-cardElevated border border-brand-border/80 dark:border-cyan-500/25 shadow-xl shadow-blue-950/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-white/5">
              
              {/* Blueprint Drawing Reference Header (NO fake OS window controls) */}
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 sm:px-5 py-3.5 bg-brand-surface dark:bg-slate-950/80 border-b border-brand-border/70 text-caption font-mono">
                <div className="flex items-center gap-2 text-brand-textPrimary font-semibold tracking-wide min-w-0">
                  <Workflow className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                  <span className="leading-snug break-words">
                    {hero.pipeline?.windowTitle ? (
                      hero.pipeline.windowTitle.includes("pyBIM") ? (
                        <>
                          <span className="normal-case font-bold">pyBIM</span>
                          {hero.pipeline.windowTitle.replace(/pyBIM/i, "")}
                        </>
                      ) : (
                        hero.pipeline.windowTitle
                      )
                    ) : (
                      <>
                        <span className="normal-case font-bold">pyBIM</span>
                        {" // ENGINEERING WORKFLOW"}
                      </>
                    )}
                  </span>
                </div>
                
                <span className="shrink-0 text-technical font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/10 text-blue-700 dark:text-cyan-300 border border-blue-500/20">
                  {hero.pipeline?.badge || fallbackHero.pipeline.badge}
                </span>
              </div>

              {/* Sub-bar: Framework and Monitor Reference */}
              <div className="px-4 sm:px-5 py-2.5 bg-slate-500/[0.04] dark:bg-cyan-950/15 border-b border-brand-border/60 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-caption font-mono text-brand-textSecondary">
                <span className="leading-tight font-medium min-w-0">
                  {hero.pipeline?.monitorLabel || fallbackHero.pipeline.monitorLabel}
                </span>
                <span className="shrink-0 text-brand-primary font-semibold">
                  {labels.framework}
                </span>
              </div>

              {/* ===================================================================== */}
              {/* Original Vector BIM Isometric Process Schematic                       */}
              {/* ===================================================================== */}
              <div className="px-4 sm:px-5 pt-5 pb-3.5 border-b border-brand-border/60 bg-slate-500/[0.02] dark:bg-slate-950/40">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-caption font-mono text-brand-textSecondary">
                  <span>{labels.schematic || fallbackHero.pipeline.labels.schematic}</span>
                  <span className="text-brand-primary font-bold">
                    {labels.stepLabel || fallbackHero.pipeline.labels.stepLabel}: 0{activeNodeIndex + 1} / 04
                  </span>
                </div>

                <div className="w-full h-auto py-1" aria-hidden="true">
                  <svg 
                    viewBox="0 0 460 92" 
                    fill="none" 
                    className="w-full h-auto overflow-visible text-slate-700 dark:text-cyan-300" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="vectorLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Connecting Data Rail */}
                    <line 
                      x1="55" 
                      y1="38" 
                      x2="405" 
                      y2="38" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4"
                      strokeOpacity="0.25"
                    />

                    {/* Dynamic Active Segment */}
                    <line 
                      x1="55" 
                      y1="38" 
                      x2={55 + activeNodeIndex * 116.6} 
                      y2="38" 
                      stroke="url(#vectorLineGrad)" 
                      strokeWidth="2.5" 
                    />

                    {/* 4 Process Nodes along the rail */}
                    {[55, 171.6, 288.3, 405].map((x, i) => {
                      const railNode = nodes[i] || fallbackHero.pipeline.nodes[i] || {};
                      const railStep = railNode.step || `0${i + 1}`;
                      const railText = railNode.railLabel || fallbackHero.pipeline.nodes[i]?.railLabel || "";
                      const pt = { x, label: `${railStep} ${railText}`.trim() };
                      const isCurrent = activeNodeIndex === i;
                      const isPassed = activeNodeIndex >= i;
                      return (
                        <g key={i}>
                          {/* Node Halo */}
                          {isCurrent && (
                            <circle 
                              cx={pt.x} 
                              cy="38" 
                              r="18" 
                              fill="none" 
                              stroke="#06b6d4" 
                              strokeWidth="1.2" 
                              strokeOpacity="0.5" 
                              strokeDasharray="2 2"
                            />
                          )}

                          {/* Outer Circle */}
                          <circle 
                            cx={pt.x} 
                            cy="38" 
                            r="12" 
                            fill={isCurrent ? "currentColor" : isPassed ? "#2563eb" : "var(--brand-card, #ffffff)"} 
                            fillOpacity={isCurrent ? "0.15" : isPassed ? "0.2" : "1"}
                            stroke={isCurrent ? "#06b6d4" : isPassed ? "#2563eb" : "currentColor"} 
                            strokeWidth={isCurrent ? "2" : "1.2"}
                            strokeOpacity={isCurrent ? "1" : "0.4"}
                          />

                          {/* Center Marker */}
                          <circle 
                            cx={pt.x} 
                            cy="38" 
                            r={isCurrent ? "4.5" : "2.5"} 
                            fill={isCurrent ? "#06b6d4" : isPassed ? "#2563eb" : "currentColor"} 
                            fillOpacity={isPassed ? "1" : "0.3"}
                          />

                          {/* Technical Label Below — Highly Readable Size */}
                          <text 
                            x={pt.x} 
                            y="72" 
                            textAnchor="middle" 
                            fill="currentColor" 
                            fontSize="11.5" 
                            fontFamily="monospace"
                            fontWeight={isCurrent ? "700" : "600"}
                            letterSpacing="0.04em"
                            opacity={isCurrent ? "1" : "0.75"}
                          >
                            {pt.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* ===================================================================== */}
              {/* Interactive 4-Phase Workflow Ledger (WAI-ARIA Compliant Tabs)          */}
              {/* ===================================================================== */}
              <div 
                role="tablist" 
                aria-label={labels.tablistAria || "BIM engineering workflow phases"}
                className="p-3.5 sm:p-5 space-y-2.5"
              >
                {nodes.map((node, index) => {
                  const isActive = activeNodeIndex === index;
                  return (
                    <button
                      key={node.id}
                      ref={(el) => (tabRefs.current[index] = el)}
                      type="button"
                      role="tab"
                      id={`pipeline-phase-tab-${node.id}`}
                      aria-selected={isActive}
                      aria-controls="pipeline-phase-spec-panel"
                      aria-label={`${labels.inspectAria || "Inspect phase"} ${node.step}: ${node.title}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveNodeIndex(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`group relative w-full text-left rounded-2xl p-3.5 sm:p-4 min-h-[120px] flex flex-col justify-start transition-all duration-200 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                        isActive
                          ? "bg-blue-50/90 dark:bg-blue-950/40 border-blue-500/60 dark:border-cyan-400/50 shadow-sm ring-1 ring-blue-500/20"
                          : "bg-brand-surface/70 dark:bg-slate-950/40 border-brand-border/70 hover:border-brand-border hover:bg-brand-surface dark:hover:bg-slate-900/60"
                      }`}
                    >
                      {/* Row 1: Top Row — Fixed Icon, Step Number & Technical Badge */}
                      <div className="flex items-center justify-between gap-3 w-full">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? "bg-brand-primary text-white shadow-sm"
                                : "bg-slate-200/70 dark:bg-slate-800 text-brand-textSecondary group-hover:text-brand-primary"
                            }`}
                          >
                            {getNodeIcon(node.icon, "w-4 h-4 sm:w-[18px] sm:h-[18px]")}
                          </div>
                          <span className="font-mono text-caption font-bold text-brand-primary shrink-0">
                            {node.step}
                          </span>
                        </div>

                        <span
                          className={`font-mono text-technical font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 whitespace-nowrap ${
                            isActive
                              ? "bg-blue-600 text-white dark:bg-cyan-400 dark:text-slate-950"
                              : "bg-brand-surface dark:bg-slate-800 text-brand-textSecondary border border-brand-border/60"
                          }`}
                        >
                          {node.badge}
                        </span>
                      </div>

                      {/* Row 2: Title Row (Full Card Width for Natural Multiline Wrapping) */}
                      <span className="block w-full mt-2.5 text-body-sm font-bold text-brand-textPrimary leading-snug break-words">
                        {node.title}
                      </span>

                      {/* Row 3: Description Row (Aligned with Title) */}
                      <p className="w-full mt-1 text-caption text-brand-textSecondary font-normal leading-relaxed break-words">
                        {node.sub}
                      </p>

                      {/* Row 4: Metadata Row (Aligned with Description) */}
                      {node.meta && (
                        <p className="w-full mt-1.5 font-mono text-caption text-brand-textSecondary/80 leading-snug break-words">
                          {node.meta}
                        </p>
                      )}

                      {/* Active Indicator Accent Line */}
                      {isActive && (
                        <div 
                          className="absolute -bottom-[1px] left-4 right-4 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ===================================================================== */}
              {/* Integrated Engineering Specification Panel (NO fake hacker console)   */}
              {/* ===================================================================== */}
              <div 
                id="pipeline-phase-spec-panel"
                role="tabpanel"
                aria-labelledby={`pipeline-phase-tab-${activeNode.id || "revit"}`}
                className="px-4 sm:px-5 py-4 bg-slate-900/90 dark:bg-slate-950 text-slate-200 dark:text-slate-300 border-t border-brand-border/80 font-mono text-caption leading-relaxed"
              >
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-slate-300 dark:text-slate-400 text-caption mb-2.5 pb-2 border-b border-slate-700/80 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-semibold text-blue-400 dark:text-cyan-400">
                    <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{labels.specOverview}</span>
                  </div>
                  <span className="text-slate-300 dark:text-slate-400 font-medium shrink-0">
                    {labels.pipelineMode}
                  </span>
                </div>

                {/* Factual Phase Engineering Overview */}
                <div className="text-white dark:text-slate-200 text-caption leading-relaxed min-h-[3.75rem] sm:min-h-[3rem]">
                  {logs[activeNodeIndex] || logs[0]}
                </div>

                {/* Technical Verification Discipline Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 pt-2.5 mt-2.5 border-t border-slate-700/80 dark:border-slate-800/80 text-caption text-slate-300 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-cyan-400 shrink-0" />
                    <span className="break-words">{activeNode.meta}</span>
                  </span>
                  <span className="text-blue-400 dark:text-cyan-400 font-semibold shrink-0">
                    [{labels.activePhase}: {activeNode.step}]
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
