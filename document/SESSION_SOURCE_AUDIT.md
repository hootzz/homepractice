# Session Source Audit — Session Bundle content policy

2026-10-05. 이 감사는 **어떤 practice를 어느 SessionPracticeBundle에 넣을지 사전에 판단하는 콘텐츠 감사**다. 사용자별 action 검증이 아니다. 런타임은 Session Complete → 확정 Bundle → Regular 누적 → S8 직접 선택 Kit이다. 회기 완료는 진행 상태이며 학습 성공·치료효과의 증거가 아니다.

MindForest는 전체 MBCT-L home curriculum 디지털화가 아니라 게임에서 교육되는 경험의 일상 일반화 layer다. 정식 연구 프로토콜의 추가 연습은 별도 layer에서 관리한다.

## 1. 자료 계보와 확인 한계

아래 A/B는 이전 감사에서 읽은 자료이며 최신 V3.3 0903 최종 시나리오로 대체해서 부르지 않는다. 기존 locator는 해당 감사 기록을 보존한 것이며 이번에 재추출했다고 주장하지 않는다.

Sources read:

- **A**: `D:/2026/[03] 콘진원 MIndTrekking/MindWalking 1-8회기 전체 시나리오 및 액션.pdf`, 7 pages. Page citations below refer to PDF pages.
- **B**: `C:/Users/wjqwj/Downloads/마인드워킹(MindWalking) 1~8회기 고도화 시나리오 및 연출 스크립트북 V3_세계관업데이트.docx`. Body says `7/17(금) 세계관·보상 루프 업데이트 기준`; paragraph numbers below count every `w:p` in `word/document.xml`, including empty paragraphs and table cells, starting at 1. Version label/date alone does not establish deployment or precedence.
- **C**: `document/02_CONTENT_MODEL.md` and `document/README.md`, secondary Home Practice specifications. C must not establish game-learning provenance.


- **D / 구현:** `C:/Users/wjqwj/gDTi/gDTi` Unity 소스. `D:/2026/gDTi`는 배포물. Unity 6000.3.9f1, 빌드 설정의 Session_01–08 enabled 확인. 파일/씬 정적 조사만 수행; 플레이 검증 없음. 상세 파일·행·연결은 [IMPLEMENTED_PRACTICE_AUDIT.md](./IMPLEMENTED_PRACTICE_AUDIT.md).
- **E / 최신 시나리오:** Google Drive V3.3 0903 최종 원문은 이번 감사에서 미확보. A/B를 대신 최신본으로 간주하지 않는다.
- **F / 정식 한국어 책·audio:** 로컬 `공유 금지_삶과 함께하는 마음챙김.pdf`(335쪽), p2 학지사 2026 한국어판, Willem Kuyken / 윤성민·최정심 번역 확인. 바디 스캔(p56), 마음챙김 걷기(p80), 호흡 공간법(p83), 3단계 호흡 공간 다시 마주하기(p102), 50 대 50 실천(p89–90) 확인. 이는 지정 Practice Book과 동일 판본·8회기 과제표라는 확인을 뜻하지 않는다. [KOREAN_MBCT_AUDIO_MAPPING.md](./KOREAN_MBCT_AUDIO_MAPPING.md)의 원문 확인 상태·판본·페이지·이용 조건을 기준으로 한다. 공식 audio 목록만으로 교재 과제 구조나 게임 대응이 증명되지 않는다.

## 2. claim 경계

1. source-supported: 각 자료의 장면·행동·문구, 코드와 씬 연결. 정적 코드 존재와 실제 도달성/배포 일치는 다르다.
2. design proposal: 보존 기능 해석, friendly naming, WeeklyTask 일반화, Bundle 분류. 원자료의 효과 입증으로 표현하지 않는다.
3. content publication decision: 정식 Practice Book 대응과 실제 구현/교육의 교집합을 검토해 Regular를 승인한다. 동일 개념 이름만으로 승인하지 않는다.
4. runtime progression: 승인된 Bundle이 있으면 해당 회기 완료만으로 연다. 감사 상태·action 데이터는 개인별 gate 함수의 입력이 아니다.

