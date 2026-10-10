"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { Building2, ShieldCheck, Terminal, Layers, HardDrive, Server, Code2 } from "lucide-react";

export default function BimAiArchitecture() {
  const { t } = useLanguage();

  return (
    <section className="bg-white dark:bg-[#09090b] w-full border-t border-gray-200 dark:border-neutral-800 py-24 lg:py-32 overflow-hidden text-gray-700 dark:text-slate-300 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* HEADER BLOCK */}
        <div className="text-left mb-14 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-purple-200 dark:border-neutral-800 bg-purple-50 dark:bg-[#12141a] px-3.5 py-1.5 text-xs font-mono font-semibold text-purple-700 dark:text-purple-400 mb-4 tracking-wider">
            <Terminal className="w-3.5 h-3.5" /> {t("about.team.ecosystem.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            {t("about.team.ecosystem.title")}
          </h2>
          <p className="text-gray-600 dark:text-neutral-400 text-base md:text-lg font-mono leading-relaxed">
            {t("about.team.ecosystem.subtitle")}
          </p>
        </div>

        {/* TOP ROW: CORE INFRASTRUCTURE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          {/* LEFT BLOCK */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/80 via-blue-500/80 to-transparent" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Terminal className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.manifest_tag")}</span>
                </div>
                <Server className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t("about.team.ecosystem.manifest_title")}
              </h3>
              <div className="text-xs font-mono text-orange-600 dark:text-orange-400 font-semibold mb-3">
                System Architecture
              </div>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                {t("about.team.ecosystem.manifest_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-neutral-500">
              <span>{t("about.team.ecosystem.manifest_status_label")}</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{t("about.team.ecosystem.manifest_status_val")}</span>
            </div>
          </div>

          {/* CENTER BLOCK */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-purple-700 dark:text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.hub_tag")}</span>
                </div>
                <Server className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t("about.team.ecosystem.hub_title")}
              </h3>
              <div className="text-xs font-mono text-purple-700 dark:text-purple-400 font-semibold mb-3">
                {t("about.team.ecosystem.hub_subtitle")}
              </div>
              <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
                {t("about.team.ecosystem.hub_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-neutral-500">
              <span>{t("about.team.ecosystem.hub_loc_label")}</span>
              <span className="text-purple-700 dark:text-purple-400 font-semibold">{t("about.team.ecosystem.hub_base_val")}</span>
            </div>
          </div>

          {/* RIGHT BLOCK */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-blue-700 dark:text-blue-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.api_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {t("about.team.ecosystem.api_title")}
              </h3>
              <div className="text-xs font-mono text-blue-700 dark:text-blue-400 font-semibold mb-3">
                {t("about.team.ecosystem.api_subtitle")}
              </div>
              <p 
                className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed mb-6" 
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.api_desc") }} 
              />
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-gray-500 dark:text-neutral-500">
              <span>{t("about.team.ecosystem.api_runtime_label")}</span>
              <span className="text-blue-700 dark:text-blue-400 font-semibold">{t("about.team.ecosystem.api_mode_val")}</span>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: DEPLOYMENT VECTORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CARD 1: LEFT */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <HardDrive className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v1_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("about.team.ecosystem.v1_title")}</h4>
              <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold mb-3">
                {t("about.team.ecosystem.v1_subtitle")}
              </div>
              <p 
                className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.v1_desc") }}
              />
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 space-y-2 text-xs font-mono text-gray-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v1_arch_label")}</span>
                <strong className="text-gray-900 dark:text-neutral-200 font-semibold">{t("about.team.ecosystem.v1_arch_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v1_sov_label")}</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{t("about.team.ecosystem.v1_sov_val")}</strong>
              </div>
            </div>
          </div>

          {/* CARD 2: CENTER */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Server className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v2_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("about.team.ecosystem.v2_title")}</h4>
              <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-semibold mb-3">
                {t("about.team.ecosystem.v2_subtitle")}
              </div>
              <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-6">
                {t("about.team.ecosystem.v2_desc")}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 space-y-2 text-xs font-mono text-gray-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v2_comp_label")}</span>
                <strong className="text-gray-900 dark:text-neutral-200 font-semibold">{t("about.team.ecosystem.v2_comp_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v2_net_label")}</span>
                <strong className="text-cyan-700 dark:text-cyan-400 font-semibold">{t("about.team.ecosystem.v2_net_val")}</strong>
              </div>
            </div>
          </div>

          {/* CARD 3: RIGHT */}
          <div className="bg-gray-50/90 dark:bg-[#111318] border border-gray-200 dark:border-neutral-800 rounded-xl p-7 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-neutral-700 transition-all shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 text-fuchsia-600 dark:text-fuchsia-400 text-xs font-mono font-semibold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("about.team.ecosystem.v3_tag")}</span>
                </div>
                <Layers className="w-4 h-4 text-gray-400 dark:text-neutral-600 group-hover:text-gray-600 dark:group-hover:text-neutral-400 transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{t("about.team.ecosystem.v3_title")}</h4>
              <div className="text-xs font-mono text-fuchsia-700 dark:text-fuchsia-400 font-semibold mb-3">
                {t("about.team.ecosystem.v3_subtitle")}
              </div>
              <p 
                className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed mb-6" 
                dangerouslySetInnerHTML={{ __html: t("about.team.ecosystem.v3_desc") }} 
              />
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-neutral-800/80 space-y-2 text-xs font-mono text-gray-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v3_gov_label")}</span>
                <strong className="text-gray-900 dark:text-neutral-200 font-semibold">{t("about.team.ecosystem.v3_gov_val")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-neutral-500">{t("about.team.ecosystem.v3_audit_label")}</span>
                <strong className="text-purple-700 dark:text-purple-400 font-semibold">{t("about.team.ecosystem.v3_audit_val")}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
