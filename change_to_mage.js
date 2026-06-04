// change_to_mage.js - Node script to rename Nage back to Mage Optique

const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Nage') || content.includes('nage')) {
    content = content
      .replace(/Nage Optique/g, 'Mage Optique')
      .replace(/Nage optique/g, 'Mage optique')
      .replace(/nageoptique/g, 'mageoptique')
      .replace(/nage-optique/g, 'mage-optique')
      .replace(/NAGE OPTIQUE/g, 'MAGE OPTIQUE');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated to Mage in:', path.basename(filePath));
  }
}

const files = [
  'index.html',
  'boutique.html',
  'services.html',
  'details.html',
  'a-propos.html',
  'contact.html',
  'admin.html',
  'DESIGN.md',
  'README.md',
  'js/db.js',
  'js/main.js',
  '.stitch/designs/accueil.html',
  '.stitch/designs/a_propos.html',
  '.stitch/designs/boutique.html',
  '.stitch/designs/contact.html',
  '.stitch/designs/details_essai.html',
  '.stitch/designs/services.html'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    replaceInFile(fullPath);
  }
});
