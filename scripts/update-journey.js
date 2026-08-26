const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Delete old keys
delete data["about.journey.p1_desc"];
delete data["about.journey.p2_desc"];
delete data["about.journey.p3_desc"];

// New Journey Phase 1
data["about.journey.p1_title"] = "The Operational Bottleneck";
data["about.journey.p1_item1_title"] = "The Systemic Flaw";
data["about.journey.p1_item1_desc"] = "Managing complex European infrastructure projects exposed a critical industry failure. Highly skilled engineers waste up to <strong>40% of their billable hours</strong> on repetitive data entry, parameter mapping, and manual quality control.";
data["about.journey.p1_item2_title"] = "The Margin Drain";
data["about.journey.p1_item2_desc"] = "Relying on brute-force human labor for redundant tasks drains project budgets and mathematically guarantees data errors during high-stakes B2B tenders.";

// New Journey Phase 2
data["about.journey.p2_title"] = "The Algorithmic Shift";
data["about.journey.p2_item1_title"] = "The R&D Pivot";
data["about.journey.p2_item1_desc"] = "Rooted in the academic and technological hub of <strong>Padua, Italy</strong>, we refused to scale our operations through traditional headcount. We transitioned our entire methodology to code.";
data["about.journey.p2_item2_title"] = "Programmatic Execution";
data["about.journey.p2_item2_desc"] = "By integrating custom <strong>Python, C#, and Revit APIs</strong> directly into the core workflow, we replaced manual drafting with algorithmic automation—crushing processing times from <strong>days to seconds</strong>.";

// New Journey Phase 3
data["about.journey.p3_title"] = "The Hybrid B2B Tech Partner";
data["about.journey.p3_item1_title"] = "Zero-Error Deliverables";
data["about.journey.p3_item1_desc"] = "Today, pyBIM operates as the silent technical backbone for tier-one <strong>AEC firms</strong> across the DACH region and Italy.";
data["about.journey.p3_item2_title"] = "Infinite Scalability";
data["about.journey.p3_item2_desc"] = "We develop the custom software infrastructure required to multiply your project capacity without increasing overhead, guaranteeing absolute output compliance with <strong>ISO 19650</strong>, <strong>openBIM/IFC</strong>, and <strong>UNI 11337</strong>.";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated about-en.json for Journey section.");
