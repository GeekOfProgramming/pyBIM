"use client";
import Link from "@/components/LocalizedLink";
import { ChevronRight, Calendar, User, Tag, Facebook, Linkedin, Twitter, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogDetailLayout({ post, prevPost, nextPost }) {
  const { language, t } = useLanguage();
  const data = {
    title: post.title?.[language] || post.title?.it || post.slug,
    date: post.date?.[language] || post.date?.it,
    category: post.category?.[language] || post.category?.it,
    excerpt: post.excerpt?.[language] || post.excerpt?.it,
    intro: post.intro?.[language] || post.intro?.it || post.excerpt?.[language] || post.excerpt?.it,
    darkBoxQuote: post.darkBoxQuote?.[language] || post.darkBoxQuote?.it,
    orangeBoxHighlight: post.orangeBoxHighlight?.[language] || post.orangeBoxHighlight?.it,
    content: post.content?.[language] || post.content?.it,
    tags: post.tags || []
  };

  const handleShare = (platform) => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(data.title);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 -z-10">
          <img 
            src={post.image} 
            alt="Blog Detail Background" 
            className="h-full w-full object-cover opacity-20 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-brand-background/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081730] via-transparent to-[#081730]" />
        </div>
        <div className="text-center relative z-10 px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {data.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-white/50">
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Calendar className="w-4 h-4 text-brand-accent" />
              {data.date}
            </span>
            <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Tag className="w-4 h-4 text-brand-accentHover" />
              {language === "en" ? "Category:" : "Categoria:"} {data.category}
            </span>
            {post.author && (
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <User className="w-4 h-4 text-green-400" />
                {language === "en" ? "Author:" : "Autore:"} {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* SINGLE COLUMN DETAIL CONTENT */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        
        {/* Full Width Image */}
        <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl mb-16 aspect-video">
          <img src={post.image} alt={data.title} className="w-full h-full object-cover" />
        </div>

        {/* Text Content */}
        <article className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed mb-16">
          <p className="text-xl text-white font-medium mb-10 leading-relaxed">
            {data.intro}
          </p>

          {data.darkBoxQuote && (
            <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-[#102A5C] border-l-4 border-l-sky-500 border-y border-r border-white/5 relative">
              <MessageCircle className="absolute top-6 right-8 w-12 h-12 text-white/5" />
              <p className="text-2xl font-medium text-sky-100 italic relative z-10 m-0">
                "{data.darkBoxQuote}"
              </p>
            </div>
          )}

          {data.orangeBoxHighlight && (
            <div className="my-12 p-8 rounded-3xl bg-brand-accent text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <p className="text-xl font-bold relative z-10 m-0">
                {data.orangeBoxHighlight}
              </p>
            </div>
          )}

          <div className="content-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Tags & Social Share */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-8 border-y border-white/10 mb-8">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-semibold text-white/40 mr-2 uppercase tracking-wider">
              {language === "en" ? "Tags:" : "Tag:"}
            </span>
            {data.tags.map((tag, idx) => {
              const tagText = typeof tag === 'object' ? (tag[language] || tag.it) : tag;
              return (
                <span key={idx} className="bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10 text-white text-xs px-3 py-1.5 rounded-full transition-colors">
                  {tagText}
                </span>
              );
            })}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              {language === "en" ? "Share:" : "Condividi:"}
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleShare("facebook")} className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button onClick={() => handleShare("twitter")} className="w-10 h-10 rounded-full bg-blue-500/20 text-brand-accentHover flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button onClick={() => handleShare("linkedin")} className="w-10 h-10 rounded-full bg-blue-800/20 text-blue-400 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Post Navigation */}
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 mb-20">
          <div className="w-1/2 flex justify-start">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="group flex items-center justify-center gap-1 sm:gap-3 px-3 py-3 sm:px-8 sm:py-4 bg-brand-accent text-white font-bold rounded-full uppercase tracking-wider text-[10px] sm:text-sm hover:bg-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 w-full sm:w-auto">
                <ArrowLeft className="w-3 h-3 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform shrink-0" />
                <span className="text-center leading-tight truncate sm:whitespace-normal">{language === "en" ? "Previous" : "Precedente"}</span>
              </Link>
            )}
          </div>
          <div className="w-1/2 flex justify-end">
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group flex items-center justify-center gap-1 sm:gap-3 px-3 py-3 sm:px-8 sm:py-4 bg-brand-accent text-white font-bold rounded-full uppercase tracking-wider text-[10px] sm:text-sm hover:bg-orange-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-accent/30 transition-all duration-300 w-full sm:w-auto">
                <span className="text-center leading-tight truncate sm:whitespace-normal">{language === "en" ? "Next" : "Successivo"}</span>
                <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}
