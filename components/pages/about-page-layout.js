"use client";

import { useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Code2, Cpu, Cog, Briefcase, Terminal, Activity, Shield, Users, Zap, Building } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TeamPartnersSection from "@/components/sections/team-partners-section";

export default function AboutPageLayout({ teamData }) {
  const { t } = useLanguage();

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

  return (
    <div className="w-full bg-brand-base">
      {/* SECTION 1: Hero Section (The Manifesto) */}
      <section id="manifesto" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden border-b border-brand-border bg-brand-surface pt-24 pb-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10 mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-8 backdrop-blur-sm shadow-sm">
            <Terminal className="w-4 h-4" /> THE MANIFESTO
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-brand-textPrimary tracking-tight mb-8 leading-tight max-w-5xl mx-auto" dangerouslySetInnerHTML={{ __html: t("about.manifesto.title") }} />
          <h2 className="text-lg md:text-xl text-brand-textSecondary leading-relaxed max-w-3xl mx-auto font-medium mb-12" dangerouslySetInnerHTML={{ __html: t("about.manifesto.subtitle") }} />

          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-brand-primary hover:bg-brand-secondary rounded-full shadow-lg hover:shadow-brand-primary/30 transition-all duration-300 transform hover:-translate-y-1">
              {t("about.manifesto.cta")}
            </Link>
            <p className="text-sm text-brand-textSecondary max-w-md mx-auto">
              {t("about.manifesto.cta_sub")}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Core Philosophy (3 Column Grid) */}
      <section className="bg-brand-base w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">

            {/* Box 1: The Traditional "Modeling Farm" */}
            <div className="rounded-3xl border border-red-200 bg-white p-8 md:p-10 relative overflow-hidden group hover:border-red-300 transition-colors shadow-sm flex flex-col h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-50 blur-[60px] rounded-full group-hover:bg-red-100 transition-colors" />
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.box1_title")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-brand-textPrimary mb-1">{t("about.manifesto.box1_subtitle")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box1_desc1")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-textPrimary mb-1">{t("about.manifesto.box1_desc2_title")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box1_desc2")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: The pyBIM Automation Lab */}
            <div className="rounded-3xl border-2 border-brand-primary/40 bg-white p-8 md:p-10 relative overflow-hidden group shadow-[0_0_40px_-10px_rgba(37,99,235,0.25)] hover:shadow-[0_0_50px_-10px_rgba(37,99,235,0.4)] hover:border-brand-primary/60 transition-all flex flex-col h-full lg:-translate-y-4 z-10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/5 blur-[60px] rounded-full group-hover:bg-brand-primary/10 transition-colors" />
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.box3_title")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">{t("about.manifesto.box3_subtitle")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box3_desc1")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-primary mb-1">{t("about.manifesto.box3_desc2_title")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box3_desc2")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: The Generic Software Vendor */}
            <div className="rounded-3xl border border-orange-200 bg-white p-8 md:p-10 relative overflow-hidden group hover:border-orange-300 transition-colors shadow-sm flex flex-col h-full">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-50 blur-[60px] rounded-full group-hover:bg-orange-100 transition-colors" />
              <div className="relative z-10 flex-grow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 text-orange-500 border border-orange-100">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary">{t("about.manifesto.box2_title")}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-brand-textPrimary mb-1">{t("about.manifesto.box2_subtitle")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box2_desc1")}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-textPrimary mb-1">{t("about.manifesto.box2_desc2_title")}:</h4>
                    <p className="text-brand-textSecondary text-sm leading-relaxed">{t("about.manifesto.box2_desc2")}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Our Journey (Vertical Timeline Component) */}
      <section id="journey" className="bg-brand-surface w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm">
              <Activity className="w-4 h-4" /> OUR JOURNEY
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-6">Our Journey</h2>
            <p className="text-brand-textSecondary text-lg font-medium">The evolution from manual coordination to automated engineering.</p>
          </div>

          <div className="relative space-y-24 md:space-y-32">
            {/* Vertical Line */}
            <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-border md:-translate-x-1/2" />

            {/* Phase 1 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.badge")}</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p1_title")}</h3>
                <ul className="space-y-4">
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p1_item1_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p1_item1_desc") }} />
                  </li>
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p1_item2_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p1_item2_desc") }} />
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:shadow-[0_0_0_6px_rgba(37,99,235,0.2)] transition-shadow" />
              <div className="md:w-[45%] md:pr-16 md:text-right">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.p2_badge")}</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p2_title")}</h3>
                <ul className="space-y-4">
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p2_item1_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p2_item1_desc") }} />
                  </li>
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p2_item2_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p2_item2_desc") }} />
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="relative pl-16 md:pl-0 group">
              <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-brand-primary border-2 border-brand-primary shadow-[0_0_0_6px_rgba(37,99,235,0.2)] group-hover:shadow-[0_0_0_8px_rgba(37,99,235,0.3)] transition-shadow" />
              <div className="md:w-[45%] md:ml-auto md:pl-16">
                <div className="text-sm font-mono font-bold text-brand-primary mb-2">{t("about.journey.p3_badge")}</div>
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t("about.journey.p3_title")}</h3>
                <ul className="space-y-4">
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p3_item1_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p3_item1_desc") }} />
                  </li>
                  <li className="text-brand-textSecondary text-base leading-relaxed">
                    <strong className="text-brand-textPrimary">{t("about.journey.p3_item2_title")}: </strong> 
                    <span dangerouslySetInnerHTML={{ __html: t("about.journey.p3_item2_desc") }} />
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Tech Stack & Standards (Logo & Engineering Arsenal Grid) */}
      <section id="tech-stack" className="bg-brand-base w-full border-b border-brand-border py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm">
              <Code2 className="w-4 h-4" /> {t("about.tech.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
              The tools & standards we use to engineer the process.
            </h2>
            <p className="text-brand-textSecondary text-base md:text-lg font-medium">
              Eliminating manual bottlenecks through programmatic execution, CDE hosting, and strict ISO compliance.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {/* 1. ENGINEERING TOOLS (13 Items) */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="border-b border-brand-border pb-6 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">{t("about.tech.box1_top")}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">{t("about.tech.box1_top_right")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2 mb-1">
                    <Cog className="w-5 h-5 text-brand-primary" /> {t("about.tech.box1_title")}
                  </h3>
                  <p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box1_sub")}</p>
                </div>

                <div className="space-y-3.5">
                  {(t("about.tech.tools") || []).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. DEVELOPMENT STACK (12 Items) */}
            <div className="rounded-3xl bg-white border border-brand-primary/30 shadow-lg p-8 flex flex-col justify-between relative group hover:border-brand-primary/50 transition-all">
              <div className="absolute inset-0 bg-brand-primary/[0.02] rounded-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="border-b border-brand-primary/20 pb-6 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest block">{t("about.tech.box2_top")}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">{t("about.tech.box2_top_right")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2 mb-1">
                    <Terminal className="w-5 h-5 text-brand-primary" /> {t("about.tech.box2_title")}
                  </h3>
                  <p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box2_sub")}</p>
                </div>

                <div className="space-y-3.5">
                  {(t("about.tech.dev") || []).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-primary/5 border border-brand-primary/15 hover:bg-white hover:border-brand-primary/40 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-brand-primary text-white">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. STANDARDS & PROTOCOLS (12 Items) */}
            <div className="rounded-3xl bg-white border border-brand-border shadow-sm p-8 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="border-b border-brand-border pb-6 mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-textSecondary uppercase tracking-widest block">{t("about.tech.box3_top")}</span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary">{t("about.tech.box3_top_right")}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-textPrimary flex items-center gap-2 mb-1">
                    <Code2 className="w-5 h-5 text-brand-primary" /> {t("about.tech.box3_title")}
                  </h3>
                  <p className="text-xs text-brand-primary font-mono italic">{t("about.tech.box3_sub")}</p>
                </div>

                <div className="space-y-3.5">
                  {(t("about.tech.stds") || []).map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-brand-surface/60 border border-brand-border/60 hover:bg-white hover:border-brand-primary/30 hover:shadow-sm transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-brand-textPrimary">{item.name}</span>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">{item.tag}</span>
                      </div>
                      <p className="text-xs text-brand-textSecondary font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: Our Impact (Stats/Counters) */}
      <section id="impact" className="bg-brand-surface w-full border-b border-brand-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Shield className="w-4 h-4" /> {t("about.impact.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              Measurable Efficiency & Zero-Error Results
            </h2>
          </div>
          <div className="grid gap-16 md:grid-cols-3">
            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat1.val")}
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat1.desc") }} />
            </div>

            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat2.val")}
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat2.desc") }} />
            </div>

            <div className="text-center group">
              <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-primary to-blue-400 mb-6 group-hover:scale-105 transition-transform duration-500">
                {t("about.impact.stat3.val")}
              </div>
              <div className="text-brand-textSecondary font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xs mx-auto" dangerouslySetInnerHTML={{ __html: t("about.impact.stat3.desc") }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Call to Action (Two side-by-side cards) */}
      <section className="bg-brand-base w-full py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">

            {/* Card 1 For Clients */}
            <div className="rounded-[2.5rem] border border-brand-border bg-white shadow-lg p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-surface blur-[80px] rounded-full pointer-events-none group-hover:bg-brand-primary/5 transition-colors" />
              <div className="relative z-10 w-full">
                <Briefcase className="w-12 h-12 text-brand-primary/60 mb-10 group-hover:text-brand-primary transition-colors" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">
                  Are your company's BIM workflows slowing you down? Let's optimize them.
                </h3>
              </div>
              <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-surface px-8 py-4 font-bold text-brand-textPrimary hover:bg-white hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md transition-all">
                {t("about.cta.card1.btn")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Card 2 For Talent */}
            <div className="rounded-[2.5rem] border border-brand-primary/20 bg-white shadow-xl p-10 md:p-14 flex flex-col items-start justify-between relative overflow-hidden group hover:border-brand-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full group-hover:bg-brand-primary/10 transition-colors pointer-events-none" />
              <div className="relative z-10 w-full">
                <Code2 className="w-12 h-12 text-brand-primary mb-10" />
                <h3 className="text-3xl font-bold text-brand-textPrimary leading-snug mb-12">
                  Are you an engineer who fell in love with Python? You belong here.
                </h3>
              </div>
              <Link href="/contact" className="relative z-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 font-bold text-white hover:bg-brand-accentHover transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                {t("about.cta.card2.btn")} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Team & Leadership */}
      <TeamPartnersSection teamData={teamData} />

    </div>
  );
}
