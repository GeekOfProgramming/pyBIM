import { 
  LayoutDashboard, 
  Cpu, 
  Server, 
  LifeBuoy, 
  Activity, 
  ShieldCheck, 
  HardDrive,
  Clock,
  Terminal
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-2">
            // STATUS: OPERATIONAL
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Overview &amp; Telemetry Dashboard</h1>
          <p className="text-neutral-400 text-sm font-mono mt-1">
            Real-time read-only metrics of enterprise compute quotas, dedicated hardware nodes, and security audits.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-400 bg-[#12141a] px-3.5 py-2 rounded-lg border border-neutral-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>AIR-GAPPED SYNC ACTIVE</span>
        </div>
      </div>
      
      {/* Primary Read-Only Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: System Resource Allocation */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">// COMPUTE_RESOURCES</span>
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">64 vCPU / 256GB</div>
          <div className="text-xs font-mono text-purple-400 font-semibold mb-4">System Resource Allocation</div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">GPU VRAM:</span>
              <span className="text-neutral-200">24 GB Dedicated (RTX A5000)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Bandwidth:</span>
              <span className="text-neutral-200">10 Gbps Isolated Pipe</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Computational Nodes */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">// HARDWARE_TOPOLOGY</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">2 Nodes</div>
          <div className="text-xs font-mono text-emerald-400 font-semibold mb-4">Active Computational Nodes</div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">Edge Appliance:</span>
              <span className="text-emerald-400">1 Online (LAN Verified)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Cloud Vector:</span>
              <span className="text-emerald-400">1 Active (Isolated VPS)</span>
            </div>
          </div>
        </div>

        {/* Card 3: Open Support Tickets */}
        <div className="bg-[#111318] border border-neutral-800 rounded-xl p-6 relative overflow-hidden group hover:border-neutral-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">// SERVICE_DESK</span>
            <LifeBuoy className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">0 Open</div>
          <div className="text-xs font-mono text-cyan-400 font-semibold mb-4">Active Support Escalations</div>
          
          <div className="pt-3 border-t border-neutral-800/80 space-y-2 text-xs font-mono text-neutral-400">
            <div className="flex justify-between">
              <span className="text-neutral-500">SLA Response:</span>
              <span className="text-neutral-200">&lt; 15 Minutes (Tier-1 SLA)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Resolved Tickets:</span>
              <span className="text-neutral-200">14 Total Complete</span>
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
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Live Telemetry Feed</h3>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">READ_ONLY</span>
          </div>
          
          <div className="space-y-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">[14:32:01 UTC]</span>{" "}
                <span className="text-emerald-400 font-semibold">IFC4_PARSER:</span>{" "}
                <span className="text-neutral-300">Deterministic geometry pass completed (31,482 entities). Zero errors.</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">[12:11:45 UTC]</span>{" "}
                <span className="text-cyan-400 font-semibold">EDGE_SYNC:</span>{" "}
                <span className="text-neutral-300">Local node heart-beat validated via encrypted TLS 1.3 channel.</span>
              </div>
            </div>
            <div className="p-2.5 rounded bg-[#161820] border border-neutral-800/80 flex items-start gap-3">
              <Clock className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <span className="text-neutral-500">[09:05:12 UTC]</span>{" "}
                <span className="text-purple-400 font-semibold">SECURITY_AUDIT:</span>{" "}
                <span className="text-neutral-300">ISO 19650-5 air-gapped compliance verified. Zero cloud ingestion detected.</span>
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
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Air-Gapped Security Profile</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold">ENFORCED</span>
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed mb-4">
              All client computational deliverables, IFC schemas, and Revit geometry pipelines run in isolated execution zones. File transfers, tenders, and sensitive onboarding requests are processed exclusively through air-gapped corporate channels.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#161820] border border-neutral-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-neutral-400">
              <span>Tenant Scope:</span>
              <span className="text-white font-semibold">Enterprise Tier-1 Single Tenant</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Compliance Mandate:</span>
              <span className="text-white font-semibold">ISO 19650-5 &amp; UNI 11337</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Data Ingestion Policy:</span>
              <span className="text-emerald-400 font-semibold">Strict Read-Only Local Execution</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
