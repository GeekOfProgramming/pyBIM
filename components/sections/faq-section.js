"use client";

import { useState, useId } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "@/components/layout/LocalizedLink";
import { useLanguage } from "@/lib/LanguageContext";

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const { t } = useLanguage();
  const headingId = useId();

  const faqs = [
    { id: "services", q: t("faq.q1"), a: t("faq.a1") },
    { id: "enquiries", q: t("faq.q2"), a: t("faq.a2") },
    { id: "international", q: t("faq.q3"), a: t("faq.a3") },
    { id: "confidentiality", q: t("faq.q4"), a: t("faq.a4") },
    { id: "roi-matrix", q: t("faq.q5"), a: t("faq.a5") },
    { id: "private-access", q: t("faq.q6"), a: t("faq.a6") },
    { id: "timeline", q: t("faq.q7"), a: t("faq.a7") },
    { id: "submission", q: t("faq.q8"), a: t("faq.a8") },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Heading, Eyebrow, Supporting Description & Contact Prompt */}
      <div className="lg:col-span-5 flex flex-col items-start text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-semibold text-brand-primary mb-6 shadow-xs">
          {t("faq.badge") || "FREQUENTLY ASKED QUESTIONS"}
        </div>

        <h2
          id={headingId}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-sans tracking-tight text-brand-textPrimary leading-tight mb-5"
        >
          {t("faq.title") || "Questions Before Getting Started?"}
        </h2>

        <p className="text-body sm:text-lead font-sans text-brand-textSecondary font-medium leading-relaxed mb-8">
          {t("faq.desc") ||
            "Find answers about our engineering services, project enquiries, BIM automation, confidentiality and private-access opportunities."}
        </p>

        {/* Optional Final Contact Prompt */}
        <div className="pt-2">
          <Link
            href="#project-enquiry"
            className="group inline-flex items-center gap-2 text-body-sm font-semibold text-brand-primary hover:text-brand-primaryHover transition-colors"
          >
            <span>{t("faq.contact_prompt") || "Still have a question? Contact our team."}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Right Column: Accordion */}
      <div className="lg:col-span-7 space-y-4 w-full">
        {faqs.map((item, idx) => {
          const isOpen = openFaq === idx;
          const buttonId = `faq-btn-${item.id}`;
          const regionId = `faq-region-${item.id}`;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-brand-primary dark:border-blue-500 bg-brand-surface dark:bg-slate-800/90 shadow-lg"
                  : "border-brand-border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/40"
              }`}
            >
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={regionId}
                onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                type="button"
                className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 rounded-2xl"
              >
                <span
                  className={`font-semibold text-base sm:text-lg leading-snug transition-colors ${
                    isOpen
                      ? "text-brand-primary dark:text-blue-400"
                      : "text-brand-textPrimary hover:text-brand-primary/80"
                  }`}
                >
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 mt-0.5 transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 text-brand-primary dark:text-blue-400"
                      : "text-brand-textSecondary"
                  }`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={regionId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className="px-6 pb-6 pt-1 text-body-sm sm:text-body leading-relaxed font-normal text-brand-textSecondary dark:text-slate-300 [&_a]:text-brand-primary [&_a]:font-semibold [&_a]:underline hover:[&_a]:text-brand-primaryHover"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
