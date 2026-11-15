/**
 * pyBIM SEO Multi-Domain & Multilingual Test Suite
 *
 * Validates:
 * 1. Model B Canonical URL generation (EN/DE on pybim.com, IT on pybim.it)
 * 2. Reciprocal Hreflang alternates across all languages and x-default
 * 3. Separate Dynamic Sitemaps (pybim.com: 16 URLs, pybim.it: 8 URLs)
 * 4. Robots.txt dynamic sitemap referencing & security exclusions
 * 5. Middleware cross-domain routing, query preservation & preview isolation
 * 6. Protection of authenticated sessions & private routes
 * 7. Preservation of existing noindex policies
 */

import assert from 'node:assert';
import {
  SUPPORTED_LOCALES,
  CORE_INDEXABLE_ROUTES,
  DOMAIN_COM,
  DOMAIN_IT,
  CANONICAL_DOMAINS,
  getCanonicalDomain,
  getCanonicalUrl,
  getAlternateLanguages,
  buildAlternatesMetadata,
  isItalianDomain,
  isComDomain,
  isProductionDomain,
  resolveRedirectTarget,
} from '../lib/seo.js';

import { GET as getSitemapResponse } from '../app/sitemap.xml/route.js';
import { GET as getRobotsResponse } from '../app/robots.txt/route.js';

console.log('=== RUNNING SEO-01 MULTI-DOMAIN & MULTILINGUAL TEST SUITE ===\n');

// -----------------------------------------------------------------------------
// 1. Canonical URL Generation Tests
// -----------------------------------------------------------------------------
console.log('1. Testing Canonical URL Generation across locales and routes...');

// 1a. Domain mappings
assert.strictEqual(getCanonicalDomain('en'), DOMAIN_COM, 'en must map to pybim.com');
assert.strictEqual(getCanonicalDomain('de'), DOMAIN_COM, 'de must map to pybim.com');
assert.strictEqual(getCanonicalDomain('it'), DOMAIN_IT, 'it must map to pybim.it');

// 1b. Root canonical URLs
assert.strictEqual(getCanonicalUrl('en', ''), 'https://pybim.com/en');
assert.strictEqual(getCanonicalUrl('it', ''), 'https://pybim.it/it');
assert.strictEqual(getCanonicalUrl('de', ''), 'https://pybim.com/de');

// 1c. Subroute canonical URLs
assert.strictEqual(getCanonicalUrl('en', 'services'), 'https://pybim.com/en/services');
assert.strictEqual(getCanonicalUrl('it', 'services'), 'https://pybim.it/it/services');
assert.strictEqual(getCanonicalUrl('de', 'services'), 'https://pybim.com/de/services');

assert.strictEqual(getCanonicalUrl('en', '/about/'), 'https://pybim.com/en/about', 'slashes should be cleanly normalized');
assert.strictEqual(getCanonicalUrl('it', '/contact'), 'https://pybim.it/it/contact');
assert.strictEqual(getCanonicalUrl('de', 'privacy-policy'), 'https://pybim.com/de/privacy-policy');

// 1d. All 8 core routes have HTTPS and correct host per locale
for (const route of CORE_INDEXABLE_ROUTES) {
  const enUrl = getCanonicalUrl('en', route);
  const itUrl = getCanonicalUrl('it', route);
  const deUrl = getCanonicalUrl('de', route);

  assert.ok(enUrl.startsWith('https://pybim.com/en'), `en URL must start with https://pybim.com/en: ${enUrl}`);
  assert.ok(itUrl.startsWith('https://pybim.it/it'), `it URL must start with https://pybim.it/it: ${itUrl}`);
  assert.ok(deUrl.startsWith('https://pybim.com/de'), `de URL must start with https://pybim.com/de: ${deUrl}`);
  assert.ok(!enUrl.includes('//en') && !enUrl.includes('com//'), `en URL must not have double slashes: ${enUrl}`);
  assert.ok(!itUrl.includes('//it') && !itUrl.includes('it//'), `it URL must not have double slashes: ${itUrl}`);
}
console.log('   ✓ Canonical URLs strictly verified for EN, IT, DE across all routes');

// -----------------------------------------------------------------------------
// 2. Hreflang Alternates & Reciprocity Tests
// -----------------------------------------------------------------------------
console.log('2. Testing Hreflang Alternates & Reciprocal References...');

