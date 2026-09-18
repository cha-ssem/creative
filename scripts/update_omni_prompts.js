const fs = require('fs');
const path = require('path');

// 50대 한국인 여성 CEO 표준 일관성 락 텍스트
const CEO_CONSISTENCY_KR = "여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정하게 빗어 넘긴 로우번(Low-bun, 낮은 올림머리) 흑발, 얇고 섬세한 골드 메탈 프레임 오발 안경, 클래식 화이트 진주 스터드 귀걸이, 고급 다크 네이비 테일러드 싱글 브레스트 수트와 다크 네이비 새틴 라운드넥 블라우스 착용. 성숙하고 지적이며 신뢰감을 주는 이목구비와 자연스러운 눈가/입가 미소 주름 일관성 100% 락(Lock).";
const CEO_CONSISTENCY_EN = "Female CEO (@Female_CEO): 50-year-old Korean female executive leader. Sophisticated center-parted low-bun updo black hair, delicate gold metal-frame oval eyeglasses, classic white pearl stud earrings, premium tailored dark navy single-breasted suit with matching dark navy satin round-neck blouse. Mature, intelligent, highly trustworthy facial features with realistic subtle smile lines around eyes and mouth locked 100% across all clips.";

const INSTRUCTOR_CONSISTENCY_KR = "AI 강사 (@Instructor): 30대 후반 한국인 여성 전문 강사. 세련된 보브 단발 헤어, 모던 라운드 메탈 안경, 차콜 네이비 비즈니스 블레이저, 또렷하고 자신감 넘치는 제스처.";
const INSTRUCTOR_CONSISTENCY_EN = "AI Instructor (@Instructor): Late-30s Korean female expert instructor. Polished bob haircut, modern round metal glasses, charcoal navy blazer, articulate and confident pedagogical presentation posture.";

// 10개 클립별 Omni Flash 프롬프트 세부 정의 (참조 이미지, 캐릭터 일관성, 유기적 연결성 강화)
const omniPromptsMap = {
  1: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- 광활한 대도시 야경 속 30~60층 마천루 군락과 펜트하우스 최상층 불 켜진 단 하나의 창문 위치, 렌즈 화각 및 드론 궤적 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 창문 안쪽에서 차가운 모니터 불빛을 받으며 홀로 일하는 고독한 실루엣으로 등장.

[2순위 보조 참조: 에셋]
- @Cityscape: 늦은 밤 안개와 차가운 어둠에 싸인 현대식 마천루 스카이라인.

[클립 전후 시각 연결성 (Continuity)]
- [오프닝]: 광활한 밤하늘에서 불 켜진 단 하나의 창문을 향해 시네마틱하게 서서히 전진 ➔ [클립 02] 창문 유리를 통과하여 집무실 실내 책상 앞 피로한 CEO의 미디엄 샷으로 매끄럽게 직결.

[시네마틱 카메라 & 피사체 연출]
- 광활한 밤하늘 와이드 에어리얼 드론 샷(Wide Aerial Shot)에서 시작하여 빌딩 최상층 불 켜진 펜트하우스 창문을 향해 시네마틱하게 천천히 푸시인(Slow Push-in). 창문 너머 늦은 밤 홀로 서류를 검토하는 여성 CEO의 고독하고 지적인 실루엣이 점차 선명해짐.

[조명 & 색조]
- 딥 나이트 블루와 차콜 그레이 톤, 창문에서 새어나오는 볼류메트릭 시안 실내광, 하이 콘트라스트 시네마틱 로우키 조명.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 고층 빌딩 사이를 스치는 쓸쓸한 밤바람 소리, 멀리서 들려오는 대도시 백그라운드 앰비언스, 서정적인 저음 피아노 패드.`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- 100% match of wide aerial night skyline, 30-to-60-story skyscraper silhouettes, and exact framing of single illuminated penthouse window.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Appears as an identifiable silhouette working late alone through the high-rise glass window under soft monitor glow.

[Secondary Asset References]
- @Cityscape: Nocturnal glass and steel skyscraper skyline shrouded in cool night mist.

[Clip Continuity]
- [Opening In-Point]: Gliding forward through the vast night sky toward the lit window ➔ [Out-Point to Clip 02]: Passes smoothly through the glass into the interior office medium close-up of the fatigued CEO.

[Cinematic Camera & Subject Action]
- Starts as a wide aerial drone establishing shot, transitioning into a slow, smooth cinematic push-in toward the solitary illuminated penthouse window. The silhouette of the female CEO sitting alone at her desk becomes gradually distinct.

[Lighting & Atmosphere]
- Deep moody midnight blue and charcoal palette, volumetric cyan interior light beam, high-contrast chiaroscuro cinema grading.

[Native Audio & Ambience (No Narration)]
- Gentle howling of night wind, distant muffled urban traffic drone, melancholic low-register solo piano chord.`
  },

  2: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 02: The Fatigued CEO] images/thumbnails/frame_03s.jpg ➔ 미디엄 클로즈업 앵글, 피로에 지친 CEO의 미간과 어두운 표정 100% 일치.
