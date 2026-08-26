"use client";

import { useState } from "react";
import TeamPartnerCard from "@/components/ui/team-partner-card";
import TeamPartnerModal from "@/components/ui/team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "@/components/ui/carousel";
import { Users, Handshake, Building2 } from "lucide-react";

export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t, language } = useLanguage();

  const openModal = (person) => setSelectedPerson(person);
  const closeModal = () => setSelectedPerson(null);

  const teamMembers = teamData?.teamMembers || [];
  const individualPartners = teamData?.individualPartners || [];
  const corporatePartners = teamData?.corporatePartners || [];

  if (teamMembers.length === 0 && individualPartners.length === 0 && corporatePartners.length === 0) return null;

  return (
    <>
      {/* 1. CORE TEAM SECTION */}
      {teamMembers.length > 0 && (
        <section id="team" className="bg-brand-surface w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Users className="w-4 h-4" /> OUR TEAM
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
                {t("about.team.sec1.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mt-4">
                {language === "it"
                  ? "Senior BIM Manager e sviluppatori software dedicati all'automazione e all'ingegneria di precisione."
                  : "Senior BIM Managers and full-stack software engineers dedicated to high-precision AEC automation."}
              </p>
            </div>

            <Carousel itemsPerViewDesktop={4}>
              {teamMembers.map((person, idx) => (
                <div key={`${person.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={person} onClick={openModal} />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* 2. INDIVIDUAL COLLABORATORS SECTION */}
      {individualPartners.length > 0 && (
        <section className="bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Handshake className="w-4 h-4" /> {t("about.team.sec2.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
                {t("about.team.sec2.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mt-4">
                {language === "it"
                  ? "Professionisti, architetti e consulenti specializzati che collaborano nei nostri progetti complessi."
                  : "Specialized architects, consultants, and technical experts collaborating across our engineering workflows."}
              </p>
            </div>

            <Carousel itemsPerViewDesktop={4}>
              {individualPartners.map((person, idx) => (
                <div key={`${person.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={person} onClick={openModal} />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* 3. CORPORATE PARTNERS SECTION */}
      {corporatePartners.length > 0 && (
        <section className="bg-brand-surface w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Building2 className="w-4 h-4" /> {t("about.team.sec3.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight">
                {t("about.team.sec3.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mt-4">
                {language === "it"
                  ? "Partner tecnologici e aziende leader che affiancano pyBIM nelle forniture e nelle soluzioni ingegneristiche."
                  : "Leading technology providers and enterprise partners collaborating with pyBIM on large-scale infrastructure."}
              </p>
            </div>

            <Carousel itemsPerViewDesktop={4}>
              {corporatePartners.map((company, idx) => (
                <div key={`${company.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={company} onClick={openModal} />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {/* MODAL */}
      {selectedPerson && (
        <TeamPartnerModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
