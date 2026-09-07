# ⚡ pyBIM | Advanced BIM & Software Development Lab

> **Sovereign AI Infrastructure, Custom Revit API Plugins, Python Pipelines & ISO 19650 Algorithmic BIM Execution.**

pyBIM is a specialized engineering and software development lab for the Architecture, Engineering, and Construction (AEC) industry across Europe, Italy, and the DACH region. We replace brute-force manual modeling and repetitive drafting bottlenecks with air-gapped Local LLM pipelines, enterprise C# (.NET) Revit plugins, and deterministic OpenBIM automation.

---

## 🌟 Key Features & Platform Modules

- 🤖 **Sovereign AI Infrastructure**: Isolated Local LLMs (Ollama, Mistral, Llama 3) and local vector databases (ChromaDB) running behind corporate firewalls with zero data leakage.
- 💻 **BIM Code & Automation**: Enterprise C# Revit API add-ins, firm-wide pyRevit toolbars, Dynamo algorithms, and headless IFC OpenShell data pipelines.
- 📊 **CDE & ISO 19650 Validation**: Absolute metadata compliance with ISO 19650 and UNI 11337, automated COBie schema validation, and Common Data Environment (CDE) management.
- 🛡️ **Client Portal & Auth Architecture**: Protected client dashboard (`/portal`), JWT authentication with `jose`, sliding-window rate limiting, and real-time execution logs.
- 📈 **Interactive Calculators & ROI Engine**:
  - **Project Execution Calculator**: Calculates timeline compression and financial margins.
  - **Infrastructure Calculator**: Custom GPU/VRAM hardware and deployment topology estimator.
  - **ROI Excel Generator (`lib/roiExcelGenerator.js`)**: Generates ISO 19650 audited, multi-sheet Excel workbooks dynamically.
- 🌓 **Dual Theme Engine**: Native Dark and Light mode toggle with zero hydration flash (`ThemeContext.js`).
- 🌐 **Trilingual Native Routing**: Complete localization across English (`en`), Italian (`it`), and German (`de`).
- ⚡ **High-Performance Next.js 14 App Router**: 165 static pre-rendered routes (SSG/SSR) with optimal first-load JS.
- 🔍 **Enterprise SEO & Structured Data**: JSON-LD schemas (`Organization`, `ProfessionalService`, `FAQPage`), dynamic sitemaps, and localized `hreflang` tags.

---

## 🛠️ Technology Stack