`confirmed / scenario_only / pending / excluded`는 감사 claim 상태다. 정적 구현 확인, 배포 확인, 정식 교재 대응 확인을 구분한다. 후보 보류는 출판 단계의 결정이며 사용자에게 증빙을 요구하는 절차가 아니다.

## 3. 실제 구현을 반영한 회기별 판단

| Session | 이번 정적 조사 결과 | 이전 시나리오와 차이 / 근거 경계 | Home 정책 |
|---|---|---|---|
| S1 | 실제 director는 호두 겉/속 관찰 후 먹기 | A/B 도토리와 다름. source audit의 아래 도토리 표는 역사 자료 | 게임 일반화 WeeklyTask 근거. 정식 먹기 연습 대응 확인 전 Regular 확정 금지 |
| S2 | 기다림 흐름과 body scan 경로 존재; scene bodyScanSequence/VoiceClip null, silentHold 3초 | 자동검색/prefab 주입 미확인. 완료 callback은 교육 안내 증거 아님 | 기다림 과제 후보; Body Scan 교육 pending. 3초를 home dosage로 쓰지 않음 |
| S3 | 걷기/발 감각 복귀와 현재경험→호흡→몸/주변 3단계 코드 | binary 씬 class 참조는 있으나 실제 활성/도달성 미검증 | 정식 걷기/호흡공간 대응 후보. 이전 ‘시나리오만 있음’ 주장은 업데이트 |
| S4 | 회피/열매, 몸 라벨링, responsive breathing controller, rechoice 씬 연결 | A/B 중 하나와 동일하다고 단정하지 않음 | 반응 흐름 WeeklyTask; 호흡공간 정식 대응 검토. 기존 연습 중복 추가 금지 |
| S5 | useRevisedStoryFlow=1; 수문→비/물웅덩이→몸 anchor | 손감지/키 hold 3초를 formal allowing으로 해석 금지 | 게임 고유 감각 일반화 WeeklyTask. formal Regular 자동 승격 금지 |
| S6 | 사건/상태/해석 세 칸과 생각구름 | B의 확인/추론 기억카드 버전과 혼합 금지 | 현재 구현에 맞는 사건 구분 WeeklyTask |
| S7 | 활동 영향(상황따름/모름/건너뛰기 포함), 행동 계획 | 활동 분류가 formal meditation을 추가하지 않음 | 자기돌봄 WeeklyTask, Kit 저장과 구분 |
| S8 | 회고/현실연결/Kit; EnsureAllPracticeData가 누락 S1–7 이름 자동생성 | fallback은 앞회기 교육 확인 manifest가 아님 | 새 Regular 없음. Home Kit은 완료 Bundle의 Repertoire subset만 |

파일·씬·라인은 구현 감사의 회기별 표를 참조한다. 위 모든 행의 플레이 검증은 not_run. 게임 action을 참가자별로 증명해야 한다는 의미가 아니다.

## 4. 이전 A/B의 보존 기능 근거 — 역사적 출처 비교

아래 표는 A/B가 무엇을 서술했는지 보존한다. 실제 활성 장면은 §3/D가 우선이며 최신 E와 충돌하면 추가 검토한다. 표의 기능·경계는 source에 기반한 **설계 해석**이다.

