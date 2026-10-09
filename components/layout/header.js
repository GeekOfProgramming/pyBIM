"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, ChevronRight, Briefcase, FileText, Code2, Users, Building, Activity, Shield, Terminal, Cog, Calculator, UserCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/", tKey: "header.nav.home" },
  { href: "/services", tKey: "header.nav.services" },
  { href: "/education", tKey: "header.nav.education" },
];

const pyBimLeftMenu = [
  { id: "who_we_are", labelKey: "header.mega.who_we_are", href: "/about" },
  { id: "success_stories", labelKey: "header.mega.success_stories", href: "/success-stories" },
  { id: "work_with_us", labelKey: "header.mega.work_with_us", href: "/careers" },
  { id: "contact_us", labelKey: "header.mega.contact_us", href: "/contact" },
];

const pyBimRightMenu = {
  who_we_are: [
    { labelKey: "header.mega.manifesto", icon: Terminal, href: "/about#manifesto" },
    { labelKey: "header.mega.journey", icon: Activity, href: "/about#journey" },
    { labelKey: "header.mega.tech_stack", icon: Code2, href: "/about#tech-stack" },
    { labelKey: "header.mega.impact", icon: Shield, href: "/about#impact" },
    { labelKey: "header.mega.team", icon: Users, href: "/about#team" },
  ],
  success_stories: [
    { labelKey: "header.mega.completed_projects", icon: Briefcase, href: "/success-stories#completed-projects" },
    { labelKey: "header.mega.in_development", icon: FileText, href: "/success-stories#in-development" },
    { labelKey: "header.mega.testimonials", icon: Users, href: "/success-stories#testimonials" },
  ],
  work_with_us: [
    { labelKey: "header.mega.culture_benefits", icon: Users, href: "/careers#culture" },
    { labelKey: "header.mega.open_positions", icon: Briefcase, href: "/careers#positions" },
    { labelKey: "header.mega.life_at_pybim", icon: Building, href: "/careers#life" },
  ],
  contact_us: [
    { labelKey: "header.mega.audit", icon: Briefcase, href: "/contact#audit" },
    { labelKey: "header.mega.direct_channels", icon: Building, href: "/contact#direct-channels" },
    { labelKey: "header.mega.roi_matrix", icon: Calculator, href: "/contact#calculator" },
    { labelKey: "header.mega.faq", icon: Cog, href: "/contact#support" },
  ],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaMenuItem, setActiveMegaMenuItem] = useState("who_we_are");
  
  const { t, language, changeLanguage, getLocalizedUrl } = useLanguage();
  const { theme, mounted } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Synchronize active mega-menu group with current route (e.g. Success Stories when on /success-stories)
  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes("/success-stories") || pathname.includes("/projects")) {
      setActiveMegaMenuItem("success_stories");
    } else if (pathname.includes("/about")) {
      setActiveMegaMenuItem("who_we_are");
    } else if (pathname.includes("/careers")) {
      setActiveMegaMenuItem("work_with_us");
    } else if (pathname.includes("/contact")) {
      setActiveMegaMenuItem("contact_us");
    }
  }, [pathname]);

  // Close mega menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && megaMenuOpen) {
        setMegaMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [megaMenuOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const logoSrc = (mounted && theme === "dark")
    ? "/logo_white_transparent.png"
    : "/logo_black_transparent.png";

  return (
    <header className={`sticky top-0 z-[1000] border-b border-brand-border bg-white/95 dark:bg-brand-base/90 dark:border-white/10 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "py-2 shadow-sm" : "py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300">
        <Link href={`/${language}`} className="flex items-center gap-4 text-left" aria-label={t("header.brand.aria_label") || "pyBIM home"}>
          <div className="flex items-center">
            <Image 
              src={logoSrc} 
              alt={t("header.brand.logo_alt") || "pyBIM logo"} 
              width={180} 
              height={80} 
              className={`w-auto object-contain transition-all duration-300 ${isScrolled ? "h-10" : "h-14"}`} 
              priority
            />
          </div>
        </Link>
        <nav className="hidden items-center gap-2 text-sm lg:flex">
          {navItems.map((item) => {
            const localizedHref = getLocalizedUrl(item.href);
            const isActive = pathname === localizedHref || pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={localizedHref} 
                className={`transition px-4 py-2 rounded-full font-medium ${isActive ? "text-brand-primary bg-brand-primary/10" : "text-brand-textSecondary hover:text-brand-primary hover:bg-brand-surface"}`}
              >
                {t(item.tKey)}
              </Link>
            );
          })}

          {/* Megamenu Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <button 
              id="pybim-megamenu-trigger"
              aria-haspopup="true"
              aria-expanded={megaMenuOpen}
              aria-controls="pybim-megamenu-dropdown"
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className={`flex items-center gap-1 transition px-4 py-2 rounded-full font-medium ${megaMenuOpen ? 'text-brand-primary bg-brand-surface' : 'text-brand-textSecondary hover:text-brand-primary hover:bg-brand-surface'}`}
            >
              {t("header.nav.pybim") || "pyBIM"} <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Megamenu Dropdown */}
            {megaMenuOpen && (
              <div 
                id="pybim-megamenu-dropdown"
                role="region"
                aria-label="pyBIM Menu"
                className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[600px] z-[1000]"
              >
                <div className="bg-white dark:bg-slate-900 border border-brand-border dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex ring-1 ring-black/5 dark:ring-white/5">
                  
                  {/* Left Column */}
                  <div className="w-[45%] bg-brand-surface dark:bg-slate-950/60 border-r border-brand-border dark:border-slate-800 p-4 flex flex-col gap-1">
                    {pyBimLeftMenu.map(item => {
                      const localizedHref = getLocalizedUrl(item.href);
                      const isCurrentPath = pathname === localizedHref || pathname.startsWith(localizedHref + "/") || pathname.startsWith(localizedHref + "#");
                      const isSelectedGroup = activeMegaMenuItem === item.id;
                      return (
                        <Link
                          key={item.id}
                          href={localizedHref}
                          onMouseEnter={() => setActiveMegaMenuItem(item.id)}
                          onClick={() => setMegaMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                            isSelectedGroup 
                              ? 'bg-white dark:bg-slate-800 shadow-sm text-brand-primary font-bold' 
                              : isCurrentPath
                              ? 'text-brand-primary font-semibold bg-white/50 dark:bg-slate-800/40'
                              : 'text-brand-textSecondary hover:bg-white dark:hover:bg-slate-800/60 hover:text-brand-primary font-medium'
                          }`}
                        >
                          <span className="text-sm tracking-wide">{t(item.labelKey)}</span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelectedGroup ? 'translate-x-1 text-brand-primary' : 'text-transparent'}`} />
                        </Link>
                      );
                    })}
                  </div>

                  {/* Right Column */}
                  <div className="w-[55%] bg-white dark:bg-slate-900 p-6">
                    <div className="flex flex-col gap-4 h-full justify-center">
                      {pyBimRightMenu[activeMegaMenuItem].map((subItem, idx) => {
                        const Icon = subItem.icon;
                        return (
                          <Link 
                            key={idx} 
                            href={getLocalizedUrl(subItem.href)} 
                            onClick={() => setMegaMenuOpen(false)}
                            className="group flex items-center gap-4 p-2 rounded-lg hover:bg-brand-surface dark:hover:bg-slate-800/60 transition"
                          >
                            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-surface dark:bg-slate-800 border border-brand-border dark:border-slate-700 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-sm text-brand-textPrimary group-hover:text-brand-primary transition-colors">{t(subItem.labelKey)}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </nav>
        <div className="flex items-center gap-3">
          
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Language Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 bg-brand-surface border border-brand-border px-3 py-2 rounded-full transition hover:border-brand-primary/50 hover:bg-brand-surfaceHover"
            >
              <Globe className="w-4 h-4 text-brand-textSecondary" />
              <span className="text-xs font-bold text-brand-textSecondary uppercase">{language}</span>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-24 bg-brand-base border border-brand-border rounded-xl overflow-hidden shadow-lg z-50">
                  {['en', 'it', 'de'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => { changeLanguage(lang); setLangOpen(false); }}
                      className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase transition ${language === lang ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-textSecondary hover:bg-brand-surface'}`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href={`/${language}/portal/dashboard`} className="hidden rounded-full bg-brand-accent px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-brand-accentHover hover:-translate-y-0.5 md:flex items-center gap-2 font-mono">
            <Shield className="w-3.5 h-3.5 text-white" />
            {t("header.portal_btn") || "Client Portal"}
          </Link>
        </div>
      </div>
    </header>
  );
}
