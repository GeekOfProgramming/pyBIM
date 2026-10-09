/**
 * pyBIM — Technology Capabilities & Standards Catalogue Data Architecture
 * pyBIM Design System v2 — Engineering Precision
 * 
 * Strict Three-Pillar Architecture:
 * - Pillar 01: BIM Execution & Delivery (5 Service Families, exactly 55 Subordinate Service Headings)
 * - Pillar 02: Custom Code & Plugins (6 Technology Families)
 * - Pillar 03: Sovereign AI & Compliance (6 Reference Families: Standards, Regulations & Research)
 * 
 * Complete isolation with stable language-independent IDs.
 * UI displays localized names and content via useLanguage().
 */

export const CATALOGUE_PILLARS = [
  {
    id: "bim-delivery",
    num: "01",
    tagKey: "about.tech.pillar1_tag",
    titleKey: "about.tech.pillar1_title",
    subKey: "about.tech.pillar1_sub",
    statusKey: "about.tech.pillar1_status",
    statusType: "delivery", // emerald tone
    icon: "Layers",
    families: [
      {
        id: "bim-consulting",
        num: "01",
        titleKey: "about.tech.f1_1_title",
        descKey: "about.tech.f1_1_desc",
        itemCount: 9,
        itemsKey: "about.tech.f1_1_items",
      },
      {
        id: "bim-modeling",
        num: "02",
        titleKey: "about.tech.f1_2_title",
        descKey: "about.tech.f1_2_desc",
        itemCount: 14,
        itemsKey: "about.tech.f1_2_items",
      },
      {
        id: "bim-coordination",
        num: "03",
        titleKey: "about.tech.f1_3_title",
        descKey: "about.tech.f1_3_desc",
        itemCount: 12,
        itemsKey: "about.tech.f1_3_items",
      },
      {
        id: "cad-services",
        num: "04",
        titleKey: "about.tech.f1_4_title",
        descKey: "about.tech.f1_4_desc",
        itemCount: 8,
        itemsKey: "about.tech.f1_4_items",
      },
      {
        id: "cde-management",
        num: "05",
        titleKey: "about.tech.f1_5_title",
        descKey: "about.tech.f1_5_desc",
        itemCount: 12,
        itemsKey: "about.tech.f1_5_items",
      },
    ],
  },
  {
    id: "development",
    num: "02",
    tagKey: "about.tech.pillar2_tag",
    titleKey: "about.tech.pillar2_title",
    subKey: "about.tech.pillar2_sub",
    statusKey: "about.tech.pillar2_status",
    statusType: "rnd", // blue tone
    icon: "Terminal",
    families: [
      {
        id: "core-languages",
        num: "01",
        titleKey: "about.tech.f2_1_title",
        descKey: "about.tech.f2_1_desc",
        itemCount: 5,
        itemsKey: "about.tech.f2_1_items",
      },
      {
        id: "bim-apis",
        num: "02",
        titleKey: "about.tech.f2_2_title",
        descKey: "about.tech.f2_2_desc",
        itemCount: 5,
        itemsKey: "about.tech.f2_2_items",
      },
      {
        id: "backend-integration",
        num: "03",
        titleKey: "about.tech.f2_3_title",
        descKey: "about.tech.f2_3_desc",
        itemCount: 4,
        itemsKey: "about.tech.f2_3_items",
      },
      {
        id: "frontend-visualization",
        num: "04",
        titleKey: "about.tech.f2_4_title",
        descKey: "about.tech.f2_4_desc",
        itemCount: 3,
        itemsKey: "about.tech.f2_4_items",
      },
      {
        id: "data-ai",
        num: "05",
        titleKey: "about.tech.f2_5_title",
        descKey: "about.tech.f2_5_desc",
        itemCount: 4,
        itemsKey: "about.tech.f2_5_items",
      },
      {
        id: "analytics-interoperability",
        num: "06",
        titleKey: "about.tech.f2_6_title",
        descKey: "about.tech.f2_6_desc",
        itemCount: 4,
        itemsKey: "about.tech.f2_6_items",
      },
    ],
  },
  {
    id: "standards",
    num: "03",
    tagKey: "about.tech.pillar3_tag",
    titleKey: "about.tech.pillar3_title",
    subKey: "about.tech.pillar3_sub",
    statusKey: "about.tech.pillar3_status",
    statusType: "compliance", // slate / indigo tone
    icon: "Shield",
    families: [
      {
        id: "information-standards",
        num: "01",
        titleKey: "about.tech.f3_1_title",
        descKey: "about.tech.f3_1_desc",
        itemCount: 4,
        itemsKey: "about.tech.f3_1_items",
      },
      {
        id: "italian-regulations",
        num: "02",
        titleKey: "about.tech.f3_2_title",
        descKey: "about.tech.f3_2_desc",
        itemCount: 4,
        itemsKey: "about.tech.f3_2_items",
      },
      {
        id: "openbim-interoperability",
        num: "03",
        titleKey: "about.tech.f3_3_title",
        descKey: "about.tech.f3_3_desc",
        itemCount: 3,
        itemsKey: "about.tech.f3_3_items",
      },
      {
        id: "delivery-requirements",
        num: "04",
        titleKey: "about.tech.f3_4_title",
        descKey: "about.tech.f3_4_desc",
        itemCount: 4,
        itemsKey: "about.tech.f3_4_items",
      },
      {
        id: "classification-information",
        num: "05",
        titleKey: "about.tech.f3_5_title",
        descKey: "about.tech.f3_5_desc",
        itemCount: 4,
        itemsKey: "about.tech.f3_5_items",
      },
      {
        id: "ai-assisted-research",
        num: "06",
        titleKey: "about.tech.f3_6_title",
        descKey: "about.tech.f3_6_desc",
        itemCount: 4,
        itemsKey: "about.tech.f3_6_items",
      },
    ],
  },
];