| Session | Source-supported action claim | Proposed preserved function | Fidelity boundary |
|---|---|---|---|
| S1 | Acorn pause/sensory observation (A p1; B ¶19–25) | Interrupt automatic action; sensory curiosity toward a familiar object | Not correct sensation or required calmness |
| S2 | Waiting reflection and separate scan (A pp1–2; B ¶455–473) | Shift thought-centred processing toward direct body experience; distinguish thought/emotion/body | Not positive reframing; waiting does not establish scan exposure |
| S3 | Walk/notice diversion/return to feet; B three-stage space (A p3; B ¶523–554) | Notice wandering and return without failure judgement; B additionally preserves all three stages | Returning attention does not mean never wandering |
| S4 | A overeating reflection; B urge/relief/rebound/choice (A pp3–4; B ¶40–46) | Notice discomfort→urge→reaction; open a moment for choice | Not impulse elimination or behaviour morality |
| S5 | A rain/body/breath; B anchor/difficulty movement (A pp4–5; B ¶712–746) | Notice immediate removal reaction; contact within capacity and return to anchor when needed | Allowing is not enduring pain, forcing liking or remaining in harm |
| S6 | A event/state/interpretation; B confirmed/experience/inference/unknown (A p5; B ¶54–60) | Separate event/state/interpretation or fact/inference; step back from thought-as-fact | Decentering is not disputation, deletion or forced positive thought |
| S7 | Activity impact classification/action choice (A pp5–6; B ¶950–966) | Notice activity effects; choose self-care intentionally | Not fixed good/bad activities or productivity scoring |
| S8 | Revisit prior practice, real situations and personal value (A pp6–7; B ¶998–1056) | Link already encountered practices to real-life cues; move toward self-directed continuity | No new library/technique or evaluation of sustained success |

These functions describe the home translation target. Differences between A/B still require version-specific transfer review; shared conceptual labels do not establish procedural equivalence.


## 5. 최종 선정 규칙

Regular = 정식 한국어 MBCT Practice ∩ 게임 실제 구현·교육. 게임의 pause/수문/생각구름/사건 구분/자기돌봄 선택을 단지 반복 가능하다는 이유로 새 Regular로 만들지 않는다. 게임 고유 경험은 WeeklyTask로 일반화한다. 승인한 Regular와 WeeklyTask는 해당 회기 완료 시 함께 열린다. 과거 Regular는 계속 유지되고 S8에서 사용자가 선택한 subset만 Kit이 된다.

50:50은 기획 서술과 제한된 구현 검색만 있으므로 pending. 감사·무작위 친절·스트레칭·마음챙김 움직임·일반 좌식명상·즐거운 경험 calendar는 현재 교육 근거 없이 추가하지 않는다. S8 자동 채움이나 audio asset 존재로 이 제외를 뒤집지 않는다.

시간/빈도/audio는 game duration, home duration, frequency, audio requirement로 분리한다. 근거 없으면 unspecified. Body Scan을 1–5분으로 일괄 축소하지 않는다. 한국어 정식 명칭·과제 구조·공식 audio·권리는 F에서 개별 대응한다. optional 기록은 수행·학습·adherence 측정이 아니다.

## 6. 문서 일관성 self-audit

- YES: action/implementation evidence는 Bundle의 사전 content audit에만 사용.
- YES: 런타임은 회기 완료 기준이며 action receipt/연구자 인증 없음.
- YES: Regular/WeeklyTask, Repertoire/S8 Kit 분리.
- YES: 실제 구현과 이전 A/B의 차이, 코드 존재와 플레이 검증의 차이를 명시.
- YES: 보존 기능과 fidelity boundary 유지; 임상효과 입증으로 과장하지 않음.
- YES: 최신 시나리오와 지정 Practice Book 동일판 여부의 미확인을 추정으로 메우지 않음; 과거 record 보존 정책 유지.

## Unresolved checklist

- [ ] authoritative deployed build와 조사 Unity 소스 일치.
- [ ] 최신 V3.3 0903 Google Drive 원문·수정일·회기별 locator.
- [ ] 정식 한국어 Practice Book 판본·페이지와 Regular 절차 대응.
- [ ] S2 실제 body scan 안내 주입/음성/교육 흐름.
- [ ] S3 걷기/호흡공간의 실제 활성·도달성; 50:50 구현 여부.
- [ ] S4–6 authoritative scene과 home steps의 일치.
- [ ] session-complete 전달 방식. 참가자 action별 노출 확인은 runtime 요구사항이 아님.
- [ ] Body Scan home dosage/frequency, audio 안내·언어·권리 대응.
- [ ] formal MBCT curriculum과 MindForest generalization layer의 연구 프로토콜 관계.
