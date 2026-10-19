const path = require('path');
const fs = require('fs');

async function buildROIWorkbook(options = {}) {
  const { buildHybridRoiWorkbook } = await import('../lib/roiExcelGenerator.js');
  return await buildHybridRoiWorkbook(options);
}

// Standalone execution if called via CLI
if (require.main === module) {
  (async () => {
    const workbook = await buildROIWorkbook({
      name: "Executive Engineering Lead",
      companyName: "Enterprise Architecture & Engineering Partner",
      modelerCount: 5,
      hourlyRate: 85.0,
      workingWeeks: 48,
      language: 'en'
    });

    const dir = path.join(__dirname, '..', 'public', 'downloads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const filePath = path.join(dir, 'pyBIM-Automation-ROI-Calculator.xlsx');
    await workbook.xlsx.writeFile(filePath);
    console.log(`Protected English 4-Worksheet Excel file successfully created at: ${filePath}`);
  })().catch(console.error);
}

module.exports = { buildROIWorkbook };
