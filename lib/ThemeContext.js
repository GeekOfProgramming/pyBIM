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
      let hasThemePrefParam = false;
      if (typeof window !== "undefined" && window.location.search) {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          if (urlParams.has("theme_pref")) {
            hasThemePrefParam = true;
            const prefParam = urlParams.get("theme_pref");
            if (prefParam === "dark" || prefParam === "light") {
              incomingPref = prefParam;
            }
          }
        } catch (e) {}
      }

      // Required product policy (DEV-MAINT-03A/03B):
      // 1. Existing explicit destination preference takes priority.
      // 2. Incoming theme_pref is applied only when no valid destination preference exists.
      // 3. System preference applies only when neither exists.
      const rawStored = localStorage.getItem("pybim_theme");
      const stored = rawStored === "dark" || rawStored === "light" ? rawStored : null;
      const activeTheme = stored || incomingPref;

      if (activeTheme) {
        setThemeState(activeTheme);
        applyTheme(activeTheme);
        // Persist only if adopting an incoming preference when no valid stored preference exists
        if (!stored && incomingPref) {
          localStorage.setItem("pybim_theme", incomingPref);
        }
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = prefersDark ? "dark" : "light";
        setThemeState(initial);
        applyTheme(initial);
      }

      // ThemeProvider strictly owns theme_pref cleanup:
      // Remove theme_pref with window.history.replaceState after consuming it,
      // preserving _gl, hashes, and any unrelated search parameters.
      if (hasThemePrefParam && typeof window !== "undefined") {
        try {
          const url = new URL(window.location.href);
          url.searchParams.delete("theme_pref");
          const newSearch = url.searchParams.toString() ? `?${url.searchParams.toString()}` : "";
          window.history.replaceState({}, "", url.pathname + newSearch + url.hash);
        } catch (e) {}
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
