"use client";
import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight, Share2, Tag } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import ReactMarkdown from "react-markdown";

export default function EducationDetailLayout({ post, prevPost, nextPost }) {
  const { language } = useLanguage();

  if (!post) return null;

  const title = post.title?.[language] || post.title?.en || post.slug;
  const category = post.category?.[language] || post.category?.en;
  const date = post.date?.[language] || post.date?.en;
  const content = post.content?.[language] || post.content?.en || "";

  return (
    <div className="w-full bg-brand-base min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img 
            src={post.image || "/Pictures/Blogs/blog.jpg"} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-base via-brand-base/90 to-brand-base/20" />
        </div>
        
        <div className="mx-auto max-w-4xl px-6 w-full relative z-10">
          <div className="flex items-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary mb-6">
            <Link href="/" className="hover:text-brand-primary transition">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/education" className="hover:text-brand-primary transition">Education</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-primary truncate max-w-[200px]">{title}</span>
          </div>

          <div className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            {category}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-textPrimary leading-tight mb-6 drop-shadow-md">
            {title}
          </h1>

          <div className="flex items-center gap-6 text-sm font-bold text-brand-textSecondary">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-primary" />
              {date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-brand-primary" />
              {post.author || "Dev Team"}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-border">
          <div className="prose prose-lg prose-brand max-w-none text-brand-textSecondary prose-headings:text-brand-textPrimary prose-a:text-brand-primary hover:prose-a:text-brand-accent">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          
          {/* Tags and Share */}
          <div className="mt-12 pt-8 border-t border-brand-border flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Tag className="w-5 h-5 text-brand-textSecondary" />
              <div className="flex gap-2">
                <span className="bg-brand-surface px-4 py-1.5 rounded-full text-sm font-bold text-brand-textPrimary border border-brand-border shadow-sm hover:border-brand-primary transition-colors cursor-pointer">
                  {category}
                </span>
              </div>
            </div>
            <button className="flex items-center gap-2 text-brand-primary hover:text-orange-600 transition-colors font-bold text-sm uppercase tracking-widest bg-brand-primary/5 px-4 py-2 rounded-full hover:bg-brand-primary/10">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* NAVIGATION: Prev / Next Posts */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {prevPost ? (
            <Link 
              href={`/education/${prevPost.slug}`}
              className="group flex flex-col p-6 bg-white rounded-3xl border border-brand-border hover:border-brand-primary/50 hover:shadow-md transition-all text-left"
            >
              <span className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-2 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
                Previous
              </span>
              <span className="text-lg font-bold text-brand-textPrimary line-clamp-2 group-hover:text-brand-primary transition-colors">
                {prevPost.title?.[language] || prevPost.title?.en}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
             <Link 
             href={`/education/${nextPost.slug}`}
             className="group flex flex-col p-6 bg-white rounded-3xl border border-brand-border hover:border-brand-primary/50 hover:shadow-md transition-all text-right items-end"
           >
             <span className="text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-2 flex items-center gap-1">
               Next
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> 
             </span>
             <span className="text-lg font-bold text-brand-textPrimary line-clamp-2 group-hover:text-brand-primary transition-colors">
               {nextPost.title?.[language] || nextPost.title?.en}
             </span>
           </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}
