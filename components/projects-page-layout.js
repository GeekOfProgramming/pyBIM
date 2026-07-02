"use client";
import { useState } from "react";
import Link from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPageLayout({ projects = [] }) {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedProjects = [...projects];
  const visibleProjects = sortedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProjects.length;

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[25vh] items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Progects/projects.jpg" 
            alt={t("projects.hero.title")} 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081730]/90 via-[#081730]/60 to-[#081730]" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
            {t("projects.hero.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/50">
            <Link href="/" className="hover:text-orange-400 transition">{t("projects.hero.breadcrumb_home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">{t("projects.hero.breadcrumb_projects")}</span>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="bg-gradient-to-b from-[#081730] to-transparent w-full border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => {
            return (
              <div key={project.slug} className="group relative rounded-3xl border border-white/10 bg-[#0a1321] overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-xl cursor-not-allowed">
                
                {/* Full Card Coming Soon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#081730]/70 backdrop-blur-md z-50">
                  <span className="bg-white text-[#081730] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl rotate-[-5deg] border-2 border-orange-500">
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
                  <div className="absolute top-4 left-4 bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    {project.category?.[language] || project.category?.it || "Project"}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-1 relative z-20 -mt-10 bg-[#0a1321]/90 border-t border-white/5 mx-4 rounded-t-2xl opacity-30 blur-[2px]">
                  {/* Meta */}
                  <div className="flex items-center gap-1.5 text-xs font-medium text-white/50 mb-4">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    {project.date?.[language] || project.date?.it || "Data non disponibile"}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title?.[language] || project.title?.it || project.slug}
                  </h3>
                  
                  <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
                    {project.description?.[language] || project.description?.it || ""}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/30 cursor-not-allowed mt-auto">
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
              className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/10 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-blue-500/25"
            >
              See More
            </button>
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
