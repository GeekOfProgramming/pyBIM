/**
 * pyBIM ROI Matrix - Shared Data Schema & Calculation Engine
 * Version: 1.1.0 (ROI-01 Review Corrections)
 *
 * Owner-Approved Architecture & Review Corrections:
 * 1. Hourly Rate & Rate-Type Integrity:
 *    - €85/hour is an editable initial example for the Illustrative Consulting Rate ONLY.
 *    - Labeled strictly as "Illustrative Consulting Rate". Never described as average BIM modeler salary.
 *    - Clearly distinguishes consulting/billing rate from internal fully loaded employee labor cost.
 *    - If user switches to Internal Loaded Labor Cost, they must supply their actual loaded labor cost.
 *    - Output metric is explicitly distinguished:
 *      * Consulting: "Hypothetical Consulting Billing Capacity Value (€)"
 *      * Internal Labor: "Hypothetical Internal Labor Capacity Value (€)"
 *    - Billing capacity value and internal cash cost savings are NEVER aggregated.
 *    - Regional context provides contextual guidance only; never overwrites user-entered rate.
 *
 * 2. Autodesk Industry Reference:
 *    - 13 hours/person/week editable industry reference for time spent finding project data.
 *    - Source: Autodesk, 2025 State of Design & Make: Spotlight on Construction.
 *    - Explicitly not presented as verified BIM modeler waste, not treated as 100% recoverable,
 *      not claimed as data entry or clash detection inefficiency, and not multiplied by arbitrary 85%.
 *    - Avoids double-counting when detailed workflow assessment is provided.
 *
 * 3. Working Weeks:
 *    - 48 effective working weeks/year as an editable initial planning assumption, not a statutory standard.
 *
 * 4. Scenario Governance & Calculation Precision:
 *    - Recovery rates (20%, 35%, 50%) are explicitly HYPOTHETICAL PLACEHOLDERS pending owner empirical decision.
 *    - 35% is NOT an empirical baseline or verified expected pyBIM performance.
 *    - Calculations use full-precision intermediate results.
 *    - Rounding occurs ONLY at final presentation outputs:
 *      * Reference case (5 modelers, €85/h, 13 hrs/wk, 48 wks, 35% recovery):
 *        Annual repetitive team hours = 5 * 13 * 48 = 3,120 hrs/yr.
 *        Expected recovered hours = exactly 1,092 hrs/yr (3,120 * 0.35).
 *        Expected illustrative consulting value = exactly €92,820/yr (1,092 * €85).
 *    - Zero hardcoded implementation prices or guaranteed financial savings.
 *
 * 5. Advanced Assessment Delineation:
 *    - No unverified silent assumptions (additional categories initialize to 0).
 *    - 60h/week cap is an individual structural sanity check, NOT a proof of semantic independence.
 */

export const ROI_SCHEMA_VERSION = "1.1.0";

export const AUTODESK_CITATION = Object.freeze({
  studyTitle: "2025 State of Design & Make: Spotlight on Construction",
  author: "Autodesk",
  publicationYear: 2025,
  finding: "Surveyed construction professionals reported spending an average of 13 hours per week finding project information across project roles.",
  primaryReportUrl: "https://boards.autodesk.com/new-era-contractors-middle-east/items/2025-state-of-design--make--spotlight-on-construction",
  blogUrl: "https://www.autodesk.com/blogs/construction/state-of-design-make-spotlight-on-construction-in-emea/",
  disclaimer: "Autodesk's study measured general time finding data across diverse construction roles. It does not measure isolated BIM modeling inefficiency, is not verified modeler waste, and should not be assumed to be 100% recoverable."
});

export const BENCHMARK_DEFAULTS = Object.freeze({
  MODELER_COUNT: 1,
  HOURLY_RATE: 85, // Illustrative Consulting Rate example
  CONSULTING_RATE: 85,
  SEARCH_HOURS_WEEK: 13,
  WORKING_WEEKS_YEAR: 48,
  RATE_TYPE_DEFAULT: "consulting",
  REGION_DEFAULT: "global"
});

