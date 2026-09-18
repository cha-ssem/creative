const fs = require('fs');

const allClipsData = [
  // CLIP 01
  {
    clipId: 1,
    sceneId: "SCENE 01",
    sceneTitle: "늦은 밤의 도시, 혼자 남은 CEO",
    clipTitle: "어둠 속 마천루와 단 하나의 불 켜진 창문",
    contiShots: ["Shot 01: The Lonely Skyscraper"],
    duration: "8s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip01.00_00_06_01.스틸 001.jpg",
    linkedAssets: ["@Cityscape", "@Female_CEO"],
    cameraMotion: "Wide Aerial Shot ➔ Slow Cinematic Push-in",
    audioMood: "야간 도시 앰비언스, 스산한 밤바람 소리, 저음 피아노 패드 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- Matches wide aerial night skyline, dark 30-to-60-story skyscrapers, and exact framing of solitary illuminated penthouse window.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, thin gold oval metal eyeglasses, minimal white pearl stud earrings, dark navy tailored business suit. Identifiable working silhouette visible through high-rise window.

[Secondary Asset References]
- @Cityscape: Nocturnal glass and steel metropolis architecture shrouded in deep night mist.

[Clip Continuity]
- Opening shot of video: Gliding forward through the nocturnal sky toward the lit window ➔ Transitions directly into [Clip 02] interior medium close-up of the fatigued CEO.

[Camera & Subject Action]
- Camera: Starts as a wide aerial drone establishing shot, transitioning into a slow, smooth cinematic push-in toward the solitary illuminated window.
- Action: Deep night cityscape. A solitary penthouse office glows among darkened skyscrapers. Through the glass, the faint silhouette of a female CEO working late at her desk becomes gradually distinct.

[Lighting & Style]
- Deep moody midnight blue and charcoal palette, volumetric cold cyan interior light beam piercing the darkness, high-contrast chiaroscuro cinema grading. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Gentle whistling of night wind between skyscrapers, distant muffled metropolitan traffic hum, melancholic low-register solo piano pad. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- 원경 야경 드론 앵글, 어둠 속 30~60층 마천루 실루엣, 펜트하우스 집무실의 불 켜진 단 하나의 창문 위치 및 구도 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 CEO. 단정하게 빗어 넘긴 로우번(Low-bun) 묶음 머리, 클래식 골드 메탈 프레임 안경, 미니멀 진주 귀걸이, 고급 다크 네이비 테일러드 수트 착용. 창문 너머 책상에 앉아 야근하는 지적이고 단아한 실루엣을 일관되게 유지.

[2순위 보조 참조: 필요 시 참조할 에셋]
- @Cityscape: 늦은 밤 안개와 어둠에 싸인 현대식 유리/강철 마천루 스카이라인 외관.

[클립 연결성 (Continuity)]
- 오프닝 컷: 광활한 밤하늘에서 불 켜진 단 하나의 펜트하우스 창문을 향해 서서히 전진하며 종료 ➔ [클립 02] 창문 내부 책상 앞 피로한 CEO의 얼굴 클로즈업으로 직결.

[카메라 & 피사체 액션]
- 카메라: Wide Aerial Shot에서 시작하여 불 켜진 창문을 향해 시네마틱하게 천천히 푸시인(Slow Push-in)하는 유려한 드론 무빙.
- 피사체 액션: 늦은 밤의 대도시 전경. 수많은 어두운 빌딩들 사이 최상층 펜트하우스 한 곳에만 불이 켜져 있음. 창문 너머 모니터 빛을 받으며 홀로 서류를 검토하는 여성 CEO의 고독한 실루엣이 점차 선명해짐.

[조명 & 스타일]
- 딥 나이트 블루 & 차콜 그레이, 창문에서 새어나오는 볼류메트릭 시안 실내광, 하이 콘트라스트 시네마틱 로우키 조명. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 스산하게 부는 밤바람 소리, 멀리서 들려오는 대도시의 아련한 차량 백그라운드 앰비언스, 서정적이고 고독한 저음 피아노 패드. 불필요한 보이스오버 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- Wide aerial night skyline matching dark 30-60 story high-rises and single lit window.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun dark hair, gold oval eyeglasses, white pearl earrings, dark navy tailored suit. Executive silhouette working late.

[Secondary Asset References]
- @Cityscape: Modern skyscraper skyline enveloped in cold darkness.

[Clip Continuity]
- Opening: Glides slowly toward the lit window ➔ Leads to [Clip 02] interior medium shot of fatigued CEO.

[Camera & Action]
- Camera: Wide Aerial Shot ➔ Slow Cinematic Push-in.
- Action: Sprawling nocturnal cityscape. Camera smoothly moves toward a single illuminated penthouse window. Inside, a solitary female CEO works late into the night.

[Lighting & Tone]
- Deep midnight blue and charcoal tones, volumetric cyan office light beam. Cinematic photorealistic, 4K resolution, 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Ambient night wind, distant muffled urban hum, soft low-key piano chords. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 01: The Lonely Skyscraper] images/thumbnails/frame_00s.jpg
- 광활한 대도시 야경 속 30~60층 마천루 군락과 펜트하우스 최상층 불 켜진 단 하나의 창문 위치 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정하게 빗어 넘긴 로우번 흑발, 얇고 섬세한 골드 메탈 프레임 오발 안경, 클래식 화이트 진주 스터드 귀걸이, 다크 네이비 테일러드 싱글 브레스트 수트. 창문 안쪽에서 홀로 일하는 고독한 실루엣.

[2순위 보조 참조: 에셋]
- @Cityscape: 늦은 밤 안개와 차가운 어둠에 싸인 현대식 마천루 스카이라인.

[클립 전후 시각 연결성 (Continuity)]
- [오프닝]: 광활한 밤하늘에서 불 켜진 단 하나의 창문을 향해 시네마틱하게 서서히 전진 ➔ [클립 02] 창문 유리를 통과하여 집무실 실내 책상 앞 피로한 CEO의 미디엄 샷으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: Wide Aerial Shot에서 시작하여 빌딩 최상층 불 켜진 펜트하우스 창문을 향해 천천히 푸시인(Slow Push-in).
- 피사체 액션: 대도시 야경 속 불 켜진 단 하나의 창문 너머 늦은 밤 홀로 서류를 검토하는 여성 CEO의 지적이고 고독한 실루엣이 점차 선명해짐.

[조명 & 색조]
- 딥 나이트 블루와 차콜 그레이 톤, 창문에서 새어나오는 볼류메트릭 시안 실내광. 시네마틱 실사, 4K 해상도, 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 고층 빌딩 사이를 스치는 쓸쓸한 밤바람 소리, 원경의 대도시 백그라운드 앰비언스, 서정적인 저음 피아노 패드. 내레이션 없음.`
    }
  },

  // CLIP 02
  {
    clipId: 2,
    sceneId: "SCENE 01",
    sceneTitle: "늦은 밤의 도시, 혼자 남은 CEO",
    clipTitle: "서류 더미에 짓눌린 CEO의 피로와 깊은 한숨",
    contiShots: ["Shot 02: The Fatigued CEO", "Shot 03: Buried in Paperwork"],
    duration: "10s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip01.00_00_06_01.스틸 001.jpg",
    linkedAssets: ["@Female_CEO", "@Documents"],
    cameraMotion: "Medium Close-up ➔ Slow Pan Across Paper Stacks",
    audioMood: "시계 초침 소리(Tik-Tok), CEO의 피로한 혼잣말과 무거운 한숨 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 02: The Fatigued CEO] & [Shot 03: Buried in Paperwork] images/thumbnails/frame_08s.jpg
- Matches the dimly lit executive desk, fatigued facial expression under monitor glare, and towering stacks of printed A4 reports.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, elegant low-bun updo, delicate gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Visible exhaustion in her eyes, mature graceful facial texture, natural fatigue lines under subtle cool monitor glow.

[Secondary Asset References]
- @Documents: Overwhelming vertical stacks of A4 printed business proposals, binder folders, and highlighted financial spreadsheets surrounding her workstation.

[Clip Continuity]
- In: Directly connects from [Clip 01] camera pushing through the penthouse window into the interior office.
- Out: Ends with CEO resting her head back with a heavy sigh over paper stacks ➔ Hard cut to [Clip 03] bright daytime training center.

[Camera & Subject Action]
- Camera: Starts on a medium close-up of the female CEO gazing at her screen, then slowly pulls back and pans right across towering piles of paperwork and cluttered folders.
- Action: The CEO rubs the bridge of her nose, removing her gold glasses momentarily, then leans back into her ergonomic executive leather chair and exhales a deep, fatigued sigh. Her tired eyes scan the overwhelming documents.
- Dialogue (Spoken in Natural Korean): CEO softly whispers to herself in Korean: "검토해야 할 서류가... 아직도 산더미네."

[Lighting & Style]
- Moody nocturnal office lighting, cool blue LED glow from dual monitors illuminating her face, warm dim practical desk lamp casting long dramatic shadows. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Subtle hum of HVAC office ventilation, audible mechanical clock ticking (tik-tok) in the quiet room, rustling of paper sheets, deep audible breath and sigh. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 02: The Fatigued CEO] 및 [Shot 03: Buried in Paperwork] images/thumbnails/frame_08s.jpg
- 어두운 집무실 책상, 모니터 불빛을 받는 피로한 표정, 책상 위 산더미 같은 서류 더미 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 CEO. 단정한 로우번 올림머리, 골드 메탈 오발 안경, 화이트 진주 스터드 귀걸이, 다크 네이비 테일러드 수트. 눈가에 짙은 피로감이 묻어나는 지적이고 성숙한 이목구비와 자연스러운 눈가 주름 일관성 고정.

[2순위 보조 참조: 에셋]
- @Documents: 책상과 테이블을 가득 채운 A4 보고서 및 결재 서류 더미, 컬러 인덱스 탭, 파일 바인더.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 01] 창문을 통과한 드론 앵글에서 집무실 실내 책상 앞 CEO의 모습으로 매끄럽게 연결.
- [클립 종료]: 서류 더미를 보며 깊은 한숨을 내쉬며 종료 ➔ [클립 03] 환한 대낮의 생성형 AI 교육장 전경으로 반전 연결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 모니터를 응시하는 CEO의 미디엄 클로즈업에서 시작하여, 책상 위 산더미처럼 쌓인 서류 더미를 향해 우측으로 유려하게 슬로우 팬(Slow Pan).
- 피사체 액션: 여성 CEO가 잠시 안경을 벗어 미간을 짚으며 눈의 피로를 푼 뒤, 의자에 등을 깊숙이 기대며 무거운 한숨을 내쉼. 고개를 돌려 책상 가득한 보고서들을 막막한 눈빛으로 바라봄.
- 한국어 대사: 여성 CEO가 나직이 내쉬는 혼잣말: "검토해야 할 서류가... 아직도 산더미네."

[조명 & 스타일]
- 모니터에서 나오는 차가운 푸른 빛과 어두운 스탠드 조명, 깊은 음영의 시네마틱 로우키 조명. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 조용한 사무실의 에어컨 공조기 소리, 적막을 깨는 시계 초침 소리(Tik-Tok), 서류 종이 만지는 부스럭 소리, 깊은 한숨 소리. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 02: The Fatigued CEO] & [Shot 03: Buried in Paperwork] images/thumbnails/frame_08s.jpg
- Fatigued executive at desk with stacks of documents under cool monitor light.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy business suit. Realistic facial fatigue.

[Secondary Asset References]
- @Documents: Tall stacks of paper documents covering the desk.

[Clip Continuity]
- Connects from [Clip 01] window entry ➔ Ends with tired sigh, cuts to [Clip 03] daytime training hall.

[Camera & Action]
- Camera: Medium Close-up on CEO ➔ Slow Pan Across Paper Stacks.
- Action: The female CEO removes her glasses, rubs her temples, leans back into her chair, and exhales a heavy sigh looking at endless documents.
- Dialogue (Natural Korean): "검토해야 할 서류가... 아직도 산더미네."

[Lighting & Tone]
- Cool blue screen light, high-contrast night office mood. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Quiet office ventilation hum, wall clock ticking, paper rustling, deep sigh. No voiceover narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 02: The Fatigued CEO] & [Shot 03: Buried in Paperwork]
- 차가운 모니터 빛 아래 지친 CEO의 얼굴과 끝없이 쌓인 서류 더미 구도 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번 묶음머리, 골드 오발 안경, 진주 귀걸이, 다크 네이비 테일러드 수트.

[2순위 보조 참조: 에셋]
- @Documents: 높게 쌓인 인쇄 보고서 및 결재 서류 더미.

[클립 전후 시각 연결성 (Continuity)]
- [클립 01] 야경 창문 푸시인에서 실내로 진입 ➔ 깊은 한숨으로 종료 후 [클립 03] 밝은 교육장으로 컷 전환.

[시네마틱 카메라 & 피사체 연출]
- 카메라: CEO 얼굴 클로즈업 ➔ 서류 더미를 가로지르는 슬로우 팬.
- 피사체 액션: 모니터를 보던 CEO가 안경을 벗고 미간을 문지른 뒤 의자에 기대어 한숨을 내쉼.
- 현장 한국어 대사: "검토해야 할 서류가... 아직도 산더미네."

[조명 & 색조]
- 모니터 블루 라이트 반사광과 어두운 집무실 로우키 조명. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 적막한 사무실 시계 초침 소리, 공조기 소리, 서류 넘기는 소리, 무거운 한숨. 내레이션 없음.`
    }
  },

  // CLIP 03
  {
    clipId: 3,
    sceneId: "SCENE 02",
    sceneTitle: "생성형 AI 교육",
    clipTitle: "따스한 햇살 속 생성형 AI 기업 교육장 전경",
    contiShots: ["Shot 04: The Training Screen", "Shot 05: The Training Session"],
    duration: "8s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip02.mp4_snapshot_00.02.jpg",
    linkedAssets: ["@Large_Screen", "@Instructor", "@Female_CEO", "@Employees", "@Young_Employee"],
    cameraMotion: "Wide Establishing Shot ➔ Gentle Tracking",
    audioMood: "자연스러운 교육장 앰비언스, 열정적인 강사의 한국어 강의 육성 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 04: The Training Screen] & [Shot 05: The Training Session] images/thumbnails/frame_26s.jpg
- Matches sunlit modern corporate seminar hall, massive 16:9 presentation display, and attentive audience.

[Character Consistency Lock]
- Female Instructor (@Instructor): Korean woman in late 30s, stylish shoulder-length layered dark hair, navy unstructured blazer, light blue blouse, wireless headset microphone. Passionate, approachable, and articulate.
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun, gold oval eyeglasses, pearl stud earrings, dark navy tailored business suit. Seated attentively in front row, watching screen with deep interest.
- Fellow Trainees (@Employees, @Young_Employee): 30s male employee in navy blazer and 20s female employee in cozy beige knit sweater sitting beside CEO, focusing on lecture.

[Secondary Asset References]
- @Large_Screen: Massive high-definition display showing bold title "생성형 AI 활용 교육" with clean 4-step AI workflow infographics.

[Clip Continuity]
- In: Scene transition cut from [Clip 02] nocturnal burnout into bright daylight classroom.
- Out: Instructor gestures toward laptop prompts ➔ Connects to [Clip 04] over-the-shoulder view of CEO's hands on laptop keyboard.

[Camera & Subject Action]
- Camera: Opens on a wide establishing tracking shot across the sunlit training room, smoothly gliding past attentive trainees toward the instructor standing by the massive display.
- Action: The female instructor gestures dynamically toward the glowing screen, explaining AI prompt techniques with confidence. In the front row, the female CEO listens intently, nodding thoughtfully.
- Dialogue (Spoken in Natural Korean): Instructor speaks in clear, confident Korean: "생성형 AI는 단순한 자동화가 아니라, 리더의 시간을 되찾아주는 전략적 파트너입니다."

[Lighting & Style]
- Warm natural sunlight streaming through large floor-to-ceiling side windows, clean 5600K balanced daylight interior. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Natural room acoustics, instructor's articulate spoken Korean voice, subtle rustle of notepads and quiet mouse clicks. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 04: The Training Screen] 및 [Shot 05: The Training Session] images/thumbnails/frame_26s.jpg
- 채광이 밝은 현대식 기업 교육장 전경, 대형 스크린의 "생성형 AI 활용 교육" 화면 및 집중하는 교육생들 구도 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 강사 (@Instructor): 30대 후반 한국인 여성 강사. 숄더렝스 레이어드 컷 헤어, 네이비 비구조적 블레이저, 라이트 블루 블라우스 착용, 무선 헤드셋 마이크 장착. 열정적이고 지적인 강의 제스처 유지.
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 진주 귀걸이, 다크 네이비 테일러드 정장 착용. 앞좌석에 앉아 진지하게 경청하는 모습.
- 동료 교육생 (@Employees, @Young_Employee): 네이비 블레이저의 30대 남성 직원 및 베이지 니트 차림의 20대 여성 직원이 나란히 앉아 집중.

[2순위 보조 참조: 에셋]
- @Large_Screen: 전면 대형 16:9 LED 디스플레이, 선명한 "생성형 AI 활용 교육" 헤드라인과 4단계 업무 혁신 다이어그램.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 02]의 어두운 야근에서 밝은 대낮의 교육장으로 장면 전환(Scene Transition).
- [클립 종료]: 강사의 시연 제스처와 경청하는 CEO의 시선 ➔ [클립 04] CEO의 개인 노트북 화면 앞 오버더숄더 샷으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 교육장 전경을 잡는 와이드 에스타블리싱 샷에서 시작하여, 교육생들을 지나 대형 스크린 앞 강사를 향해 부드럽게 트래킹(Gentle Tracking).
- 피사체 액션: 여성 강사가 대형 화면의 워크플로우를 손으로 짚으며 열정적으로 설명함. 맨 앞줄에 앉은 여성 CEO가 화면을 진지하게 응시하며 고개를 끄덕임.
- 강사 한국어 육성: 명확하고 자신감 넘치는 강사의 육성: "생성형 AI는 단순한 자동화가 아니라, 리더의 시간을 되찾아주는 전략적 파트너입니다."

