export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test/", "/admin/"]
      }
    ],
    sitemap: "https://www.pybim.com/sitemap.xml"
  };
}
