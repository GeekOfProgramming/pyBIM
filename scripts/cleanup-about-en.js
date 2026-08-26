const fs = require('fs');
const path = 'c:/bim/lib/translations/en/about-en.json';
let data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Keep only keys starting with "about.manifesto."
for (let key in data) {
  if (!key.startsWith("about.manifesto.")) {
    delete data[key];
  }
}

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log("Cleanup complete");
