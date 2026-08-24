"use client";

import { useState, useEffect } from "react";
import Link from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, Calendar, Quote } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPageLayout({ projects = [] }) {
  const { t, language } = useLanguage();
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

  const sortedProjects = [...projects];
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[35vh] items-center justify-center overflow-hidden py-16 border-b border-brand-border bg-brand-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10 px-6 mt-10">
          <h1 className="text-4xl md:text-6xl font-bold text-brand-textPrimary mb-6 tracking-tight">
            {t("projects.hero.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary">
            <Link href="/" className="hover:text-brand-primary transition">{t("projects.hero.breadcrumb_home")}</Link>
            <ChevronRight className="w-4 h-4 text-brand-textSecondary/50" />
            <span className="text-brand-primary">{t("projects.hero.breadcrumb_projects")}</span>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section id="featured" className="bg-brand-surface w-full border-t border-brand-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => {
            return (
              <div key={project.slug} className="group relative rounded-3xl border border-brand-border bg-white overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-md cursor-not-allowed">
                
                {/* Full Card Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-md z-50">
                  <span className="bg-brand-surface text-brand-textPrimary px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-sm rotate-[-5deg] border-2 border-brand-border">
                    {language === "en" ? "Coming Soon" : "Prossimamente"}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden blur-sm opacity-50">
                  <img 
                    src={project.image || "/Pictures/General/hvac-industrial.jpg"} 
                    alt={project.title?.[language] || project.title?.it || project.slug} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1321] to-transparent opacity-90" />
                  
                  {/* Category Label */}
                  <div className="absolute top-4 left-4 bg-brand-accent/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {project.category?.[language] || project.category?.it || "Project"}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-1 relative z-20 -mt-10 bg-white/90 border-t border-brand-border mx-4 rounded-t-2xl opacity-30 blur-[2px]">
                  {/* Meta */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-brand-textSecondary mb-4">
                    <Calendar className="w-4 h-4 text-brand-primary" />
                    {project.date?.[language] || project.date?.it || "Data non disponibile"}
                  </div>

                  <h3 className="text-xl font-bold text-brand-textPrimary mb-3">
                    {project.title?.[language] || project.title?.it || project.slug}
                  </h3>
                  
                  <p className="text-sm text-brand-textSecondary leading-relaxed mb-6 line-clamp-2">
                    {project.description?.[language] || project.description?.it || ""}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-textSecondary/50 cursor-not-allowed mt-auto">
                    {t("projects.card.readmore")} <ArrowRight className="w-4 h-4 opacity-50" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* LOAD MORE BUTTON */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-2xl border border-brand-border bg-brand-surface px-8 py-4 text-sm font-bold tracking-widest text-brand-textPrimary uppercase shadow-sm hover:bg-white hover:text-brand-primary transition-all duration-300 hover:shadow-md hover:border-brand-primary/30"
            >
              See More
            </button>
          </div>
        )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-brand-base border-t border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-brand-primary uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              CLIENT FEEDBACK
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mt-4">
              What European AEC Leaders Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm">
              <Quote className="w-8 h-8 text-brand-primary/40 mb-4" />
              <p className="text-brand-textSecondary text-base leading-relaxed font-medium mb-6">
                "pyBIM's automated clash resolution scripts cut our coordination cycles in half on the DACH hospital project. Their C# plugins operate flawlessly within our Revit environment."
              </p>
              <div className="font-bold text-brand-textPrimary text-sm">Senior BIM Manager</div>
              <div className="text-xs text-brand-textSecondary">Tier-1 European General Contractor (Germany)</div>
            </div>

            <div className="bg-white border border-brand-border rounded-3xl p-8 shadow-sm">
              <Quote className="w-8 h-8 text-brand-primary/40 mb-4" />
              <p className="text-brand-textSecondary text-base leading-relaxed font-medium mb-6">
                "Their ISO 19650 and COBie data structuring guaranteed zero-error tender submissions for our public infrastructure project in Milan."
              </p>
              <div className="font-bold text-brand-textPrimary text-sm">Lead Technical Director</div>
              <div className="text-xs text-brand-textSecondary">Engineering Studio (Italy)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
