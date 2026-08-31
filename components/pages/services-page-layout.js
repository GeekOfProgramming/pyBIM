"use client";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Box, Code, Database, ChevronRight, HardHat, Building2, Factory, ShieldCheck, FileText, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TechStackSection from "@/components/ui/TechStackSection";
import ComplianceSection from "@/components/ui/ComplianceSection";
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

      {/* NEW SECTION: SOVEREIGN AI DETAILS */}
      <section className="py-24 bg-[#121212] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-32">

          {/* AI Deployment Architectures */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px bg-brand-primary w-12" />
              <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t.sovereignAi.tag}
              </h3>
            </div>
            <h4 className="text-3xl font-bold mb-12">{t.sovereignAi.title}</h4>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h4 className="text-lg font-bold text-red-400 mb-2">{t.sovereignAi.problem.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{t.sovereignAi.problem.desc}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <h4 className="text-lg font-bold text-yellow-400 mb-2">{t.sovereignAi.agitation.title}</h4>
                <p className="text-sm text-white/60 leading-relaxed">{t.sovereignAi.agitation.desc}</p>
              </div>
              <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                <h4 className="text-lg font-bold text-brand-primary mb-2">{t.sovereignAi.solution.title}</h4>
                <p 
                  className="text-sm text-white/80 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.sovereignAi.solution.desc }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {/* 01 Card */}
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8">
                <h5 className="text-xl font-bold mb-1">{t.sovereignAi.cards[0].num}. {t.sovereignAi.cards[0].title}</h5>
                <p className="text-xs font-mono text-brand-primary mb-6 uppercase tracking-wider">{t.sovereignAi.cards[0].subtitle}</p>
                <ul className="space-y-4 text-sm text-white/70">
                  <li>
                    <strong className="text-white">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].deployment }} />
                  </li>
                  <li>
                    <strong className="text-white">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].outcome }} />
                  </li>
                  <li>
                    <strong className="text-white">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[0].financial }} />
                  </li>
                </ul>
              </div>
              
              {/* 02 Card */}
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-brand-accent/30 rounded-[2rem] p-8 relative">
                <h5 className="text-xl font-bold mb-1">{t.sovereignAi.cards[1].num}. {t.sovereignAi.cards[1].title}</h5>
                <p className="text-xs font-mono text-brand-accent mb-6 uppercase tracking-wider">{t.sovereignAi.cards[1].subtitle}</p>
                <ul className="space-y-4 text-sm text-white/70">
                  <li>
                    <strong className="text-white">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].deployment }} />
                  </li>
                  <li>
                    <strong className="text-white">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].outcome }} />
                  </li>
                  <li>
                    <strong className="text-white">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[1].financial }} />
                  </li>
                </ul>
              </div>

              {/* 03 Card */}
              <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2rem] p-8">
                <h5 className="text-xl font-bold mb-1">{t.sovereignAi.cards[2].num}. {t.sovereignAi.cards[2].title}</h5>
                <p className="text-xs font-mono text-sky-400 mb-6 uppercase tracking-wider">{t.sovereignAi.cards[2].subtitle}</p>
                <ul className="space-y-4 text-sm text-white/70">
                  <li>
                    <strong className="text-white">Deployment:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].deployment }} />
                  </li>
                  <li>
                    <strong className="text-white">The Outcome:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].outcome }} />
                  </li>
                  <li>
                    <strong className="text-white">Financial Impact:</strong> <span dangerouslySetInnerHTML={{ __html: t.sovereignAi.cards[2].financial }} />
                  </li>
                </ul>
              </div>
            </div>

            {/* Validation Phase */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="h-px bg-emerald-500 w-12" />
                <h3 className="text-sm font-mono font-bold text-emerald-500 tracking-widest uppercase">
                  {t.validationPhase.tag}
                </h3>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 justify-between shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                <div className="max-w-2xl">
                  <h4 className="text-2xl font-bold text-white mb-4">{t.validationPhase.title}</h4>
                  <p 
                    className="text-white/80 text-base leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: t.validationPhase.desc1 }}
                  />
                  <p className="text-white/80 text-base leading-relaxed">
                    {t.validationPhase.desc2}
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center md:items-start">
                  <Link href="/contact" className="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:-translate-y-1">
                    {t.validationPhase.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <p className="mt-4 text-[11px] text-emerald-500/80 font-medium tracking-wide">
                    {t.validationPhase.microcopy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core AI Capabilities */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px bg-brand-primary w-12" />
              <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t.coreAi.tag}
              </h3>
            </div>
            <h4 className="text-3xl font-bold mb-4">{t.coreAi.title}</h4>
            <p className="text-lg text-white/70 mb-10 max-w-3xl">{t.coreAi.subtitle}</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {t.coreAi.cards.map((card, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h5 className="text-lg font-bold mb-2">{card.title}</h5>
                  <p className="text-sm text-white/60">{card.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center bg-transparent border border-brand-primary hover:bg-brand-primary text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300">
              {t.coreAi.cta} <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="mt-3 text-xs text-white/40">{t.coreAi.microcopy}</p>
          </div>

          {/* Powered by Custom Code */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px bg-brand-primary w-12" />
              <h3 className="text-sm font-mono font-bold text-brand-primary tracking-widest uppercase">
                {t.poweredBy.tag}
              </h3>
            </div>
            <h4 className="text-3xl font-bold mb-4">{t.poweredBy.title}</h4>
            <p className="text-lg text-white/70 mb-12 max-w-3xl">{t.poweredBy.subtitle}</p>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h5 className="text-lg font-bold text-red-400 mb-2">{t.poweredBy.problem.title}</h5>
                  <p className="text-white/60 text-sm">{t.poweredBy.problem.desc}</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <h5 className="text-lg font-bold text-yellow-400 mb-2">{t.poweredBy.agitation.title}</h5>
                  <p 
                    className="text-white/60 text-sm"
                    dangerouslySetInnerHTML={{ __html: t.poweredBy.agitation.desc }}
                  />
                </div>
                <div className="bg-brand-primary/10 border border-brand-primary/30 p-6 rounded-2xl">
                  <h5 className="text-lg font-bold text-brand-primary mb-2">{t.poweredBy.solution.title}</h5>
                  <p 
                    className="text-white/80 text-sm"
                    dangerouslySetInnerHTML={{ __html: t.poweredBy.solution.desc }}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-8 pl-6 border-l-2 border-brand-primary/30">
                {t.poweredBy.benefits.map((benefit, idx) => (
                  <div key={idx}>
                    <h5 className="text-xl font-bold mb-2">{benefit.title}</h5>
                    <p 
                      className="text-white/60 text-sm"
                      dangerouslySetInnerHTML={{ __html: benefit.desc }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <TechStackSection />

      {/* SECTION 2: 3 PILLARS (GRID) */}
      <section className="py-24 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center mb-8">
                <Box className="w-7 h-7 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t.pillars[0].title}</h3>
              <p 
                className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8"
                dangerouslySetInnerHTML={{ __html: t.pillars[0].desc }}
              />
              <div className="flex flex-wrap gap-2 mb-8">
                {t.pillars[0].tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <Link href={t.pillars[0].link} className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-yellow-400/30 text-yellow-600 font-bold hover:bg-yellow-400 hover:text-white hover:border-yellow-400 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                {t.pillars[0].linkText} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col relative overflow-hidden border-b-4 border-b-brand-primary">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8">
                <Code className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t.pillars[1].title}</h3>
              <p 
                className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8"
                dangerouslySetInnerHTML={{ __html: t.pillars[1].desc }}
              />
              <div className="flex flex-wrap gap-2 mb-8">
                {t.pillars[1].tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <Link href={t.pillars[1].link} className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-brand-primary/30 text-brand-primary font-bold hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                {t.pillars[1].linkText} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl bg-white border border-brand-border p-8 shadow-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-brand-primary transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                <Database className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-brand-textPrimary mb-4">{t.pillars[2].title}</h3>
              <p 
                className="text-brand-textSecondary font-medium leading-relaxed flex-grow mb-8"
                dangerouslySetInnerHTML={{ __html: t.pillars[2].desc }}
              />
              <div className="flex flex-wrap gap-2 mb-8">
                {t.pillars[2].tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-[10px] font-bold uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <Link href={t.pillars[2].link} className="mt-auto inline-flex items-center justify-center w-full py-4 rounded-xl border-2 border-purple-500/30 text-purple-600 font-bold hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all gap-2 uppercase tracking-widest text-sm shadow-sm">
                {t.pillars[2].linkText} <ArrowRight className="w-4 h-4" />
              </Link>
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-xs font-mono font-bold text-brand-primary uppercase tracking-widest mb-4">
              {t.whoWeServe.tag}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">{t.whoWeServe.title}</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">{t.whoWeServe.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <HardHat className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">{t.whoWeServe.cards[0].title}</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  {t.whoWeServe.cards[0].boldDesc}
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  {t.whoWeServe.cards[0].desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                {t.whoWeServe.cards[0].tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Building2 className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">{t.whoWeServe.cards[1].title}</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  {t.whoWeServe.cards[1].boldDesc}
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  {t.whoWeServe.cards[1].desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                {t.whoWeServe.cards[1].tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-brand-border p-8 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-primary/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Factory className="w-7 h-7 text-brand-primary" />
                </div>
                <h3 className="text-xl font-bold text-brand-textPrimary mb-2">{t.whoWeServe.cards[2].title}</h3>
                <p className="text-xs font-bold text-brand-primary mb-4 leading-snug">
                  {t.whoWeServe.cards[2].boldDesc}
                </p>
                <p className="text-brand-textSecondary text-sm leading-relaxed font-medium mb-6">
                  {t.whoWeServe.cards[2].desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-brand-border/60">
                {t.whoWeServe.cards[2].tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-brand-surface text-brand-textPrimary text-[10px] font-mono font-bold uppercase">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROI METRICS */}
      <section className="relative py-24 bg-brand-surface border-b border-brand-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">{t.roiMetrics.title}</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">{t.roiMetrics.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-brand-border">
            {t.roiMetrics.metrics.map((metric, idx) => (
              <div key={idx} className="flex flex-col items-center pt-8 md:pt-0">
                <span className="text-5xl md:text-7xl font-black text-brand-textPrimary mb-4 tracking-tighter">{metric.value}</span>
                <span className="text-lg font-bold text-brand-primary uppercase tracking-wider mb-2">{metric.label}</span>
                <p className="text-brand-textSecondary font-medium">{metric.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FEATURED CASE STUDIES */}
      <section className="py-24 bg-brand-base border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">{t.caseStudies.title}</h2>
            <p className="text-lg text-brand-textSecondary max-w-2xl mx-auto font-medium">{t.caseStudies.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {t.caseStudies.items.map((item, idx) => (
              <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-lg border border-brand-border">
                <img src={item.image} alt="Case Study" className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">{item.title}</h3>
                  <Link href={item.link} className="inline-flex items-center gap-2 text-brand-primary font-bold hover:text-white transition group/link">
                    {t.caseStudies.linkText} <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ComplianceSection />

      {/* 9. FINAL CTA */}
      <section className="py-28 bg-brand-base border-y border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-12 tracking-tight leading-tight">
            {t.finalCta.title}
          </h2>
          <Link href="/contact#calculator" className="inline-flex items-center justify-center bg-brand-accent hover:bg-brand-accentHover text-white px-10 py-5 rounded-full text-lg font-bold transition-all duration-300 shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_50px_rgba(249,115,22,0.6)] hover:-translate-y-1">
            {t.finalCta.button}
          </Link>
        </div>
      </section>

    </div>
  );
}
