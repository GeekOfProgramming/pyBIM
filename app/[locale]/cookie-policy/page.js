"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { ShieldAlert } from "lucide-react";

export default function CookiePolicyPage() {
  const { language } = useLanguage();

  const title = {
    en: "Cookie Policy",
    it: "Cookie Policy",
    de: "Cookie-Richtlinie"
  };

  const placeholder = {
    en: "This document is currently being adapted to comply with GDPR standards. The official policy powered by Iubenda will be available here shortly.",
    it: "Questo documento è attualmente in fase di adattamento agli standard GDPR. La policy ufficiale generata tramite Iubenda sarà presto disponibile qui.",
    de: "Dieses Dokument wird derzeit an die DSGVO-Standards angepasst. Die offizielle Richtlinie, die von Iubenda unterstützt wird, wird in Kürze hier verfügbar sein."
  };

  return (
    <div className="bg-brand-base min-h-[70vh] py-24 md:py-32 px-6 lg:px-8 border-b border-brand-border">
      <div className="mx-auto max-w-4xl bg-white rounded-3xl border border-brand-border shadow-xl p-8 md:p-16">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-brand-border">
          <div className="p-4 bg-brand-primary/10 rounded-2xl text-brand-primary">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
            {title[language] || title.en}
          </h1>
        </div>
        
        <div className="prose prose-lg prose-blue max-w-none">
          <div className="p-6 bg-brand-surface border border-brand-border rounded-2xl text-brand-textSecondary font-medium leading-relaxed">
            {placeholder[language] || placeholder.en}
          </div>
        </div>
      </div>
    </div>
  );
}
