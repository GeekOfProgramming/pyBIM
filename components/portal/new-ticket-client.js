"use client";

import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { 
  LifeBuoy, 
  ArrowLeft, 
  Send, 
  ShieldAlert, 
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewTicketClient() {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const [formData, setFormData] = useState({
    system: "gpu_cluster",
    severity: "ELEVATED",
    subject: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.description.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const generatedId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedId);
      setSubmitted(true);
    }, 800);
  };

  const severityOptions = [
    { 
      id: "NORMAL", 
      label: t("portal.support_new.sev_normal"), 
      desc: t("portal.support_new.sev_normal_desc") 
    },
    { 
      id: "ELEVATED", 
      label: t("portal.support_new.sev_elevated"), 
      desc: t("portal.support_new.sev_elevated_desc") 
    },
    { 
      id: "CRITICAL", 
      label: t("portal.support_new.sev_critical"), 
      desc: t("portal.support_new.sev_critical_desc") 
    }
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <Link 
          href="/portal/support"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("portal.support_new.back")}</span>
        </Link>
        <span className="text-[11px] font-mono text-neutral-500">
          {t("portal.support_new.tag")}
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1">
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>{t("portal.support_new.badge")}</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {t("portal.support_new.title")}
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          {t("portal.support_new.subtitle")}
        </p>
      </div>

      {/* Strict Anti-Upload Directives Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-mono font-bold uppercase tracking-wider text-amber-200">
            {t("portal.support_new.policy_title")}
          </div>
          <p className="text-amber-300/90 text-[11px] leading-relaxed">
            {t("portal.support_new.policy_desc")}
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="p-8 rounded-xl bg-[#0f1115] border border-purple-500/30 text-center space-y-4 font-mono animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {t("portal.support_new.success_title")} {ticketId}
            </h2>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              {t("portal.support_new.success_desc")}
            </p>
          </div>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              href="/portal/support"
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-all"
            >
              {t("portal.support_new.success_back_btn")}
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-5">
          
          {/* Target Infrastructure Subsystem */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t("portal.support_new.subsystem_label")}
            </label>
            <select
              value={formData.system}
              onChange={(e) => setFormData({ ...formData, system: e.target.value })}
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            >
              <option value="gpu_cluster">{t("portal.support_new.subsystem_opt1")}</option>
              <option value="edge_appliance_01">{t("portal.support_new.subsystem_opt2")}</option>
              <option value="edge_appliance_02">{t("portal.support_new.subsystem_opt3")}</option>
              <option value="kernel_engine">{t("portal.support_new.subsystem_opt4")}</option>
              <option value="license_ca">{t("portal.support_new.subsystem_opt5")}</option>
            </select>
          </div>

          {/* Severity Level Selection */}
          <div>
            <label className="block text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              {t("portal.support_new.severity_label")}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {severityOptions.map((lvl) => (
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
              {t("portal.support_new.subject_label")}
            </label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={t("portal.support_new.subject_ph")}
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          {/* Technical Trace / Description (Text-Only, No File Attachments) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-semibold text-neutral-300 uppercase tracking-wider">
                {t("portal.support_new.desc_label")}
              </label>
              <span className="text-[10px] font-mono text-neutral-500">
                {t("portal.support_new.desc_no_attach")}
              </span>
            </div>
            <textarea
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t("portal.support_new.desc_ph")}
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg p-3.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500/50 font-mono leading-relaxed"
            />
          </div>

          {/* Submit Action Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/portal/support"
              className="px-4 py-2.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-white transition-colors"
            >
              {t("portal.support_new.cancel")}
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-semibold transition-all shadow-lg shadow-purple-600/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? t("portal.support_new.submitting") : t("portal.support_new.submit")}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
