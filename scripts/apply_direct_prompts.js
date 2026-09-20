const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../js/clip-prompts-data.js');
const generateScriptPath = path.join(__dirname, '../scripts/generate_prompts.js');

// Read from current generate_prompts.js or raw data
const rawScriptCode = fs.readFileSync(generateScriptPath, 'utf8');
const match = rawScriptCode.match(/const clipsData = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find clipsData in generate_prompts.js');
  process.exit(1);
}

let clipsData;
eval('clipsData = ' + match[1]);

function convertToDirectPrompt(rawText, isEn) {
  if (!rawText) return '';
  const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
  const actionLines = [];
  const charLines = [];
  const lightLines = [];
  let currentSection = '';

  lines.forEach(line => {
    const lower = line.toLowerCase();
    if (
      lower.includes('camera & subject action') ||
      lower.includes('camera & action') ||
      lower.includes('카메라 & 피사체 액션') ||
      lower.includes('시네마틱 카메라 & 피사체 연출') ||
      lower.includes('카메라 & 액션') ||
      lower.includes('카메라 & 연출')
    ) {
      currentSection = 'action';
      return;
    }
    if (
      lower.includes('character consistency') ||
      lower.includes('캐릭터 일관성')
    ) {
      currentSection = 'char';
      return;
    }
    if (
      lower.includes('lighting & style') ||
      lower.includes('lighting & tone') ||
      lower.includes('조명 & 스타일') ||
      lower.includes('조명 & 색조')
    ) {
      currentSection = 'light';
      return;
    }
    if (
      line.startsWith('[') ||
      line.startsWith('★') ||
      line.includes('images/') ||
      line.includes('스토리보드') ||
      line.startsWith('- [Shot') ||
      line.startsWith('- In:') ||
      line.startsWith('- Out:') ||
      lower.includes('primary visual') ||
      lower.includes('1순위') ||
      lower.includes('secondary asset') ||
      lower.includes('2순위') ||
      lower.includes('continuity') ||
      lower.includes('연결성') ||
      lower.includes('sound fx') ||
      lower.includes('sound:') ||
      lower.includes('사운드') ||
      lower.includes('ambience') ||
      lower.includes('오디오') ||
      line.includes('━')
    ) {
      currentSection = '';
      return;
    }

    let cleanLine = line
      .replace(/^-\s*/, '')
      .replace(/\s*\(@[^\)]+\)/g, '')
      .replace(/@[a-zA-Z0-9_]+/g, '')
      .replace(/\s+:/g, ':')
      .replace(/:\s*/g, ': ')
      .replace(/\(\s*,\s*\)/g, '')
      .replace(/\(\s*\)/g, '')
      .replace(/ {2,}/g, ' ')
      .trim();

    if (currentSection === 'action' && cleanLine) {
      actionLines.push(cleanLine);
    } else if (currentSection === 'char' && cleanLine) {
      charLines.push(cleanLine);
    } else if (currentSection === 'light' && cleanLine) {
      lightLines.push(cleanLine);
    }
  });

  const parts = [];
  if (actionLines.length) parts.push(actionLines.join('\n'));
  if (charLines.length) parts.push(charLines.join('\n'));
  if (lightLines.length) parts.push(lightLines.join('\n'));

  if (parts.length === 0) {
    const fallbackLines = lines.filter(l => 
      !l.startsWith('[') && 
      !l.startsWith('★') && 
      !l.includes('images/') && 
      !l.includes('━') &&
      !l.startsWith('- [Shot')
    ).map(l => l.replace(/^-\s*/, '').replace(/@[a-zA-Z0-9_]+/g, '').trim()).filter(Boolean);
    if (fallbackLines.length) {
      parts.push(fallbackLines.join('\n\n'));
    } else {
      parts.push(rawText.trim());
    }
  }

  const fullResult = parts.join('\n\n');
  const specTag = isEn ? 'Cinematic photorealistic, 4K resolution, 24fps.' : '시네마틱 실사, 4K 해상도, 24fps.';
  if (!fullResult.toLowerCase().includes('4k resolution') && !fullResult.toLowerCase().includes('4k 해상도')) {
    return fullResult + '\n\n' + specTag;
  }
  return fullResult;
}

// Convert all clips
const updatedClips = clipsData.map(clip => {
  const newPrompts = {};
  for (const [k, v] of Object.entries(clip.prompts || {})) {
    const isEn = k.endsWith('_en');
    newPrompts[k] = convertToDirectPrompt(v, isEn);
  }
  return {
    ...clip,
    prompts: newPrompts
  };
});

// Write to js/clip-prompts-data.js
const outputCode = `/**
 * Video Prompt Data for 10 Clips (Direct AI Generation Prompts)
 * Pure action, character consistency descriptions, and cinematic lighting/style.
 * Ready for immediate copy & video generation in Seedance 2.0, Kling, Runway, Sora, etc.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(updatedClips, null, 2)};
`;
fs.writeFileSync(dataFilePath, outputCode, 'utf8');

// Write to scripts/generate_prompts.js
const updatedGenerateScript = `const fs = require('fs');
const path = require('path');

const clipsData = ${JSON.stringify(updatedClips, null, 2)};

const outputPath = path.join(__dirname, '../js/clip-prompts-data.js');
const fileContent = \`/**
 * Video Prompt Data for 10 Clips (Direct AI Generation Prompts)
 * Pure action, character consistency descriptions, and cinematic lighting/style.
 * Ready for immediate copy & video generation in Seedance 2.0, Kling, Runway, Sora, etc.
 */
window.CLIP_PROMPTS_DATA = \${JSON.stringify(clipsData, null, 2)};
\`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log('Successfully generated', outputPath);
`;
fs.writeFileSync(generateScriptPath, updatedGenerateScript, 'utf8');

console.log('Successfully updated js/clip-prompts-data.js & scripts/generate_prompts.js!');
