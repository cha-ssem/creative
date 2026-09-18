const fs = require('fs');
const content = fs.readFileSync('js/project-data.js', 'utf8');
const dataStr = content.replace('window.PROJECT_DATA = ', '').trim().replace(/;$/, '');
const data = eval('(' + dataStr + ')');
(data.assets || []).forEach(a => {
  console.log(`[${a.type}] @${a.name.replace(/\s+/g, '_')}`);
  if (a.physicalCharacteristics) console.log('  Physical:', a.physicalCharacteristics.substring(0, 100) + '...');
  if (a.clothingAccessories) console.log('  Clothing:', a.clothingAccessories.substring(0, 100) + '...');
  if (a.architectureEnvironment) console.log('  Arch:', a.architectureEnvironment.substring(0, 100) + '...');
  if (a.visualSpecifications) console.log('  Visual:', a.visualSpecifications.substring(0, 100) + '...');
});
