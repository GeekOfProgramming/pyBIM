"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useLanguage();
  
  const faqs = [
    {
      q: t("faq.q1"),
      a: t("faq.a1")
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2")
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3")
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-accent" /> {t("faq.badge")}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-textPrimary mb-8 leading-tight">
            {t("faq.title")}
          </h2>
          
          <ul className="space-y-6 mb-12">
            <li className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
              <span className="text-brand-textSecondary text-lg font-bold">{t("faq.bullet1")}</span>
            </li>
            <li className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
              <span className="text-brand-textSecondary text-lg font-bold">{t("faq.bullet2")}</span>
            </li>
            <li className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0" />
              <span className="text-brand-textSecondary text-lg font-bold">{t("faq.bullet3")}</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Accordion */}
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={item.q} className={`rounded-2xl border transition-colors duration-300 ${openFaq === idx ? 'border-brand-primary bg-white shadow-md' : 'border-brand-border bg-brand-surface hover:border-brand-primary/50'}`}>
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} 
                type="button" 
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className={`font-semibold text-lg transition-colors ${openFaq === idx ? 'text-brand-textPrimary' : 'text-brand-textSecondary'}`}>
                  {item.q}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-brand-primary" : "text-brand-textSecondary"}`} />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 pt-2 text-base leading-relaxed text-brand-textSecondary font-medium">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
