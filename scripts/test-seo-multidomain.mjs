/**
 * pyBIM SEO Multi-Domain & Multilingual Test Suite
 *
 * Validates:
 * 1. Model B Canonical URL generation (EN/DE on pybim.com, IT on pybim.it)
 * 2. Reciprocal Hreflang alternates across all languages and x-default
 * 3. Separate Dynamic Sitemaps (pybim.com: 16 URLs, pybim.it: 8 URLs) with trusted Host routing (no public query override)
 * 4. Robots.txt dynamic sitemap referencing & security exclusions (no public query override)
 * 5. Middleware cross-domain routing, query preservation & Cloudflare safety (no www-apex loops)
 * 6. Protection of authenticated sessions & private routes
 * 7. Preservation of existing noindex policies
 * 8. Dynamic Careers Pages (/careers/[id]) metadata, handling missing IDs, suppression of inherited signals
 */

import assert from 'node:assert';
import fs from 'node:fs';
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
  getCareerDetailMetadata,
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
// 3. Separate Dynamic Sitemap Tests (Host-Based, No Query Override)
// -----------------------------------------------------------------------------
console.log('3. Testing Separate Dynamic Sitemaps (pybim.com vs pybim.it via Host header)...');

// Helper to extract <loc> URLs from sitemap XML
function extractSitemapUrls(xml) {
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, ''));
}

// 3a. Sitemap A: pybim.com (Host: pybim.com and www.pybim.com)
for (const host of ['pybim.com', 'www.pybim.com']) {
  const req = new Request(`https://${host}/sitemap.xml`, { headers: { host } });
  const res = await getSitemapResponse(req);
  assert.strictEqual(res.status, 200, `${host} sitemap must return HTTP 200`);
  assert.strictEqual(res.headers.get('content-type'), 'application/xml; charset=utf-8');
  assert.strictEqual(res.headers.get('vary'), 'Host', 'Sitemap must specify Vary: Host');

  const xml = await res.text();
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Valid XML header required');
  assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));

  const urls = extractSitemapUrls(xml);
  assert.strictEqual(urls.length, 16, `${host} sitemap must contain exactly 16 URLs (found ${urls.length})`);

  for (const u of urls) {
    assert.ok(u.startsWith('https://pybim.com/'), `.com sitemap URL must start with https://pybim.com/: ${u}`);
    assert.ok(u.startsWith('https://pybim.com/en') || u.startsWith('https://pybim.com/de'), `URL must be en or de: ${u}`);
    assert.ok(!u.includes('pybim.it'), `.com sitemap must never contain pybim.it: ${u}`);
    assert.ok(!u.includes('/education'), `noindex route /education must be excluded: ${u}`);
    assert.ok(!u.includes('/success-stories'), `noindex route /success-stories must be excluded: ${u}`);
    assert.ok(!u.includes('/projects'), `redirecting route /projects must be excluded: ${u}`);
  }
}

// 3b. Sitemap B: pybim.it (Host: pybim.it and www.pybim.it)
for (const host of ['pybim.it', 'www.pybim.it']) {
  const req = new Request(`https://${host}/sitemap.xml`, { headers: { host } });
  const res = await getSitemapResponse(req);
  assert.strictEqual(res.status, 200, `${host} sitemap must return HTTP 200`);
  assert.strictEqual(res.headers.get('content-type'), 'application/xml; charset=utf-8');
  assert.strictEqual(res.headers.get('vary'), 'Host', 'Sitemap must specify Vary: Host');

  const xml = await res.text();
  const urls = extractSitemapUrls(xml);
  assert.strictEqual(urls.length, 8, `${host} sitemap must contain exactly 8 URLs (found ${urls.length})`);

  for (const u of urls) {
    assert.ok(u.startsWith('https://pybim.it/it'), `.it sitemap URL must start with https://pybim.it/it: ${u}`);
    assert.ok(!u.includes('pybim.com'), `.it sitemap must never contain pybim.com: ${u}`);
    assert.ok(!u.includes('/education'), `noindex route /education must be excluded: ${u}`);
    assert.ok(!u.includes('/success-stories'), `noindex route /success-stories must be excluded: ${u}`);
    assert.ok(!u.includes('/projects'), `redirecting route /projects must be excluded: ${u}`);
  }
}

// 3c. Verify that query parameters (?domain=it) are strictly IGNORED
const ignoredQueryReq = new Request('https://pybim.com/sitemap.xml?domain=it', {
  headers: { host: 'pybim.com' }
});
const ignoredQueryRes = await getSitemapResponse(ignoredQueryReq);
const ignoredQueryUrls = extractSitemapUrls(await ignoredQueryRes.text());
assert.strictEqual(ignoredQueryUrls.length, 16, 'Query param ?domain=it must be ignored in favor of Host header');

console.log('   ✓ Dynamic Sitemaps correctly separated by Host (16 URLs on .com, 8 URLs on .it) without query overrides');

