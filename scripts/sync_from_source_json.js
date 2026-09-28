const fs = require('fs');
const path = require('path');

const srcJsonPath = path.join(__dirname, '../생성형 AI로 달라진 CEO의 하루 - 2026-09-09_17-00.json');
const projectDataPath = path.join(__dirname, '../js/project-data.js');

const srcJson = JSON.parse(fs.readFileSync(srcJsonPath, 'utf8'));
let rawContent = fs.readFileSync(projectDataPath, 'utf8');

const prefix = 'window.PROJECT_DATA = ';
const startIndex = rawContent.indexOf(prefix);
const headerComment = startIndex !== -1 ? rawContent.substring(0, startIndex) : `/**
 * 생성형 AI로 달라진 CEO의 하루 - 프로젝트 원본 데이터
 * 생성일시: 2026-09-09T08:43:10.644Z
 * 수정일시: 2026-09-10 (소품 & 도구 Pen.jpeg 에셋 추가)
 */

`;

// 1. 에셋 이미지 매핑 테이블
const assetImageMapping = {
  'Female CEO': 'images/Female_CEO.jpeg',
  'Instructor': 'images/Instructor.jpeg',
  'Young Employee': 'images/Young_Employee.jpeg',
  'Employees': 'images/Employees.jpeg',
  'Trainees': 'images/Trainees.jpeg',
  'CEO Office': 'images/CEO_Office.jpeg',
  'Training Center': 'images/Training_Center.jpeg',
  'Meeting Room': 'images/Meeting_room.jpeg',
  'Cityscape': 'images/Cityscape.jpeg',
  'Documents': 'images/Documents.jpeg',
  'Laptop': 'images/Laptop.jpeg',
  'Claude Desktop': 'images/Claude_Desktop.jpeg',
  'Coffee Cup': 'images/Coffee_Cup.jpeg',
  'Notepad': 'images/Notepad.jpeg',
  'Pen': 'images/Pen.jpeg',
  'Large Screen': 'images/Large Screen.jpeg',
  'Monitor': 'images/Monitor.jpeg',
  'Desk': 'images/Desk.jpeg'
};

// 2. 프레임 썸네일 매핑 (19개 콘티 샷 -> images/storyboard/)
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

// 3. 자막 데이터 (1~9)
const subtitles = [
  {
    "id": "1",
    "time": "00:00:01,000 --> 00:00:05,000",
    "text": "늘어나는 서류, 끝없는 결정, 깊어지는 밤…"
  },
  {
    "id": "2",
    "time": "00:00:05,500 --> 00:00:09,500",
    "text": "CEO의 시간은 왜 항상 부족할까요?"
  },
  {
    "id": "3",
    "time": "00:00:10,500 --> 00:00:14,200",
    "text": "반복되는 업무는 AI에게, 시간의 주도권을 되찾다"
  },
  {
    "id": "4",
    "time": "00:00:14,800 --> 00:00:18,500",
    "text": "단 몇 초 만에 완성되는 데이터와 전략 리포트"
  },
  {
    "id": "5",
    "time": "00:00:19,200 --> 00:00:23,000",
    "text": "업무의 압박에서 벗어나, 본질에 집중하는 순간"
  },
  {
    "id": "6",
    "time": "00:00:23,500 --> 00:00:27,500",
    "text": "일하는 방식이 바뀌면, 비즈니스의 격이 달라집니다"
  },
  {
    "id": "7",
    "time": "00:00:28,500 --> 00:00:32,500",
    "text": "더 가치 있는 리더십, 더 여유로운 경영"
  },
  {
    "id": "8",
    "time": "00:00:33,000 --> 00:00:36,500",
    "text": "AI와 함께 시작하는 여성 CEO의 새로운 미래"
  },
  {
    "id": "9",
    "time": "00:00:37,000 --> 00:00:40,200",
    "text": "생성형 AI로 완성하는 스마트 경영 & 리더십"
  }
];

// 제외할 에셋 목록 (Office Hallway, Whiteboard)
const excludedAssetNames = ['Office Hallway', 'Whiteboard'];
const excludedAssetIds = ['47047288-bddf-4214-b902-be15daff1a9d', '16db04e2-59fc-4ebd-bd13-4b33825750fd'];

// 4. 업데이트 객체 조립
const updatedData = {
  version: srcJson.version || '1.3',
  projectTitle: srcJson.projectTitle || '생성형 AI로 달라진 CEO의 하루',
  globalStyle: srcJson.globalStyle || 'Realistic',
  fullMarkdown: srcJson.fullMarkdown,
  subtitles: subtitles,
  assets: srcJson.assets
    .filter(asset => !excludedAssetNames.includes(asset.name))
    .map(asset => {
      return {
        id: asset.id,
        type: asset.type,
        name: asset.name,
        physicalCharacteristics: asset.physicalCharacteristics || '',
        clothingAccessories: asset.clothingAccessories || '',
        backstory: asset.backstory || '',
        image: assetImageMapping[asset.name] || 'images/CEO01.png'
      };
    }),
  frames: srcJson.frames.map((frame, idx) => {
    return {
      index: frame.index || (idx + 1),
      id: frame.id,
      sceneId: frame.sceneId,
      sceneNumber: frame.sceneNumber,
      sceneTitle: frame.sceneTitle,
      shotNumber: frame.shotNumber,
      title: frame.title,
      visualDescription: frame.visualDescription,
      motionDescription: frame.motionDescription,
      audioDescription: frame.audioDescription,
      linkedAssetIds: (frame.linkedAssetIds || []).filter(id => !excludedAssetIds.includes(id)),
      image: frameThumbnails[idx] || 'images/thumbnails/clip01_shot01.jpg'
    };
  })
};

const newFileContent = headerComment + 'window.PROJECT_DATA = ' + JSON.stringify(updatedData, null, 2) + ';\n';
fs.writeFileSync(projectDataPath, newFileContent, 'utf8');

console.log('✅ Successfully updated js/project-data.js!');
console.log('📊 Assets count:', updatedData.assets.length);
console.log('🎬 Frames count:', updatedData.frames.length);
