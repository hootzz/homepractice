# 04. Codex Build Prompt

아래 프롬프트를 Codex에 그대로 전달하세요.

---

## MASTER PROMPT

You are implementing a research prototype called **MindForest Home Practice**.

Before writing code, read these files in this exact priority order:

1. `README.md`
2. `01_PRODUCT_SPEC.md`
3. `02_CONTENT_MODEL.md`
4. `03_IMPLEMENTATION_CONTRACT.md`

Treat them as the source of truth.

### Product intent

This is a **session-linked digital workbook** that carries the experiential learning of the MindForest game into everyday life.

It must NOT turn into:
- a generic meditation app,
- a habit tracker,
- a gamified task manager,
- a dashboard,
- or an AI therapist.

The key product rule is:

> Sessions unfold sequentially; practices accumulate.

The key UX rule is:

> Experience before technique.

Each session should first remind the participant of the concrete MindForest experience and then translate that experience into one small home practice. Formal/everyday mindfulness practices are secondary support, not the visual hero.

### Implementation strategy

Build **Phase A: a fully navigable frontend prototype only**.

Use the existing repository stack if one already exists.

If this is a new repository, use:
- Next.js App Router
- TypeScript
- Tailwind CSS

Do NOT add a backend, Supabase, Firebase, authentication, analytics, or LLM calls in this phase.

Use seed content from the specification and browser `localStorage` for demo entries and practice plans.

### Required routes

Implement:

- `/sessions`
- `/sessions/[sessionId]`
- `/practices/[practiceId]`
- `/entries`
- `/entries/new`
- `/entries/[entryId]`
- `/my-practice`

### Required behavior

1. Show all 8 session titles in the session index.
2. Only current and past session details are accessible.
3. Future session details remain inaccessible.
4. Once a Practice is introduced, it remains accessible in later sessions.
5. Practice is NEVER modeled as completed/failed.
6. Recording is optional.
7. A record does not prove practice completion.
8. Session pages prioritize:
   - MindForest memory cue
   - one representative home practice
   - small supporting-practice list
   - one reflection CTA
9. Session 7 introduces personal practice selection.
10. Session 8 turns prior practices into a personal Practice Kit.
11. Post-course mode may use `/my-practice` as the default landing page.
12. Entries can be created, viewed, edited, and deleted.
13. Practice plans can be created, edited, and deleted.
14. All worksheet variants are rendered using one schema-driven `EntryForm`.

### Visual direction

Make the UI feel like:

**a very well-designed workbook that still remembers the MindForest game**

—not a commercial meditation app.

Use:
- white or warm off-white background,
- near-black text,
- one restrained forest-green accent,
- generous whitespace,
- thin dividers,
- very limited cards,
- strong typographic hierarchy.

Do NOT:
- use generic forest stock photos,
- cover every section in green cards,
- use gradient-heavy wellness design,
- use dashboard charts,
- use excessive rounded cards.

Each session may have ONE small symbolic visual recalling the game.

If final art assets do not exist, make simple replaceable placeholder SVGs in `/public/session-art/`.
Do not spend time producing elaborate illustrations.

### Forbidden features

Do not implement:
- streaks
- XP
- badges
- levels
- progress percentages
- leaderboards
- missed/overdue warnings
- mood scores
- mindfulness scores
- AI interpretations
- sentiment analysis
- recommendation algorithms
- social/community features

### Content constraints

Use `02_CONTENT_MODEL.md` exactly for session meaning and prompts.

Do not invent new therapeutic claims.

Do not copy long text from the source MBCT workbook.

Keep copy concise and Korean-first.

If a content point is ambiguous, choose the least assumptive implementation and add a short note to `DECISIONS.md` rather than inventing content.

### Data/privacy constraints

This prototype must not send reflection text anywhere.

Keep demo data in local browser storage only.

No real participant identity is needed.

### Component model

Prefer reusable components:

- `SessionList`
- `SessionHeader`
- `SessionMemoryCue`
- `HomePracticeBlock`
- `PracticeListItem`
- `PracticeGuide`
- `AudioGuide`
- `EntryForm`
- `EntryList`
- `EntryListItem`
- `PracticePlanBuilder`

Do not create a separate React component family for every worksheet.

### Development sequence

Work in this order:

#### Step 1 — inspect
Inspect the repo and the four specification files.

#### Step 2 — plan
Create a concise implementation plan and file tree.
Do not change the product information architecture.

#### Step 3 — data
Implement typed session/practice/schema seed data first.

#### Step 4 — core pages
Implement session list, session detail, and practice detail.

#### Step 5 — records
Implement schema-driven entry form and CRUD with localStorage.

#### Step 6 — sessions 7–8
Implement personal practice plan / Practice Kit.

#### Step 7 — polish
Apply the minimal visual system and mobile responsive behavior.

#### Step 8 — QA
Run lint/typecheck/build and fix all errors.

### Final output

When finished, report:

1. files created/changed
2. routes implemented
3. data persistence behavior
4. any decisions recorded in `DECISIONS.md`
5. commands used to verify the app
6. anything still requiring researcher-provided assets or decisions

Do not add features outside the specification merely because they are common in wellness apps.

---

# Recommended Codex follow-up prompts

## A. First visual review

After the first implementation:

> Review the implementation against `01_PRODUCT_SPEC.md` section by section. Remove any UI that feels like a dashboard, habit tracker, or generic meditation app. Reduce card nesting and repeated explanatory copy. On each session page, make the MindForest memory cue and the single representative home practice visually primary. Do not change content meaning.

## B. Mobile simplification

> Test every route at a 390px mobile viewport. For each page, identify the one primary user action and simplify everything competing with it. Preserve the required information architecture. Do not remove the session-specific MindForest cue.

## C. Content fidelity audit

> Audit all user-facing Korean text against `02_CONTENT_MODEL.md`. Flag any wording that introduces a therapeutic claim, perfectionism framing, or a practice not supported by the spec. Correct those issues without adding new content.

## D. Technical cleanup

> Run typecheck, lint, and production build. Remove dead components, duplicate styles, duplicated practice content, and unnecessary dependencies. Keep content centralized in `src/content`. Report any remaining warnings.

## E. Before adding a backend

Do NOT simply tell Codex to “add Supabase”.

First provide the approved research requirements, then use:

> The frontend prototype is approved. Before implementing any backend, read the attached IRB/data requirements. Propose the minimal data model, participant authentication method, data retention/deletion behavior, and researcher access model. Do not implement until you identify any conflict between the research protocol and the current prototype.
