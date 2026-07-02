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
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[25vh] items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Blogs/blog.jpg" 
            alt={t("blog.hero.title")} 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#081730]/90 via-[#081730]/60 to-[#081730]" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wider drop-shadow-lg">
            {t("blog.hero.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-white/50">
            <Link href="/" className="hover:text-orange-400 transition">{t("blog.hero.breadcrumb_home")}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-orange-400">{t("blog.hero.breadcrumb_blog")}</span>
          </div>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="bg-gradient-to-b from-[#081730] to-transparent w-full border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => {
            return (
              <div key={post.slug} className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-xl">
                
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block">
                  <img 
                    src={post.image || "/Pictures/General/hvac-commercial.jpg"} 
                    alt={post.title?.[language] || post.title?.it || post.slug} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                
                {/* Category Label */}
                  <div className="absolute top-4 left-4 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                    {post.category?.[language] || post.category?.it || "Article"}
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs font-medium text-white/50 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-orange-400" />
                      {post.date?.[language] || post.date?.it || "Date"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-300" />
                      {post.author || "Author"}
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-3">
                      {post.title?.[language] || post.title?.it || post.slug}
                    </h3>
                  </Link>
                  <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-4">
                    {post.excerpt?.[language] || post.excerpt?.it || ""}
                  </p>
                
                <div className="inline-flex items-center text-sm font-bold text-orange-400 uppercase tracking-widest mt-auto">
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
              className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/10 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-blue-500/25"
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
