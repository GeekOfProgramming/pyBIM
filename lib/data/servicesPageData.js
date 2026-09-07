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
  },
  it: {
    pageHeader: {
      title1: "Infrastruttura IA Sovrana",
      title2: "per l'Automazione BIM.",
      description: 'Implementiamo LLM Locali e Database Vettoriali (RAG) per tradurre i requisiti contrattuali testuali dei clienti direttamente in script eseguibili per Revit. Operando dal nostro polo di R&S a <strong class="text-brand-textPrimary">Padova</strong>, garantiamo la <strong class="text-brand-textPrimary">conformità al 100% dei metadati</strong> con <strong class="text-brand-textPrimary">ISO 19650</strong> e il <strong class="text-brand-textPrimary">Decreto BIM</strong>, assicurando che i vostri dati proprietari non lascino mai la vostra rete protetta.'
    },
    sovereignAi: {
      tag: ">_ ARCHITETTURA DI IMPLEMENTAZIONE IA SOVRANA",
      title: "R&S Ingegnerizzata. Sicura sulla Vostra Infrastruttura.",
      subtitle: "Bypas发展le API di IA pubbliche. Implementiamo un'infrastruttura LLM isolata direttamente nella capacità di rete esistente, garantendo la conformità a UNI 11337 e ISO 19650 senza alcuna esposizione dei metadati.",
      cards: [
        {
          num: "01",
          title: "L'Appliance IA Edge",
          subtitle: "Hardware Fisico",
          deployment: 'Un server GPU fisico con configurazione personalizzata, installato direttamente all\'interno della rete locale (LAN) del vostro ufficio.',
          outcome: '<strong class="text-brand-primary font-bold">Sovranità Assoluta dei Dati</strong>. Garantisce zero fughe di dati per infrastrutture governative o sanitarie classificate. I vostri metadati non toccano mai una rete esterna.',
          financial: '<strong class="text-brand-primary font-bold">Elimina</strong> i costi ricorrenti di elaborazione cloud, convertendo le spese software in un sicuro investimento CapEx.'
        },
        {
          num: "02",
          title: "Integrazione IT Enterprise",
          subtitle: "Infrastruttura Esistente",
          deployment: "Pipeline IA containerizzate (immagini Docker) implementate direttamente sui server aziendali esistenti del vostro dipartimento IT.",
          outcome: "Esecuzione algoritmica scalabile posizionata in totale sicurezza dietro il vostro firewall aziendale, potenziando centinaia di ingegneri contemporaneamente.",
          financial: '<strong class="text-brand-accent font-bold">Zero CapEx hardware</strong>. Massimizza il ROI dei vostri datacenter esistenti eliminando ogni latenza esterna.'
        },
        {
          num: "03",
          title: "GPU-VPS Dedicato",
          subtitle: "Server Cloud Privato",
          deployment: "Un Virtual Private Server dedicato e isolato, fornito esclusivamente per il vostro studio di ingegneria su server europei protetti.",
          outcome: "Implementazione rapida di funzionalità RAG e LLM Locali senza richiedere spazio fisico in ufficio, acquisto di hardware o manutenzione IT interna.",
          financial: 'Trasforma l\'integrazione dell\'IA in un modello <strong class="text-sky-400 font-bold">OpEx</strong> prevedibile, riducendo i costi iniziali di avvio <strong class="text-sky-400 font-bold">fino all\'80%</strong> rispetto alle configurazioni hardware.'
        }
      ]
    },
    validationPhase: {
      tag: "// LA FASE DI VALIDAZIONE",
      title: "La Simulazione Proof of Concept (PoC) di pyBIM",
      desc1: "Non pretendiamo una ristrutturazione dell'infrastruttura basata sulla teoria. Avviamo un rigoroso protocollo PoC localizzato di 48 ore.",
      desc2: "Elaboriamo un campione dei vostri capitolati informativi (EIR) non classificati attraverso le nostre pipeline RAG per dimostrare la velocità di estrazione algoritmica ed esecuzione prima del deployment completo.",
      cta: "RICHIEDI AUDIT PoC ->",
      microcopy: "(Gestione dati 100% gratuita e sicura. Nessuna carta di credito richiesta.)"
    },
    coreAi: {
      tag: "// Funzionalità IA Principali",
      title: "Collegare le Richieste Contrattuali con il Codice Eseguibile.",
      subtitle: "Eliminiamo il divario tra la lettura di pesanti Piani di Gestione Informativa (BEP/pGI) e la loro applicazione pratica nel software.",
      cards: [
        {
          title: "Analisi Contrattuale Automatizzata",
          desc: "Pipeline RAG personalizzate estraggono all'istante parametri obbligatori e regole di validazione da complessi documenti EIR e BEP."
        },
        {
          title: "Data Engineering in Tempo Reale",
          desc: "Il motore IA genera dinamicamente script personalizzati in Python e C# per mappare, standardizzare e iniettare parametri direttamente nel database di Revit."
        },
        {
          title: "Validazione Human-in-the-Loop",
          desc: "Tutte le decisioni algoritmiche vengono accodate in un'interfaccia pyRevit personalizzata, consentendo ai vostri Senior BIM Manager di convalidare e approvare le modifiche prima del commit finale nel database."
        }
      ],
      cta: "Richiedi una Demo dal Vivo della Pipeline RAG",
      microcopy: "* Nessuna carta di credito richiesta. Elaboreremo dal vivo un estratto di documento EIR per dimostrare l'estrazione dati algoritmica istantanea."
    },
    poweredBy: {
      tag: ">_ PIPELINE DI ESECUZIONE",
      title: "Trasformare le Direttive IA in Codice Deterministico.",
      subtitle: "La nostra infrastruttura non fornisce consigli astratti. Produce logica eseguibile in C# e Python direttamente nel vostro ambiente BIM.",
      pipeline: [
        {
          title: "1. Ingestione Dati (RAG)",
          desc: "I database vettoriali (ChromaDB) indicizzano i vostri capitolati ISO proprietari e i documenti BEP."
        },
        {
          title: "2. Generazione Logica (LLM Locale)",
          desc: "Il motore IA isolato genera script di esecuzione specifici in Python/C# basati sulle regole indicizzate."
        },
        {
          title: "3. Esecuzione API",
          desc: "Gli script personalizzati si integrano direttamente con le API di Revit e Navisworks per automatizzare la mappatura dei parametri e la risoluzione dei clash."
        },
        {
          title: "4. Commit di Convalida",
          desc: "Le modifiche vengono trattenute in un ambiente di staging sicuro con interfaccia pyRevit per l'approvazione finale da parte dei vostri Senior BIM Manager."
        }
      ]
    },
    pillars: [
      {
        title: "Coordinamento BIM Agentico",
        desc: "Esecuzione autonoma dei cicli di coordinamento. Il motore IA analizza i database di Navisworks e Solibri, applica filtri basati su regole per eliminare le interferenze falso-positive e trasmette report BCF programmatici direttamente ai vostri server locali."
      },
      {
        title: "Esecuzione API Guidata da LLM",
        desc: "Eliminazione dei limiti legati all'interazione software manuale. I Large Language Model locali traducono i requisiti testuali EIR in pipeline Python e Add-in C# personalizzati, eseguendo l'iniezione dei parametri e le modifiche geometriche all'istante tramite la Revit API."
      },
      {
        title: "Strutturazione Sovrana dei Dati",
        desc: "Estrazione sicura dei dati di ciclo di vita. L'infrastruttura struttura rigorosamente le basi geometriche e i metadati per i deliverable COBie e la conformità ISO 19650, garantendo che ogni integrazione con il digital twin avvenga completamente offline e all'interno della vostra LAN."
      }
    ],
    automationWorkflow: {
      tag: ">_ METODOLOGIA SISTEMATICA",
      title: "Architettura di Esecuzione Autonoma.",
      subtitle: "La Pipeline di Esecuzione Algoritmica",
      desc: "Sostituiamo l'immissione manuale dei dati e l'errore umano con una pipeline programmatica rigorosamente isolata a tre fasi. Ogni elaborazione dati viene eseguita interamente dietro il vostro firewall aziendale.",
      steps: [
        {
          num: "01",
          title: "Indicizzazione RAG & Ingestione Dati",
          desc: "I protocolli proprietari EIR/BEP e la documentazione ISO vengono indicizzati in modo sicuro nei database vettoriali locali (ChromaDB). I database nativi di Revit e i confini spaziali vengono validati programmaticamente a fronte di tali regole indicizzate prima dell'esecuzione."
        },
        {
          num: "02",
          title: "Generazione Logica LLM & Elaborazione API",
          desc: "Il motore IA isolato interpreta le prescrizioni indicizzate e genera logica su misura in C# e Python. Tali script eseguono il raggruppamento automatico delle interferenze, l'iniezione dei metadati e l'estrazione dinamica dei computi (QTO) direttamente tramite le API software, senza intervento umano."
        },
        {
          num: "03",
          title: "Commit Sicuro su Database & Consegna",
          desc: "I dati estratti e i modelli modificati vengono compilati in database privi di clash. L'infrastruttura sincronizza i deliverable conformi a ISO 19650 e UNI 11337 direttamente con il vostro Common Data Environment (CDE / ACDat) interno, garantendo zero fughe di dati all'esterno."
        }
      ]
    },
    whoWeServe: {
      tag: ">_ VETTORI DI IMPLEMENTAZIONE SETTORIALE",
      title: "Topologie di Integrazione Enterprise.",
      subtitle: "Non offriamo interfacce SaaS generiche. Distribuiamo pipeline LLM locali personalizzate e integrazioni API modellate sulla specifica architettura operativa e di sicurezza dei settori AEC Tier-1.",
      cards: [
        {
          title: "General Contractor Tier-1",
          desc: "Implementazione di hardware Edge AI direttamente nelle reti di cantiere o nella LAN della sede centrale. Esecuzione autonoma del filtraggio clash in Navisworks, instradamento programmatico BCF e convalida ISO 19650 prima della consegna alla filiera. Garantisce zero fughe di dati per appalti di infrastrutture pubbliche classificate.",
          tags: []
        },
        {
          title: "Società di Architettura & Ingegneria (A&E)",
          desc: "Integrazione di pipeline RAG locali per analizzare capitolati EIR e documenti prescrittivi di grandi dimensioni. L'LLM traduce i requisiti del committente in Add-in eseguibili in C# e Python, automatizzando l'iniezione dei parametri e la documentazione massiva direttamente nel vostro ambiente protetto Revit.",
          tags: []
        },
        {
          title: "Proprietari e Gestori di Asset Infrastrutturali",
          desc: "Strutturazione di basi metadati sovrane per le operazioni post-costruzione (Facility Management). L'infrastruttura IA esegue l'estrazione guidata da API dei deliverable COBie e mantiene database rigorosamente conformi agli standard ISO per un'integrazione Digital Twin sicura e offline.",
          tags: []
        }
      ]
    },
    roiMetrics: {
      tag: ">_ BENCHMARK DI SISTEMA (IA LOCALE VS. ESECUZIONE MANUALE)",
      title: "Metriche di Elaborazione Algoritmica.",
      subtitle: "Dati prestazionali basati sull'esecuzione hardware locale tramite API native di Revit/Navisworks.",
      metrics: [
        {
          header: "Iniezione Massiva di Parametri",
          target: "Aggiornamento Metadati per Oltre 10.000 Elementi",
          execution: "< 5 Secondi",
          protocol: "Eseguito in background in modo trasparente tramite chiamate API C# personalizzate, bypassando completamente l'interfaccia grafica di Revit."
        },
        {
          header: "Analisi Prescrizioni (RAG)",
          target: "Documentazione ISO/EIR di 500 Pagine",
          execution: "Recupero Semantico Istantaneo",
          protocol: "Indicizzato localmente tramite ChromaDB. L'LLM recupera istantaneamente le convenzioni di denominazione strutturale e le applica ai parametri geometrici senza revisione manuale."
        },
        {
          header: "Filtraggio Matrice di Clash",
          target: "Falsi Positivi tra Impianti MEP e Strutture",
          execution: "Eliminazione Basata su Regole",
          protocol: "Parsing programmatico dei database Solibri/Navisworks per raggruppare, instradare ed eliminare automaticamente le intersezioni geometriche non critiche prima della revisione umana."
        }
      ]
    },
    caseStudies: {
      title: "Esecuzione Comprovata",
      subtitle: "Scopri come i nostri strumenti di automazione stanno trasformando progetti reali.",
      linkText: "Leggi il Case Study",
      items: [
        { title: "Come uno script Python personalizzato ha fatto risparmiare 200 ore nella creazione delle tavole allo Studio X.", image: "/Pictures/Uncategorized/uncategorized-005.jpg", link: "/projects" },
        { title: "Pianificazione 4D algoritmica per un complesso commerciale di 50.000 mq.", image: "/Pictures/BIM/bim-0078.jpg", link: "/projects" }
      ]
    },
    finalCta: {
      title: "Pronto ad automatizzare i tuoi flussi di lavoro BIM?",
      button: "Calcola il Tuo ROI / Audit Tecnico"
    }
  },
  de: {
    pageHeader: {
      title1: "Souveräne KI-Infrastruktur",
      title2: "für BIM-Automatisierung.",
      description: 'Wir implementieren lokale LLMs und Vektordatenbanken (RAG), um textuelle Auftraggeberanforderungen direkt in ausführbare Revit-Skripte zu übersetzen. Von unserem F&E-Zentrum in <strong class="text-brand-textPrimary">Padua (Italien)</strong> aus garantieren wir <strong class="text-brand-textPrimary">100 % Metadaten-Konformität</strong> mit <strong class="text-brand-textPrimary">ISO 19650</strong> und den geltenden <strong class="text-brand-textPrimary">BIM-Richtlinien</strong>, während Ihre proprietären Daten Ihr sicheres Netzwerk niemals verlassen.'
    },
    sovereignAi: {
      tag: ">_ SOUVERÄNE KI-BEREITSTELLUNGSARCHITEKTUR",
      title: "Entwickelte F&E. Abgesichert auf Ihrer Infrastruktur.",
      subtitle: "Wir umgehen öffentliche KI-APIs. Wir implementieren isolierte LLM-Infrastrukturen direkt in Ihre bestehende Netzwerkkapazität und garantieren Konformität mit UNI 11337 und ISO 19650 ohne Metadaten-Exposition.",
      cards: [
        {
          num: "01",
          title: "Die Edge-KI-Appliance",
          subtitle: "Physische Hardware",
          deployment: 'Ein individuell konfigurierter, physischer GPU-Server, der direkt in Ihrem lokalen Unternehmensnetzwerk (LAN) installiert wird.',
          outcome: '<strong class="text-brand-primary font-bold">Absolute Datensouveränität</strong>. Garantiert keinen Datenabfluss bei vertraulichen Regierungs- oder Gesundheitsinfrastrukturen. Ihre Metadaten berühren niemals ein externes Netzwerk.',
          financial: '<strong class="text-brand-primary font-bold">Beseitigt</strong> wiederkehrende Cloud-Verarbeitungsgebühren und wandelt Softwarekosten in eine sichere CapEx-Investition um.'
        },
        {
          num: "02",
          title: "Enterprise-IT-Integration",
          subtitle: "Bestehende Infrastruktur",
          deployment: "Containerisierte KI-Pipelines (Docker-Images), die direkt auf den bestehenden Unternehmensservern Ihrer IT-Abteilung bereitgestellt werden.",
          outcome: "Skalierbare algorithmische Ausführung, sicher hinter Ihrer eigenen Unternehmens-Firewall positioniert, die hunderte von Ingenieuren gleichzeitig unterstützt.",
          financial: '<strong class="text-brand-accent font-bold">Kein Hardware-CapEx</strong>. Maximiert den ROI Ihrer bestehenden Rechenzentren und eliminiert externe Latenzen.'
        },
        {
          num: "03",
          title: "Dedizierter GPU-VPS",
          subtitle: "Privater Cloud-Server",
          deployment: "Ein isolierter, dedizierter Virtual Private Server, der exklusiv für Ihr Ingenieurbüro auf sicheren europäischen Servern bereitgestellt wird.",
          outcome: "Schnelle Bereitstellung von RAG- und lokalen LLM-Funktionen ohne physischen Platzbedarf im Büro, Hardware-Beschaffung oder internen IT-Wartungsaufwand.",
          financial: 'Wandelt die KI-Integration in ein planbares <strong class="text-sky-400 font-bold">OpEx</strong>-Modell um und senkt die anfänglichen Bereitstellungskosten im Vergleich zu Hardware-Setups um <strong class="text-sky-400 font-bold">bis zu 80 %</strong>.'
        }
      ]
    },
    validationPhase: {
      tag: "// DIE VALIDIERUNGSPHASE",
      title: "Die pyBIM Proof-of-Concept (PoC) Simulation",
      desc1: "Wir erwarten keine infrastrukturellen Umstrukturierungen auf reiner Theoriebasis. Wir starten ein striktes, 48-stündiges lokales PoC-Protokoll.",
      desc2: "Wir verarbeiten eine Stichprobe Ihrer nicht vertraulichen AIA-Dokumente durch unsere RAG-Pipelines, um die algorithmische Extraktions- und Ausführungsgeschwindigkeit vor dem Rollout nachzuweisen.",
      cta: "PoC-AUDIT ANFORDERN ->",
      microcopy: "(100 % kostenlose & sichere Datenverarbeitung. Keine Kreditkarte erforderlich.)"
    },
    coreAi: {
      tag: "// Zentrale KI-Funktionen",
      title: "Verbindung vertraglicher Anforderungen mit ausführbarem Code.",
      subtitle: "Wir schließen die Lücke zwischen dem Lesen umfangreicher BIM-Abwicklungspläne (BAP) und deren Umsetzung in der Software.",
      cards: [
        {
          title: "Automatisierte Vertragsanalyse",
          desc: "Maßgeschneiderte RAG-Pipelines extrahieren sofort verbindliche Parameter und Validierungsregeln aus komplexen AIA- und BAP-Dokumenten."
        },
        {
          title: "Echtzeit-Data-Engineering",
          desc: "Die KI-Engine generiert dynamisch benutzerdefinierte Python- und C#-Skripte zur Zuordnung, Standardisierung und Injektion von Parametern direkt in die Revit-Datenbank."
        },
        {
          title: "Human-in-the-Loop Validierung",
          desc: "Alle algorithmischen Entscheidungen werden in einer benutzerdefinierten pyRevit-Benutzeroberfläche eingereiht, sodass Ihre Senior BIM Manager Änderungen vor dem endgültigen Datenbank-Commit prüfen und freigeben können."
        }
      ],
      cta: "Live-Demo der RAG-Pipeline anfordern",
      microcopy: "* Keine Kreditkarte erforderlich. Wir verarbeiten ein AIA-Musterdokument live, um die sofortige algorithmische Datenextraktion zu belegen."
    },
    poweredBy: {
      tag: ">_ AUSFÜHRUNGS-PIPELINE",
      title: "Umwandlung von KI-Direktiven in harten Code.",
      subtitle: "Unsere Infrastruktur liefert keine theoretischen Ratschläge. Sie liefert ausführbare C#- und Python-Logik direkt in Ihre BIM-Umgebung.",
      pipeline: [
        {
          title: "1. Datenerfassung (RAG)",
          desc: "Vektordatenbanken (ChromaDB) indexieren Ihre proprietären ISO-Vorgaben und BAP-Dokumente."
        },
        {
          title: "2. Logikgenerierung (Lokales LLM)",
          desc: "Die isolierte KI-Engine generiert spezifische Python/C#-Ausführungsskripte basierend auf den indexierten Regeln."
        },
        {
          title: "3. API-Ausführung",
          desc: "Maßgeschneiderte Skripte binden sich direkt an Revit- und Navisworks-APIs an, um Parameterzuordnung und Kollisionsauflösung zu automatisieren."
        },
        {
          title: "4. Validierungs-Commit",
          desc: "Änderungen werden in einer sicheren pyRevit-Staging-Umgebung zur endgültigen Freigabe durch Ihre Senior BIM Manager vorgehalten."
        }
      ]
    },
    pillars: [
      {
        title: "Agentische BIM-Koordination",
        desc: "Autonome Ausführung von Koordinationszyklen. Die KI-Engine analysiert Navisworks- und Solibri-Datenbanken, wendet regelbasierte Filter zur Beseitigung falsch-positiver Kollisionen an und leitet programmatische BCF-Berichte direkt an Ihre lokalen Server weiter."
      },
      {
        title: "LLM-gestützte API-Ausführung",
        desc: "Überwindung manueller Software-Grenzen. Lokale Large Language Models übersetzen textbasierte AIA-Vorgaben in benutzerdefinierte Python-Pipelines und C#-Add-ins und führen Parameterinjektionen sowie geometrische Modifikationen unmittelbar über die Revit-API aus."
      },
      {
        title: "Souveräne Datenstrukturierung",
        desc: "Sichere Extraktion von Lebenszyklusdaten. Die Infrastruktur strukturiert geometrische Baselines und Metadaten präzise für COBie-Lieferobjekte und ISO 19650-Konformität, sodass jede Digital-Twin-Integration vollständig offline und innerhalb Ihres LANs stattfindet."
      }
    ],
    automationWorkflow: {
      tag: ">_ SYSTEMATISCHE METHODIK",
      title: "Autonome Ausführungsarchitektur.",
      subtitle: "Die algorithmische Ausführungs-Pipeline",
      desc: "Wir ersetzen manuelle Dateneingaben und menschliche Fehler durch eine streng isolierte, dreistufige programmatische Pipeline. Die gesamte Datenverarbeitung erfolgt vollständig hinter Ihrer Unternehmens-Firewall.",
      steps: [
        {
          num: "01",
          title: "RAG-Indexierung & Datenerfassung",
          desc: "Proprietäre AIA/BAP-Protokolle und ISO-Dokumentationen werden sicher in lokalen Vektordatenbanken (ChromaDB) indexiert. Native Revit-Datenbanken und räumliche Grenzen werden vor der Ausführung programmatisch anhand dieser indexierten Regeln validiert."
        },
        {
          num: "02",
          title: "LLM-Logikgenerierung & API-Verarbeitung",
          desc: "Die isolierte KI-Engine interpretiert die indexierten Vorgaben und generiert maßgeschneiderte C#- und Python-Logik. Diese Skripte führen automatisierte Kollisionsgruppierungen, Metadaten-Injektionen und dynamische Mengenermittlungen (QTO) direkt über die Software-API ohne manuelles Eingreifen aus."
        },
        {
          num: "03",
          title: "Sicherer Datenbank-Commit & Übergabe",
          desc: "Extrahierte Daten und modifizierte Modelle werden in kollisionsfreien Datenbanken zusammengeführt. Die Infrastruktur synchronisiert ISO 19650- und UNI 11337-konforme Lieferobjekte direkt mit Ihrem internen Common Data Environment (CDE), wodurch jeglicher externer Datenabfluss ausgeschlossen ist."
        }
      ]
    },
    whoWeServe: {
      tag: ">_ SEKTORALE EINSATZVEKTOREN",
      title: "Enterprise-Integrationstopologien.",
      subtitle: "Wir bieten keine generischen SaaS-Oberflächen an. Wir implementieren maßgeschneiderte lokale LLM-Pipelines und API-Integrationen, die exakt auf die spezifischen Sicherheits- und Betriebsanforderungen von Tier-1-AEC-Unternehmen zugeschnitten sind.",
      cards: [
        {
          title: "Tier-1 Generalunternehmer",
          desc: "Bereitstellung von Edge-KI-Hardware direkt in Baustellennetzwerken oder der Firmenzentralen-LAN. Autonome Ausführung von Navisworks-Kollisionsfilterungen, programmatisches BCF-Routing und ISO 19650-Validierung vor der Übergabe an Nachunternehmer. Garantiert keinen Datenabfluss bei vertraulichen öffentlichen Infrastrukturprojekten.",
          tags: []
        },
        {
          title: "Architektur- & Ingenieurbüros (A&E)",
          desc: "Integration lokaler RAG-Pipelines zur Analyse umfangreicher AIA- und Vorgabendokumente. Das LLM übersetzt Auftraggeberanforderungen in ausführbare C#- und Python-Add-ins und automatisiert Parameterinjektionen sowie die Planerstellung direkt in Ihrer gesicherten Revit-Umgebung.",
          tags: []
        },
        {
          title: "Infrastruktur-Asset-Eigentümer",
          desc: "Strukturierung souveräner Metadaten-Baselines für den Gebäudebetrieb nach Fertigstellung. Die KI-Infrastruktur führt API-gestützte Extraktionen von COBie-Lieferobjekten durch und pflegt strikt ISO-konforme Datenbanken für eine sichere, netzunabhängige Digital-Twin-Integration.",
          tags: []
        }
      ]
    },
    roiMetrics: {
      tag: ">_ SYSTEM-BENCHMARKS (LOKALE KI VS. MANUELLE AUSFÜHRUNG)",
      title: "Algorithmische Verarbeitungsmetriken.",
      subtitle: "Leistungsdaten basierend auf lokaler Hardware-Ausführung über native Revit/Navisworks-APIs.",
      metrics: [
        {
          header: "Massive Parameterinjektion",
          target: "Metadaten-Aktualisierung für 10.000+ Elemente",
          execution: "< 5 Sekunden",
          protocol: "Wird geräuschlos im Hintergrund über benutzerdefinierte C#-API-Aufrufe ausgeführt – die grafische Revit-Benutzeroberfläche wird vollständig umgangen."
        },
        {
          header: "Vorgaben-Parsing (RAG)",
          target: "500-seitige ISO/AIA-Dokumentation",
          execution: "Sofortiger semantischer Abruf",
          protocol: "Lokal über ChromaDB indexiert. Das LLM ruft strukturelle Namenskonventionen sofort ab und wendet sie ohne manuelle Prüfung auf geometrische Parameter an."
        },
        {
          header: "Kollisionsmatrix-Filterung",
          target: "TGA vs. Tragwerk Falsch-Positive",
          execution: "Regelbasierte Bereinigung",
          protocol: "Programmatische Analyse von Solibri/Navisworks-Datenbanken zur automatischen Gruppierung, Weiterleitung und Beseitigung unkritischer geometrischer Schnittpunkte vor der manuellen Prüfung."
        }
      ]
    },
    caseStudies: {
      title: "Bewährte Umsetzung",
      subtitle: "Erfahren Sie, wie unsere Automatisierungstools reale Projekte transformieren.",
      linkText: "Fallstudie lesen",
      items: [
        { title: "Wie ein benutzerdefiniertes Python-Skript Studio X 200 Stunden bei der Planerstellung ersparte.", image: "/Pictures/Uncategorized/uncategorized-005.jpg", link: "/projects" },
        { title: "Algorithmische 4D-Bauablaufplanung für einen 50.000 m² großen Gewerbekomplex.", image: "/Pictures/BIM/bim-0078.jpg", link: "/projects" }
      ]
    },
    finalCta: {
      title: "Bereit, Ihre BIM-Workflows zu automatisieren?",
      button: "Berechnen Sie Ihren ROI / Technisches Audit"
    }
  }
};
