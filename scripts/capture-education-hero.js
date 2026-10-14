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

  // 1. Desktop Light Mode (1440x900)
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/en/education', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'education_hero_light_desktop.png') });
  console.log('Saved education_hero_light_desktop.png');

  // 2. Desktop Dark Mode (1440x900)
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'education_hero_dark_desktop.png') });
  console.log('Saved education_hero_dark_desktop.png');

  // 3. Mobile Light Mode (390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'education_hero_light_mobile.png') });
  console.log('Saved education_hero_light_mobile.png');

  // 4. Mobile Dark Mode (390x844)
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outputDir, 'education_hero_dark_mobile.png') });
  console.log('Saved education_hero_dark_mobile.png');

  // 5. Verify IT and DE locales
  await page.goto('http://localhost:3000/it/education', { waitUntil: 'networkidle2' });
  const itHeading = await page.$eval('h1', el => el.textContent);
  console.log('IT heading:', itHeading.trim());

  await page.goto('http://localhost:3000/de/education', { waitUntil: 'networkidle2' });
  const deHeading = await page.$eval('h1', el => el.textContent);
  console.log('DE heading:', deHeading.trim());

  await browser.close();
  console.log('Screenshots and locale validations completed.');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
