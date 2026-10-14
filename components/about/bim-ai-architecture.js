"use client";

import { useLanguage } from "@/lib/LanguageContext";
import EngineeringBackdrop from "@/components/ui/engineering-backdrop";
import { Building2, ShieldCheck, Terminal, Layers, HardDrive, Server, Code2 } from "lucide-react";

export default function BimAiArchitecture() {
  const { t } = useLanguage();

  return (
    <section id="bim-ai-architecture" className="scroll-mt-24 relative bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden text-brand-textPrimary font-sans">
      {/* Background Family A (Base / Architectural) */}
      <EngineeringBackdrop variant="base" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* HEADER BLOCK */}
        <div className="text-left mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-purple-500/25 dark:border-purple-500/30 bg-purple-500/10 dark:bg-purple-950/30 px-3.5 py-1.5 text-caption font-mono font-bold text-purple-700 dark:text-purple-300 mb-4 tracking-wider uppercase">
            <Terminal className="w-3.5 h-3.5" /> {t("about.team.ecosystem.badge")}
          </div>
          <h2 className="text-3xl sm:text-[34px] lg:text-section font-extrabold text-brand-textPrimary tracking-tight leading-[1.2] sm:leading-[1.2] lg:leading-[1.2] mb-4">
            {t("about.team.ecosystem.title")}
          </h2>
          <p className="text-[17px] sm:text-lead text-brand-textSecondary leading-relaxed">
            {t("about.team.ecosystem.subtitle")}
          </p>
        </div>

        {/* TOP ROW: CORE INFRASTRUCTURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* LEFT BLOCK */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.manifest_tag")}</span>
                </div>
                <Server className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h3 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">
                {t("about.team.ecosystem.manifest_title")}
              </h3>
              <div className="text-caption font-mono text-orange-600 dark:text-orange-400 font-bold mb-3">
                {t("about.team.ecosystem.manifest_subtitle")}
              </div>
              <p className="text-brand-textSecondary text-body-sm leading-relaxed mb-6">
                {t("about.team.ecosystem.manifest_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border flex items-center justify-between text-technical font-mono text-brand-textSecondary">
              <span>{t("about.team.ecosystem.manifest_status_label")}</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{t("about.team.ecosystem.manifest_status_val")}</span>
            </div>
          </div>

          {/* CENTER BLOCK */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-purple-700 dark:text-purple-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.hub_tag")}</span>
                </div>
                <Server className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h3 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">
                {t("about.team.ecosystem.hub_title")}
              </h3>
              <div className="text-caption font-mono text-purple-700 dark:text-purple-400 font-bold mb-3">
                {t("about.team.ecosystem.hub_subtitle")}
              </div>
              <p className="text-brand-textSecondary text-body-sm leading-relaxed mb-6">
                {t("about.team.ecosystem.hub_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border flex items-center justify-between text-technical font-mono text-brand-textSecondary">
              <span>{t("about.team.ecosystem.hub_loc_label")}</span>
              <span className="text-purple-700 dark:text-purple-400 font-bold">{t("about.team.ecosystem.hub_base_val")}</span>
            </div>
          </div>

          {/* RIGHT BLOCK */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.api_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h3 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">
                {t("about.team.ecosystem.api_title")}
              </h3>
              <div className="text-caption font-mono text-blue-700 dark:text-blue-400 font-bold mb-3">
                {t("about.team.ecosystem.api_subtitle")}
              </div>
              <p 
                className="text-brand-textSecondary text-body-sm leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.api_desc") }} 
              />
            </div>
            <div className="pt-4 border-t border-brand-border flex items-center justify-between text-technical font-mono text-brand-textSecondary">
              <span>{t("about.team.ecosystem.api_runtime_label")}</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">{t("about.team.ecosystem.api_mode_val")}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: DEPLOYMENT VECTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: LEFT */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <HardDrive className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v1_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h4 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">{t("about.team.ecosystem.v1_title")}</h4>
              <div className="text-caption font-mono text-emerald-700 dark:text-emerald-400 font-bold mb-3">
                {t("about.team.ecosystem.v1_subtitle")}
              </div>
              <p 
                className="text-body-sm text-brand-textSecondary leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.v1_desc") }}
              />
            </div>
            <div className="pt-4 border-t border-brand-border space-y-2 text-technical font-mono text-brand-textSecondary">
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v1_arch_label")}</span>
                <strong className="text-brand-textPrimary font-bold">{t("about.team.ecosystem.v1_arch_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v1_sov_label")}</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{t("about.team.ecosystem.v1_sov_val")}</strong>
              </div>
            </div>
          </div>

          {/* CARD 2: CENTER */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v2_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h4 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">{t("about.team.ecosystem.v2_title")}</h4>
              <div className="text-caption font-mono text-cyan-700 dark:text-cyan-400 font-bold mb-3">
                {t("about.team.ecosystem.v2_subtitle")}
              </div>
              <p className="text-body-sm text-brand-textSecondary leading-relaxed mb-6">
                {t("about.team.ecosystem.v2_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-brand-border space-y-2 text-technical font-mono text-brand-textSecondary">
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v2_comp_label")}</span>
                <strong className="text-brand-textPrimary font-bold">{t("about.team.ecosystem.v2_comp_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v2_net_label")}</span>
                <strong className="text-cyan-700 dark:text-cyan-400 font-bold">{t("about.team.ecosystem.v2_net_val")}</strong>
              </div>
            </div>
          </div>

          {/* CARD 3: RIGHT */}
          <div className="bg-brand-cardElevated border border-brand-border rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/40 dark:hover:border-slate-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 text-caption font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v3_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-brand-textSecondary group-hover:text-brand-textPrimary transition-colors" />
              </div>
              <h4 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-brand-textPrimary leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] tracking-tight mb-1">{t("about.team.ecosystem.v3_title")}</h4>
              <div className="text-caption font-mono text-fuchsia-700 dark:text-fuchsia-400 font-bold mb-3">
                {t("about.team.ecosystem.v3_subtitle")}
              </div>
              <p 
                className="text-body-sm text-brand-textSecondary leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.v3_desc") }} 
              />
            </div>
            <div className="pt-4 border-t border-brand-border space-y-2 text-technical font-mono text-brand-textSecondary">
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v3_gov_label")}</span>
                <strong className="text-brand-textPrimary font-bold">{t("about.team.ecosystem.v3_gov_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-textSecondary">{t("about.team.ecosystem.v3_audit_label")}</span>
                <strong className="text-purple-700 dark:text-purple-400 font-bold">{t("about.team.ecosystem.v3_audit_val")}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
