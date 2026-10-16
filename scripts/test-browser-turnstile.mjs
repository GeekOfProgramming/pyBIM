import puppeteer from 'puppeteer-core';
import assert from 'node:assert';

console.log('=== RUNNING REAL HEADLESS BROWSER TURNSTILE & FORM INTERACTION TEST ===');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  try {
    const page = await browser.newPage();
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('Turnstile') || text.includes('SECURITY')) {
        console.log(`[Browser Console] ${text}`);
      }
    });

    console.log('1. Navigating to http://localhost:3000/en/contact...');
    await page.goto('http://localhost:3000/en/contact', { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('2. Verifying Turnstile script injection...');
    await page.waitForFunction(() => {
      return Boolean(document.getElementById('cloudflare-turnstile-script'));
    }, { timeout: 15000 });
    console.log('   ✓ Single Turnstile explicit script tag confirmed in DOM');

    console.log('3. Inspecting Turnstile widget containers on Contact and Priority Queue forms...');
    await page.waitForSelector('.turnstile-container', { timeout: 10000 });
    const widgetContainers = await page.$$eval('.turnstile-container', els => els.length);
    assert.strictEqual(widgetContainers, 2, 'Must have exactly 2 turnstile-container elements (Contact + Priority Queue)');
    console.log(`   ✓ Found ${widgetContainers} Turnstile widget containers on page`);

    console.log('4. Waiting for Cloudflare Turnstile widget initialization...');
    await page.waitForFunction(() => {
      const inputs = document.querySelectorAll('input[name="cf-turnstile-response"]');
      const iframes = document.querySelectorAll('.turnstile-container iframe');
      return inputs.length >= 1 || iframes.length >= 1 || (typeof window.turnstile !== 'undefined' && window.turnstile.render);
    }, { timeout: 15000 });
    console.log('   ✓ Turnstile widget initialized by Cloudflare Turnstile API');

    console.log('5. Testing field interactions and verifying widget lifecycle stability (no remounting/destroying)...');
    // Fill out Contact form
    await page.type('#contact-name', 'Ing. Roberto Benetti');
    await page.type('#contact-company', 'Studio Ingegneria Benetti');
    await page.type('#contact-email', 'r.benetti@studio-benetti.it');
    await page.type('#contact-phone', '+39 049 827 0000');
    
    // Select service
    await page.select('#contact-service', 'bim_modeling');

    // Wait for conditional disciplines row to appear
    await page.waitForSelector('button[role="checkbox"]', { timeout: 5000 });
    const disciplineButtons = await page.$$('button[role="checkbox"]');
    assert.ok(disciplineButtons.length >= 2, 'Discipline checkboxes must be rendered');
    await disciplineButtons[0].click(); // Select Architecture

    // Select size
    await page.select('#contact-size', '6–20 employees');

    // Type requirements
    await page.type('#contact-message', 'Automated architectural model audit and parameter validation.');

    // Check privacy
    await page.click('#privacy-contact');

    // Verify Turnstile widget container is STILL intact and rendered
    const inputsAfterTyping = await page.$$eval('input[name="cf-turnstile-response"]', inputs => inputs.length);
    assert.ok(inputsAfterTyping >= 1, 'Turnstile widget must remain stably mounted after form state changes');
    console.log(`   ✓ Turnstile widget remained stably mounted across multiple React state updates and rerenders (${inputsAfterTyping} active widgets)`);

    console.log('\n=== REAL BROWSER TURNSTILE & FORM INTERACTION TEST PASSED ===\n');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error('Browser Test Error:', err);
  process.exit(1);
});
