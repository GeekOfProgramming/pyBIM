import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pybim_enterprise_sovereign_secret_key_2026'
);

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect Portal Routes
  if (pathname.includes('/portal')) {
    const token = req.cookies.get('auth_token')?.value;
    
    // Determine the current locale for redirect, defaulting to English
    const currentLocale = locales.find(locale => pathname.startsWith(`/${locale}/`)) || defaultLocale;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return NextResponse.redirect(url);
    }
    
    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (err) {
      const url = req.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return NextResponse.redirect(url);
    }
  }

  // i18n Locale handling
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale (and it's not an excluded path)
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|Pictures|.*\\..*).*)'],
};
