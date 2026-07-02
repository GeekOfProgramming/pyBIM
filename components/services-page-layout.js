"use client";
import Link from "@/components/LocalizedLink";
import { ArrowRight, ChevronRight, Droplets, Flame, Paintbrush, Wind, Zap, Snowflake, Cctv, Home, Sun, Play, Map, Layers } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import servicesData from "@/lib/data/services-data.json";

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
  tinteggiatura: "/Pictures/Paining/painting-005.jpg",
  ristrutturazioni: "/Pictures/Renovations/renovations-012.jpg",
  fotovoltaici: "/Pictures/Solar/solar-002.jpg"
};

const colorMap = {
  elettrici: "text-yellow-400 bg-yellow-400/20 border-yellow-400/30",
  clima: "text-sky-400 bg-sky-400/20 border-sky-400/30",
  caldaie: "text-orange-500 bg-orange-500/20 border-orange-500/30",
  sicurezza: "text-emerald-400 bg-emerald-400/20 border-emerald-400/30",
  idraulica: "text-blue-400 bg-blue-400/20 border-blue-400/30",
  tinteggiatura: "text-purple-400 bg-purple-400/20 border-purple-400/30",
  ristrutturazioni: "text-stone-300 bg-stone-500/20 border-stone-500/30",
  fotovoltaici: "text-red-500 bg-red-500/20 border-red-500/30"
};

