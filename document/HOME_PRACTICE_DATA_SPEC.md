# Home Practice 데이터 계약 — Session Complete / Bundle

2026-10-05 최신 결정. **Session Complete → SessionPracticeBundle → 누적 Regular → S8 직접 선택 Kit**. 이 명세는 개발 계약이며 현재 앱에 접근 모델을 적용했다는 주장이 아니다.

## 1. 사전 콘텐츠 감사와 runtime 분리

Regular = 정식 한국어 MBCT Practice ∩ 실제 게임 구현·교육. 게임 고유의 일반화는 WeeklyTask. 최신 시나리오/Unity/Practice Book을 대조하여 출판 Bundle을 확정한다. Preserved Function과 Fidelity Boundary는 선정 근거이며 사용자별 접근 조건이 아니다. `confirmed/scenario_only/pending/excluded`는 감사 상태로만 둔다. 미확인 후보는 published Bundle 밖에 두고 참가자 증빙 요구로 해결하지 않는다.

정식 한국어 책에서 확인한 명칭·절차·용량 범위는 [KOREAN_MBCT_AUDIO_MAPPING.md](./KOREAN_MBCT_AUDIO_MAPPING.md)를 참조한다. 교재 권고를 프로토콜 처방으로 채택하기 전 `homeDuration/frequency`의 source와 적용 결정을 명시한다.

## 2. 최소 타입

```ts
type SessionId = 's1'|'s2'|'s3'|'s4'|'s5'|'s6'|'s7'|'s8';
type PracticeId = string;
type WeeklyTaskId = string;
interface Progress { completedSessionIds: SessionId[] }
interface SessionPracticeBundle {
  sessionId: SessionId;
  regularPracticeIds: PracticeId[];
  sessionSpecificTaskId?: WeeklyTaskId;
}
interface Copy {
  internal_name: string;
  user_facing_name: string;
  short_description: string;
}
type Guidance = { status: 'unspecified' } |
  { status: 'sourced'; value: string; source: string };
interface Practice extends Copy {
  id: PracticeId;
  introducedSessionId: SessionId;
  steps: string[];
  recordSchemaId: string;
  gameDuration: Guidance;
  homeDuration: Guidance;
  frequency: Guidance;
  audioRequirement: Guidance;
  audioMappingId?: string;
}
interface WeeklyTask extends Copy {
  id: WeeklyTaskId;
  sessionId: SessionId;
  steps: string[];
  recordSchemaId: string;
  relatedPracticeIds: PracticeId[];
}
interface ContentRelease {
  id: string;
  gameVersion: string;
  bundles: SessionPracticeBundle[];
  practices: Practice[];
  weeklyTasks: WeeklyTask[];
}
// 편집용 콘텐츠 감사. runtime access 함수에 전달하지 않는다.
interface ContentRationale {
  sessionId: SessionId;
  contentId: string;
  gameAction: string;
  sourceVersion: string;
  implementationState: 'confirmed'|'scenario_only'|'pending'|'excluded';
  implementationRefs: string[];
  koreanPracticeBookRef?: string;
  preservedFunctions: string[];
  fidelityBoundaries: string[];
  decision: 'include_regular'|'include_weekly'|'pending'|'excluded';
  decisionReason: string;
}
type LearnedRepertoire = PracticeId[]; // 자동 파생 집합
interface KitItem {
  practiceId: PracticeId;
  cue?: string;
  situation?: string;
  personalReason?: string;
}
interface PracticeKit { items: KitItem[] }
interface Entry {
  id: string;
  sessionId?: SessionId;
  practiceId?: PracticeId;
  weeklyTaskId?: WeeklyTaskId;
  createdAt: string;
  updatedAt: string;
  schemaId: string;
  responses: Record<string,string>;
  questionSnapshot?: Record<string,string>;
  practiceNameSnapshot?: string;
}
interface Store {
  schemaVersion: 3;
  mode: 'actual'|'demo';
  contentReleaseId: string;
  progress: Progress;
  entries: Entry[];
  kit: PracticeKit;
  legacy?: {
    rawSnapshots: Record<string,string>;
    receipts?: unknown[]; // 보존만. 접근·완료 추론·Kit에 사용 금지
    plans?: unknown[];
  };
}
```

