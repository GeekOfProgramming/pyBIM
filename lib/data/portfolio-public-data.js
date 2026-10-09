/**
 * pyBIM Public Portfolio & R&D Curated Dataset
 * 
 * Strict Publication Guard:
 * - Only records with explicit owner verification and `isApprovedForPublication: true`
 *   are rendered in public portfolio views.
 * - Completed projects require authenticated client release agreements.
 * - AI & LLM development initiatives represent exploratory R&D and prototypes;
 *   they are never marketed as autonomous commercial products.
 */

/**
 * Schema definition for completed engineering projects.
 * @typedef {Object} CompletedProjectRecord
 * @property {string} id - Stable unique identifier
 * @property {string} slug - Unique URL slug for future case study route
 * @property {string} titleKey - Localization key for project title
 * @property {string} summaryKey - Localization key for project summary
 * @property {string} discipline - Engineering discipline (e.g. BIM Coordination, Revit Automation)
 * @property {string} category - Project category
 * @property {string[]} tools - Verified engineering tools used
 * @property {string|null} image - Approved visual deliverable asset path
 * @property {"completed"} completionStatus - Delivery status
 * @property {boolean} isApprovedForPublication - Explicit owner authorization gate
 */

/**
 * Curated list of completed engineering projects.
 * Kept strictly empty until explicit owner release approval and case study materials are provided.
 * @type {CompletedProjectRecord[]}
 */
export const curatedCompletedProjects = [];

/**
 * AI & LLM Applied Research Workstreams.
 * Factual development prototypes with strict human-in-the-loop engineering validation.
 */
export const researchWorkstreams = [
  {
    id: "semantic-bim-querying",
    titleKey: "projects.dev.ws1_title",
    statusKey: "projects.dev.ws1_status",
    descKey: "projects.dev.ws1_desc",
    statusBadge: "RESEARCH",
    focus: "IFC & RVT Schema",
    techTags: ["Semantic Indexing", "OpenBIM / IFC", "Natural Language Parsing"],
  },
  {
    id: "revit-script-generation",
    titleKey: "projects.dev.ws2_title",
    statusKey: "projects.dev.ws2_status",
    descKey: "projects.dev.ws2_desc",
    statusBadge: "PROTOTYPE",
    focus: "Revit API & pyRevit",
    techTags: ["AST Validation", "Python Synthesis", "Syntax Guardrails"],
  },
  {
    id: "spec-compliance-verification",
    titleKey: "projects.dev.ws3_title",
    statusKey: "projects.dev.ws3_status",
    descKey: "projects.dev.ws3_desc",
    statusBadge: "IN DEVELOPMENT",
    focus: "Tender & Model Audit",
    techTags: ["Tender Spec Parsing", "Cross-Parameter Audit", "Verification Reports"],
  },
];

/**
 * The 5-stage Applied AI Engineering Pipeline schematic.
 */
export const aiPipelineSteps = [
  {
    step: 1,
    titleKey: "projects.dev.step1_title",
    descKey: "projects.dev.step1_desc",
    badge: "INPUT",
  },
  {
    step: 2,
    titleKey: "projects.dev.step2_title",
    descKey: "projects.dev.step2_desc",
    badge: "CONTEXT",
  },
  {
    step: 3,
    titleKey: "projects.dev.step3_title",
    descKey: "projects.dev.step3_desc",
    badge: "SYNTHESIS",
  },
  {
    step: 4,
    titleKey: "projects.dev.step4_title",
    descKey: "projects.dev.step4_desc",
    badge: "MANDATORY GATE",
    isGate: true,
  },
  {
    step: 5,
    titleKey: "projects.dev.step5_title",
    descKey: "projects.dev.step5_desc",
    badge: "OUTPUT",
  },
];
