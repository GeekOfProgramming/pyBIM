"use client";

import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import WorkWithUsHero from "@/components/careers/work-with-us-hero";
import {
  ChevronRight,
  CheckCircle2,
  Terminal,
  Server,
  Cpu,
  Briefcase,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  FileCheck2,
  Workflow,
  Sparkles
} from "lucide-react";

export default function CareersPageLayout({ jobs }) {
  const { language, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);
  const [copied, setCopied] = useState(false);

  const handleCopyTemplate = () => {
    const text = `SUBJECT: [Target Position] - [Last Name] - [GitHub Username]\n\nBODY REQUIRED STRUCTURE:\n> REPOSITORY URL: [Direct link to demonstrable code environment]\n> EXECUTION METRICS: [Execution time vs manual baseline]\n> WORKFLOW LOGIC: [Architectural explanation]\n> DEVELOPER CONTEXT: [Direct personal background]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
          }
        }
      };

      handleScroll();
      window.addEventListener("hashchange", handleScroll);
      return () => window.removeEventListener("hashchange", handleScroll);
    }
  }, []);

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <div className="bg-brand-base">

      {/* S01: Work With pyBIM Hero */}
      <WorkWithUsHero />

      {/* S02: How We Work (Extracted Culture Section) */}
      <section id="culture" className="scroll-mt-24 py-20 lg:py-28 border-b border-brand-border bg-brand-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* Section Introduction */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
              <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t("careers.culture.eyebrow")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-4">
              {t("careers.culture.title")}
            </h2>
            <p className="text-base sm:text-lg font-sans text-brand-textSecondary leading-relaxed">
              {t("careers.culture.desc")}
            </p>
          </div>

          {/* Four Principles Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <div className="bg-brand-cardElevated border border-brand-border rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all hover:border-brand-primary/40">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-textPrimary mb-2.5">
                {t("careers.culture.box1_title")}
              </h3>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                {t("careers.culture.box1_desc")}
              </p>
            </div>

            <div className="bg-brand-cardElevated border border-brand-border rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all hover:border-brand-primary/40">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-textPrimary mb-2.5">
                {t("careers.culture.box2_title")}
              </h3>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                {t("careers.culture.box2_desc")}
              </p>
            </div>

            <div className="bg-brand-cardElevated border border-brand-border rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all hover:border-brand-primary/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-textPrimary mb-2.5">
                {t("careers.culture.box3_title")}
              </h3>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                {t("careers.culture.box3_desc")}
              </p>
            </div>

            <div className="bg-brand-cardElevated border border-brand-border rounded-3xl p-7 sm:p-8 shadow-xs hover:shadow-md transition-all hover:border-brand-primary/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Workflow className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-textPrimary mb-2.5">
                {t("careers.culture.box4_title")}
              </h3>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed">
                {t("careers.culture.box4_desc")}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* S04: Open Positions Section (Preserved Target) */}
      <section id="positions" className="scroll-mt-24 py-24 relative border-b border-brand-border bg-brand-base">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 md:text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Briefcase className="w-4 h-4" /> {t("careers.positions.tag")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
              {t("careers.positions.title")}
            </h2>
            <p className="text-brand-textSecondary max-w-2xl mx-auto font-medium text-lg">
              {t("careers.positions.desc")}
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="bg-brand-card border border-brand-border rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left max-w-4xl mx-auto">

              <div className="inline-block px-3 py-1 rounded-lg bg-brand-accent/10 text-brand-accent text-xs font-bold tracking-widest uppercase border border-brand-accent/20 mb-6">
                {t("careers.empty.status")}
              </div>

              <p className="text-brand-textSecondary text-lg font-medium leading-relaxed mb-10" dangerouslySetInnerHTML={{ __html: t("careers.empty.desc1") }} />

              <h3 className="text-2xl md:text-3xl font-bold text-brand-textPrimary mb-4">{t("careers.empty.title")}</h3>

              <p className="text-brand-textSecondary text-lg font-medium leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t("careers.empty.desc2") }} />

              <ul className="space-y-4 mb-10">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-brand-textSecondary font-medium" dangerouslySetInnerHTML={{ __html: t("careers.empty.li1") }} />
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-brand-textSecondary font-medium" dangerouslySetInnerHTML={{ __html: t("careers.empty.li2") }} />
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-brand-textSecondary font-medium" dangerouslySetInnerHTML={{ __html: t("careers.empty.li3") }} />
                </li>
              </ul>

              <div className="bg-brand-surface border border-brand-border rounded-2xl p-4 text-sm text-brand-textSecondary font-medium italic">
                {t("careers.empty.note")}
              </div>

              {/* Strict Submission Protocol (Terminal Ingestion Architecture) */}
              <div className="mt-12 pt-10 border-t border-brand-border">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-accent uppercase tracking-widest mb-2">
                  <Terminal className="w-4 h-4" />
                  <span>// SYNTAX_FILTER_PROTOCOL</span>
                </div>

                <h4 className="text-2xl font-bold text-brand-textPrimary tracking-tight mb-2">
                  Strict Submission Protocol
                </h4>

                <p className="text-brand-textSecondary text-sm md:text-base font-medium leading-relaxed mb-6">
                  Our incoming mail server utilizes automated parsing. Submissions deviating from the exact structural syntax below are immediately dropped at the server level. By transmitting, you acknowledge this automated rejection policy.
                </p>

                {/* Terminal Code Block */}
                <div className="rounded-2xl bg-[#09090b] border border-neutral-800 overflow-hidden shadow-2xl mb-8">
                  <div className="bg-[#0f1115] px-4 py-3 border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2 text-xs font-mono text-neutral-400">protocol_manifest.txt</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyTemplate}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-mono transition-colors border border-neutral-700"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy Syntax"}</span>
                    </button>
                  </div>
                  <pre className="p-5 text-xs sm:text-sm font-mono text-neutral-300 overflow-x-auto leading-relaxed selection:bg-purple-500/30">
{`SUBJECT: [Target Position] - [Last Name] - [GitHub Username]

BODY REQUIRED STRUCTURE:
> REPOSITORY URL: [Direct link to demonstrable code environment]
> EXECUTION METRICS: [Execution time vs manual baseline]
> WORKFLOW LOGIC: [Architectural explanation]
> DEVELOPER CONTEXT: [Direct personal background]`}
                  </pre>
                </div>

                {/* Mailto Injection Action Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="mailto:careers@pybim.com?subject=[Target%20Position]%20-%20[Last%20Name]%20-%20[GitHub%20Username]&body=%3E%20REPOSITORY%20URL%3A%20%0A%0A%3E%20EXECUTION%20METRICS%3A%20%0A%0A%3E%20WORKFLOW%20LOGIC%3A%20%0A%0A%3E%20DEVELOPER%20CONTEXT%3A%20"
                    className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-accent hover:bg-brand-accentHover text-white px-8 py-4 font-bold uppercase text-sm tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>INITIATE DIRECT PROTOCOL</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <span className="text-xs font-mono text-neutral-500">
                    // Automated client pre-population active
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.map((job) => (
                  <div key={job.id} className="group flex flex-col overflow-hidden rounded-3xl border border-brand-border bg-brand-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-xl shadow-sm">
                    <div className="inline-block self-start px-3 py-1 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-primary/20">
                      {language === "it" ? job.departmentIt : job.departmentEn}
                    </div>
                    <Link href={`/careers/${job.id}`}>
                      <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {language === "it" ? job.titleIt : job.titleEn}
                      </h3>
                    </Link>
                    <p className="text-brand-textSecondary text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                      {language === "it" ? job.descriptionIt : job.descriptionEn}
                    </p>

                    <Link href={`/careers/${job.id}`} className="mt-auto inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest">
                      {language === "it" ? "Scopri di più" : t("careers.card.btn")}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="rounded-2xl border border-brand-border bg-brand-surface px-8 py-4 text-sm font-bold tracking-widest text-brand-textPrimary uppercase shadow-sm hover:bg-brand-card dark:hover:bg-slate-800 hover:text-brand-primary transition-all duration-300 hover:shadow-md hover:border-brand-primary/30"
                  >
                    {language === "it" ? "Vedi Altri" : t("careers.list.more")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Preserved Engineering Culture / Life at pyBIM Section (#life anchor) */}
      <span id="engineering-culture" className="scroll-mt-28" />
      <section id="life" className="scroll-mt-28 py-24 bg-brand-surface">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              {t("careers.eng.tag")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("careers.eng.title")}
            </h2>
            <p className="text-brand-textSecondary max-w-2xl mx-auto font-medium mt-4 text-lg" dangerouslySetInnerHTML={{ __html: t("careers.eng.desc") }} />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.eng.box1_title")}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.eng.box1_desc") }} />
            </div>

            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.eng.box2_title")}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.eng.box2_desc") }} />
            </div>

            <div className="bg-brand-card border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.eng.box3_title")}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.eng.box3_desc") }} />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
