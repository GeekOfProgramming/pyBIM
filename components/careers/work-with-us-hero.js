"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import CtaLink from "@/components/ui/cta-link";
import {
  Users,
  Workflow,
  Cpu,
  GitBranch,
  Info,
  Layers,
  ArrowRight
} from "lucide-react";

/**
 * WorkWithUsHero Component (Section 01 - Work With pyBIM Hero)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task WU-01: Work With pyBIM Hero & Section Foundation
 *
 * Desktop composition:
 * - 12-column grid
 * - Left column (7 cols): Editorial content, eyebrow, single H1, lead + support copy, dual CTAs
 * - Right column (5 cols): Non-interactive Collaboration Architecture panel with 3 tracks
 * - Background: EngineeringBackdrop variant="base"
 * - Semantic tokens & typography utilities
 */
export default function WorkWithUsHero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const panelVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const tracks = [
    {
      num: t("careers.hero.track1_num") || "01",
      title: t("careers.hero.track1_title") || "Project Collaboration",
      desc: t("careers.hero.track1_desc") || "Engineering support across defined BIM project scopes.",
      tag: t("careers.hero.track1_tag") || "SCOPE-BASED",
      icon: Workflow,
      borderClass: "border-blue-500/25 bg-blue-50/40 dark:bg-blue-950/20",
      badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
      numClass: "text-blue-600 dark:text-blue-400",
      nodeBorder: "border-blue-500 text-blue-600 dark:text-blue-400"
    },
    {
      num: t("careers.hero.track2_num") || "02",
      title: t("careers.hero.track2_title") || "Technical Specialists",
      desc: t("careers.hero.track2_desc") || "Relevant BIM, automation and software expertise.",
      tag: t("careers.hero.track2_tag") || "DOMAIN EXPERTISE",
      icon: Cpu,
      borderClass: "border-cyan-500/25 bg-cyan-50/40 dark:bg-cyan-950/20",
      badgeClass: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
      numClass: "text-cyan-600 dark:text-cyan-400",
      nodeBorder: "border-cyan-500 text-cyan-600 dark:text-cyan-400"
    },
    {
      num: t("careers.hero.track3_num") || "03",
      title: t("careers.hero.track3_title") || "Future Opportunities",
      desc: t("careers.hero.track3_desc") || "Potential roles considered when actual needs arise.",
      tag: t("careers.hero.track3_tag") || "TALENT INTRODUCTIONS",
      icon: GitBranch,
      borderClass: "border-slate-300/80 dark:border-slate-700/70 bg-slate-100/60 dark:bg-slate-800/40",
      badgeClass: "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700",
      numClass: "text-slate-600 dark:text-slate-400",
      nodeBorder: "border-slate-400 dark:border-slate-600 text-slate-600 dark:text-slate-400"
    }
  ];

  return (
    <section
      id="work-with-us"
      className="relative w-full py-20 md:py-28 lg:py-32 bg-brand-base border-b border-brand-border overflow-hidden scroll-mt-28"
      aria-labelledby={titleId}
    >
      {/* Background Family A (Base / Clean) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial & Value Proposition (Cols 1 to 7)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Eyebrow Badge */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1.5 text-xs font-mono font-bold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
                <Users className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t("careers.hero.tag")}</span>
              </div>
            </motion.div>

            {/* Single H1 Title */}
            <motion.h1
              id={titleId}
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-brand-textPrimary leading-[1.12] mb-6"
            >
              {t("careers.hero.title")}
            </motion.h1>

            {/* Lead Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-brand-textPrimary font-medium leading-relaxed mb-4 max-w-2xl"
            >
              {t("careers.hero.lead")}
            </motion.p>

            {/* Supporting Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-brand-textSecondary leading-relaxed mb-8 max-w-2xl"
            >
              {t("careers.hero.support")}
            </motion.p>

            {/* Primary and Secondary CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
            >
              <CtaLink href="#positions" variant="primary">
                {t("careers.hero.primary_cta")}
              </CtaLink>
              <CtaLink href="#culture" variant="secondary">
                {t("careers.hero.secondary_cta")}
              </CtaLink>
            </motion.div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Collaboration Pathways Panel (Cols 8 to 12) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              variants={panelVariants}
              className="relative rounded-3xl border border-brand-border/80 dark:border-slate-800 bg-brand-cardElevated backdrop-blur-md p-6 sm:p-7 shadow-xl shadow-brand-base/10 dark:shadow-black/30 overflow-hidden"
              role="region"
              aria-label={t("careers.hero.pathways_title")}
            >
              {/* Subtle top ambient sheen */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-brand-primary/[0.08] rounded-full blur-3xl"
                aria-hidden="true"
              />

              {/* Panel Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border/70 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">
                    {t("careers.hero.pathways_badge")}
                  </span>
                </div>
                <span className="text-xs font-mono font-medium text-brand-textSecondary">
                  {t("careers.hero.pathways_title")}
                </span>
              </div>

              {/* Connected Collaboration Tracks */}
              <div className="relative pl-9 sm:pl-10 space-y-4">

                {/* Continuous Connecting Line */}
                <div
                  className="pointer-events-none absolute left-[13px] top-4 bottom-5 w-px z-0"
                  aria-hidden="true"
                >
                  <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <line
                      x1="0.5"
                      y1="0"
                      x2="0.5"
                      y2="100%"
                      stroke="currentColor"
                      className="text-slate-300 dark:text-slate-700"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>

                {tracks.map((track, idx) => {
                  const Icon = track.icon;
                  return (
                    <motion.div key={idx} variants={itemVariants} className="relative z-10">
                      {/* Node circle */}
                      <div
                        className={`absolute left-[-36px] sm:left-[-40px] top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-2 ${track.nodeBorder} flex items-center justify-center shadow-xs`}
                        aria-hidden="true"
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>

                      {/* Track card */}
                      <div className={`rounded-2xl border ${track.borderClass} p-4 transition-colors`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono text-xs font-bold ${track.numClass}`}>
                              {track.num}
                            </span>
                            <h3 className="text-sm font-bold text-brand-textPrimary leading-snug">
                              {track.title}
                            </h3>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wide uppercase border ${track.badgeClass}`}>
                            {track.tag}
                          </span>
                        </div>
                        <p className="text-xs text-brand-textSecondary leading-relaxed">
                          {track.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

              </div>

              {/* Factual Disclaimer Footer */}
              <div className="mt-6 pt-3.5 border-t border-brand-border/70 dark:border-slate-800/80 flex items-start sm:items-center gap-2 text-xs font-mono text-brand-textSecondary">
                <Info className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                <span className="leading-relaxed">{t("careers.hero.disclaimer")}</span>
              </div>

            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