export default function ServicesPageLayout() {
  const { t, language } = useLanguage();

  const services = servicesData.filter(srv => srv.slug !== "bim").map(srv => {
    return {
      id: srv.slug,
      title: srv.title?.[language] || srv.title?.it || srv.slug,
      description: srv.description?.[language] || srv.description?.it || "",
      icon: iconMap[srv.slug],
      img: imgMap[srv.slug],
      colorClass: colorMap[srv.slug] || "text-blue-300 bg-blue-500/20 border-white/10"
    };
  });

  return (
    <div className="w-full">
      {/* SECTION 1: SERVICES HERO */}
      <section className="relative flex min-h-[35vh] items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Uncategorized/uncategorized-009.jpg" 
            alt="Services Overview" 
            className="h-full w-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081730]/90 via-[#081730]/60 to-[#081730]" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
            {t("services.hero.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/60">
            <Link href="/" className="hover:text-orange-400 transition">{t("services.hero.breadcrumb_home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">{t("services.hero.breadcrumb_services")}</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: 8-SERVICES GRID */}
      <section className="bg-gradient-to-b from-[#081730] to-transparent py-24 border-t border-white/5 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((srv) => (
            <div key={srv.id} id={srv.id} className="group relative overflow-hidden rounded-3xl border border-white/10 flex flex-col h-full transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] min-h-[400px]">
              
              {/* Full Card Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src={srv.img} 
                  alt={srv.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A162B] via-[#0A162B]/80 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-8 flex flex-col flex-grow h-full">
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl backdrop-blur-md border mb-8 ${srv.colorClass}`}>
                  <srv.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors drop-shadow-md">{srv.title}</h3>
                <p className="text-sm text-white/80 mb-8 line-clamp-3 leading-relaxed flex-grow drop-shadow">{srv.description}</p>
                
                <div className="mt-auto">
                  <Link href={`/services/${srv.id}`} className="inline-flex items-center justify-center w-full text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-orange-500 hover:border-orange-500 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 gap-2 backdrop-blur-md shadow-lg">
                    {t("services.card.readmore")} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
          </div>
        </div>
      </section>

      {/* SECTION 2.5: FEATURED LARGE SERVICE (PLACEHOLDER) */}
      <section className="bg-gradient-to-b from-transparent to-[#0A162B] pb-24 w-full border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 flex flex-col lg:flex-row transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)] min-h-[450px]">
            
            {/* Full Card Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img 
                src="/Pictures/BIM/bim-0080.jpg" 
                alt="Featured Service" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A162B] via-[#0A162B]/80 to-[#0A162B]/20 lg:bg-gradient-to-r lg:from-[#0A162B] lg:via-[#0A162B]/90 lg:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-10 md:p-16 lg:w-3/5 flex flex-col justify-center h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl backdrop-blur-md border mb-8 text-orange-400 bg-orange-500/20 border-orange-500/30">
                <Layers className="w-8 h-8" />
              </div>
              
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-orange-400 transition-colors drop-shadow-md leading-tight">
                {t("services.featured.title1") || "خدمات نوین BIM"}<br/><span className="text-2xl md:text-3xl text-blue-300 mt-2 block">{t("services.featured.title2") || "(مدلسازی اطلاعات ساختمان)"}</span>
              </h3>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed drop-shadow max-w-2xl">
                {t("services.featured.desc") || "با بهره‌گیری از تکنولوژی‌های روز دنیا، از طراحی تا اجرای پروژه‌های خود را به صورت هوشمند مدیریت کنید."}
              </p>
              
              <div>
                <Link href="/services/bim" className="inline-flex items-center justify-center text-base font-bold text-white bg-orange-500 hover:bg-orange-400 px-8 py-4 rounded-xl transition-all duration-300 gap-3 shadow-[0_10px_35px_rgba(249,115,22,0.3)]">
                  {t("services.featured.btn") || "مشاهده ۵ خدمت اختصاصی BIM"} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OPERATIVE IMPACT */}
      <section className="bg-[#0A162B] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 text-center">
            {/* Column 1 */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500/20 relative">
                <img src="/Pictures/General/hvac-commercial.jpg" alt="Tech" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">{t("services.impact.exp.value")}</div>
                <div className="text-sm uppercase tracking-widest text-blue-300">{t("services.impact.exp.label")}</div>
              </div>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col items-center justify-center space-y-6 border-y lg:border-y-0 lg:border-x border-white/10 py-10 lg:py-0 px-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-orange-400">
                <Map className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">{t("services.impact.map.title")}</h3>
                <p className="text-white/60 leading-relaxed">{t("services.impact.map.desc")}</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-32 h-32 rounded-full border-4 border-orange-500/20 bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Zap className="w-12 h-12" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">{t("services.impact.int.value")}</div>
                <div className="text-sm uppercase tracking-widest text-orange-400">{t("services.impact.int.label")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LOGOS STRIP (Hidden for now as requested by user) */}
      <section className="hidden border-b border-white/5 bg-[#02040A] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
             {/* Fake logos */}
             <div className="text-2xl font-bold font-sans tracking-widest">DAIKIN</div>
             <div className="text-2xl font-bold font-serif tracking-widest">BOSCH</div>
             <div className="text-2xl font-bold font-mono tracking-widest">MITSUBISHI</div>
             <div className="text-2xl font-bold font-sans tracking-widest">SAMSUNG</div>
           </div>
        </div>
      </section>

      {/* SECTION 5: WHY CHOOSE US */}
      <section className="bg-[#061224] py-24 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300 mb-4">{t("services.choose.badge")}</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 leading-tight">{t("services.choose.title")}</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-10">
              {t("services.choose.desc")}
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(249,115,22,0.3)] transition hover:-translate-y-1 hover:bg-orange-400">
              {t("services.choose.btn")} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid gap-6">
             <div className="rounded-3xl overflow-hidden h-48 border border-white/10">
               <img src="/Pictures/Uncategorized/uncategorized-005.jpg" alt="Tech" className="w-full h-full object-cover" />
             </div>
             <div className="relative rounded-3xl overflow-hidden h-64 border border-white/10 group">
               <img src="/Pictures/Uncategorized/uncategorized-004.jpg" alt="Tech" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#081730]/80 via-transparent to-transparent opacity-80" />
               <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                 <div className="bg-[#081730]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                   <span className="text-white font-bold">{t("services.choose.support.badge")}</span> <span className="text-white/60 text-sm">{t("services.choose.support.label")}</span>
                 </div>
               </div>
             </div>
          </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WATCH OUR STORY BANNER (Hidden until video is ready) */}
      <section className="hidden relative py-32 px-6 items-center justify-center text-center border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="/hero-poster.jpg" alt="Workshop" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#102A5C]/80 backdrop-blur-sm" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <button className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white mb-8 shadow-[0_0_50px_rgba(249,115,22,0.4)] hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            {t("services.video.title1")}<span className="text-blue-300">{t("services.video.highlight1")}</span>{t("services.video.title2")}<span className="text-blue-300">{t("services.video.highlight2")}</span>
          </h2>
        </div>
      </section>

      {/* SECTION 7: OUR EXPERTISE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12">{t("services.expertise.title")}</h2>
            
            <div className="space-y-8 mb-12">
              <div>
                <div className="flex justify-between text-sm font-semibold text-white mb-3">
                  <span>{t("services.expertise.skill1.name")}</span>
                  <span className="text-blue-300">90%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "90%" }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-semibold text-white mb-3">
                  <span>{t("services.expertise.skill2.name")}</span>
                  <span className="text-orange-400">95%</span>
                </div>
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="rounded-2xl border border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 px-8 py-4 text-sm font-semibold text-blue-300 transition-colors">
                {t("services.expertise.contact_btn")}
              </Link>
              <div className="flex flex-col">
                <span className="text-xs text-white/40 uppercase tracking-widest">{t("services.expertise.phone_label")}</span>
                <a href="tel:+390418944704" className="text-lg font-bold text-white hover:text-orange-400 transition">+39 041 894 4704</a>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[3/4] lg:aspect-auto lg:h-[600px]">
            <img src="/Pictures/Uncategorized/uncategorized-017.jpg" alt="Tech with tablet" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081730] to-transparent opacity-80" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                <h3 className="text-xl font-semibold text-white mb-2">{t("services.expertise.card.title")}</h3>
                <p className="text-white/60 text-sm">{t("services.expertise.card.desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
