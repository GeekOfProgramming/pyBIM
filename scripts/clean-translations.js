const fs = require('fs');
const glob = require('glob'); // Need to check if glob is available, let's just do it manually

const files = [
  'c:/bim/lib/translations/en/services-en.json',
  'c:/bim/lib/translations/it/services-it.json',
  'c:/bim/lib/translations/de/services-de.json',
  'c:/bim/lib/translations/it/about-it.json',
  'c:/bim/lib/translations/de/about-de.json',
  'c:/bim/lib/translations/it/home-it.json',
  'c:/bim/lib/translations/en/home-en.json',
  'c:/bim/lib/translations/de/home-de.json'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let updated = false;

  for (let key in data) {
    if (typeof data[key] === 'string') {
      let val = data[key];
      if (val.includes("Arvand") || val.includes("arvand") || 
          val.includes("HVAC") || val.includes("hvac") ||
          val.includes("termotec") || val.includes("Termotec") ||
          val.includes("Caldaie") || val.includes("caldaie")) {
          
        // Basic replacements
        val = val.replace(/Arvand/g, "pyBIM");
        val = val.replace(/arvand/g, "pyBIM");
        val = val.replace(/HVAC \u0026 Caldaie/g, "BIM & Automation");
        val = val.replace(/HVAC \& Boilers/g, "BIM & Automation");
        val = val.replace(/HVAC/g, "BIM");
        val = val.replace(/hvac/g, "BIM");
        val = val.replace(/termotecnici/gi, "BIM/Python");
        val = val.replace(/termotecniche/gi, "AEC software");
        val = val.replace(/termotecnica/gi, "BIM automation");
        
        data[key] = val;
        updated = true;
      }
    }
  }

  if (updated) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}`);
  }
}
console.log("Translation files cleanup complete.");
