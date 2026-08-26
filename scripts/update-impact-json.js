const fs = require('fs');
const jsonPath = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// OUR IMPACT
data["about.impact.badge"] = "OUR IMPACT";
data["about.impact.title"] = "Measurable Efficiency. Zero-Error Execution.";
data["about.impact.stat1.val"] = "+10,000";
data["about.impact.stat1.title"] = "Engineering Hours Reclaimed";
data["about.impact.stat1.desc"] = "Redirected from manual data entry and visual clash detection to high-margin, billable project execution.";
data["about.impact.stat2.val"] = "100%";
data["about.impact.stat2.title"] = "Algorithmic Precision";
data["about.impact.stat2.desc"] = "Absolute elimination of human error in model auditing, ensuring flawless compliance for high-stakes European tenders.";
data["about.impact.stat3.val"] = "+50";
data["about.impact.stat3.title"] = "Custom Automation Pipelines Deployed";
data["about.impact.stat3.desc"] = "Scalable Python and C# infrastructure actively protecting project margins across the DACH region and Italy.";

// CTA SECTION
// Card 1
data["about.cta.c1_title"] = "SCALE THROUGH CODE, NOT HEADCOUNT.";
data["about.cta.c1_b_title"] = "The Bottleneck";
data["about.cta.c1_b_desc"] = "Relying on manual engineering hours to clear software limitations drains project budgets and delays delivery.";
data["about.cta.c1_p_title"] = "The Automation Pivot";
data["about.cta.c1_p_desc"] = "Our R&D lab in Padua engineers custom algorithms that reduce clash resolution and data mapping from days to seconds.";
data["about.cta.c1_btn"] = "Claim Your Free BIM Data Audit";
data["about.cta.c1_sub"] = "(100% Secure Data Handling. We process your heaviest Revit model through our Python pipelines to prove instant ROI. No credit card required.)";

// Card 2
data["about.cta.c2_title"] = "JOIN THE R&D LAB";
data["about.cta.c2_desc1"] = "Architects and engineers who write code replace manual labor.";
data["about.cta.c2_desc2"] = "If you have transitioned from traditional BIM management to programmatic execution using Python, C#, or the Revit API, your technical ceiling is here.";
data["about.cta.c2_btn"] = "Submit Your Code";
data["about.cta.c2_sub"] = "(No traditional modeling portfolios. Send us your GitHub repository, custom Revit add-in, or Dynamo scripts.)";

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated about-en.json for Impact and CTA sections.");
