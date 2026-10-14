const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function capture() {
  const ssDir = path.resolve(__dirname, '../artifacts/screenshots/signatures');
  if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 2800, deviceScaleFactor: 2 });

  const resolved = path.resolve(__dirname, '../email-signatures/preview.html');
  const previewUrl = 'file:///' + resolved.replace(/\\/g, '/');
  console.log('Navigating to:', previewUrl);
  await page.goto(previewUrl, { waitUntil: 'networkidle0' });

  // 1. Full suite preview
  await page.screenshot({ path: path.join(ssDir, 'all_signatures_preview.png'), fullPage: true });
  console.log('Captured all_signatures_preview.png');

  // 2. Individual cards (Light & Dark comparison)
  const accounts = ['info-com', 'info-it', 'careers-com', 'support-com', 'hamed-sharifi-it', 'hamid-lotfalian-it'];
  for (const acc of accounts) {
    const cardEl = await page.$('#card-' + acc);
    if (cardEl) {
      await cardEl.screenshot({ path: path.join(ssDir, 'sig_' + acc + '.png') });
      console.log('Captured sig_' + acc + '.png');
    }
  }

  // 3. Mobile viewport test (390px)
  await page.setViewport({ width: 540, height: 1000, deviceScaleFactor: 2 });
  await page.reload({ waitUntil: 'networkidle0' });
  const card0 = await page.$('#card-info-com');
  if (card0) {
    await card0.screenshot({ path: path.join(ssDir, 'sig_mobile_info_com.png') });
    console.log('Captured sig_mobile_info_com.png');
  }

  await browser.close();
  console.log('All verification captures completed successfully.');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
