"use client";
import Link from "@/components/layout/LocalizedLink";
import { X, Phone, Mail, Headset, CheckCircle2, Linkedin, Facebook, Instagram, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerModal({ person, onClose }) {
  const { t, language } = useLanguage();
  
  if (!person) return null;
  const data = person[language] || person.it;

  return (
    <div className="fixed inset-0 z-50 flex p-4 sm:p-6 bg-brand-background/80 backdrop-blur-md overflow-y-auto">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row m-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Image & Expert Help */}
        <div className="w-full md:w-1/3 flex flex-col bg-gray-50">
          <div className="p-6 pb-0 flex-1">
            <img 
              src={person.image || "/Pictures/General/hvac-industrial.jpg"} 
              alt={data.name} 
              className="w-full aspect-[4/5] object-cover rounded-2xl shadow-lg"
            />
          </div>
          
          {/* Contact Box - Only show if there is at least one valid contact method */}
          {((person.phone && person.phone !== "#") || 
            (person.email && person.email !== "#") || 
            (person.facebook && person.facebook !== "#") || 
            (person.instagram && person.instagram !== "#") || 
            (person.linkedin && person.linkedin !== "#")) && (
            <div className="p-6 pt-10">
              <div className="bg-brand-background rounded-2xl p-8 pt-12 text-center relative shadow-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-6">
                  {language === "en" ? "Contact Info" : "Contatti"}
                </h4>
                <div className="flex flex-col gap-4 text-sm text-white/80">
                  {person.phone && person.phone !== "#" && person.phone !== "" && (
                    <a href={`tel:${person.phone}`} className="flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-3 hover:text-brand-accent transition-colors bg-white/5 px-4 py-3 rounded-xl border border-white/10 hover:border-brand-accent/50 text-center">
                      <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                      <span className="font-medium break-all text-xs lg:text-sm">{person.phone}</span>
                    </a>
                  )}
                  {person.email && person.email !== "#" && person.email !== "" && (
                    <a href={`mailto:${person.email}`} className="flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-3 hover:text-brand-accent transition-colors bg-white/5 px-4 py-3 rounded-xl border border-white/10 hover:border-brand-accent/50 text-center">
                      <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                      <span className="font-medium break-all text-xs lg:text-sm">{person.email}</span>
                    </a>
                  )}
                  
                  {/* Only render the social icons wrapper if at least one social link exists */}
                  {((person.facebook && person.facebook !== "#") || (person.instagram && person.instagram !== "#") || (person.linkedin && person.linkedin !== "#")) && (
                    <div className="flex justify-center gap-3 mt-4">
                      {person.facebook && person.facebook !== "#" && (
                        <a href={person.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-accent hover:scale-110 transition-all duration-300">
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                      {person.instagram && person.instagram !== "#" && (
                        <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-accent hover:scale-110 transition-all duration-300">
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {person.linkedin && person.linkedin !== "#" && (
                        <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-brand-accent hover:scale-110 transition-all duration-300">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details & Form */}
        <div className="w-full md:w-2/3 p-8 lg:p-12 md:overflow-y-auto md:max-h-[85vh] bg-white text-gray-900">
          
          {/* Bio */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t("about.modal.info_title")}{data.name}</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            {data.bio || `${data.name} è un esperto altamente qualificato con profonda esperienza nel settore. Attraverso una solida base operativa e competenze tecniche avanzate, garantisce che ogni progetto rispetti i rigorosi standard di ingegneria e qualità del settore.`}
          </p>

          {/* Skills */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{person.isCompany ? t("about.modal.skills_title_company") : t("about.modal.skills_title_person")}</h3>
            <p className="text-gray-600 mb-8">
              {data.skillsDesc || "Ottimizzazione dei flussi di lavoro, controllo qualità rigoroso e capacità eccellenti di problem-solving per implementare soluzioni efficienti."}
            </p>
            
            <div className="space-y-6">
              {(data.skills || [
                { name: "Ingegneria", value: 95 },
                { name: "Controllo Qualità", value: 98 },
                { name: "Analisi Dati", value: 92 }
              ]).map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-accent rounded-full" style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Commitment */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">{t("about.modal.commitment_title")}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(person.commitments || [
                "Focus sulla produzione costante",
                "Rispetto dei rigorosi standard di sicurezza",
                "Impegno a lungo termine",
                "Efficienza nel rispetto delle scadenze"
              ]).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-gray-600 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
