"use client";

import { useState } from "react";
import { 
  TerminalSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  ChevronRight, 
  RefreshCw,
  Search
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ExecutionsClient() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("ALL");
  const [selectedRun, setSelectedRun] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const executions = [
    {
      id: "EXEC-9942",
      pipeline: t("portal.executions.pipe_1_name"),
      node: t("portal.executions.pipe_1_node"),
      duration: "14.2s",
      memory: "18.4 GB",
      status: "RUNNING",
      statusLabel: t("portal.executions.tab_running"),
      timestamp: "2026-09-07 15:10:04 UTC",
      elementsProcessed: 142050,
      logs: [
        t("portal.executions.pipe_1_log_1"),
        t("portal.executions.pipe_1_log_2"),
        t("portal.executions.pipe_1_log_3"),
        t("portal.executions.pipe_1_log_4"),
        t("portal.executions.pipe_1_log_5"),
      ]
    },
    {
      id: "EXEC-9941",
      pipeline: t("portal.executions.pipe_2_name"),
      node: t("portal.executions.pipe_2_node"),
      duration: "4.8s",
      memory: "3.2 GB",
      status: "COMPLETED",
      statusLabel: t("portal.executions.tab_completed"),
      timestamp: "2026-09-07 14:55:18 UTC",
      elementsProcessed: 48920,
      logs: [
        t("portal.executions.pipe_2_log_1"),
        t("portal.executions.pipe_2_log_2"),
        t("portal.executions.pipe_2_log_3"),
        t("portal.executions.pipe_2_log_4"),
        t("portal.executions.pipe_2_log_5"),
      ]
    },
    {
      id: "EXEC-9940",
      pipeline: t("portal.executions.pipe_3_name"),
      node: t("portal.executions.pipe_3_node"),
      duration: "1m 12s",
      memory: "34.1 GB",
      status: "COMPLETED",
      statusLabel: t("portal.executions.tab_completed"),
      timestamp: "2026-09-07 14:12:00 UTC",
      elementsProcessed: 684120,
      logs: [
        t("portal.executions.pipe_3_log_1"),
        t("portal.executions.pipe_3_log_2"),
        t("portal.executions.pipe_3_log_3"),
        t("portal.executions.pipe_3_log_4"),
        t("portal.executions.pipe_3_log_5"),
      ]
    },
    {
      id: "EXEC-9939",
      pipeline: t("portal.executions.pipe_4_name"),
      node: t("portal.executions.pipe_4_node"),
      duration: "4m 45s",
      memory: "61.0 GB",
      status: "COMPLETED",
      statusLabel: t("portal.executions.tab_completed"),
      timestamp: "2026-09-07 12:40:22 UTC",
      elementsProcessed: 1200000,
      logs: [
        t("portal.executions.pipe_4_log_1"),
        t("portal.executions.pipe_4_log_2"),
        t("portal.executions.pipe_4_log_3"),
        t("portal.executions.pipe_4_log_4"),
      ]
    },
    {
      id: "EXEC-9938",
      pipeline: t("portal.executions.pipe_5_name"),
      node: t("portal.executions.pipe_5_node"),
      duration: "18.2s",
      memory: "5.4 GB",
      status: "FAILED",
      statusLabel: t("portal.executions.tab_failed"),
      timestamp: "2026-09-07 10:15:33 UTC",
      elementsProcessed: 12400,
      logs: [
        t("portal.executions.pipe_5_log_1"),
        t("portal.executions.pipe_5_log_2"),
        t("portal.executions.pipe_5_log_3"),
        t("portal.executions.pipe_5_log_4"),
      ]
    },
    {
      id: "EXEC-9937",
      pipeline: t("portal.executions.pipe_6_name"),
      node: t("portal.executions.pipe_6_node"),
      duration: "58.4s",
      memory: "42.8 GB",
      status: "COMPLETED",
      statusLabel: t("portal.executions.tab_completed"),
      timestamp: "2026-09-07 08:30:11 UTC",
      elementsProcessed: 28400000,
      logs: [
        t("portal.executions.pipe_6_log_1"),
        t("portal.executions.pipe_6_log_2"),
        t("portal.executions.pipe_6_log_3"),
        t("portal.executions.pipe_6_log_4"),
      ]
    }
  ];

  const tabs = [
    { id: "ALL", label: t("portal.executions.tab_all") },
    { id: "RUNNING", label: t("portal.executions.tab_running") },
    { id: "COMPLETED", label: t("portal.executions.tab_completed") },
    { id: "FAILED", label: t("portal.executions.tab_failed") }
  ];

  const filtered = executions.filter(item => {
    if (filter !== "ALL" && item.status !== filter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.pipeline.toLowerCase().includes(q) ||
        item.node.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <TerminalSquare className="w-3.5 h-3.5" />
            <span>{t("portal.executions.tag")}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t("portal.executions.title")}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {t("portal.executions.subtitle")}
          </p>
        </div>

        {/* Global Pipeline Health Status Badge */}
        <div className="flex items-center gap-3 self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs font-mono">
            <span className="text-neutral-400">{t("portal.executions.kernel_label")}</span>
            <span className="text-emerald-400 font-semibold">{t("portal.executions.kernel_status")}</span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            {t("portal.executions.metric_total_runs")}
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono">1,420</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">
            {t("portal.executions.metric_total_runs_sub")}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            {t("portal.executions.metric_success_rate")}
          </div>
          <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">99.43%</div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1">
            {t("portal.executions.metric_success_rate_sub")}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            {t("portal.executions.metric_active_jobs")}
          </div>
          <div className="text-xl font-bold text-purple-400 mt-1 font-mono">02</div>
          <div className="text-[11px] text-neutral-400 font-mono mt-1">
            {t("portal.executions.metric_active_jobs_sub")}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-[#0f1115] border border-neutral-800">
          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            {t("portal.executions.metric_elements")}
          </div>
          <div className="text-xl font-bold text-white mt-1 font-mono">31.2M</div>
          <div className="text-[11px] text-neutral-500 font-mono mt-1">
            {t("portal.executions.metric_elements_sub")}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#0f1115] border border-neutral-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                filter === tab.id
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800/50 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("portal.executions.search_ph")}
            className="w-full bg-[#09090b] border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 font-mono"
          />
        </div>
      </div>

      {/* Main Execution Audit Table */}
      <div className="rounded-xl bg-[#0f1115] border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c0d11] text-neutral-400 font-mono border-b border-neutral-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">{t("portal.executions.th_id")}</th>
                <th className="py-3.5 px-4 font-semibold">{t("portal.executions.th_pipeline")}</th>
                <th className="py-3.5 px-4 font-semibold">{t("portal.executions.th_node")}</th>
                <th className="py-3.5 px-4 font-semibold">{t("portal.executions.th_duration")}</th>
                <th className="py-3.5 px-4 font-semibold">{t("portal.executions.th_status")}</th>
                <th className="py-3.5 px-4 font-semibold text-right">{t("portal.executions.th_stdout")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500 font-mono text-sm">
                    {t("portal.executions.empty")}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const isSelected = selectedRun?.id === item.id;
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedRun(isSelected ? null : item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-purple-950/20" : "hover:bg-[#14161d]"
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-purple-400">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 text-white font-sans font-medium">
                        <div>{item.pipeline}</div>
                        <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                          {item.elementsProcessed.toLocaleString()} {t("portal.executions.primitives")} • {item.memory}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400">
                        {item.node}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        {item.duration}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                          item.status === "COMPLETED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : item.status === "RUNNING"
                            ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 animate-pulse"
                            : "bg-red-500/10 text-red-400 border border-red-500/30"
                        }`}>
                          {item.status === "COMPLETED" && <CheckCircle2 className="w-3 h-3" />}
                          {item.status === "RUNNING" && <RefreshCw className="w-3 h-3 animate-spin" />}
                          {item.status === "FAILED" && <AlertTriangle className="w-3 h-3" />}
                          {item.statusLabel || item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1b1e27] hover:bg-purple-500/20 text-neutral-300 hover:text-purple-300 border border-neutral-700/50 text-[11px] transition-all"
                        >
                          <span>{isSelected ? t("portal.executions.btn_hide_logs") : t("portal.executions.btn_view_logs")}</span>
                          <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Execution STDOUT Log Drawer (Read-Only Terminal) */}
      {selectedRun && (
        <div className="rounded-xl bg-[#0a0b0e] border border-purple-500/30 p-5 space-y-3 font-mono shadow-2xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold text-white">
                {t("portal.executions.drawer_log_stream")} {selectedRun.id}
              </span>
              <span className="text-[11px] text-neutral-400">({selectedRun.pipeline})</span>
            </div>
            <div className="text-[11px] text-neutral-500">
              {t("portal.executions.drawer_allocated")} {selectedRun.node} • {t("portal.executions.drawer_started")} {selectedRun.timestamp}
            </div>
          </div>

          <div className="bg-[#050608] rounded-lg p-4 text-xs space-y-1.5 font-mono text-neutral-300 border border-neutral-900 overflow-x-auto max-h-60">
            {selectedRun.logs.map((line, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-neutral-600 select-none text-[10px] w-5 text-right">{idx + 1}</span>
                <span className={line.includes("ERR") || line.includes("HALT") ? "text-red-400" : line.includes("STATUS_OK") ? "text-emerald-400" : "text-neutral-300"}>
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
            <span>{t("portal.executions.drawer_sha")}</span>
            <span className="text-neutral-400">{t("portal.executions.drawer_ipc_notice")}</span>
          </div>
        </div>
      )}

      {/* Architectural Notice: Strict Read-Only Policy */}
      <div className="p-4 rounded-xl bg-[#0c0d11] border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
        <div className="p-1.5 rounded bg-neutral-800 text-neutral-400 shrink-0 mt-0.5">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <span className="text-white font-semibold font-mono">
            {t("portal.executions.notice_title")}
          </span>{" "}
          {t("portal.executions.notice_desc")}
        </div>
      </div>

    </div>
  );
}
