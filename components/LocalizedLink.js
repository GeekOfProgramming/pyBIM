"use client";

import NextLink from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export default function LocalizedLink({ href, children, ...props }) {
  const { getLocalizedUrl } = useLanguage();

  // Don't modify external links or anchor links
  if (
    typeof href === "string" &&
    (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || href.startsWith("/admin"))
  ) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  // Prepend locale
  const localizedHref = typeof href === "string" ? getLocalizedUrl(href) : href;

  return (
    <NextLink href={localizedHref} {...props}>
      {children}
    </NextLink>
  );
}
