export const dynamic = 'force-dynamic';

import {
  CORE_INDEXABLE_ROUTES,
  isItalianDomain,
  DOMAIN_COM,
  DOMAIN_IT,
} from '../../lib/seo.js';

/**
 * Multi-Domain Dynamic Sitemap Route Handler
 *
 * Implements Model B Sitemap Separation:
 * - www.pybim.com (and default/previews): Sitemap A with 16 canonical URLs (8 en + 8 de)
 * - www.pybim.it: Sitemap B with 8 canonical URLs (8 it)
 *
 * All listed URLs are final canonical HTTPS URLs on www domains.
 * Excludes noindex holding pages (/education, /success-stories) and redirect routes (/projects).
 * Returns HTTP 200, valid XML, Vary: Host to prevent CDN cross-domain cache contamination.
 *
 * Per Google Search Central guidelines and Task 11, static routes without verifiable lastmod
 * omit the <lastmod> tag to avoid emitting artificial or misleading dates.
 */
export async function GET(request) {
  // Trust standard Host header first, defending against spoofed X-Forwarded-Host
  const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';

  const isIt = isItalianDomain(host);
  const locales = isIt ? ['it'] : ['en', 'de'];
  const domain = isIt ? DOMAIN_IT : DOMAIN_COM;

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const locale of locales) {
    for (const route of CORE_INDEXABLE_ROUTES) {
      const priority = route === '' ? '1.0' : '0.8';
      xml += '  <url>\n';
      xml += `    <loc>${domain}/${locale}${route}</loc>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    }
  }

  xml += '</urlset>';

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Vary': 'Host',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
