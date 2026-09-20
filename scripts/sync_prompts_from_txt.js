const fs = require('fs');
const path = require('path');

const videoPromptPath = path.join(__dirname, '..', 'video_prompt.txt');
const clipPromptsDataPath = path.join(__dirname, '..', 'js', 'clip-prompts-data.js');

const rawText = fs.readFileSync(videoPromptPath, 'utf8');

// 기존 clip-prompts-data.js 읽기 (유튜브 URL 및 메타데이터 보존)
let existingData = [];
try {
  const existingContent = fs.readFileSync(clipPromptsDataPath, 'utf8');
  const match = existingContent.match(/window\.CLIP_PROMPTS_DATA\s*=\s*(\[[\s\S]*?\]);?/);
  if (match) {
    existingData = eval(match[1]);
  }
} catch (e) {
  console.warn('Existing data load failed:', e);
}

// video_prompt.txt 파싱
const clipBlocks = rawText.split(/={40,}\r?\n\[Scene\s+/i);

const newClips = [];

clipBlocks.forEach((block, idx) => {
  if (idx === 0) return; // 헤더 제외
  
  const headerMatch = block.match(/(\d+)\s*-\s*Clip\s*(\d+)\]\s*([^\r\n]+)/i);
  if (!headerMatch) return;
  
  const sceneNum = parseInt(headerMatch[1], 10);
  const clipNum = parseInt(headerMatch[2], 10);
  const clipTitle = headerMatch[3].trim();
  
  // 콘티, 참조 에셋, 스펙 추출
  const contiMatch = block.match(/•\s*콘티:\s*([^\r\n]+)/);
  const assetsMatch = block.match(/•\s*참조 에셋:\s*([^\r\n]+)/);
  const specMatch = block.match(/•\s*스펙:\s*([^\r\n]+)/);
  
  // 프롬프트 본문 추출: [Duration: ...]부터 끝까지
  const promptBodyMatch = block.match(/(\[Duration:[\s\S]*)/);
  const promptBody = promptBodyMatch ? promptBodyMatch[1].trim() : '';
  
  // Duration 파싱
  const durMatch = promptBody.match(/Duration:\s*(\d+s)/i);
  const duration = durMatch ? durMatch[1] : '8s';
  
  // Scene ID 및 타이틀 매핑
  const sceneTitles = {
    1: '늦은 밤의 도시, 혼자 남은 CEO',
    2: '생성형 AI 교육',
    3: 'AI와 시작하는 아침 루틴',
    4: '실무 협업 & 스마트 미팅',
    5: '달라진 일상, 비포 & 애프터',
    6: '새로운 리더십과 브랜드 엔딩'
  };
  
  const clipId = newClips.length + 1;
  const sceneId = `SCENE 0${sceneNum}`;
  const sceneTitle = sceneTitles[sceneNum] || `SCENE 0${sceneNum}`;
  
  // 썸네일 매핑
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
    10: 'images/thumbnails/clip10_shot17.jpg',
    11: 'images/thumbnails/clip10_shot17.jpg'
  };
  
  // linkedAssets 파싱
  let linkedAssets = [];
  if (assetsMatch) {
    linkedAssets = assetsMatch[1].split(/,\s*/).map(s => s.trim()).filter(Boolean);
  }
  
  // 기존 비디오 링크 매핑
  const existingClip = existingData.find(c => c.clipId === clipId) || {};
  
  newClips.push({
    clipId: clipId,
    sceneId: sceneId,
    sceneTitle: sceneTitle,
    clipTitle: clipTitle,
    contiShots: [
      contiMatch ? contiMatch[1] : clipTitle
    ],
    duration: duration,
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: existingClip.thumb || thumbMap[clipId] || 'images/thumbnails/clip01_shot01.jpg',
    linkedAssets: linkedAssets.length > 0 ? linkedAssets : ["@Female_CEO"],
    cameraMotion: "Cinematic Camera & Lighting",
    audioMood: "시네마틱 사운드 디자인, 현장 앰비언스, 배경음악",
    prompts: {
      seedance_en: promptBody,
      seedance_kr: promptBody, // Seedance 프롬프트 원문
      omni_en: promptBody,
      omni_kr: promptBody
    },
    videoUrl: existingClip.videoUrl || "",
    youtubeId: existingClip.youtubeId || ""
  });
});

console.log(`Parsed ${newClips.length} clips from video_prompt.txt`);

const outputCode = `/**
 * Video Prompt Data for ${newClips.length} Clips
 * Fully Synced and Updated with video_prompt.txt
 * Complete Directing, Sequence Continuity, Character Consistency Lock, and Spatial Blocking.
 */
window.CLIP_PROMPTS_DATA = ${JSON.stringify(newClips, null, 2)};
`;

fs.writeFileSync(clipPromptsDataPath, outputCode, 'utf8');
console.log('Successfully updated js/clip-prompts-data.js');
