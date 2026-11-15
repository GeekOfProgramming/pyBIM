export const dynamic = 'force-dynamic';

import { isItalianDomain, DOMAIN_COM, DOMAIN_IT } from '../../lib/seo.js';

/**
 * Multi-Domain Dynamic Robots.txt Route Handler
 *
 * Implements domain-specific sitemap referencing:
 * - pybim.com: Sitemap: https://pybim.com/sitemap.xml
 * - pybim.it:  Sitemap: https://pybim.it/sitemap.xml
 *
 * Preserves security exclusions (/api/, /test/, /admin/).
 * Emits Vary: Host to avoid CDN cache contamination between domains.
 */
export async function GET(request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const url = new URL(request.url);
  const domainParam = url.searchParams.get('domain');

  const isIt = domainParam === 'it' || (!domainParam && isItalianDomain(host));
  const sitemapUrl = isIt ? `${DOMAIN_IT}/sitemap.xml` : `${DOMAIN_COM}/sitemap.xml`;

  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /test/',
    'Disallow: /admin/',
    '',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n');

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Vary': 'Host',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
