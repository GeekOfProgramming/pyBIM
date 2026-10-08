/**
 * @file scripts/capture-hero.js
 * @description Headless browser verification & screenshot capture tool for pyBIM Hero section.
 * 
 * Usage:
 *   node scripts/capture-hero.js
 * 
 * Optional Environment Variables:
 *   OUTPUT_DIR   - Directory where screenshots are saved (default: ./artifacts/screenshots)
 *   CHROME_PATH  - Path to Chrome or Edge executable
 *   BASE_URL     - Base URL of the running Next.js app (default: http://localhost:3000)
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

function findBrowserExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidatePaths = [
    // Windows Chrome
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // Windows Edge
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    // macOS
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    // Linux
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    'No Chromium executable found. Please set CHROME_PATH environment variable to your Chrome/Edge executable.'
  );
}

async function run() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const outputDir = process.env.OUTPUT_DIR || path.resolve(__dirname, '..', 'artifacts', 'screenshots');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const executablePath = findBrowserExecutable();
  console.log(`Using browser executable: ${executablePath}`);
  console.log(`Saving screenshots to: ${outputDir}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  // Pre-set cookie consent so banners do not obscure hero capture
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cookie_consent', 'all');
  });

  // 1. Desktop - 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/en/services`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('section[aria-label="Services Hero"]', { timeout: 10000 });

  // Force Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 700));

  const heroElement = await page.$('section[aria-label="Services Hero"]');
  await heroElement.screenshot({
    path: path.join(outputDir, 'hero_dark_desktop.png')
  });
  console.log('✓ Captured hero_dark_desktop.png');

  // Force Light Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 700));

  await heroElement.screenshot({
    path: path.join(outputDir, 'hero_light_desktop.png')
  });
  console.log('✓ Captured hero_light_desktop.png');

  // 2. Mobile - 390x844 (iPhone 14)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileHero = await page.$('section[aria-label="Services Hero"]');
  await mobileHero.screenshot({
    path: path.join(outputDir, 'hero_dark_mobile.png')
  });
  console.log('✓ Captured hero_dark_mobile.png');

  // Mobile Light Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  await mobileHero.screenshot({
    path: path.join(outputDir, 'hero_light_mobile.png')
  });
  console.log('✓ Captured hero_light_mobile.png');

  // 3. Tablet - 768x1024
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  const tabletHero = await page.$('section[aria-label="Services Hero"]');
  await tabletHero.screenshot({
    path: path.join(outputDir, 'hero_dark_tablet.png')
  });
  console.log('✓ Captured hero_dark_tablet.png');

  // Validate CTA links
  const primaryHref = await page.$eval('section[aria-label="Services Hero"] a[href*="contact"]', el => el.getAttribute('href'));
  const secondaryHref = await page.$eval('section[aria-label="Services Hero"] a[href*="roadmap"]', el => el.getAttribute('href'));
  console.log(`Primary CTA target: ${primaryHref}`);
  console.log(`Secondary CTA target: ${secondaryHref}`);

  if (consoleErrors.length > 0) {
    console.warn(`Encountered ${consoleErrors.length} console errors:`, consoleErrors);
  } else {
    console.log('✓ Clean console: 0 errors detected.');
  }

  await browser.close();
}

run().catch(err => {
  console.error('Capture script error:', err.message);
  process.exit(1);
});
