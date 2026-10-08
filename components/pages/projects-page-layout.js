"use client";

import { useEffect, useId } from "react";
import CtaLink from "@/components/ui/cta-link";
import { 
  Briefcase, 
  FileText, 
  Users, 
  Info, 
  Sparkles,
  Compass,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { motion, useReducedMotion } from "framer-motion";

export default function ProjectsPageLayout() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();

  // Smooth scroll support for hash anchors (#all-projects, #featured, #testimonials)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashScroll = () => {
        const hash = window.location.hash;
        if (hash) {
          const targetId = hash.replace("#", "");
          const el = document.getElementById(targetId);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      };
      handleHashScroll();
      window.addEventListener("hashchange", handleHashScroll);
      return () => window.removeEventListener("hashchange", handleHashScroll);
    }
  }, []);

  const areas = [
    {
      id: "all-projects",
      num: t("projects.all.tag") || "01",
      icon: Briefcase,
      title: t("projects.all.title") || "All Projects",
      desc: t("projects.all.desc") || "A curated selection of project work will appear here once the relevant technical details and publication permissions have been reviewed.",
      status: t("projects.all.status") || "IN PREPARATION"
    },
    {
      id: "featured",
      num: t("projects.featured.tag") || "02",
      icon: FileText,
      title: t("projects.featured.title") || "Featured Case Studies",
      desc: t("projects.featured.desc") || "Selected engineering approaches and project-specific workflows may be documented here once supporting material has been reviewed and cleared for publication.",
      status: t("projects.featured.status") || "IN PREPARATION"
    },
    {
      id: "testimonials",
      num: t("projects.testimonials.tag") || "03",
      icon: Users,
      title: t("projects.testimonials.title") || "Client Testimonials",
      desc: t("projects.testimonials.desc") || "Client perspectives may be shared here when authentic feedback is available and permission for publication has been obtained.",
      status: t("projects.testimonials.status") || "IN PREPARATION"
    }
  ];

  const eyebrowText = t("projects.hero.eyebrow") || "pyBIM / SUCCESS STORIES";

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
    <div className="relative w-full min-h-[calc(100vh-5rem)] bg-brand-base flex flex-col justify-start overflow-hidden">
      {/* Subtle Architectural Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Ambient Lighting Gradient */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-gradient-to-b from-blue-500/12 via-cyan-500/08 to-transparent blur-3xl opacity-75 dark:opacity-60" 
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-14 md:py-18 lg:py-20 w-full z-10 flex flex-col gap-14 lg:gap-18">
        
        {/* ================= SECTION 01: EDITORIAL HERO ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Narrative, Typography & Actions (~58% on desktop) */}
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
                <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span>
                  {eyebrowText.includes("pyBIM") ? (
                    <>
                      <span className="normal-case">pyBIM</span>
                      {eyebrowText.replace("pyBIM", "")}
                    </>
                  ) : (
                    eyebrowText
                  )}
                </span>
              </div>

              {/* Calm, Dignified Status Badge */}
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
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent mb-5 tracking-tight leading-snug"
            >
              {t("projects.hero.supportingHeading") || "Our Project Showcase Is Taking Shape."}
            </motion.h2>

            {/* Descriptive Body Copy */}
            <motion.p 
              variants={itemVariants} 
              className="text-body sm:text-lead text-brand-textSecondary font-normal leading-relaxed mb-8 max-w-2xl"
            >
              {t("projects.hero.description")}
            </motion.p>

            {/* Standardized CTA Group */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6"
            >
              <CtaLink
                href="/services"
                variant="primary"
              >
                {t("projects.hero.primaryCta") || "Explore Our Services"}
              </CtaLink>

              <CtaLink
                href="/contact"
                variant="secondary"
              >
                {t("projects.hero.secondaryCta") || "Discuss a Project"}
              </CtaLink>
            </motion.div>

            {/* Secondary Preparation Note */}
            <motion.div 
              variants={itemVariants} 
              className="flex items-center gap-2.5 text-caption font-mono text-brand-textSecondary/80"
            >
              <Info className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
              <span>{t("projects.hero.supportingNote")}</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Architectural Portfolio Overview Motif (~42% on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
            role="region"
            aria-labelledby={`${baseId}-overview-heading`}
          >
            <div className="rounded-3xl bg-brand-card/95 dark:bg-slate-900/90 border border-brand-border/80 shadow-xl shadow-brand-base/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-md p-6 sm:p-7 relative overflow-hidden">
              
              {/* Panel Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-border/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                  <h3 
                    id={`${baseId}-overview-heading`}
                    className="text-technical font-mono font-bold uppercase tracking-wider text-brand-primary"
                  >
                    {t("projects.preview.eyebrow") || "PORTFOLIO OVERVIEW"}
                  </h3>
                </div>

                <span className="text-technical font-mono uppercase tracking-widest text-brand-textSecondary px-2.5 py-0.5 rounded-md bg-brand-surface border border-brand-border/60">
                  {t("projects.preview.count") || "3 PORTFOLIO AREAS"}
                </span>
              </div>

              {/* Three Quick Anchor Links */}
              <div className="space-y-3">
                {areas.map((area) => {
                  const IconComponent = area.icon;

                  return (
                    <a
                      key={area.id}
                      href={`#${area.id}`}
                      className="group p-3.5 rounded-2xl bg-brand-surface/70 border border-brand-border/70 hover:border-brand-primary/40 hover:bg-brand-surface transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                          {area.num}
                        </span>
                        <div className="flex items-center gap-2 min-w-0">
                          <IconComponent className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                          <span className="text-body-sm font-bold text-brand-textPrimary group-hover:text-brand-primary transition-colors truncate">
                            {area.title}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-technical font-mono text-brand-textSecondary uppercase">
                          {area.status}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-textSecondary group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Panel Footer Technical Motif */}
              <div className="mt-5 pt-4 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                  <span>{t("projects.footerAnnotation") || "pyBIM · PORTFOLIO-PREVIEW"}</span>
                </span>
                <span className="text-brand-primary font-bold">
                  // 2026
                </span>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ================= SECTION 02: THREE DESTINATION ANCHOR AREAS ================= */}
        <div className="w-full pt-6 border-t border-brand-border/70">
          <div className="mb-8">
            <h2 className="text-caption font-mono font-bold uppercase tracking-widest text-brand-primary mb-2">
              {t("projects.preview.heading") || "Planned Portfolio Areas"}
            </h2>
            <p className="text-body-sm text-brand-textSecondary max-w-2xl">
              {t("projects.hero.supportingNote")}
            </p>
          </div>

          {/* Three Integrated Destination Anchor Boards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {areas.map((area) => {
              const IconComponent = area.icon;

              return (
                <section
                  key={area.id}
                  id={area.id}
                  className="scroll-mt-28 rounded-3xl bg-brand-card border border-brand-border/80 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-brand-primary/40 transition-all flex flex-col justify-between"
                  aria-labelledby={`${baseId}-area-title-${area.id}`}
                >
                  <div>
                    {/* Header Row: Number + Icon + Status */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-brand-surface border border-brand-border text-brand-primary flex items-center justify-center font-mono font-bold text-caption shrink-0">
                          {area.num}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4" aria-hidden="true" />
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-technical font-mono font-bold uppercase tracking-wider shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden="true" />
                        <span>{area.status}</span>
                      </span>
                    </div>

                    {/* Anchor Area Title */}
                    <h3 
                      id={`${baseId}-area-title-${area.id}`}
                      className="text-xl font-bold text-brand-textPrimary tracking-tight mb-3 leading-snug"
                    >
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                      {area.desc}
                    </p>
                  </div>

                  {/* Informational Anchor Tag */}
                  <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-technical font-mono text-brand-textSecondary/80">
                    <span>#{area.id}</span>
                    <span className="text-brand-primary font-semibold">// pyBIM</span>
                  </div>
                </section>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}