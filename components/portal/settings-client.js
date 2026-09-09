"use client";

import { useState } from "react";
import { 
  Settings, 
  User, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Building,
  KeyRound,
  Save
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SettingsClient() {
  const { t } = useLanguage();

  // Primary Contact State
  const [contactName, setContactName] = useState(() => t("portal.settings.contact_name_default"));
  const [contactTitle, setContactTitle] = useState(() => t("portal.settings.contact_title_default"));
  const [contactPhone, setContactPhone] = useState("+39 049 827 0000");
  const [contactSaved, setContactSaved] = useState(false);
  const [savingContact, setSavingContact] = useState(false);

  // Security / Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSaveContact = (e) => {
    e.preventDefault();
    setSavingContact(true);
    setContactSaved(false);
    setTimeout(() => {
      setSavingContact(false);
      setContactSaved(true);
      setTimeout(() => setContactSaved(false), 3000);
    }, 600);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError(t("portal.settings.err_min_len"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(t("portal.settings.err_mismatch"));
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-neutral-800 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>{t("portal.settings.tag")}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{t("portal.settings.title")}</h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            {t("portal.settings.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 text-xs font-mono shadow-sm transition-colors">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-slate-500 dark:text-neutral-400">{t("portal.settings.tenant_label")}</span>
          <span className="text-slate-900 dark:text-white font-semibold">CLIENT-8832-EU</span>
        </div>
      </div>

      {/* Enterprise Organization Manifest (Read-Only) */}
      <div className="p-5 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 space-y-3 font-mono text-xs shadow-sm transition-colors">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
            <Building className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>{t("portal.settings.org_profile_title")}</span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-neutral-500">{t("portal.settings.system_of_record")}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.settings.registered_entity")}</div>
            <div className="text-slate-900 dark:text-white font-sans font-medium mt-1">Studio Ingegneria BIM Italia S.r.l.</div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.settings.primary_auth")}</div>
            <div className="text-purple-600 dark:text-purple-400 font-mono mt-1">demo@pybim.it</div>
          </div>
          <div>
            <div className="text-slate-400 dark:text-neutral-500 text-[11px]">{t("portal.settings.service_tier")}</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono mt-1">{t("portal.settings.service_tier_val")}</div>
          </div>
        </div>
      </div>

      {/* Section 1: Primary Contact Form */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 space-y-5 shadow-sm transition-colors">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("portal.settings.contact_section_title")}
            </h2>
          </div>
          {contactSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("portal.settings.contact_saved")}
            </span>
          )}
        </div>

        <form onSubmit={handleSaveContact} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
                {t("portal.settings.contact_name_label")}
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
                {t("portal.settings.contact_role_label")}
              </label>
              <input
                type="text"
                required
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
              {t("portal.settings.contact_phone_label")}
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full md:w-1/2 bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
            <p className="text-[11px] text-slate-400 dark:text-neutral-500 font-mono mt-1">
              {t("portal.settings.contact_phone_hint")}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-mono text-xs font-semibold transition-all disabled:opacity-50 border border-slate-800 dark:border-neutral-700 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingContact ? t("portal.settings.contact_btn_saving") : t("portal.settings.contact_btn_save")}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Security & Password Management */}
      <div className="p-6 rounded-xl bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-neutral-800 space-y-5 shadow-sm transition-colors">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t("portal.settings.security_section_title")}
            </h2>
          </div>
          {passwordSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t("portal.settings.security_password_updated")}
            </span>
          )}
        </div>

        {passwordError && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-xs text-red-700 dark:text-red-400 flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
              {t("portal.settings.curr_password_label")}
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
              {t("portal.settings.new_password_label")}
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("portal.settings.new_password_ph")}
              className="w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-600 dark:text-neutral-400 uppercase mb-1.5">
              {t("portal.settings.confirm_password_label")}
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("portal.settings.confirm_password_ph")}
              className="w-full bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-all disabled:opacity-50 shadow-lg shadow-purple-600/20"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{savingPassword ? t("portal.settings.password_btn_saving") : t("portal.settings.password_btn_save")}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 3: Invariant Security Architecture */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0c0d11] border border-slate-200 dark:border-neutral-800/80 text-xs text-slate-600 dark:text-neutral-400 flex items-start gap-3 transition-colors">
        <KeyRound className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-900 dark:text-white font-semibold font-mono">{t("portal.settings.key_rotation_title")}</span>{" "}
          {t("portal.settings.key_rotation_desc")}
        </div>
      </div>

    </div>
  );
}
