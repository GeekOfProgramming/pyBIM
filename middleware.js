import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";
import { applySecurityHeaders } from "@/lib/security";

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const hostname = req.nextUrl.hostname || '';
  const isStagingPreview = hostname.includes('workers.dev') || process.env.ENVIRONMENT === 'staging';

  function attachHeaders(response) {
    return applySecurityHeaders(response, isStagingPreview);
  }

  // Protect Portal Routes (Fail-closed: requires valid token and configured secret)
  if (pathname.includes('/portal')) {
    const token = req.cookies.get('auth_token')?.value;
    const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || defaultLocale;

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

  // i18n Locale handling
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return attachHeaders(NextResponse.next());
  }

  // Redirect if there is no locale (and it's not an excluded path)
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return attachHeaders(NextResponse.redirect(url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|Pictures|.*\\..*).*)'],
};
