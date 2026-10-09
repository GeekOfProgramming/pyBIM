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
import ArchitecturalCanvas from "@/components/education/architectural-canvas";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

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
    },
    {
      num: "02",
      icon: FileText,
      title: t("education.area2.title") || "Engineering Notes & Updates",
      desc: t("education.area2.desc") || "Technical articles and updates focused on relevant engineering topics.",
    },
    {
      num: "03",
      icon: Wrench,
      title: t("education.area3.title") || "Workflow & Tool Guides",
      desc: t("education.area3.desc") || "Guidance on engineering workflows and selected tools as material becomes available.",
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
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div id="education-intro" className="scroll-mt-28 relative w-full bg-brand-base overflow-hidden">
      
      {/* Family A (Base) Unified Architectural Backdrop */}
      <EngineeringBackdrop variant="base" />

      {/* ================= MAIN CONTENT LAYER ================= */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 w-full z-10">
        
        {/* Asymmetrical Editorial Composition: Left Narrative / Right Integrated Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-start">
          
          {/* ================= LEFT COLUMN: Editorial Hero & Actions ================= */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left lg:pt-2"
          >
            {/* Eyebrow & Calm In Preparation Status */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              {/* Brand Eyebrow Badge (Guarantees pyBIM is never uppercase-forced) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-950/40 border border-blue-500/25 dark:border-blue-400/30 text-blue-700 dark:text-blue-300 text-caption font-mono font-bold tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>
                  {eyebrowText.includes("pyBIM") ? (
                    <>
                      <span className="normal-case font-bold">pyBIM</span>
                      {eyebrowText.replace("pyBIM", "")}
                    </>
                  ) : (
                    <>
                      <span className="normal-case font-bold">pyBIM</span>
                      {" · "}
                      {eyebrowText}
                    </>
                  )}
                </span>
              </div>

              {/* Calm Status Badge without intrusive pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                <span>{t("education.statusBadge") || "IN PREPARATION"}</span>
              </div>
            </motion.div>

            {/* Two-Part Editorial Headline */}
            <motion.h1 
              variants={itemVariants} 
              className="text-section-sm sm:text-section lg:text-display font-extrabold text-brand-textPrimary tracking-tight mb-5 sm:mb-6 leading-[1.12]"
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
              className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-7 sm:mb-8 max-w-2xl"
            >
              {t("education.description")}
            </motion.p>

            {/* CTA Group: Equal Height, Fully Visible, High-Touch Accessibility */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6"
            >
              <CtaLink
                href="/services"
                variant="primary"
                className="!text-sm !tracking-wide normal-case justify-center min-h-[44px]"
              >
                {t("education.primaryCta") || "Explore Our Services"}
              </CtaLink>

              <CtaLink
                href="/contact"
                variant="secondary"
                className="!text-sm !tracking-wide normal-case justify-center"
              >
                {t("education.secondaryCta") || "Contact pyBIM"}
              </CtaLink>
            </motion.div>

            {/* Secondary Preparation Note */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-2 text-caption font-mono text-brand-textSecondary/80"
            >
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
              <span>{t("education.secondaryNote")}</span>
            </motion.div>
          </motion.div>

          {/* ================= RIGHT COLUMN: Integrated Visual Composition ================= */}
          {/* Upper: ArchitecturalCanvas / Lower: Knowledge Areas Panel */}
          <motion.div 
            id="knowledge-areas"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-28 lg:col-span-5 w-full flex flex-col gap-6"
            role="region"
            aria-labelledby={`${baseId}-preview-heading`}
          >
            {/* UPPER AREA: Dedicated Architectural Geometry Canvas (Desktop Only) */}
            <div className="hidden lg:block w-full aspect-[16/10] xl:aspect-[16/9] relative rounded-3xl bg-brand-surface/40 dark:bg-slate-900/40 border border-brand-border/70 dark:border-slate-800 p-4 overflow-hidden shadow-sm backdrop-blur-md">
              <ArchitecturalCanvas className="w-full h-full" />
            </div>

            {/* LOWER AREA: Technical Knowledge Areas Specification Sheet */}
            <div className="rounded-3xl bg-brand-cardElevated border border-brand-border/80 dark:border-slate-800 shadow-xl shadow-brand-base/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md p-5 sm:p-7 relative overflow-hidden transition-all duration-300">
              
              {/* Subtle Hairline Top Gradient Accent */}
              <div 
                aria-hidden="true" 
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 dark:via-cyan-400/40 to-transparent" 
              />

              {/* Panel Header Bar */}
              <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-brand-border/70 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                  <h2 
                    id={`${baseId}-preview-heading`}
                    className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary"
                  >
                    {t("education.previewEyebrow") || "KNOWLEDGE AREAS"}
                  </h2>
                </div>

                <span className="text-technical font-mono uppercase tracking-wider text-brand-textSecondary px-2.5 py-1 rounded-md bg-brand-surface dark:bg-slate-800/80 border border-brand-border/70 dark:border-slate-700/60 font-semibold">
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
                      className="py-3.5 first:pt-2 last:pb-1 px-2.5 -mx-2.5 rounded-2xl hover:bg-brand-surface/50 dark:hover:bg-slate-800/40 transition-colors flex items-start gap-3.5 cursor-default select-none"
                    >
                      {/* Numeric Index Badge */}
                      <span className="w-8 h-8 rounded-xl bg-brand-surface dark:bg-slate-800/90 border border-brand-border/80 dark:border-slate-700/80 text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0 mt-0.5">
                        {area.num}
                      </span>

                      {/* Content Area Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <IconComponent className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                          <h3 className="text-body-sm font-bold text-brand-textPrimary tracking-tight leading-snug">
                            {area.title}
                          </h3>
                        </div>
                        <p className="text-caption text-brand-textSecondary font-medium leading-relaxed">
                          {area.desc}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Panel Footer Annotation */}
              <div className="mt-3.5 pt-3.5 border-t border-brand-border/60 dark:border-slate-800/80 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
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
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
