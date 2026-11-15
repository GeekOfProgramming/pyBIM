/**
 * pyBIM SEO Multi-Domain & Multilingual Architecture Utility
 *
 * Implements approved Model B canonical domain mapping:
 * - English (en): https://pybim.com/en/...
 * - Italian (it): https://pybim.it/it/...
 * - German (de):  https://pybim.com/de/...
 *
 * Provides deterministic, route-specific canonicals and reciprocal hreflang tags
 * without runtime host-header fragility during static rendering.
 */

export const SUPPORTED_LOCALES = ['en', 'it', 'de'];
export const DEFAULT_LOCALE = 'en';

export const DOMAIN_COM = 'https://pybim.com';
export const DOMAIN_IT = 'https://pybim.it';

export const CANONICAL_DOMAINS = {
  en: DOMAIN_COM,
  it: DOMAIN_IT,
  de: DOMAIN_COM,
};

/**
 * 8 Core indexable public routes (identical across .com and .it).
 * Routes with noindex policies (e.g. /education, /success-stories) and holding redirects
 * (/projects) are strictly excluded from sitemaps.
 */
export const CORE_INDEXABLE_ROUTES = [
  '',
  '/services',
  '/careers',
  '/about',
  '/contact',
  '/privacy-policy',
  '/cookie-policy',
  '/terms-and-conditions',
];

/**
 * Returns canonical domain for a given locale (https://pybim.it for 'it', https://pybim.com otherwise).
 */
export function getCanonicalDomain(locale) {
  return CANONICAL_DOMAINS[locale] || DOMAIN_COM;
}

/**
 * Normalizes a relative path ensuring leading slash when non-empty and no trailing slash (unless root).
 */
export function normalizePath(path = '') {
  if (!path || path === '/') return '';
  const trimmed = path.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
}

/**
 * Generates the absolute canonical HTTPS URL for a given locale and subpath.
 *
 * Examples:
 *   getCanonicalUrl('en', 'services')  => 'https://pybim.com/en/services'
 *   getCanonicalUrl('it', 'services')  => 'https://pybim.it/it/services'
 *   getCanonicalUrl('de', 'services')  => 'https://pybim.com/de/services'
 *   getCanonicalUrl('en', '')          => 'https://pybim.com/en'
 *   getCanonicalUrl('it', '')          => 'https://pybim.it/it'
 */
export function getCanonicalUrl(locale, path = '') {
  const domain = getCanonicalDomain(locale);
  const cleanPath = normalizePath(path);
  return `${domain}/${locale}${cleanPath}`;
}

/**
 * Generates reciprocal hreflang alternate links for en, it, de and x-default.
 * All alternate URLs are absolute, HTTPS, and point to each language's approved canonical domain.
 * x-default points to English on pybim.com.
 *
 * Example for 'services':
 *   en:        https://pybim.com/en/services
 *   it:        https://pybim.it/it/services
 *   de:        https://pybim.com/de/services
 *   x-default: https://pybim.com/en/services
 */
export function getAlternateLanguages(path = '') {
  const cleanPath = normalizePath(path);
  return {
    en: `${CANONICAL_DOMAINS.en}/en${cleanPath}`,
    it: `${CANONICAL_DOMAINS.it}/it${cleanPath}`,
    de: `${CANONICAL_DOMAINS.de}/de${cleanPath}`,
    'x-default': `${CANONICAL_DOMAINS.en}/en${cleanPath}`,
  };
}

/**
 * Helper to construct the Next.js `alternates` metadata field.
 */
export function buildAlternatesMetadata(locale, path = '') {
  return {
    canonical: getCanonicalUrl(locale, path),
    languages: getAlternateLanguages(path),
  };
}

/**
 * Domain classification utilities for middleware and route handlers.
 */
export function isItalianDomain(hostname = '') {
  const host = hostname.split(':')[0].toLowerCase();
  return host === 'pybim.it' || host === 'www.pybim.it';
}