for (const route of CORE_INDEXABLE_ROUTES) {
  const alternates = getAlternateLanguages(route);

  // Check required keys
  assert.ok('en' in alternates, 'alternates must contain en');
  assert.ok('it' in alternates, 'alternates must contain it');
  assert.ok('de' in alternates, 'alternates must contain de');
  assert.ok('x-default' in alternates, 'alternates must contain x-default');

  // Verify absolute HTTPS URLs
  assert.ok(alternates.en.startsWith('https://pybim.com/en'));
  assert.ok(alternates.it.startsWith('https://pybim.it/it'));
  assert.ok(alternates.de.startsWith('https://pybim.com/de'));
  assert.strictEqual(alternates['x-default'], alternates.en, 'x-default must match English version');

  // Verify reciprocity:
  // en, it, and de must all produce the exact same alternate mapping for the route
  const metaEn = buildAlternatesMetadata('en', route);
  const metaIt = buildAlternatesMetadata('it', route);
  const metaDe = buildAlternatesMetadata('de', route);

  assert.deepStrictEqual(metaEn.languages, metaIt.languages, 'Hreflang languages must be identical between en and it');
  assert.deepStrictEqual(metaEn.languages, metaDe.languages, 'Hreflang languages must be identical between en and de');

  // Canonical must match the respective locale
  assert.strictEqual(metaEn.canonical, alternates.en);
  assert.strictEqual(metaIt.canonical, alternates.it);
  assert.strictEqual(metaDe.canonical, alternates.de);
}
console.log('   ✓ Reciprocal hreflang references verified across EN, IT, DE and x-default');

// -----------------------------------------------------------------------------
// 3. Separate Dynamic Sitemap Tests
// -----------------------------------------------------------------------------
console.log('3. Testing Separate Dynamic Sitemaps (.com vs .it)...');

// Helper to extract <loc> URLs from sitemap XML
function extractSitemapUrls(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, ''));
}

// 3a. Sitemap A: pybim.com
const comReq = new Request('https://pybim.com/sitemap.xml', {
  headers: { host: 'pybim.com' },
});
const comRes = await getSitemapResponse(comReq);
assert.strictEqual(comRes.status, 200, 'pybim.com sitemap must return HTTP 200');
assert.strictEqual(comRes.headers.get('content-type'), 'application/xml; charset=utf-8');
assert.strictEqual(comRes.headers.get('vary'), 'Host', 'Sitemap must specify Vary: Host');

const comXml = await comRes.text();
assert.ok(comXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Valid XML header required');
assert.ok(comXml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));

const comUrls = extractSitemapUrls(comXml);
assert.strictEqual(comUrls.length, 16, `pybim.com sitemap must contain exactly 16 URLs (found ${comUrls.length})`);

// Verify all 16 URLs are pybim.com and only en or de
for (const u of comUrls) {
  assert.ok(u.startsWith('https://pybim.com/'), `.com sitemap URL must start with https://pybim.com/: ${u}`);
  assert.ok(u.startsWith('https://pybim.com/en') || u.startsWith('https://pybim.com/de'), `URL must be en or de: ${u}`);
  assert.ok(!u.includes('pybim.it'), `.com sitemap must never contain pybim.it: ${u}`);
  assert.ok(!u.includes('/education'), `noindex route /education must be excluded: ${u}`);
  assert.ok(!u.includes('/success-stories'), `noindex route /success-stories must be excluded: ${u}`);
  assert.ok(!u.includes('/projects'), `redirecting route /projects must be excluded: ${u}`);
}

// 3b. Sitemap B: pybim.it
const itReq = new Request('https://pybim.it/sitemap.xml', {
  headers: { host: 'pybim.it' },
});
const itRes = await getSitemapResponse(itReq);
assert.strictEqual(itRes.status, 200, 'pybim.it sitemap must return HTTP 200');
assert.strictEqual(itRes.headers.get('content-type'), 'application/xml; charset=utf-8');
assert.strictEqual(itRes.headers.get('vary'), 'Host', 'Sitemap must specify Vary: Host');

const itXml = await itRes.text();
const itUrls = extractSitemapUrls(itXml);
assert.strictEqual(itUrls.length, 8, `pybim.it sitemap must contain exactly 8 URLs (found ${itUrls.length})`);

