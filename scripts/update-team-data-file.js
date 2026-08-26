const fs = require('fs');
const jsonPath = 'c:/bim/lib/data/team-data.json';

const newTeamData = {
  teamMembers: [
    {
      id: "t1",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      en: { name: "John Smith", role: "BIM Automation Lead", bio: "Expert in BIM automation and ISO 19650 standards.", skills: [{name:"Revit API", value:95}] },
      it: { name: "John Smith", role: "BIM Automation Lead", bio: "Esperto in automazione BIM e standard ISO 19650.", skills: [{name:"Revit API", value:95}] },
      de: { name: "John Smith", role: "BIM Automation Lead", bio: "Experte für BIM-Automatisierung und ISO 19650-Standards.", skills: [{name:"Revit API", value:95}] }
    },
    {
      id: "t2",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      en: { name: "Michael Brown", role: "Computational MEP Engineer", bio: "Specialized in Python and C# integration for MEP systems.", skills: [{name:"Dynamo", value:90}] },
      it: { name: "Michael Brown", role: "Computational MEP Engineer", bio: "Specializzato in Python e C# per sistemi MEP.", skills: [{name:"Dynamo", value:90}] },
      de: { name: "Michael Brown", role: "Computational MEP Engineer", bio: "Spezialisiert auf Python und C# für MEP-Systeme.", skills: [{name:"Dynamo", value:90}] }
    },
    {
      id: "t3",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      en: { name: "Hamid Lotfalian", role: "Director of Marketing & Business Dev", bio: "Driving B2B growth and strategic partnerships across DACH and Italy.", skills: [{name:"Strategy", value:95}] },
      it: { name: "Hamid Lotfalian", role: "Director of Marketing & Business Dev", bio: "Crescita B2B e partnership strategiche.", skills: [{name:"Strategy", value:95}] },
      de: { name: "Hamid Lotfalian", role: "Director of Marketing & Business Dev", bio: "B2B-Wachstum und strategische Partnerschaften.", skills: [{name:"Strategy", value:95}] }
    },
    {
      id: "t4",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      en: { name: "James Miller", role: "Full-Stack Software Engineer", bio: "Developing cloud-based solutions and Revit add-ins.", skills: [{name:"C#", value:92}] },
      it: { name: "James Miller", role: "Full-Stack Software Engineer", bio: "Sviluppo di soluzioni cloud e add-in Revit.", skills: [{name:"C#", value:92}] },
      de: { name: "James Miller", role: "Full-Stack Software Engineer", bio: "Entwicklung von Cloud-Lösungen und Revit-Add-Ins.", skills: [{name:"C#", value:92}] }
    }
  ],
  individualPartners: [
    {
      id: "i1",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
      en: { name: "Emma Watson", role: "Computational Designer", bio: "Parametric modeling specialist.", skills: [{name:"Grasshopper", value:90}] },
      it: { name: "Emma Watson", role: "Computational Designer", bio: "Specialista in modellazione parametrica.", skills: [{name:"Grasshopper", value:90}] },
      de: { name: "Emma Watson", role: "Computational Designer", bio: "Spezialist für parametrische Modellierung.", skills: [{name:"Grasshopper", value:90}] }
    }
  ],
  corporatePartners: [
    {
      id: "c1",
      image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=600&auto=format&fit=crop",
      isCompany: true,
      en: { name: "University of Padua", role: "Academic R&D Partner", bio: "Bridging university-level algorithmic research with real-world AEC execution.", skills: [] },
      it: { name: "University of Padua", role: "Academic R&D Partner", bio: "Ricerca algoritmica applicata.", skills: [] },
      de: { name: "University of Padua", role: "Academic R&D Partner", bio: "Angewandte algorithmische Forschung.", skills: [] }
    },
    {
      id: "c2",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=600&auto=format&fit=crop",
      isCompany: true,
      en: { name: "Politecnico di Torino", role: "Academic R&D Partner", bio: "Engineering excellence and computational technology.", skills: [] },
      it: { name: "Politecnico di Torino", role: "Academic R&D Partner", bio: "Eccellenza ingegneristica.", skills: [] },
      de: { name: "Politecnico di Torino", role: "Academic R&D Partner", bio: "Technische Exzellenz.", skills: [] }
    },
    {
      id: "c3",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
      isCompany: true,
      en: { name: "Autodesk", role: "Enterprise Technology Partner", bio: "Native API integrations and software ecosystem.", skills: [] },
      it: { name: "Autodesk", role: "Enterprise Technology Partner", bio: "Ecosistema software.", skills: [] },
      de: { name: "Autodesk", role: "Enterprise Technology Partner", bio: "Software-Ökosystem.", skills: [] }
    }
  ]
};

fs.writeFileSync(jsonPath, JSON.stringify(newTeamData, null, 2), 'utf8');
console.log('Updated team-data.json with B2B roles and Partners');
