# Home Practice Interaction Pattern

> **2026-10-06 갱신:** 이 문서의 4블록·stepper·회기별 다중 인터랙션 설계는 [REDESIGN §4a](./HOME_PRACTICE_REDESIGN.md) 단순화 결정(장면 → 오늘 해보기 → 선택 기록, 조작 최대 1개, 명사형 제목)으로 대체되었다. 아래는 이력 기록이다.


2026-10-06 · 구현 전달용 UX 명세. 앱 구현·브라우저 검증 완료 보고가 아니다.

## 1. 적용 범위

이 문서는 승인된 Home Practice의 **표현 계층**만 정의한다. 어떤 Practice를 출판할지, Session Complete → Bundle 접근, Regular 누적, S8 완료 후 직접 Kit 선택, 선택 기록 정책은 기존 문서를 그대로 따른다. `HOME_PRACTICE_REDESIGN.md`, `HOME_PRACTICE_DATA_SPEC.md`가 우선한다. `src/content/workbook.ts`의 현재 8개 WeeklyTask와 2개 Regular는 검토용 demo이며, 이 UX 명세가 actual 출판 승인이나 새 연습 도입을 뜻하지 않는다.

장면·NPC·캡처는 `SESSION_SOURCE_AUDIT.md`와 `IMPLEMENTED_PRACTICE_AUDIT.md`의 버전 경계를 따른다. 최신 캡처가 없으면 단순 감각 cue 도식을 사용한다. 도식을 실제 게임 캡처라고 부르거나 NPC 대사를 창작하지 않는다. `src/content/sessions.ts`의 legacy catalog·시간·Kit 개수 제한을 되살리지 않는다.

## 2. 공통 네 블록

| 블록 | 역할과 화면 내용 | 사용자 조작 |
|---|---|---|
| 장면 기억 cue | 작은 장면 이미지 또는 도식, 장면 이름, 1–2문장. 어디서 출발한 연습인지 연결 | 이미지 설명 열기 또는 바로 다음으로. 기억 여부 질문·인증 없음 |
| 작은 조작 | 이번 경험의 한 측면을 선택하거나 펼쳐 보는 한 종류의 조작 | 모두 선택 사항. 선택 없이 `안내 펼치기` 가능 |
| 단계별 practice | 3–5개 안내를 한 단계씩 펼침. 의미 있는 단계 제목과 짧은 본문 | `이전 안내`, `다음 안내`, `전체 안내 보기`, `여기서 마치기`. 단계 번호는 문서 순서이며 수행률이 아님 |
| 선택 reflection | 기존 질문 중 1–2개를 먼저 표시. `기록은 선택이에요` 안내 | `경험 남기기`로 기존 기록 화면 이동, `기록 없이 돌아가기`. 질문 읽기만으로 Entry 미생성 |

한 화면의 가장 강한 CTA는 하나다. cue에서 practice로 이동할 때 본문이 조용히 펼쳐지며 축하·성공 문구를 표시하지 않는다. 단계 버튼을 눌렀다고 실제 수행했다고 추정하지 않는다. 마지막 단계에도 완료율·완료 체크를 만들지 않는다.

## 3. 회기별 조작의 차이

아래 선택은 안내를 읽는 방법이며 치료 반응을 분류하는 검사나 새 Practice가 아니다. 모두 키보드와 단일 탭으로 가능하며 드래그·hold를 필수로 만들지 않는다.

