# Scene assets — Home Practice 대표 장면

2026-10-06. 회기당 대표 이미지 1장(16:9). 실제 게임 캡처가 있으면 우선 사용하고, 없으면 `src/components/SceneSketch.tsx` 선화를 fallback으로 쓴다. fallback이라는 표시는 사용자 화면에 두지 않고 이 문서에만 남긴다.

모든 캡처는 HUD(Control Key / Esc Key 아이콘)를 잘라내고 1200px 이하 JPEG(q80)로 저장했다. 실제 참여자 얼굴·웹캠 inset이 있는 캡처(예: `스크린샷 2026-08-12 172235.png`, `2026-08-09 184645.png`)는 사용하지 않았다.

| 파일 | 원본 | 장면 | 상태 |
|---|---|---|---|
| `public/scenes/s1.jpg` | `C:/Users/wjqwj/Pictures/Screenshots/스크린샷 2026-08-12 165749.png` | 탁자 위 호두 더미와 다람쥐(생각풍선 제외 crop) | 사용 |
| `public/scenes/s2.jpg` | `C:/Users/wjqwj/gDTi/tmp/playthrough-audit/game-20261004-174623.png` (1008×518) | 오두막에서 거북이를 기다리는 장면, 생각풍선 포함 | **약함** — 거북이가 보이지 않고 저해상도, 풍선 글씨가 모바일에서 읽히지 않음. 재캡처 권장 |
| `public/scenes/s3.jpg` | `.../Screenshots/스크린샷 2026-08-13 023734.png` | 꽃길 흙길 위 사슴과 주인공 | 사용 |
| — (S4) | 게임플레이 캡처 없음 | 곰 / 가시 / 잠잠열매 | **누락** — `berries` 선화 fallback. 빌드에서 재캡처 필요 |
| `public/scenes/s5.jpg` | `C:/Users/wjqwj/gDTi/gDTi/VisualQA/S05VisualProbe/05-frog-arrival.png` (1600×900) | 젖은 숲길 돌 위 개구리와 비구름(상단 자막 제외 crop) | 사용 — VisualQA probe 출처, 개구리가 어둡게 보임 |
| `public/scenes/s6.jpg` | `.../Screenshots/스크린샷 2026-08-12 233841.png` | 노을 언덕 위 생각구름 "마음이 좀 답답한 것 같아" | 사용 — 독수리는 보이지 않음 |
| — (S7) | 강아지 대화 캡처는 타이틀 키아트 배경 | 베이스캠프 | **누락** — `activity_cards` 선화 fallback |
| `public/scenes/s8.jpg` | `.../Screenshots/스크린샷 2026-08-13 030423.png` | 밤의 꽃밭·꿀단지·꿀벌 | 사용 |

Regular `walking_return`은 S3 이미지를 공유한다. `breathing_space`는 모래시계 선화(넓게→모으기→넓게)를 쓴다.

## 남은 일

- S4(곰·가시·잠잠열매), S7(강아지·베이스캠프) 게임플레이 캡처, S2 거북이가 보이는 기다림 캡처를 `D:/2026/gDTi/gDTi2026.exe`에서 확보.
- 연구 배포 전 캡처 사용 범위(내부 연구 앱 내 표시) 확인.
- 교체 방법: `public/scenes/sN.jpg`(16:9) 추가 후 `src/content/presentation.ts`의 해당 `scene.image`에 `{src,width,height}`를 넣는다. 테스트가 파일 존재와 16:9 비율을 확인한다.
