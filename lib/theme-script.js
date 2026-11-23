/**
 * Synchronous early theme script to eliminate Flash of Unstyled Content (FOUC)
 *
 * Precedence Order (DEV-MAINT-03A/03B/03C):
 * 1. Valid destination localStorage preference ("dark" | "light")
 * 2. Valid incoming theme_pref URL query parameter ("dark" | "light")
 * 3. System prefers-color-scheme
 *
 * This script runs synchronously in <head> before first paint, adding .dark to
 * document.documentElement if the resolved theme is dark.
 * Parameter consumption and cleanup remain strictly owned by ThemeProvider.
 */
export const THEME_INIT_SCRIPT = `(function() {
  try {
    var stored = null;
    try {
      var raw = localStorage.getItem('pybim_theme');
      if (raw === 'dark' || raw === 'light') stored = raw;
    } catch (e) {}

    var incoming = null;
    if (window.location.search) {
      var match = window.location.search.match(/[?&]theme_pref=([^&#]*)/);
      if (match && (match[1] === 'dark' || match[1] === 'light')) {
        incoming = match[1];
      }
    }

    var theme = stored || incoming;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`;
