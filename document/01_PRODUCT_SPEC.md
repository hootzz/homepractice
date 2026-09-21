# 01. Product & UX Specification

## 1. Product Definition

**MindForest Home Practice**는 MindForest의 각 회기에서 경험한 주의·몸·반응·해석·자기돌봄의 학습을 사용자가 일상에서 다시 시도하고 간단히 기록할 수 있도록 지원하는 **session-linked digital workbook**이다.

핵심 목적은 다음 세 가지다.

1. 게임 속 경험을 현실의 작은 practice로 이어주기
2. 자신의 경험을 판단 없이 기록할 수 있게 하기
3. 후반부에는 배운 practice를 스스로 선택해 삶에 연결하기

---

# 2. Product Principle

## P1. Sessions unfold sequentially; practices accumulate.

- Session은 순차적으로 열린다.
- 아직 경험하지 않은 회기 세부 내용은 열지 않는다.
- 한번 소개된 Practice는 이후에도 다시 사용할 수 있다.
- Practice는 `complete`되는 task가 아니다.

## P2. Experience before technique.

회기 화면은 기법 이름부터 시작하지 않는다.

순서:

`MindForest 기억 → 현실에서 해볼 작은 행동 → 필요한 practice → reflection`

## P3. Reflection, not evaluation.

사용자의 기록을 시스템이 점수화하거나 해석하지 않는다.

금지:

- 마음챙김 점수
- 감정 점수
- AI 평가
- 성공/실패
- 연속 달성 streak
- completion percentage

## P4. One screen, one main question.

각 화면은 다음 중 하나만 주로 해결한다.

- 어느 회기인가?
- 이 회기에서 무엇을 다시 해볼까?
- 이 practice를 어떻게 할까?
- 무엇을 알아차렸나?
- 앞으로 어떤 practice를 이어갈까?

## P5. Record is optional.

- 연습했다고 반드시 기록할 필요가 없다.
- 기록하지 않았다고 연습이 성립하지 않는 것이 아니다.
- Entry 존재 여부를 adherence/compliance로 사용자 UI에 표시하지 않는다.

## P6. Re-entry over streak.

오래 사용하지 않아도 불이익·경고를 주지 않는다.
언제든 다시 들어와 practice할 수 있다.

---

# 3. User-facing Core Concepts

사용자가 알아야 할 개념은 세 가지면 충분하다.

## Session / 회기

MindForest에서 경험한 학습 맥락.

사용자가 느끼는 의미:

> “그 회기에서 했던 경험을 다시 떠올리고 집에서 이어가는 곳”

## Practice / 연습

실제로 해볼 수 있는 행동.

두 종류가 내부적으로 존재한다.

- `formal`: 따로 시간을 두는 연습
- `everyday`: 일상 중 사용하는 연습

단, 이 분류를 화면에서 매번 학술 용어처럼 강조하지 않는다.

## Entry / 기록

연습 또는 일상 경험에서 사용자가 알아차린 것을 남긴 것.

다양한 worksheet는 모두 사용자에게는 `기록`이다.

후반부에는 `Plan`이 생기지만, 이는 새로운 상위 메뉴가 아니라 **나의 practice를 이어가는 방식**이다.

---

# 4. Information Architecture

## 4.1 Course Mode — Sessions 1–6

가장 단순한 상태.

```text
회기
 └─ 회기 상세
      ├─ 홈 프랙티스
      ├─ 연습 안내
      └─ 경험 기록

기록
 └─ 과거 기록 보기
```

Top-level navigation:

- `회기`
- `기록`

`나의 연습`을 초반부터 별도 탭으로 가르치지 않는다.

---

## 4.2 Transition Mode — Sessions 7–8

회기 안에서 처음으로 개인 선택과 계획이 등장한다.

```text
7회기
 └─ 이어가고 싶은 연습 선택
 └─ 상황 ↔ practice 연결

8회기
 └─ Practice Kit 구성
 └─ 삶의 상황 ↔ practice 연결
 └─ 이어가고 싶은 개인적 이유
```

아직 별도 복잡한 dashboard를 만들지 않는다.

---

## 4.3 Post-course Mode

8회기 이후 기본 진입점은 `나의 연습`으로 전환할 수 있다.

```text
나의 연습
 ├─ 내가 선택한 practice
 └─ 상황 ↔ practice 연결

회기
 └─ 1–8회기 다시 보기

기록
 └─ 과거 기록
```

---

# 5. Routes

최소 route set:

```text
/sessions
/sessions/:sessionId

/practices/:practiceId

/entries
/entries/new
/entries/:entryId

/my-practice
```

`/my-practice`는 7회기 이전에는 직접적인 primary navigation에 노출하지 않는다.

---

# 6. Page Specifications

## 6.1 Session List

### User question

> “어느 회기까지 경험했고, 어디를 다시 볼 수 있지?”

### Required information

- 1–8회기 번호
- 회기 제목
- 접근 가능 여부

### Visual rule

- 전체 목록을 한눈에
- 카드보다 list-row 우선
- 미래 회기는 제목만 보이고 상세 접근 불가
- 숫자 progress 없음

### Example

