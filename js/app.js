/**
 * 생성형 AI로 달라진 CEO의 하루 - 인터랙티브 웹 대시보드 로직
 * 1. 좌측 사이드바 메뉴 (1. 시나리오 기획안 -> 2. 에셋 라이브러리 -> 3. 스토리보드 콘티)
 * 2. 샷별 사용된 캐릭터 및 소품 에셋(Linked Assets) 완벽 반영
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PROJECT_DATA;
  if (!data) {
    console.error('Project data not loaded.');
    return;
  }

  // 에셋 빠른 조회를 위한 Map 생성
  const assetMap = new Map();
  if (data.assets) {
    data.assets.forEach(a => assetMap.set(a.id, a));
  }

  // 1. 기본 통계 및 타이틀 초기화
  const projectTitleEl = document.getElementById('projectTitle');
  if (projectTitleEl) {
    projectTitleEl.innerHTML = '생성형 AI로<br>달라진 CEO의 하루';
  }

  const statShotsEl = document.getElementById('statShots');
  if (statShotsEl) {
    statShotsEl.textContent = data.frames ? data.frames.length : 19;
  }

  const statAssetsEl = document.getElementById('statAssets');
  if (statAssetsEl) {
    statAssetsEl.textContent = data.assets ? data.assets.length : 15;
  }

  const statClipsEl = document.getElementById('statClips');
  if (statClipsEl) {
    statClipsEl.textContent = '11';
  }

  const statRuntimeEl = document.getElementById('statRuntime');
  if (statRuntimeEl) {
    statRuntimeEl.textContent = '90s';
  }

  // 유니크한 씬 목록 추출
  const scenes = [];
  const sceneMap = new Map();
  if (data.frames) {
    data.frames.forEach(f => {
      if (!sceneMap.has(f.sceneTitle)) {
        sceneMap.set(f.sceneTitle, f.sceneNumber || scenes.length + 1);
        scenes.push(f.sceneTitle);
      }
    });
  }

  const statScenesEl = document.getElementById('statScenes');
  if (statScenesEl) {
    statScenesEl.textContent = scenes.length || 6;
  }

  // 2. [STEP 01] 전체 시나리오 기획안 2열 카드 렌더링
  const scenarioGrid = document.getElementById('scenarioGrid');
  if (scenarioGrid) {
    scenarioGrid.innerHTML = `
      <!-- 기획 개요 & 캐릭터 설정 카드 (2열 전체 스팬) -->
      <div class="scenario-card full-span">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">CONCEPT</span>
            <h3 class="scenario-title">기획 콘셉트 & 캐릭터 설정</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 총 러닝타임: 90초 (11개 클립, 8~10초 단위 구성)</span>
        </div>
        <div class="scenario-body">
          <div class="concept-spec-grid">
            <div class="concept-item">
              <strong>장르 / 포맷</strong>
              <span>기업 브랜디드 시네마틱 광고 / 스토리 필름 (총 90초)</span>
            </div>
            <div class="concept-item">
              <strong>비주얼 스타일</strong>
              <span>현실적이고 세련된 시네마틱 톤, 프리미엄 기업 광고 무드</span>
            </div>
            <div class="concept-item">
              <strong>스토리 흐름</strong>
              <span>야근과 반복 업무 ➔ AI 교육 ➔ 실무 적용 ➔ 여유와 스마트 경영</span>
            </div>
            <div class="concept-item">
              <strong>주인공 일관성 설정</strong>
              <span>50대 중반 한국인 여성 CEO. 차콜/네이비 슈트, 자연스러운 새치, 지적이고 차분한 리더십 인상</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SCENE 1 카드 -->
      <div class="scenario-card">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">SCENE 01</span>
            <h3 class="scenario-title">늦은 밤의 도시, 혼자 남은 CEO</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 16초 (2 클립: 8s + 8s)</span>
        </div>
        <div class="scenario-body">
          <p>
            늦은 밤, 어둠에 잠긴 대도시의 고층 빌딩들. 단 하나의 사무실에서만 푸른 불빛이 새어나옵니다.
          </p>
          <p>
            넓은 집무실 책상 앞, 50대 여성 CEO가 모니터를 응시하고 있습니다. 눈가에는 깊은 피로가 묻어 있고 표정은 무겁습니다. 책상과 테이블 주변에는 검토해야 할 보고서와 제안서, 출력된 서류 더미가 높이 쌓여 있습니다.
          </p>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🎥 카메라 연출</span>
            <span class="scenario-spec-value">Wide aerial shot ➔ slow cinematic push-in (Clip 1) ➔ Medium close-up ➔ 서류 더미 slow pan (Clip 2)</span>
          </div>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🌟 분위기 & 🔊 사운드</span>
            <span class="scenario-spec-value">차갑고 외로운 딥 블루/그레이 톤. 조용한 사무실 공조기 소리, 시계 초침음(Tik-Tok), CEO의 깊은 한숨.</span>
          </div>
        </div>
      </div>

      <!-- SCENE 2 카드 -->
      <div class="scenario-card">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">SCENE 02</span>
            <h3 class="scenario-title">생성형 AI 교육</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 16초 (2 클립: 8s + 8s)</span>
        </div>
        <div class="scenario-body">
          <p>
            장면 전환. 밝은 햇살이 들어오는 현대적인 기업 교육장. 전면 대형 화면에 <strong>“생성형 AI 활용 교육”</strong>이라는 제목이 떠 있습니다.
          </p>
          <p>
            처음에는 낯선 표정으로 화면을 바라보던 CEO가 강사의 설명을 따라 노트북에 직접 프롬프트를 입력합니다. 강의 후 1:1 코칭을 받으며 놀라운 속도로 결과가 생성되자, CEO의 얼굴에 환한 미소가 번집니다.
          </p>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🎥 카메라 연출</span>
            <span class="scenario-spec-value">Bright wide tracking (Clip 3) ➔ 1:1 Coaching over-the-shoulder ➔ Discovery smile (Clip 4)</span>
          </div>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🌟 분위기 & 🔊 사운드</span>
            <span class="scenario-spec-value">밝고 긍정적인 따뜻한 자연광. 명확한 강사 음성, 빠른 키보드 타이핑 소리, 밝은 발견 테마음.</span>
          </div>
        </div>
      </div>

      <!-- SCENE 3 카드 -->
      <div class="scenario-card">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">SCENE 03</span>
            <h3 class="scenario-title">AI와 시작하는 아침 루틴</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 16초 (2 클립: 8s + 8s)</span>
        </div>
        <div class="scenario-body">
          <p>
            활기찬 아침, 여성 CEO가 노트북과 모닝 커피를 들고 사무실 책상 왼쪽을 우회하여 의자에 여유롭게 착석합니다 (Clip 5).
          </p>
          <div class="scenario-spec-box" style="border-left: 3px solid var(--accent-gold);">
            <span class="scenario-spec-label">💬 CEO 프롬프트 입력</span>
            <span class="scenario-spec-value" style="color: var(--text-gold); font-weight:600;">“오늘 일정과 주요 업무를 우선순위별로 정리해줘.”</span>
          </div>
          <p>
            Claude AI로 업무 우선순위가 신속히 정리되는 화면을 바라보며, CEO는 편안하게 모닝 커피를 마십니다 (Clip 6).
          </p>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🌟 연출 포인트</span>
            <span class="scenario-spec-value">경쾌하고 자신감 넘치는 모닝 루틴, 부드러운 알림 징글음, 단정한 실버 노트북.</span>
          </div>
        </div>
      </div>

      <!-- SCENE 4 카드 -->
      <div class="scenario-card">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">SCENE 04</span>
            <h3 class="scenario-title">실무 협업 & 스마트 미팅</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 16초 (2 클립: 8s + 8s)</span>
        </div>
        <div class="scenario-body">
          <p>
            <strong>1. 회의 음성 녹음 & 스마트 요약:</strong> 회의실 테이블 위 스마트폰 음성 녹음 앱이 회의를 기록하고, Claude AI가 핵심 내용을 요약 (Clip 7).
          </p>
          <p>
            <strong>2. 깔끔한 집무실 아이디어 메모:</strong> 정갈한 책상에서 노트북 결과를 확인하며 고급 만년필로 핵심 아이디어를 여유롭게 메모 (Clip 8).
          </p>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🎥 카메라 연출</span>
            <span class="scenario-spec-value">Meeting tracking shot (Clip 7) ➔ Elegant side profile tracking & Notebook memo (Clip 8)</span>
          </div>
        </div>
      </div>

      <!-- SCENE 5 카드 -->
      <div class="scenario-card">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge">SCENE 05</span>
            <h3 class="scenario-title">달라진 일상, 비포 & 애프터</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 16초 (2 클립: 8s + 8s)</span>
        </div>
        <div class="scenario-body">
          <p>
            <strong>1. 데스크 비포 vs 애프터:</strong> 어두운 밤 서류 더미 속 지친 CEO(좌) vs 화사한 낮 정갈한 책상에서 커피 마시는 CEO(우)의 완벽 대칭 분할 화면 (Clip 9).
          </p>
          <p>
            <strong>2. 고독한 밤 vs 당당한 창가의 리더:</strong> 어두운 창밖 고독한 밤(좌) vs 낮 햇살 속 의자에서 일어나 창가에 당당히 서서 도시를 바라보는 CEO(우) (Clip 10).
          </p>
          <div class="scenario-spec-box">
            <span class="scenario-spec-label">🎥 카메라 연출</span>
            <span class="scenario-spec-value">Symmetrical 50:50 vertical split-screen ➔ Seamless visual contrast</span>
          </div>
        </div>
      </div>

      <!-- SCENE 6 / FINAL SHOT 카드 -->
      <div class="scenario-card" style="border-color: var(--border-highlight);">
        <div class="scenario-card-header">
          <div class="scenario-header-left">
            <span class="scenario-badge final">SCENE 06</span>
            <h3 class="scenario-title">마천루와 창가의 리더 & 브랜드 엔딩</h3>
          </div>
          <span class="scenario-time-tag">⏱️ 10초 (1 클립: 10s 타임랩스 3단 전환)</span>
        </div>
        <div class="scenario-body">
          <p>
            노을빛 사무실(1단) ➔ 자정 창가의 야경(2단) ➔ 낮시간 대형 통창의 눈부신 마천루 전경(3단)으로 이어지며 브랜드 메시지가 페이드인됩니다 (Clip 11).
          </p>
          
          <div class="scenario-ending-box">
            <div class="ending-copy-main">
              “생성형 AI가 바꾸는 것은 단순히 업무의 속도가 아닙니다.”<br/>
              “일하는 방식이 바뀌면, 우리의 시간도 달라집니다.”
            </div>
            <div class="ending-copy-sub">
              <strong>✦ 생성형 AI와 함께 만드는 새로운 업무의 여유 ✦</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 3. [STEP 02] 에셋 라이브러리 렌더링 (캐릭터, 로케이션, 소품별 그룹화)
  const assetContainer = document.getElementById('assetContainer');
  const assetFilterButtons = document.querySelectorAll('#assetTypeFilterBar .filter-chip');

  const assetCategories = [
    { key: 'character', title: '캐릭터 에셋 (Characters)', icon: '👤', badge: 'CHARACTER' },
    { key: 'location', title: '로케이션 에셋 (Locations)', icon: '🏢', badge: 'LOCATION' },
    { key: 'prop', title: '소품 & 도구 에셋 (Props & Tools)', icon: '📦', badge: 'PROP' }
  ];

  function createAssetCard(asset) {
    const card = document.createElement('div');
    card.className = 'asset-card';
    const desc = asset.physicalCharacteristics || asset.backstory || asset.clothingAccessories || '에셋 상세 설명이 없습니다.';

    card.innerHTML = `
      <div class="asset-thumb">
        <img src="${asset.image || 'CEO_clip01.00_00_06_01.스틸 001.jpg'}" alt="${asset.name}" class="asset-img" loading="lazy">
        <span class="asset-badge ${asset.type}">${asset.type}</span>
      </div>
      <div class="asset-body">
        <h4 class="asset-name">${asset.name}</h4>
        <p class="asset-desc">${desc}</p>
      </div>
    `;
    return card;
  }

  function renderAssets(filterType = 'all') {
    if (!assetContainer) return;
    assetContainer.innerHTML = '';

    const targetCategories = filterType === 'all'
      ? assetCategories
      : assetCategories.filter(c => c.key === filterType.toLowerCase());

    targetCategories.forEach(category => {
      const categoryAssets = data.assets.filter(a => a.type.toLowerCase() === category.key);
      if (categoryAssets.length === 0) return;

      // 카테고리 그룹 컨테이너 생성
      const groupBlock = document.createElement('div');
      groupBlock.className = 'asset-category-group';

      // 카테고리 헤더 생성
      const header = document.createElement('div');
      header.className = 'asset-category-header';
      header.innerHTML = `
        <div class="asset-category-title-wrap">
          <span class="asset-category-badge ${category.key}">${category.badge}</span>
          <h3 class="asset-category-title">${category.icon} ${category.title}</h3>
        </div>
        <span class="asset-category-count">${categoryAssets.length} Assets</span>
      `;
      groupBlock.appendChild(header);

      // 카테고리 에셋 그리드 생성
      const grid = document.createElement('div');
      grid.className = 'asset-category-grid';

      categoryAssets.forEach(asset => {
        grid.appendChild(createAssetCard(asset));
      });

      groupBlock.appendChild(grid);
      assetContainer.appendChild(groupBlock);
    });
  }

  assetFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      assetFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterType = btn.getAttribute('data-asset-filter');
      renderAssets(filterType);
    });
  });
  const allAssetFilterChip = document.querySelector('#assetTypeFilterBar [data-asset-filter="all"]');
  if (allAssetFilterChip && data.assets) {
    allAssetFilterChip.textContent = `전체 에셋 (${data.assets.length})`;
  }

  renderAssets('all');

  // 에셋 라이브러리 자세히 보기 토글 버튼 이벤트
  const toggleAssetDetailViewBtn = document.getElementById('toggleAssetDetailViewBtn');
  const toggleAssetBtnText = document.getElementById('toggleAssetBtnText');
  let isAssetDetailMode = false;

  if (toggleAssetDetailViewBtn && assetContainer) {
    toggleAssetDetailViewBtn.addEventListener('click', () => {
      isAssetDetailMode = !isAssetDetailMode;
      if (isAssetDetailMode) {
        assetContainer.classList.add('detail-mode');
        toggleAssetDetailViewBtn.classList.add('active');
        if (toggleAssetBtnText) toggleAssetBtnText.textContent = '간단히 보기 (이미지 중심)';
      } else {
        assetContainer.classList.remove('detail-mode');
        toggleAssetDetailViewBtn.classList.remove('active');
        if (toggleAssetBtnText) toggleAssetBtnText.textContent = '자세히 보기';
      }
    });
  }

  // 4. [STEP 03] 스토리보드 콘티 렌더링 (씬별 그룹화 & 캐릭터/소품 에셋 태그 반영)
  const sceneFilterBar = document.getElementById('sceneFilterBar');
  if (sceneFilterBar) {
    scenes.forEach(sceneTitle => {
      const chip = document.createElement('button');
      chip.className = 'filter-chip';
      chip.setAttribute('data-filter', sceneTitle);
      const shortTitle = sceneTitle.replace(/SCENE \d+\.\s*/, '').slice(0, 16);
      chip.textContent = shortTitle;
      chip.title = sceneTitle;
      chip.addEventListener('click', () => {
        document.querySelectorAll('#sceneFilterBar .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderStoryboard(sceneTitle);
      });
      sceneFilterBar.appendChild(chip);
    });

    const allFilterChip = sceneFilterBar.querySelector('[data-filter="all"]');
    if (allFilterChip) {
      allFilterChip.addEventListener('click', () => {
        document.querySelectorAll('#sceneFilterBar .filter-chip').forEach(c => c.classList.remove('active'));
        allFilterChip.classList.add('active');
        renderStoryboard('all');
      });
    }
  }

  const storyboardContainer = document.getElementById('storyboardContainer');

  function createShotCard(frame) {
    const card = document.createElement('div');
    card.className = 'shot-card';

    // 해당 샷에 연결된 에셋 태그 목록 생성
    const linkedAssets = (frame.linkedAssetIds || [])
      .map(id => assetMap.get(id))
      .filter(Boolean);

    let assetTagsHtml = '';
    if (linkedAssets.length > 0) {
      assetTagsHtml = '<div class="shot-asset-tags">';
      linkedAssets.forEach(asset => {
        const icon = asset.type === 'character' ? '👤' : (asset.type === 'prop' ? '📦' : '🏢');
        const tagClass = asset.type === 'character' ? 'character' : (asset.type === 'prop' ? 'prop' : 'location');
        assetTagsHtml += `<span class="asset-tag ${tagClass}">${icon} ${asset.name}</span>`;
      });
      assetTagsHtml += '</div>';
    }

    card.innerHTML = `
      <div class="shot-thumb-wrap">
        <img src="${frame.image || 'CEO_clip01.00_00_06_01.스틸 001.jpg'}" alt="${frame.title}" class="shot-img" loading="lazy">
        <span class="shot-overlay-badge">SHOT ${frame.shotNumber || frame.index}</span>
      </div>
      <div class="shot-body">
        <h4 class="shot-title">${frame.title || 'Shot ' + frame.index}</h4>
        ${assetTagsHtml}
        <p class="shot-desc">${frame.visualDescription || '비주얼 프롬프트 정보'}</p>
        <div class="shot-meta-rows">
          <div class="meta-row">
            <span class="meta-icon">🎥</span>
            <span class="meta-text">${frame.motionDescription || 'Camera Motion'}</span>
          </div>
          <div class="meta-row">
            <span class="meta-icon">🔊</span>
            <span class="meta-text">${frame.audioDescription || 'Audio Direction'}</span>
          </div>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openModal(frame, linkedAssets);
    });

    return card;
  }

  function renderStoryboard(filterScene = 'all') {
    if (!storyboardContainer) return;
    storyboardContainer.innerHTML = '';

    const targetScenes = filterScene === 'all'
      ? scenes
      : [filterScene];

    targetScenes.forEach((sceneTitle, sIdx) => {
      const sceneFrames = data.frames.filter(f => f.sceneTitle === sceneTitle);
      if (sceneFrames.length === 0) return;

      // 씬 그룹 블록 생성
      const groupBlock = document.createElement('div');
      groupBlock.className = 'scene-group';

      // 씬 헤더 구성
      const header = document.createElement('div');
      header.className = 'scene-group-header';

      const sceneBadgeText = sceneTitle.includes('SCENE') 
        ? sceneTitle.split('.')[0].trim() 
        : (sceneTitle.includes('Final') ? 'FINAL' : `SCENE 0${sIdx + 1}`);
      
      const sceneTitleText = sceneTitle.includes('.') 
        ? sceneTitle.split('.').slice(1).join('.').trim() 
        : sceneTitle;
      
      // 씬별 클립 및 시간 할당 정보
      let clipBadgeHtml = '';
      if (sceneTitle.includes('SCENE 1') || sceneTitle.includes('SCENE 01') || sceneBadgeText.includes('01')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 2 Clips (Clip 1: 8s, Clip 2: 10s) · ⏱️ 18s</span>';
      } else if (sceneTitle.includes('SCENE 2') || sceneTitle.includes('SCENE 02') || sceneBadgeText.includes('02')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 2 Clips (Clip 3: 8s, Clip 4: 10s) · ⏱️ 18s</span>';
      } else if (sceneTitle.includes('SCENE 3') || sceneTitle.includes('SCENE 03') || sceneBadgeText.includes('03')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 1 Clip (Clip 5: 8s) · ⏱️ 8s</span>';
      } else if (sceneTitle.includes('SCENE 4') || sceneTitle.includes('SCENE 04') || sceneBadgeText.includes('04')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 2 Clips (Clip 6: 9s, Clip 7: 9s) · ⏱️ 18s</span>';
      } else if (sceneTitle.includes('SCENE 5') || sceneTitle.includes('SCENE 05') || sceneBadgeText.includes('05')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 2 Clips (Clip 8: 8s, Clip 9: 10s) · ⏱️ 18s</span>';
      } else if (sceneTitle.includes('Final') || sceneTitle.includes('FINAL') || sceneBadgeText.includes('FINAL')) {
        clipBadgeHtml = '<span class="scene-clip-badge">🎬 1 Clip (Clip 10: 10s) · ⏱️ 10s</span>';
      }

      header.innerHTML = `
        <div class="scene-group-title-wrap">
          <span class="scene-group-badge">${sceneBadgeText}</span>
          <h3 class="scene-group-title">${sceneTitleText}</h3>
        </div>
        <div class="scene-group-meta-right">
          ${clipBadgeHtml}
          <span class="scene-shot-count">${sceneFrames.length} Shots</span>
        </div>
      `;
      groupBlock.appendChild(header);

      // 씬 샷 그리드 생성
      const shotsGrid = document.createElement('div');
      shotsGrid.className = 'scene-shots-grid';

      sceneFrames.forEach(frame => {
        shotsGrid.appendChild(createShotCard(frame));
      });

      groupBlock.appendChild(shotsGrid);
      storyboardContainer.appendChild(groupBlock);
    });
  }
  renderStoryboard('all');

  // 자세히 보기 토글 버튼 이벤트
  const toggleDetailViewBtn = document.getElementById('toggleDetailViewBtn');
  const toggleBtnText = document.getElementById('toggleBtnText');
  let isDetailMode = false;

  if (toggleDetailViewBtn && storyboardContainer) {
    toggleDetailViewBtn.addEventListener('click', () => {
      isDetailMode = !isDetailMode;
      if (isDetailMode) {
        storyboardContainer.classList.add('detail-mode');
        toggleDetailViewBtn.classList.add('active');
        if (toggleBtnText) toggleBtnText.textContent = '간단히 보기 (이미지 중심)';
      } else {
        storyboardContainer.classList.remove('detail-mode');
        toggleDetailViewBtn.classList.remove('active');
        if (toggleBtnText) toggleBtnText.textContent = '자세히 보기';
      }
    });
  }

  // 5. 샷 상세 모달 팝업 & 사용된 에셋(캐릭터/소품) 표시
  const shotModal = document.getElementById('shotModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalVisual = document.getElementById('modalVisual');
  const modalMotion = document.getElementById('modalMotion');
  const modalAudio = document.getElementById('modalAudio');
  const modalAssetGrid = document.getElementById('modalAssetGrid');

  function openModal(frame, linkedAssets = []) {
    if (!shotModal) return;
    modalImg.src = frame.image || 'CEO_clip01.00_00_06_01.스틸 001.jpg';
    modalBadge.textContent = `SHOT ${frame.shotNumber || frame.index}`;
    modalTitle.textContent = frame.title || 'Shot Title';
    modalVisual.textContent = frame.visualDescription || '정보 없음';
    modalMotion.textContent = frame.motionDescription || '정보 없음';
    modalAudio.textContent = frame.audioDescription || '정보 없음';

    // 사용된 에셋 렌더링
    if (modalAssetGrid) {
      modalAssetGrid.innerHTML = '';
      if (linkedAssets.length > 0) {
        linkedAssets.forEach(asset => {
          const item = document.createElement('div');
          item.className = 'modal-asset-item';
          const icon = asset.type === 'character' ? '👤' : (asset.type === 'prop' ? '📦' : '🏢');
          item.innerHTML = `
            <img src="${asset.image || 'CEO_clip01.00_00_06_01.스틸 001.jpg'}" alt="${asset.name}" class="modal-asset-thumb">
            <div class="modal-asset-info">
              <span class="modal-asset-name">${icon} ${asset.name}</span>
              <span class="modal-asset-type">${asset.type.toUpperCase()}</span>
            </div>
          `;
          modalAssetGrid.appendChild(item);
        });
      } else {
        modalAssetGrid.innerHTML = '<div style="font-size:0.75rem; color:var(--text-muted); padding:0.4rem;">연결된 에셋 정보 없음</div>';
      }
    }

    shotModal.classList.add('open');
  }

  function closeModal() {
    if (shotModal) shotModal.classList.remove('open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (shotModal) {
    shotModal.addEventListener('click', (e) => {
      if (e.target === shotModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shotModal && shotModal.classList.contains('open')) {
      closeModal();
    }
  });

  // 프롬프트 복사 버튼 이벤트
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-copy');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent).then(() => {
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          btn.style.color = 'var(--accent-gold)';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = '';
          }, 1500);
        });
      }
    });
  });

  // 6. [STEP 04] 클립별 영상제작 프롬프트 렌더링 & 모델/언어 전환 & 원클릭 복사
  const promptClipsContainer = document.getElementById('promptClipsContainer');
  const promptSceneChips = document.querySelectorAll('#promptSceneFilterBar .filter-chip');
  let currentPromptModel = 'seedance'; // 'seedance' (Seedance 2.0 기준)
  let currentGlobalPromptLang = 'en';  // 'en' (영문 기준, 기본값) | 'kr' (한글 번역)
  let currentSceneFilter = 'all';      // 'all' | 'SCENE 01' | ...

  const clipPromptsData = window.CLIP_PROMPTS_DATA || [];

  // 최초 원본 프롬프트 데이터 깊은 복사 보존 (클립별/모델-언어별 롤백 및 수정 비교용)
  const ORIGINAL_PROMPTS_MAP = {};
  clipPromptsData.forEach(clip => {
    ORIGINAL_PROMPTS_MAP[clip.clipId] = { ...(clip.prompts || {}) };
  });

  // 로컬 브라우저 영구 저장소 (localStorage) 키 및 유틸리티 함수
  const PROMPTS_STORAGE_KEY = 'WOMAN_CEO_EDITED_PROMPTS_V10';

  // 모든 이전 버전 및 수정 캐시 일체 초기화 (최신 video_prompt.txt 갱신 반영)
  try {
    ['WOMAN_CEO_EDITED_PROMPTS_V1', 'WOMAN_CEO_EDITED_PROMPTS_V2', 'WOMAN_CEO_EDITED_PROMPTS_V3', 'WOMAN_CEO_EDITED_PROMPTS_V4', 'WOMAN_CEO_EDITED_PROMPTS_V5', 'WOMAN_CEO_EDITED_PROMPTS_V6', 'WOMAN_CEO_EDITED_PROMPTS_V7', 'WOMAN_CEO_EDITED_PROMPTS_V8', 'WOMAN_CEO_EDITED_PROMPTS_V9', 'WOMAN_CEO_EDITED_PROMPTS_CUSTOM'].forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (e) {
    // ignore
  }

  function loadCustomPromptsFromStorage() {
    try {
      const saved = localStorage.getItem(PROMPTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        clipPromptsData.forEach(clip => {
          if (parsed[clip.clipId]) {
            clip.prompts = { ...clip.prompts, ...parsed[clip.clipId] };
          }
        });
      }
    } catch (e) {
      console.warn('localStorage에서 수정 프롬프트 로드 실패:', e);
    }
  }

  function saveCustomPromptToStorage(clipId, promptKey, newText, isReset = false) {
    try {
      const saved = localStorage.getItem(PROMPTS_STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      if (!parsed[clipId]) parsed[clipId] = {};

      if (isReset) {
        delete parsed[clipId][promptKey];
        if (Object.keys(parsed[clipId]).length === 0) {
          delete parsed[clipId];
        }
      } else {
        parsed[clipId][promptKey] = newText;
      }
      localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(parsed));
    } catch (e) {
      console.warn('localStorage에 수정 프롬프트 저장 실패:', e);
    }
  }

  // 앱 시작 시 로컬스토리지의 수정 프롬프트 자동 복원
  loadCustomPromptsFromStorage();

  // 토스트 알림 유틸리티 함수
  const toastEl = document.getElementById('toastNotification');
  let toastTimer = null;
  function showToast(message, type = 'info') {
    if (!toastEl) return;
    if (toastTimer) clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.className = `toast-notification show ${type}`;
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // 한국어 -> 영문 프롬프트 자동 번역 & 동기화 엔진
  // ==========================================
  const PROMPT_SECTION_MAP = [
    [/\[Omni Flash 1\.1 \| 16:9 \| (\d+)초 \| 4K 24fps\]/g, '[Omni Flash 1.1 | 16:9 | $1s | 4K 24fps]'],
    [/\[Seedance 2\.0 \| 16:9 \| (\d+)초 \| 4K 24fps\]/g, '[Seedance 2.0 | 16:9 | $1s | 4K 24fps]'],
    [/\[1순위 메인 시각 참조: 스토리보드 콘티 샷\]/g, '[Primary Visual Reference: Storyboard Conti Shot]'],
    [/★ 기준 프레임:/g, '★ Reference Frame:'],
    [/★ 핵심 키프레임 앵커:/g, '★ Keyframe Anchor:'],
    [/★ 핵심 키프레임:/g, '★ Keyframe Anchor:'],
    [/\[캐릭터 일관성 락 \(Character Consistency Lock\)\]/g, '[Character Consistency Lock]'],
    [/\[2순위 보조 참조: 필요 시 참조할 에셋\]/g, '[Secondary Asset References (As Needed)]'],
    [/\[2순위 보조 참조: 에셋\]/g, '[Secondary Asset References]'],
    [/\[클립 전후 시각 연결성 \(Continuity\)\]/g, '[Clip Continuity]'],
    [/\[클립 연결성 \(Continuity\)\]/g, '[Clip Continuity]'],
    [/\[시네마틱 카메라 & 피사체\]/g, '[Cinematic Camera & Subject]'],
    [/\[시네마틱 카메라 & 표정 연기\]/g, '[Cinematic Camera & Acting]'],
    [/\[시네마틱 카메라 & 공간 연출\]/g, '[Cinematic Camera & Spatial Storytelling]'],
    [/\[시네마틱 카메라 & 감정 연출\]/g, '[Cinematic Camera & Emotional Acting]'],
    [/\[시네마틱 카메라 & 동선\]/g, '[Cinematic Camera & Blocking]'],
    [/\[시네마틱 카메라 & UI 연출\]/g, '[Cinematic Camera & UI Action]'],
    [/\[시네마틱 카메라 & 피사체 연기\]/g, '[Cinematic Camera & Subject Acting]'],
    [/\[시네마틱 카메라 & 피사체 액션\]/g, '[Cinematic Camera & Subject Action]'],
    [/\[카메라 & 피사체 액션\]/g, '[Camera & Subject Action]'],
    [/\[조명 & 톤앤매너\]/g, '[Lighting & Atmosphere]'],
    [/\[조명 & 색조\]/g, '[Lighting & Atmosphere]'],
    [/\[조명 & 색감\]/g, '[Lighting & Atmosphere]'],
    [/\[조명 & 환경\]/g, '[Lighting & Atmosphere]'],
    [/\[네이티브 오디오 & 앰비언스 \(내레이션 제외\)\]/g, '[Native Audio & Ambience (No Narration)]'],
    [/\[네이티브 오디오 & 대사 \(내레이션 제외\)\]/g, '[Native Audio & Dialogue (No Narration)]'],
    [/\[현장 사운드 & SFX \(불필요한 내레이션 없음\)\]/g, '[Ambient Sound & SFX (No Narration)]'],
    [/\[네이티브 오디오 & 음악 \(내레이션 제외\)\]/g, '[Native Audio & Music (No Narration)]'],
    [/\[화면 텍스트 오버레이\]/g, '[On-Screen Typography]']
  ];

  const PROMPT_TERM_DICT = [
    ['여성 CEO', 'Female CEO'],
    ['50대 한국인 여성 리더', '50-year-old Korean female executive leader'],
    ['단정하게 빗어 넘긴 로우번', 'Sophisticated low-bun updo'],
    ['로우번 묶음 머리', 'Low-bun updo'],
    ['골드 메탈 프레임 오발 안경', 'Gold metal-frame oval eyeglasses'],
    ['골드 메탈 안경', 'Gold metal eyeglasses'],
    ['골드 안경', 'Gold eyeglasses'],
    ['화이트 진주 스터드 귀걸이', 'White pearl stud earrings'],
    ['진주 귀걸이', 'Pearl earrings'],
    ['다크 네이비 테일러드 싱글 브레스트 수트', 'Tailored dark navy single-breasted suit'],
    ['다크 네이비 테일러드 수트', 'Tailored dark navy suit'],
    ['다크 네이비 수트', 'Dark navy suit'],
    ['다크 네이비 새틴 라운드넥 블라우스', 'Dark navy satin round-neck blouse'],
    ['AI 강사', 'AI Instructor'],
    ['보브 단발 헤어', 'Polished bob haircut'],
    ['와이드 에어리얼 드론 샷', 'Wide aerial drone establishing shot'],
    ['와이드 에어리얼 샷', 'Wide aerial shot'],
    ['슬로우 푸시인', 'Slow cinematic push-in'],
    ['미디엄 클로즈업', 'Medium close-up'],
    ['슬로우 패닝', 'Slow pan'],
    ['오버더숄더', 'Over-the-shoulder'],
    ['타이트 클로즈업', 'Tight close-up'],
    ['다이내믹 트래킹 샷', 'Dynamic tracking shot'],
    ['스크린 매크로', 'Screen macro view'],
    ['180도 회전 시네마틱 오빗 팬 샷', 'Cinematic 180-degree orbit shot'],
    ['스무스 글라이드캠 트래킹 샷', 'Smooth glidecam tracking shot'],
    ['슬로우 틸트업 및 풀백', 'Slow tilt-up and pull-back'],
    ['그랜드 풀백 샷', 'Grand pull-back aerial shot'],
    ['시네마틱 실사, 4K 해상도, 24fps', 'Cinematic photorealistic, 4K resolution, 24fps'],
    ['마천루 스카이라인', 'Skyscraper skyline'],
    ['결재 서류 더미', 'Piles of corporate documents'],
    ['골든 아워', 'Golden hour'],
    ['작업 완료', 'Task Completed']
  ];

  async function translateLineOnline(text) {
    if (!text || !text.trim()) return text;
    // 1차: Google GTX
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=' + encodeURIComponent(text);
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json && json[0]) {
          return json[0].map(item => item[0]).join('');
        }
      }
    } catch (e) {
      // ignore
    }

    // 2차: MyMemory API (CORS 허용)
    try {
      const mmUrl = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=ko|en';
      const mmRes = await fetch(mmUrl);
      if (mmRes.ok) {
        const mmJson = await mmRes.json();
        if (mmJson && mmJson.responseData && mmJson.responseData.translatedText) {
          return mmJson.responseData.translatedText;
        }
      }
    } catch (e) {
      // ignore
    }

    // 3차 Fallback: 전문 용어 사전 치환
    let fallback = text;
    PROMPT_TERM_DICT.forEach(([ko, en]) => {
      fallback = fallback.split(ko).join(en);
    });
    return fallback;
  }

  async function translatePromptKoreanToEnglish(koreanText) {
    if (!koreanText) return '';
    let text = koreanText;
    PROMPT_SECTION_MAP.forEach(([regex, repl]) => {
      text = text.replace(regex, repl);
    });

    const lines = text.split('\n');
    const translatedLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        translatedLines.push('');
        continue;
      }
      if (trimmed.startsWith('[') || trimmed.startsWith('★') || trimmed.includes('images/thumbnails/')) {
        translatedLines.push(line);
        continue;
      }
      if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(line)) {
        const isBullet = line.startsWith('- ');
        const prefix = isBullet ? '- ' : (line.startsWith('  - ') ? '  - ' : '');
        const content = isBullet ? line.substring(prefix.length) : line;

        const trans = await translateLineOnline(content);
        translatedLines.push(prefix + trans);
      } else {
        translatedLines.push(line);
      }
    }

    return translatedLines.join('\n');
  }

  // 한국어 수정본을 영문 프롬프트에 비동기 번역 & 동기화
  async function syncKoreanToEnglish(clipId, model, newKoreanText) {
    const clip = clipPromptsData.find(c => c.clipId === clipId);
    if (!clip) return;

    const enKey = `${model}_en`;
    try {
      const translatedEn = await translatePromptKoreanToEnglish(newKoreanText);
      if (translatedEn) {
        if (!clip.prompts) clip.prompts = {};
        clip.prompts[enKey] = translatedEn;
        saveCustomPromptToStorage(clipId, enKey, translatedEn, false);

        // 만약 현재 영문 탭을 보고 있다면 화면 즉시 리렌더링
        if (currentGlobalPromptLang === 'en' && currentPromptModel === model) {
          renderClipPrompts();
        }
      }
    } catch (err) {
      console.warn('영문 프롬프트 자동 번역 동기화 중 오류:', err);
    }
  }

  let isAllPromptsExpanded = false; // 기본: 전체 프롬프트 축약 상태

  function getPromptKey() {
    return `${currentPromptModel}_${currentGlobalPromptLang}`;
  }

  function createPromptCard(clip) {
    const card = document.createElement('div');
    card.className = 'prompt-clip-card';
    card.setAttribute('data-clip-id', clip.clipId);
    card.setAttribute('data-scene-id', clip.sceneId);

    // 글로벌 일괄 언어 설정 ('en' 기본값 | 'kr')
    let cardLang = currentGlobalPromptLang || 'en';
    const getCardPromptKey = () => `${currentPromptModel}_${cardLang}`;

    let promptKey = getCardPromptKey();
    let currentPromptText = (clip.prompts && clip.prompts[promptKey]) ? clip.prompts[promptKey] : '';
    let originalText = (ORIGINAL_PROMPTS_MAP[clip.clipId] && ORIGINAL_PROMPTS_MAP[clip.clipId][promptKey])
      ? ORIGINAL_PROMPTS_MAP[clip.clipId][promptKey]
      : currentPromptText;
    let isModified = currentPromptText !== originalText;

    // 한국어 프롬프트가 수정되어 영문으로 자동 동기화되었는지 여부
    const krKey = `${currentPromptModel}_kr`;
    const krModified = (clip.prompts && clip.prompts[krKey]) && (ORIGINAL_PROMPTS_MAP[clip.clipId] && clip.prompts[krKey] !== ORIGINAL_PROMPTS_MAP[clip.clipId][krKey]);
    let isSyncedFromKr = cardLang === 'en' && krModified;

    // 4대 유형 배지 (콘티 샷 / 캐릭터 / 장소 / 소품) 렌더링
    let assetTagsHtml = '';
    const tagElements = [];

    // 1) 콘티 샷 배지 및 최소 번호 샷 추출
    let shotsList = [];
    if (Array.isArray(clip.contiShots) && clip.contiShots.length > 0) {
      shotsList = clip.contiShots;
    } else if (clip.contiShot) {
      if (clip.contiShot.includes(',')) {
        shotsList = clip.contiShot.split(',').map(s => s.trim()).filter(Boolean);
      } else {
        shotsList = [clip.contiShot];
      }
    }

    shotsList.forEach(shotName => {
      tagElements.push(`<span class="prompt-asset-tag conti">🎬 ${shotName}</span>`);
    });

    // 각 클립에 사용되는 샷 중 번호가 가장 작은 샷(최소 번호 샷) 자동 계산 및 썸네일 매핑
    let minShotNum = null;
    let minShotBadgeText = '';
    if (shotsList.length > 0) {
      const parsedShots = shotsList.map(s => {
        const m = s.match(/Shot\s*0?(\d+)/i);
        return {
          num: m ? parseInt(m[1]) : 999,
          raw: s
        };
      });
      parsedShots.sort((a, b) => a.num - b.num);
      if (parsedShots[0].num !== 999) {
        minShotNum = parsedShots[0].num;
        minShotBadgeText = `SHOT ${minShotNum < 10 ? '0' + minShotNum : minShotNum}`;
      }
    }

    // 최소 번호 샷 이미지 매핑 (1순위: PROJECT_DATA.frames 스토리보드 샷 이미지, 2순위: clip.thumb 파일)
    let finalThumbSrc = clip.thumb || 'CEO_clip01.00_00_06_01.스틸 001.jpg';
    if (minShotNum !== null && window.PROJECT_DATA && Array.isArray(window.PROJECT_DATA.frames)) {
      const matchedFrame = window.PROJECT_DATA.frames.find(f => f.index === minShotNum) ||
                           window.PROJECT_DATA.frames.find(f => parseInt(f.shotNumber) === minShotNum);
      if (matchedFrame && matchedFrame.image) {
        finalThumbSrc = matchedFrame.image;
      }
    }

    // 2) 에셋 라이브러리 배지
    if (clip.linkedAssets && clip.linkedAssets.length > 0) {
      clip.linkedAssets.forEach(tag => {
        const isChar = tag.includes('CEO') || tag.includes('Instructor') || tag.includes('Employee') || tag.includes('Trainee');
        const isLoc = tag.includes('Location') || tag.includes('Office') || tag.includes('Room') || tag.includes('Cityscape') || tag.includes('Center') || tag.includes('Hallway');
        const tagClass = isChar ? 'character' : (isLoc ? 'location' : 'prop');
        const icon = isChar ? '👤' : (isLoc ? '🏢' : '📦');
        tagElements.push(`<span class="prompt-asset-tag ${tagClass}">${icon} ${tag}</span>`);
      });
    }

    if (tagElements.length > 0) {
      assetTagsHtml = `<div class="prompt-asset-tags">${tagElements.join('')}</div>`;
    }

    const emptyPlaceholderHtml = `<span class="empty-prompt-notice" style="color: var(--text-muted); font-style: italic; display: inline-block; padding: 6px 0;">(프롬프트 내용이 비어 있습니다. [✏️ 수정] 버튼을 눌러 새로 작성해 주세요.)</span>`;

    card.innerHTML = `
      <div class="prompt-card-header">
        <div class="prompt-card-header-left">
          <span class="prompt-scene-tag">${clip.sceneId}</span>
          <span class="prompt-clip-badge">CLIP ${clip.clipId < 10 ? '0' + clip.clipId : clip.clipId}</span>
          <h3 class="prompt-card-title">${clip.clipTitle}</h3>
        </div>
        <div class="prompt-card-header-right">
          <span class="prompt-spec-pill">⏱️ ${clip.duration}</span>
          <span class="prompt-spec-pill">📐 ${clip.aspectRatio}</span>
          <span class="prompt-spec-pill">🎞️ ${clip.fps}</span>
          <button class="clip-direct-copy-btn" title="AI 영상 생성기 텍스트창에 바로 붙여넣는 순수 프롬프트 복사">
            <span class="copy-icon">⚡</span>
            <span class="copy-label">AI 다이렉트 복사</span>
          </button>
        </div>
      </div>

      <div class="prompt-card-body">
        <div class="prompt-preview-col">
          <div class="prompt-thumb-wrap">
            <img src="${finalThumbSrc}" alt="Clip ${clip.clipId}" class="prompt-thumb-img" loading="lazy">
            ${minShotBadgeText ? `<span class="prompt-shot-indicator">🎬 ${minShotBadgeText}</span>` : ''}
            <span class="prompt-model-indicator">✦ 4K UHD · 24fps</span>
          </div>
          ${assetTagsHtml}
          <div class="prompt-meta-box">
            <div class="prompt-meta-item">
              <strong>🎥 카메라:</strong> <span>${clip.cameraMotion}</span>
            </div>
            <div class="prompt-meta-item">
              <strong>🔊 사운드:</strong> <span>${clip.audioMood}</span>
            </div>
          </div>
        </div>

        <div class="prompt-code-col">
          <div class="prompt-code-header">
            <span class="prompt-code-title">
              ✦ Video Prompt <span class="prompt-card-lang-indicator" style="font-size: 0.78rem; font-weight: 700; color: var(--accent-gold); margin-left: 6px;">${cardLang === 'kr' ? '🇰🇷 한글 번역' : '🇺🇸 영문 (기준)'}</span>
            </span>
            <div class="prompt-code-actions">
              <span class="prompt-char-count">${currentPromptText.length} chars</span>
            </div>
          </div>
          <div class="prompt-code-box ${isAllPromptsExpanded ? 'expanded' : 'collapsed'}">
            <pre class="prompt-text-display">${currentPromptText ? escapeHtml(currentPromptText) : emptyPlaceholderHtml}</pre>
            <div class="prompt-fade-overlay"></div>
          </div>
        </div>
      </div>
    `;

    // DOM 엘리먼트 참조
    const directCopyBtn = card.querySelector('.clip-direct-copy-btn');

    // [⚡ AI 다이렉트 복사] 버튼 이벤트
    if (directCopyBtn) {
      directCopyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        promptKey = getCardPromptKey();
        const latestText = (clip.prompts && clip.prompts[promptKey]) ? clip.prompts[promptKey] : '';

        if (!latestText || latestText.trim() === '') {
          showToast('⚠️ 프롬프트 내용이 비어 있습니다.', 'warning');
          return;
        }

        const isEnglish = cardLang === 'en';
        const directPrompt = extractDirectPrompt(latestText, isEnglish);
        if (!directPrompt || directPrompt.trim() === '') {
          showToast('⚠️ 복사 가능한 프롬프트 내용이 없습니다.', 'warning');
          return;
        }

        navigator.clipboard.writeText(directPrompt).then(() => {
          directCopyBtn.classList.add('copied');
          const label = directCopyBtn.querySelector('.copy-label');
          const icon = directCopyBtn.querySelector('.copy-icon');
          if (label) label.textContent = '복사 완료!';
          if (icon) icon.textContent = '✓';

          showToast(`⚡ CLIP ${clip.clipId} [${isEnglish ? '영문' : '한글'} AI 다이렉트 프롬프트] 복사 완료! (비디오 생성기에 바로 Ctrl+V)`);

          setTimeout(() => {
            directCopyBtn.classList.remove('copied');
            if (label) label.textContent = 'AI 다이렉트 복사';
            if (icon) icon.textContent = '⚡';
          }, 1800);
        });
      });
    }

    return card;
  }

  /**
   * Seedance 2.0 비디오 생성기 전용 다이렉트 프롬프트 추출 함수
   * 영상 시간(Duration), 카메라 연출, 피사체 액션/대사, 캐릭터 일관성, 조명 및 사운드 연출을 모두 보존하며
   * 불필요한 로컬 이미지 경로(images/...)나 에셋 골뱅이 기호(@)만 깔끔하게 정제하여
   * 생성기 텍스트창에 그대로 붙여넣어(Ctrl+V) 즉시 영상 제작할 수 있도록 지원
   */
  function extractDirectPrompt(rawText, isEn) {
    if (!rawText) return '';
    const lines = rawText.split('\n');
    const cleanLines = [];

    for (let line of lines) {
      const trimmed = line.trim();
      // 배제할 레거시 파일 경로 및 불필요한 콘티 메타데이터 라인
      if (
        trimmed.startsWith('★') ||
        trimmed.includes('images/') ||
        trimmed.startsWith('- [Shot') ||
        trimmed.includes('Primary Visual Reference') ||
        trimmed.includes('1순위 메인 시각 참조') ||
        trimmed.includes('Secondary Asset References') ||
        trimmed.includes('2순위 보조 참조') ||
        trimmed.includes('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      ) {
        continue;
      }

      // 태그 및 특수기호 정제 (16:9 등 비율 콜론은 유지하면서 단어 뒤 콜론 띄어쓰기 정돈)
      let cleanLine = line
        .replace(/\s*\(@[^\)]+\)/g, '')
        .replace(/@[a-zA-Z0-9_]+/g, '')
        .replace(/([a-zA-Z가-힣\)])\s*:\s*/g, '$1: ')
        .replace(/\[Seedance\s*2\.0\s*\|\s*/gi, '[')
        .replace(/\[Seedance\s*\|\s*/gi, '[')
        .replace(/\[Omni\s*Flash\s*1\.1\s*\|\s*/gi, '[')
        .replace(/\[Omni\s*Flash\s*\|\s*/gi, '[')
        .replace(/Seedance\s*2\.0\s*,?\s*/gi, '')
        .replace(/Seedance\s*,?\s*/gi, '');

      cleanLines.push(cleanLine);
    }

    let result = cleanLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

    // 4K 24fps 규격 태그 확인 및 보완
    const specTag = isEn ? 'Cinematic photorealistic, 4K resolution, 24fps.' : '시네마틱 실사, 4K 해상도, 24fps.';
    if (!result.toLowerCase().includes('4k resolution') && !result.toLowerCase().includes('4k 해상도') && !result.toLowerCase().includes('4k uhd')) {
      result += '\n\n' + specTag;
    }

    return result;
  }

  function getCleanPromptText(rawText) {
    if (!rawText) return '';
    // 구분선(━━━━) 또는 📌 참조 이미지 정보 이전의 순수 영상 생성 프롬프트 본문만 추출
    const separatorIndex = rawText.indexOf('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (separatorIndex !== -1) {
      return rawText.substring(0, separatorIndex).trim();
    }
    const pinIndex = rawText.indexOf('📌');
    if (pinIndex !== -1) {
      return rawText.substring(0, pinIndex).trim();
    }
    return rawText.trim();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderClipPrompts() {
    if (!promptClipsContainer) return;
    promptClipsContainer.innerHTML = '';

    const filteredClips = clipPromptsData.filter(clip => {
      if (currentSceneFilter === 'all') return true;
      return clip.sceneId === currentSceneFilter;
    });

    if (filteredClips.length === 0) {
      promptClipsContainer.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted);">해당 조건의 프롬프트가 없습니다.</div>';
      return;
    }

    // 씬별로 그룹화
    const sceneGroups = new Map();
    filteredClips.forEach(clip => {
      if (!sceneGroups.has(clip.sceneId)) {
        sceneGroups.set(clip.sceneId, {
          sceneId: clip.sceneId,
          sceneTitle: clip.sceneTitle || clip.sceneId,
          clips: []
        });
      }
      sceneGroups.get(clip.sceneId).clips.push(clip);
    });

    sceneGroups.forEach(group => {
      // 씬 그룹 블록 생성
      const groupBlock = document.createElement('div');
      groupBlock.className = 'prompt-scene-group';

      // 씬 그룹 헤더
      const header = document.createElement('div');
      header.className = 'prompt-scene-group-header';

      const totalSeconds = group.clips.reduce((acc, c) => acc + parseInt(c.duration || '0'), 0);
      const isSingle = group.clips.length === 1;

      header.innerHTML = `
        <div class="prompt-scene-group-title-wrap">
          <span class="prompt-scene-group-badge">${group.sceneId}</span>
          <h3 class="prompt-scene-group-title">${group.sceneTitle}</h3>
        </div>
        <div class="prompt-scene-group-meta">
          🎬 ${group.clips.length} Clip${group.clips.length > 1 ? 's' : ''} · ⏱️ ${totalSeconds}s
        </div>
      `;
      groupBlock.appendChild(header);

      // 씬별 2열 카드 그리드
      const grid = document.createElement('div');
      grid.className = 'prompt-scene-grid';

      group.clips.forEach(clip => {
        const card = createPromptCard(clip);
        if (isSingle) {
          card.classList.add('single-clip');
        }
        grid.appendChild(card);
      });

      groupBlock.appendChild(grid);
      promptClipsContainer.appendChild(groupBlock);
    });
  }


  // 글로벌 [영문 / 한글] 일괄 전환 토글 버튼 이벤트
  const globalPromptLangToggle = document.getElementById('globalPromptLangToggle');
  if (globalPromptLangToggle) {
    const langBtns = globalPromptLangToggle.querySelectorAll('.global-lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang === currentGlobalPromptLang) return;
        currentGlobalPromptLang = selectedLang;
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderClipPrompts();
        showToast(selectedLang === 'kr' ? '🇰🇷 모든 클립 프롬프트가 한글로 일괄 전환되었습니다.' : '🇺🇸 모든 클립 프롬프트가 영문(기준)으로 일괄 전환되었습니다.');
      });
    });
  }

  // 글로벌 [더보기 ▾ / 접기 ▴] 전체 일괄 토글 버튼 이벤트
  const globalToggleExpandBtn = document.getElementById('globalToggleExpandBtn');
  const globalToggleExpandText = document.getElementById('globalToggleExpandText');

  if (globalToggleExpandBtn && promptClipsContainer) {
    globalToggleExpandBtn.addEventListener('click', () => {
      isAllPromptsExpanded = !isAllPromptsExpanded;
      globalToggleExpandBtn.classList.toggle('active', isAllPromptsExpanded);
      if (globalToggleExpandText) {
        globalToggleExpandText.textContent = isAllPromptsExpanded ? '접기 ▴' : '더보기 ▾';
      }
      const allCodeBoxes = promptClipsContainer.querySelectorAll('.prompt-code-box');
      allCodeBoxes.forEach(box => {
        if (isAllPromptsExpanded) {
          box.classList.remove('collapsed');
          box.classList.add('expanded');
        } else {
          box.classList.add('collapsed');
          box.classList.remove('expanded');
        }
      });
      showToast(isAllPromptsExpanded ? '📖 모든 프롬프트가 전체 펼쳐졌습니다.' : '📑 모든 프롬프트가 기본 축약 상태로 변경되었습니다.');
    });
  }

  // 씬 필터 이벤트
  promptSceneChips.forEach(chip => {
    chip.addEventListener('click', () => {
      promptSceneChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentSceneFilter = chip.getAttribute('data-scene-filter');
      renderClipPrompts();
    });
  });



  // 6-2. 프롬프트 전체 내보내기/불러오기(백업) 및 실제 원본 파일 저장 기능
  const saveToOriginalFileBtn = document.getElementById('saveToOriginalFileBtn');
  const loadBackupFileBtn = document.getElementById('loadBackupFileBtn');
  const promptFileInput = document.getElementById('promptFileInput');
  const exportJsonBackupBtn = document.getElementById('exportJsonBackupBtn');
  const resetAllPromptsBtn = document.getElementById('resetAllPromptsBtn');

  function generateClipPromptsJsContent(data) {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    return `/**
 * 생성형 AI로 달라진 CEO의 하루 - 10개 클립별 영상 제작 전용 프롬프트 데이터셋
 * (실제 원본 데이터 저장 일시: ${timestamp})
 * 
 * [완벽한 영상 제작 최적화 스펙]
 * 1. 스토리보드 콘티 상의 샷 이미지를 가장 중점적으로 1차 참조 (Primary Visual Anchor)
 * 2. 캐릭터 일관성 락 (Character Consistency Lock) 완벽 적용 (로우번, 골드 안경, 진주 귀걸이, 네이비 수트)
 * 3. 2차 보조 참조 에셋 (배경 및 소품) 체계적 계층화
 * 4. 불필요한 설명형 보이스오버/내레이션 100% 전면 삭제 (현장 앰비언스, 물리적 SFX, 필수 립싱크 대사만 보존)
 * 5. Seedance 2.0 및 Omni Flash 1.1 모델별 전용 프롬프트 아키텍처 최적화
 */

window.CLIP_PROMPTS_DATA = ${JSON.stringify(data, null, 2)};
`;
  }

  function downloadTextFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // 1) 실제 원본 파일에 저장 (내보내기)
  if (saveToOriginalFileBtn) {
    saveToOriginalFileBtn.addEventListener('click', async () => {
      const jsContent = generateClipPromptsJsContent(clipPromptsData);

      // File System Access API 지원 환경 (Chrome, Edge 등): 원본 파일 직접 선택 및 덮어쓰기
      if (window.showSaveFilePicker) {
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: 'clip-prompts-data.js',
            types: [{
              description: 'JavaScript 원본 데이터 파일 (*.js)',
              accept: { 'text/javascript': ['.js'] }
            }]
          });
          const writable = await handle.createWritable();
          await writable.write(jsContent);
          await writable.close();

          // 저장된 내용을 새로운 원본 기준점으로 갱신
          clipPromptsData.forEach(clip => {
            ORIGINAL_PROMPTS_MAP[clip.clipId] = { ...(clip.prompts || {}) };
          });
          localStorage.removeItem(PROMPTS_STORAGE_KEY);
          renderClipPrompts();
          showToast('💾 실제 원본 데이터 파일(js/clip-prompts-data.js)에 저장이 완료되었습니다! 새 원본으로 동기화되었습니다.', 'success');
          return;
        } catch (err) {
          if (err.name === 'AbortError') return;
          console.warn('showSaveFilePicker 실패 또는 취소, 다운로드 방식으로 전환:', err);
        }
      }

      // 일반 다운로드 방식
      downloadTextFile('clip-prompts-data.js', jsContent, 'text/javascript;charset=utf-8');
      clipPromptsData.forEach(clip => {
        ORIGINAL_PROMPTS_MAP[clip.clipId] = { ...(clip.prompts || {}) };
      });
      localStorage.removeItem(PROMPTS_STORAGE_KEY);
      renderClipPrompts();
      showToast('📥 clip-prompts-data.js 파일이 다운로드되었습니다. 프로젝트 js/ 폴더에 덮어쓰시면 원본 파일에 영구 저장됩니다.', 'info');
    });
  }

  // 2) 백업 파일 불러오기 버튼 및 파일 선택
  if (loadBackupFileBtn && promptFileInput) {
    loadBackupFileBtn.addEventListener('click', () => {
      promptFileInput.click();
    });

    promptFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target.result;
          let importedData = null;

          if (file.name.endsWith('.json')) {
            const parsed = JSON.parse(content);
            importedData = Array.isArray(parsed) ? parsed : (parsed.clips || parsed);
          } else {
            // .js 파일 파싱: window.CLIP_PROMPTS_DATA = [...] 추출
            const match = content.match(/window\.CLIP_PROMPTS_DATA\s*=\s*(\[[\s\S]*?\]);?/);
            if (match) {
              importedData = JSON.parse(match[1]);
            } else {
              const firstBracket = content.indexOf('[');
              const lastBracket = content.lastIndexOf(']');
              if (firstBracket !== -1 && lastBracket > firstBracket) {
                importedData = JSON.parse(content.substring(firstBracket, lastBracket + 1));
              }
            }
          }

          if (!importedData) {
            throw new Error('유효한 프롬프트 데이터셋 배열을 찾을 수 없습니다.');
          }

          // 데이터 병합
          if (Array.isArray(importedData)) {
            importedData.forEach(importedClip => {
              const target = clipPromptsData.find(c => c.clipId === importedClip.clipId);
              if (target && importedClip.prompts) {
                target.prompts = { ...target.prompts, ...importedClip.prompts };
              }
            });
          } else if (typeof importedData === 'object') {
            Object.keys(importedData).forEach(clipIdKey => {
              const clipIdNum = parseInt(clipIdKey, 10);
              const target = clipPromptsData.find(c => c.clipId === clipIdNum);
              if (target) {
                target.prompts = { ...target.prompts, ...importedData[clipIdKey] };
              }
            });
          }

          // localStorage 동기화
          const storageData = {};
          clipPromptsData.forEach(clip => {
            storageData[clip.clipId] = { ...(clip.prompts || {}) };
          });
          localStorage.setItem(PROMPTS_STORAGE_KEY, JSON.stringify(storageData));

          renderClipPrompts();
          showToast(`📥 백업 파일(${file.name})을 성공적으로 불러와 전체 프롬프트에 적용했습니다!`, 'success');
        } catch (err) {
          console.error('프롬프트 파일 파싱 실패:', err);
          showToast(`⚠️ 불러오기 실패: 올바른 형식의 .js 또는 .json 파일인지 확인해 주세요. (${err.message})`, 'warning');
        } finally {
          e.target.value = '';
        }
      };
      reader.readAsText(file, 'utf-8');
    });
  }

  // 3) JSON 백업 내보내기
  if (exportJsonBackupBtn) {
    exportJsonBackupBtn.addEventListener('click', () => {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const filename = `woman_ceo_prompts_backup_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}.json`;
      const payload = {
        project: '생성형 AI로 달라진 CEO의 하루',
        exportedAt: now.toISOString(),
        clips: clipPromptsData
      };
      downloadTextFile(filename, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8');
      showToast(`📦 JSON 백업 파일(${filename})이 저장되었습니다.`, 'success');
    });
  }

  // 4) 전체 원본 기본값 복원
  if (resetAllPromptsBtn) {
    resetAllPromptsBtn.addEventListener('click', () => {
      if (!confirm('⚠️ 모든 클립의 프롬프트를 최초 원본 데이터 기본값으로 복원하시겠습니까?\n(현재 수정한 모든 프롬프트가 초기화됩니다.)')) {
        return;
      }

      clipPromptsData.forEach(clip => {
        if (ORIGINAL_PROMPTS_MAP[clip.clipId]) {
          clip.prompts = { ...(ORIGINAL_PROMPTS_MAP[clip.clipId] || {}) };
        }
      });

      localStorage.removeItem(PROMPTS_STORAGE_KEY);
      renderClipPrompts();
      showToast('🔄 모든 클립의 프롬프트가 최초 기본값으로 복원되었습니다.', 'info');
    });
  }

  // 5) [⚡ 전체 AI 다이렉트 복사] 툴바 버튼 이벤트
  const copyAllDirectPromptsBtn = document.getElementById('copyAllDirectPromptsBtn');
  if (copyAllDirectPromptsBtn) {
    copyAllDirectPromptsBtn.addEventListener('click', () => {
      const isEnglish = currentGlobalPromptLang === 'en';
      const promptKey = `${currentPromptModel}_${currentGlobalPromptLang}`;

      const allPromptsText = clipPromptsData.map(clip => {
        const raw = (clip.prompts && clip.prompts[promptKey]) ? clip.prompts[promptKey] : '';
        const clean = extractDirectPrompt(raw, isEnglish);
        const clipNum = clip.clipId < 10 ? '0' + clip.clipId : clip.clipId;
        return `========================================\n[CLIP ${clipNum} - ${clip.clipTitle}]\n========================================\n${clean}\n`;
      }).join('\n');

      navigator.clipboard.writeText(allPromptsText).then(() => {
        copyAllDirectPromptsBtn.classList.add('copied');
        const span = copyAllDirectPromptsBtn.querySelector('span:last-child');
        const oldText = span ? span.textContent : '전체 AI 다이렉트 복사';
        if (span) span.textContent = '복사 완료!';

        showToast(`⚡ 10개 클립 전체의 [AI 다이렉트 프롬프트]가 클립보드에 복사되었습니다! (총 ${clipPromptsData.length}개 클립)`);

        setTimeout(() => {
          copyAllDirectPromptsBtn.classList.remove('copied');
          if (span) span.textContent = oldText;
        }, 2000);
      });
    });
  }

  // 초기 프롬프트 렌더링
  renderClipPrompts();

  // ==========================================================================
  // 6. [STEP 05] 클립 제작 결과 (10 Clips Video Showcase & YouTube Grid)
  // ==========================================================================
  const videoResultsContainer = document.getElementById('videoResultsContainer');
  const videoSceneFilterBar = document.getElementById('videoSceneFilterBar');
  const toggleVideoGroupingBtn = document.getElementById('toggleVideoGroupingBtn');
  const toggleVideoGroupingText = document.getElementById('toggleVideoGroupingText');

  let currentVideoSceneFilter = 'all';
  let isVideoGrouped = false; // 기본: 전체 그리드 보기

  /**
   * 단일 클립 비디오 카드 HTML 템플릿 생성
   * @param {Object} clip 클립 데이터 객체
   * @returns {string} 카드 HTML 문자열
   */
  function createVideoCardHtml(clip) {
    const clipNum = clip.clipId < 10 ? '0' + clip.clipId : clip.clipId;
    const clipBadgeText = `CLIP ${clipNum}`;

    // 콘티 샷 태그
    const contiTagsHtml = (clip.contiShots || []).map(shot => {
      return `<span class="video-conti-tag">🎬 ${shot}</span>`;
    }).join('');

    // 연결 에셋 태그
    const assetTagsHtml = (clip.linkedAssets || []).map(asset => {
      const isCharacter = asset.includes('CEO') || asset.includes('Instructor') || asset.includes('Employee');
      const icon = isCharacter ? '👤' : '📦';
      return `<span class="video-asset-tag ${isCharacter ? 'character' : ''}">${icon} ${asset}</span>`;
    }).join('');

    // YouTube iframe 플레이어 (Error 153 방지: youtube-nocookie + referrerpolicy + enablejsapi)
    const embedUrl = clip.youtubeId
      ? `https://www.youtube-nocookie.com/embed/${clip.youtubeId}?rel=0&modestbranding=1&enablejsapi=1&playsinline=1`
      : '';

    const directWatchUrl = clip.videoUrl || (clip.youtubeId ? `https://youtu.be/${clip.youtubeId}` : '#');

    return `
      <article class="video-card" data-clip-id="${clip.clipId}" data-scene="${clip.sceneId}">
        <div class="video-player-wrap">
          ${clip.youtubeId ? `
            <iframe
              src="${embedUrl}"
              title="[CLIP ${clipNum}] ${clip.clipTitle}"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          ` : `
            <div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-muted);font-size:0.85rem;">
              비디오 링크 준비 중
            </div>
          `}
        </div>

        <div class="video-card-body">
          <div class="video-card-header">
            <div class="video-badge-group">
              <span class="video-scene-badge">${clip.sceneId}</span>
              <span class="video-clip-badge">${clipBadgeText}</span>
            </div>
            <span class="video-duration-tag">⏱️ ${clip.duration}</span>
          </div>

          <h4 class="video-card-title" title="${clip.clipTitle}">${clip.clipTitle}</h4>

          ${contiTagsHtml ? `<div class="video-conti-tags">${contiTagsHtml}</div>` : ''}
          ${assetTagsHtml ? `<div class="video-asset-tags">${assetTagsHtml}</div>` : ''}
        </div>
      </article>
    `;
  }

  /**
   * 클립 제작 결과 렌더링 함수 (기본: 씬별 그룹 뷰, 토글 시: 전체 4열 그리드 뷰)
   */
  function renderVideoResults() {
    if (!videoResultsContainer) return;

    // 필터링 적용
    const filteredClips = (currentVideoSceneFilter === 'all')
      ? clipPromptsData
      : clipPromptsData.filter(c => c.sceneId === currentVideoSceneFilter);

    if (filteredClips.length === 0) {
      videoResultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          선택한 필터 조건에 해당하는 영상 클립이 없습니다.
        </div>
      `;
      return;
    }

    if (isVideoGrouped) {
      // 씬별 그룹화 뷰 (Scene-by-Scene Grouped View)
      const sceneGroupMap = new Map();
      filteredClips.forEach(clip => {
        if (!sceneGroupMap.has(clip.sceneId)) {
          sceneGroupMap.set(clip.sceneId, {
            sceneId: clip.sceneId,
            sceneTitle: clip.sceneTitle,
            clips: []
          });
        }
        sceneGroupMap.get(clip.sceneId).clips.push(clip);
      });

      let html = '';
      sceneGroupMap.forEach(group => {
        const totalDurationSec = group.clips.reduce((acc, c) => {
          const sec = parseInt(c.duration.replace('s', '')) || 0;
          return acc + sec;
        }, 0);

        const cardsHtml = group.clips.map(clip => createVideoCardHtml(clip)).join('');

        html += `
          <div class="video-scene-group">
            <div class="video-scene-group-header">
              <div class="video-scene-group-title-wrap">
                <span class="video-scene-group-badge">${group.sceneId}</span>
                <h3 class="video-scene-group-title">${group.sceneTitle}</h3>
              </div>
              <div class="video-scene-group-meta-right">
                <span class="scene-clip-badge">🎬 ${group.clips.length} Clips</span>
                <span class="scene-shot-count">⏱️ Total ${totalDurationSec}s</span>
              </div>
            </div>
            <div class="video-results-grid">
              ${cardsHtml}
            </div>
          </div>
        `;
      });

      videoResultsContainer.innerHTML = html;
    } else {
      // 전체 4열 그리드 뷰
      const cardsHtml = filteredClips.map(clip => createVideoCardHtml(clip)).join('');
      videoResultsContainer.innerHTML = `
        <div class="video-results-grid">
          ${cardsHtml}
        </div>
      `;
    }
  }

  // 씬 필터 클릭 이벤트
  if (videoSceneFilterBar) {
    const filterButtons = videoSceneFilterBar.querySelectorAll('.filter-chip');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentVideoSceneFilter = btn.getAttribute('data-video-scene') || 'all';
        renderVideoResults();
      });
    });
  }

  // 씬별 그룹화 / 전체 4열 그리드 토글 이벤트
  if (toggleVideoGroupingBtn) {
    toggleVideoGroupingBtn.addEventListener('click', () => {
      isVideoGrouped = !isVideoGrouped;
      toggleVideoGroupingBtn.classList.toggle('active', isVideoGrouped);
      if (toggleVideoGroupingText) {
        toggleVideoGroupingText.textContent = isVideoGrouped ? '전체 그리드 보기' : '씬별 그룹 보기';
      }
      renderVideoResults();
    });
  }

  // 초기 비디오 결과 렌더링
  renderVideoResults();

  // 7. 좌측 사이드바 페이지 단위 전환 (Page-by-Page Navigation)
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const pages = document.querySelectorAll('.page-view');

  function switchPage(pageId) {
    // 모든 페이지 숨기기
    pages.forEach(p => p.classList.remove('active-page'));
    // 모든 메뉴 비활성화
    sidebarLinks.forEach(l => l.classList.remove('active'));

    // 대상 페이지 활성화
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-page');
    }

    // 대상 메뉴 활성화
    const targetLink = document.querySelector(`.sidebar-link[data-page="${pageId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // 화면 최상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // URL 해시 업데이트
    const hashName = pageId.replace('page-', '');
    if (typeof window !== 'undefined' && window.history && window.history.pushState) {
      window.history.pushState(null, null, `#${hashName}`);
    } else if (typeof window !== 'undefined' && window.location) {
      window.location.hash = `#${hashName}`;
    }
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        e.preventDefault();
        switchPage(pageId);
      }
      // href가 지정된 <a> 태그(auth.html 등)는 브라우저 기본 이동 동작 유지
    });
  });

  // 초기 URL 해시 확인 및 해당 페이지 로드
  const currentHash = (typeof window !== 'undefined' && window.location && window.location.hash)
    ? window.location.hash.replace('#', '')
    : '';
  if (currentHash === 'assets') {
    switchPage('page-assets');
  } else if (currentHash === 'storyboard') {
    switchPage('page-storyboard');
  } else if (currentHash === 'prompts') {
    switchPage('page-prompts');
  } else if (currentHash === 'results') {
    switchPage('page-results');
  } else if (currentHash === 'cert' || currentHash === 'upload') {
    window.location.href = `auth.html#${currentHash}`;
  } else {
    switchPage('page-script');
  }

  // 8. 라이트 모드 / 다크 모드 테마 전환 로직
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = '다크 모드';
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = '라이트 모드';
    }
  }

  // 로컬 스토리지에서 저장된 테마 불러오기 (기본값: 라이트 모드)
  const savedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('theme') : null;
  let isLightTheme = savedTheme ? (savedTheme === 'light') : true;
  applyTheme(isLightTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      isLightTheme = !isLightTheme;
      applyTheme(isLightTheme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      }
    });
  }

  // 9. AI 영상 오류 해결 팝업 모달 제어 로직
  const troubleshootModal = document.getElementById('troubleshootModal');
  const openTroubleshootModalBtn = document.getElementById('openTroubleshootModalBtn');
  const troubleshootCloseBtn = document.getElementById('troubleshootCloseBtn');

  function openTroubleshootModal() {
    if (troubleshootModal) {
      troubleshootModal.classList.add('open');
      troubleshootModal.scrollTop = 0;
      const card = troubleshootModal.querySelector('.troubleshoot-modal-card');
      if (card) card.scrollTop = 0;
    }
  }

  function closeTroubleshootModal() {
    if (troubleshootModal) {
      troubleshootModal.classList.remove('open');
    }
  }

  if (openTroubleshootModalBtn) {
    openTroubleshootModalBtn.addEventListener('click', openTroubleshootModal);
  }
  if (troubleshootCloseBtn) {
    troubleshootCloseBtn.addEventListener('click', closeTroubleshootModal);
  }
  if (troubleshootModal) {
    troubleshootModal.addEventListener('click', (e) => {
      if (e.target === troubleshootModal) {
        closeTroubleshootModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && troubleshootModal && troubleshootModal.classList.contains('open')) {
      closeTroubleshootModal();
    }
  });

  // 모달 내 해결 프롬프트 스니펫 원클릭 복사
  document.querySelectorAll('.copy-snippet-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-copy-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        navigator.clipboard.writeText(targetEl.textContent).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '복사완료! ✓';
          btn.style.background = '#10b981';
          btn.style.color = '#000000';
          if (typeof showToast === 'function') {
            showToast('💡 해결 프롬프트 예시가 클립보드에 복사되었습니다.', 'info');
          }
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(() => {
          if (typeof showToast === 'function') {
            showToast('복사에 실패했습니다.', 'warning');
          }
        });
      }
    });
  });
});

