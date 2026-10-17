/**
 * pyBIM ROI Matrix - Shared Data Schema & Calculation Engine
 * Version: 1.2.0 (Final Owner Decisions)
 *
 * Owner-Approved Architecture & Invariants:
 * 1. Optional €85 Consulting Rate:
 *    - Website input is optional and initially blank with an €85/h placeholder.
 *    - If left blank, engine and workbook default to exactly €85/h.
 *    - If user enters a valid positive rate, that custom rate is preserved.
 *    - Rejects invalid non-empty entries (<= 0, non-numeric, > 2000).
 *    - Internal Loaded Labor Cost requires customer-supplied internal rate (never silently defaults to 85).
 *    - Illustrative Consulting Rate is never described as average European BIM modeler salary.
 *    - Billing capacity value and internal cash cost savings are never aggregated.
 *
 * 2. Fixed Autodesk Reference (13 Hours):
 *    - AUTODESK_REFERENCE_HOURS_PER_WEEK = 13 (immutable standard benchmark).
 *    - Displayed as a read-only benchmark on the website, locked in Excel.
 *    - Source: Autodesk, 2025 State of Design & Make: Spotlight on Construction.
 *    - Finding: locating information across surveyed construction roles.
 *    - Not verified modeler waste; not proof all 13 hours can be eliminated;
 *      does not imply Autodesk validated pyBIM automation performance.
 *
 * 3. Exactly Five Fixed AI Adoption Scenarios:
 *    - 20%, 40%, 60%, 80%, 100% adoption of addressable benchmark workflow time.
 *    - Fixed AI workflow adoption percentages, NOT time-reduction percentages.
 *    - Locked and non-editable in Excel.
 *
 * 4. Fixed 10% Human Verification Allowance:
 *    - HUMAN_VERIFICATION_RATE = 0.10 (owner-selected illustrative planning assumption).
 *    - 10% of AI-covered benchmark hours remain necessary for engineering review and quality control.
 *    - At 100% adoption, does NOT report 100% time elimination (retains 10% verification).
 *    - Formulas:
 *      * B = 13
 *      * A = adoption rate (0.20, 0.40, 0.60, 0.80, 1.00)
 *      * V = 0.10
 *      * N = modelers, W = working weeks, R = effective rate
 *      * AI_Covered_Hours_Per_Week = B * A
 *      * Verification_Hours_Per_Week = AI_Covered_Hours_Per_Week * V
 *      * Net_Recovered_Hours_Per_Week = AI_Covered_Hours_Per_Week * (1 - V)
 *      * Remaining_Baseline_Hours_Per_Week = B - Net_Recovered_Hours_Per_Week
 *      * Annual_Recovered_Hours_Team = B * A * (1 - V) * N * W
 *      * Annual_Illustrative_Capacity_Value = Annual_Recovered_Hours_Team * R
 *
 * 5. Numerical Reference Case:
 *    - N = 5, R = €85/h, B = 13 h/wk, W = 48 wks/yr, V = 10%:
 *      * 20% Adoption:  561.6 hrs/yr  |  €47,736/yr
 *      * 40% Adoption: 1,123.2 hrs/yr |  €95,472/yr
 *      * 60% Adoption: 1,684.8 hrs/yr | €143,208/yr
 *      * 80% Adoption: 2,246.4 hrs/yr | €190,944/yr
 *      * 100% Adoption: 2,808.0 hrs/yr| €238,680/yr
 */

export const ROI_SCHEMA_VERSION = "1.2.0";

export const AUTODESK_REFERENCE_HOURS_PER_WEEK = 13;
export const HUMAN_VERIFICATION_RATE = 0.10;
export const DEFAULT_CONSULTING_RATE = 85;
export const DEFAULT_WORKING_WEEKS = 48;