- [Shot 03: Buried in Paperwork] images/thumbnails/frame_03s.jpg ➔ 책상 양옆에 산더미처럼 위태롭게 쌓인 결재 서류 더미 레이아웃 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 야근으로 인한 지친 미간, 피로한 눈빛, 의자에 깊숙이 기댈 때의 미세한 떨림과 깊은 한숨 연기 일관성 유지.

[2순위 보조 참조: 에셋]
- @Documents: 책상 위에 겹겹이 쌓인 결재 서류, 보고서 바인더 및 서류함.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 01]의 불 켜진 창문 내부로 진입 직결. 책상 앞 피로한 CEO의 얼굴 포착.
- [아웃포인트]: 끝없는 서류 더미를 바라보며 깊은 한숨으로 종료 ➔ [클립 03] 따스한 아침 햇살이 가득한 기업 교육장 전경으로 극적인 명암/시간 대비 점프 컷.

[시네마틱 카메라 & 표정 연기]
- 지친 CEO의 미간을 비추는 미디엄 클로즈업(Medium Close-up)에서 책상 양옆의 산더미 서류로 이어지는 슬로우 패닝(Slow Pan). CEO가 모니터에서 눈을 떼고 의자 등받이에 몸을 묻으며 깊은 한숨을 내쉬고 혼잣말을 읊조림.

[조명 & 색조]
- 모니터의 차가운 푸른 빛이 얼굴 한쪽 윤곽을 비추는 쿨톤 키 라이트, 주변부는 깊은 어둠이 깔린 사실적인 로우키(Low-key) 조명.

[네이티브 오디오 & 대사 (내레이션 제외)]
- 시계 초침 소리(Tik-Tok) 속 CEO의 피로한 한국어 혼잣말 립싱크: “하아… 검토할 게 아직도 이렇게 산더미라니…”, 무거운 한숨 소리.`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 02: The Fatigued CEO] images/thumbnails/frame_03s.jpg ➔ 100% matching medium close-up, fatigued brow tension, and tired gaze.
- [Shot 03: Buried in Paperwork] images/thumbnails/frame_03s.jpg ➔ 100% matching precarious paper stack depth and binder arrangement.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Portraying genuine executive exhaustion, subtle eye fatigue, deep weary sigh, and leaning back into leather chair.

[Secondary Asset References]
- @Documents: Piles of corporate binders, printed review reports, and pending approval documents.

[Clip Continuity]
- [In-Point]: Direct seamless match-cut from [Clip 01] lit window into interior desk medium close-up.
- [Out-Point to Clip 03]: Concludes on her heavy sigh amidst paper stacks ➔ Dramatic jump-cut to vibrant morning sunlight in [Clip 03] training session.

[Cinematic Camera & Subject Action]
- Starts on a medium close-up of her tired face, smoothly panning across endless stacks of pending reports. CEO looks away from monitor, leans heavily back into executive chair, releasing an exhausted sigh.

[Lighting & Atmosphere]
- Cold cyan glow from the monitor illuminating one cheekbone, surrounded by deep dark office shadows; photorealistic low-key grading.

[Native Audio & Dialogue (No Narration)]
- Ticking clock, paper rustling, and CEO's Korean muttering with accurate lip-sync: "하아… 검토할 게 아직도 이렇게 산더미라니… (Phew... still so many documents to review...)", followed by a deep audible sigh.`
  },

  3: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 04: The Training Screen] images/thumbnails/frame_06s.jpg ➔ 대형 LED 전면 스크린의 “생성형 AI 활용 교육” 텍스트 및 UI 그래픽 100% 일치.
- [Shot 05: The Training Session] images/thumbnails/frame_06s.jpg ➔ 교육장 광각 투시 앵글 및 통유리 채광 방향 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 맨 앞자리에 앉아 노트북을 앞에 두고 진지하고 호기심 어린 눈빛으로 전면 스크린을 경청하는 모습.
- ${INSTRUCTOR_CONSISTENCY_KR}

