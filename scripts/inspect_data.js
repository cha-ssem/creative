const fs = require('fs');
const content = fs.readFileSync('js/project-data.js', 'utf8');
const dataStr = content.replace('window.PROJECT_DATA = ', '').trim().replace(/;$/, '');
const data = eval('(' + dataStr + ')');

console.log('=== Project Overview ===');
console.log('Title:', data.projectTitle);
console.log('Global Style:', data.globalStyle);
console.log('Subtitles Count:', data.subtitles ? data.subtitles.length : 0);
console.log('Assets Count:', data.assets ? data.assets.length : 0);

console.log('\n=== Assets List ===');
(data.assets || []).forEach((a, i) => {
  console.log((i+1) + '. [' + a.type + '] ' + a.name + ' (image: ' + (a.image ? (a.image.startsWith('data:') ? 'base64' : a.image) : 'none') + ')');
});

console.log('\n=== Top-level Keys ===');
console.log(Object.keys(data));

if (data.storyboard) {
  console.log('\n=== Storyboard Count:', data.storyboard.length);
  data.storyboard.forEach((s, i) => {
    console.log('Shot ' + (i+1) + ': ' + (s.shotNumber || s.title || s.name) + ' | ' + (s.sceneTitle || s.scene));
  });
}
