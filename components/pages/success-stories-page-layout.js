"use client";

import { useState, useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  Briefcase, 
  MessageSquareQuote, 
  Info, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  GitBranch, 
  Workflow, 
  Layers,
  Sparkles,
  FileText,
  Sliders,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";
import { 
  curatedCompletedProjects, 
  researchWorkstreams, 
  aiPipelineSteps 
} from "@/lib/data/portfolio-public-data";

export default function SuccessStoriesPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const [selectedPipelineStep, setSelectedPipelineStep] = useState(0);

  // Filter approved projects (currently 0 pending owner case study sign-off)
  const approvedCompletedProjects = curatedCompletedProjects.filter(
    (project) => project.isApprovedForPublication === true
  );

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const activeStepData = aiPipelineSteps[selectedPipelineStep] || aiPipelineSteps[0];

  return (
    <div className="w-full bg-brand-base text-brand-textPrimary overflow-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      
      {/* ========================================================================= */}
      {/* SECTION 01: HERO — EDITORIAL PORTFOLIO & R&D INTRODUCTION                */}
      {/* ========================================================================= */}
      <section 
        id="success-stories"
        aria-label="Success Stories Hero"
        className="relative w-full border-b border-brand-border/60 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 overflow-hidden scroll-mt-28"
      >
        {/* Architectural Diagonal Drafting Background Pattern */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 text-slate-900 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 85% 65% at 55% 35%, black 25%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 55% 35%, black 25%, transparent 85%)",
          }}
          aria-hidden="true"
        >
          <svg className="w-full h-full opacity-[0.04] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-drafting-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
                <path d="M 0 60 L 60 0" fill="none" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.25" strokeDasharray="2 4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-drafting-grid)" />
          </svg>
        </div>

        {/* Ambient Radial Illumination */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-1/4 w-[560px] h-[500px] bg-gradient-to-br from-blue-500/[0.10] via-indigo-500/[0.05] to-transparent dark:from-blue-500/[0.18] dark:via-cyan-500/[0.08] dark:to-transparent rounded-full blur-[110px] z-0"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center mb-12 lg:mb-16">
            
            {/* Left Narrative Column */}
            <motion.div 
              variants={containerStagger}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              {/* Eyebrow & Status Badge */}
              <motion.div variants={fadeInVariants} className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/25 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-caption font-mono font-bold tracking-wider">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                  <span>
                    <span className="normal-case font-bold">pyBIM</span>
                    {" · "}
                    <span>{t("projects.hero.eyebrow") ? t("projects.hero.eyebrow").replace("pyBIM / ", "").replace("pyBIM · ", "") : "SUCCESS STORIES"}</span>
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                  <span>{t("projects.hero.statusBadge") || "IN PREPARATION"}</span>
                </div>
              </motion.div>

              {/* H1 Title */}
              <motion.h1 
                variants={fadeInVariants} 
                className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-4 leading-[1.08]"
              >
                {t("projects.hero.title") || "Success Stories"}
              </motion.h1>

              {/* Supporting Editorial Headline */}
              <motion.h2 
                variants={fadeInVariants} 
                className="text-card-title sm:text-section-sm font-bold text-brand-primary mb-6 leading-snug tracking-tight"
              >
                {t("projects.hero.supportingHeading") || "Engineering Projects & Applied Research"}
              </motion.h2>

              {/* Factual Description */}
              <motion.p 
                variants={fadeInVariants} 
                className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
              >
                {t("projects.hero.description") || 
                  "Explore the structure of our engineering portfolio, from completed BIM work to ongoing research in AI-assisted engineering and LLM-based workflows."}
              </motion.p>

              {/* Primary CTAs */}
              <motion.div 
                variants={fadeInVariants} 
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6"
              >
                <CtaLink href="/services" variant="primary">
                  {t("projects.hero.primaryCta") || "Explore Our Services"}
                </CtaLink>

                <CtaLink href="/contact" variant="secondary">
                  {t("projects.hero.secondaryCta") || "Discuss a Project"}
                </CtaLink>
              </motion.div>

              {/* Editorial Preparation Note */}
              <motion.div 
                variants={fadeInVariants} 
                className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
              >
                <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>{t("projects.hero.supportingNote")}</span>
              </motion.div>
            </motion.div>

            {/* Right Architectural Isometric Geometry Vector Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 w-full flex items-center justify-center relative"
              aria-hidden="true"
            >
              <div className="w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl border border-brand-border/80 bg-brand-card/90 dark:bg-slate-900/85 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden text-slate-700 dark:text-cyan-300">
                
                {/* Header drafting metadata bar */}
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 text-technical font-mono text-brand-textSecondary">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary" />
                    <span>BIM GEOMETRY & DATA MODEL</span>
                  </div>
                  <span className="text-brand-primary font-semibold">SCHEMATIC REF</span>
                </div>

                {/* Layered Architectural Axonometric SVG Drawing */}
                <div className="my-auto py-3">
                  <svg viewBox="0 0 420 220" fill="none" className="w-full h-auto overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="layerGradGround" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="layerGradSlab" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.04" />
                      </linearGradient>
                      <linearGradient id="layerGradVolume" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
                      </linearGradient>
                    </defs>

                    {/* Level 0: Ground Grid Plane */}
                    <g opacity="0.35" stroke="currentColor" strokeWidth="0.8">
                      <line x1="70" y1="165" x2="210" y2="210" />
                      <line x1="110" y1="145" x2="250" y2="190" />
                      <line x1="150" y1="125" x2="290" y2="170" />
                      <line x1="190" y1="105" x2="330" y2="150" />

                      <line x1="150" y1="195" x2="290" y2="145" />
                      <line x1="190" y1="210" x2="330" y2="160" />
                      <line x1="110" y1="180" x2="250" y2="130" />
                    </g>

                    {/* Level 1: Primary Structural Prism (Ground Mass) */}
                    <g stroke="currentColor" strokeWidth="1.2">
                      <polygon points="210,85 285,120 210,155 135,120" fill="url(#layerGradGround)" />
                      <polygon points="135,120 210,155 210,185 135,150" fill="url(#layerGradGround)" />
                      <polygon points="210,155 285,120 285,150 210,185" fill="url(#layerGradGround)" />
                    </g>

                    {/* Structural Columns / Coordinate Linework */}
                    <g stroke="#06b6d4" strokeWidth="1" strokeDasharray="3 3" opacity="0.65">
                      <line x1="135" y1="120" x2="135" y2="70" />
                      <line x1="210" y1="85" x2="210" y2="35" />
                      <line x1="285" y1="120" x2="285" y2="70" />
                      <line x1="210" y1="155" x2="210" y2="105" />
                    </g>

                    {/* Level 2: Cantilevered Architectural Volume (Upper Tier) */}
                    <motion.g 
                      stroke="#06b6d4" 
                      strokeWidth="1.4"
                      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                    >
                      <polygon points="210,35 295,75 210,115 125,75" fill="url(#layerGradVolume)" />
                      <polygon points="125,75 210,115 210,135 125,95" fill="url(#layerGradSlab)" stroke="currentColor" strokeWidth="1" />
                      <polygon points="210,115 295,75 295,95 210,135" fill="url(#layerGradSlab)" stroke="currentColor" strokeWidth="1" />
                    </motion.g>

                    {/* Parametric Dimension Witness Lines */}
                    <g stroke="currentColor" strokeWidth="0.8" opacity="0.6">
                      <line x1="295" y1="75" x2="355" y2="75" strokeDasharray="2 2" />
                      <line x1="350" y1="70" x2="360" y2="80" strokeWidth="1.2" />
                      <text x="365" y="78" fill="currentColor" fontSize="9" fontFamily="monospace">TIER 02 // SLAB</text>

                      <line x1="285" y1="150" x2="345" y2="150" strokeDasharray="2 2" />
                      <line x1="340" y1="145" x2="350" y2="155" strokeWidth="1.2" />
                      <text x="355" y="153" fill="currentColor" fontSize="9" fontFamily="monospace">TIER 01 // BASE</text>
                    </g>
                  </svg>
                </div>

                {/* Footer metadata annotation */}
                <div className="flex items-center justify-between border-t border-brand-border/60 pt-3 text-technical font-mono text-brand-textSecondary">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                    <span>IFC ENTITY HIERARCHY</span>
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">SPATIAL INDEX</span>
                </div>

              </div>
            </motion.div>

          </div>

          {/* On-Page Section Index Navigator */}
          <nav 
            aria-label="Success Stories section index"
            className="pt-6 border-t border-brand-border/60 flex flex-wrap items-center justify-start gap-3 sm:gap-4"
          >
            <span className="text-technical font-mono uppercase tracking-wider text-brand-textSecondary mr-2 hidden sm:inline-block">
              INDEX:
            </span>

            <a
              href="#completed-projects"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-brand-primary/50 text-body-sm font-semibold text-brand-textPrimary hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.completed") || "Completed Projects"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-brand-primary">#01</span>
            </a>

            <a
              href="#in-development"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-cyan-500/50 text-body-sm font-semibold text-brand-textPrimary hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm"
            >
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.development") || "AI & LLM Development"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-cyan-500">#02</span>
            </a>

            <a
              href="#research-workstreams"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-cyan-500/50 text-body-sm font-semibold text-brand-textPrimary hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm"
            >
              <GitBranch className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.workstreams") || "Active Research Workstreams"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-cyan-500">#03</span>
            </a>

            <a
              href="#testimonials"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-brand-primary/50 text-body-sm font-semibold text-brand-textPrimary hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <MessageSquareQuote className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.testimonials") || "Client Testimonials"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-brand-primary">#04</span>
            </a>
          </nav>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02A: COMPLETED PROJECTS — ARCHITECTURAL PORTFOLIO CANVAS           */}
      {/* ========================================================================= */}
      <div id="all-projects" className="relative -top-28 sr-only" aria-hidden="true" tabIndex={-1} />

      <section 
        id="completed-projects"
        aria-labelledby={`${baseId}-completed-heading`}
        className="scroll-mt-28 relative w-full border-b border-brand-border/60 py-20 md:py-24 lg:py-28 bg-brand-base overflow-hidden"
      >
        {/* Layered Architectural Blueprint Linework Background */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 text-slate-800 dark:text-blue-300"
          style={{
            maskImage: "radial-gradient(ellipse 90% 70% at 70% 40%, black 20%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 70% 40%, black 20%, transparent 85%)",
          }}
          aria-hidden="true"
        >
          <svg className="w-full h-full opacity-[0.035] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="completed-blueprint" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                <circle cx="0" cy="0" r="1.5" fill="currentColor" />
                <circle cx="80" cy="0" r="1.5" fill="currentColor" />
                <circle cx="0" cy="80" r="1.5" fill="currentColor" />
                <circle cx="80" cy="80" r="1.5" fill="currentColor" />
                <path d="M 0 0 L 80 80" stroke="currentColor" strokeWidth="0.25" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#completed-blueprint)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-caption font-mono font-bold text-brand-primary tracking-wider uppercase mb-3">
                <Briefcase className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>{t("projects.completed.eyebrow") || "COMPLETED ENGINEERING"}</span>
              </div>
              
              <h2 
                id={`${baseId}-completed-heading`}
                className="text-section-sm sm:text-section font-bold text-brand-textPrimary tracking-tight mb-3"
              >
                {t("projects.completed.title") || "Completed Projects"}
              </h2>

              <p className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed">
                {t("projects.completed.subtitle") || 
                  "Delivered BIM coordination, Revit automation, and model information structures."}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-technical font-mono uppercase text-brand-textSecondary px-3.5 py-1.5 rounded-lg bg-brand-surface border border-brand-border">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>{t("projects.completed.status") || "IN PREPARATION"}</span>
            </div>
          </div>

          {/* Conditional Gallery Architecture: Strict Publication Safeguard */}
          {approvedCompletedProjects.length > 0 ? (
            /* Future Public Gallery when explicit owner release agreements are provided */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {approvedCompletedProjects.map((project) => (
                <article 
                  key={project.id}
                  className="rounded-3xl bg-brand-card border border-brand-border p-6 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="text-technical font-mono text-brand-primary">{project.discipline}</span>
                    <h3 className="text-card-title font-bold text-brand-textPrimary mt-2">{t(project.titleKey)}</h3>
                    <p className="text-body-sm text-brand-textSecondary mt-2">{t(project.summaryKey)}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Distinctive, Compact Architectural Portfolio Holding Canvas */
            <motion.div 
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Narrative */}
                <div className="lg:col-span-8 flex flex-col items-start">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-technical font-mono font-bold uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{t("projects.completed.badge") || "Curated References // In Preparation"}</span>
                  </div>

                  <h3 className="text-card-title sm:text-section-sm font-bold text-brand-textPrimary mb-3 tracking-tight">
                    {t("projects.completed.empty_title") || "Portfolio References in Preparation"}
                  </h3>

                  <p className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-6 max-w-2xl">
                    {t("projects.completed.empty_desc") || 
                      "Our completed project records and technical case studies are being compiled and reviewed for publication. Only authorized engineering work with formal release approval will appear here."}
                  </p>

                  <div className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary">
                    <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("projects.completed.safeguard")}</span>
                  </div>
                </div>

                {/* Right Abstract Vector Blueprint Motif */}
                <div className="lg:col-span-4 flex items-center justify-center lg:justify-end" aria-hidden="true">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-brand-surface dark:bg-slate-950/60 border border-brand-border/80 p-5 flex items-center justify-center text-slate-500 dark:text-blue-300 relative">
                    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="80" cy="80" r="60" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
                      <circle cx="80" cy="80" r="40" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                      <line x1="20" y1="80" x2="140" y2="80" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                      <line x1="80" y1="20" x2="80" y2="140" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                      <rect x="52" y="52" width="56" height="56" stroke="#2563eb" strokeWidth="1.2" opacity="0.8" />
                      <rect x="64" y="64" width="32" height="32" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                      <circle cx="80" cy="80" r="3" fill="#2563eb" />
                    </svg>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02B: IN DEVELOPMENT — INTERACTIVE APPLIED AI RESEARCH FLOW        */}
      {/* ========================================================================= */}
      <div id="featured" className="relative -top-28 sr-only" aria-hidden="true" tabIndex={-1} />

      <section 
        id="in-development"
        aria-labelledby={`${baseId}-dev-heading`}
        className="scroll-mt-28 relative w-full border-b border-brand-border/60 py-20 md:py-24 lg:py-28 bg-slate-900/[0.035] dark:bg-slate-950/50 overflow-hidden"
      >
        {/* Network & Flow Path Ambient Glow */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-10 w-[520px] h-[520px] bg-cyan-500/[0.05] dark:bg-cyan-500/[0.09] rounded-full blur-[130px] z-0"
        />
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-10 w-[460px] h-[460px] bg-blue-600/[0.04] dark:bg-blue-600/[0.08] rounded-full blur-[120px] z-0"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/25 dark:border-cyan-400/30 text-caption font-mono font-bold text-cyan-700 dark:text-cyan-300 tracking-wider uppercase mb-3">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                <span>{t("projects.dev.eyebrow") || "APPLIED RESEARCH & DEVELOPMENT"}</span>
              </div>
              
              <h2 
                id={`${baseId}-dev-heading`}
                className="text-section-sm sm:text-section font-bold text-brand-textPrimary tracking-tight mb-3"
              >
                {t("projects.dev.title") || "AI & LLM Development"}
              </h2>

              <p className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed">
                {t("projects.dev.subtitle") || 
                  "Applied research in semantic BIM querying, retrieval-augmented technical workflows, and code automation."}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-technical font-mono uppercase text-cyan-700 dark:text-cyan-300 px-3.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/25">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>{t("projects.dev.workstreams_count") || "3 Areas Under Evaluation"}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* INTERACTIVE APPLIED AI RESEARCH SYSTEM FLOW (Connected Interactive Nodes) */}
          {/* ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14 rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 border border-cyan-500/30 dark:border-cyan-500/25 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden"
          >
            {/* Flow Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/70 pb-5 mb-8">
              <div>
                <span className="text-technical font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                  {t("projects.dev.diagram_subtitle") || "Conceptual Architecture // 5-Stage System"}
                </span>
                <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  <span>{t("projects.dev.diagram_title") || "Applied AI Research Flow"}</span>
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 text-technical font-mono px-3 py-1 rounded bg-slate-500/10 text-brand-textSecondary border border-brand-border">
                <span>{t("projects.dev.step_label") || "Stage"}: 0{selectedPipelineStep + 1} / 05</span>
              </div>
            </div>

            {/* 5-Stage Interactive Selector Buttons (Accessible WAI-ARIA tablist) */}
            <div 
              role="tablist"
              aria-label={t("projects.dev.diagram_title") || "Applied AI Research Flow stages"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-3.5 mb-8"
            >
              {aiPipelineSteps.map((stepItem, idx) => {
                const isSelected = selectedPipelineStep === idx;
                return (
                  <button
                    key={stepItem.step}
                    type="button"
                    role="tab"
                    id={`pipeline-stage-tab-${stepItem.step}`}
                    aria-selected={isSelected}
                    aria-controls="pipeline-stage-detail-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelectedPipelineStep(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        setSelectedPipelineStep((idx + 1) % aiPipelineSteps.length);
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setSelectedPipelineStep((idx - 1 + aiPipelineSteps.length) % aiPipelineSteps.length);
                      }
                    }}
                    className={`relative text-left rounded-2xl p-4 border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                      isSelected
                        ? stepItem.isGate
                          ? "bg-amber-500/15 dark:bg-amber-950/40 border-amber-500 dark:border-amber-400 shadow-md ring-1 ring-amber-500/30"
                          : "bg-cyan-500/10 dark:bg-cyan-950/40 border-cyan-500 dark:border-cyan-400 shadow-md ring-1 ring-cyan-500/30"
                        : stepItem.isGate
                        ? "bg-amber-500/[0.04] dark:bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60"
                        : "bg-brand-surface dark:bg-slate-800/60 border-brand-border/80 hover:border-cyan-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-caption ${
                        stepItem.isGate
                          ? "bg-amber-500 text-slate-950"
                          : isSelected
                          ? "bg-cyan-600 text-white"
                          : "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20"
                      }`}>
                        0{stepItem.step}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        stepItem.isGate
                          ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold"
                          : "bg-slate-500/10 text-brand-textSecondary"
                      }`}>
                        {stepItem.isGate ? (t("projects.dev.gate_badge") || "MANDATORY GATE") : stepItem.badge}
                      </span>
                    </div>

                    <h4 className={`text-body-sm font-bold tracking-tight line-clamp-1 ${
                      stepItem.isGate ? "text-amber-900 dark:text-amber-200" : "text-brand-textPrimary"
                    }`}>
                      {t(stepItem.titleKey)}
                    </h4>

                    {/* Active Accent Rail */}
                    {isSelected && (
                      <div className={`absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full ${
                        stepItem.isGate ? "bg-amber-500" : "bg-cyan-500"
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Detail Panel */}
            <div 
              id="pipeline-stage-detail-panel"
              role="tabpanel"
              aria-labelledby={`pipeline-stage-tab-${activeStepData.step}`}
              className={`rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${
                activeStepData.isGate
                  ? "bg-amber-500/[0.08] dark:bg-amber-950/30 border-amber-500/40"
                  : "bg-brand-surface dark:bg-slate-800/80 border-cyan-500/30"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`text-caption font-mono font-bold px-2.5 py-1 rounded ${
                    activeStepData.isGate
                      ? "bg-amber-500 text-slate-950"
                      : "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                  }`}>
                    {t("projects.dev.step_label") || "Stage"} 0{activeStepData.step} // {activeStepData.badge}
                  </span>
                  <h4 className="text-card-title font-bold text-brand-textPrimary tracking-tight">
                    {t(activeStepData.titleKey)}
                  </h4>
                </div>

                {activeStepData.isGate && (
                  <span className="self-start sm:self-auto text-technical font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                    {t("projects.dev.gate_badge") || "MANDATORY GATE"}
                  </span>
                )}
              </div>

              <p className="text-body text-brand-textSecondary leading-relaxed max-w-3xl">
                {t(activeStepData.descKey)}
              </p>
            </div>

            {/* Mandatory Human Review Notice Callout */}
            <div className="mt-6 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 p-4 sm:p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-body-sm text-amber-950 dark:text-amber-100 font-medium leading-relaxed">
                  {t("projects.dev.human_review_notice") || 
                    "Human Engineering Oversight: All LLM experiments operate under strict engineer-in-the-loop validation. Outputs are never autonomous."}
                </p>
              </div>
            </div>

          </motion.div>

          {/* ========================================================================= */}
          {/* ACTIVE RESEARCH WORKSTREAMS LEDGER                                        */}
          {/* ========================================================================= */}
          <section 
            id="research-workstreams"
            aria-labelledby={`${baseId}-workstreams-heading`}
            className="scroll-mt-28"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <h3 
                id={`${baseId}-workstreams-heading`}
                className="text-card-title font-bold text-brand-textPrimary tracking-tight flex items-center gap-2"
              >
                <GitBranch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>{t("projects.dev.workstreams_heading") || "Active Research Workstreams"}</span>
              </h3>
              <span className="text-technical font-mono text-brand-textSecondary uppercase">
                {t("projects.dev.workstreams_count") || "3 Areas Under Evaluation"}
              </span>
            </div>

            {/* Workstream Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchWorkstreams.map((ws) => (
                <div 
                  key={ws.id}
                  className="rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 hover:border-cyan-500/40 p-6 flex flex-col justify-between shadow-sm transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-technical font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        {ws.focus}
                      </span>
                      <span className="text-technical font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                        {t(ws.statusKey) || ws.statusBadge}
                      </span>
                    </div>

                    <h4 className="text-card-title text-base sm:text-lg font-bold text-brand-textPrimary tracking-tight mb-2.5">
                      {t(ws.titleKey)}
                    </h4>

                    <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-6">
                      {t(ws.descKey)}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {ws.techTags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-technical font-mono px-2 py-0.5 rounded bg-brand-surface dark:bg-slate-800 border border-brand-border text-brand-textSecondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Research Disclaimer */}
            <div className="mt-8 text-center sm:text-left">
              <p className="text-caption font-mono text-brand-textSecondary/80 leading-relaxed">
                {t("projects.dev.disclaimer")}
              </p>
            </div>
          </section>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03: CLIENT TESTIMONIALS — EDITORIAL PERSPECTIVES CLOSING SECTION   */}
      {/* ========================================================================= */}
      <section 
        id="testimonials"
        aria-labelledby={`${baseId}-testimonials-heading`}
        className="scroll-mt-28 relative w-full bg-brand-surface border-b border-brand-border py-16 md:py-20 lg:py-24 overflow-hidden"
      >
        {/* Editorial Curved Typographic Linework Background (No Repetitive Grid) */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 text-slate-800 dark:text-blue-300"
          style={{
            maskImage: "radial-gradient(ellipse 80% 60% at 75% 50%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 75% 50%, black 20%, transparent 80%)",
          }}
          aria-hidden="true"
        >
          <svg className="w-full h-full opacity-[0.04] dark:opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <path d="M -100 300 C 200 100, 600 400, 1200 150 C 1400 80, 1600 200, 1800 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M -100 360 C 200 160, 600 460, 1200 210 C 1400 140, 1600 260, 1800 160" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Single Asymmetric Editorial Layout (NO duplicate headings, NO empty card) */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-base border border-brand-border text-brand-primary text-caption font-mono font-bold tracking-wider mb-4">
                <MessageSquareQuote className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>
                  <span className="normal-case font-bold">pyBIM</span>
                  {" · "}
                  <span>{t("projects.testimonials.eyebrow") ? t("projects.testimonials.eyebrow").replace("pyBIM / ", "").replace("pyBIM · ", "") : "PERSPECTIVES"}</span>
                </span>
              </div>

              {/* Single Dominant Section Heading */}
              <h2 
                id={`${baseId}-testimonials-heading`}
                className="text-section-sm sm:text-section font-bold text-brand-textPrimary tracking-tight mb-4"
              >
                {t("projects.testimonials.title") || "Client Testimonials"}
              </h2>

              {/* Single Concise Description */}
              <p className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-6 max-w-2xl">
                {t("projects.testimonials.empty_desc") || 
                  "We are preparing authentic client perspectives. Verified feedback and collaboration reviews will be published here as projects conclude and formal authorization is received."}
              </p>

              {/* Understated Verification Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25 text-technical font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                <span>{t("projects.testimonials.badge") || "AUTHENTICATION // PENDING RELEASE APPROVAL"}</span>
              </div>
            </div>

            {/* Right Abstract Quotation Motif (Editorial Graphic) */}
            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end" aria-hidden="true">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-brand-card/80 dark:bg-slate-900/80 border border-brand-border/80 p-6 flex flex-col justify-between shadow-sm relative overflow-hidden text-brand-primary">
                <div className="flex items-center justify-between text-technical font-mono text-brand-textSecondary/60">
                  <span>EDITORIAL REF</span>
                  <span>pyBIM · VOICES</span>
                </div>

                <div className="my-auto flex items-center justify-center">
                  <svg viewBox="0 0 80 60" fill="currentColor" className="w-20 h-16 opacity-20 dark:opacity-30">
                    <path d="M 0 36 C 0 16, 16 4, 34 0 L 34 14 C 22 17, 16 23, 16 32 L 34 32 L 34 60 L 0 60 Z M 46 36 C 46 16, 62 4, 80 0 L 80 14 C 68 17, 62 23, 62 32 L 80 32 L 80 60 L 46 60 Z" />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-technical font-mono text-brand-textSecondary/70 border-t border-brand-border/60 pt-2">
                  <span>PERSPECTIVES</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">[IN PREP]</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
}
