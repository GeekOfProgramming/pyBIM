"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  Briefcase, 
  FileText, 
  MessageSquareQuote, 
  Info, 
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";

export default function SuccessStoriesPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Eyebrow and Headline copy
  const eyebrowText = t("projects.hero.eyebrow") || "pyBIM / SUCCESS STORIES";
  const testimonialsEyebrow = t("projects.testimonials.eyebrow") || "pyBIM / PERSPECTIVES";

  // Animation variants respecting user motion preferences
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
    <div className="w-full bg-brand-base text-brand-textPrimary overflow-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 01: SUCCESS STORIES — EDITORIAL HERO & PLANNED PROJECT INDEX     */}
      {/* ========================================================================= */}
      <section 
        id="success-stories"
        aria-label="Success Stories"
        className="relative w-full border-b border-brand-border/60 pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32 overflow-hidden scroll-mt-28"
      >
        {/* Architectural Canvas Grid & Coordinate Linework */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 text-slate-900 dark:text-blue-200"
          style={{
            maskImage: "radial-gradient(ellipse 80% 65% at 55% 40%, black 35%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 65% at 55% 40%, black 35%, transparent 85%)",
          }}
          aria-hidden="true"
        >
          <svg className="w-full h-full opacity-[0.05] dark:opacity-[0.10]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ss-minor-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.5" />
              </pattern>
              <pattern id="ss-major-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="url(#ss-minor-grid)" />
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.9" />
                <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="currentColor" strokeWidth="1.2" strokeOpacity="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ss-major-grid)" />
          </svg>
        </div>

        {/* Ambient Multi-Point Lighting */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[460px] bg-gradient-to-br from-blue-500/[0.08] via-indigo-500/[0.05] to-transparent dark:from-blue-500/[0.16] dark:via-indigo-500/[0.08] dark:to-transparent rounded-full blur-[100px] z-0"
        />
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-0 w-[400px] h-[340px] bg-blue-600/[0.03] dark:bg-blue-600/[0.06] rounded-full blur-[110px] z-0"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
          
          {/* Main Hero Grid: Narrative (Left) & Architectural Wireframe Schematic (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center mb-16 lg:mb-20">
            
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
                    {eyebrowText.includes("pyBIM") ? (
                      <>
                        <span className="normal-case">pyBIM</span>
                        {eyebrowText.replace("pyBIM", "")}
                      </>
                    ) : (
                      <>
                        <span className="normal-case">pyBIM</span>
                        {" · "}
                        {eyebrowText}
                      </>
                    )}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                  <span>{t("projects.hero.statusBadge") || "IN PREPARATION"}</span>
                </div>
              </motion.div>

              {/* Primary H1 Title */}
              <motion.h1 
                variants={itemVariants} 
                className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-4 leading-[1.1]"
              >
                {t("projects.hero.title") || "Success Stories"}
              </motion.h1>

              {/* Supporting Headline */}
              <motion.h2 
                variants={itemVariants} 
                className="text-card-title sm:text-section-sm font-bold text-brand-primary mb-6 leading-snug tracking-tight"
              >
                {t("projects.hero.supportingHeading") || "Engineering Work, Documented with Care."}
              </motion.h2>

              {/* Factual Description */}
              <motion.p 
                variants={itemVariants} 
                className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
              >
                {t("projects.hero.description") || 
                  "We're preparing a selection of BIM engineering work, project case studies, and client perspectives for publication once the relevant material has been reviewed and approved."}
              </motion.p>

              {/* Standardized CTAs */}
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

              {/* Preparation Guidance Note */}
              <motion.div 
                variants={itemVariants} 
                className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
              >
                <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                <span>{t("projects.hero.supportingNote")}</span>
              </motion.div>
            </motion.div>

            {/* Right Architectural Schematic Visual (Original Vector, NOT a fake card) */}
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
                    <span>PORTFOLIO ARCHITECTURE</span>
                  </span>
                  <span>CAD-REF // 0.00</span>
                </div>

                {/* Isometric Engineering Linework Graphic */}
                <div className="my-auto py-4">
                  <svg viewBox="0 0 400 220" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="ssGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
                      </linearGradient>
                      <linearGradient id="ssGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.04" />
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
                      <polygon points="200,80 270,115 200,150 130,115" fill="url(#ssGrad1)" />
                      <polygon points="130,115 200,150 200,185 130,150" fill="url(#ssGrad1)" />
                      <polygon points="200,150 270,115 270,150 200,185" fill="url(#ssGrad1)" />

                      {/* Cantilevered Top Volume */}
                      <polygon points="220,35 305,75 220,115 135,75" fill="url(#ssGrad2)" stroke="#38bdf8" />
                      <polygon points="135,75 220,115 220,135 135,95" fill="url(#ssGrad1)" />
                      <polygon points="220,115 305,75 305,95 220,135" fill="url(#ssGrad1)" />
                    </g>

                    {/* Dimension Witness Lines */}
                    <g stroke="currentColor" strokeWidth="0.8" opacity="0.7">
                      <line x1="305" y1="75" x2="350" y2="75" />
                      <line x1="345" y1="70" x2="355" y2="80" strokeWidth="1.2" />
                      <text x="360" y="78" fill="currentColor" fontSize="9" fontFamily="monospace">REF +7.2m</text>

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
                    <span>BIM SPECIFICATION INDEX</span>
                  </span>
                  <span className="text-brand-primary font-bold">[READY // IN-PREP]</span>
                </div>

              </div>
            </motion.div>

          </div>

          {/* ========================================================================= */}
          {/* PLANNED PROJECT DESTINATIONS: ALL PROJECTS & FEATURED CASE STUDIES        */}
          {/* ========================================================================= */}
          <div className="border-t border-brand-border/70 pt-12 lg:pt-14">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-technical font-mono font-bold text-brand-primary uppercase tracking-wider block mb-1">
                  {t("projects.preview.eyebrow") || "PROJECT SHOWCASE"}
                </span>
                <h3 className="text-card-title font-bold text-brand-textPrimary tracking-tight">
                  {t("projects.preview.heading") || "Planned Project References"}
                </h3>
              </div>
              <span className="self-start sm:self-auto text-technical font-mono uppercase tracking-widest text-brand-textSecondary px-3 py-1 rounded-md bg-brand-surface border border-brand-border font-semibold">
                {t("projects.preview.count") || "2 PORTFOLIO AREAS"}
              </span>
            </div>

            {/* Two Integrated Horizontal Publication Rows (Zero Duplication) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Destination 01: All Projects */}
              <article 
                id="all-projects"
                aria-labelledby={`${baseId}-all-projects-title`}
                className="scroll-mt-28 rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-brand-primary/40 transition-colors relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-brand-surface dark:bg-slate-800 border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                      {t("projects.all.tag") || "01"}
                    </span>
                    <span className="text-technical font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {t("projects.all.status") || "IN PREPARATION"}
                    </span>
                  </div>

                  <h4 
                    id={`${baseId}-all-projects-title`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5 flex items-center gap-2"
                  >
                    <Briefcase className="w-5 h-5 text-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("projects.all.title") || "All Projects"}</span>
                  </h4>

                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                    {t("projects.all.desc") || 
                      "Selected project references will be introduced here when technical information and publication permissions are available."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                  <span>pyBIM · PORTFOLIO-INDEX</span>
                  <span className="text-brand-primary font-semibold">// SPEC-01</span>
                </div>
              </article>

              {/* Destination 02: Featured Case Studies */}
              <article 
                id="featured"
                aria-labelledby={`${baseId}-featured-title`}
                className="scroll-mt-28 rounded-3xl bg-brand-card/90 dark:bg-slate-900/90 border border-brand-border/80 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-brand-primary/40 transition-colors relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-brand-surface dark:bg-slate-800 border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                      {t("projects.featured.tag") || "02"}
                    </span>
                    <span className="text-technical font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {t("projects.featured.status") || "IN PREPARATION"}
                    </span>
                  </div>

                  <h4 
                    id={`${baseId}-featured-title`}
                    className="text-card-title font-bold text-brand-textPrimary tracking-tight mb-2.5 flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5 text-brand-primary shrink-0" aria-hidden="true" />
                    <span>{t("projects.featured.title") || "Featured Case Studies"}</span>
                  </h4>

                  <p className="text-body-sm text-brand-textSecondary font-normal leading-relaxed">
                    {t("projects.featured.desc") || 
                      "Detailed case studies will be added when the underlying engineering work and supporting documentation are ready for publication."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                  <span>pyBIM · TECHNICAL-ANALYSIS</span>
                  <span className="text-brand-primary font-semibold">// SPEC-02</span>
                </div>
              </article>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 02: CLIENT TESTIMONIALS — STANDALONE FULL-WIDTH SECTION          */}
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
              {t("projects.testimonials.desc") || 
                "Client feedback will be published only when it is authentic and approved for public use."}
            </p>
          </div>

          {/* Dedicated Empty-State Surface (Authentic, Minimal, No Fake Reviews) */}
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
                    {t("projects.testimonials.title") || "Client Testimonials"}
                  </h3>
                  <p className="text-body text-brand-textSecondary font-normal leading-relaxed">
                    {t("projects.testimonials.message") || 
                      "We're preparing this space for genuine client perspectives. Verified feedback will be shared here once approved for publication."}
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
                  <span>AUTHENTICATION // PENDING APPROVAL</span>
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
