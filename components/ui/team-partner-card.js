"use client";
import { Globe, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerCard({ person, onClick }) {
  const { language } = useLanguage();
  const data = person[language] || person.it;

  return (
    <div 
      onClick={() => onClick(person)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
    >
      {/* Background Image */}
      <div className="aspect-[4/5] w-full">
        <img 
          src={person.image || "/Pictures/General/hvac-industrial.jpg"} 
          alt={data.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
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
