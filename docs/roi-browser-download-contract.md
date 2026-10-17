# pyBIM — ROI Matrix Browser-Side Download Contract (ROI-01 -> ROI-02)
Version: 1.1.0 (Review Corrections)

## 1. Architectural Overview & Security Boundary

This contract establishes the formal integration architecture between the **ROI-01 Form Redesign & Eligibility Verification System** and the upcoming **ROI-02 Browser-Side Workbook Engine**.

### 1.1 Separation of Responsibilities
1. **Server-Side Verification (`/api/roi-matrix/eligibility`) [ROI-01]**:
   - Corporate email domain filtering (blocking consumer/disposable domains via `validateCorporateEmail`).
   - Domain MX record verification via DNS (`verifyDomainMx`).
   - Cloudflare Turnstile bot deterrence (`verifyTurnstileToken`).
   - Strict numerical schema validation (`lib/roi/roiSchema.js`).
   - Issuance of a non-persistent stateless session verification reference.
   - **Zero server-side XLSX generation** on Cloudflare Workers edge compute.
2. **Client-Side Export Engine [ROI-02]**:
   - Dynamic lazy-loading of `exceljs` in the browser (`await import('exceljs')`).
   - Client-side workbook construction, deterministic formula evaluation, and instant blob download (`URL.createObjectURL(blob)`).
   - Direct download without email delivery friction, verification codes, or confirmation links.

### 1.2 Security & Client-Side Download Boundary
- **Client-Side Gating Limitations**: Client-side download gating is designed as an interactive UX guidance flow, not a cryptographically enforced security sandbox. Code running in the browser can theoretically be inspected by advanced users; therefore, proprietary mathematical weights or sensitive business secrets must not be stored in client-side bundles.
- **Lead Capture & Privacy Policy Decision Gate**:
  - The `/api/roi-matrix/eligibility` endpoint is completely **stateless**. It validates input structure, Turnstile token, and DNS MX records in-flight, returning a non-persistent session token (`ROI-SESS-YYYY-XXXXXXXX`).
  - Submissions are **NOT** durably stored in a database or emailed to sales.
  - **Owner Decision Gate**: Any future persistent lead capture constitutes a separate owner-level architectural decision requiring explicit approval for purpose, retention schedule, GDPR compliance, and encryption at rest.

---

## 2. Shared Data Schema Contract (`ROI_SCHEMA_VERSION = "1.1.0"`)

All numerical and business identity inputs adhere to the typed schema defined in `lib/roi/roiSchema.js`.

### 2.1 Quick Estimate Inputs
```typescript
interface QuickEstimateInput {
  modelerCount: number;         // Integer >= 1, <= 500 (default: 1)
  hourlyRate: number;           // Positive finite number <= 2000
  rateType: "consulting" | "internal_labor"; // "consulting" (€85/h example) vs "internal_labor" (customer-supplied)
  searchHours: number;          // Autodesk reference benchmark (default: 13.0 hrs/wk/person, range: 0–40)
  workingWeeks: number;         // Effective annual working weeks (default: 48, range: 1–52)
  region: "global" | "dach" | "it" | "uk"; // Contextual reference only (never overwrites rate)
}
```

### 2.2 Optional Advanced Workflow Assessment Inputs
When active, Categories 1–3 replace `searchHours` to eliminate double-counting. Category 4 is protected:
```typescript
interface AdvancedAssessmentInput {
  searchHours: number;                 // Cat 1: Information Search & Retrieval (hrs/wk/person, 0–35)
  manualDataEntryHours: number;        // Cat 2: Manual Data Entry & Transfer (hrs/wk/person, 0–35, default: 0)
  disciplineWorkflowsHours: number;    // Cat 3: Discipline-Specific BIM Workflows (hrs/wk/person, 0–35, default: 0)
  nonAutomatableJudgmentHours: number; // Cat 4: Non-Automatable Engineering Judgment (hrs/wk/person, 0–40, default: 0)
  repetitiveWeeklyHours: number;       // Computed: (Cat 1 + Cat 2 + Cat 3)
  totalAssessedHours: number;          // Computed: repetitiveWeeklyHours + Cat 4 (<= 60 hrs/wk max sanity check)
}
```

*Note*: The 60-hour/week cap serves as an individual sanity check against impossible individual work weeks. It does not by itself guarantee the absence of semantic overlap across workflow categories.

### 2.3 Scenario Assumptions & Decision Gate
The recovery rates are explicitly **hypothetical placeholders pending owner empirical decision**:
- **Scenario A (20% Recovery)**: Hypothetical conservative phased rollout.
- **Scenario B (35% Recovery)**: Hypothetical moderate scenario (**NOT** verified expected pyBIM performance).
- **Scenario C (50% Recovery)**: Hypothetical optimized scenario (**NOT** an upper-bound guarantee).
- **No Cash Guarantee**: Figures represent illustrative capacity liberation, not direct cash savings, guaranteed payroll reductions, or software sales warranties.

