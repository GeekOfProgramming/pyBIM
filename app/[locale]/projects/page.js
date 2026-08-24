import ProjectsPageLayout from "@/components/pages/projects-page-layout";
import projectsData from "@/lib/data/projects-data.json";
import { db } from "@/lib/db";

export const metadata = {
  title: "Progetti",
  description:
    "Scopri progetti HVAC, ventilazione e climatizzazione realizzati da pyBIM per settori residenziali, commerciali e industriali."
};

export default async function ProjectsPage() {
  const dbProjects = await db.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  let displayProjects = projectsData.slice(0, 3);

  if (false && dbProjects.length > 0) { // Disabled temporarily
    displayProjects = dbProjects.map(p => ({
      slug: p.slug,
      title: { it: p.titleIt, en: p.titleEn },
      category: { it: p.categoryIt, en: p.categoryEn },
      date: { it: p.dateIt, en: p.dateEn },
      location: { it: p.locationIt, en: p.locationEn },
      client: { it: p.clientIt, en: p.clientEn },
      image: p.image,
      description: { it: p.descriptionIt, en: p.descriptionEn },
      process: p.process ? JSON.parse(p.process) : [],
      results: p.results ? JSON.parse(p.results) : [],
      stats: p.stats ? JSON.parse(p.stats) : {},
      challenges: p.challenges ? JSON.parse(p.challenges) : [],
      faq: p.faq ? JSON.parse(p.faq) : []
    }));
  }

  return <ProjectsPageLayout projects={displayProjects} />;
}
