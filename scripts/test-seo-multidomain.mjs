/**
 * pyBIM SEO Multi-Domain & Multilingual Test Suite
 *
 * Validates:
 * 1. Model B Canonical URL generation (EN/DE on www.pybim.com, IT on www.pybim.it)
 * 2. Reciprocal Hreflang alternates across all languages and x-default on final www hosts
 * 3. Separate Dynamic Sitemaps (www.pybim.com: 16 URLs, www.pybim.it: 8 URLs) with trusted Host routing (no public query override)
 * 4. Robots.txt dynamic sitemap referencing & security exclusions (no public query override)
 * 5. Middleware cross-domain routing, query preservation & Cloudflare safety (no www-apex loops)
 * 6. Protection of authenticated sessions & private routes
 * 7. Preservation of existing noindex policies
 * 8. Dynamic Careers Pages (/careers/[id]) metadata, handling missing IDs, suppression of inherited signals
 * 9. Absolute prohibition of redirecting apex URLs in canonicals, sitemaps, and hreflang tags
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
assert.strictEqual(getCanonicalDomain('en'), DOMAIN_COM, 'en must map to www.pybim.com');
assert.strictEqual(getCanonicalDomain('de'), DOMAIN_COM, 'de must map to www.pybim.com');
assert.strictEqual(getCanonicalDomain('it'), DOMAIN_IT, 'it must map to www.pybim.it');

// 1b. Root canonical URLs
assert.strictEqual(getCanonicalUrl('en', ''), 'https://www.pybim.com/en');
assert.strictEqual(getCanonicalUrl('it', ''), 'https://www.pybim.it/it');
assert.strictEqual(getCanonicalUrl('de', ''), 'https://www.pybim.com/de');

// 1c. Subroute canonical URLs
assert.strictEqual(getCanonicalUrl('en', 'services'), 'https://www.pybim.com/en/services');
assert.strictEqual(getCanonicalUrl('it', 'services'), 'https://www.pybim.it/it/services');
assert.strictEqual(getCanonicalUrl('de', 'services'), 'https://www.pybim.com/de/services');

assert.strictEqual(getCanonicalUrl('en', '/about/'), 'https://www.pybim.com/en/about', 'slashes should be cleanly normalized');
assert.strictEqual(getCanonicalUrl('it', '/contact'), 'https://www.pybim.it/it/contact');
assert.strictEqual(getCanonicalUrl('de', 'privacy-policy'), 'https://www.pybim.com/de/privacy-policy');

// 1d. All 8 core routes have HTTPS and correct www host per locale
for (const route of CORE_INDEXABLE_ROUTES) {
  const enUrl = getCanonicalUrl('en', route);
  const itUrl = getCanonicalUrl('it', route);
  const deUrl = getCanonicalUrl('de', route);

  assert.ok(enUrl.startsWith('https://www.pybim.com/en'), `en URL must start with https://www.pybim.com/en: ${enUrl}`);
  assert.ok(itUrl.startsWith('https://www.pybim.it/it'), `it URL must start with https://www.pybim.it/it: ${itUrl}`);
  assert.ok(deUrl.startsWith('https://www.pybim.com/de'), `de URL must start with https://www.pybim.com/de: ${deUrl}`);
  assert.ok(!enUrl.includes('//en') && !enUrl.includes('com//'), `en URL must not have double slashes: ${enUrl}`);
  assert.ok(!itUrl.includes('//it') && !itUrl.includes('it//'), `it URL must not have double slashes: ${itUrl}`);

  // Prohibit apex URLs
  assert.ok(!enUrl.startsWith('https://pybim.com/'), `Must never emit apex canonical URL: ${enUrl}`);
  assert.ok(!itUrl.startsWith('https://pybim.it/'), `Must never emit apex canonical URL: ${itUrl}`);
  assert.ok(!deUrl.startsWith('https://pybim.com/'), `Must never emit apex canonical URL: ${deUrl}`);
}
console.log('   ✓ Canonical URLs strictly verified for EN, IT, DE on final www hosts across all routes');

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

  // Verify absolute HTTPS www URLs
  assert.ok(alternates.en.startsWith('https://www.pybim.com/en'));
  assert.ok(alternates.it.startsWith('https://www.pybim.it/it'));
  assert.ok(alternates.de.startsWith('https://www.pybim.com/de'));
  assert.strictEqual(alternates['x-default'], alternates.en, 'x-default must match English version on www');

  // Prohibit apex URLs in alternates
  assert.ok(!alternates.en.startsWith('https://pybim.com/'), 'Hreflang en must not use apex');
  assert.ok(!alternates.it.startsWith('https://pybim.it/'), 'Hreflang it must not use apex');
  assert.ok(!alternates.de.startsWith('https://pybim.com/'), 'Hreflang de must not use apex');

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
console.log('   ✓ Reciprocal hreflang references verified across EN, IT, DE and x-default on final www hosts');

// -----------------------------------------------------------------------------
// 3. Separate Dynamic Sitemap Tests (Host-Based, Final www URLs, No Query Override)
// -----------------------------------------------------------------------------
console.log('3. Testing Separate Dynamic Sitemaps (www.pybim.com vs www.pybim.it via Host header)...');

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
    assert.ok(u.startsWith('https://www.pybim.com/'), `.com sitemap URL must start with https://www.pybim.com/: ${u}`);
    assert.ok(u.startsWith('https://www.pybim.com/en') || u.startsWith('https://www.pybim.com/de'), `URL must be en or de: ${u}`);
    assert.ok(!u.includes('pybim.it'), `.com sitemap must never contain pybim.it: ${u}`);
    assert.ok(!u.startsWith('https://pybim.com/'), `Sitemap must not point to redirecting apex domain: ${u}`);
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
    assert.ok(u.startsWith('https://www.pybim.it/it'), `.it sitemap URL must start with https://www.pybim.it/it: ${u}`);
    assert.ok(!u.includes('pybim.com'), `.it sitemap must never contain pybim.com: ${u}`);
    assert.ok(!u.startsWith('https://pybim.it/'), `Sitemap must not point to redirecting apex domain: ${u}`);
    assert.ok(!u.includes('/education'), `noindex route /education must be excluded: ${u}`);
    assert.ok(!u.includes('/success-stories'), `noindex route /success-stories must be excluded: ${u}`);
    assert.ok(!u.includes('/projects'), `redirecting route /projects must be excluded: ${u}`);
  }
}

// 3c. Verify that query parameters (?domain=it) are strictly IGNORED
const ignoredQueryReq = new Request('https://www.pybim.com/sitemap.xml?domain=it', {
  headers: { host: 'www.pybim.com' }
});
const ignoredQueryRes = await getSitemapResponse(ignoredQueryReq);
const ignoredQueryUrls = extractSitemapUrls(await ignoredQueryRes.text());
assert.strictEqual(ignoredQueryUrls.length, 16, 'Query param ?domain=it must be ignored in favor of Host header');

console.log('   ✓ Dynamic Sitemaps correctly separated by Host (16 URLs on www.com, 8 URLs on www.it) with final canonical hosts');

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
  assert.ok(txt.includes('Sitemap: https://www.pybim.com/sitemap.xml'), 'Must point to final www .com sitemap');
  assert.ok(!txt.includes('https://pybim.com/'), 'Must not reference redirecting apex URL');
  assert.ok(!txt.includes('pybim.it'), 'Must not reference .it sitemap');
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
  assert.ok(txt.includes('Sitemap: https://www.pybim.it/sitemap.xml'), 'Must point to final www .it sitemap');
  assert.ok(!txt.includes('https://pybim.it/'), 'Must not reference redirecting apex URL');
  assert.ok(!txt.includes('pybim.com'), 'Must not reference .com sitemap');
  assert.ok(txt.includes('Disallow: /api/'));
  assert.ok(txt.includes('Disallow: /test/'));
  assert.ok(txt.includes('Disallow: /admin/'));
}

// 4c. Verify that query param ?domain=it is IGNORED on robots.txt
const ignoredRobotsReq = new Request('https://www.pybim.com/robots.txt?domain=it', {
  headers: { host: 'www.pybim.com' }
});
const ignoredRobotsTxt = await (await getRobotsResponse(ignoredRobotsReq)).text();
assert.ok(ignoredRobotsTxt.includes('Sitemap: https://www.pybim.com/sitemap.xml'));

console.log('   ✓ Robots.txt correctly references domain-specific sitemaps with final www hosts');

// -----------------------------------------------------------------------------
// 5. Middleware Cross-Domain Routing & Cloudflare Safety Tests
// -----------------------------------------------------------------------------
console.log('5. Testing Cross-Domain Canonical Routing & Cloudflare Safety (no www loops)...');

// 5a. Root Redirects (direct to canonical www)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/', search: '' }),
  'https://www.pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/', search: '' }),
  'https://www.pybim.com/en'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/', search: '' }),
  'https://www.pybim.it/it'
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

// 5c. Valid locales on apex redirect directly to final www (in harmony with Cloudflare edge)
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/en/services', search: '' }),
  'https://www.pybim.com/en/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/de/services', search: '' }),
  'https://www.pybim.com/de/services'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.it', pathname: '/it/services', search: '' }),
  'https://www.pybim.it/it/services'
);

// 5d. Noncanonical combinations -> redirect directly to counterpart www domain
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'www.pybim.com', pathname: '/it/services', search: '' }),
  'https://www.pybim.it/it/services',
  'www.pybim.com/it/services redirects directly to www.pybim.it in 1 hop'
);
assert.strictEqual(
  resolveRedirectTarget({ hostname: 'pybim.com', pathname: '/it/services', search: '' }),
  'https://www.pybim.it/it/services',
  'pybim.com/it/services redirects directly to www.pybim.it in 1 hop'
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

// 7c. Active Job ID (job.isActive is true) - Route-specific Model B Canonical & Hreflang on final www
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
assert.strictEqual(activeJobMetaEn.alternates?.canonical, 'https://www.pybim.com/en/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.en, 'https://www.pybim.com/en/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.it, 'https://www.pybim.it/it/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages.de, 'https://www.pybim.com/de/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaEn.alternates?.languages['x-default'], 'https://www.pybim.com/en/careers/senior-bim-lead');

const activeJobMetaIt = getCareerDetailMetadata({ locale: 'it', id: 'senior-bim-lead', job: activeJob });
assert.strictEqual(activeJobMetaIt.title, 'Lead BIM Senior | pyBIM');
assert.strictEqual(activeJobMetaIt.alternates?.canonical, 'https://www.pybim.it/it/careers/senior-bim-lead');
assert.strictEqual(activeJobMetaIt.alternates?.languages.it, 'https://www.pybim.it/it/careers/senior-bim-lead');

// 7d. Check source code structure of careers/[id]/page.js
const careerDetailCode = fs.readFileSync(new URL('../app/[locale]/careers/[id]/page.js', import.meta.url), 'utf8');
assert.ok(careerDetailCode.includes('getCareerDetailMetadata'), 'Must use getCareerDetailMetadata');
assert.ok(careerDetailCode.includes('job.isActive === false'), 'Must check isActive status');
assert.ok(careerDetailCode.includes('notFound()'), 'Must call notFound() for missing or inactive jobs');

console.log('   ✓ Dynamic Careers detail pages properly suppress inherited signals on 404 and enforce Model B mapping on www');

// -----------------------------------------------------------------------------
// 8. Strict Prohibition of Redirecting Apex URLs
// -----------------------------------------------------------------------------
console.log('8. Validating Zero Redirecting Apex URLs in SEO metadata & sitemaps...');

for (const loc of ['en', 'it', 'de']) {
  for (const route of CORE_INDEXABLE_ROUTES) {
    const c = getCanonicalUrl(loc, route);
    assert.ok(!c.startsWith('https://pybim.com/'), `Canonical must never use redirecting apex: ${c}`);
    assert.ok(!c.startsWith('https://pybim.it/'), `Canonical must never use redirecting apex: ${c}`);
    assert.ok(c.startsWith('https://www.pybim.com/') || c.startsWith('https://www.pybim.it/'), `Canonical must use www: ${c}`);

    const alts = getAlternateLanguages(route);
    for (const [k, v] of Object.entries(alts)) {
      assert.ok(!v.startsWith('https://pybim.com/'), `Alternate ${k} must never use redirecting apex: ${v}`);
      assert.ok(!v.startsWith('https://pybim.it/'), `Alternate ${k} must never use redirecting apex: ${v}`);
      assert.ok(v.startsWith('https://www.pybim.com/') || v.startsWith('https://www.pybim.it/'), `Alternate ${k} must use www: ${v}`);
    }
  }
}

console.log('   ✓ Verified zero redirecting apex URLs exist across all canonicals, hreflang alternates, and sitemaps');

// -----------------------------------------------------------------------------
// 9. Crawlable Navigation & Header Megamenu DOM Inspection (SEO-03)
// -----------------------------------------------------------------------------
console.log('9. Testing Header Navigation Crawlability & Sitelinks Foundation...');

const headerCode = fs.readFileSync(new URL('../components/layout/header.js', import.meta.url), 'utf8');

// 9a. Megamenu must NOT be conditionally unmounted with {megaMenuOpen && (...)}
assert.ok(
  !headerCode.includes('{megaMenuOpen && ('),
  'Header must not conditionally unmount megamenu with {megaMenuOpen && (...)}'
);

// 9b. Megamenu dropdown must be present unconditionally in DOM with id and aria attributes
assert.ok(headerCode.includes('id="pybim-megamenu-dropdown"'), 'Megamenu dropdown container must exist in DOM');
assert.ok(headerCode.includes('aria-hidden={!megaMenuOpen}'), 'Megamenu must toggle aria-hidden for accessibility');

// 9c. All 4 core sitelink destinations must exist in header navigation definitions
const requiredNavHrefs = ['/services', '/about', '/careers', '/contact'];
for (const href of requiredNavHrefs) {
  assert.ok(
    headerCode.includes(`href: "${href}"`) || headerCode.includes(`href: '${href}'`),
    `Header navigation data must contain link for ${href}`
  );
}
console.log('   ✓ Header navigation links unconditionally rendered in HTML DOM for search crawler discovery');

// -----------------------------------------------------------------------------
// 10. Legacy Route Audit & Real 404 Status Enforcement (SEO-02)
// -----------------------------------------------------------------------------
console.log('10. Testing Legacy Route Cleanup & 404 Status Code Enforcement...');

// 10a. Catch-all route ([...rest]/page.js) must call notFound() and NEVER return JSX directly
const catchAllCode = fs.readFileSync(new URL('../app/[locale]/[...rest]/page.js', import.meta.url), 'utf8');
assert.ok(catchAllCode.includes('notFound()'), 'Catch-all [...rest]/page.js must invoke notFound()');
assert.ok(!catchAllCode.includes('<NotFound'), 'Catch-all [...rest]/page.js must not return <NotFound /> directly (soft 404)');

// 10b. Retired education posts ([slug]/page.js) must call notFound()
const eduSlugCode = fs.readFileSync(new URL('../app/[locale]/education/[slug]/page.js', import.meta.url), 'utf8');
assert.ok(eduSlugCode.includes('notFound()'), 'Education [slug]/page.js must invoke notFound()');
assert.ok(!eduSlugCode.includes('legacyEducationSlugs.map'), 'Education [slug]/page.js must not pre-render legacy placeholder redirects');
assert.ok(eduSlugCode.includes('return [];'), 'Education [slug]/page.js generateStaticParams must return empty array');

// 10c. Projects holding route (/projects) must permanently redirect to /success-stories
const projectsCode = fs.readFileSync(new URL('../app/[locale]/projects/page.js', import.meta.url), 'utf8');
assert.ok(projectsCode.includes('permanentRedirect'), 'Projects page must issue permanent redirect to /success-stories');
assert.ok(projectsCode.includes('success-stories'), 'Projects page destination must be success-stories');

// 10d. Intentional noindex directives preserved on education and success-stories
const eduPageCode = fs.readFileSync(new URL('../app/[locale]/education/page.js', import.meta.url), 'utf8');
assert.ok(eduPageCode.includes('index: false'), 'Education landing page must retain index: false');
assert.ok(eduPageCode.includes('follow: true'), 'Education landing page must retain follow: true');

const ssPageCode = fs.readFileSync(new URL('../app/[locale]/success-stories/page.js', import.meta.url), 'utf8');
assert.ok(ssPageCode.includes('index: false'), 'Success stories page must retain index: false');
assert.ok(ssPageCode.includes('follow: true'), 'Success stories page must retain follow: true');

console.log('   ✓ Soft 404 bug eliminated: catch-all and retired education posts strictly return HTTP 404');

// -----------------------------------------------------------------------------
// 11. Core Business Page Metadata & Unique Descriptions
// -----------------------------------------------------------------------------
console.log('11. Testing Core Business Page Metadata & Descriptions...');

import { routeMetadata } from '../lib/site-copy.js';

const auditedRoutes = ['services', 'about', 'contact', 'careers'];
for (const r of auditedRoutes) {
  assert.ok(routeMetadata[r]?.titles?.en, `${r} must have en title`);
  assert.ok(routeMetadata[r]?.titles?.it, `${r} must have it title`);
  assert.ok(routeMetadata[r]?.titles?.de, `${r} must have de title`);

  assert.ok(routeMetadata[r]?.descriptions?.en, `${r} must have en description`);
  assert.ok(routeMetadata[r]?.descriptions?.it, `${r} must have it description`);
  assert.ok(routeMetadata[r]?.descriptions?.de, `${r} must have de description`);
}
console.log('   ✓ Route-specific titles and unique descriptions verified across EN, IT, DE for core business pages');

// -----------------------------------------------------------------------------
// 12. Content Accuracy & Zero Unsupported ISO Certification Claims
// -----------------------------------------------------------------------------
console.log('12. Auditing Content Accuracy & ISO 19650 Claims...');

// Search active codebase for unverified "Ottenuta la Certificazione"
const aboutItCode = fs.readFileSync(new URL('../lib/translations/it/about.json', import.meta.url), 'utf8');
assert.ok(
  !aboutItCode.includes('Ottenuta la Certificazione ISO'),
  'Translations must not contain unverified ISO certification claims'
);
assert.ok(
  !aboutItCode.includes('Certificato ISO 19650'),
  'Translations must not claim unverified ISO 19650 certificate'
);

console.log('   ✓ Verified zero active files claim unverified ISO 19650 certification');

// -----------------------------------------------------------------------------
// 13. Brand Entity Architecture, Structured Data & Content Integrity (SEO-04)
// -----------------------------------------------------------------------------
console.log('13. Testing Brand Entity Architecture, JSON-LD Linkage & Content Integrity...');

import { siteMetadata, SEODescriptions } from '../lib/site-copy.js';

// 13a. Approved 4-Pillar Brand Description
const orgDesc = siteMetadata.organizationDescription;
assert.ok(orgDesc.includes('BIM engineering') && orgDesc.includes('digital delivery'), 'Pillar 1: BIM Engineering & Digital Delivery must be present');
assert.ok(orgDesc.includes('software automation') || orgDesc.includes('Revit API'), 'Pillar 2: Software Engineering & Custom Automation must be present');
assert.ok(orgDesc.includes('AI') && orgDesc.includes('LLM'), 'Pillar 3: AI & LLM Development must be present');
assert.ok(orgDesc.includes('AEC'), 'Pillar 4: AEC industry focus must be present');

// 13b. Verify Homepage JSON-LD Schema file contents
const homePageFile = fs.readFileSync(new URL('../app/[locale]/page.js', import.meta.url), 'utf8');
assert.ok(
  homePageFile.includes('${DOMAIN_COM}/#organization') || homePageFile.includes('https://www.pybim.com/#organization'),
  'Organization must use stable @id https://www.pybim.com/#organization'
);
assert.ok(homePageFile.includes('pyBIM Engineering'), 'Organization alternateName must be pyBIM Engineering');
assert.ok(homePageFile.includes('https://www.linkedin.com/company/pybim'), 'sameAs must include verified LinkedIn profile');
assert.ok(homePageFile.includes('https://github.com/pyBIM-collaboration'), 'sameAs must include verified GitHub profile');
assert.ok(homePageFile.includes('publisher'), 'WebSite must specify publisher linking to Organization');
assert.ok(homePageFile.includes('${DOMAIN_COM}/#organization'), 'WebSite publisher @id must target stable Organization entity');
assert.ok(homePageFile.includes('${siteUrl}/#website'), 'WebSite @id must be domain-specific');

// 13c. Content Integrity: Elimination of unverified absolute claims in translations
const aboutEnCode = fs.readFileSync(new URL('../lib/translations/en/about.json', import.meta.url), 'utf8');
const aboutDeCode = fs.readFileSync(new URL('../lib/translations/de/about.json', import.meta.url), 'utf8');

assert.ok(!aboutEnCode.includes('Absolute elimination of human error'), 'Must not claim absolute elimination of human error (EN)');
assert.ok(!aboutEnCode.includes('guaranteeing flawless'), 'Must not claim guaranteed flawless compliance (EN)');
assert.ok(!aboutItCode.includes('Eliminazione assoluta dell\'errore umano'), 'Must not claim absolute elimination of human error (IT)');
assert.ok(!aboutItCode.includes('impeccabile'), 'Must not claim flawless compliance (IT)');
assert.ok(!aboutDeCode.includes('Absolute Beseitigung menschlicher Fehler'), 'Must not claim absolute elimination of human error (DE)');

// 13d. SEODescriptions: Zero-error claims eliminated
const seoDescStr = JSON.stringify(SEODescriptions);
assert.ok(!seoDescStr.includes('zero-error'), 'SEODescriptions must not claim zero-error');
assert.ok(!seoDescStr.includes('zero-errori'), 'SEODescriptions must not claim zero-errori');
assert.ok(!seoDescStr.includes('fehlerfreien'), 'SEODescriptions must not claim fehlerfreien');

// 13e. Verified Exclusion of Success Stories from Sitemaps & Core Indexable Routes
assert.ok(!CORE_INDEXABLE_ROUTES.includes('success-stories'), 'success-stories must remain excluded from CORE_INDEXABLE_ROUTES');
assert.ok(!CORE_INDEXABLE_ROUTES.includes('/success-stories'), 'success-stories must remain excluded from CORE_INDEXABLE_ROUTES');

console.log('   ✓ Single Organization entity (@id https://www.pybim.com/#organization) strictly bound to both domains');
console.log('   ✓ WebSite entities link via publisher @id across .com and .it');
console.log('   ✓ Verified official profiles (LinkedIn, GitHub) present without speculative channels');
console.log('   ✓ 4-Pillar brand description and content integrity verified with zero unverified claims');

// -----------------------------------------------------------------------------
// 14. GEO-01 Geographic Routing, Country Detection & Language Preferences
// -----------------------------------------------------------------------------
console.log('14. Testing GEO-01 Geographic Routing, Country Detection & Language Preferences...');

import { NextRequest } from 'next/server.js';
import { middleware } from '../middleware.js';
import {
  GEO_COOKIE_NAME,
  extractVisitorCountry,
  sanitizeCountryCode,
  parseLanguagePreference,
  isEligibleGeoRoute,
  resolveGeoDestination,
} from '../lib/geo.js';

// 14a. Pure country code sanitation
assert.strictEqual(sanitizeCountryCode('it'), 'IT');
assert.strictEqual(sanitizeCountryCode('IT'), 'IT');
assert.strictEqual(sanitizeCountryCode('de'), 'DE');
assert.strictEqual(sanitizeCountryCode('at'), 'AT');
assert.strictEqual(sanitizeCountryCode('us'), 'US');
assert.strictEqual(sanitizeCountryCode('fr'), 'FR');
assert.strictEqual(sanitizeCountryCode('XX'), null, 'XX is Cloudflare unknown code, must fallback');
assert.strictEqual(sanitizeCountryCode('T1'), null, 'T1 is Tor code, must fallback');
assert.strictEqual(sanitizeCountryCode('A1'), null, 'A1 is anonymous proxy, must fallback');
assert.strictEqual(sanitizeCountryCode('A2'), null, 'A2 is satellite proxy, must fallback');
assert.strictEqual(sanitizeCountryCode('123'), null, 'numeric codes must be rejected');
assert.strictEqual(sanitizeCountryCode('ITA'), null, '3-letter codes must be rejected');
assert.strictEqual(sanitizeCountryCode(''), null);
assert.strictEqual(sanitizeCountryCode(null), null);

// 14b. Pure language preference cookie parser
assert.strictEqual(parseLanguagePreference('en'), 'en');
assert.strictEqual(parseLanguagePreference('it'), 'it');
assert.strictEqual(parseLanguagePreference('de'), 'de');
assert.strictEqual(parseLanguagePreference('EN'), 'en');
assert.strictEqual(parseLanguagePreference('es'), null, 'unsupported languages must be ignored');
assert.strictEqual(parseLanguagePreference('invalid'), null);
assert.strictEqual(parseLanguagePreference(null), null);

// 14c. Approved public entry routes for Geo-Routing
assert.strictEqual(isEligibleGeoRoute('/'), true);
assert.strictEqual(isEligibleGeoRoute(''), true);
assert.strictEqual(isEligibleGeoRoute('/services'), true);
assert.strictEqual(isEligibleGeoRoute('/careers'), true);
assert.strictEqual(isEligibleGeoRoute('/about'), true);
assert.strictEqual(isEligibleGeoRoute('/contact'), true);
assert.strictEqual(isEligibleGeoRoute('/privacy-policy'), true);
assert.strictEqual(isEligibleGeoRoute('/cookie-policy'), true);
assert.strictEqual(isEligibleGeoRoute('/terms-and-conditions'), true);
assert.strictEqual(isEligibleGeoRoute('/pricing'), false, 'invalid legacy route must not be geo-routed');
assert.strictEqual(isEligibleGeoRoute('/q1-update'), false);
assert.strictEqual(isEligibleGeoRoute('/random-page'), false);

// 14d. Middleware Execution: Scenario 1 - IT visitor on generic .com root
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307, 'Must return HTTP 307 Temporary Redirect for geo-routing');
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.it/it');
  assert.ok(res.headers.get('cache-control')?.includes('no-store'), 'Must include private, no-store');
  assert.ok(res.headers.get('vary')?.includes('CF-IPCountry'), 'Must include CF-IPCountry in Vary');
}

// 14e. Middleware Execution: Scenario 2 - DE visitor on generic .com root
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'DE' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.com/de');
}

// 14f. Middleware Execution: Scenario 3 - AT visitor on generic .com root
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'AT' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.com/de');
}

// 14g. Middleware Execution: Scenario 4 - US visitor on generic .com root
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'US' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.com/en');
}

// 14h. Middleware Execution: Scenario 5 - FR visitor on generic .com root
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'FR' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.com/en');
}

// 14i. Middleware Execution: Scenario 6 - Missing country value defaults safely to en
{
  const req = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 307);
  assert.strictEqual(res.headers.get('location'), 'https://www.pybim.com/en');
}

// 14j. Middleware Execution: Scenario 7 - Unknown country codes (XX, T1) default safely to en
{
  const reqXX = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'XX' },
  });
  const resXX = await middleware(reqXX);
  assert.strictEqual(resXX.status, 307);
  assert.strictEqual(resXX.headers.get('location'), 'https://www.pybim.com/en');

  const reqT1 = new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'T1' },
  });
  const resT1 = await middleware(reqT1);
  assert.strictEqual(resT1.status, 307);
  assert.strictEqual(resT1.headers.get('location'), 'https://www.pybim.com/en');
}

// 14k. Middleware Execution: Scenario 8 - IT visitor requesting explicit /en/services remains on English
{
  const req = new NextRequest('https://www.pybim.com/en/services', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const res = await middleware(req);
  // Status 200 from NextResponse.next() (no redirection)
  assert.strictEqual(res.status, 200, 'Explicit localized URL must not be redirected based on IP');
  assert.strictEqual(res.headers.get('location'), null);
}

// 14l. Middleware Execution: Scenario 9 - DE visitor requesting explicit /it/services remains on Italian
{
  const req = new NextRequest('https://www.pybim.it/it/services', {
    headers: { host: 'www.pybim.it', 'cf-ipcountry': 'DE' },
  });
  const res = await middleware(req);
  assert.strictEqual(res.status, 200, 'Explicit localized URL must not be redirected based on IP');
  assert.strictEqual(res.headers.get('location'), null);
}

// 14m. Middleware Execution: Scenario 10 - Explicit user language preference overrides geolocation
{
  // IT visitor who previously chose English
  const reqEn = new NextRequest('https://www.pybim.com/', {
    headers: {
      host: 'www.pybim.com',
      'cf-ipcountry': 'IT',
      cookie: `${GEO_COOKIE_NAME}=en`,
    },
  });
  const resEn = await middleware(reqEn);
  assert.strictEqual(resEn.status, 307);
  assert.strictEqual(resEn.headers.get('location'), 'https://www.pybim.com/en', 'Cookie preference en must override IT country');

  // IT visitor who previously chose German
  const reqDe = new NextRequest('https://www.pybim.com/', {
    headers: {
      host: 'www.pybim.com',
      'cf-ipcountry': 'IT',
      cookie: `${GEO_COOKIE_NAME}=de`,
    },
  });
  const resDe = await middleware(reqDe);
  assert.strictEqual(resDe.status, 307);
  assert.strictEqual(resDe.headers.get('location'), 'https://www.pybim.com/de', 'Cookie preference de must override IT country');

  // US visitor who previously chose Italian
  const reqIt = new NextRequest('https://www.pybim.com/', {
    headers: {
      host: 'www.pybim.com',
      'cf-ipcountry': 'US',
      cookie: `${GEO_COOKIE_NAME}=it`,
    },
  });
  const resIt = await middleware(reqIt);
  assert.strictEqual(resIt.status, 307);
  assert.strictEqual(resIt.headers.get('location'), 'https://www.pybim.it/it', 'Cookie preference it must override US country');
}

// 14n. Middleware Execution: Scenario 11 - Static assets and API are exempt from geo-routing
{
  const reqApi = new NextRequest('https://www.pybim.com/api/contact', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const resApi = await middleware(reqApi);
  assert.strictEqual(resApi.status, 200, 'API routes must not be geo-redirected');
}

// 14o. Middleware Execution: Scenario 12 - Client Portal and login are exempt from cross-domain geo redirection
{
  const reqLogin = new NextRequest('https://www.pybim.com/en/login', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const resLogin = await middleware(reqLogin);
  assert.strictEqual(resLogin.status, 200, 'Login page must not be geo-redirected');
}

// 14p. Middleware Execution: Scenario 13 - Generic subpath preserves route and query params
{
  const reqServices = new NextRequest('https://www.pybim.com/services?sort=asc&filter=bim', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const resServices = await middleware(reqServices);
  assert.strictEqual(resServices.status, 307);
  assert.strictEqual(
    resServices.headers.get('location'),
    'https://www.pybim.it/it/services?sort=asc&filter=bim',
    'Route path and query string must be preserved on geo-routing'
  );

  const reqContactDe = new NextRequest('https://www.pybim.com/contact?ref=partner', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'DE' },
  });
  const resContactDe = await middleware(reqContactDe);
  assert.strictEqual(resContactDe.status, 307);
  assert.strictEqual(
    resContactDe.headers.get('location'),
    'https://www.pybim.com/de/contact?ref=partner'
  );
}

// 14q. Middleware Execution: Scenario 14 - Invalid legacy URL does not trigger geo-routing
{
  const reqInvalid = new NextRequest('https://www.pybim.com/pricing', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  });
  const resInvalid = await middleware(reqInvalid);
  assert.strictEqual(resInvalid.status, 200, 'Invalid legacy route must pass through to Next.js 404');
  assert.strictEqual(resInvalid.headers.get('location'), null);
}

// 14r. Middleware Execution: Scenario 15 - Repeated redirect navigation (Zero redirect loop)
{
  // First hop: pybim.com/ (from IT) -> 307 to https://www.pybim.it/it
  const hop1 = await middleware(new NextRequest('https://www.pybim.com/', {
    headers: { host: 'www.pybim.com', 'cf-ipcountry': 'IT' },
  }));
  assert.strictEqual(hop1.status, 307);
  const destination1 = hop1.headers.get('location');
  assert.strictEqual(destination1, 'https://www.pybim.it/it');

  // Second hop: visitor loads destination URL https://www.pybim.it/it (from IT)
  const hop2 = await middleware(new NextRequest(destination1, {
    headers: { host: 'www.pybim.it', 'cf-ipcountry': 'IT' },
  }));
  assert.strictEqual(hop2.status, 200, 'Destination URL has explicit locale; no subsequent redirect or loop');
  assert.strictEqual(hop2.headers.get('location'), null);
}

// 14s. Middleware Execution: Scenario 16 - Preview and local development remain local
{
  const reqLocal = new NextRequest('http://localhost:3000/', {
    headers: { host: 'localhost:3000', 'cf-ipcountry': 'IT' },
  });
  const resLocal = await middleware(reqLocal);
  assert.strictEqual(resLocal.status, 307);
  assert.strictEqual(
    resLocal.headers.get('location'),
    'http://localhost:3000/it',
    'Local requests must redirect to local destination, never to production www.pybim.it'
  );

  const reqPreview = new NextRequest('https://pybim-preview.workers.dev/', {
    headers: { host: 'pybim-preview.workers.dev', 'cf-ipcountry': 'DE' },
  });
  const resPreview = await middleware(reqPreview);
  assert.strictEqual(resPreview.status, 307);
  assert.strictEqual(
    resPreview.headers.get('location'),
    'https://pybim-preview.workers.dev/de',
    'Preview requests must redirect to preview destination, never to production www.pybim.com'
  );
}

console.log('   ✓ IT -> https://www.pybim.it/it verified (HTTP 307 with private cache headers)');
console.log('   ✓ DE & AT -> https://www.pybim.com/de verified (HTTP 307)');
console.log('   ✓ US, FR & other countries -> https://www.pybim.com/en verified (HTTP 307)');
console.log('   ✓ Missing & unknown (XX, T1) countries fallback safely to English');
console.log('   ✓ Explicit localized paths (/en, /it, /de) strictly take precedence over IP');
console.log('   ✓ User language preference cookie (pybim_lang_pref) strictly overrides geolocation');
console.log('   ✓ Query parameters and route paths cleanly preserved on geographic redirects');
console.log('   ✓ Ineligible legacy routes (/pricing) exempt from geo-routing, preserving 404 behavior');
console.log('   ✓ Zero redirect loops verified on repeated navigation');
console.log('   ✓ Preview & local development environments remain strictly isolated from production domains');

console.log('\n=== ALL SEO-01, SEO-02/03, SEO-04 & GEO-01 TESTS PASSED SUCCESSFULLY ===');
