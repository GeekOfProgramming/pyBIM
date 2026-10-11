"use client";

import { useState, useId } from "react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import OpportunityDetailModal from "@/components/careers/opportunity-detail-modal";
import {
  Building2,
  Sliders,
  Shapes,
  Code2,
  BrainCircuit,
  ArrowRight,
  Briefcase,
  ChevronRight,
  Sparkles
} from "lucide-react";

/**
 * OpenRolesCollaborationsSection Component (Section 04 - Open Roles & Collaborations)
 *
 * pyBIM Design System v2 — Engineering Precision
 * Task WU-04 (REVISED): Five Opportunities, Detail Modals & Submission Protocol
 *
 * Replaces the static empty state with five owner-approved opportunity cards:
 * - Group A (01–03): Actively Recruiting Opportunities
 * - Group B (04–05): Ongoing Application Opportunities
 * - Detail Modals: Full role briefs, responsibilities, skills, evidence & context
 * - Application Protocol: Structured intake syntax and honest submission guidelines
 */
export default function OpenRolesCollaborationsSection({ jobs = [], onApplyRole }) {
  const { language, t } = useLanguage();
  const titleId = useId();
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: "bim-modeler",
      num: "01",
      code: "BIM-MOD",
      group: "active",
      statusType: "active",
      icon: Building2,
      iconWrapClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/25",
      title: t("careers.positions.bim_modeler.title") || "BIM Modeler",
      status: t("careers.positions.bim_modeler.status") || "ACTIVE RECRUITMENT",
      summary: t("careers.positions.bim_modeler.summary") || "Architecture · Structural · MEP · Infrastructure",
      overview:
        t("careers.positions.bim_modeler.overview") ||
        "We are seeking skilled BIM Modelers to author, develop, and audit structured building information models across building and infrastructure projects.",
      responsibilities: [
        t("careers.positions.bim_modeler.resp1") ||
          "Author and coordinate discipline-specific 3D BIM models adhering to rigorous project standards.",
        t("careers.positions.bim_modeler.resp2") ||
          "Manage element geometry, parametric metadata, and information exchanges.",
        t("careers.positions.bim_modeler.resp3") ||
          "Conduct model quality control, clash avoidance, and deliverable-ready exports (IFC, RVT)."
      ],
      skills: (
        t("careers.positions.bim_modeler.skills") ||
        "Autodesk Revit · IFC · Parametric Families · Navisworks · Model QA"
      ).split(" · "),
      evidence:
        t("careers.positions.bim_modeler.evidence") ||
        "BIM project portfolio, representative model screenshots, or descriptions of handled scopes. A GitHub repository is not required.",
      context:
        t("careers.positions.bim_modeler.context") ||
        "Scope-based project contracts or ongoing technical engagements across one or more engineering disciplines."
    },
    {
      id: "revit-automation",
      num: "02",
      code: "REV-AUTO",
      group: "active",
      statusType: "active",
      icon: Sliders,
      iconWrapClass: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/25",
      title: t("careers.positions.revit_automation.title") || "Revit Automation",
      status: t("careers.positions.revit_automation.status") || "ACTIVE RECRUITMENT",
      summary: t("careers.positions.revit_automation.summary") || "Python · Dynamo · pyRevit · Revit API · C#",
      overview:
        t("careers.positions.revit_automation.overview") ||
        "Develop targeted automation tools, custom scripts, and data processing routines to eliminate repetitive modeling bottlenecks in Revit.",
      responsibilities: [
        t("careers.positions.revit_automation.resp1") ||
          "Build batch-processing scripts, parameter synchronizers, and audit utilities in Python and Dynamo.",
        t("careers.positions.revit_automation.resp2") ||
          "Develop custom pyRevit tools and desktop add-ins utilizing the Revit API and C#.",
        t("careers.positions.revit_automation.resp3") ||
          "Optimize project delivery speed and data accuracy for model production teams."
      ],
      skills: (
        t("careers.positions.revit_automation.skills") ||
        "Python · Revit API · Dynamo · pyRevit · C# · Batch Automation"
      ).split(" · "),
      evidence:
        t("careers.positions.revit_automation.evidence") ||
        "Sample automation scripts, GitHub repositories, video demonstrations, or documented workflow solutions.",
      context:
        t("careers.positions.revit_automation.context") ||
        "Project-based automation sprints or continuous tool development collaboration."
    },
    {
      id: "computational-design",
      num: "03",
      code: "COMP-DES",
      group: "active",
      statusType: "active",
      icon: Shapes,
      iconWrapClass: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25",
      title: t("careers.positions.computational_design.title") || "Computational Design",
      status: t("careers.positions.computational_design.status") || "ACTIVE RECRUITMENT",
      summary: t("careers.positions.computational_design.summary") || "Rhino · Grasshopper · Parametric Modeling",
      overview:
        t("careers.positions.computational_design.overview") ||
        "Create rule-based parametric systems, algorithmic design workflows, and complex geometric transformations for challenging engineering tasks.",
      responsibilities: [
        t("careers.positions.computational_design.resp1") ||
          "Develop custom Grasshopper definitions for complex geometry generation and rationalization.",
        t("careers.positions.computational_design.resp2") ||
          "Connect algorithmic modeling logic with downstream BIM parameters and documentation.",
        t("careers.positions.computational_design.resp3") ||
          "Perform parametric optimization studies and data extraction for engineering analysis."
      ],
      skills: (
        t("careers.positions.computational_design.skills") ||
        "Rhino 3D · Grasshopper · Python for Grasshopper · Parametric Geometry · Data Trees"
      ).split(" · "),
      evidence:
        t("careers.positions.computational_design.evidence") ||
        "Parametric project portfolio, Grasshopper definitions, algorithmic case studies, or design demonstrations.",
      context:
        t("careers.positions.computational_design.context") ||
        "Specialist project consulting on complex geometry and rule-based engineering scopes."
    },
    {
      id: "software-development",
      num: "04",
      code: "SW-DEV",
      group: "ongoing",
      statusType: "ongoing",
      icon: Code2,
      iconWrapClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/25",
      title: t("careers.positions.software_development.title") || "Software Development",
      status: t("careers.positions.software_development.status") || "ONGOING APPLICATIONS",
      summary: t("careers.positions.software_development.summary") || "Desktop Tools · REST APIs · Next.js · Revit API",
      overview:
        t("careers.positions.software_development.overview") ||
        "Engineer custom software utilities, internal cloud dashboards, desktop plugins, and data integrations bridging AEC and modern tech.",
      responsibilities: [
        t("careers.positions.software_development.resp1") ||
          "Architect and maintain desktop extensions, CLI tools, and web-based engineering dashboards.",
        t("careers.positions.software_development.resp2") ||
          "Develop robust REST APIs and data connectors for BIM information extraction and analysis.",
        t("careers.positions.software_development.resp3") ||
          "Implement automated testing, code quality standards, and technical documentation."
      ],
      skills: (
        t("careers.positions.software_development.skills") ||
        "Python · C# · TypeScript · React / Next.js · REST APIs · Git"
      ).split(" · "),
      evidence:
        t("careers.positions.software_development.evidence") ||
        "Public code repositories, working software samples, architecture case studies, or demonstrable projects.",
      context:
        t("careers.positions.software_development.context") ||
        "Continuous engagement for internal engineering platforms, client tool development, and API integrations."
    },
    {
      id: "llm-ai-engineering",
      num: "05",
      code: "LLM-AI",
      group: "ongoing",
      statusType: "ongoing",
      icon: BrainCircuit,
      iconWrapClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
      title: t("careers.positions.llm_ai_engineering.title") || "LLM & AI Engineering",
      status: t("careers.positions.llm_ai_engineering.status") || "ONGOING APPLICATIONS",
      summary: t("careers.positions.llm_ai_engineering.summary") || "Local LLM · RAG · Ollama · Vector DBs",
      overview:
        t("careers.positions.llm_ai_engineering.overview") ||
        "Explore and integrate retrieval-augmented generation (RAG) and local language models into practical AEC information workflows and document intelligence.",
      responsibilities: [
        t("careers.positions.llm_ai_engineering.resp1") ||
          "Design and benchmark local LLM pipelines (Ollama) for structured data extraction and query handling.",
        t("careers.positions.llm_ai_engineering.resp2") ||
          "Build technical RAG workflows connecting engineering specifications, codes, and project databases.",
        t("careers.positions.llm_ai_engineering.resp3") ||
          "Implement human-in-the-loop evaluation, prompt robustness checks, and deterministic output validation."
      ],
      skills: (
        t("careers.positions.llm_ai_engineering.skills") ||
        "Python · Ollama · RAG Pipelines · Vector Databases · Embeddings · LangChain"
      ).split(" · "),
      evidence:
        t("careers.positions.llm_ai_engineering.evidence") ||
        "Demonstrable AI/RAG projects, technical write-ups, code repositories, or workflow prototypes.",
      context:
        t("careers.positions.llm_ai_engineering.context") ||
        "Ongoing collaboration on applied AI R&D and internal engineering workflow intelligence."
    }
  ];

  const activeGroupRoles = roles.filter((r) => r.group === "active");
  const ongoingGroupRoles = roles.filter((r) => r.group === "ongoing");

  const handleApplyRole = (roleCode) => {
    if (onApplyRole) {
      onApplyRole(roleCode);
    } else {
      const protocolEl = document.getElementById("protocol") || document.getElementById("apply");
      if (protocolEl) {
        setTimeout(() => {
          protocolEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <section
      id="positions"
      className="scroll-mt-28 py-20 md:py-24 lg:py-28 relative border-b border-brand-border bg-brand-surface overflow-hidden"
      aria-labelledby={titleId}
    >
      {/* Background Family B (Surface / Technical) */}
      <EngineeringBackdrop variant="surface" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="max-w-4xl mb-14 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-caption font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("careers.positions.eyebrow") || "OPEN ROLES & COLLABORATIONS"}
            </span>
          </div>

          <h2
            id={titleId}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-section-sm xl:text-section font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4"
          >
            {t("careers.positions.headline") || "Your Expertise. Our Next Collaboration."}
          </h2>

          <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-4">
            {t("careers.positions.description") ||
              "Explore current and ongoing opportunities across BIM modeling, engineering automation, computational design, software development and AI."}
          </p>

          <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed">
            {t("careers.positions.clarification") ||
              "Recruitment and project-based collaboration may follow different arrangements. Specific responsibilities and terms are discussed during individual review."}
          </p>
        </div>

        {/* ========================================================= */}
        {/* GROUP A: Actively Recruiting Opportunities (3 Cards)      */}
        {/* ========================================================= */}
        <div className="mb-14">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-brand-border/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              <h3 className="font-mono text-caption font-bold tracking-wider uppercase text-brand-textPrimary">
                {t("careers.positions.group_active") || "Active Opportunities"}
              </h3>
            </div>
            <span className="font-sans text-body-sm text-brand-textSecondary hidden sm:inline">
              {t("careers.positions.group_active_desc") || "Priority project scopes open for immediate engagement"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {activeGroupRoles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="group relative flex flex-col justify-between rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
                >
                  <div>
                    {/* Card Top: Number + Status Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="font-mono text-caption font-bold tracking-wider px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary">
                        {role.num}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-mono font-bold tracking-wider uppercase border bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                        {role.status}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 ${role.iconWrapClass}`} aria-hidden="true">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h4 className="text-card-title font-bold font-sans text-brand-textPrimary tracking-tight mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                      {role.title}
                    </h4>

                    {/* Specialization Summary */}
                    <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed mb-6 font-medium">
                      {role.summary}
                    </p>
                  </div>

                  {/* Card Bottom: View Details Affordance */}
                  <div className="pt-4 border-t border-brand-border/70 flex items-center justify-between text-caption font-mono font-bold text-brand-primary tracking-wider uppercase mt-auto">
                    <span>{t("careers.positions.view_details") || "View Details"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* GROUP B: Ongoing Application Opportunities (2 Cards)      */}
        {/* ========================================================= */}
        <div className="mb-14">
          <div className="flex items-center justify-between pb-3 mb-6 border-b border-brand-border/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
              <h3 className="font-mono text-caption font-bold tracking-wider uppercase text-brand-textPrimary">
                {t("careers.positions.group_ongoing") || "Ongoing Applications"}
              </h3>
            </div>
            <span className="font-sans text-body-sm text-brand-textSecondary hidden sm:inline">
              {t("careers.positions.group_ongoing_desc") || "Continuous evaluation for specialized technical workflows"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl">
            {ongoingGroupRoles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="group relative flex flex-col justify-between rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
                >
                  <div>
                    {/* Card Top: Number + Status Badge */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="font-mono text-caption font-bold tracking-wider px-2.5 py-1 rounded-md bg-brand-surface border border-brand-border text-brand-textSecondary">
                        {role.num}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-caption font-mono font-bold tracking-wider uppercase border bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" aria-hidden="true" />
                        {role.status}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 ${role.iconWrapClass}`} aria-hidden="true">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h4 className="text-card-title font-bold font-sans text-brand-textPrimary tracking-tight mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                      {role.title}
                    </h4>

                    {/* Specialization Summary */}
                    <p className="text-body-sm font-sans text-brand-textSecondary leading-relaxed mb-6 font-medium">
                      {role.summary}
                    </p>
                  </div>

                  {/* Card Bottom: View Details Affordance */}
                  <div className="pt-4 border-t border-brand-border/70 flex items-center justify-between text-caption font-mono font-bold text-brand-primary tracking-wider uppercase mt-auto">
                    <span>{t("careers.positions.view_details") || "View Details"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* DYNAMIC JOBS LISTING (Preserves compatibility if any)     */}
        {/* ========================================================= */}
        {jobs && jobs.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-border">
            <h4 className="text-2xl font-bold text-brand-textPrimary mb-8">
              {t("careers.positions.title") || "Dynamic Job Listings"}
            </h4>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="group flex flex-col rounded-3xl border border-brand-border bg-brand-card p-8 transition-all hover:border-brand-primary/40 shadow-xs hover:shadow-md"
                >
                  <div className="inline-block self-start px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-primary/20">
                    {language === "it" ? job.departmentIt : job.departmentEn}
                  </div>
                  <Link href={`/careers/${job.id}`}>
                    <h5 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors">
                      {language === "it" ? job.titleIt : job.titleEn}
                    </h5>
                  </Link>
                  <p className="text-brand-textSecondary text-sm mb-6 leading-relaxed line-clamp-3">
                    {language === "it" ? job.descriptionIt : job.descriptionEn}
                  </p>
                  <Link
                    href={`/careers/${job.id}`}
                    className="mt-auto inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest"
                  >
                    <span>{language === "it" ? "Scopri di più" : t("careers.card.btn") || "Learn More"}</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal Component (Single active instance) */}
      {selectedRole && (
        <OpportunityDetailModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onApplyRole={handleApplyRole}
        />
      )}
    </section>
  );
}
