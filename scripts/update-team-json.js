const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Section 1: Core Architects
data["about.team.sec1.badge"] = "01. THE CORE ARCHITECTS";
data["about.team.sec1.title"] = "Engineering Algorithms, Not Just Models.";
data["about.team.sec1.desc"] = "Our core team operates from the R&D tech hub of <strong>Padua, Italy</strong>. We fuse Senior BIM Management with Full-Stack software engineering to build the code that automates your AEC workflows.";

// Section 2: Extended Lab
data["about.team.sec2.badge"] = "02. THE EXTENDED LAB";
data["about.team.sec2.title"] = "Infinite Scalability. Zero Overhead.";
data["about.team.sec2.b_title"] = "The Bottleneck";
data["about.team.sec2.b_desc"] = "Traditional AEC firms struggle to scale their workforce for massive infrastructure tenders without bloating their internal payroll and management overhead.";
data["about.team.sec2.a_title"] = "The Agitation";
data["about.team.sec2.a_desc"] = "Rushing to hire unvetted freelancers compromises your data security and introduces fatal geometric errors into the final IFC models.";
data["about.team.sec2.s_title"] = "The pyBIM Solution";
data["about.team.sec2.s_desc"] = "We maintain a highly vetted, private network of specialized computational designers and technical engineers across Europe. We scale our execution capacity instantly to meet your project demands, with all external work strictly audited by our internal Python QA/QC scripts.";

// Section 3: Strategic Ecosystem
data["about.team.sec3.badge"] = "03. STRATEGIC ECOSYSTEM";
data["about.team.sec3.title"] = "Backed by Academic Rigor and Enterprise Tech.";
data["about.team.sec3.desc"] = "We bridge the gap between high-level algorithmic research and industrial AEC execution. Our strategic ecosystem ensures your projects benefit from the absolute frontier of BIM technology.";
data["about.team.sec3.l1_title"] = "Academic R&D";
data["about.team.sec3.l1_desc"] = "Rooted in the engineering excellence of institutions like the <strong>University of Padua</strong> and <strong>Politecnico di Torino</strong>. We directly translate advanced university computational research into tangible, margin-saving workflows for your enterprise.";
data["about.team.sec3.l2_title"] = "Enterprise Integration";
data["about.team.sec3.l2_desc"] = "Partnered with leading AEC technology providers to guarantee seamless, native API integrations and absolute data security for your proprietary Revit and ACC environments.";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated about-en.json with Team section keys');
