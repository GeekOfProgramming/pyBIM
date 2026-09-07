const path = require('path');
const fs = require('fs');
const { buildHybridRoiWorkbook } = require('../lib/roiExcelGenerator');

async function buildROIWorkbook(options = {}) {
  return await buildHybridRoiWorkbook(options);
}

// Standalone execution if called via CLI
if (require.main === module) {
  (async () => {
    // Generate the multi-language hybrid workbook with default EN view
    const workbook = await buildHybridRoiWorkbook({
      name: "Executive Engineering Lead",
      companyName: "Enterprise Architecture & Engineering Partner",
      modelerCount: 5,
      hourlyRate: 85.0,
      avgHoursWasted: 12.0,
      workingWeeks: 48,
      language: 'en'
    });

    const dir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, 'pyBIM-Automation-ROI-Calculator.xlsx');
    await workbook.xlsx.writeFile(filePath);
    console.log(`Protected 3-Tab Hybrid Excel file successfully created at: ${filePath}`);
  })().catch(console.error);
}

module.exports = { buildROIWorkbook };
