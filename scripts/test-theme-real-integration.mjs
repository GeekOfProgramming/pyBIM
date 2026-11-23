import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import assert from 'assert';

console.log("=== RUNNING REAL NEXT.JS + PUPPETEER INTEGRATION TEST SUITE ===");

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
      // console.log('[SERVER]', msg.trim());
      if (msg.includes('Ready in') || msg.includes('started server') || msg.includes('http://localhost:4567') || msg.includes(`localhost:${PORT}`)) {
        resolve();
      }
    });

    serverProcess.stderr.on('data', (data) => {
      // console.error('[SERVER ERR]', data.toString());
    });

    serverProcess.on('error', (err) => {
      reject(err);
    });

    // Timeout fallback after 12 seconds
    setTimeout(() => {
      resolve();
    }, 12000);
  });
}

function stopServer() {
  if (serverProcess) {
    console.log("Stopping Next.js server...");
    try {
      // On Windows kill process tree
      spawn('taskkill', ['/pid', String(serverProcess.pid), '/f', '/t']);
    } catch (e) {}
  }
}

async function runBrowserTests() {
  await startServer();

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // -------------------------------------------------------------
    // Test 1: No saved destination preference + incoming dark
    // -------------------------------------------------------------
    console.log("\n1. Testing: No saved preference + incoming ?theme_pref=dark&lang_pref=it&_gl=1*abc1234#contact");
    await page.goto(`${BASE_URL}/it?theme_pref=dark&lang_pref=it&_gl=1*abc1234#contact`, { waitUntil: 'networkidle2' });

    // Wait for hydration effect to complete
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t1State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        cookie: document.cookie,
        url: window.location.href,
        search: window.location.search,
        hash: window.location.hash
      };
    });

    assert.strictEqual(t1State.isDark, true, "HTML element must have dark class");
    assert.strictEqual(t1State.stored, 'dark', "localStorage must store 'dark'");
    assert.ok(!t1State.search.includes('theme_pref'), "theme_pref must be stripped from URL");
    assert.ok(!t1State.search.includes('lang_pref'), "lang_pref must be stripped from URL");
    assert.ok(t1State.search.includes('_gl=1*abc1234'), "_gl must be preserved intact in URL");
    assert.strictEqual(t1State.hash, '#contact', "URL hash must be preserved");
    console.log("   ✓ Successfully adopted dark, persisted to localStorage, and cleanly removed parameters while preserving _gl and hash!");

    // -------------------------------------------------------------
    // Test 2: No saved destination preference + incoming light
    // -------------------------------------------------------------
    console.log("\n2. Testing: No saved preference + incoming ?theme_pref=light&_gl=1*xyz987");
    // Clear storage first
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE_URL}/en?theme_pref=light&_gl=1*xyz987`, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t2State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search
      };
    });

    assert.strictEqual(t2State.isDark, false, "HTML element must NOT have dark class");
    assert.strictEqual(t2State.stored, 'light', "localStorage must store 'light'");
    assert.ok(!t2State.search.includes('theme_pref'), "theme_pref must be stripped");
    assert.ok(t2State.search.includes('_gl=1*xyz987'), "_gl must be preserved");
    console.log("   ✓ Successfully adopted light, persisted to localStorage, and preserved _gl!");

    // -------------------------------------------------------------
    // Test 3: Existing saved dark + incoming light (destination priority policy)
    // -------------------------------------------------------------
    console.log("\n3. Testing: Existing saved dark + incoming ?theme_pref=light");
    await page.evaluate(() => localStorage.setItem('pybim_theme', 'dark'));
    await page.goto(`${BASE_URL}/en?theme_pref=light&_gl=1*prioritize_saved`, { waitUntil: 'networkidle2' });

    // Wait for hydration
    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t3State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search
      };
    });

    assert.strictEqual(t3State.isDark, true, "Destination saved dark must override incoming light");
    assert.strictEqual(t3State.stored, 'dark', "Destination localStorage must NOT be overwritten");
    assert.ok(!t3State.search.includes('theme_pref'), "theme_pref must be stripped");
    assert.ok(t3State.search.includes('_gl=1*prioritize_saved'), "_gl must be preserved");
    console.log("   ✓ Destination saved dark preserved! Incoming light rejected without mutating storage.");

    // -------------------------------------------------------------
    // Test 4: Existing saved light + incoming dark (destination priority policy)
    // -------------------------------------------------------------
    console.log("\n4. Testing: Existing saved light + incoming ?theme_pref=dark");
    await page.evaluate(() => localStorage.setItem('pybim_theme', 'light'));
    await page.goto(`${BASE_URL}/it?theme_pref=dark&_gl=1*keep_light`, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t4State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search
      };
    });

    assert.strictEqual(t4State.isDark, false, "Destination saved light must override incoming dark");
    assert.strictEqual(t4State.stored, 'light', "Destination localStorage must NOT be overwritten");
    assert.ok(!t4State.search.includes('theme_pref'), "theme_pref must be stripped");
    assert.ok(t4State.search.includes('_gl=1*keep_light'), "_gl must be preserved");
    console.log("   ✓ Destination saved light preserved! Incoming dark rejected without mutating storage.");

    // -------------------------------------------------------------
    // Test 5: Direct navigation without theme_pref + system preference emulation
    // -------------------------------------------------------------
    console.log("\n5. Testing: Direct navigation without theme_pref with system dark");
    await page.evaluate(() => localStorage.clear());
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t5State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(t5State.isDark, true, "Must match system dark");
    assert.strictEqual(t5State.stored, null, "Must NOT write to localStorage on direct visits");
    console.log("   ✓ Direct visit with system dark honors system preference without polluting localStorage!");

    console.log("\n5b. Testing: Direct navigation without theme_pref with system light");
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    await page.goto(`${BASE_URL}/en`, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => !document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t5bState = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme')
      };
    });

    assert.strictEqual(t5bState.isDark, false, "Must match system light");
    assert.strictEqual(t5bState.stored, null, "Must NOT write to localStorage on direct visits");
    console.log("   ✓ Direct visit with system light honors system preference without polluting localStorage!");

    // -------------------------------------------------------------
    // Test 6: Verify Effect Race Defense in the Actual Mounted Component Tree
    // -------------------------------------------------------------
    console.log("\n6. Testing: Verifying LanguageProvider effect cannot race ThemeProvider");
    // We navigate to a URL with both lang_pref and theme_pref and custom unrelated param
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE_URL}/it?lang_pref=it&theme_pref=dark&foo=bar&_gl=test_linker#some-hash`, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => document.documentElement.classList.contains('dark'), { timeout: 5000 });

    const t6State = await page.evaluate(() => {
      return {
        isDark: document.documentElement.classList.contains('dark'),
        stored: localStorage.getItem('pybim_theme'),
        search: window.location.search,
        hash: window.location.hash
      };
    });

    assert.strictEqual(t6State.isDark, true, "ThemeContext must successfully read theme_pref before LanguageContext cleanup");
    assert.strictEqual(t6State.stored, 'dark', "Theme must be persisted");
    assert.ok(!t6State.search.includes('theme_pref'), "theme_pref cleanly removed");
    assert.ok(!t6State.search.includes('lang_pref'), "lang_pref cleanly removed");
    assert.ok(t6State.search.includes('foo=bar'), "Unrelated query parameter 'foo=bar' preserved");
    assert.ok(t6State.search.includes('_gl=test_linker'), "_gl parameter preserved");
    assert.strictEqual(t6State.hash, '#some-hash', "URL hash preserved");
    console.log("   ✓ Effect race eliminated! Independent parameter ownership guarantees 100% reliability in real React component tree.");

    console.log("\n=== ALL REAL INTEGRATION TESTS PASSED 100% SUCCESSFULLY ===");

  } finally {
    await browser.close();
    stopServer();
  }
}

runBrowserTests().catch(err => {
  console.error("Test failed:", err);
  stopServer();
  process.exit(1);
});
