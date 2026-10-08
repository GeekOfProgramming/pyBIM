"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "./carousel";

export default function ProjectsGrid({ projects }) {
  const { t, language } = useLanguage();
  const displayProjects = projects ? [...projects].slice(0, 3) : [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-accent" /> {t("home.projects.badge")}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
          {t("home.projects.title")}
        </h2>
      </div>

      <Carousel>
        {displayProjects.map((project) => (
          <div key={project.slug} className="group relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/5] hover:-translate-y-2 transition-transform duration-500 shadow-xl h-full cursor-not-allowed">
            
            {/* Full Card Coming Soon Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-brand-base/70 backdrop-blur-md z-10">
              <span className="bg-white text-[#081730] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl rotate-[-5deg] border-2 border-brand-accent">
                {t("common.coming_soon")}
              </span>
            </div>

            <img src={project.image} alt={project.title[language] || project.title.it} className="w-full h-full object-cover blur-sm opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081730] via-[#081730]/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 opacity-30 blur-[2px]">
              <div className="inline-block px-3 py-1 bg-brand-accent/20 border border-brand-accent/50 rounded-full text-brand-accent text-xs font-bold uppercase tracking-wider mb-4">
                {project.category?.[language] || project.category?.it}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-white/50 mb-3">
                <Calendar className="w-4 h-4 text-brand-accent" />
                {project.date?.[language] || project.date?.it || t("common.date_unavailable")}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                {project.title?.[language] || project.title?.it}
              </h3>
              
              <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-2">
                {project.description?.[language] || project.description?.it || ""}
              </p>
              <span className="inline-flex items-center text-sm font-bold text-white/30 uppercase tracking-wide cursor-not-allowed">
                {t("home.projects.details")} <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
              </span>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="mt-16 text-center">
        <Link href="/success-stories" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-accent transition-colors uppercase tracking-wider border-b border-brand-accent pb-1">
          {t("home.projects.all")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
