import CareersPageLayout from "@/components/pages/careers-page-layout";
import { db } from "@/lib/db";
import { dummyJobs } from "@/lib/dummy-jobs";

export const metadata = {
  title: "Careers"
};

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  let jobs = await db.jobPosition.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  // Dummy jobs for testing display
  if (jobs.length === 0) {
    jobs = dummyJobs;
  }

  return <CareersPageLayout jobs={jobs} />;
}
