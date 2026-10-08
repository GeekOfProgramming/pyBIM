"use client";

import { useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  BookOpen, 
  FileText, 
  Wrench, 
  GraduationCap,
  Info,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";

export default function EducationPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  const previewAreas = [
    {
      num: "01",
      icon: BookOpen,
      title: t("education.area1.title") || "BIM Tutorials & Guides",
      desc: t("education.area1.desc") || "Practical learning material for BIM workflows and engineering software.",
      status: t("education.statusBadge") || "IN PREPARATION"
    },
    {
      num: "02",
      icon: FileText,
      title: t("education.area2.title") || "Engineering Notes & Updates",
      desc: t("education.area2.desc") || "Technical articles and updates focused on relevant engineering topics.",
      status: t("education.statusBadge") || "IN PREPARATION"
    },
    {
      num: "03",
      icon: Wrench,
      title: t("education.area3.title") || "Workflow & Tool Guides",
      desc: t("education.area3.desc") || "Guidance on engineering workflows and selected tools as material becomes available.",
      status: t("education.statusBadge") || "IN PREPARATION"
    }
  ];

  // Headline extraction supporting two-part display across all locales
  const headlinePart1 = t("education.headlinePart1") || "Engineering Knowledge.";
  const headlinePart2 = t("education.headlinePart2") || "Coming Soon.";
  const eyebrowText = t("education.eyebrow") || "pyBIM Education & Training";
  const previewFooterText = t("education.previewFooter") || "pyBIM · Knowledge Preview";

  // Animation variants respecting reduced motion
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
    <div className="relative w-full min-h-[calc(100vh-5rem)] bg-brand-base flex flex-col justify-center overflow-hidden">
      
      {/* ================= LAYER A & B: TECHNICAL ARCHITECTURAL DRAFTING CANVAS ================= */}
      {/* Precision Drafting Grid with Dual Minor/Major Lines & Coordinate Crosshairs */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 text-slate-900 dark:text-blue-200"
        style={{
          maskImage: "radial-gradient(ellipse 85% 75% at 65% 45%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 65% 45%, black 40%, transparent 90%)",
        }}
        aria-hidden="true"
      >
        <svg 
          className="w-full h-full opacity-[0.06] dark:opacity-[0.14]" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Minor 15px Sub-grid */}
            <pattern id="edu-minor-grid" width="15" height="15" patternUnits="userSpaceOnUse">
              <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>
            {/* Major 60px Structural Grid */}
            <pattern id="edu-major-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="url(#edu-minor-grid)" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.9" />
              {/* Intersection Coordinate Crosshair (+) */}
              <path d="M -4 0 L 4 0 M 0 -4 L 0 4" stroke="currentColor" strokeWidth="1.2" strokeOpacity="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-major-grid)" />
        </svg>
      </div>

      {/* Subtle CAD Drafting Axis Callouts in Canvas Negative Space */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden font-mono text-[10px] tracking-widest text-slate-500/[0.22] dark:text-blue-400/[0.25]"
      >
        <span className="hidden xl:block absolute top-12 left-16">
          // COORD-GRID: 60x60mm · ISO-PROJECTION
        </span>
        <span className="hidden lg:block absolute top-12 right-24">
          // AXIS-REF: +Z [0.00 / +3.60 / +7.20]
        </span>
        <span className="hidden xl:block absolute bottom-12 left-20">
          // DATUM: pyBIM-KNOWLEDGE-WORKSPACE
        </span>
      </div>

      {/* ================= LAYER D: TARGETED ATMOSPHERIC LIGHTING ================= */}
      {/* 1. Primary Blue/Indigo Ambient Core framing the Geometry Motif & Knowledge Panel */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-16 right-[-80px] lg:right-12 w-[520px] h-[460px] bg-gradient-to-br from-blue-500/[0.10] via-indigo-500/[0.06] to-transparent dark:from-blue-500/[0.18] dark:via-indigo-500/[0.10] dark:to-transparent rounded-full blur-[100px] z-0" 
      />

      {/* 2. Secondary Cyan Highlight anchoring the Lower Panel */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-4 right-10 lg:right-32 w-[380px] h-[320px] bg-gradient-to-tr from-cyan-500/[0.05] to-transparent dark:from-cyan-400/[0.09] dark:to-transparent rounded-full blur-[90px] z-0" 
      />

      {/* 3. Subtle Warm Ambient Fill balancing the Left Hero */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-16 left-[-60px] lg:left-10 w-[420px] h-[360px] bg-blue-600/[0.03] dark:bg-blue-600/[0.06] rounded-full blur-[120px] z-0" 
      />

      {/* ================= LAYER C: ARCHITECTURAL / BIM GEOMETRY MOTIF ================= */}
      {/* Isometric Structural Prisms, Coordination Planes & Dimension Witness Lines */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-10 -right-20 sm:-right-8 lg:right-[-20px] xl:right-10 w-[540px] sm:w-[640px] lg:w-[740px] h-[480px] sm:h-[540px] lg:h-[620px] z-0 select-none opacity-30 sm:opacity-45 dark:opacity-75 text-slate-600 dark:text-blue-300 transition-opacity duration-300"
      >
        <svg 
          viewBox="0 0 740 620" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Top Plane Gradient Fill */}
            <linearGradient id="eduIsoTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
            </linearGradient>
            {/* Left Front Plane Gradient */}
            <linearGradient id="eduIsoFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.01" />
            </linearGradient>
            {/* Right Side Plane Gradient */}
            <linearGradient id="eduIsoSide" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
            {/* Subtle Cyan Accented Plane */}
            <linearGradient id="eduCyanPlane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Coordinate Origin & Directional Vectors (X, Y, Z) */}
          <g opacity="0.8">
            <line x1="420" y1="340" x2="620" y2="455" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" />
            <line x1="420" y1="340" x2="220" y2="455" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" />
            <line x1="420" y1="340" x2="420" y2="120" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" />
            {/* Direction Labels */}
            <text x="630" y="465" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.7">AXIS +X</text>
            <text x="165" y="465" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.7">AXIS +Y</text>
            <text x="412" y="105" fill="currentColor" fontSize="10" fontFamily="monospace" opacity="0.7">AXIS +Z</text>
          </g>

          {/* Isometric Ground Spatial Grid Plane */}
          <g opacity="0.45" stroke="currentColor" strokeWidth="0.75">
            <line x1="280" y1="420" x2="520" y2="558" />
            <line x1="320" y1="397" x2="560" y2="535" />
            <line x1="360" y1="374" x2="600" y2="512" />
            <line x1="400" y1="351" x2="640" y2="489" />

            <line x1="480" y1="374" x2="240" y2="512" />
            <line x1="520" y1="397" x2="280" y2="535" />
            <line x1="560" y1="420" x2="320" y2="558" />
            <line x1="600" y1="443" x2="360" y2="581" />
          </g>

          {/* Base Structural Volume (Level 00) */}
          <g stroke="currentColor" strokeWidth="1.25">
            {/* Top Face */}
            <polygon points="420,290 540,360 420,430 300,360" fill="url(#eduIsoTop)" />
            {/* Left Face */}
            <polygon points="300,360 420,430 420,490 300,420" fill="url(#eduIsoFront)" />
            {/* Right Face */}
            <polygon points="420,430 540,360 540,420 420,490" fill="url(#eduIsoSide)" />
          </g>

          {/* Elevated Cantilevered Floor Volume (Level 01) */}
          <g stroke="currentColor" strokeWidth="1.25">
            {/* Upper Offset Structural Prism */}
            <polygon points="450,180 600,265 450,350 300,265" fill="url(#eduCyanPlane)" stroke="#38bdf8" strokeWidth="1.2" />
            <polygon points="300,265 450,350 450,390 300,305" fill="url(#eduIsoFront)" />
            <polygon points="450,350 600,265 600,305 450,390" fill="url(#eduIsoSide)" />
          </g>

          {/* Structural Core Column / Tower Volume (Level 02) */}
          <g stroke="currentColor" strokeWidth="1.25">
            <polygon points="420,110 490,150 420,190 350,150" fill="url(#eduIsoTop)" />
            <polygon points="350,150 420,190 420,270 350,230" fill="url(#eduIsoFront)" />
            <polygon points="420,190 490,150 490,230 420,270" fill="url(#eduIsoSide)" />
          </g>

          {/* Hidden Internal Wireframe Lines */}
          <g stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6">
            <line x1="300" y1="360" x2="420" y2="420" />
            <line x1="420" y1="420" x2="540" y2="360" />
            <line x1="420" y1="420" x2="420" y2="490" />
          </g>

          {/* Dimension Witness Lines & Level Indicators */}
          <g stroke="currentColor" strokeWidth="0.8" opacity="0.75">
            {/* Level 02 Marker */}
            <line x1="490" y1="110" x2="590" y2="110" />
            <line x1="585" y1="105" x2="595" y2="115" strokeWidth="1.5" />
            <text x="602" y="113" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">LVL 02 // +7.20m</text>

            {/* Level 01 Marker */}
            <line x1="600" y1="265" x2="680" y2="265" />
            <line x1="675" y1="260" x2="685" y2="270" strokeWidth="1.5" />
            <text x="692" y="268" fill="currentColor" fontSize="10" fontFamily="monospace" fontWeight="bold">LVL 01 // +3.60m</text>

            {/* Datum Base Marker */}
            <line x1="540" y1="490" x2="630" y2="490" />
            <line x1="625" y1="485" x2="635" y2="495" strokeWidth="1.5" />
            <text x="642" y="493" fill="currentColor" fontSize="10" fontFamily="monospace">BASE // ±0.00</text>
          </g>

          {/* Structural Precision Nodes (Intersections) */}
          <g fill="currentColor" opacity="0.85">
            <circle cx="420" cy="110" r="3" />
            <circle cx="450" cy="180" r="3" />
            <circle cx="600" cy="265" r="3.5" fill="#38bdf8" />
            <circle cx="300" cy="265" r="3" />
            <circle cx="450" cy="350" r="3.5" fill="#38bdf8" />
            <circle cx="420" cy="430" r="3" />
            <circle cx="420" cy="490" r="3" />
          </g>
        </svg>
      </div>

      {/* Edge Falloff Shadow in Dark Mode */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-base to-transparent opacity-0 dark:opacity-80 z-0" 
      />

      {/* ================= MAIN CONTENT LAYER ================= */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20 lg:py-24 w-full z-10">
        
        {/* Asymmetrical Editorial Composition: Left Narrative / Right Technical Knowledge Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          
          {/* ================= LEFT COLUMN: Editorial Hero & Actions ================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow & Calm In Preparation Status */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6">
              {/* Brand Eyebrow Badge (Guarantees pyBIM is never uppercase-forced) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/25 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-caption font-mono font-bold tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
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

              {/* Calm Status Badge without intrusive pulse */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                <span>{t("education.statusBadge") || "IN PREPARATION"}</span>
              </div>
            </motion.div>

            {/* Two-Part Editorial Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-6 leading-[1.1]"
            >
              <span>{headlinePart1}</span>{" "}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
                {headlinePart2}
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              variants={itemVariants} 
              className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {t("education.description")}
            </motion.p>

            {/* CTA Group: Standardized CtaLink with High-Legibility Typography */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6"
            >
              <CtaLink
                href="/services"
                variant="primary"
                className="!text-[13px] sm:!text-[14px] !tracking-wide normal-case"
              >
                {t("education.primaryCta") || "Explore Our Services"}
              </CtaLink>

              <CtaLink
                href="/contact"
                variant="secondary"
                className="!text-[13px] sm:!text-[14px] !tracking-wide normal-case"
              >
                {t("education.secondaryCta") || "Contact pyBIM"}
              </CtaLink>
            </motion.div>

            {/* Secondary Preparation Note */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
            >
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
              <span>{t("education.secondaryNote")}</span>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Architectural Knowledge Blueprint Sheet ================= */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
            role="region"
            aria-labelledby={`${baseId}-preview-heading`}
          >
            {/* Unified Technical Blueprint Specification Sheet */}
            <div className="rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 border border-brand-border/80 dark:border-slate-800 shadow-xl shadow-brand-base/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md p-6 sm:p-7 relative overflow-hidden">
              
              {/* Subtle Hairline Top Gradient Accent */}
              <div 
                aria-hidden="true" 
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-cyan-400/40 to-transparent" 
              />

              {/* Panel Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-brand-border/70 dark:border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                  <h2 
                    id={`${baseId}-preview-heading`}
                    className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary"
                  >
                    {t("education.previewEyebrow") || "KNOWLEDGE AREAS"}
                  </h2>
                </div>

                <span className="text-technical font-mono uppercase tracking-widest text-brand-textSecondary px-2.5 py-1 rounded-md bg-brand-surface dark:bg-slate-800/80 border border-brand-border/70 dark:border-slate-700/60 font-semibold">
                  {t("education.moduleCount") || "3 CONTENT AREAS"}
                </span>
              </div>

              {/* Unified Editorial Rows with Hairline Dividers */}
              <div className="divide-y divide-brand-border/60 dark:divide-slate-800/80">
                {previewAreas.map((area) => {
                  const IconComponent = area.icon;

                  return (
                    <article
                      key={area.num}
                      className="py-4 first:pt-2 last:pb-1 px-3 -mx-3 rounded-2xl hover:bg-brand-surface/50 dark:hover:bg-slate-800/40 transition-colors flex items-start gap-3.5"
                    >
                      {/* Numeric Index Badge */}
                      <span className="w-8 h-8 rounded-xl bg-brand-surface dark:bg-slate-800/90 border border-brand-border/80 dark:border-slate-700/80 text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0 mt-0.5">
                        {area.num}
                      </span>

                      {/* Content Area Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <IconComponent className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                            <h3 className="text-body-sm font-bold text-brand-textPrimary tracking-tight leading-snug">
                              {area.title}
                            </h3>
                          </div>
                          <span className="hidden sm:inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                            {area.status}
                          </span>
                        </div>
                        <p className="text-caption text-brand-textSecondary font-medium leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Panel Footer Annotation (Standardized Branding, No Fake Year) */}
              <div className="mt-4 pt-4 border-t border-brand-border/60 dark:border-slate-800/80 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                  <span>
                    {previewFooterText.includes("pyBIM") ? (
                      <>
                        <span className="normal-case font-semibold">pyBIM</span>
                        {previewFooterText.replace("pyBIM", "")}
                      </>
                    ) : (
                      previewFooterText
                    )}
                  </span>
                </span>
                <span className="text-brand-primary font-bold uppercase tracking-wider">
                  [SPEC // PREVIEW]
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
