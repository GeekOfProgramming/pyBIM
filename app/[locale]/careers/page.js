import CareersPageLayout from "@/components/pages/careers-page-layout";
import { db } from "@/lib/db";
import { routeMetadata } from "@/lib/site-copy";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = routeMetadata.careers.titles;
  
  return {
    title: titles[locale] || titles.en
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
