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
  Save,
  RotateCcw
} from "lucide-react";

export default function SettingsPage() {
  // Primary Contact State
  const [contactName, setContactName] = useState("Dott. Ing. Marco Rossi");
  const [contactTitle, setContactTitle] = useState("Chief BIM Systems Architect");
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
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest mb-1.5">
            <Settings className="w-3.5 h-3.5" />
            <span>// ENTERPRISE_PORTAL_IDENTITY</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Account Settings</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage authorized contact dossiers, credential rotations, and access parameters.
          </p>
        </div>

        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0f1115] border border-neutral-800 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-neutral-400">TENANT: </span>
          <span className="text-white font-semibold">CLIENT-8832-EU</span>
        </div>
      </div>

      {/* Enterprise Organization Manifest (Read-Only) */}
      <div className="p-5 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Building className="w-4 h-4 text-purple-400" />
            <span>ENTERPRISE ORGANIZATION PROFILE</span>
          </div>
          <span className="text-[10px] text-neutral-500">SYSTEM OF RECORD</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <div className="text-neutral-500 text-[11px]">REGISTERED ENTITY</div>
            <div className="text-white font-sans font-medium mt-1">Studio Ingegneria BIM Italia S.r.l.</div>
          </div>
          <div>
            <div className="text-neutral-500 text-[11px]">PRIMARY AUTH IDENTITY</div>
            <div className="text-purple-400 font-mono mt-1">demo@pybim.it</div>
          </div>
          <div>
            <div className="text-neutral-500 text-[11px]">SERVICE TIER</div>
            <div className="text-emerald-400 font-mono mt-1">Dedicated Air-Gapped Core</div>
          </div>
        </div>
      </div>

      {/* Section 1: Primary Contact Form */}
      <div className="p-6 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              1. Primary Technical Contact
            </h2>
          </div>
          {contactSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Contact Saved
            </span>
          )}
        </div>

        <form onSubmit={handleSaveContact} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                Full Name / Title
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
                Organizational Role
              </label>
              <input
                type="text"
                required
                value={contactTitle}
                onChange={(e) => setContactTitle(e.target.value)}
                className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
              Emergency Escalation Phone / Signal Number
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full md:w-1/2 bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
            <p className="text-[11px] text-neutral-500 font-mono mt-1">
              Used strictly for air-gapped critical hardware failover alerts.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={savingContact}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-semibold transition-all disabled:opacity-50 border border-neutral-700"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingContact ? "Saving..." : "Update Contact Dossier"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Security & Password Management */}
      <div className="p-6 rounded-xl bg-[#0f1115] border border-neutral-800 space-y-5">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-purple-400" />
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              2. Security &amp; Password Rotation
            </h2>
          </div>
          {passwordSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Password Updated
            </span>
          )}
        </div>

        {passwordError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handleSavePassword} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
              Current Portal Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
              New Secure Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat new password"
              className="w-full bg-[#09090b] border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingPassword}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold transition-all disabled:opacity-50 shadow-lg shadow-purple-600/20"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{savingPassword ? "Updating..." : "Rotate Portal Password"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 3: Invariant Security Architecture */}
      <div className="p-4 rounded-xl bg-[#0c0d11] border border-neutral-800/80 text-xs text-neutral-400 flex items-start gap-3">
        <KeyRound className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-semibold font-mono">CRYPTOGRAPHIC KEY ROTATION NOTICE:</span>{" "}
          Master client PGP keys and Edge node machine identities cannot be mutated via web sessions. To revoke or rotate hardware keys, execute the offline verification protocol with your assigned technical account liaison.
        </div>
      </div>

    </div>
  );
}
