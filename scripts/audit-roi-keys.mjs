import fs from "node:fs";

// Load all merged translations for each locale exactly as translations/index.js does
function loadLocale(lang) {
  const files = [
    "common.json", "about.json", "services.json", "projects.json",
    "contact.json", "privacy.json", "terms.json", "education.json",
    "careers.json", "footer.json", "header.json", "portal.json",
    "auth.json", "cookie.json"
  ];
  let merged = {};
  for (const f of files) {
    const path = `lib/translations/${lang}/${f}`;
    if (fs.existsSync(path)) {
      merged = { ...merged, ...JSON.parse(fs.readFileSync(path, "utf8")) };
    }
  }
  return merged;
}

const en = loadLocale("en");
const it = loadLocale("it");
const de = loadLocale("de");

const code = fs.readFileSync("components/contact/roi-matrix-section.js", "utf8");

// Match legitimate t("key") calls
const tKeyRegex = /\bt\(["']([a-zA-Z0-9_.-]+)["']\)/g;
let match;
const keys = new Set();
while ((match = tKeyRegex.exec(code)) !== null) {
  keys.add(match[1]);
}

console.log("Total unique t() translation keys in roi-matrix-section.js:", keys.size);

const missingEn = [];
const missingIt = [];
const missingDe = [];

for (const k of keys) {
  if (en[k] === undefined) missingEn.push(k);
  if (it[k] === undefined) missingIt.push(k);
  if (de[k] === undefined) missingDe.push(k);
}

console.log("Missing in EN (" + missingEn.length + "):", missingEn);
console.log("Missing in IT (" + missingIt.length + "):", missingIt);
console.log("Missing in DE (" + missingDe.length + "):", missingDe);

// Also audit any fallback expressions: t(...) || "..."
const fallbackRegex = /\bt\(["'][a-zA-Z0-9_.-]+["']\)\s*\|\|\s*["'`]([^"'`]+)["'`]/g;
const fallbacks = [];
while ((match = fallbackRegex.exec(code)) !== null) {
  fallbacks.push(match[0]);
}

console.log("Total t(...) || '...' fallbacks remaining:", fallbacks.length);