// Verify all 8 URLs are pybim.it and it only
for (const u of itUrls) {
  assert.ok(u.startsWith('https://pybim.it/it'), `.it sitemap URL must start with https://pybim.it/it: ${u}`);
  assert.ok(!u.includes('pybim.com'), `.it sitemap must never contain pybim.com: ${u}`);
  assert.ok(!u.includes('/education'), `noindex route /education must be excluded: ${u}`);
  assert.ok(!u.includes('/success-stories'), `noindex route /success-stories must be excluded: ${u}`);
  assert.ok(!u.includes('/projects'), `redirecting route /projects must be excluded: ${u}`);
}

// 3c. Test query parameter fallback (?domain=it / ?domain=com)
const debugItReq = new Request('http://localhost:3000/sitemap.xml?domain=it');
const debugItRes = await getSitemapResponse(debugItReq);
const debugItUrls = extractSitemapUrls(await debugItRes.text());
assert.strictEqual(debugItUrls.length, 8);

const debugComReq = new Request('http://localhost:3000/sitemap.xml?domain=com');
const debugComRes = await getSitemapResponse(debugComReq);
const debugComUrls = extractSitemapUrls(await debugComRes.text());
assert.strictEqual(debugComUrls.length, 16);

console.log('   ✓ Dynamic Sitemaps correctly separated: pybim.com (16 URLs) & pybim.it (8 URLs)');

// -----------------------------------------------------------------------------
// 4. Robots.txt Dynamic Sitemap & Security Exclusions Tests
// -----------------------------------------------------------------------------
console.log('4. Testing Robots.txt domain referencing and security exclusions...');

// 4a. pybim.com robots.txt
const robotsComReq = new Request('https://pybim.com/robots.txt', {
  headers: { host: 'pybim.com' },
});
const robotsComRes = await getRobotsResponse(robotsComReq);
assert.strictEqual(robotsComRes.status, 200);
assert.strictEqual(robotsComRes.headers.get('content-type'), 'text/plain; charset=utf-8');
assert.strictEqual(robotsComRes.headers.get('vary'), 'Host');
const robotsComTxt = await robotsComRes.text();
assert.ok(robotsComTxt.includes('Sitemap: https://pybim.com/sitemap.xml'), 'Must point to .com sitemap');
assert.ok(!robotsComTxt.includes('https://pybim.it'), 'Must not reference .it sitemap');
assert.ok(robotsComTxt.includes('Disallow: /api/'));
assert.ok(robotsComTxt.includes('Disallow: /test/'));
assert.ok(robotsComTxt.includes('Disallow: /admin/'));

// 4b. pybim.it robots.txt
const robotsItReq = new Request('https://pybim.it/robots.txt', {
  headers: { host: 'pybim.it' },
});
const robotsItRes = await getRobotsResponse(robotsItReq);
assert.strictEqual(robotsItRes.status, 200);
assert.strictEqual(robotsItRes.headers.get('vary'), 'Host');
const robotsItTxt = await robotsItRes.text();
assert.ok(robotsItTxt.includes('Sitemap: https://pybim.it/sitemap.xml'), 'Must point to .it sitemap');
assert.ok(!robotsItTxt.includes('https://pybim.com'), 'Must not reference .com sitemap');
assert.ok(robotsItTxt.includes('Disallow: /api/'));
assert.ok(robotsItTxt.includes('Disallow: /test/'));
assert.ok(robotsItTxt.includes('Disallow: /admin/'));

console.log('   ✓ Robots.txt correctly references domain-specific sitemaps and preserves security disallows');

// -----------------------------------------------------------------------------
// 5. Middleware Cross-Domain Routing & Redirect Logic Tests
// -----------------------------------------------------------------------------
console.log('5. Testing Cross-Domain Canonical Routing & Redirect Resolutions...');

// 5a. Root Redirects
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/', search: '' }),
  'https://pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/', search: '' }),
  'https://pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/', search: '' }),
  'https://pybim.it/it'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/', search: '' }),
  'https://pybim.it/it'
);

// 5b. Noncanonical domain/locale combinations -> 308 canonical target
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/services', search: '' }),
  'https://pybim.it/it/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/it/services', search: '' }),
  'https://pybim.it/it/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/en/services', search: '' }),
  'https://pybim.com/en/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/en/services', search: '' }),
  'https://pybim.com/en/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/de/services', search: '' }),
  'https://pybim.com/de/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/de/services', search: '' }),
  'https://pybim.com/de/services'
);

