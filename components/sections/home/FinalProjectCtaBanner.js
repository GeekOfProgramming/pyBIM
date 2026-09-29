"use client";

import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, ShieldCheck, Lock, CheckCircle2, Phone, Mail, Building } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { emailAddress, phoneDisplay, phoneHref } from "@/lib/site-copy";

export default function FinalProjectCtaBanner() {
  const { language } = useLanguage();

  const content = {
    en: {
      headline: "Ready to Deliver Your Next BIM Project with Zero Clashes?",
      desc: "Outsource your multidisciplinary BIM modeling, shop drawings, and clash coordination with algorithmic precision. We integrate directly into your Common Data Environment (CDE), eliminating bottlenecks and guaranteeing on-time delivery under ISO 19650.",
      commitments: [
        "100% Guaranteed Zero-Clash Delivery Matrix",
        "Direct CDE Integration (Autodesk Construction Cloud / BIM 360 / Trimble)",
        "Strict Bilateral NDA & Data Sovereignty Guaranteed"
      ],
      cardBadge: "PROJECT INTAKE // 48-HOUR RESPONSE",
      cardTitle: "Initiate Your Project Scope & Model Audit",
      cardDesc: "Submit your project requirements, model volume, or tender specs through our primary audit form to receive a detailed technical feasibility review and turnaround timeline within 24-48 hours.",
      cta: "OPEN PROJECT AUDIT FORM",
      securityNotice: "All project submissions protected under bilateral NDA.",
      directSupport: "Direct Engineering Intake:"
    },
    it: {
      headline: "Pronti a Realizzare il Vostro Prossimo Progetto BIM Senza Interferenze?",
      desc: "Affidateci in outsourcing la modellazione BIM multidisciplinare, i disegni costruttivi e il coordinamento delle interferenze con precisione algoritmica. Ci integriamo direttamente nel vostro CDE, garantendo tempi certi e piena conformità a ISO 19650.",
      commitments: [
        "Matrice di Consegna Garantita con Zero Interferenze (Zero-Clash)",
        "Integrazione Diretta nel CDE (Autodesk Construction Cloud / BIM 360 / Trimble)",
        "Accordo di Riservatezza NDA Bilaterale & Sovranità dei Dati"
      ],
      cardBadge: "RICEZIONE PROGETTI // RISPOSTA IN 48 ORE",
      cardTitle: "Avvia l'Audit Tecnico e la Stima del Progetto",
      cardDesc: "Invia i requisiti, i volumi del modello o i capitolati attraverso il modulo di audit principale per ricevere una valutazione tecnica di fattibilità e un cronoprogramma preciso in 24-48 ore.",
      cta: "APRI IL MODULO DI AUDIT PROGETTO",
      securityNotice: "Tutte le richieste sono protette da accordo NDA bilaterale.",
      directSupport: "Contatto Diretto Ingegneria:"
    },
    de: {
      headline: "Bereit für Ihr nächstes kollisionsfreies BIM-Projekt?",
      desc: "Lagern Sie multidisziplinäre BIM-Modellierung, Werkplanung und Kollisionsprüfung mit algorithmischer Präzision an uns aus. Wir binden uns direkt in Ihre CDE ein – mit Termingarantie und vollständiger ISO 19650-Konformität.",
      commitments: [
        "Garantierte kollisionsfreie Übergabematrix (Zero-Clash)",
        "Direkte CDE-Integration (Autodesk Construction Cloud / BIM 360 / Trimble)",
        "Strenge bilaterale Geheimhaltungsvereinbarung (NDA) & Datensouveränität"
      ],
      cardBadge: "PROJEKTERFASSUNG // 48-STUNDEN-ANTWORT",
      cardTitle: "Technisches Projekt-Audit & Scoping anfordern",
      cardDesc: "Übermitteln Sie Ihre Projektanforderungen oder Modellvolumina über unser primäres Audit-Formular, um innerhalb von 24–48 Stunden eine detaillierte Machbarkeitsanalyse und Terminplanung zu erhalten.",
      cta: "PROJEKT-AUDIT-FORMULAR ÖFFNEN",
      securityNotice: "Alle Projekteingaben sind durch bilaterale NDA geschützt.",
      directSupport: "Direkter Engineering-Kontakt:"
    }
  };

  const t = content[language] || content.en;

  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-blue-600 text-white relative overflow-hidden border-b border-blue-700">
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-700/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Value Proposition & Guarantees */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm self-start">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>MANAGED BIM OUTSOURCING & EXECUTION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {t.headline}
            </h2>

            <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-8 font-normal">
              {t.desc}
            </p>

            <ul className="space-y-4 mb-10">
              {t.commitments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-white">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-blue-500/50 flex flex-wrap items-center gap-6 text-xs font-mono text-blue-100">
              <span className="font-bold text-white uppercase">{t.directSupport}</span>
              <a href={phoneHref} className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5" /> {phoneDisplay}
              </a>
              <a href={`mailto:${emailAddress}`} className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5" /> {emailAddress}
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: The High-Conversion Intake Card directing to /contact#audit */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-950/95 border border-slate-800 p-8 md:p-10 shadow-2xl text-left backdrop-blur-md relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-emerald-400" />

              {/* Card Header */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-brand-primary font-mono text-[11px] font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.cardBadge}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                {t.cardTitle}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-normal">
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
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-5 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  {t.securityNotice}
                </span>
                <span className="text-slate-500 hidden sm:inline">Padua, IT HQ</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
