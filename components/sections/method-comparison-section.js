"use client";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function MethodComparisonSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-brand-background py-24 border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-6">
            {language === 'it' ? 'Approccio Tradizionale vs. Tecnologico' : 'Traditional vs. Tech-Enabled Approach'}
          </h2>
          <p className="text-brand-textSecondary max-w-2xl mx-auto text-lg">
            {language === 'it' 
              ? 'Scopri perché la nostra metodologia automatizzata Digital Twin supera i flussi di lavoro BIM standard.'
              : 'See why our automated Digital Twin methodology outpaces standard BIM workflows.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Traditional Column */}
          <div className="rounded-3xl border border-brand-border bg-brand-background p-10 flex flex-col items-center text-center opacity-80">
            <h3 className="text-2xl font-semibold text-brand-textSecondary mb-8 uppercase tracking-widest">
              {language === 'it' ? 'BIM Standard' : 'Standard BIM'}
            </h3>
            <ul className="space-y-6 text-brand-textSecondary w-full">
              {[
                language === 'it' ? 'Inserimento manuale e conflitti dati' : 'Manual data entry and clashes',
                language === 'it' ? 'Cicli di revisione lenti' : 'Slow revision cycles',
                language === 'it' ? 'Comunicazione frammentata' : 'Siloed communication',
                language === 'it' ? 'Risoluzione reattiva dei problemi' : 'Reactive issue resolution',
                language === 'it' ? 'Modelli 3D statici' : 'Static 3D models'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-left">
                  <XCircle className="w-6 h-6 text-brand-textSecondary flex-shrink-0 opacity-50" />
                  <span className="text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech-Enabled Column */}
          <div className="rounded-3xl border border-brand-accent bg-brand-surface p-10 flex flex-col items-center text-center relative shadow-[0_0_40px_rgba(59,130,246,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-4 bg-brand-accent text-white font-bold px-6 py-2 rounded-full text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              {language === 'it' ? 'Il Nostro Approccio' : 'Our Approach'}
            </div>
            <h3 className="text-2xl font-bold text-brand-textPrimary mb-8 uppercase tracking-widest mt-4">
              {language === 'it' ? 'Automazione Digital Twin' : 'Digital Twin Automation'}
            </h3>
            <ul className="space-y-6 text-brand-textPrimary w-full">
              {[
                language === 'it' ? 'Rilevamento automatico conflitti' : 'Automated clash detection',
                language === 'it' ? 'Collaborazione cloud in tempo reale' : 'Real-time cloud collaboration',
                language === 'it' ? 'Stima costi guidata dall\'AI (5D)' : 'AI-driven cost estimation (5D)',
                language === 'it' ? 'Manutenzione predittiva' : 'Predictive maintenance',
                language === 'it' ? 'Integrazione dati dinamica e live' : 'Dynamic, live data integration'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-left">
                  <CheckCircle className="w-6 h-6 text-brand-accent flex-shrink-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
