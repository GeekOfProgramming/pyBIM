import { notFound } from "next/navigation";
import CareerDetailLayout from "@/components/pages/career-detail-layout";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = params;
  let job;

  try {
    job = await db.jobPosition.findUnique({
      where: { id }
    });
  } catch (error) {
    // ignore
  }

  if (!job) return { title: "Job Not Found" };

  return {
    title: job.titleIt || job.titleEn || "Job Position"
  };
}

export default async function CareerDetailPage({ params }) {
  const { id } = params;
  let job;

  try {
    job = await db.jobPosition.findUnique({
      where: { id }
    });
  } catch (error) {
    // ignore
  }

  if (!job) {
    notFound();
  }

  return <CareerDetailLayout job={job} />;
}
