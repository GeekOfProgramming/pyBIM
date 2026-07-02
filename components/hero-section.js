"use client";
import Link from "@/components/LocalizedLink";
import { ArrowRight, MapPin, Play, Phone } from "lucide-react";
import { phoneDisplay, phoneHref } from "@/lib/site-copy";
import { useLanguage } from "@/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#081730]" />
      <div className="absolute inset-0 bg-[url('/Pictures/Uncategorized/uncategorized-009.jpg')] bg-cover bg-center opacity-50 mix-blend-overlay grayscale" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,23,48,0.95)_0%,rgba(8,23,48,0.7)_50%,rgba(8,23,48,0.3)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.15),transparent_40%)]" />
      
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        <div className="max-w-3xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-md mb-8">
            <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]" />
            {t("home.hero.badge")}
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl mb-8 drop-shadow-lg">
            {t("home.hero.title")}
          </h1>
          
          {/* Subheading */}
          <p className="text-lg leading-relaxed text-white/70 md:text-xl max-w-2xl mb-12">
            {t("home.hero.subtitle")}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6 mb-20">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-600 hover:shadow-[0_10px_40px_rgba(249,115,22,0.6)] hover:-translate-y-1">
              {t("home.hero.cta1")} <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-transparent px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/40">
              {t("home.hero.cta2")}
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </div>
            </Link>
          </div>
          
          {/* Bottom Left Info Chips */}
          <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-white/10">
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 transition-colors">
                <MapPin className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-0.5">Sede</p>
                <p className="font-semibold text-white">Mirano, Venezia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-sky-400/50 transition-colors">
                <Phone className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-white/50 mb-0.5">Supporto 24/7</p>
                <a href={phoneHref} className="font-semibold text-white hover:text-sky-300 transition-colors">
                  +39 351 837 3043
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