[2순위 보조 참조: 에셋]
- @Large_Screen: images/Large Screen.jpeg 대형 교육 디스플레이.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 02]의 밤 집무실 고립감에서 활기차고 밝은 주간 기업 교육장 전경으로 연결.
- [아웃포인트]: 강사의 설명에 고개를 끄덕이며 노트북으로 시선을 내리는 CEO ➔ [클립 04] CEO의 손가락 타건 및 화면 속 프롬프트 실행으로 매치 컷.

[시네마틱 카메라 & 공간 연출]
- 통유리창으로 햇살이 쏟아지는 깨끗하고 현대적인 기업 교육장을 조망하는 와이드 샷에서 완만하게 전진하는 슬로우 트래킹. 대형 스크린의 그래픽과 함께 강사가 제스처를 취하며 활기차게 강의를 진행함.

[조명 & 색감]
- 화사한 오전 자연광과 따뜻하고 긍정적인 웜 데이라이트(Warm Daylight) 조명.

[네이티브 오디오 & 대사 (내레이션 제외)]
- 현장감 넘치는 강사의 또렷한 한국어 강의 음성(자연스러운 립싱크): “생성형 AI를 활용하면 반복 업무를 획기적으로 줄이고, 진짜 중요한 비즈니스의 본질에 집중할 수 있습니다.”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 04: The Training Screen] images/thumbnails/frame_06s.jpg ➔ 100% matching large presentation display title and sleek graphics.
- [Shot 05: The Training Session] images/thumbnails/frame_06s.jpg ➔ 100% matching wide-angle perspective and sunlit room architecture.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Sitting attentively in the front row with open laptop, intrigued and focused facial expression.
- ${INSTRUCTOR_CONSISTENCY_EN}

[Secondary Asset References]
- @Large_Screen: images/Large Screen.jpeg high-definition corporate presentation display.

[Clip Continuity]
- [In-Point]: Bold jump-cut from dark nocturnal office in [Clip 02] into bright, inspiring corporate auditorium.
- [Out-Point to Clip 04]: Concludes on CEO nodding and looking down at her laptop ➔ Directly cuts to tight over-the-shoulder typing in [Clip 04].

[Cinematic Camera & Action]
- Wide establishing shot smoothly tracking forward across the modern corporate seminar room. The female instructor dynamically gestures toward the large screen showing “Generative AI for Business” while CEO listens attentively.

[Lighting & Atmosphere]
- Bright morning sunlight streaming through panoramic windows, warm optimistic cinematic ambience.

[Native Audio & Speech (No Narration)]
- Professional Korean lecture voiceover with precise lip-sync: "생성형 AI를 활용하면 반복 업무를 획기적으로 줄이고, 진짜 중요한 비즈니스의 본질에 집중할 수 있습니다. (With generative AI, you can dramatically cut repetitive tasks and focus on core leadership.)"`
  },

  4: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 06: Hands-On Experience] images/thumbnails/frame_10s.jpg ➔ 오버더숄더 손가락 타건 앵글 및 노트북 화면 UI 100% 일치.
- [Shot 07: A Moment of Discovery] images/thumbnails/frame_10s.jpg ➔ 인물 정면 클로즈업 전환 및 눈빛 변화 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 프롬프트 입력 시의 조심스러운 집중에서 엔터 직후 결과물을 보며 눈이 커지는 놀라움, 그리고 입가에 피어나는 환한 확신의 미소까지 감정선 완벽 락.

[2순위 보조 참조: 에셋]
- @Laptop: 14인치 스페이스 그레이 노트북 화면에 한국어 프롬프트와 분석 결과가 고속 스트리밍됨.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 03]의 강의 경청에서 CEO의 어깨 너머 타건 화면으로 직결.
- [아웃포인트]: 화면을 보며 환하게 미소 짓는 얼굴 ➔ [클립 05] 다음 날 아침 집무실 문을 열고 활기차게 출근하는 CEO의 샷으로 컷 연결.

[시네마틱 카메라 & 감정 연출]
- 스페이스 그레이 랩탑 화면과 타건을 비추는 오버더숄더에서 CEO의 얼굴과 눈빛으로 초점이 전환되는 타이트 클로즈업. 엔터 후 데이터와 보고서가 2초 만에 정리되자 눈동자가 커지며 입가에 확신의 환한 미소가 번진다.

[조명 & 톤앤매너]
- 화면의 화이트 반사광이 눈동자와 안경테에 섬세하게 맺히며 따스한 자연광과 조화를 이룸.

[네이티브 오디오 & 대사 (내레이션 제외)]
- 키보드 타건음(클릭클락)과 경쾌한 디지털 차임음 직후, CEO의 감탄 한국어 대사(정확한 립싱크): “어머… 단 몇 초 만에 이렇게 정리가 된다고?”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 06: Hands-On Experience] images/thumbnails/frame_10s.jpg ➔ 100% matching over-the-shoulder typing perspective.
- [Shot 07: A Moment of Discovery] images/thumbnails/frame_10s.jpg ➔ 100% matching facial close-up and luminous eye-widening arc.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Emotional progression from tentative typing focus to widened eyes of astonishment and radiant enlightenment.

[Secondary Asset References]
- @Laptop: 14-inch space-gray laptop displaying prompt execution and rapid structured analytics streaming.

[Clip Continuity]
- [In-Point]: Seamless transition from [Clip 03] into over-the-shoulder typing view.
- [Out-Point to Clip 05]: Concludes on her enlightened smile ➔ Directly cuts into [Clip 05] energetic morning office entrance.

[Cinematic Camera & Action]
- Over-the-shoulder shot focused on her typing fingers, shifting smoothly to a tight close-up on her expressive eyes behind gold glasses. As she hits enter, structured analytics stream onto the display; her eyes widen in astonishment, blossoming into a beaming smile.

[Lighting & Atmosphere]
- Soft screen glow reflecting in her pupils through gold glasses, complemented by warm daylight.

[Native Audio & Dialogue (No Narration)]
- Keystrokes, digital chime, and CEO's spontaneous Korean line with precise lip-sync: "어머… 단 몇 초 만에 이렇게 정리가 된다고? (Oh my… organized like this in just seconds?)"`
  },

  5: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 08: Morning Office Arrival] images/thumbnails/frame_15s.jpg ➔ 인물 진입 트래킹 동선 100% 일치.