export const AUTODESK_CITATION = Object.freeze({
  studyTitle: "2025 State of Design & Make: Spotlight on Construction",
  author: "Autodesk",
  publicationYear: 2025,
  finding: "Surveyed construction professionals reported spending an average of 13 hours per week finding project information across project roles.",
  primaryReportUrl: "https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction",
  blogUrl: "https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/",
  disclaimer: "Autodesk's 13-hour observation measures general time locating project data across surveyed construction roles. It does not measure isolated BIM modeling inefficiency, is not verified modeler waste, does not prove that all 13 hours can be eliminated, and does not imply Autodesk validated pyBIM automation performance."
});

export const BENCHMARK_DEFAULTS = Object.freeze({
  MODELER_COUNT: 1,
  HOURLY_RATE: DEFAULT_CONSULTING_RATE, // Backward-compat alias
  CONSULTING_RATE: DEFAULT_CONSULTING_RATE,
  AUTODESK_REFERENCE_HOURS_PER_WEEK,
  SEARCH_HOURS_WEEK: AUTODESK_REFERENCE_HOURS_PER_WEEK,
  WORKING_WEEKS_YEAR: DEFAULT_WORKING_WEEKS,
  HUMAN_VERIFICATION_RATE,
  RATE_TYPE_DEFAULT: "consulting",
  REGION_DEFAULT: "global"
});

export const RATE_TYPES = Object.freeze({
  consulting: {
    id: "consulting",
    labelKey: "roi.inputs.rate_type_consulting",
    defaultLabel: "Illustrative Consulting Rate",
    descriptionKey: "roi.inputs.rate_type_consulting_desc",
    defaultDescription: "Optional illustrative market consulting/billing rate (€85/h example). Valuates liberated capacity at external billing potential.",
    metricLabelKey: "roi.preview.metric_consulting_value",
    defaultMetricLabel: "Hypothetical Consulting Billing Capacity Value (€)"
  },
  internal_labor: {
    id: "internal_labor",
    labelKey: "roi.inputs.rate_type_internal",
    defaultLabel: "Internal Loaded Labor Cost",
    descriptionKey: "roi.inputs.rate_type_internal_desc",
    defaultDescription: "Internal employee labor cost (gross salary + employer payroll taxes + pensions + overheads). Requires explicitly supplied internal cost.",
    metricLabelKey: "roi.preview.metric_internal_labor_value",
    defaultMetricLabel: "Hypothetical Internal Labor Capacity Value (€)"
  }
});

export const REGIONAL_CONTEXTS = Object.freeze({
  global: {
    id: "global",
    name: "European / Global Baseline (Default)",
    description: "General reference across European and international AEC delivery frameworks."
  },
  dach: {
    id: "dach",
    name: "DACH (Germany, Austria, Switzerland)",
    description: "Consultancy and engineering rates reflect DIN EN ISO 19650 and HOAI service phase structures."
  },
  it: {
    id: "it",
    name: "Italy (UNI 11337 / Public Procurement)",
    description: "Tariffs and labor rates align with UNI 11337 guidelines and public infrastructure tender schedules."
  },
  uk: {
    id: "uk",
    name: "UK / International Practice",
    description: "Billing baselines align with UK BIM Framework and regional consultancy advisory standards."
  }
});

/**
 * Exactly Five Fixed AI Adoption Scenarios.
 * These represent the proportion of the addressable benchmark workflow time covered by AI-assisted automation,
 * NOT time-reduction percentages.
 */
