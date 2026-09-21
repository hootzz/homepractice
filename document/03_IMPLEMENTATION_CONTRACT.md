# 03. Implementation Contract

## 1. Goal

이 문서는 Codex가 제품 구조를 임의로 확장하거나 일반 명상앱으로 바꾸지 못하도록 하는 구현 계약이다.

**더 많은 기능보다 더 적고 명확한 구조를 우선한다.**

---

# 2. Recommended Prototype Stack

기존 repository가 있다면 그 stack을 우선 사용한다.

새 프로젝트라면:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Lucide icons only where appropriate

Prototype 단계에서는:

- server database 없음
- authentication 없음
- external analytics 없음
- LLM 없음
- reflection text 외부 전송 없음

Demo persistence는 `localStorage`로 충분하다.

---

# 3. Project Structure

권장:

```text
src/
  app/
    sessions/
      page.tsx
      [sessionId]/
        page.tsx
    practices/
      [practiceId]/
        page.tsx
    entries/
      page.tsx
      new/
        page.tsx
      [entryId]/
        page.tsx
    my-practice/
      page.tsx

  components/
    session/
      SessionList.tsx
      SessionHeader.tsx
      SessionMemoryCue.tsx
    practice/
      HomePracticeBlock.tsx
      PracticeListItem.tsx
      PracticeGuide.tsx
      AudioGuide.tsx
    entry/
      EntryForm.tsx
      EntryList.tsx
      EntryListItem.tsx
    plan/
      PracticePlanBuilder.tsx
      PracticePlanItem.tsx
    ui/
      ...

  content/
    sessions.ts
    practices.ts
    entrySchemas.ts

  lib/
    storage.ts
    access.ts
    types.ts

public/
  session-art/
    session-01.svg
    ...
    session-08.svg
```

---

# 4. Data Types

## Session

```ts
type SessionStatus = "available" | "current" | "upcoming";

interface Session {
  id: string;
  order: number;
  title: string;
  npc: string;
  memoryCue: string;
  representativeHomePractice: HomePracticeContent;
  entrySchemaId?: string;
  artKey: string;
}
```

## Practice

```ts
type PracticeType = "formal" | "everyday";

interface Practice {
  id: string;
  title: string;
  type: PracticeType;
  summary: string;
  durationLabel?: string;
  steps?: string[];
  audioUrl?: string;
  introducedAtSession: number;
}
```

## SessionPractice

```ts
type SessionPracticeRole =
  | "introduced"
  | "recommended"
  | "continued"
  | "selectable";

interface SessionPractice {
  sessionId: string;
  practiceId: string;
  role: SessionPracticeRole;
}
```

## Entry

```ts
interface Entry {
  id: string;
  sessionId?: string;
  practiceId?: string;
  schemaId: string;
  responses: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
```

## PracticePlan

```ts
interface PracticePlan {
  id: string;
  practiceId: string;
  cue: string;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}
```

---

# 5. Important Modeling Rules

## Never model Practice as task completion

금지:

```ts
practice.completed
practice.success
practice.score
practice.streak
practice.percent
```

## Entry is not proof of practice

```text
Entry exists ≠ Practice completed
No Entry ≠ Practice not performed
```

## Practice persists

```ts
canAccessPractice =
  practice.introducedAtSession <= currentSession
```

한번 접근 가능해진 practice를 다음 회기에서 다시 잠그지 않는다.

---

# 6. Access Rules

Prototype용으로 `currentSession` 값을 설정 파일에서 변경 가능하게 한다.

예:

```ts
export const CURRENT_SESSION = 3;
```

Rules:

- session.order < CURRENT_SESSION → accessible
- session.order === CURRENT_SESSION → accessible/current
- session.order > CURRENT_SESSION → list title visible, detail inaccessible
- introduced practice with order <= CURRENT_SESSION → accessible

Session 8 이후:

```ts
COURSE_COMPLETED = true
```

이면 기본 landing을 `/my-practice`로 변경할 수 있다.

---

# 7. Navigation

## Course Mode

하단 또는 상단 navigation:

- 회기
- 기록

## Post-course Mode

- 나의 연습
- 회기
- 기록

7–8회기 동안 `나의 연습 계획`은 Session page CTA를 통해 진입 가능하다.

---

# 8. Component Contract

## `SessionList`

책의 목차처럼 단순하게.

NO nested cards.

## `SessionMemoryCue`

- small illustration
- 2–3 sentences
- 회기 경험 환기

generic forest image를 사용하지 않는다.

## `HomePracticeBlock`

회기당 대표 1개.

가장 큰 시각적 우선순위.

