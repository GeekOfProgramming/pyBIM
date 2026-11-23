import assert from "assert";

console.log("=== RUNNING FOCUSED DEV-MAINT-03A THEME VERIFICATION ===");

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
}

function simulateThemeInit({ search = "", rawStored = null, prefersDark = false }) {
  const localStorage = new MockStorage();
  if (rawStored !== null) {
    localStorage.setItem("pybim_theme", rawStored);
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

  // Exact ThemeContext logic
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

  const storedVal = localStorage.getItem("pybim_theme");
  const stored = storedVal === "dark" || storedVal === "light" ? storedVal : null;
  const activeTheme = stored || incomingPref;

  if (activeTheme) {
    stateTheme = activeTheme;
    applyTheme(activeTheme);
    if (!stored && incomingPref) {
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

// Case 1: Source is Light, destination has Dark saved -> Must stay Dark (destination preference priority)
console.log("1. Case 1: Source is Light, destination has Dark saved...");
const c1 = simulateThemeInit({ search: "?theme_pref=light&lang_pref=it", rawStored: "dark", prefersDark: false });
assert.strictEqual(c1.stateTheme, "dark", "Saved destination preference must take priority over incoming light");
assert.strictEqual(c1.isDarkClass, true);
assert.strictEqual(c1.storedInStorage, "dark", "Destination storage must not be overwritten");
console.log("   ✓ Saved destination 'dark' preserved, incoming 'light' ignored");

// Case 2: Source is Dark, destination has Light saved -> Must stay Light (destination preference priority)
console.log("2. Case 2: Source is Dark, destination has Light saved...");
const c2 = simulateThemeInit({ search: "?theme_pref=dark&lang_pref=it", rawStored: "light", prefersDark: true });
assert.strictEqual(c2.stateTheme, "light", "Saved destination preference must take priority over incoming dark");
assert.strictEqual(c2.isDarkClass, false);
assert.strictEqual(c2.storedInStorage, "light", "Destination storage must not be overwritten");
console.log("   ✓ Saved destination 'light' preserved, incoming 'dark' ignored");

// Case 3: Destination has no stored theme -> Must adopt incoming theme_pref and persist
console.log("3. Case 3: Destination has no stored theme (incoming dark)...");
const c3a = simulateThemeInit({ search: "?theme_pref=dark&lang_pref=it", rawStored: null, prefersDark: false });
assert.strictEqual(c3a.stateTheme, "dark");
assert.strictEqual(c3a.isDarkClass, true);
assert.strictEqual(c3a.storedInStorage, "dark", "Should persist incoming theme when destination has no stored preference");
console.log("   ✓ Adopted and persisted incoming 'dark'");

console.log("3b. Case 3b: Destination has no stored theme (incoming light)...");
const c3b = simulateThemeInit({ search: "?theme_pref=light&lang_pref=it", rawStored: null, prefersDark: true });
assert.strictEqual(c3b.stateTheme, "light");
assert.strictEqual(c3b.isDarkClass, false);
assert.strictEqual(c3b.storedInStorage, "light", "Should persist incoming theme when destination has no stored preference");
console.log("   ✓ Adopted and persisted incoming 'light'");

// Case 4: Destination has an invalid stored value (e.g. corrupted localStorage) -> Treat as null
console.log("4. Case 4: Destination has an invalid stored value...");
const c4a = simulateThemeInit({ search: "?theme_pref=dark", rawStored: "corrupted_theme", prefersDark: false });
assert.strictEqual(c4a.stateTheme, "dark", "Invalid stored value should be treated as unset; incoming pref adopted");
assert.strictEqual(c4a.isDarkClass, true);
assert.strictEqual(c4a.storedInStorage, "dark", "Invalid value overwritten with valid incoming pref");

const c4b = simulateThemeInit({ search: "", rawStored: "corrupted_theme", prefersDark: true });
assert.strictEqual(c4b.stateTheme, "dark", "Invalid stored value without incoming pref falls back to system preference");
assert.strictEqual(c4b.isDarkClass, true);
console.log("   ✓ Invalid stored values safely ignored and treated as unset");

// Case 5: User navigates directly without theme_pref
console.log("5. Case 5: Direct navigation without theme_pref...");
const c5a = simulateThemeInit({ search: "", rawStored: "dark", prefersDark: false });
assert.strictEqual(c5a.stateTheme, "dark");
assert.strictEqual(c5a.storedInStorage, "dark");

const c5b = simulateThemeInit({ search: "", rawStored: null, prefersDark: true });
assert.strictEqual(c5b.stateTheme, "dark");
assert.strictEqual(c5b.storedInStorage, null, "Direct visit without preference must not write to localStorage");

const c5c = simulateThemeInit({ search: "", rawStored: null, prefersDark: false });
assert.strictEqual(c5c.stateTheme, "light");
assert.strictEqual(c5c.storedInStorage, null);
console.log("   ✓ Direct visits respect saved preference, or fall back to system preference without polluting storage");

// Task 2: URL Cleanup & Parameter Preservation
console.log("6. Testing URL parameter cleanup & preservation...");
function simulateUrlCleanup(rawUrl) {
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

const cleaned1 = simulateUrlCleanup("https://www.pybim.it/it?lang_pref=it&theme_pref=dark&_gl=1*abc123*GA*456&custom=true#section");
assert.strictEqual(cleaned1, "/it?_gl=1*abc123*GA*456&custom=true#section");
console.log("   ✓ Cleanup preserves _gl, custom parameters, and hash intact");

console.log("\n=== ALL DEV-MAINT-03A TESTS PASSED SUCCESSFULLY ===");
