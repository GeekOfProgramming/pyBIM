"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import {
  ShieldCheck,
  FileCheck2,
  Cpu,
  Workflow
} from "lucide-react";

/**
 * HowWeWorkSection Component (Section 02 - How We Work / Culture)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task WU-02: Work With pyBIM: How We Work Section
 *
 * Desktop composition:
 * - 12-column grid
 * - Left column (4 cols): Small technical eyebrow, single H2, concise editorial lead, subtle collaboration philosophy
 * - Right column (8 cols): 2x2 grid of 4 premium principle cards with consistent heights
 * - Background: EngineeringBackdrop variant="surface" (Family B)
 * - Semantic tokens & typography utilities
 */
export default function HowWeWorkSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();

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
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const principles = [
    {
      num: "01",
      title: (t("careers.culture.box1_title") || "Engineering Discipline").replace(/^0?1[\.\s—–-]+\s*/, ""),
      desc: t("careers.culture.box1_desc") || "Structured BIM work, appropriate tools and documented technical decisions.",
      icon: ShieldCheck,
      iconWrapClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    },
    {
      num: "02",
      title: (t("careers.culture.box2_title") || "Clear Scope & Reviews").replace(/^0?2[\.\s—–-]+\s*/, ""),
      desc: t("careers.culture.box2_desc") || "Defined responsibilities, deliverables and review expectations for each engagement.",
      icon: FileCheck2,
      iconWrapClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
    },
    {
      num: "03",
      title: (t("careers.culture.box3_title") || "Practical Automation").replace(/^0?3[\.\s—–-]+\s*/, ""),
      desc: t("careers.culture.box3_desc") || "Python, C#, Revit API and related tools considered where appropriate for the task.",
      icon: Cpu,
      iconWrapClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    },
    {
      num: "04",
      title: (t("careers.culture.box4_title") || "Flexible Collaboration").replace(/^0?4[\.\s—–-]+\s*/, ""),
      desc: t("careers.culture.box4_desc") || "Collaboration arrangements are evaluated according to project scope and availability.",
      icon: Workflow,
      iconWrapClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
  ];

  return (
    <section
      id="culture"
      className="relative w-full py-20 md:py-24 lg:py-28 bg-brand-surface border-b border-brand-border overflow-hidden scroll-mt-28"
      aria-labelledby={titleId}
    >
      {/* Background Family B (Surface / Technical) */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* ========================================================= */}
          {/* LEFT COLUMN: Editorial & Philosophy (Cols 1 to 4)        */}
          {/* ========================================================= */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
              <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t("careers.culture.eyebrow")}
              </span>
            </div>

            {/* Section Headline (H2) */}
            <h2
              id={titleId}
              className="text-2xl sm:text-3xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-5"
            >
              {t("careers.culture.title")}
            </h2>

            {/* Concise Editorial Paragraph */}
            <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-6">
              {t("careers.culture.desc")}
            </p>

            {/* Subtle Supporting Line on Collaboration Philosophy */}
            <div className="pt-6 border-t border-brand-border/80 w-full">
              <p className="text-caption sm:text-body-sm font-sans text-brand-textSecondary leading-relaxed">
                {t("careers.culture.philosophy")}
              </p>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Four Principle Cards Grid (Cols 5 to 12)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.num}
                    variants={itemVariants}
                    className="group relative flex flex-col justify-between rounded-2xl lg:rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:border-brand-primary/40 hover:shadow-md"
                  >
                    <div>
                      {/* Card Header: Semantic Icon + Number Identifier */}
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${principle.iconWrapClass}`}
                          aria-hidden="true"
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-caption font-bold tracking-wider text-brand-textSecondary/80 dark:text-brand-textSecondary/70 px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border/80">
                          {principle.num}
                        </span>
                      </div>

                      {/* Principle Title (H3) */}
                      <h3 className="text-lg sm:text-xl font-bold font-sans text-brand-textPrimary tracking-tight mb-2.5">
                        {principle.title}
                      </h3>

                      {/* Descriptive Text */}
                      <p className="text-body-sm sm:text-body font-sans text-brand-textSecondary leading-relaxed">
                        {principle.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
