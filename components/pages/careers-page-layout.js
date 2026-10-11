"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import WorkWithUsHero from "@/components/careers/work-with-us-hero";
import HowWeWorkSection from "@/components/careers/how-we-work-section";
import ExpertiseAreasSection from "@/components/careers/expertise-areas-section";
import OpenRolesCollaborationsSection from "@/components/careers/open-roles-collaborations-section";
import {
  Terminal,
  Server,
  Cpu
} from "lucide-react";

export default function CareersPageLayout({ jobs }) {
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
    <div className="bg-brand-base">

      {/* S01: Work With pyBIM Hero */}
      <WorkWithUsHero />

      {/* S02: How We Work (Extracted Culture Section) */}
      <HowWeWorkSection />

      {/* S03: Where You Can Contribute (Expertise Areas) */}
      <ExpertiseAreasSection />

      {/* S04: Open Roles & Collaborations Section */}
      <OpenRolesCollaborationsSection jobs={jobs} />

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
