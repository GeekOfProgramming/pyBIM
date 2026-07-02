"use client";

import { useState, useEffect } from "react";
import TeamPartnerCard from "./team-partner-card";
import TeamPartnerModal from "./team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "./carousel";
export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t } = useLanguage();

  const openModal = (person) => setSelectedPerson(person);
  const closeModal = () => setSelectedPerson(null);

  return (
    <>
      {/* TEAM SECTION (GRID, 4 PER ROW) */}
      <section id="team" className="bg-gradient-to-b from-white/[0.03] to-transparent w-full border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-6 py-24 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-orange-400 mb-4">{t("about.team.sec1.badge")}</h2>
            <h3 className="text-3xl md:text-5xl font-semibold text-white leading-tight">{t("about.team.sec1.title")}</h3>
          </div>
          <Carousel itemsPerViewDesktop={4}>
            {teamData.teamMembers.map((person, idx) => (
              <div key={`${person.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                <TeamPartnerCard person={person} onClick={openModal} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* INDIVIDUAL PARTNERS SECTION (CAROUSEL, 4 PER ROW) (Hidden Temporarily) */}
      {/* 
      <section className="bg-gradient-to-b from-transparent to-blue-900/10 w-full border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-6 py-24 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-blue-300 mb-4">{t("about.team.sec2.badge")}</h2>
            <h3 className="text-3xl md:text-5xl font-semibold text-white leading-tight">{t("about.team.sec2.title")}</h3>
          </div>
          <Carousel itemsPerViewDesktop={4}>
            {teamData.individualPartners.map((person) => (
              <div key={person.id} className="h-full">
                <TeamPartnerCard person={person} onClick={openModal} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      */}

      {/* CORPORATE PARTNERS SECTION (CAROUSEL, 4 PER ROW) (Hidden Temporarily) */}
      {/* 
      <section className="bg-gradient-to-b from-white/[0.02] to-transparent w-full border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-[90rem] px-6 py-24 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.35em] text-emerald-400 mb-4">{t("about.team.sec3.badge")}</h2>
            <h3 className="text-3xl md:text-5xl font-semibold text-white leading-tight">{t("about.team.sec3.title")}</h3>
          </div>
          <Carousel itemsPerViewDesktop={4}>
            {teamData.corporatePartners.map((company) => (
              <div key={company.id} className="h-full">
                <TeamPartnerCard person={company} onClick={openModal} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      */}

      {/* MODAL */}
      {selectedPerson && (
        <TeamPartnerModal person={selectedPerson} onClose={closeModal} />
      )}
    </>
  );
}
