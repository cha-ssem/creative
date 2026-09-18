const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, '..', 'js', 'project-data.js');
const rawCode = fs.readFileSync(filePath, 'utf8');

const sandbox = { window: {} };
vm.runInNewContext(rawCode, sandbox);

const projectData = sandbox.window.PROJECT_DATA;

// 영상 제작에 필수적인 11개 핵심 에셋
const keepNames = [
  'Female CEO',
  'Instructor',
  'CEO Office',
  'Training Center',
  'Cityscape',
  'Large Screen',
  'Documents',
  'Laptop',
  'Claude Desktop',
  'Coffee Cup',
  'Notepad'
];

console.log('이전 에셋 수:', projectData.assets.length);
projectData.assets = projectData.assets.filter(asset => keepNames.includes(asset.name));
console.log('최적화 후 핵심 에셋 수:', projectData.assets.length);

const keepAssetIds = new Set(projectData.assets.map(a => a.id));

// 스토리보드 프레임의 linkedAssetIds에서도 삭제된 에셋 ID 제거
let totalRemovedIds = 0;
projectData.frames.forEach(frame => {
  if (Array.isArray(frame.linkedAssetIds)) {
    const beforeLen = frame.linkedAssetIds.length;
    frame.linkedAssetIds = frame.linkedAssetIds.filter(id => keepAssetIds.has(id));
    totalRemovedIds += (beforeLen - frame.linkedAssetIds.length);
  }
});
console.log(`프레임에서 제거된 미사용 에셋 참조 수: ${totalRemovedIds}`);

// 버전 및 날짜 업데이트
projectData.version = '1.3';

const newFileContent = `/**
 * 생성형 AI로 달라진 CEO의 하루 - 프로젝트 원본 데이터
 * 생성일시: 2026-09-09T08:43:10.644Z
 * 수정일시: 2026-09-10 (영상 제작에 꼭 필요한 11개 핵심 에셋만 선별 유지 및 불필요 에셋 삭제 최적화)
 */

window.PROJECT_DATA = ${JSON.stringify(projectData, null, 2)};
`;

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log('js/project-data.js 파일 업데이트 완료!');