export function isComDomain(hostname = '') {
  const host = hostname.split(':')[0].toLowerCase();
  return host === 'pybim.com' || host === 'www.pybim.com';
}

export function isProductionDomain(hostname = '') {
  return isItalianDomain(hostname) || isComDomain(hostname);
}

/**
 * Resolves the canonical destination for a given request hostname, pathname, and search params.
 * Returns null if no redirect is necessary.
 *
 * Strict protection rules:
 * - Does NOT redirect on local/preview/worker development domains (localhost, 127.0.0.1, *.workers.dev, etc.)
 * - Does NOT apply cross-domain redirects to private/portal/auth routes (/portal, /login, /register, /api)
 *   to avoid dropping session cookies.
 * - Single-hop normalization for www -> apex.
 * - Permanent 308 redirects for noncanonical domain/language combinations:
 *     pybim.com/it/...   -> https://pybim.it/it/...
 *     pybim.it/en/...    -> https://pybim.com/en/...
 *     pybim.it/de/...    -> https://pybim.com/de/...
 *     www.pybim.com/...  -> https://pybim.com/... (or https://pybim.it/it/... if it)
 *     www.pybim.it/...   -> https://pybim.it/... (or https://pybim.com/... if en/de)
 * - Root redirects:
 *     pybim.com/         -> https://pybim.com/en
 *     pybim.it/          -> https://pybim.it/it
 */
export function resolveRedirectTarget({ hostname = '', pathname = '', search = '' }) {
  const host = hostname.split(':')[0].toLowerCase();

  // If not a recognized production domain (e.g. localhost, preview, staging worker),
  // preserve local/preview routing without cross-domain redirects.
  if (!isProductionDomain(host)) {
    return null;
  }

  // Exempt private / authentication / portal / api routes from cross-domain redirection
  // so domain-scoped cookies and JWT sessions are not dropped.
  if (
    pathname.startsWith('/api/') ||
    pathname.includes('/portal') ||
    pathname.includes('/login') ||
    pathname.includes('/register')
  ) {
    return null;
  }

  const isItHost = isItalianDomain(host);
  const isComHost = isComDomain(host);

  // Check if pathname starts with a supported locale
  const matchedLocale = SUPPORTED_LOCALES.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  // Root or route without locale
  if (!matchedLocale) {
    if (pathname === '/' || pathname === '') {
      // Default root behavior per Model B:
      // pybim.com/ -> pybim.com/en
      // pybim.it/  -> pybim.it/it
      const targetDomain = isItHost ? DOMAIN_IT : DOMAIN_COM;
      const targetLocale = isItHost ? 'it' : 'en';
      return `${targetDomain}/${targetLocale}${search || ''}`;
    }

    // Path without locale (e.g. /services)
    // On pybim.it -> /it/services, on pybim.com -> /en/services
    const targetDomain = isItHost ? DOMAIN_IT : DOMAIN_COM;
    const targetLocale = isItHost ? 'it' : 'en';
    const cleanPath = normalizePath(pathname);
    return `${targetDomain}/${targetLocale}${cleanPath}${search || ''}`;
  }

  // Path has a locale (en, it, de)
  const targetDomain = CANONICAL_DOMAINS[matchedLocale]; // it -> https://pybim.it, en/de -> https://pybim.com
  const currentDomain = isItHost ? DOMAIN_IT : DOMAIN_COM;

  // Check if host matches target canonical domain exactly (apex: pybim.com or pybim.it)
  const currentCanonicalApex = isItHost ? 'pybim.it' : 'pybim.com';
  const targetCanonicalApex = matchedLocale === 'it' ? 'pybim.it' : 'pybim.com';

  const isApex = host === currentCanonicalApex;
  const isCorrectDomain = currentCanonicalApex === targetCanonicalApex;

  // If already on the correct apex domain with the matching locale, no redirect needed
  if (isApex && isCorrectDomain) {
    return null;
  }

  // Otherwise, single-hop 308 redirect directly to the target canonical apex URL
  return `${targetDomain}${pathname}${search || ''}`;
}
