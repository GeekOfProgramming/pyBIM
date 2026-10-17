# pyBIM — ROI Matrix Browser-Side Download Contract (ROI-01 -> ROI-02)

## 1. Architectural Overview & Context

This contract establishes the formal integration architecture between the **ROI-01 Form Redesign & Eligibility Verification System** and the upcoming **ROI-02 Browser-Side Workbook Engine**.

### Core Problem Solved
Generating complex multi-formula Excel spreadsheets (`.xlsx`) on serverless Cloudflare Workers previously risked exceeding strict edge CPU and memory constraints (Free/Workers execution limits, `process.umask` workarounds, buffer allocations). 

### Solution Architecture
1. **Server-Side Responsibility (ROI-01)**:
   - Corporate email domain filtering (blocking consumer/disposable domains via `validateCorporateEmail`).
   - Domain MX record verification via DNS (`verifyDomainMx`).
   - Cloudflare Turnstile bot deterrence (`verifyTurnstileToken`).
   - Schema validation and verification receipt generation (`/api/roi-matrix/eligibility`).
   - **Zero Excel generation on the edge server.**
2. **Client-Side Responsibility (ROI-02)**:
   - Dynamic lazy-loading of `exceljs` in the browser (`await import('exceljs')`).
   - Instant client-side generation and binary blob download (`URL.createObjectURL(blob)`).
   - No email delivery barrier, verification code, or link confirmation required.
   - Clean, professional single-sheet English workbook layout shared across all customer locales.

---

## 2. Shared Data Schema Contract (`ROI_SCHEMA_VERSION = "1.0.0"`)

All numerical and business identity inputs adhere to the typed schema defined in `lib/roi/roiSchema.js`.

### 2.1 Quick Estimate Inputs
```typescript
interface QuickEstimateInput {
  modelerCount: number;         // Integer >= 1, <= 500 (default: 1)
  hourlyRate: number;           // Positive finite number <= 2000 (default: €85.00)
  rateType: "consulting" | "internal_labor"; // "consulting" (€85/h example) vs "internal_labor"
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
  manualDataEntryHours: number;        // Cat 2: Manual Data Entry & Transfer (hrs/wk/person, 0–35)
  disciplineWorkflowsHours: number;    // Cat 3: Discipline-Specific BIM Workflows (hrs/wk/person, 0–35)
  nonAutomatableJudgmentHours: number; // Cat 4: Non-Automatable Engineering Judgment (hrs/wk/person, 0–40)
  repetitiveWeeklyHours: number;       // Computed: (Cat 1 + Cat 2 + Cat 3)
  totalAssessedHours: number;          // Computed: repetitiveWeeklyHours + Cat 4 (<= 60 hrs/wk max)
}
```

### 2.3 Calculated Preview Scenarios
```typescript
interface RoiScenario {
  id: "conservative" | "expected" | "optimized";
  ratio: number;                       // Conservative: 0.20, Expected: 0.35, Optimized: 0.50
  percentageLabel: string;             // "20%", "35%", "50%"
  weeklyRecoveredHoursPerPerson: number; // weeklyRepetitiveHours * ratio
  annualRecoveredHours: number;        // weeklyRecoveredHoursPerPerson * workingWeeks * modelerCount
  annualIllustrativeValue: number;     // annualRecoveredHours * hourlyRate
}
```

---

## 3. Server-Side Eligibility Verification Contract

### Endpoint
`POST /api/roi-matrix/eligibility`

### Request Payload
```json
{
  "name": "Jane Doe",
  "companyName": "AEC Studio Ltd",
  "email": "jane@aecstudio.com",
  "privacyAccepted": true,
  "turnstileToken": "<cf-turnstile-token>",
  "quickEstimate": {
    "modelerCount": 5,
    "hourlyRate": 85,
    "rateType": "consulting",
    "searchHours": 13,
    "workingWeeks": 48,
    "region": "global"
  },
  "useAdvanced": false,
  "advancedAssessment": null
}
```

### Verification Response (HTTP 200 OK)
```json
{
  "ok": true,
  "eligible": true,
  "schemaVersion": "1.0.0",
  "referenceId": "ROI-2026-A1B2C3",
  "verifiedAt": "2026-10-17T09:30:00.000Z",
  "clientSummary": {
    "name": "Jane Doe",
    "companyName": "AEC Studio Ltd",
    "domain": "aecstudio.com",
    "isInternal": false
  },
  "preview": {
    "version": "1.0.0",
    "baseline": {
      "annualRepetitiveHoursTeam": 3120,
      "annualAllocatedValue": 265200,
      "annualJudgmentHoursTeam": 0
    },
    "scenarios": {
      "conservative": { "annualRecoveredHours": 624, "annualIllustrativeValue": 53040 },
      "expected": { "annualRecoveredHours": 1092, "annualIllustrativeValue": 92820 },
      "optimized": { "annualRecoveredHours": 1560, "annualIllustrativeValue": 132600 }
    }
  },
  "downloadContract": {
    "status": "eligible_for_browser_export",
    "targetEngine": "browser_exceljs",
    "targetLocale": "en"
  }
}
```

---

## 4. ROI-02 Browser-Side Generator Specification

### 4.1 Lazy-Loaded Dynamic Import
In ROI-02, the export button dynamically imports `exceljs` so that the heavy spreadsheet library is never loaded on initial page load:
```javascript
// ROI-02 Implementation Pattern:
async function handleBrowserExport(verifiedContract) {
  // 1. Dynamic import without blocking initial bundle
  const ExcelJS = await import('exceljs');
  
  // 2. Instantiate browser workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "pyBIM Advanced BIM & Automation Lab";
  workbook.created = new Date();
  
  // 3. Build single English ISO 19650 calculation worksheet
  const sheet = workbook.addWorksheet("ISO 19650 ROI Matrix", {
    views: [{ showGridLines: true }]
  });
  
  // 4. Populate verified parameters, editable green cells, and live Excel formulas
  // ... (ROI-02 layout) ...
  
  // 5. Generate browser Blob and trigger download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `pyBIM-ROI-Matrix-${verifiedContract.clientSummary.companyName.replace(/\\W+/g, '_')}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
```

### 4.2 Language Strategy for ROI-02
- **First Release**: English only (`ISO 19650 Global AEC Framework`).
- **One Calculation Model**: Shared across EN, IT, and DE site visitors.
- **Extensibility**: Structural labels are defined in a clean dictionary to permit localized workbook sheets in future versions without duplicating calculation formula logic.
- **No duplicated calculation tabs** in version 1.0.0.

---

## 5. Deprecation Notice for Legacy Server Endpoint
- `app/api/roi-matrix/route.js` is deprecated and guarded.
- Production downloads must strictly use client-side generation (ROI-02) backed by `/api/roi-matrix/eligibility` (ROI-01).
