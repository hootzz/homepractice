# 02. Session & Content Model

## 0. Content Provenance Rule

모든 콘텐츠는 내부적으로 다음 출처 층을 구분한다.

### `mbct_l`

Mindfulness for Life / MBCT-L workbook에서 직접 지지되는 practice 구조.

### `mindforest_translation`

MindForest 게임 안에서 구현된 장면·행동·은유를 현실 home practice로 옮긴 것.

### `local_copy`

제품 사용성을 위해 연구팀이 작성한 한국어 안내 문구.

**MindForest adaptation을 MBCT의 정전적 요구처럼 표현하지 않는다.**

---

# 1. Content Unit

각 회기는 다음 구조를 가진다.

```yaml
session:
  id:
  title:
  npc:
  memory_cue:
  home_practice:
  supporting_practices:
  entry_schema:
  provenance:
```

사용자 화면의 핵심은 `memory_cue + home_practice`다.

`supporting_practices`는 보조다.

---

# 2. Session 1

## Metadata

- ID: `s1`
- 제목: **알아차림과 자동조종**
- NPC: 다람쥐
- 핵심 상징: 호두
- 핵심 경험: 자동적으로 행동하려던 흐름 앞에서 잠시 멈추고 익숙한 대상을 감각적으로 새롭게 관찰하기

## Memory Cue

> 게임에서는 바로 지나치거나 먹어버릴 수 있는 호두 앞에서 잠시 멈췄습니다. 익숙한 것도 천천히 보면 표면, 모양, 색, 손의 감각처럼 이전에는 지나쳤던 것이 보일 수 있습니다.

## Representative Home Practice

### `자동으로 하던 행동 앞에서 잠시 멈춰보기`

오늘 반복적으로 하는 일 하나를 고른다.

예:
- 물 마시기
- 간식 먹기
- 세수
- 손 씻기
- 문 열기

행동을 시작하기 전 잠시 멈춘 뒤,
보이는 것·닿는 감각·소리·몸의 움직임 중 한두 가지를 천천히 알아차린다.

### Prompt

- 방금 자동으로 하려던 것은 무엇이었나요?
- 잠시 멈췄을 때 이전에는 지나쳤던 무엇을 알아차렸나요?

## Supporting Practices

- Body Scan — `mbct_l`
- Mindful Routine Activity — `mbct_l`
- Ten Finger Gratitude — `mbct_l`

## Entry Schema

`reflection`

Fields:
- `moment`
- `noticed`

---

# 3. Session 2

## Metadata

- ID: `s2`
- 제목: **몸을 마음에 두기**
- NPC: 거북이
- 핵심 상징: 몸의 위치 / 느린 기다림
- 핵심 경험: 같은 상황에서도 생각·감정·몸의 반응이 함께 나타남을 알아차리기

## Memory Cue

> 거북이를 기다리는 같은 상황에서도 생각만 있는 것이 아니라 감정과 몸의 반응이 함께 있었습니다. 무엇을 느끼는지 판단하기보다 몸에서 먼저 확인해볼 수 있습니다.

## Representative Home Practice

### `하나의 경험을 몸에서 찾아보기`

하루 중 기억에 남는 순간 하나를 고른다.

1. 무슨 일이 있었는지 떠올린다.
2. 몸 어디에서 가장 분명한 감각이 있었는지 찾는다.
3. 그때의 감정이나 기분을 적는다.
4. 어떤 생각이 함께 있었는지 살펴본다.

## Supporting Practices

- Body Scan — `mbct_l`
- Sitting with Breath — `mbct_l`
- Pleasant Experience Calendar — `mbct_l`
- 50:50 Attention — `mbct_l`
- Ten Finger Gratitude — `mbct_l`

## Entry Schema

`experience`

Fields:
- `experience`
- `body`
- `feeling`
- `thought`
- `impulse`

---

# 4. Session 3

## Metadata

- ID: `s3`
- 제목: **분산된 마음 모으기**
- NPC: 사슴
- 핵심 상징: 발자국
- 핵심 경험: 자연 자극에 흩어진 주의를 알아차리고 발걸음과 접촉감으로 돌아오기

## Memory Cue

> 숲길에서는 소리와 빛, 생각에 주의가 계속 흩어졌습니다. 목표는 주의가 절대 흩어지지 않게 하는 것이 아니라, 흩어진 것을 알아차리고 발의 감각으로 돌아오는 것이었습니다.

## Representative Home Practice

### `짧은 길 하나를 걸으며 돌아오기`

집, 학교, 연구실 주변에서 1–5분 정도의 짧고 익숙한 길 하나를 고른다.

걷는 동안:
1. 발이 바닥에 닿는 감각을 느낀다.
2. 다른 생각이나 자극으로 주의가 옮겨간 것을 알아차린다.
3. 잘못했다고 평가하지 않고 다시 발의 접촉감이나 걸음으로 돌아온다.

**이 practice는 MindForest 3회기의 embodied translation이다.**
MBCT-L의 Session 3 canonical home assignment와 동일하다고 표시하지 않는다.