- [Shot 09: Prompting the AI] images/thumbnails/frame_15s.jpg ➔ 커피잔을 내려놓는 책상 구도 100% 일치.
- [Shot 10: Organized Schedule Approval] images/thumbnails/frame_15s.jpg ➔ 책상 앞 미디엄 구도 및 아침 채광 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 가벼운 발걸음, 여유롭고 당당한 리더십, 온화하고 밝은 표정 유지.

[2순위 보조 참조: 에셋]
- @Coffee_Cup: 골드 림 화이트 세라믹 머그잔.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 04] 교육에서의 깨달음 직후, 다음 날 아침 집무실로 출근하는 씬으로 연결.
- [아웃포인트]: 음성 명령 후 노트북 화면에 일정표가 정리되는 화면 ➔ [클립 06] 화면 클로즈업에서 시작하여 회의자료 요약 및 이메일 전송으로 매치 컷.

[시네마틱 카메라 & 동선]
- 집무실 입구에서 블랙 옵시디언 데스크로 걸어 들어오는 CEO를 유려하게 따라가는 다이내믹 트래킹 샷에서 책상 앞 정갈한 미디엄 샷으로 안착. 커피잔을 내려놓고 랩탑을 열며 자연스럽게 음성 명령을 발화함.

[조명 & 환경]
- 통유리창 너머 눈부신 아침 햇살이 집무실 안을 환하게 채우는 골든 모닝 라이트(Golden Morning Light).

[네이티브 오디오 & 대사 (내레이션 제외)]
- 맑은 커피잔 소리 후, CEO의 또렷하고 여유로운 한국어 음성 명령 멘트(완벽한 립싱크): “오늘 일정과 주요 업무를 우선순위별로 정리해줘.”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 08: Morning Office Arrival] images/thumbnails/frame_15s.jpg ➔ 100% matching dynamic tracking entrance.
- [Shot 09: Prompting the AI] images/thumbnails/frame_15s.jpg ➔ 100% matching coffee cup placement on executive desk.
- [Shot 10: Organized Schedule Approval] images/thumbnails/frame_15s.jpg ➔ 100% matching morning light and composed posture.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Confident morning poise, relaxed executive warmth, smiling softly with purposeful stride.

[Secondary Asset References]
- @Coffee_Cup: Ceramic mug with delicate gold rim.

[Clip Continuity]
- [In-Point]: Smooth continuity cut from [Clip 04] realization into the next morning's vibrant office arrival.
- [Out-Point to Clip 06]: Schedule appears on screen as she approves ➔ Direct match-cut into [Clip 06] document synthesis workflow.

[Cinematic Camera & Action]
- Fluid tracking gimbal follows the CEO walking into her sunlit executive office, settling into a medium shot at her desk. She sets down her coffee mug, opens her laptop, and comfortably speaks a voice prompt.

