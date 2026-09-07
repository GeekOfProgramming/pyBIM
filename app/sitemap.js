import projectPages from "@/lib/data/projects-data.json";
import { tutorials, news, toolGuides } from "@/lib/data/education-data";

export default function sitemap() {
  const baseUrl = "https://pybim.com";
  const now = new Date();
  const locales = ["en", "it", "de"];

  const coreRoutes = [
    "",
    "/services",
    "/projects",
    "/careers",
    "/about",
    "/contact",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",
    "/education"
  ];

  let entries = [];

  locales.forEach((locale) => {
    coreRoutes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8
      });
    });

    projectPages.forEach((project) => {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
      });
    });

    const educationItems = [...tutorials, ...news, ...toolGuides];
    educationItems.forEach((item) => {
      entries.push({
        url: `${baseUrl}/${locale}/education/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
      });
    });
  });

  return entries;
}
