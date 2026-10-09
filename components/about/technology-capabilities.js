"use client";

import { useState, useId, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { CATALOGUE_PILLARS } from "@/lib/data/about-tech-catalogue";
import { 
  Layers, 
  Terminal, 
  Shield, 
  Code2, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  Cpu,
  Database,
  Search,
  Sparkles,
  Info
} from "lucide-react";

/**
 * TechnologyCapabilities Component (Section 04 - Tech Stack & Standards)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Task A04 — Three-Pillar Technical Catalogue Redesign
 * 
 * Architecture:
 * - 3 Primary Pillars:
 *   1. 01. BIM Execution & Delivery (5 Service Families, 55 Service Headings)
 *   2. 02. Custom Code & Plugins (6 Tech Families: Languages, APIs, Backend, Frontend, Data/AI, Integration)
 *   3. 03. Sovereign AI & Compliance (6 Reference Families: ISO/UNI, Italian Regulations, OpenBIM, Handover, Classification, Local AI Research)
 * - Progressive Disclosure:
 *   - 3 prominent, aligned overview cards on top.
 *   - 1 shared full-width details panel beneath with smooth, finite transitions.
 * - Engineering Background Family A: variant="base" (#FFFFFF light / #080C14 dark)
 * - Complete localization in EN, IT, DE with semantic typography and keyboard accessibility.
 */
export default function TechnologyCapabilities() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionId = useId();

  // Selected State: default to Pillar 01, Family 01 (BIM Consulting)
  const [selectedPillarId, setSelectedPillarId] = useState("bim-delivery");
  const [selectedFamilyId, setSelectedFamilyId] = useState("bim-consulting");

  // Lookup active pillar & family
  const activePillar = useMemo(() => {
    return CATALOGUE_PILLARS.find((p) => p.id === selectedPillarId) || CATALOGUE_PILLARS[0];
  }, [selectedPillarId]);

  const activeFamily = useMemo(() => {
    return activePillar.families.find((f) => f.id === selectedFamilyId) || activePillar.families[0];
  }, [activePillar, selectedFamilyId]);

  // Handler to select family
  const handleSelectFamily = (pillarId, familyId) => {
    setSelectedPillarId(pillarId);
    setSelectedFamilyId(familyId);
  };

  // Icon map
  const pillarIcons = {
    Layers: <Layers className="w-5 h-5" aria-hidden="true" />,
    Terminal: <Terminal className="w-5 h-5" aria-hidden="true" />,
    Shield: <Shield className="w-5 h-5" aria-hidden="true" />,
  };

  // Tone styling map
  const getPillarColorClasses = (pillarId, isSelected) => {
    switch (pillarId) {
      case "bim-delivery":
        return {
          badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
          activeBorder: "border-emerald-500/60 shadow-[0_0_35px_-8px_rgba(16,185,129,0.22)]",
          indicator: "bg-emerald-500",
          itemHover: "hover:border-emerald-500/40 hover:bg-emerald-500/5",
          selectedBg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border-emerald-500/50",
          accentText: "text-emerald-600 dark:text-emerald-400",
          noticeBorder: "border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/15 text-emerald-800 dark:text-emerald-300",
        };
      case "development":
        return {
          badge: "bg-brand-primary/10 text-brand-primary dark:text-blue-400 border-brand-primary/25",
          activeBorder: "border-brand-primary/60 shadow-[0_0_35px_-8px_rgba(37,99,235,0.22)]",
          indicator: "bg-brand-primary",
          itemHover: "hover:border-brand-primary/40 hover:bg-brand-primary/5",
          selectedBg: "bg-brand-primary/10 dark:bg-blue-950/30 text-brand-primary dark:text-blue-200 border-brand-primary/50",
          accentText: "text-brand-primary dark:text-blue-400",
          noticeBorder: "border-brand-primary/20 bg-brand-primary/[0.04] dark:bg-blue-950/15 text-slate-800 dark:text-slate-300",
        };
      case "standards":
      default:
        return {
          badge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/25",
          activeBorder: "border-indigo-500/60 shadow-[0_0_35px_-8px_rgba(99,102,241,0.22)]",
          indicator: "bg-indigo-500",
          itemHover: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
          selectedBg: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 border-indigo-500/50",
          accentText: "text-indigo-600 dark:text-indigo-400",
          noticeBorder: "border-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/15 text-slate-800 dark:text-slate-300",
        };
    }
  };

  const activeColorClasses = getPillarColorClasses(activePillar.id, true);

  // Active items array from localization
  const rawItems = t(activeFamily.itemsKey);
  const activeItemsList = Array.isArray(rawItems) ? rawItems : [];

  return (
    <section
      id="tech-stack"
      className="relative w-full py-24 lg:py-32 bg-brand-base border-b border-brand-border overflow-hidden"
      aria-labelledby={`${sectionId}-heading`}
    >
      {/* Background Family A (Base / Architectural) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Editorial Introduction                    */}
        {/* ========================================================= */}
        <motion.div
          className="max-w-3xl mb-14 lg:mb-18"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px bg-brand-primary w-8 sm:w-12" aria-hidden="true" />
            <span className="text-xs font-mono font-bold text-brand-primary tracking-widest uppercase">
              {t("about.tech.section_eyebrow")}
            </span>
          </div>

          <h2
            id={`${sectionId}-heading`}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-textPrimary leading-tight mb-5"
          >
            {t("about.tech.section_title")}
          </h2>

          <p className="text-base sm:text-lg text-brand-textSecondary leading-relaxed">
            {t("about.tech.section_subtitle")}
          </p>
        </motion.div>

        {/* ========================================================= */}
        {/* THREE-PILLAR OVERVIEW CARDS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-10 items-stretch">
          {CATALOGUE_PILLARS.map((pillar, pIdx) => {
            const isPillarSelected = selectedPillarId === pillar.id;
            const colors = getPillarColorClasses(pillar.id, isPillarSelected);

            return (
              <motion.div
                key={pillar.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: shouldReduceMotion ? 0 : pIdx * 0.09,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 backdrop-blur-md ${
                  isPillarSelected
                    ? `bg-white dark:bg-slate-900 ${colors.activeBorder}`
                    : "bg-white/75 dark:bg-slate-900/75 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                {/* Pillar Header & Metadata */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${colors.badge}`}>
                        {pillarIcons[pillar.icon]}
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-brand-textSecondary uppercase">
                        {t(pillar.tagKey)}
                      </span>
                    </div>

                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase border ${colors.badge}`}>
                      {t(pillar.statusKey)}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-brand-textPrimary tracking-tight mb-2">
                    {t(pillar.titleKey)}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-textSecondary leading-relaxed mb-6">
                    {t(pillar.subKey)}
                  </p>
                </div>

                {/* Subordinate Category Selectors */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold tracking-wider text-brand-textSecondary/80 uppercase mb-2">
                    {t("about.tech.detail_eyebrow")} ({pillar.families.length})
                  </div>

                  {pillar.families.map((family) => {
                    const isFamilyActive = isPillarSelected && selectedFamilyId === family.id;

                    return (
                      <button
                        key={family.id}
                        type="button"
                        onClick={() => handleSelectFamily(pillar.id, family.id)}
                        className={`w-full group text-left px-3 py-2.5 rounded-xl border text-xs font-mono transition-all duration-200 flex items-center justify-between ${
                          isFamilyActive
                            ? `${colors.selectedBg} font-bold shadow-xs`
                            : "border-transparent bg-slate-50/70 dark:bg-slate-800/40 text-brand-textSecondary hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-brand-textPrimary"
                        }`}
                        aria-pressed={isFamilyActive}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <span className={`font-mono text-[11px] ${isFamilyActive ? colors.accentText : "text-brand-textSecondary/70"}`}>
                            {family.num}
                          </span>
                          <span className="truncate">
                            {t(family.titleKey)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono opacity-60">
                            {family.itemCount}
                          </span>
                          <ChevronRight 
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isFamilyActive ? "translate-x-0.5 text-current" : "text-brand-textSecondary/50 group-hover:translate-x-0.5"
                            }`} 
                            aria-hidden="true" 
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* SHARED FULL-WIDTH DETAILS PANEL (PROGRESSIVE DISCLOSURE)  */}
        {/* ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedPillarId}-${selectedFamilyId}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-3xl border ${activeColorClasses.activeBorder} bg-white dark:bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden`}
            role="region"
            aria-live="polite"
            aria-label={`${t(activePillar.titleKey)} — ${t(activeFamily.titleKey)}`}
          >
            {/* Top Status & Family Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80 dark:border-slate-800/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-primary uppercase">
                    {t(activePillar.tagKey)}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">/</span>
                  <span className="text-xs font-mono font-bold text-brand-textSecondary uppercase">
                    {activeFamily.num} {t(activeFamily.titleKey)}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-brand-textPrimary tracking-tight">
                  {t(activeFamily.titleKey)}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${activeColorClasses.badge}`}>
                  {t(activePillar.statusKey)}
                </span>
                <span className="text-xs font-mono text-brand-textSecondary">
                  {activeItemsList.length} Headings
                </span>
              </div>
            </div>

            {/* Context Narrative */}
            <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed max-w-4xl mb-8">
              {t(activeFamily.descKey)}
            </p>

            {/* Responsive Headings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 mb-8">
              {activeItemsList.map((itemTitle, itemIdx) => (
                <div
                  key={itemIdx}
                  className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-800/40 p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:bg-white dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
                >
                  <div className={`mt-0.5 rounded-full p-1 shrink-0 ${activeColorClasses.badge}`}>
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs sm:text-sm font-semibold text-brand-textPrimary leading-snug block">
                      {itemTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Operational Notice Footer */}
            <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono rounded-xl p-3.5 ${activeColorClasses.noticeBorder}`}>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 opacity-80" aria-hidden="true" />
                <span>
                  {activePillar.id === "bim-delivery" && t("about.tech.detail_notice_p1")}
                  {activePillar.id === "development" && t("about.tech.detail_notice_p2")}
                  {activePillar.id === "standards" && t("about.tech.detail_notice_p3")}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-brand-textSecondary shrink-0 sm:text-right">
                pyBIM Technical Catalogue v2
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
