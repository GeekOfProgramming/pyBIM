"use client";
import Link from "@/components/layout/LocalizedLink";
import { ChevronLeft, ChevronRight, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function CareerDetailLayout({ job }) {
  const { language, t } = useLanguage();

  if (!job) return null;

  return (
    <div className="bg-brand-background min-h-screen pt-24">
      {/* Hero Content */}
      <section className="relative overflow-hidden pt-24 pb-12 border-b border-brand-accent/10">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/General/hvac-industrial.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" 
          />
          <div className="absolute inset-0 bg-brand-background" />
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <Link href="/careers" className="inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t("career.detail.back")}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-brand-accent font-medium text-xs">
              <Briefcase className="w-3.5 h-3.5" />
              {language === "it" ? job.departmentIt : job.departmentEn}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {language === "it" ? job.titleIt : job.titleEn}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-brand-surface/30 border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Main Job Details */}
            <h2 className="text-2xl font-bold text-white mb-6">
              {t("career.detail.role")}
            </h2>
            <div className="prose prose-invert max-w-none mb-12 text-white/70 leading-relaxed whitespace-pre-wrap">
              {language === "it" ? job.descriptionIt : job.descriptionEn}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              {t("career.detail.reqs")}
            </h2>
            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed whitespace-pre-wrap">
              {language === "it" ? job.requirementsIt : job.requirementsEn}
            </div>

          </div>

          {/* How to Apply Section (Moved from Main Page) */}
          <div className="text-center pt-12 pb-24 border-t border-white/10 mt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent/10 text-brand-accent mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("career.detail.apply.title")}
            </h2>
            
            <div className="max-w-2xl mx-auto mb-10 text-left">
              <>
                <p className="text-white/70 mb-6 text-center">
                  {t("career.detail.apply.desc")}
                </p>
                <div className="p-5 bg-sky-950/40 border border-brand-accent/20 rounded-2xl text-sm shadow-inner">
                  <strong className="text-brand-accentHover block mb-2 font-bold uppercase tracking-wider text-xs">{t("career.detail.apply.privacy.title")}</strong>
                  <span dangerouslySetInnerHTML={{ __html: t("career.detail.apply.privacy.desc1") }} />
                  <div className="mt-3 p-3 bg-brand-background rounded-lg border border-white/5 font-mono text-xs text-white/80 break-words">
                    {t("career.detail.apply.privacy.desc2")}
                  </div>
                </div>
              </>
            </div>

            <a 
              href={`mailto:job@pybim.com?subject=Candidatura: ${language === "it" ? job.titleIt : job.titleEn}`} 
              className="inline-flex items-center gap-3 bg-brand-accent hover:bg-brand-accent text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:-translate-y-1 mb-16"
            >
              job@pybim.com
              <ChevronRight className="w-5 h-5" />
            </a>

            <div className="text-xs text-white/40 max-w-3xl mx-auto border-t border-white/10 pt-8 text-left grid md:grid-cols-2 gap-8">
              <div>
                <strong className="text-white/60 block mb-1 uppercase tracking-wider">{t("career.detail.equal.title")}</strong>
                {t("career.detail.equal.desc")}
              </div>
              <div>
                <strong className="text-white/60 block mb-1 uppercase tracking-wider">{t("career.detail.transparency.title")}</strong>
                {t("career.detail.transparency.desc")}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
