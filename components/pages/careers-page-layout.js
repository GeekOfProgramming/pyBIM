"use client";

import { useState, useEffect } from "react";
import WorkWithUsHero from "@/components/careers/work-with-us-hero";
import HowWeWorkSection from "@/components/careers/how-we-work-section";
import ExpertiseAreasSection from "@/components/careers/expertise-areas-section";
import OpenRolesCollaborationsSection from "@/components/careers/open-roles-collaborations-section";
import StartAConversationSection from "@/components/careers/start-a-conversation-section";

export default function CareersPageLayout({ jobs }) {
  const [selectedRoleCode, setSelectedRoleCode] = useState("BIM-MOD");

  const handleApplyRole = (roleCode) => {
    if (roleCode) {
      setSelectedRoleCode(roleCode);
    }
    const targetEl = document.getElementById("protocol") || document.getElementById("apply");
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
          }
        }
      };

      handleScroll();
      window.addEventListener("hashchange", handleScroll);
      return () => window.removeEventListener("hashchange", handleScroll);
    }
  }, []);

  return (
    <div className="bg-brand-base">

      {/* S01: Work With pyBIM Hero */}
      <WorkWithUsHero />

      {/* S02: How We Work (Extracted Culture Section) */}
      <HowWeWorkSection />

      {/* S03: Where You Can Contribute (Expertise Areas) */}
      <ExpertiseAreasSection />

      {/* S04: Open Roles & Collaborations Section */}
      <OpenRolesCollaborationsSection jobs={jobs} onApplyRole={handleApplyRole} />

      {/* S05: Start a Conversation Section (#apply) */}
      <StartAConversationSection
        selectedRoleCode={selectedRoleCode}
        onSelectRoleCode={setSelectedRoleCode}
      />

    </div>
  );
}
