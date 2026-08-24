"use client";
import { useState } from "react";
import Link from "@/components/LocalizedLink";
import { ChevronRight, ArrowRight, Calendar, User, Tag } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function BlogPageLayout({ posts = [] }) {
  const { t, language } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedPosts = [...posts].reverse();
  const visiblePosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;

  return (
    <div className="w-full bg-brand-base">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[25vh] items-center justify-center overflow-hidden py-16 border-b border-brand-border">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Blogs/blog.jpg" 
            alt={t("blog.hero.title")} 
            className="h-full w-full object-cover opacity-10 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-brand-surface" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 uppercase tracking-wider">
            {t("blog.hero.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary">
            <Link href="/" className="hover:text-brand-primary transition">{t("blog.hero.breadcrumb_home")}</Link>
            <ChevronRight className="w-4 h-4 text-brand-border" />
            <span className="text-brand-primary">{t("blog.hero.breadcrumb_blog")}</span>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="bg-brand-base w-full border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post, idx) => {
            // Alternate between Yellow and Purple for tags based on index
            const tagColor = idx % 2 === 0 ? "bg-brand-minor1 text-white" : "bg-brand-minor2 text-white";

            return (
              <div key={post.slug} className="group flex flex-col rounded-3xl border border-brand-border bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl">
                
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block border-b border-brand-border">
                  <img 
                    src={post.image || "/Pictures/General/hvac-commercial.jpg"} 
                    alt={post.title?.[language] || post.title?.it || post.slug} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                
                {/* Category Label */}
                  <div className={`absolute top-4 left-4 ${tagColor} text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm`}>
                    {post.category?.[language] || post.category?.it || "Article"}
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs font-bold text-brand-textSecondary mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-primary" />
                      {post.date?.[language] || post.date?.it || "Date"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-brand-primary" />
                      {post.author || "Author"}
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors line-clamp-3">
                      {post.title?.[language] || post.title?.it || post.slug}
                    </h3>
                  </Link>
                  <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6 line-clamp-4">
                    {post.excerpt?.[language] || post.excerpt?.it || ""}
                  </p>
                
                <div className="inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest mt-auto">
                  {t("blog.card.readmore")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        {/* LOAD MORE BUTTON */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-sm"
            >
              See More
            </button>
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
