"use client";

import Link from "@/components/layout/LocalizedLink";
import { usePathname, useRouter, useParams } from "next/navigation";
import { 
  Shield, 
  LayoutDashboard, 
  TerminalSquare, 
  Server, 
  LifeBuoy, 
  LogOut, 
  UserCircle, 
  Settings 
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function PortalLayoutClient({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const { t } = useLanguage();
  const [loggingOut, setLoggingOut] = useState(false);

  const navigation = [
    { name: t("portal.nav.dashboard"), href: "/portal/dashboard", icon: LayoutDashboard },
    { name: t("portal.nav.executions"), href: "/portal/executions", icon: TerminalSquare },
    { name: t("portal.nav.infrastructure"), href: "/portal/infrastructure", icon: Server },
    { name: t("portal.nav.support"), href: "/portal/support", icon: LifeBuoy },
    { name: t("portal.nav.settings"), href: "/portal/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}/login`);
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-[#09090b] text-slate-300 font-sans selection:bg-purple-500/30">
      
      {/* SIDEBAR (20% WIDTH, FIXED / STICKY ON DESKTOP) */}
      <aside className="w-full lg:w-[20%] lg:min-w-[250px] flex flex-col bg-[#0f1115] border-r border-neutral-800 shrink-0 relative z-20 sticky top-[80px] h-auto lg:h-[calc(100vh-80px)]">
        
        {/* Enterprise Brand Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 transition-all">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wider">{t("portal.sidebar.brand")}</div>
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">{t("portal.sidebar.core")}</div>
            </div>
          </Link>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          <div className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-widest mb-3 px-3">
            {t("portal.sidebar.routes")}
          </div>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href) || pathname.includes(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-lg transition-all font-medium text-sm ${
                  isActive 
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-sm" 
                    : "text-neutral-400 hover:bg-[#16181f] hover:text-white border border-transparent"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-neutral-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Active User Identifier & Secure Log Out Action */}
        <div className="p-4 border-t border-neutral-800 bg-[#0c0d11]">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <UserCircle className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{t("portal.sidebar.role")}</div>
              <div className="text-[11px] font-mono text-purple-400/90 truncate">demo@pybim.it</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-mono font-semibold transition-all border border-red-500/20 disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? t("portal.sidebar.terminating") : t("portal.sidebar.logout")}
          </button>
        </div>
      </aside>

      {/* MAIN VIEW (80% WIDTH, DYNAMIC) */}
      <main className="w-full lg:w-[80%] flex-1 overflow-y-auto bg-[#09090b] relative z-10">
        <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
