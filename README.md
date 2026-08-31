# ⚡ pyBIM | Advanced BIM & Software Development Lab

> **Programmatic Coordination, Custom Revit API Plugins, Python Pipelines & ISO 19650 Compliance.**

pyBIM is a specialized software development lab and engineering partner for the Architecture, Engineering, and Construction (AEC) industry across Europe and the DACH region. We replace human error and manual drafting bottlenecks with automated C# plugins, pyRevit scripts, and algorithmic OpenBIM workflows.

---

## 🌟 Key Features & Capabilities

- 🤖 **Algorithmic Engineering**: Programmatic clash detection, automated LOD 350-400 modeling, and computational MEP/structural coordination.
- 💻 **Code & Automation**: Enterprise C# Revit Add-ins, firm-wide pyRevit toolbars, Dynamo algorithms, and automated bulk data injection.
- 📊 **CDE & Lifecycle Data Integration**: Full compliance with ISO 19650 and UNI 11337, automated COBie asset extractions, ACC CDE administration, and Digital Twin API bridges.
- 🌐 **Multilingual Architecture**: Native i18n localized routing for English (`en`), Italian (`it`), and German (`de`).
- ⚡ **High-Performance Web Platform**: Built with Next.js 14 App Router, Server Components, and zero-error static page generation (SSG/SSR).
- 🔍 **Enterprise SEO & JSON-LD**: Embedded Schema.org (`Organization`, `ProfessionalService`, `FAQPage`), dynamic sitemaps, and localized `hreflang` alternate tags.

---

## 🛠️ Technology Stack

### Web & Application Architecture
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **UI & Styling**: React 18, [Tailwind CSS](https://tailwindcss.com/), Lucide Icons
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/), SQLite / PostgreSQL
- **Analytics & Deployment**: Vercel Analytics & Vercel Platform

### BIM & Automation Ecosystem
- **Programming Languages**: C# / .NET, Python, JavaScript / TypeScript
- **APIs & Frameworks**: Revit API, Autodesk APS (Forge), pyRevit, Dynamo API, Solibri API, Speckle
- **Standards & Mandates**: ISO 19650, UNI 11337, Decreto BIM (D.M. 560/312), COBie, OpenBIM (IFC, BCF)

---

## 📂 Project Structure

```
c:\bim\
├── app/
│   ├── [locale]/             # Multilingual localized page routes (en, it, de)
│   │   ├── about/            # The Manifesto, Our Journey & Tech Stack
│   │   ├── education/        # Technical Insights & Case Studies
│   │   ├── careers/          # Career Opportunities & Open Positions
│   │   ├── contact/          # Technical Support & Audit Requests
│   │   ├── projects/         # Featured Project Showcase
│   │   ├── services/         # Algorithmic Engineering, Code & Automation, CDE Data
│   │   ├── layout.js         # Root Localized Layout, Metadata & Hreflang
│   │   ├── not-found.js      # Cyber-style 404 Error Page
│   │   └── page.js           # Home Gateway Page & JSON-LD Schemas
│   ├── api/                  # Serverless API routes (Contact, Newsletter)
│   ├── robots.js             # Automated Search Engine Robots Configuration
│   └── sitemap.js            # Multilingual Dynamic Sitemap Generator
├── components/
│   ├── layout/               # Global Header, Footer, MobileNav, LocalizedLink
│   ├── pages/                # High-level Page Layouts (Home, Services, Contact, etc.)
│   ├── sections/             # Modular Section Blocks (FAQ, ROI Calculator, Trust)
│   └── ui/                   # Atomic UI Elements (Carousel, Grid Cards, Modals)
├── lib/
│   ├── data/                 # Structured JSON Datasets (Services, Projects, Blog)
│   ├── LanguageContext.js    # Client-side i18n Context Provider
│   └── db.js                 # Prisma Database Client Singleton
├── public/                   # Static Media Assets & High-Res BIM Showcases
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.x` or `v20.x`
- npm or yarn

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GeekOfProgramming/pyBIM.git
   cd pyBIM
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000/en](http://localhost:3000/en) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📜 Legal & Compliance Standards

All BIM deliverables, CDE data structures, and automation scripts produced by pyBIM comply with:
- **ISO 19650-1 / 19650-2**: International Information Management Standards.
- **UNI 11337**: Italian National BIM Mandates & Project Validation Rules.
- **Decreto BIM (D.M. 560/312)**: Italian Public Procurement Regulations.
- **COBie (ISO 16739)**: Standardized Facility Management Asset Handover.

---

## 📬 Contact & Inquiries

- **Website**: [https://pybim.com](https://pybim.com)
- **Email**: [info@pybim.com](mailto:info@pybim.com)
- **Phone / WhatsApp**: +39 351 837 3043

*Engineered with precision by pyBIM.*
