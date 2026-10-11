export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/test/", "/admin/"]
      }
    ],
    sitemap: "https://pybim.com/sitemap.xml"
  };
}
