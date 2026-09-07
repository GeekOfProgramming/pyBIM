"use client";

import { 
  Cpu, 
  Server, 
  LifeBuoy, 
  ShieldCheck, 
  Clock, 
  Terminal 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function DashboardClient() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-2">
            {t("portal.dashboard.status")}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t("portal.dashboard.title")}
          </h1>
          <p className="text-neutral-400 text-sm font-mono mt-1">
            {t("portal.dashboard.subtitle")}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-400 bg-[#12141a] px-3.5 py-2 rounded-lg border border-neutral-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t("portal.dashboard.sync_badge")}</span>
        </div>
      </div>
      
      {/* Primary Read-Only Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: System Resource Allocation */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              {t("portal.dashboard.compute_tag")}
            </span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {t("portal.dashboard.compute_val")}
          </div>
          <div className="text-xs font-mono text-purple-400 font-semibold mb-4">
            {t("portal.dashboard.compute_title")}
          </div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.compute_vram_label")}</span>
              <span className="text-neutral-200">{t("portal.dashboard.compute_vram_val")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.compute_bw_label")}</span>
              <span className="text-neutral-200">{t("portal.dashboard.compute_bw_val")}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Computational Nodes */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              {t("portal.dashboard.hardware_tag")}
            </span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {t("portal.dashboard.hardware_val")}
          </div>
          <div className="text-xs font-mono text-emerald-400 font-semibold mb-4">
            {t("portal.dashboard.hardware_title")}
          </div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.hardware_edge_label")}</span>
              <span className="text-emerald-400">{t("portal.dashboard.hardware_edge_val")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.hardware_cloud_label")}</span>
              <span className="text-emerald-400">{t("portal.dashboard.hardware_cloud_val")}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Open Support Tickets */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
              {t("portal.dashboard.support_tag")}
            </span>
            <LifeBuoy className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {t("portal.dashboard.support_val")}
          </div>
          <div className="text-xs font-mono text-cyan-400 font-semibold mb-4">
            {t("portal.dashboard.support_title")}
          </div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.support_sla_label")}</span>
              <span className="text-neutral-200">{t("portal.dashboard.support_sla_val")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{t("portal.dashboard.support_resolved_label")}</span>
              <span className="text-neutral-200">{t("portal.dashboard.support_resolved_val")}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Read-Only Telemetry & Security Manifest */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Operational Telemetry Feed */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {t("portal.dashboard.telemetry_title")}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              {t("portal.dashboard.telemetry_read_only")}
            </span>
          </div>
          
          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">{t("portal.dashboard.telemetry_item_1_time")}</span>{" "}
                <span className="text-emerald-400 font-semibold">{t("portal.dashboard.telemetry_item_1_tag")}</span>{" "}
                <span className="text-neutral-300">{t("portal.dashboard.telemetry_item_1_msg")}</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">{t("portal.dashboard.telemetry_item_2_time")}</span>{" "}
                <span className="text-cyan-400 font-semibold">{t("portal.dashboard.telemetry_item_2_tag")}</span>{" "}
                <span className="text-neutral-300">{t("portal.dashboard.telemetry_item_2_msg")}</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">{t("portal.dashboard.telemetry_item_3_time")}</span>{" "}
                <span className="text-purple-400 font-semibold">{t("portal.dashboard.telemetry_item_3_tag")}</span>{" "}
                <span className="text-neutral-300">{t("portal.dashboard.telemetry_item_3_msg")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Architecture Profile */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  {t("portal.dashboard.security_title")}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                {t("portal.dashboard.security_enforced")}
              </span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              {t("portal.dashboard.security_desc")}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#161820] border border-neutral-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>{t("portal.dashboard.security_tenant_label")}</span>
              <span className="text-white font-semibold">{t("portal.dashboard.security_tenant_val")}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>{t("portal.dashboard.security_compliance_label")}</span>
              <span className="text-white font-semibold">{t("portal.dashboard.security_compliance_val")}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>{t("portal.dashboard.security_ingestion_label")}</span>
              <span className="text-emerald-400 font-semibold">{t("portal.dashboard.security_ingestion_val")}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
