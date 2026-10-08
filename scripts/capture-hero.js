const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const artifactDir = "C:\\Users\\hlotf\\.gemini\\antigravity-ide\\brain\\c1e6834c-b4f2-4d71-8558-4eba0ba82c5a";
  
  const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/en/services', { waitUntil: 'networkidle2' });
  await page.waitForSelector('section[aria-label="Services Hero"]', { timeout: 10000 });

  // Force Dark Mode and accept cookies
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 800));

  const heroElement = await page.$('section[aria-label="Services Hero"]');
  await heroElement.screenshot({
    path: path.join(artifactDir, 'hero_dark_desktop.png')
  });
  console.log("Captured hero_dark_desktop.png");

  // Force Light Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 800));

  await heroElement.screenshot({
    path: path.join(artifactDir, 'hero_light_desktop.png')
  });
  console.log("Captured hero_light_desktop.png");

  // 2. Mobile - 390x844 (iPhone 14 equivalent)
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
    path: path.join(artifactDir, 'hero_dark_mobile.png')
  });
  console.log("Captured hero_dark_mobile.png");

  // Mobile Light Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  await mobileHero.screenshot({
    path: path.join(artifactDir, 'hero_light_mobile.png')
  });
  console.log("Captured hero_light_mobile.png");

  // 3. Tablet - 768x1024 (iPad Mini / standard tablet)
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
    path: path.join(artifactDir, 'hero_dark_tablet.png')
  });
  console.log("Captured hero_dark_tablet.png");

  // Check CTA links
  const primaryHref = await page.$eval('section[aria-label="Services Hero"] a[href*="contact"]', el => el.getAttribute('href'));
  const secondaryHref = await page.$eval('section[aria-label="Services Hero"] a[href*="roadmap"]', el => el.getAttribute('href'));
  console.log("Primary CTA href:", primaryHref);
  console.log("Secondary CTA href:", secondaryHref);

  console.log("Console Errors:", consoleErrors);

  await browser.close();
}

run().catch(err => {
  console.error("Script failed:", err);
  process.exit(1);
});
