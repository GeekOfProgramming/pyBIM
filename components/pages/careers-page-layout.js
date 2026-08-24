"use client";

import { useState, useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import { Mail, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

export default function CareersPageLayout({ jobs }) {
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

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <div className="bg-brand-base">
      {/* Hero Section */}
      <section id="culture" className="relative overflow-hidden py-32 lg:py-40 border-b border-brand-border bg-brand-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent font-medium text-sm mb-8">
            <Briefcase className="w-4 h-4" />
            {language === "it" ? "Lavora con Noi" : "Join Our Team"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-textPrimary tracking-tight mb-8">
            {language === "it" ? "Costruisci il futuro dell'Ingegneria con noi" : "Build the future of Engineering with us"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-brand-textSecondary leading-relaxed mb-10 font-medium">
            {language === "it" 
              ? "Benvenuti in pyBIM. Cerchiamo menti brillanti e appassionate pronte a portare innovazione ed eccellenza nei nostri 8 settori operativi: impiantistica elettrica, termoidraulica e climatizzazione, energie rinnovabili, sicurezza, finiture e ristrutturazioni edili complete. Se arrivi da LinkedIn, sei nel posto giusto per scoprire le nostre opportunità." 
              : "Welcome to pyBIM. We are looking for bright, passionate minds ready to bring innovation and excellence to our 8 core sectors: electrical systems, plumbing, HVAC, renewable energy, security, finishing works, and comprehensive building renovations. If you found us on LinkedIn, you're in the right place to discover our opportunities."}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-brand-textSecondary font-bold">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-primary" /> {language === "it" ? "Crescita Professionale" : "Career Growth"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-primary" /> {language === "it" ? "Ambiente Dinamico" : "Dynamic Environment"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-primary" /> {language === "it" ? "Progetti Internazionali" : "Global Projects"}</span>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl font-bold text-brand-textPrimary mb-4">
              {language === "it" ? "Posizioni Aperte" : "Open Positions"}
            </h2>
            <p className="text-brand-textSecondary max-w-xl mx-auto font-medium">
              {language === "it" 
                ? "Scopri i ruoli attualmente disponibili e unisciti al nostro team." 
                : "Discover our currently available roles and join our team."}
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-brand-surface rounded-3xl border border-brand-border">
              <p className="text-brand-textSecondary font-medium text-lg">
                {language === "it" 
                  ? "Al momento non ci sono posizioni aperte. Controlla di nuovo in futuro!" 
                  : "There are currently no open positions. Please check back later!"}
              </p>
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
                      {language === "it" ? "Scopri di più" : "Learn More"} 
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
                    {language === "it" ? "Vedi Altri" : "See More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div id="life"></div>
      </section>


    </div>
  );
}