export const AI_ADOPTION_SCENARIOS = Object.freeze({
  scenario_20: {
    id: "scenario_20",
    key: "scenario_20",
    adoptionRate: 0.20,
    ratio: 0.20,
    percentageLabel: "20%",
    nameKey: "roi.scenarios.scenario_20",
    defaultName: "20% AI Workflow Adoption",
    descriptionKey: "roi.scenarios.scenario_20_desc",
    defaultDescription: "20% of addressable benchmark workflow time assisted by AI automation."
  },
  scenario_40: {
    id: "scenario_40",
    key: "scenario_40",
    adoptionRate: 0.40,
    ratio: 0.40,
    percentageLabel: "40%",
    nameKey: "roi.scenarios.scenario_40",
    defaultName: "40% AI Workflow Adoption",
    descriptionKey: "roi.scenarios.scenario_40_desc",
    defaultDescription: "40% of addressable benchmark workflow time assisted by AI automation."
  },
  scenario_60: {
    id: "scenario_60",
    key: "scenario_60",
    adoptionRate: 0.60,
    ratio: 0.60,
    percentageLabel: "60%",
    nameKey: "roi.scenarios.scenario_60",
    defaultName: "60% AI Workflow Adoption",
    descriptionKey: "roi.scenarios.scenario_60_desc",
    defaultDescription: "60% of addressable benchmark workflow time assisted by AI automation."
  },
  scenario_80: {
    id: "scenario_80",
    key: "scenario_80",
    adoptionRate: 0.80,
    ratio: 0.80,
    percentageLabel: "80%",
    nameKey: "roi.scenarios.scenario_80",
    defaultName: "80% AI Workflow Adoption",
    descriptionKey: "roi.scenarios.scenario_80_desc",
    defaultDescription: "80% of addressable benchmark workflow time assisted by AI automation."
  },
  scenario_100: {
    id: "scenario_100",
    key: "scenario_100",
    adoptionRate: 1.00,
    ratio: 1.00,
    percentageLabel: "100%",
    nameKey: "roi.scenarios.scenario_100",
    defaultName: "100% AI Workflow Adoption",
    descriptionKey: "roi.scenarios.scenario_100_desc",
    defaultDescription: "100% of addressable benchmark workflow time assisted by AI automation (10% human engineering verification retained)."
  }
});

// Backward compatibility alias for any existing consumer
export const SCENARIO_RATIOS = AI_ADOPTION_SCENARIOS;

/**
 * Validates Quick Estimate parameters.
 *
 * @param {object} inputs
 * @returns {{ valid: boolean, errors: Record<string, string>, sanitized: object }}
 */
export function validateQuickEstimate(inputs = {}) {
  const errors = {};

  // Rate type resolution
  const rateType = inputs.rateType === "internal_labor" ? "internal_labor" : "consulting";

  // Modeler count: integer >= 1, <= 500
  const rawModelers = inputs.modelerCount !== undefined && inputs.modelerCount !== null && inputs.modelerCount !== ""
    ? Number(inputs.modelerCount)
    : NaN;
  let modelerCount = 0;
  if (isNaN(rawModelers) || !Number.isInteger(rawModelers) || rawModelers < 1 || rawModelers > 500) {
    errors.modelerCount = "Number of BIM modelers must be an integer between 1 and 500.";
  } else {
    modelerCount = rawModelers;
  }

  // Working Weeks / Year: integer between 1 and 52 (defaults to DEFAULT_WORKING_WEEKS if omitted/blank)
  let workingWeeks = DEFAULT_WORKING_WEEKS;
  if (inputs.workingWeeks !== undefined && inputs.workingWeeks !== null && inputs.workingWeeks !== "") {
    const rawWeeks = Number(inputs.workingWeeks);
    if (isNaN(rawWeeks) || !Number.isInteger(rawWeeks) || rawWeeks < 1 || rawWeeks > 52) {
      errors.workingWeeks = "Working weeks per year must be an integer between 1 and 52.";
    } else {
      workingWeeks = rawWeeks;
    }
  }

  // Hourly Rate resolution:
  // - Consulting: Optional on website. If empty/blank/undefined -> fallback to exactly €85/h.
  //   If non-empty, must be a valid positive number up to 2000.
  // - Internal Labor: Mandatory. User must provide their actual internal loaded rate.
  let hourlyRate = DEFAULT_CONSULTING_RATE;
  let isRateCustom = false;

  const rawRateStr = inputs.hourlyRate !== undefined && inputs.hourlyRate !== null
    ? String(inputs.hourlyRate).trim()
    : "";

  if (rateType === "consulting") {
    if (rawRateStr === "") {
      // Optional fallback to owner-approved default €85/h
      hourlyRate = DEFAULT_CONSULTING_RATE;
      isRateCustom = false;
    } else {
      const numRate = Number(rawRateStr);
      if (isNaN(numRate) || !Number.isFinite(numRate) || numRate <= 0 || numRate > 2000) {
        errors.hourlyRate = "Hourly consulting rate must be a positive number up to €2,000/hour, or left blank to use the €85/h example.";
      } else {
        hourlyRate = Math.round(numRate * 100) / 100;
        isRateCustom = true;
      }
    }
  } else {
    // internal_labor: explicitly requires customer-supplied internal rate
    if (rawRateStr === "") {
      errors.hourlyRate = "Please enter your organization's internal loaded labor cost (€ / hour, up to €2,000).";
    } else {
      const numRate = Number(rawRateStr);
      if (isNaN(numRate) || !Number.isFinite(numRate) || numRate <= 0 || numRate > 2000) {
        errors.hourlyRate = "Internal loaded labor cost must be a positive number up to €2,000/hour.";
      } else {
        hourlyRate = Math.round(numRate * 100) / 100;
        isRateCustom = true;
      }
    }
  }

  // Fixed Autodesk Benchmark: 13 hrs/week per person (immutable)
  const searchHours = AUTODESK_REFERENCE_HOURS_PER_WEEK;

  // Regional context (informational only; never mutates rate)
  const region = REGIONAL_CONTEXTS[inputs.region] ? inputs.region : "global";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      modelerCount,
      hourlyRate,
      isRateCustom,
      searchHours,
      workingWeeks,
      rateType,
      region
    }
  };
}