```text
MindForest
홈 프랙티스

01  알아차림과 자동조종            →
02  몸을 마음에 두기              →
03  분산된 마음 모으기            →
04  혐오를 알아차리기             잠김
05  허용하고 내버려두기           잠김
06  생각은 사실이 아니다          잠김
07  어떻게 나 자신을 잘 보살필까? 잠김
08  삶과 함께하는 마음챙김        잠김
```

잠김은 자물쇠 아이콘보다 낮은 contrast와 `이후 회기` 정도로 표현해도 된다.

---

## 6.2 Session Detail

이 제품의 핵심 화면.

정보 위계는 네 블록을 넘기지 않는다.

### A. Session memory

- 회기 번호
- 회기 제목
- MindForest의 핵심 장면/행동을 2–3문장으로 환기
- 회기별 작은 visual 1개

**중요:** generic forest banner 금지.

회기의 핵심 visual object만 사용한다.

예:
- 호두
- 거북이와 몸의 위치
- 사슴/발자국
- 안개
- 빗방울/개구리
- 생각 구름/독수리
- 강아지/활동 카드
- 벌/꿀단지

### B. 대표 Home Practice

회기마다 **대표 1개**를 가장 먼저 보여준다.

이것이 MindForest → 현실의 연결이다.

### C. 함께 이어갈 Practice

정전적/기존 MBCT practice들을 작은 secondary list로 제공한다.

대표 home practice와 같은 시각적 무게를 주지 않는다.

### D. Reflection

한 개의 CTA.

`기록하기`

---

## 6.3 Practice Detail

### Required

- practice 이름
- 짧은 한 문장 초점
- 2–5개 단계
- 필요한 경우 audio
- 짧은 non-evaluative reminder

### Not required

- 완료 버튼
- 성공 메시지
- 연속 수행
- 관련 콘텐츠 추천 carousel
- 장황한 이론

### Primary button

필요한 경우:

- `오디오 재생`
- `닫기`

기록은 Session Detail에서도 시작할 수 있으므로 Practice Detail에 강제로 붙이지 않는다.

---

## 6.4 Entry Form

Worksheet 종류마다 새 페이지 문법을 만들지 않는다.

공통 `EntryForm`이 schema에 따라 질문만 바꾼다.

### UX

- 한 페이지
- 질문 3–5개
- multiline text
- 모든 답변 필수 아님
- 저장
- 저장 후 간단한 확인

### Save confirmation

```text
기록이 저장되었습니다.

[회기로 돌아가기]
[기록 보기]
```

축하 애니메이션 없음.

---

## 6.5 Entry List

목적:

> 과거의 경험을 다시 읽는 workbook index

Required:

- 날짜
- 회기 또는 practice
- 첫 문장 preview

Optional filter:

- 전체
- 회기
- 연습

금지:

- 월간 통계
- 평균 수행시간
- 달성률
- streak

---

## 6.6 My Practice

7–8회기 및 course 이후 사용.

### Function

- 지금까지 소개된 practice 목록
- 사용자가 이어갈 practice 선택
- 상황/cue와 연결
- 필요하면 개인적 이유 작성

예:

```text
아침에 일어난 뒤
→ 3단계 호흡공간

연구실로 걸어갈 때
→ 마음챙김 걷기

머리가 복잡할 때
→ 앉기 연습
```

---

# 7. Visual Direction

## Desired

- 모바일 우선
- workbook + game-memory artifact
- 흰색/따뜻한 off-white 기반
- 본문 가독성 우선
- accent color 1개
- 회기별 visual은 작은 상징 1개
- 충분한 whitespace
- 얇은 divider
- card nesting 최소화

## Avoid

- generic meditation app
- stock forest photography
- 모든 영역을 초록색 card로 감싸기
- gradient-heavy wellness UI
- 과도한 rounded card
- dashboard aesthetic
- childish game UI
- gamification badges

## Session Visual Rule

visual은 “예쁘게 꾸미기”가 아니라 **game memory cue**다.

한 화면에서 illustration 비중은 대략 15–25% 이내로 유지한다.

---

# 8. CTA Vocabulary

사용:

- `해보기`
- `연습 보기`
- `기록하기`
- `저장`
- `연결 추가`
- `수정`
- `삭제`

가급적 사용하지 않음:

- 완료
- 성공
- 달성
- 제출
- 체크인 완료
- 도전

---

# 9. Accessibility / Mobile UX

- body text 최소 16px
- tap target 최소 44×44px
- contrast 확보
- visual 없이도 모든 의미 전달
- audio에 text guidance 병행
- textarea keyboard에 가려지지 않도록
- 저장 전/후 명확한 feedback
- destructive action에는 확인
- reduced motion 고려

---

# 10. Acceptance Criteria

제품 UX가 맞게 구현된 경우:

1. 처음 보는 사용자가 10초 안에 회기 목록을 이해할 수 있다.
2. 한 회기 화면에서 대표 home practice가 가장 먼저 보인다.
3. MindForest의 회기 경험과 현실 practice의 연결이 보인다.
4. 일반 명상 콘텐츠 library처럼 보이지 않는다.
5. 기록하지 않고도 practice를 사용할 수 있다.
6. practice 수행에 점수/완료/연속 상태가 없다.
7. 7–8회기에서만 자기 practice 선택과 계획이 자연스럽게 등장한다.
8. 8회기 이후에도 이전 practice를 다시 사용할 수 있다.
