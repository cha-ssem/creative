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
  'Female CEO': 'images/Female_CEO.jpeg',
  'AI Instructor': 'images/Instructor.jpeg',
  'CEO Office (Night)': 'images/thumbnails/frame_00s.jpg',
  'CEO Office (Day)': 'images/thumbnails/frame_39s.jpg',
  'Training Center (AI Seminar)': 'images/Trainees.jpeg',
  'Meeting Room': 'images/Meeting_room.jpeg',
  'Cityscape (Night)': 'images/thumbnails/frame_00s.jpg',
  'Cityscape (Day)': 'images/thumbnails/frame_39s.jpg',
  'Documents Pile': 'images/Documents.jpeg',
  'Documents': 'images/Documents.jpeg',
  'Laptop': 'images/Laptop.jpeg',
  'Coffee Cup': 'images/Coffee_Cup.jpeg',
  'Smartphone': 'images/thumbnails/clip07_shot11.jpg',
  'Trainees': 'images/Trainees.jpeg',
  'Employees': 'images/Employees.jpeg',
  'Large Screen': 'images/Large Screen.jpeg',
  'Pen': 'images/Pen.jpeg',
  'Young Employee': 'images/Young_Employee.jpeg',
  'Instructor': 'images/Instructor.jpeg',
  'CEO Office': 'images/CEO_Office.jpeg',
  'Training Center': 'images/Training_Center.jpeg',
  'Claude Desktop': 'images/Claude_Desktop.jpeg',
  'Cityscape': 'images/Cityscape.jpeg',
  'Notepad': 'images/Notepad.jpeg'
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

// 19개 콘티 샷 프레임별 전용 썸네일 매핑 (images/storyboard/)
const frameThumbnails = [
  'images/storyboard/1-1_The_Lonely_Skyscraper_20260910115831.jpeg',       // Shot 1
  'images/storyboard/1-2_The_Fatigued_CEO_20260910115840.jpeg',            // Shot 2
  'images/storyboard/1-3_Buried_in_Paperwork_20260910115847.jpeg',         // Shot 3
  'images/storyboard/2-1_The_Training_Screen_20260910115858.jpeg',         // Shot 4
  'images/storyboard/2-2_The_Training_Session_20260910115903.jpeg',        // Shot 5
  'images/storyboard/2-3_Hands-On_Experience_20260910115908.jpeg',         // Shot 6
  'images/storyboard/2-4_A_Moment_of_Discovery_20260910115919.jpeg',       // Shot 7
  'images/storyboard/3-1_Morning_Office_Arrival_20260910120535.jpeg',      // Shot 8
  'images/storyboard/3-2_Prompting_the_AI_20260910120328.jpeg',            // Shot 9
  'images/storyboard/3-3_Organized_Schedule_Approval_20260910120333.jpeg', // Shot 10
  'images/storyboard/4-1_Instant_Report_Synthesis_20260910120341.jpeg',    // Shot 11
  'images/storyboard/4-2_Professional_Email_Polishing_20260910120346.jpeg',// Shot 12
  'images/storyboard/4-3_Creative_Idea_Expansion_20260910120351.jpeg',     // Shot 13
  'images/storyboard/5-1_A_Transformed_Space_20260910120358.jpeg',         // Shot 14
  'images/storyboard/5-2_Mission_Accomplished_20260910120401.jpeg',        // Shot 15
  'images/storyboard/5-3_Quiet_Confidence_20260910120413.jpeg',            // Shot 16
  'images/storyboard/6-1_The_Lonely_CEO_20260910120420.jpeg',              // Shot 17
  'images/storyboard/6-2_Cityscape_Pullback_20260910120435.jpeg',          // Shot 18
  'images/storyboard/6-3_The_Final_Message_20260910120444.jpeg'            // Shot 19
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
