import AboutPageLayout from "@/components/pages/about-page-layout";
import teamData from "@/lib/data/team-data.json";
import { db } from "@/lib/db";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "About Us",
    it: "Chi siamo",
    de: "Über uns"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default async function AboutPage() {
  const dbTeam = await db.teamMember.findMany({
    orderBy: { createdAt: "desc" }
  });

  let displayTeam = teamData;

  if (dbTeam.length > 0) {
    const teamMembers = [];
    const individualPartners = [];
    const corporatePartners = [];

    dbTeam.forEach(t => {
      const formatted = {
        id: t.id,
        isCompany: t.type === "CORPORATE_PARTNER",
        image: t.image,
        it: {
          name: t.nameIt,
          role: t.roleIt,
          bio: t.bioIt,
          skillsDesc: t.skillsDescIt || "",
          skills: t.skills ? JSON.parse(t.skills) : []
        },
        en: {
          name: t.nameEn,
          role: t.roleEn,
          bio: t.bioEn,
          skillsDesc: t.skillsDescEn || "",
          skills: t.skills ? JSON.parse(t.skills) : []
        }
      };

      if (t.type === "TEAM") teamMembers.push(formatted);
      else if (t.type === "INDIVIDUAL_PARTNER") individualPartners.push(formatted);
      else corporatePartners.push(formatted);
    });

    displayTeam = {
      teamMembers,
      individualPartners,
      corporatePartners
    };
  }

  return <AboutPageLayout teamData={displayTeam} />;
}
