const fs = require('fs');
const path = require('path');

// 1. Parse video_link.txt
const linkTxtPath = path.join(__dirname, '../video_link.txt');
const linkTxt = fs.readFileSync(linkTxtPath, 'utf8');
const lines = linkTxt.split('\n').map(l => l.trim()).filter(Boolean);

const linkMap = {};
for (let i = 0; i < lines.length; i += 2) {
  const clipId = parseInt(lines[i].replace('CLIP', '').trim());
  const url = lines[i + 1];
  const idMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  linkMap[clipId] = {
    videoUrl: url,
    youtubeId: idMatch ? idMatch[1] : ''
  };
}

console.log('Parsed video links:', linkMap);

// 2. Update js/clip-prompts-data.js
const clipPromptsPath = path.join(__dirname, '../js/clip-prompts-data.js');
let clipPromptsRaw = fs.readFileSync(clipPromptsPath, 'utf8');

global.window = {};
eval(clipPromptsRaw);

const clips = global.window.CLIP_PROMPTS_DATA;
clips.forEach(clip => {
  if (linkMap[clip.clipId]) {
    clip.videoUrl = linkMap[clip.clipId].videoUrl;
    clip.youtubeId = linkMap[clip.clipId].youtubeId;
  }
});

const clipPromptsContent = `/**
 * Video Prompt Data for 10 Clips
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Universal Direct Copy & Ready for Video Generation.
 * Includes YouTube Video Results URLs & IDs.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(clips, null, 2)};
`;

fs.writeFileSync(clipPromptsPath, clipPromptsContent, 'utf8');
console.log('Successfully updated js/clip-prompts-data.js with videoUrl and youtubeId!');

// 3. Update scripts/generate_prompts.js
const genPromptsPath = path.join(__dirname, 'generate_prompts.js');
if (fs.existsSync(genPromptsPath)) {
  let genRaw = fs.readFileSync(genPromptsPath, 'utf8');
  // eval to get clips
  let genClips = null;
  try {
    const sandbox = { window: {}, module: {} };
    eval('var window = {}; ' + genRaw + '; genClips = window.CLIP_PROMPTS_DATA;');
  } catch (e) {
    // fallback
  }

  // Alternatively read clips and write formatted
  const genContent = `/**
 * Video Prompt Data for 10 Clips
 * Complete Directing, Sequence Continuity, Exact Duration, Character Consistency Lock, and Native Korean Dialogue.
 * Universal Direct Copy & Ready for Video Generation.
 * Includes YouTube Video Results URLs & IDs.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(clips, null, 2)};
`;
  fs.writeFileSync(genPromptsPath, genContent, 'utf8');
  console.log('Successfully updated scripts/generate_prompts.js!');
}
