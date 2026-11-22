"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      // Check for explicit cross-domain theme preference parameter (e.g. from language switch)
      let incomingPref = null;
      if (typeof window !== "undefined" && window.location.search) {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const prefParam = urlParams.get("theme_pref");
          if (prefParam === "dark" || prefParam === "light") {
            incomingPref = prefParam;
          }
        } catch (e) {}
      }

      const stored = localStorage.getItem("pybim_theme");
      const activeTheme = incomingPref || (stored === "dark" || stored === "light" ? stored : null);

      if (activeTheme) {
        setThemeState(activeTheme);
        applyTheme(activeTheme);
        if (incomingPref && incomingPref !== stored) {
          localStorage.setItem("pybim_theme", incomingPref);
        }
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setThemeState(initial);
        applyTheme(initial);
      }
    } catch (e) {
      // Fallback if localStorage is inaccessible
      applyTheme("light");
    }
    setMounted(true);
  }, []);

  function applyTheme(newTheme) {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (newTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }

  function setTheme(newTheme) {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      localStorage.setItem("pybim_theme", newTheme);
    } catch (e) {}
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
