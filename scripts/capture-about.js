/**
 * @file scripts/capture-about.js
 * @description Headless browser verification & screenshot capture tool for pyBIM About page.
 */

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

function findBrowserExecutable() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidatePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('No Chromium executable found.');
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

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cookie_consent', 'all');
  });

  // 1. Desktop - 1440x900
  console.log('--- Testing Desktop 1440x900 ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(`${baseUrl}/en/about`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#manifesto', { timeout: 10000 });

  // Light Mode - About Hero
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 700));

  const manifestoHero = await page.$('#manifesto');
  await manifestoHero.screenshot({
    path: path.join(outputDir, 'about_hero_light_desktop.png')
  });
  console.log('✓ Captured about_hero_light_desktop.png');

  // Full Page Light
  await page.screenshot({
    path: path.join(outputDir, 'about_full_light.png'),
    fullPage: true
  });
  console.log('✓ Captured about_full_light.png');

  // Dark Mode - About Hero
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 700));

  await manifestoHero.screenshot({
    path: path.join(outputDir, 'about_hero_dark_desktop.png')
  });
  console.log('✓ Captured about_hero_dark_desktop.png');

  // Full Page Dark
  await page.screenshot({
    path: path.join(outputDir, 'about_full_dark.png'),
    fullPage: true
  });
  console.log('✓ Captured about_full_dark.png');

  // 2. Mobile - 390x844 (iPhone 14)
  console.log('--- Testing Mobile 390x844 ---');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  // Mobile Light
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileHero = await page.$('#manifesto');
  await mobileHero.screenshot({
    path: path.join(outputDir, 'about_hero_light_mobile.png')
  });
  console.log('✓ Captured about_hero_light_mobile.png');

  // Mobile Dark
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  await mobileHero.screenshot({
    path: path.join(outputDir, 'about_hero_dark_mobile.png')
  });
  console.log('✓ Captured about_hero_dark_mobile.png');

  // 3. Tablet - 768x1024
  console.log('--- Testing Tablet 768x1024 ---');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  console.log(`Tablet horizontal scroll present: ${hasHorizontalScroll}`);

  // Test Languages (IT and DE)
  console.log('--- Testing /it/about & /de/about ---');
  await page.goto(`${baseUrl}/it/about`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#manifesto', { timeout: 10000 });
  const itTitle = await page.$eval('#manifesto h1', el => el.innerText);
  console.log(`Italian Hero Title: ${itTitle.slice(0, 40)}...`);

  await page.goto(`${baseUrl}/de/about`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#manifesto', { timeout: 10000 });
  const deTitle = await page.$eval('#manifesto h1', el => el.innerText);
  console.log(`German Hero Title: ${deTitle.slice(0, 40)}...`);

  if (consoleErrors.length > 0) {
    console.warn(`Encountered ${consoleErrors.length} console errors:`, consoleErrors);
  } else {
    console.log('✓ Clean console: 0 errors detected.');
  }

  await browser.close();
  console.log('✓ All verification captures and tests completed successfully.');
}

run().catch(err => {
  console.error('Capture script error:', err);
  process.exit(1);
});
