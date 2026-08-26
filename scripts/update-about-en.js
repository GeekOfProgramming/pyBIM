const fs = require('fs');
const path = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

data["about.manifesto.title"] = "We engineer algorithms to protect your project margins.";
data["about.manifesto.subtitle"] = "Operating from the R&D tech hub of <strong>Padua, Italy</strong>, pyBIM is not a traditional manual modeling farm. We are a specialized software development lab bridging university-level algorithmic research with real-world <strong>AEC</strong> execution.";
data["about.manifesto.cta"] = "Claim Your Free BIM Data Audit";
data["about.manifesto.cta_sub"] = "(100% Free & Secure Data Handling. Send us a sample model, and we will run it through our automation scripts to prove instant ROI. No credit card required.)";
data["about.manifesto.trad_title"] = "The Traditional Bottleneck";
data["about.manifesto.trad_desc"] = "<strong>Manual Inefficiency:</strong> Traditional studios rely on manual clicks, visual clash detection, and redundant data mapping across Revit and ACC environments.<br/><br/><strong>The Margin Drain:</strong> This outdated approach wastes <strong>thousands of engineering hours</strong>, drains project budgets, and introduces severe data risks during large-scale infrastructure tenders.";
data["about.manifesto.approach_title"] = "The pyBIM Approach";
data["about.manifesto.approach_desc"] = "<strong>Algorithmic Execution:</strong> We believe that if a task is executed twice in Revit, it belongs to an automated <strong>Python or C# script</strong>.<br/><br/><strong>Instant ROI:</strong> We replace human error with code—reducing model auditing times from <strong>days to seconds</strong> while guaranteeing flawless output compliance for <strong>ISO 19650</strong> and <strong>UNI 11337</strong>.";

// Delete impact keys since they are removed
delete data["about.manifesto.impact_title"];
delete data["about.manifesto.impact_desc"];

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated about-en.json");
