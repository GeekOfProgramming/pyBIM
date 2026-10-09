"use client";

import { useId } from "react";
import Link from "next/link";
import CtaLink from "@/components/ui/cta-link";
import { 
  Briefcase, 
  FileText, 
  MessageSquareQuote, 
  Info, 
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  GitBranch,
  Sliders,
  Workflow,
  Lock,
  Binary,
  Check
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

  // Eyebrows and headings
  const heroEyebrow = t("projects.hero.eyebrow") || "pyBIM / SUCCESS STORIES";
  const completedEyebrow = t("projects.completed.eyebrow") || "COMPLETED ENGINEERING";
  const devEyebrow = t("projects.dev.eyebrow") || "APPLIED RESEARCH & DEVELOPMENT";
  const testimonialsEyebrow = t("projects.testimonials.eyebrow") || "pyBIM / PERSPECTIVES";

  // Filter approved projects (currently 0 pending owner case study sign-off)
  const approvedCompletedProjects = curatedCompletedProjects.filter(
    (project) => project.isApprovedForPublication === true
  );

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
    <div className="w-full bg-brand-base text-brand-textPrimary overflow-hidden selection:bg-brand-primary/20 selection:text-brand-primary">
      
      {/* ========================================================================= */}
      {/* SECTION 01: HERO — EDITORIAL PORTFOLIO & R&D INTRODUCTION                */}
      {/* ========================================================================= */}
      <section 
        id="success-stories"
        aria-label="Success Stories Hero"
        className="relative w-full border-b border-brand-border/60 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 overflow-hidden scroll-mt-28"
      >
        {/* Architectural Vector Background Grid */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 text-slate-900 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 80% 65% at 55% 35%, black 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 55% 35%, black 30%, transparent 85%)",
          }}
          aria-hidden="true"
        >
          <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-minor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
              </pattern>
              <pattern id="hero-major-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#hero-minor-grid)" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.8" />
                <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-major-grid)" />
          </svg>
        </div>

        {/* Ambient Multi-Point Lighting */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-[540px] h-[480px] bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.05] to-transparent dark:from-blue-500/[0.15] dark:via-cyan-500/[0.08] dark:to-transparent rounded-full blur-[110px] z-0"
        />
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 w-[420px] h-[360px] bg-blue-600/[0.04] dark:bg-blue-600/[0.07] rounded-full blur-[120px] z-0"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Main Grid: Narrative (Left) & Subtle Engineering Vector Graphic (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center mb-12 lg:mb-16">
            
            {/* Left Narrative Column */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 flex flex-col items-start text-left"
            >
              {/* Eyebrow & Status Badge */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/25 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-caption font-mono font-bold tracking-wider">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                  <span>
                    {heroEyebrow.includes("pyBIM") ? (
                      <>
                        <span className="normal-case">pyBIM</span>
                        {heroEyebrow.replace("pyBIM", "")}
                      </>
                    ) : (
                      <>
                        <span className="normal-case">pyBIM</span>
                        {" · "}
                        {heroEyebrow}
                      </>
                    )}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                  <span>{t("projects.hero.statusBadge") || "IN PREPARATION"}</span>
                </div>
              </motion.div>

              {/* H1 Title: strictly "Success Stories" */}
              <motion.h1 
                variants={itemVariants} 
                className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-4 leading-[1.1]"
              >
                {t("projects.hero.title") || "Success Stories"}
              </motion.h1>

              {/* Supporting Editorial Headline: "Engineering Projects & Applied Research" */}
              <motion.h2 
                variants={itemVariants} 
                className="text-card-title sm:text-section-sm font-bold text-brand-primary mb-6 leading-snug tracking-tight"
              >
                {t("projects.hero.supportingHeading") || "Engineering Projects & Applied Research"}
              </motion.h2>

              {/* Factual Description */}
              <motion.p 
                variants={itemVariants} 
                className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
              >
                {t("projects.hero.description") || 
                  "Explore the structure of our engineering portfolio, from completed BIM work to ongoing research in AI-assisted engineering and LLM-based workflows."}
              </motion.p>

              {/* Primary CTAs */}
              <motion.div 
                variants={itemVariants} 
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
                variants={itemVariants} 
                className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
              >
                <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>{t("projects.hero.supportingNote")}</span>
              </motion.div>
            </motion.div>

            {/* Right Engineering Visual (Refined Technical Axonometric Linework) */}
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 w-full flex items-center justify-center relative"
              aria-hidden="true"
            >
              <div className="w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl border border-brand-border/80 bg-brand-card/90 dark:bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden text-slate-600 dark:text-blue-300">
                
                {/* Visual Header Annotation */}
                <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 text-technical font-mono text-brand-textSecondary">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary" />
                    <span>PORTFOLIO SYSTEM // CAD-REF 0.00</span>
                  </span>
                  <span className="text-brand-primary font-semibold">[ISO 19650 ALIGNED]</span>
                </div>

                {/* Isometric Engineering Linework Graphic */}
                <div className="my-auto py-4">
                  <svg viewBox="0 0 400 220" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ssHeroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
                      </linearGradient>
                      <linearGradient id="ssHeroGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {/* Ground Plane Grid */}
                    <g opacity="0.4" stroke="currentColor" strokeWidth="0.75">
                      <line x1="80" y1="160" x2="200" y2="205" />
                      <line x1="120" y1="145" x2="240" y2="190" />
                      <line x1="160" y1="130" x2="280" y2="175" />
                      <line x1="200" y1="115" x2="320" y2="160" />

                      <line x1="160" y1="190" x2="280" y2="145" />
                      <line x1="200" y1="205" x2="320" y2="160" />
                      <line x1="120" y1="175" x2="240" y2="130" />
                    </g>

                    {/* Primary Axonometric Prisms */}
                    <g stroke="currentColor" strokeWidth="1.2">
                      {/* Base Massing */}
                      <polygon points="200,80 270,115 200,150 130,115" fill="url(#ssHeroGrad1)" />
                      <polygon points="130,115 200,150 200,185 130,150" fill="url(#ssHeroGrad1)" />
                      <polygon points="200,150 270,115 270,150 200,185" fill="url(#ssHeroGrad1)" />

                      {/* Cantilevered Volume */}
                      <polygon points="220,35 305,75 220,115 135,75" fill="url(#ssHeroGrad2)" stroke="#38bdf8" />
                      <polygon points="135,75 220,115 220,135 135,95" fill="url(#ssHeroGrad1)" />
                      <polygon points="220,115 305,75 305,95 220,135" fill="url(#ssHeroGrad1)" />
                    </g>

                    {/* Dimension Witness Lines */}
                    <g stroke="currentColor" strokeWidth="0.8" opacity="0.7">
                      <line x1="305" y1="75" x2="350" y2="75" />
                      <line x1="345" y1="70" x2="355" y2="80" strokeWidth="1.2" />
                      <text x="360" y="78" fill="currentColor" fontSize="9" fontFamily="monospace">LVL +7.2m</text>

                      <line x1="270" y1="150" x2="330" y2="150" />
                      <line x1="325" y1="145" x2="335" y2="155" strokeWidth="1.2" />
                      <text x="340" y="153" fill="currentColor" fontSize="9" fontFamily="monospace">LVL +3.6m</text>
                    </g>
                  </svg>
                </div>

                {/* Visual Footer Annotation */}
                <div className="flex items-center justify-between border-t border-brand-border/60 pt-3 text-technical font-mono text-brand-textSecondary">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-primary" />
                    <span>ENGINEERING SPECIFICATION</span>
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">[READY // IN-PREP]</span>
                </div>

              </div>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* PRIMARY ON-PAGE SECTION NAVIGATOR (Horizontal section index)              */}
          {/* ========================================================================= */}
          <nav 
            aria-label="Success Stories section index"
            className="pt-6 border-t border-brand-border/60 flex flex-wrap items-center justify-start gap-3 sm:gap-4"
          >
            <span className="text-technical font-mono uppercase tracking-wider text-brand-textSecondary mr-2 hidden sm:inline-block">
              INDEX:
            </span>

            {/* Jump to Completed Projects */}
            <a
              href="#completed-projects"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-brand-primary/50 text-body-sm font-semibold text-brand-textPrimary hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.completed") || "Completed Projects"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-brand-primary">#01</span>
            </a>

            {/* Jump to AI & LLM Development */}
            <a
              href="#in-development"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-cyan-500/50 text-body-sm font-semibold text-brand-textPrimary hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm"
            >
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.development") || "AI & LLM Development"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-cyan-500">#02</span>
            </a>

            {/* Jump to Client Testimonials */}
            <a
              href="#testimonials"
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-brand-surface dark:bg-slate-900 border border-brand-border/80 hover:border-brand-primary/50 text-body-sm font-semibold text-brand-textPrimary hover:text-brand-primary transition-all duration-200 shadow-sm"
            >
              <MessageSquareQuote className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span>{t("projects.nav.testimonials") || "Client Testimonials"}</span>
              <span className="text-caption font-mono text-brand-textSecondary/60 group-hover:text-brand-primary">#03</span>
            </a>
          </nav>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02A: COMPLETED PROJECTS — DELIVERED ENGINEERING WORK              */}
      {/* ========================================================================= */}
      {/* Backward-compatibility anchor alias for #all-projects without ID conflict */}
      <div id="all-projects" className="relative -top-28 sr-only" aria-hidden="true" tabIndex={-1} />

      <section 
        id="completed-projects"
        aria-labelledby={`${baseId}-completed-heading`}
        className="scroll-mt-28 relative w-full border-b border-brand-border/60 py-20 md:py-24 lg:py-28 bg-brand-base overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-caption font-mono font-bold text-brand-primary tracking-wider uppercase mb-3">
                <Briefcase className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>{completedEyebrow}</span>
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
              <span>STATUS: IN PREPARATION</span>
            </div>
          </div>

          {/* Conditional Gallery Architecture: Strict Publication Safeguard */}
          {approvedCompletedProjects.length > 0 ? (
            /* Future Public Gallery grid when explicit owner release agreements are provided */
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
            /* Elegant, compact holding state card with OpenBIM & ISO alignment */
            <div className="rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
              
              {/* Subtle Architectural Grid Accent */}
              <div 
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px]"
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                
                <div className="flex items-start gap-5 max-w-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-950/50 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-1">
                    <Briefcase className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-caption font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded">
                        {t("projects.completed.badge") || "Curated References // In Preparation"}
                      </span>
                    </div>

                    <h3 className="text-card-title font-bold text-brand-textPrimary mb-2 tracking-tight">
                      {t("projects.completed.empty_title") || "Portfolio References in Preparation"}
                    </h3>

                    <p className="text-body text-brand-textSecondary font-normal leading-relaxed mb-4">
                      {t("projects.completed.empty_desc") || 
                        "Our completed project records and technical case studies are being compiled and reviewed for publication. Only authorized engineering work with formal release approval will appear here."}
                    </p>

                    <p className="text-caption font-mono text-brand-textSecondary/80 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                      <span>{t("projects.completed.safeguard")}</span>
                    </p>
                  </div>
                </div>

                {/* Delivery Discipline Pillars */}
                <div className="shrink-0 flex flex-col gap-2.5 w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-brand-border/80 pt-6 lg:pt-0 lg:pl-8">
                  <div className="text-technical font-mono text-brand-textSecondary uppercase tracking-wider mb-1">
                    DELIVERY DOMAINS IN COMPILATION:
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-body-sm font-medium text-brand-textPrimary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>OpenBIM & IFC Schema Delivery</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-body-sm font-medium text-brand-textPrimary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Revit Parameter & pyRevit Automation</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-body-sm font-medium text-brand-textPrimary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>ISO 19650 Information Management</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02B: IN DEVELOPMENT — APPLIED AI & LLM RESEARCH SHOWCASE         */}
      {/* ========================================================================= */}
      {/* Backward-compatibility anchor alias for #featured without ID conflict */}
      <div id="featured" className="relative -top-28 sr-only" aria-hidden="true" tabIndex={-1} />

      <section 
        id="in-development"
        aria-labelledby={`${baseId}-dev-heading`}
        className="scroll-mt-28 relative w-full border-b border-brand-border/60 py-20 md:py-24 lg:py-28 bg-slate-900/[0.03] dark:bg-slate-950/50 overflow-hidden"
      >
        {/* Subtle Cyan / Blue Ambient Glow for Technical R&D Look */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] bg-cyan-500/[0.04] dark:bg-cyan-500/[0.08] rounded-full blur-[130px] z-0"
        />
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-600/[0.04] dark:bg-blue-600/[0.08] rounded-full blur-[120px] z-0"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-950/40 border border-cyan-500/25 dark:border-cyan-400/30 text-caption font-mono font-bold text-cyan-700 dark:text-cyan-300 tracking-wider uppercase mb-3">
                <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" aria-hidden="true" />
                <span>{devEyebrow}</span>
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
              <span>R&D LAB // ACTIVE EXPLORATION</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 1. VISUAL SYSTEM PIPELINE SCHEMATIC (5-Stage Architecture Flow)          */}
          {/* ========================================================================= */}
          <div className="mb-14 rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 border border-cyan-500/30 dark:border-cyan-500/25 p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
            
            {/* Header of the Schematic */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/70 pb-5 mb-8">
              <div>
                <span className="text-technical font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                  SYSTEM SCHEMATIC // FLOW-ARCH 01
                </span>
                <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                  <span>{t("projects.dev.diagram_title") || "pyBIM Applied AI Research Pipeline"}</span>
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 text-technical font-mono px-3 py-1 rounded bg-slate-500/10 text-brand-textSecondary border border-brand-border">
                <span>MODEL: CONCEPTUAL ARCHITECTURE</span>
              </div>
            </div>

            {/* 5-Stage Connected Pipeline (Horizontal on large screens, vertical with connector line on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-3 relative">
              
              {aiPipelineSteps.map((stepItem, idx) => (
                <div 
                  key={stepItem.step}
                  className={`relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-200 ${
                    stepItem.isGate 
                      ? "bg-amber-500/[0.07] dark:bg-amber-950/30 border-amber-500/50 dark:border-amber-400/40 shadow-sm ring-1 ring-amber-500/20" 
                      : "bg-brand-surface dark:bg-slate-800/60 border-brand-border/80 hover:border-cyan-500/40"
                  }`}
                >
                  <div>
                    {/* Step Index and Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-caption ${
                        stepItem.isGate 
                          ? "bg-amber-500 text-slate-950" 
                          : "bg-cyan-500/10 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-300 border border-cyan-500/20"
                      }`}>
                        0{stepItem.step}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        stepItem.isGate
                          ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 font-semibold"
                          : "bg-slate-500/10 text-brand-textSecondary"
                      }`}>
                        {stepItem.badge}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h4 className={`text-body-sm font-bold tracking-tight mb-2 ${
                      stepItem.isGate ? "text-amber-900 dark:text-amber-200 font-extrabold" : "text-brand-textPrimary"
                    }`}>
                      {t(stepItem.titleKey)}
                    </h4>

                    {/* Step Description */}
                    <p className="text-caption text-brand-textSecondary leading-relaxed">
                      {t(stepItem.descKey)}
                    </p>
                  </div>

                  {/* Flow Arrow Indicator between columns on desktop */}
                  {idx < aiPipelineSteps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-brand-surface dark:bg-slate-800 border border-brand-border items-center justify-center text-brand-textSecondary shadow-sm pointer-events-none">
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                  )}
                </div>
              ))}

            </div>

            {/* Mandatory Human Engineering Review Notice Callout */}
            <div className="mt-8 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 p-4 sm:p-5 flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="text-technical font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-1">
                  MANDATORY HUMAN-IN-THE-LOOP SAFEGUARD
                </span>
                <p className="text-body-sm text-amber-950 dark:text-amber-100 font-normal leading-relaxed">
                  {t("projects.dev.human_review_notice") || 
                    "Human Engineering Oversight: All LLM experiments operate under strict engineer-in-the-loop validation. Outputs are never autonomous."}
                </p>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 2. ACTIVE RESEARCH WORKSTREAMS LEDGER                                     */}
          {/* ========================================================================= */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
                <span>{t("projects.dev.workstreams_heading") || "Active Research Workstreams"}</span>
              </h3>
              <span className="text-technical font-mono text-brand-textSecondary uppercase">
                3 INITIATIVES UNDER EVALUATION
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
                    {/* Status Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-technical font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                        {ws.focus}
                      </span>
                      <span className="text-technical font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/25">
                        {t(ws.statusKey) || ws.statusBadge}
                      </span>
                    </div>

                    {/* Workstream Title */}
                    <h4 className="text-card-title text-base sm:text-lg font-bold text-brand-textPrimary tracking-tight mb-2.5">
                      {t(ws.titleKey)}
                    </h4>

                    {/* Description */}
                    <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed mb-6">
                      {t(ws.descKey)}
                    </p>
                  </div>

                  {/* Technical Tags */}
                  <div className="pt-4 border-t border-brand-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {ws.techTags.map((tag) => (
                        <span 
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-surface dark:bg-slate-800 border border-brand-border text-brand-textSecondary"
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
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 03: CLIENT TESTIMONIALS — STANDALONE AUTHENTIC REVIEWS SECTION    */}
      {/* ========================================================================= */}
      <section 
        id="testimonials"
        aria-labelledby={`${baseId}-testimonials-heading`}
        className="scroll-mt-28 relative w-full bg-brand-surface border-b border-brand-border py-20 md:py-24 lg:py-28 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col items-start text-left max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-base border border-brand-border text-brand-primary text-caption font-mono font-bold tracking-wider">
                <MessageSquareQuote className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>
                  {testimonialsEyebrow.includes("pyBIM") ? (
                    <>
                      <span className="normal-case">pyBIM</span>
                      {testimonialsEyebrow.replace("pyBIM", "")}
                    </>
                  ) : (
                    testimonialsEyebrow
                  )}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                <span>{t("projects.testimonials.status") || "IN PREPARATION"}</span>
              </div>
            </div>

            <h2 
              id={`${baseId}-testimonials-heading`}
              className="text-section-sm sm:text-section font-bold text-brand-textPrimary tracking-tight mb-4"
            >
              {t("projects.testimonials.title") || "Client Testimonials"}
            </h2>

            <p className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed">
              {t("projects.testimonials.subtitle") || 
                "Authentic perspectives and feedback from engineering collaborations."}
            </p>
          </div>

          {/* Dedicated Empty-State Surface (Strictly Authentic, No Fake Reviews or Artificial Stars) */}
          <div className="rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
            
            {/* Subtle Architectural Grid Accent */}
            <div 
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px]"
            />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              
              <div className="flex items-start gap-5 max-w-2xl">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0 mt-1">
                  <MessageSquareQuote className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-card-title font-bold text-brand-textPrimary mb-2 tracking-tight">
                    {t("projects.testimonials.empty_title") || "Client Perspectives in Preparation"}
                  </h3>
                  <p className="text-body text-brand-textSecondary font-normal leading-relaxed">
                    {t("projects.testimonials.empty_desc") || 
                      "We are preparing authentic client perspectives. Verified feedback and collaboration reviews will be published here as projects conclude and formal authorization is received."}
                  </p>
                </div>
              </div>

              {/* Status and Verification Badge */}
              <div className="shrink-0 flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 md:border-l border-brand-border/80 pt-4 md:pt-0 md:pl-8 w-full md:w-auto">
                <span className="text-technical font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full">
                  {t("projects.testimonials.status") || "IN PREPARATION"}
                </span>
                <span className="text-technical font-mono text-brand-textSecondary flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                  <span>{t("projects.testimonials.badge") || "AUTHENTICATION // PENDING RELEASE APPROVAL"}</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