[조명 & 스타일]
- 큰 채광창을 통해 들어오는 따스한 자연광, 5600K 클린 화이트 실내 조명. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 자연스러운 교육장 룸 앰비언스, 강사의 또렷한 한국어 강의 육성, 은은한 마우스 클릭 및 필기 소리. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 04: The Training Screen] & [Shot 05: The Training Session]
- Sunlit corporate seminar hall with large screen displaying "생성형 AI 활용 교육".

[Character Consistency Lock]
- Female Instructor (@Instructor): Korean woman in late 30s, navy blazer, light blue blouse, headset mic.
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun, gold glasses, pearl earrings, dark navy suit.
- Colleagues (@Employees, @Young_Employee): 30s male and 20s female trainees attentive beside CEO.

[Secondary Asset References]
- @Large_Screen: Huge LED display with AI workflow diagram.

[Clip Continuity]
- From [Clip 02] night burnout ➔ Cuts to bright training hall ➔ Leads to [Clip 04] CEO laptop close-up.

[Camera & Action]
- Camera: Wide Establishing Shot ➔ Gentle Tracking.
- Action: Instructor presents AI methods dynamically at the screen. In the front row, the female CEO listens with focused curiosity.
- Dialogue (Natural Korean): "생성형 AI는 단순한 자동화가 아니라, 리더의 시간을 되찾아주는 전략적 파트너입니다."

