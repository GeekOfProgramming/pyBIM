"use client";

import { useLanguage } from "@/lib/LanguageContext";
import homeData from "@/lib/data/home.json";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import CtaLink from "@/components/ui/cta-link";
import { Layers, ShieldCheck, GitMerge, FileCheck } from "lucide-react";

export default function HeroSection() {
  const { language } = useLanguage();
  const data = (homeData[language] || homeData.en).hero;
  const schematic = data.schematic || (homeData.en).hero.schematic;

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 px-6 lg:px-8 w-full bg-brand-base text-brand-textPrimary overflow-hidden border-b border-brand-border">
      {/* Family A — Base Background */}
      <EngineeringBackdrop variant="base" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">

          {/* Left Column: 7/12 — Primary Messaging & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Technical Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-caption font-bold tracking-wider mb-6 shadow-xs select-none">
              <span className="w-2 h-2 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>{data.badge}</span>
            </div>

            {/* Semantic Single H1 */}
            <h1 className="text-display font-extrabold text-brand-textPrimary tracking-tight mb-6">
              {data.title_main}{" "}
              <span className="text-brand-primary block sm:inline">
                {data.title_highlight}
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-brand-textSecondary text-lead font-normal leading-relaxed max-w-2xl mb-8">
              {data.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <CtaLink href="/contact#audit" variant="primary">
                {data.cta_primary}
              </CtaLink>

              <CtaLink href="/services" variant="secondary">
                {data.cta_secondary}
              </CtaLink>
            </div>

            {/* Restrained Capability Line */}
            {data.capability_line && (
              <div className="pt-4 border-t border-brand-border/70 w-full max-w-xl">
                <p className="font-mono text-technical text-brand-textSecondary/80 tracking-wide uppercase">
                  {data.capability_line}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: 5/12 — Abstract BIM Engineering Schematic */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl lg:rounded-3xl border border-brand-border/80 bg-brand-cardElevated/80 dark:bg-slate-900/70 p-6 sm:p-7 shadow-xl backdrop-blur-sm overflow-hidden">

              {/* Card Header & Technical Identifier */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-brand-border/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  <span className="font-mono text-caption font-bold text-brand-textPrimary tracking-wider uppercase">
                    {schematic.badge}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-brand-textSecondary tracking-widest uppercase">
                  {schematic.tag}
                </span>
              </div>

              {/* Schematic Workflow Nodes */}
              <div className="space-y-3.5">
                {/* Node 1: Modeling & Parameter Development */}
                <div className="rounded-xl border border-brand-border/60 bg-brand-surface/60 dark:bg-slate-950/50 p-4 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-brand-primary">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-bold text-body-sm text-brand-textPrimary">
                        {schematic.node1_title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-brand-primary font-semibold">
                      {schematic.node1_badge}
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary pl-9 text-xs leading-relaxed">
                    {schematic.node1_desc}
                  </p>
                </div>

                {/* Node 2: Multi-Model Coordination & Clash Mitigation */}
                <div className="rounded-xl border border-brand-border/60 bg-brand-surface/60 dark:bg-slate-950/50 p-4 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <GitMerge className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-bold text-body-sm text-brand-textPrimary">
                        {schematic.node2_title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                      {schematic.node2_badge}
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary pl-9 text-xs leading-relaxed">
                    {schematic.node2_desc}
                  </p>
                </div>

                {/* Node 3: Quality Assurance & Digital Delivery */}
                <div className="rounded-xl border border-brand-border/60 bg-brand-surface/60 dark:bg-slate-950/50 p-4 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-sans font-bold text-body-sm text-brand-textPrimary">
                        {schematic.node3_title}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      {schematic.node3_badge}
                    </span>
                  </div>
                  <p className="text-body-sm text-brand-textSecondary pl-9 text-xs leading-relaxed">
                    {schematic.node3_desc}
                  </p>
                </div>
              </div>

              {/* Schematic Footer / Status Bar */}
              <div className="mt-4 pt-3.5 border-t border-brand-border/70 flex items-center justify-between text-[11px] font-mono text-brand-textSecondary">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{schematic.footer_label}</span>
                </span>
                <span className="text-brand-textPrimary font-semibold">
                  {schematic.footer_val}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
