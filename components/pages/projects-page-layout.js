"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, Server, Terminal, Lock, Briefcase, ChevronLeft, ArrowRight, Activity, Code, ShieldCheck, Quote, Users, Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

import { vector1Projects, vector2Projects, vector3Projects } from "@/lib/data/projects-data";
import testimonialsData from "@/lib/data/testimonials-data.json";

export default function ProjectsPageLayout({ projects = [] }) {
  const { t, language } = useLanguage();
  
  const [v1Count, setV1Count] = useState(3);
  const [v2Count, setV2Count] = useState(3);
  const [v3Count, setV3Count] = useState(3);
  const [privacyChecked, setPrivacyChecked] = useState(false);

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
      <section className="relative flex flex-col items-center justify-center py-32 overflow-hidden border-b border-brand-border bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10 px-6 mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-mono text-brand-primary mb-6 shadow-sm">
            <Terminal className="w-4 h-4" /> ENGINEERING OUTCOMES. PROVEN BY CODE.
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            {t("projects.hero.title") || "Deployment Portfolio"}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-mono text-slate-400">
            <Link href="/" className="hover:text-brand-primary transition">HOME</Link>
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <span className="text-brand-primary">PROJECTS</span>
          </div>
        </div>
      </section>

      {/* VECTOR 01 */}
      <section id="vector-1" className="bg-brand-base w-full py-24 border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-border pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-primary font-mono text-sm mb-4">
                <Activity className="w-5 h-5" />
                <span>DEPLOYMENT VECTOR 01</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary tracking-tight">
                Tech-Enabled BIM Execution
              </h2>
            </div>
            <p className="text-brand-textSecondary max-w-md text-sm">
              Large-scale infrastructure and commercial projects delivered with zero-defect algorithmic coordination.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vector1Projects.slice(0, v1Count).map((project) => (
              <ProjectCard key={project.slug} project={project} language={language} t={t} accent="blue" />
            ))}
          </div>
          {v1Count < vector1Projects.length && (
            <div className="mt-12 flex justify-center border-t border-brand-border pt-12">
              <button 
                onClick={() => setV1Count(prev => prev + 3)}
                className="px-6 py-3 border border-brand-primary/30 text-brand-primary text-xs font-mono font-bold tracking-widest uppercase rounded-full hover:bg-brand-primary hover:text-white transition-colors"
              >
                + LOAD MORE
              </button>
            </div>
          )}
        </div>
      </section>

      {/* VECTOR 02 */}
      <section id="vector-2" className="bg-brand-surface w-full py-24 border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-border pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-500 font-mono text-sm mb-4">
                <Code className="w-5 h-5" />
                <span>DEPLOYMENT VECTOR 02</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary tracking-tight">
                API & Custom Automation
              </h2>
            </div>
            <p className="text-brand-textSecondary max-w-md text-sm">
              Proprietary C# and Python plugins engineered to reduce engineering hours by up to 80%.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vector2Projects.slice(0, v2Count).map((project) => (
              <ProjectCard key={project.slug} project={project} language={language} t={t} accent="emerald" />
            ))}
          </div>
          {v2Count < vector2Projects.length && (
            <div className="mt-12 flex justify-center border-t border-brand-border pt-12">
              <button 
                onClick={() => setV2Count(prev => prev + 3)}
                className="px-6 py-3 border border-emerald-500/30 text-emerald-500 text-xs font-mono font-bold tracking-widest uppercase rounded-full hover:bg-emerald-500 hover:text-white transition-colors"
              >
                + LOAD MORE
              </button>
            </div>
          )}
        </div>
      </section>

      {/* VECTOR 03 */}
      <section id="vector-3" className="bg-slate-950 w-full py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-violet-400 font-mono text-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
                <span>DEPLOYMENT VECTOR 03</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Sovereign Edge AI
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-sm">
              Air-gapped LLM deployments for ISO 19650-5 compliant engineering intelligence.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {vector3Projects.slice(0, v3Count).map((project) => (
              <ProjectCard key={project.slug} project={project} language={language} t={t} accent="violet" dark />
            ))}
          </div>
          {v3Count < vector3Projects.length && (
            <div className="mt-12 flex justify-center border-t border-slate-800 pt-12">
              <button 
                onClick={() => setV3Count(prev => prev + 3)}
                className="px-6 py-3 border border-violet-400/30 text-violet-400 text-xs font-mono font-bold tracking-widest uppercase rounded-full hover:bg-violet-400 hover:text-white transition-colors"
              >
                + LOAD MORE
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION - DARK DESIGN */}
      <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-800 overflow-hidden text-white">
        <div className="mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-mono font-bold tracking-widest text-blue-400 uppercase mb-4 shadow-sm">
              <Users className="w-4 h-4" /> {t("projects.testimonials.tag") || "CLIENT TESTIMONIALS"}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              {t("projects.testimonials.title") || "What Our Clients Say"}
            </h2>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <button 
              onClick={scrollPrev}
              className="absolute left-[-24px] md:left-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900 hover:border-brand-primary hover:text-brand-primary transition-all shadow-md"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] xl:flex-[0_0_20%] min-w-0 pl-4 py-2">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-sm h-full flex flex-col justify-between hover:-translate-y-1 hover:border-brand-primary/30 transition-all duration-300">
                      <div>
                        <Quote className="w-8 h-8 text-brand-primary/40 mb-4" />
                        <p className="text-slate-300 text-sm leading-relaxed font-medium mb-6">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-slate-800">
                        <div className="font-bold text-white text-sm">{testimonial.author}</div>
                        <div className="text-xs text-slate-500 line-clamp-1">{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={scrollNext}
              className="absolute right-[-24px] md:right-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900 hover:border-brand-primary hover:text-brand-primary transition-all shadow-md"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Add Review Form */}
          <div className="mt-24 max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{t("projects.review.title") || "Leave a Review"}</h3>
              <p className="text-slate-400 text-sm">{t("projects.review.desc") || "We would love to hear your thoughts on our work together."}</p>
            </div>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("projects.review.form.name") || "NAME"}</label>
                  <input type="text" id="name" placeholder={t("projects.review.form.name_ph") || "John Doe"} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="jobTitle" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("projects.review.form.job") || "JOB TITLE"}</label>
                  <input type="text" id="jobTitle" placeholder={t("projects.review.form.job_ph") || "e.g. BIM Manager"} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("projects.review.form.company") || "COMPANY"}</label>
                  <input type="text" id="company" placeholder={t("projects.review.form.company_ph") || "e.g. TechCorp"} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("projects.review.form.location") || "LOCATION"}</label>
                  <input type="text" id="location" placeholder={t("projects.review.form.location_ph") || "e.g. Germany"} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quote" className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">{t("projects.review.form.feedback") || "YOUR FEEDBACK"}</label>
                <textarea id="quote" rows={4} placeholder={t("projects.review.form.feedback_ph") || "Tell us about your experience..."} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"></textarea>
              </div>
              <div className="flex items-start gap-3 mt-2">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-brand-primary bg-slate-950 border-slate-800 rounded"
                />
                <label htmlFor="privacy" className="text-xs text-slate-400 leading-relaxed">
                  {t("projects.review.form.privacy_part1") || "I accept the"} <Link href="/privacy-policy" target="_blank" className="text-brand-primary hover:underline">{t("projects.review.form.privacy_link") || "Privacy Policy"}</Link>{t("projects.review.form.privacy_part2") || ". I understand that my review will be checked by the moderation team before being published on the website."}
                </label>
              </div>
              <button 
                disabled={!privacyChecked}
                className={`mt-4 w-full md:w-auto md:ml-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all ${privacyChecked ? 'bg-brand-primary hover:bg-brand-primaryHover' : 'bg-brand-primary/50 cursor-not-allowed'}`}
              >
                {t("projects.review.form.submit") || "Submit Review"} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, language, t, accent, dark }) {
  const accentColors = {
    blue: "text-brand-primary",
    emerald: "text-emerald-500",
    violet: "text-violet-400"
  };
  const accentBorders = {
    blue: "border-brand-primary/20",
    emerald: "border-emerald-500/20",
    violet: "border-violet-400/20"
  };

  const isDark = dark ? "bg-slate-900 border-slate-800 hover:border-violet-400/50" : "bg-brand-card border-brand-border hover:border-brand-primary/50";
  const textPrimary = dark ? "text-white" : "text-brand-textPrimary";
  const textSecondary = dark ? "text-slate-400" : "text-brand-textSecondary";

  return (
    <div className={`group flex flex-col rounded-3xl border ${isDark} overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm`}>
      <Link href={`/projects/${project.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block">
        <img 
          src={project.image || "/Pictures/BIM/bim-0011.jpg"} 
          alt={project.title?.[language] || project.title?.en} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-4">
          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-1 rounded-md border ${accentBorders[accent]} ${accentColors[accent]} bg-black/5 dark:bg-white/5`}>
            {project.category?.[language] || project.category?.en || "ENGINEERING"}
          </span>
        </div>
        
        <Link href={`/projects/${project.slug}`}>
          <h3 className={`text-xl font-bold ${textPrimary} mb-2 group-hover:${accentColors[accent]} transition-colors`}>
            {project.title?.[language] || project.title?.en}
          </h3>
        </Link>
        <p className={`${textSecondary} text-sm mb-6 line-clamp-2`}>
          {project.description?.[language] || project.description?.en}
        </p>
        
        {/* Metric Bar */}
        <div className={`mt-auto pt-4 border-t ${dark ? 'border-slate-800' : 'border-brand-border'} grid grid-cols-2 gap-4 font-mono text-xs`}>
          <div>
            <span className={`block ${textSecondary} mb-1`}>HOURS SAVED</span>
            <span className={`${textPrimary} font-bold`}>+{(project.slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 400 + 150)}h</span>
          </div>
          <div>
            <span className={`block ${textSecondary} mb-1`}>COMPLIANCE</span>
            <span className={`${textPrimary} font-bold flex items-center gap-1`}>
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> 100%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}