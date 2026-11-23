import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import assert from 'assert';

console.log("=== RUNNING PRE-FIRST-PAINT THEME FLASH (FOUC) VERIFICATION SUITE ===");

const PORT = 4567;
const BASE_URL = `http://localhost:${PORT}`;

let serverProcess;

function startServer() {
  return new Promise((resolve, reject) => {
    console.log(`Starting Next.js production server on port ${PORT}...`);
    serverProcess = spawn('npm.cmd', ['run', 'start', '--', '-p', String(PORT)], {
      cwd: 'C:/bim',
      shell: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    serverProcess.stdout.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('Ready in') || msg.includes('started server') || msg.includes('http://localhost:4567') || msg.includes(`localhost:${PORT}`)) {
        resolve();
      }
    });

    serverProcess.on('error', (err) => {
      reject(err);
    });

    setTimeout(() => {
      resolve();
    }, 12000);
  });
}

function stopServer() {
  if (serverProcess) {
    console.log("Stopping Next.js server...");
    try {
      spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t']);
    } catch (e) {}
  }
}

async function runFOUCTests() {
  await startServer();

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Track hydration warnings or errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('Warning: Text content did not match') || msg.text().includes('Hydration failed')) {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // -----------------------------------------------------------------------------------
    // Test 1: Cold visit with system Dark (DOMContentLoaded observation)
    // -----------------------------------------------------------------------------------
    console.log("\n1. Testing: Cold visit with system Dark (DOMContentLoaded observation)...");
    await page.evaluateOnNewDocument(() => {
      localStorage.clear();
    });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

    // Intercept document parsing before external resources / React bundles finish
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' });

    const domLoaded1 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        hasInitScript: !!document.getElementById('pybim-theme-init'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(domLoaded1.isDark, true, "document.documentElement must already have 'dark' class at domcontentloaded before React loads");
    assert.strictEqual(domLoaded1.hasInitScript, true, "#pybim-theme-init must be present in <head>");
    assert.strictEqual(domLoaded1.stored, null, "Must not write system fallback to localStorage");

    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });
    console.log("   ✓ Pre-first-paint theme is dark! Zero FOUC observed, no system fallback persisted.");

    // -----------------------------------------------------------------------------------
    // Test 2: Cold visit with system Light
    // -----------------------------------------------------------------------------------
    console.log("\n2. Testing: Cold visit with system Light...");
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' });

    const domLoaded2 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(domLoaded2.isDark, false, "Must not have dark class at domcontentloaded");
    assert.strictEqual(domLoaded2.stored, null);
    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'), { timeout: 5000 });
    console.log("   ✓ Pre-first-paint theme is light!");

    // -----------------------------------------------------------------------------------
    // Test 3: Saved Dark preference (when system is light)
    // -----------------------------------------------------------------------------------
    console.log("\n3. Testing: Saved Dark preference with system Light...");
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('pybim_theme', 'dark');
    });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' });

    const domLoaded3 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(domLoaded3.isDark, true, "Must have dark class immediately at domcontentloaded");
    assert.strictEqual(domLoaded3.stored, 'dark');
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });
    console.log("   ✓ Pre-first-paint theme is dark from saved preference! Zero FOUC.");

    // -----------------------------------------------------------------------------------
    // Test 4: Saved Light preference (when system is dark)
    // -----------------------------------------------------------------------------------
    console.log("\n4. Testing: Saved Light preference with system Dark...");
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('pybim_theme', 'light');
    });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'domcontentloaded' });

    const domLoaded4 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(domLoaded4.isDark, false, "Must not have dark class at domcontentloaded");
    assert.strictEqual(domLoaded4.stored, 'light');
    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'), { timeout: 5000 });
    console.log("   ✓ Pre-first-paint theme is light from saved preference!");

    // -----------------------------------------------------------------------------------
    // Test 5: Incoming ?theme_pref=dark (No stored preference, system is light)
    // -----------------------------------------------------------------------------------
    console.log("\n5. Testing: Incoming ?theme_pref=dark with system Light...");
    await page.evaluateOnNewDocument(() => {
      localStorage.clear();
    });
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${BASE_URL}/it?theme_pref=dark&lang_pref=it&_gl=1*abc`, { waitUntil: 'domcontentloaded' });

    const domLoaded5 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark')
      };
    });

    assert.strictEqual(domLoaded5.isDark, true, "Must have dark class at domcontentloaded from incoming theme_pref");

    await page.waitForFunction(() => {
      const url = new URL(window.location.href);
      return !url.searchParams.has('theme_pref');
    }, { timeout: 5000 });

    const final5 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search
      };
    });

    assert.strictEqual(final5.isDark, true);
    assert.strictEqual(final5.stored, 'dark', "ThemeProvider must persist incoming theme on mount");
    assert.ok(!final5.search.includes('theme_pref'), "theme_pref must be stripped");
    assert.ok(final5.search.includes('_gl=1*abc'), "_gl must be preserved");
    console.log("   ✓ Immediate dark class applied before first paint and persisted cleanly!");

    // -----------------------------------------------------------------------------------
    // Test 6: Conflicting destination preference (Saved Dark, incoming theme_pref=light)
    // -----------------------------------------------------------------------------------
    console.log("\n6. Testing: Destination saved Dark vs incoming theme_pref=light...");
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('pybim_theme', 'dark');
    });
    await page.goto(`${BASE_URL}/it?theme_pref=light&_gl=1*keep_dark`, { waitUntil: 'domcontentloaded' });

    const domLoaded6 = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    assert.strictEqual(domLoaded6, true, "Pre-first-paint must prioritize saved dark over incoming light");

    await page.waitForFunction(() => {
      const url = new URL(window.location.href);
      return !url.searchParams.has('theme_pref');
    }, { timeout: 5000 });

    const final6 = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search
      };
    });

    assert.strictEqual(final6.isDark, true, "Theme remains dark");
    assert.strictEqual(final6.stored, 'dark', "Saved preference not mutated");
    assert.ok(!final6.search.includes('theme_pref'));
    console.log("   ✓ Saved destination Dark strictly overrides incoming light before first paint!");

    // -----------------------------------------------------------------------------------
    // Test 7: Verify Zero Hydration Warnings or React Errors
    // -----------------------------------------------------------------------------------
    console.log("\n7. Testing: Verifying Zero Hydration Warnings/Errors across all runs...");
    assert.strictEqual(consoleErrors.length, 0, `Expected zero hydration errors, got: ${JSON.stringify(consoleErrors)}`);
    console.log("   ✓ Zero hydration mismatches detected!");

    console.log("\n=== ALL PRE-FIRST-PAINT FOUC TESTS PASSED 100% SUCCESSFULLY ===");

  } finally {
    await browser.close();
    stopServer();
  }
}

runFOUCTests().catch(err => {
  console.error("Test failed:", err);
  stopServer();
  process.exit(1);
});
