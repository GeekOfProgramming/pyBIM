import CareersPageLayout from "@/components/pages/careers-page-layout";
import { db } from "@/lib/db";
import { routeMetadata } from "@/lib/site-copy";
import { getCanonicalUrl, getAlternateLanguages } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.careers.titles;
  const canonicalUrl = getCanonicalUrl(locale, "careers");
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages("careers"),
    },
    openGraph: {
      url: canonicalUrl,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  let jobs = await db.jobPosition.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return <CareersPageLayout jobs={jobs} />;
}
