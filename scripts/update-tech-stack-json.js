const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Delete old tech keys
delete data["about.tech.tools"];
delete data["about.tech.code"];
delete data["about.tech.standards"];

// New Title & PAS
data["about.tech.badge"] = "THE PYBIM TECH STACK";
data["about.tech.title"] = "Engineered for Output, Not Effort.";
data["about.tech.p1_title"] = "The Limitation";
data["about.tech.p1_desc"] = "Off-the-shelf AEC software forces your engineers into rigid workflows, creating data silos and requiring thousands of manual clicks.";
data["about.tech.p2_title"] = "The Agitation";
data["about.tech.p2_desc"] = "This operational bottleneck drains your project margins, delays delivery, and introduces fatal human errors during critical public tenders.";
data["about.tech.p3_title"] = "The pyBIM Solution";
data["about.tech.p3_desc"] = "We bypass default software limitations. Operating as your external R&D lab, we fuse enterprise-grade software with custom automation algorithms to guarantee <strong>100% compliant delivery</strong> at unprecedented speeds.";

// Box 1
data["about.tech.box1_title"] = "01. SOFTWARE & COORDINATION";
data["about.tech.box1_sub"] = "Enterprise-grade authoring, configured to eliminate geometric and data conflicts before they reach the construction site.";
data["about.tech.box1_items"] = [
  { "name": "Autodesk Revit & ACC", "desc": "Cloud-hosted, multidisciplinary 6D environments ensuring zero data loss during facility management handover." },
  { "name": "Navisworks & Solibri", "desc": "Rule-based automated model checking and clash detection to instantly clear visual bottlenecks." },
  { "name": "PriMus-IFC & CostX", "desc": "AI-driven, dynamic 5D quantity surveying to lock in financial accuracy." },
  { "name": "Speckle & BIMcollab", "desc": "Cloud-based BCF tracking and real-time open-source data streaming across fragmented teams." }
];
data["about.tech.box1_footer"] = "(Includes: Synchro PRO, dRofus, Tekla, Civil 3D, Revizto, ReCap Pro)";

// Box 2
data["about.tech.box2_title"] = "02. CODE & AUTOMATION";
data["about.tech.box2_sub"] = "Algorithmic control over manual workflows. We replace redundant human effort with scalable code infrastructure.";
data["about.tech.box2_items"] = [
  { "name": "Python, C# & Revit API", "desc": "Deep software customization that automates parameter injection, cutting <strong>100+ hours</strong> of manual data entry per project." },
  { "name": "Dynamo & pyRevit", "desc": "Visual and text scripting to force modeling automation and standardize output across your entire workforce." },
  { "name": "Speckle, FastAPI & React.js", "desc": "Custom microservices and client web portals for real-time, C-level project monitoring." },
  { "name": "LangChain & ChromaDB", "desc": "RAG-based AI pipelines for automated, instantaneous BEP/EIR document auditing." }
];
data["about.tech.box2_footer"] = "(Includes: REST APIs, Autodesk APS, Power BI, SQL/PostgreSQL, IFC.js)";

// Box 3
data["about.tech.box3_title"] = "03. MANDATES & OPENBIM";
data["about.tech.box3_sub"] = "Zero-risk data delivery. Absolute compliance with European and Italian legal mandates to secure your public tenders.";
data["about.tech.box3_items"] = [
  { "name": "ISO 19650 (DACH & Global)", "desc": "Strict adherence to the international Information Management framework." },
  { "name": "UNI 11337 & Decreto BIM (Italy)", "desc": "Flawless compliance with Italian National BIM mandates and public tender legalities." },
  { "name": "IFC (ISO 16739) & bSDD", "desc": "Universal vendor-neutral data formatting and semantic interoperability to prevent software lock-in." },
  { "name": "COBie & EIR/BEP", "desc": "Standardized Facility Management handover and strict 8D/9D protocol execution." }
];
data["about.tech.box3_footer"] = "(Includes: BCF, LOD/LOIN EN 17412, OmniClass, MIDP/TIDP, IDM ISO 29481)";

// CTA
data["about.tech.cta"] = "Claim Your Free Tech Stack Audit";
data["about.tech.cta_sub"] = "(100% Free & Secure. Let us review your current software pipeline and show you exactly where a custom Python script can save you €10,000+ per project. No credit card required.)";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated about-en.json for Tech Stack section.");
