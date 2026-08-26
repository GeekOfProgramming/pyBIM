"use client";
import Link from "@/components/layout/LocalizedLink";
import { X, Phone, Mail, CheckCircle2, Linkedin, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function TeamPartnerModal({ person, onClose }) {
  const { t, language } = useLanguage();
  
  if (!person) return null;
  const data = person[language] || person.it;

  return (
    <div className="fixed inset-0 z-[1100] flex p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row m-auto border border-brand-border">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/90 hover:bg-brand-surface rounded-full flex items-center justify-center text-brand-textPrimary border border-brand-border shadow-sm transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Image & Contact Info */}
        <div className="w-full md:w-5/12 flex flex-col bg-brand-surface p-6 sm:p-8 border-b md:border-b-0 md:border-r border-brand-border justify-between">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-brand-border aspect-[4/5] w-full mb-6">
              <img 
                src={person.image || "/Pictures/General/hvac-industrial.jpg"} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center md:text-left mb-6">
              <h3 className="text-2xl font-bold text-brand-textPrimary">{data.name}</h3>
              <p className="text-sm font-semibold text-brand-primary mt-1">{data.role}</p>
            </div>
          </div>
          
          {/* Contact Box */}
          {((person.phone && person.phone !== "#") || 
            (person.email && person.email !== "#") || 
            (person.facebook && person.facebook !== "#") || 
            (person.instagram && person.instagram !== "#") || 
            (person.linkedin && person.linkedin !== "#")) && (
            <div className="bg-white rounded-2xl p-6 text-center relative shadow-sm border border-brand-border mt-4">
              <div className="w-12 h-12 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-brand-accent">
                <Mail className="w-5 h-5" />
              </div>
              
              <h4 className="text-base font-bold text-brand-textPrimary mb-4">
                {language === "en" ? "Direct Contact" : "Contatti Diretti"}
              </h4>
              
              <div className="flex flex-col gap-2.5 text-sm">
                {person.phone && person.phone !== "#" && person.phone !== "" && (
                  <a href={`tel:${person.phone}`} className="flex items-center justify-center gap-2.5 text-brand-textPrimary hover:text-brand-primary transition-colors bg-brand-surface px-4 py-2.5 rounded-xl border border-brand-border hover:border-brand-primary/30 font-medium text-xs">
                    <Phone className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>{person.phone}</span>
                  </a>
                )}
                {person.email && person.email !== "#" && person.email !== "" && (
                  <a href={`mailto:${person.email}`} className="flex items-center justify-center gap-2.5 text-brand-textPrimary hover:text-brand-primary transition-colors bg-brand-surface px-4 py-2.5 rounded-xl border border-brand-border hover:border-brand-primary/30 font-medium text-xs">
                    <Mail className="w-4 h-4 text-brand-accent shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </a>
                )}
                
                {/* Social Icons */}
                {((person.facebook && person.facebook !== "#") || (person.instagram && person.instagram !== "#") || (person.linkedin && person.linkedin !== "#")) && (
                  <div className="flex justify-center gap-2.5 mt-3 pt-3 border-t border-brand-border">
                    {person.facebook && person.facebook !== "#" && (
                      <a href={person.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-brand-surface border border-brand-border rounded-xl flex items-center justify-center text-brand-textPrimary hover:bg-brand-accent hover:border-brand-accent hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" aria-label="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {person.instagram && person.instagram !== "#" && (
                      <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-brand-surface border border-brand-border rounded-xl flex items-center justify-center text-brand-textPrimary hover:bg-brand-accent hover:border-brand-accent hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" aria-label="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {person.linkedin && person.linkedin !== "#" && (
                      <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-brand-surface border border-brand-border rounded-xl flex items-center justify-center text-brand-textPrimary hover:bg-brand-accent hover:border-brand-accent hover:text-white hover:scale-110 transition-all duration-300 shadow-sm" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Details */}
        <div className="w-full md:w-7/12 p-8 lg:p-12 md:overflow-y-auto md:max-h-[85vh] bg-white">
          
          {/* Bio */}
          <h2 className="text-2xl lg:text-3xl font-bold text-brand-textPrimary mb-4">
            {t("about.modal.info_title")}{data.name}
          </h2>
          <p className="text-brand-textSecondary leading-relaxed mb-10 font-medium text-sm sm:text-base">
            {data.bio || `${data.name} is a dedicated professional with deep expertise in BIM coordination, scripting automation, and computational workflows.`}
          </p>

          {/* Skills */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-brand-textPrimary mb-3">
              {person.isCompany ? t("about.modal.skills_title_company") : t("about.modal.skills_title_person")}
            </h3>
            <p className="text-brand-textSecondary text-sm mb-6 font-medium">
              {data.skillsDesc || "Optimization of workflows, algorithmic QA/QC verification, and agile technical execution."}
            </p>
            
            <div className="space-y-5">
              {(data.skills || [
                { name: "Revit API & pyRevit", value: 95 },
                { name: "Clash Automation", value: 98 },
                { name: "Algorithmic QA/QC", value: 92 }
              ]).map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold text-brand-textPrimary mb-1.5">
                    <span>{skill.name}</span>
                    <span className="text-brand-primary">{skill.value}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-brand-surface rounded-full overflow-hidden border border-brand-border">
                    <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full" style={{ width: `${skill.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Commitment */}
          <div>
            <h3 className="text-xl font-bold text-brand-textPrimary mb-5">
              {t("about.modal.commitment_title")}
            </h3>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {(person.commitments || [
                "Zero-error data execution",
                "High-standard ISO 19650 compliance",
                "Long-term algorithmic optimization",
                "Agile delivery within tight schedules"
              ]).map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-brand-surface border border-brand-border">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span className="text-brand-textPrimary font-medium text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