[Lighting & Tone]
- Bright natural daylight, clean warm modern interior. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Classroom room tone, clear Korean spoken lecture, subtle page turns. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 04: The Training Screen] & [Shot 05: The Training Session]
- 채광이 밝은 교육장 전경과 대형 화면 앞 강사의 프레젠테이션 구도 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 강사 (@Instructor): 30대 후반 여성 강사, 네이비 블레이저, 숄더렝스 헤어, 헤드셋 마이크.
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 오발 안경, 다크 네이비 테일러드 수트.
- 동료 직원 (@Employees, @Young_Employee): 단정한 비즈니스 정장의 동료 교육생들.

[2순위 보조 참조: 에셋]
- @Large_Screen: 전면 대형 디스플레이, "생성형 AI 활용 교육".

[클립 전후 시각 연결성 (Continuity)]
- [클립 02] 어두운 밤에서 밝은 교육장으로 전환 ➔ [클립 04] 노트북 입력 실습 샷으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 교육장 와이드 샷 ➔ 강사를 향한 부드러운 트래킹.
- 피사체 액션: 강사가 화면을 가리키며 열정적으로 설명하고, 맨 앞자리 CEO가 집중하여 경청함.
- 현장 한국어 대사: "생성형 AI는 단순한 자동화가 아니라, 리더의 시간을 되찾아주는 전략적 파트너입니다."

