import { executionArchitecture } from "./services/executionArchitecture";
import { integrationPathways } from "./services/integrationPathways";

export { executionArchitecture, integrationPathways };
export const servicesPageData = {
  en: {
    hero: {
      eyebrow: "BIM ENGINEERING · WORKFLOW AUTOMATION",
      headline1: "Complex BIM Workflows.",
      headline2: "Engineered to Run Better.",
      subheadline: "From demanding BIM deliverables to custom Revit automation, pyBIM helps architecture, engineering, and construction teams reduce repetitive work, improve model consistency, and deliver with greater control.",
      primaryCta: "Discuss Your Project",
      secondaryCta: "Explore Our Capabilities",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "ISO 19650-Aligned Workflows",
        "Autodesk Revit API & IFC4",
        "Deterministic QA / QC"
      ],
      pipeline: {
        badge: "ILLUSTRATIVE WORKFLOW",
        monitorLabel: "WORKFLOW_ARCHITECTURE // 4 INTEGRATED PHASES",
        windowTitle: "pyBIM_ARCHITECTURE // WORKFLOW_SPEC",
        labels: {
          framework: "FRAMEWORK // OPENBIM & API",
          tablistAria: "BIM engineering workflow phases",
          inspectAria: "Inspect phase",
          specOverview: "PHASE SPECIFICATION // ARCHITECTURE",
          pipelineMode: "PROCESS: STRUCTURED DELIVERY",
          activePhase: "ACTIVE PHASE"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "Revit Model Ingestion",
            sub: "Source Geometry & Parameter Sets",
            badge: "INPUT // .RVT / IFC",
            meta: "Geometry & Property Sets",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "Data Validation",
            sub: "Algorithmic QA/QC & Schema Auditing",
            badge: "SCHEMA AUDIT",
            meta: "EIR & ISO 19650 Rules",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Automation Engine",
            sub: "Python & C# Algorithmic Core",
            badge: "EXECUTION CORE",
            meta: "Scripted Parameter Pipelines",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Structured Deliverables",
            sub: "Standardized OpenBIM & Documentation",
            badge: "DELIVERABLES",
            meta: "IFC4 · COBie · Reports",
            icon: "database"
          }
        ],
        logs: [
          "[PHASE 01] Standardized ingestion of Revit elements, properties, and IFC classifications.",
          "[PHASE 02] Rule-based schema validation aligned with project EIR and ISO 19650 guidelines.",
          "[PHASE 03] Execution of algorithmic parameter injection and coordinate auditing via Revit API.",
          "[PHASE 04] Deterministic generation of verified IFC4 models, COBie sheets, and audit dossiers."
        ]
      }
    },
    roadmap: {
      tag: "OUR EXECUTION ROADMAP",
      headline: "Engineering Delivery Today. Intelligent Infrastructure Tomorrow.",
      subtitle: "pyBIM combines practical BIM engineering services with a phased technology roadmap — from hands-on project delivery to connected automation and private AI infrastructure.",
      labels: {
        outcome: "The Outcome",
        execution: "The Execution",
        impact: "The Impact",
        featuredOffering: "FEATURED OFFERING",
        currentOffering: "CURRENT OFFERING",
        softwareRoadmap: "SOFTWARE ROADMAP",
        enterpriseRoadmap: "ENTERPRISE ROADMAP",
        timelineAriaLabel: "Roadmap progression phases",
        progressHeading: "Indicative Development Progress",
        progressNote: "Estimates subject to phased engineering scope"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE 01",
          isPrimary: true,
          statusTag: "AVAILABLE NOW",
          progressPercent: 100,
          title: "Tech-Enabled BIM Services",
          description: "Extend your engineering capacity with BIM delivery, multidisciplinary coordination, model data validation, and tailored Revit automation.",
          outcome: "Reliable BIM deliverables and more consistent engineering workflows.",
          execution: "Technical BIM specialists supported by purpose-built Python, C#, and Revit API tools.",
          impact: "Less repetitive work, clearer quality control, and more predictable project execution.",
          ctaText: "Discuss Your Project",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "PHASE 02",
          isPrimary: false,
          statusTag: "IN DEVELOPMENT",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "Our planned Revit-connected automation platform aims to make repeatable engineering workflows and software-assisted BIM operations more accessible to project teams.",
          outcome: "A unified environment for accessing and managing connected BIM automation capabilities.",
          execution: "Planned Revit integration, reusable workflow modules, and assisted engineering operations.",
          impact: "A more scalable approach to distributing automation across engineering teams.",
          ctaText: "Join Priority Queue",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "PHASE 03",
          isPrimary: false,
          statusTag: "IN DEVELOPMENT",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "Our long-term enterprise roadmap focuses on private AI infrastructure designed for organizations requiring greater control over engineering data and execution environments.",
          outcome: "Deployment options designed around organizational security and infrastructure requirements.",
          execution: "Planned on-premises AI services, local inference, and integration with internal engineering workflows.",
          impact: "Greater organizational control over future AI-assisted BIM processes and data handling.",
          ctaText: "Enterprise Inquiry",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "ENTERPRISE AI · IN DEVELOPMENT",
      headline: "Private AI. Designed Around Your BIM Environment.",
      description: "We're developing enterprise AI infrastructure options that bring local inference and intelligent automation closer to your engineering workflows. Share your deployment, security, and BIM requirements as we shape the next stage of pyBIM.",
      subtitle: "We're developing enterprise AI infrastructure options that bring local inference and intelligent automation closer to your engineering workflows. Share your deployment, security, and BIM requirements as we shape the next stage of pyBIM.",
      buttonText: "Join the Enterprise Priority Queue",
      buttonHref: "/contact#priority-queue",
      microcopy: "Expression of interest only. Product availability and deployment options are subject to further development and technical review.",
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
    systemBenchmarks: {
      tag: "ENGINEERING EVALUATION",
      badge: "PROJECT-SPECIFIC EVALUATION",
      headline: "Clear Criteria. Reviewable Engineering Results.",
      subtitle: "BIM workflows should be assessed against agreed project requirements, available model data, and relevant engineering checks—not universal speed or accuracy promises.",
      methodologyNote: "Evaluation criteria, checks, and reporting methods are defined according to the project scope. The examples below illustrate possible assessment areas, not measured performance results.",
      criteriaLabel: "EVALUATION CRITERIA",
      assessments: [
        {
          id: "workflow-efficiency",
          num: "01",
          category: "WORKFLOW ASSESSMENT",
          title: "Workflow Efficiency",
          desc: "Identify repetitive engineering operations and examine where targeted automation may reduce manual handling while keeping the necessary technical review in place.",
          criteria: [
            "Task Scope",
            "Repeatability",
            "Review Effort"
          ],
          evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
          evidence: "Workflow checklist and technical review notes"
        },
        {
          id: "information-quality",
          num: "02",
          category: "INFORMATION REVIEW",
          title: "Model Information Quality",
          desc: "Review naming rules, required parameters, classification consistency, and documented exceptions against the information requirements agreed for the project.",
          criteria: [
            "Required Fields",
            "Rule Exceptions",
            "Issue Tracking"
          ],
          evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
          evidence: "Model review notes and exception register"
        },
        {
          id: "coordination-handover",
          num: "03",
          category: "DELIVERY REVIEW",
          title: "Coordination & Handover Readiness",
          desc: "Examine documented coordination findings, information exchange requirements, and handover records before preparing relevant deliverables for project-team review.",
          criteria: [
            "Coordination Findings",
            "Information Exchange",
            "Handover Records"
          ],
          evidenceLabel: "POSSIBLE REVIEW EVIDENCE",
          evidence: "Issue records and project handover checklist"
        }
      ]
    }
  },
  it: {
    hero: {
      eyebrow: "INGEGNERIA BIM · AUTOMAZIONE WORKFLOW",
      headline1: "Workflow BIM Complessi.",
      headline2: "Ingegnerizzati per Rendere al Meglio.",
      subheadline: "Dai deliverable BIM più complessi all'automazione personalizzata per Revit, pyBIM supporta i team di architettura, ingegneria e costruzioni nel ridurre il lavoro ripetitivo, migliorare la coerenza dei modelli e consegnare con il massimo controllo.",
      primaryCta: "Discuti il Tuo Progetto",
      secondaryCta: "Esplora le Nostre Competenze",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "Workflow Allineati a ISO 19650",
        "API Autodesk Revit & IFC4",
        "QA / QC Deterministico"
      ],
      pipeline: {
        badge: "WORKFLOW ILLUSTRATIVO",
        monitorLabel: "ARCHITETTURA_WORKFLOW // 4 FASI INTEGRATE",
        windowTitle: "ARCHITETTURA_pyBIM // SPECIFICA_WORKFLOW",
        labels: {
          framework: "FRAMEWORK // OPENBIM & API",
          tablistAria: "Fasi del workflow ingegneristico BIM",
          inspectAria: "Ispeziona fase",
          specOverview: "SPECIFICA DELLA FASE // ARCHITETTURA",
          pipelineMode: "PROCESSO: CONSEGNA STRUTTURATA",
          activePhase: "FASE ATTIVA"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "Ingestione Modello Revit",
            sub: "Geometrie & Set di Parametri",
            badge: "INPUT // .RVT / IFC",
            meta: "Geometria & Set di Proprietà",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "Validazione Dati",
            sub: "QA/QC Algoritmico & Audit Schema",
            badge: "AUDIT SCHEMA",
            meta: "Regole EIR & ISO 19650",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Motore di Automazione",
            sub: "Core Algoritmico Python & C#",
            badge: "CORE DI ESECUZIONE",
            meta: "Pipeline Parametri Scriptata",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Deliverable Strutturati",
            sub: "OpenBIM Standard & Documentazione",
            badge: "DELIVERABLE",
            meta: "IFC4 · COBie · Report",
            icon: "database"
          }
        ],
        logs: [
          "[FASE 01] Ingestione standardizzata di elementi Revit, parametri e classificazioni IFC.",
          "[FASE 02] Validazione dello schema basata su regole allineata alle linee guida EIR e ISO 19650.",
          "[FASE 03] Esecuzione di iniezione algoritmica di parametri e audit di coordinamento via API Revit.",
          "[FASE 04] Generazione deterministica di modelli IFC4 verificati, fogli COBie e dossier di audit."
        ]
      }
    },
    roadmap: {
      tag: "LA NOSTRA ROADMAP DI ESECUZIONE",
      headline: "Deliverable Ingegneristici Oggi. Infrastruttura Intelligente Domani.",
      subtitle: "pyBIM combina servizi avanzati di ingegneria BIM con una roadmap tecnologica a fasi: dalla consegna operativa di progetto all'automazione connessa e all'infrastruttura IA privata.",
      labels: {
        outcome: "Il Risultato",
        execution: "L'Esecuzione",
        impact: "L'Impatto",
        featuredOffering: "OFFERTA IN EVIDENZA",
        currentOffering: "OFFERTA ATTUALE",
        softwareRoadmap: "ROADMAP SOFTWARE",
        enterpriseRoadmap: "ROADMAP ENTERPRISE",
        timelineAriaLabel: "Fasi di progressione della roadmap",
        progressHeading: "Progresso Indicativo di Sviluppo",
        progressNote: "Stime soggette all'ambito ingegneristico di fase"
      },
      cards: [
        {
          num: "01",
          phase: "FASE 01",
          isPrimary: true,
          statusTag: "DISPONIBILE ORA",
          progressPercent: 100,
          title: "Servizi BIM Tech-Enabled",
          description: "Estendi la tua capacità ingegneristica con deliverable BIM, coordinamento multidisciplinare, validazione dati dei modelli e automazione mirata per Revit.",
          outcome: "Deliverable BIM affidabili e workflow ingegneristici più coerenti e controllati.",
          execution: "Specialisti BIM dedicati supportati da strumenti su misura sviluppati in Python, C# e API Revit.",
          impact: "Meno lavoro ripetitivo, controllo qualità più rigoroso ed esecuzione dei progetti più prevedibile.",
          ctaText: "Discuti il Tuo Progetto",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "FASE 02",
          isPrimary: false,
          statusTag: "IN SVILUPPO",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "La nostra piattaforma di automazione connessa a Revit punta a rendere i workflow ripetibili e le operazioni BIM assistite da software più accessibili ai team di progetto.",
          outcome: "Un ambiente unificato per accedere e gestire funzionalità connesse di automazione BIM.",
          execution: "Integrazione pianificata con Revit, moduli di workflow riutilizzabili e operazioni ingegneristiche assistite.",
          impact: "Un approccio più scalabile per distribuire l'automazione nei team di ingegneria.",
          ctaText: "Entra nella Coda Prioritaria",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "FASE 03",
          isPrimary: false,
          statusTag: "IN SVILUPPO",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "La nostra roadmap enterprise a lungo termine è focalizzata su infrastrutture IA private, pensate per organizzazioni che richiedono il massimo controllo su dati ingegneristici ed ambienti di esecuzione.",
          outcome: "Opzioni di deployment progettate attorno ai requisiti di sicurezza e infrastruttura dell'organizzazione.",
          execution: "Servizi IA on-premise pianificati, inferenza locale e integrazione con i workflow ingegneristici interni.",
          impact: "Maggiore controllo organizzativo sui futuri processi BIM assistiti da IA e sulla gestione dei dati.",
          ctaText: "Richiesta Enterprise",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "IA ENTERPRISE · IN SVILUPPO",
      headline: "IA Privata. Progettata Attorno al Tuo Ambiente BIM.",
      description: "Stiamo sviluppando opzioni di infrastruttura IA enterprise per portare inferenza locale e automazione intelligente direttamente nei tuoi workflow ingegneristici. Condividi i tuoi requisiti di deployment, sicurezza e BIM per definire la prossima evoluzione di pyBIM.",
      subtitle: "Stiamo sviluppando opzioni di infrastruttura IA enterprise per portare inferenza locale e automazione intelligente direttamente nei tuoi workflow ingegneristici. Condividi i tuoi requisiti di deployment, sicurezza e BIM per definire la prossima evoluzione di pyBIM.",
      buttonText: "Entra nella Coda Prioritaria Enterprise",
      buttonHref: "/contact#priority-queue",
      microcopy: "Solo manifestazione di interesse. La disponibilità del prodotto e le opzioni di deployment sono soggette a ulteriore sviluppo e revisione tecnica.",
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
    systemBenchmarks: {
      tag: "VALUTAZIONE INGEGNERISTICA",
      badge: "VALUTAZIONE SU SPECIFICA DI PROGETTO",
      headline: "Criteri Chiari. Risultati Ingegneristici Verificabili.",
      subtitle: "I workflow BIM devono essere valutati rispetto ai requisiti informativi concordati, ai dati di modello disponibili e alle verifiche tecniche pertinenti, non su promesse generiche di velocità o accuratezza.",
      methodologyNote: "I criteri di valutazione, le verifiche e le modalità di reportistica vengono definiti in base all'ambito di progetto. Gli esempi illustrano possibili aree di analisi, non risultati prestazionali misurati.",
      criteriaLabel: "CRITERI DI VERIFICA",
      assessments: [
        {
          id: "workflow-efficiency",
          num: "01",
          category: "VALUTAZIONE DEI WORKFLOW",
          title: "Efficienza dei Workflow",
          desc: "Identificare le operazioni ingegneristiche ripetitive e analizzare dove un'automazione mirata possa ridurre la gestione manuale mantenendo il necessario controllo tecnico.",
          criteria: [
            "Ambito di Attività",
            "Ripetibilità",
            "Impegno di Revisione"
          ],
          evidenceLabel: "EVIDENZE DI REVISIONE",
          evidence: "Checklist di processo e note di revisione tecnica"
        },
        {
          id: "information-quality",
          num: "02",
          category: "REVISIONE INFORMATIVA",
          title: "Qualità delle Informazioni del Modello",
          desc: "Verificare convenzioni di denominazione, parametri obbligatori, coerenza delle classificazioni ed eccezioni documentate rispetto ai requisiti informativi di progetto.",
          criteria: [
            "Campi Obbligatori",
            "Eccezioni alle Regole",
            "Tracciamento Issue"
          ],
          evidenceLabel: "EVIDENZE DI REVISIONE",
          evidence: "Note di verifica del modello e registro delle eccezioni"
        },
        {
          id: "coordination-handover",
          num: "03",
          category: "REVISIONE DI CONSEGNA",
          title: "Coordinamento e Prontezza alla Consegna",
          desc: "Esaminare le risultanze di coordinamento documentate, i requisiti di scambio informativo e le registrazioni di consegna prima di predisporre gli elaborati per il team di progetto.",
          criteria: [
            "Risultanze di Coordinamento",
            "Scambio Informativo",
            "Registri di Consegna"
          ],
          evidenceLabel: "EVIDENZE DI REVISIONE",
          evidence: "Registro delle problematiche e checklist di consegna"
        }
      ]
    }
  },
  de: {
    hero: {
      eyebrow: "BIM-ENGINEERING · WORKFLOW-AUTOMATISIERUNG",
      headline1: "Komplexe BIM-Workflows.",
      headline2: "Entwickelt für Höchstleistung.",
      subheadline: "Von anspruchsvollen BIM-Lieferergebnissen bis hin zur individuellen Revit-Automatisierung: pyBIM unterstützt Architektur-, Ingenieur- und Bauteams dabei, repetitive Aufgaben zu reduzieren, die Modellkonsistenz zu steigern und Projekte mit voller Kontrolle abzuwickeln.",
      primaryCta: "Projekt Besprechen",
      secondaryCta: "Kompetenzen Entdecken",
      primaryCtaHref: "/contact#audit",
      secondaryCtaHref: "#roadmap",
      trustBadges: [
        "ISO 19650-konforme Workflows",
        "Autodesk Revit API & IFC4",
        "Deterministische QA / QC"
      ],
      pipeline: {
        badge: "ILLUSTRATIVER WORKFLOW",
        monitorLabel: "WORKFLOW_ARCHITEKTUR // 4 INTEGRIERTE PHASEN",
        windowTitle: "pyBIM_ARCHITEKTUR // WORKFLOW_SPEZIFIKATION",
        labels: {
          framework: "FRAMEWORK // OPENBIM & API",
          tablistAria: "BIM-Engineering-Workflow-Phasen",
          inspectAria: "Phase untersuchen",
          specOverview: "PHASEN-SPEZIFIKATION // ARCHITEKTUR",
          pipelineMode: "PROZESS: STRUKTURIERTE LIEFERUNG",
          activePhase: "AKTIVE PHASE"
        },
        nodes: [
          {
            id: "revit",
            step: "01",
            title: "Revit-Modell Ingestion",
            sub: "Quellgeometrie & Parametersätze",
            badge: "INPUT // .RVT / IFC",
            meta: "Geometrie- & Eigenschaftssätze",
            icon: "box"
          },
          {
            id: "validation",
            step: "02",
            title: "Datenvalidierung",
            sub: "Algorithmische QA/QC & Schemaprüfung",
            badge: "SCHEMA-AUDIT",
            meta: "EIR- & ISO 19650-Regeln",
            icon: "shield"
          },
          {
            id: "engine",
            step: "03",
            title: "Automations-Engine",
            sub: "Algorithmischer Python- & C#-Kern",
            badge: "AUSFÜHRUNGSKERN",
            meta: "Skriptbasierte Parameter-Pipelines",
            icon: "cpu"
          },
          {
            id: "deliverables",
            step: "04",
            title: "Strukturierte Deliverables",
            sub: "Standardisiertes OpenBIM & Dokumentation",
            badge: "DELIVERABLES",
            meta: "IFC4 · COBie · Berichte",
            icon: "database"
          }
        ],
        logs: [
          "[PHASE 01] Standardisierte Erfassung von Revit-Elementen, Parametern und IFC-Klassifikationen.",
          "[PHASE 02] Regelbasierte Schemavalidierung ausgerichtet an Projekt-EIR und ISO 19650-Leitlinien.",
          "[PHASE 03] Ausführung algorithmischer Parameterinjektion und Koordinationsprüfung über Revit API.",
          "[PHASE 04] Deterministische Erstellung verifizierter IFC4-Modelle, COBie-Tabellen und Prüfdossiers."
        ]
      }
    },
    roadmap: {
      tag: "UNSERE AUSFÜHRUNGS-ROADMAP",
      headline: "Engineering-Lieferung heute. Intelligente Infrastruktur morgen.",
      subtitle: "pyBIM verbindet praxisnahe BIM-Engineering-Dienstleistungen mit einer phasenweisen Technologie-Roadmap – von der konkreten Projektabwicklung bis hin zu vernetzter Automatisierung und privater KI-Infrastruktur.",
      labels: {
        outcome: "Das Ergebnis",
        execution: "Die Umsetzung",
        impact: "Der Mehrwert",
        featuredOffering: "HERVORGEHOBENES ANGEBOT",
        currentOffering: "AKTUELLES ANGEBOT",
        softwareRoadmap: "SOFTWARE-ROADMAP",
        enterpriseRoadmap: "ENTERPRISE-ROADMAP",
        timelineAriaLabel: "Phasen des Roadmap-Fortschritts",
        progressHeading: "Indikativer Entwicklungsfortschritt",
        progressNote: "Schätzungen abhängig vom jeweiligen Projektumfang"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE 01",
          isPrimary: true,
          statusTag: "JETZT VERFÜGBAR",
          progressPercent: 100,
          title: "Technologiegestützte BIM-Services",
          description: "Erweitern Sie Ihre Engineering-Kapazität mit verlässlicher BIM-Lieferung, multidisziplinärer Koordination, Modelldatenvalidierung und maßgeschneiderter Revit-Automatisierung.",
          outcome: "Zuverlässige BIM-Deliverables und durchgängig konsistente Engineering-Workflows.",
          execution: "Technische BIM-Spezialisten, unterstützt durch maßgeschneiderte Werkzeuge in Python, C# und Revit API.",
          impact: "Weniger repetitive Routinearbeit, transparente Qualitätssicherung und planbare Projektausführung.",
          ctaText: "Projekt besprechen",
          ctaHref: "/contact#audit"
        },
        {
          num: "02",
          phase: "PHASE 02",
          isPrimary: false,
          statusTag: "IN ENTWICKLUNG",
          progressPercent: 70,
          title: "pyBIM Cloud Connect",
          description: "Unsere geplante Revit-vernetzte Automatisierungsplattform soll wiederholbare Engineering-Workflows und softwaregestützte BIM-Operationen für Projektteams direkt zugänglich machen.",
          outcome: "Eine einheitliche Umgebung für den Zugriff und die Verwaltung vernetzter BIM-Automatisierungsfunktionen.",
          execution: "Geplante Revit-Integration, wiederverwendbare Workflow-Module und assistierte Engineering-Operationen.",
          impact: "Ein skalierbarer Ansatz zur Verteilung von Automatisierung über gesamte Engineering-Teams hinweg.",
          ctaText: "Prioritätswarteschlange beitreten",
          ctaHref: "/contact#priority-queue"
        },
        {
          num: "03",
          phase: "PHASE 03",
          isPrimary: false,
          statusTag: "IN ENTWICKLUNG",
          progressPercent: 30,
          title: "Sovereign Enterprise Edge AI",
          description: "Unsere langfristige Enterprise-Roadmap konzentriert sich auf private KI-Infrastruktur für Organisationen mit strengen Anforderungen an Datenkontrolle und Ausführungsumgebungen.",
          outcome: "Bereitstellungsoptionen, die präzise auf organisatorische Sicherheits- und Infrastrukturvorgaben abgestimmt sind.",
          execution: "Geplante On-Premise-KI-Dienste, lokale Inferenz und nahtlose Einbindung in interne Engineering-Workflows.",
          impact: "Maximale organisatorische Souveränität über künftige KI-unterstützte BIM-Prozesse und vertrauliche Modelldaten.",
          ctaText: "Enterprise-Anfrage",
          ctaHref: "/contact#priority-queue"
        }
      ]
    },
    ctaBanner: {
      tag: "ENTERPRISE-KI · IN ENTWICKLUNG",
      headline: "Private KI. Entwickelt für Ihre BIM-Umgebung.",
      description: "Wir entwickeln Optionen für Enterprise-KI-Infrastruktur, die lokale Inferenz und intelligente Automatisierung näher an Ihre Engineering-Workflows bringen. Teilen Sie Ihre Anforderungen an Bereitstellung, Sicherheit und BIM, während wir die nächste Stufe von pyBIM gestalten.",
      subtitle: "Wir entwickeln Optionen für Enterprise-KI-Infrastruktur, die lokale Inferenz und intelligente Automatisierung näher an Ihre Engineering-Workflows bringen. Teilen Sie Ihre Anforderungen an Bereitstellung, Sicherheit und BIM, während wir die nächste Stufe von pyBIM gestalten.",
      buttonText: "Der Enterprise-Prioritätswarteschlange beitreten",
      buttonHref: "/contact#priority-queue",
      microcopy: "Unverbindliche Interessensbekundung. Produktverfügbarkeit und Bereitstellungsoptionen unterliegen der weiteren technischen Entwicklung und Prüfung.",
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
          "PROCESSO: WIEDERKEHREND → ROUTINE → PRÜFUNG",
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
    systemBenchmarks: {
      tag: "ENGINEERING-BEWERTUNG",
      badge: "PROJEKTSPEZIFISCHE BEWERTUNG",
      headline: "Klare Kriterien. Nachvollziehbare Engineering-Ergebnisse.",
      subtitle: "BIM-Workflows sollten anhand vereinbarter Projektanforderungen, verfügbarer Modelldaten und relevanter Prüfregeln bewertet werden – nicht anhand universeller Geschwindigkeits- oder Genauigkeitsversprechen.",
      methodologyNote: "Prüfkriterien, Prüfmethoden und Berichtsformen werden gemäß dem Projektumfang definiert. Die nachfolgenden Beispiele veranschaulichen mögliche Bewertungsbereiche, keine gemessenen Leistungsdaten.",
      criteriaLabel: "PRÜFKRITERIEN",
      assessments: [
        {
          id: "workflow-efficiency",
          num: "01",
          category: "WORKFLOW-BEWERTUNG",
          title: "Workflow-Effizienz",
          desc: "Identifikation repetitiver Engineering-Abläufe und Prüfung, wo gezielte Automatisierung manuelle Aufwände reduzieren kann, während die erforderliche fachliche Kontrolle gewahrt bleibt.",
          criteria: [
            "Aufgabenbereich",
            "Wiederholbarkeit",
            "Prüfaufwand"
          ],
          evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
          evidence: "Workflow-Checkliste und technische Prüfnotizen"
        },
        {
          id: "information-quality",
          num: "02",
          category: "INFORMATIONS-PRÜFUNG",
          title: "Qualität der Modellinformationen",
          desc: "Prüfung von Namenskonventionen, Pflichtparametern, Klassifikationskonsistenz und dokumentierten Ausnahmen anhand der vereinbarten Informationsanforderungen des Projekts.",
          criteria: [
            "Pflichtfelder",
            "Regelausnahmen",
            "Issue-Tracking"
          ],
          evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
          evidence: "Modellprüfnotizen und Abweichungsprotokoll"
        },
        {
          id: "coordination-handover",
          num: "03",
          category: "ÜBERGABE-PRÜFUNG",
          title: "Koordination und Übergabereife",
          desc: "Untersuchung dokumentierter Koordinationsbefunde, Informationsaustauschanforderungen und Übergabeprotokolle vor Bereitstellung der Ergebnisse zur Projektteam-Prüfung.",
          criteria: [
            "Koordinationsbefunde",
            "Informationsaustausch",
            "Übergabeprotokolle"
          ],
          evidenceLabel: "MÖGLICHE PRÜFNACHWEISE",
          evidence: "Mängelprotokolle und Projekt-Übergabe-Checkliste"
        }
      ]
    }
  }
};
