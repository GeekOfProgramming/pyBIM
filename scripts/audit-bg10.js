const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function auditPages() {
  const outputDir = path.resolve(__dirname, '../artifacts/screenshots/audit_bg10');
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

  // Helper to switch theme cleanly
  async function setTheme(mode) {
    await page.evaluate((themeMode) => {
      localStorage.setItem('cookie_consent', 'all');
      localStorage.setItem('pybim_theme', themeMode);
      if (themeMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      const cookieEl = document.querySelector('.fixed.bottom-4');
      if (cookieEl) cookieEl.remove();
    }, mode);
    await new Promise(r => setTimeout(r, 600));
  }

  // ==========================================
  // 1. SUCCESS STORIES AUDIT
  // ==========================================
  console.log('\n--- AUDITING SUCCESS STORIES ---');

  // Desktop 1440x900 Light
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/en/success-stories', { waitUntil: 'networkidle2' });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_desktop_light.png'), fullPage: true });
  console.log('✓ Captured success_stories_desktop_light.png');

  // Interactive check: AI Pipeline Tab switching
  const pipelineTabs = await page.$$('#in-development [role="tab"]');
  console.log(`Found ${pipelineTabs.length} pipeline tabs.`);
  if (pipelineTabs.length >= 3) {
    await pipelineTabs[2].click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outputDir, 'success_stories_pipeline_tab_active.png') });
    console.log('✓ Captured success_stories_pipeline_tab_active.png');
  }

  // Desktop 1440x900 Dark
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_desktop_dark.png'), fullPage: true });
  console.log('✓ Captured success_stories_desktop_dark.png');

  // Tablet 768px Light & Dark
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_tablet_light.png'), fullPage: true });
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_tablet_dark.png'), fullPage: true });
  console.log('✓ Captured success_stories tablet views');

  // Mobile 390px Light & Dark
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_mobile_light.png'), fullPage: true });
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'success_stories_mobile_dark.png'), fullPage: true });
  console.log('✓ Captured success_stories mobile views');

  // Check section background colors in Success Stories
  const ssBgInfo = await page.evaluate(() => {
    const sections = ['success-stories', 'completed-projects', 'in-development', 'testimonials'];
    return sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, error: 'not found' };
      const comp = window.getComputedStyle(el);
      const backdrop = el.querySelector('svg');
      return {
        id,
        bg: comp.backgroundColor,
        hasBackdropSvg: !!backdrop
      };
    });
  });
  console.log('Success stories section styles:', JSON.stringify(ssBgInfo, null, 2));

  // Multilingual check
  await page.goto('http://localhost:3000/it/success-stories', { waitUntil: 'networkidle2' });
  const itTitle = await page.title();
  console.log('IT success stories title:', itTitle);

  await page.goto('http://localhost:3000/de/success-stories', { waitUntil: 'networkidle2' });
  const deTitle = await page.title();
  console.log('DE success stories title:', deTitle);

  // ==========================================
  // 2. CAREERS AUDIT
  // ==========================================
  console.log('\n--- AUDITING CAREERS ---');

  // Desktop 1440x900 Light
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/en/careers', { waitUntil: 'networkidle2' });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'careers_desktop_light.png'), fullPage: true });
  console.log('✓ Captured careers_desktop_light.png');

  // Interactive check 1: Expertise Tabs switching (C03)
  const expTabs = await page.$$('#expertise [role="tab"]');
  console.log(`Found ${expTabs.length} expertise tabs.`);
  if (expTabs.length >= 3) {
    await expTabs[1].click(); // Select Revit Automation
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(outputDir, 'careers_expertise_tab_active.png') });
    console.log('✓ Captured careers_expertise_tab_active.png');
  }

  // Interactive check 2: Opportunity Apply button selection & anchor scroll
  const applyBtns = await page.$$('#positions button');
  console.log(`Found ${applyBtns.length} buttons in positions section.`);
  for (const btn of applyBtns) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Apply') || text.includes('Candidati')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 500));
      break;
    }
  }

  // Desktop 1440x900 Dark
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'careers_desktop_dark.png'), fullPage: true });
  console.log('✓ Captured careers_desktop_dark.png');

  // Tablet 768px Light & Dark
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'careers_tablet_light.png'), fullPage: true });
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'careers_tablet_dark.png'), fullPage: true });
  console.log('✓ Captured careers tablet views');

  // Mobile 390px Light & Dark
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await setTheme('light');
  await page.screenshot({ path: path.join(outputDir, 'careers_mobile_light.png'), fullPage: true });
  await setTheme('dark');
  await page.screenshot({ path: path.join(outputDir, 'careers_mobile_dark.png'), fullPage: true });
  console.log('✓ Captured careers mobile views');

  // Check section background colors in Careers
  const careersBgInfo = await page.evaluate(() => {
    const sections = ['work-with-us', 'culture', 'expertise', 'positions', 'apply'];
    return sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, error: 'not found' };
      const comp = window.getComputedStyle(el);
      const backdrop = el.querySelector('svg');
      return {
        id,
        bg: comp.backgroundColor,
        hasBackdropSvg: !!backdrop
      };
    });
  });
  console.log('Careers section styles:', JSON.stringify(careersBgInfo, null, 2));

  // Multilingual check
  await page.goto('http://localhost:3000/it/careers', { waitUntil: 'networkidle2' });
  const itCareersTitle = await page.title();
  console.log('IT careers title:', itCareersTitle);

  await page.goto('http://localhost:3000/de/careers', { waitUntil: 'networkidle2' });
  const deCareersTitle = await page.title();
  console.log('DE careers title:', deCareersTitle);

  // Check console error count
  console.log('\nTotal console errors captured:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }

  await browser.close();
  console.log('\nAll QA screenshots and audits completed successfully.');
}

auditPages().catch(err => {
  console.error(err);
  process.exit(1);
});
