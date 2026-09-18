const fs = require('fs');

const fullPromptsData = [
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
  }
];

console.log('Full prompts prepared for Clip 1 and Clip 2 test');
