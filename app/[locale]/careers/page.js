import CareersPageLayout from "@/components/pages/careers-page-layout";
import { db } from "@/lib/db";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.careers.titles;
  const siteUrl = "https://pybim.com";
  const currentUrl = `${siteUrl}/${locale}/careers`;
  
  return {
    title: titles[locale] || titles.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/careers`,
        it: `${siteUrl}/it/careers`,
        de: `${siteUrl}/de/careers`,
      },
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
