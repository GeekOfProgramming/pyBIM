"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import {
  Layers,
  GitMerge,
  ShieldCheck,
  FileCheck,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  PackageCheck,
  Sparkles
} from "lucide-react";

const SERVICE_ICONS = {
  modeling_development: Layers,
  coordination_clash: GitMerge,
  model_qa_validation: ShieldCheck,
  documentation_delivery: FileCheck,
};

export default function ParadigmShift() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).paradigmShift;
  const services = data.services || [];

  // Active service selection (default: first service)
  const [activeServiceId, setActiveServiceId] = useState(
    services[0]?.id || "modeling_development"
  );

  const activeService =
    services.find((s) => s.id === activeServiceId) || services[0];
  const ActiveIcon = SERVICE_ICONS[activeService?.id] || Layers;

  return (
    <section className="relative py-20 md:py-28 lg:py-32 px-6 lg:px-8 w-full bg-brand-surface text-brand-textPrimary border-b border-brand-border overflow-hidden">
      {/* Family B — Digital Intelligence Surface Background */}
      <EngineeringBackdrop variant="home-surface" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Left-aligned editorial layout) */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-wider mb-5 shadow-xs select-none">
            <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
            <span>{data.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-[34px] lg:text-section font-extrabold text-brand-textPrimary tracking-tight leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] mb-5">
            {data.section_title}
          </h2>

          <p className="text-brand-textSecondary text-[17px] sm:text-lead font-normal leading-relaxed mb-4">
            {data.section_subtitle}
          </p>

          {data.supporting_positioning && (
            <div className="inline-flex items-center gap-2 text-caption font-mono text-brand-primary">
              <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{data.supporting_positioning}</span>
            </div>
          )}
        </div>

        {/* =========================================================================
            DESKTOP WORKBENCH (md:grid 5/12 + 7/12)
            ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-10 items-start mb-14">

          {/* Left Column: 5/12 — Service Selector List */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={data.section_title}
            className="md:col-span-5 flex flex-col gap-3"
          >
            {services.map((service) => {
              const isSelected = service.id === activeServiceId;
              const Icon = SERVICE_ICONS[service.id] || Layers;

              return (
                <button
                  key={service.id}
                  id={`tab-${service.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  aria-controls={`tabpanel-${service.id}`}
                  onClick={() => setActiveServiceId(service.id)}
                  className={`group relative flex items-center justify-between p-4 lg:p-5 rounded-2xl border text-left transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-surface ${
                    isSelected
                      ? "bg-brand-cardElevated border-brand-primary shadow-md shadow-brand-primary/5 text-brand-textPrimary"
                      : "bg-brand-card/70 hover:bg-brand-card border-brand-border/80 hover:border-brand-border text-brand-textSecondary hover:text-brand-textPrimary"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors shrink-0 ${
                        isSelected
                          ? "bg-brand-actionPrimary text-brand-actionOnPrimary shadow-xs"
                          : "bg-brand-surface text-brand-textSecondary group-hover:text-brand-primary border border-brand-border/60"
                      }`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <span
                        className={`block font-sans font-semibold text-body-sm transition-colors ${
                          isSelected
                            ? "text-brand-textPrimary font-bold"
                            : "text-brand-textSecondary group-hover:text-brand-textPrimary"
                        }`}
                      >
                        {service.title}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                      isSelected
                        ? "text-brand-primary translate-x-0.5"
                        : "text-brand-textSecondary/50 group-hover:text-brand-textSecondary"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: 7/12 — Single Elevated Service Detail Panel */}
          {activeService && (
            <div
              id={`tabpanel-${activeService.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeService.id}`}
              className="md:col-span-7 rounded-2xl lg:rounded-3xl border border-brand-border/80 bg-brand-cardElevated p-7 sm:p-9 lg:p-10 shadow-xl backdrop-blur-sm transition-all"
            >
              {/* Detail Header */}
              <div className="flex items-start gap-4 pb-6 mb-6 border-b border-brand-border/80">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary shrink-0 border border-brand-primary/20">
                  <ActiveIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-[22px] lg:text-card-title font-extrabold text-brand-textPrimary tracking-tight mb-2">
                    {activeService.title}
                  </h3>
                  <p className="text-body text-brand-textSecondary leading-relaxed">
                    {activeService.description}
                  </p>
                </div>
              </div>

              {/* Two-Column Structured Scope & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-2">

                {/* Scope Column */}
                <div>
                  <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-brand-border/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" aria-hidden="true" />
                    <h4 className="font-mono text-caption font-bold text-brand-textPrimary tracking-wider uppercase">
                      {data.scope_heading || "Typical Scope"}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeService.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-body-sm text-brand-textSecondary leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/70 shrink-0 mt-2" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Column */}
                <div>
                  <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-brand-border/60">
                    <PackageCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                    <h4 className="font-mono text-caption font-bold text-brand-textPrimary tracking-wider uppercase">
                      {data.deliverables_heading || "Typical Deliverables"}
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {activeService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-body-sm text-brand-textSecondary leading-normal">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shrink-0 mt-2" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* =========================================================================
            MOBILE ACCORDION (md:hidden single-column expand/collapse)
            ========================================================================= */}
        <div className="md:hidden flex flex-col gap-3 mb-12">
          {services.map((service) => {
            const isExpanded = service.id === activeServiceId;
            const Icon = SERVICE_ICONS[service.id] || Layers;

            return (
              <div
                key={service.id}
                className="rounded-2xl border border-brand-border/80 bg-brand-cardElevated overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  id={`accordion-btn-${service.id}`}
                  aria-expanded={isExpanded}
                  aria-controls={`accordion-panel-${service.id}`}
                  onClick={() =>
                    setActiveServiceId(isExpanded ? "" : service.id)
                  }
                  className="w-full flex items-center justify-between p-4.5 text-left select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-actionPrimary"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${
                        isExpanded
                          ? "bg-brand-actionPrimary text-brand-actionOnPrimary"
                          : "bg-brand-surface text-brand-textSecondary border border-brand-border/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span
                      className={`font-sans text-body-sm font-semibold ${
                        isExpanded ? "text-brand-textPrimary font-bold" : "text-brand-textSecondary"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-brand-textSecondary transition-transform duration-200 shrink-0 ${
                      isExpanded ? "rotate-180 text-brand-primary" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isExpanded && (
                  <div
                    id={`accordion-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`accordion-btn-${service.id}`}
                    className="px-5 pb-6 pt-1 border-t border-brand-border/60 animate-in fade-in duration-150"
                  >
                    <p className="text-body-sm text-brand-textSecondary leading-relaxed mb-5">
                      {service.description}
                    </p>

                    <div className="space-y-5">
                      {/* Mobile Scope */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-brand-border/60">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                          <h4 className="font-mono text-caption font-bold text-brand-textPrimary tracking-wider uppercase">
                            {data.scope_heading || "Typical Scope"}
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {service.scope.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-body-sm text-brand-textSecondary leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/70 shrink-0 mt-2" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Mobile Deliverables */}
                      <div>
                        <div className="flex items-center gap-2 mb-2.5 pb-1.5 border-b border-brand-border/60">
                          <PackageCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                          <h4 className="font-mono text-caption font-bold text-brand-textPrimary tracking-wider uppercase">
                            {data.deliverables_heading || "Typical Deliverables"}
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          {service.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-body-sm text-brand-textSecondary leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shrink-0 mt-2" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
