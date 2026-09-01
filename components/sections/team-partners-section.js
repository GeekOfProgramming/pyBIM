"use client";

import { useState } from "react";
import TeamPartnerCard from "@/components/ui/team-partner-card";
import TeamPartnerModal from "@/components/ui/team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "@/components/ui/carousel";
import { Users, Handshake, Building2, ShieldCheck } from "lucide-react";

export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t, language } = useLanguage();

  const openModal = (person) => setSelectedPerson(person);
  const closeModal = () => setSelectedPerson(null);

  const teamMembers = teamData?.teamMembers || [];
  const individualPartners = teamData?.individualPartners || [];
  const corporatePartners = teamData?.corporatePartners || [];
  const clients = teamData?.clients || [];

  if (teamMembers.length === 0 && individualPartners.length === 0 && corporatePartners.length === 0) return null;

  return (
    <>
      {/* 1. CORE TEAM SECTION */}
      {teamMembers.length > 0 && (
        <section id="team" className="bg-brand-surface w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Users className="w-4 h-4" /> {t("about.team.sec1.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-4">
                {t("about.team.sec1.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: t("about.team.sec1.desc") }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {teamMembers.map((person, idx) => (
                <div key={`${person.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={person} onClick={openModal} />
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center pt-10 mt-12 border-t border-brand-border/60">
              <p className="text-sm text-brand-textSecondary/80 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec1.footer") }} />
            </div>


          </div>
        </section>
      )}

      {/* 2. STRATEGIC ECOSYSTEM & DEPLOYMENT */}
      <section className="bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
              <Building2 className="w-4 h-4" /> {t("about.team.sec3.badge")}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-6">
              {t("about.team.sec3.title")}
            </h2>
            <p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.desc") }} />
          </div>

          {/* SECTION 1: THE R&D ROOTS */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-brand-border shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-4 border-b border-brand-border/60 pb-4">{t("about.team.sec3.l1_title")}</h3>
              <p className="text-brand-textSecondary text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.l1_desc") }} />
            </div>
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-brand-border shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-brand-textPrimary mb-4 border-b border-brand-border/60 pb-4">{t("about.team.sec3.l2_title")}</h3>
              <p className="text-brand-textSecondary text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.l2_desc") }} />
            </div>
          </div>

          {/* SECTION 2: DEPLOYMENT FOOTPRINT */}
          {clients.length > 0 && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 border-t border-brand-border/60 pt-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-1.5 text-xs font-bold text-brand-textSecondary uppercase tracking-widest mb-6">
                   {t("about.team.sec4.badge")}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {clients.map((client, idx) => (
                  <div key={idx} className="bg-brand-surface p-6 rounded-2xl border border-brand-border/60 flex flex-col justify-center items-center text-center group grayscale hover:grayscale-0 transition-all duration-500">
                    <h4 className="text-lg font-bold text-brand-textPrimary mb-1">{client.name || (client[language] && client[language].name) || client.en?.name}</h4>
                    <div className="text-sm font-bold text-brand-primary mb-3">{(client[language] && client[language].role) || client.en?.role}</div>
                    <p className="text-sm text-brand-textSecondary italic">{(client[language] && client[language].bio) || client.en?.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* MODAL */}
      {selectedPerson && (
        <TeamPartnerModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
