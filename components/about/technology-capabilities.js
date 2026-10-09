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
  ChevronRight, 
  CheckCircle2, 
  FileCode2,
  FileCheck2,
  Info
} from "lucide-react";

/**
 * TechnologyCapabilities Component (Section 04 - Tech Stack & Standards)
 * 
 * pyBIM Design System v2 — Engineering Precision
 * Task A04-R1 — Precision Alignment & Accessibility Refinement
 * 
 * Architecture:
 * - 3 Primary Pillars:
 *   1. 01. BIM Execution & Delivery (5 Service Families, exactly 55 Service Headings)
 *   2. 02. Custom Code & Plugins (6 Tech Families, 25 Technology & Framework Identifiers)
 *   3. 03. Sovereign AI & Compliance (6 Reference Families, 23 Standards & Research Topics)
 * - Synchronized Multi-Row Layout:
 *   - Semantic regions aligned horizontally across all 3 cards at desktop:
 *     Row 1: Header metadata (icon, pillar identifier, and wrapped status badge)
 *     Row 2: Main pillar title (20-22px font-bold)
 *     Row 3: Concise description (14-15px text-brand-textSecondary)
 *     Row 4: Divider & Family Specifications label (strictly synchronized baseline)
 *     Row 5: Interactive Category Selectors (min 44px touch target, natural wrap, no truncate)
 * - Semantic Item Icons in Details Panel:
 *   - Pillar 01: CheckCircle2 (verified engineering project deliverables)
 *   - Pillar 02: FileCode2 (development technologies, APIs & code modules)
 *   - Pillar 03: FileCheck2 (regulatory standards, specifications & research topics)
 * - Engineering Background Family A: variant="base" (#FFFFFF light / #080C14 dark)
 * - 100% data preservation and full EN, IT, DE parity.
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

  // Pillar Icon Map
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

  // Semantic icon for detail items based on active pillar
  const renderItemIcon = (pillarId) => {
    switch (pillarId) {
      case "bim-delivery":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />;
      case "development":
        return <FileCode2 className="w-4 h-4 text-brand-primary dark:text-blue-400" aria-hidden="true" />;
      case "standards":
      default:
        return <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />;
    }
  };

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
          className="max-w-3xl mb-14 lg:mb-16"
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
        {/* THREE-PILLAR OVERVIEW CARDS (SYNCHRONIZED INTERNAL ROWS)   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mb-12 items-stretch">
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
                className={`relative rounded-2xl border transition-all duration-300 p-6 sm:p-7 backdrop-blur-md flex flex-col ${
                  isPillarSelected
                    ? `bg-white dark:bg-slate-900 ${colors.activeBorder}`
                    : "bg-white/75 dark:bg-slate-900/75 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                }`}
              >
                {/* 1. Header Metadata Row: Fixed height min-h-[48px] for clean baseline alignment */}
                <div className="flex items-start justify-between gap-3 min-h-[48px] mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${colors.badge}`}>
                      {pillarIcons[pillar.icon]}
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-brand-textSecondary uppercase">
                      {t(pillar.tagKey)}
                    </span>
                  </div>

                  <span className={`inline-flex items-center text-center px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase border shrink-0 ${colors.badge}`}>
                    {t(pillar.statusKey)}
                  </span>
                </div>

                {/* 2. Main Pillar Title: Synchronized 20-22px heading with min-h for multi-line parity */}
                <div className="min-h-[58px] sm:min-h-[64px] flex items-center mb-2">
                  <h3 className="text-lg sm:text-[21px] font-bold text-brand-textPrimary tracking-tight leading-snug">
                    {t(pillar.titleKey)}
                  </h3>
                </div>

                {/* 3. Short Description: Synchronized 14-15px text with consistent vertical track */}
                <div className="min-h-[68px] sm:min-h-[72px] mb-6">
                  <p className="text-sm text-brand-textSecondary leading-relaxed">
                    {t(pillar.subKey)}
                  </p>
                </div>

                {/* 4. Category Divider & Family Specifications Label */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 mb-3 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider text-brand-textSecondary uppercase">
                    {t("about.tech.detail_eyebrow")}
                  </span>
                  <span className="text-xs font-mono font-semibold text-brand-textSecondary/80">
                    ({pillar.families.length})
                  </span>
                </div>

                {/* 5. Subordinate Category Selectors Area */}
                <div className="flex-1 flex flex-col justify-start space-y-2">
                  {pillar.families.map((family) => {
                    const isFamilyActive = isPillarSelected && selectedFamilyId === family.id;

                    return (
                      <button
                        key={family.id}
                        type="button"
                        onClick={() => handleSelectFamily(pillar.id, family.id)}
                        className={`w-full group text-left px-3.5 py-3 rounded-xl border font-mono transition-all duration-200 flex items-center justify-between min-h-[44px] focus:outline-hidden focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                          isFamilyActive
                            ? `${colors.selectedBg} font-bold shadow-sm`
                            : "border-transparent bg-slate-50/70 dark:bg-slate-800/40 text-brand-textSecondary hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-brand-textPrimary"
                        }`}
                        aria-pressed={isFamilyActive}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <span className={`text-xs font-mono font-semibold shrink-0 ${isFamilyActive ? colors.accentText : "text-brand-textSecondary/70"}`}>
                            {family.num}
                          </span>
                          <span className="text-sm font-sans font-medium text-brand-textPrimary leading-snug break-words">
                            {t(family.titleKey)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-brand-textSecondary/80 tabular-nums">
                            {family.itemCount}
                          </span>
                          <ChevronRight 
                            className={`w-4 h-4 transition-transform duration-200 ${
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
                  {activeItemsList.length} {t("about.tech.headings_count")}
                </span>
              </div>
            </div>

            {/* Context Narrative */}
            <p className="text-sm sm:text-base text-brand-textSecondary leading-relaxed max-w-4xl mb-8">
              {t(activeFamily.descKey)}
            </p>

            {/* Responsive Headings Grid with Semantic Iconography */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 mb-8">
              {activeItemsList.map((itemTitle, itemIdx) => (
                <div
                  key={itemIdx}
                  className="rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-slate-50/60 dark:bg-slate-800/40 p-3.5 sm:p-4 flex items-start gap-3 transition-colors hover:bg-white dark:hover:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                >
                  <div className={`mt-0.5 rounded-lg p-1.5 shrink-0 ${activeColorClasses.badge}`}>
                    {renderItemIcon(activePillar.id)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-brand-textPrimary leading-snug block">
                      {itemTitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Factual Operational Notice Footer */}
            <div className={`flex items-start sm:items-center gap-3 text-xs font-mono rounded-xl p-3.5 border ${activeColorClasses.noticeBorder}`}>
              <Info className="w-4 h-4 shrink-0 opacity-80 mt-0.5 sm:mt-0" aria-hidden="true" />
              <p className="leading-relaxed">
                {activePillar.id === "bim-delivery" && t("about.tech.detail_notice_p1")}
                {activePillar.id === "development" && t("about.tech.detail_notice_p2")}
                {activePillar.id === "standards" && t("about.tech.detail_notice_p3")}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