export const RATE_TYPES = Object.freeze({
  consulting: {
    id: "consulting",
    labelKey: "roi.inputs.rate_type_consulting",
    defaultLabel: "Illustrative Consulting Rate",
    descriptionKey: "roi.inputs.rate_type_consulting_desc",
    defaultDescription: "Illustrative market consulting/billing rate (€85/h example). Valuates liberated capacity at external billing potential.",
    metricLabelKey: "roi.preview.metric_consulting_value",
    defaultMetricLabel: "Hypothetical Consulting Billing Capacity Value (€)"
  },
  internal_labor: {
    id: "internal_labor",
    labelKey: "roi.inputs.rate_type_internal",
    defaultLabel: "Internal Loaded Labor Cost",
    descriptionKey: "roi.inputs.rate_type_internal_desc",
    defaultDescription: "Internal employee labor cost (gross salary + employer payroll taxes + pensions + overheads). Requires customer-supplied internal cost.",
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
 * Recovery scenario rates.
 * IMPORTANT: These scenario rates are EXPLICITLY HYPOTHETICAL and unapproved placeholders pending owner decision.
 * They must NOT be described as empirical benchmarks or verified pyBIM performance.
 */
export const SCENARIO_RATIOS = Object.freeze({
  conservative: {
    id: "conservative",
    ratio: 0.20,
    percentageLabel: "20%",
    nameKey: "roi.preview.scenario_conservative",
    defaultName: "Hypothetical Scenario A (20% Recovery)",
    isHypotheticalPlaceholder: true,
    status: "unapproved_placeholder",
    description: "Hypothetical illustrative scenario (unapproved placeholder pending owner empirical benchmark review). Not an empirical baseline."
  },
  expected: {
    id: "expected",
    ratio: 0.35,
    percentageLabel: "35%",
    nameKey: "roi.preview.scenario_expected",
    defaultName: "Hypothetical Scenario B (35% Recovery)",
    isHypotheticalPlaceholder: true,
    status: "unapproved_placeholder",
    description: "Hypothetical illustrative scenario (unapproved placeholder pending owner empirical benchmark review). Not verified expected pyBIM performance."
  },
  optimized: {
    id: "optimized",
    ratio: 0.50,
    percentageLabel: "50%",
    nameKey: "roi.preview.scenario_optimized",
    defaultName: "Hypothetical Scenario C (50% Recovery)",
    isHypotheticalPlaceholder: true,
    status: "unapproved_placeholder",
    description: "Hypothetical illustrative scenario (unapproved placeholder pending owner empirical benchmark review). Not an upper-bound guarantee."
  }
});

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

  // Modeler count: integer >= 1
  const rawModelers = inputs.modelerCount !== undefined && inputs.modelerCount !== null && inputs.modelerCount !== ""
    ? Number(inputs.modelerCount)
    : NaN;
  let modelerCount = 0;
  if (isNaN(rawModelers) || !Number.isInteger(rawModelers) || rawModelers < 1 || rawModelers > 500) {
    errors.modelerCount = "Number of BIM modelers must be an integer between 1 and 500.";
  } else {
    modelerCount = rawModelers;
  }

  // Hourly Rate: finite positive number
  const rawRate = inputs.hourlyRate !== undefined && inputs.hourlyRate !== null && inputs.hourlyRate !== ""
    ? Number(inputs.hourlyRate)
    : NaN;
  let hourlyRate = 0;
  if (isNaN(rawRate) || rawRate <= 0 || !Number.isFinite(rawRate) || rawRate > 2000) {
    errors.hourlyRate = rateType === "internal_labor"
      ? "Please enter your internal loaded labor cost (€ / hour, up to €2,000)."
      : "Hourly rate must be a positive number up to €2,000/hour.";
  } else {
    hourlyRate = Math.round(rawRate * 100) / 100;
  }

  // Search Hours / Week: finite positive number (Autodesk benchmark reference)
  const rawSearch = inputs.searchHours !== undefined && inputs.searchHours !== null && inputs.searchHours !== ""
    ? Number(inputs.searchHours)
    : NaN;
  let searchHours = 0;
  if (isNaN(rawSearch) || rawSearch < 0 || !Number.isFinite(rawSearch) || rawSearch > 40) {
    errors.searchHours = "Information search hours must be between 0 and 40 hours per week.";
  } else {
    searchHours = Math.round(rawSearch * 10) / 10;
  }

  // Working Weeks / Year: integer between 1 and 52
  const rawWeeks = inputs.workingWeeks !== undefined && inputs.workingWeeks !== null && inputs.workingWeeks !== ""
    ? Number(inputs.workingWeeks)
    : NaN;
  let workingWeeks = 0;
  if (isNaN(rawWeeks) || !Number.isInteger(rawWeeks) || rawWeeks < 1 || rawWeeks > 52) {
    errors.workingWeeks = "Working weeks per year must be an integer between 1 and 52.";
  } else {
    workingWeeks = rawWeeks;
  }

  // Regional context (informational only; never mutates rate)
  const region = REGIONAL_CONTEXTS[inputs.region] ? inputs.region : "global";

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      modelerCount,
      hourlyRate,
      searchHours,
      workingWeeks,
      rateType,
      region
    }
  };
}

