export const servicesPageData = {
  en: {
    pageHeader: {
      title1: "Sovereign AI Infrastructure",
      title2: "for BIM Automation.",
      description: 'We deploy Local LLMs and Vector Databases (RAG) to translate your textual client requirements directly into executable Revit scripts. Operating from our R&D hub in <strong class="text-brand-textPrimary">Padua, Italy</strong>, we guarantee <strong class="text-brand-textPrimary">100% metadata compliance</strong> with <strong class="text-brand-textPrimary">ISO 19650</strong> and <strong class="text-brand-textPrimary">Decreto BIM</strong>, while ensuring your proprietary data never leaves your secure network.'
    },
    sovereignAi: {
      tag: ">_ SOVEREIGN AI DEPLOYMENT ARCHITECTURE",
      title: "Engineered R&D. Secured on Your Infrastructure.",
      subtitle: "We bypass public AI APIs. We deploy isolated LLM infrastructure directly into your existing network capacity, guaranteeing UNI 11337 and ISO 19650 compliance without metadata exposure.",
      
      
      
      cards: [
        {
          num: "01",
          title: "The Edge AI Appliance",
          subtitle: "Physical Hardware",
          deployment: 'A custom-configured, physical GPU server installed directly inside your office Local Area Network (LAN).',
          outcome: '<strong class="text-brand-primary font-bold">Absolute Data Sovereignty</strong>. Guarantees zero data leakage for classified government or healthcare infrastructure. Your metadata never touches an external network.',
          financial: '<strong class="text-brand-primary font-bold">Eliminates</strong> recurring cloud processing fees, converting software expenses into a secure CapEx investment.'
        },
        {
          num: "02",
          title: "Enterprise IT Integration",
          subtitle: "Existing Infrastructure",
          deployment: "Containerized AI pipelines (Docker Images) deployed directly onto your IT department's existing enterprise servers.",
          outcome: "Scalable algorithmic execution securely positioned behind your own corporate firewall, empowering hundreds of engineers simultaneously.",
          financial: '<strong class="text-brand-accent font-bold">Zero hardware CapEx</strong>. Maximizes the ROI of your existing data centers while eliminating external latency.'
        },
        {
          num: "03",
          title: "Dedicated GPU-VPS",
          subtitle: "Private Cloud Server",
          deployment: "An isolated, dedicated Virtual Private Server provisioned exclusively for your engineering firm on secure European servers.",
          outcome: "Rapid deployment of RAG and Local LLM capabilities without requiring physical office space, hardware procurement, or internal IT maintenance.",
          financial: 'Transitions AI integration into a predictable <strong class="text-sky-400 font-bold">OpEx</strong> model, slashing initial deployment costs by <strong class="text-sky-400 font-bold">up to 80%</strong> compared to hardware setups.'
        }
      ]
    },
    validationPhase: {
      tag: "// THE VALIDATION PHASE",
      title: "The pyBIM Proof of Concept (PoC) Simulation",
      desc1: "We do not expect infrastructure restructuring based on theory. We initiate a strict, 48-hour localized PoC protocol.",
      desc2: "We process a sample of your non-classified EIR documents through our RAG pipelines to prove algorithmic extraction and execution speed before full deployment.",
      cta: "REQUEST PoC AUDIT ->",
      microcopy: "(100% Free & Secure Data Handling. No credit card required.)"
    },
    coreAi: {
      tag: "// Core AI Capabilities",
      title: "Bridging Contractual Demands with Executable Code.",
      subtitle: "We eliminate the gap between reading heavy BIM Execution Plans and applying them in the software.",
      cards: [
        {
          title: "Automated Contract Analysis",
          desc: "Custom RAG pipelines instantly extract mandatory parameters and validation rules from complex EIR and BEP documents."
        },
        {
          title: "Live Data Engineering",
          desc: "The AI engine dynamically generates custom Python and C# scripts to map, standardise, and inject parameters directly into the Revit database."
        },
        {
          title: "Human-in-the-Loop Validation",
          desc: "All algorithmic decisions are queued in a custom pyRevit UI, allowing your Senior BIM Managers to validate and approve changes before final database commits."
        }
      ],
      cta: "Request a Live RAG Pipeline Demo",
      microcopy: "* No credit card required. We will process a sample EIR document live to prove instant algorithmic data extraction."
    },
    poweredBy: {
      tag: ">_ EXECUTION PIPELINE",
      title: "Transforming AI Directives into Hard Code.",
      subtitle: "Our infrastructure does not output advice. It outputs executable C# and Python logic directly into your BIM environment.",
      pipeline: [
        {
          title: "1. Data Ingestion (RAG)",
          desc: "Vector databases (ChromaDB) index your proprietary ISO mandates and BEP documents."
        },
        {
          title: "2. Logic Generation (Local LLM)",
          desc: "The isolated AI engine generates specific Python/C# execution scripts based on indexed rules."
        },
        {
          title: "3. API Execution",
          desc: "Custom scripts fuse directly with Revit and Navisworks APIs to automate parameter mapping and clash resolution."
        },
        {
          title: "4. Validation Commit",
          desc: "Changes are held in a secure pyRevit UI staging environment for final approval by your Senior BIM Managers."
        }
      ]
    },
    pillars: [
      {
        title: "Agentic BIM Coordination",
        desc: "Autonomous execution of coordination cycles. The AI engine parses Navisworks and Solibri databases, applies rule-based filters to eliminate false-positive clashes, and routes programmatic BCF reports directly to your local servers."
      },
      {
        title: "LLM-Driven API Execution",
        desc: "Elimination of manual software limitations. Local Large Language Models translate text-based EIR mandates into custom Python pipelines and C# Add-ins, executing parameter injection and geometric modifications instantly via the Revit API."
      },
      {
        title: "Sovereign Data Structuring",
        desc: "Secure extraction of lifecycle data. The infrastructure strictly structures geometric and metadata baselines for COBie deliverables and ISO 19650 compliance, ensuring all digital twin integration occurs completely offline and within your LAN."
      }
    ],
    automationWorkflow: {
      tag: ">_ SYSTEMATIC METHODOLOGY",
      title: "Autonomous Execution Architecture.",
      subtitle: "The Algorithmic Execution Pipeline",
      desc: "We replace manual data entry and human error with a strictly isolated, three-stage programmatic pipeline. All data processing is executed entirely behind your corporate firewall.",
      steps: [
        {
          num: "01",
          title: "RAG Indexing & Data Ingestion",
          desc: "Proprietary EIR/BEP protocols and ISO documentation are securely indexed into local Vector Databases (ChromaDB). Native Revit databases and spatial boundaries are programmatically validated against these indexed rules prior to execution."
        },
        {
          num: "02",
          title: "LLM Logic Generation & API Processing",
          desc: "The isolated AI engine interprets the indexed mandates and generates bespoke C# and Python logic. These scripts execute automated clash grouping, metadata injection, and dynamic QTO extraction directly through the software API without human intervention."
        },
        {
          num: "03",
          title: "Secure Database Commit & Handover",
          desc: "Extracted data and modified models are compiled into clash-free databases. The infrastructure synchronizes ISO 19650 and UNI 11337 compliant deliverables directly with your internal Common Data Environment (CDE), ensuring zero external data leakage."
        }
      ]
    },
    whoWeServe: {
      tag: ">_ SECTOR DEPLOYMENT VECTORS",
      title: "Enterprise Integration Topologies.",
      subtitle: "We do not offer generic SaaS interfaces. We deploy custom local LLM pipelines and API integrations tailored to the specific security and operational architecture of Tier-1 AEC sectors.",
      cards: [
        {
          title: "Tier-1 General Contractors",
          desc: "Deployment of Edge AI hardware directly to site networks or HQ LAN. Autonomous execution of Navisworks clash filtering, programmatic BCF routing, and ISO 19650 validation prior to supply chain handover. Guarantees zero data leakage for classified public infrastructure tenders.",
          tags: []
        },
        {
          title: "Architecture & Engineering (A&E)",
          desc: "Integration of local RAG pipelines to parse massive EIR and mandate documents. The LLM translates client rules into executable C# and Python Add-ins, automating parameter injection and batch documentation directly within your secured Revit environment.",
          tags: []
        },
        {
          title: "Infrastructure Asset Owners",
          desc: "Structuring of sovereign metadata baselines for post-construction operations. The AI infrastructure executes API-driven extraction of COBie deliverables and maintains strict ISO-compliant databases for secure, offline Digital Twin integration.",
          tags: []
        }
      ]
    },
    roiMetrics: {
      tag: ">_ SYSTEM BENCHMARKS (LOCAL AI VS. MANUAL EXECUTION)",
      title: "Algorithmic Processing Metrics.",
      subtitle: "Performance data based on local hardware execution via Revit/Navisworks native APIs.",
      metrics: [
        {
          header: "Massive Parameter Injection",
          target: "10,000+ Element Metadata Updates",
          execution: "< 5 Seconds",
          protocol: "Executed silently in the background via custom C# API calls, bypassing the Revit graphical interface entirely."
        },
        {
          header: "Mandate Parsing (RAG)",
          target: "500-Page ISO/EIR Documentation",
          execution: "Instant Semantic Retrieval",
          protocol: "Indexed locally via ChromaDB. The LLM instantly retrieves structural naming conventions and applies them to geometric parameters without human review."
        },
        {
          header: "Clash Matrix Filtering",
          target: "MEP vs. Structural False-Positives",
          execution: "Rule-Based Elimination",
          protocol: "Programmatic parsing of Solibri/Navisworks databases to automatically group, route, and eliminate non-critical geometric intersections prior to human auditing."
        }
      ]
    },
    caseStudies: {
      title: "Proven Execution",
      subtitle: "See how our automation tools are transforming real projects.",
      linkText: "Read Case Study",
      items: [
        { title: "How a Custom Python Script Saved Studio X 200 Hours in Sheet Creation.", image: "/Pictures/Uncategorized/uncategorized-005.jpg", link: "/projects" },
        { title: "Algorithmic 4D Scheduling for a 50,000 sqm Commercial Complex.", image: "/Pictures/BIM/bim-0078.jpg", link: "/projects" }
      ]
    },
    finalCta: {
      title: "Ready to automate your BIM workflows?",
      button: "Calculate Your ROI / Technical Audit"
    }
  }
};

servicesPageData.it = JSON.parse(JSON.stringify(servicesPageData.en));
servicesPageData.de = JSON.parse(JSON.stringify(servicesPageData.en));
