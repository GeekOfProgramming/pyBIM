"use client";

import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import { ChevronRight, CheckCircle2, Terminal, Server, Cpu, Building, Heart, Zap, Sparkles, Users, Briefcase } from "lucide-react";

export default function CareersPageLayout({ jobs }) {
  const { language, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);

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
      {/* Hero Section - Culture & Benefits */}
      <section id="culture" className="relative overflow-hidden py-24 lg:py-32 border-b border-brand-border bg-brand-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-8 shadow-sm">
              {t("careers.hero.tag")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-textPrimary tracking-tight mb-8">
              {t("careers.hero.title")}
            </h1>
            <p className="text-lg text-brand-textSecondary leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.hero.desc") }} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.culture.box1_title")}</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.culture.box1_desc") }} />
            </div>
            
            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.culture.box2_title")}</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.culture.box2_desc") }} />
            </div>

            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.culture.box3_title")}</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.culture.box3_desc") }} />
            </div>

            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.culture.box4_title")}</h3>
              <p className="text-brand-textSecondary leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.culture.box4_desc") }} />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 relative border-b border-brand-border bg-brand-base">
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
            <div className="bg-white border border-brand-border rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left max-w-4xl mx-auto">
              
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
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.map((job) => (
                  <div key={job.id} className="group flex flex-col overflow-hidden rounded-3xl border border-brand-border bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-primary/30 hover:shadow-xl shadow-sm">
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
                    className="rounded-2xl border border-brand-border bg-brand-surface px-8 py-4 text-sm font-bold tracking-widest text-brand-textPrimary uppercase shadow-sm hover:bg-white hover:text-brand-primary transition-all duration-300 hover:shadow-md hover:border-brand-primary/30"
                  >
                    {language === "it" ? "Vedi Altri" : t("careers.list.more")}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Engineering Culture Section */}
      <section id="engineering-culture" className="py-24 bg-brand-surface">
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
            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.eng.box1_title")}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.eng.box1_desc") }} />
            </div>

            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-100 mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-3">{t("careers.eng.box2_title")}</h3>
              <p className="text-brand-textSecondary text-sm leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t("careers.eng.box2_desc") }} />
            </div>

            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-all hover:border-brand-primary/30">
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
