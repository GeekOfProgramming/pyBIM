"use client";
import Link from "@/components/LocalizedLink";
import { ChevronLeft, ChevronRight, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function CareerDetailLayout({ job }) {
  const { language } = useLanguage();

  if (!job) return null;

  return (
    <div className="bg-[#081730] min-h-screen pt-24">
      {/* Hero Content */}
      <section className="relative overflow-hidden pt-24 pb-12 border-b border-sky-400/10">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/General/hvac-industrial.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-overlay grayscale" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081730]/90 via-[#081730]/80 to-[#081730]" />
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
          <Link href="/careers" className="inline-flex items-center text-sm font-bold text-orange-400 uppercase tracking-widest hover:text-white transition-colors mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {language === "it" ? "Torna alle posizioni" : "Back to Careers"}
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-medium text-xs">
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
          <div className="bg-[#102A5C]/30 border border-white/10 rounded-3xl p-8 md:p-12">
            {/* Main Job Details */}
            <h2 className="text-2xl font-bold text-white mb-6">
              {language === "it" ? "Descrizione del Ruolo" : "Role Description"}
            </h2>
            <div className="prose prose-invert max-w-none mb-12 text-white/70 leading-relaxed whitespace-pre-wrap">
              {language === "it" ? job.descriptionIt : job.descriptionEn}
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">
              {language === "it" ? "Requisiti" : "Requirements"}
            </h2>
            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed whitespace-pre-wrap">
              {language === "it" ? job.requirementsIt : job.requirementsEn}
            </div>

          </div>

          {/* How to Apply Section (Moved from Main Page) */}
          <div className="text-center pt-12 pb-24 border-t border-white/10 mt-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 text-orange-500 mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">
              {language === "it" ? "Come Candidarsi" : "How to Apply"}
            </h2>
            
            <div className="max-w-2xl mx-auto mb-10 text-left">
              {language === "it" ? (
                <>
                  <p className="text-white/70 mb-6 text-center">
                    Per candidarti a questa posizione, inviaci il tuo CV e una lettera di presentazione indicando il titolo della posizione nell'oggetto.
                  </p>
                  <div className="p-5 bg-sky-950/40 border border-sky-400/20 rounded-2xl text-sm shadow-inner">
                    <strong className="text-sky-300 block mb-2 font-bold uppercase tracking-wider text-xs">Informativa Privacy per i candidati (GDPR)</strong>
                    Per permetterci di valutare legalmente il tuo profilo, <span className="text-white font-medium">inserisci obbligatoriamente in fondo al tuo CV</span> la seguente dicitura:
                    <div className="mt-3 p-3 bg-[#081730] rounded-lg border border-white/5 font-mono text-xs text-white/80 break-words">
                      "Autorizzo il trattamento dei miei dati personali ai sensi del D.lgs. 196/2003 e del GDPR (Regolamento UE 2016/679)."
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white/70 mb-6 text-center">
                    To apply for this position, please send us your CV and a cover letter indicating the job title in the subject line.
                  </p>
                  <div className="p-5 bg-sky-950/40 border border-sky-400/20 rounded-2xl text-sm shadow-inner">
                    <strong className="text-sky-300 block mb-2 font-bold uppercase tracking-wider text-xs">Privacy Information for Candidates (GDPR)</strong>
                    To allow us to legally process your application, <span className="text-white font-medium">you must include</span> the following statement at the bottom of your CV:
                    <div className="mt-3 p-3 bg-[#081730] rounded-lg border border-white/5 font-mono text-xs text-white/80 break-words">
                      "Autorizzo il trattamento dei miei dati personali ai sensi del D.lgs. 196/2003 e del GDPR (Regolamento UE 2016/679)."
                    </div>
                  </div>
                </>
              )}
            </div>

            <a 
              href={`mailto:job@arvandtermotec.it?subject=Candidatura: ${language === "it" ? job.titleIt : job.titleEn}`} 
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:-translate-y-1 mb-16"
            >
              job@arvandtermotec.it
              <ChevronRight className="w-5 h-5" />
            </a>

            <div className="text-xs text-white/40 max-w-3xl mx-auto border-t border-white/10 pt-8 text-left grid md:grid-cols-2 gap-8">
              <div>
                <strong className="text-white/60 block mb-1 uppercase tracking-wider">Pari Opportunità</strong>
                {language === "it" 
                  ? "La presente ricerca è rivolta a candidati di ambo i sessi (L. 903/77 e L. 125/91) e a persone di tutte le età e tutte le nazionalità, ai sensi dei decreti legislativi 215/03 e 216/03." 
                  : "This search is open to candidates of both sexes (L. 903/77 and L. 125/91) and to people of all ages and all nationalities, pursuant to legislative decrees 215/03 and 216/03."}
              </div>
              <div>
                <strong className="text-white/60 block mb-1 uppercase tracking-wider">Trasparenza (Decreto Trasparenza)</strong>
                {language === "it"
                  ? "In fase di colloquio verranno discussi nel dettaglio la tipologia contrattuale (es. CCNL Confapi), l'impegno orario (full-time o part-time) e la sede operativa."
                  : "During the interview, the contract type (e.g. CCNL Confapi), working hours (full-time or part-time), and work location will be discussed in detail."}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
