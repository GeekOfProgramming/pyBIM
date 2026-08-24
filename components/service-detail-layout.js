"use client";
import Link from "@/components/LocalizedLink";
import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, ChevronRight, CheckCircle, Phone, Mail } from "lucide-react";
import servicesData from "@/lib/data/services-data.json";
import { useLanguage } from "@/lib/LanguageContext";

const colorStyles = {
  "yellow": {
    text: "text-yellow-600",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
    gradient: "from-yellow-400/5 to-transparent"
  },
  "brand-primary": {
    text: "text-brand-primary",
    bg: "bg-brand-primary/10",
    border: "border-brand-primary/20",
    gradient: "from-brand-primary/5 to-transparent"
  },
  "purple": {
    text: "text-purple-600",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    gradient: "from-purple-500/5 to-transparent"
  }
};

export default function ServiceDetailLayout({ service }) {
  const [openFaq, setOpenFaq] = useState(0);
  const { language } = useLanguage();
  
  const data = {
    title: service.title?.[language] || service.title?.en || service.slug,
    subtitle: service.subtitle?.[language] || service.subtitle?.en,
    description: service.description?.[language] || service.description?.en,
    longDescription: service.longDescription?.[language] || service.longDescription?.en,
    features: service.features?.map(f => ({
      title: f.title?.[language] || f.title?.en || f.title,
      description: f.description?.[language] || f.description?.en || f.description,
      image: f.image
    })) || [],
    grid: service.grid?.map(item => item[language] || item.en || item) || [],
    types: service.types?.map(item => item[language] || item.en || item) || [],
    faq: service.faq?.map(f => ({
      q: f.q?.[language] || f.q?.en || f.q,
      a: f.a?.[language] || f.a?.en || f.a
    })) || [],
    offerTitle: service.offerTitle?.[language] || service.offerTitle?.en,
    offerDescription: service.offerDescription?.[language] || service.offerDescription?.en,
    color: service.color || "brand-primary",
    images: service.images || ["/Pictures/Uncategorized/uncategorized-005.jpg"]
  };

  const theme = colorStyles[data.color] || colorStyles["brand-primary"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!data.images || data.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.images]);

  return (
    <div className="w-full bg-brand-base">
      
      {/* HERO SECTION */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-24 border-b border-brand-border bg-brand-surface">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-50`} />
        
        <div className="text-center relative z-10 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-textPrimary mb-6 tracking-tight">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-brand-textSecondary uppercase tracking-widest">
            <Link href="/" className="hover:text-brand-primary transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/services" className="hover:text-brand-primary transition">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className={theme.text}>{data.title}</span>
          </div>
        </div>
      </section>

      {/* CAPABILITIES HORIZONTAL NAVIGATION */}
      <section className="border-b border-brand-border bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 overflow-x-auto no-scrollbar">
          <ul className="flex items-center justify-center gap-4 min-w-max">
            {servicesData.map((srv) => {
              const isActive = srv.slug === service.slug;
              const srvTitle = srv.title?.[language] || srv.title?.en || srv.slug;
              return (
                <li key={srv.slug}>
                  <Link 
                    href={`/services/${srv.slug}`} 
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all border ${isActive ? `border-transparent ${theme.bg} ${theme.text} font-bold shadow-sm` : 'border-brand-border text-brand-textSecondary hover:bg-brand-surface hover:text-brand-textPrimary font-medium'}`}
                  >
                    <span className="text-sm">{srvTitle}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* SINGLE-COLUMN CONTENT BODY */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="space-y-16">
            
            {/* Top Image Carousel */}
            <div className="rounded-3xl overflow-hidden border border-brand-border shadow-lg relative aspect-video bg-brand-surface">
              {data.images.map((imgSrc, idx) => (
                <img 
                  key={idx}
                  src={imgSrc} 
                  alt={`${data.title} - ${idx + 1}`} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
                />
              ))}
              
              {/* Carousel Indicators */}
              {data.images.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                  {data.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? `w-8 ${colorStyles[data.color]?.text?.replace('text-', 'bg-') || 'bg-brand-primary'}` : 'w-2.5 bg-white/70 hover:bg-white'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Main Description */}
            <div>
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme.text}`}>
                {data.subtitle}
              </h2>
              <p className="text-lg text-brand-textSecondary font-medium leading-relaxed mb-6">
                {data.description}
              </p>
              <p className="text-lg text-brand-textSecondary font-medium leading-relaxed">
                {data.longDescription}
              </p>
            </div>

            {/* Deep-Dive Features */}
            {data.features && data.features.length > 0 && (
              <div className="space-y-16 py-12">
                {data.features.map((feature, idx) => (
                  <div key={idx} className={`flex flex-col gap-10 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <div className="w-full md:w-1/2">
                      <div className="rounded-3xl overflow-hidden border border-brand-border shadow-md aspect-video">
                        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      <h3 className={`text-2xl font-bold ${theme.text}`}>{feature.title}</h3>
                      <p className="text-lg text-brand-textSecondary font-medium leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 100% Quality Highlight */}
            <div className="rounded-3xl border border-brand-border bg-white p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className={`p-4 rounded-2xl ${theme.bg}`}>
                <CheckCircle className={`w-12 h-12 ${theme.text}`} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-brand-textPrimary mb-3">{data.offerTitle}</h4>
                <p className="text-lg text-brand-textSecondary font-medium">{data.offerDescription}</p>
              </div>
            </div>

            {/* Grid & Types Row */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Le nostre competenze Grid */}
              <div>
                <h3 className="text-sm font-bold text-brand-textPrimary mb-6 uppercase tracking-wider">
                  Core Capabilities
                </h3>
                <div className="space-y-4">
                  {data.grid.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${theme.text}`} />
                      <span className="font-bold text-brand-textSecondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-sm font-bold text-brand-textPrimary mb-6 uppercase tracking-wider">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {data.types.map((type, idx) => (
                    <div key={idx} className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${theme.bg} ${theme.text}`}>
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8 border-t border-brand-border">
              <Link href="/contact" className={`inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-1 border ${theme.border} ${theme.bg} ${theme.text}`}>
                Request a Technical Proposal <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* FAQ Accordion */}
            {data.faq && data.faq.length > 0 && (
              <div className="pt-12">
                <h3 className="text-2xl font-bold text-brand-textPrimary mb-8">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {data.faq.map((item, idx) => (
                    <div key={idx} className="rounded-2xl border border-brand-border bg-white overflow-hidden transition-all shadow-sm">
                      <button 
                        onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                        type="button" 
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-brand-surface transition"
                      >
                        <span className="font-bold text-brand-textPrimary">{item.q}</span>
                        <ChevronDown className={`h-5 w-5 ${theme.text} transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="px-6 pb-6 pt-2 text-base font-medium leading-relaxed text-brand-textSecondary bg-white border-t border-brand-surface">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

        </div>
      </section>
    </div>
  );
}
