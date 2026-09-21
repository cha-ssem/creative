/**
 * ==========================================================================
 * [STEP 06] 변화의 시작 인증 (auth.html) 전용 스크립트
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const LOCAL_STORAGE_KEY = 'CEO_STORYBOARD_CERT_PARTICIPANTS_V2';

  // 0. Base64 안전 이미지 URL 변환 헬퍼 (로컬 file:// 환경 Taint 방지)
  function getSafeImageSrc(src) {
    if (!src) return '';
    if (src.startsWith('data:')) return src;
    if (window.AUTH_IMAGE_BASE64) {
      if (window.AUTH_IMAGE_BASE64[src]) return window.AUTH_IMAGE_BASE64[src];
      // 경로 normalize
      const cleanSrc = src.replace(/^[./\\]+/, '').replace(/^images[/\\]/, 'images/');
      if (window.AUTH_IMAGE_BASE64[cleanSrc]) return window.AUTH_IMAGE_BASE64[cleanSrc];
      if (window.AUTH_IMAGE_BASE64['images/' + cleanSrc]) return window.AUTH_IMAGE_BASE64['images/' + cleanSrc];
    }
    return src;
  }

  // 1. AI 프롬프트 스타일 프리셋 정의
  const PRESETS = {
    cinematic_gold: {
      name: '🌟 시네마틱 골든 리더',
      prompt: '50s Korean female visionary CEO, elegant navy blazer, confident radiant smile, cinematic 5600K golden hour lighting, sharp 8k portrait, premium executive mood.',
      filter: (ctx, width, height) => {
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

  // 2. 초기 기본 데모 참석자 데이터 (60명 정원 규모에 맞춘 풍성한 사전 데이터)
  const DEFAULT_PARTICIPANTS = [
    {
      id: 'cert-demo-01',
      name: '김서연 대표',
      company: '㈜넥스트웨이브 솔루션',
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
      presetKey: 'visionary_warmth',
      promptText: PRESETS.visionary_warmth.prompt,
      beforeImg: 'images/Trainees.jpeg',
      afterImg: 'images/Trainees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-05',
      name: '박수현 대표',
      company: '㈜글로벌 에듀테크',
      presetKey: 'cinematic_gold',
      promptText: PRESETS.cinematic_gold.prompt,
      beforeImg: 'images/Employees.jpeg',
      afterImg: 'images/Employees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-06',
      name: '최나영 대표',
      company: '㈜블루밍 헬스케어',
      presetKey: 'visionary_warmth',
      promptText: PRESETS.visionary_warmth.prompt,
      beforeImg: 'images/Large Screen.jpeg',
      afterImg: 'images/Large Screen.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-07',
      name: '강다은 대표',
      company: '㈜오로라 디자인스튜디오',
      presetKey: 'tech_innovator',
      promptText: PRESETS.tech_innovator.prompt,
      beforeImg: 'images/CEO01.png',
      afterImg: 'images/CEO01.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-08',
      name: '윤채원 대표',
      company: '㈜케이프런티어 컨설팅',
      presetKey: 'studio_modern',
      promptText: PRESETS.studio_modern.prompt,
      beforeImg: 'images/CEO02.png',
      afterImg: 'images/CEO02.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-09',
      name: '조은별 대표',
      company: '㈜넥스트그린 바이오',
      presetKey: 'visionary_warmth',
      promptText: PRESETS.visionary_warmth.prompt,
      beforeImg: 'images/Young_Employee.jpeg',
      afterImg: 'images/Young_Employee.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-10',
      name: '서미래 대표',
      company: '㈜인사이트 데이터웍스',
      presetKey: 'tech_innovator',
      promptText: PRESETS.tech_innovator.prompt,
      beforeImg: 'images/Trainees.jpeg',
      afterImg: 'images/Trainees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-11',
      name: '임하늘 대표',
      company: '㈜스마트 푸드테크',
      presetKey: 'cinematic_gold',
      promptText: PRESETS.cinematic_gold.prompt,
      beforeImg: 'images/Employees.jpeg',
      afterImg: 'images/Employees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-12',
      name: '백소영 대표',
      company: '㈜모션 크리에이티브',
      presetKey: 'studio_modern',
      promptText: PRESETS.studio_modern.prompt,
      beforeImg: 'images/CEO01.png',
      afterImg: 'images/CEO01.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-13',
      name: '고아름 대표',
      company: '㈜엘리트 비즈니스그룹',
      presetKey: 'cinematic_gold',
      promptText: PRESETS.cinematic_gold.prompt,
      beforeImg: 'images/CEO02.png',
      afterImg: 'images/CEO02.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-14',
      name: '문지영 대표',
      company: '㈜알파 커넥트 마케팅',
      presetKey: 'tech_innovator',
      promptText: PRESETS.tech_innovator.prompt,
      beforeImg: 'images/Young_Employee.jpeg',
      afterImg: 'images/Young_Employee.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-15',
      name: '송예린 대표',
      company: '㈜클라우드 나인랩',
      presetKey: 'visionary_warmth',
      promptText: PRESETS.visionary_warmth.prompt,
      beforeImg: 'images/Trainees.jpeg',
      afterImg: 'images/Trainees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-16',
      name: '권하나 대표',
      company: '㈜더블루 로보틱스',
      presetKey: 'studio_modern',
      promptText: PRESETS.studio_modern.prompt,
      beforeImg: 'images/Employees.jpeg',
      afterImg: 'images/Employees.jpeg',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-17',
      name: '신보라 대표',
      company: '㈜에코스마트 솔루션',
      presetKey: 'cinematic_gold',
      promptText: PRESETS.cinematic_gold.prompt,
      beforeImg: 'images/CEO01.png',
      afterImg: 'images/CEO01.png',
      date: '2026. 11. 10',
      isCurrentViewAfter: true
    },
    {
      id: 'cert-demo-18',
      name: '안혜진 대표',
      company: '㈜퓨처미디어 홀딩스',
      presetKey: 'tech_innovator',
      promptText: PRESETS.tech_innovator.prompt,
      beforeImg: 'images/CEO02.png',
      afterImg: 'images/CEO02.png',
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
  const classroomStage = document.getElementById('classroomStage');
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
  const certPromptPreviewText = document.getElementById('certPromptPreviewText');
  const certSubmitBtn = document.getElementById('certSubmitBtn');
  const certBtnSpinner = document.getElementById('certBtnSpinner');
  const certBtnText = document.getElementById('certBtnText');

  // 모바일 전용 등록 완료 뷰 참조
  const certSuccessView = document.getElementById('certSuccessView');
  const certSuccessParticipantName = document.getElementById('certSuccessParticipantName');
  const certRegisterAnotherBtn = document.getElementById('certRegisterAnotherBtn');
  const certModalMediaCol = document.querySelector('.cert-modal-media-col');
  const certModalInfoCol = document.querySelector('.cert-modal-info-col');

  // QR 모달 참조
  const certQrContainer = document.getElementById('certQrContainer');
  const certDirectUrlInput = document.getElementById('certDirectUrlInput');
  const certCopyUrlBtn = document.getElementById('certCopyUrlBtn');

  // 테마 토글 참조
  const authThemeToggleBtn = document.getElementById('authThemeToggleBtn');
  const authThemeIcon = document.getElementById('authThemeIcon');
  const authThemeText = document.getElementById('authThemeText');

  // 실시간 상태 표시 참조
  const realtimeStatusBadge = document.getElementById('realtimeStatusBadge');
  const realtimeStatusText = document.getElementById('realtimeStatusText');
  const realtimePulseDot = document.getElementById('realtimePulseDot');
  const certResetParticipantsBtn = document.getElementById('certResetParticipantsBtn');

  let currentUploadedDataUrl = null;
  let webcamStream = null;
  let currentFilter = 'all';

  // ==========================================================================
  // [보안 강화: 암호학적 난수 비밀 룸(Secret Room ID) 생성 및 실시간 동기화]
  // ==========================================================================
  function generateSecureRoomId() {
    try {
      const array = new Uint8Array(16);
      window.crypto.getRandomValues(array);
      const hex = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
      return `sec_${hex}`;
    } catch (e) {
      return `sec_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    }
  }

  const urlParams = new URLSearchParams(window.location.search);
  let currentRoomId = urlParams.get('room');
  if (!currentRoomId) {
    currentRoomId = localStorage.getItem('CEO_STORYBOARD_SECURE_ROOM_ID');
    if (!currentRoomId) {
      currentRoomId = generateSecureRoomId();
      try {
        localStorage.setItem('CEO_STORYBOARD_SECURE_ROOM_ID', currentRoomId);
      } catch (e) {}
    }
  }

  const SYNC_TOPIC = `womanceo/secure_sync/${currentRoomId}`;
  let realtimeClient = null;

  function updateRealtimeStatus(status, text) {
    if (realtimeStatusText) realtimeStatusText.textContent = text;
    if (realtimePulseDot) {
      realtimePulseDot.className = 'realtime-pulse-dot ' + status;
    }
    if (realtimeStatusBadge) {
      realtimeStatusBadge.title = `🔒 보안 암호화 룸: ${currentRoomId} (${text})`;
    }
  }

  function initRealtimeSync() {
    if (typeof mqtt === 'undefined') {
      console.warn('MQTT library not loaded.');
      updateRealtimeStatus('offline', '오프라인 (로컬 모드)');
      return;
    }

    try {
      updateRealtimeStatus('connecting', '실시간 서버 연결 중...');
      const clientId = 'womanceo_' + Math.random().toString(36).substring(2, 10);

      realtimeClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
        clientId: clientId,
        clean: true,
        connectTimeout: 6000,
        reconnectPeriod: 3000
      });

      realtimeClient.on('connect', () => {
        console.log('✦ [Realtime] Connected to live broker. Channel:', currentRoomId);
        updateRealtimeStatus('online', '실시간 연동 완료');
        realtimeClient.subscribe(SYNC_TOPIC, { qos: 1 }, (err) => {
          if (!err) {
            // 접속 시 방 내의 최신 상태(빈 좌석인지, 참가자 목록 등)를 요청
            setTimeout(() => {
              if (realtimeClient && realtimeClient.connected) {
                realtimeClient.publish(SYNC_TOPIC, JSON.stringify({
                  type: 'STATE_REQUEST',
                  sender: clientId
                }), { qos: 1 });
              }
            }, 300);
          }
        });
      });

      realtimeClient.on('reconnect', () => {
        updateRealtimeStatus('connecting', '재연결 시도 중...');
      });

      realtimeClient.on('offline', () => {
        updateRealtimeStatus('offline', '연결 대기 중');
      });

      realtimeClient.on('error', (err) => {
        console.warn('Realtime MQTT error:', err);
        updateRealtimeStatus('offline', '연결 대기 중');
      });

      realtimeClient.on('message', (topic, message) => {
        if (topic === SYNC_TOPIC) {
          try {
            const data = JSON.parse(message.toString());
            if (data.type === 'NEW_PARTICIPANT' && data.participant) {
              handleRemoteParticipant(data.participant);
            } else if (data.type === 'RESET_PARTICIPANTS') {
              handleRemoteReset(data.mode);
            } else if (data.type === 'STATE_REQUEST' && data.sender !== clientId) {
              // 다른 기기가 접속하여 상태를 요청한 경우 현재 상태 전송
              if (realtimeClient && realtimeClient.connected) {
                realtimeClient.publish(SYNC_TOPIC, JSON.stringify({
                  type: 'STATE_RESPONSE',
                  target: data.sender,
                  participants: participants,
                  maxSeats: maxSeats
                }), { qos: 1 });
              }
            } else if (data.type === 'STATE_RESPONSE' && data.target === clientId && Array.isArray(data.participants)) {
              // 내 요청에 대한 최신 상태 수신
              participants = data.participants;
              if (data.maxSeats) maxSeats = data.maxSeats;
              try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
                localStorage.setItem(MAX_SEATS_KEY, String(maxSeats));
              } catch (e) {}
              renderCertCards(currentFilter);
              console.log('✦ [Realtime] Initial room state synced:', participants.length, 'participants');
            }
          } catch (parseErr) {
            console.error('Realtime msg parse error:', parseErr);
          }
        }
      });
    } catch (e) {
      console.warn('Realtime sync init exception:', e);
      updateRealtimeStatus('offline', '로컬 단독 모드');
    }
  }

  // 원격(스마트폰)에서 새로 등록된 참석자 수신 처리
  function handleRemoteParticipant(newP) {
    if (!newP || !newP.id) return;
    const exists = participants.some(p => p.id === newP.id);
    if (exists) return;

    participants.unshift(newP);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    renderCertCards(currentFilter);
    showToastNotification(`📱 [${newP.name}] 님이 스마트폰에서 실시간 참석 인증을 완료했습니다! 🎉`);

    // 신규 등록된 좌석으로 부드러운 포커스 및 팝업 애니메이션
    setTimeout(() => {
      const newSeatEl = document.getElementById(`seat-${newP.id}`);
      if (newSeatEl) {
        newSeatEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        newSeatEl.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease';
        newSeatEl.style.transform = 'scale(1.22)';
        newSeatEl.style.zIndex = '9999';
        setTimeout(() => {
          newSeatEl.style.transform = '';
          newSeatEl.style.zIndex = '';
        }, 2200);
      }
    }, 300);
  }

  function handleRemoteReset(mode = 'EMPTY') {
    if (mode === 'DEMO') {
      participants = [...DEFAULT_PARTICIPANTS];
      showToastNotification('✨ 원격에서 기본 예시 참석자 데이터가 복원되었습니다.');
    } else {
      participants = [];
      showToastNotification('🔄 원격에서 모든 참석자 사진이 비워졌습니다. (빈 좌석 대기)');
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
    } catch (e) {}
    renderCertCards(currentFilter);
  }

  function broadcastNewParticipant(newP) {
    if (realtimeClient && realtimeClient.connected) {
      try {
        const payload = JSON.stringify({
          type: 'NEW_PARTICIPANT',
          participant: newP,
          timestamp: Date.now()
        });
        realtimeClient.publish(SYNC_TOPIC, payload, { qos: 1 });
        console.log('✦ [Realtime] Broadcasted new participant:', newP.name);
      } catch (err) {
        console.warn('Broadcast error:', err);
      }
    }
  }

  function broadcastResetParticipants(mode = 'EMPTY') {
    if (realtimeClient && realtimeClient.connected) {
      try {
        const payload = JSON.stringify({
          type: 'RESET_PARTICIPANTS',
          mode: mode,
          timestamp: Date.now()
        });
        realtimeClient.publish(SYNC_TOPIC, payload, { qos: 1 });
      } catch (err) {}
    }
  }

  // 실시간 동기화 시작
  initRealtimeSync();

  // 3. 테마 제어
  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      if (authThemeIcon) authThemeIcon.textContent = '🌙';
      if (authThemeText) authThemeText.textContent = '다크 모드';
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (authThemeIcon) authThemeIcon.textContent = '☀️';
      if (authThemeText) authThemeText.textContent = '라이트 모드';
    }
  }

  const savedTheme = (typeof localStorage !== 'undefined') ? localStorage.getItem('theme') : null;
  let isLightTheme = savedTheme ? (savedTheme === 'light') : true;
  applyTheme(isLightTheme);

  if (authThemeToggleBtn) {
    authThemeToggleBtn.addEventListener('click', () => {
      isLightTheme = !isLightTheme;
      applyTheme(isLightTheme);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
      }
    });
  }

  // 4. [핵심] 가상 계단식 강의실 좌석 렌더링 (기본 정원 72석 및 동적 정원 maxSeats 지원)
  const MAX_SEATS_KEY = 'ai_cert_max_seats_v1';
  let maxSeats = 72;
  try {
    const savedMax = parseInt(localStorage.getItem(MAX_SEATS_KEY), 10);
    if (savedMax && savedMax >= 1 && savedMax <= 120) {
      maxSeats = savedMax;
    }
  } catch (e) {}

  function renderCertCards(filter = 'all') {
    if (!classroomStage) return;
    currentFilter = filter;

    let displayList = [...participants];
    if (filter === 'recent') {
      displayList.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    }

    if (certCountTotal) {
      certCountTotal.textContent = `${participants.length} / ${maxSeats}`;
    }

    // 동적 열(Column) 및 행(Row) 자동 최적 계산
    let colsPerRow = 12;
    if (maxSeats <= 6) {
      colsPerRow = maxSeats;
    } else if (maxSeats <= 12) {
      colsPerRow = maxSeats;
    } else {
      colsPerRow = 12;
    }

    const totalRows = Math.ceil(maxSeats / colsPerRow);
    let stageHtml = '';

    // 각 행(Row 1 ~ Row totalRows)별로 중앙부터 좌우 대칭으로 채워지는 좌석 슬롯 계산
    let remainingParticipants = [...displayList];
    const rowAssignments = {};

    for (let r = 1; r <= totalRows; r++) {
      const colsInThisRow = Math.min(colsPerRow, maxSeats - (r - 1) * colsPerRow);
      const rowSlots = new Array(colsInThisRow).fill(null);

      // 이 행에 들어갈 참석자 수
      const takeCount = Math.min(remainingParticipants.length, colsInThisRow);
      const rowParticipants = remainingParticipants.splice(0, takeCount);

      // [핵심] 중앙부터 좌우 대칭으로 채우기 위한 시작 열 인덱스 계산
      const startCol = Math.floor((colsInThisRow - takeCount) / 2);
      for (let c = 0; c < takeCount; c++) {
        rowSlots[startCol + c] = rowParticipants[c];
      }

      rowAssignments[r] = {
        colsCount: colsInThisRow,
        slots: rowSlots
      };
    }

    // Row N(맨 뒷줄)부터 Row 1(맨 앞줄)까지 역순으로 렌더링
    for (let r = totalRows; r >= 1; r--) {
      const rowData = rowAssignments[r];
      if (!rowData) continue;
      const isFrontRow = (r === 1);

      // 원근감 스케일 및 줄간격 마진
      const scaleVal = (1 - (r - 1) * 0.015).toFixed(3);
      const marginBottomVal = isFrontRow ? '0px' : (r >= 5 ? '5px' : (r >= 3 ? '4px' : '3px'));
      const zIndexVal = 100 - r * 10;

      let seatsHtml = '';
      rowData.slots.forEach((item) => {
        if (item) {
          // 참석자가 착석한 좌석 (중앙부터 배치)
          const isAfter = item.isCurrentViewAfter !== false;
          const rawImg = isAfter ? item.afterImg : item.beforeImg;
          const currentImg = getSafeImageSrc(rawImg);
          const viewLabel = isAfter ? '✨ AI' : '📷 원본';

          seatsHtml += `
            <div class="classroom-seat occupied" id="seat-${item.id}">
              <!-- 민트색 의자 등받이 -->
              <div class="seat-chair-back"></div>

              <!-- 참석자 인물 상반신 사진 (사각 액자 없음, 100% 종횡비) -->
              <div class="seat-person-wrap">
                <img src="${currentImg}" data-src-raw="${escapeHtml(rawImg)}" alt="${escapeHtml(item.name)} 인증 사진" class="seat-person-img" id="img-${item.id}">
              </div>

              <!-- 호버 시 나타나는 Zoom 스타일 말풍선 & 명찰 팝업 -->
              <div class="seat-hover-popover">
                <div class="popover-name">
                  <span>🟢</span>
                  <span>${escapeHtml(item.name)}</span>
                </div>
                <span class="popover-role">${escapeHtml(item.company || '여성기업인 디지털 혁신 1기')}</span>
                <div class="popover-actions">
                  <button type="button" class="popover-btn cert-toggle-view-pill" data-card-id="${item.id}">
                    ${viewLabel} ⇄
                  </button>
                  <button type="button" class="popover-btn" data-download-id="${item.id}">
                    📥 저장
                  </button>
                </div>
              </div>
            </div>
          `;
        } else {
          // 빈 좌석 (민트색 의자)
          seatsHtml += `
            <div class="classroom-seat empty" title="클릭하여 내 사진 등록하기" onclick="document.getElementById('openCertUploadBtn').click()">
              <div class="seat-chair-back"></div>
              <span class="seat-empty-hint">+</span>
            </div>
          `;
        }
      });

      stageHtml += `
        <div class="classroom-desk-row row-${r}" style="z-index:${zIndexVal}; transform:scale(${scaleVal}); transform-origin:center bottom; margin-bottom:${marginBottomVal};">
          <div class="seats-line" style="grid-template-columns: repeat(${rowData.colsCount}, 1fr);">
            ${seatsHtml}
          </div>
          <!-- 가로형 화이트 데스크 바 (앞쪽을 가려주는 책상) -->
          <div class="desk-front-bar"></div>
        </div>
      `;
    }

    classroomStage.innerHTML = stageHtml;

    // 개별 카드 뷰 토글 이벤트 바인딩
    const toggleBtns = classroomStage.querySelectorAll('.cert-toggle-view-pill');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cardId = btn.getAttribute('data-card-id');
        toggleCardView(cardId);
      });
    });

    // 개별 카드 다운로드 이벤트 바인딩
    const downloadBtns = classroomStage.querySelectorAll('[data-download-id]');
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
        btnEl.textContent = item.isCurrentViewAfter ? '✨ AI ⇄' : '📷 원본 ⇄';
        imgEl.style.opacity = '1';
      }, 150);
    }
  }

  // 개별 카드 캡처 다운로드
  function downloadSingleCard(cardId) {
    const targetSeat = document.getElementById(`seat-${cardId}`);
    if (!targetSeat || typeof html2canvas === 'undefined') return;

    showToastNotification('📥 인증 사진을 저장 중입니다...');
    html2canvas(targetSeat, {
      scale: 2,
      useCORS: true,
      backgroundColor: null
    }).then(canvas => {
      const link = document.createElement('a');
      link.download = `변화의시작_인증사진_${cardId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToastNotification('✅ 인증 사진이 성공적으로 다운로드되었습니다!');
    }).catch(err => {
      console.error('Seat capture error:', err);
      showToastNotification('❌ 사진 저장 중 오류가 발생했습니다.');
    });
  }

  // 5. Canvas 기반 AI 이미지 변환 시뮬레이션 필터 엔진
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

        resolve(canvas.toDataURL('image/jpeg', 0.88));
      };
      img.onerror = (err) => reject(err);
      img.src = sourceDataUrl;
    });
  }

  // 6. 파일 업로드 및 드롭존 핸들링
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

  // 업로드 이미지 용량 간소화(최대 800px 리사이즈 & JPEG 85% 압축) 헬퍼
  function compressAndResizeImage(file, maxDimension = 800, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // 가로/세로 중 긴 쪽을 maxDimension(800px) 기준으로 비율 유지 리사이즈
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // 최적화된 JPEG Base64 데이터 생성
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = event.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  async function handleImageFile(file) {
    try {
      showToastNotification('⚡ 사진 용량 최적화(간소화) 처리 중...');
      const compressedDataUrl = await compressAndResizeImage(file, 800, 0.85);
      currentUploadedDataUrl = compressedDataUrl;
      showPreviewImage(currentUploadedDataUrl);
    } catch (err) {
      console.warn('Image compression fallback:', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        currentUploadedDataUrl = e.target.result;
        showPreviewImage(currentUploadedDataUrl);
      };
      reader.readAsDataURL(file);
    }
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

  // 7. 탭 전환 (업로드 vs 웹캠)
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

  // 8. 프리셋 라디오 선택 & 프롬프트 미리보기 갱신
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

  // 9. 폼 제출 및 AI 생성 파이프라인
  if (certUploadForm) {
    certUploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!currentUploadedDataUrl) {
        showToastNotification('⚠️ 본인의 사진을 먼저 업로드하거나 직접 촬영해 주세요.');
        return;
      }

      const name = (certInputName ? certInputName.value.trim() : '');
      const selectedRadio = document.querySelector('input[name="certPreset"]:checked');
      const presetKey = selectedRadio ? selectedRadio.value : 'cinematic_gold';

      if (!name) {
        showToastNotification('⚠️ 성함과 소속 기업명을 입력해 주세요.');
        if (certInputName) certInputName.focus();
        return;
      }

      if (certSubmitBtn) certSubmitBtn.disabled = true;
      if (certBtnSpinner) certBtnSpinner.style.display = 'inline-block';
      if (certBtnText) certBtnText.textContent = 'AI 프로필 생성 및 등록 중...';
      if (certAiScanOverlay) certAiScanOverlay.classList.add('active');

      try {
        const styledImgDataUrl = await generateAiStyledImage(currentUploadedDataUrl, presetKey);

        const now = new Date();
        const dateStr = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')}`;

        const newParticipant = {
          id: `cert-user-${Date.now()}`,
          name: name,
          company: '여성기업인 디지털 혁신 1기',
          presetKey: presetKey,
          promptText: (PRESETS[presetKey] || PRESETS.cinematic_gold).prompt,
          beforeImg: currentUploadedDataUrl,
          afterImg: styledImgDataUrl,
          date: dateStr,
          timestamp: Date.now(),
          isCurrentViewAfter: true
        };

        participants.unshift(newParticipant);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
        } catch (storageErr) {
          console.warn('Storage limit reached, keeping in-memory:', storageErr);
        }

        // [실시간 브로드캐스트] 연결된 모든 PC/모바일 화면으로 즉시 전파
        broadcastNewParticipant(newParticipant);

        setTimeout(() => {
          if (certAiScanOverlay) certAiScanOverlay.classList.remove('active');
          if (certSubmitBtn) certSubmitBtn.disabled = false;
          if (certBtnSpinner) certBtnSpinner.style.display = 'none';
          if (certBtnText) certBtnText.textContent = '✨ 등록 완료하기';

          const isMobileMode = document.body.classList.contains('mobile-upload-mode');
          if (isMobileMode && certSuccessView) {
            // 모바일 전용 모드: 폼을 숨기고 축하 완료 화면 표시
            if (certModalMediaCol) certModalMediaCol.style.display = 'none';
            if (certModalInfoCol) certModalInfoCol.style.display = 'none';
            certSuccessView.style.display = 'block';
            if (certSuccessParticipantName) {
              certSuccessParticipantName.textContent = `👤 ${name} 님`;
            }
          } else {
            // PC 모달 모드: 모달 닫기
            closeCertUploadModal();
          }

          renderCertCards(currentFilter);
          showToastNotification(`🎉 ${name} 님의 참석 등록이 완료되었습니다!`);

          const newSeatEl = document.getElementById(`seat-${newParticipant.id}`);
          if (newSeatEl) {
            newSeatEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newSeatEl.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
            newSeatEl.style.transform = 'scale(1.15)';
            newSeatEl.style.zIndex = '999';
            setTimeout(() => {
              newSeatEl.style.transform = '';
              newSeatEl.style.zIndex = '';
            }, 1800);
          }
        }, 1200);

      } catch (err) {
        console.error('AI Generation error:', err);
        showToastNotification('❌ 등록 처리 중 오류가 발생했습니다.');
        if (certAiScanOverlay) certAiScanOverlay.classList.remove('active');
        if (certSubmitBtn) certSubmitBtn.disabled = false;
        if (certBtnSpinner) certBtnSpinner.style.display = 'none';
        if (certBtnText) certBtnText.textContent = '✨ 등록 완료하기';
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
    if (certUploadForm) certUploadForm.reset();
    currentUploadedDataUrl = null;
    if (certPreviewContainer) certPreviewContainer.style.display = 'none';
    if (certDropzone) certDropzone.style.display = 'flex';
    if (certCameraWrap) certCameraWrap.style.display = 'none';
    if (certTabUploadBtn) certTabUploadBtn.classList.add('active');
    if (certTabCameraBtn) certTabCameraBtn.classList.remove('active');
    if (certResolutionCharCount) certResolutionCharCount.textContent = '0';
  }

  if (certRegisterAnotherBtn) {
    certRegisterAnotherBtn.addEventListener('click', () => {
      if (certSuccessView) certSuccessView.style.display = 'none';
      if (certModalMediaCol) certModalMediaCol.style.display = '';
      if (certModalInfoCol) certModalInfoCol.style.display = '';
      if (certUploadForm) certUploadForm.reset();
      currentUploadedDataUrl = null;
      if (certPreviewContainer) certPreviewContainer.style.display = 'none';
      if (certDropzone) certDropzone.style.display = 'flex';
      if (certCameraWrap) certCameraWrap.style.display = 'none';
      if (certTabUploadBtn) certTabUploadBtn.classList.add('active');
      if (certTabCameraBtn) certTabCameraBtn.classList.remove('active');
      if (certInputName) {
        certInputName.value = '';
        certInputName.focus();
      }
    });
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

  // 10. QR 모달 로직 (auth.html 전용 링크 생성)
  function openCertQrModal() {
    if (!certQrModal) return;
    certQrModal.classList.add('open');

    if (certQrContainer && typeof QRCode !== 'undefined') {
      certQrContainer.innerHTML = '';
      const currentUrl = new URL(`auth.html?room=${encodeURIComponent(currentRoomId)}#upload`, window.location.href).href;
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

  // 11. [핵심] 최대 참석자 정원(좌석 수) 설정 모달 로직
  const certMaxSeatsModal = document.getElementById('certMaxSeatsModal');
  const certMaxSeatsModalCloseBtn = document.getElementById('certMaxSeatsModalCloseBtn');
  const btnCancelMaxSeats = document.getElementById('btnCancelMaxSeats');
  const certMaxSeatsForm = document.getElementById('certMaxSeatsForm');
  const inputMaxSeats = document.getElementById('inputMaxSeats');
  const quickSeatsPresetGrid = document.getElementById('quickSeatsPresetGrid');
  const certFilterAllBtn = document.getElementById('certFilterAllBtn');

  function openCertMaxSeatsModal() {
    if (!certMaxSeatsModal) return;
    if (inputMaxSeats) inputMaxSeats.value = maxSeats;
    updateQuickSeatsPresetActive(maxSeats);
    certMaxSeatsModal.classList.add('open');
    if (inputMaxSeats) {
      setTimeout(() => inputMaxSeats.focus(), 100);
    }
  }

  function closeCertMaxSeatsModal() {
    if (!certMaxSeatsModal) return;
    certMaxSeatsModal.classList.remove('open');
  }

  function updateQuickSeatsPresetActive(val) {
    if (!quickSeatsPresetGrid) return;
    const btns = quickSeatsPresetGrid.querySelectorAll('.preset-seat-btn');
    btns.forEach(btn => {
      const seatCount = parseInt(btn.getAttribute('data-seats'), 10);
      btn.classList.toggle('active', seatCount === val);
    });
  }

  if (certFilterAllBtn) {
    certFilterAllBtn.addEventListener('click', () => {
      openCertMaxSeatsModal();
    });
  }

  if (certMaxSeatsModalCloseBtn) {
    certMaxSeatsModalCloseBtn.addEventListener('click', closeCertMaxSeatsModal);
  }
  if (btnCancelMaxSeats) {
    btnCancelMaxSeats.addEventListener('click', closeCertMaxSeatsModal);
  }
  if (certMaxSeatsModal) {
    certMaxSeatsModal.addEventListener('click', (e) => {
      if (e.target === certMaxSeatsModal) closeCertMaxSeatsModal();
    });
  }

  if (quickSeatsPresetGrid) {
    const btns = quickSeatsPresetGrid.querySelectorAll('.preset-seat-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const count = parseInt(btn.getAttribute('data-seats'), 10);
        if (inputMaxSeats) inputMaxSeats.value = count;
        updateQuickSeatsPresetActive(count);
      });
    });
  }

  if (inputMaxSeats) {
    inputMaxSeats.addEventListener('input', () => {
      const val = parseInt(inputMaxSeats.value, 10);
      updateQuickSeatsPresetActive(val);
    });
  }

  if (certMaxSeatsForm) {
    certMaxSeatsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = parseInt(inputMaxSeats.value, 10);
      if (isNaN(val) || val < 1 || val > 120) {
        showToastNotification('⚠️ 정원은 1명 이상 120명 이하로 입력해 주세요.');
        return;
      }

      maxSeats = val;
      try {
        localStorage.setItem(MAX_SEATS_KEY, String(maxSeats));
      } catch (err) {}

      renderCertCards(currentFilter);
      closeCertMaxSeatsModal();
      showToastNotification(`🎉 전체 참석자 정원이 ${maxSeats}명으로 성공적으로 설정되었습니다!`);
    });
  }

  // 12. [핵심] 관리자 보안 비밀번호 검증 및 참석자 사진 전체 비우기(0명) / 테스트 로직
  const ADMIN_PASSCODE = '9985';

  function verifyAdminPasscode(actionName = '이 작업') {
    const input = window.prompt(`🔒 관리자 전용 기능입니다.\n[${actionName}]을(를) 실행하려면 비밀번호를 입력해 주세요:`);
    if (input === null) return false;
    if (input.trim() === ADMIN_PASSCODE) {
      return true;
    } else {
      showToastNotification('⚠️ 비밀번호가 일치하지 않습니다.');
      return false;
    }
  }

  // A. 전체 비우기 (0명 빈 좌석 상태로 리셋)
  if (certResetParticipantsBtn) {
    certResetParticipantsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!verifyAdminPasscode('전체 좌석 비우기(초기화)')) return;

      participants = [];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      } catch (err) {
        console.warn('LocalStorage clear error:', err);
      }
      renderCertCards('all');
      if (certFilterAllBtn) {
        const filterChips = certFilterBar ? certFilterBar.querySelectorAll('.filter-chip') : [];
        filterChips.forEach(c => c.classList.remove('active'));
        certFilterAllBtn.classList.add('active');
      }
      broadcastResetParticipants('EMPTY');
      showToastNotification(`🔄 모든 참석자 사진이 비워졌습니다. (0 / ${maxSeats}석 현장 등록 대기)`);
    });
  }

  // B. 70명 실시간 업로드 시뮬레이션 테스트 버튼
  const certSimulate70Btn = document.getElementById('certSimulate70Btn');
  if (certSimulate70Btn) {
    certSimulate70Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!verifyAdminPasscode('70명 실시간 업로드 테스트')) return;

      if (typeof window.run70SimulationTest === 'function') {
        window.run70SimulationTest(300);
      }
    });
  }

  // 13. 필터 칩 전환 (최근 등록순 등)
  if (certFilterBar) {
    const filterChips = certFilterBar.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        if (chip.id === 'certFilterAllBtn' || chip.id === 'certResetParticipantsBtn' || chip.id === 'certSimulate70Btn') return;
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filterType = chip.getAttribute('data-cert-filter');
        renderCertCards(filterType);
      });
    });
  }

  // 13. 전체 현수막 보드 화면 캡처 저장
  async function performBoardCapture() {
    const captureArea = document.getElementById('certCaptureArea');
    if (!captureArea) {
      showToastNotification('⚠️ 캡처 대상 보드 영역을 찾을 수 없습니다.');
      return;
    }

    // html2canvas가 아직 로드되지 않은 경우 동적 로드 시도
    if (typeof html2canvas === 'undefined') {
      showToastNotification('⏳ 화면 캡처 모듈을 준비 중입니다...');
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      } catch (loadErr) {
        showToastNotification('❌ 화면 캡처 라이브러리를 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.');
        return;
      }
    }

    showToastNotification('🖼️ 전체 현수막 보드를 고화질 이미지로 캡처 중입니다. 잠시만 기다려 주세요...');
    captureArea.classList.add('capturing-mode');

    // 캡처 영역의 실제 측정 크기 확보 (우측 잘림 없는 넉넉한 윈도우 폭 보정)
    const rect = captureArea.getBoundingClientRect();
    const actualWidth = Math.ceil(captureArea.scrollWidth || captureArea.offsetWidth || rect.width || 1280);
    const actualHeight = Math.ceil(captureArea.scrollHeight || captureArea.offsetHeight || rect.height || 720);

    try {
      const canvas = await html2canvas(captureArea, {
        scale: 2,
        windowWidth: actualWidth + 80,
        windowHeight: actualHeight + 80,
        width: actualWidth,
        scrollX: 0,
        scrollY: 0,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#0a0d14',
        logging: false,
        imageTimeout: 10000,
        ignoreElements: (el) => {
          return !!(
            el.id === 'fullscreenOverlayControls' ||
            el.id === 'fsCaptureBtn' ||
            el.id === 'fsExitBtn' ||
            el.id === 'toastNotification' ||
            el.classList.contains('cert-action-toolbar') ||
            el.classList.contains('auth-top-nav') ||
            el.classList.contains('modal-overlay')
          );
        },
        onclone: (clonedDoc) => {
          const cloneArea = clonedDoc.getElementById('certCaptureArea');
          if (cloneArea) {
            cloneArea.style.transform = 'none';
            cloneArea.style.margin = '0 auto';
            cloneArea.style.boxShadow = 'none';
            cloneArea.style.position = 'relative';
            cloneArea.style.overflow = 'hidden';
            cloneArea.style.padding = '0.5rem 0.8rem 0.4rem 0.8rem';
            cloneArea.style.width = actualWidth + 'px';
            cloneArea.style.minWidth = actualWidth + 'px';
            cloneArea.style.maxWidth = actualWidth + 'px';
            cloneArea.style.boxSizing = 'border-box';
            cloneArea.style.height = 'auto';
          }

          // 1) 현수막 메인 타이틀: 완벽한 화이트-골드 그라데이션 SVG 벡터로 실시간 치환
          const mainTitle = clonedDoc.querySelector('.banner-main-title');
          if (mainTitle) {
            const titleText = mainTitle.textContent.trim();
            mainTitle.innerHTML = `
              <svg width="100%" height="48" viewBox="0 0 1100 48" style="overflow:visible; display:block; margin:0 auto;">
                <defs>
                  <linearGradient id="goldTitleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="30%" stop-color="#fef08a" />
                    <stop offset="70%" stop-color="#f59e0b" />
                    <stop offset="100%" stop-color="#fbbf24" />
                  </linearGradient>
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.85"/>
                  </filter>
                </defs>
                <text x="550" y="35" text-anchor="middle" font-family="'Cinzel', 'Noto Sans KR', sans-serif" font-size="31" font-weight="900" letter-spacing="-0.02em" fill="url(#goldTitleGrad)" filter="url(#goldGlow)">
                  ${titleText}
                </text>
              </svg>
            `;
            mainTitle.style.background = 'none';
            mainTitle.style.webkitBackgroundClip = 'initial';
            mainTitle.style.webkitTextFillColor = 'initial';
            mainTitle.style.color = '#ffffff';
          }

          // 2) 줄간격 및 원근감 균형 조정 (모든 동적 행에 여유로운 줄간격 자동 적용)
          const rows = clonedDoc.querySelectorAll('.classroom-desk-row');
          const totalRowsCount = rows.length;
          rows.forEach((r, idx) => {
            r.style.width = '100%';
            r.style.boxSizing = 'border-box';
            // 마지막 행이 맨 앞줄(Row 1)
            const isFront = (idx === totalRowsCount - 1);
            r.style.marginBottom = isFront ? '0px' : '5px';
          });

          const seatLines = clonedDoc.querySelectorAll('.seats-line');
          seatLines.forEach(sl => {
            sl.style.display = 'grid';
            sl.style.width = '100%';
            sl.style.gap = '4px';
            sl.style.padding = '0';
            sl.style.boxSizing = 'border-box';
          });
          const seats = clonedDoc.querySelectorAll('.classroom-seat');
          seats.forEach(s => {
            s.style.width = '100%';
            s.style.height = '74px';
            s.style.display = 'flex';
            s.style.flexDirection = 'column';
            s.style.alignItems = 'center';
            s.style.justifyContent = 'flex-end';
            s.style.boxSizing = 'border-box';
          });
          const chairBacks = clonedDoc.querySelectorAll('.seat-chair-back');
          chairBacks.forEach(cb => {
            cb.style.width = '82px';
            cb.style.height = '48px';
          });
          const personWraps = clonedDoc.querySelectorAll('.seat-person-wrap');
          personWraps.forEach(pw => {
            pw.style.width = '90px';
            pw.style.height = '70px';
            pw.style.borderRadius = '45px 45px 0 0';
            pw.style.overflow = 'hidden';
            pw.style.margin = '0 auto';
            pw.style.position = 'relative';
            pw.style.display = 'block';

            const img = pw.querySelector('img');
            if (img) {
              const rawSrc = img.getAttribute('data-src-raw') || img.getAttribute('src') || '';
              const safe = getSafeImageSrc(rawSrc);

              // html2canvas의 <img> object-fit 미지원(강제 압축 왜곡) 버그를 원천 해결:
              // 100% 원본 종횡비(가로세로 비율)를 왜곡 없이 보존하는 background-size: cover div로 변환
              const bgBox = clonedDoc.createElement('div');
              bgBox.style.width = '100%';
              bgBox.style.height = '100%';
              bgBox.style.backgroundImage = `url("${safe}")`;
              bgBox.style.backgroundSize = 'cover';
              bgBox.style.backgroundPosition = 'center 12%';
              bgBox.style.backgroundRepeat = 'no-repeat';
              bgBox.style.borderRadius = '45px 45px 0 0';
              bgBox.style.display = 'block';
              bgBox.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.35))';

              pw.innerHTML = '';
              pw.appendChild(bgBox);
            }
          });

          // 3) 하단 단체 기념 배지 복제본 렌더링 (Flexbox 정중앙 렌더링)
          const footerTag = clonedDoc.querySelector('.classroom-footer-tag');
          if (footerTag) {
            footerTag.innerHTML = `
              <div style="text-align:center; padding:6px 0 2px; margin:6px auto 0; width:100%; display:flex; justify-content:center; align-items:center;">
                <div style="display:inline-flex; align-items:center; justify-content:center; height:32px; padding:0 24px; background:#0f172a; border:1.5px solid #fcd34d; border-radius:16px; box-shadow:0 3px 10px rgba(0,0,0,0.5); box-sizing:border-box;">
                  <span style="color:#fcd34d; font-size:13px; font-weight:800; font-family:'Noto Sans KR', sans-serif; letter-spacing:0.04em; line-height:1; display:inline-block; vertical-align:middle; margin:0; padding:0;">
                    ✦ 2026. 11. 10 | 여성기업인 디지털(AI) 교육 참여 인증 단체 기념 ✦
                  </span>
                </div>
              </div>
            `;
            footerTag.style.position = 'relative';
            footerTag.style.display = 'block';
            footerTag.style.visibility = 'visible';
            footerTag.style.opacity = '1';
            footerTag.style.marginTop = '6px';
            footerTag.style.marginBottom = '2px';
            footerTag.style.textAlign = 'center';
            footerTag.style.zIndex = '99999';
            footerTag.style.width = '100%';
          }

          const hideEls = clonedDoc.querySelectorAll('.fullscreen-overlay-controls, #fsExitBtn, #fsCaptureBtn, .cert-action-toolbar, .auth-top-nav, .modal-overlay, #toastNotification');
          hideEls.forEach(el => el.style.setProperty('display', 'none', 'important'));
        }
      });

      // [Canvas 2D 직접 보정] 하단 단체 기념 배지 텍스트를 상자 안의 100% 수학적 완전 정중앙으로 정밀 렌더링
      try {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const badgeText = '✦ 2026. 11. 10 | 여성기업인 디지털(AI) 교육 참여 인증 단체 기념 ✦';
          const fontSize = 13 * 2;
          ctx.font = `800 ${fontSize}px 'Noto Sans KR', sans-serif`;
          const textMetrics = ctx.measureText(badgeText);
          const textWidth = textMetrics.width;
          const badgePaddingX = 24 * 2;
          const badgeWidth = Math.ceil(textWidth + (badgePaddingX * 2));
          const badgeHeight = 32 * 2;
          const badgeX = Math.round((canvas.width - badgeWidth) / 2);
          const badgeY = canvas.height - badgeHeight - (6 * 2);

          ctx.save();
          // 그림자 및 배경 상자
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.shadowBlur = 6 * 2;
          ctx.shadowOffsetY = 3 * 2;
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 16 * 2);
          } else {
            ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
          }
          ctx.fill();

          // 테두리
          ctx.shadowColor = 'transparent';
          ctx.strokeStyle = '#fcd34d';
          ctx.lineWidth = 1.5 * 2;
          ctx.stroke();

          // 텍스트 (완벽한 상하/좌우 정중앙)
          ctx.fillStyle = '#fcd34d';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(badgeText, canvas.width / 2, badgeY + (badgeHeight / 2));
          ctx.restore();
        }
      } catch (canvasErr) {
        console.warn('Canvas 2D badge centering skipped:', canvasErr);
      }

      captureArea.classList.remove('capturing-mode');

      // 저장 파일명 생성
      const now = new Date();
      const timeStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const fileName = `여성기업인_디지털AI교육_변화의시작_인증기념보드_${timeStr}.png`;

      // 1) Blob 방식으로 직접 다운로드 링크 트리거
      let downloadSuccess = false;
      if (canvas.toBlob) {
        downloadSuccess = await new Promise((resolve) => {
          try {
            canvas.toBlob((blob) => {
              if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.style.display = 'none';
                link.download = fileName;
                link.href = blobUrl;
                document.body.appendChild(link);
                link.click();
                setTimeout(() => {
                  if (document.body.contains(link)) document.body.removeChild(link);
                  URL.revokeObjectURL(blobUrl);
                }, 1500);
                resolve(true);
              } else {
                resolve(false);
              }
            }, 'image/png');
          } catch (e) {
            console.warn('toBlob error:', e);
            resolve(false);
          }
        });
      }

      // 2) Blob 미지원/실패 시 DataURL로 다운로드 처리
      if (!downloadSuccess) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.style.display = 'none';
        link.download = fileName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          if (document.body.contains(link)) document.body.removeChild(link);
        }, 1500);
      }

      showToastNotification('🎉 현수막 기념 보드가 성공적으로 캡처·저장되었습니다!');
    } catch (err) {
      captureArea.classList.remove('capturing-mode');
      console.error('Board capture error:', err);
      showToastNotification(`❌ 캡처 중 오류: ${err.message || '다시 시도해 주세요'}`);
    }
  }

  if (captureBoardBtn) {
    captureBoardBtn.addEventListener('click', performBoardCapture);
  }

  // 13. [QR 모바일 접속] URL 해시(#upload) 또는 쿼리 파라미터(?mode=upload) 감지 시 모바일 단독 업로드 화면 활성화
  const isUploadMode = window.location.hash.includes('upload') || urlParams.get('mode') === 'upload';
  if (isUploadMode) {
    document.body.classList.add('mobile-upload-mode');
    setTimeout(() => {
      openCertUploadModal();
    }, 100);
  }

  // 14. 전체화면 표시/해제 기능
  const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');
  const fullscreenIcon = document.getElementById('fullscreenIcon');
  const fullscreenText = document.getElementById('fullscreenText');

  function isFullscreenActive() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      window.fullScreen ||
      (window.innerWidth === screen.width && window.innerHeight === screen.height) ||
      (window.matchMedia && window.matchMedia('(display-mode: fullscreen)').matches)
    );
  }

  function updateFullscreenButtonState() {
    const isFs = isFullscreenActive();
    document.documentElement.classList.toggle('is-fullscreen', isFs);
    document.body.classList.toggle('is-fullscreen', isFs);

    const toolbar = document.querySelector('.cert-action-toolbar');
    const topNav = document.querySelector('.auth-top-nav');
    const fsControls = document.getElementById('fullscreenOverlayControls');

    if (isFs) {
      if (toolbar) toolbar.style.setProperty('display', 'none', 'important');
      if (topNav) topNav.style.setProperty('display', 'none', 'important');
      if (fsControls) fsControls.style.setProperty('display', 'block', 'important');
    } else {
      if (toolbar) toolbar.style.removeProperty('display');
      if (topNav) topNav.style.removeProperty('display');
      if (fsControls) fsControls.style.removeProperty('display');
    }

    if (fullscreenIcon) fullscreenIcon.textContent = isFs ? '✖' : '⛶';
    if (fullscreenText) fullscreenText.textContent = isFs ? '전체화면 해제' : '전체화면 표시';
    if (fullscreenToggleBtn) {
      if (isFs) {
        fullscreenToggleBtn.classList.add('active');
        fullscreenToggleBtn.title = '전체화면 해제하기 (단축키: ESC 또는 F11)';
      } else {
        fullscreenToggleBtn.classList.remove('active');
        fullscreenToggleBtn.title = '모니터 화면에 꽉 찬 전체화면으로 전환';
      }
    }
  }

  function toggleFullscreenMode() {
    try {
      if (!isFullscreenActive()) {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen();
        }
        showToastNotification('🖥️ 전체화면 모드로 전환되었습니다. (해제: ESC 키 또는 좌측 상단 버튼)');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        showToastNotification('🖥️ 전체화면 모드가 해제되었습니다.');
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
      showToastNotification('⚠️ 브라우저 설정에 따라 F11 키로 전체화면을 켤 수 있습니다.');
    }
  }

  if (fullscreenToggleBtn) {
    fullscreenToggleBtn.addEventListener('click', toggleFullscreenMode);
  }

  // 전체화면 전용 좌/우 플로팅 버튼 이벤트
  const fsExitBtn = document.getElementById('fsExitBtn');
  const fsCaptureBtn = document.getElementById('fsCaptureBtn');

  if (fsExitBtn) {
    fsExitBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFullscreenMode();
    });
  }

  if (fsCaptureBtn) {
    fsCaptureBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      performBoardCapture();
    });
  }

  document.addEventListener('fullscreenchange', updateFullscreenButtonState);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState);
  document.addEventListener('mozfullscreenchange', updateFullscreenButtonState);
  document.addEventListener('MSFullscreenChange', updateFullscreenButtonState);
  window.addEventListener('resize', updateFullscreenButtonState);
  if (window.matchMedia) {
    try {
      window.matchMedia('(display-mode: fullscreen)').addEventListener('change', updateFullscreenButtonState);
    } catch (e) {
      // 레거시 브라우저 예외 방지
    }
  }

  // ==========================================================================
  // [테스트 시뮬레이터] 70명 실시간 동시/순차 업로드 부하 테스트 함수
  // ==========================================================================
  window.run70SimulationTest = async function(intervalMs = 350) {
    showToastNotification(`🚀 70명 실시간 업로드 테스트를 시작합니다! (${intervalMs}ms 간격)`);
    console.log('🚀 [Simulation Test] Starting 70 participants real-time test...');

    const sampleNames = [
      '김서연', '이지은', '정유진', '한민경', '박수현', '최나영', '강다은', '윤채원', '조은별', '서미래',
      '임하늘', '백소영', '고아름', '문지영', '송예린', '권하나', '신보라', '안혜진', '유다희', '황유림',
      '전소민', '배수지', '노채은', '오세린', '손유나', '곽지수', '홍다인', '문채원', '류서현', '송지우',
      '주예원', '양서윤', '하은지', '표수빈', '엄지혜', '변가영', '남궁민선', '선우채연', '진소라', '도하늘',
      '구본아', '탁서연', '라유미', '마혜선', '제갈예은', '함수정', '성유주', '차민서', '길소연', '반지은',
      '옥현경', '천유정', '팽서희', '사공미소', '모지현', '복다솜', '석윤아', '어지영', '추예린', '편수진',
      '소유진', '위다혜', '설소영', '빈나리', '피아름', '방다온', '간수현', '갈소은', '감채민', '견혜원'
    ];

    const sampleCompanies = [
      '㈜넥스트웨이브', '㈜모던라이프', '㈜스마트랩', '㈜비전이노', '㈜글로벌에듀', '㈜블루밍케어',
      '㈜오로라디자인', '㈜케이프런티어', '㈜그린바이오', '㈜인사이트웍스', '㈜푸드테크', '㈜모션랩'
    ];

    const sampleImages = [
      'images/CEO01.png', 'images/CEO02.png', 'images/Young_Employee.jpeg',
      'images/Trainees.jpeg', 'images/Employees.jpeg', 'images/Large Screen.jpeg'
    ];

    for (let i = 1; i <= 70; i++) {
      const baseName = sampleNames[(i - 1) % sampleNames.length];
      const comp = sampleCompanies[(i - 1) % sampleCompanies.length];
      const img = sampleImages[(i - 1) % sampleImages.length];

      const simUser = {
        id: `sim-user-${Date.now()}-${i}`,
        name: `${baseName} 대표 (${comp})`,
        company: '여성기업인 디지털 혁신 1기',
        presetKey: 'cinematic_gold',
        promptText: PRESETS.cinematic_gold.prompt,
        beforeImg: img,
        afterImg: img,
        date: '2026. 11. 10',
        timestamp: Date.now(),
        isCurrentViewAfter: true
      };

      participants.unshift(simUser);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(participants));
      } catch (e) {}

      broadcastNewParticipant(simUser);
      renderCertCards(currentFilter);

      console.log(`[${i}/70] ${simUser.name} 참석자 실시간 등재 완료`);

      if (intervalMs > 0) {
        await new Promise(r => setTimeout(r, intervalMs));
      }
    }

    showToastNotification('🎉 70명 실시간 업로드 테스트가 성공적으로 완료되었습니다!');
  };

  // 초기 렌더링
  renderCertCards('all');
});

/**
 * 전역 토스트 알림 헬퍼
 */
function showToastNotification(message, duration = 3000) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
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
