"use client";
import Link from "@/components/layout/LocalizedLink";
import { X, Mail, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerModal({ person, onClose }) {
  const { t, language } = useLanguage();
  
  if (!person) return null;
  const data = person[language] || person.it;

  return (
    <div className="fixed inset-0 z-[1100] flex p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row m-auto border border-brand-border dark:border-slate-800 transition-colors">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/90 dark:bg-slate-800/90 hover:bg-brand-surface dark:hover:bg-slate-700 rounded-full flex items-center justify-center text-brand-textPrimary border border-brand-border dark:border-slate-700 shadow-sm transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Image & Contact Info */}
        <div className="w-full md:w-5/12 flex flex-col bg-brand-surface dark:bg-slate-950/60 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-brand-border dark:border-slate-800 justify-between">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-brand-border dark:border-slate-800 aspect-[4/5] w-full mb-6">
              <img 
                src={person.image || "/Pictures/General/hvac-industrial.jpg"} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center md:text-left mb-6">
              <h3 className="text-2xl font-bold text-brand-textPrimary">{data.name}</h3>
              <p className="text-sm font-semibold text-brand-primary mt-1">{data.role}</p>
            </div>
          </div>
          
          {/* Validation Vectors */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 text-center shadow-sm border border-brand-border dark:border-slate-700 mt-auto flex items-center justify-center gap-6">
            <a href="#" className="text-brand-textSecondary hover:text-brand-primary transition-all hover:scale-110" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-brand-textSecondary hover:text-brand-primary transition-all hover:scale-110" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-brand-textSecondary hover:text-brand-primary transition-all hover:scale-110" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="w-full md:w-7/12 p-8 lg:p-12 md:overflow-y-auto md:max-h-[85vh] bg-white dark:bg-slate-900">
          
          {/* PROFILE SUMMARY */}
          <div className="mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-brand-textSecondary">
              // {t("about.modal.profile_summary_title")}
            </h3>
            <p className="text-brand-textPrimary leading-relaxed font-medium text-base sm:text-lg">
              {data.bio}
            </p>
          </div>

          {/* CORE STACK */}
          {data.core_stack && data.core_stack.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-brand-textSecondary">
                // {t("about.modal.core_stack_title")}
              </h3>
              <ul className="space-y-4">
                {data.core_stack.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0" />
                    <span className="text-brand-textSecondary font-medium text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* OPERATIONAL FOCUS */}
          {data.operational_focus && data.operational_focus.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-brand-textSecondary">
                // {t("about.modal.operational_focus_title")}
              </h3>
              <ul className="space-y-4">
                {data.operational_focus.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0" />
                    <span className="text-brand-textSecondary font-medium text-sm sm:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
