"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function CareersCTA() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#081730] pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-10 md:py-14 text-center md:text-left shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white/20 blur-[50px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t("nav.home") === "Home" && t("nav.services") === "Services" 
                ? "Looking for a new opportunity?" 
                : "Cerchi una nuova opportunità lavorativa?"}
            </h2>
            <p className="text-white/90 text-lg">
              {t("nav.home") === "Home" && t("nav.services") === "Services" 
                ? "Join our team of experts and build the future with Arvand Termo Tec." 
                : "Unisciti al nostro team di esperti e costruisci il futuro con Arvand Termo Tec."}
            </p>
          </div>
          <Link 
            href="/careers" 
            className="relative z-10 shrink-0 bg-white text-orange-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg transition shadow-xl"
          >
            {t("nav.careers") || "Lavora con Noi"}
          </Link>
        </div>
      </div>
    </section>
  );
}
