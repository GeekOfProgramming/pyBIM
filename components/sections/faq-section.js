"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useLanguage();
  
  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-6 shadow-sm self-start">
            {t("faq.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-8 leading-tight">
            {t("faq.title")}
          </h2>
        </div>

        {/* Right Column: Accordion */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className={`rounded-2xl border transition-all duration-300 ${openFaq === idx ? 'border-brand-primary dark:border-blue-500 bg-brand-surface dark:bg-slate-800 shadow-lg' : 'border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/40'}`}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                type="button" 
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-semibold text-lg transition-colors ${openFaq === idx ? 'text-brand-primary dark:text-blue-400' : 'text-brand-textPrimary hover:text-brand-primary/80'}`}>
                  {item.q}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 mt-1 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-brand-primary dark:text-blue-400" : "text-brand-textPrimary/50"}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div 
                  className={`px-6 pb-6 pt-2 text-base leading-relaxed font-medium ${openFaq === idx ? 'text-brand-textSecondary dark:text-slate-300 [&_strong]:text-brand-textPrimary dark:[&_strong]:text-white [&_strong]:font-bold' : 'text-brand-textSecondary'}`}
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
