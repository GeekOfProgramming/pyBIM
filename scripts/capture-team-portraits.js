const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

(async () => {
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
  await page.goto('http://localhost:3000/en/about#team', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('cookie_consent', 'all');
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
    const cookieEl = document.querySelector('.fixed.bottom-4');
    if (cookieEl) cookieEl.remove();
  });
  await new Promise(r => setTimeout(r, 600));

  // Screenshot team section in light mode
  const teamSec = await page.$('#team');
  await teamSec.screenshot({ path: 'artifacts/screenshots/team_section_light.png' });
  console.log('✓ Captured team_section_light.png');

  // Click on Hamid's card (second card in team section)
  const cards = await page.$$('#team [role="button"]');
  console.log('Found team cards:', cards.length);
  if (cards.length >= 2) {
    await cards[1].click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'artifacts/screenshots/hamid_modal_light.png' });
    console.log('✓ Captured hamid_modal_light.png');
    // Close modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  // Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 600));

  await teamSec.screenshot({ path: 'artifacts/screenshots/team_section_dark.png' });
  console.log('✓ Captured team_section_dark.png');

  // Open modal in Dark mode
  const cardsDark = await page.$$('#team [role="button"]');
  if (cardsDark.length >= 2) {
    await cardsDark[1].click();
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: 'artifacts/screenshots/hamid_modal_dark.png' });
    console.log('✓ Captured hamid_modal_dark.png');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));
  }

  // Mobile check 390x844
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    localStorage.setItem('pybim_theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 500));
  const mobileTeamSec = await page.$('#team');
  await mobileTeamSec.screenshot({ path: 'artifacts/screenshots/team_section_mobile_light.png' });
  console.log('✓ Captured team_section_mobile_light.png');

  // Multi-language checks
  await page.goto('http://localhost:3000/it/about#team', { waitUntil: 'networkidle2' });
  const itCards = await page.$$('#team [role="button"]');
  console.log('IT cards found:', itCards.length);

  await page.goto('http://localhost:3000/de/about#team', { waitUntil: 'networkidle2' });
  const deCards = await page.$$('#team [role="button"]');
  console.log('DE cards found:', deCards.length);

  console.log('Console errors encountered:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log(consoleErrors);

  await browser.close();
  console.log('Team portrait verification complete.');
})().catch(err => {
  console.error('Error in capture-team-portraits:', err);
  process.exit(1);
});