// -----------------------------------------------------------------------------
// 4. Robots.txt Dynamic Sitemap & Security Exclusions Tests
// -----------------------------------------------------------------------------
console.log('4. Testing Robots.txt domain referencing and security exclusions...');

// 4a. pybim.com and www.pybim.com robots.txt
for (const host of ['pybim.com', 'www.pybim.com']) {
  const req = new Request(`https://${host}/robots.txt`, { headers: { host } });
  const res = await getRobotsResponse(req);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('content-type'), 'text/plain; charset=utf-8');
  assert.strictEqual(res.headers.get('vary'), 'Host');
  const txt = await res.text();
  assert.ok(txt.includes('Sitemap: https://pybim.com/sitemap.xml'), 'Must point to .com sitemap');
  assert.ok(!txt.includes('https://pybim.it'), 'Must not reference .it sitemap');
  assert.ok(txt.includes('Disallow: /api/'));
  assert.ok(txt.includes('Disallow: /test/'));
  assert.ok(txt.includes('Disallow: /admin/'));
}

// 4b. pybim.it and www.pybim.it robots.txt
for (const host of ['pybim.it', 'www.pybim.it']) {
  const req = new Request(`https://${host}/robots.txt`, { headers: { host } });
  const res = await getRobotsResponse(req);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.headers.get('vary'), 'Host');
  const txt = await res.text();
  assert.ok(txt.includes('Sitemap: https://pybim.it/sitemap.xml'), 'Must point to .it sitemap');
  assert.ok(!txt.includes('https://pybim.com'), 'Must not reference .com sitemap');
  assert.ok(txt.includes('Disallow: /api/'));
  assert.ok(txt.includes('Disallow: /test/'));
  assert.ok(txt.includes('Disallow: /admin/'));
}

// 4c. Verify that query param ?domain=it is IGNORED on robots.txt
const ignoredRobotsReq = new Request('https://pybim.com/robots.txt?domain=it', {
  headers: { host: 'pybim.com' }
});
const ignoredRobotsTxt = await (await getRobotsResponse(ignoredRobotsReq)).text();
assert.ok(ignoredRobotsTxt.includes('Sitemap: https://pybim.com/sitemap.xml'));

console.log('   ✓ Robots.txt correctly references domain-specific sitemaps without query overrides');

// -----------------------------------------------------------------------------
// 5. Middleware Cross-Domain Routing & Cloudflare Safety Tests
// -----------------------------------------------------------------------------
console.log('5. Testing Cross-Domain Canonical Routing & Cloudflare Safety (no www loops)...');

// 5a. Root Redirects (preserves host format)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/', search: '' }),
  'https://pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/', search: '' }),
  'https://www.pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/', search: '' }),
  'https://pybim.it/it'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/', search: '' }),
  'https://www.pybim.it/it'
);

// 5b. Cloudflare Safety: Valid locales on www must NEVER redirect to apex
// (Cloudflare redirects apex to www; redirecting www to apex would cause infinite loop!)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/en/services', search: '' }),
  null,
  'www.pybim.com/en/services must return null (200 OK) to prevent loop with Cloudflare'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/de/services', search: '' }),
  null,
  'www.pybim.com/de/services must return null (200 OK) to prevent loop with Cloudflare'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/it/services', search: '' }),
  null,
  'www.pybim.it/it/services must return null (200 OK) to prevent loop with Cloudflare'
);

// 5c. Valid locales on apex also return null (serving directly if reached)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/en/services', search: '' }),
  null
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/de/services', search: '' }),
  null
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/it/services', search: '' }),
  null
);

// 5d. Noncanonical combinations -> redirect to counterpart domain
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/it/services', search: '' }),
  'https://www.pybim.it/it/services',
  'www.pybim.com/it/services redirects directly to www.pybim.it in 1 hop'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/services', search: '' }),
  'https://pybim.it/it/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/en/services', search: '' }),
  'https://www.pybim.com/en/services',
  'www.pybim.it/en/services redirects directly to www.pybim.com in 1 hop'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/de/services', search: '' }),
  'https://www.pybim.com/de/services',
  'www.pybim.it/de/services redirects directly to www.pybim.com in 1 hop'
);

// 5e. Query string preservation
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/it/services', search: '?source=newsletter&campaign=bim2026' }),
  'https://www.pybim.it/it/services?source=newsletter&campaign=bim2026'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/', search: '?ref=email' }),
  'https://www.pybim.it/it?ref=email'
);

// 5f. Private / Session / Auth Route Exemptions (Cookies are domain-scoped)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/portal/dashboard', search: '' }),
  null,
  'Portal routes must be exempt from cross-domain redirection to protect sessions'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/it/portal/dashboard', search: '' }),
  null
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.it', pathname: '/en/login', search: '' }),
  null,
  'Login routes must be exempt from cross-domain redirection'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/api/contact', search: '' }),
  null,
  'API routes must be exempt from cross-domain redirection'
);

