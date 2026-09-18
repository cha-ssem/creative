const fs = require('fs');
const path = require('path');

const projectDataPath = path.join(__dirname, '../js/project-data.js');
let projectDataRaw = fs.readFileSync(projectDataPath, 'utf8');

// Load window.PROJECT_DATA
global.window = {};
eval(projectDataRaw);

const projData = global.window.PROJECT_DATA;
const targetAsset = projData.assets.find(a => a.name === 'Large Screen');

if (targetAsset) {
  console.log('Found Large Screen asset (id:', targetAsset.id, '). Updating image path...');
  targetAsset.image = 'images/Large Screen.jpeg';
} else {
  console.error('Large Screen asset not found!');
  process.exit(1);
}

// Write back to js/project-data.js
const header = `/**
 * 생성형 AI로 달라진 CEO의 하루 - 프로젝트 원본 데이터
 * 생성일시: 2026-09-09T08:43:10.644Z
 * 수정일시: 2026-09-10 (Large Screen 소품 이미지를 images/Large Screen.jpeg 파일로 업데이트)
 */

window.PROJECT_DATA = ${JSON.stringify(projData, null, 2)};
`;

fs.writeFileSync(projectDataPath, header, 'utf8');
console.log('Successfully updated js/project-data.js with images/Large Screen.jpeg!');

// Also update the JSON export files if they exist
const jsonFiles = [
  '생성형 AI로 달라진 CEO의 하루 - 2026-09-09_17-41.json',
  '생성형 AI로 달라진 CEO의 하루 - 2026-09-09_17-00.json'
];

jsonFiles.forEach(fileName => {
  const jsonPath = path.join(__dirname, '..', fileName);
  if (fs.existsSync(jsonPath)) {
    try {
      const jsonContent = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      if (jsonContent.assets && Array.isArray(jsonContent.assets)) {
        const assetInJson = jsonContent.assets.find(a => a.name === 'Large Screen');
        if (assetInJson) {
          assetInJson.image = 'images/Large Screen.jpeg';
          fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf8');
          console.log(`Successfully updated ${fileName} with images/Large Screen.jpeg!`);
        }
      }
    } catch (e) {
      console.warn(`Could not update ${fileName}:`, e.message);
    }
  }
});