### 2.4 Mathematical Invariants & Precision Rules
- Use full-precision intermediate floating-point numbers:
  $$\text{Annual Repetitive Team Hours} = \text{Modelers} \times \text{Weekly Repetitive Hours} \times \text{Working Weeks}$$
  $$\text{Annual Recovered Hours Exact} = \text{Annual Repetitive Team Hours} \times \text{Scenario Ratio}$$
  $$\text{Annual Value Exact} = \text{Annual Recovered Hours Exact} \times \text{Hourly Rate}$$
- Round **only** final presentation outputs:
  - $\text{Annual Recovered Hours} = \operatorname{round}(\text{Annual Recovered Hours Exact})$
  - $\text{Annual Value} = \operatorname{round}(\text{Annual Value Exact})$
- Reference Case Verification:
  - 5 modelers, €85/h, 13 hrs/wk, 48 wks, 35% hypothetical recovery:
  - $\text{Annual Repetitive Hours} = 5 \times 13 \times 48 = 3,120.0\text{ hrs}$
  - $\text{Expected Recovered Hours} = 3,120 \times 0.35 = 1,092.0\text{ hrs}$ (Defect fix: exactly 1,092 hrs, not 1,104 hrs)
  - $\text{Expected Value} = 1,092 \times 85 = €92,820.00$

---

## 3. Purpose-Built Multi-Worksheet English Workbook Architecture (ROI-02)

To maintain clarity, auditability, and compliance with the language strategy, ROI-02 will produce **one single English-language XLSX workbook** containing four dedicated worksheets:

```
pyBIM-ROI-Matrix-[Company].xlsx
├── 1. Executive Summary      (High-level metrics, team scale, baseline allocation, scenario comparison)
├── 2. Workflow Assessment    (Granular task breakdown, search vs manual entry vs BIM modeling vs judgment)
├── 3. Financial Scenarios    (Capacity valuation across 20%, 35%, 50% hypothetical scenarios)
└── 4. Assumptions & Sources  (Autodesk 2025 study citation, planning assumptions, rate-type methodology, disclaimers)
```

### 3.1 Standards & Regulatory Honesty
- **No ISO 19650 Productivity Certification**: ISO 19650 is an international framework for managing information over the lifecycle of a built asset. It does not measure, certify, or publish productivity statistics. The workbook must **not** claim ISO 19650 compliance certification or ISO-derived savings percentages.
- **Single Calculation Engine**: All formulas in the four worksheets reference a unified input parameter block on Worksheet 1 or Worksheet 4.
- **No Locale-Duplicated Worksheets**: No parallel EN/IT/DE calculation tabs. The workbook is exported in English for the initial release.

### 3.2 Spreadsheet Security & Formula Injection Defense (CWE-1236)
When user-supplied text (such as `companyName`, `clientName`) is written into cells, it must be sanitized:
```javascript
function sanitizeCellText(str) {
  if (typeof str !== "string") return str;
  const trimmed = str.trim();
  // Strip or escape formula trigger characters: =, +, -, @, tab, CR
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}
```

### 3.3 Dynamic Lazy-Loading Implementation Pattern
```javascript
// ROI-02 Implementation Pattern (Client-Side Only):
async function generateRoiWorkbook(contractData) {
  // 1. Lazy-load ExcelJS dynamically
  const ExcelJS = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "pyBIM Advanced BIM & Automation Lab";
  workbook.created = new Date();

  // 2. Sheet 1: Executive Summary
  const summarySheet = workbook.addWorksheet("Executive Summary");
  // ... populated via shared model formulas ...

  // 3. Sheet 2: Workflow Assessment
  const assessmentSheet = workbook.addWorksheet("Workflow Assessment");
  // ... categorized task breakdown ...

  // 4. Sheet 3: Financial Scenarios
  const scenariosSheet = workbook.addWorksheet("Financial Scenarios");
  // ... full-precision scenario formulas ...

  // 5. Sheet 4: Assumptions & Sources
  const sourcesSheet = workbook.addWorksheet("Assumptions & Sources");
  // ... Autodesk 2025 citation, rate type distinction, disclaimers ...

  // 6. Generate binary blob and trigger browser download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pyBIM-ROI-Matrix-${contractData.clientSummary.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);
}
```

---

## 4. Current Status & Transition
- **ROI-01**: Form redesign, typed schema, full-precision math, rate-type integrity, and stateless eligibility check completed.
- **Workbook Generation**: Final XLSX export is **NOT** activated or generated in ROI-01.
- **ROI-02 Engineering**: Will begin strictly after owner approval of the ROI-01 model and decision on scenario rates.
