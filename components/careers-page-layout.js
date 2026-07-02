"use client";

import { useState } from "react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";
import { Mail, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

export default function CareersPageLayout({ jobs }) {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleJobs = jobs.slice(0, visibleCount);
  const hasMore = visibleCount < jobs.length;

  return (
    <div className="bg-[#081730]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 lg:py-40 border-b border-sky-400/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1e3f] to-[#081730]"></div>
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-medium text-sm mb-8">
            <Briefcase className="w-4 h-4" />
            {language === "it" ? "Lavora con Noi" : "Join Our Team"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8">
            {language === "it" ? "Costruisci il futuro dell'Ingegneria con noi" : "Build the future of Engineering with us"}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/70 leading-relaxed mb-10">
            {language === "it" 
              ? "Benvenuti in Arvand Termo Tec. Cerchiamo menti brillanti e appassionate pronte a portare innovazione ed eccellenza nei nostri 8 settori operativi: impiantistica elettrica, termoidraulica e climatizzazione, energie rinnovabili, sicurezza, finiture e ristrutturazioni edili complete. Se arrivi da LinkedIn, sei nel posto giusto per scoprire le nostre opportunità." 
              : "Welcome to Arvand Termo Tec. We are looking for bright, passionate minds ready to bring innovation and excellence to our 8 core sectors: electrical systems, plumbing, HVAC, renewable energy, security, finishing works, and comprehensive building renovations. If you found us on LinkedIn, you're in the right place to discover our opportunities."}
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-white/50 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {language === "it" ? "Crescita Professionale" : "Career Growth"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {language === "it" ? "Ambiente Dinamico" : "Dynamic Environment"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-400" /> {language === "it" ? "Progetti Internazionali" : "Global Projects"}</span>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {language === "it" ? "Posizioni Aperte" : "Open Positions"}
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              {language === "it" 
                ? "Scopri i ruoli attualmente disponibili e unisciti al nostro team." 
                : "Discover our currently available roles and join our team."}
            </p>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <p className="text-white/60 text-lg">
                {language === "it" 
                  ? "Al momento non ci sono posizioni aperte. Controlla di nuovo in futuro!" 
                  : "There are currently no open positions. Please check back later!"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.map((job) => (
                  <div key={job.id} className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-2 hover:border-sky-400/30 hover:bg-[#102A5C]/60 shadow-xl">
                    <div className="inline-block self-start px-3 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
                      {language === "it" ? job.departmentIt : job.departmentEn}
                    </div>
                    <Link href={`/careers/${job.id}`}>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                        {language === "it" ? job.titleIt : job.titleEn}
                      </h3>
                    </Link>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed line-clamp-3">
                      {language === "it" ? job.descriptionIt : job.descriptionEn}
                    </p>
                    
                    <Link href={`/careers/${job.id}`} className="mt-auto inline-flex items-center text-sm font-bold text-orange-400 uppercase tracking-widest">
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
                    className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/10 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-blue-500/25"
                  >
                    {language === "it" ? "Vedi Altri" : "See More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>


    </div>
  );
}
