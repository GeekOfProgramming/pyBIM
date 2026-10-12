import { notFound, redirect } from "next/navigation";
import { legacyProjectSlugs } from "@/lib/data/legacy-slugs";

// Set of known legacy placeholder slugs from bundled mock datasets
const legacyPlaceholderSlugs = new Set(legacyProjectSlugs);

export async function generateStaticParams() {
  // During the holding period, do not pre-render unverified project detail pages
  return [];
}

export async function generateMetadata({ params }) {
  const slug = params?.slug || "";

  if (legacyPlaceholderSlugs.has(slug)) {
    return {
      title: "Success Stories — In Preparation | pyBIM",
      robots: { index: false, follow: true }
    };
  }
  return {};
}

export default async function ProjectDetailPage({ params }) {
  const locale = params?.locale || "en";
  const slug = params?.slug || "";

  // Known legacy placeholder slugs temporarily redirect to localized Success Stories landing page
  if (legacyPlaceholderSlugs.has(slug)) {
    redirect(`/${locale}/success-stories#all-projects`);
  }

  // Unknown slugs return standard 404
  notFound();
}

