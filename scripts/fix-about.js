const fs = require('fs');

const path = 'c:/bim/components/pages/about-page-layout.js';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `          const id = hash.replace("#", "");`;
const idx = content.indexOf(searchStr);

if (idx > -1) {
  const correctHeader = `"use client";

import { useEffect } from "react";
import Link from "@/components/layout/LocalizedLink";
import { ArrowRight, Code2, Cpu, Cog, Briefcase, Terminal, Activity, Shield, Users, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import TeamPartnersSection from "@/components/sections/team-partners-section";

export default function AboutPageLayout({ teamData }) {
  const { t } = useLanguage();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const hash = window.location.hash;
        if (hash) {
`;

  content = correctHeader + content.substring(idx);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Fixed!");
} else {
  console.log("Could not find search string");
}
