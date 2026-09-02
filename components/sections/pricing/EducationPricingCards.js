"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { TerminalSquare, LockOpen, Code2, PlayCircle, FolderGit2, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import enData from "@/lib/translations/en/pricing.json";
import deData from "@/lib/translations/de/pricing.json";
import itData from "@/lib/translations/it/pricing.json";

export default function EducationPricingCards() {
  const { language } = useLanguage();
  const pricingData = language === 'it' ? itData : language === 'de' ? deData : enData;
  const data = pricingData.education;

  const [billingCycle, setBillingCycle] = useState("annual"); // "monthly" or "annual"

  return (
    <section className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#18181b] border border-gray-800 text-blue-400 font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span>{data.badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
          {data.title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
          {data.description}
        </p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center p-1 bg-[#18181b] border border-gray-800 rounded-xl relative">
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${billingCycle === "monthly" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            {data.billing.monthly}
          </button>
          <button 
            onClick={() => setBillingCycle("annual")}
            className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-lg transition-colors ${billingCycle === "annual" ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
          >
            {data.billing.annual}
          </button>
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-[#27272a] rounded-lg transition-transform duration-300 ease-in-out ${billingCycle === "annual" ? "translate-x-full left-[-4px]" : "translate-x-0 left-1"}`}
            style={{ width: "calc(50% - 4px)" }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Card 1: Single-Asset */}
        <div className="bg-[#18181b] border border-gray-800 rounded-3xl p-8 lg:p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors">
          <div>
            <div className="flex items-center gap-3 mb-4 text-gray-400 font-mono text-sm uppercase tracking-widest">
              <PlayCircle className="w-5 h-5" />
              {data.single.type}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{data.single.title}</h3>
            <p className="text-sm text-gray-500 mb-8">{data.single.subtitle}</p>
            
            <div className="text-5xl font-extrabold text-white mb-8 tracking-tighter">
              {data.single.price} <span className="text-lg text-gray-600 font-normal">{data.single.unit}</span>
            </div>

            <ul className="space-y-4 mb-10 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
                {data.single.features[0]}
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gray-500 shrink-0" />
                {data.single.features[1]}
              </li>
              <li className="flex items-start gap-3 opacity-40">
                <span className="w-5 h-5 shrink-0 flex items-center justify-center font-bold">✕</span>
                {data.single.features[2]}
              </li>
            </ul>
          </div>

          <Link
            href="/education"
            className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-[#27272a] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#3f3f46] transition-all"
          >
            <span className="flex items-center gap-2"><LockOpen className="w-4 h-4" /> {data.single.cta}</span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* Card 2: All-Access */}
        <div className="bg-gradient-to-b from-blue-900/20 to-[#18181b] border border-blue-900/50 rounded-3xl p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition-colors shadow-[0_0_40px_rgba(37,99,235,0.05)]">
          
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
            {data.all_access.tag}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 text-blue-400 font-mono text-sm uppercase tracking-widest">
              <Code2 className="w-5 h-5" />
              {data.all_access.type}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{data.all_access.title}</h3>
            <p className="text-sm text-blue-400/80 mb-8">{data.all_access.subtitle}</p>
            
            <div className="text-5xl font-extrabold text-white mb-8 tracking-tighter">
              {billingCycle === "monthly" ? data.all_access.price_monthly : data.all_access.price_annual} <span className="text-lg text-gray-600 font-normal">{data.all_access.unit}</span>
              {billingCycle === "annual" && <div className="text-xs text-blue-400 font-mono mt-2 font-normal tracking-normal uppercase">{data.all_access.billed_yearly}</div>}
            </div>

            <ul className="space-y-4 mb-10 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: `<span class="text-white font-medium">${data.all_access.features[0]}</span>${data.all_access.features[1]}` }} />
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: `${data.all_access.features[2]}<span class="font-mono text-blue-300 text-xs">${data.all_access.features[3]}</span>${data.all_access.features[4]}` }} />
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                {data.all_access.features[5]}
              </li>
            </ul>
          </div>

          <Link
            href="/contact"
            className="w-full inline-flex items-center justify-between px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-wider hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
          >
            <span className="flex items-center gap-2"><FolderGit2 className="w-4 h-4" /> {data.all_access.cta}</span>
            <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
