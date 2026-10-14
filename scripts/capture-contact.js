const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function capture() {
  const outputDir = path.resolve(__dirname, '../artifacts/screenshots');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => { consoleErrors.push(err.toString()); });

  // 1. Desktop - 1440x900 Light Mode
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/en/contact', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  // Full page Light
  await page.screenshot({ path: path.join(outputDir, 'contact_full_light.png'), fullPage: true });
  console.log('✓ Captured contact_full_light.png');

  // Contact Hero & Form Light
  const heroEl = await page.$('#audit');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(outputDir, 'contact_hero_light.png') });
    console.log('✓ Captured contact_hero_light.png');
  }

  // Priority Queue Light
  const pqEl = await page.$('#priority-queue');
  if (pqEl) {
    await pqEl.screenshot({ path: path.join(outputDir, 'contact_priority_queue_light.png') });
    console.log('✓ Captured contact_priority_queue_light.png');
  }

  // FAQ Light (with accordion item clicked)
  const faqButtons = await page.$$('#support button[aria-expanded]');
  if (faqButtons.length > 1) {
    await faqButtons[1].click(); // expand second question
    await new Promise(r => setTimeout(r, 400));
  }
  const faqEl = await page.$('#support');
  if (faqEl) {
    await faqEl.screenshot({ path: path.join(outputDir, 'contact_faq_light.png') });
    console.log('✓ Captured contact_faq_light.png');
  }

  // 2. Desktop - 1440x900 Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Full page Dark
  await page.screenshot({ path: path.join(outputDir, 'contact_full_dark.png'), fullPage: true });
  console.log('✓ Captured contact_full_dark.png');

  // Contact Hero & Form Dark
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(outputDir, 'contact_hero_dark.png') });
    console.log('✓ Captured contact_hero_dark.png');
  }

  // Priority Queue Dark
  if (pqEl) {
    await pqEl.screenshot({ path: path.join(outputDir, 'contact_priority_queue_dark.png') });
    console.log('✓ Captured contact_priority_queue_dark.png');
  }

  // FAQ Dark
  if (faqEl) {
    await faqEl.screenshot({ path: path.join(outputDir, 'contact_faq_dark.png') });
    console.log('✓ Captured contact_faq_dark.png');
  }

  // 3. Mobile - 390x844 Light Mode
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, 'contact_mobile_light.png'), fullPage: true });
  console.log('✓ Captured contact_mobile_light.png');

  // 4. Mobile - 390x844 Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, 'contact_mobile_dark.png'), fullPage: true });
  console.log('✓ Captured contact_mobile_dark.png');

  // 5. Multi-locale verification (IT and DE)
  await page.goto('http://localhost:3000/it/contact', { waitUntil: 'networkidle2' });
  const itHeading = await page.$eval('h1', el => el.textContent);
  console.log('IT heading:', itHeading.trim());

  await page.goto('http://localhost:3000/de/contact', { waitUntil: 'networkidle2' });
  const deHeading = await page.$eval('h1', el => el.textContent);
  console.log('DE heading:', deHeading.trim());

  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  console.log('Contact captures and checks completed successfully.');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