[조명 & 색조]
- 환한 자연광과 세련된 오피스 웜톤. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 또렷한 강사의 한국어 강의 음성, 자연스러운 실내 앰비언스. 내레이션 없음.`
    }
  },

  // CLIP 04
  {
    clipId: 4,
    sceneId: "SCENE 02",
    sceneTitle: "생성형 AI 교육",
    clipTitle: "노트북 프롬프트 입력과 CEO의 눈빛 변화",
    contiShots: ["Shot 06: Hands-On Experience", "Shot 07: A Moment of Discovery"],
    duration: "10s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip02.mp4_snapshot_00.05.jpg",
    linkedAssets: ["@Female_CEO", "@Laptop"],
    cameraMotion: "Over-the-Shoulder ➔ Tight Close-up on Face & Eyes",
    audioMood: "경쾌한 키보드 타건음, AI 생성 완료 알림음, CEO의 한국어 감탄 대사 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 06: Hands-On Experience] & [Shot 07: A Moment of Discovery] images/thumbnails/frame_38s.jpg
- Matches the over-the-shoulder view of hands on space-gray laptop, glowing prompt box, and CEO's close-up reaction.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval eyeglasses, white pearl stud earrings, dark navy tailored business suit. Micro-expressions shifting from focused hesitation to subtle awe, then blooming into a warm, confident smile.

[Secondary Asset References]
- @Laptop: Premium 14-inch space-gray magnesium alloy notebook with minimalist AI chat prompt interface.

[Clip Continuity]
- In: Connects smoothly from [Clip 03] classroom lecture to CEO's hands at desk.
- Out: Ends with CEO's delighted smile looking at AI results ➔ Transitions to [Clip 05] next morning arrival at her office.

[Camera & Subject Action]
- Camera: Starts over-the-shoulder looking down at typing hands on keyboard, then smoothly tilts up and pushes into a tight cinematic close-up of the CEO's face and eyes.
- Action: CEO's manicured hands type a strategic prompt into the AI dialog box and press Enter. Across the screen, structured paragraphs and charts generate at lightning speed. The CEO's eyes widen slightly behind her gold frames, and a delighted, inspired smile spreads across her face.
- Dialogue (Spoken in Natural Korean): CEO whispers softly in pleasant disbelief: "이게... 정말 몇 초 만에 된다고?"

[Lighting & Style]
- Warm morning classroom light, soft white luminous glow from laptop screen softly highlighting her facial features. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Crisp, rhythmic tactile keyboard typing clicks, gentle electronic confirmation chime ("ding") as results appear, soft spoken Korean whisper. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 06: Hands-On Experience] 및 [Shot 07: A Moment of Discovery] images/thumbnails/frame_38s.jpg
- 노트북 키보드를 타이핑하는 손, 대화창 화면, 그리고 놀람에서 미소로 바뀌는 CEO의 얼굴 타이트 클로즈업 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 CEO. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 집중하던 표정이 경이로움과 안도로 바뀌며 입가에 번지는 밝고 지적인 미소 일관성 고정.

[2순위 보조 참조: 에셋]
- @Laptop: 14인치 스페이스 그레이 마그네슘 합금 슬림 노트북, 실시간 생성형 AI 프롬프트 채팅창 UI.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 03] 강사의 강의 시연에서 CEO의 개인 노트북 실습 화면으로 매끄럽게 연결.
- [클립 종료]: 감탄과 확신에 찬 미소로 종료 ➔ [클립 05] 다음날 아침 활기차게 출근하여 커피를 내려놓는 모닝 루틴으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 키보드를 타이핑하는 손을 비추는 오버더숄더 샷에서 시작하여, 화면을 본 후 감탄하는 CEO의 얼굴과 눈빛으로 부드럽게 틸트업(Smooth Tilt-up) 및 타이트 클로즈업.
- 피사체 액션: 여성 CEO가 진지한 표정으로 노트북에 프롬프트를 입력하고 엔터키를 누름. 화면에 정교한 분석 결과가 순식간에 생성되자, 안경 너머 눈이 살짝 커지며 놀란 뒤 부드럽고 자신감 넘치는 미소를 지음.
- CEO 한국어 육성: 감탄하며 나직이 흘러나오는 혼잣말: "이게... 정말 몇 초 만에 된다고?"

[조명 & 스타일]
- 교육장의 화사한 자연광과 노트북 모니터에서 은은하게 반사되는 시네마틱 화이트 앰비언트 광. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 경쾌하고 리드미컬한 키보드 타건음, AI 생성 완료를 알리는 맑고 짧은 알림음 ("띵"), 나지막한 한국어 감탄 혼잣말. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 06: Hands-On Experience] & [Shot 07: A Moment of Discovery]
- Over-the-shoulder typing on space-gray laptop, tilting up to CEO's smiling reaction.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit. Visible wonder turning into smile.

[Secondary Asset References]
- @Laptop: 14-inch space-gray notebook with glowing AI dialog window.

[Clip Continuity]
- From [Clip 03] training presentation ➔ Closes on CEO smile, leads to [Clip 05] morning office arrival.

[Camera & Action]
- Camera: Over-the-Shoulder ➔ Tight Close-up on Face & Eyes.
- Action: CEO types prompt and presses enter. Results stream instantly across the screen. Her eyes widen in pleasant shock, breaking into a warm, confident smile.
- Dialogue (Natural Korean): "이게... 정말 몇 초 만에 된다고?"

[Lighting & Tone]
- Warm daylight with subtle screen luminescence. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Tactile keyboard clicks, soft completion chime, quiet Korean mutter. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 06: Hands-On Experience] & [Shot 07: A Moment of Discovery]
- 노트북 타이핑 손 클로즈업에서 화면 확인 후 미소 짓는 CEO의 얼굴 표정 변화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번 묶음머리, 골드 오발 안경, 진주 귀걸이, 다크 네이비 테일러드 수트.

[2순위 보조 참조: 에셋]
- @Laptop: 스페이스 그레이 프리미엄 슬림 노트북.

[클립 전후 시각 연결성 (Continuity)]
- [클립 03] 교육장 강의에서 실습 샷으로 연결 ➔ [클립 05] 다음날 아침 활기찬 출근 씬으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 오버더숄더 키보드 샷 ➔ CEO 얼굴 타이트 클로즈업.
- 피사체 액션: 프롬프트 입력 후 초고속 생성 결과 확인, 놀람에서 확신에 찬 미소로 전환.
- 현장 한국어 대사: "이게... 정말 몇 초 만에 된다고?"

[조명 & 색조]
- 밝은 자연광과 모니터 반사광의 조화. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 키보드 타건음, AI 완료 알림음, 나지막한 한국어 감탄사. 내레이션 없음.`
    }
  },

  // CLIP 05
  {
    clipId: 5,
    sceneId: "SCENE 03",
    sceneTitle: "AI와 시작하는 아침",
    clipTitle: "모닝 커피와 활기찬 아침의 업무 시작",
    contiShots: ["Shot 08: Morning Office Arrival", "Shot 09: Prompting the AI", "Shot 10: Organized Schedule Approval"],
    duration: "8s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip03.mp4_snapshot_00.02.jpg",
    linkedAssets: ["@Female_CEO", "@Coffee_Cup", "@Laptop"],
    cameraMotion: "Dynamic Tracking ➔ Desk Medium Shot",
    audioMood: "커피잔 내려놓는 소리, 경쾌한 모닝 재즈, CEO의 한국어 음성 프롬프트 멘트 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 08: Morning Office Arrival] & [Shot 09: Prompting the AI] & [Shot 10: Organized Schedule Approval] images/thumbnails/frame_50s.jpg
- Matches bright morning executive office, steaming coffee cup placed on clean desk, and organized schedule on screen.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Confident posture, energetic morning stride, poised and dignified.

[Secondary Asset References]
- @Coffee_Cup: Matte charcoal ceramic mug with elegant rose-gold rim and steam rising gently from fresh hot coffee.
- @Laptop: 14-inch space-gray notebook displaying clean daily schedule and task priority card UI.

[Clip Continuity]
- In: Scene transition cut from [Clip 04] training smile into next morning's bright office arrival.
- Out: Ends with CEO nodding approvingly at schedule ➔ Connects directly to [Clip 06] report summarization and email polishing.

[Camera & Subject Action]
- Camera: Dynamic tracking shot following the CEO walking into her sunlit office, settling into a medium desk shot as she places her coffee mug down and opens her laptop.
- Action: The female CEO arrives with vibrant confidence. She sets her steaming coffee mug onto the walnut desk, opens her laptop, and speaks a voice prompt. The AI organizes her priorities instantly. She smiles and nods with total satisfaction.
- Dialogue (Spoken in Natural Korean): CEO speaks clearly in Korean: "오늘 일정과 주요 업무 우선순위 정리해줘."

[Lighting & Style]
- Radiant golden morning sunlight pouring through floor-to-ceiling glass windows, creating soft lens flares and warm wood reflections. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Confident footsteps on polished wood, gentle ceramic clink of coffee mug on desk, pleasant electronic calendar alert ("ding"). No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 08: Morning Office Arrival] 및 [Shot 09: Prompting the AI] 및 [Shot 10: Organized Schedule Approval] images/thumbnails/frame_50s.jpg
- 햇살 가득한 아침 집무실, 책상에 놓이는 커피잔, 화면에 정돈된 일정표와 만족스러운 CEO 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 활기차고 당당한 아침 발걸음, 여유롭고 자신감 넘치는 표정 일관성 유지.

[2순위 보조 참조: 에셋]
- @Coffee_Cup: 챠콜 블랙 매트 질감의 고급 세라믹 머그잔, 로즈골드 테두리, 은은하게 피어오르는 커피 김.
- @Laptop: 스페이스 그레이 슬림 노트북, 정돈된 캘린더 및 업무 우선순위 UI.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 04]의 깨달음 미소에서 다음날 아침 활기찬 출근으로 장면 전환.
- [클립 종료]: 일정표를 보며 만족스럽게 고개를 끄덕임 ➔ [클립 06] 실무 보고서 요약 및 영문 이메일 작성 화면으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 밝은 집무실로 걸어 들어오는 CEO를 따라가는 다이내믹 트래킹 샷에서, 책상 앞 커피잔을 놓는 미디엄 샷으로 부드럽게 정착.
- 피사체 액션: 활기차게 출근한 여성 CEO가 김이 피어오르는 커피잔을 책상에 가볍게 내려놓고 노트북을 엶. 음성으로 업무 정리를 요청하자 화면에 우선순위가 정돈되어 나타남. 커피를 한 모금 음미하며 만족스럽게 고개를 끄덕임.
- CEO 한국어 육성: 차분하고 자신감 넘치는 한국어 음성 명령: "오늘 일정과 주요 업무 우선순위 정리해줘."

[조명 & 스타일]
- 통유리창을 통해 쏟아지는 찬란한 아침 햇살, 따스한 골든 아워 웜톤과 세련된 원목 반사광. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 단정한 구두 발걸음 소리, 커피잔이 책상에 닿는 맑은 소리, 일정 정리 완료를 알리는 경쾌한 "띵" 알림음. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 08: Morning Office Arrival] & [Shot 09: Prompting the AI] & [Shot 10: Organized Schedule Approval]
- Sunlit morning office, placing coffee cup, organized schedule on laptop.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit. Confident and refreshed.

[Secondary Asset References]
- @Coffee_Cup: Matte charcoal ceramic mug with subtle steam.
- @Laptop: Notebook showing clean schedule dashboard.

[Clip Continuity]
- Connects from [Clip 04] smile ➔ Ends with approving nod, leads to [Clip 06] report tasks.

[Camera & Action]
- Camera: Dynamic Tracking ➔ Desk Medium Shot.
- Action: CEO enters her morning office confidently, sets down coffee, opens laptop, and requests schedule priorities. Approves with a pleased nod.
- Dialogue (Natural Korean): "오늘 일정과 주요 업무 우선순위 정리해줘."

