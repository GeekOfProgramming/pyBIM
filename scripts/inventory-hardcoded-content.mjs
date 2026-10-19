import fs from "node:fs";
import path from "node:path";

function scanDir(dir, results = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (item !== "node_modules" && item !== ".next" && item !== ".git") {
        scanDir(full, results);
      }
    } else if (item.endsWith(".js") || item.endsWith(".jsx")) {
      results.push(full);
    }
  }
  return results;
}

const componentFiles = scanDir("components");
const appFiles = scanDir("app");
const allFiles = [...componentFiles, ...appFiles];

const inventory = [];

for (const file of allFiles) {
  if (file.includes("roi-matrix-section.js")) continue;
  if (file.includes("/api/")) continue;
  const content = fs.readFileSync(file, "utf8");
  
  // Look for t("key") || "English Fallback" pattern
  const fallbackMatches = content.match(/t\([^)]+\)\s*\|\|\s*["'`]([^"'`]{4,})["'`]/g) || [];
  
  // Look for hardcoded JSX text strings >Text<
  const rawTextMatches = content.match(/>\s*([A-Za-z][A-Za-z0-9\s,.'’"!?–—-]{4,})\s*</g) || [];
  const meaningfulRaw = rawTextMatches.filter(m => {
    const clean = m.slice(1, -1).trim();
    if (clean.startsWith("/*") || clean.startsWith("//")) return false;
    if (clean.includes("className")) return false;
    if (clean.startsWith("&") && clean.endsWith(";")) return false;
    return true;
  });

  const totalFindings = fallbackMatches.length + meaningfulRaw.length;
  if (totalFindings > 0) {
    inventory.push({
      file: file.replace(/\\/g, "/"),
      fallbackCount: fallbackMatches.length,
      rawTextCount: meaningfulRaw.length,
      totalFindings,
      sampleFallback: fallbackMatches[0] || null,
      sampleRaw: meaningfulRaw[0] ? meaningfulRaw[0].slice(1, -1).trim() : null
    });
  }
}

inventory.sort((a, b) => b.totalFindings - a.totalFindings);

console.log("=== HARDCODED CONTENT / INLINE FALLBACK INVENTORY OUTSIDE ROI MATRIX ===");
console.log(`Total components with hardcoded content/fallbacks: ${inventory.length}`);
for (const item of inventory.slice(0, 20)) {
  console.log(`- ${item.file} (Total: ${item.totalFindings} | Fallbacks: ${item.fallbackCount}, Raw JSX: ${item.rawTextCount})`);
  if (item.sampleFallback) console.log(`    Sample fallback: ${item.sampleFallback.trim()}`);
  if (item.sampleRaw) console.log(`    Sample raw JSX: "${item.sampleRaw}"`);
}
