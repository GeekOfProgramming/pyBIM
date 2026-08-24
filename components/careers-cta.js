"use client";

import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function CareersCTA() {
  const { t } = useLanguage();
  return (
    <section className="bg-brand-base pt-16 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-brand-border px-8 py-10 md:py-14 text-center md:text-left shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-xl hover:border-brand-primary/30 transition-all">
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-textPrimary mb-3">
              {t("nav.home") === "Home" && t("nav.services") === "Services" 
                ? "Looking for a new opportunity?" 
                : "Cerchi una nuova opportunità lavorativa?"}
            </h2>
            <p className="text-brand-textSecondary text-lg">
              {t("nav.home") === "Home" && t("nav.services") === "Services" 
                ? "Join our team of experts and build the future with pyBIM." 
                : "Unisciti al nostro team di esperti e costruisci il futuro con pyBIM."}
            </p>
          </div>
          <Link 
            href="/careers" 
            className="relative z-10 shrink-0 bg-brand-accent text-white hover:bg-brand-accentHover px-8 py-4 rounded-full font-bold text-lg transition shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-1"
          >
            {t("nav.careers") || "Lavora con Noi"}
          </Link>
        </div>
      </div>
    </section>
  );
}