### Web & Cloud Platform
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **UI & Styling**: React 18, [Tailwind CSS](https://tailwindcss.com/), Lucide Icons, Embla Carousel
- **Security & Auth**: JWT (`jose`), Sliding Window In-Memory Rate Limiting, Middleware Protection
- **Spreadsheet Generation**: ExcelJS (Dynamic ISO 19650 ROI Matrix)
- **Deployment**: Vercel / European Cloud / Air-Gapped Local Appliance

### BIM & Algorithmic Automation Ecosystem
- **Core Languages**: C# (.NET 8 / .NET Framework 4.8), Python 3.11+, JavaScript / TypeScript
- **BIM APIs**: Autodesk Revit API, Navisworks API, pyRevit, Dynamo API, Autodesk APS (Forge)
- **OpenBIM & Standards**: IFC4, IFC2x3, BCF, ISO 19650-1/2, UNI 11337, COBie, Decreto BIM (D.M. 560/312)
- **AI & Vector Retrieval**: Local LLMs, LangChain, ChromaDB Vector Engine, Air-Gapped LAN Appliances

---

## 📂 Project Structure

```
c:\bim\
├── app/
│   ├── [locale]/                     # Trilingual localized routing (en, it, de)
│   │   ├── (auth)/                   # Authentication gateway
│   │   │   ├── login/                # Client Portal Login with rate limiting
│   │   │   └── register/             # Enterprise Account Access Request
│   │   ├── about/                    # Manifesto, Timeline, Tech Stack & Core Team
│   │   ├── careers/                  # Career Opportunities & Position Details
│   │   ├── contact/                  # Technical Audit Request, FAQ & Direct Channels
│   │   ├── cookie-policy/            # Cookie Consent & Policy Documentation
│   │   ├── education/                # Technical Guides & Articles ([slug] dynamic)
│   │   ├── portal/                   # Protected Client Portal (Enterprise)
│   │   │   ├── dashboard/            # System overview & active metrics
│   │   │   ├── executions/           # Programmatic logs & pipeline runs
│   │   │   ├── infrastructure/       # Dedicated GPU & local node management
│   │   │   ├── settings/             # Security keys & corporate preferences
│   │   │   └── support/              # Direct engineer ticketing (/new ticket)
│   │   ├── pricing/                  # Dual Calculators (Infrastructure & Project ROI)
│   │   ├── privacy-policy/           # GDPR & Data Governance Policy
│   │   ├── projects/                 # Featured Case Studies & Project Showcase
│   │   ├── security/                 # Air-Gapped Infrastructure & Security Protocols
│   │   ├── services/                 # Sovereign AI, Software Dev & BIM Workflows
│   │   ├── terms-and-conditions/     # Commercial Terms of Service
│   │   ├── [...rest]/                # Localized 404 Catch-All Page
│   │   ├── layout.js                 # Root Localized Layout, Language & Theme Providers
│   │   ├── loading.js                # Cyber-industrial Loading State
│   │   └── page.js                   # Homepage Gateway & Structured Data (JSON-LD)
│   ├── api/                          # Next.js Serverless Route Handlers
│   │   ├── auth/                     # Login, Logout, Register endpoints
│   │   ├── contact/                  # Audit dispatch endpoint
│   │   ├── newsletter/               # Newsletter subscription endpoint
│   │   └── roi-matrix/               # Dynamic ISO 19650 Excel file generation
│   ├── robots.js                     # Search Engine Robots Configuration
│   └── sitemap.js                    # Dynamic Multilingual Sitemap (160+ URLs)
├── components/
│   ├── layout/                       # Header, Footer, MobileBottomNav, LocalizedLink
│   ├── pages/                        # Page orchestrators (HomePageLayout, etc.)
│   ├── portal/                       # Client Portal views (Dashboard, Support, etc.)
│   ├── sections/
│   │   ├── home/                     # 8 Modular Homepage Sections:
│   │   │   ├── HeroSection.js        # Sovereign AI & Firewalled Infrastructure
│   │   │   ├── ParadigmShift.js      # Margin Erosion vs Algorithmic Execution
│   │   │   ├── DeploymentModels.js   # Edge Appliance, Enterprise IT & GPU-VPS
│   │   │   ├── ExecutionPipeline.js  # 4-Stage Deterministic Logic Flow
│   │   │   ├── SystemBenchmarks.js   # Execution metrics & ISO compliance
│   │   │   ├── CoreArchitects.js     # Practicing Engineers & AI Architects
│   │   │   ├── StrategicEcosystem.js # Autodesk API & OpenBIM Integration
│   │   │   └── ValidationProtocol.js # Proof of Concept (PoC) Audit CTA
│   │   ├── pricing/                  # Infrastructure & Execution Calculators
│   │   ├── bim-calculator-cta.js     # Standalone ROI modal & CTA
│   │   ├── faq-section.js            # Technical FAQ Accordion
│   │   └── team-partners-section.js  # Core Team & Ecosystem Showcase
│   └── ui/                           # Reusable UI (ThemeToggle, CookieConsent, Modals)
├── lib/
│   ├── data/                         # Data-driven JSON & JS sources
│   │   ├── home.json                 # Complete 8-section content across en, it, de
│   │   ├── education-data.js         # Technical tutorials & article datasets
│   │   ├── projects-data.js          # Case studies & portfolio projects
│   │   ├── servicesPageData.js       # Services capabilities data
│   │   ├── team-data.json            # Leadership & engineering profiles
│   │   └── testimonials-data.json    # Enterprise client testimonials
│   ├── translations/                 # i18n Translation Dictionaries (en, it, de)
│   │   ├── en/                       # English dictionaries (15 domain files)
│   │   ├── it/                       # Italian dictionaries (15 domain files)
│   │   ├── de/                       # German dictionaries (15 domain files)
│   │   └── index.js                  # Master dictionary aggregator
│   ├── auth.js                       # JWT signing/verification & demo user store
│   ├── LanguageContext.js            # Global i18n routing & translation provider
│   ├── rateLimit.js                  # In-memory sliding-window request throttling
│   ├── roiExcelGenerator.js          # ISO 19650 Excel matrix builder
│   ├── site-copy.js                  # Contact details & global SEO copies
│   └── ThemeContext.js               # Dark/Light theme provider with localStorage sync
├── middleware.js                     # i18n locale routing & portal route protection
├── tailwind.config.js                # Custom brand color tokens & dark-mode utilities
└── README.md                         # Comprehensive System Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` LTS
- **Package Manager**: `npm` (v9+) or `yarn`

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GeekOfProgramming/pyBIM.git
   cd pyBIM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   JWT_SECRET=your_secure_jwt_secret_key_here
   DEMO_PORTAL_EMAIL=demo@pybim.it
   DEMO_PORTAL_PASSWORD=pyBIM2026Secure
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Access the platform locally at [http://localhost:3000/en](http://localhost:3000/en).

5. **Run Production Build & Verification:**
   ```bash
   npm run build
   ```
   *Generates 165 statically optimized pages across all locales with zero TypeScript or linting errors.*

---

## 🔒 Security & Client Portal Access

For evaluation of the **Enterprise Client Portal**, use the following test credentials on the `/login` route:
- **Demo Portal**: [http://localhost:3000/en/login](http://localhost:3000/en/login)
- **Email**: `demo@pybim.it`
- **Password**: `pyBIM2026Secure`

Protected portal routes (`/portal/dashboard`, `/portal/executions`, etc.) require valid JWT tokens verified via Next.js Edge Middleware. Unauthorized requests are automatically redirected to `/[locale]/login`.

---

## 📜 Compliance & Engineering Standards

All algorithmic workflows, data schemas, and custom tools engineered by pyBIM strictly adhere to:
- **ISO 19650-1 & ISO 19650-2**: Organization and digitization of information about buildings and civil engineering works (BIM).
- **UNI 11337 (Parts 1-7)**: Italian National Standard for Digital Management of Building Information Processes.
- **Decreto BIM (D.M. 560/2017 & D.M. 312/2021)**: Italian public procurement mandates for digital modeling.
- **COBie (ISO 16739-1)**: Construction Operations Building Information Exchange asset schema.
- **GDPR & Zero-Trust IT**: Offline AI orchestration with zero external API calls for proprietary building models.

---

## 📬 Direct Engineering Channels

- **Website**: [https://pybim.com](https://pybim.com)
- **Technical Inquiries**: [info@pybim.com](mailto:info@pybim.com)
- **Careers & Code Audits**: [careers@pybim.com](mailto:careers@pybim.com)
- **Engineering Hub**: Padua & Turin, Italy

---

*Architected & Engineered with precision by the pyBIM Core Team.*
