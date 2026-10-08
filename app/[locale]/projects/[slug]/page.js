import { notFound, redirect } from "next/navigation";
import { allProjectsData } from "@/lib/data/projects-data";
import projectsDataJson from "@/lib/data/projects-data.json";

// Set of known legacy placeholder slugs from bundled mock datasets
const legacyPlaceholderSlugs = new Set([
  ...(Array.isArray(allProjectsData) ? allProjectsData.map((p) => p.slug) : []),
  ...(Array.isArray(projectsDataJson) ? projectsDataJson.map((p) => p.slug) : []),
  "automated-clash-detection",
  "commercial-tower-clash-detection",
  "hospital-mep-coordination"
]);

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
    redirect(`/${locale}/projects#all-projects`);
  }

  // Unknown slugs return standard 404
  notFound();
}
