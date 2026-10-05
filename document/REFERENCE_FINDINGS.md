# Reference findings — mindfulness UX patterns for Home Practice

2026-10-06. 목적은 복제가 아니라 “설명을 줄이고 지금 할 행동을 분명히 하는” 상호작용 패턴만 추리는 것이다. 무엇을 직접 확인했고 무엇을 2차 자료로만 봤는지 구분한다.

## 확인 범위

| Reference | 확인 방법 | 한계 |
|---|---|---|
| Oxford Mindfulness — Free meditations | `courses.oxfordmindfulness.org/events-and-resources`, Breathing Space(Claire Kelly)·Mindful Walking(Sarah Pace) 개별 페이지 직접 조회 | 페이지 HTML 기준. 오디오 플레이어·파일 권리 문구는 개별 페이지에서 확인되지 않음 |
| Headspace | `headspace.com/meditation`, `/meditation/meditation-for-beginners` 직접 조회 | 마케팅 웹 페이지. 앱 내부 화면은 보지 못함 |
| Calm | 웹 페이지는 HTTP 403. 앱 스토어·UI 분석 사이트 검색 결과(2차 자료)만 확인 | 실제 앱 화면 미확인 — 아래 Calm 항목은 2차 자료 기반 |

## 관찰한 패턴

**Oxford** — 연습 이름이 곧 제목이다(“Breathing Space by Claire Kelly”, “Mindful walking by Sarah Pace”). 설명은 한두 문장(Breathing Space ≈ 80단어, Walking은 한 문장). 각 항목은 “Recorded practice”로 표시되어 녹음이 연습의 진입 수단이다. 시간 표시 없음. 개별 페이지에 사용 권리 문구는 없다(사이트 일반 약관만).

**Headspace** — 연습 제목 2–4단어(“Body Scan”, “Unwind”), 한 문장 보조문, 짧은 1분 mini-meditation을 먼저 제시해 긴 설명 전에 시작 가능. 톤은 허용적(“Be kind to your mind”). 반면 같은 페이지에 “Try for free”가 반복되고 효과 주장(benefit marketing)이 설명보다 앞선다.

**Calm (2차 자료)** — 장면(scene)+사운드스케이프가 화면 배경 전체를 지배하고, 플레이어는 가운데 재생·10초 이동 정도로 단순. 동시에 Daily Streak·Mindful Minutes 추적을 제공한다.

## MindForest에 가져온 것

| 패턴 | 적용 |
|---|---|
| 이름이 곧 제목 (Oxford, Headspace) | 회기 제목은 게임 장면 명사(호두 관찰, 발걸음…), 정식 연습은 한국어 정식 명칭(마음챙김 걷기, 3단계 호흡 공간). 설명은 한 문장 |
| 화면당 primary action 하나 (Headspace) | REMEMBER: `오늘 해보기` 하나. TRY: 실제 생활의 행동(버튼 없음, 선택칩만). REFLECT: `기록 저장` |
| 설명 전에 바로 시작 (Headspace mini) | 첫 화면에서 지시문·폼·목록을 모두 숨기고 장면+한 문장+CTA만 |
| 장면 하나가 분위기를 만든다 (Calm) | 회기마다 실제 게임 캡처 1장을 크게, 오늘 해보기 단계에서는 장면이 얇은 띠로 줄어들어 남는다 |
| 정식 연습에서 녹음 = 진입 수단 (Oxford) | 검증된 한국어 음원이 있으면 `안내와 함께 해보기 ▶`가 CTA 자체가 되도록 구조화(현재 없음 → 글 안내). 영어 녹음은 외부 자료 링크로만 |
| 전문 내용과 사용 경험 분리 (Oxford) | 정식 명칭 출처(『삶과 함께하는 마음챙김』 쪽수)는 작은 메타 한 줄로만 |

## 가져오지 않은 것

- streak, mindful minutes, 달력 완료, 통계, 성취 (Calm) — 정책상 금지.
- 반복 구독 CTA, 효과·이득 마케팅 문구 (Headspace).
- 일반 catalog/목록형 정보구조, MindForest에 없는 연습(Sitting 등) (Oxford).
- 각 서비스의 캐릭터·일러스트 스타일. MindForest는 실제 게임 장면과 MaruBuri 명조로 정체성을 만든다.
- 오디오 파일의 앱 내 임베드/재호스팅 — Oxford 개별 페이지에 사용 권리 문구가 없어 링크만 둔다.

## MindForest의 차이점

“게임에서 내가 직접 지나온 장면이 오늘 현실에서 다시 해볼 마음챙김 cue가 된다.” 위 세 서비스 어디에도 없는 것은 **개인이 이미 경험한 장면**이라는 기억 단서다. 그래서 첫 화면의 주인공은 설명이 아니라 그 장면과 `숲에서 해본 걸, 오늘 한 번 더.` 한 줄이다.

Sources: [Oxford free resources](https://courses.oxfordmindfulness.org/events-and-resources) · [Oxford Breathing Space](https://courses.oxfordmindfulness.org/free-meditations/example-recorded-practise-4) · [Oxford Mindful walking](https://courses.oxfordmindfulness.org/free-meditations/mindful-walking-by-sarah-pace) · [Headspace meditation](https://www.headspace.com/meditation) · [Headspace beginners](https://www.headspace.com/meditation/meditation-for-beginners) · Calm 2차 자료: [App Store](https://apps.apple.com/us/app/calm/id571800810), [Calm UI Breakdown](https://screensdesign.com/showcase/calm)
