"use client";

import Link from "@/components/LocalizedLink";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PrivacyPolicyLayout() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 lg:px-8 bg-[#050D1A] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A162B] to-[#050D1A]" />
        
        <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Link href="/" className="text-sm font-medium text-white/60 hover:text-orange-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-white/40" />
            <span className="text-sm font-bold text-white/90">{t("privacy.hero.breadcrumb")}</span>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("privacy.hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("privacy.intro")}
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
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                {t("privacy.sec1.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec1.desc")}</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>{t("privacy.sec1.list1")}</li>
                <li>{t("privacy.sec1.list2")}</li>
                <li>{t("privacy.sec1.list3")}</li>
                <li>{t("privacy.sec1.list4")}</li>
                <li>{t("privacy.sec1.list5")}</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                {t("privacy.sec2.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec2.desc")}</p>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold text-white mb-2">{t("privacy.sec2.item1.title")}</h3>
                  <p className="text-white/70 text-sm md:text-base">{t("privacy.sec2.item1.desc")}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold text-white mb-2">{t("privacy.sec2.item2.title")}</h3>
                  <p className="text-white/70 text-sm md:text-base">{t("privacy.sec2.item2.desc")}</p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {t("privacy.sec3.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec3.desc")}</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec3.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec3.item2")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec3.item3")}</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                {t("privacy.sec4.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec4.desc")}</p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec4.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec4.item2")}</span>
                </li>
                <li className="flex gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{t("privacy.sec4.item3")}</span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                {t("privacy.sec5.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec5.desc")}</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>{t("privacy.sec5.item1")}</li>
                <li>{t("privacy.sec5.item2")}</li>
                <li>{t("privacy.sec5.item3")}</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                {t("privacy.sec6.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec6.desc")}</p>
              <ul className="list-disc pl-6 space-y-2 text-white/70">
                <li>{t("privacy.sec6.item1")}</li>
                <li>{t("privacy.sec6.item2")}</li>
                <li>{t("privacy.sec6.item3")}</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                {t("privacy.sec7.title")}
              </h2>
              <p className="text-white/70">{t("privacy.sec7.desc")}</p>
            </div>

            {/* Section 8 */}
            <div className="bg-orange-500/5 rounded-3xl p-8 border border-orange-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
                {t("privacy.sec8.title")}
              </h2>
              <p className="mb-4">{t("privacy.sec8.desc")}</p>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <span>{t("privacy.sec8.item1")}</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <span>{t("privacy.sec8.item2")}</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <span>{t("privacy.sec8.item3")}</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 mt-2.5 shrink-0" />
                  <span>{t("privacy.sec8.item4")}</span>
                </li>
              </ul>
              <p className="text-orange-300 font-medium">
                {t("privacy.sec8.contact")}
              </p>
            </div>
            
          </div>
          
        </div>
      </section>
    </div>
  );
}