[Lighting & Atmosphere]
- Radiant morning daylight streaming through panoramic windows, creating an uplifting golden corporate atmosphere.

[Native Audio & Dialogue (No Narration)]
- Ceramic clink, laptop boot hum, and CEO's clear Korean voice command with precise lip-sync: "오늘 일정과 주요 업무를 우선순위별로 정리해줘. (Organize today's schedule and priority tasks.)"`
  },

  6: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 11: Instant Report Synthesis] images/thumbnails/frame_20s.jpg ➔ 스크린 매크로 UI 클로즈업 100% 일치.
- [Shot 12: Professional Email Polishing] images/thumbnails/frame_20s.jpg ➔ 인물 미디엄 샷으로 빠져나오는 시네마틱 풀백 궤적 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 데이터 정리 완료 후 마우스를 쥐고 미소를 지으며 전송하는 여유로운 경영자의 표정.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 대형 화면 및 랩탑에 실행된 Claude Desktop의 모던하고 깔끔한 AI UI.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 05]의 아침 일정 정리 후 회의 문서와 이메일 처리로 직결.
- [아웃포인트]: 마우스 클릭으로 이메일 전송을 마치고 흡족하게 일어섬 ➔ [클립 07] 창가 화이트보드 신사업 아이디어 스케치로 연결.

[시네마틱 카메라 & UI 연출]
- 노트북 속 Claude Desktop 인터페이스를 포착하는 스크린 매크로에서 상반신을 비추는 미디엄 샷으로 부드럽게 풀백. 50페이지에 달하는 복잡한 회의 문서가 2초 만에 일목요연하게 요약되자, CEO가 마우스 클릭으로 이메일 전송을 완료한다.

[조명 & 색감]
- 블루-화이트 디지털 테크 톤과 화사한 실내 채광이 어우러진 현대적 비즈니스 톤.

[네이티브 오디오 & 대사 (내레이션 제외)]
- 고속 데이터 처리 사운드와 마우스 클릭음 속 CEO의 자연스러운 한국어 혼잣말(완벽한 립싱크): “완벽하네, 바로 전송.”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 11: Instant Report Synthesis] images/thumbnails/frame_20s.jpg ➔ 100% matching screen macro UI view.
- [Shot 12: Professional Email Polishing] images/thumbnails/frame_20s.jpg ➔ 100% matching pull-back to satisfied executive reaction.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Polished, confident smile as data organizes effortlessly; composed executive mastery.

[Secondary Asset References]
- @Claude_Desktop: Claude Desktop AI application interface rendering clean summary and refined draft.

[Clip Continuity]
- [In-Point]: Direct screen match-cut from [Clip 05] schedule approval into rapid document workflow.
- [Out-Point to Clip 07]: Hits send with a smile and stands up ➔ Transitions smoothly into [Clip 07] whiteboard strategic brainstorming.

[Cinematic Camera & Action]
- Starts on a crisp screen macro showing 50-page document synthesis on Claude Desktop, pulling back into a medium shot of the CEO. As the polished executive email draft appears, she clicks send with complete satisfaction.

[Lighting & Atmosphere]
- Crisp digital screen illumination balanced with clean, bright ambient room lighting.

[Native Audio & Dialogue (No Narration)]
- Digital processing swish, mouse click, and CEO's subtle Korean line with natural lip-sync: "완벽하네, 바로 전송. (Perfect, sending right away.)"`
  },

  7: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 13: Creative Idea Expansion] images/thumbnails/frame_25s.jpg
- 화이트보드 앞 인물 앵글, 180도 회전 카메라 궤적, 다이어그램 레이아웃 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 가죽 노트를 쥐고 마커를 든 채, 번뜩이는 통찰과 미래 전략에 대한 확신에 찬 당당한 눈빛.

[2순위 보조 참조: 에셋]
- @Notepad: 아이디어 마인드맵과 신규 사업 키워드가 적힌 가죽 커버 프리미엄 노트.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 06] 일상 업무 자동화 직후 미래 신사업 전략 기획으로 이동.
- [아웃포인트]: 화이트보드에 확신에 찬 도식을 완성하고 가죽 노트를 덮으며 이동 ➔ [클립 08] 오후 햇살이 가득한 집무실 문이 열리는 시네마틱 트래킹으로 연결.

[시네마틱 카메라 & 피사체 연기]
- 화이트보드 앞에 서 있는 CEO 주위를 부드럽게 180도 회전하는 시네마틱 오빗 팬 샷(Orbit Pan Shot)에서 화이트보드의 신사업 마인드맵으로 포커스 인. 가죽 노트를 쥐고 비즈니스 다이어그램을 자신감 있게 완성해 나간다.