## Supporting Practices

- Stretch and Breath — `mbct_l`
- Mindful Movement — `mbct_l`
- 3-Step Breathing Space — `mbct_l`
- 50:50 Attention — `mbct_l`
- Ten Finger Gratitude — `mbct_l`

## Entry Schema

`attention_return`

Fields:
- `what_pulled_attention`
- `return_anchor`
- `noticed_after_return`

---

# 5. Session 4

## Metadata

- ID: `s4`
- 제목: **혐오를 알아차리기**
- NPC: 곰
- 핵심 상징: 안개
- 핵심 경험: 불편함이 생길 때 즉각 피하거나 반응하려는 충동을 알아차리고 현재 감각으로 돌아오기

## Memory Cue

> 안개 속에서는 답답함을 빨리 없애고 싶거나 눈앞의 불편함에서 벗어나고 싶은 반응이 쉽게 나타납니다. 중요한 것은 불편함을 좋아하는 것이 아니라, 반응이 시작되는 순간을 조금 더 일찍 알아차리는 것입니다.

## Representative Home Practice

### `반응이 시작되는 순간 포착하기`

일상에서 가벼운 불편함이나 짜증이 생긴 순간 하나를 떠올린다.

- 무엇이 촉발했는가?
- 몸에서 먼저 나타난 감각은?
- 어떤 생각이나 감정이 뒤따랐는가?
- 무엇을 하고 싶어졌는가?
- 실제로 어떻게 반응했는가?

필요하면 잠시 호흡이나 발바닥 감각으로 돌아온다.

## Supporting Practices

- Sitting Practice — `mbct_l`
- Working Wisely with Reactivity — `mbct_l`
- Daily Walking Practice — `mbct_l`
- 50:50 Attention — `mbct_l`
- Ten Finger Gratitude — `mbct_l`
- Experience Awareness — `mbct_l`

## Entry Schema

`reactivity`

Fields:
- `trigger`
- `body`
- `feeling_thought`
- `impulse`
- `response`

---

# 6. Session 5

## Metadata

- ID: `s5`
- 제목: **허용하고 내버려두기**
- NPC: 개구리
- 핵심 상징: 비 / 빗방울
- 핵심 경험: 통제할 수 없는 불편함을 즉시 제거하려 하기보다 현재 몸의 반응과 함께 잠시 경험을 이어가기

## Memory Cue

> 비는 바로 멈추지 않았고, 개구리는 비를 좋아하라고 요구하지도 않았습니다. 바꾸기 어려운 순간에 먼저 자신의 밀어내는 태도와 몸의 반응을 알아차려볼 수 있습니다.

## Representative Home Practice

### `바꾸고 싶은 순간에 잠시 머물러보기`

**안전한 일상 상황에서만** 한다.

가벼운 불편함이 생겼을 때:
1. 무엇을 없애거나 바꾸고 싶은지 알아차린다.
2. 몸의 감각과 호흡을 확인한다.
3. 짧은 시간 동안 경험을 즉시 고치려 하지 않고 관찰한다.
4. 이후 필요한 행동을 선택한다.

이 practice는 위험하거나 해로운 상황에 머물라는 의미가 아니다.

## Supporting Practices

- Sitting Practice — `mbct_l`
- Working with Difficulty — `mbct_l`
- 3-Step Breathing Space — `mbct_l`
- Daily Walking — `mbct_l`
- Random Acts of Kindness — `mbct_l`
- 50:50 Attention — `mbct_l`
- Ten Finger Gratitude — `mbct_l`

## Entry Schema

`allowing`

Fields:
- `situation`
- `urge_to_change`
- `body`
- `what_happened_when_pausing`

---

# 7. Session 6

## Metadata

- ID: `s6`
- 제목: **생각은 사실이 아니다**
- NPC: 독수리
- 핵심 상징: 생각 구름 / 높은 시점
- 핵심 경험: 사건, 현재 상태, 마음이 붙인 해석을 분리하고 생각을 없애기보다 바라보기

## Memory Cue

> 같은 사건도 내가 어떤 상태에 있는지에 따라 다르게 해석될 수 있었습니다. 절벽 위에서 보듯 사건과 해석 사이에 조금 거리를 두어볼 수 있습니다.

## Representative Home Practice

### `사실 · 상태 · 해석 나누어보기`

기억에 남는 상황 하나를 고른다.

1. **사실** — 직접 확인 가능한 것은 무엇인가?
2. **상태** — 당시 몸과 감정은 어땠는가?
3. **해석** — 마음은 그 사건에 어떤 의미를 붙였는가?
4. **대응** — 한 발 떨어져 본다면 어떤 대응이 가능할까?

`fact / state / interpretation`의 3분 구조는 MindForest-specific translation이다.

## Supporting Practices

- previously learned formal practices — `mbct_l`
- Responding Skilfully — `mbct_l`
- 50:50 Attention — `mbct_l`
- Ten Finger Gratitude — `mbct_l`
- 3-Step Breathing Space — `mbct_l`
- Daily Walking — `mbct_l`
- Random Acts of Kindness — `mbct_l`