Required:
- title
- short instruction
- optional small art
- `해보기`

## `PracticeListItem`

supporting practice용.

작고 반복 가능한 row.

## `PracticeGuide`

- title
- focus
- steps
- optional audio
- close/back

## `EntryForm`

모든 worksheet를 하나의 component로 schema-driven rendering.

```ts
<EntryForm schema={entrySchema} />
```

새 worksheet마다 새로운 page/component family를 만들지 않는다.

## `PracticePlanBuilder`

7–8회기용.

- cue input
- practice select
- optional reason
- add/edit/delete

---

# 9. Entry Schemas

권장 구조:

```ts
interface EntryQuestion {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

interface EntrySchema {
  id: string;
  title: string;
  intro?: string;
  questions: EntryQuestion[];
}
```

Schemas:

- `reflection`
- `experience`
- `attention_return`
- `reactivity`
- `allowing`
- `thought_distance`
- `self_care`

질문은 `02_CONTENT_MODEL.md`를 source of truth로 한다.

---

# 10. Local Storage

Prototype keys:

```text
mindforest.entries.v1
mindforest.practicePlans.v1
mindforest.settings.v1
```

Functions:

```ts
listEntries()
getEntry(id)
createEntry()
updateEntry()
deleteEntry()

listPracticePlans()
createPracticePlan()
updatePracticePlan()
deletePracticePlan()
```

SSR hydration error가 나지 않도록 browser-only access를 분리한다.

---

# 11. Visual Tokens

과도하게 디자인 시스템을 만들지 않는다.

## Suggested tokens

```text
page max width: 480px
content horizontal padding: 20px
section gap: 32px
item gap: 12px

body: 16px
small: 14px
section title: 18px
session title: 28–32px

border radius:
- input/button: 10–12px
- large container: 14–16px

border: subtle neutral
shadow: none or extremely subtle
```

## Color

- background: warm off-white or white
- text: near-black
- secondary text: muted neutral
- accent: one restrained forest green
- session artwork may use muted natural colors

Do not assign a different rainbow color to each session.

---

# 12. Session Art

Codex should not invent polished therapeutic artwork.

If final assets are absent:

- create a minimal placeholder SVG per session
- use a simple symbolic shape/object
- mark files clearly for replacement

```text
session-01.svg  walnut
session-02.svg  body / turtle cue
session-03.svg  footprints
session-04.svg  fog
session-05.svg  rain
session-06.svg  cloud
session-07.svg  activity cards
session-08.svg  honey jar
```

No generic Unsplash/Pexels/stock forest photos.

---

# 13. Forbidden UX

Do not implement:

- dashboard
- streak
- XP
- badge
- level
- leaderboard
- completion percent
- red overdue/missed state
- pushy reminders
- mood score
- mindfulness score
- AI-generated therapeutic interpretation
- sentiment analysis
- auto diagnosis
- social feed
- community feature
- practice recommendation algorithm

unless a future spec explicitly adds them.

---

# 14. Safety / Privacy

Prototype:

- no real participant name required
- no cloud storage
- no LLM calls
- no raw reflection transmission
- all demo data stays in browser storage

If production/research backend is later added, do not infer policy.
Ask for:
- IRB-approved data fields
- consent wording
- retention period
- account/participant code model
- deletion rules
- researcher access rules

---

# 15. Responsive Requirements

Primary target: mobile web.

Also:
- desktop center column
- no horizontal scrolling
- forms usable with mobile keyboard
- touch target >= 44px
- full semantic labels
- focus states
- accessible contrast
- reduced motion

---

# 16. Implementation Acceptance Tests

Codex should verify:

1. Future session detail cannot be opened.
2. Past/current sessions can be reopened.
3. A practice remains accessible after the session in which it was introduced.
4. Entry creation works without marking a practice complete.
5. Entry can be edited and deleted.
6. Page refresh preserves local demo entries.
7. Session 7/8 plan builder works.
8. Post-course mode can open My Practice as landing.
9. No forbidden gamification metrics are present.
10. No generic stock forest imagery is present.
11. All seven entry schemas render from one `EntryForm`.
12. `npm run build` succeeds with no TypeScript errors.

---

# 17. Definition of Done — Prototype

Prototype is done when:

- 1–8 session list exists
- each session detail has distinct MindForest memory cue
- representative home practice exists for every session
- supporting practice rows work
- text practice guide works
- audio-ready practice layout exists
- all reflection schemas work
- record list/detail/edit/delete works
- Session 7–8 practice plan flow works
- post-course My Practice view exists
- mobile UI is coherent
- no backend is required to demo