[조명 & 색감]
- 화창한 주간 자연광과 세련된 실내 조명, 활력과 비즈니스 통찰을 상징하는 따뜻한 앰비언트.

[네이티브 오디오 & 대사 (내레이션 제외)]
- 마커 소리 속 CEO의 당당하고 확신에 찬 한국어 멘트(완벽한 립싱크): “이 전략을 적용하면 글로벌 시장 진출도 한결 빨라지겠어.”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 13: Creative Idea Expansion] images/thumbnails/frame_25s.jpg
- 100% matching whiteboard position, 180-degree camera arc, and diagram layout.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Holding notebook and marker, radiating visionary strategic clarity and executive vitality.

[Secondary Asset References]
- @Notepad: Leather-bound executive notepad containing key framework diagrams.

[Clip Continuity]
- [In-Point]: Smooth cut from [Clip 06] routine email automation to high-level strategic expansion.
- [Out-Point to Clip 08]: Completes the diagram, closes notepad ➔ Seamlessly transitions into [Clip 08] door opening into transformed office.

[Cinematic Camera & Action]
- Cinematic 180-degree orbit shot around the CEO standing before a clear whiteboard, focusing into the emerging strategic diagram. She confidently writes a strategic milestone and nods with visionary conviction.

[Lighting & Atmosphere]
- Invigorating corporate daylight balanced by warm, vibrant ambient lighting reflecting intellectual clarity.

[Native Audio & Dialogue (No Narration)]
- Squeak of whiteboard marker, and CEO's confident Korean remark with exact lip-sync: "이 전략을 적용하면 글로벌 시장 진출도 한결 빨라지겠어. (Applying this strategy will accelerate our global expansion.)"`
  },

  8: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 14: A Transformed Space] images/thumbnails/frame_30s.jpg
- 문이 열리며 집무실로 진입하는 카메라 무빙 동선, 정돈된 책상 위 오브제 배치 및 오후 골든 아워 역광 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 공간적 변화(비포/애프터)를 강조하는 공간 중심 샷. [클립 02]의 서류 지옥과 대비되는 미니멀하고 정갈한 환경 연출.

[2순위 보조 참조: 에셋]
- @CEO_Office: 통유리창으로 오후 햇살이 길게 드리우는 현대적이고 세련된 CEO 집무실.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 07]의 전략 수립 후 며칠 뒤 오후 집무실 복도에서 문이 스르륵 열림.
- [아웃포인트]: 정갈한 책상 위의 노트북으로 시선이 다가가며 ➔ [클립 09] 화면 속 Claude 작업 완료 모달과 안도하는 CEO의 휴식으로 직결.

[시네마틱 카메라 & 공간 연출]
- 열린 집무실 문을 통과하여 안쪽으로 매끄럽게 활주하는 스무스 글라이드캠 트래킹 샷(Glidecam Tracking). 과거 책상을 가득 메웠던 서류 더미는 완전히 사라지고, 노트북, 커피잔, 작은 가죽 노트만이 정갈하게 놓여 있다.

[조명 & 톤앤매너]
- 통유리창으로 길게 드리워지는 따스하고 평온한 골든 아워(Golden Hour) 햇살, 넓은 공간적 여유와 시네마틱 웜톤.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 문이 스르륵 열리는 정숙한 소리와 따뜻한 피아노 멜로디가 흐르는 평화로운 공간음스케이프.`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 14: A Transformed Space] images/thumbnails/frame_30s.jpg
- 100% matching entrance glidecam trajectory, pristine desk arrangement, and golden hour lighting.

[Character Consistency Lock]
- Environmental storytelling shot highlighting spatial transformation. Direct visual contrast to [Clip 02] paperwork nightmare.

[Secondary Asset References]
- @CEO_Office: Spacious, serene executive suite with floor-to-ceiling panoramic glass windows.

[Clip Continuity]
- [In-Point]: Direct cut from [Clip 07] into tranquil afternoon hallway where door glides open.
- [Out-Point to Clip 09]: Smoothly moves toward the clean desk ➔ Directly matches into [Clip 09] laptop screen completion view.

[Cinematic Camera & Spatial Storytelling]
- Smooth glidecam tracking passing through the gently opening door into the executive suite. The chaotic paper piles from [Clip 02] are completely gone; only a laptop, ceramic mug, and neat notebook rest on the desk.

[Lighting & Atmosphere]
- Radiant golden-hour sunbeams casting warm, serene diagonal light across minimalist surfaces; luxurious breathing room.

[Native Audio & Ambience (No Narration)]
- Soft mechanical door glide, subtle distant city hum, and tranquil lyrical piano chord progression.`
  },

  9: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 15: Mission Accomplished] images/thumbnails/frame_35s.jpg ➔ Claude Desktop “작업 완료” 알림 창 클로즈업 100% 일치.
