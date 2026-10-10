"use client";

import { useState } from "react";
import TeamPartnerCard from "@/components/ui/team-partner-card";
import TeamPartnerModal from "@/components/ui/team-partner-modal";
import { useLanguage } from "@/lib/LanguageContext";
import { Users, Compass, ClipboardCheck } from "lucide-react";

export default function TeamPartnersSection({ teamData }) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { t } = useLanguage();

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

            {/* SCALABLE DELIVERY MODEL PANEL */}
            <div className="max-w-5xl mx-auto mt-16 bg-brand-cardElevated border border-brand-border rounded-3xl p-8 md:p-12 shadow-sm transition-all">
              <div className="max-w-3xl mb-10">
                <div className="inline-flex items-center gap-2 rounded-md border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-mono font-semibold text-brand-primary mb-4 tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>{t("about.team.scalable.badge")}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-textPrimary tracking-tight mb-3">
                  {t("about.team.scalable.title")}
                </h3>
                <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed">
                  {t("about.team.scalable.desc")}
                </p>
              </div>

              {/* THREE-STEP PRESENTATION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-brand-primary/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <Compass className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-textSecondary/60">01</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-textPrimary mb-2">
                      {t("about.team.scalable.step1_title")}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-textSecondary leading-relaxed">
                      {t("about.team.scalable.step1_desc")}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-brand-primary/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <Users className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-textSecondary/60">02</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-textPrimary mb-2">
                      {t("about.team.scalable.step2_title")}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-textSecondary leading-relaxed">
                      {t("about.team.scalable.step2_desc")}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-brand-surface border border-brand-border rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-brand-primary/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4 stroke-[2]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-textSecondary/60">03</span>
                    </div>
                    <h4 className="text-base font-bold text-brand-textPrimary mb-2">
                      {t("about.team.scalable.step3_title")}
                    </h4>
                    <p className="text-xs md:text-sm text-brand-textSecondary leading-relaxed">
                      {t("about.team.scalable.step3_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center pt-10 mt-12 border-t border-brand-border/60">
              <p className="text-sm text-brand-textSecondary/80 italic leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.team.sec1.footer") }} />
            </div>

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
