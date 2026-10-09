export default function sitemap() {
  const baseUrl = "https://www.pybim.com";
  const now = new Date();
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
        lastModified: now,
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8
      });
    });
  });

  return entries;
}
