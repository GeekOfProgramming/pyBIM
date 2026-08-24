"use client";

import Link from "@/components/LocalizedLink";
import { ArrowRight, Play, CheckCircle, Droplets, Zap, Hammer, ChevronRight, Flame, Paintbrush, Wind, Snowflake, Cctv, Home, Sun, Layers, Monitor, Glasses } from "lucide-react";
import HeroSection from "./hero-section";
import AboutPreview from "./about-preview";
import ProjectsGrid from "./projects-grid";
import AnimatedStatsSection from "./animated-stats-section";
import TrustSection from "./trust-section";
import BlogPreview from "./blog-preview";
import TeamPartnerCard from "./team-partner-card";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "./carousel";
import servicesData from "@/lib/data/services-data.json";
import projectsData from "@/lib/data/projects-data.json";
import blogData from "@/lib/data/blog-data.json";

const iconMap = {
  elettrici: Zap,
  clima: Snowflake,
  caldaie: Flame,
  sicurezza: Cctv,
  idraulica: Droplets,
  tinteggiatura: Paintbrush,
  ristrutturazioni: Home,
  fotovoltaici: Sun
};

const imgMap = {
  elettrici: "/Pictures/Electrical/electrical-008.jpg",
  clima: "/Pictures/HVAC/hvac-002.jpg",
  caldaie: "/Pictures/HVAC/hvac-029.jpg",
  sicurezza: "/Pictures/Security/security-002.jpg",
  idraulica: "/Pictures/Plumbing/plumbing-008.jpg",
  tinteggiatura: "/Pictures/Painting/painting-005.jpg",
  ristrutturazioni: "/Pictures/Renovations/renovations-012.jpg",
  fotovoltaici: "/Pictures/Solar/solar-002.jpg"
};

const colorMap = {
  elettrici: "text-yellow-400 bg-yellow-400/20 border-yellow-400/30 group-hover:bg-yellow-400 group-hover:text-[#081730]",
  clima: "text-brand-accent bg-brand-accent/20 border-brand-accent/30 group-hover:bg-brand-accent group-hover:text-[#081730]",
  caldaie: "text-brand-accent bg-brand-accent/20 border-brand-accent/30 group-hover:bg-brand-accent group-hover:text-white",
  sicurezza: "text-emerald-400 bg-emerald-400/20 border-emerald-400/30 group-hover:bg-emerald-400 group-hover:text-[#081730]",
  idraulica: "text-blue-400 bg-blue-400/20 border-blue-400/30 group-hover:bg-blue-400 group-hover:text-[#081730]",
  tinteggiatura: "text-purple-400 bg-purple-400/20 border-purple-400/30 group-hover:bg-purple-400 group-hover:text-white",
  ristrutturazioni: "text-stone-300 bg-stone-500/20 border-stone-500/30 group-hover:bg-stone-300 group-hover:text-[#081730]",
  fotovoltaici: "text-red-500 bg-red-500/20 border-red-500/30 group-hover:bg-red-500 group-hover:text-white"
};