| Content key | 기억 cue | 작은 조작 | 보존 경계 |
|---|---|---|---|
| week_1 | 호두 표면과 안의 알맹이 | `겉 살펴보기 / 안 살펴보기` 도식 전환 | 정답 감각·먹기 수행 확인 없음. 일상 행동을 고르는 기존 과제로 이어짐 |
| week_2 | 기다리는 동안의 몸·생각·감정 | `몸 / 생각 / 감정` 안내 패널 펼치기 | Body Scan을 새로 도입하지 않음. 신체 위치로 감정 진단 금지 |
| week_3 | 숲길에서 발이 닿는 감각 | `발이 닿는 느낌` 설명 펼치기 | 걷는 중 화면 조작 요구 금지. 안내를 먼저 보고 화면을 내려놓을 수 있음 |
| week_4 | 불편함 이후 이어진 반응의 흐름 | `불편함 / 하고 싶은 마음 / 행동 / 그 뒤` 연결된 칸 열기 | 정렬 퍼즐·옳은 행동 선택 아님. Recognize에 머무르며 허용·호흡·재선택 추가 금지 |
| week_5 | 비와 몸의 감각 | `손 / 발` 감각 안내 선택; `지금 멈추기` 항상 접근 가능 | 견디기 시간·hold·감정 감소 측정 없음. 가능한 만큼 접촉하고 anchor 복귀·중단 허용 |
| week_6 | 사건·상태·해석 세 칸 | 각 칸의 안내를 순서 없이 펼치기 | 사실/추론 정답 맞히기·생각 삭제 금지. 이미 접근 가능한 호흡공간만 재사용 |
| week_7 | 오늘의 활동과 영향 | `채워 줌 / 지치게 함 / 상황에 따라 다름 / 잘 모르겠음` 중 원하면 선택 | 선택하지 않고 진행 가능. 좋음/나쁨 색상·생산성 점수·자동 추천 없음 |
| week_8 | 지금까지 열린 Regular 카드 | 기존 Kit 화면에서 직접 선택·수정·제거 | S8 완료 이후만. WeeklyTask·외부 catalog 제외. 꽃 수집·빈 슬롯·개수 강제 없음 |

S4–6 상세 배경은 현재 콘텐츠 TODO가 해소되기 전 단정하지 않는다. S4 곰/열매/안개와 다른 버전의 고슴도치 장면, S6 사건·상태·해석과 확인/추론 기억카드를 섞지 않는다. S8의 게임 꽃 회고를 웹의 수집 보상으로 번역하지 않는다.

Regular의 표현은 기존 `walking_return`, `breathing_space`를 유지한다. 걷기는 발·다리 감각을 설명하는 펼침 패널을 쓸 수 있다. 호흡공간은 **현재 경험 살피기 → 자연스러운 호흡에 모으기 → 몸과 주변으로 넓히기** 세 단계 모두 제공한다. 호흡 박자에 맞추는 애니메이션, 호흡 hold, 타이머를 추가하지 않는다. 안내를 나눠 보여주는 것은 연습 시간을 축소하는 근거가 아니다.

## 4. 최소 presentation 데이터 모델

아래는 새 런타임 접근 모델이 아니라 구현 제안이다. 기존 manifest에서 접근 가능한 content를 먼저 찾고 이 mapping을 조회한다. 표현 데이터가 없으면 기존 텍스트 안내로 동작한다. bundle/practice ID·도입 회기·Progress를 변경하지 않는다.

```ts
type WeeklyKey = `week_${1|2|3|4|5|6|7|8}`;
type InteractionKind =
  | 'surface_switch' | 'perspective_panels' | 'sensory_reveal'
  | 'reaction_panels' | 'anchor_choice' | 'context_panels'
  | 'impact_choice' | 'existing_kit';
interface PracticePresentation {
  scene: {
    caption: string;
    alt: string;
    assetRef?: string; // 확인된 local asset만. 없으면 비재현 도식
    sourceRef: string; // 편집 근거; 사용자 화면에 기술 메타데이터 노출 안 함
  };
  interaction: {
    kind: InteractionKind;
    prompt: string;
    options?: { id: string; label: string; guidance: string }[];
  };
  stepTitles: string[]; // 기존 content.steps와 1:1. 내용 변경 시 편집 검토
  reflectionKeys: string[]; // 기존 recordSchemaId의 유효 key 1–2개
}
type WeeklyPresentation = Partial<Record<WeeklyKey, PracticePresentation>>;
interface PresentationState {
  openStepIndex: number;
  showAllSteps: boolean;
  selectedOptionId?: string;
  expandedPanelIds: string[];
}
```

`PresentationState`는 페이지 메모리의 일시 상태다. localStorage·Entry·analytics에 자동 저장하지 않는다. 선택을 했다는 이유로 Progress, Bundle, Repertoire, Kit, record를 갱신하지 않는다. 새 receipt·수행 timestamp·성공 상태 필드를 만들지 않는다. 서버·LLM 해석 없음.

