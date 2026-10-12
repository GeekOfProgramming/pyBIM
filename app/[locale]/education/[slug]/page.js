import { redirect, notFound } from "next/navigation";
import { legacyEducationSlugs } from "@/lib/data/legacy-slugs";

export function generateStaticParams() {
  const locales = ["en", "it", "de"];
  return locales.flatMap((locale) =>
    legacyEducationSlugs.map((slug) => ({
      locale,
      slug
    }))
  );
}

export async function generateMetadata({ params }) {
  return {
    robots: {
      index: false,
      follow: false
    }
  };
}

export default function EducationPostPage({ params }) {
  const locale = params?.locale || "en";
  const slug = params?.slug;
  const isKnownPlaceholder = legacyEducationSlugs.includes(slug);

  if (isKnownPlaceholder) {
    redirect(`/${locale}/education`);
  }

  notFound();
}

