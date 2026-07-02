"use client";
import Link from "@/components/LocalizedLink";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, ArrowRight, CheckCircle, Play, Phone, Mail, Layers, ShieldAlert, Scan, Calculator, Leaf, Clock } from "lucide-react";
import bimDataRaw from "@/lib/data/bim-data.json";
import { useLanguage } from "@/lib/LanguageContext";

export default function BimPageLayout() {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState(bimDataRaw.bimServices[0]?.id || "mep");
  const [openFaq, setOpenFaq] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const pageTitle = bimDataRaw.title?.[language] || bimDataRaw.title?.it || "BIM Services";
  const activeService = bimDataRaw.bimServices.find(s => s.id === activeId) || bimDataRaw.bimServices[0];

  const data = {
    title: activeService.title?.[language] || activeService.title?.it || "BIM",
    subtitle: activeService.subtitle?.[language] || activeService.subtitle?.it || "",
    description: activeService.description?.[language] || activeService.description?.it || "",
    longDescription: activeService.longDescription?.[language] || activeService.longDescription?.it || "",
    offerTitle: activeService.offerTitle?.[language] || activeService.offerTitle?.it || "BIM Excellence",
    offerDescription: activeService.offerDescription?.[language] || activeService.offerDescription?.it || "Innovazione e precisione.",
    grid: activeService.grid?.[language] || activeService.grid?.it || [],
    types: activeService.types?.[language] || activeService.types?.it || [],
    mediaSrc: activeService.mediaSrc || "/Pictures/General/hvac-industrial.jpg",
    sliderImages: activeService.sliderImages || ["/Pictures/General/hvac-residential.jpg"]
  };

  // Reset image index when switching service tabs
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeId]);

  useEffect(() => {
    if (!data.sliderImages || data.sliderImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data.sliderImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [data.sliderImages]);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/General/hvac-industrial.jpg" 
            alt="Service Background" 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-[#081730]/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081730] via-transparent to-[#081730]" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
            {pageTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/50">
            <Link href="/" className="hover:text-orange-400 transition">{t('services.hero.breadcrumb_home') || 'Home'}</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-orange-400 transition">
              {t('services.hero.breadcrumb_services') || 'Services'}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">{pageTitle}</span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN CONTENT BODY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.5fr] items-start">
          
          {/* COLUMN 1: LEFT SIDEBAR (Sticky) */}
          <div className="lg:sticky lg:top-32 self-start h-fit space-y-8 z-10">
            
            {/* Discover Our Services */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                {language === 'it' ? 'Servizi BIM' : 'BIM Services'}
              </h3>
              <ul className="space-y-2">
                {bimDataRaw.bimServices.map((srv) => {
                  const isActive = srv.id === activeId;
                  const srvTitle = srv.title?.[language] || srv.title?.it || srv.id;
                  return (
                    <li key={srv.id}>
                      <button 
                        onClick={() => { setActiveId(srv.id); setOpenFaq(0); }}
                        className={`w-full text-start flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-orange-500 text-white font-semibold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className="text-sm leading-relaxed max-w-[85%]">{srvTitle}</span>
                        {isActive ? <ChevronRight className="w-4 h-4" /> : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Expert Help Card */}
            <div className="rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-900/20 to-transparent p-6 text-center relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-sky-400/30">
                <img src="/Pictures/Contact/contact-003.jpg" alt="Operator" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {language === 'it' ? 'Hai bisogno di supporto?' : 'Need support?'}
              </h4>
              <p className="text-sm text-white/60 mb-6">
                {language === 'it' ? 'Un nostro esperto è pronto a fornirti consulenza tecnica gratuita.' : 'Our expert is ready to provide you with free technical advice.'}
              </p>
              
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
            
            {/* Top Image / Slider (Fade Transition) */}
            <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative aspect-video">
              {data.sliderImages.map((imgSrc, idx) => (
                <img 
                  key={idx}
                  src={imgSrc} 
                  alt={`${data.title} - ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081730]/60 to-transparent" />
              
              {/* Carousel Indicators */}
              {data.sliderImages.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                  {data.sliderImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-orange-500 w-8' : 'bg-white/50 hover:bg-white/80'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {activeService.isUpcoming ? (
              // ----------------------------------------------------
              // UPCOMING SERVICE LAYOUT (Custom for 6th item)
              // ----------------------------------------------------
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  {data.title}
                </h2>
                <p className="text-xl text-white/80 leading-relaxed mb-12">
                  {activeService.intro?.[language] || activeService.intro?.it}
                </p>

                <div className="space-y-6">
                  {(activeService.upcomingFeatures?.[language] || activeService.upcomingFeatures?.it || []).map((feat, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-blue-900/10 to-transparent border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-white/[0.02] transition-colors relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-9xl pointer-events-none transform translate-x-4 -translate-y-4">
                        {feat.icon}
                      </div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                        <div className="text-4xl shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10">
                          {feat.icon}
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-white mb-3">{feat.title}</h4>
                          <p className="text-lg text-white/60 leading-relaxed text-justify">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-12 mt-12 border-t border-white/10 flex justify-center">
                  <button disabled className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-base font-semibold text-white/40 cursor-not-allowed">
                    {activeService.ctaButton?.[language] || activeService.ctaButton?.it}
                  </button>
                </div>
              </div>
            ) : (
              // ----------------------------------------------------
              // NORMAL BIM SERVICE LAYOUT
              // ----------------------------------------------------
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
                {/* Main Description */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-tight">
                    {data.subtitle}
                  </h2>
                  <p className="text-lg text-white/70 leading-relaxed mb-6">
                    {data.description}
                  </p>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {data.longDescription}
                  </p>
                </div>

                {/* Cosa Offriamo (Video Preview & 100% Quality) */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                    {language === 'en' ? 'What we offer' : 'Cosa offriamo'}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative rounded-3xl overflow-hidden aspect-video border border-white/10 group">
                      <img src={data.mediaSrc} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700" />
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-transparent p-8 flex flex-col justify-center">
                      <div className="text-blue-300 mb-4"><CheckCircle className="w-10 h-10" /></div>
                      <h4 className="text-2xl font-bold text-white mb-2">{data.offerTitle}</h4>
                      <p className="text-white/60">{data.offerDescription}</p>
                    </div>
                  </div>
                </div>

                {/* Le nostre competenze Grid */}
                {data.grid && data.grid.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                      {language === 'en' ? 'Our expertise' : 'Le nostre competenze'}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {data.grid.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tipologie di intervento */}
                {data.types && data.types.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">
                      {language === 'en' ? 'Types of intervention' : 'Tipologie di intervento'}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {data.types.map((type, idx) => (
                        <div key={idx} className="px-5 py-3 rounded-full border border-sky-400/30 bg-sky-400/5 text-sky-100 text-sm font-medium">
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <div className="pt-6">
                  <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-[0_10px_35px_rgba(249,115,22,0.3)] transition hover:-translate-y-1 hover:bg-orange-400">
                    {language === 'en' ? 'Free Inspection: Contact Us Now' : 'Sopralluogo Gratuito: Contattaci Ora'} <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* FAQ Accordion */}
                {data.faq && data.faq.length > 0 && (
                  <div className="pt-10">
                    <h3 className="text-2xl font-semibold text-white mb-8">
                      {language === 'en' ? 'FAQ - Frequently Asked Questions' : 'FAQ - Domande Frequenti'}
                    </h3>
                    <div className="space-y-4">
                      {data.faq.map((item, idx) => (
                        <div key={idx} className="rounded-2xl border border-white/10 bg-[#0d1727]">
                          <button 
                            onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                            type="button" 
                            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                          >
                            <span className="font-medium text-white">{item.q}</span>
                            <ChevronDown className={`h-5 w-5 text-orange-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                          </button>
                          {openFaq === idx && (
                            <div className="px-6 pb-6 text-sm leading-relaxed text-white/60">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