/* ==========================================================================
   [INTRO VIDEO] 풀스크린 인트로 비디오 제어 스크립트 (원복 시 이 블록 삭제/주석 처리)
   ========================================================================== */
function initIntroOverlay() {
  const overlay = document.getElementById('introOverlay');
  const video = document.getElementById('introVideo');
  const skipBtn = document.getElementById('introSkipBtn');
  const soundBtn = document.getElementById('introSoundBtn');

  if (!overlay || !video) return;

  // 인트로 닫기 (부드러운 페이드아웃)
  const closeIntro = () => {
    if (overlay.classList.contains('hide')) return;
    overlay.classList.add('hide');
    video.pause();
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 850);
  };

  // 1. 영상 재생 완료 시 자동 닫기
  video.addEventListener('ended', closeIntro);

  // 2. 건너뛰기 버튼 클릭 시
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeIntro();
    });
  }

  // 3. 음소거 / 소리 켜기 토글
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        soundBtn.textContent = '🔊 소리 켜기';
        soundBtn.style.color = '#f8fafc';
      } else {
        soundBtn.textContent = '🔇 음소거';
        soundBtn.style.color = '#fcd34d';
      }
    });
  }

  // 4. 키보드 ESC 키로 건너뛰기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeIntro();
    }
  });

  // 5. 브라우저 비디오 자동 재생 보조
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.log('Intro video autoplay requires user interaction:', err);
    });
  }
}

