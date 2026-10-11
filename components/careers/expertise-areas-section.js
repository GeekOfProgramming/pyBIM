"use client";

import { useState, useRef, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import {
  Building2,
  Sliders,
  Shapes,
  Code2,
  BrainCircuit,
  Info
} from "lucide-react";

/**
 * ExpertiseAreasSection Component (Section 03 - Where You Can Contribute)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task WU-03 (REVISED): Work With pyBIM: Interactive Expertise Areas
 *
 * Five Approved Expertise Areas:
 * 01. BIM Modeler (with Architecture, Structural Engineering, MEP, Infrastructure)
 * 02. Revit Automation
 * 03. Computational Design
 * 04. Software Development
 * 05. LLM & AI Engineering
 *
 * Layout:
 * - 12-column grid
 * - Left column (5 cols): 5 vertical accessible selection tabs (role="tablist")
 * - Right column (7 cols): Detailed active expertise panel (role="tabpanel")
 * - Background: EngineeringBackdrop variant="base" (Family A)
 */
export default function ExpertiseAreasSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const titleId = useId();
  const [activeId, setActiveId] = useState("bim-modeler");
  const tabRefs = useRef([]);

  const areas = [
    {
      id: "bim-modeler",
      num: t("careers.expertise.bim_modeler.num") || "01",
      tabTitle: t("careers.expertise.bim_modeler.tab") || "BIM Modeler",
      title: t("careers.expertise.bim_modeler.title") || "BIM Modeler",
      summary:
        t("careers.expertise.bim_modeler.summary") ||
        "Develop and maintain structured BIM models according to project requirements and the relevant engineering discipline.",
      icon: Building2,
      iconSelectedClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
      dotClass: "bg-blue-500",
      specializations: [
        t("careers.expertise.bim_modeler.spec1") || "Architecture",
        t("careers.expertise.bim_modeler.spec2") || "Structural Engineering",
        t("careers.expertise.bim_modeler.spec3") || "MEP",
        t("careers.expertise.bim_modeler.spec4") || "Infrastructure"
      ],
      contributions: [
        t("careers.expertise.bim_modeler.contr1") ||
          "Discipline-specific BIM authoring and model development.",
        t("careers.expertise.bim_modeler.contr2") ||
          "Managing geometry, parameters and information requirements.",
        t("careers.expertise.bim_modeler.contr3") ||
          "Model quality reviews and coordination-ready information delivery."
      ],
      tools: ["Autodesk Revit", "IFC", "BIM Modeling", "Model QA"]
    },
    {
      id: "revit-automation",
      num: t("careers.expertise.revit_automation.num") || "02",
      tabTitle: t("careers.expertise.revit_automation.tab") || "Revit Automation",
      title: t("careers.expertise.revit_automation.title") || "Revit Automation",
      summary:
        t("careers.expertise.revit_automation.summary") ||
        "Develop targeted automation solutions for repetitive Revit modeling and data-management tasks.",
      icon: Sliders,
      iconSelectedClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
      dotClass: "bg-cyan-500",
      contributions: [
        t("careers.expertise.revit_automation.contr1") ||
          "Parameter processing, batch operations and consistency checks.",
        t("careers.expertise.revit_automation.contr2") ||
          "Dynamo, pyRevit and Python workflow development.",
        t("careers.expertise.revit_automation.contr3") ||
          "Revit API integrations and task-specific automation."
      ],
      tools: ["Python", "Dynamo", "pyRevit", "Revit API", "C#"]
    },
    {
      id: "computational-design",
      num: t("careers.expertise.computational_design.num") || "03",
      tabTitle: t("careers.expertise.computational_design.tab") || "Computational Design",
      title: t("careers.expertise.computational_design.title") || "Computational Design",
      summary:
        t("careers.expertise.computational_design.summary") ||
        "Create parametric and rule-based design workflows for architecture and engineering applications.",
      icon: Shapes,
      iconSelectedClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
      dotClass: "bg-indigo-500",
      contributions: [
        t("careers.expertise.computational_design.contr1") ||
          "Parametric geometry generation and transformation.",
        t("careers.expertise.computational_design.contr2") ||
          "Algorithmic modeling and design-rule implementation.",
        t("careers.expertise.computational_design.contr3") ||
          "Connecting geometric logic with project information requirements."
      ],
      tools: ["Rhino", "Grasshopper", "Python", "Parametric Modeling"]
    },
    {
      id: "software-development",
      num: t("careers.expertise.software_development.num") || "04",
      tabTitle: t("careers.expertise.software_development.tab") || "Software Development",
      title: t("careers.expertise.software_development.title") || "Software Development",
      summary:
        t("careers.expertise.software_development.summary") ||
        "Develop engineering software tools, integrations and applications supporting BIM workflows.",
      icon: Code2,
      iconSelectedClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
      dotClass: "bg-violet-500",
      contributions: [
        t("careers.expertise.software_development.contr1") ||
          "Custom utilities, desktop plugins and engineering automation tools.",
        t("careers.expertise.software_development.contr2") ||
          "REST API and BIM-data system integration.",
        t("careers.expertise.software_development.contr3") ||
          "Internal dashboards, validation tools and reporting interfaces."
      ],
      tools: ["Python", "C#", "REST APIs", "Next.js", "Revit API"]
    },
    {
      id: "llm-ai-engineering",
      num: t("careers.expertise.llm_ai_engineering.num") || "05",
      tabTitle: t("careers.expertise.llm_ai_engineering.tab") || "LLM & AI Engineering",
      title: t("careers.expertise.llm_ai_engineering.title") || "LLM & AI Engineering",
      summary:
        t("careers.expertise.llm_ai_engineering.summary") ||
        "Explore the integration of language models and retrieval-based AI into practical engineering information workflows.",
      icon: BrainCircuit,
      iconSelectedClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      dotClass: "bg-emerald-500",
      contributions: [
        t("careers.expertise.llm_ai_engineering.contr1") ||
          "Local LLM integration and task-specific AI workflow development.",
        t("careers.expertise.llm_ai_engineering.contr2") ||
          "Retrieval-Augmented Generation (RAG) for technical documents and structured engineering information.",
        t("careers.expertise.llm_ai_engineering.contr3") ||
          "Prompt design, evaluation, output validation and human-in-the-loop quality checks."
      ],
      tools: ["Python", "Ollama", "RAG", "Embeddings", "Vector Databases", "LangChain"]
    }
  ];

  const activeItem = areas.find((a) => a.id === activeId) || areas[0];

  const handleKeyDown = (e, index) => {
    let nextIndex = index;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % areas.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + areas.length) % areas.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = areas.length - 1;
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(areas[index].id);
      return;
    } else {
      return;
    }

    setActiveId(areas[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="expertise"
      className="relative w-full py-20 md:py-24 lg:py-28 bg-brand-base border-b border-brand-border overflow-hidden scroll-mt-28"
      aria-labelledby={titleId}
    >
      {/* Background Family A (Base / Clean) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="max-w-4xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("careers.expertise.eyebrow")}
            </span>
          </div>

          <h2
            id={titleId}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4"
          >
            {t("careers.expertise.title")}
          </h2>

          <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-4">
            {t("careers.expertise.desc")}
          </p>

          <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
            {t("careers.expertise.clarification")}
          </p>
        </div>

        {/* ========================================================= */}
        {/* 12-COLUMN INTERACTIVE COMPOSITION                         */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* ------------------------------------------------------- */}
          {/* LEFT: 5 Vertical Accessible Selection Tabs (Cols 1-5)   */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-5 w-full">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={t("careers.expertise.tablist_aria")}
              className="flex flex-col gap-3 w-full"
            >
              {areas.map((tab, idx) => {
                const isSelected = activeId === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => (tabRefs.current[idx] = el)}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isSelected}
                    aria-controls="expertise-tabpanel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setActiveId(tab.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    type="button"
                    className={`group relative flex items-center justify-between w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                      isSelected
                        ? "bg-brand-cardElevated border-brand-primary/60 dark:border-brand-primary/50 shadow-md shadow-brand-base/5 dark:shadow-black/25"
                        : "bg-brand-surface/40 hover:bg-brand-surface border-brand-border/70 hover:border-brand-border"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                          isSelected
                            ? tab.iconSelectedClass
                            : "bg-brand-surface border-brand-border text-brand-textSecondary group-hover:text-brand-textPrimary"
                        }`}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className={`block font-mono text-caption font-bold tracking-wider uppercase mb-0.5 ${
                            isSelected ? "text-brand-primary" : "text-brand-textSecondary/70"
                          }`}
                        >
                          {tab.num}
                        </span>
                        <span
                          className={`block font-sans text-body sm:text-lead font-bold leading-snug transition-colors ${
                            isSelected
                              ? "text-brand-textPrimary"
                              : "text-brand-textSecondary group-hover:text-brand-textPrimary"
                          }`}
                        >
                          {tab.tabTitle}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full transition-opacity ${
                        isSelected ? `${tab.dotClass} opacity-100` : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT: Detailed Active Expertise Panel (Cols 6-12)      */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-7 w-full">
            <div
              role="tabpanel"
              id="expertise-tabpanel"
              aria-labelledby={`tab-${activeItem.id}`}
              tabIndex={0}
              className="relative rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-7 sm:p-9 lg:p-10 shadow-xl shadow-brand-base/5 dark:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary flex flex-col justify-between min-h-[520px]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Panel Top Identifier */}
                    <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-brand-border/70">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${activeItem.dotClass}`} aria-hidden="true" />
                        <span className="font-mono text-caption font-bold tracking-widest text-brand-primary uppercase">
                          // {t("careers.expertise.discipline_label") || "DISCIPLINE"} {activeItem.num}
                        </span>
                      </div>
                      <span className="font-mono text-caption font-bold tracking-wider px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary">
                        {activeItem.num} / 05
                      </span>
                    </div>

                    {/* Headline & Description */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-brand-textPrimary tracking-tight mb-3">
                      {activeItem.title}
                    </h3>
                    <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-6">
                      {activeItem.summary}
                    </p>

                    {/* BIM Modeler: Four Explicit Modeling Disciplines in 2x2 grid */}
                    {activeItem.id === "bim-modeler" && activeItem.specializations && (
                      <div className="mb-8 p-5 rounded-2xl bg-brand-surface/70 border border-brand-border/80">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                            <span className="text-caption font-mono font-bold uppercase tracking-wider text-brand-textPrimary">
                              {t("careers.expertise.specializations_title")}
                            </span>
                          </div>
                          <span className="text-caption font-mono text-brand-textSecondary">
                            {t("careers.expertise.specializations_subtitle") || "// 4 Specialized Disciplines"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {activeItem.specializations.map((spec, i) => (
                            <div
                              key={i}
                              className="px-3.5 py-2.5 rounded-xl bg-brand-cardElevated border border-brand-border/70 text-center text-caption font-mono font-semibold text-brand-textPrimary shadow-2xs"
                            >
                              {spec}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Example Professional Contributions */}
                    <div className="mb-8">
                      <h4 className="text-caption font-mono font-bold tracking-wider text-brand-primary uppercase mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                        <span>{t("careers.expertise.contributions_title")}</span>
                      </h4>
                      <ul className="space-y-3">
                        {activeItem.contributions.map((contr, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3.5 text-body-sm sm:text-body font-sans text-brand-textSecondary leading-relaxed"
                          >
                            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-brand-surface border border-brand-border text-brand-textPrimary font-mono text-caption font-bold shrink-0 mt-0.5">
                              0{idx + 1}
                            </span>
                            <span>{contr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Illustrative Technologies & Tools */}
                    <div className="pt-6 border-t border-brand-border/80">
                      <h4 className="text-caption font-mono font-bold tracking-wider text-brand-textSecondary uppercase mb-3">
                        {t("careers.expertise.tech_title")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeItem.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-lg bg-brand-surface border border-brand-border/80 text-caption font-mono font-semibold text-brand-textPrimary"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Factual Disclaimer Footer */}
                  <div className="mt-8 pt-4 border-t border-brand-border/60 flex items-start gap-2.5 text-body-sm font-sans text-brand-textSecondary">
                    <Info className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">
                      {t("careers.expertise.disclaimer")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