/**
 * Validates Advanced Workflow Assessment parameters (diagnostic assessment).
 *
 * Distinguishes:
 * 1. Information search/retrieval (Autodesk 13h benchmark)
 * 2. Manual information entry/transfer
 * 3. Discipline-specific BIM workflows
 * 4. Non-automatable design and engineering judgment (protected human capacity)
 *
 * NOTE: The 60-hour/week cap is an individual sanity check against impossible individual
 * work weeks. It does NOT by itself guarantee absence of semantic overlap among categories.
 *
 * @param {object} inputs
 * @returns {{ valid: boolean, errors: Record<string, string>, sanitized: object }}
 */
export function validateAdvancedAssessment(inputs = {}) {
  const errors = {};

  const parseNonNeg = (val, fieldName, max = 35) => {
    if (val === undefined || val === null || val === "") return 0;
    const num = Number(val);
    if (isNaN(num) || num < 0 || !Number.isFinite(num) || num > max) {
      errors[fieldName] = `${fieldName} must be a number between 0 and ${max} hours.`;
      return 0;
    }
    return Math.round(num * 10) / 10;
  };

  const searchHours = parseNonNeg(inputs.searchHours, "searchHours", 35);
  const manualDataEntryHours = parseNonNeg(inputs.manualDataEntryHours, "manualDataEntryHours", 35);
  const disciplineWorkflowsHours = parseNonNeg(inputs.disciplineWorkflowsHours, "disciplineWorkflowsHours", 35);
  const nonAutomatableJudgmentHours = parseNonNeg(inputs.nonAutomatableJudgmentHours, "nonAutomatableJudgmentHours", 40);

  const repetitiveTotal = Math.round((searchHours + manualDataEntryHours + disciplineWorkflowsHours) * 10) / 10;
  const grandTotal = Math.round((repetitiveTotal + nonAutomatableJudgmentHours) * 10) / 10;

  if (grandTotal > 60) {
    errors.grandTotal = "Total assessed weekly hours per person cannot exceed 60 hours/week. (Note: this cap serves as a sanity check, not a guarantee of semantic independence).";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      searchHours,
      manualDataEntryHours,
      disciplineWorkflowsHours,
      nonAutomatableJudgmentHours,
      repetitiveWeeklyHours: repetitiveTotal,
      totalAssessedHours: grandTotal
    }
  };
}

