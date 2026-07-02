"use client";
import Link from "@/components/LocalizedLink";
import { useState } from "react";
import { ChevronRight, ChevronDown, Phone, Mail, CheckCircle, Info, Calendar, MapPin, Building, Users, Settings } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectDetailLayout({ project }) {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  const data = {
    title: project.title?.[language] || project.title?.it || project.slug,
    category: project.category?.[language] || project.category?.it,
    date: project.date?.[language] || project.date?.it,
    client: project.client?.[language] || project.client?.it || project.client || "Confidenziale",
    location: project.location?.[language] || project.location?.it || project.location || "Confidenziale",
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
          <div className="absolute inset-0 bg-[#081730]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081730] via-transparent to-[#081730]" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/50">
            <Link href="/" className="hover:text-orange-400 transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/projects" className="hover:text-orange-400 transition">Progetti</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">{data.title}</span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN CONTENT BODY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.5fr] items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Sticky) */}
          <div className="lg:sticky lg:top-28 space-y-8">
            
            {/* Project Information */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b border-white/10 pb-4">Info Progetto</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-300 mt-0.5" />
                  <div>
                    <span className="block text-xs text-white/40 uppercase">Categoria</span>
                    <span className="text-white font-medium">{data.category}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <span className="block text-xs text-white/40 uppercase">Data inizio</span>
                    <span className="text-white font-medium">{data.date}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-300 mt-0.5" />
                  <div>
                    <span className="block text-xs text-white/40 uppercase">Sede</span>
                    <span className="text-white font-medium">{data.location}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <span className="block text-xs text-white/40 uppercase">Cliente</span>
                    <span className="text-white font-medium">{data.client}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Expert Help Card */}
            <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-900/20 to-transparent p-6 text-center relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-sky-400/30">
                <img src="/Pictures/General/hvac-commercial.jpg" alt="Operator" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Hai bisogno di supporto?</h4>
              <p className="text-sm text-white/60 mb-6">Parla con un ingegnere HVAC per il tuo prossimo progetto.</p>
              
              <div className="space-y-4">
                <a href="tel:+390418944704" className="flex items-center justify-center gap-3 bg-white/5 rounded-xl py-3 hover:bg-white/10 transition border border-white/10">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold text-white">041 894 4704</span>
                </a>
                <a href="mailto:info@arvandtermotec.it" className="flex items-center justify-center gap-3 bg-white/5 rounded-xl py-3 hover:bg-white/10 transition border border-white/10">
                  <Mail className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-semibold text-white truncate px-2">info@arvandtermotec.it</span>
                </a>
              </div>
            </div>

          </div>

          {/* COLUMN 2: RIGHT CONTENT */}
          <div className="space-y-12">
            
            {/* Top Image */}
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative aspect-video">
              <img src={project.image} alt="Project Installation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081730]/60 to-transparent" />
            </div>

            {/* Main Description */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Analisi e Obiettivi</h2>
              <p className="text-lg text-white/70 leading-relaxed mb-6">
                {data.description}
              </p>
            </div>

            {/* Fasi del Processo di Posa */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Fasi del Processo di Posa</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-3xl overflow-hidden border border-white/10 aspect-square md:aspect-auto md:h-full">
                   <img src="/Pictures/General/hvac-industrial.jpg" alt="Work Process" className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
                </div>
                <div className="space-y-6">
                  {data.process.map((proc, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 border border-sky-400/30 flex items-center justify-center text-blue-300 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{proc.step?.[language] || proc.step?.it || proc.step}</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{proc.desc?.[language] || proc.desc?.it || proc.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Caratteristiche e Risultati */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Caratteristiche e Risultati</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {data.results.map((res, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-white">{res?.[language] || res?.it || res}</span>
                  </div>
                ))}
              </div>
              
              {/* Stats Banner */}
              <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-orange-400 p-8 grid sm:grid-cols-2 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                <div className="flex items-center gap-4 justify-center sm:justify-start">
                  <Users className="w-10 h-10 text-white/80" />
                  <div>
                    <div className="text-3xl font-bold text-white">{data.stats.technicians}</div>
                    <div className="text-sm font-medium text-white/80 uppercase">Tecnici Coinvolti</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-center sm:justify-start pt-8 sm:pt-0 sm:pl-8">
                  <Settings className="w-10 h-10 text-white/80" />
                  <div>
                    <div className="text-3xl font-bold text-white">{data.stats.systems}</div>
                    <div className="text-sm font-medium text-white/80 uppercase">Impianti Posati</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sfide e Soluzioni */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Sfide e Soluzioni</h3>
              <div className="space-y-4">
                {data.challenges.map((chal, idx) => (
                  <div key={idx} className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                      <h4 className="text-red-400 font-semibold mb-2 uppercase text-sm">La Sfida</h4>
                      <p className="text-white/80">{chal.c?.[language] || chal.c?.it || chal.c}</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                      <h4 className="text-blue-300 font-semibold mb-2 uppercase text-sm">La Nostra Soluzione</h4>
                      <p className="text-white/80">{chal.s?.[language] || chal.s?.it || chal.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {data.faq && data.faq.length > 0 && (
              <div className="pt-10">
                <h3 className="text-2xl font-semibold text-white mb-8">FAQ - Domande sul Progetto</h3>
                <div className="space-y-4">
                  {data.faq.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-[#0d1727]">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                        type="button" 
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      >
                        <span className="font-medium text-white">{item.q?.[language] || item.q?.it || item.q}</span>
                        <ChevronDown className={`h-5 w-5 text-orange-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6 text-sm leading-relaxed text-white/60">
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
