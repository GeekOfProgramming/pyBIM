"use client";
import Link from "@/components/layout/LocalizedLink";
import { useState } from "react";
import { ChevronRight, ChevronDown, Phone, Mail, CheckCircle, Info, Calendar, MapPin, Building, Users, Settings } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetailLayout({ project }) {
  const [openFaq, setOpenFaq] = useState(0);
  const { language, t } = useLanguage();
  const data = {
    title: project.title?.[language] || project.title?.it || project.slug,
    category: project.category?.[language] || project.category?.it,
    date: project.date?.[language] || project.date?.it,
    client: project.client?.[language] || project.client?.it || project.client || t("project.detail.confidential"),
    location: project.location?.[language] || project.location?.it || project.location || t("project.detail.confidential"),
    description: project.description?.[language] || project.description?.it,
    challenge: project.challenge?.[language] || project.challenge?.it,
    solution: project.solution?.[language] || project.solution?.it,
    results: project.results || [],
    process: project.process || [],
    stats: project.stats || { technicians: "", systems: "" },
    challenges: project.challenges || [],
    faq: project.faq || [],
    gallery: project.gallery || [],
    tags: project.tags || []
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <img 
            src={project.image} 
            alt="Project Background" 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-brand-surface/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-transparent to-brand-base" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 uppercase tracking-wider drop-shadow-sm">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary">
            <Link href="/" className="hover:text-brand-primary transition">{t("project.detail.home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/projects" className="hover:text-brand-primary transition">{t("project.detail.projects")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-primary">{data.title}</span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN CONTENT BODY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.5fr] items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Sticky) */}
          <div className="lg:sticky lg:top-28 space-y-8">
            
            {/* Project Information */}
            <div className="rounded-3xl border border-brand-border bg-brand-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand-textPrimary mb-6 uppercase tracking-wider border-b border-brand-border pb-4">{t("project.detail.info")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-brand-textSecondary uppercase">{t("project.detail.category")}</span>
                    <span className="text-brand-textPrimary font-semibold">{data.category}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-brand-textSecondary uppercase">{t("project.detail.start_date")}</span>
                    <span className="text-brand-textPrimary font-semibold">{data.date}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-brand-textSecondary uppercase">{t("project.detail.location")}</span>
                    <span className="text-brand-textPrimary font-semibold">{data.location}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-brand-primary mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-brand-textSecondary uppercase">{t("project.detail.client")}</span>
                    <span className="text-brand-textPrimary font-semibold">{data.client}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Expert Help Card */}
            <div className="rounded-3xl border border-brand-primary/20 bg-brand-surface p-6 text-center relative overflow-hidden shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-brand-primary/30">
                <img src="/Pictures/General/hvac-commercial.jpg" alt="Operator" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-2">{t("project.detail.support.title")}</h4>
              <p className="text-sm text-brand-textSecondary font-medium mb-6">{t("project.detail.support.desc")}</p>
              
              <div className="space-y-4">
                <a href="tel:+390418944704" className="flex items-center justify-center gap-3 bg-brand-card rounded-xl py-3 hover:border-brand-primary/50 transition border border-brand-border">
                  <Phone className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-bold text-brand-textPrimary">041 894 4704</span>
                </a>
                <a href="mailto:info@pybim.com" className="flex items-center justify-center gap-3 bg-brand-card rounded-xl py-3 hover:border-brand-primary/50 transition border border-brand-border">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-bold text-brand-textPrimary truncate px-2">info@pybim.com</span>
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: RIGHT CONTENT */}
          <div className="space-y-12">
            
            {/* Top Image */}
            <div className="rounded-[2.5rem] overflow-hidden border border-brand-border shadow-lg relative aspect-video">
              <img src={project.image} alt="Project Installation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Main Description */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-textPrimary mb-6">{t("project.detail.analysis")}</h2>
              <p className="text-lg text-brand-textSecondary font-medium leading-relaxed mb-6">
                {data.description}
              </p>
            </div>

            {/* Fasi del Processo di Posa */}
            <div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-6 uppercase tracking-wider">{t("project.detail.process")}</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-3xl overflow-hidden border border-brand-border aspect-square md:aspect-auto md:h-full">
                   <img src="/Pictures/General/hvac-industrial.jpg" alt="Work Process" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="space-y-6">
                  {data.process.map((proc, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-brand-textPrimary mb-1">{proc.step?.[language] || proc.step?.it || proc.step}</h4>
                        <p className="text-sm text-brand-textSecondary font-medium leading-relaxed">{proc.desc?.[language] || proc.desc?.it || proc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Caratteristiche e Risultati */}
            <div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-6 uppercase tracking-wider">{t("project.detail.features")}</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {data.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-brand-surface border border-brand-border p-4 rounded-2xl">
                    <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0" />
                    <span className="text-brand-textPrimary font-semibold">{res?.[language] || res?.it || res}</span>
                  </div>
                ))}
              </div>
              
              {/* Stats Banner */}
              <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-brand-accent p-8 grid sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                <div className="flex items-center gap-4 justify-center sm:justify-start">
                  <Users className="w-10 h-10 text-white/80" />
                  <div>
                    <div className="text-3xl font-bold text-white">{data.stats.technicians}</div>
                    <div className="text-sm font-medium text-white/80 uppercase">{t("project.detail.stats.technicians")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-center sm:justify-start pt-8 sm:pt-0 sm:pl-8">
                  <Settings className="w-10 h-10 text-white/80" />
                  <div>
                    <div className="text-3xl font-bold text-white">{data.stats.systems}</div>
                    <div className="text-sm font-medium text-white/80 uppercase">{t("project.detail.stats.systems")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sfide e Soluzioni */}
            <div>
              <h3 className="text-xl font-bold text-brand-textPrimary mb-6 uppercase tracking-wider">{t("project.detail.challenges")}</h3>
              <div className="space-y-4">
                {data.challenges.map((chal, idx) => (
                  <div key={idx} className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-100 p-6 rounded-2xl">
                      <h4 className="text-red-500 font-bold mb-2 uppercase text-sm">{t("project.detail.challenge.title")}</h4>
                      <p className="text-brand-textSecondary font-medium">{chal.c?.[language] || chal.c?.it || chal.c}</p>
                    </div>
                    <div className="bg-brand-primary/5 border border-brand-primary/10 p-6 rounded-2xl">
                      <h4 className="text-brand-primary font-bold mb-2 uppercase text-sm">{t("project.detail.solution.title")}</h4>
                      <p className="text-brand-textSecondary font-medium">{chal.s?.[language] || chal.s?.it || chal.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {data.faq && data.faq.length > 0 && (
              <div className="pt-10">
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-8">{t("project.detail.faq")}</h3>
                <div className="space-y-4">
                  {data.faq.map((item, idx) => (
                    <div key={idx} className={`rounded-2xl border transition-colors duration-300 ${openFaq === idx ? 'border-brand-primary bg-brand-card shadow-md' : 'border-brand-border bg-brand-surface hover:border-brand-primary/50'}`}>
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                        type="button" 
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className={`font-bold transition-colors ${openFaq === idx ? 'text-brand-textPrimary' : 'text-brand-textSecondary'}`}>{item.q?.[language] || item.q?.it || item.q}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === idx ? "rotate-180 text-brand-primary" : "text-brand-textSecondary"}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6 text-sm leading-relaxed font-medium text-brand-textSecondary">
                          {item.a?.[language] || item.a?.it || item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}