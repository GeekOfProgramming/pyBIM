"use client";
import { UserRound, Compass, Layers } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerCard({ person, onClick }) {
  const { language } = useLanguage();
  const data = person[language] || person.it;

  const isApprovedPortrait = Boolean(person.image && !person.image.includes("unsplash.com"));

  const handleClick = (e) => {
    e.currentTarget.focus({ preventScroll: true });
    onClick(person);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.currentTarget.focus({ preventScroll: true });
      onClick(person);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${data.name} — ${data.role}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-base flex flex-col h-full bg-brand-surface border border-brand-border"
    >
      {/* Visual Header / Portrait Area */}
      <div className="aspect-[4/5] xl:aspect-square w-full relative overflow-hidden bg-brand-base">
        {isApprovedPortrait ? (
          <img
            src={person.image}
            alt={data.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#112240] via-[#0B1528] to-[#070D18]">
            {/* Architectural Engineering Grid Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }}
            />

            {/* Subtle Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.2),transparent_70%)] pointer-events-none" />

            {/* Geometric Concentric Rings */}
            <div className="absolute w-44 h-44 rounded-full border border-blue-500/15 animate-[spin_60s_linear_infinite] pointer-events-none" />
            <div className="absolute w-56 h-56 rounded-full border border-blue-400/10 stroke-dasharray pointer-events-none" />

            {/* Central Monogram & Engineering Icon Badge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-400/30 backdrop-blur-md flex flex-col items-center justify-center text-brand-primary shadow-lg shadow-blue-950/50 group-hover:scale-105 group-hover:border-blue-400/50 transition-all duration-500">
                <Compass className="w-9 h-9 md:w-11 md:h-11 text-blue-400 stroke-[1.5] mb-1" />
                <span className="text-[11px] font-mono tracking-widest font-extrabold text-blue-300/90 uppercase">
                  BIM ENG
                </span>
              </div>
            </div>

            {/* Engineering Protocol Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase bg-blue-950/70 text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                LEADERSHIP
              </span>
            </div>
          </div>
        )}

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />
      </div>

      {/* Card Content Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end z-10">
        <h4 className="text-xl sm:text-[22px] lg:text-card-title font-bold text-white leading-[1.25] sm:leading-[1.25] lg:leading-[1.25] mb-1 text-center tracking-tight">
          {data.name}
        </h4>
        <p className="text-body-sm text-cyan-200/90 font-medium mb-1 text-center leading-snug">
          {data.role}
        </p>
        <span className="text-[11px] font-mono text-white/50 tracking-wider uppercase mt-1">
          pyBIM Executive Lead
        </span>
      </div>
    </div>
  );
}