[Lighting & Tone]
- Vibrant golden morning sunlight, cinematic reflections. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Footsteps, mug placed on wood, pleasant schedule notification chime. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 08: Morning Office Arrival] & [Shot 09: Prompting the AI] & [Shot 10: Organized Schedule Approval]
- 채광 좋은 아침 오피스 출근, 커피잔 내려놓기, 일정 우선순위 화면 확인.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 정장.

[2순위 보조 참조: 에셋]
- @Coffee_Cup: 김이 피어오르는 챠콜 머그잔.
- @Laptop: 노트북 화면 위 정돈된 캘린더 UI.

[클립 전후 시각 연결성 (Continuity)]
- [클립 04] 미소에서 아침 출근으로 전환 ➔ [클립 06] 회의자료 요약 씬으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 출근 트래킹 샷 ➔ 책상 미디엄 샷.
- 피사체 액션: 출근하여 커피를 놓고 노트북에 음성 명령 입력, 정리된 일정 확인 후 만족스럽게 끄덕임.
- 현장 한국어 대사: "오늘 일정과 주요 업무 우선순위 정리해줘."

[조명 & 색조]
- 따뜻하고 화사한 아침 햇살 웜톤. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 구두 굽 소리, 커피잔 놓는 소리, 일정 알림 차임벨. 내레이션 없음.`
    }
  },

  // CLIP 06
  {
    clipId: 6,
    sceneId: "SCENE 04",
    sceneTitle: "긴 회의자료 요약, 이메일 작성, 새로운 사업 아이디어",
    clipTitle: "방대한 회의 자료 요약 및 영문 비즈니스 메일 작성",
    contiShots: ["Shot 11: Instant Report Synthesis", "Shot 12: Professional Email Polishing"],
    duration: "9s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip03.mp4_snapshot_00.05.jpg",
    linkedAssets: ["@Claude_Desktop", "@Female_CEO", "@Laptop"],
    cameraMotion: "Screen Macro Close-up ➔ Smooth Tracking to CEO Smile",
    audioMood: "초고속 디지털 텍스트 생성음(Whoosh), 마우스 클릭음, CEO의 만족스러운 한국어 확인 멘트 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 11: Instant Report Synthesis] & [Shot 12: Professional Email Polishing] images/thumbnails/frame_68s.jpg
- Matches macro view of screen summarizing dense data into 3 bullet points, switching to polished English email.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Intellectual profile, composed satisfaction.

[Secondary Asset References]
- @Claude_Desktop: Clean minimalist desktop UI with warm neutral accents, rapidly formatting complex reports into executive summaries and polished professional emails.

[Clip Continuity]
- In: Connects from [Clip 05] schedule approval directly into active workflow execution.
- Out: Ends with CEO clicking send on email with a satisfied smile ➔ Leads to [Clip 07] creative whiteboard ideation.

[Camera & Subject Action]
- Camera: Starts on a dynamic screen macro close-up showing rapid text synthesis, then smoothly tracks across to the CEO's profile and smiling eyes.
- Action: A massive 50-page financial report collapses into three concise executive takeaways. The window shifts to an email draft, polishing rough Korean draft notes into elegant global business English. The CEO clicks [Send], leaning back with a serene smile.
- Dialogue (Spoken in Natural Korean): CEO whispers with quiet confidence: "완벽해. 바로 전송하지."

[Lighting & Style]
- Balanced modern corporate daylight, subtle cyan screen luminescence softly outlining her profile. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Swift digital text rendering whoosh sound, tactile mouse click, gentle electronic email sent whoosh sound, quiet Korean mutter. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 11: Instant Report Synthesis] 및 [Shot 12: Professional Email Polishing] images/thumbnails/frame_68s.jpg
- 방대한 수십 장의 회의 자료가 3줄 핵심 요약으로 압축되는 화면 매크로와 영문 메일 폴리싱 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 지적이고 세련된 옆모습, 여유롭고 만족스러운 미소 일관성 유지.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 클로드 데스크톱의 모던하고 미니멀한 UI, 초고속 텍스트 압축 및 글로벌 비즈니스 영문 메일 다듬기 창.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 05] 일정 승인 후 곧바로 실무 처리 워크플로우로 직결.
- [클립 종료]: 이메일 전송 버튼 클릭 후 미소 ➔ [클립 07] 오후 화이트보드 앞 신사업 아이디어 확장 씬으로 연결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 데이터가 실시간으로 초고속 요약되는 화면 매크로 클로즈업에서, 부드럽게 트래킹하여 화면을 바라보며 만족스럽게 미소 짓는 CEO의 옆모습으로 이동.
- 피사체 액션: 수십 페이지의 복잡한 보고서가 일목요연한 3개 핵심 포인트로 순식간에 요약됨. 이어 거친 메모가 격조 높은 전문 비즈니스 영문 이메일로 다듬어짐. 여성 CEO가 마우스로 전송 버튼을 누르며 만족스럽게 미소 지음.
- CEO 한국어 육성: 여유롭고 확신에 찬 혼잣말: "완벽해. 바로 전송하지."

[조명 & 스타일]
- 정돈된 오피스 주광과 모니터 디스플레이의 은은한 반사광. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 초고속 텍스트 생성 디지털 펄스 사운드, 명확한 마우스 클릭음, 이메일 전송 "슉" 효과음. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 11: Instant Report Synthesis] & [Shot 12: Professional Email Polishing]
- Screen macro showing document summary and polished English email, panning to CEO smile.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit.

[Secondary Asset References]
- @Claude_Desktop: High-res AI workspace transforming raw data into polished output.

[Clip Continuity]
- From [Clip 05] schedule ➔ Email sent with smile ➔ Leads to [Clip 07] whiteboard ideation.

[Camera & Action]
- Camera: Screen Macro Close-up ➔ Smooth Tracking to CEO Smile.
- Action: Complex documents summarize in seconds. Polish email converts notes to elegant business English. CEO clicks send with a pleased smile.
- Dialogue (Natural Korean): "완벽해. 바로 전송하지."

[Lighting & Tone]
- Clean corporate office light with soft screen luminescence. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Digital text synthesis whoosh, mouse click, email sent confirmation. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 11: Instant Report Synthesis] & [Shot 12: Professional Email Polishing]
- 방대한 서류가 핵심 요약되는 화면과 비즈니스 이메일 전송 및 CEO 미소.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 테일러드 정장.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 데스크톱 AI 인터페이스.

[클립 전후 시각 연결성 (Continuity)]
- [클립 05]에서 실무 처리로 진입 ➔ 이메일 전송 후 [클립 07] 화이트보드 아이디어 확장으로 연결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 화면 매크로 ➔ CEO 미소 트래킹.
- 피사체 액션: 데이터 초고속 요약, 영문 메일 다듬기 후 마우스 클릭 전송, 만족스러운 미소.
- 현장 한국어 대사: "완벽해. 바로 전송하지."

[조명 & 색조]
- 모니터 불빛과 자연광의 시네마틱 밸런스. 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 디지털 텍스트 효과음, 마우스 클릭 소리, 이메일 전송음. 내레이션 없음.`
    }
  },

  // CLIP 07
  {
    clipId: 7,
    sceneId: "SCENE 04",
    sceneTitle: "긴 회의자료 요약, 이메일 작성, 새로운 사업 아이디어",
    clipTitle: "화이트보드와 AI 대화를 통한 신사업 아이디어 확장",
    contiShots: ["Shot 13: Creative Idea Expansion"],
    duration: "9s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip03.mp4_snapshot_00.07.jpg",
    linkedAssets: ["@Female_CEO", "@Notepad"],
    cameraMotion: "Orbit Pan Around CEO ➔ Whiteboard Focus",
    audioMood: "보드마커 마찰음, 페이지 넘기는 소리, CEO의 확신에 찬 한국어 멘트 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 13: Creative Idea Expansion] images/thumbnails/frame_80s.jpg
- Matches CEO standing before glass whiteboard holding leather notebook, sketching mind map connections.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval eyeglasses, white pearl stud earrings, dark navy tailored business suit. Creative vitality, visionary executive confidence.

[Secondary Asset References]
- @Notepad: Charcoal-gray Saffiano leather notebook with gold ribbon bookmark, filled with strategic notes.

[Clip Continuity]
- In: Connects from [Clip 06] email completion into afternoon strategic ideation.
- Out: Ends with decisive checkmark on board ➔ Time-lapse scene transition to [Clip 08] transformed minimal office days later.

[Camera & Subject Action]
- Camera: Cinematic orbit pan circling smoothly around the CEO, moving from her contemplative profile to the expanding mind map diagram on the glass whiteboard.
- Action: The female CEO holds her charcoal leather notebook in one hand and writes key strategic phrases on the glass board with a black dry-erase marker. Looking between her laptop's AI suggestions and the board, her eyes light up with executive vision.
- Dialogue (Spoken in Natural Korean): CEO speaks with decisive clarity: "이 방향이야. 새로운 비즈니스 모델이 보여."

[Lighting & Style]
- Soft warm afternoon backlight creating subtle edge rim lighting, sophisticated executive suite ambiance. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Crisp squeak of dry-erase marker on glass, gentle paper rustle of leather notebook page turning, quiet room tone. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 13: Creative Idea Expansion] images/thumbnails/frame_80s.jpg
- 글래스 화이트보드 앞에 서서 사피아노 가죽 수첩을 들고 마인드맵을 그리는 여성 CEO 구도 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 묶음머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 창의적인 통찰력과 자신감이 빛나는 표정 일관성 유지.

