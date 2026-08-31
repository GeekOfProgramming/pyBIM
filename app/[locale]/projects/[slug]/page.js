import { notFound } from "next/navigation";
import { allProjectsData } from "@/lib/data/projects-data";
import ProjectDetailLayout from "@/components/pages/project-detail-layout";
import { db } from "@/lib/db";

export async function generateStaticParams() {
  const locales = ["en", "it", "de"];
  return locales.flatMap((locale) =>
    allProjectsData.map((project) => ({
      locale,
      slug: project.slug
    }))
  );
}

async function getProject(slug) {
  // First try DB
  try {
    const p = await db.project.findUnique({ where: { slug } });
    if (p) {
      return {
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
      };
    }
  } catch (err) {
    // Ignore DB errors if we don't have a live DB yet
  }
  // Fallback to JS data
  return allProjectsData.find((item) => item.slug === slug) || null;
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title?.it || project.title?.en || project.slug,
    description: project.description?.it || project.description?.en || ""
  };
}

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return <ProjectDetailLayout project={project} />;
}
