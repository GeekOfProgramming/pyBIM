"use client";
import Link from "@/components/LocalizedLink";
import { ArrowRight, Calendar, User } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "./carousel";

export default function BlogPreview({ posts }) {
  const { t, language } = useLanguage();
  const displayPosts = posts ? [...posts].reverse() : [];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-16">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-accent" /> {t("home.blog.badge")}
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold text-white max-w-3xl leading-tight">
          {t("home.blog.title")}
        </h2>
        <p className="mt-4 text-lg text-white/60">
          {t("home.blog.subtitle")}
        </p>
      </div>

      <Carousel>
        {displayPosts.map((post) => (
          <article key={post.id} className="group relative rounded-3xl border border-white/10 bg-brand-background overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-500 shadow-xl h-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-900/20">
              <img 
                src={post.image || '/Pictures/General/hvac-industrial.jpg'} 
                alt={post.title[language] || post.title.it} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-brand-background/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <Calendar className="w-3 h-3 text-brand-accent" />
                {post.date[language] || post.date.it}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-4">
                <User className="w-3 h-3" />
                <span>{post.author}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 line-clamp-3 group-hover:text-brand-accentHover transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title[language] || post.title.it}
                </Link>
              </h3>
              <p className="text-sm text-white/60 line-clamp-4 mb-6 flex-1">
                {post.excerpt[language] || post.excerpt.it}
              </p>
              <div className="inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest mt-auto">
                {t("home.services.readMore")} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </Carousel>
      
      <div className="mt-16 text-center">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-accent transition-colors uppercase tracking-wider border-b border-brand-accent pb-1">
          {t("home.blog.all")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