`existing_kit`은 transient 선택을 자동 저장하는 예외가 아니다. 기존 Kit 화면으로 연결하여 사용자가 명시적으로 저장한 선택만 기존 Kit 모델에 반영한다. Kit의 `cue / situation / personalReason`은 모두 optional이고 제거해도 Repertoire는 유지한다. 게임 Kit과의 동기화 계약이 없으면 `BLOCKED_GAME_KIT_SYNC`를 유지한다.

## 5. 상태 전이와 오류

| 사건 | 동작 | 저장·접근 영향 |
|---|---|---|
| cue 열기 / 작은 조작 선택 | 해당 안내만 표시. 재선택 가능 | 없음 |
| 조작 건너뛰기 | 첫 practice 안내 표시 | 없음 |
| 다음 / 이전 안내 | 안내 제목으로 focus 이동; 이전 안내 다시 읽기 가능 | 없음 |
| 전체 안내 보기 | 모든 안내를 문서 순서로 표시 | 없음 |
| 여기서 마치기 | 원래 회기 또는 연습 목록으로 이동 | 완료 신호·record 생성 없음 |
| 경험 남기기 | 기존 접근 가능한 practice/task 문맥으로 기록 화면 이동 | 명시적 저장 전 Entry 없음 |
| 빈 기록 저장 | 기존 정책대로 Entry 미생성 | 접근 유지 |
| 기록 저장 오류 | 오류를 알리고 입력·선택 보존; 재시도 가능 | 기존 저장값 유지 |
| 이미지 오류 | 동일 caption/alt와 간단한 도식으로 대체 | practice 진행 가능 |
| 오디오 없음 / 실패 | 텍스트 안내 유지, 실패 시 재시도 선택 | 접근·단계·기록에 영향 없음 |
| 출판되지 않은 ID / 미완료 회기 | 기존 잠금·없는 콘텐츠 화면 사용 | URL 열기로 unlock 없음 |

초기화·앱 종료 시 일시적인 조작 선택은 사라져도 된다. 이 선택은 기록으로 보존된다고 표시하지 않는다. 사용자가 기록 폼에 직접 입력한 내용은 UI 오류·저장 실패 때 유지한다. 화면 이탈 시 초안 보호는 기존 기록 폼의 계약을 따르며 이번 표현 계층이 별도 자동 저장을 만들지 않는다.

## 6. 선택 reflection과 기존 기록 보존

| 회기 | 처음 제시할 기존 질문 key | 원칙 |
|---|---|---|
| S1 | sensory: noticed, moment | 기존 질문 문구 우선 |
| S2 | body: body, thought | emotion 질문은 기존 기록 폼에서 추가로 펼칠 수 있음 |
| S3 | attention: attention_went, return_anchor | 주의 이탈을 실패로 부르지 않음 |
| S4 | reactivity_v3: impulse, action | 행동 수정 요구 없이 경험 기록 |
| S5 | allowing_v3: noticed, anchor | 버틴 시간·개선 여부 묻지 않음 |
| S6 | thought_v3: interpretation, helpful | 실제 일/상태 등 나머지 질문은 기존 폼에서 유지 |
| S7 | care: effect, small_action | 모름·상황따름 허용 |
| S8 | integration: cue, reason | Kit 저장과 reflection 저장은 별개 |

1–2개를 먼저 보인다는 것은 기존 schema의 질문·응답을 삭제한다는 뜻이 아니다. question key, record ID, 날짜, 원문 답변, questionSnapshot, practiceNameSnapshot을 보존한다. 기존 답변을 새 질문으로 재해석하거나 합치지 않는다. `잘 모르겠어요`는 유효 응답이며 빈 값과 다르다.