[2순위 보조 참조: 에셋]
- @Notepad: 챠콜 그레이 사피아노 가죽 하드커버 수첩, 골드 리본 책갈피, 세련된 비즈니스 펜.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 06] 이메일 전송 완료 후 오후 전략 구상으로 자연스럽게 전환.
- [클립 종료]: 화이트보드에 체크 마크를 하며 확신에 찬 미소 ➔ [클립 08] 며칠 후 완전히 바뀐 정돈된 집무실 문이 열리는 장면으로 전환.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 생각에 잠긴 CEO의 측면에서 시작하여 화이트보드의 확장되는 마인드맵을 향해 부드럽게 궤도 선회(Orbit Pan).
- 피사체 액션: 여성 CEO가 한 손에 사피아노 가죽 수첩을 들고 다른 손으로 보드마커를 쥐어 화이트보드에 신사업 키워드를 적어 내려감. 노트북의 AI 제안과 보드를 번갈아 바라보며 눈빛에 확신과 열정이 차오름.
- CEO 한국어 육성: 확신에 찬 명확한 어조: "이 방향이야. 새로운 비즈니스 모델이 보여."

[조명 & 스타일]
- 오후의 부드럽고 따스한 역광 실루엣, 세련된 비즈니스 임원실 조명. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 화이트보드 유리에 마커가 사각거리는 마찰음, 가죽 수첩 책장을 넘기는 소리, 조용한 실내 공기감. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 9s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 13: Creative Idea Expansion]
- CEO standing at glass whiteboard holding leather notebook, sketching business ideas.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit.

[Secondary Asset References]
- @Notepad: Charcoal Saffiano leather notebook with gold ribbon.

[Clip Continuity]
- From [Clip 06] email ➔ Ideation at board ➔ Cuts to [Clip 08] clean transformed office.

[Camera & Action]
- Camera: Orbit Pan Around CEO ➔ Whiteboard Focus.
- Action: CEO sketches mind map on glass board while holding notebook. Connects AI ideas with strategic vision and smiles decisively.
- Dialogue (Natural Korean): "이 방향이야. 새로운 비즈니스 모델이 보여."

[Lighting & Tone]
- Warm afternoon backlight, soft rim illumination. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Dry-erase marker squeaks on glass, notebook paper flipping. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 9초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 13: Creative Idea Expansion]
- 화이트보드 앞에서 수첩을 들고 신사업 아이디어를 적는 여성 CEO.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 테일러드 수트.

[2순위 보조 참조: 에셋]
- @Notepad: 사피아노 가죽 수첩.

[클립 전후 시각 연결성 (Continuity)]
- [클립 06]에서 전략 회의로 연결 ➔ [클립 08] 며칠 후 정돈된 오피스로 전환.

[시네마틱 카메라 & 피사체 연출]
- 카메라: CEO 주변 궤도 선회 ➔ 화이트보드 포커스.
- 피사체 액션: 화이트보드에 아이디어를 적으며 확신에 찬 표정으로 미소 지음.
- 현장 한국어 대사: "이 방향이야. 새로운 비즈니스 모델이 보여."

