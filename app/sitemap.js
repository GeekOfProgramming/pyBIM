import servicePages from "@/lib/data/services-data.json";
import projectPages from "@/lib/data/projects-data.json";

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
    "/terms-and-conditions"
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

    servicePages.forEach((service) => {
      entries.push({
        url: `${baseUrl}/${locale}/services/${service.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9
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
  });

  return entries;
}
