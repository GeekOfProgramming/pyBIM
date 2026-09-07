"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { useRouter } from "next/navigation";
import { 
  LifeBuoy, 
  ArrowLeft, 
  Send, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  Server,
  Cpu,
  FileCode2
} from "lucide-react";

export default function NewSupportTicketPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [formData, setFormData] = useState({
    system: "GPU-VPS Cluster (Frankfurt/Milan)",
    severity: "ELEVATED",
    subject: "",
    description: "",
    affectedPipeline: "IFC4x3 Mesh Extraction"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    // Simulate deterministic queuing
    setTimeout(() => {
      setSubmitting(false);
      const generatedId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <Link 
          href="/portal/support"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Support Queue</span>
        </Link>
        <span className="text-[11px] font-mono text-neutral-500">
          // AIR_GAP_TICKET_INGESTION
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>New Technical Escalation</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Submit Incident Dossier</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Submit deterministic error traces, execution exceptions, or hardware telemetry queries directly to Padua engineering.
        </p>
      </div>

      {/* Strict Anti-Upload Directives Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-mono font-bold uppercase tracking-wider text-amber-200">
            Strict Zero-File Policy Enforced
          </div>
          <p className="text-amber-300/90 text-[11px] leading-relaxed">
            Do not paste proprietary architectural geometry or credentials into this form. For binary IFC/RVT models, generate a SHA-256 digest and transfer the encrypted archive via PGP email to <span className="font-mono underline">support-sec@pybim.engineering</span>.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 rounded-xl bg-[#0f1115] border border-purple-500/30 text-center space-y-4 font-mono animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Escalation Queued: {ticketId}</h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              Your incident report has been registered in the air-gapped support queue. Tier-3 engineering lead has been notified.
            </p>
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/portal/support"
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-all"
            >
              Back to Support Queue
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-5">
          
          {/* Target Infrastructure Subsystem */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              1. Target Subsystem / Node
            </label>
            <select
              value={formData.system}
              onChange={(e) => setFormData({ ...formData, system: e.target.value })}
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            >
              <option value="GPU-VPS Cluster (Frankfurt/Milan)">GPU-VPS Cluster (NVIDIA A100 Nodes)</option>
              <option value="EDGE-APPLIANCE-PADUA-01">EDGE-APPLIANCE-PADUA-01 (On-Premise Vault)</option>
              <option value="EDGE-APPLIANCE-PADUA-02">EDGE-APPLIANCE-PADUA-02 (Topology Daemon)</option>
              <option value="Algorithmic Kernel Engine">Algorithmic Kernel &amp; IFC C++ Parser</option>
              <option value="Enterprise License & Cryptographic CA">Enterprise License &amp; Cryptographic CA</option>
            </select>
          </div>

          {/* Severity Level Selection */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              2. Severity &amp; Operational Impact
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "NORMAL", label: "Normal", desc: "General inquiry or non-blocking" },
                { id: "ELEVATED", label: "Elevated", desc: "Degraded pipeline throughput" },
                { id: "CRITICAL", label: "Critical", desc: "Production pipeline halt" },
              ].map((lvl) => (
                <button
                  type="button"
                  key={lvl.id}
                  onClick={() => setFormData({ ...formData, severity: lvl.id })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    formData.severity === lvl.id
                      ? "bg-purple-500/10 border-purple-500/50 text-white"
                      : "bg-[#09090b] border-neutral-800 text-neutral-400 hover:border-neutral-700"
                  }`}
                >
                  <div className="text-xs font-mono font-bold flex items-center justify-between">
                    <span>{lvl.label}</span>
                    {formData.severity === lvl.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1 leading-tight">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Incident Subject */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              3. Incident Summary / Subject
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g., CUDA memory allocation failure on 8GB IFC model"
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          {/* Technical Trace / Description (Text-Only, No File Attachments) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider">
                4. Technical Description &amp; Traceback (Text Only)
              </label>
              <span className="text-[10px] font-mono text-neutral-500">NO ATTACHMENTS ALLOWED</span>
            </div>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Paste stack traces, execution IDs (e.g. EXEC-9942), parameter IDs, or step-by-step reproduction steps..."
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg p-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 font-mono leading-relaxed"
            />
          </div>

          {/* Submit Action Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/portal/support"
              className="px-4 py-2.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? "Dispatching..." : "Transmit Incident Dossier"}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
