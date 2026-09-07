"use client";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Box, Code, Database, ChevronRight, HardHat, Building2, Factory, ShieldCheck, FileText, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

import BimCalculatorCta from "@/components/sections/bim-calculator-cta";
import FAQSection from "@/components/sections/faq-section";
import { servicesPageData } from "@/lib/data/servicesPageData";

export default function ServicesPageLayout() {
  const { language } = useLanguage();
  const t = servicesPageData[language] || servicesPageData.en;

  return (
    <div className="w-full bg-brand-base">
      {/* SECTION 1: PAGE HEADER */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-brand-base">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_70%)]" />
        
        <h1 className="text-4xl md:text-6xl font-bold text-brand-textPrimary text-center mb-8 tracking-tight max-w-5xl relative z-10">
          {t.pageHeader.title1} <br className="hidden md:block" />
          <span className="text-brand-primary">{t.pageHeader.title2}</span>
        </h1>
        <p 
          className="text-lg md:text-xl text-brand-textSecondary text-center max-w-4xl font-medium leading-relaxed relative z-10"
          dangerouslySetInnerHTML={{ __html: t.pageHeader.description }}
        />
      </section>

            {/* AI Deployment Architectures */}
      <section className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.sovereignAi.tag}
            </h3>
          </div>
          <h4 className="text-3xl font-bold text-brand-textPrimary mb-4">{t.sovereignAi.title}</h4>
          <p className="text-lg text-brand-textSecondary mb-12 max-w-3xl font-medium">{t.sovereignAi.subtitle}</p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 01 Card */}
            <div className="bg-white border border-brand-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all">
              <h5 className="text-xl font-bold text-brand-textPrimary mb-1">{t.sovereignAi.cards[0].num}. {t.sovereignAi.cards[0].title}</h5>
              <p className="text-xs font-mono text-brand-primary mb-6 uppercase tracking-wider">{t.sovereignAi.cards[0].subtitle}</p>
              <ul className="space-y-4 text-sm text-brand-textSecondary font-medium">
                <li>
                  <strong className="text-brand-textPrimary">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].deployment }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].outcome }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].financial }} />
                </li>
              </ul>
            </div>
            
            {/* 02 Card */}
            <div className="bg-white border border-brand-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all">
              <h5 className="text-xl font-bold text-brand-textPrimary mb-1">{t.sovereignAi.cards[1].num}. {t.sovereignAi.cards[1].title}</h5>
              <p className="text-xs font-mono text-brand-accent mb-6 uppercase tracking-wider">{t.sovereignAi.cards[1].subtitle}</p>
              <ul className="space-y-4 text-sm text-brand-textSecondary font-medium">
                <li>
                  <strong className="text-brand-textPrimary">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].deployment }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].outcome }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].financial }} />
                </li>
              </ul>
            </div>

            {/* 03 Card */}
            <div className="bg-white border border-brand-border rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all">
              <h5 className="text-xl font-bold text-brand-textPrimary mb-1">{t.sovereignAi.cards[2].num}. {t.sovereignAi.cards[2].title}</h5>
              <p className="text-xs font-mono text-brand-primary mb-6 uppercase tracking-wider">{t.sovereignAi.cards[2].subtitle}</p>
              <ul className="space-y-4 text-sm text-brand-textSecondary font-medium">
                <li>
                  <strong className="text-brand-textPrimary">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].deployment }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].outcome }} />
                </li>
                <li>
                  <strong className="text-brand-textPrimary">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].financial }} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Validation Phase */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px bg-emerald-500 w-12" />
            <h3 className="text-sm font-mono font-bold text-emerald-500 tracking-widest uppercase">
              {t.validationPhase.tag}
            </h3>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm">
            <div className="max-w-2xl">
              <h4 className="text-2xl font-bold text-brand-textPrimary mb-4">{t.validationPhase.title}</h4>
              <p 
                className="text-brand-textSecondary text-base font-medium leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: t.validationPhase.desc1 }}
              />
              <p className="text-brand-textSecondary text-base font-medium leading-relaxed">
                {t.validationPhase.desc2}
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start">
              <Link href="/contact" className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:-translate-y-1">
                {t.validationPhase.cta} <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <p className="mt-4 text-[11px] text-emerald-600 font-bold tracking-wide">
                {t.validationPhase.microcopy}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core AI Capabilities */}
      <section className="py-24 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.coreAi.tag}
            </h3>
          </div>
          <h4 className="text-3xl font-bold text-brand-textPrimary mb-4">{t.coreAi.title}</h4>
          <p className="text-lg text-brand-textSecondary mb-10 max-w-3xl font-medium">{t.coreAi.subtitle}</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {t.coreAi.cards.map((card, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] bg-white border border-brand-border shadow-sm">
                <h5 className="text-lg font-bold text-brand-textPrimary mb-3">{card.title}</h5>
                <p className="text-sm text-brand-textSecondary font-medium leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-sm">
            {t.coreAi.cta} <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <p className="mt-3 text-xs font-medium text-brand-textSecondary">{t.coreAi.microcopy}</p>
        </div>
      </section>

      {/* Powered by Custom Code */}
      <section className="py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t.poweredBy.tag}
            </h3>
          </div>
          <h4 className="text-3xl font-bold text-brand-textPrimary mb-4">{t.poweredBy.title}</h4>
          <p className="text-lg text-brand-textSecondary font-medium mb-12 max-w-3xl">{t.poweredBy.subtitle}</p>

          <div className="relative">
            <div className="space-y-12">
              {(t.poweredBy.pipeline || []).map((step, idx) => (
                <div key={idx} className="relative pl-16 group">
                  {/* Connecting Line between badges (strictly underneath and stops at final badge) */}
                  {idx < (t.poweredBy.pipeline?.length || 0) - 1 && (
                    <div className="absolute left-[23px] top-6 h-[calc(100%+48px)] w-[2px] bg-brand-primary/20 z-0 pointer-events-none" />
                  )}

                  {/* Step Number Badge (z-10 with opaque surface background preventing line bleed-through on hover) */}
                  <div className="absolute left-0 top-0 z-10 w-12 h-12 rounded-2xl bg-brand-surface border-2 border-brand-primary/20 group-hover:border-brand-primary group-hover:bg-[#E9F0FD] flex items-center justify-center font-bold text-brand-primary transition-all duration-300 shadow-sm">
                    {idx + 1}
                  </div>
                  <h5 className="text-xl font-bold text-brand-textPrimary mb-2">{step.title}</h5>
                  <p className="text-brand-textSecondary font-medium text-sm leading-relaxed max-w-3xl">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 3 PILLARS (GRID) */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px bg-brand-primary w-12" />
            <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
              &gt;_ INFRASTRUCTURE CAPABILITIES
            </h3>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group rounded-3xl bg-[#1a1a1a] border border-white/10 p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <Box className="w-7 h-7 text-white/70" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.pillars[0].title}</h3>
              <p 
                className="text-white/70 font-medium leading-relaxed flex-grow"
                dangerouslySetInnerHTML={{ __html: t.pillars[0].desc }}
              />
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl bg-[#1a1a1a] border border-white/10 p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden border-b-4 border-b-brand-primary">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
                <Code className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.pillars[1].title}</h3>
              <p 
                className="text-white/70 font-medium leading-relaxed flex-grow"
                dangerouslySetInnerHTML={{ __html: t.pillars[1].desc }}
              />
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl bg-[#1a1a1a] border border-white/10 p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                <Database className="w-7 h-7 text-white/70" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.pillars[2].title}</h3>
              <p 
                className="text-white/70 font-medium leading-relaxed flex-grow"
                dangerouslySetInnerHTML={{ __html: t.pillars[2].desc }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: AUTOMATION WORKFLOW */}
      <section className="py-32 bg-brand-base">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
            {t.automationWorkflow.tag}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 tracking-tight">
            {t.automationWorkflow.title}
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-4">
            {t.automationWorkflow.subtitle}
          </h3>
          <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-3xl mx-auto mb-20 leading-relaxed">
            {t.automationWorkflow.desc}
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative text-left">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-brand-border z-0" />
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-brand-border group-hover:border-brand-primary flex items-center justify-center shadow-md z-10 text-xl font-bold text-brand-textPrimary mb-8 transition-all duration-300">
                {t.automationWorkflow.steps[0].num}
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">{t.automationWorkflow.steps[0].title}</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <span dangerouslySetInnerHTML={{ __html: t.automationWorkflow.steps[0].desc }} />
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-brand-primary border-4 border-white flex items-center justify-center shadow-xl shadow-brand-primary/30 z-10 text-xl font-bold text-white mb-8 transition-all duration-300 group-hover:scale-105">
                {t.automationWorkflow.steps[1].num}
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">{t.automationWorkflow.steps[1].title}</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <span dangerouslySetInnerHTML={{ __html: t.automationWorkflow.steps[1].desc }} />
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center group text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center shadow-xl shadow-emerald-500/30 z-10 text-xl font-bold text-white mb-8 transition-all duration-300 group-hover:scale-105">
                {t.automationWorkflow.steps[2].num}
              </div>
              <h4 className="text-xl font-bold text-brand-textPrimary mb-3">{t.automationWorkflow.steps[2].title}</h4>
              <p className="text-brand-textSecondary text-sm font-medium leading-relaxed max-w-sm mx-auto">
                <span dangerouslySetInnerHTML={{ __html: t.automationWorkflow.steps[2].desc }} />
              </p>
            </div>
          </div>
        </div>
      </section>


                            {/* 5. WHO WE SERVE */}
          <section className="py-24 bg-brand-surface border-y border-brand-border">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px bg-brand-primary w-12" />
                <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                  {t.whoWeServe.tag}
                </h3>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">{t.whoWeServe.title}</h2>
              <p className="text-lg text-brand-textSecondary max-w-2xl font-medium mb-16">{t.whoWeServe.subtitle}</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                      <HardHat className="w-7 h-7 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-4">{t.whoWeServe.cards[0].title}</h3>
                    <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                      {t.whoWeServe.cards[0].desc}
                    </p>
                  </div>
                </div>
    
                {/* Card 2 */}
                <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                      <Building2 className="w-7 h-7 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-4">{t.whoWeServe.cards[1].title}</h3>
                    <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                      {t.whoWeServe.cards[1].desc}
                    </p>
                  </div>
                </div>
    
                {/* Card 3 */}
                <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                      <Factory className="w-7 h-7 text-brand-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-4">{t.whoWeServe.cards[2].title}</h3>
                    <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                      {t.whoWeServe.cards[2].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* 6. ROI METRICS */}
        <section className="relative py-24 bg-white border-b border-brand-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px bg-brand-primary w-12" />
              <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t.roiMetrics.tag}
              </h3>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">{t.roiMetrics.title}</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl font-medium mb-16">{t.roiMetrics.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {t.roiMetrics.metrics.map((metric, idx) => (
                <div key={idx} className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-left hover:border-brand-primary/50 transition-all font-mono shadow-sm hover:shadow-md">
                  <h4 className="text-brand-primary text-[11px] font-bold uppercase tracking-widest mb-4 border-b border-brand-border pb-3">[{metric.header}]</h4>
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-[80px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">Target:</span>
                      <span className="text-brand-textPrimary font-medium">{metric.target}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">Exec:</span>
                      <span className="text-emerald-600 font-bold">{metric.execution}</span>
                    </div>
                    <div className="grid grid-cols-[80px_1fr] gap-3">
                      <span className="text-brand-textSecondary font-bold uppercase tracking-widest">Protocol:</span>
                      <span className="text-brand-textSecondary leading-relaxed font-medium">{metric.protocol}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


    </div>
  );
}
