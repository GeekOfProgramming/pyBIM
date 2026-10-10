"use client";
import { Globe, Linkedin, UserRound } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerCard({ person, onClick }) {
  const { language } = useLanguage();
  const data = person[language] || person.it;

  // Stock unapproved photos (e.g. Unsplash) or missing images should show neutral placeholder
  const isApprovedPortrait = Boolean(person.image && !person.image.includes("unsplash.com"));

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(person);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${data.name} — ${data.role}`}
      onClick={() => onClick(person)}
      onKeyDown={handleKeyDown}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base"
    >
      {/* Background Image / Neutral Placeholder */}
      <div className="aspect-[4/5] w-full">
        {isApprovedPortrait ? (
          <img
            src={person.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-900/90 flex flex-col items-center justify-center border border-brand-border">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-brand-border flex items-center justify-center text-brand-textSecondary group-hover:scale-105 transition-transform duration-500">
              <UserRound className="w-12 h-12 md:w-14 md:h-14 stroke-[1.5]" />
            </div>
          </div>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end">
        <h4 className="text-2xl font-bold text-white mb-1 text-center">{data.name}</h4>
        <p className="text-sm text-white/80 font-medium mb-2 text-center">{data.role}</p>
      </div>
    </div>
  );
}
