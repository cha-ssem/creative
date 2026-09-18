const fs = require('fs');
const path = require('path');

const projectDataPath = path.join(__dirname, '../js/project-data.js');
let rawContent = fs.readFileSync(projectDataPath, 'utf8');

const prefix = 'window.PROJECT_DATA = ';
const startIndex = rawContent.indexOf(prefix);
if (startIndex === -1) {
  console.error('window.PROJECT_DATA prefix not found');
  process.exit(1);
}

const headerComment = rawContent.substring(0, startIndex);
let jsonStr = rawContent.substring(startIndex + prefix.length).trim();
if (jsonStr.endsWith(';')) {
  jsonStr = jsonStr.slice(0, -1).trim();
}

const data = JSON.parse(jsonStr);

// 에셋 이미지 매핑 (로컬 고해상도 최적화 파일 매핑)
const assetImageMapping = {
  'Female CEO': 'images/CEO01.png',
  'AI Instructor': 'images/CEO02.png',
  'CEO Office (Night)': 'images/thumbnails/frame_00s.jpg',
  'CEO Office (Day)': 'images/thumbnails/frame_39s.jpg',
  'Training Center (AI Seminar)': 'images/Trainees.jpeg',
  'Meeting Room': 'images/Employees.jpeg',
  'Cityscape (Night)': 'images/thumbnails/frame_00s.jpg',
  'Cityscape (Day)': 'images/thumbnails/frame_39s.jpg',
  'Documents Pile': 'images/thumbnails/frame_03s.jpg',
  'Documents': 'images/thumbnails/frame_03s.jpg',
  'Laptop': 'images/thumbnails/frame_10s.jpg',
  'Coffee Cup': 'images/thumbnails/frame_20s.jpg',
  'Smartphone': 'images/thumbnails/clip07_shot11.jpg',
  'Trainees': 'images/Trainees.jpeg',
  'Employees': 'images/Employees.jpeg',
  'Large Screen': 'images/Large Screen.jpeg',
  'Pen': 'images/Pen.jpeg',
  'Young Employee': 'images/Young_Employee.jpeg',
  'Instructor': 'images/CEO02.png',
  'CEO Office': 'images/thumbnails/frame_00s.jpg',
  'Training Center': 'images/Trainees.jpeg',
  'Claude Desktop': 'images/thumbnails/frame_35s.jpg',
  'Cityscape': 'images/thumbnails/frame_39s.jpg',
  'Notepad': 'images/thumbnails/clip08_shot13.jpg'
};

if (data.assets) {
  data.assets.forEach(asset => {
    if (assetImageMapping[asset.name]) {
      asset.image = assetImageMapping[asset.name];
    } else {
      asset.image = 'images/CEO01.png';
    }
  });
}

// 19개 콘티 샷 프레임별 전용 썸네일 매핑
const frameThumbnails = [
  'images/thumbnails/clip01_shot01.jpg', // Shot 1
  'images/thumbnails/clip02_shot02.jpg', // Shot 2
  'images/thumbnails/frame_03s.jpg',     // Shot 3
  'images/thumbnails/frame_06s.jpg',     // Shot 4
  'images/thumbnails/clip03_shot04.jpg', // Shot 5
  'images/thumbnails/frame_10s.jpg',     // Shot 6
  'images/thumbnails/clip04_shot06.jpg', // Shot 7
  'images/thumbnails/frame_15s.jpg',     // Shot 8
  'images/thumbnails/clip05_shot08.jpg', // Shot 9
  'images/thumbnails/clip06_shot09.jpeg',// Shot 10
  'images/thumbnails/frame_20s.jpg',     // Shot 11
  'images/thumbnails/clip07_shot11.jpg', // Shot 12
  'images/thumbnails/clip08_shot13.jpg', // Shot 13
  'images/thumbnails/frame_25s.jpg',     // Shot 14
  'images/thumbnails/clip09_shot14.jpg', // Shot 15
  'images/thumbnails/clip10_shot15.jpg', // Shot 16
  'images/thumbnails/frame_30s.jpg',     // Shot 17
  'images/thumbnails/frame_35s.jpg',     // Shot 18
  'images/thumbnails/clip11_shot17.jpg'  // Shot 19
];

if (data.frames) {
  data.frames.forEach((frame, idx) => {
    frame.image = frameThumbnails[idx] || 'images/thumbnails/clip01_shot01.jpg';
  });
}

const updatedJson = JSON.stringify(data, null, 2);
const newContent = `${headerComment}window.PROJECT_DATA = ${updatedJson};\n`;

fs.writeFileSync(projectDataPath, newContent, 'utf8');

const finalSize = fs.statSync(projectDataPath).size;
console.log(`\n🎉 Optimization Complete!`);
console.log(`Final project-data.js size: ${(finalSize / 1024).toFixed(2)} KB`);
