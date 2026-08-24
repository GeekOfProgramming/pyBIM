"use client";

import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, FileText } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TermsLayout() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 lg:px-8 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 bg-brand-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Link href="/" className="text-sm font-medium text-white/60 hover:text-brand-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-sm font-bold text-white/90">{t("terms.hero.breadcrumb")}</span>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-brand-accent" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("terms.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("terms.intro")}
          </p>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="py-20 px-6 lg:px-8 bg-[#02040A]">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm">
          
          <div className="space-y-12 text-white/80 leading-relaxed text-base md:text-lg">
            
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                {t("terms.sec1.title")}
              </h2>
              <p className="mb-4">{t("terms.sec1.desc")}</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>{t("terms.sec1.list1")}</li>
                <li>{t("terms.sec1.list2")}</li>
                <li>{t("terms.sec1.list3")}</li>
                <li>{t("terms.sec1.list4")}</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {t("terms.sec2.title")}
              </h2>
              <p className="mb-4">{t("terms.sec2.desc")}</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec2.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec2.item2")}</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                {t("terms.sec3.title")}
              </h2>
              <p className="mb-4">{t("terms.sec3.desc")}</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec3.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec3.item2")}</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                {t("terms.sec4.title")}
              </h2>
              <p className="mb-4">{t("terms.sec4.desc")}</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>{t("terms.sec4.item1")}</li>
                <li>{t("terms.sec4.item2")}</li>
                <li>{t("terms.sec4.item3")}</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                {t("terms.sec5.title")}
              </h2>
              <p className="mb-4">{t("terms.sec5.desc")}</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec5.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{t("terms.sec5.item2")}</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="bg-sky-500/5 rounded-3xl p-8 border border-sky-500/20 mt-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-brand-accent" />
                {t("terms.sec6.title")}
              </h2>
              <p className="mb-4">{t("terms.sec6.desc")}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <span>{t("terms.sec6.item1")}</span>
                </li>
              </ul>
              <p className="text-brand-accentHover font-medium">
                {t("terms.sec6.contact")}
              </p>
            </div>
            
          </div>
          
        </div>
      </section>
    </div>
  );
}
