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
 * Constructs metadata for dynamic career detail pages (/careers/[id]).
 *
 * Rules:
 * - If job is missing, null, or inactive: explicitly returns noindex/nofollow and nullifies canonical
 *   to suppress inherited homepage canonical/hreflang signals from root layout.
 * - If job is active: sets route-specific Model B Canonical and reciprocal Hreflangs, with noindex during holding phase.
 */
export function getCareerDetailMetadata({ locale = 'en', id = '', job = null }) {
  if (!job || job.isActive === false) {
    return {
      title: 'Job Not Found | pyBIM',
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: null,
        languages: {},
      },
    };
  }

  const jobTitle = locale === 'it' ? (job.titleIt || job.titleEn) : (job.titleEn || job.titleIt);
  const canonicalUrl = getCanonicalUrl(locale, `careers/${id}`);

  return {
    title: `${jobTitle || 'Job Position'} | pyBIM`,
    description: locale === 'it' ? job.descriptionIt : job.descriptionEn,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`careers/${id}`),
    },
    openGraph: {
      title: `${jobTitle || 'Job Position'} | pyBIM`,
      description: locale === 'it' ? job.descriptionIt : job.descriptionEn,
      url: canonicalUrl,
    },
  };
}

/**
 * Domain classification utilities for middleware and route handlers.
 * Allowlist strictly contains official pyBIM production hostnames.
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
 * Cloudflare Safety & Redirect Architecture Rules:
 * - Does NOT redirect on local/preview/worker development domains (localhost, 127.0.0.1, *.workers.dev, etc.)
 * - Does NOT apply cross-domain redirects to private/portal/auth routes (/portal, /login, /register, /api)
 *   so domain-scoped cookies and JWT sessions are not dropped.
 * - Does NOT attempt to normalize www to apex on the application layer, because Cloudflare edge rules
 *   already redirect apex domains to www in production. Conflicting application redirects would produce
 *   an infinite redirect loop.
 * - Permanent 308 redirects for noncanonical domain/language combinations:
 *     *.pybim.com/it/...   -> https://www.pybim.it/it/...
 *     *.pybim.it/en/...    -> https://www.pybim.com/en/...
 *     *.pybim.it/de/...    -> https://www.pybim.com/de/...
 * - Root redirects:
 *     *.pybim.com/         -> /en
 *     *.pybim.it/          -> /it
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

  // Preserve hostname format (www vs apex) based on incoming host, preventing loops
  // with Cloudflare edge redirects (which redirect apex to www).
  const isWww = host.startsWith('www.');
  const itDomain = isWww ? 'https://www.pybim.it' : DOMAIN_IT;
  const comDomain = isWww ? 'https://www.pybim.com' : DOMAIN_COM;

  // Check if pathname starts with a supported locale
  const matchedLocale = SUPPORTED_LOCALES.find(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  // Root or route without locale
  if (!matchedLocale) {
    if (pathname === '/' || pathname === '') {
      // Default root behavior per Model B:
      // On .it hosts  -> /it
      // On .com hosts -> /en
      const targetDomain = isItHost ? itDomain : comDomain;
      const targetLocale = isItHost ? 'it' : 'en';
      return `${targetDomain}/${targetLocale}${search || ''}`;
    }

    // Path without locale (e.g. /services)
    // On pybim.it -> /it/services, on pybim.com -> /en/services
    const targetDomain = isItHost ? itDomain : comDomain;
    const targetLocale = isItHost ? 'it' : 'en';
    const cleanPath = normalizePath(pathname);
    return `${targetDomain}/${targetLocale}${cleanPath}${search || ''}`;
  }

  // Path has a locale (en, it, de)
  // Check if the current host belongs to the correct domain family for this locale
  const isCorrectDomain = (matchedLocale === 'it' && isItHost) ||
                          ((matchedLocale === 'en' || matchedLocale === 'de') && isComHost);

  // If already on the correct domain family with the matching locale, no redirect needed!
  // (Both www and apex on the correct domain family return null to avoid conflict with Cloudflare)
  if (isCorrectDomain) {
    return null;
  }

  // Otherwise, cross-domain permanent 308 redirect to the counterpart domain
  const targetDomain = matchedLocale === 'it' ? itDomain : comDomain;
  return `${targetDomain}${pathname}${search || ''}`;
}
