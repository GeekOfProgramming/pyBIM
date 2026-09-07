"use client";

import Link from "@/components/layout/LocalizedLink";
import { 
  LifeBuoy, 
  Plus, 
  Mail, 
  ShieldAlert, 
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SupportClient() {
  const { t } = useLanguage();

  const tickets = [
    {
      id: "TCK-8821",
      priorityCode: "CRITICAL",
      statusCode: "open",
      subject: t("portal.support.tck_1_subject"),
      targetSystem: t("portal.support.tck_1_target"),
      priority: t("portal.support.tck_1_priority"),
      status: t("portal.support.tck_1_status"),
      openedAt: t("portal.support.tck_1_opened"),
      lastUpdate: t("portal.support.tck_1_update"),
      responseSnippet: t("portal.support.tck_1_snippet")
    },
    {
      id: "TCK-8740",
      priorityCode: "ELEVATED",
      statusCode: "pending",
      subject: t("portal.support.tck_2_subject"),
      targetSystem: t("portal.support.tck_2_target"),
      priority: t("portal.support.tck_2_priority"),
      status: t("portal.support.tck_2_status"),
      openedAt: t("portal.support.tck_2_opened"),
      lastUpdate: t("portal.support.tck_2_update"),
      responseSnippet: t("portal.support.tck_2_snippet")
    },
    {
      id: "TCK-8612",
      priorityCode: "NORMAL",
      statusCode: "resolved",
      subject: t("portal.support.tck_3_subject"),
      targetSystem: t("portal.support.tck_3_target"),
      priority: t("portal.support.tck_3_priority"),
      status: t("portal.support.tck_3_status"),
      openedAt: t("portal.support.tck_3_opened"),
      lastUpdate: t("portal.support.tck_3_update"),
      responseSnippet: t("portal.support.tck_3_snippet")
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>{t("portal.support.tag")}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {t("portal.support.title")}
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {t("portal.support.subtitle")}
          </p>
        </div>

        <Link
          href="/portal/support/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-purple-600/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t("portal.support.btn_open")}</span>
        </Link>
      </div>

      {/* Air-Gapped File Exchange Notice (External Encrypted Channel) */}
      <div className="p-5 rounded-xl bg-[#0c0d11] border border-neutral-800 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-purple-400 font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>{t("portal.support.directive_title")}</span>
        </div>
        <p className="text-neutral-300 font-sans text-xs leading-relaxed">
          {t("portal.support.directive_desc")}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="px-3 py-1.5 rounded-lg bg-[#050608] border border-neutral-800 text-purple-300 font-mono text-xs flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>support-sec@pybim.engineering</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            {t("portal.support.pgp_fingerprint")}
          </span>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            {t("portal.support.escalations_title")} ({tickets.length})
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">
            {t("portal.support.sla_response")}
          </span>
        </div>

        <div className="space-y-3">
          {tickets.map((ticketItem) => {
            const isResolved = ticketItem.statusCode === "resolved";
            const isOpen = ticketItem.statusCode === "open";

            return (
              <div 
                key={ticketItem.id}
                className="p-5 rounded-xl bg-[#0f1115] border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-purple-400">{ticketItem.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                      ticketItem.priorityCode === "CRITICAL"
                        ? "bg-red-500/10 text-red-400 border border-red-500/30"
                        : ticketItem.priorityCode === "ELEVATED"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    }`}>
                      {ticketItem.priority}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 hidden md:inline">
                      // {ticketItem.targetSystem}
                    </span>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold self-start sm:self-auto ${
                    isResolved
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : isOpen
                      ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                      : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                  }`}>
                    {isResolved ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    )}
                    {ticketItem.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">{ticketItem.subject}</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-mono">
                    &gt; {t("portal.support.latest_memo")} &quot;{ticketItem.responseSnippet}&quot;
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-neutral-500 gap-1">
                  <span>{t("portal.support.opened")} {ticketItem.openedAt}</span>
                  <span>{ticketItem.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
