export default function sitemap() {
  const baseUrl = "https://pybim.com";
  // Fixed release reference timestamp to avoid generating misleading fake modification dates per build
  const releaseDate = new Date("2026-10-11T00:00:00Z");
  const locales = ["en", "it", "de"];

  // Core indexable public routes (temporarily excluding noindex holding pages like /projects and /education)
  const coreRoutes = [
    "",
    "/services",
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
        lastModified: releaseDate,
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8
      });
    });
  });

  return entries;
}
