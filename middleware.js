import { NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const hostname = req.nextUrl.hostname || '';
  const isStagingPreview = hostname.includes('workers.dev') || process.env.ENVIRONMENT === 'staging';

  function applyStagingHeaders(response) {
    if (isStagingPreview) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }

  // Protect Portal Routes (Fail-closed: requires valid token and configured secret)
  if (pathname.includes('/portal')) {
    const token = req.cookies.get('auth_token')?.value;
    const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || defaultLocale;

    const secretKey = process.env.JWT_SECRET ? new TextEncoder().encode(process.env.JWT_SECRET) : null;

    if (!token || !secretKey) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return applyStagingHeaders(NextResponse.redirect(url));
    }
    
    try {
      await jwtVerify(token, secretKey);
    } catch (err) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return applyStagingHeaders(NextResponse.redirect(url));
    }
  }

  // i18n Locale handling
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return applyStagingHeaders(NextResponse.next());
  }

  // Redirect if there is no locale (and it's not an excluded path)
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return applyStagingHeaders(NextResponse.redirect(url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|Pictures|.*\\..*).*)'],
};
