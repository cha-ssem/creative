const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../js/clip-prompts-data.js');
const generateScriptPath = path.join(__dirname, '../scripts/generate_prompts.js');

const code = fs.readFileSync(dataFilePath, 'utf8');
const window = {};
eval(code);

const clips = window.CLIP_PROMPTS_DATA || [];

function removeModelName(text) {
  if (!text) return '';
  return text
    .replace(/\[Seedance\s*2\.0\s*\|\s*/gi, '[')
    .replace(/\[Seedance\s*\|\s*/gi, '[')
    .replace(/\[Omni\s*Flash\s*1\.1\s*\|\s*/gi, '[')
    .replace(/\[Omni\s*Flash\s*\|\s*/gi, '[')
    .replace(/Seedance\s*2\.0\s*,?\s*/gi, '')
    .replace(/Seedance\s*,?\s*/gi, '')
    .trim();
}

const updatedClips = clips.map(clip => {
  const newPrompts = {};
  for (const [k, v] of Object.entries(clip.prompts || {})) {
    newPrompts[k] = removeModelName(v);
  }
  return {
    ...clip,
    prompts: newPrompts
  };
});

// Update js/clip-prompts-data.js
const outputData = `/**
 * Video Prompt Data for 10 Clips
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Universal Direct Copy & Ready for Video Generation.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(updatedClips, null, 2)};
`;
fs.writeFileSync(dataFilePath, outputData, 'utf8');

// Update scripts/generate_prompts.js
const outputGenerate = `const fs = require('fs');
const path = require('path');

const clipsData = ${JSON.stringify(updatedClips, null, 2)};

const outputPath = path.join(__dirname, '../js/clip-prompts-data.js');
const fileContent = \`/**
 * Video Prompt Data for 10 Clips
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Universal Direct Copy & Ready for Video Generation.
 */
window.CLIP_PROMPTS_DATA = \${JSON.stringify(clipsData, null, 2)};
\`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('Successfully generated', outputPath);
`;
fs.writeFileSync(generateScriptPath, outputGenerate, 'utf8');

console.log('Successfully removed all Seedance model names from prompts!');
