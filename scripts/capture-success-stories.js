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
  await page.goto('http://localhost:3000/en/success-stories', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Full Page Light Mode
  await page.screenshot({ path: path.join(outputDir, 'success_stories_full_light.png'), fullPage: true });
  console.log('✓ Captured success_stories_full_light.png');

  // Capture Hero S01 Viewport
  await page.screenshot({ path: path.join(outputDir, 'success_stories_hero_light.png') });
  console.log('✓ Captured success_stories_hero_light.png');

  // Test Interactive Pipeline Stage Switching (Stage 03)
  const tabs = await page.$$('#in-development [role="tab"]');
  console.log('Found pipeline stage tabs:', tabs.length);
  if (tabs.length >= 3) {
    await tabs[2].click(); // click Stage 03
    await new Promise(r => setTimeout(r, 400));
    const activeText = await page.$eval('#pipeline-stage-detail-panel', el => el.textContent);
    console.log('Active tab panel content preview:', activeText.substring(0, 80));
    await page.screenshot({ path: path.join(outputDir, 'success_stories_pipeline_interactive.png') });
    console.log('✓ Captured success_stories_pipeline_interactive.png');
  }

  // 2. Desktop - 1440x900 Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Full Page Dark Mode
  await page.screenshot({ path: path.join(outputDir, 'success_stories_full_dark.png'), fullPage: true });
  console.log('✓ Captured success_stories_full_dark.png');

  // Capture Hero S01 Dark Viewport
  await page.screenshot({ path: path.join(outputDir, 'success_stories_hero_dark.png') });
  console.log('✓ Captured success_stories_hero_dark.png');

  // 3. Mobile - 390x844 Light Mode
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, 'success_stories_mobile_light.png'), fullPage: true });
  console.log('✓ Captured success_stories_mobile_light.png');

  // 4. Mobile - 390x844 Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outputDir, 'success_stories_mobile_dark.png'), fullPage: true });
  console.log('✓ Captured success_stories_mobile_dark.png');

  // 5. Multi-locale verification (IT and DE)
  await page.goto('http://localhost:3000/it/success-stories', { waitUntil: 'networkidle2' });
  const itHeading = await page.$eval('h1', el => el.textContent);
  console.log('IT heading:', itHeading.trim());

  await page.goto('http://localhost:3000/de/success-stories', { waitUntil: 'networkidle2' });
  const deHeading = await page.$eval('h1', el => el.textContent);
  console.log('DE heading:', deHeading.trim());

  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  await browser.close();
  console.log('Validation and captures completed successfully.');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