[조명 & 색조]
- 따뜻한 오후 역광 톤앤매너. 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 보드마커 소리, 수첩 종이 소리. 내레이션 없음.`
    }
  },

  // CLIP 08
  {
    clipId: 8,
    sceneId: "SCENE 05",
    sceneTitle: "다시 CEO 사무실",
    clipTitle: "깨끗하게 정돈된 집무실과 사라진 서류 더미",
    contiShots: ["Shot 14: A Transformed Space"],
    duration: "8s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip04.mp4_snapshot_00.02.jpg",
    linkedAssets: ["@CEO_Office", "@Female_CEO"],
    cameraMotion: "Smooth Glidecam Tracking through Doorway to Clean Desk",
    audioMood: "문 열리는 소리, 조용한 클래식 피아노, 평온한 공기감 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 14: A Transformed Space] images/thumbnails/frame_87s.jpg
- Matches the sunlit double doorway opening into a minimalist, clutter-free executive office bathed in warm sunlight.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Relaxed, dignified executive presence seated comfortably behind clean desk.

[Secondary Asset References]
- @CEO_Office: Spacious luxury executive suite. Floor-to-ceiling glass windows, rich polished walnut desk. Stacks of paper from Scene 1 have vanished, replaced by an open laptop, a sleek notepad, and a single coffee mug.

[Clip Continuity]
- In: Scene transition (Days later) cutting from [Clip 07] whiteboard work to opening office doors.
- Out: Glidecam approaches desk ➔ Direct cut to [Clip 09] macro monitor showing Claude's completion message.

[Camera & Subject Action]
- Camera: Smooth glidecam tracking through heavy wooden double doors as they slowly open, gliding forward through the room toward the spotless walnut executive desk.
- Action: The office is transformed. Warm sunlight floods the immaculate room. The overwhelming paper clutter of Scene 1 is completely gone. In the background, the female CEO sits at ease behind her clean desk, radiating peace and control.

[Lighting & Style]
- Radiant golden-hour daylight streaming through panoramic windows, airy atmosphere with gentle dust motes dancing in light beams. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Soft heavy wooden door unlatching and swinging open, gentle serene room tone, warm distant solo piano chords. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 14: A Transformed Space] images/thumbnails/frame_87s.jpg
- 집무실 문이 열리며 드러나는 서류 더미가 사라진 깔끔하고 햇살 가득한 미니멀 집무실 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 책상 뒤에 편안하고 당당하게 앉아 있는 여유로운 자태 일관성 유지.

[2순위 보조 참조: 에셋]
- @CEO_Office: 전면 통유리창, 최고급 월넛 원목 책상. 씬 1을 가득 메웠던 서류 더미가 완전히 사라지고 노트북과 커피잔만 놓인 정돈된 공간.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 07] 아이디어 구상에서 며칠 후 집무실 문이 열리는 장면으로 전환.
- [클립 종료]: 글라이드캠이 책상 위 모니터를 향해 전진하며 종료 ➔ [클립 09] 화면 속 "작업 완료" 메시지와 CEO의 깊은 휴식으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 묵직한 원목 문이 천천히 열리며, 문틈을 통과해 깨끗하게 정돈된 월넛 책상을 향해 부드럽게 전진하는 글라이드캠 트래킹 샷(Smooth Glidecam Tracking).
- 피사체 액션: 씬 1에서 가득했던 서류 더미가 온데간데없이 사라지고 눈부신 아침 햇살이 가득한 집무실. 책상 위에는 노트북과 커피잔만 단정히 놓여 있고, 책상 뒤 CEO는 평온하고 여유로운 표정으로 앉아 있음.

[조명 & 스타일]
- 통유리창을 통해 쏟아져 들어오는 따스한 골든 아워 자연 채광, 밝고 여유로운 웜톤. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 묵직한 원목 문이 부드럽게 열리는 소리, 평화롭고 조용한 실내 공기감, 은은한 서정적 피아노 패드. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 8s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 14: A Transformed Space]
- Double doors open to a sunlit, clutter-free executive office with clean desk.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit.

[Secondary Asset References]
- @CEO_Office: Spacious executive suite with no paper clutter, only laptop and mug.

[Clip Continuity]
- From [Clip 07] ideation ➔ Open door reveals minimal office ➔ Leads to [Clip 09] screen macro.

[Camera & Action]
- Camera: Smooth Glidecam Tracking through Doorway to Clean Desk.
- Action: Doors open into an illuminated, serene executive suite. Paper piles from Scene 1 are completely gone. The CEO sits serenely in total calm.

[Lighting & Tone]
- Bright golden sunlight flooding through large windows. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Soft door opening sound, peaceful room ambiance. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 8초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 14: A Transformed Space]
- 집무실 문이 열리며 서류 더미가 사라진 햇살 가득한 미니멀 오피스 전경.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 테일러드 정장.

[2순위 보조 참조: 에셋]
- @CEO_Office: 정돈된 최고급 임원실.

[클립 전후 시각 연결성 (Continuity)]
- [클립 07]에서 시간 경과 후 전환 ➔ [클립 09] 모니터 클로즈업으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 문을 통과하는 부드러운 글라이드캠 전진.
- 피사체 액션: 서류 더미가 사라진 깔끔한 공간, 책상 뒤 여유롭게 앉아 있는 CEO.

[조명 & 색조]
- 찬란한 골든 아워 채광. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 문 열리는 소리, 평온한 실내 앰비언스. 내레이션 없음.`
    }
  },

  // CLIP 09
  {
    clipId: 9,
    sceneId: "SCENE 05",
    sceneTitle: "다시 CEO 사무실",
    clipTitle: "Claude 완성 화면과 의자에 기대어 쉬는 CEO의 여유",
    contiShots: ["Shot 15: Mission Accomplished", "Shot 16: Quiet Confidence"],
    duration: "10s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip04.mp4_snapshot_00.05.jpg",
    linkedAssets: ["@Claude_Desktop", "@Female_CEO", "@Coffee_Cup"],
    cameraMotion: "Monitor Macro ➔ Slow Tilt-up to CEO Relaxed Smile",
    audioMood: "부드러운 AI 완료 벨소리, CEO의 안도 섞인 한국어 멘트와 평온한 숨소리 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 15: Mission Accomplished] & [Shot 16: Quiet Confidence] images/thumbnails/frame_94s.jpg
- Matches macro view of Claude Desktop screen with "Task Completed" badge, tilting up to CEO relaxing with coffee mug.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Mature, serene facial expression, calm confident gaze, no more exhaustion.

[Secondary Asset References]
- @Claude_Desktop: Software interface displaying completed business presentation slides and an elegant glowing "작업 완료 (Task Completed)" confirmation badge.
- @Coffee_Cup: Matte charcoal ceramic mug held gently in both hands.

[Clip Continuity]
- In: Directly connects from [Clip 08] glidecam moving in toward the desk.
- Out: CEO stands up from desk looking toward panoramic window ➔ Seamlessly transitions into [Clip 10] window heroic portrait and pullback.

[Camera & Subject Action]
- Camera: Opens on a macro close-up of the laptop monitor showing the completed slide and "작업 완료" popup, then slowly tilts up to a medium portrait of the CEO.
- Action: The female CEO looks at the completed project on screen with deep satisfaction. She holds her warm coffee cup with both hands, leans back comfortably into her chair, and takes a slow, peaceful breath of relief.
- Dialogue (Spoken in Natural Korean): CEO whispers softly with a serene smile: "드디어... 끝났다."

[Lighting & Style]
- Warm amber daylight mixed with soft luminescence from the monitor screen, cinematic low-contrast warm tone. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Melodic pleasant AI completion chime ("ding-dong~"), gentle exhalation of peaceful breath, quiet warm room acoustics. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 15: Mission Accomplished] 및 [Shot 16: Quiet Confidence] images/thumbnails/frame_94s.jpg
- 클로드 데스크톱 모니터 속 "작업 완료" 알림창과 의자에 기대어 커피를 마시며 여유를 누리는 CEO 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 씬 1의 피로감이 완전히 사라지고 깊은 안도감과 지적인 여유가 깃든 온화한 미소 일관성 유지.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 완성된 제안서 프레젠테이션 슬라이드와 "작업 완료" 팝업 알림창.
- @Coffee_Cup: 따뜻한 김이 피어오르는 챠콜 세라믹 머그잔.

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 08] 책상 전진 무빙에서 모니터 화면으로 매끄럽게 연결.
- [클립 종료]: 미소를 짓던 CEO가 자리에서 천천히 일어나 창가로 향함 ➔ [클립 10] 창가에 서서 낮 도시를 바라보는 당당한 뒷모습과 풀백으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 화면 속 "작업 완료" 메시지를 잡는 매크로 클로즈업에서, 부드럽게 틸트업(Slow Tilt-up)하여 의자에 기대어 커피잔을 쥐고 미소 짓는 CEO의 바스트 샷으로 이동.
- 피사체 액션: 완성된 슬라이드를 확인한 여성 CEO가 만족스럽게 미소 지음. 따뜻한 커피 머그잔을 양손으로 쥐고 의자에 편안하게 등을 기대며 깊고 편안한 안도의 숨을 들이쉼.
- CEO 한국어 육성: 안도와 자부심이 깃든 나지막한 목소리: "드디어... 끝났다."

[조명 & 스타일]
- 모니터의 은은한 조명과 창가에서 들어오는 부드러운 채광의 조화, 따스하고 편안한 시네마틱 웜톤. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 맑고 영롱한 AI 완료 차임벨 ("딩동~"), 편안하고 깊은 호흡 소리, 따뜻한 룸 앰비언스. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 15: Mission Accomplished] & [Shot 16: Quiet Confidence]
- Monitor showing "Task Completed", tilting up to CEO relaxing in chair with coffee.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit. Deep relief and calm.

[Secondary Asset References]
- @Claude_Desktop: Screen showing finished presentation with "작업 완료" badge.
- @Coffee_Cup: Warm ceramic mug.

[Clip Continuity]
- From [Clip 08] desk tracking ➔ CEO stands toward window ➔ Leads to [Clip 10] grand finale.

[Camera & Action]
- Camera: Monitor Macro ➔ Slow Tilt-up to CEO Relaxed Smile.
- Action: CEO sees task finished, smiles in peace, leans back into leather chair holding warm coffee, and breathes a sigh of relief.
- Dialogue (Natural Korean): "드디어... 끝났다."

[Lighting & Tone]
- Warm ambient daylight and soft screen light. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Melodic AI chime ("ding-dong"), quiet relaxed breath. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 15: Mission Accomplished] & [Shot 16: Quiet Confidence]
- 모니터 속 "작업 완료" 메시지와 의자에 기대어 커피를 마시며 쉬는 CEO.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 수트.

[2순위 보조 참조: 에셋]
- @Claude_Desktop: 완성된 슬라이드와 완료 팝업.
- @Coffee_Cup: 따뜻한 머그잔.

[클립 전후 시각 연결성 (Continuity)]
- [클립 08]에서 모니터 확인 ➔ 자리에서 일어나 창가로 이동 ➔ [클립 10] 피날레 샷으로 직결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 모니터 매크로 ➔ CEO 미소 틸트업.
- 피사체 액션: 작업 완료 확인 후 편안하게 의자에 기대어 숨을 고르며 미소 지음.
- 현장 한국어 대사: "드디어... 끝났다."

