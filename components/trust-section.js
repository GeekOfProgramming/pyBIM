import Link from "@/components/LocalizedLink";
import { Play } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TrustSection() {
  const { t } = useLanguage();
  return (
    <section className="bg-white/[0.02] border-y border-white/5 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 overflow-hidden lg:overflow-visible">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Column */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent" /> {t("home.trust.badge")}
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              {t("home.trust.title")}
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              {t("home.trust.subtitle")}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-base font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] transition hover:bg-orange-600 hover:-translate-y-1">
              {t("home.trust.cta")}
            </Link>
          </div>

          {/* Right Column: Asymmetric Grid */}
          <div className="relative mb-12 lg:mb-0">
            <div className="grid grid-cols-2 gap-4 h-[500px]">
              
              {/* Stacked Images Left */}
              <div className="grid grid-rows-2 gap-4 h-full min-h-0">
                <div className="rounded-[2rem] overflow-hidden border border-white/10 h-full min-h-0">
                  <img src="/Pictures/Uncategorized/uncategorized-007.jpg" alt="Installazione tubi" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-[2rem] overflow-hidden border border-white/10 h-full min-h-0">
                  <img src="/Pictures/Solar/solar-007.jpg" alt="Quadro elettrico" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Large Image Right */}
              <div className="rounded-[2rem] overflow-hidden border border-white/10 relative group h-full min-h-0">
                <img src="/Pictures/HVAC/hvac-024.jpg" alt="Centrale termica" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-brand-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
            </div>



          </div>
        </div>
      </div>
    </section>
  );
}
