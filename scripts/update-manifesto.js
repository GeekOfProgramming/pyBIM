const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Delete old 2-box keys just in case
delete data["about.manifesto.trad_title"];
delete data["about.manifesto.trad_desc"];
delete data["about.manifesto.approach_title"];
delete data["about.manifesto.approach_desc"];

// New 3-box keys
data["about.manifesto.box1_title"] = "The Traditional \"Modeling Farm\"";
data["about.manifesto.box1_subtitle"] = "The Problem";
data["about.manifesto.box1_desc1"] = "Relies heavily on brute-force human labor for data mapping, visual clash detection, and model updates.";
data["about.manifesto.box1_desc2_title"] = "The Margin Drain";
data["about.manifesto.box1_desc2"] = "This outdated approach wastes thousands of engineering hours, drains project budgets, and mathematically guarantees human error in complex deliverables.";

data["about.manifesto.box2_title"] = "The Generic Software Vendor";
data["about.manifesto.box2_subtitle"] = "The Problem";
data["about.manifesto.box2_desc1"] = "Purchasing expensive, out-of-the-box software licenses (Revit/ACC) without custom API integration.";
data["about.manifesto.box2_desc2_title"] = "The Limitation";
data["about.manifesto.box2_desc2"] = "Forces your engineers to adapt to rigid software limitations, rather than adapting the software to your specific project needs. You pay for tools, not solutions.";

data["about.manifesto.box3_title"] = "The pyBIM Automation Lab";
data["about.manifesto.box3_subtitle"] = "Algorithmic Execution";
data["about.manifesto.box3_desc1"] = "We believe if a task is executed twice in Revit, it belongs to an automated Python or C# script.";
data["about.manifesto.box3_desc2_title"] = "Instant ROI";
data["about.manifesto.box3_desc2"] = "We replace human error with code—reducing model auditing times from days to seconds while guaranteeing flawless output compliance for ISO 19650 and UNI 11337.";

// Update CTA
data["about.manifesto.cta"] = "Claim Your Free BIM Data Audit";
data["about.manifesto.cta_sub"] = "(100% Free & Secure Data Handling. Send us a sample model, and we will run it through our automation scripts to prove instant ROI. No credit card required.)";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated about-en.json for 3-box manifesto.");
