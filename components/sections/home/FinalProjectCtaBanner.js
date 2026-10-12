"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";

export default function FinalProjectCtaBanner() {
  const { language } = useLanguage();
  const t = (homeData[language] || homeData.en).finalProjectCta || (homeData.en).finalProjectCta;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-brand-surface text-brand-textPrimary relative overflow-hidden border-b border-brand-border transition-colors">
      {/* Family B — Digital Intelligence Surface Background */}
      <EngineeringBackdrop variant="home-surface" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Value Proposition & Guarantees */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm self-start">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              {t.headline}
            </h2>

            <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8 font-normal">
              {t.desc}
            </p>

            <ul className="space-y-4 mb-4">
              {t.commitments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: The High-Conversion Intake Card directing to /contact#audit */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 md:p-10 shadow-xl dark:shadow-2xl text-left backdrop-blur-md relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-brand-accent to-emerald-500" />

              {/* Card Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-950/80 border border-blue-200 dark:border-slate-800 text-blue-600 dark:text-brand-primary font-mono text-[11px] font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t.cardBadge}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {t.cardTitle}
              </h3>

              <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-normal">
                {t.cardDesc}
              </p>

              {/* Primary Action Button directing to /contact#audit */}
              <div className="mb-6">
                <Link
                  href="/contact#audit"
                  className="w-full flex items-center justify-center gap-3 bg-brand-accent hover:bg-brand-accentHover text-white py-4 px-6 rounded-xl font-mono font-bold text-sm tracking-widest transition-all duration-300 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 uppercase text-center group"
                >
                  <span>{t.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Confidentiality Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 dark:text-slate-400 pt-5 border-t border-gray-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5 text-gray-600 dark:text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.securityNotice}
                </span>
                <span className="text-gray-400 dark:text-slate-500 hidden sm:inline">{t.locationNotice}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
