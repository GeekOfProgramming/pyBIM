import { notFound } from "next/navigation";
import CareerDetailLayout from "@/components/pages/career-detail-layout";
import { db } from "@/lib/db";
import { getCareerDetailMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { locale = "en", id } = params;
  let job = null;

  try {
    job = await db.jobPosition.findUnique({
      where: { id }
    });
  } catch (error) {
    // Database query failed or unconfigured
  }

  return getCareerDetailMetadata({ locale, id, job });
}

export default async function CareerDetailPage({ params }) {
  const { id } = params;
  let job = null;

  try {
    job = await db.jobPosition.findUnique({
      where: { id }
    });
  } catch (error) {
    // ignore
  }

  if (!job || job.isActive === false) {
    notFound();
  }

  return <CareerDetailLayout job={job} />;
}
