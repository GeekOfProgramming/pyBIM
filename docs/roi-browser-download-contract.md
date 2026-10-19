# pyBIM — ROI Matrix Browser-Side Download Contract (ROI-01 -> ROI-02)
Version: 1.2.0 (Final Owner Decisions)

## 1. Architectural Overview & Security Boundary

This contract establishes the formal specification and integration boundary between the **ROI-01 Form & Eligibility System** and the upcoming **ROI-02 Browser-Side Workbook Engine**.

### 1.1 Separation of Responsibilities
1. **Server-Side Eligibility & Notification Gateway (`/api/roi-matrix/eligibility`) [ROI-01 / ROI-02]**:
   - IP rate limiting (5 requests / 60 seconds per IP).
   - Payload byte bounding (32KB max).
   - Cloudflare Turnstile token validation.
   - Corporate email domain filtering (blocking public consumer and disposable domains).
   - DNS MX mail-exchange record verification.
   - Explicit Privacy Policy and Terms & Conditions acknowledgment.
   - Issuance of a non-persistent stateless session verification token (`ROI-SESS-YYYY-XXXXXXXX`).
   - Secure server-side lead notification dispatch to `support@pybim.com` via existing Resend infrastructure (`EXPORT_INITIATED`).
   - **Zero server-side XLSX binary generation** on Cloudflare Workers edge compute.
2. **Client-Side Export Engine (`exceljs`) [ROI-02]**:
   - Dynamic lazy-loading of `exceljs` in the browser (`await import('exceljs')`).
   - Client-side workbook construction across four dedicated worksheets.
   - Application of cell protection, formula injection sanitization (CWE-1236), unlocked input styling, and native Excel formulas.
   - Instant client-side blob download trigger (`URL.createObjectURL(blob)`).
   - Direct download without email confirmation barriers or activation codes.

### 1.2 Security & Client-Side Download Boundary
- **Client-Side Gating Limitations**: Client-side gating serves as structured UX guidance. Browser-executed JavaScript is inherently transparent to technical users and does not constitute a cryptographic security boundary.
- **Stateless Verification vs Durable Storage**:
  - The `/api/roi-matrix/eligibility` endpoint operates statelessly. It does not write to an unapproved database or CRM.
  - Submissions are validated in-flight.
  - Any future persistent CRM/database storage requires a separate owner architectural approval decision covering purpose, data retention schedules, and GDPR compliance.

---

## 2. Shared Data Schema Contract (`ROI_SCHEMA_VERSION = "1.2.0"`)

All numerical inputs, benchmarks, and scenario definitions adhere to the typed schema in `lib/roi/roiSchema.js`.

### 2.1 Inputs Specification
```typescript
interface QuickEstimateInput {
  modelerCount: number;         // Integer >= 1, <= 500 (default: 1)
  hourlyRate?: number | string; // Optional for consulting: blank defaults to exactly €85/h.
                                // Mandatory for internal_labor: customer-supplied loaded cost.
  isRateCustom: boolean;        // False if €85 default fallback was used, true if user entered rate.
  rateType: "consulting" | "internal_labor"; // "consulting" (€85/h example) vs "internal_labor"
  searchHours: 13;              // AUTODESK_REFERENCE_HOURS_PER_WEEK (fixed immutable benchmark)
  workingWeeks: number;         // Effective annual working weeks (default: 48, range: 1–52)
  region: "global" | "dach" | "it" | "uk"; // Contextual reference only (never overwrites rate)
}
```

### 2.2 Fixed Autodesk Reference Benchmark (13 Hours)
- `AUTODESK_REFERENCE_HOURS_PER_WEEK = 13` (immutable constant in model and locked in XLSX).
- **Source Attribution**:
  - Autodesk, *2025 State of Design & Make: Spotlight on Construction*.
  - Blog: [https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/](https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/)
  - Primary Report: [https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction](https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction)
- **Attribution Invariant**: Autodesk's study measured general time spent finding project data across surveyed construction roles. It is NOT proof that every BIM Modeler spends 13 hours on manual entry, NOT proof that all 13 hours can be eliminated, and does NOT imply Autodesk validated pyBIM automation performance.

### 2.3 Exactly Five Fixed AI Adoption Scenarios
The model evaluates five fixed AI workflow adoption scenarios representing the proportion of addressable benchmark workflow time covered by AI-assisted automation:
- **Scenario 1 (20% AI Adoption)**: `ratio = 0.20`
- **Scenario 2 (40% AI Adoption)**: `ratio = 0.40`
- **Scenario 3 (60% AI Adoption)**: `ratio = 0.60`
- **Scenario 4 (80% AI Adoption)**: `ratio = 0.80`
- **Scenario 5 (100% AI Adoption)**: `ratio = 1.00` (retains 10% human verification; does NOT report 100% time elimination)