// 5g. Local, Preview, and Untrusted Host Isolation
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'localhost:3000', pathname: '/it/services', search: '' }),
  null,
  'localhost must not trigger cross-domain redirect'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: '127.0.0.1:3000', pathname: '/it/services', search: '' }),
  null
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim-preview.workers.dev', pathname: '/it/services', search: '' }),
  null
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'evil-attacker.com', pathname: '/it/services', search: '' }),
  null,
  'Untrusted host must never trigger redirects'
);

console.log('   ✓ Cloudflare redirect compatibility, query preservation, session protection, and preview isolation verified');

// -----------------------------------------------------------------------------
// 6. Preservation of Existing Noindex Policies Tests
// -----------------------------------------------------------------------------
console.log('6. Testing Preservation of Intentional Noindex Policies...');

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

// -----------------------------------------------------------------------------
// 7. Dynamic Careers Pages (/careers/[id]) Metadata Tests
// -----------------------------------------------------------------------------
console.log('7. Testing Dynamic Careers Pages (/careers/[id]) metadata and missing ID handling...');

// 7a. Non-existent / Missing Job ID (job is null)
const missingJobMetaEn = getCareerDetailMetadata({ locale: 'en', id: 'missing-job-xyz', job: null });
assert.strictEqual(missingJobMetaEn.title, 'Job Not Found | pyBIM', 'Missing job must return Job Not Found title');
assert.strictEqual(missingJobMetaEn.robots?.index, false, 'Missing job must be noindex');
assert.strictEqual(missingJobMetaEn.robots?.follow, false, 'Missing job must be nofollow');
assert.strictEqual(missingJobMetaEn.alternates?.canonical, null, 'Missing job must suppress canonical URL (prevent inheriting root)');

const missingJobMetaIt = getCareerDetailMetadata({ locale: 'it', id: 'missing-job-xyz', job: null });
assert.strictEqual(missingJobMetaIt.robots?.index, false);
assert.strictEqual(missingJobMetaIt.robots?.follow, false);
assert.strictEqual(missingJobMetaIt.alternates?.canonical, null);

// 7b. Inactive Job ID (job.isActive is false)
const inactiveJob = { id: 'old-role', titleEn: 'Old Role', titleIt: 'Vecchio Ruolo', isActive: false };
const inactiveJobMeta = getCareerDetailMetadata({ locale: 'en', id: 'old-role', job: inactiveJob });
assert.strictEqual(inactiveJobMeta.robots?.index, false);
assert.strictEqual(inactiveJobMeta.alternates?.canonical, null);

// 7c. Active Job ID (job.isActive is true) - Route-specific Model B Canonical & Hreflang
const activeJob = {
  id: 'senior-bim-lead',
  titleEn: 'Senior BIM Lead',
  titleIt: 'Lead BIM Senior',
  descriptionEn: 'Lead complex BIM automation projects.',
  descriptionIt: 'Guida progetti complessi di automazione BIM.',
  isActive: true,
};
const activeJobMetaEn = getCareerDetailMetadata({ locale: 'en', id: 'senior-bim-lead', job: activeJob });
assert.strictEqual(activeJobMetaEn.title, 'Senior BIM Lead | pyBIM');
assert.strictEqual(activeJobMetaEn.robots?.index, false);
assert.strictEqual(activeJobMetaEn.robots?.follow, true);
assert.strictEqual(activeJobMetaEn.alternates?.canonical, 'https://pybim.com/en/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.en, 'https://pybim.com/en/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.it, 'https://pybim.it/it/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.de, 'https://pybim.com/de/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages['x-default'], 'https://pybim.com/en/careers/senior-bim-lead');

const activeJobMetaIt = getCareerDetailMetadata({ locale: 'it', id: 'senior-bim-lead', job: activeJob });
assert.strictEqual(activeJobMetaIt.title, 'Lead BIM Senior | pyBIM');
assert.strictEqual(activeJobMetaIt.alternates?.canonical, 'https://pybim.it/it/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaIt.alternates?.languages.it, 'https://pybim.it/it/careers/senior-bim-lead');

// 7d. Check source code structure of careers/[id]/page.js
const careerDetailCode = fs.readFileSync(new URL('../app/[locale]/careers/[id]/page.js', import.meta.url), 'utf8');
assert.ok(careerDetailCode.includes('getCareerDetailMetadata'), 'Must use getCareerDetailMetadata');
assert.ok(careerDetailCode.includes('job.isActive === false'), 'Must check isActive status');
assert.ok(careerDetailCode.includes('notFound()'), 'Must call notFound() for missing or inactive jobs');

console.log('   ✓ Dynamic Careers detail pages properly suppress inherited signals on 404 and enforce Model B mapping');

console.log('\n=== ALL SEO-01 MULTI-DOMAIN & MULTILINGUAL TESTS PASSED SUCCESSFULLY ===');
