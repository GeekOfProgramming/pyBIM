import BlogPageLayout from "@/components/pages/blog-page-layout";
import blogData from "@/lib/data/blog-data.json";

export async function generateMetadata({ params }) {
  const locale = params?.locale || "en";
  const titles = {
    en: "Blog & News",
    it: "Blog & Ultime Notizie",
    de: "Blog & Neuigkeiten"
  };
  
  return {
    title: titles[locale] || titles.en
  };
}

export default function BlogPage() {
  return <BlogPageLayout posts={blogData || []} />;
}
