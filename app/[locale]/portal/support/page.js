import Link from "@/components/layout/LocalizedLink";
import { 
  LifeBuoy, 
  Plus, 
  Mail, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Lock
} from "lucide-react";

export default function SupportPage() {
  const tickets = [
    {
      id: "TCK-8821",
      subject: "GPU kernel compilation timeout on custom IFC4x3 schema",
      targetSystem: "GPU-VPS-EU-01 (CUDA JIT)",
      priority: "CRITICAL",
      status: "OPEN - ENG IN REVIEW",
      openedAt: "2026-09-07 11:20 UTC",
      lastUpdate: "35 mins ago by Core Engineer (Padua)",
      responseSnippet: "Analyzing PTX instruction breakdown for non-standard geometric curve profiles."
    },
    {
      id: "TCK-8740",
      subject: "Edge appliance sync heartbeat latency spike",
      targetSystem: "EDGE-APPLIANCE-PADUA-02",
      priority: "ELEVATED",
      status: "PENDING AIR-GAP LOGS",
      openedAt: "2026-09-05 16:45 UTC",
      lastUpdate: "Yesterday 14:10 UTC",
      responseSnippet: "Requested encrypted syslog dump dispatched via PGP channel."
    },
    {
      id: "TCK-8612",
      subject: "COBie parameter schema mapping conflict on mechanical ductwork",
      targetSystem: "Revit Daemon Integration",
      priority: "NORMAL",
      status: "RESOLVED",
      openedAt: "2026-08-28 09:12 UTC",
      lastUpdate: "2026-08-29 18:00 UTC",
      responseSnippet: "Resolved with hotfix patch v2.4.11-enterprise deployed to edge node."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>// TIER_3_CORE_ENGINEERING_ESCALATIONS</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Technical Support</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Direct communication protocol with algorithmic core researchers and infrastructure systems engineers.
          </p>
        </div>

        <Link
          href="/portal/support/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-purple-600/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Open Escalation Ticket</span>
        </Link>
      </div>

      {/* Air-Gapped File Exchange Notice (External Encrypted Channel) */}
      <div className="p-5 rounded-xl bg-[#0c0d11] border border-neutral-800 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-purple-400 font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>STRICT AIR-GAP FILE EXCHANGE DIRECTIVE</span>
        </div>
        <p className="text-neutral-300 font-sans text-xs leading-relaxed">
          In strict compliance with air-gapped enterprise protocols, web browser file uploads, BIM model drops, and memory traces are permanently disabled on this portal. For CAD/BIM geometries, IFC models, and memory dumps, please dispatch encrypted PGP tarballs directly to our security vault:
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="px-3 py-1.5 rounded-lg bg-[#050608] border border-neutral-800 text-purple-300 font-mono text-xs flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>support-sec@pybim.engineering</span>
          </div>
          <span className="text-[11px] text-neutral-500 font-mono">
            PGP Fingerprint: 4D8A 912B EF03 88C1 23AA
          </span>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Active Support Escalations ({tickets.length})
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">SLA: &lt; 2h RESPONSE</span>
        </div>

        <div className="space-y-3">
          {tickets.map((t) => (
            <div 
              key={t.id}
              className="p-5 rounded-xl bg-[#0f1115] border border-neutral-800 hover:border-neutral-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-purple-400">{t.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider ${
                    t.priority === "CRITICAL"
                      ? "bg-red-500/10 text-red-400 border border-red-500/30"
                      : t.priority === "ELEVATED"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  }`}>
                    {t.priority}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 hidden md:inline">
                    // {t.targetSystem}
                  </span>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold self-start sm:self-auto ${
                  t.status === "RESOLVED"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : t.status.includes("OPEN")
                    ? "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                    : "bg-neutral-800 text-neutral-400 border border-neutral-700"
                }`}>
                  {t.status === "RESOLVED" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  )}
                  {t.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">{t.subject}</h3>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  &gt; Latest memo: &quot;{t.responseSnippet}&quot;
                </p>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-neutral-500 gap-1">
                <span>Opened: {t.openedAt}</span>
                <span>{t.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
