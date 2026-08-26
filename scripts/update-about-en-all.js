const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Journey section
data["about.journey.badge"] = "Phase 1";
data["about.journey.p1_title"] = "The Operational Bottleneck";
data["about.journey.p1_desc"] = "Managing complex BIM projects exposed a systemic industry flaw: highly skilled engineers waste up to 40% of their billable hours on repetitive data entry, parameter mapping, and manual quality control.";

data["about.journey.p2_badge"] = "Phase 2";
data["about.journey.p2_title"] = "The Algorithmic Shift";
data["about.journey.p2_desc"] = "Instead of scaling through headcount, we transitioned to code. By integrating Python, C#, and Revit APIs into our core workflow, we replaced manual drafting with programmatic execution, reducing processing time from days to seconds.";

data["about.journey.p3_badge"] = "Phase 3";
data["about.journey.p3_title"] = "The Hybrid B2B Agency";
data["about.journey.p3_desc"] = "Today, pyBIM operates as a silent technical partner for AEC firms. We deliver zero-error BIM coordination and develop the custom software infrastructure required to scale your project capacity without increasing overhead.";

// Tech Stack section
data["about.tech.badge"] = "TECH STACK & STANDARDS";
data["about.tech.title"] = "The tools & standards we use to engineer the process.";
data["about.tech.desc"] = "Eliminating manual bottlenecks through programmatic execution, CDE hosting, and strict ISO compliance.";

data["about.tech.box1_top"] = "01. SOFTWARE & COORDINATION";
data["about.tech.box1_title"] = "Engineering Tools";
data["about.tech.box1_sub"] = "ISO-compliant authoring and clash resolution.";
data["about.tech.tools"] = [
  { name: "Autodesk Revit", tag: "3D/7D", desc: "Multidisciplinary 3D Modeling & Energy Analysis" },
  { name: "Navisworks Manage", tag: "Clash/4D", desc: "Clash Detection & 4D Time/Gantt Chart Integration" },
  { name: "ACC (Autodesk Cloud)", tag: "6D CDE", desc: "Common Data Environment & As-Built FM Hosting" },
  { name: "PriMus-IFC", tag: "5D AI", desc: "AI-Driven Quantity Surveying & Dynamic Cost Estimating" },
  { name: "ReCap Pro", tag: "Scan-to-BIM", desc: "Laser Scan & Drone Point Cloud Processing" },
  { name: "Solibri Office", tag: "QA/QC", desc: "Rule-Based Automated Model Checking & QA Audit" },
  { name: "BIMcollab / Dalux", tag: "Issue Mgmt", desc: "Cloud-Based BCF Issue Tracking & Coordination" },
  { name: "Synchro PRO", tag: "4D Sim", desc: "4D Construction Process Sequencing & Scheduling" },
  { name: "dRofus", tag: "Data Mgmt", desc: "Centralized Spatial Data & Room Requirements" },
  { name: "Tekla Structures", tag: "LOD 400", desc: "High-Detail Steel & Concrete Structural Modeling" },
  { name: "Civil 3D / InfraWorks", tag: "GIS/Infra", desc: "Infrastructure Modeling & GIS Data Exchange" },
  { name: "CostX", tag: "5D Cost", desc: "Dynamic 2D/3D Quantity Take-off Engine" },
  { name: "Revizto", tag: "VR/Coord", desc: "2D/3D VR Model Coordination & Clash Tracking" },
];

data["about.tech.box2_top"] = "02. ALGORITHMIC AUTOMATION";
data["about.tech.box2_title"] = "Software Development";
data["about.tech.box2_sub"] = "Bridging the gap between BIM and Code.";
data["about.tech.dev"] = [
  { name: "Python / pyRevit", tag: "Core", desc: "Custom Revit add-ins for zero-touch parameter mapping" },
  { name: "C# / .NET", tag: "API", desc: "Enterprise-grade Revit API & Forge/APS integrations" },
  { name: "Dynamo", tag: "VPL", desc: "Visual Programming for rapid algorithmic modeling" },
  { name: "JavaScript / TypeScript", tag: "Web", desc: "Full-Stack dashboards for BIM data visualization" },
  { name: "React / Next.js", tag: "UI/UX", desc: "High-performance frontend client interfaces" },
  { name: "Node.js", tag: "Backend", desc: "Server-side data processing and API bridging" },
  { name: "Tailwind CSS", tag: "Styling", desc: "Modern, responsive design systems" },
  { name: "PostgreSQL / Prisma", tag: "DB", desc: "Relational database architecture and ORM" },
  { name: "Speckle", tag: "Data", desc: "Open source data platform for 3D/BIM interoperability" },
];

data["about.tech.box3_top"] = "03. REGULATORY COMPLIANCE";
data["about.tech.box3_title"] = "Standards & Protocols";
data["about.tech.box3_sub"] = "Ensuring legal and technical compliance.";
data["about.tech.stds"] = [
  { name: "ISO 19650", tag: "Global", desc: "International standard for managing information over the whole life cycle of a built asset" },
  { name: "UNI 11337", tag: "Italy", desc: "Italian regulatory framework for digital management of informative processes" },
  { name: "IFC (Industry Foundation Classes)", tag: "OpenBIM", desc: "Platform-neutral open file format for BIM" },
  { name: "BCF (BIM Collaboration Format)", tag: "OpenBIM", desc: "Open standard for workflow communication" },
  { name: "COBie", tag: "FM Data", desc: "Construction Operations Building Information Exchange" },
  { name: "LOD / LOIN", tag: "Detail", desc: "Level of Development / Level of Information Need specification" },
];

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Written missing translation keys.");
