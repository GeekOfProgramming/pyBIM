"use client";

import { useEffect } from "react";
import TeamPartnersSection from "@/components/sections/team-partners-section";
import ManifestoHero from "@/components/about/manifesto-hero";
import CorePhilosophy from "@/components/about/core-philosophy";
import EngineeringJourney from "@/components/about/engineering-journey";
import TechnologyCapabilities from "@/components/about/technology-capabilities";
import EngineeringImpact from "@/components/about/engineering-impact";
import B2BCollaborationCTA from "@/components/about/b2b-collaboration-cta";

export default function AboutPageLayout({ teamData }) {
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
    <div className="w-full bg-brand-base">
      {/* SECTION 1: Hero Section (The Manifesto / Engineering Evolution) */}
      <ManifestoHero />

      {/* SECTION 2: Core Philosophy (3 Column Grid) */}
      <CorePhilosophy />

      {/* SECTION 3: Our Journey (Connected Engineering Timeline) */}
      <EngineeringJourney />

      {/* SECTION 4: Tech Stack & Standards (Three-Pillar Technical Catalogue) */}
      <TechnologyCapabilities />

      {/* SECTION 5: Engineering Value & Outcomes */}
      <EngineeringImpact />

      {/* SECTION 6: Call to Action (Two side-by-side cards) */}
      <B2BCollaborationCTA />

      {/* SECTION 7: Team & Leadership */}
      <TeamPartnersSection teamData={teamData} />

    </div>
  );
}
