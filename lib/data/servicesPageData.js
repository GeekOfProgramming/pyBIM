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
        windowTitle: "PYBIM_ARCHITECTURE // WORKFLOW_SPEC",
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
        timelineAriaLabel: "Roadmap progression phases"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE 01",
          isPrimary: true,
          statusTag: "AVAILABLE NOW",
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
          title: "Sovereign Enterprise Edge AI",
          description: "Our long-term enterprise roadmap focuses on private AI infrastructure designed for organizations requiring greater control over engineering data and execution environments.",
          outcome: "Deployment options designed around organizational security and infrastructure requirements.",
          execution: "Planned on-premises AI services, local inference, and integration with internal engineering workflows.",
          impact: "Greater organizational control over future AI-assisted BIM processes and data handling.",
          ctaText: "Discuss Enterprise Requirements",
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
      tag: "// CORE AI CAPABILITIES",
      headline: "Transforming Complex Contractual Demands into Algorithmic Precision.",
      subtitle: "We eliminate the operational gap between static BIM Execution Plans and dynamic model execution, ensuring flawless public tender deliveries.",
      cards: [
        {
          title: "Automated Compliance Auditing",
          desc: "We bridge the gap between static contracts and your 3D geometry. Our engines translate rigid EIR mandates and strict ISO 19650 and UNI 11337 protocols into dynamic execution rules, instantly auditing your models to guarantee zero-error project delivery."
        },
        {
          title: "Algorithmic Parameter Injection",
          desc: "Eliminate hundreds of billable hours wasted on manual data entry. Our AI writes and executes secure, native Revit API scripts to autonomously inject and standardize thousands of metadata fields, cutting coordination time from days to seconds."
        },
        {
          title: "Zero-Trust Data Sovereignty",
          desc: "Your intellectual property is your most valuable asset. Whether our engineering unit coordinates your project today or our Edge AI is deployed in your office tomorrow, we guarantee a 100% air-gapped ecosystem where proprietary data never touches a public cloud."
        }
      ],
      buttonText: "REQUEST A TECHNICAL CONSULTATION →",
      buttonHref: "/contact",
      microcopy: "No credit card required. We will process a sample EIR document live to prove instant algorithmic data extraction."
    },
    executionPipeline: {
      tag: "_ EXECUTION PIPELINE",
      headline: "The Algorithmic Pipeline: From Contract to Code.",
      subtitle: "We do not output theoretical advice. Our infrastructure translates rigid contractual demands directly into executable C# and Python logic within your BIM environment.",
      steps: [
        {
          num: "01",
          title: "Contextual Knowledge Retrieval (RAG)",
          desc: "The system parses your static BIM Execution Plans (BEP) and strict ISO 19650 mandates, retrieving exact compliance rules from our structured Vector Databases."
        },
        {
          num: "02",
          title: "Autonomous Logic Generation",
          desc: "Our isolated AI engines dynamically write optimized Python and native C# scripts tailored to your specific facility requirements, bypassing manual data entry entirely."
        },
        {
          num: "03",
          title: "Secure API Execution",
          desc: "The generated logic fuses directly with the native Revit API, autonomously processing thousands of metadata fields and geometric parameters in milliseconds."
        },
        {
          num: "04",
          title: "Deterministic Validation (Human-in-the-loop)",
          desc: "Every automated action is strictly audited against the initial contractual rules. Changes are executed within safe, rollback-protected transactions to guarantee 100% zero-error deliverables."
        }
      ]
    },
    engineeringOutcomes: {
      tag: "// CORE ENGINEERING OUTCOMES",
      columns: [
        {
          icon: "Zap",
          title: "Algorithmic Processing Speed",
          desc: "Replace hundreds of manual engineering hours with instantaneous Python and C# script execution. Whether we manage the project or empower your team, we mathematically compress complex BIM workflows that traditionally consume weeks into a matter of hours."
        },
        {
          icon: "Target",
          title: "Deterministic Accuracy",
          desc: "Eliminate costly human error and public tender disqualifications. Every single 3D element and metadata field is mathematically validated against strict ISO 19650 and UNI 11337 mandates before any final database commit is executed."
        },
        {
          icon: "Layers",
          title: "Non-Disruptive Integration",
          desc: "Maximize the ROI of your existing software stack. Our headless infrastructure fuses directly with native Autodesk Revit and Navisworks APIs, executing algorithmic commands flawlessly without forcing your engineers to learn entirely new design platforms."
        }
      ]
    },
    executionArchitecture: {
      tag: "// SYSTEMATIC EXECUTION ARCHITECTURE",
      headline: "The Execution Architecture.",
      subtitle: "How pyBIM translates text-based contracts directly into executed Revit parameters. No generic AI advice; only deterministic code generation.",
      nodes: [
        {
          num: "01",
          title: "Vectorized Requirement Parsing",
          desc: "We eliminate standard AI memory hallucinations. Your proprietary EIRs, BEPs, and strict ISO 19650 and UNI 11337 protocols are processed into high-dimensional vector embeddings (ChromaDB). This mathematically forces our engine to adhere exclusively to your project’s contractual constraints."
        },
        {
          num: "02",
          title: "Native Script Compilation",
          desc: "The isolated AI engine reads the indexed rules and writes targeted C# and Python logic specific to your active Revit database. It generates precise, executable API commands, completely bypassing the limitations and latency of visual scripting environments."
        },
        {
          num: "03",
          title: "Transaction-Safe Injection",
          desc: "Custom scripts are injected directly into Revit’s main thread via isolated API transactions (DB.Transaction). If any element violates an indexed constraint, the transaction instantly rolls back, guaranteeing that your model geometry is never compromised."
        }
      ]
    },
    integrationPathways: {
      tag: "// ENTERPRISE INTEGRATION TOPOLOGIES",
      headline: "Scalable Integration Pathways.",
      subtitle: "Engineered to support every operational scale. From executing complex workloads for growing studios to deploying air-gapped infrastructure for tier-1 contractors, we guarantee absolute data sovereignty.",
      columns: [
        {
          title: "Turnkey Project Execution",
          subtitle: "(For Agile & Growing Firms)",
          desc: "Delegate your complex modeling, clash coordination, and ISO 19650 audits directly to our internal engineering unit. We leverage our proprietary algorithms to deliver mathematically verified models at unprecedented speeds, instantly eliminating manual data entry for your local team."
        },
        {
          title: "Cloud-Connected APIs",
          subtitle: "(For Mid-to-Large Enterprise)",
          desc: "Connect your existing Autodesk Revit environments directly to our processing servers via highly secure APIs. Empower your internal workforce to generate scripts and validate models autonomously, scaling your algorithmic capabilities with zero hardware CapEx."
        },
        {
          title: "Air-Gapped Sovereign Edge",
          subtitle: "(For Tier-1 Government Contractors)",
          desc: "Engineered exclusively for firms handling classified public infrastructure. The entire pyBIM ecosystem—Local LLMs, Vector Databases, and execution kernels—is physically deployed onto your internal LAN, guaranteeing 100% data sovereignty and zero external routing."
        }
      ]
    },
    systemBenchmarks: {
      tag: "_ SYSTEM BENCHMARKS (LOCAL AI VS. MANUAL EXECUTION)",
      headline: "Algorithmic Processing Metrics.",
      subtitle: "Quantifying the transition from brute-force manual modeling to deterministic code execution. Performance data is based on isolated hardware execution via native Revit and Navisworks APIs.",
      metrics: [
        {
          tag: "[MASSIVE PARAMETER INJECTION]",
          target: "Updating 5,000+ element metadata fields (OmniClass, UNI 11337).",
          manualLabor: "~40 Hours of repetitive data entry.",
          pyBimExec: "< 10 Seconds",
          protocol: "Executed silently in the background via custom C# API calls, yielding a mathematically validated 0% error rate."
        },
        {
          tag: "[ISO 19650 COMPLIANCE AUDIT]",
          target: "Full architectural model verification against strict EIR mandates.",
          manualLabor: "~15 Hours (Highly prone to fatal human oversight).",
          pyBimExec: "< 2 Minutes",
          protocol: "Deterministic vector parsing. The engine cross-references 3D geometry against indexed rules, guaranteeing zero tender rejections."
        },
        {
          tag: "[AGENTIC CLASH FILTERING]",
          target: "Resolving MEP vs. Structural false-positive intersections.",
          manualLabor: "Weeks of redundant coordination meetings.",
          pyBimExec: "Instantaneous rule-based elimination.",
          protocol: "Programmatic parsing of Solibri/Navisworks databases to generate actionable, clash-free reports prior to any human auditing."
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
        windowTitle: "ARCHITETTURA_PYBIM // SPECIFICA_WORKFLOW",
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
        timelineAriaLabel: "Fasi di progressione della roadmap"
      },
      cards: [
        {
          num: "01",
          phase: "FASE 01",
          isPrimary: true,
          statusTag: "DISPONIBILE ORA",
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
          title: "Sovereign Enterprise Edge AI",
          description: "La nostra roadmap enterprise a lungo termine è focalizzata su infrastrutture IA private, pensate per organizzazioni che richiedono il massimo controllo su dati ingegneristici ed ambienti di esecuzione.",
          outcome: "Opzioni di deployment progettate attorno ai requisiti di sicurezza e infrastruttura dell'organizzazione.",
          execution: "Servizi IA on-premise pianificati, inferenza locale e integrazione con i workflow ingegneristici interni.",
          impact: "Maggiore controllo organizzativo sui futuri processi BIM assistiti da IA e sulla gestione dei dati.",
          ctaText: "Discuti i Requisiti Enterprise",
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
      tag: "// CAPACITÀ IA CORE",
      headline: "Trasformare Requisiti Contrattuali Complessi in Precisione Algoritmica.",
      subtitle: "Eliminiamo il divario operativo tra i Capitolati Informativi statici e l'esecuzione dinamica del modello, garantendo consegne impeccabili per le gare pubbliche.",
      cards: [
        {
          title: "Audit di Conformità Automatizzato",
          desc: "Colmiamo il divario tra contratti statici e la tua geometria 3D. I nostri motori traducono i rigidi mandati EIR/CI e i protocolli ISO 19650 e UNI 11337 in regole di esecuzione dinamiche, verificando istantaneamente i tuoi modelli per garantire consegne a zero errori."
        },
        {
          title: "Iniezione Algoritmica di Parametri",
          desc: "Elimina centinaia di ore fatturabili sprecate nell'inserimento manuale dei dati. La nostra IA scrive ed esegue script nativi e sicuri per l'API di Revit per iniettare e standardizzare autonomamente migliaia di campi metadati, riducendo i tempi di coordinamento da giorni a secondi."
        },
        {
          title: "Sovranità dei Dati Zero-Trust",
          desc: "La tua proprietà intellettuale è la tua risorsa più preziosa. Sia che la nostra unità ingegneristica coordini il tuo progetto oggi, sia che la nostra Edge AI venga distribuita nel tuo ufficio domani, garantiamo un ecosistema 100% air-gapped in cui i dati proprietari non toccano mai il cloud pubblico."
        }
      ],
      buttonText: "RICHIEDI UNA CONSULENZA TECNICA →",
      buttonHref: "/contact",
      microcopy: "Nessuna carta di credito richiesta. Elaboreremo un documento EIR/CI di prova in tempo reale per dimostrare l'estrazione dati algoritmica istantanea."
    },
    executionPipeline: {
      tag: "_ PIPELINE DI ESECUZIONE",
      headline: "La Pipeline Algoritmica: Dal Contratto al Codice.",
      subtitle: "Non forniamo consigli teorici. La nostra infrastruttura traduce i rigidi requisiti contrattuali direttamente in logica eseguibile C# e Python all'interno del tuo ambiente BIM.",
      steps: [
        {
          num: "01",
          title: "Recupero Contestuale della Conoscenza (RAG)",
          desc: "Il sistema analizza i tuoi Piani di Gestione Informativa (pGI/BEP) statici e i requisiti ISO 19650, recuperando le esatte regole di conformità dai nostri Database Vettoriali strutturati."
        },
        {
          num: "02",
          title: "Generazione Autonoma della Logica",
          desc: "I nostri motori IA isolati scrivono dinamicamente script ottimizzati in Python e C# nativo su misura per i tuoi requisiti specifici, bypassando completamente l'inserimento manuale dei dati."
        },
        {
          num: "03",
          title: "Esecuzione Sicura tramite API",
          desc: "La logica generata si fonde direttamente con l'API nativa di Revit, elaborando autonomamente migliaia di campi metadati e parametri geometrici in pochi millisecondi."
        },
        {
          num: "04",
          title: "Validazione Deterministica (Human-in-the-loop)",
          desc: "Ogni azione automatizzata viene rigorosamente verificata rispetto alle regole contrattuali iniziali. Le modifiche vengono eseguite all'interno di transazioni protette da rollback per garantire deliverable al 100% esenti da errori."
        }
      ]
    },
    engineeringOutcomes: {
      tag: "// RISULTATI INGEGNERISTICI PRINCIPALI",
      columns: [
        {
          icon: "Zap",
          title: "Velocità di Elaborazione Algoritmica",
          desc: "Sostituisci centinaia di ore di ingegneria manuale con l'esecuzione istantanea di script Python e C#. Sia che gestiamo noi il progetto o potenziamo il tuo team, comprimiamo matematicamente flussi BIM complessi che tradizionalmente richiedono settimane in poche ore."
        },
        {
          icon: "Target",
          title: "Accuratezza Deterministica",
          desc: "Elimina i costosi errori umani e il rischio di squalifica nelle gare pubbliche. Ogni singolo elemento 3D e campo di metadati viene validato matematicamente rispetto alle normative ISO 19650 e UNI 11337 prima del commit finale nel database."
        },
        {
          icon: "Layers",
          title: "Integrazione Non Invasiva",
          desc: "Massimizza il ROI del tuo parco software esistente. La nostra infrastruttura headless si interfaccia direttamente con le API native di Autodesk Revit e Navisworks, eseguendo comandi algoritmici impeccabili senza costringere i tuoi ingegneri a imparare nuove piattaforme."
        }
      ]
    },
    executionArchitecture: {
      tag: "// ARCHITETTURA DI ESECUZIONE SISTEMATICA",
      headline: "L'Architettura di Esecuzione.",
      subtitle: "Come pyBIM traduce contratti testuali direttamente in parametri eseguiti su Revit. Nessuna IA generica; solo generazione deterministica di codice.",
      nodes: [
        {
          num: "01",
          title: "Analisi Vettorializzata dei Requisiti",
          desc: "Eliminiamo le allucinazioni tipiche dell'IA. I tuoi capitolati (EIR/CI), pGI (BEP) e i rigorosi protocolli ISO 19650 e UNI 11337 vengono convertiti in embedding vettoriali ad alta dimensionalità (ChromaDB). Ciò forza matematicamente il nostro motore a rispettare esclusivamente i vincoli contrattuali del tuo progetto."
        },
        {
          num: "02",
          title: "Compilazione Nativa degli Script",
          desc: "Il motore IA isolato legge le regole indicizzate e scrive logica mirata in C# e Python specifica per il tuo database attivo di Revit. Genera comandi API precisi ed eseguibili, superando totalmente i limiti e la latenza degli ambienti di visual scripting."
        },
        {
          num: "03",
          title: "Iniezione Protetta da Transazioni",
          desc: "Gli script personalizzati vengono iniettati direttamente nel thread principale di Revit tramite transazioni API isolate (DB.Transaction). Se un qualsiasi elemento viola un vincolo indicizzato, la transazione esegue immediatamente il rollback, garantendo che la geometria del modello non sia mai compromessa."
        }
      ]
    },
    integrationPathways: {
      tag: "// TOPOLOGIE DI INTEGRAZIONE ENTERPRISE",
      headline: "Percorsi di Integrazione Scalabili.",
      subtitle: "Progettati per supportare qualsiasi dimensione operativa. Dall'esecuzione di carichi complessi per studi in crescita all'infrastruttura air-gapped per i principali general contractor, garantiamo la sovranità assoluta dei dati.",
      columns: [
        {
          title: "Esecuzione Progetti Chiavi in Mano",
          subtitle: "(Per Studi Agili e in Crescita)",
          desc: "Delega la modellazione complessa, il coordinamento interferenze e gli audit ISO 19650 direttamente alla nostra unità ingegneristica interna. Sfruttiamo i nostri algoritmi proprietari per consegnare modelli verificati matematicamente a velocità senza precedenti, eliminando all'istante l'inserimento manuale per il tuo team."
        },
        {
          title: "API Connesse al Cloud",
          subtitle: "(Per Medie e Grandi Imprese)",
          desc: "Collega i tuoi ambienti Autodesk Revit esistenti direttamente ai nostri server di elaborazione tramite API altamente protette. Consenti al tuo organico interno di generare script e validare modelli in autonomia, scalando le tue capacità algoritmiche con zero investimenti in hardware."
        },
        {
          title: "Sovereign Edge Air-Gapped",
          subtitle: "(Per Contractor di Opere Pubbliche Strategiche)",
          desc: "Ingegnerizzato esclusivamente per realtà che gestiscono infrastrutture pubbliche classificate. L'intero ecosistema pyBIM—LLM locali, Database Vettoriali e kernel di esecuzione—viene installato fisicamente sulla tua LAN interna, garantendo sovranità dei dati al 100% e zero instradamento esterno."
        }
      ]
    },
    systemBenchmarks: {
      tag: "_ BENCHMARK DI SISTEMA (IA LOCALE VS ESECUZIONE MANUALE)",
      headline: "Metriche di Elaborazione Algoritmica.",
      subtitle: "Quantificazione del passaggio dalla modellazione manuale a forza bruta all'esecuzione deterministica del codice. Dati di performance basati sull'esecuzione su hardware isolato tramite API native di Revit e Navisworks.",
      metrics: [
        {
          tag: "[INIEZIONE MASSIVA DI PARAMETRI]",
          target: "Aggiornamento metadati di oltre 5.000 elementi (OmniClass, UNI 11337).",
          manualLabor: "~40 Ore di inserimento dati ripetitivo.",
          pyBimExec: "< 10 Secondi",
          protocol: "Eseguito silenziosamente in background tramite chiamate API C# personalizzate, con un tasso di errore dello 0% convalidato matematicamente."
        },
        {
          tag: "[AUDIT DI CONFORMITÀ ISO 19650]",
          target: "Verifica completa del modello architettonico rispetto ai rigidi mandati EIR/CI.",
          manualLabor: "~15 Ore (Altamente incline a gravi sviste umane).",
          pyBimExec: "< 2 Minuti",
          protocol: "Analisi vettoriale deterministica. Il motore confronta la geometria 3D con le regole indicizzate, garantendo zero respingimenti della gara."
        },
        {
          tag: "[FILTRAGGIO CLASH AGENTICO]",
          target: "Risoluzione delle intersezioni falso-positive MEP vs Strutturale.",
          manualLabor: "Settimane di riunioni di coordinamento ridondanti.",
          pyBimExec: "Eliminazione istantanea basata su regole.",
          protocol: "Analisi programmatica dei database Solibri/Navisworks per generare report fruibili e privi di interferenze prima di qualsiasi revisione umana."
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
        windowTitle: "PYBIM_ARCHITEKTUR // WORKFLOW_SPEZIFIKATION",
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
        timelineAriaLabel: "Phasen des Roadmap-Fortschritts"
      },
      cards: [
        {
          num: "01",
          phase: "PHASE 01",
          isPrimary: true,
          statusTag: "JETZT VERFÜGBAR",
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
          title: "Sovereign Enterprise Edge AI",
          description: "Unsere langfristige Enterprise-Roadmap konzentriert sich auf private KI-Infrastruktur für Organisationen mit strengen Anforderungen an Datenkontrolle und Ausführungsumgebungen.",
          outcome: "Bereitstellungsoptionen, die präzise auf organisatorische Sicherheits- und Infrastrukturvorgaben abgestimmt sind.",
          execution: "Geplante On-Premise-KI-Dienste, lokale Inferenz und nahtlose Einbindung in interne Engineering-Workflows.",
          impact: "Maximale organisatorische Souveränität über künftige KI-unterstützte BIM-Prozesse und vertrauliche Modelldaten.",
          ctaText: "Enterprise-Anforderungen besprechen",
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
      tag: "// KERNKOMPETENZEN DER KI",
      headline: "Komplexe vertragliche Anforderungen in algorithmische Präzision übersetzen.",
      subtitle: "Wir schließen die operative Lücke zwischen statischen BIM-Abwicklungsplänen und dynamischer Modellausführung für fehlerfreie öffentliche Ausschreibungslieferungen.",
      cards: [
        {
          title: "Automatisierte Konformitätsprüfung",
          desc: "Wir überbrücken die Kluft zwischen statischen Verträgen und Ihrer 3D-Geometrie. Unsere Engines übersetzen rigide AIA-Vorgaben und strenge ISO 19650- sowie UNI 11337-Protokolle in dynamische Ausführungsregeln und prüfen Ihre Modelle sofort auf fehlerfreie Projektablieferung."
        },
        {
          title: "Algorithmische Parameter-Injektion",
          desc: "Vermeiden Sie Hunderte abrechenbare Stunden für manuelle Dateneingabe. Unsere KI erstellt und führt sichere, native Revit-API-Skripte aus, um Tausende Metadatenfelder autonom einzupflegen und zu standardisieren – und reduziert die Koordinationszeit von Tagen auf Sekunden."
        },
        {
          title: "Zero-Trust-Datensouveränität",
          desc: "Ihr geistiges Eigentum ist Ihr wertvollstes Gut. Ob unsere Engineering-Einheit Ihr Projekt heute koordiniert oder unsere Edge AI morgen in Ihrem Büro bereitgestellt wird: Wir garantieren ein 100% luftisoliertes Ökosystem, bei dem vertrauliche Daten niemals eine öffentliche Cloud berühren."
        }
      ],
      buttonText: "TECHNISCHE BERATUNG ANFORDERN →",
      buttonHref: "/contact",
      microcopy: "Keine Kreditkarte erforderlich. Wir verarbeiten ein AIA/EIR-Beispieldokument live, um die sofortige algorithmische Datenextraktion zu belegen."
    },
    executionPipeline: {
      tag: "_ AUSFÜHRUNGSPIPELINE",
      headline: "Die algorithmische Pipeline: Vom Vertrag zum Code.",
      subtitle: "Wir liefern keine theoretischen Ratschläge. Unsere Infrastruktur übersetzt rigide vertragliche Anforderungen direkt in ausführbare C#- und Python-Logik in Ihrer BIM-Umgebung.",
      steps: [
        {
          num: "01",
          title: "Kontextuelle Wissensabfrage (RAG)",
          desc: "Das System analysiert Ihre statischen BIM-Abwicklungspläne (BAP) und ISO 19650-Vorgaben und ruft exakte Konformitätsregeln aus unseren strukturierten Vektordatenbanken ab."
        },
        {
          num: "02",
          title: "Autonome Logikgenerierung",
          desc: "Unsere isolierten KI-Engines schreiben dynamisch optimierte Python- und native C#-Skripte, die auf Ihre spezifischen Gebäudeanforderungen zugeschnitten sind – unter vollständiger Umgehung manueller Dateneingabe."
        },
        {
          num: "03",
          title: "Sichere API-Ausführung",
          desc: "Die generierte Logik interagiert direkt mit der nativen Revit-API und verarbeitet Tausende Metadatenfelder und Geometrieparameter autonom in Millisekunden."
        },
        {
          num: "04",
          title: "Deterministische Validierung (Human-in-the-Loop)",
          desc: "Jede automatisierte Aktion wird streng gegen die anfänglichen vertraglichen Vorgaben geprüft. Änderungen werden innerhalb sicherer, rollback-geschützter Transaktionen ausgeführt, um 100% fehlerfreie Ergebnisse zu garantieren."
        }
      ]
    },
    engineeringOutcomes: {
      tag: "// ZENTRALE ENGINEERING-ERGEBNISSE",
      columns: [
        {
          icon: "Zap",
          title: "Algorithmische Verarbeitungsgeschwindigkeit",
          desc: "Ersetzen Sie Hunderte manuelle Arbeitsstunden durch blitzschnelle Ausführung von Python- und C#-Skripten. Ob wir das Projekt steuern oder Ihr Team befähigen: Wir komprimieren komplexe BIM-Workflows, die sonst Wochen dauern, mathematisch auf wenige Stunden."
        },
        {
          icon: "Target",
          title: "Deterministische Genauigkeit",
          desc: "Beseitigen Sie kostspielige menschliche Fehler und das Risiko von Ausschreibungsausschlüssen. Jedes einzelne 3D-Element und Metadatenfeld wird vor dem finalen Datenbank-Commit mathematisch gegen ISO 19650 und UNI 11337 validiert."
        },
        {
          icon: "Layers",
          title: "Reibungslose Integration",
          desc: "Maximieren Sie den ROI Ihres bestehenden Software-Stacks. Unsere Headless-Infrastruktur dockt direkt an native APIs von Autodesk Revit und Navisworks an und führt algorithmische Befehle fehlerfrei aus, ohne dass Ihre Ingenieure neue Plattformen erlernen müssen."
        }
      ]
    },
    executionArchitecture: {
      tag: "// SYSTEMATISCHE AUSFÜHRUNGSARCHITEKTUR",
      headline: "Die Ausführungsarchitektur.",
      subtitle: "Wie pyBIM textbasierte Verträge direkt in ausgeführte Revit-Parameter übersetzt. Keine generischen KI-Ratschläge – nur deterministische Codegenerierung.",
      nodes: [
        {
          num: "01",
          title: "Vektorisierte Anforderungsanalyse",
          desc: "Wir eliminieren Standard-KI-Halluzinationen. Ihre proprietären AIAs, BAPs sowie ISO 19650- und UNI 11337-Vorschriften werden in hochdimensionale Vektor-Embeddings (ChromaDB) überführt. Dies zwingt unsere Engine mathematisch, sich ausschließlich an die vertraglichen Grenzen Ihres Projekts zu halten."
        },
        {
          num: "02",
          title: "Native Skriptkompilierung",
          desc: "Die isolierte KI-Engine liest die indexierten Regeln und generiert zielgerichtete C#- und Python-Logik speziell für Ihre aktive Revit-Datenbank. Sie erzeugt präzise, ausführbare API-Befehle, die die Grenzen und Latenzen visueller Skriptumgebungen vollständig umgehen."
        },
        {
          num: "03",
          title: "Transaktionssichere Injektion",
          desc: "Individuelle Skripte werden über isolierte API-Transaktionen (DB.Transaction) direkt in den Hauptthread von Revit injiziert. Verletzt ein Element eine indexierte Vorgabe, wird die Transaktion sofort zurückgerollt, sodass Ihre Modellgeometrie niemals beeinträchtigt wird."
        }
      ]
    },
    integrationPathways: {
      tag: "// ENTERPRISE-INTEGRATIONSTOPOLOGIEN",
      headline: "Skalierbare Integrationspfade.",
      subtitle: "Entwickelt für jede Betriebsgröße. Von der Bewältigung komplexer Workloads für wachsende Büros bis zur Bereitstellung luftisolierter Infrastruktur für Tier-1-Generalunternehmer – wir garantieren absolute Datensouveränität.",
      columns: [
        {
          title: "Schlüsselfertige Projektausführung",
          subtitle: "(Für agile & wachsende Büros)",
          desc: "Übertragen Sie komplexe Modellierung, Kollisionskoordination und ISO 19650-Audits direkt an unsere interne F&E-Einheit. Wir nutzen unsere proprietären Algorithmen, um mathematisch geprüfte Modelle mit beispielloser Geschwindigkeit zu liefern und manuelle Dateneingaben für Ihr lokales Team sofort zu eliminieren."
        },
        {
          title: "Cloud-verbundene APIs",
          subtitle: "(Für mittlere bis große Unternehmen)",
          desc: "Verbinden Sie Ihre bestehenden Autodesk Revit-Umgebungen über hochsichere APIs direkt mit unseren Verarbeitungsservern. Ermöglichen Sie Ihrer internen Belegschaft, autonom Skripte zu erstellen und Modelle zu validieren – und skalieren Sie Ihre algorithmischen Fähigkeiten ohne Hardware-CapEx."
        },
        {
          title: "Luftisolierte Sovereign Edge",
          subtitle: "(Für Tier-1-Behörden- und Großauftragnehmer)",
          desc: "Exklusiv für Unternehmen entwickelt, die klassifizierte öffentliche Infrastruktur bearbeiten. Das gesamte pyBIM-Ökosystem – lokale LLMs, Vektordatenbanken und Ausführungskerne – wird physisch in Ihrem internen LAN bereitgestellt, was 100% Datensouveränität ohne externes Routing gewährleistet."
        }
      ]
    },
    systemBenchmarks: {
      tag: "_ SYSTEM-BENCHMARKS (LOKALE KI VS. MANUELLE AUSFÜHRUNG)",
      headline: "Algorithmische Verarbeitungsmetriken.",
      subtitle: "Quantifizierung des Übergangs von rein manueller Modellierung zu deterministischer Code-Ausführung. Leistungsdaten basieren auf isolierter Hardware-Ausführung über native Revit- und Navisworks-APIs.",
      metrics: [
        {
          tag: "[MASSIVE PARAMETERINJEKTION]",
          target: "Aktualisierung von über 5.000 Element-Metadatenfeldern (OmniClass, UNI 11337).",
          manualLabor: "~40 Stunden sich wiederholende Dateneingabe.",
          pyBimExec: "< 10 Sekunden",
          protocol: "Lautlos im Hintergrund über benutzerdefinierte C#-API-Aufrufe ausgeführt, mit einer mathematisch validierten Fehlerrate von 0%."
        },
        {
          tag: "[ISO 19650 KONFORMITÄTSAUDIT]",
          target: "Vollständige Überprüfung des Architekturmodells anhand strenger AIA-Vorgaben.",
          manualLabor: "~15 Stunden (Sehr anfällig für folgenschwere menschliche Versehen).",
          pyBimExec: "< 2 Minuten",
          protocol: "Deterministische Vektoranalyse. Die Engine gleicht die 3D-Geometrie mit den indexierten Regeln ab und garantiert null Ausschreibungsablehnungen."
        },
        {
          tag: "[AGENTISCHE KOLLISIONSSORTIERUNG]",
          target: "Lösung von falsch-positiven TGA- vs. Tragwerk-Überschneidungen.",
          manualLabor: "Wochenlange redundante Koordinationssitzungen.",
          pyBimExec: "Sofortige regelbasierte Eliminierung.",
          protocol: "Programmatische Analyse von Solibri/Navisworks-Datenbanken zur Erstellung umsetzbarer, kollisionsfreier Berichte vor jeder menschlichen Prüfung."
        }
      ]
    }
  }
};
