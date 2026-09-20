const fs = require('fs');
const path = require('path');

const projectDataPath = path.join(__dirname, '../js/project-data.js');
let projectDataRaw = fs.readFileSync(projectDataPath, 'utf8');

// Load window.PROJECT_DATA
global.window = {};
eval(projectDataRaw);

const projData = global.window.PROJECT_DATA;

const traineesAsset = {
  id: 'b8c35d91-49e0-4c7b-a25e-38d6f51f98bc',
  type: 'character',
  name: 'Trainees',
  physicalCharacteristics: 'A smart, attentive Korean male professional and corporate trainee in his late 30s to early 40s with an intellectual, approachable presence. Neat dark hair styled with a refined side-part, modern dark-rimmed rectangular eyeglasses, clear warm skin tone, intelligent dark brown eyes, and a focused, respectful learning expression. Tall, well-proportioned corporate build conveying diligence and enthusiasm for AI technology.',
  clothingAccessories: 'He wears a smart-casual dark navy unstructured blazer layered over a heather charcoal gray crewneck sweater and a light blue collared button-up dress shirt, paired with medium gray tailored trousers, a brown leather belt, and classic dark brown leather dress shoes. A silver wristwatch on his left wrist. Clean, modern business-casual seminar styling.',
  backstory: 'A dedicated corporate team member and fellow trainee participating in the executive generative AI training seminar alongside the female CEO, highly motivated to master prompt engineering and drive digital transformation in team workflows.',
  image: 'images/Trainees.jpeg'
};

// Check if Trainees already exists
const existingIndex = projData.assets.findIndex(a => a.name === 'Trainees');
if (existingIndex >= 0) {
  console.log('Trainees asset already exists at index', existingIndex, '. Updating...');
  projData.assets[existingIndex] = traineesAsset;
} else {
  // Insert after Employees (character) or at the end of character assets
  const employeesIdx = projData.assets.findIndex(a => a.name === 'Employees');
  if (employeesIdx >= 0) {
    projData.assets.splice(employeesIdx + 1, 0, traineesAsset);
    console.log('Inserted Trainees asset right after Employees (index:', employeesIdx + 1, ')');
  } else {
    // Find last character index
    let lastCharIdx = -1;
    for (let i = 0; i < projData.assets.length; i++) {
      if (projData.assets[i].type === 'character') lastCharIdx = i;
    }
    projData.assets.splice(lastCharIdx + 1, 0, traineesAsset);
    console.log('Inserted Trainees asset at index:', lastCharIdx + 1);
  }
}

// Link Trainees asset to Shot 05 (The Training Session) if not already linked
const shot5 = projData.frames.find(f => f.title === 'The Training Session' || f.shotNumber === '02' && f.sceneTitle.includes('SCENE 2'));
if (shot5) {
  if (!Array.isArray(shot5.linkedAssetIds)) {
    shot5.linkedAssetIds = [];
  }
  if (!shot5.linkedAssetIds.includes(traineesAsset.id)) {
    shot5.linkedAssetIds.push(traineesAsset.id);
    console.log('Linked Trainees asset to Shot 05 (The Training Session)!');
  }
}

// Write back to js/project-data.js
const header = `/**
 * 생성형 AI로 달라진 CEO의 하루 - 프로젝트 원본 데이터
 * 생성일시: 2026-09-09T08:43:10.644Z
 * 수정일시: 2026-09-10 (동료 교육생 Trainees.jpeg 캐릭터 에셋 추가)
 */

window.PROJECT_DATA = ${JSON.stringify(projData, null, 2)};
`;

fs.writeFileSync(projectDataPath, header, 'utf8');
console.log('Successfully updated js/project-data.js with Trainees character asset!');
console.log('Total assets count:', projData.assets.length);
console.log('Character assets:', projData.assets.filter(a => a.type === 'character').map(a => a.name));
