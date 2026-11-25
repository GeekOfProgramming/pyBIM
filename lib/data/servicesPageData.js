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
      tag: "PHASE III · FUTURE R&D",
      headline: "Research into private AI for BIM.",
      description: "We are exploring how locally operated AI could support engineering workflows while keeping project information within client-controlled environments. Dedicated development will begin after Phase II is completed and fully validated. We welcome input from teams with specific data control, security and automation requirements.",
      subtitle: "Research into locally operated AI for engineering workflows. Dedicated development follows Phase II completion and final validation.",
      buttonText: "Share Future Requirements",
      buttonHref: "/contact#priority-queue",
      microcopy: "Expression of interest only. No commercial availability, guaranteed access or announced release date.",
      diagram: {
        conceptualArchitecture: "CONCEPTUAL ARCHITECTURE",
        engineeringData: "ENGINEERING DATA",
        engineeringDataSub: "Revit · IFC · Model Data",
        privateAiCore: "PRIVATE AI CORE",
        privateAiCoreSub: "Local Inference",
        bimWorkflows: "BIM WORKFLOWS",
        bimWorkflowsSub: "Engineer-Supervised Automation",
        plannedInfrastructure: "RESEARCH CONCEPT",
        coreBadge: "CONCEPTUAL MODEL",
        inBadge: "INPUT // 01",
        outBadge: "OUTPUT // 02"
      }
    },
    coreCapabilities: {
      tag: "BIM ENGINEERING CAPABILITIES",
      headline: "Engineering expertise, supported by digital tools.",
      subtitle: "We combine specialist BIM modeling, technical model verification, multidisciplinary coordination and purpose-built automation to support project-specific engineering requirements and digital deliverables.",
      schematicNotice: "Illustrative engineering schema",
      exchangeStandard: "openBIM information exchange",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Model Quality & Information Verification",
          desc: "We review model geometry, parameters, naming conventions, classifications and information completeness against agreed project requirements, considering ISO 19650 and the applicable EIR and BEP.",
          topics: [
            "Model QA/QC",
            "EIR / BEP",
            "IFC Data Verification"
          ],
          diagram: {
            title: "MODEL VERIFICATION",
            badge: "PROJECT RULES",
            statusLabel: "INFORMATION CHECK",
            outputSummary: "MODEL VERIFICATION REPORT",
            srDescription: "Illustrative model verification schema showing checks of project naming conventions, IFC property sets and project-specific classification requirements.",
            items: [
              { label: "Naming conventions", tag: "PROJECT RULE", type: "FORMAT" },
              { label: "IFC property sets", tag: "DATA CHECK", type: "PROPERTIES" },
              { label: "Project classification", tag: "CLASSIFICATION RULE", type: "TAXONOMY" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Revit Automation & Parameter Management",
          desc: "We develop project-specific tools using the Revit API, Python and C# to automate repetitive modeling tasks, manage parameters, process model information and support engineering documentation.",
          topics: [
            "Revit API",
            "Python / C#",
            "Computational Design"
          ],
          diagram: {
            title: "REVIT AUTOMATION WORKFLOW",
            badge: "REVIT API",
            runtimeBadge: "AUTOMATION",
            modelLabel: "Revit Model",
            modelSub: "Elements & Instances",
            codeLabel: "Python & C# Tools",
            codeSub: "Revit API Routines",
            outputLabel: "Parameter Updates",
            outputSub: "Updated Model Data",
            caption: "Rule-based parameter updates and technical review",
            srDescription: "Illustrative Revit automation workflow connecting model elements, Python and C# routines, and controlled updates to model information."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Multidisciplinary BIM Coordination",
          desc: "We coordinate architectural, structural and MEP models, review technical interfaces, identify potential clashes and support structured information exchange within the agreed project CDE.",
          topics: [
            "BIM Coordination",
            "openBIM / IFC / BCF",
            "CDE Workflows"
          ],
          diagram: {
            title: "MULTIDISCIPLINARY COORDINATION",
            badge: "openBIM",
            coordinationZone: "FEDERATED MODEL REVIEW",
            srDescription: "Illustrative coordination workflow connecting architectural, structural and MEP discipline models through federated model review and IFC and BCF information exchange.",
            disciplines: [
              { code: "ARC", name: "Architecture", role: "Architectural Model" },
              { code: "STR", name: "Structure", role: "Structural Model" },
              { code: "MEP", name: "MEP", role: "Building Services Model" }
            ],
            output: "COORDINATED IFC MODELS & BCF ISSUES"
          }
        }
      ],
      buttonText: "Discuss Your BIM Requirements",
      buttonHref: "/contact",
      microcopy: "Tell us about your project, coordination requirements or automation needs. We will discuss a suitable scope of engineering services."
    },
    executionPipeline: {
      tag: "BIM ENGINEERING PROCESS",
      headline: "From technical requirements to coordinated BIM deliverables.",
      subtitle: "Our engineering process combines requirements analysis, execution planning, specialist BIM modeling, coordination and technical quality reviews. Each stage is adapted to the agreed scope, information requirements and delivery milestones.",
      labels: {
        outputLabel: "TYPICAL DELIVERABLE",
        illustrativeLabel: "ILLUSTRATIVE PROCESS",
        mapTitle: "BIM DELIVERY PROCESS"
      },
      steps: [
        {
          num: "01",
          mapLabel: "REQUIREMENTS",
          title: "Analyze project requirements.",
          desc: "Review available drawings, discipline models, information requirements and the existing BIM environment. Define the technical scope and review criteria, considering ISO 19650 and applicable EIR and BEP requirements.",
          output: "Agreed technical scope and information requirements",
          srDescription: "Illustrative requirements analysis connecting project documentation and applicable information requirements to the agreed technical scope and review criteria.",
          artifact: {
            badge: "STAGE // 01",
            heading: "REQUIREMENTS & SCOPE",
            actionLabel: "ANALYSIS",
            tags: ["Project documentation", "Information requirements", "Technical scope"]
          },
          diagram: {
            sourceBadge: "PROJECT INPUT",
            sourceLabel: "Drawings · Models · EIR / BEP",
            targetBadge: "TECHNICAL SCOPE",
            targetLabel: "Agreed Scope & Review Criteria"
          }
        },
        {
          num: "02",
          mapLabel: "PLANNING",
          title: "Define the execution workflow.",
          desc: "Establish modeling conventions, information mapping, coordination procedures and model verification rules. Identify tasks suitable for engineering automation.",
          output: "Execution plan and model verification criteria",
          srDescription: "Illustrative execution planning workflow connecting modeling conventions, verification criteria and the planning of engineering tasks.",
          artifact: {
            badge: "STAGE // 02",
            heading: "EXECUTION PLANNING",
            actionLabel: "PLANNING",
            tags: ["Modeling rules", "Verification criteria", "Task planning"]
          },
          diagram: {
            node1Badge: "MODELING",
            node1Label: "Modeling Conventions",
            node2Badge: "VERIFICATION",
            node2Label: "Model Review Rules",
            node3Badge: "EXECUTION PLAN",
            node3Label: "Task & Automation Planning"
          }
        },
        {
          num: "03",
          mapLabel: "EXECUTION",
          title: "Develop and coordinate BIM models.",
          desc: "Develop architectural, structural and MEP models, coordinate discipline interfaces and perform technical checks. Use Python, C# and Revit API tools where appropriate.",
          output: "Developed BIM models and coordination records",
          srDescription: "Illustrative engineering execution workflow connecting discipline-specific BIM modeling with multidisciplinary coordination and technical checks.",
          artifact: {
            badge: "STAGE // 03",
            heading: "MODELING & COORDINATION",
            actionLabel: "EXECUTION",
            tags: ["Discipline models", "BIM coordination", "Engineering automation"]
          },
          diagram: {
            sourceBadge: "DISCIPLINE MODELS",
            sourceLabel: "Architecture · Structure · MEP",
            targetBadge: "COORDINATION",
            targetLabel: "Coordinated Models & Issue Records"
          }
        },
        {
          num: "04",
          mapLabel: "HANDOVER",
          title: "Verify and prepare digital handover.",
          desc: "Review model geometry, information completeness and deliverables against agreed requirements. Document outstanding issues and prepare the required models, drawings and reports.",
          output: "Reviewed models, issue records and handover package",
          srDescription: "Illustrative final verification and digital handover workflow showing model review, coordination issue records and preparation of the agreed project deliverables.",
          artifact: {
            badge: "STAGE // 04",
            heading: "VERIFICATION & HANDOVER",
            actionLabel: "HANDOVER",
            tags: ["Model verification", "BCF issues", "Digital deliverables"]
          },
          diagram: {
            sourceBadge: "MODEL REVIEW",
            sourceLabel: "Verification & BCF Issue Records",
            targetBadge: "HANDOVER PACKAGE",
            targetLabel: "Reviewed Models & Documentation"
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
      tag: "FASE III · RICERCA E SVILUPPO",
      headline: "Ricerca sull'IA privata per il BIM.",
      description: "Studiamo come l'intelligenza artificiale operante in locale possa supportare i processi ingegneristici, mantenendo le informazioni di progetto in ambienti controllati dal cliente. Lo sviluppo dedicato inizierà dopo il completamento e la validazione finale della Fase II. Raccogliamo le esigenze dei gruppi di lavoro in materia di controllo dei dati, sicurezza e automazione.",
      subtitle: "Ricerca sull'intelligenza artificiale operante in locale per i processi ingegneristici. Lo sviluppo dedicato seguirà il completamento e la validazione finale della Fase II.",
      buttonText: "Condividete le vostre esigenze",
      buttonHref: "/contact#priority-queue",
      microcopy: "Manifestazione di interesse non vincolante. Nessuna disponibilità commerciale, garanzia di accesso o data di lancio annunciata.",
      diagram: {
        conceptualArchitecture: "ARCHITETTURA CONCETTUALE",
        engineeringData: "DATI DI PROGETTO",
        engineeringDataSub: "Revit · IFC · Dati dei modelli",
        privateAiCore: "NUCLEO IA PRIVATO",
        privateAiCoreSub: "Inferenza locale",
        bimWorkflows: "PROCESSI BIM",
        bimWorkflowsSub: "Automazione con supervisione tecnica",
        plannedInfrastructure: "CONCETTO DI RICERCA",
        coreBadge: "MODELLO CONCETTUALE",
        inBadge: "INGRESSO // 01",
        outBadge: "USCITA // 02"
      }
    },
    coreCapabilities: {
      tag: "COMPETENZE SPECIALISTICHE BIM",
      headline: "Competenze ingegneristiche e strumenti digitali.",
      subtitle: "Integriamo modellazione BIM specialistica, verifiche tecniche dei modelli, coordinamento multidisciplinare e automazione su misura per rispondere ai requisiti informativi e alle esigenze di consegna di ciascun progetto.",
      schematicNotice: "Schema tecnico illustrativo",
      exchangeStandard: "Scambio informativo openBIM",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Qualità dei modelli e verifica informativa",
          desc: "Verifichiamo la geometria, i parametri, le convenzioni di denominazione, le classificazioni e la completezza informativa dei modelli rispetto ai requisiti concordati, considerando UNI 11337, UNI EN ISO 19650, il CI e il pGI, ove applicabili.",
          topics: [
            "Verifica dei modelli",
            "CI / pGI",
            "Verifica dei dati IFC"
          ],
          diagram: {
            title: "VERIFICA DEI MODELLI",
            badge: "REGOLE DI PROGETTO",
            statusLabel: "VERIFICA INFORMATIVA",
            outputSummary: "RAPPORTO DI VERIFICA DEI MODELLI",
            srDescription: "Schema illustrativo della verifica dei modelli, comprendente il controllo delle convenzioni di denominazione, degli insiemi di proprietà IFC e delle classificazioni previste dal progetto.",
            items: [
              { label: "Convenzioni di denominazione", tag: "REGOLA DI PROGETTO", type: "FORMATO" },
              { label: "Insiemi di proprietà IFC", tag: "VERIFICA DATI", type: "PROPRIETÀ" },
              { label: "Classificazione di progetto", tag: "REGOLA DI CLASSIFICAZIONE", type: "TASSONOMIA" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Automazione Revit e gestione dei parametri",
          desc: "Sviluppiamo strumenti specifici per il progetto mediante API Revit, Python e C#, per automatizzare le attività ripetitive di modellazione, gestire i parametri, elaborare le informazioni e supportare la produzione degli elaborati tecnici.",
          topics: [
            "API Revit",
            "Python / C#",
            "Progettazione computazionale"
          ],
          diagram: {
            title: "PROCESSO DI AUTOMAZIONE REVIT",
            badge: "API REVIT",
            runtimeBadge: "AUTOMAZIONE",
            modelLabel: "Modello Revit",
            modelSub: "Elementi e istanze",
            codeLabel: "Strumenti Python e C#",
            codeSub: "Routine API Revit",
            outputLabel: "Aggiornamento dei parametri",
            outputSub: "Dati del modello aggiornati",
            caption: "Aggiornamenti basati su regole e verifica tecnica",
            srDescription: "Schema illustrativo dell'automazione Revit che collega gli elementi del modello, le routine Python e C# e gli aggiornamenti controllati delle informazioni."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Coordinamento BIM multidisciplinare",
          desc: "Coordiniamo i modelli architettonici, strutturali e impiantistici, analizziamo le interfacce tecniche, verifichiamo le potenziali interferenze e supportiamo lo scambio informativo nell'ACDat di progetto concordato.",
          topics: [
            "Coordinamento BIM",
            "openBIM / IFC / BCF",
            "Processi nell'ACDat"
          ],
          diagram: {
            title: "COORDINAMENTO MULTIDISCIPLINARE",
            badge: "openBIM",
            coordinationZone: "VERIFICA DEL MODELLO FEDERATO",
            srDescription: "Schema illustrativo del coordinamento tra modelli architettonici, strutturali e impiantistici mediante verifica del modello federato e scambio informativo IFC e BCF.",
            disciplines: [
              { code: "ARC", name: "Architettura", role: "Modello architettonico" },
              { code: "STR", name: "Strutture", role: "Modello strutturale" },
              { code: "IMP", name: "Impianti", role: "Modello impiantistico" }
            ],
            output: "MODELLI IFC COORDINATI E SEGNALAZIONI BCF"
          }
        }
      ],
      buttonText: "Parliamo delle vostre esigenze BIM",
      buttonHref: "/contact",
      microcopy: "Indicate le esigenze del progetto, del coordinamento BIM o dell'automazione. Valuteremo insieme le prestazioni tecniche più appropriate."
    },
    executionPipeline: {
      tag: "PROCESSO OPERATIVO BIM",
      headline: "Dai requisiti tecnici agli elaborati BIM coordinati.",
      subtitle: "Il nostro processo operativo integra analisi dei requisiti, pianificazione delle attività, modellazione BIM specialistica, coordinamento e verifiche tecniche. Ogni fase viene adattata alle prestazioni concordate, ai requisiti informativi e alle scadenze di consegna.",
      labels: {
        outputLabel: "ELABORATO PREVISTO",
        illustrativeLabel: "PROCESSO ILLUSTRATIVO",
        mapTitle: "PROCESSO DI CONSEGNA BIM"
      },
      steps: [
        {
          num: "01",
          mapLabel: "REQUISITI",
          title: "Analisi dei requisiti di progetto.",
          desc: "Esaminiamo gli elaborati disponibili, i modelli disciplinari, i requisiti informativi e l'ambiente BIM esistente. Definiamo le prestazioni tecniche e i criteri di verifica, considerando UNI 11337, UNI EN ISO 19650, il CI e l'oGI o il pGI, ove applicabili.",
          output: "Prestazioni tecniche e requisiti informativi concordati",
          srDescription: "Schema illustrativo dell'analisi dei requisiti, che collega la documentazione progettuale e i requisiti informativi applicabili alle prestazioni tecniche e ai criteri di verifica concordati.",
          artifact: {
            badge: "FASE // 01",
            heading: "REQUISITI E PRESTAZIONI",
            actionLabel: "ANALISI",
            tags: ["Documentazione progettuale", "Requisiti informativi", "Prestazioni tecniche"]
          },
          diagram: {
            sourceBadge: "DOCUMENTAZIONE INIZIALE",
            sourceLabel: "Elaborati · Modelli · CI / oGI / pGI",
            targetBadge: "PRESTAZIONI TECNICHE",
            targetLabel: "Prestazioni e criteri di verifica concordati"
          }
        },
        {
          num: "02",
          mapLabel: "PIANIFICAZIONE",
          title: "Definizione del processo operativo.",
          desc: "Definiamo le convenzioni di modellazione, la mappatura delle informazioni, le procedure di coordinamento e le regole di verifica dei modelli. Individuiamo le attività adatte all'automazione.",
          output: "Piano operativo e criteri di verifica dei modelli",
          srDescription: "Schema illustrativo della pianificazione operativa che collega le convenzioni di modellazione, i criteri di verifica e la pianificazione delle attività tecniche.",
          artifact: {
            badge: "FASE // 02",
            heading: "PIANIFICAZIONE OPERATIVA",
            actionLabel: "PIANIFICAZIONE",
            tags: ["Regole di modellazione", "Criteri di verifica", "Pianificazione delle attività"]
          },
          diagram: {
            node1Badge: "MODELLAZIONE",
            node1Label: "Convenzioni di modellazione",
            node2Badge: "VERIFICA",
            node2Label: "Regole di verifica dei modelli",
            node3Badge: "PIANO OPERATIVO",
            node3Label: "Attività e automazione"
          }
        },
        {
          num: "03",
          mapLabel: "ESECUZIONE",
          title: "Modellazione e coordinamento BIM.",
          desc: "Sviluppiamo i modelli architettonici, strutturali e impiantistici, coordiniamo le interfacce tra discipline ed eseguiamo verifiche tecniche. Utilizziamo strumenti Python, C# e API Revit, ove opportuno.",
          output: "Modelli BIM sviluppati ed elaborati di coordinamento",
          srDescription: "Schema illustrativo dell'esecuzione delle prestazioni BIM, che collega la modellazione disciplinare al coordinamento multidisciplinare e alle verifiche tecniche.",
          artifact: {
            badge: "FASE // 03",
            heading: "MODELLAZIONE E COORDINAMENTO",
            actionLabel: "ESECUZIONE",
            tags: ["Modelli disciplinari", "Coordinamento BIM", "Automazione dei processi"]
          },
          diagram: {
            sourceBadge: "MODELLI DISCIPLINARI",
            sourceLabel: "Architettura · Strutture · Impianti",
            targetBadge: "COORDINAMENTO",
            targetLabel: "Modelli coordinati e registro delle criticità"
          }
        },
        {
          num: "04",
          mapLabel: "CONSEGNA",
          title: "Verifica e predisposizione della consegna digitale.",
          desc: "Verifichiamo la geometria, la completezza informativa dei modelli e gli elaborati rispetto ai requisiti concordati. Documentiamo le criticità ancora aperte e predisponiamo i modelli, gli elaborati grafici e i rapporti richiesti.",
          output: "Modelli verificati, registro delle criticità e pacchetto di consegna",
          srDescription: "Schema illustrativo delle verifiche finali e della consegna digitale, comprendente il controllo dei modelli, la documentazione delle criticità e la predisposizione degli elaborati concordati.",
          artifact: {
            badge: "FASE // 04",
            heading: "VERIFICA E CONSEGNA",
            actionLabel: "CONSEGNA",
            tags: ["Verifica dei modelli", "Segnalazioni BCF", "Elaborati digitali"]
          },
          diagram: {
            sourceBadge: "VERIFICA DEI MODELLI",
            sourceLabel: "Verifiche e segnalazioni BCF",
            targetBadge: "PACCHETTO DI CONSEGNA",
            targetLabel: "Modelli ed elaborati verificati"
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
      tag: "PHASE III · FORSCHUNG UND ENTWICKLUNG",
      headline: "Forschung zu privater KI für BIM.",
      description: "Wir untersuchen, wie lokal betriebene KI ingenieurtechnische Arbeitsabläufe unterstützen kann, während Projektinformationen in kundenseitig kontrollierten Umgebungen verbleiben. Die eigenständige Entwicklung beginnt nach Abschluss und abschließender Validierung von Phase II. Dabei berücksichtigen wir Anforderungen von Projektteams an Datenkontrolle, Sicherheit und Automatisierung.",
      subtitle: "Forschung zu lokal betriebener KI für ingenieurtechnische Arbeitsabläufe. Die eigenständige Entwicklung folgt auf den Abschluss und die abschließende Validierung von Phase II.",
      buttonText: "Zukünftige Anforderungen mitteilen",
      buttonHref: "/contact#priority-queue",
      microcopy: "Unverbindliche Interessenbekundung. Keine kommerzielle Verfügbarkeit, keine Zugangsgarantie und kein angekündigter Veröffentlichungstermin.",
      diagram: {
        conceptualArchitecture: "KONZEPTIONELLE ARCHITEKTUR",
        engineeringData: "PROJEKTDATEN",
        engineeringDataSub: "Revit · IFC · Modelldaten",
        privateAiCore: "PRIVATER KI-KERN",
        privateAiCoreSub: "Lokale Inferenz",
        bimWorkflows: "BIM-ARBEITSABLÄUFE",
        bimWorkflowsSub: "Automatisierung mit fachlicher Aufsicht",
        plannedInfrastructure: "FORSCHUNGSKONZEPT",
        coreBadge: "KONZEPTMODELL",
        inBadge: "EINGANG // 01",
        outBadge: "AUSGANG // 02"
      }
    },
    coreCapabilities: {
      tag: "BIM-FACHKOMPETENZEN",
      headline: "Ingenieurkompetenz und digitale Werkzeuge.",
      subtitle: "Wir verbinden BIM-Fachmodellierung, technische Modellprüfung, fachübergreifende Koordination und individuelle Automatisierung, um projektspezifische Informationsanforderungen zu erfüllen und digitale Lieferobjekte zu erstellen.",
      schematicNotice: "Schematische technische Darstellung",
      exchangeStandard: "openBIM-Informationsaustausch",
      exchangeFormat: "IFC4 · BCF",
      cards: [
        {
          num: "01",
          id: "validation",
          title: "Modellqualität und Informationsprüfung",
          desc: "Wir prüfen Modellgeometrie, Parameter, Benennungsregeln, Klassifikationen und Informationsvollständigkeit anhand der vereinbarten Projektanforderungen unter Berücksichtigung von DIN EN ISO 19650, VDI 2552 sowie der anwendbaren AIA und des BAP.",
          topics: [
            "Modellprüfung",
            "AIA / BAP",
            "IFC-Datenprüfung"
          ],
          diagram: {
            title: "MODELLPRÜFUNG",
            badge: "PROJEKTREGELN",
            statusLabel: "INFORMATIONSPRÜFUNG",
            outputSummary: "MODELLPRÜFBERICHT",
            srDescription: "Schematische Darstellung der Modellprüfung anhand projektspezifischer Benennungsregeln, IFC-Eigenschaftssätze und Klassifikationsanforderungen.",
            items: [
              { label: "Benennungsregeln", tag: "PROJEKTREGEL", type: "FORMAT" },
              { label: "IFC-Eigenschaftssätze", tag: "DATENPRÜFUNG", type: "EIGENSCHAFTEN" },
              { label: "Projektklassifikation", tag: "KLASSIFIKATIONSREGEL", type: "TAXONOMIE" }
            ]
          }
        },
        {
          num: "02",
          id: "automation",
          title: "Revit-Automatisierung und Parameterverwaltung",
          desc: "Wir entwickeln projektspezifische Werkzeuge mit der Revit API, Python und C#, um wiederkehrende Modellierungsaufgaben zu automatisieren, Parameter zu verwalten, Modellinformationen zu verarbeiten und die Erstellung technischer Planunterlagen zu unterstützen.",
          topics: [
            "Revit API",
            "Python / C#",
            "Computational Design"
          ],
          diagram: {
            title: "REVIT-AUTOMATISIERUNG",
            badge: "REVIT API",
            runtimeBadge: "AUTOMATISIERUNG",
            modelLabel: "Revit-Modell",
            modelSub: "Elemente und Instanzen",
            codeLabel: "Python- und C#-Werkzeuge",
            codeSub: "Revit-API-Routinen",
            outputLabel: "Parameteraktualisierung",
            outputSub: "Aktualisierte Modelldaten",
            caption: "Regelbasierte Aktualisierung und fachliche Prüfung",
            srDescription: "Schematischer Revit-Automatisierungsablauf zur Verknüpfung von Modellelementen, Python- und C#-Routinen sowie kontrollierten Aktualisierungen der Modellinformationen."
          }
        },
        {
          num: "03",
          id: "workflows",
          title: "Fachübergreifende BIM-Koordination",
          desc: "Wir koordinieren Architektur-, Tragwerks- und TGA-Modelle, prüfen technische Schnittstellen und mögliche Kollisionen und unterstützen den strukturierten Informationsaustausch im vereinbarten Projekt-CDE.",
          topics: [
            "BIM-Koordination",
            "openBIM / IFC / BCF",
            "CDE-Arbeitsabläufe"
          ],
          diagram: {
            title: "FACHÜBERGREIFENDE KOORDINATION",
            badge: "openBIM",
            coordinationZone: "PRÜFUNG DES KOORDINATIONSMODELLS",
            srDescription: "Schematischer Koordinationsablauf für Architektur-, Tragwerks- und TGA-Fachmodelle mittels Koordinationsmodellprüfung und IFC- und BCF-Informationsaustausch.",
            disciplines: [
              { code: "ARC", name: "Architektur", role: "Architekturmodell" },
              { code: "STR", name: "Tragwerk", role: "Tragwerksmodell" },
              { code: "TGA", name: "TGA", role: "TGA-Fachmodell" }
            ],
            output: "KOORDINIERTE IFC-MODELLE UND BCF-MELDUNGEN"
          }
        }
      ],
      buttonText: "BIM-Anforderungen besprechen",
      buttonHref: "/contact",
      microcopy: "Teilen Sie uns Ihre Projekt-, Koordinations- oder Automatisierungsanforderungen mit. Gemeinsam stimmen wir den geeigneten Leistungsumfang ab."
    },
    executionPipeline: {
      tag: "BIM-PROJEKTABLAUF",
      headline: "Von technischen Anforderungen zu koordinierten BIM-Lieferobjekten.",
      subtitle: "Unser BIM-Projektablauf verbindet Anforderungsanalyse, Arbeitsplanung, Fachmodellierung, fachübergreifende Koordination und technische Qualitätsprüfungen. Jede Phase wird an den vereinbarten Leistungsumfang, die Informationsanforderungen und die Übergabetermine angepasst.",
      labels: {
        outputLabel: "TYPISCHES ERGEBNIS",
        illustrativeLabel: "SCHEMATISCHER ABLAUF",
        mapTitle: "BIM-ÜBERGABEPROZESS"
      },
      steps: [
        {
          num: "01",
          mapLabel: "ANFORDERUNGEN",
          title: "Projektanforderungen analysieren.",
          desc: "Wir prüfen vorhandene Planunterlagen, Fachmodelle, Informationsanforderungen und die bestehende BIM-Umgebung. Wir legen den technischen Leistungsumfang und die Prüfkriterien unter Berücksichtigung von DIN EN ISO 19650, VDI 2552 sowie der anwendbaren AIA und des BAP fest.",
          output: "Abgestimmter Leistungsumfang und Informationsanforderungen",
          srDescription: "Schematische Darstellung der Anforderungsanalyse zur Verknüpfung von Projektunterlagen und anwendbaren Informationsanforderungen mit dem vereinbarten Leistungsumfang und den Prüfkriterien.",
          artifact: {
            badge: "PHASE // 01",
            heading: "ANFORDERUNGEN UND LEISTUNGSUMFANG",
            actionLabel: "ANALYSE",
            tags: ["Projektunterlagen", "Informationsanforderungen", "Leistungsumfang"]
          },
          diagram: {
            sourceBadge: "PROJEKTGRUNDLAGEN",
            sourceLabel: "Planunterlagen · Modelle · AIA / BAP",
            targetBadge: "LEISTUNGSUMFANG",
            targetLabel: "Abgestimmte Leistungen und Prüfkriterien"
          }
        },
        {
          num: "02",
          mapLabel: "PLANUNG",
          title: "Arbeitsabläufe festlegen.",
          desc: "Wir definieren Modellierungskonventionen, Informationszuordnungen, Koordinationsverfahren und Regeln zur Modellprüfung. Geeignete Aufgaben werden für die Automatisierung identifiziert.",
          output: "Arbeitsplan und Kriterien zur Modellprüfung",
          srDescription: "Schematische Darstellung der Arbeitsplanung zur Verknüpfung von Modellierungskonventionen, Prüfkriterien und technischen Aufgaben.",
          artifact: {
            badge: "PHASE // 02",
            heading: "ARBEITSPLANUNG",
            actionLabel: "PLANUNG",
            tags: ["Modellierungsregeln", "Prüfkriterien", "Aufgabenplanung"]
          },
          diagram: {
            node1Badge: "MODELLIERUNG",
            node1Label: "Modellierungskonventionen",
            node2Badge: "PRÜFUNG",
            node2Label: "Regeln zur Modellprüfung",
            node3Badge: "ARBEITSPLAN",
            node3Label: "Aufgaben und Automatisierung"
          }
        },
        {
          num: "03",
          mapLabel: "BEARBEITUNG",
          title: "BIM-Fachmodelle erstellen und koordinieren.",
          desc: "Wir erstellen Architektur-, Tragwerks- und TGA-Modelle, koordinieren fachübergreifende Schnittstellen und führen technische Prüfungen durch. Bei Bedarf setzen wir Python, C# und Revit-API-Werkzeuge ein.",
          output: "Ausgearbeitete BIM-Fachmodelle und Koordinationsprotokolle",
          srDescription: "Schematischer BIM-Bearbeitungsablauf zur Verknüpfung der Fachmodellierung mit fachübergreifender Koordination und technischen Prüfungen.",
          artifact: {
            badge: "PHASE // 03",
            heading: "MODELLIERUNG UND KOORDINATION",
            actionLabel: "BEARBEITUNG",
            tags: ["Fachmodelle", "BIM-Koordination", "Automatisierung"]
          },
          diagram: {
            sourceBadge: "FACHMODELLE",
            sourceLabel: "Architektur · Tragwerk · TGA",
            targetBadge: "KOORDINATION",
            targetLabel: "Koordinierte Modelle und Koordinationsprotokolle"
          }
        },
        {
          num: "04",
          mapLabel: "ÜBERGABE",
          title: "Prüfen und digitale Übergabe vorbereiten.",
          desc: "Wir prüfen Modellgeometrie, Informationsvollständigkeit und Lieferobjekte anhand der vereinbarten Anforderungen. Offene Koordinationspunkte werden dokumentiert und die erforderlichen Modelle, Planunterlagen und Berichte vorbereitet.",
          output: "Geprüfte Modelle, Koordinationsprotokolle und Übergabepaket",
          srDescription: "Schematische Darstellung der abschließenden Modellprüfung und digitalen Übergabe mit dokumentierten Koordinationspunkten und vorbereiteten Projektlieferobjekten.",
          artifact: {
            badge: "PHASE // 04",
            heading: "PRÜFUNG UND ÜBERGABE",
            actionLabel: "ÜBERGABE",
            tags: ["Modellprüfung", "BCF-Meldungen", "Digitale Lieferobjekte"]
          },
          diagram: {
            sourceBadge: "MODELLPRÜFUNG",
            sourceLabel: "Prüfungen und BCF-Meldungen",
            targetBadge: "ÜBERGABEPAKET",
            targetLabel: "Geprüfte Modelle und Planunterlagen"
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
