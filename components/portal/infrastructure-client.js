"use client";

import { 
  Server, 
  Cpu, 
  KeyRound, 
  ShieldCheck, 
  Activity, 
  Lock, 
  Network, 
  CheckCircle2 
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function InfrastructureClient() {
  const { t } = useLanguage();

  const gpuNodes = [
    {
      id: "GPU-VPS-EU-01",
      location: t("portal.infrastructure.gpu_1_location"),
      gpu: t("portal.infrastructure.gpu_1_gpu"),
      cpu: t("portal.infrastructure.gpu_1_cpu"),
      ram: t("portal.infrastructure.gpu_1_ram"),
      ip: t("portal.infrastructure.gpu_1_ip"),
      status: t("portal.infrastructure.gpu_1_status"),
      load: t("portal.infrastructure.gpu_1_load"),
      uptime: t("portal.infrastructure.gpu_1_uptime")
    },
    {
      id: "GPU-VPS-EU-02",
      location: t("portal.infrastructure.gpu_2_location"),
      gpu: t("portal.infrastructure.gpu_2_gpu"),
      cpu: t("portal.infrastructure.gpu_2_cpu"),
      ram: t("portal.infrastructure.gpu_2_ram"),
      ip: t("portal.infrastructure.gpu_2_ip"),
      status: t("portal.infrastructure.gpu_2_status"),
      load: t("portal.infrastructure.gpu_2_load"),
      uptime: t("portal.infrastructure.gpu_2_uptime")
    }
  ];

  const edgeAppliances = [
    {
      name: "EDGE-APPLIANCE-PADUA-01",
      site: t("portal.infrastructure.edge_1_site"),
      role: t("portal.infrastructure.edge_1_role"),
      firmware: t("portal.infrastructure.edge_1_firmware"),
      cryptoModule: t("portal.infrastructure.edge_1_crypto"),
      heartbeat: t("portal.infrastructure.edge_1_heartbeat"),
      latency: t("portal.infrastructure.edge_1_latency"),
      state: t("portal.infrastructure.edge_1_state")
    },
    {
      name: "EDGE-APPLIANCE-PADUA-02",
      site: t("portal.infrastructure.edge_2_site"),
      role: t("portal.infrastructure.edge_2_role"),
      firmware: t("portal.infrastructure.edge_2_firmware"),
      cryptoModule: t("portal.infrastructure.edge_2_crypto"),
      heartbeat: t("portal.infrastructure.edge_2_heartbeat"),
      latency: t("portal.infrastructure.edge_2_latency"),
      state: t("portal.infrastructure.edge_2_state")
    }
  ];

  const licenseKeys = [
    {
      keyId: "LIC-ENT-2026-9942-PADUA",
      tier: t("portal.infrastructure.lic_1_tier"),
      signingAuthority: t("portal.infrastructure.lic_1_authority"),
      issuedTo: t("portal.infrastructure.lic_1_issued"),
      nodesAuthorized: t("portal.infrastructure.lic_1_workload"),
      validThrough: t("portal.infrastructure.lic_1_valid"),
      status: t("portal.infrastructure.lic_1_status"),
      hash: "e7c2f81a4b9e28d6c70129f123490bca876129845efca0921789b"
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-neutral-800 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1.5">
            <Server className="w-3.5 h-3.5" />
            <span>{t("portal.infrastructure.tag")}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t("portal.infrastructure.title")}
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            {t("portal.infrastructure.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 text-xs font-mono shadow-sm transition-colors">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-slate-500 dark:text-neutral-400">{t("portal.infrastructure.isolation_label")}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t("portal.infrastructure.isolation_val")}</span>
        </div>
      </div>

      {/* Section 1: GPU-VPS Compute Nodes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("portal.infrastructure.gpu_title")}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
            {t("portal.infrastructure.gpu_nodes_provisioned")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {gpuNodes.map((node) => (
            <div 
              key={node.id} 
              className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700 transition-colors space-y-4 font-mono text-xs shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{node.id}</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">{node.location}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  {node.status}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800/80 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.gpu_accel")}</span>
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">{node.gpu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.gpu_cpu")}</span>
                  <span className="text-slate-700 dark:text-neutral-300">{node.cpu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.gpu_ram")}</span>
                  <span className="text-slate-700 dark:text-neutral-300">{node.ram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.gpu_ip")}</span>
                  <span className="text-slate-600 dark:text-neutral-400">{node.ip}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-900 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span className="text-slate-500 dark:text-neutral-400">{t("portal.infrastructure.gpu_load")}</span>
                  <span className="text-slate-900 dark:text-white font-medium">{node.load}</span>
                </div>
                <span className="text-slate-400 dark:text-neutral-500">{node.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: On-Premise Edge Appliances */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("portal.infrastructure.edge_title")}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
            {t("portal.infrastructure.edge_appliances_count")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {edgeAppliances.map((appliance) => (
            <div 
              key={appliance.name} 
              className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 space-y-4 font-mono text-xs shadow-sm transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{appliance.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">{appliance.site}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  {appliance.state}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-neutral-800/80 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.edge_role")}</span>
                  <span className="text-slate-800 dark:text-neutral-300 font-sans font-medium">{appliance.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.edge_firmware")}</span>
                  <span className="text-slate-700 dark:text-neutral-300">{appliance.firmware}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.edge_security")}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{appliance.cryptoModule}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.edge_heartbeat")}</span>
                  <span className="text-slate-600 dark:text-neutral-400">{appliance.heartbeat} ({appliance.latency})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Active Enterprise License Keys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("portal.infrastructure.license_title")}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            {t("portal.infrastructure.license_signed")}
          </span>
        </div>

        {licenseKeys.map((lic) => (
          <div 
            key={lic.keyId} 
            className="p-6 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 space-y-4 font-mono shadow-sm transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-neutral-800">
              <div>
                <div className="text-xs text-slate-400 dark:text-neutral-500">{t("portal.infrastructure.lic_id_label")}</div>
                <div className="text-base font-bold text-purple-600 dark:text-purple-400 tracking-wider mt-0.5">{lic.keyId}</div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 text-xs font-semibold self-start sm:self-auto">
                <Lock className="w-3.5 h-3.5" />
                {lic.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.infrastructure.lic_tier_label")}</div>
                <div className="text-slate-900 dark:text-white font-medium mt-1 font-sans">{lic.tier}</div>
              </div>
              <div>
                <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.infrastructure.lic_auth_label")}</div>
                <div className="text-slate-900 dark:text-white font-medium mt-1 font-sans">{lic.signingAuthority}</div>
              </div>
              <div>
                <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.infrastructure.lic_valid_label")}</div>
                <div className="text-slate-900 dark:text-white font-medium mt-1">{lic.validThrough}</div>
              </div>
              <div>
                <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.infrastructure.lic_workload_label")}</div>
                <div className="text-slate-900 dark:text-white font-medium mt-1">{lic.nodesAuthorized}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.infrastructure.lic_digest_label")}</div>
                <div className="text-slate-600 dark:text-neutral-400 text-[11px] mt-1 break-all bg-slate-50 dark:bg-[#09090b] p-2 rounded border border-slate-200 dark:border-neutral-900">
                  {lic.hash}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Read-Only Invariant Notice */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0c0d11] border border-slate-200 dark:border-neutral-800/80 text-xs text-slate-600 dark:text-neutral-400 flex items-start gap-3 transition-colors">
        <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-900 dark:text-white font-semibold font-mono">{t("portal.infrastructure.notice_title")}</span>{" "}
          {t("portal.infrastructure.notice_desc")}
        </div>
      </div>

    </div>
  );
}
