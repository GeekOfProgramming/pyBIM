import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";
import { applySecurityHeaders } from "@/lib/security";
import { resolveRedirectTarget, isItalianDomain } from "@/lib/seo";

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;

  // Prioritize verified Host header over untrusted client headers to defend against Host header spoofing
  const hostHeader = req.headers.get('host') || req.nextUrl.hostname || req.headers.get('x-forwarded-host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();
  const isStagingPreview = hostname.includes('workers.dev') || process.env.ENVIRONMENT === 'staging';

  function attachHeaders(response) {
    return applySecurityHeaders(response, isStagingPreview);
  }

  // 1. Cross-Domain Canonical Routing (Model B)
  // Permanent 308 redirect for noncanonical domain/locale combinations on production domains
  const redirectTarget = resolveRedirectTarget({ hostname, pathname, search });
  if (redirectTarget) {
    return attachHeaders(NextResponse.redirect(new URL(redirectTarget), 308));
  }

  // 2. Protect Portal Routes (Fail-closed: requires valid token and configured secret)
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

  // 3. i18n Locale handling for local / preview / non-redirected requests
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return attachHeaders(NextResponse.next());
  }

  // Redirect if there is no locale (e.g. on localhost or preview)
  const fallbackLocale = isItalianDomain(hostname) ? 'it' : defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${fallbackLocale}${pathname === "/" ? "" : pathname}`;
  return attachHeaders(NextResponse.redirect(url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|Pictures|.*\\..*).*)'],
};