## 3. 접근 알고리즘

ContentRelease는 사전 승인된 manifest다. 각 Regular는 introducedSessionId의 Bundle에 정확히 한 번 등록한다. 이후 회기에서는 복제 없이 Repertoire를 참조한다. S8 regularPracticeIds는 빈 배열이다.

```ts
function canAccessPractice(p: Practice, progress: Progress): boolean {
  return progress.completedSessionIds.includes(p.introducedSessionId);
}
function canAccessTask(t: WeeklyTask, progress: Progress): boolean {
  return progress.completedSessionIds.includes(t.sessionId);
}
function repertoire(release: ContentRelease, progress: Progress): LearnedRepertoire {
  return release.practices.filter(p => canAccessPractice(p, progress)).map(p => p.id);
}
function canSelectKit(p: Practice, progress: Progress): boolean {
  return progress.completedSessionIds.includes('s8') && canAccessPractice(p, progress);
}
```

URL id는 published manifest에서 먼저 찾는다. 없는 id는 차단한다. 존재하는 연습의 사용자별 접근 조건은 **도입 회기 완료뿐**이다. 기록·오디오·개별 action 검증·연구자 승인을 추가하지 않는다. 완료 배열은 중복 없는 집합이다. 한 회기 완료에서 다른 회기 완료를 추론하지 않는다. 화면이 S8이어도 completedSessionIds가 [s1]이면 S1 Bundle만 열린다. S3 완료 시 승인 S3 Bundle 전체가 열린다.

## 4. 버전과 진행 상태

- 출판 전에 authoritative game/content release를 고른다. A/B/V3.3 장면·절차를 섞지 않는다. 버전 대응은 콘텐츠 출판 문제이며 참가자별 action 증빙 문제가 아니다.
- Progress는 게임의 session-complete 상태로 갱신한다. 실제 전달 형식은 미확정이다. route 접근·체류시간·Entry·오디오·Kit 저장으로 완료를 만들지 않는다.
- actual/demo 저장은 `mindforest.home.v3.actual`, `mindforest.home.v3.demo`로 분리한다. demo completion fixture를 actual로 복사하지 않는다.
- 완료한 Regular는 이후 유지한다. 진행 중 content release를 임의 교체하지 않는다. 버전 교체는 대응표와 기록·권한 보존을 검토하고 시행한다.
- 콘텐츠 pending은 사전 출판 보류다. 확정 Bundle과 완료 데이터가 있으면 즉시 접근 가능하다. 전 사용자 잠금 정책이나 별도 참가자 인증을 두지 않는다.

## 5. 기록과 PDF

모든 질문 optional. 공백뿐이면 record 미생성. ‘잘 모르겠어요’는 유효 응답. 기록 없이 연습 가능. 기존 기록 읽기/수정/삭제/PDF는 현재 연습 접근과 무관하다. 자동 평가·감정 분석·AI 해석·streak·score·completion percentage는 없다.

`내 기록 PDF로 내보내기`: 브라우저 생성일 → Session 1–8 순서 → 실제 작성한 기록(날짜, Practice/과제, 질문, 원문 답변) → 마지막 개인 Practice Kit. 빈 record/답변·수행률·점수·streak·분석값 제외. 질문/이름 snapshot 우선, 기존 schema 차선. 알 수 없는 legacy 필드는 삭제하거나 새 질문으로 추정하지 않는다. 회기 미확인 기록은 별도 ‘이전 기록 · 회기 미확인’ 영역에 보존한다. record 원문은 외부 서버로 전송하지 않는다. 다운로드 실패 시 데이터 변경 없음. 과거 plan을 최종 Kit으로 자동 간주하지 않는다.

schema 후보: sensory(감각), body(몸/생각/감정), attention(마음이 간 곳/돌아온 감각), reactivity(불편함/충동/행동/이후), allowing(반응/anchor), thought(실제 일/해석), care(활동/영향), integration(상황/개인 이유). 실제 질문은 authoritative scene 기준으로 확정하며 정답 평가하지 않는다.

## 6. Migration

