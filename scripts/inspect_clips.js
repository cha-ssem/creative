const fs = require('fs');
const content = fs.readFileSync('js/clip-prompts-data.js', 'utf8');
const dataStr = content.replace('window.CLIP_PROMPTS_DATA = ', '').trim().replace(/;$/, '');
const clips = eval('(' + dataStr + ')');
clips.forEach(c => {
  console.log('Clip ' + c.clipId + ' [' + c.sceneId + ']: ' + c.clipTitle + ' (' + c.duration + ')');
  console.log('  ContiShots: ' + JSON.stringify(c.contiShots));
  console.log('  Assets: ' + JSON.stringify(c.linkedAssets));
  console.log('  Camera: ' + c.cameraMotion);
  console.log('  Audio: ' + c.audioMood);
  console.log('---');
});