// 인트로 초기화 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initIntroOverlay();
    initCertificationPage();
  });
} else {
  initIntroOverlay();
  initCertificationPage();
}

/**
 * ==========================================================================
 * [STEP 06] 변화의 시작 인증 (참석자 인증 및 새로운 시작 다짐) 컨트롤러 로직
 * ==========================================================================
 */
function initCertificationPage() {
  const LOCAL_STORAGE_KEY = 'CEO_STORYBOARD_CERT_PARTICIPANTS_V1';

  // 1. AI 프롬프트 스타일 프리셋 정의
  const PRESETS = {
    cinematic_gold: {
      name: '🌟 시네마틱 골든 리더',
      prompt: '50s Korean female visionary CEO, elegant navy blazer, confident radiant smile, cinematic 5600K golden hour lighting, sharp 8k portrait, premium executive mood.',
      filter: (ctx, width, height) => {
        // 따뜻한 골든아워 그라데이션 오버레이 & 채도/대비 강화
        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.fillRect(0, 0, width, height);
        const grad = ctx.createRadialGradient(width * 0.7, height * 0.3, 10, width * 0.7, height * 0.3, width * 0.9);
        grad.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    },
    studio_modern: {
      name: '💼 모던 프레스티지 비즈니스',
      prompt: 'Modern executive Korean female CEO, bespoke charcoal suit, poised smart look, deep navy studio contrast, cinematic rim lighting, 8k professional studio portrait.',
      filter: (ctx, width, height) => {
        // 딥 네이비 & 쿨 비즈니스 앰비언트
        ctx.fillStyle = 'rgba(30, 58, 138, 0.14)';
        ctx.fillRect(0, 0, width, height);
        const grad = ctx.createRadialGradient(width * 0.2, height * 0.8, 10, width * 0.2, height * 0.8, width * 0.8);
        grad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    },
    tech_innovator: {
      name: '🚀 테크 이노베이터',
      prompt: 'Dynamic Korean tech founder, smart glasses, futuristic high-tech AI headquarters background, energetic posture, crisp hyper-detailed, visionary tech leader.',
      filter: (ctx, width, height) => {
        // 사이버 앰비언트 & 퍼플/시안 하이라이트
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, 'rgba(168, 85, 247, 0.15)');
        grad.addColorStop(1, 'rgba(14, 165, 233, 0.15)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    },
    visionary_warmth: {
      name: '🌿 비저너리 소프트 무드',
      prompt: 'Visionary female business leader, warm soft lighting, pearl earrings, authentic warm smile, bright open modern office ambience, elegant soft focus bokeh.',
      filter: (ctx, width, height) => {
        // 소프트 웜 톤 & 밝은 자연광
        ctx.fillStyle = 'rgba(251, 191, 36, 0.1)';
        ctx.fillRect(0, 0, width, height);
        const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    }
  };

  // 2. 초기 기본 데모 참석자 데이터
  const DEFAULT_PARTICIPANTS = [
    {
      id: 'cert-demo-01',
      name: '김서연 대표',
      company: '㈜넥스트웨이브 솔루션',
      resolution: '생성형 AI로 업무 효율을 300% 높이고, 글로벌 무대를 향해 당당하게 도약하겠습니다! 🚀',
      presetKey: 'cinematic_gold',
      promptText: PRESETS.cinematic_gold.prompt,
      beforeImg: 'images/CEO01.png',
      afterImg: 'images/CEO01.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-02',
      name: '이지은 대표',
      company: '㈜모던 라이프스타일',
      resolution: '배움에는 한계가 없음을 확신했습니다. AI와 함께 우리 기업의 새로운 10년을 만들어가겠습니다. ✨',
      presetKey: 'studio_modern',
      promptText: PRESETS.studio_modern.prompt,
      beforeImg: 'images/CEO02.png',
      afterImg: 'images/CEO02.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-03',
      name: '정유진 대표',
      company: '㈜스마트 커머스랩',
      resolution: '아이디어 기획부터 시각화까지! AI 날개를 달고 두려움 없이 비즈니스를 혁신합니다. 🌟',
      presetKey: 'tech_innovator',
      promptText: PRESETS.tech_innovator.prompt,
      beforeImg: 'images/Young_Employee.jpeg',
      afterImg: 'images/Young_Employee.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-04',
      name: '한민경 대표',
      company: '㈜비전이노베이션',
      resolution: '막연했던 두려움이 가슴 벅찬 설렘으로 바뀌었습니다. 대한민국 여성기업인의 힘찬 시작을 함께합니다! 💪',
      presetKey: 'visionary_warmth',
      promptText: PRESETS.visionary_warmth.prompt,
      beforeImg: 'images/Trainees.jpeg',
      afterImg: 'images/Trainees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    }
  ];

  // 로컬스토리지에서 참석자 데이터 로드
  let participants = [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      participants = JSON.parse(saved);
    } else {
      participants = [...DEFAULT_PARTICIPANTS];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
    }
  } catch (err) {
    console.warn('LocalStorage error, using defaults:', err);
    participants = [...DEFAULT_PARTICIPANTS];
  }

  // DOM 엘리먼트 참조
  const certGrid = document.getElementById('certGrid');
  const certCountTotal = document.getElementById('certCountTotal');
  const certFilterBar = document.getElementById('certFilterBar');
  const openCertUploadBtn = document.getElementById('openCertUploadBtn');
  const openCertQrBtn = document.getElementById('openCertQrBtn');
  const captureBoardBtn = document.getElementById('captureBoardBtn');

  // 모달 참조
  const certUploadModal = document.getElementById('certUploadModal');
  const certUploadModalCloseBtn = document.getElementById('certUploadModalCloseBtn');
  const certQrModal = document.getElementById('certQrModal');
  const certQrModalCloseBtn = document.getElementById('certQrModalCloseBtn');

  // 업로드 폼 참조
  const certUploadForm = document.getElementById('certUploadForm');
  const certFileInput = document.getElementById('certFileInput');
  const certDropzone = document.getElementById('certDropzone');
  const certTabUploadBtn = document.getElementById('certTabUploadBtn');
  const certTabCameraBtn = document.getElementById('certTabCameraBtn');
  const certCameraWrap = document.getElementById('certCameraWrap');
  const certWebcamVideo = document.getElementById('certWebcamVideo');
  const certCaptureCameraBtn = document.getElementById('certCaptureCameraBtn');
  const certRetakeCameraBtn = document.getElementById('certRetakeCameraBtn');
  const certPreviewContainer = document.getElementById('certPreviewContainer');
  const certPreviewImg = document.getElementById('certPreviewImg');
  const certResetImgBtn = document.getElementById('certResetImgBtn');
  const certAiScanOverlay = document.getElementById('certAiScanOverlay');

  const certInputName = document.getElementById('certInputName');
  const certInputResolution = document.getElementById('certInputResolution');
  const certResolutionCharCount = document.getElementById('certResolutionCharCount');
  const certPromptPreviewText = document.getElementById('certPromptPreviewText');
  const certSubmitBtn = document.getElementById('certSubmitBtn');
  const certBtnSpinner = document.getElementById('certBtnSpinner');
  const certBtnText = document.getElementById('certBtnText');

  // QR 모달 참조
  const certQrContainer = document.getElementById('certQrContainer');
  const certDirectUrlInput = document.getElementById('certDirectUrlInput');
  const certCopyUrlBtn = document.getElementById('certCopyUrlBtn');

  let currentUploadedDataUrl = null;
  let webcamStream = null;
  let currentFilter = 'all';

  // 3. 참석자 카드 그리드 렌더링 함수
  function renderCertCards(filter = 'all') {
    if (!certGrid) return;
    currentFilter = filter;

    let displayList = [...participants];
    if (filter === 'recent') {
      displayList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }

    if (certCountTotal) {
      certCountTotal.textContent = participants.length;
    }

    if (displayList.length === 0) {
      certGrid.innerHTML = `
        <div class="cert-empty-state">
          <div class="cert-empty-icon">📸</div>
          <h3 class="cert-empty-title">아직 등록된 참석자 인증 카드가 없습니다</h3>
          <p class="cert-empty-desc">가장 먼저 사진을 등록하고 디지털(AI) 교육의 새로운 시작을 당당하게 인증해 보세요!</p>
          <button type="button" class="cert-upload-trigger-btn" onclick="document.getElementById('openCertUploadBtn').click()">
            <span>📸</span> 첫 번째 인증 사진 등록하기
          </button>
        </div>
      `;
      return;
    }

    certGrid.innerHTML = displayList.map(item => {
      const presetInfo = PRESETS[item.presetKey] || PRESETS.cinematic_gold;
      const isAfter = item.isCurrentViewAfter !== false;
      const currentImg = isAfter ? item.afterImg : item.beforeImg;
      const viewLabel = isAfter ? '✨ AI 변환 프로필' : '📷 원본 사진';

      return `
        <div class="cert-card" id="card-${item.id}">
          <!-- 1. 다짐 한마디: Zoom 대화 말풍선 (인물 머리 위) -->
          <div class="cert-quote-box">
            <p class="cert-quote-text">
              <span class="cert-quote-icon">“</span>${escapeHtml(item.resolution)}<span class="cert-quote-icon">”</span>
            </p>
          </div>

          <!-- 2. Zoom 몰입형 인물 아바타 (아치형 소프트 엣지) -->
          <div class="cert-card-media">
            <img src="${currentImg}" alt="${escapeHtml(item.name)} 인증 사진" class="cert-card-img" id="img-${item.id}">
            <button type="button" class="cert-toggle-view-pill" data-card-id="${item.id}" title="원본 / AI 변환 사진 전환">
              ${viewLabel} ⇄
            </button>
          </div>

          <!-- 3. Zoom 몰입형 글래스모피즘 네임태그 바 -->
          <div class="cert-card-body">
            <div class="ceremony-nameplate">
              <span class="zoom-live-dot" title="참여 인증 완료"></span>
              <span class="cert-user-name">${escapeHtml(item.name)}</span>
              <span class="cert-user-role">(${escapeHtml(item.company || '여성기업인 디지털 혁신 1기')})</span>
            </div>

            <!-- 미니 컨트롤 푸터 -->
            <div class="cert-card-footer">
              <span class="cert-preset-tag">${presetInfo.name}</span>
              <button type="button" class="cert-card-action-btn" data-download-id="${item.id}" title="이 인증 사진만 이미지로 저장">
                📥 저장
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // 개별 카드 뷰 토글 이벤트 바인딩
    const toggleBtns = certGrid.querySelectorAll('.cert-toggle-view-pill');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.getAttribute('data-card-id');
        toggleCardView(cardId);
      });
    });

    // 개별 카드 다운로드 이벤트 바인딩
    const downloadBtns = certGrid.querySelectorAll('[data-download-id]');
    downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.getAttribute('data-download-id');
        downloadSingleCard(cardId);
      });
    });
  }

  // Before / After 이미지 토글
  function toggleCardView(cardId) {
    const item = participants.find(p => p.id === cardId);
    if (!item) return;

    item.isCurrentViewAfter = !item.isCurrentViewAfter;
    const imgEl = document.getElementById(`img-${cardId}`);
    const btnEl = document.querySelector(`.cert-toggle-view-pill[data-card-id="${cardId}"]`);

    if (imgEl && btnEl) {
      imgEl.style.opacity = '0';
      setTimeout(() => {
        imgEl.src = item.isCurrentViewAfter ? item.afterImg : item.beforeImg;
        btnEl.textContent = item.isCurrentViewAfter ? '✨ AI 변환 프로필 ⇄' : '📷 원본 사진 ⇄';
        imgEl.style.opacity = '1';
      }, 150);
    }
  }

  // 개별 카드 캡처 다운로드
  function downloadSingleCard(cardId) {
    const targetCard = document.getElementById(`card-${cardId}`);
    if (!targetCard || typeof html2canvas === 'undefined') return;

    showToastNotification('📥 인증 카드를 고화질 이미지로 저장 중입니다...');
    html2canvas(targetCard, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#101522'
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `변화의시작_인증카드_${cardId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToastNotification('✅ 인증 카드가 성공적으로 다운로드되었습니다!');
    }).catch(err => {
      console.error('Card capture error:', err);
      showToastNotification('❌ 카드 저장 중 오류가 발생했습니다.');
    });
  }

  // 4. Canvas 기반 AI 이미지 변환 시뮬레이션 필터 엔진
  function generateAiStyledImage(sourceDataUrl, presetKey) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const targetWidth = 800;
        const targetHeight = 600;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // 원본 이미지 센터 크롭 렌더링 (Cover 방식)
        const imgAspect = img.width / img.height;
        const targetAspect = targetWidth / targetHeight;
        let sx, sy, sWidth, sHeight;

        if (imgAspect > targetAspect) {
          sHeight = img.height;
          sWidth = img.height * targetAspect;
          sx = (img.width - sWidth) / 2;
          sy = 0;
        } else {
          sWidth = img.width;
          sHeight = img.width / targetAspect;
          sx = 0;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

        // 시네마틱 톤 보정 (밝기, 대비, 선명도 블렌딩)
        const preset = PRESETS[presetKey] || PRESETS.cinematic_gold;
        if (preset.filter) {
          preset.filter(ctx, targetWidth, targetHeight);
        }

        // 비네팅 효과 추가
        const vignette = ctx.createRadialGradient(
          targetWidth / 2, targetHeight / 2, targetWidth * 0.35,
          targetWidth / 2, targetHeight / 2, targetWidth * 0.75
        );
        vignette.addColorStop(0, 'transparent');
        vignette.addColorStop(1, 'rgba(10, 13, 20, 0.45)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // 우측 하단 AI 생성 워터마크 태그
        ctx.font = 'bold 16px "Outfit", sans-serif';
        ctx.fillStyle = 'rgba(252, 211, 77, 0.9)';
        ctx.textAlign = 'right';
        ctx.fillText('✦ AI GENERATED LEADER PROFILE', targetWidth - 25, targetHeight - 25);

        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.onerror = (err) => reject(err);
      img.src = sourceDataUrl;
    });
  }

  // 5. 파일 업로드 및 드롭존 핸들링
  if (certDropzone && certFileInput) {
    certDropzone.addEventListener('click', () => certFileInput.click());

    certFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleImageFile(file);
    });

    certDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      certDropzone.classList.add('drag-over');
    });

    certDropzone.addEventListener('dragleave', () => {
      certDropzone.classList.remove('drag-over');
    });

    certDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      certDropzone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImageFile(file);
      } else {
        showToastNotification('⚠️ 이미지 파일(JPG, PNG 등)만 등록 가능합니다.');
      }
    });
  }

  function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentUploadedDataUrl = e.target.result;
      showPreviewImage(currentUploadedDataUrl);
    };
    reader.readAsDataURL(file);
  }

  function showPreviewImage(dataUrl) {
    if (certPreviewImg && certPreviewContainer) {
      certPreviewImg.src = dataUrl;
      certPreviewContainer.style.display = 'flex';
      if (certDropzone) certDropzone.style.display = 'none';
      if (certCameraWrap) certCameraWrap.style.display = 'none';
    }
  }

  if (certResetImgBtn) {
    certResetImgBtn.addEventListener('click', () => {
      currentUploadedDataUrl = null;
      if (certPreviewContainer) certPreviewContainer.style.display = 'none';
      if (certFileInput) certFileInput.value = '';
      if (certTabUploadBtn && certTabUploadBtn.classList.contains('active')) {
        if (certDropzone) certDropzone.style.display = 'flex';
      } else {
        startWebcam();
      }
    });
  }

  // 6. 탭 전환 (업로드 vs 웹캠)
  if (certTabUploadBtn && certTabCameraBtn) {
    certTabUploadBtn.addEventListener('click', () => {
      certTabUploadBtn.classList.add('active');
      certTabCameraBtn.classList.remove('active');
      stopWebcam();
      if (!currentUploadedDataUrl) {
        if (certDropzone) certDropzone.style.display = 'flex';
        if (certCameraWrap) certCameraWrap.style.display = 'none';
        if (certPreviewContainer) certPreviewContainer.style.display = 'none';
      }
    });

    certTabCameraBtn.addEventListener('click', () => {
      certTabCameraBtn.classList.add('active');
      certTabUploadBtn.classList.remove('active');
      if (!currentUploadedDataUrl) {
        if (certDropzone) certDropzone.style.display = 'none';
        startWebcam();
      }
    });
  }

  // 웹캠 제어
  function startWebcam() {
    if (!certWebcamVideo || !certCameraWrap) return;
    certCameraWrap.style.display = 'flex';
    if (certPreviewContainer) certPreviewContainer.style.display = 'none';

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } })
        .then(stream => {
          webcamStream = stream;
          certWebcamVideo.srcObject = stream;
        })
        .catch(err => {
          console.warn('Webcam access error:', err);
          showToastNotification('⚠️ 카메라 접근 권한이 없거나 지원되지 않습니다. 사진 업로드를 이용해 주세요.');
          if (certTabUploadBtn) certTabUploadBtn.click();
        });
    } else {
      showToastNotification('⚠️ 브라우저가 카메라 촬영을 지원하지 않습니다.');
      if (certTabUploadBtn) certTabUploadBtn.click();
    }
  }

  function stopWebcam() {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;
    }
    if (certWebcamVideo) {
      certWebcamVideo.srcObject = null;
    }
  }

  if (certCaptureCameraBtn) {
    certCaptureCameraBtn.addEventListener('click', () => {
      if (!certWebcamVideo) return;
      const canvas = document.createElement('canvas');
      canvas.width = certWebcamVideo.videoWidth || 640;
      canvas.height = certWebcamVideo.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(certWebcamVideo, 0, 0, canvas.width, canvas.height);
      currentUploadedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopWebcam();
      showPreviewImage(currentUploadedDataUrl);
      showToastNotification('📸 사진이 멋지게 촬영되었습니다!');
    });
  }

  // 7. 프리셋 라디오 선택 & 프롬프트 미리보기 갱신
  const presetRadios = document.querySelectorAll('input[name="certPreset"]');
  presetRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const presetCards = document.querySelectorAll('.preset-card');
      presetCards.forEach(c => c.classList.remove('active'));
      const parentLabel = radio.closest('.preset-card');
      if (parentLabel) parentLabel.classList.add('active');

      const selectedPreset = PRESETS[radio.value] || PRESETS.cinematic_gold;
      if (certPromptPreviewText) {
        certPromptPreviewText.textContent = selectedPreset.prompt;
      }
    });
  });

  // 다짐 메시지 글자 수 카운터
  if (certInputResolution && certResolutionCharCount) {
    certInputResolution.addEventListener('input', () => {
      certResolutionCharCount.textContent = certInputResolution.value.length;
    });
  }

  // 8. 폼 제출 및 AI 생성 파이프라인
  if (certUploadForm) {
    certUploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!currentUploadedDataUrl) {
        showToastNotification('⚠️ 본인의 사진을 먼저 업로드하거나 직접 촬영해 주세요.');
        return;
      }

      const name = (certInputName ? certInputName.value.trim() : '');
      const resolution = (certInputResolution && certInputResolution.value.trim()) 
        ? certInputResolution.value.trim() 
        : '생성형 AI와 함께 두려움 없이 비즈니스를 혁신하고 새로운 도약을 시작합니다!';
      const selectedRadio = document.querySelector('input[name="certPreset"]:checked');
      const presetKey = selectedRadio ? selectedRadio.value : 'cinematic_gold';

      if (!name) {
        showToastNotification('⚠️ 성함과 소속 기업명을 입력해 주세요.');
        if (certInputName) certInputName.focus();
        return;
      }

      // 로딩 상태 돌입
      if (certSubmitBtn) certSubmitBtn.disabled = true;
      if (certBtnSpinner) certBtnSpinner.style.display = 'inline-block';
      if (certBtnText) certBtnText.textContent = 'AI 프로필 생성 및 등록 중...';
      if (certAiScanOverlay) certAiScanOverlay.classList.add('active');

      try {
        // AI 시뮬레이션 변환 처리
        const styledImgDataUrl = await generateAiStyledImage(currentUploadedDataUrl, presetKey);

        // 새 참여자 객체 생성
        const now = new Date();
        const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;

        const newParticipant = {
          id: `cert-user-${Date.now()}`,
          name: name,
          company: '여성기업인 디지털 혁신 1기',
          resolution: resolution,
          presetKey: presetKey,
          promptText: (PRESETS[presetKey] || PRESETS.cinematic_gold).prompt,
          beforeImg: currentUploadedDataUrl,
          afterImg: styledImgDataUrl,
          date: dateStr,
          timestamp: Date.now(),
          isCurrentViewAfter: true
        };

        // 로컬스토리지에 추가 및 저장
        participants.unshift(newParticipant);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
        } catch (storageErr) {
          console.warn('Storage limit reached, keeping in-memory:', storageErr);
        }

        // 1.2초 후 모달 닫기 및 보드에 반영
        setTimeout(() => {
          if (certAiScanOverlay) certAiScanOverlay.classList.remove('active');
          if (certSubmitBtn) certSubmitBtn.disabled = false;
          if (certBtnSpinner) certBtnSpinner.style.display = 'none';
          if (certBtnText) certBtnText.textContent = '✨ 참석 인증 및 AI 프로필 등록하기';

          closeCertUploadModal();
          renderCertCards(currentFilter);
          showToastNotification(`🎉 ${name} 님의 참석 인증 카드가 성공적으로 등록되었습니다!`);

          // 새로 등록된 카드로 스크롤 이동
          const newCardEl = document.getElementById(`card-${newParticipant.id}`);
          if (newCardEl) {
            newCardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 1200);

      } catch (err) {
        console.error('AI Generation error:', err);
        showToastNotification('❌ AI 이미지 생성 중 오류가 발생했습니다.');
        if (certAiScanOverlay) certAiScanOverlay.classList.remove('active');
        if (certSubmitBtn) certSubmitBtn.disabled = false;
        if (certBtnSpinner) certBtnSpinner.style.display = 'none';
        if (certBtnText) certBtnText.textContent = '✨ 참석 인증 및 AI 프로필 등록하기';
      }
    });
  }

  // 모달 열기 / 닫기
  function openCertUploadModal() {
    if (certUploadModal) {
      certUploadModal.classList.add('open');
      certUploadModal.scrollTop = 0;
      setTimeout(() => {
        if (certInputName) certInputName.focus();
      }, 150);
    }
  }

  function closeCertUploadModal() {
    if (certUploadModal) {
      certUploadModal.classList.remove('open');
    }
    stopWebcam();
    // 폼 초기화
    if (certUploadForm) certUploadForm.reset();
    currentUploadedDataUrl = null;
    if (certPreviewContainer) certPreviewContainer.style.display = 'none';
    if (certDropzone) certDropzone.style.display = 'flex';
    if (certCameraWrap) certCameraWrap.style.display = 'none';
    if (certTabUploadBtn) certTabUploadBtn.classList.add('active');
    if (certTabCameraBtn) certTabCameraBtn.classList.remove('active');
    if (certResolutionCharCount) certResolutionCharCount.textContent = '0';
  }

  if (openCertUploadBtn) {
    openCertUploadBtn.addEventListener('click', openCertUploadModal);
  }
  if (certUploadModalCloseBtn) {
    certUploadModalCloseBtn.addEventListener('click', closeCertUploadModal);
  }
  if (certUploadModal) {
    certUploadModal.addEventListener('click', (e) => {
      if (e.target === certUploadModal) closeCertUploadModal();
    });
  }

  // 9. QR 모달 로직
  function openCertQrModal() {
    if (!certQrModal) return;
    certQrModal.classList.add('open');

    // QR 코드 생성 (auth.html#upload로 직행)
    if (certQrContainer && typeof QRCode !== 'undefined') {
      certQrContainer.innerHTML = '';
      const currentUrl = new URL('auth.html#upload', window.location.href).href;
      new QRCode(certQrContainer, {
        text: currentUrl,
        width: 180,
        height: 180,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      });
      if (certDirectUrlInput) {
        certDirectUrlInput.value = currentUrl;
      }
    }
  }

  function closeCertQrModal() {
    if (certQrModal) {
      certQrModal.classList.remove('open');
    }
  }

  if (openCertQrBtn) {
    openCertQrBtn.addEventListener('click', openCertQrModal);
  }
  if (certQrModalCloseBtn) {
    certQrModalCloseBtn.addEventListener('click', closeCertQrModal);
  }
  if (certQrModal) {
    certQrModal.addEventListener('click', (e) => {
      if (e.target === certQrModal) closeCertQrModal();
    });
  }

  if (certCopyUrlBtn && certDirectUrlInput) {
    certCopyUrlBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(certDirectUrlInput.value)
        .then(() => {
          showToastNotification('📋 접속 링크가 클립보드에 복사되었습니다.');
        })
        .catch(() => {
          showToastNotification('⚠️ 링크 복사에 실패했습니다.');
        });
    });
  }

  // 10. 필터 칩 전환
  if (certFilterBar) {
    const filterChips = certFilterBar.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filterType = chip.getAttribute('data-cert-filter');
        renderCertCards(filterType);
      });
    });
  }

  // 11. [핵심 기능] 현수막 + 참석자 카드 보드 전체 화면 캡처 저장
  if (captureBoardBtn) {
    captureBoardBtn.addEventListener('click', () => {
      const captureArea = document.getElementById('certCaptureArea');
      if (!captureArea || typeof html2canvas === 'undefined') {
        showToastNotification('⚠️ 화면 캡처 모듈을 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      showToastNotification('🖼️ 전체 현수막 보드를 고화질 이미지로 캡처 중입니다. 잠시만 기다려 주세요...');
      captureArea.classList.add('capturing-mode');

      html2canvas(captureArea, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#0a0d14',
        logging: false
      }).then(canvas => {
        captureArea.classList.remove('capturing-mode');
        const link = document.createElement('a');
        link.download = `여성기업인_디지털AI교육_변화의시작_인증기념보드_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToastNotification('🎉 현수막 기념 보드가 성공적으로 캡처·저장되었습니다!');
      }).catch(err => {
        captureArea.classList.remove('capturing-mode');
        console.error('Board capture error:', err);
        showToastNotification('❌ 보드 캡처 중 오류가 발생했습니다.');
      });
    });
  }

  // 12. 초기 렌더링
  renderCertCards('all');
}

/**
 * XSS 방지를 위한 HTML 이스케이프 유틸리티
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