PDF는 기존 exporter 계약을 유지한다. 생성일, Session 1–8 실제 기록, 날짜/연습·과제/질문/원문 답변, 마지막 명시적 Kit만 포함한다. 조작 draft·열어 본 단계·패널 상태를 PDF에 추가하지 않는다. legacy 기록과 알 수 없는 이전 질문은 삭제하지 않는다. 기존 이미지형 PDF의 접근성 한계와 실제 다운로드 시각 검증 미완료 상태는 `PDF_EXPORT_VERIFICATION.md`를 따른다.

## 7. 모바일·motion·접근성

- max-width 약 480px, 390px에서 좌우 스크롤 없이 한 열. warm off-white, near-black, 절제된 forest green, 얇은 구분선. 도식/작은 cue가 텍스트를 보조하며 stock nature hero·대시보드 금지.
- 본문 최소 16px, 조작 대상 최소 44×44px. 한글은 단어 단위 줄바꿈을 기본으로 하되 긴 입력·URL은 overflow-wrap으로 처리한다. 사용자 원문 공백/줄바꿈을 보존한다.
- hover/pressed scale 0.98–1.01, transition 150–250ms. 한 번의 짧은 펼침/fade만 허용한다. 반복 pulse·보상 이동·시선 강탈 금지.
- `prefers-reduced-motion: reduce`에서는 scale/이동/자동 fade를 제거한다. 내용·기능은 동일하게 즉시 제공한다.
- 실제 button/details/input을 사용하고 label 연결, visible focus, `aria-expanded`/`aria-controls`를 제공한다. 선택 상태는 테두리와 텍스트로도 표현한다. 이미지 내 텍스트에만 의미를 맡기지 않는다.
- 다음/이전으로 내용이 교체되면 새 단계 제목에 programmatic focus를 둔다. 패널 토글은 원래 버튼 focus를 유지한다. 전체 화면을 매번 live announcement하지 않는다. 오류는 짧은 alert, 저장 상태는 polite status로 알린다.
- drag·정밀 포인팅·타이밍·hold만으로 가능한 기능을 만들지 않는다. 브라우저 zoom 200%와 키보드 순서를 확인한다. 걷기 중 터치·주시를 요구하지 않는다.

## 8. 허용·금지

허용: 작은 카드의 눌림 상태, 패널 펼치기, 단계 안내의 순차 표시, optional 질문, 검증된 audio의 mini-player, loading/empty/error 상태, 명시적 Kit 선택의 짧은 fade.

금지: 점수·뱃지·랭크·XP·streak·완료율·percentage·progress bar, 성공/실패/정답/오답, 획득/클리어, confetti, 빈 슬롯 수집, 감정 변화에 따른 보상, 시간 압박, 자동 감정 분석, 조작·기록에 근거한 추천·unlock. 사용자가 멈추거나 건너뛰어도 잃는 것은 없다.

## 9. 향후 구현 인수 확인

아래는 **실행할 검사 목록**이며 이번 문서 작성에서 통과했다고 주장하지 않는다.

- [ ] presentation mapping 유무와 무관하게 동일 Session Complete/Bundle 접근 결과.
- [ ] 조작·route·단계 이동·기록·audio·Kit 저장으로 completedSessionIds가 바뀌지 않음.
- [ ] 8개 회기마다 다른 작은 조작이 있으나 모두 건너뛰기·키보드 사용 가능.
- [ ] 모든 핵심 단계는 전체 안내에서도 제공되고 호흡공간 세 단계가 유지됨.
- [ ] S4 Recognize, S5 anchor/중단, S6 탈중심화 경계를 유지하며 새 Regular 없음.
- [ ] S8 미완료에서는 Kit 선택 불가; 완료 후 현재 Repertoire의 Regular만 선택 가능.
- [ ] draft 조작은 storage/record/PDF에 저장되지 않음. 기록 저장은 명시적 동작만.
- [ ] 기존 질문 key와 legacy 답변/PDF가 보존되고 빈 기록은 생성되지 않음.
- [ ] 이미지/audio/storage 실패에서도 텍스트 안내 또는 작성 중 입력이 보존됨.
- [ ] 390px·200% zoom·keyboard·visible focus·screen reader·reduced motion 확인.
- [ ] 실제 기기에서 한국어 줄바꿈과 PDF 다운로드를 시각 확인. 미실시라면 human visual check required 명시.