[조명 & 색조]
- 온화한 실내광과 따뜻한 채광. 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: AI 완료 차임벨 소리, 편안한 숨소리. 내레이션 없음.`
    }
  },

  // CLIP 10
  {
    clipId: 10,
    sceneId: "SCENE 06",
    sceneTitle: "엔딩 및 여운",
    clipTitle: "창밖 도시 전경 풀백과 당당한 CEO의 미소",
    contiShots: ["Shot 17: The Confident Leader", "Shot 18: Cityscape Pullback", "Shot 19: The Final Message"],
    duration: "10s",
    aspectRatio: "16:9",
    fps: "24fps",
    quality: "4K UHD, Cinematic Lighting",
    thumb: "CEO_clip04.mp4_snapshot_00.08.jpg",
    linkedAssets: ["@Cityscape", "@Female_CEO"],
    cameraMotion: "Dramatic Pullback from Office Window to Epic City Skyline",
    audioMood: "감동적인 피날레 풀 오케스트라 클라이맥스, 장엄한 도시 앰비언스 (내레이션 없음)",
    prompts: {
      seedance_en: `[Seedance 2.0 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Keyframe Anchor:
- [Shot 17: The Confident Leader] & [Shot 18: Cityscape Pullback] images/thumbnails/frame_106s.jpg
- Matches the low-angle heroic view of the CEO by the window, transitioning into a sweeping drone pullback over the daytime city.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, neat low-bun updo, gold oval metal eyeglasses, white pearl stud earrings, dark navy tailored business suit. Poised, visionary posture, radiant confident smile gazing at the city.

[Secondary Asset References]
- @Cityscape: Sprawling daytime metropolis of gleaming glass skyscrapers under brilliant blue skies, contrasting the dark nocturnal opening of Clip 01.

[Clip Continuity]
- In: Seamlessly connects from [Clip 09] as CEO walks to the window.
- Out: Grand finale bookend - camera pulls out through the glass into the infinite sky, fading out into cinematic elegance.

[Camera & Subject Action]
- Camera: Opens on a low-angle heroic portrait of the CEO standing gracefully by the floor-to-ceiling glass window, then executes a breathtaking, smooth aerial pullback through the window into an epic wide shot of the sunlit city skyline.
- Action: The female CEO looks out over the thriving metropolis with calm confidence, arms loosely clasped, smiling with visionary leadership. The camera pulls far away into the open blue sky as the entire city shines below.

[Lighting & Style]
- Brilliant daylight, sparkling sun reflections across glass skyscrapers, golden sun flare, epic cinematic scope. Cinematic photorealistic, 4K resolution, 24fps.

[Audio & Sound FX (No Narration)]
- Sound: Uplifting cinematic orchestral crescendo, subtle distant city breeze, triumphant ambient resonance. No background narration.`,

      seedance_kr: `[Seedance 2.0 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 핵심 키프레임 앵커:
- [Shot 17: The Confident Leader] 및 [Shot 18: Cityscape Pullback] images/thumbnails/frame_106s.jpg
- 창가에 선 CEO의 당당한 로우앵글 포트레이트와 대도시 상공으로 멀어지는 웅장한 드론 풀백 100% 동기화.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더. 단정한 로우번 올림머리, 골드 오발 안경, 화이트 진주 귀걸이, 다크 네이비 테일러드 정장. 창밖을 내려다보는 여유롭고 당당한 리더의 미소와 품격 있는 실루엣 일관성 고정.

[2순위 보조 참조: 에셋]
- @Cityscape: 푸른 하늘 아래 눈부시게 빛나는 현대식 유리/강철 고층 마천루 군락 (씬 1의 어두운 밤과 극적인 대비).

[클립 전후 시각 연결성 (Continuity)]
- [클립 시작]: [클립 09]에서 자리에서 일어나 창가로 걸어간 CEO의 동작에서 직결.
- [클립 종료]: [그랜드 피날레]: 창문을 통과해 광활한 대도시 창공으로 풀백하며 감동적인 페이드아웃. 씬 1의 오프닝(야경 ➔ 창문 진입)과 완벽한 수미상관(창문 ➔ 낮 창공 풀백)을 이루며 완결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 통유리창 앞에 당당히 선 CEO의 로우앵글 미디엄 포트레이트에서 시작하여, 창문 밖으로 드라마틱하게 빠져나오며 낮의 대도시 스카이라인을 조망하는 웅장한 에어리얼 풀백(Dramatic Aerial Pullback).
- 피사체 액션: 여성 CEO가 여유롭게 두 손을 모으고 서서 햇살에 빛나는 도시를 온화하고 자신감 넘치는 눈빛으로 내려다봄. 카메라가 창공으로 멀어지며 찬란한 낮의 도시 전체가 한눈에 펼쳐짐.

[조명 & 스타일]
- 찬란한 낮의 직사광과 유리 빌딩에 반사되는 골든 선 플레어, 장엄하고 희망찬 시네마틱 톤앤매너. 시네마틱 실사, 4K 해상도, 24fps.

[현장 사운드 & SFX (내레이션 제외)]
- 사운드: 웅장하고 감동적인 풀 오케스트라 피날레 클라이맥스 선율, 활기찬 낮 도심의 아련한 원경 앰비언스. 내레이션 없음.`,

      omni_en: `[Omni Flash 1.1 | 16:9 | 10s | 4K 24fps]
[Primary Visual Reference: Storyboard Conti Shot]
★ Reference Frame:
- [Shot 17: The Confident Leader] & [Shot 18: Cityscape Pullback]
- Low-angle heroic view of CEO at window, pulling back to wide aerial daytime city.

[Character Consistency Lock]
- Female CEO (@Female_CEO): 50-year-old Korean female executive, low-bun hair, gold eyeglasses, pearl earrings, dark navy suit. Confident and visionary.

[Secondary Asset References]
- @Cityscape: Sprawling daytime metropolis of glass skyscrapers under sunny sky.

[Clip Continuity]
- Grand Finale: Connects from [Clip 09], pulls back from window into sky. Bookend to Clip 01.

[Camera & Action]
- Camera: Dramatic Pullback from Office Window to Epic City Skyline.
- Action: CEO stands tall by the glass window with a visionary smile. Camera pulls back into the bright sky, revealing the sunlit city.

[Lighting & Tone]
- Sparkling daylight, golden sun flares on glass facades. 4K 24fps.

[Native Audio & Ambience (No Narration)]
- Sound: Uplifting orchestral crescendo, distant city breeze. No narration.`,

      omni_kr: `[Omni Flash 1.1 | 16:9 | 10초 | 4K 24fps]
[1순위 메인 시각 참조: 스토리보드 콘티 샷]
★ 기준 프레임:
- [Shot 17: The Confident Leader] & [Shot 18: Cityscape Pullback]
- 창가에 선 CEO의 당당한 모습과 낮 대도시 상공으로의 에어리얼 풀백.

[캐릭터 일관성 락 (Character Consistency Lock)]
- 여성 CEO (@Female_CEO): 50대 한국인 여성 리더, 로우번, 골드 안경, 진주 귀걸이, 다크 네이비 테일러드 수트.

[2순위 보조 참조: 에셋]
- @Cityscape: 햇살에 반짝이는 고층 빌딩 숲.

[클립 전후 시각 연결성 (Continuity)]
- [클립 09]에서 창가로 이동 ➔ 대도시 상공으로 풀백하며 피날레 완결.

[시네마틱 카메라 & 피사체 연출]
- 카메라: 창가 CEO 로우앵글 ➔ 대도시 상공 드라마틱 에어리얼 풀백.
- 피사체 액션: 창가에서 활기찬 낮의 도시를 내려다보는 당당한 CEO의 미소.

[조명 & 색조]
- 눈부신 햇살과 골든 선 플레어. 시네마틱 4K 24fps.

[네이티브 오디오 & 앰비언스 (내레이션 제외)]
- 사운드: 웅장한 오케스트라 클라이맥스, 도시 앰비언스. 내레이션 없음.`
    }
  }
];

// Write to js/clip-prompts-data.js
const clipDataOutput = '/**\n * Video Prompt Data for 10 Clips (Seedance 2.0 & Omni Flash)\n * Generated with sequence continuity and character consistency\n */\nwindow.CLIP_PROMPTS_DATA = ' + JSON.stringify(allClipsData, null, 2) + ';\n';
fs.writeFileSync('js/clip-prompts-data.js', clipDataOutput, 'utf8');
console.log('Successfully written all 10 clips to js/clip-prompts-data.js');

// Write to scripts/generate_prompts.js
const generatePromptsContent = `const fs = require('fs');
const path = require('path');

const clipsData = ${JSON.stringify(allClipsData, null, 2)};

fs.writeFileSync(
  path.join(__dirname, '../js/clip-prompts-data.js'),
  '/**\\n * Video Prompt Data for 10 Clips (Seedance 2.0 & Omni Flash)\\n */\\nwindow.CLIP_PROMPTS_DATA = ' + JSON.stringify(clipsData, null, 2) + ';\\n',
  'utf8'
);
console.log('Successfully generated js/clip-prompts-data.js with ' + clipsData.length + ' clips.');
`;
fs.writeFileSync('scripts/generate_prompts.js', generatePromptsContent, 'utf8');
console.log('Successfully written scripts/generate_prompts.js');
