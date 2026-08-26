const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Impact section
data["about.impact.badge"] = "OUR IMPACT";
data["about.impact.title"] = "Measurable Efficiency & Zero-Error Results";

data["about.impact.stat1.val"] = "+10,000";
data["about.impact.stat1.desc"] = "Hours saved through custom automation";

data["about.impact.stat2.val"] = "100%";
data["about.impact.stat2.desc"] = "Algorithmic precision <br />(Zero human error)";

data["about.impact.stat3.val"] = "+50";
data["about.impact.stat3.desc"] = "Custom scripts and plugins deployed";

// CTA Section
data["about.cta.card1.title"] = "Are your company's BIM workflows slowing you down? Let's optimize them.";
data["about.cta.card1.btn"] = "Contact Us";

data["about.cta.card2.title"] = "Are you an engineer who fell in love with Python? You belong here.";
data["about.cta.card2.btn"] = "Work With Us";

// Tech stack box titles/desc are already updated in my previous script except they were wrong, let's fix them

data["about.tech.badge"] = "TECH STACK & STANDARDS";
data["about.tech.title"] = "The tools & standards we use to engineer the process.";
data["about.tech.desc"] = "Eliminating manual bottlenecks through programmatic execution, CDE hosting, and strict ISO compliance.";

data["about.tech.box1_top"] = "01. SOFTWARE & COORDINATION";
data["about.tech.box1_top_right"] = "13 Tools";
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
  { name: "Revizto", tag: "VR/Coord", desc: "2D/3D VR Model Coordination & Clash Tracking" }
];

data["about.tech.box2_top"] = "02. CODE & AUTOMATION";
data["about.tech.box2_top_right"] = "12 Techs";
data["about.tech.box2_title"] = "Development Stack";
data["about.tech.box2_sub"] = "Programmatic control over manual workflows.";
data["about.tech.dev"] = [
  { name: "Python", tag: "Automation", desc: "Automated Parameter Injection & Bulk Processing" },
  { name: "Dynamo & pyRevit", tag: "Scripting", desc: "Visual & Text Scripting for Modeling Automation" },
  { name: "C# & Revit API", tag: "Plugins", desc: "Native Add-ins & Deep Software Customization" },
  { name: "REST APIs", tag: "10D / IoT", desc: "Real-Time Sensor & Digital Twin Data Sync" },
  { name: "Autodesk APS (Forge)", tag: "Cloud API", desc: "Cloud App Development & Web BIM Processing" },
  { name: "Power BI", tag: "Analytics", desc: "Live Project Analytics & Model Dashboards" },
  { name: "Speckle", tag: "Open Data", desc: "Open-Source Real-Time Data Streaming" },
  { name: "FastAPI / Node.js", tag: "Backend", desc: "Custom Microservices for Network Automation" },
  { name: "React.js / Next.js", tag: "Web Portals", desc: "Client Web Dashboards for Real-Time Monitoring" },
  { name: "SQL / PostgreSQL", tag: "BIM DB", desc: "Relational DB for Thousands of BIM Parameters" },
  { name: "IFC.js", tag: "Browser 3D", desc: "In-Browser 3D BIM Rendering Without Desktop Software" },
  { name: "LangChain & ChromaDB", tag: "AI / RAG", desc: "RAG-Based Automated BEP/EIR Document Auditing" }
];

data["about.tech.box3_top"] = "03. MANDATES & OPENBIM";
data["about.tech.box3_top_right"] = "12 Standards";
data["about.tech.box3_title"] = "Standards & Protocols";
data["about.tech.box3_sub"] = "Strict compliance with EU & UK mandates.";
data["about.tech.stds"] = [
  { name: "ISO 19650", tag: "Global Framework", desc: "International Information Management Framework" },
  { name: "UNI 11337", tag: "Italian Standard", desc: "Italian National BIM Mandates & Project Validation" },
  { name: "COBie", tag: "FM Handover", desc: "Standardized Facility Management Data Handover" },
  { name: "EIR / BEP", tag: "8D / 9D Protocols", desc: "Employer Requirements, BEP & Safety/Lean Plans" },
  { name: "IFC (ISO 16739)", tag: "OpenBIM", desc: "Universal Open Format for Vendor-Neutral Data" },
  { name: "BCF", tag: "OpenBIM BCF", desc: "Standardized Issue Reporting & Clash Communication" },
  { name: "Decreto BIM (D.M. 560/312)", tag: "Italian Mandate", desc: "Italian Legal Mandates for Public Tenders" },
  { name: "LOD / LOIN (EN 17412)", tag: "Level of Need", desc: "Level of Development & Information Need Standards" },
  { name: "OmniClass / MasterFormat", tag: "Classification", desc: "International Classification & Element Coding" },
  { name: "MIDP / TIDP", tag: "ISO 19650 Delivery", desc: "Master & Task Information Delivery Plans" },
  { name: "bsDD (buildingSMART)", tag: "Data Dict", desc: "Global Dictionary for OpenBIM Semantic Interoperability" },
  { name: "IDM (ISO 29481)", tag: "Workflow Standard", desc: "Information Delivery Manual Workflow Standard" }
];

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated data in about-en.json.");
