import { NextResponse } from "next/server.js";
import { jwtVerify } from "jose/jwt/verify";
import { applySecurityHeaders } from "./lib/security.js";
import { resolveRedirectTarget, isItalianDomain, isProductionDomain } from "./lib/seo.js";
import {
  GEO_COOKIE_NAME,
  extractVisitorCountry,
  parseLanguagePreference,
  isEligibleGeoRoute,
  resolveGeoDestination,
} from "./lib/geo.js";

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;

  // Prioritize verified Host header over untrusted client headers to defend against Host header spoofing
  const hostHeader = req.headers.get('host') || req.nextUrl.hostname || req.headers.get('x-forwarded-host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();
  const isStagingPreview = hostname.includes('workers.dev') || process.env.ENVIRONMENT === 'staging';

  // Cross-domain language preference transfer parameter (strictly validated)
  const urlPref = parseLanguagePreference(req.nextUrl.searchParams.get('lang_pref'));

  function attachHeaders(response) {
    if (urlPref) {
      response.cookies.set(GEO_COOKIE_NAME, urlPref, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
        secure: req.nextUrl.protocol === 'https:',
      });
    }
    return applySecurityHeaders(response, isStagingPreview);
  }

  // 1. Protect Portal Routes (Fail-closed: requires valid token and configured secret)
  if (pathname.includes('/portal')) {
    const token = req.cookies.get('auth_token')?.value;
    const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || (isItalianDomain(hostname) ? 'it' : defaultLocale);

    const secretKey = process.env.JWT_SECRET ? new TextEncoder().encode(process.env.JWT_SECRET) : null;

    if (!token || !secretKey) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return attachHeaders(NextResponse.redirect(url));
    }
    
    try {
      await jwtVerify(token, secretKey);
    } catch (err) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return attachHeaders(NextResponse.redirect(url));
    }
  }

  // Exempt authentication / api routes from redirection
  if (
    pathname.startsWith('/api/') ||
    pathname.includes('/login') ||
    pathname.includes('/register')
  ) {
    return attachHeaders(NextResponse.next());
  }

  // 2. Intentional Localized Routes: Explicit paths (/en, /it, /de) take absolute precedence over geolocation
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Model B Cross-Domain Canonical Normalization (Permanent 308 redirect for noncanonical domain/locale combinations)
    const redirectTarget = resolveRedirectTarget({ hostname, pathname, search });
    if (redirectTarget) {
      return attachHeaders(NextResponse.redirect(new URL(redirectTarget), 308));
    }
    return attachHeaders(NextResponse.next());
  }

  // 3. Generic Public Entry Routes: Evaluate Geographic Routing (GEO-01) with HTTP 307
  // Restricted strictly to approved public entry routes (CORE_INDEXABLE_ROUTES)
  if (isEligibleGeoRoute(pathname)) {
    const userPreference = urlPref || req.cookies.get(GEO_COOKIE_NAME)?.value;
    const country = extractVisitorCountry(req);

    const geoResult = resolveGeoDestination({
      hostname,
      pathname,
      search,
      country,
      userPreference,
    });

    if (geoResult?.url) {
      const redirectUrl = isProductionDomain(hostname)
        ? new URL(geoResult.url)
        : new URL(geoResult.url, req.url);

      const response = NextResponse.redirect(redirectUrl, 307);

      // Cache safety: Prevent geographic redirects from being cached across different visitors/countries
      response.headers.set('Cache-Control', 'private, no-store, no-cache, max-age=0, must-revalidate');
      response.headers.set('Vary', 'CF-IPCountry, Accept-Language, Cookie');

      return attachHeaders(response);
    }
  }

  // 4. Ineligible generic routes (unknown legacy or invalid routes):
  // Retain correct 404 behavior without geographic redirection
  return attachHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|Pictures|.*\\..*).*)'],
};