/**
 * Calculates ROI Preview metrics across the Five Fixed AI Adoption Scenarios.
 *
 * Formulas:
 * - B = 13 (AUTODESK_REFERENCE_HOURS_PER_WEEK)
 * - A = scenario adoption rate (0.20, 0.40, 0.60, 0.80, 1.00)
 * - V = 0.10 (HUMAN_VERIFICATION_RATE)
 * - N = modelers, W = working weeks, R = effective rate
 * - AI_Covered_Hours_Per_Week = B * A
 * - Verification_Hours_Per_Week = AI_Covered_Hours_Per_Week * V
 * - Net_Recovered_Hours_Per_Week = AI_Covered_Hours_Per_Week * (1 - V)
 * - Remaining_Baseline_Hours_Per_Week = B - Net_Recovered_Hours_Per_Week
 * - Annual_Recovered_Hours_Team = B * A * (1 - V) * N * W
 * - Annual_Illustrative_Capacity_Value = Annual_Recovered_Hours_Team * R
 *
 * Full-precision intermediate calculations; round only for display.
 *
 * @param {object} params
 * @param {object} params.quickEstimate Sanitized Quick Estimate inputs
 * @param {boolean} [params.useAdvanced] Whether Advanced Assessment is active
 * @param {object} [params.advancedAssessment] Sanitized Advanced Assessment inputs
 * @returns {object} Calculated metrics, scenarios, and audit metadata
 */
