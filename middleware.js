import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_super_secret_key_arvand_2026"
);

const locales = ['en', 'it', 'de'];
const defaultLocale = 'en';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Admin panel disabled temporarily

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
