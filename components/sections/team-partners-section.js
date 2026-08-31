"use client";

import { useState } from "react";
import TeamPartnerCard from "@/components/ui/team-partner-card";
import TeamPartnerModal from "@/components/ui/team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import Carousel from "@/components/ui/carousel";
import { Users, Handshake, Building2, ShieldCheck } from "lucide-react";

export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t } = useLanguage();

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

      {/* 2. EXTENDED LAB (Collaborators) */}
      {individualPartners.length > 0 && (
        <section className="bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Handshake className="w-4 h-4" /> {t("about.team.sec2.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-6">
                {t("about.team.sec2.title")}
              </h2>
              <div className="text-left space-y-4 max-w-3xl mx-auto mb-10">
                <p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: `<strong class="text-brand-textPrimary">${t("about.team.sec2.b_title")}:</strong> ${t("about.team.sec2.b_desc")}` }} />
                <p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: `<strong class="text-brand-textPrimary">${t("about.team.sec2.a_title")}:</strong> ${t("about.team.sec2.a_desc")}` }} />
                <p className="text-brand-textSecondary text-base md:text-lg font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: `<strong class="text-brand-textPrimary text-brand-primary">${t("about.team.sec2.s_title")}:</strong> ${t("about.team.sec2.s_desc")}` }} />
              </div>
              <p className="text-brand-textPrimary text-base md:text-lg font-medium bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/20" dangerouslySetInnerHTML={{ __html: t("about.team.sec2.network") }} />
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

      {/* 3. STRATEGIC ECOSYSTEM (Corporate Partners) */}
      {corporatePartners.length > 0 && (
        <section className="bg-brand-surface w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <Building2 className="w-4 h-4" /> {t("about.team.sec3.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-6">
                {t("about.team.sec3.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.desc") }} />
              
              <div className="text-left space-y-4 max-w-3xl mx-auto mb-10">
                <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-textPrimary mb-2">{t("about.team.sec3.l1_title")}</h4>
                  <p className="text-brand-textSecondary text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.l1_desc") }} />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-sm">
                  <h4 className="text-lg font-bold text-brand-textPrimary mb-2">{t("about.team.sec3.l2_title")}</h4>
                  <p className="text-brand-textSecondary text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec3.l2_desc") }} />
                </div>
              </div>
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


      {/* 4. TRUSTED BY (Clients) */}
      {clients.length > 0 && (
        <section className="bg-brand-base w-full border-t border-brand-border py-24 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-2 text-sm font-semibold text-brand-primary mb-4 shadow-sm">
                <ShieldCheck className="w-4 h-4" /> {t("about.team.sec4.badge")}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-textPrimary tracking-tight mb-6">
                {t("about.team.sec4.title")}
              </h2>
              <p className="text-brand-textSecondary text-base md:text-lg font-medium max-w-2xl mx-auto mb-10" dangerouslySetInnerHTML={{ __html: t("about.team.sec4.desc") }} />
            </div>

            <Carousel itemsPerViewDesktop={4}>
              {clients.map((client, idx) => (
                <div key={`${client.id}-${idx}`} className="animate-in fade-in zoom-in duration-500 h-full">
                  <TeamPartnerCard person={client} onClick={openModal} />
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
