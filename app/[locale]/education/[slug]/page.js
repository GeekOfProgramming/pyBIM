import { redirect, notFound } from "next/navigation";
import { allEducationData } from "@/lib/data/education-data";

export function generateStaticParams() {
  const locales = ["en", "it", "de"];
  return locales.flatMap((locale) =>
    allEducationData.map((post) => ({
      locale,
      slug: post.slug
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
  const isKnownPlaceholder = allEducationData.some((item) => item.slug === slug);

  if (isKnownPlaceholder) {
    redirect(`/${locale}/education`);
  }

  notFound();
}
