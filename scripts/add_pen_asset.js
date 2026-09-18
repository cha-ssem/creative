const fs = require('fs');
const path = require('path');

const projectDataPath = path.join(__dirname, '../js/project-data.js');
let projectDataRaw = fs.readFileSync(projectDataPath, 'utf8');

// Load window.PROJECT_DATA
global.window = {};
eval(projectDataRaw);

const projData = global.window.PROJECT_DATA;

const penAsset = {
  id: 'd8e4f1a2-3b5c-4e7d-91a0-62e84d12f35b',
  type: 'prop',
  name: 'Pen',
  physicalCharacteristics: 'A premium, weighted executive ballpoint pen crafted from solid brushed stainless steel and titanium alloy with a refined matte metallic finish. Features a cross-hatched knurled diamond-pattern grip section for ergonomic control, a polished chrome center band ring, a sleek spring-steel pocket clip, and a smooth tactile top click mechanism. Photorealistic, minimalist, durable, and luxurious corporate writing instrument.',
  clothingAccessories: '',
  backstory: 'A signature executive pen used by the CEO for strategic planning, brainstorming notes, and signing key business partnerships.',
  image: 'images/Pen.jpeg'
};

// Check if Pen already exists
const existingIndex = projData.assets.findIndex(a => a.name === 'Pen');
if (existingIndex >= 0) {
  console.log('Pen asset already exists at index', existingIndex, '. Updating...');
  projData.assets[existingIndex] = penAsset;
} else {
  // Insert right after Notepad or at the end of props
  const notepadIdx = projData.assets.findIndex(a => a.name === 'Notepad');
  if (notepadIdx >= 0) {
    projData.assets.splice(notepadIdx + 1, 0, penAsset);
    console.log('Inserted Pen asset right after Notepad (index:', notepadIdx + 1, ')');
  } else {
    projData.assets.push(penAsset);
    console.log('Appended Pen asset to assets array');
  }
}

// Link Pen asset to Frame 13 (Shot 13: Creative Idea Expansion) alongside Notepad
const shot13 = projData.frames.find(f => f.title === 'Creative Idea Expansion' || f.index === 13 || f.shotNumber === '13');
if (shot13) {
  if (!Array.isArray(shot13.linkedAssetIds)) {
    shot13.linkedAssetIds = [];
  }
  if (!shot13.linkedAssetIds.includes(penAsset.id)) {
    shot13.linkedAssetIds.push(penAsset.id);
    console.log('Linked Pen asset to Shot 13 (Creative Idea Expansion)!');
  }
}

// Write back to js/project-data.js
const header = `/**
 * 생성형 AI로 달라진 CEO의 하루 - 프로젝트 원본 데이터
 * 생성일시: 2026-09-09T08:43:10.644Z
 * 수정일시: 2026-09-10 (소품 & 도구 Pen.jpeg 에셋 추가)
 */

window.PROJECT_DATA = ${JSON.stringify(projData, null, 2)};
`;

fs.writeFileSync(projectDataPath, header, 'utf8');
console.log('Successfully updated js/project-data.js with Pen prop asset!');
console.log('Total assets count:', projData.assets.length);
console.log('Prop assets:', projData.assets.filter(a => a.type === 'prop').map(a => a.name));
