import BlogPageLayout from "@/components/pages/blog-page-layout";
import blogData from "@/lib/data/blog-data.json";

export const metadata = {
  title: "Blog & Ultime Notizie",
  description:
    "Rimani aggiornato su tecnologie, normative e novità del mondo HVAC e climatizzazione."
};

export default function BlogPage() {
  return <BlogPageLayout posts={blogData || []} />;
}