- [Shot 16: Quiet Confidence] images/thumbnails/frame_35s.jpg ➔ CEO의 안도하는 표정으로 이어지는 카메라 틸트업 상승 동선 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 완벽한 성과를 확인한 후 가죽 의자에 편안하게 몸을 기대며 평온한 안도의 숨을 내쉬는 온화하고 위엄 있는 표정.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 최종 사업 제안서 프레젠테이션과 “작업 완료” 팝업이 뜬 화면.

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 08]의 정돈된 책상 위 노트북 화면으로 줌인 직결.
- [아웃포인트]: 안도의 미소와 함께 의자에 기대어 잠시 눈을 감았다가 창가로 일어섬 ➔ [클립 10] 창가에 서서 낮의 대도시를 조망하는 감동의 피날레 샷으로 연결.

[시네마틱 카메라 & 감정 연출]
- 노트북 속 Claude Desktop의 “작업 완료” 팝업에서 의자에 편안하게 몸을 기댄 CEO의 얼굴로 유려하게 상승하는 슬로우 틸트업(Slow Tilt-up) 및 풀백. 노트북 덮개를 가볍게 닫고 평온한 안도의 숨을 내쉰다.

[조명 & 색감]
- 오후의 부드러운 오렌지-골드빛 햇살이 CEO의 옆모습을 감싸는 시네마틱 웜톤(Cinematic Warm Tone).

[네이티브 오디오 & 대사 (내레이션 제외)]
- 맑은 작업 완료 차임벨 소리와 함께 CEO가 나직하게 내쉬는 한국어 안도 대사(자연스러운 립싱크): “후… 이제야 진짜 경영에 집중할 수 있겠어.”`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 15: Mission Accomplished] images/thumbnails/frame_35s.jpg ➔ 100% matching Claude Desktop completion modal.
- [Shot 16: Quiet Confidence] images/thumbnails/frame_35s.jpg ➔ 100% matching tilt-up to CEO's serene relief.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Peaceful sigh of relief, elegant gentle smile, resting back into chair in profound serenity.

[Secondary Asset References]
- @Claude_Desktop: Completed polished slide deck with clean "Task Completed" notification.

[Clip Continuity]
- [In-Point]: Direct match-cut from [Clip 08] clean desk into tight screen focus.
- [Out-Point to Clip 10]: Relaxes peacefully then rises toward window ➔ Cuts to [Clip 10] standing window grand finale.

[Cinematic Camera & Action]
- Starts on a close-up of Claude Desktop showing the completion prompt, smoothly tilting up and pulling back to reveal the CEO reclining comfortably in her chair. She closes the laptop lid gently and breathes a satisfied sigh.

[Lighting & Atmosphere]
- Rich golden afternoon sunlight illuminating her profile with a warm, triumphant cinematic glow.

[Native Audio & Dialogue (No Narration)]
- Clean digital chime, gentle exhalation, and CEO's quiet Korean relief with precise lip-sync: "후… 이제야 진짜 경영에 집중할 수 있겠어. (Phew… now I can truly focus on leadership.)"`
  },

  10: {
    omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 17: The Lonely CEO] images/thumbnails/frame_39s.jpg ➔ 창가에 선 CEO의 당당한 미소 100% 일치.
- [Shot 18: Cityscape Pullback] images/thumbnails/frame_39s.jpg ➔ 통유리창을 통과해 마천루 전경으로 빠져나가는 드론 풀백 궤적 100% 일치.
- [Shot 19: The Final Message] images/thumbnails/frame_39s.jpg ➔ 푸른 하늘 아래 광활한 낮의 대도시 스카이라인 100% 일치.

[캐릭터 일관성 락 (Character Consistency Lock)]
- ${CEO_CONSISTENCY_KR} 창밖을 응시하다 카메라를 향해 온화하고 자신감 넘치는 미소를 짓는 당당한 여성 리더의 위상.

[2순위 보조 참조: 에셋]
- @Cityscape: 맑은 낮 햇살 아래 찬란하게 빛나는 현대식 대도시 마천루 전경 ([클립 01] 야경과의 완벽한 수미상관).

