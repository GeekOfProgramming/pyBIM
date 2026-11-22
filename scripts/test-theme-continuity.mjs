import assert from "assert";

console.log("=== RUNNING THEME CONTINUITY & CROSS-DOMAIN BRIDGE TESTS ===");

// Mock browser globals
class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

class MockClassList {
  constructor() {
    this.classes = new Set();
  }
  add(cls) {
    this.classes.add(cls);
  }
  remove(cls) {
    this.classes.delete(cls);
  }
  contains(cls) {
    return this.classes.has(cls);
  }
  toggle(cls, force) {
    if (force !== undefined) {
      if (force) this.add(cls);
      else this.remove(cls);
      return force;
    }
    if (this.contains(cls)) {
      this.remove(cls);
      return false;
    } else {
      this.add(cls);
      return true;
    }
  }
}

function simulateThemeInit({ search = "", storedTheme = null, prefersDark = false }) {
  const localStorage = new MockStorage();
  if (storedTheme) {
    localStorage.setItem("pybim_theme", storedTheme);
  }

  const documentElement = {
    classList: new MockClassList(),
  };

  let stateTheme = "light";
  function applyTheme(newTheme) {
    if (newTheme === "dark") {
      documentElement.classList.add("dark");
    } else {
      documentElement.classList.remove("dark");
    }
  }

  // ThemeContext logic under test
  let incomingPref = null;
  if (search) {
    try {
      const urlParams = new URLSearchParams(search);
      const prefParam = urlParams.get("theme_pref");
      if (prefParam === "dark" || prefParam === "light") {
        incomingPref = prefParam;
      }
    } catch (e) {}
  }

  const stored = localStorage.getItem("pybim_theme");
  const activeTheme = incomingPref || (stored === "dark" || stored === "light" ? stored : null);

  if (activeTheme) {
    stateTheme = activeTheme;
    applyTheme(activeTheme);
    if (incomingPref && incomingPref !== stored) {
      localStorage.setItem("pybim_theme", incomingPref);
    }
  } else {
    const initial = prefersDark ? "dark" : "light";
    stateTheme = initial;
    applyTheme(initial);
  }

  return {
    stateTheme,
    isDarkClass: documentElement.classList.contains("dark"),
    storedInStorage: localStorage.getItem("pybim_theme"),
  };
}

// 1. Direct visit with no previous preference follows system prefers-color-scheme
console.log("1. Testing default fallback to prefers-color-scheme...");
const res1 = simulateThemeInit({ search: "", storedTheme: null, prefersDark: false });
assert.strictEqual(res1.stateTheme, "light");
assert.strictEqual(res1.isDarkClass, false);
assert.strictEqual(res1.storedInStorage, null, "Should not arbitrarily write to storage without explicit choice");

const res2 = simulateThemeInit({ search: "", storedTheme: null, prefersDark: true });
assert.strictEqual(res2.stateTheme, "dark");
assert.strictEqual(res2.isDarkClass, true);
assert.strictEqual(res2.storedInStorage, null, "Should not arbitrarily write to storage without explicit choice");
console.log("   ✓ Default correctly honors system prefers-color-scheme without polluting localStorage");

// 2. Normal visit with existing local preference
console.log("2. Testing normal visit with existing local preference...");
const res3 = simulateThemeInit({ search: "", storedTheme: "dark", prefersDark: false });
assert.strictEqual(res3.stateTheme, "dark");
assert.strictEqual(res3.isDarkClass, true);
assert.strictEqual(res3.storedInStorage, "dark");

const res4 = simulateThemeInit({ search: "", storedTheme: "light", prefersDark: true });
assert.strictEqual(res4.stateTheme, "light");
assert.strictEqual(res4.isDarkClass, false);
assert.strictEqual(res4.storedInStorage, "light");
console.log("   ✓ Saved local preference takes precedence over system setting");

// 3. Explicit cross-domain navigation with theme_pref
console.log("3. Testing explicit cross-domain navigation with theme_pref...");
const res5 = simulateThemeInit({ search: "?lang_pref=it&theme_pref=dark&_gl=1*abc", storedTheme: null, prefersDark: false });
assert.strictEqual(res5.stateTheme, "dark");
assert.strictEqual(res5.isDarkClass, true);
assert.strictEqual(res5.storedInStorage, "dark", "Should persist incoming explicit cross-domain theme");

const res6 = simulateThemeInit({ search: "?lang_pref=en&theme_pref=light&_gl=1*abc", storedTheme: "dark", prefersDark: true });
assert.strictEqual(res6.stateTheme, "light", "Incoming explicit switch should update destination theme");
assert.strictEqual(res6.isDarkClass, false);
assert.strictEqual(res6.storedInStorage, "light");
console.log("   ✓ Cross-domain theme parameter smoothly transfers and persists active theme");

// 4. Sanitize invalid or malicious theme_pref parameters
console.log("4. Testing injection and invalid value defense on theme_pref...");
const res7 = simulateThemeInit({ search: "?theme_pref=<script>alert(1)</script>", storedTheme: "light", prefersDark: false });
assert.strictEqual(res7.stateTheme, "light");
assert.strictEqual(res7.isDarkClass, false);
assert.strictEqual(res7.storedInStorage, "light");

const res8 = simulateThemeInit({ search: "?theme_pref=blue", storedTheme: null, prefersDark: true });
assert.strictEqual(res8.stateTheme, "dark");
assert.strictEqual(res8.isDarkClass, true);
console.log("   ✓ Strict allowlist ('dark' | 'light') rejects unknown or malicious theme parameters");

// 5. Test URL parameter cleanup while preserving _gl
console.log("5. Testing URL cleanup preserving _gl (GA4 linker)...");
function simulateParamCleanup(rawUrl) {
  const url = new URL(rawUrl);
  let urlModified = false;
  if (url.searchParams.has('lang_pref')) {
    url.searchParams.delete('lang_pref');
    urlModified = true;
  }
  if (url.searchParams.has('theme_pref')) {
    url.searchParams.delete('theme_pref');
    urlModified = true;
  }
  const newSearch = url.searchParams.toString() ? `?${url.searchParams.toString()}` : '';
  return url.pathname + newSearch + url.hash;
}

const cleanedUrl1 = simulateParamCleanup("https://www.pybim.it/it?lang_pref=it&theme_pref=dark&_gl=1*123xyz*GA*456#contact");
assert.strictEqual(cleanedUrl1, "/it?_gl=1*123xyz*GA*456#contact", "_gl and hash must be strictly preserved");

const cleanedUrl2 = simulateParamCleanup("https://www.pybim.com/en?lang_pref=en&theme_pref=light");
assert.strictEqual(cleanedUrl2, "/en", "Entire query string removed if only ephemeral prefs were present");
console.log("   ✓ URL cleanup cleanly removes lang_pref and theme_pref while preserving _gl and hash");

console.log("\n=== ALL THEME CONTINUITY & CROSS-DOMAIN BRIDGE TESTS PASSED ===");
