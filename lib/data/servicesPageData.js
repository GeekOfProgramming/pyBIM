import { executionArchitecture } from "./services/executionArchitecture";
import { integrationPathways } from "./services/integrationPathways";
import { systemBenchmarks } from "./services/systemBenchmarks";

export { executionArchitecture, integrationPathways, systemBenchmarks };
export const servicesPageData = {
  en: {
    hero: {
      eyebrow: "BIM ENGINEERING · TECHNICAL SERVICES",
      headline1: "Specialist BIM services.",
      headline2: "Coordinated engineering delivery.",
      subheadline: "Architectural, structural and MEP BIM modeling, discipline and overall BIM coordination, model quality assurance, Scan-to-BIM and structured digital deliverables. Our engineering specialists use computational design and custom Revit automation to support your project requirements.",
      primaryCta: "Discuss Your Project",
      secondaryCta: "Services & Roadmap",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "ISO 19650",
        "openBIM · IFC / BCF",
        "Revit API · Model QA/QC"
      ],
      pipeline: {
        badge: "ILLUSTRATIVE WORKFLOW",
        monitorLabel: "BIM DELIVERY // 4 STAGES",
        windowTitle: "pyBIM // ENGINEERING WORKFLOW",
        labels: {
          framework: "TOOLS // openBIM & API",
          tablistAria: "BIM engineering workflow stages",
          inspectAria: "Inspect stage",
          specOverview: "STAGE SPECIFICATION",
          pipelineMode: "PROCESS: BIM DELIVERY",
          activePhase: "ACTIVE STAGE",
          schematic: "WORKFLOW SCHEMATIC",
          stepLabel: "STEP"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "BIM Modeling & Development",
            sub: "Architecture · Structure · MEP",
            badge: "MODELING",
            meta: "RVT · IFC · Project Requirements",
            railLabel: "MODEL",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "Multidisciplinary BIM Coordination",
            sub: "Federated Models & Clash Detection",
            badge: "COORDINATION",
            meta: "CDE · IFC · BCF",
            railLabel: "COORD.",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Model Quality & Automation",
            sub: "Geometry · Parameters · Information",
            badge: "QA/QC",
            meta: "EIR / BEP · Revit API",
            railLabel: "QA/QC",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Documentation & Digital Handover",
            sub: "Reviewed Models & Technical Documents",
            badge: "DELIVERY",
            meta: "RVT · IFC · Drawings · Reports",
            railLabel: "DELIVERY",
            icon: "database"
          }
        ],
        logs: [
          "[STAGE 01] Develop architectural, structural and MEP BIM models according to project documentation and agreed information requirements.",
          "[STAGE 02] Coordinate discipline models, identify clashes and review technical interfaces within the agreed project CDE.",
          "[STAGE 03] Check geometry, parameters and model information against applicable EIR and BEP requirements. Use Revit API, Python and C# automation where appropriate.",
          "[STAGE 04] Prepare reviewed BIM models, technical drawings, information exports and coordination reports according to agreed delivery requirements."
        ]
      }
    },
    roadmap: {
      tag: "SERVICES & TECHNOLOGY ROADMAP",
      headline: "BIM services today. Technology for tomorrow.",
      subtitle: "Professional BIM engineering services are our core offering. Alongside current project delivery, we are developing proprietary software and researching future AI infrastructure.",
      labels: {
        outcome: "Deliverables & objectives",
        execution: "Execution & development",
        impact: "Benefits & potential",
        featuredOffering: "CORE SERVICES",
        currentOffering: "CURRENT SERVICES",
        softwareRoadmap: "SOFTWARE DEVELOPMENT",
        enterpriseRoadmap: "RESEARCH & DEVELOPMENT",
        timelineAriaLabel: "pyBIM services and technology roadmap",
        progressHeading: "Development progress",
        progressNote: "Progress reflects shared Phase II foundations. Dedicated development begins after Phase II completion and final validation.",
        availabilityHeading: "Commercial availability",
        availabilityValue: "Available now",
        sharedProgressHeading: "Shared foundations",
        targetReleaseLabel: "Target release",
        targetReleaseValue: "Q4 2027",
        targetReleaseNote: "Subject to final integration, reliability and security validation.",
        noReleaseLabel: "Release date",
        noReleaseValue: "Not announced"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE I",
          isPrimary: true,
          statusTag: "AVAILABLE NOW",
          progressPercent: 100,
          title: "BIM Engineering Services",
          description: "Specialist architectural, structural and MEP modeling, discipline and overall BIM coordination, model QA/QC, Scan-to-BIM, CAD-to-BIM and custom engineering automation.",
          outcome: "Coordinated BIM models, technical documentation, information exports and model quality review reports.",
          execution: "BIM specialists work according to agreed project requirements within the client's CDE, supported by Revit API, Python and C# tools where appropriate.",
          impact: "Clear technical responsibilities, coordinated workflows and traceable quality reviews throughout the agreed project scope.",
          ctaText: "Discuss Your Project",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "PHASE II",
          isPrimary: false,
          statusTag: "IN DEVELOPMENT",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "A proprietary platform in development for Revit automation and cloud-based management of BIM workflows.",
          outcome: "Planned access to reusable Revit automation tools and team-based workflow management.",
          execution: "Internal development and private evaluation. Final integration, reliability and security validation remain necessary.",
          impact: "Intended to support more consistent automation workflows across project teams. Not yet generally available.",
          ctaText: "Request Private Access",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "PHASE III",
          isPrimary: false,
          statusTag: "FUTURE R&D",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "Research into private, on-premises AI infrastructure for engineering workflows.",
          outcome: "Exploration of locally operated AI tools within client-controlled environments.",
          execution: "Dedicated development follows Phase II completion and final validation.",
          impact: "Research into future options for local AI inference and data control. No commercial availability.",
          ctaText: "Discuss Future Requirements",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "FUTURE R&D · POST-PHASE II HORIZON",
      headline: "Private AI Research Built for Future BIM Environments.",
      description: "Dedicated Phase III Edge AI development begins after Phase II (targeted Q4 2027) is completed and validated. Not currently commercially available and no release date has been announced; teams can share long-term requirements via the early-access queue.",
      subtitle: "Dedicated Phase III Edge AI development begins after Phase II (targeted Q4 2027) is completed and validated. Not currently commercially available and no release date has been announced.",
      buttonText: "Join the Enterprise Priority Queue",
      buttonHref: "/contact#priority-queue",
      microcopy: "R&D expression of interest only — not a current commercial product or release-date commitment.",
      diagram: {
        conceptualArchitecture: "CONCEPTUAL ARCHITECTURE",
        engineeringData: "ENGINEERING DATA",
        engineeringDataSub: "Revit · IFC · Model Data",
        privateAiCore: "PRIVATE AI CORE",
        privateAiCoreSub: "Controlled Local Inference",
        bimWorkflows: "BIM WORKFLOWS",
        bimWorkflowsSub: "Assisted Automation",
        plannedInfrastructure: "PLANNED INFRASTRUCTURE",
        coreBadge: "LOCAL CONTROL · CONCEPT",
        inBadge: "INPUT // 01",
        outBadge: "OUTPUT // 02"
      }
    },
    coreCapabilities: {
      tag: "ENGINEERING CAPABILITIES",
      headline: "Turn BIM Requirements Into Repeatable Engineering Workflows.",
      subtitle: "From model information checks to Revit automation and structured handovers, pyBIM combines engineering expertise with practical software tools to make complex project delivery more manageable.",
      schematicNotice: "Illustrative engineering schema",
      exchangeStandard: "OpenBIM Exchange Workflow",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Model Information Validation",
          desc: "Review model parameters, naming conventions, classifications, and project information requirements through structured checks and clear reporting.",
          topics: [
            "Model QA/QC",
            "EIR / BEP Requirements",
            "Information Consistency"
          ],
          diagram: {
            title: "VALIDATION_SCHEMA",
            badge: "RULE SET",
            statusLabel: "SCHEMA CHECK",
            outputSummary: "STRUCTURED AUDIT DOSSIER",
            srDescription: "Structured information verification schema illustrating naming conventions, ISO 19650 property sets, and classification taxonomy checks.",
            items: [
              { label: "EIR.Naming_Convention", tag: "SYNTAX RULE", type: "FORMAT" },
              { label: "ISO_19650.PropertySets", tag: "SCHEMA REF", type: "STRUCTURE" },
              { label: "OmniClass.Classification", tag: "TABLE CODE", type: "TAXONOMY" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Revit Automation & Parameter Engineering",
          desc: "Develop tailored Python and C# tools for repetitive Revit operations, parameter management, model data updates, and project-specific engineering workflows.",
          topics: [
            "Revit API",
            "Python / C#",
            "Parameter Workflows"
          ],
          diagram: {
            title: "AUTOMATION_PIPELINE",
            badge: "API CORE",
            runtimeBadge: "EXECUTION CORE",
            modelLabel: ".RVT Model Host",
            modelSub: "Elements & Instances",
            codeLabel: "Python & C# Engine",
            codeSub: "Revit API Routines",
            outputLabel: "Parameter Injection",
            outputSub: "Controlled Metadata",
            caption: "Deterministic parameter updates & scripted routines",
            srDescription: "Connected Revit automation pipeline illustrating model host ingestion, Python and C# execution routines, and controlled parameter output."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Coordinated BIM Data Workflows",
          desc: "Support multidisciplinary coordination, structured information exchange, and controlled BIM deliverables across project teams and software environments.",
          topics: [
            "Multidisciplinary Coordination",
            "OpenBIM / IFC",
            "Data Management"
          ],
          diagram: {
            title: "MULTIDISCIPLINARY_FLOW",
            badge: "OpenBIM",
            coordinationZone: "COORDINATION EXCHANGE LAYER",
            srDescription: "Multidisciplinary BIM information flow connecting Architectural, Structural, and Building Services models through an OpenBIM coordination layer.",
            disciplines: [
              { code: "ARC", name: "Arch", role: "Design Model" },
              { code: "STR", name: "Struct", role: "Analytical Model" },
              { code: "MEP", name: "Services", role: "Systems Model" }
            ],
            output: "IFC4 / BCF COORDINATED DELIVERABLE"
          }
        }
      ],
      buttonText: "Discuss an Engineering Challenge",
      buttonHref: "/contact",
      microcopy: "Share your project requirements or a repetitive workflow you'd like to improve. We'll explore a practical starting point."
    },
    executionPipeline: {
      tag: "ENGINEERING DELIVERY PROCESS",
      headline: "From Project Requirements to Reviewed BIM Deliverables.",
      subtitle: "A structured delivery approach connects project information requirements, practical automation, controlled implementation, and engineering review. Each workflow is adapted to the needs of the project.",
      labels: {
        outputLabel: "TYPICAL OUTPUT",
        illustrativeLabel: "ILLUSTRATIVE PROCESS",
        mapTitle: "DELIVERY TIMELINE"
      },
      steps: [
        {
          num: "01",
          mapLabel: "REQUIREMENTS",
          title: "Understand the Requirements",
          desc: "Review client information needs, EIR/BEP documents, model conventions, and the existing BIM environment to define scope, priorities, and acceptance criteria.",
          output: "Agreed scope and information requirements",
          srDescription: "Requirements analysis diagram mapping client EIR and BEP inputs to defined technical scope and acceptance criteria.",
          artifact: {
            badge: "PHASE // 01",
            heading: "SCOPE & SPECIFICATION",
            actionLabel: "INSPECT",
            tags: ["EIR / BEP Review", "Model Conventions", "Acceptance Criteria"]
          },
          diagram: {
            sourceBadge: "CLIENT EIR / BEP",
            sourceLabel: "Project Requirements",
            targetBadge: "TECHNICAL SCOPE",
            targetLabel: "Defined Acceptance Criteria"
          }
        },
        {
          num: "02",
          mapLabel: "WORKFLOW RULES",
          title: "Define Rules & Workflow",
          desc: "Translate agreed requirements into checklists, validation rules, and a practical execution plan. Identify where tailored Revit automation can reduce repetitive tasks.",
          output: "Validation rules and workflow specification",
          srDescription: "Workflow specification diagram connecting validation logic, parameter mapping, and Revit API automation tasks.",
          artifact: {
            badge: "PHASE // 02",
            heading: "RULES & AUTOMATION PLAN",
            actionLabel: "SPEC",
            tags: ["Validation Logic", "Parameter Mapping", "API Task Scoping"]
          },
          diagram: {
            node1Badge: "RULE LAYER",
            node1Label: "Parameter Mapping",
            node2Badge: "LOGIC GATE",
            node2Label: "Validation Rules",
            node3Badge: "AUTOMATION",
            node3Label: "API Task Scoping"
          }
        },
        {
          num: "03",
          mapLabel: "IMPLEMENTATION",
          title: "Implement & Coordinate",
          desc: "Carry out model checks, parameter updates, and coordination tasks using engineering expertise and, where appropriate, purpose-built Python, C#, and Revit API tools.",
          output: "Updated model information and coordinated outputs",
          srDescription: "Execution flow diagram showing model updates and multidisciplinary coordination routines through engineering tools.",
          artifact: {
            badge: "PHASE // 03",
            heading: "ENGINEERING EXECUTION",
            actionLabel: "EXECUTE",
            tags: ["Revit API Operations", "Parameter Updates", "Discipline Coordination"]
          },
          diagram: {
            sourceBadge: "MODEL HOST",
            sourceLabel: "Revit API Execution",
            targetBadge: "COORDINATION",
            targetLabel: "Synchronized Outputs"
          }
        },
        {
          num: "04",
          mapLabel: "REVIEW & HANDOVER",
          title: "Review & Hand Over",
          desc: "Review outputs against the agreed criteria, document exceptions, and prepare the relevant model updates, reports, or handover materials for the project team.",
          output: "Review notes, issue records, and handover materials",
          srDescription: "Quality review and handover diagram showing engineering review gates, BCF issue tracking, and final delivery documentation.",
          artifact: {
            badge: "PHASE // 04",
            heading: "QUALITY & HANDOVER",
            actionLabel: "HANDOVER",
            tags: ["Quality Review Notes", "Issue Records (BCF)", "Handover Package"]
          },
          diagram: {
            sourceBadge: "AUDIT DOSSIER",
            sourceLabel: "BCF Issue Tracking",
            targetBadge: "HANDOVER PACKAGE",
            targetLabel: "Reviewed Deliverables"
          }
        }
      ]
    },
    engineeringOutcomes: {
      tag: "ENGINEERING OUTCOMES",
      headline: "More Control Across the BIM Delivery Process.",
      subtitle: "Practical engineering workflows can help teams reduce repetitive operations, improve the consistency of model information, and make better use of their existing BIM environment. The approach and results depend on each project's requirements.",
      labels: {
        canvasLabel: "ENGINEERING IMPACT CANVAS",
        interactiveNote: "Select an outcome to inspect the workflow architecture",
        activeFocus: "ACTIVE FOCUS",
        inspectButton: "Inspect Workflow",
        selectedStatus: "Active",
        outcome1: {
          manualHeading: "Manual Operations",
          items: [
            { name: "Parameter Transcription", code: "01" },
            { name: "Repetitive Sheet QA", code: "02" },
            { name: "Naming Verification", code: "03" }
          ],
          routineBadge: "AUTOMATION",
          routineTitle: "Defined Routine",
          routineDesc: "Targeted scripts & batch rules",
          gateBadge: "GATEWAY",
          gateTitle: "Engineer Review",
          gateDesc: "Supervision & decisions",
          footerLeft: "WORKFLOW STRUCTURE",
          footerRight: "SUPERVISED AUTOMATION"
        },
        outcome2: {
          rulesHeading: "Rule Definition Framework",
          reportHeading: "EXCEPTION AUDIT REPORT",
          reportStatus: "REVIEW PROCESS",
          exceptions: [
            { name: "Inconsistent Parameter Types", tag: "IDENTIFIED" },
            { name: "Missing Classification Tags", tag: "FLAGGED" },
            { name: "Naming Convention Discrepancies", tag: "REPORTED" }
          ],
          reportNote: "Clear criteria turn vague model issues into actionable, reviewable line items.",
          footerLeft: "INFORMATION ASSURANCE",
          footerRight: "STRUCTURED REPORTING"
        },
        outcome3: {
          envHeading: "Existing Environments",
          envRvt: "Autodesk Revit",
          envRvtSub: "Native API & Parameter Workflows",
          envIfc: "OpenBIM IFC4",
          envIfcSub: "Vendor-neutral Model Exchange",
          envBcf: "Issue Tracking",
          envBcfSub: "Open Issue Collaboration",
          coreHeading: "CONNECTED WORKFLOW FABRIC",
          coreBadge: "OPEN ECOSYSTEM",
          disciplinesLabel: "DISCIPLINES",
          disciplinesVal: "ARC · STR · MEP",
          interfaceLabel: "INTERFACE",
          interfaceVal: "Python / C# / API",
          coreNote: "Solutions integrate alongside your established software stack, avoiding unnecessary workflow disruptions.",
          footerLeft: "ECOSYSTEM INTEGRATION",
          footerRight: "PRACTICAL ADAPTATION"
        },
        mobileSummaries: [
          "PROCESS: REPETITIVE → ROUTINE → REVIEW",
          "QUALITY: RULES → AUDIT → ACTIONABLE REPORT",
          "INTEGRATION: REVIT + IFC + BCF WORKFLOW"
        ]
      },
      columns: [
        {
          id: "efficiency",
          num: "01",
          icon: "Workflow",
          category: "WORKFLOW EFFICIENCY",
          title: "Less Repetitive Work",
          desc: "Where appropriate, structured checks and tailored Revit automation can reduce repeated manual operations, allowing engineering teams to focus more attention on coordination, review, and project-specific decisions.",
          topics: [
            "Targeted Automation",
            "Repeatable Operations",
            "Engineering Oversight"
          ],
          diagram: {
            title: "PROCESS_EVOLUTION",
            badge: "STRUCTURED",
            steps: [
              { label: "Repeated Tasks", tag: "SOURCE" },
              { label: "Defined Routines", tag: "AUTO" },
              { label: "Engineer Review", tag: "REVIEW" }
            ]
          }
        },
        {
          id: "quality",
          num: "02",
          icon: "ShieldCheck",
          category: "INFORMATION QUALITY",
          title: "More Consistent Model Information",
          desc: "Defined naming, parameter, classification, and information-checking rules make discrepancies easier to identify and support clearer, more reviewable BIM deliverables.",
          topics: [
            "Model QA/QC",
            "Information Requirements",
            "Issue Visibility"
          ],
          diagram: {
            title: "INFORMATION_REVIEW",
            badge: "CONSISTENCY",
            fields: [
              { name: "Naming & Syntax", tag: "RULE" },
              { name: "Parameter Sets", tag: "CHECK" },
              { name: "Classification", tag: "SCHEMA" }
            ]
          }
        },
        {
          id: "integration",
          num: "03",
          icon: "Boxes",
          category: "WORKFLOW INTEGRATION",
          title: "Built Around Existing BIM Tools",
          desc: "Project-specific solutions can work alongside established Revit, IFC, and multidisciplinary processes, helping teams improve workflows without unnecessarily replacing familiar software or working methods.",
          topics: [
            "Revit Workflows",
            "OpenBIM / IFC",
            "Practical Integration"
          ],
          diagram: {
            title: "CONNECTED_ENVIRONMENT",
            badge: "OPENBIM",
            nodes: [
              { code: "RVT", label: "Revit API", tag: "FLOW" },
              { code: "IFC", label: "IFC4 Schema", tag: "FLOW" },
              { code: "COORD", label: "Coordinated Flow", tag: "FLOW" }
            ]
          }
        }
      ]
    },
    executionArchitecture: executionArchitecture.en,
    integrationPathways: integrationPathways.en,
    systemBenchmarks: systemBenchmarks.en
  },
  it: {
    hero: {
      eyebrow: "INGEGNERIA BIM · PRESTAZIONI SPECIALISTICHE",
      headline1: "Servizi BIM specialistici.",
      headline2: "Modellazione e coordinamento integrati.",
      subheadline: "Modellazione BIM architettonica, strutturale e impiantistica, coordinamento disciplinare e generale, verifica dei modelli informativi, Scan-to-BIM e produzione di elaborati digitali. I nostri specialisti integrano progettazione computazionale e automazione Revit secondo i requisiti del progetto.",
      primaryCta: "Parliamo del vostro progetto",
      secondaryCta: "Servizi e roadmap",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "UNI 11337 · UNI EN ISO 19650",
        "openBIM · IFC / BCF",
        "API Revit · Verifica dei modelli"
      ],
      pipeline: {
        badge: "PROCESSO ILLUSTRATIVO",
        monitorLabel: "PROCESSO BIM // 4 FASI",
        windowTitle: "pyBIM // PROCESSO OPERATIVO BIM",
        labels: {
          framework: "STRUMENTI // openBIM E API",
          tablistAria: "Fasi del processo operativo BIM",
          inspectAria: "Esamina la fase",
          specOverview: "SPECIFICA DELLA FASE",
          pipelineMode: "PROCESSO: CONSEGNA BIM",
          activePhase: "FASE ATTIVA",
          schematic: "SCHEMA OPERATIVO",
          stepLabel: "FASE"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "Modellazione BIM specialistica",
            sub: "Architettura · Strutture · Impianti",
            badge: "MODELLAZIONE",
            meta: "RVT · IFC · Requisiti informativi",
            railLabel: "MODELLI",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "Coordinamento BIM",
            sub: "Modelli federati e verifica delle interferenze",
            badge: "COORDINAMENTO",
            meta: "ACDat · IFC · BCF",
            railLabel: "COORD.",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Verifica dei modelli e automazione",
            sub: "Geometria · Parametri · Informazioni",
            badge: "VERIFICA",
            meta: "CI / pGI · API Revit",
            railLabel: "VERIFICA",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Elaborati e consegna digitale",
            sub: "Modelli verificati e documentazione tecnica",
            badge: "CONSEGNA",
            meta: "RVT · IFC · Elaborati · Rapporti",
            railLabel: "CONSEGNA",
            icon: "database"
          }
        ],
        logs: [
          "[FASE 01] Sviluppo dei modelli BIM architettonici, strutturali e impiantistici secondo la documentazione progettuale e i requisiti informativi concordati.",
          "[FASE 02] Coordinamento dei modelli disciplinari, verifica delle interferenze e analisi delle interfacce tecniche nell'ACDat di progetto.",
          "[FASE 03] Verifica della geometria, dei parametri e delle informazioni rispetto al CI e al pGI, ove applicabili. Automazione delle attività appropriate mediante API Revit, Python e C#.",
          "[FASE 04] Predisposizione dei modelli BIM verificati, degli elaborati grafici, delle esportazioni informative e dei rapporti di coordinamento secondo le modalità di consegna concordate."
        ]
      }
    },
    roadmap: {
      tag: "SERVIZI E SVILUPPO TECNOLOGICO",
      headline: "Servizi BIM oggi. Tecnologie per il futuro.",
      subtitle: "I servizi specialistici di ingegneria BIM costituiscono la nostra attività principale. Parallelamente alle commesse, sviluppiamo software proprietario e conduciamo attività di ricerca sulle future infrastrutture di intelligenza artificiale.",
      labels: {
        outcome: "Elaborati e obiettivi",
        execution: "Esecuzione e sviluppo",
        impact: "Benefici e prospettive",
        featuredOffering: "SERVIZI PRINCIPALI",
        currentOffering: "SERVIZI ATTUALI",
        softwareRoadmap: "SVILUPPO SOFTWARE",
        enterpriseRoadmap: "RICERCA E SVILUPPO",
        timelineAriaLabel: "Servizi e sviluppo tecnologico pyBIM",
        progressHeading: "Avanzamento dello sviluppo",
        progressNote: "L'avanzamento riguarda le basi tecnologiche condivise con la Fase II. Lo sviluppo dedicato inizierà dopo il completamento e la validazione finale della Fase II.",
        availabilityHeading: "Disponibilità commerciale",
        availabilityValue: "Disponibile ora",
        sharedProgressHeading: "Basi tecnologiche condivise",
        targetReleaseLabel: "Obiettivo di lancio",
        targetReleaseValue: "Q4 2027",
        targetReleaseNote: "Subordinato alle verifiche finali di integrazione, affidabilità e sicurezza.",
        noReleaseLabel: "Data di lancio",
        noReleaseValue: "Non annunciata"
      },
      cards: [
        {
          num: "01",
          phase: "FASE I",
          isPrimary: true,
          statusTag: "DISPONIBILE ORA",
          progressPercent: 100,
          title: "Servizi di ingegneria BIM",
          description: "Modellazione BIM architettonica, strutturale e impiantistica, coordinamento disciplinare e generale, verifica dei modelli, Scan-to-BIM, CAD-to-BIM e automazione su misura.",
          outcome: "Modelli BIM coordinati, elaborati tecnici, esportazioni informative e rapporti di verifica dei modelli.",
          execution: "Gli specialisti BIM operano secondo i requisiti informativi concordati nell'ACDat del cliente, con il supporto di strumenti basati su API Revit, Python e C#, ove opportuno.",
          impact: "Responsabilità tecniche definite, processi coordinati e verifiche tracciabili nell'ambito delle prestazioni concordate.",
          ctaText: "Parliamo del vostro progetto",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "FASE II",
          isPrimary: false,
          statusTag: "IN SVILUPPO",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "Piattaforma proprietaria in sviluppo per l'automazione di Revit e la gestione dei processi BIM in cloud.",
          outcome: "Accesso previsto a strumenti riutilizzabili di automazione Revit e alla gestione dei flussi di lavoro dei gruppi di progetto.",
          execution: "Sviluppo interno e valutazione riservata. Restano necessarie le verifiche finali di integrazione, affidabilità e sicurezza.",
          impact: "L'obiettivo è favorire processi di automazione più uniformi tra i gruppi di progetto. La piattaforma non è ancora disponibile sul mercato.",
          ctaText: "Richiesta di accesso riservato",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "FASE III",
          isPrimary: false,
          statusTag: "R&S FUTURA",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "Ricerca su infrastrutture di intelligenza artificiale private e on-premise per i processi ingegneristici.",
          outcome: "Studio di strumenti di IA operanti localmente in ambienti controllati dal cliente.",
          execution: "Lo sviluppo dedicato inizierà dopo il completamento e la validazione finale della Fase II.",
          impact: "Ricerca di future soluzioni per l'inferenza locale e il controllo dei dati. Nessuna disponibilità commerciale.",
          ctaText: "Confronto sulle esigenze future",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "R&S FUTURA · ORIZZONTE POST-FASE II",
      headline: "Ricerca AI Privata per Futuri Ambienti BIM.",
      description: "Lo sviluppo dedicato di Fase III per Edge AI inizierà dopo il completamento e la validazione della Fase II (target Q4 2027). Non è attualmente disponibile sul mercato e non ha una data di rilascio; i team possono segnalare esigenze future nella coda prioritaria.",
      subtitle: "Lo sviluppo dedicato di Fase III per Edge AI inizierà dopo il completamento e la validazione della Fase II (target Q4 2027). Non è attualmente disponibile sul mercato e non ha una data di rilascio.",
      buttonText: "Entra nella Coda Prioritaria Enterprise",
      buttonHref: "/contact#priority-queue",
      microcopy: "Solo manifestazione di interesse R&S — non costituisce prodotto commerciale attuale né impegno su date di rilascio.",
      diagram: {
        conceptualArchitecture: "ARCHITETTURA CONCETTUALE",
        engineeringData: "DATI INGEGNERISTICI",
        engineeringDataSub: "Revit · IFC · Dati Modello",
        privateAiCore: "CORE IA PRIVATO",
        privateAiCoreSub: "Inferenza Locale Controllata",
        bimWorkflows: "WORKFLOW BIM",
        bimWorkflowsSub: "Automazione Assistita",
        plannedInfrastructure: "INFRASTRUTTURA PIANIFICATA",
        coreBadge: "CONTROLLO LOCALE · CONCETTO",
        inBadge: "INPUT // 01",
        outBadge: "OUTPUT // 02"
      }
    },
    coreCapabilities: {
      tag: "COMPETENZE INGEGNERISTICHE",
      headline: "Trasformare i Requisiti BIM in Workflow Ingegneristici Ripetibili.",
      subtitle: "Dai controlli informativi sui modelli all'automazione per Revit e ai deliverable strutturati, pyBIM unisce competenza ingegneristica e strumenti software pratici per rendere gestibile la consegna di progetti complessi.",
      schematicNotice: "Schema ingegneristico illustrativo",
      exchangeStandard: "Workflow di Scambio OpenBIM",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Validazione Informativa del Modello",
          desc: "Verifica parametri del modello, convenzioni di denominazione, classificazioni e requisiti informativi di progetto attraverso controlli strutturati e report chiari.",
          topics: [
            "QA/QC dei Modelli",
            "Requisiti EIR / BEP",
            "Coerenza Informativa"
          ],
          diagram: {
            title: "SCHEMA_VALIDAZIONE",
            badge: "SET REGOLE",
            statusLabel: "CONTROLLO SCHEMA",
            outputSummary: "DOSSIER AUDIT STRUTTURATO",
            srDescription: "Schema di verifica informativa strutturata che illustra controlli su convenzioni di denominazione, property set ISO 19650 e tassonomie di classificazione.",
            items: [
              { label: "EIR.Convenzione_Nomi", tag: "REGOLA SINTASSI", type: "FORMATO" },
              { label: "ISO_19650.PropertySets", tag: "RIF SCHEMA", type: "STRUTTURA" },
              { label: "OmniClass.Classificazione", tag: "CODICE TABELLA", type: "TASSONOMIA" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Automazione Revit & Parameter Engineering",
          desc: "Sviluppo di strumenti su misura in Python e C# per operazioni ripetitive in Revit, gestione dei parametri, aggiornamento dei dati del modello e workflow ingegneristici dedicati.",
          topics: [
            "API Revit",
            "Python / C#",
            "Workflow dei Parametri"
          ],
          diagram: {
            title: "PIPELINE_AUTOMAZIONE",
            badge: "API CORE",
            runtimeBadge: "CORE ESECUZIONE",
            modelLabel: "Modello .RVT Ospite",
            modelSub: "Elementi e Istanze",
            codeLabel: "Motore Python & C#",
            codeSub: "Routine Revit API",
            outputLabel: "Iniezione Parametri",
            outputSub: "Metadati Controllati",
            caption: "Aggiornamenti deterministici dei parametri e routine guidate",
            srDescription: "Pipeline di automazione Revit connessa che illustra l'ingestione del modello ospite, le routine Python e C# e l'output controllato dei parametri."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Workflow Dati BIM Coordinati",
          desc: "Supporto al coordinamento multidisciplinare, allo scambio strutturato di informazioni e alla gestione controllata dei deliverable BIM tra team di progetto e ambienti software diversi.",
          topics: [
            "Coordinamento Multidisciplinare",
            "OpenBIM / IFC",
            "Gestione dei Dati"
          ],
          diagram: {
            title: "FLUSSO_MULTIDISCIPLINARE",
            badge: "OpenBIM",
            coordinationZone: "LAYER DI SCAMBIO E COORDINAMENTO",
            srDescription: "Flusso informativo BIM multidisciplinare che connette modelli architettonici, strutturali e impiantistici attraverso un layer di coordinamento OpenBIM.",
            disciplines: [
              { code: "ARC", name: "Arch", role: "Modello Architettonico" },
              { code: "STR", name: "Strutt", role: "Modello Analitico" },
              { code: "MEP", name: "Impianti", role: "Modello Sistemi" }
            ],
            output: "DELIVERABLE COORDINATO IFC4 / BCF"
          }
        }
      ],
      buttonText: "Discuti una Sfida Ingegneristica",
      buttonHref: "/contact",
      microcopy: "Condividi i requisiti del tuo progetto o un workflow ripetitivo che desideri ottimizzare. Esploreremo insieme un punto di partenza concreto."
    },
    executionPipeline: {
      tag: "PROCESSO DI CONSEGNA INGEGNERISTICA",
      headline: "Dai Requisiti di Progetto ai Deliverable BIM Verificati.",
      subtitle: "Un approccio strutturato collega i requisiti informativi di progetto, l'automazione applicata, l'implementazione controllata e la revisione ingegneristica. Ogni workflow viene adattato alle specifiche esigenze dell'incarico.",
      labels: {
        outputLabel: "OUTPUT TIPICO",
        illustrativeLabel: "PROCESSO ILLUSTRATIVO",
        mapTitle: "CRONOLOGIA DI CONSEGNA"
      },
      steps: [
        {
          num: "01",
          mapLabel: "REQUISITI",
          title: "Comprensione dei Requisiti",
          desc: "Analisi delle esigenze informative del committente, capitolati informativi (CI/EIR), piani di gestione (pGI/BEP) e standard di modellazione per definire ambito, priorità e criteri di accettazione.",
          output: "Ambito concordato e requisiti informativi definiti",
          srDescription: "Diagramma di analisi dei requisiti che mappa capitolati informativi e pGI verso ambito tecnico definito e criteri di accettazione.",
          artifact: {
            badge: "FASE // 01",
            heading: "AMBITO & SPECIFICHE",
            actionLabel: "ANALISI",
            tags: ["Analisi CI / pGI", "Standard di Modellazione", "Criteri di Accettazione"]
          },
          diagram: {
            sourceBadge: "COMMITTENTE CI / pGI",
            sourceLabel: "Requisiti di Progetto",
            targetBadge: "AMBITO TECNICO",
            targetLabel: "Criteri di Accettazione Definiti"
          }
        },
        {
          num: "02",
          mapLabel: "REGOLE & WORKFLOW",
          title: "Definizione di Regole e Workflow",
          desc: "Traduzione dei requisiti concordati in checklist operative, regole di validazione e un piano di esecuzione pratico. Individuazione delle aree in cui l'automazione Revit su misura riduce i task ripetitivi.",
          output: "Regole di validazione e specifiche di workflow",
          srDescription: "Diagramma di specifica del workflow che collega logiche di validazione, mappatura parametri e task di automazione API Revit.",
          artifact: {
            badge: "FASE // 02",
            heading: "REGOLE & PIANO DI AUTOMAZIONE",
            actionLabel: "DEFINISCI",
            tags: ["Logica di Validazione", "Mappatura Parametri", "Pianificazione Task API"]
          },
          diagram: {
            node1Badge: "LAYER REGOLE",
            node1Label: "Mappatura Parametri",
            node2Badge: "LOGIC GATE",
            node2Label: "Regole di Validazione",
            node3Badge: "AUTOMAZIONE",
            node3Label: "Pianificazione Task API"
          }
        },
        {
          num: "03",
          mapLabel: "IMPLEMENTAZIONE",
          title: "Implementazione e Coordinamento",
          desc: "Esecuzione delle verifiche sui modelli, aggiornamento dei parametri e coordinamento informativo tramite competenza ingegneristica e, ove opportuno, tool dedicati in Python, C# e API Revit.",
          output: "Modelli aggiornati e deliverable coordinati",
          srDescription: "Diagramma del flusso esecutivo che illustra aggiornamenti del modello e routine di coordinamento multidisciplinare tramite tool ingegneristici.",
          artifact: {
            badge: "FASE // 03",
            heading: "ESECUZIONE INGEGNERISTICA",
            actionLabel: "ESEGUI",
            tags: ["Operazioni API Revit", "Aggiornamento Parametri", "Coordinamento tra Discipline"]
          },
          diagram: {
            sourceBadge: "HOST MODELLO",
            sourceLabel: "Esecuzione Revit API",
            targetBadge: "COORDINAMENTO",
            targetLabel: "Output Sincronizzati"
          }
        },
        {
          num: "04",
          mapLabel: "REVISIONE & CONSEGNA",
          title: "Revisione e Consegna",
          desc: "Controllo degli elaborati rispetto ai criteri stabiliti, tracciamento delle eccezioni e predisposizione dei modelli aggiornati, report tecnici o documentazione di consegna per il team di progetto.",
          output: "Note di revisione, registro non conformità e pacchetto di consegna",
          srDescription: "Diagramma di revisione e consegna che mostra controlli di qualità, tracciamento problemi BCF e documentazione finale di consegna.",
          artifact: {
            badge: "FASE // 04",
            heading: "QUALITÀ & CONSEGNA",
            actionLabel: "CONSEGNA",
            tags: ["Note di Revisione", "Registro Eccezioni (BCF)", "Pacchetto di Consegna"]
          },
          diagram: {
            sourceBadge: "DOSSIER AUDIT",
            sourceLabel: "Tracciamento Issue BCF",
            targetBadge: "PACCHETTO DI CONSEGNA",
            targetLabel: "Deliverable Revisionati"
          }
        }
      ]
    },
    engineeringOutcomes: {
      tag: "RISULTATI INGEGNERISTICI",
      headline: "Maggiore Controllo nel Processo di Consegna BIM.",
      subtitle: "I workflow ingegneristici mirati aiutano i team a ridurre le operazioni ripetitive, migliorare la coerenza delle informazioni del modello e valorizzare l'ambiente BIM esistente. L'approccio e i risultati dipendono dai requisiti specifici di ciascun progetto.",
      labels: {
        canvasLabel: "CANVAS DELL'IMPATTO INGEGNERISTICO",
        interactiveNote: "Seleziona un risultato per esaminare l'architettura del workflow",
        activeFocus: "FOCUS ATTIVO",
        inspectButton: "Esamina Workflow",
        selectedStatus: "Attivo",
        outcome1: {
          manualHeading: "Operazioni Manuali",
          items: [
            { name: "Trascrizione Parametri", code: "01" },
            { name: "Controllo Tavole Ripetitivo", code: "02" },
            { name: "Verifica Nomenclatura", code: "03" }
          ],
          routineBadge: "AUTOMAZIONE",
          routineTitle: "Routine Definita",
          routineDesc: "Script dedicati e regole batch",
          gateBadge: "CONTROLLO",
          gateTitle: "Revisione Tecnica",
          gateDesc: "Supervisione e decisioni",
          footerLeft: "STRUTTURA DEL WORKFLOW",
          footerRight: "AUTOMAZIONE SUPERVISIONATA"
        },
        outcome2: {
          rulesHeading: "Quadro di Definizione Regole",
          reportHeading: "REPORT REVISIONE ANOMALIE",
          reportStatus: "PROCESSO DI VERIFICA",
          exceptions: [
            { name: "Tipi di Parametri Incoerenti", tag: "IDENTIFICATO" },
            { name: "Tag di Classificazione Assenti", tag: "SEGNALATO" },
            { name: "Discrepanze Nomenclatura", tag: "NOTIFICATO" }
          ],
          reportNote: "Criteri chiari trasformano criticità generiche in punti verificabili e risolvibili.",
          footerLeft: "GARANZIA INFORMATIVA",
          footerRight: "REPORTISTICA STRUTTURATA"
        },
        outcome3: {
          envHeading: "Ambienti Esistenti",
          envRvt: "Autodesk Revit",
          envRvtSub: "API native e workflow parametri",
          envIfc: "OpenBIM IFC4",
          envIfcSub: "Interscambio neutrale di modelli",
          envBcf: "Tracciamento Issue",
          envBcfSub: "Collaborazione aperta sulle anomalie",
          coreHeading: "STRUTTURA DI WORKFLOW CONNESSA",
          coreBadge: "ECOSISTEMA APERTO",
          disciplinesLabel: "DISCIPLINE",
          disciplinesVal: "ARC · STR · MEP",
          interfaceLabel: "INTERFACCIA",
          interfaceVal: "Python / C# / API",
          coreNote: "Le soluzioni si integrano nei software già utilizzati, evitando interruzioni nei flussi di lavoro.",
          footerLeft: "INTEGRAZIONE ECOSISTEMA",
          footerRight: "ADATTAMENTO PRATICO"
        },
        mobileSummaries: [
          "PROCESSO: RIPETITIVO → ROUTINE → REVISIONE",
          "QUALITÀ: REGOLE → AUDIT → REPORT ATTUABILE",
          "INTEGRAZIONE: WORKFLOW REVIT + IFC + BCF"
        ]
      },
      columns: [
        {
          id: "efficiency",
          num: "01",
          icon: "Workflow",
          category: "EFFICIENZA DEI WORKFLOW",
          title: "Minori Operazioni Ripetitive",
          desc: "Ove appropriato, controlli strutturati e automazioni su misura per Revit possono ridurre le attività manuali ripetitive, consentendo ai team di ingegneria di concentrarsi su coordinamento, revisione e decisioni di progetto.",
          topics: [
            "Automazione Mirata",
            "Operazioni Ripetibili",
            "Supervisione Tecnica"
          ],
          diagram: {
            title: "EVOLUZIONE_PROCESSO",
            badge: "STRUTTURATO",
            steps: [
              { label: "Attività Ripetute", tag: "FONTE" },
              { label: "Routine Definite", tag: "AUTO" },
              { label: "Revisione Tecnica", tag: "REVISIONE" }
            ]
          }
        },
        {
          id: "quality",
          num: "02",
          icon: "ShieldCheck",
          category: "QUALITÀ INFORMATIVA",
          title: "Informazioni di Modello Più Coerenti",
          desc: "Regole definite per nomenclatura, parametri, classificazioni e controllo informativo rendono le discrepanze più facili da individuare e favoriscono consegne BIM più chiare e verificabili.",
          topics: [
            "QA/QC del Modello",
            "Requisiti Informativi",
            "Visibilità delle Anomalie"
          ],
          diagram: {
            title: "REVISIONE_INFORMATIVA",
            badge: "COERENZA",
            fields: [
              { name: "Sintassi & Nomi", tag: "REGOLA" },
              { name: "Set di Parametri", tag: "VERIFICA" },
              { name: "Classificazione", tag: "SCHEMA" }
            ]
          }
        },
        {
          id: "integration",
          num: "03",
          icon: "Boxes",
          category: "INTEGRAZIONE DEI WORKFLOW",
          title: "Sviluppato Attorno Agli Strumenti BIM Esistenti",
          desc: "Soluzioni specifiche di progetto possono operare a fianco dei processi consolidati in Revit, IFC e delle discipline specialistiche, migliorando i flussi di lavoro senza sostituire software o metodi già operativi.",
          topics: [
            "Workflow Revit",
            "OpenBIM / IFC",
            "Integrazione Pratica"
          ],
          diagram: {
            title: "AMBIENTE_CONNESSO",
            badge: "OPENBIM",
            nodes: [
              { code: "RVT", label: "API Revit", tag: "FLUSSO" },
              { code: "IFC", label: "Schema IFC4", tag: "FLUSSO" },
              { code: "COORD", label: "Flusso Coordinato", tag: "FLUSSO" }
            ]
          }
        }
      ]
    },
    executionArchitecture: executionArchitecture.it,
    integrationPathways: integrationPathways.it,
    systemBenchmarks: systemBenchmarks.it
  },
  de: {
    hero: {
      eyebrow: "BIM-ENGINEERING · FACHLEISTUNGEN",
      headline1: "Spezialisierte BIM-Leistungen.",
      headline2: "Modellierung und Koordination aus einer Hand.",
      subheadline: "BIM-Modellierung für Architektur, Tragwerk und TGA, BIM-Fach- und Gesamtkoordination, Modellqualitätssicherung, Scan-to-BIM und strukturierte digitale Lieferobjekte. Unsere Fachkräfte setzen Computational Design und individuelle Revit-Automatisierung entsprechend den Projektanforderungen ein.",
      primaryCta: "Projekt besprechen",
      secondaryCta: "Leistungen und Roadmap",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "DIN EN ISO 19650 · VDI 2552",
        "openBIM · IFC / BCF",
        "Revit API · Modellprüfung"
      ],
      pipeline: {
        badge: "BEISPIELHAFTER ABLAUF",
        monitorLabel: "BIM-ABWICKLUNG // 4 PHASEN",
        windowTitle: "pyBIM // BIM-ARBEITSABLAUF",
        labels: {
          framework: "WERKZEUGE // openBIM & API",
          tablistAria: "Phasen des BIM-Arbeitsablaufs",
          inspectAria: "Phase prüfen",
          specOverview: "PHASENSPEZIFIKATION",
          pipelineMode: "PROZESS: BIM-ABWICKLUNG",
          activePhase: "AKTIVE PHASE",
          schematic: "ABLAUFSCHEMA",
          stepLabel: "PHASE"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "BIM-Fachmodellierung",
            sub: "Architektur · Tragwerk · TGA",
            badge: "MODELLIERUNG",
            meta: "RVT · IFC · Informationsanforderungen",
            railLabel: "MODELL",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "BIM-Fach- und Gesamtkoordination",
            sub: "Koordinationsmodelle und Kollisionsprüfung",
            badge: "KOORDINATION",
            meta: "CDE · IFC · BCF",
            railLabel: "KOORD.",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Modellprüfung und Automatisierung",
            sub: "Geometrie · Parameter · Informationen",
            badge: "MODELL-QS",
            meta: "AIA / BAP · Revit API",
            railLabel: "PRÜFUNG",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Dokumentation und digitale Übergabe",
            sub: "Geprüfte Modelle und technische Unterlagen",
            badge: "ÜBERGABE",
            meta: "RVT · IFC · Pläne · Berichte",
            railLabel: "ÜBERGABE",
            icon: "database"
          }
        ],
        logs: [
          "[PHASE 01] Erstellung von Architektur-, Tragwerks- und TGA-Modellen anhand der Projektunterlagen und vereinbarten Informationsanforderungen.",
          "[PHASE 02] Koordination der Fachmodelle, Kollisionsprüfung und Abstimmung technischer Schnittstellen im vereinbarten Projekt-CDE.",
          "[PHASE 03] Prüfung der Geometrie, Parameter und Modellinformationen anhand der anwendbaren AIA und des BAP. Automatisierung geeigneter Aufgaben mit Revit API, Python und C#.",
          "[PHASE 04] Aufbereitung geprüfter BIM-Modelle, Planunterlagen, Informationsexporte und Koordinationsberichte gemäß den vereinbarten Übergabeanforderungen."
        ]
      }
    },
    roadmap: {
      tag: "LEISTUNGEN UND TECHNOLOGIEENTWICKLUNG",
      headline: "BIM-Leistungen heute. Technologien für morgen.",
      subtitle: "Spezialisierte BIM-Engineering-Leistungen bilden unser Kerngeschäft. Parallel zur Projektabwicklung entwickeln wir eigene Software und erforschen zukünftige KI-Infrastrukturen.",
      labels: {
        outcome: "Lieferobjekte und Ziele",
        execution: "Umsetzung und Entwicklung",
        impact: "Nutzen und Perspektiven",
        featuredOffering: "KERNLEISTUNGEN",
        currentOffering: "AKTUELLE LEISTUNGEN",
        softwareRoadmap: "SOFTWAREENTWICKLUNG",
        enterpriseRoadmap: "FORSCHUNG UND ENTWICKLUNG",
        timelineAriaLabel: "Leistungen und Technologieentwicklung von pyBIM",
        progressHeading: "Entwicklungsfortschritt",
        progressNote: "Der Fortschritt umfasst gemeinsame technologische Grundlagen aus Phase II. Die eigenständige Entwicklung beginnt nach Abschluss und abschließender Validierung von Phase II.",
        availabilityHeading: "Kommerzielle Verfügbarkeit",
        availabilityValue: "Jetzt verfügbar",
        sharedProgressHeading: "Gemeinsame Grundlagen",
        targetReleaseLabel: "Angestrebte Markteinführung",
        targetReleaseValue: "Q4 2027",
        targetReleaseNote: "Vorbehaltlich abschließender Integrations-, Zuverlässigkeits- und Sicherheitsprüfungen.",
        noReleaseLabel: "Veröffentlichungstermin",
        noReleaseValue: "Nicht angekündigt"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE I",
          isPrimary: true,
          statusTag: "JETZT VERFÜGBAR",
          progressPercent: 100,
          title: "BIM-Engineering-Leistungen",
          description: "BIM-Fachmodellierung für Architektur, Tragwerk und TGA, BIM-Fach- und Gesamtkoordination, Modellprüfung, Scan-to-BIM, CAD-to-BIM und individuelle Automatisierung.",
          outcome: "Abgestimmte BIM-Modelle, technische Planunterlagen, Informationsexporte und Modellprüfberichte.",
          execution: "BIM-Fachkräfte arbeiten anhand der vereinbarten Informationsanforderungen im kundenseitigen CDE, bei Bedarf unterstützt durch Revit API, Python und C#.",
          impact: "Definierte technische Verantwortlichkeiten, koordinierte Arbeitsabläufe und nachvollziehbare Qualitätsprüfungen innerhalb des vereinbarten Leistungsumfangs.",
          ctaText: "Projekt besprechen",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "PHASE II",
          isPrimary: false,
          statusTag: "IN ENTWICKLUNG",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "Eigene Softwareplattform in Entwicklung für Revit-Automatisierung und cloudbasierte Verwaltung von BIM-Arbeitsabläufen.",
          outcome: "Geplanter Zugang zu wiederverwendbaren Revit-Automatisierungswerkzeugen und teamübergreifenden Arbeitsabläufen.",
          execution: "Interne Entwicklung und geschlossene Evaluierung. Abschließende Integrations-, Zuverlässigkeits- und Sicherheitsprüfungen stehen noch aus.",
          impact: "Ziel sind einheitlichere Automatisierungsprozesse über Projektteams hinweg. Noch nicht allgemein verfügbar.",
          ctaText: "Privaten Zugang anfragen",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "PHASE III",
          isPrimary: false,
          statusTag: "ZUKÜNFTIGE F&E",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "Forschung zu privaten, lokal betriebenen KI-Infrastrukturen für ingenieurtechnische Arbeitsabläufe.",
          outcome: "Untersuchung lokal betriebener KI-Werkzeuge in kundenseitig kontrollierten Umgebungen.",
          execution: "Die eigenständige Entwicklung beginnt nach Abschluss und abschließender Validierung von Phase II.",
          impact: "Forschung zu zukünftigen Möglichkeiten der lokalen KI-Inferenz und Datenkontrolle. Nicht kommerziell verfügbar.",
          ctaText: "Zukünftigen Bedarf besprechen",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "KÜNFTIGE F&E · HORIZONT NACH PHASE II",
      headline: "Private KI-Forschung für künftige BIM-Umgebungen.",
      description: "Die dedizierte Entwicklung von Phase-III-Edge-AI beginnt erst nach Abschluss und Validierung von Phase II (Ziel Q4 2027). Die Lösung ist derzeit nicht kommerziell verfügbar und hat kein angekündigtes Release-Datum; interessierte Teams können Anforderungen unverbindlich vormerken.",
      subtitle: "Die dedizierte Entwicklung von Phase-III-Edge-AI beginnt erst nach Abschluss und Validierung von Phase II (Ziel Q4 2027). Derzeit nicht kommerziell verfügbar; kein Release-Datum angekündigt.",
      buttonText: "Der Enterprise-Prioritätswarteschlange beitreten",
      buttonHref: "/contact#priority-queue",
      microcopy: "Unverbindliche F&E-Interessensbekundung — kein aktuell verfügbares Produkt und keine Terminzusage.",
      diagram: {
        conceptualArchitecture: "KONZEPTIONELLE ARCHITEKTUR",
        engineeringData: "ENGINEERING-DATEN",
        engineeringDataSub: "Revit · IFC · Modelldaten",
        privateAiCore: "PRIVATER KI-KERN",
        privateAiCoreSub: "Kontrollierte Lokale Inferenz",
        bimWorkflows: "BIM-WORKFLOWS",
        bimWorkflowsSub: "Assistierte Automatisierung",
        plannedInfrastructure: "GEPLANTE INFRASTRUKTUR",
        coreBadge: "LOKALE KONTROLLE · KONZEPT",
        inBadge: "INPUT // 01",
        outBadge: "OUTPUT // 02"
      }
    },
    coreCapabilities: {
      tag: "ENGINEERING-KOMPETENZEN",
      headline: "BIM-Anforderungen in wiederholbare Engineering-Workflows überführen.",
      subtitle: "Von Modelldatenprüfungen über Revit-Automatisierung bis hin zu strukturierten Übergaben verbindet pyBIM ingenieurtechnische Expertise mit praxisnahen Software-Tools, um komplexe Projektabwicklungen beherrschbar zu machen.",
      schematicNotice: "Illustratives Engineering-Schema",
      exchangeStandard: "OpenBIM-Austausch-Workflow",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Modelldaten-Validierung",
          desc: "Prüfung von Modellparametern, Benennungskonventionen, Klassifikationen und Projekt-Informationsanforderungen durch strukturierte Kontrollen und transparente Berichte.",
          topics: [
            "Modell-QA/QC",
            "AIA- / BAP-Anforderungen",
            "Informationskonsistenz"
          ],
          diagram: {
            title: "VALIDIERUNGS_SCHEMA",
            badge: "REGELSATZ",
            statusLabel: "SCHEMA-PRÜFUNG",
            outputSummary: "STRUKTURIERTES AUDIT-DOSSIER",
            srDescription: "Strukturierte Informationsprüfungs-Matrix zur Veranschaulichung von Benennungskonventionen, ISO 19650 Property-Sets und Klassifikations-Taxonomien.",
            items: [
              { label: "AIA.Benennungsregeln", tag: "SYNTAXREGEL", type: "FORMAT" },
              { label: "ISO_19650.PropertySets", tag: "SCHEMA-REF", type: "STRUKTUR" },
              { label: "OmniClass.Klassifikation", tag: "TABELLENCODE", type: "TAXONOMIE" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Revit-Automatisierung & Parameter-Engineering",
          desc: "Entwicklung maßgeschneiderter Python- und C#-Werkzeuge für repetitive Revit-Aufgaben, Parametermodifikationen, Modelldaten-Aktualisierungen und projektspezifische Engineering-Workflows.",
          topics: [
            "Revit API",
            "Python / C#",
            "Parameter-Workflows"
          ],
          diagram: {
            title: "AUTOMATISIERUNGS_PIPELINE",
            badge: "API CORE",
            runtimeBadge: "AUSFÜHRUNGS-KERN",
            modelLabel: ".RVT-Modell Host",
            modelSub: "Elemente & Instanzen",
            codeLabel: "Python & C# Engine",
            codeSub: "Revit API Routinen",
            outputLabel: "Parameter-Injektion",
            outputSub: "Kontrollierte Metadaten",
            caption: "Deterministische Parameter-Updates und skriptgestützte Routinen",
            srDescription: "Verbundene Revit-Automatisierungs-Pipeline zur Veranschaulichung von Modell-Ingestion, Python- und C#-Routinen sowie kontrollierter Parameter-Ausgabe."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Koordinierte BIM-Daten-Workflows",
          desc: "Unterstützung bei multidisziplinärer Koordination, strukturiertem Datenaustausch und kontrollierten BIM-Lieferungen über Projektteams und Softwareumgebungen hinweg.",
          topics: [
            "Multidisziplinäre Koordination",
            "OpenBIM / IFC",
            "Datenmanagement"
          ],
          diagram: {
            title: "MULTIDISZIPLINÄRER_FLUSS",
            badge: "OpenBIM",
            coordinationZone: "KOORDINATIONSAUSTAUSCH-SCHICHT",
            srDescription: "Multidisziplinärer BIM-Informationsfluss zur Verknüpfung von Architektur-, Tragwerks- und TGA-Modellen über eine OpenBIM-Koordinationsschicht.",
            disciplines: [
              { code: "ARC", name: "Arch", role: "Entwurfsmodell" },
              { code: "STR", name: "Tragwerk", role: "Berechnungsmodell" },
              { code: "MEP", name: "TGA", role: "Gebäudetechnik" }
            ],
            output: "KOORDINIERTES IFC4 / BCF-DELIVERABLE"
          }
        }
      ],
      buttonText: "Engineering-Herausforderung besprechen",
      buttonHref: "/contact",
      microcopy: "Teilen Sie uns Ihre Projektanforderungen oder einen repetitiven Workflow mit, den Sie optimieren möchten. Wir erarbeiten einen praxisnahen Ansatz."
    },
    executionPipeline: {
      tag: "ENGINEERING-LIEFERPROZESS",
      headline: "Von Projektanforderungen zu geprüften BIM-Lieferungen.",
      subtitle: "Ein strukturierter Ansatz verbindet Informationsanforderungen, praxisnahe Automatisierung, kontrollierte Umsetzung und ingenieurtechnische Prüfung. Jeder Workflow wird flexibel auf das jeweilige Projekt abgestimmt.",
      labels: {
        outputLabel: "TYPISCHES ERGEBNIS",
        illustrativeLabel: "ILLUSTRATIVER PROZESS",
        mapTitle: "LIEFERABLAUF"
      },
      steps: [
        {
          num: "01",
          mapLabel: "ANFORDERUNGEN",
          title: "Anforderungen verstehen",
          desc: "Prüfung von Informationsbedarfen, AIA-/BAP-Vorgaben, Modellkonventionen und der vorhandenen BIM-Umgebung zur Festlegung von Leistungsumfang, Prioritäten und Abnahmekriterien.",
          output: "Vereinbarter Leistungsumfang und Informationsanforderungen",
          srDescription: "Anforderungsanalyse-Diagramm zur Überführung von AIA- und BAP-Vorgaben in definierten Leistungsumfang und Abnahmekriterien.",
          artifact: {
            badge: "PHASE // 01",
            heading: "UMFANG & SPEZIFIKATION",
            actionLabel: "PRÜFEN",
            tags: ["AIA / BAP-Prüfung", "Modellkonventionen", "Abnahmekriterien"]
          },
          diagram: {
            sourceBadge: "AUFTRAGGEBER AIA / BAP",
            sourceLabel: "Projektanforderungen",
            targetBadge: "TECHNISCHER UMFANG",
            targetLabel: "Definierte Abnahmekriterien"
          }
        },
        {
          num: "02",
          mapLabel: "WORKFLOW-REGELN",
          title: "Regeln & Workflow definieren",
          desc: "Überführung vereinbarter Anforderungen in Checklisten, Validierungsregeln und einen praxisorientierten Ausführungsplan. Identifikation von Potenzialen für maßgeschneiderte Revit-Automatisierung.",
          output: "Validierungsregeln und Workflow-Spezifikation",
          srDescription: "Workflow-Spezifikationsdiagramm zur Verknüpfung von Validierungslogik, Parameter-Mapping und Revit-API-Automatisierungsaufgaben.",
          artifact: {
            badge: "PHASE // 02",
            heading: "REGELN & AUTOMATISIERUNGSPLAN",
            actionLabel: "DEFINIEREN",
            tags: ["Validierungslogik", "Parameter-Mapping", "API-Aufgabenabgrenzung"]
          },
          diagram: {
            node1Badge: "REGEL-EBENE",
            node1Label: "Parameter-Mapping",
            node2Badge: "LOGIC GATE",
            node2Label: "Validierungsregeln",
            node3Badge: "AUTOMATISIERUNG",
            node3Label: "API-Aufgabenabgrenzung"
          }
        },
        {
          num: "03",
          mapLabel: "UMSETZUNG",
          title: "Umsetzen & Koordinieren",
          desc: "Durchführung von Modellprüfungen, Parameter-Updates und Koordinationsaufgaben durch ingenieurtechnische Expertise und bedarfsgerechte Python-, C#- und Revit-API-Tools.",
          output: "Aktualisierte Modelldaten und koordinierte Ergebnisse",
          srDescription: "Ausführungsablauf-Diagramm zur Veranschaulichung von Modell-Updates und fachübergreifenden Koordinationsroutinen über Engineering-Tools.",
          artifact: {
            badge: "PHASE // 03",
            heading: "INGENIEURMÄSSIGE UMSETZUNG",
            actionLabel: "UMSETZEN",
            tags: ["Revit-API-Abläufe", "Parameter-Updates", "Fachkoordination"]
          },
          diagram: {
            sourceBadge: "MODELL-HOST",
            sourceLabel: "Revit API-Ausführung",
            targetBadge: "KOORDINATION",
            targetLabel: "Synchronisierte Ausgaben"
          }
        },
        {
          num: "04",
          mapLabel: "PRÜFUNG & ÜBERGABE",
          title: "Prüfen & Übergeben",
          desc: "Prüfung der Lieferungen gegen vereinbarte Kriterien, Dokumentation von Abweichungen und Vorbereitung relevanter Modellaktualisierungen, Prüfberichte oder Übergabeunterlagen.",
          output: "Prüfnotizen, Fehlerprotokolle und Übergabedokumente",
          srDescription: "Qualitätsprüfungs- und Übergabediagramm mit Prüfgates, BCF-Fehlerverfolgung und abschließender Übergabedokumentation.",
          artifact: {
            badge: "PHASE // 04",
            heading: "QUALITÄT & ÜBERGABE",
            actionLabel: "ÜBERGABE",
            tags: ["Prüfnotizen", "Fehlerprotokolle (BCF)", "Übergabepaket"]
          },
          diagram: {
            sourceBadge: "AUDIT-DOSSIER",
            sourceLabel: "BCF-Issue-Tracking",
            targetBadge: "ÜBERGABEPAKET",
            targetLabel: "Geprüfte Deliverables"
          }
        }
      ]
    },
    engineeringOutcomes: {
      tag: "ENGINEERING-ERGEBNISSE",
      headline: "Mehr Kontrolle im gesamten BIM-Lieferprozess.",
      subtitle: "Praxisnahe Engineering-Workflows unterstützen Teams dabei, wiederkehrende Aufgaben zu reduzieren, die Konsistenz der Modellinformationen zu verbessern und die bestehende BIM-Umgebung optimal zu nutzen. Das Vorgehen und die Ergebnisse richten sich nach den jeweiligen Projektanforderungen.",
      labels: {
        canvasLabel: "ENGINEERING-WIRKUNGS-CANVAS",
        interactiveNote: "Wählen Sie ein Ergebnis, um die Workflow-Architektur zu prüfen",
        activeFocus: "AKTIVER FOKUS",
        inspectButton: "Workflow prüfen",
        selectedStatus: "Aktiv",
        outcome1: {
          manualHeading: "Manuelle Arbeitsschritte",
          items: [
            { name: "Parameterübertragung", code: "01" },
            { name: "Repetitive Planprüfung", code: "02" },
            { name: "Namensprüfung", code: "03" }
          ],
          routineBadge: "AUTOMATISIERUNG",
          routineTitle: "Definierte Routine",
          routineDesc: "Gezielte Skripte & Batch-Regeln",
          gateBadge: "KONTROLLGATE",
          gateTitle: "Fachliche Prüfung",
          gateDesc: "Supervision & Entscheidungen",
          footerLeft: "WORKFLOW-STRUKTUR",
          footerRight: "BETREUTE AUTOMATISIERUNG"
        },
        outcome2: {
          rulesHeading: "Rahmenwerk für Regeldefinition",
          reportHeading: "PRÜFBERICHT ABWEICHUNGEN",
          reportStatus: "PRÜFPROZESS",
          exceptions: [
            { name: "Inkonsistente Parametertypen", tag: "ERKANNT" },
            { name: "Fehlende Klassifizierungstags", tag: "MARKIERT" },
            { name: "Abweichende Namenssyntax", tag: "ERFASST" }
          ],
          reportNote: "Klare Kriterien machen vage Modellfragen zu konkreten, prüfbaren Aufgaben.",
          footerLeft: "INFORMATIONSQUALITÄT",
          footerRight: "STRUKTURIERTER REPORT"
        },
        outcome3: {
          envHeading: "Bestehende Umgebungen",
          envRvt: "Autodesk Revit",
          envRvtSub: "Native API & Parameter-Workflows",
          envIfc: "OpenBIM IFC4",
          envIfcSub: "Herstellerneutraler Modellaustausch",
          envBcf: "Issue-Tracking",
          envBcfSub: "Offene Fehlerkoordination",
          coreHeading: "VERNETZTE WORKFLOW-STRUKTUR",
          coreBadge: "OFFENES ÖKOSYSTEM",
          disciplinesLabel: "DISZIPLINEN",
          disciplinesVal: "ARC · STR · MEP",
          interfaceLabel: "SCHNITTSTELLE",
          interfaceVal: "Python / C# / API",
          coreNote: "Lösungen fügen sich in bestehende Software ein und vermeiden unnötige Umbrüche.",
          footerLeft: "ÖKOSYSTEM-INTEGRATION",
          footerRight: "PRAXISNAHE ANPASSUNG"
        },
        mobileSummaries: [
          "PROZESS: WIEDERKEHREND → ROUTINE → PRÜFUNG",
          "QUALITÄT: REGELN → AUDIT → PRÜFBARER REPORT",
          "INTEGRATION: WORKFLOW REVIT + IFC + BCF"
        ]
      },
      columns: [
        {
          id: "efficiency",
          num: "01",
          icon: "Workflow",
          category: "WORKFLOW-EFFIZIENZ",
          title: "Weniger wiederkehrende Aufgaben",
          desc: "Strukturierte Prüfungen und gezielte Revit-Automatisierung können repetitive manuelle Schritte reduzieren, sodass sich Ingenieurteams stärker auf Fachkoordination, Modellprüfung und projektspezifische Entscheidungen konzentrieren können.",
          topics: [
            "Gezielte Automatisierung",
            "Wiederholbare Abläufe",
            "Fachliche Prüfung"
          ],
          diagram: {
            title: "PROZESSABLAUF",
            badge: "STRUKTURIERT",
            steps: [
              { label: "Wiederholte Aufgaben", tag: "QUELLE" },
              { label: "Definierte Routinen", tag: "AUTO" },
              { label: "Fachliche Prüfung", tag: "PRÜFUNG" }
            ]
          }
        },
        {
          id: "quality",
          num: "02",
          icon: "ShieldCheck",
          category: "INFORMATIONSQUALITÄT",
          title: "Konsistentere Modellinformationen",
          desc: "Definierte Benennungs-, Parameter-, Klassifizierungs- und Prüfregeln machen Abweichungen schneller erkennbar und ermöglichen transparente, überprüfbare BIM-Lieferobjekte.",
          topics: [
            "Modell-QA/QC",
            "Informationsanforderungen",
            "Transparenz von Fehlern"
          ],
          diagram: {
            title: "INFORMATIONS_PRÜFUNG",
            badge: "KONSISTENZ",
            fields: [
              { name: "Syntax & Benennung", tag: "REGEL" },
              { name: "Parametersätze", tag: "CHECK" },
              { name: "Klassifizierung", tag: "SCHEMA" }
            ]
          }
        },
        {
          id: "integration",
          num: "03",
          icon: "Boxes",
          category: "WORKFLOW-INTEGRATION",
          title: "Auf bestehende BIM-Tools abgestimmt",
          desc: "Projektspezifische Lösungen fügen sich nahtlos in bestehende Revit-, IFC- und Fachkoordinationsprozesse ein, um Arbeitsabläufe zu verbessern, ohne vertraute Software oder Arbeitsweisen zu ersetzen.",
          topics: [
            "Revit-Workflows",
            "OpenBIM / IFC",
            "Praktische Integration"
          ],
          diagram: {
            title: "INTEGRIERTE_UMGEBUNG",
            badge: "OPENBIM",
            nodes: [
              { code: "RVT", label: "Revit API", tag: "FLUSS" },
              { code: "IFC", label: "IFC4-Schema", tag: "FLUSS" },
              { code: "KOORD", label: "Koordinierter Fluss", tag: "FLUSS" }
            ]
          }
        }
      ]
    },
    executionArchitecture: executionArchitecture.de,
    integrationPathways: integrationPathways.de,
    systemBenchmarks: systemBenchmarks.de
  }
};
