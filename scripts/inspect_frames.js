const fs = require('fs');
const content = fs.readFileSync('js/project-data.js', 'utf8');
const dataStr = content.replace('window.PROJECT_DATA = ', '').trim().replace(/;$/, '');
const data = eval('(' + dataStr + ')');

console.log('=== Frames Count:', data.frames ? data.frames.length : 0);
if (data.frames) {
  data.frames.forEach((f, i) => {
    console.log(`[Frame ${i+1}] ID: ${f.id} | Scene: ${f.sceneNumber || f.scene} | Shot: ${f.shotNumber || f.shotName || f.title} | Time: ${f.timestamp || f.time}`);
    if (f.description) console.log('  Desc:', f.description.substring(0, 80) + '...');
    if (f.prompt) console.log('  Prompt:', f.prompt.substring(0, 80) + '...');
  });
}