### 2.4 Fixed 10% Human Verification Allowance
- `HUMAN_VERIFICATION_RATE = 0.10` (owner-selected illustrative planning assumption).
- For each AI adoption scenario, 10% of the covered reference hours remain required for engineering review, verification, and quality control.
- **Required Formulas**:
  ```
  B = 13                                  // Fixed weekly benchmark per person
  A = adoption percentage                 // One of 0.20, 0.40, 0.60, 0.80, 1.00
  V = 0.10                                // Fixed verification allowance
  N = number of BIM professionals         // Customer-editable input
  W = effective working weeks per year    // Customer-editable input
  R = effective hourly rate               // Customer-editable input (€85 default if blank)

  AI_Covered_Hours_Per_Week = B * A
  Verification_Hours_Per_Week = AI_Covered_Hours_Per_Week * V
  Net_Recovered_Hours_Per_Week = AI_Covered_Hours_Per_Week * (1 - V)
  Remaining_Baseline_Hours_Per_Week = B - Net_Recovered_Hours_Per_Week
  Annual_Recovered_Hours_Team = B * A * (1 - V) * N * W
  Annual_Illustrative_Capacity_Value = Annual_Recovered_Hours_Team * R
  ```
- **Precision Invariant**: Use full-precision intermediate floating-point arithmetic. Round only final presentation outputs.

### 2.5 Numerical Reference Case (Standard Quality Check)
For $N = 5$, $R = €85/\text{h}$, $B = 13\text{ h/wk}$, $W = 48\text{ wks/yr}$, $V = 10\%$:
| Scenario Adoption | Net Recovered Team Hours / Year | Illustrative Consulting Value / Year |
|---|---|---|
| **20% AI Adoption** | **561.6 hrs** | **€47,736** |
| **40% AI Adoption** | **1,123.2 hrs** | **€95,472** |
| **60% AI Adoption** | **1,684.8 hrs** | **€143,208** |
| **80% AI Adoption** | **2,246.4 hrs** | **€190,944** |
| **100% AI Adoption** | **2,808.0 hrs** | **€238,680** |

---

## 3. Purpose-Built Multi-Worksheet English Workbook Architecture (ROI-02)

The generated XLSX file is delivered in **English only**, organized into four purpose-built worksheets:

```
pyBIM-ROI-Matrix-[Company].xlsx
├── 1. Executive Summary      (High-level capacity liberation, annual capacity valuation, scenario comparison)
├── 2. Workflow Inputs        (Customer-editable inputs, unlocked highlighted cells, validation rules)
├── 3. AI Adoption Scenarios  (Detailed five-tier scenario calculations, verification hours, net recovered hours)
└── 4. Assumptions & Sources  (Autodesk 2025 study citation, clickable links, 10% allowance planning disclosure)
```

### 3.1 Cell Protection & Formatting Architecture
- **Customer-Editable Cells (Unlocked, Distinct Visual Styling)**:
  - Located on `Workflow Inputs` (cells B4, B5, B6):
    - Cell B4: Number of BIM Professionals ($N$, integer $\ge 1, \le 500$)
    - Cell B5: Hourly Consulting Rate ($R$, number $> 0, \le 2000$, initially €85 when blank on website)
    - Cell B6: Effective Working Weeks / Year ($W$, integer $\ge 1, \le 52$, initially 48)
  - **Visual Treatment**: Light highlight fill (e.g. soft amber `#FEF3C7` or soft blue `#EFF6FF`) with dark border.
  - **Instruction Banner**: *"Editable input — replace this value with your organization's actual data. Results update automatically."*
  - **Cell Unlocked Flag**: `cell.protection = { locked: false };`
  - **Data Validation**: Native Excel validation rules (`whole`, `decimal`, bounds).
- **Protected Cells (Locked)**:
  - Benchmark constant $B = 13$
  - Five adoption percentages ($20\%, 40\%, 60\%, 80\%, 100\%$)
  - Verification factor $V = 0.10$
  - All mathematical formulas (`PRODUCT`, `SUM`, multiplication)
  - All computed capacity and financial output cells
  - **Worksheet Protection**: `worksheet.protect('pybim-secure-model', { selectLockedCells: true, selectUnlockedCells: true });`