## Entry Schema

`thought_distance`

Fields:
- `event`
- `state`
- `interpretation`
- `fact`
- `possible_response`

---

# 8. Session 7

## Metadata

- ID: `s7`
- 제목: **어떻게 나 자신을 잘 보살필 수 있을까?**
- NPC: 강아지
- 핵심 상징: 활동 카드
- 핵심 경험: 활동과 기분/에너지의 관계를 살펴보고, 자신을 돌보는 작은 행동을 선택하기

## Memory Cue

> 같은 하루를 보내도 어떤 활동은 나를 더 소모시키고 어떤 활동은 회복을 돕습니다. 시스템이 정답을 정하는 것이 아니라 내가 내 경험을 기준으로 구분해봅니다.

## Representative Home Practice

### `오늘의 활동을 돌아보기`

오늘 한 활동 몇 가지를 적는다.

각 활동에 대해 사용자가 직접 판단한다.

- 나를 소모시켰다
- 나를 돌보거나 회복시켰다
- 둘 다 / 잘 모르겠다

그중 다음 며칠 동안 의도적으로 이어가고 싶은 작은 행동 하나를 선택한다.

## Supporting Practices

새로운 technique을 늘리는 것보다 기존 practice에서 선택한다.

- Body Scan
- Sitting Practice
- Mindful Movement
- Breathing Space
- Walking
- 50:50 Attention
- Gratitude
- Kindness
- 그 외 이미 소개된 practice

## Plan

처음으로 `PracticePlan`을 만든다.

Fields:
- `cue`
- `practice_id`

예:
- `아침에 일어난 뒤 → 3-Step Breathing Space`
- `연구실로 걸어갈 때 → Mindful Walking`

## Entry Schema

`self_care`

Fields:
- `activity`
- `effect`
- `small_action`

---

# 9. Session 8

## Metadata

- ID: `s8`
- 제목: **삶과 함께하는 마음챙김**
- NPC: 꿀벌
- 핵심 상징: 꽃 / 꿀방울 / Practice Kit
- 핵심 경험: 1–7회기 practice를 모아 자신의 실제 상황과 개인적으로 중요한 이유에 연결하기

## Memory Cue

> 마지막에는 새로운 기법을 하나 더 배우기보다 지금까지 경험한 practice 중 가져가고 싶은 것을 고릅니다. 꿀벌이 여러 꽃에서 꿀을 모으듯, 자신에게 필요한 연습을 묶어 일상으로 가져갑니다.

## Representative Home Practice

### `나의 Practice Kit 만들기`

1. 이어가고 싶은 practice를 1–3개 선택한다.
2. 각 practice를 실제 상황/cue와 연결한다.
3. 이 연습을 이어가고 싶은 개인적인 이유를 한 문장으로 적는다.

예:

```text
발표 전 긴장될 때 → 3-Step Breathing Space
이동할 때 → Mindful Walking
저녁에 몸이 굳어 있을 때 → Body Scan
```

## Supporting Principle

Session 8은 다음 회기를 위한 숙제가 아니다.
`course → self-directed practice`로 전환되는 지점이다.

## Plan Fields

- `practice_id`
- `cue`
- `reason`

## Entry Schema

별도 mandatory reflection 없음.
필요하면 자유 기록을 남길 수 있다.

---

# 10. Practice Registry

Practice는 Session별로 복제하지 않고 하나의 registry에서 관리한다.

예시 ID:

```text
body_scan
mindful_routine
ten_finger_gratitude
sitting_with_breath
fifty_fifty_attention
stretch_and_breath
mindful_movement
three_step_breathing_space
sitting_practice
daily_walking
working_with_difficulty
random_kindness
responding_skilfully
```

---

# 11. Session-Practice Relationship

Practice와 Session 사이에 relation을 둔다.

Roles:

```text
introduced
recommended
continued
selectable
```

예:

```yaml
practice: three_step_breathing_space
relations:
  - session: s3
    role: introduced
  - session: s5
    role: recommended
  - session: s6
    role: continued
  - session: s8
    role: selectable
```

---

# 12. Copy Rules

## Use

- 알아차리다
- 살펴보다
- 돌아오다
- 잠시 멈추다
- 이어가다
- 기록해볼 수 있다
- 필요하면
- 가능한 만큼

## Avoid

- 반드시 성공해야 한다
- 제대로 했다
- 실패했다
- 목표를 달성했다
- 마음을 비운다
- 생각을 없앤다
- 불편함을 참는다
- 치료 효과가 나타난다

---

# 13. Copyright Rule

Oxford workbook의 문장을 장문으로 그대로 옮기지 않는다.

허용되는 방식:

- practice 명칭
- 기능적 구조
- 질문 차원(body / feeling / thought / impulse 등)
- 자체 작성한 짧은 한국어 guidance

공개 제품 copy는 연구팀이 최종 검수한다.
