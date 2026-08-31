"use client";
import { useState } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ChevronRight, Calendar, User, BookOpen, Newspaper, Wrench } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

import { tutorials, news, toolGuides } from "@/lib/data/education-data";

export default function EducationPageLayout() {
  const { t, language } = useLanguage();
  const [tutCount, setTutCount] = useState(3);
  const [newsCount, setNewsCount] = useState(3);
  const [toolCount, setToolCount] = useState(3);

  const renderCard = (post, idx, colorClass) => (
    <div key={post.slug} className="group flex flex-col rounded-3xl border border-brand-border bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl">
      <Link href={`/education/${post.slug}`} className="relative aspect-[4/3] w-full overflow-hidden block border-b border-brand-border">
        <img 
          src={post.image} 
          alt={post.title?.[language] || post.title?.en} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={`absolute top-4 left-4 ${colorClass} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm`}>
          {post.category?.[language] || post.category?.en}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-4 text-xs font-bold text-brand-textSecondary mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-primary" />
            {post.date?.[language] || post.date?.en}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-primary" />
            {post.author}
          </div>
        </div>
        <Link href={`/education/${post.slug}`}>
          <h3 className="text-xl font-bold text-brand-textPrimary mb-3 group-hover:text-brand-primary transition-colors line-clamp-3">
            {post.title?.[language] || post.title?.en}
          </h3>
        </Link>
        <p className="text-sm text-brand-textSecondary font-medium leading-relaxed mb-6 line-clamp-4">
          {post.excerpt?.[language] || post.excerpt?.en}
        </p>
        <Link href={`/education/${post.slug}`} className="inline-flex items-center text-sm font-bold text-brand-accent uppercase tracking-widest mt-auto hover:text-orange-600 transition-colors">
          {t("education.readMore")} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-brand-base">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[25vh] items-center justify-center overflow-hidden py-16 border-b border-brand-border">
        <div className="absolute inset-0 -z-10">
          <img 
            src="/Pictures/Blogs/blog.jpg" 
            alt="Education" 
            className="h-full w-full object-cover opacity-10 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-brand-surface" />
        </div>
        <div className="text-center relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-textPrimary mb-4 uppercase tracking-wider">
            {t("education.heroTitle")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-bold text-brand-textSecondary">
            <Link href="/" className="hover:text-brand-primary transition">{t("education.home")}</Link>
            <ChevronRight className="w-4 h-4 text-brand-border" />
            <span className="text-brand-primary">{t("education.education")}</span>
          </div>
        </div>
      </section>

      {/* SECTION 1: TUTORIALS */}
      <section className="bg-white w-full border-b border-brand-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <BookOpen className="w-4 h-4" /> {t("education.tutorialsGuides")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("education.ourTutorials")}
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.slice(0, tutCount).map((post, idx) => renderCard(post, idx, "bg-brand-minor1"))}
          </div>
          {tutCount < tutorials.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setTutCount(p => p + 3)} className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                {t("education.seeMore")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: NEWS & UPDATES */}
      <section className="bg-brand-surface w-full border-b border-brand-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Newspaper className="w-4 h-4" /> {t("education.newsUpdates")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("education.latestNews")}
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, newsCount).map((post, idx) => renderCard(post, idx, "bg-brand-minor2"))}
          </div>
          {newsCount < news.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setNewsCount(p => p + 3)} className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                {t("education.seeMore")}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: HOW TO USE OUR TOOLS */}
      <section className="bg-white w-full py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Wrench className="w-4 h-4" /> {t("education.toolGuides")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
              {t("education.howToUse")}
            </h2>
            <p className="mt-4 text-brand-textSecondary text-lg max-w-2xl mx-auto">
              {t("education.toolGuidesDesc")}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {toolGuides.slice(0, toolCount).map((post, idx) => renderCard(post, idx, "bg-brand-accent"))}
          </div>
          {toolCount < toolGuides.length && (
            <div className="mt-16 flex justify-center">
              <button onClick={() => setToolCount(p => p + 3)} className="rounded-full border border-brand-accent bg-white px-8 py-4 text-sm font-bold tracking-widest text-brand-accent uppercase hover:bg-brand-accent hover:text-white transition-all shadow-sm">
                {t("education.seeMore")}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
