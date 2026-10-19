/**
 * pyBIM ROI Excel Generator
 *
 * Provides workbook generation interface for browser and server contexts.
 * Adheres to ROI-02 specification: English-only, 4 dedicated worksheets,
 * native Excel formulas, and cell protection.
 */

import ExcelJS from "exceljs";
import {
  buildRoiWorkbook,
  generateRoiWorkbookBuffer,
  sanitizeSpreadsheetText
} from "./roi/roiWorkbookBuilder.js";

export {
  buildRoiWorkbook,
  generateRoiWorkbookBuffer,
  sanitizeSpreadsheetText
};

/**
 * Legacy compatibility wrapper.
 * Returns the approved four-worksheet English protected workbook.
 *
 * @param {object} options
 * @returns {Promise<object>}
 */
export async function buildHybridRoiWorkbook(options = {}) {
  return buildRoiWorkbook(ExcelJS, {
    userName: options.name || options.userName,
    companyName: options.companyName,
    modelerCount: options.modelerCount,
    hourlyRate: options.hourlyRate,
    workingWeeks: options.workingWeeks,
    rateType: options.rateType || "consulting",
    isRateCustom: options.isRateCustom,
    referenceId: options.referenceId,
    useAdvanced: options.useAdvanced,
    advancedAssessment: options.advancedAssessment
  });
}

export default {
  buildRoiWorkbook,
  generateRoiWorkbookBuffer,
  buildHybridRoiWorkbook,
  sanitizeSpreadsheetText
};
