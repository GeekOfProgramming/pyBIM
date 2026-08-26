import CareersPageLayout from "@/components/pages/careers-page-layout";
import { db } from "@/lib/db";
export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Careers",
    it: "Lavora con noi",
    de: "Karriere"
  };
  
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