- **Dynamic Recalculation**: Changing an editable input cell (e.g. rate or team size) immediately recalculates all dependent formulas in Excel without broken references.

### 3.2 Spreadsheet Security & Formula Injection Defense (CWE-1236)
All text inserted into cells (`companyName`, `userName`, notes) must be sanitized before workbook construction:
```javascript
export function sanitizeSpreadsheetText(val) {
  if (typeof val !== "string") return val;
  const trimmed = val.trim();
  if (/^[=+\-@\t\r]/.test(trimmed)) {
    return `'${trimmed}`;
  }
  return trimmed;
}
```

### 3.3 Research Links & Usable Hyperlinks
In worksheet `Assumptions & Sources`:
- Autodesk Blog Spotlight: [https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/](https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/)
- Autodesk Primary Report: [https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction](https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction)
- Added via ExcelJS hyperlink syntax:
  ```javascript
  sourcesSheet.getCell("B12").value = {
    text: "Autodesk, 2025 State of Design & Make: Spotlight on Construction in EMEA",
    hyperlink: "https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/"
  };
  ```

---

## 4. Download Notification to Support Contract (`support@pybim.com`)

The production download workflow in ROI-02 must notify pyBIM support upon download initiation:

### 4.1 Target Recipient & Channel
- **Recipient**: `support@pybim.com`
- **Infrastructure**: Existing server-side Resend abstraction (`lib/email/resendAdapter.js`).
- **Trigger Event Status**: `EXPORT_INITIATED` (do not claim the file was definitively saved to disk).

### 4.2 Required Notification Payload
```typescript
interface DownloadNotificationPayload {
  event: "EXPORT_INITIATED";
  timestamp: string;               // ISO 8601 UTC
  referenceId: string;             // ROI-SESS-YYYY-XXXXXXXX
  client: {
    name: string;
    companyName: string;
    corporateEmail: string;
    domain: string;
  };
  modelParameters: {
    modelerCount: number;
    hourlyRate: number;            // Custom rate or default 85
    isRateCustom: boolean;
    rateType: "consulting" | "internal_labor";
    workingWeeks: number;
    benchmarkWeeklyHours: 13;      // Fixed Autodesk benchmark
    humanVerificationRate: 0.10;   // Fixed 10% allowance
    regionalContext: string;
  };
  scenarioPreview: {
    scenario_20: { recoveredHours: number; capacityValue: number };
    scenario_40: { recoveredHours: number; capacityValue: number };
    scenario_60: { recoveredHours: number; capacityValue: number };
    scenario_80: { recoveredHours: number; capacityValue: number };
    scenario_100: { recoveredHours: number; capacityValue: number };
  };
  diagnosticInputs?: object | null;
}
```

### 4.3 Execution Sequence for ROI-02
1. **User Request**: User clicks *"Verify & Download ROI Matrix (.xlsx)"*.
2. **Client Validation**: Validate operational and identity inputs in browser state.
3. **Workbook Construction**: Generate and validate workbook blob in memory (`exceljs`).
4. **Server Verification & Notification**: Client sends verification payload to `/api/roi-matrix/eligibility` with flag `action: "initiate_export"`.
5. **Server Dispatch**:
   - Performs rate limiting, Turnstile bot check, corporate email validation, and MX resolution.
   - Dispatches the `EXPORT_INITIATED` notification to `support@pybim.com` via Resend adapter.
   - Confirms provider acceptance.
   - Returns successful receipt (`{ ok: true, referenceId }`).
6. **Download Trigger**: On receipt confirmation, client triggers browser file download (`a.download = ...; a.click();`).
7. **Idempotency & Retries**: Prevent multiple notification emails if user double-clicks download.
8. **Security Boundary**: Zero Resend API keys or Turnstile secret keys are exposed client-side.

---

## 5. Current Implementation Status

- **ROI-01**:
  - Optional €85 consulting rate implemented (website field initially blank).
  - Fixed 13h Autodesk benchmark locked and read-only.
  - Exactly five fixed AI adoption scenarios (20%, 40%, 60%, 80%, 100%) computed with full precision.
  - Fixed 10% human engineering verification allowance enforced.
  - Numerical test suite asserts 561.6, 1,123.2, 1,684.8, 2,246.4, 2,808.0 hours.
  - XLSX generation remains inactive pending owner approval before ROI-02.
- **ROI-02**:
  - Implementation of browser-side `exceljs` workbook builder adhering to this four-worksheet protected cell contract.