/**
 * Validates Advanced Workflow Assessment parameters.
 * Distinguishes:
 * 1. Information search/retrieval
 * 2. Manual information entry/transfer
 * 3. Discipline-specific BIM workflows
 * 4. Non-automatable design and engineering judgment (protected!)
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
 * Performs transparent preview calculations using full-precision intermediate results.
 * Rounds only final presentation outputs according to documented conventions.
 *
 * Mathematical Invariants:
 * - annualRepetitiveHoursTeamExact = modelers * weeklyRepetitiveHours * weeks
 * - annualRecoveredHoursExact = annualRepetitiveHoursTeamExact * scenarioRatio
 * - annualValueExact = annualRecoveredHoursExact * rate
 * - weeklyRecoveredPerPersonExact = weeklyRepetitiveHours * scenarioRatio
 *
 * Reference Case Verification:
 * 5 modelers, €85/h, 13 hrs/wk, 48 weeks, 35% hypothetical recovery:
 * annualRepetitiveHoursTeamExact = 5 * 13 * 48 = 3,120.0
 * annualRecoveredHoursExact = 3,120 * 0.35 = 1,092.0 (NOT 1,104)
 * annualValueExact = 1,092 * 85 = 92,820.0
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
  const modelers = q.modelerCount;
  const rate = q.hourlyRate;
  const weeks = q.workingWeeks;

  // Determine repetitive weekly hours to avoid double-counting
  let weeklyRepetitiveHours = q.searchHours;
  let breakdown = {
    searchHours: q.searchHours,
    manualDataEntryHours: 0,
    disciplineWorkflowsHours: 0,
    nonAutomatableJudgmentHours: 0
  };

  if (useAdvanced && advancedAssessment) {
    weeklyRepetitiveHours = advancedAssessment.repetitiveWeeklyHours;
    breakdown = {
      searchHours: advancedAssessment.searchHours,
      manualDataEntryHours: advancedAssessment.manualDataEntryHours,
      disciplineWorkflowsHours: advancedAssessment.disciplineWorkflowsHours,
      nonAutomatableJudgmentHours: advancedAssessment.nonAutomatableJudgmentHours
    };
  }

  // Full-precision intermediate baseline calculations
  const annualRepetitiveHoursPerPersonExact = weeklyRepetitiveHours * weeks;
  const annualRepetitiveHoursTeamExact = modelers * weeklyRepetitiveHours * weeks;
  const annualAllocatedValueExact = annualRepetitiveHoursTeamExact * rate;

  // Protected non-automatable judgment capacity (if advanced)
  const annualJudgmentHoursTeamExact = (breakdown.nonAutomatableJudgmentHours || 0) * weeks * modelers;

  // Valuation metric labeling based on rate type
  const isInternalLabor = q.rateType === "internal_labor";
  const valuationTypeLabel = isInternalLabor
    ? "Hypothetical Internal Labor Capacity Value (€)"
    : "Hypothetical Consulting Billing Capacity Value (€)";

  // Scenarios: Conservative (20%), Expected (35%), Optimized (50%)
  // Full-precision intermediate calculation; round only final presentation values.
  const scenarios = {};
  for (const [key, config] of Object.entries(SCENARIO_RATIOS)) {
    const weeklyRecoveredHoursPerPersonExact = weeklyRepetitiveHours * config.ratio;
    const annualRecoveredHoursExact = annualRepetitiveHoursTeamExact * config.ratio;
    const annualValueExact = annualRecoveredHoursExact * rate;

    scenarios[key] = {
      id: key,
      ratio: config.ratio,
      percentageLabel: config.percentageLabel,
      isHypotheticalPlaceholder: true,
      status: config.status,
      // Full-precision numeric values
      weeklyRecoveredHoursPerPersonExact,
      annualRecoveredHoursExact,
      annualValueExact,
      // Presentation outputs (rounded only at display boundary)
      weeklyRecoveredHoursPerPerson: Math.round(weeklyRecoveredHoursPerPersonExact * 100) / 100,
      annualRecoveredHours: Math.round(annualRecoveredHoursExact),
      annualIllustrativeValue: Math.round(annualValueExact),
      valuationTypeLabel
    };
  }

  return {
    version: ROI_SCHEMA_VERSION,
    calculatedAt: new Date().toISOString(),
    isValid: true,
    inputs: {
      modelerCount: modelers,
      hourlyRate: rate,
      rateType: q.rateType,
      region: q.region,
      workingWeeks: weeks,
      useAdvanced,
      weeklyRepetitiveHours,
      breakdown
    },
    baseline: {
      annualRepetitiveHoursTeamExact,
      annualRepetitiveHoursTeam: Math.round(annualRepetitiveHoursTeamExact),
      annualAllocatedValueExact,
      annualAllocatedValue: Math.round(annualAllocatedValueExact),
      annualJudgmentHoursTeamExact,
      annualJudgmentHoursTeam: Math.round(annualJudgmentHoursTeamExact),
      valuationTypeLabel
    },
    scenarios,
    autodeskReference: {
      citation: AUTODESK_CITATION.studyTitle,
      reportedBenchmarkWeeklyHours: 13,
      userSpecifiedSearchHours: breakdown.searchHours,
      disclaimer: AUTODESK_CITATION.disclaimer
    },
    disclaimer: "All scenario recovery percentages (20%, 35%, 50%) are unapproved hypothetical placeholders pending owner review. Figures represent an illustrative capacity valuation based on user-entered inputs, NOT guaranteed cash savings, direct payroll cost reductions, or software performance warranties."
  };
}
