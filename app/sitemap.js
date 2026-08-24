import { northItalyCities } from "@/lib/seo-data";
import servicePages from "@/lib/data/services-data.json";
import projectPages from "@/lib/data/projects-data.json";
import blogPosts from "@/lib/data/blog-data.json";
export default function sitemap() {
  const baseUrl = "https://pybim.com";
  const now = new Date();

  const corePages = [
    "",
    "/services",
    "/projects",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/cookie-policy"
  ].map((path) => ({ url: `${baseUrl}${path}`, lastModified: now }));

  const cityPages = northItalyCities.map((city) => ({
    url: `${baseUrl}/service-areas/${city.slug}`,
    lastModified: now
  }));

  const serviceDetailPages = servicePages.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now
  }));

  const projectDetailPages = projectPages.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now
  }));

  const blogDetailPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now
  }));

  return [...corePages, ...cityPages, ...serviceDetailPages, ...projectDetailPages, ...blogDetailPages];
}
