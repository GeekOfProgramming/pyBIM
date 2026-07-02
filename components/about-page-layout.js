"use client";

import { ArrowRight, Award, CheckCircle, ShieldCheck, Star } from "lucide-react";
import Link from "@/components/LocalizedLink";
import TeamPartnersSection from "./team-partners-section";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "./carousel";
import CareersCTA from "./careers-cta";
import testimonials from "@/lib/data/testimonials-data.json";

export default function AboutPageLayout({ teamData }) {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* SECTION 1: MAIN INTRO */}
      <section className="bg-gradient-to-b from-white/[0.05] to-transparent w-full border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 md:grid-cols-3 items-center">
          <div className="md:col-span-1">
            <img
              src="/Pictures/Uncategorized/uncategorized-011.jpg"
              alt="Arvand Termo Tec HVAC Worker"
              className="w-full aspect-[4/5] object-cover rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-sm font-bold uppercase tracking-[0.35em] text-blue-300 mb-4">{t("about.hero.badge")}</h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              {t("about.hero.title1")}<span className="text-orange-400">{t("about.hero.title_highlight")}</span>{t("about.hero.title2")}
            </h2>
            <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-3xl">
              {t("about.hero.desc")}
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 2: STATS & PILLARS */}
      <section className="bg-gradient-to-b from-transparent to-white/[0.02] w-full pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* COLUMN 1 - Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: t("about.stats.exp.value"), label: t("about.stats.exp.label") },
              { value: t("about.stats.proj.value"), label: t("about.stats.proj.label") },
              { value: t("about.stats.sat.value"), label: t("about.stats.sat.label") },
              { value: t("about.stats.city.value"), label: t("about.stats.city.label") }
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center flex flex-col justify-center shadow-lg backdrop-blur-sm transition hover:bg-white/10">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm tracking-wide text-white/60 uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* COLUMN 2 - 2 Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-blue-950/40 to-transparent p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t("about.vision.title")}</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  {t("about.vision.desc")}
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-blue-300 hover:text-sky-300 font-semibold transition">
                {t("about.vision.link")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-orange-950/40 to-transparent p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">{t("about.commitment.title")}</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  {t("about.commitment.desc")}
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition">
                {t("about.commitment.link")} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 3: OUR STORY */}
      <section className="bg-gradient-to-b from-blue-900/20 to-transparent w-full border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-white uppercase tracking-wider mb-12">
          {t("about.story.title")}
        </h2>
        <div className="relative mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
          <img 
            src="/Pictures/HVAC/hvac-003.jpg" 
            alt="Installazione HVAC" 
            className="w-full h-auto max-h-[550px] object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081730]/80 via-transparent to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/5 bg-white/[0.02] p-8 md:p-12">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed">
            {t("about.story.desc")}
          </p>
        </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="bg-gradient-to-b from-transparent to-orange-500/10 w-full border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12 leading-tight">
              {t("about.choose.title")}
            </h2>
            <div className="space-y-10">
              
              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-300">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t("about.choose.pro.title")}</h3>
                  <p className="text-white/60 leading-relaxed">{t("about.choose.pro.desc")}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t("about.choose.quality.title")}</h3>
                  <p className="text-white/60 leading-relaxed">{t("about.choose.quality.desc")}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t("about.choose.safe.title")}</h3>
                  <p className="text-white/60 leading-relaxed">{t("about.choose.safe.desc")}</p>
                </div>
              </div>

            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
            <img 
              src="/Pictures/HVAC/hvac-013.jpg" 
              alt="Arvand Techs" 
              className="relative z-10 w-full aspect-[3/4] object-cover rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10" 
            />
          </div>
        </div>
        </div>
      </section>

      {/* SECTION 5: TEAM & PARTNERS */}
      <TeamPartnersSection teamData={teamData} />

      {/* SECTION 6: TESTIMONIALS */}
      <section className="bg-gradient-to-b from-sky-900/10 to-transparent w-full border-y border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-white mb-6">{t("about.testimonials.title")}</h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t("about.testimonials.subtitle")}</p>
        </div>
        
        <Carousel itemsPerViewDesktop={2}>
          {[...testimonials].reverse().map((item, idx) => (
            <div key={item.id || idx} className="h-full rounded-3xl border border-white/10 bg-white/5 p-8 relative flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-orange-400 mb-6">
                  {[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-lg text-white/80 leading-relaxed mb-8 italic">
                  "{item.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 font-bold overflow-hidden">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.authorName} className="w-full h-full object-cover" />
                  ) : (
                    item.authorName.charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.authorName}</h4>
                  <p className="text-sm text-white/50">{item.authorRole}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        </div>
      </section>

      {/* SECTION 7: CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-b from-transparent to-blue-900/20 w-full border-b border-white/5 relative py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Renovations/renovations-001.jpg" 
            alt="Arvand Team working" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-[#081730]/60 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081730] via-transparent to-[#081730]" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-6 lg:mx-auto border border-white/10 rounded-[3rem] p-8 md:p-12 bg-white/5 backdrop-blur-md shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t("about.cta.title1")}<span className="text-orange-400">{t("about.cta.title_highlight")}</span>{t("about.cta.title2")}
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            {t("about.cta.desc")}
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-10 py-5 text-lg font-semibold text-white shadow-[0_10px_35px_rgba(249,115,22,0.4)] transition hover:-translate-y-1 hover:bg-orange-400"
          >
            {t("about.cta.btn")}
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      {/* Careers Banner */}
      <CareersCTA />

    </div>
  );
}
