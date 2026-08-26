const fs = require('fs');

// 1. Update about-en.json
const enJsonPath = 'c:/bim/lib/translations/en/about-en.json';
let enData = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

enData["about.team.sec1.title"] = "Engineering Algorithms, Not Just Models.";
enData["about.team.sec1.desc"] = "Our core technical unit operates from the R&D tech hub of <strong>Padua, Italy</strong>. We fuse <strong>Senior BIM Management</strong> with <strong>Full-Stack Software Engineering</strong> to build the custom code that automates your AEC workflows.";

enData["about.team.sec2.title"] = "Infinite Scalability. Zero Overhead.";
enData["about.team.sec2.b_desc"] = "Traditional AEC firms struggle to scale their workforce for massive infrastructure tenders without bloating internal payroll and management overhead.";
enData["about.team.sec2.a_desc"] = "Rushing to hire unvetted freelancers compromises your proprietary data security and introduces <strong>fatal geometric errors</strong> into the final <strong>IFC models</strong>, risking public tender disqualification.";
enData["about.team.sec2.s_desc"] = "We maintain a highly vetted, private network of specialized computational designers across Europe. We scale execution capacity instantly to meet project demands, with all external work strictly audited by our <strong>internal Python QA/QC scripts</strong> to guarantee <strong>100% compliance</strong> with <strong>UNI 11337</strong> and <strong>ISO 19650</strong>.";
enData["about.team.sec2.network"] = "<strong>The Extended Network:</strong> On-Demand <strong>BIM Coordinators</strong> & <strong>Parametric Modelers</strong> deployed exclusively through our automated validation pipelines.";

enData["about.team.sec3.title"] = "Backed by Academic Rigor and Enterprise Tech.";
enData["about.team.sec3.desc"] = "We bridge the gap between high-level algorithmic research and industrial AEC execution. Our strategic ecosystem ensures your projects benefit from the absolute frontier of <strong>BIM technology</strong>.";
enData["about.team.sec3.l1_desc"] = "Rooted in the engineering excellence of the <strong>University of Padua</strong> and <strong>Politecnico di Torino</strong>. We directly translate advanced university computational research into tangible, <strong>margin-saving workflows</strong> for your enterprise.";
enData["about.team.sec3.l2_desc"] = "Partnered with leading AEC technology providers like <strong>Autodesk</strong> to guarantee seamless, native API integrations and absolute data security for your proprietary <strong>Revit</strong> and <strong>ACC</strong> environments.";
enData["about.team.sec3.cta_btn"] = "Claim Your Free BIM Data Audit";
enData["about.team.sec3.cta_sub"] = "(100% Free & Secure Data Handling. Bypass the sales team and speak directly with our core engineers to audit your current software workflow. No credit card required.)";

fs.writeFileSync(enJsonPath, JSON.stringify(enData, null, 2), 'utf8');

// 2. Update team-data.json
const teamJsonPath = 'c:/bim/lib/data/team-data.json';
const newTeamData = {
  teamMembers: [
    {
      id: "t1",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      en: { name: "Marcus Weber", role: "Co-Founder & Chief Technology Officer", bio: "Focus: C# Revit API, Python Pipelines, Cloud Automation", skills: [{name:"C#", value:95}] },
      it: { name: "Marcus Weber", role: "Co-Founder & Chief Technology Officer", bio: "Focus: C# Revit API, Python Pipelines, Cloud Automation", skills: [{name:"C#", value:95}] },
      de: { name: "Marcus Weber", role: "Co-Founder & Chief Technology Officer", bio: "Focus: C# Revit API, Python Pipelines, Cloud Automation", skills: [{name:"C#", value:95}] }
    },
    {
      id: "t2",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      en: { name: "David Chen", role: "Co-Founder & Head of Algorithmic Engineering", bio: "Focus: BIM Coordination, Parametric Modeling, ISO 19650 Compliance", skills: [{name:"BIM", value:90}] },
      it: { name: "David Chen", role: "Co-Founder & Head of Algorithmic Engineering", bio: "Focus: BIM Coordination, Parametric Modeling, ISO 19650 Compliance", skills: [{name:"BIM", value:90}] },
      de: { name: "David Chen", role: "Co-Founder & Head of Algorithmic Engineering", bio: "Focus: BIM Coordination, Parametric Modeling, ISO 19650 Compliance", skills: [{name:"BIM", value:90}] }
    },
    {
      id: "t3",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      en: { name: "Sarah Jenkins", role: "Director of Commercial Growth", bio: "Focus: Enterprise Acquisition, Strategic AEC Partnerships", skills: [{name:"Strategy", value:95}] },
      it: { name: "Sarah Jenkins", role: "Director of Commercial Growth", bio: "Focus: Enterprise Acquisition, Strategic AEC Partnerships", skills: [{name:"Strategy", value:95}] },
      de: { name: "Sarah Jenkins", role: "Director of Commercial Growth", bio: "Focus: Enterprise Acquisition, Strategic AEC Partnerships", skills: [{name:"Strategy", value:95}] }
    },
    {
      id: "t4",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      en: { name: "Alex Rivera", role: "Full-Stack Software Engineer", bio: "Focus: ACC Web Integrations, Custom UI/WPF Development", skills: [{name:"ACC API", value:92}] },
      it: { name: "Alex Rivera", role: "Full-Stack Software Engineer", bio: "Focus: ACC Web Integrations, Custom UI/WPF Development", skills: [{name:"ACC API", value:92}] },
      de: { name: "Alex Rivera", role: "Full-Stack Software Engineer", bio: "Focus: ACC Web Integrations, Custom UI/WPF Development", skills: [{name:"ACC API", value:92}] }
    }
  ],
  individualPartners: [],
  corporatePartners: []
};

for (let i = 1; i <= 10; i++) {
  newTeamData.individualPartners.push({
    id: "i" + i,
    image: "https://images.unsplash.com/photo-" + (1500000000000 + i * 1000) + "?q=80&w=600&auto=format&fit=crop",
    en: { name: "Collaborator " + i, role: "Computational Designer", bio: "Parametric modeling specialist in the extended network.", skills: [] },
    it: { name: "Collaborator " + i, role: "Computational Designer", bio: "Specialista in modellazione parametrica.", skills: [] },
    de: { name: "Collaborator " + i, role: "Computational Designer", bio: "Spezialist für parametrische Modellierung.", skills: [] }
  });
  
  newTeamData.corporatePartners.push({
    id: "c" + i,
    image: "https://images.unsplash.com/photo-" + (1600000000000 + i * 1000) + "?q=80&w=600&auto=format&fit=crop",
    isCompany: true,
    en: { name: "Partner Firm " + i, role: "Enterprise Partner", bio: "Technology and R&D collaboration.", skills: [] },
    it: { name: "Partner Firm " + i, role: "Enterprise Partner", bio: "Collaborazione R&D.", skills: [] },
    de: { name: "Partner Firm " + i, role: "Enterprise Partner", bio: "F&E-Kooperation.", skills: [] }
  });
}

fs.writeFileSync(teamJsonPath, JSON.stringify(newTeamData, null, 2), 'utf8');
console.log('Updated team content successfully');