[클립 전후 시각 연결성 (Continuity)]
- [인포인트]: [클립 09]의 휴식에서 창가로 걸어 나온 CEO의 모습으로 시작.
- [피날레 샷]: 카메라를 향해 미소 지은 후 통유리창을 통과하여 광활한 도시 상공으로 끝없이 멀어지는 장엄한 풀백 샷 ([클립 01] 오프닝과 완벽한 수미상관 완성).

[시네마틱 카메라 & 피사체 연출]
- 채광 좋은 집무실 창가에 선 CEO의 당당한 미소에서 통유리창을 통과하듯 시원하게 빠져나가며 30~60층 대도시 스카이라인을 조망하는 장엄한 그랜드 풀백 샷(Grand Pull-back Aerial Shot).

[화면 텍스트 오버레이]
- 화면 중앙에 우아한 한국어 엔딩 카피 페이드인: “일하는 방식이 바뀌면, 우리의 시간도 달라집니다.”

[조명 & 색조]
- 찬란한 주간 자연광과 푸른 하늘이 빚어내는 청명하고 장엄한 시네마틱 톤.

[네이티브 오디오 & 음악 (내레이션 제외)]
- 감동의 피날레를 장식하는 웅장하고 희망찬 심포니 오케스트라 사운드트랙 클라이맥스.`,

    omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 17: The Lonely CEO] images/thumbnails/frame_39s.jpg ➔ 100% matching serene smile by panoramic window.
- [Shot 18: Cityscape Pullback] images/thumbnails/frame_39s.jpg ➔ 100% matching drone pull-back trajectory through glass.
- [Shot 19: The Final Message] images/thumbnails/frame_39s.jpg ➔ 100% matching expansive daytime metropolis skyline.

[Character Consistency Lock]
- ${CEO_CONSISTENCY_EN} Standing tall by the window, turning toward camera with triumphant, poised, and radiant executive smile.

[Secondary Asset References]
- @Cityscape: Sunlit daytime metropolitan skyscraper panorama (perfect poetic symmetry with [Clip 01] night opening).

[Clip Continuity]
- [In-Point]: Smooth transition from [Clip 09] desk relaxation to panoramic window.
- [Grand Finale]: Triumphant close-up transitioning into an infinite drone pull-back over the metropolis, completing the cinematic circle begun in [Clip 01].

[Cinematic Camera & Action]
- Begins on a close-up of the CEO smiling beside the floor-to-ceiling glass, then executes a breathtaking pull-back gliding out the window into a grand aerial shot over the sunlit skyline.

[On-Screen Typography]
- Elegant Korean ending copy fades in: "일하는 방식이 바뀌면, 우리의 시간도 달라집니다. (When the way we work changes, our time changes.)"

[Lighting & Atmosphere]
- Brilliant daylight, crystal-clear blue skies, soaring triumphant cinematic palette.

[Native Audio & Music (No Narration)]
- Uplifting, emotionally resonant orchestral crescendo concluding on a magnificent, hopeful cadence.`
  }
};

// scripts/generate_prompts.js 파일 읽어서 업데이트
const genScriptPath = path.join(__dirname, 'generate_prompts.js');
let scriptContent = fs.readFileSync(genScriptPath, 'utf8');

// clipsData 내의 omni_kr, omni_en을 교체하기 위해 스크립트 실행 후 파일 재작성
// generate_prompts.js 자체의 구조를 유지하며 업데이트
Object.keys(omniPromptsMap).forEach(clipId => {
  const cId = parseInt(clipId, 10);
  const data = omniPromptsMap[cId];
  
  // omni_kr 정규식 교체
  const omniKrRegex = new RegExp(`(clipId:\\s*${cId}[\\s\\S]*?omni_kr:\\s*\`)[\\s\\S]*?(\`\\s*,\\s*omni_en:)`, 'm');
  scriptContent = scriptContent.replace(omniKrRegex, `$1${data.omni_kr}$2`);
  
  // omni_en 정규식 교체
  const omniEnRegex = new RegExp(`(clipId:\\s*${cId}[\\s\\S]*?omni_en:\\s*\`)[\\s\\S]*?(\`\\s*\\n\\s*\\}\\s*\\n\\s*\\})`, 'm');
  scriptContent = scriptContent.replace(omniEnRegex, `$1${data.omni_en}$2`);
});

fs.writeFileSync(genScriptPath, scriptContent, 'utf8');
console.log('generate_prompts.js 업데이트 완료!');

// generate_prompts.js 실행
require('./generate_prompts.js');
console.log('clip-prompts-data.js 갱신 완료!');
