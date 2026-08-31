"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, Calendar, Quote, Briefcase, FileText, Users, ChevronLeft, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    quote: "pyBIM's automated clash resolution scripts cut our coordination cycles in half on the DACH hospital project. Their C# plugins operate flawlessly within our Revit environment.",
    author: "Senior BIM Manager",
    company: "Tier-1 European General Contractor (Germany)"
  },
  {
    quote: "Their ISO 19650 and COBie data structuring guaranteed zero-error tender submissions for our public infrastructure project in Milan.",
    author: "Lead Technical Director",
    company: "Engineering Studio (Italy)"
  },
  {
    quote: "Working with the AI integration has revolutionized our daily workflows, making us more efficient and prone to less errors.",
    author: "Innovation Lead",
    company: "Global Architecture Firm (UK)"
  },
  {
    quote: "The seamless implementation of their AI tools saved us hundreds of hours in repetitive tasks. Highly recommended.",
    author: "Project Coordinator",
    company: "Construction Innovators (Spain)"
  },
  {
    quote: "Their AI-driven approach to BIM is exactly what the industry needs right now to move forward. Truly game-changing.",
    author: "Head of Digital Delivery",
    company: "Nordic Design Group (Sweden)"
  },
  {
    quote: "A flawless experience from start to finish. Their AI models predicted issues before they even happened on site.",
    author: "Operations Manager",
    company: "Swiss Build (Switzerland)"
  }
];

import { allProjects, featuredAiCaseStudies } from "@/lib/data/projects-data";

export default function ProjectsPageLayout({ projects = [] }) {
  const { t, language } = useLanguage();
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [allCount, setAllCount] = useState(3);
  const [featuredCount, setFeaturedCount] = useState(3);
  
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
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-20 border-b border-brand-border bg-brand-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]" />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center relative z-10 px-6 mt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm">
            <Briefcase className="w-4 h-4" /> SUCCESS STORIES
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-textPrimary mb-6 tracking-tight">
            {t("projects.hero.title") || "Our Success Stories"}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary">
            <Link href="/" className="hover:text-brand-primary transition">{t("projects.hero.breadcrumb_home") || "Home"}</Link>
            <ChevronRight className="w-4 h-4 text-brand-textSecondary/50" />
            <span className="text-brand-primary">{t("projects.hero.breadcrumb_projects") || "Projects"}</span>
          </div>
        </div>
      </section>

      {/* ALL PROJECTS SECTION */}
      <section id="all-projects" className="bg-white w-full py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Briefcase className="w-4 h-4" /> ALL PROJECTS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              Our Previous Projects
            </h2>
            <p className="mt-4 text-brand-textSecondary text-lg max-w-2xl mx-auto">
              A comprehensive list of projects we have successfully completed in the past. This section will be updated soon.
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {allProjects.slice(0, allCount).map((project) => (
              <div key={project.slug} className="group flex flex-col rounded-3xl border border-brand-border bg-brand-surface overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-md">
                <Link href={`/projects/${project.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block border-b border-brand-border bg-white">
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
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {allCount < allProjects.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setAllCount(p => p + 3)} className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                See More
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
              <FileText className="w-4 h-4" /> FEATURED CASE STUDIES
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              Real-World AI & Engineering Models
            </h2>
            <p className="mt-4 text-brand-textSecondary text-lg max-w-2xl mx-auto">
              Explore the models and solutions we are currently working on and actively implementing in the workspace.
            </p>
          </div>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {featuredAiCaseStudies.slice(0, featuredCount).map((project) => {
              return (
                <div key={project.slug} className="group relative rounded-3xl border border-brand-border bg-white overflow-hidden hover:-translate-y-2 transition-transform duration-500 shadow-md flex flex-col">
                  
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
                  <div className="p-8 flex flex-col flex-1 relative z-20 bg-white">
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
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
          {featuredCount < featuredAiCaseStudies.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setFeaturedCount(p => p + 3)} className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                See More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 bg-white border-b border-brand-border overflow-hidden">
        <div className="mx-auto px-6 lg:px-16">
          <div className="text-center mb-16 max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Users className="w-4 h-4" /> CLIENT TESTIMONIALS
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="relative mx-auto max-w-[1400px]">
            <button 
              onClick={scrollPrev}
              className="absolute left-[-24px] md:left-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-border flex items-center justify-center bg-white hover:border-brand-accent hover:text-brand-accent transition-all shadow-md"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {testimonials.map((testimonial, idx) => (
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
              className="absolute right-[-24px] md:right-[-72px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-brand-border flex items-center justify-center bg-white hover:border-brand-accent hover:text-brand-accent transition-all shadow-md"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Add Review Form */}
          <div className="mt-24 max-w-3xl mx-auto bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-2">Leave a Review</h3>
              <p className="text-brand-textSecondary text-sm">We would love to hear your thoughts on our work together.</p>
            </div>
            
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">Name</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">Company & Role</label>
                  <input type="text" id="company" placeholder="CEO, TechCorp" className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="review" className="text-xs font-bold text-brand-textPrimary uppercase tracking-wider">Your Feedback</label>
                <textarea id="review" rows={4} placeholder="Tell us about your experience..." className="w-full bg-white border border-brand-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"></textarea>
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
                  I accept the Privacy Policy. I understand that my review will be checked by the moderation team before being published on the website.
                </label>
              </div>
              <button 
                disabled={!privacyChecked}
                className={`mt-2 w-full md:w-auto md:ml-auto inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all ${privacyChecked ? 'bg-brand-primary hover:bg-brand-primaryHover' : 'bg-brand-primary/50 cursor-not-allowed'}`}
              >
                Submit Review <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
