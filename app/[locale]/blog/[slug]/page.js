import { notFound } from "next/navigation";
import blogData from "@/lib/data/blog-data.json";
import BlogDetailLayout from "@/components/pages/blog-detail-layout";

export function generateStaticParams() {
  const locales = ["en", "it", "de"];
  return locales.flatMap((locale) =>
    blogData.map((post) => ({
      locale,
      slug: post.slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const post = blogData.find((item) => item.slug === params.slug);
  if (!post) return {};
  const titleStr = post.title?.it || post.title?.en || post.slug;
  const descStr = post.excerpt?.it || post.excerpt?.en || "";
  return {
    title: titleStr,
    description: descStr
  };
}

export default function BlogPostPage({ params }) {
  const currentIndex = blogData.findIndex((item) => item.slug === params.slug);
  if (currentIndex === -1) notFound();

  const post = blogData[currentIndex];
  // Previous post in array (usually newer if sorted newest-first)
  const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
  // Next post in array (usually older if sorted newest-first)
  const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

  return <BlogDetailLayout post={post} prevPost={prevPost} nextPost={nextPost} />;
}
