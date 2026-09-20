const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../js/clip-prompts-data.js');
const generateScriptPath = path.join(__dirname, '../scripts/generate_prompts.js');

const code = fs.readFileSync(dataFilePath, 'utf8');
const window = {};
eval(code);

const clips = window.CLIP_PROMPTS_DATA || [];

const thumbMap = {
  1: 'images/thumbnails/clip01_shot01.jpg',
  2: 'images/thumbnails/clip02_shot02.jpg',
  3: 'images/thumbnails/clip03_shot04.jpg',
  4: 'images/thumbnails/clip04_shot06.jpg',
  5: 'images/thumbnails/clip05_shot08.jpg',
  6: 'images/thumbnails/clip06_shot11.jpg',
  7: 'images/thumbnails/clip07_shot13.jpg',
  8: 'images/thumbnails/clip08_shot14.jpg',
  9: 'images/thumbnails/clip09_shot15.jpg',
  10: 'images/thumbnails/clip10_shot17.jpg'
};

const updatedClips = clips.map(clip => {
  return {
    ...clip,
    thumb: thumbMap[clip.clipId] || clip.thumb
  };
});

// Update clip-prompts-data.js
const outputData = `/**
 * Video Prompt Data for 10 Clips (Seedance 2.0 & Omni Flash)
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Thumbnails mapped to each clip's minimum shot number.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(updatedClips, null, 2)};
`;
fs.writeFileSync(dataFilePath, outputData, 'utf8');

// Update generate_prompts.js
const outputGenerate = `const fs = require('fs');
const path = require('path');

const clipsData = ${JSON.stringify(updatedClips, null, 2)};

const outputPath = path.join(__dirname, '../js/clip-prompts-data.js');
const fileContent = \`/**
 * Video Prompt Data for 10 Clips (Seedance 2.0 & Omni Flash)
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Thumbnails mapped to each clip's minimum shot number.
 */
window.CLIP_PROMPTS_DATA = \${JSON.stringify(clipsData, null, 2)};
\`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('Successfully generated', outputPath);
`;
fs.writeFileSync(generateScriptPath, outputGenerate, 'utf8');

console.log('Successfully updated thumbnails for all 10 clips!');