export function calculateRoiPreview({ quickEstimate, useAdvanced = false, advancedAssessment = null }) {
  if (!quickEstimate || !quickEstimate.modelerCount || !quickEstimate.hourlyRate) {
    return {
      version: ROI_SCHEMA_VERSION,
      calculatedAt: new Date().toISOString(),
      isValid: false,
      disclaimer: "Preview paused: Please enter valid calculation parameters above."
    };
  }

  const q = quickEstimate;
  const N = q.modelerCount;
  const R = q.hourlyRate;
  const W = q.workingWeeks;
  const B = AUTODESK_REFERENCE_HOURS_PER_WEEK; // 13 hours/week fixed benchmark
  const V = HUMAN_VERIFICATION_RATE;          // 10% fixed verification factor

  // Baseline team repetitive hours
  const annualBaselineHoursTeamExact = B * N * W;
  const annualAllocatedValueExact = annualBaselineHoursTeamExact * R;

  // Valuation metric labeling based on rate type
  const isInternalLabor = q.rateType === "internal_labor";
  const valuationTypeLabel = isInternalLabor
    ? "Hypothetical Internal Labor Capacity Value (€)"
    : "Hypothetical Consulting Billing Capacity Value (€)";

  // Optional diagnostic breakdown (retained for diagnostic assessment without altering standard benchmark)
  let breakdown = {
    searchHours: B,
    manualDataEntryHours: 0,
    disciplineWorkflowsHours: 0,
    nonAutomatableJudgmentHours: 0
  };
  let annualJudgmentHoursTeamExact = 0;

  if (useAdvanced && advancedAssessment) {
    breakdown = {
      searchHours: advancedAssessment.searchHours,
      manualDataEntryHours: advancedAssessment.manualDataEntryHours,
      disciplineWorkflowsHours: advancedAssessment.disciplineWorkflowsHours,
      nonAutomatableJudgmentHours: advancedAssessment.nonAutomatableJudgmentHours
    };
    annualJudgmentHoursTeamExact = (breakdown.nonAutomatableJudgmentHours || 0) * W * N;
  }

  // Calculate the Five Fixed AI Adoption Scenarios
  const scenarios = {};
  for (const [key, config] of Object.entries(AI_ADOPTION_SCENARIOS)) {
    const A = config.adoptionRate;

    // Weekly hours per person
    const aiCoveredHoursPerWeekExact = B * A;
    const verificationHoursPerWeekExact = aiCoveredHoursPerWeekExact * V;
    const netRecoveredHoursPerWeekExact = aiCoveredHoursPerWeekExact * (1 - V);
    const remainingBaselineHoursPerWeekExact = B - netRecoveredHoursPerWeekExact;

    // Annual team totals (full precision)
    const annualRecoveredHoursTeamExact = B * A * (1 - V) * N * W;
    const annualIllustrativeValueExact = annualRecoveredHoursTeamExact * R;

    scenarios[key] = {
      id: config.id,
      key: config.key,
      adoptionRate: A,
      percentageLabel: config.percentageLabel,
      humanVerificationRate: V,
      isFixedScenario: true,

      // Full-precision numeric values
      aiCoveredHoursPerWeekExact,
      verificationHoursPerWeekExact,
      netRecoveredHoursPerWeekExact,
      remainingBaselineHoursPerWeekExact,
      annualRecoveredHoursTeamExact,
      annualIllustrativeValueExact,

      // Presentation outputs (rounded only at display boundary)
      annualRecoveredHours: Math.round(annualRecoveredHoursTeamExact * 10) / 10,
      annualIllustrativeValue: Math.round(annualIllustrativeValueExact),
      aiCoveredHoursPerWeek: Math.round(aiCoveredHoursPerWeekExact * 10) / 10,
      verificationHoursPerWeek: Math.round(verificationHoursPerWeekExact * 10) / 10,
      weeklyRecoveredHoursPerPerson: Math.round(netRecoveredHoursPerWeekExact * 10) / 10,
      remainingBaselineHoursPerWeek: Math.round(remainingBaselineHoursPerWeekExact * 10) / 10,
      valuationTypeLabel
    };
  }

  return {
    version: ROI_SCHEMA_VERSION,
    calculatedAt: new Date().toISOString(),
    isValid: true,
    constants: {
      autodeskReferenceHoursPerWeek: B,
      humanVerificationRate: V,
      defaultConsultingRate: DEFAULT_CONSULTING_RATE
    },
    inputs: {
      modelerCount: N,
      hourlyRate: R,
      isRateCustom: q.isRateCustom || false,
      rateType: q.rateType,
      region: q.region,
      workingWeeks: W,
      useAdvanced,
      breakdown
    },
    baseline: {
      annualRepetitiveHoursTeamExact: annualBaselineHoursTeamExact,
      annualRepetitiveHoursTeam: Math.round(annualBaselineHoursTeamExact * 10) / 10,
      annualAllocatedValueExact,
      annualAllocatedValue: Math.round(annualAllocatedValueExact),
      annualJudgmentHoursTeamExact,
      annualJudgmentHoursTeam: Math.round(annualJudgmentHoursTeamExact * 10) / 10,
      valuationTypeLabel
    },
    scenarios,
    autodeskReference: {
      citation: AUTODESK_CITATION.studyTitle,
      reportedBenchmarkWeeklyHours: B,
      primaryReportUrl: AUTODESK_CITATION.primaryReportUrl,
      blogUrl: AUTODESK_CITATION.blogUrl,
      disclaimer: AUTODESK_CITATION.disclaimer
    },
    verificationAllowanceNotice: "For each AI adoption scenario, a fixed 10% engineering verification allowance is retained for quality control and technical review. This 10% factor is an owner-selected planning assumption, not an Autodesk research result or verified pyBIM performance benchmark. Actual client workflow outcomes may require additional setup, exception handling, and residual manual effort.",
    disclaimer: "All figures represent an illustrative capacity valuation based on customer-selected planning inputs and the Autodesk 13h/wk industry reference. Figures do NOT represent guaranteed revenue, net profit, direct cash savings, payroll cost reductions, or software sales warranties."
  };
}
