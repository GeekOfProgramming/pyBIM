"use client";

import { useTheme } from "@/lib/ThemeContext";
import { useLanguage } from "@/lib/LanguageContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useLanguage();

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-brand-surface border border-brand-border" />
    );
  }

  const isDark = theme === "dark";
  const label = isDark ? t("theme.switch_light") : t("theme.switch_dark");

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={label}
      title={label}
      className="relative flex items-center justify-center w-9 h-9 rounded-full bg-brand-surface border border-brand-border text-brand-textSecondary hover:text-brand-primary hover:border-brand-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm overflow-hidden"
    >
      <div className={`transition-transform duration-500 ${isDark ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
        <Moon className="w-4 h-4 text-brand-textSecondary" />
      </div>
      <div className={`absolute transition-transform duration-500 ${isDark ? "rotate-0 scale-100 opacity-100 text-amber-400" : "-rotate-180 scale-0 opacity-0"}`}>
        <Sun className="w-4 h-4 text-amber-400" />
      </div>
    </button>
  );
}