현재 `src/lib/storage.ts`의 키는 `mindforest.entries.v1`, `mindforest.practicePlans.v1`. 이 저장 코드에는 action receipt/완료 원장이 없다. 실제 배포의 추가 키는 구현 전에 확인한다.

1. 기존 raw 값을 snapshot으로 백업한다. 기존 키를 삭제하지 않는다. 새 쓰기 실패 시 원본 유지. 유효 v3가 있으면 중복 migration하지 않는다.
2. record id/날짜/응답/schema를 보존한다. 제외 연습·모르는 schema도 원문 읽기/수정/삭제/PDF 가능. 이름 변경으로 응답을 다시 해석하지 않는다.
3. 기존 명시적 session-complete 데이터가 있으면 의미를 확인해 completedSessionIds로 이전한다. 현재 회기/기록/plan/시간/receipt로 완료를 역산하지 않는다. 없다면 빈 Progress에서 실제 완료 전달로 채운다. 이는 migration의 데이터 부재 처리이며 추가 사용자 gate가 아니다.
4. 과거 ExperienceReceipt/LearningReceipt/researcher_verified 자료가 별도 존재한다면 필요 시 legacy 원형으로 보존한다. 런타임 타입·접근 함수·Kit에는 사용하지 않는다.
5. 이전 PracticePlan은 legacy 보존 후 S8에서 사용자가 유효 Regular를 다시 고르게 한다. 자동 Kit 변환 금지. sN_home 기록은 WeeklyTask 문맥으로 대응 가능하지만 Regular로 승격하지 않는다.
6. 기존 sensory/urge/allowing/thought/care ID를 정식 대응 확인 없이 Regular로 유지하지 않는다. 원 ID·내용은 보존한다. 이전 prototype 데이터는 demo이며 actual 완료로 승격하지 않는다.

## 7. Acceptance tests / runtime invariants

| 검증 | 기대 결과 |
|---|---|
| 완료 없음, URL만 S8 | 연습 미해제; Kit 불가 |
| S2 완료, receipt 없음 | 승인 S2 Bundle 전체 접근 |
| S2 완료, 기록 없음/오디오 미재생 | 접근 유지 |
| 화면 S3, 완료 [s1] | S1 Bundle만 접근 |
| S3 완료 후 S8 완료 | 과거 Regular 유지; S8 신규 Regular 없음 |
| S8 완료 + Regular 접근 | 직접 선택만 Kit 생성 |
| S7까지만 완료 | Repertoire 사용; Kit은 S8 이후 |
| WeeklyTask/미출판 id Kit 요청 | 거절 |
| Kit 삭제 | Repertoire 유지 |
| pending/excluded 후보 | Bundle 출판 검증에서 제외 |
| route/시간/기록/오디오/Kit 저장 | 완료 목록 변화 없음 |
| 공백 답변 / 잘 모르겠어요 | 미생성 / 저장 |
| legacy receipt만 존재 | 완료를 만들어내지 않음 |
| 기존 기록/모르는 schema | 원문과 날짜 보존·PDF 가능 |
| demo reset | actual 유지 |
| PDF | 생성일·S1–8·날짜/질문/답변·마지막 Kit; 외부전송 없음 |
| 알 수 없는 dosage/audio | unspecified; 길이·빈도 발명 없음 |

저장 JSON은 런타임 구조 검증을 수행한다. 파싱/할당량 실패 시 원본과 입력을 보존한다. 이 표는 인수 기준이며 앱 실행 테스트 통과 주장과 구분한다.

## Unresolved checklist

- [ ] authoritative 배포 버전/콘텐츠 release 및 V3.3 0903 원문.
- [ ] Unity 구현과 scene binding·실제 교육 흐름의 미확인 부분.
- [ ] session-complete 전달 경로와 기존 완료 데이터. 참가자 action별 검증은 요구하지 않음.
- [ ] S3 breathing space / 50:50 사전 콘텐츠 감사.
- [ ] S4–6 authoritative scene과 home steps 일치.
- [ ] 한국어 정식 Practice Book 판본/페이지·Regular 대응.
- [ ] Body Scan home duration/frequency 및 공식 audio 실제 대응·이용 조건.
- [ ] formal MBCT curriculum과 MindForest layer의 프로토콜 관계.
