"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import Link from "@/components/layout/LocalizedLink";
import { Shield, ArrowRight, Loader2, User, Building2, KeyRound } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AuthLoginClient() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  
  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, company_website_url: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("auth.login.failed") || "Login failed");
      
      router.push(`/${locale}/portal/dashboard`);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, password, company_website_url: honeypot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t("auth.register.failed") || "Registration failed");
      
      setSuccess(t("auth.register.success") || "Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push(`/${locale}/portal/dashboard`);
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 font-sans selection:bg-purple-500/30">
      <div 
        className="relative w-full max-w-4xl h-[600px] bg-[#1c222f] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800/80"
        style={{
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          isolation: 'isolate',
        }}
      >
        
        {/* Background Layer: Forms */}
        <div className="absolute inset-0 flex flex-col md:flex-row w-full h-full">
          
          {/* Left Side: Login Form */}
          <div className={`w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-14 bg-white md:rounded-l-3xl z-10 transition-all duration-300 ${!isLogin ? 'opacity-0 pointer-events-none absolute md:relative md:opacity-0' : 'opacity-100 relative'}`}>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[11px] font-mono font-bold text-purple-700 mb-2">
                {t("auth.login.badge") || "// ENTERPRISE_PORTAL"}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{t("auth.login.title") || "Client Login"}</h2>
              <p className="text-xs text-gray-500 mt-1">{t("auth.login.subtitle") || "Authenticated access to pyBIM algorithmic execution engines."}</p>
            </div>

            {/* Enterprise Demo Quick Access Banner */}
            <div className="mb-5 p-3.5 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-between text-xs shadow-inner">
              <div className="overflow-hidden pr-2">
                <span className="font-mono text-purple-400 font-bold block text-[10.5px] uppercase tracking-wider">{t("auth.login.demo_badge") || "// DEMO CREDENTIALS"}</span>
                <span className="text-neutral-300 font-mono text-[11px] truncate block">{t("auth.login.demo_email") || "demo@pybim.it"}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail("demo@pybim.it");
                  setPassword("pyBIM2026Secure");
                  setError("");
                }}
                className="shrink-0 px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-xl font-mono text-[11px] font-semibold transition active:scale-95"
              >
                {t("auth.login.autofill_btn") || "Autofill Demo"}
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              {error && isLogin && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">{error}</div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">{t("auth.login.email_label") || "Corporate Email"}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.login.email_placeholder") || "demo@pybim.it"}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">{t("auth.login.password_label") || "Access Key / Password"}</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("auth.login.password_placeholder") || "••••••••••••"}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                />
              </div>
              {/* Honeypot Trap Field */}
              <div 
                aria-hidden="true" 
                style={{ 
                  opacity: 0, 
                  position: 'absolute', 
                  top: 0, 
                  left: '-9999px', 
                  height: 0, 
                  width: 0, 
                  zIndex: -1, 
                  overflow: 'hidden' 
                }}
                tabIndex={-1}
              >
                <label htmlFor="login_website_url">{t("auth.login.honeypot_label") || "Website"}</label>
                <input
                  type="text"
                  id="login_website_url"
                  name="company_website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 flex justify-center items-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {loading && isLogin ? <Loader2 className="w-5 h-5 animate-spin" /> : (t("auth.login.submit_btn") || "Sign In to Client Portal")}
              </button>
              <p className="text-sm text-gray-600 text-center mt-4 block md:hidden">
                {t("auth.login.mobile_prompt") || "Need a test environment?"} <button type="button" onClick={() => setIsLogin(false)} className="text-purple-600 font-bold">{t("auth.login.mobile_switch") || "Request Sandbox"}</button>
              </p>
            </form>
          </div>

          {/* Right Side: Signup Form */}
          <div className={`w-full md:w-1/2 h-full flex flex-col justify-center px-10 md:px-14 bg-white md:rounded-r-3xl z-10 transition-all duration-300 ${isLogin ? 'opacity-0 pointer-events-none absolute md:relative md:opacity-0' : 'opacity-100 relative'}`}>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{t("auth.register.title") || "Request Sandbox"}</h2>
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              {error && !isLogin && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">{error}</div>
              )}
              {success && !isLogin && (
                <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium border border-green-100">{success}</div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("auth.register.name_label") || "Name"}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                />
              </div>
              <div className="flex gap-3">
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{t("auth.register.company_label") || "Company"}</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("auth.register.email_label") || "Email"}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{t("auth.register.password_label") || "Password"}</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                />
              </div>

              {/* Honeypot Trap Field */}
              <div 
                aria-hidden="true" 
                style={{ 
                  opacity: 0, 
                  position: 'absolute', 
                  top: 0, 
                  left: '-9999px', 
                  height: 0, 
                  width: 0, 
                  zIndex: -1, 
                  overflow: 'hidden' 
                }}
                tabIndex={-1}
              >
                <label htmlFor="signup_website_url">{t("auth.login.honeypot_label") || "Website"}</label>
                <input
                  type="text"
                  id="signup_website_url"
                  name="company_website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 flex justify-center items-center gap-2 active:scale-[0.99] disabled:opacity-50"
              >
                {loading && !isLogin ? <Loader2 className="w-5 h-5 animate-spin" /> : (t("auth.register.submit_btn") || "Request Sandbox Access")}
              </button>
              <p className="text-sm text-gray-600 text-center mt-4 block md:hidden">
                {t("auth.register.mobile_prompt") || "Already registered?"} <button type="button" onClick={() => setIsLogin(true)} className="text-purple-600 font-bold">{t("auth.register.mobile_switch") || "Client Login"}</button>
              </p>
            </form>
          </div>

        </div>

        {/* Foreground Layer: Sliding Overlay (Hidden on Mobile, Visible on Desktop) */}
        <motion.div
          className="hidden md:flex absolute top-0 left-0 w-1/2 h-full bg-[#1c222f] text-white z-20 flex-col justify-center items-center px-12 text-center"
          initial={false}
          animate={{
            x: isLogin ? "100%" : "0%",
            borderTopLeftRadius: isLogin ? 0 : 24,
            borderBottomLeftRadius: isLogin ? 0 : 24,
            borderTopRightRadius: isLogin ? 24 : 0,
            borderBottomRightRadius: isLogin ? 24 : 0,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-overlay"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-inner">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-white tracking-tight">{t("auth.overlay.login_title") || "pyBIM Core"}</h2>
                <p className="text-slate-300 text-sm mb-6 max-w-[280px] leading-relaxed font-medium">
                  {t("auth.overlay.login_desc") || "Air-gapped computational access for authenticated AEC enterprise clients."}
                </p>
                <div className="pt-2 border-t border-slate-700/60 w-full max-w-[240px]">
                  <p className="text-xs text-slate-400">
                    {t("auth.overlay.login_prompt") || "Need a test environment?"}{" "}
                    <button 
                      onClick={() => setIsLogin(false)}
                      className="text-purple-400 font-bold hover:text-purple-300 transition-colors ml-1"
                    >
                      {t("auth.overlay.login_action") || "Request Sandbox"}
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup-overlay"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-inner">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-white tracking-tight">{t("auth.overlay.signup_title") || "Tenant Sandbox"}</h2>
                <p className="text-slate-300 text-sm mb-6 max-w-[280px] leading-relaxed font-medium">
                  {t("auth.overlay.signup_desc") || "Provision an isolated test environment for ISO 19650 and IFC schema validation."}
                </p>
                <div className="pt-2 border-t border-slate-700/60 w-full max-w-[240px]">
                  <p className="text-xs text-slate-400">
                    {t("auth.overlay.signup_prompt") || "Already registered?"}{" "}
                    <button 
                      onClick={() => setIsLogin(true)}
                      className="text-purple-400 font-bold hover:text-purple-300 transition-colors ml-1"
                    >
                      {t("auth.overlay.signup_action") || "Client Login"}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mobile toggle */}
        <div className={`md:hidden absolute inset-0 bg-white z-20 transition-transform duration-500 ${isLogin ? 'translate-x-full' : 'translate-x-0'}`} style={{ pointerEvents: 'none' }}>
        </div>
      </div>
    </div>
  );
}