// 5c. www normalization to canonical apex in single hop
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/en/services', search: '' }),
  'https://pybim.com/en/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/it/services', search: '' }),
  'https://pybim.it/it/services'
);

// 5d. Canonical combinations that should NOT redirect (return null / 200 OK)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/en/services', search: '' }),
  null,
  'pybim.com/en/services must not redirect'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/de/services', search: '' }),
  null,
  'pybim.com/de/services must not redirect'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/it/services', search: '' }),
  null,
  'pybim.it/it/services must not redirect'
);

// 5e. Query string preservation
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/services', search: '?source=newsletter&campaign=bim2026' }),
  'https://pybim.it/it/services?source=newsletter&campaign=bim2026'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/', search: '?ref=email' }),
  'https://pybim.it/it?ref=email'
);

// 5f. Private / Session / Auth Route Exemptions (Cookies are domain-scoped)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/portal/dashboard', search: '' }),
  null,
  'Portal routes must be exempt from cross-domain redirection to protect sessions'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/en/portal/dashboard', search: '' }),
  null,
  'Portal routes must be exempt from cross-domain redirection'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/login', search: '' }),
  null,
  'Login routes must be exempt from cross-domain redirection'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/api/contact', search: '' }),
  null,
  'API routes must be exempt from cross-domain redirection'
);

// 5g. Local and Preview Environments Isolation
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'localhost:3000', pathname: '/it/services', search: '' }),
  null,
  'localhost must not trigger cross-domain redirect'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: '127.0.0.1:3000', pathname: '/it/services', search: '' }),
  null,
  '127.0.0.1 must not trigger cross-domain redirect'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim-preview.workers.dev', pathname: '/it/services', search: '' }),
  null,
  'workers.dev preview must not trigger cross-domain redirect'
);

console.log('   ✓ Canonical domain routing, query preservation, session protection, and preview isolation verified');

// -----------------------------------------------------------------------------
// 6. Preservation of Existing Noindex Policies Tests
// -----------------------------------------------------------------------------
console.log('6. Testing Preservation of Intentional Noindex Policies...');

import fs from 'node:fs';

const eduContent = fs.readFileSync(new URL('../app/[locale]/education/page.js', import.meta.url), 'utf8');
assert.ok(eduContent.includes('index: false'), 'Education page must have index: false');
assert.ok(eduContent.includes('follow: true'), 'Education page must have follow: true');
assert.ok(eduContent.includes('canonicalUrl = getCanonicalUrl(locale, "education")'), 'Education page must use getCanonicalUrl');
assert.ok(eduContent.includes('languages: getAlternateLanguages("education")'), 'Education page must use getAlternateLanguages');

const ssContent = fs.readFileSync(new URL('../app/[locale]/success-stories/page.js', import.meta.url), 'utf8');
assert.ok(ssContent.includes('index: false'), 'Success stories page must have index: false');
assert.ok(ssContent.includes('follow: true'), 'Success stories page must have follow: true');
assert.ok(ssContent.includes('canonicalUrl = getCanonicalUrl(locale, "success-stories")'), 'Success stories page must use getCanonicalUrl');
assert.ok(ssContent.includes('languages: getAlternateLanguages("success-stories")'), 'Success stories page must use getAlternateLanguages');

const portalLayoutContent = fs.readFileSync(new URL('../app/[locale]/portal/layout.js', import.meta.url), 'utf8');
assert.ok(portalLayoutContent.includes('index: false'), 'Portal layout must have index: false');
assert.ok(portalLayoutContent.includes('follow: false'), 'Portal layout must have follow: false');

const loginContent = fs.readFileSync(new URL('../app/[locale]/(auth)/login/page.js', import.meta.url), 'utf8');
assert.ok(loginContent.includes('index: false'), 'Login page must have index: false');

const registerContent = fs.readFileSync(new URL('../app/[locale]/(auth)/register/page.js', import.meta.url), 'utf8');
assert.ok(registerContent.includes('index: false'), 'Register page must have index: false');

console.log('   ✓ Intentional noindex policies verified on Education, Success Stories, Portal, and Auth');

console.log('\n=== ALL SEO-01 MULTI-DOMAIN & MULTILINGUAL TESTS PASSED SUCCESSFULLY ===');
