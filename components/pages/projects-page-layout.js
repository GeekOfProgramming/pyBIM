"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, Calendar, Quote, Briefcase, FileText, Users, ChevronLeft, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

import { allProjects, featuredAiCaseStudies } from "@/lib/data/projects-data";
import testimonialsData from "@/lib/data/testimonials-data.json";

export default function ProjectsPageLayout({ projects = [] }) {
  const { t, language } = useLanguage();
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [allCount, setAllCount] = useState(3);
  const [featuredCount, setFeaturedCount] = useState(3);
  
  const rawTestimonials = testimonialsData || t("projects.testimonials.list");
  const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center py-32 overflow-hidden border-b border-brand-border bg-brand-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10 px-6 mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm">
            <Briefcase className="w-4 h-4" /> {t("projects.hero.tag")}
          </div>
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

      {/* ALL PROJECTS SECTION */}
      <section id="all-projects" className="bg-brand-base w-full py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Briefcase className="w-4 h-4" /> {t("projects.all.tag")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("projects.all.title")}
            </h2>
            <p className="mt-4 text-brand-textSecondary text-lg max-w-2xl mx-auto">
              {t("projects.all.desc")}
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {allProjects.slice(0, allCount).map((project) => (
              <div key={project.slug} className="group flex flex-col rounded-3xl border border-brand-border bg-brand-surface overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-md">
                <Link href={`/projects/${project.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block border-b border-brand-border bg-brand-surface">
                  <img 
                    src={project.image} 
                    alt={project.title?.[language] || project.title?.en} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-minor1 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {project.category?.[language] || project.category?.en}
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-textSecondary mb-4">
                    <Calendar className="w-4 h-4 text-brand-primary" />
                    {project.date?.[language] || project.date?.en}
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors">
                      {project.title?.[language] || project.title?.en}
                    </h3>
                  </Link>
                  <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6">
                    {project.description?.[language] || project.description?.en}
                  </p>
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary mt-auto hover:text-brand-accent transition-colors">
                    {t("projects.card.readmore")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {allCount < allProjects.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setAllCount(p => p + 3)} className="rounded-full border border-brand-accent bg-brand-card dark:bg-slate-900 px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                {t("projects.all.more")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED CASE STUDIES SECTION */}
      <section id="featured" className="bg-brand-surface w-full border-t border-b border-brand-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <FileText className="w-4 h-4" /> {t("projects.featured.tag")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("projects.featured.title")}
            </h2>
            <p className="mt-4 text-brand-textSecondary text-lg max-w-2xl mx-auto">
              {t("projects.featured.desc")}
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {featuredAiCaseStudies.slice(0, featuredCount).map((project) => {
              return (
                <div key={project.slug} className="group relative rounded-3xl border border-brand-border bg-brand-card overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-md flex flex-col">
                  
                  {/* Image Container */}
                  <Link href={`/projects/${project.slug}`} className="relative aspect-[16/9] w-full overflow-hidden bg-brand-surface block">
                    <img 
                      src={project.image} 
                      alt={project.title?.[language] || project.title?.en} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1321]/80 to-transparent opacity-90" />
                    
                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-brand-accent/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {project.category?.[language] || project.category?.en}
                    </div>
                  </Link>

                  {/* Content Container */}
                  <div className="p-8 flex flex-col flex-1 relative z-20 bg-brand-card">
                    {/* Meta */}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-brand-textSecondary mb-4">
                      <Calendar className="w-4 h-4 text-brand-primary" />
                      {project.date?.[language] || project.date?.en}
                    </div>

                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors">
                        {project.title?.[language] || project.title?.en}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-brand-textSecondary leading-relaxed mb-6">
                      {project.description?.[language] || project.description?.en}
                    </p>

                    <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary mt-auto hover:text-brand-accent transition-colors">
                      {t("projects.card.readmore")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
          {featuredCount < featuredAiCaseStudies.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setFeaturedCount(p => p + 3)} className="rounded-full border border-brand-accent bg-brand-card dark:bg-slate-900 px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                {t("projects.featured.more")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-brand-base border-b border-brand-border overflow-hidden">
        <div className="mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Users className="w-4 h-4" /> {t("projects.testimonials.tag")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("projects.testimonials.title")}
            </h2>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <button 
              onClick={scrollPrev}
              className="absolute left-[-24px] md:left-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-border flex items-center justify-center bg-brand-card dark:bg-slate-800 text-brand-textPrimary hover:border-brand-accent hover:text-brand-accent transition-all shadow-md"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_20%] min-w-0 pl-4 py-2">
                    <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                      <div>
                        <Quote className="w-8 h-8 text-brand-primary/30 mb-4" />
                        <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-brand-border/50">
                        <div className="font-bold text-brand-textPrimary text-sm">{testimonial.author}</div>
                        <div className="text-xs text-brand-textSecondary line-clamp-1">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={scrollNext}
              className="absolute right-[-24px] md:right-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-border flex items-center justify-center bg-brand-card dark:bg-slate-800 text-brand-textPrimary hover:border-brand-accent hover:text-brand-accent transition-all shadow-md"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Add Review Form */}
          <div className="mt-24 max-w-3xl mx-auto bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-2">{t("projects.review.title")}</h3>
              <p className="text-brand-textSecondary text-sm">{t("projects.review.desc")}</p>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{t("projects.review.form.name")}</label>
                  <input type="text" id="name" placeholder={t("projects.review.form.name_ph")} className="w-full bg-brand-card dark:bg-slate-900 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="jobTitle" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{t("projects.review.form.job")}</label>
                  <input type="text" id="jobTitle" placeholder={t("projects.review.form.job_ph")} className="w-full bg-brand-card dark:bg-slate-900 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{t("projects.review.form.company")}</label>
                  <input type="text" id="company" placeholder={t("projects.review.form.company_ph")} className="w-full bg-brand-card dark:bg-slate-900 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="location" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{t("projects.review.form.location")}</label>
                  <input type="text" id="location" placeholder={t("projects.review.form.location_ph")} className="w-full bg-brand-card dark:bg-slate-900 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quote" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">{t("projects.review.form.feedback")}</label>
                <textarea id="quote" rows={4} placeholder={t("projects.review.form.feedback_ph")} className="w-full bg-brand-card dark:bg-slate-900 border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-textPrimary placeholder:text-brand-textSecondary/60 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"></textarea>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 text-brand-primary border-brand-border rounded focus:ring-brand-primary/20"
                />
                <label htmlFor="privacy" className="text-xs text-brand-textSecondary leading-relaxed">
                  {t("projects.review.form.privacy_part1")} <Link href="/privacy-policy" target="_blank" className="text-brand-primary hover:underline hover:text-brand-primaryHover">{t("projects.review.form.privacy_link")}</Link>{t("projects.review.form.privacy_part2")}
                </label>
              </div>
              <button 
                disabled={!privacyChecked}
                className={`mt-2 w-full md:w-auto md:ml-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all ${privacyChecked ? 'bg-brand-primary hover:bg-brand-primaryHover' : 'bg-brand-primary/50 cursor-not-allowed'}`}
              >
                {t("projects.review.form.submit")} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
