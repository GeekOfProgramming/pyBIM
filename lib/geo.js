/**
 * pyBIM Geographic Routing Architecture (GEO-01)
 *
 * Implements country-based routing for generic public entry URLs:
 * - IT (Italy)                 -> https://www.pybim.it/it
 * - DE (Germany)               -> https://www.pybim.com/de
 * - AT (Austria)               -> https://www.pybim.com/de
 * - Other countries / fallback -> https://www.pybim.com/en
 *
 * Country Detection Sources:
 * 1. Cloudflare edge header: CF-IPCountry
 * 2. Next.js edge context: req.geo?.country
 *
 * Safe Deterministic Fallback:
 * Missing, malformed, or Cloudflare pseudo-codes (XX, T1, A1, A2) default to 'en' on www.pybim.com.
 *
 * Security & Integrity Safeguards:
 * - Does NOT trust arbitrary client-supplied forwarded headers.
 * - Does NOT expose public query parameters that allow visitors to spoof geolocation.
 * - Only applies to explicitly approved public entry routes (CORE_INDEXABLE_ROUTES).
 * - Explicit localized URLs (/en, /it, /de) take absolute precedence over geolocation.
 * - Explicit user language preference cookie takes precedence over geolocation.
 */

import {
  DOMAIN_COM,
  DOMAIN_IT,
  CANONICAL_DOMAINS,
  CORE_INDEXABLE_ROUTES,
  normalizePath,
  isProductionDomain,
} from './seo.js';

export const GEO_COOKIE_NAME = 'pybim_lang_pref';
export const VALID_LOCALES = ['en', 'it', 'de'];

// Country to target mapping
export const COUNTRY_MAPPINGS = {
  IT: { locale: 'it', domain: DOMAIN_IT },
  DE: { locale: 'de', domain: DOMAIN_COM },
  AT: { locale: 'de', domain: DOMAIN_COM },
};

export const DEFAULT_GEO_TARGET = {
  locale: 'en',
  domain: DOMAIN_COM,
};

// Cloudflare special / pseudo country codes representing non-geographic or unknown origins
export const PSEUDO_COUNTRY_CODES = new Set(['XX', 'T1', 'A1', 'A2']);

/**
 * Normalizes and validates an ISO 3166-1 alpha-2 country code.
 * Returns a 2-letter uppercase string or null for absent, malformed, or pseudo-codes.
 */
export function sanitizeCountryCode(rawCountry) {
  if (!rawCountry || typeof rawCountry !== 'string') {
    return null;
  }
  const trimmed = rawCountry.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(trimmed)) {
    return null;
  }
  if (PSEUDO_COUNTRY_CODES.has(trimmed)) {
    return null;
  }
  return trimmed;
}

/**
 * Extracts the visitor country from Cloudflare headers or Next.js edge context.
 * Testable abstraction that strictly rejects arbitrary client headers or public spoofing.
 */
export function extractVisitorCountry(req) {
  if (!req) return null;

  // 1. Cloudflare edge header (CF-IPCountry)
  let cfHeader = null;
  if (typeof req.headers?.get === 'function') {
    cfHeader = req.headers.get('cf-ipcountry');
  } else if (req.headers && typeof req.headers === 'object') {
    cfHeader = req.headers['cf-ipcountry'] || req.headers['CF-IPCountry'];
  }

  const sanitizedHeader = sanitizeCountryCode(cfHeader);
  if (sanitizedHeader) {
    return sanitizedHeader;
  }

  // 2. Next.js edge context (req.geo?.country)
  if (req.geo?.country) {
    const sanitizedGeo = sanitizeCountryCode(req.geo.country);
    if (sanitizedGeo) {
      return sanitizedGeo;
    }
  }

  // 3. Fallback: unknown / absent
  return null;
}

/**
 * Validates a user-supplied language preference cookie.
 * Strictly allowlists supported locales: 'en', 'it', 'de'.
 */
export function parseLanguagePreference(cookieValue) {
  if (!cookieValue || typeof cookieValue !== 'string') {
    return null;
  }
  const clean = cookieValue.trim().toLowerCase();
  return VALID_LOCALES.includes(clean) ? clean : null;
}

/**
 * Checks whether a generic pathname (without locale) is an approved public entry route
 * eligible for geographic routing.
 */
export function isEligibleGeoRoute(pathname = '') {
  const clean = normalizePath(pathname);
  return CORE_INDEXABLE_ROUTES.includes(clean);
}

/**
 * Resolves the geographic destination URL for an eligible generic entry URL.
 *
 * Priority:
 * 1. Explicit user language preference (cookie) takes precedence over geolocation.
 * 2. Country geolocation mapping (IT -> it on .it, DE/AT -> de on .com, others -> en on .com).
 * 3. Default fallback (en on .com).
 */
export function resolveGeoDestination({
  hostname = '',
  pathname = '',
  search = '',
  country = null,
  userPreference = null,
}) {
  const cleanPath = normalizePath(pathname);
  const searchStr = search || '';
  const isProd = isProductionDomain(hostname);

  // 1. User explicit preference takes priority over country geolocation
  const validPref = parseLanguagePreference(userPreference);
  if (validPref) {
    const targetDomain = CANONICAL_DOMAINS[validPref] || DOMAIN_COM;
    if (isProd) {
      return {
        url: `${targetDomain}/${validPref}${cleanPath}${searchStr}`,
        locale: validPref,
        reason: 'user_preference',
        statusCode: 307,
      };
    } else {
      return {
        url: `/${validPref}${cleanPath}${searchStr}`,
        locale: validPref,
        reason: 'user_preference_local',
        statusCode: 307,
      };
    }
  }

  // 2. Country geolocation mapping
  const validCountry = sanitizeCountryCode(country);
  const targetConfig = validCountry && COUNTRY_MAPPINGS[validCountry]
    ? COUNTRY_MAPPINGS[validCountry]
    : DEFAULT_GEO_TARGET;

  const targetLocale = targetConfig.locale;
  const targetDomain = targetConfig.domain;

  if (isProd) {
    return {
      url: `${targetDomain}/${targetLocale}${cleanPath}${searchStr}`,
      locale: targetLocale,
      country: validCountry || 'UNKNOWN',
      reason: validCountry ? 'country_mapping' : 'default_fallback',
      statusCode: 307,
    };
  } else {
    return {
      url: `/${targetLocale}${cleanPath}${searchStr}`,
      locale: targetLocale,
      country: validCountry || 'UNKNOWN',
      reason: validCountry ? 'country_mapping_local' : 'default_fallback_local',
      statusCode: 307,
    };
  }
}