export default function HomePageLayout() {
  const { t, language } = useLanguage();
  const services = servicesData.filter(srv => srv.slug !== 'bim');

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. ABOUT PREVIEW */}
      <AboutPreview lang={language} />

      {/* 3. SERVICES PREVIEW */}
      <section className="bg-brand-background mx-auto w-full px-6 py-24 lg:px-8 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(249,115,22,1)]" /> {t("home.services.badge")}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
              {t("home.services.title")}
            </h2>
          </div>
          
          <Carousel>
            {services.map((service) => {
              const Icon = iconMap[service.slug] || Droplets;
              const colorClass = colorMap[service.slug] || "text-brand-accentHover bg-blue-500/20 border-white/10";
              const img = imgMap[service.slug] || "/Pictures/General/hvac-industrial.jpg";
              
              return (
                <div key={service.slug} id={service.slug} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(14,165,233,0.1)] min-h-[420px]">
                  
                  {/* Full Card Background Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={img} 
                      alt={service.title[language] || service.title.it} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 grayscale group-hover:grayscale-0 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-brand-background/40" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 flex flex-col flex-grow h-full">
                    <div className={`w-14 h-14 flex items-center justify-center rounded-2xl backdrop-blur-md border mb-8 transition-colors duration-500 shadow-lg ${colorClass}`}>
                      <Icon className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-accentHover transition-colors drop-shadow-md">{service.title[language] || service.title.it}</h3>
                    <p className="text-sm text-white/70 mb-8 line-clamp-3 leading-relaxed flex-grow drop-shadow">{service.description[language] || service.description.it}</p>
                    
                    <div className="mt-auto">
                      <Link href={`/services/${service.slug}`} className="inline-flex items-center justify-center w-full text-sm font-bold text-white bg-white/5 border border-white/10 hover:bg-brand-accent hover:border-brand-accent px-4 py-3 rounded-xl transition-all duration-300 gap-2 backdrop-blur-md hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                        {t("home.services.readMore")} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </Carousel>
          
          <div className="mt-16 text-center">
            <Link href="/services" className="inline-flex items-center gap-3 text-sm font-bold text-white/70 hover:text-brand-accent transition-colors uppercase tracking-widest border border-white/10 rounded-full px-8 py-4 hover:border-brand-accent/50 hover:bg-brand-accent/10">
              {t("home.services.all")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. PREMIUM BIM HIGHLIGHT SECTION */}
      <section className="bg-gradient-to-b from-transparent to-[#0A162B] py-24 w-full border-t border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-brand-accent/20 bg-brand-background flex flex-col lg:flex-row transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] min-h-[500px]">
            
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="/Pictures/BIM/bim-0014.png" 
                alt="BIM Services" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061224] via-[#061224]/90 to-transparent lg:bg-gradient-to-r lg:from-[#061224] lg:via-[#061224]/95 lg:to-transparent" />
            </div>

            {/* Content Left */}
            <div className="relative z-10 p-10 md:p-16 lg:w-1/2 flex flex-col justify-center h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl backdrop-blur-md border text-brand-accent bg-brand-accent/20 border-brand-accent/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                  <Layers className="w-8 h-8" />
                </div>
                <div className="px-4 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent text-sm font-bold tracking-widest uppercase backdrop-blur-sm">
                  {t("home.bim.badge") || "Premium Services"}
                </div>
              </div>
              
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {t("home.bim.title") || "Innovazione BIM: Il futuro del cantiere"}
              </h3>
              <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-md">
                {t("home.bim.subtitle") || "Esplora in Realtà Virtuale, ottimizza l'acustica e gestisci tutto in Cloud."}
              </p>
              
              <div>
                <Link href="/services/bim" className="inline-flex items-center justify-center text-base font-bold text-white bg-brand-accent hover:bg-brand-accent px-8 py-4 rounded-full transition-all duration-300 gap-3 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-1">
                  {t("home.bim.btn") || "Scopri i Servizi BIM"} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Content Right (Upcoming features teaser) */}
            <div className="relative z-10 p-10 md:p-16 lg:w-1/2 flex flex-col justify-center h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-brand-accent shrink-0">
                    <Glasses className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Realtà Virtuale (VR)</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Esplora e \"cammina\" nei tuoi progetti prima dell'inizio dei lavori.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Acustica Avanzata</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Simulazioni per impianti silenziosi e isolamento perfetto.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Portale in Cloud (CDE)</h4>
                    <p className="text-sm text-white/60 leading-relaxed">Monitora il cantiere e i documenti da qualsiasi dispositivo, 24/7.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-[#0A162B]">
        <TrustSection lang={language} />
      </section>

      {/* 5. STATS COUNTERS */}
      <section className="bg-[#02040A] border-t border-white/5 relative">
        <AnimatedStatsSection />
      </section>

      {/* 6. PROJECTS PREVIEW */}
      <section className="bg-brand-background border-t border-white/5">
        <ProjectsGrid projects={projectsData} />
      </section>

      {/* 7. VR / VIDEO BANNER (Hidden until video is ready) */}
      <section className="hidden relative py-40 px-6 items-center justify-center text-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 -z-10">
          <img src="/Pictures/General/hvac-industrial.jpg" alt="Virtual Reality Blueprint" className="w-full h-full object-cover opacity-20 mix-blend-screen" />
          <div className="absolute inset-0 bg-brand-background/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_50%)]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-sky-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
            <button className="relative w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-10 group-hover:scale-110 group-hover:bg-sky-500 group-hover:border-brand-accent transition-all duration-500 shadow-[0_0_30px_rgba(14,165,233,0.2)] group-hover:shadow-[0_0_50px_rgba(14,165,233,0.5)]">
              <Play className="w-10 h-10 fill-current ml-2" />
            </button>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight drop-shadow-lg">
            {t("home.video.title")}
          </h2>
        </div>
      </section>

      {/* 8. OUR EXPERTISE */}
      <section className="bg-[#050D1A] w-full border-t border-white/5 py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(249,115,22,1)]" /> {t("home.expertise.badge")}
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 leading-tight">
                {t("home.expertise.title")}
              </h2>
              <p className="text-lg text-white/60 mb-12">
                {t("home.expertise.subtitle")}
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="group">
                  <div className="flex justify-between text-sm font-bold text-white mb-3">
                    <span>{t("home.expertise.skill1")}</span>
                    <span className="text-brand-accent drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]">90%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-brand-accent rounded-full relative group-hover:opacity-90 transition-opacity" style={{ width: "90%" }}>
                      <div className="absolute inset-0 bg-white/20 w-1/3 blur-sm animate-[shimmer_2s_infinite]" />
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="flex justify-between text-sm font-bold text-white mb-3">
                    <span>{t("home.expertise.skill2")}</span>
                    <span className="text-brand-accentHover drop-shadow-[0_0_5px_rgba(14,165,233,0.8)]">95%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div className="h-full bg-blue-500 rounded-full relative group-hover:opacity-90 transition-opacity" style={{ width: "95%" }}>
                      <div className="absolute inset-0 bg-white/20 w-1/3 blur-sm animate-[shimmer_2s_infinite_0.5s]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 w-max backdrop-blur-sm">
                <Link href="/contact" className="px-6 py-3 bg-brand-accent hover:bg-brand-accent text-white font-bold rounded-full text-sm transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                  {t("home.expertise.contact")}
                </Link>
                <div>
                  <p className="text-sm text-white/50 mb-0.5">{t("home.expertise.support.label")}</p>
                  <p className="font-semibold text-white">{t("home.expertise.support.phone")}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/20 to-blue-500/20 blur-2xl opacity-30 rounded-[3rem]" />
              <div className="relative rounded-[3rem] border border-white/10 overflow-hidden bg-[#0A162B] aspect-[4/5] max-h-[600px] mx-auto">
                <img src="/Pictures/HVAC/hvac-014.jpg" alt="Expertise" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081730] to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1">
                    <CheckCircle className="w-8 h-8 text-brand-accent mb-3" />
                    <h4 className="font-bold text-white mb-1">{t("home.expertise.cert1")}</h4>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 flex-1">
                    <CheckCircle className="w-8 h-8 text-blue-400 mb-3" />
                    <h4 className="font-bold text-white mb-1">{t("home.expertise.cert2")}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BLOG PREVIEW */}
      <section className="bg-[#0A162B] border-t border-white/5 relative">
        <BlogPreview posts={blogData} />
      </section>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
