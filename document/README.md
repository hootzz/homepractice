# MindForest Home Practice — Implementation Package

이 폴더는 **MindForest 1–8회기와 연결되는 디지털 홈 프랙티스 워크북**을 구현하기 위한 source of truth입니다.

## 문서 우선순위

1. `01_PRODUCT_SPEC.md` — 제품 목적, IA, 페이지 역할, UX 원칙
2. `02_CONTENT_MODEL.md` — 1–8회기 콘텐츠, MindForest 장면 연결, home practice, 기록 질문
3. `03_IMPLEMENTATION_CONTRACT.md` — route, data model, state, component, 접근 규칙, UI 제약
4. `04_CODEX_BUILD_PROMPT.md` — Codex에 그대로 전달할 구현 지시문

문서 간 충돌이 있으면 위 순서를 따릅니다.

---

## 핵심 한 문장

> **회기는 순차적으로 열리고, 연습은 누적되며, 게임에서 경험한 행동은 일상에서 다시 해볼 수 있는 작은 홈 프랙티스로 이어진다.**

---

## 이 제품이 아닌 것

- 일반 명상 콘텐츠 라이브러리
- 숙제 제출/출석 관리 도구
- streak·XP·badge 기반 habit app
- 사용자의 마음챙김 수준을 평가하는 도구
- 자율적 치료사/진단 도구
- 완벽주의 완화 전용 서비스
- 8주 MBCT 자체를 대체하는 서비스

---

## 설계 방향

### 1. MindForest가 앞, MBCT support가 뒤

각 회기의 첫 경험은 `Body Scan`, `3-Step Breathing Space` 같은 기법 이름부터 시작하지 않습니다.

먼저 사용자가 **MindForest에서 무엇을 경험했는지** 짧게 떠올리게 하고, 그 경험을 현실의 작은 행동으로 옮깁니다.

예:

`3회기 숲길에서 주의가 흩어짐 → 발걸음·접촉감으로 돌아옴 → 현실의 짧은 길에서 다시 해보기`

그 아래에 필요한 formal/everyday practice를 보조적으로 연결합니다.

### 2. 미니멀한 워크북

- 한 화면의 주된 질문은 하나
- 설명은 짧게
- 카드 중첩 최소화
- 입력 필드는 필요한 것만
- generic wellness dashboard 금지
- generic stock forest photo 금지

### 3. Practice는 task가 아님

Practice에는 `완료/실패` 상태를 두지 않습니다.

한 번 소개된 practice는 이후에도 다시 접근할 수 있습니다.

### 4. 점진적 공개

과정 중에는 아직 경험하지 않은 회기의 세부 콘텐츠를 열지 않습니다.

후반부에 처음으로 사용자가 자기 practice를 고르고 삶의 상황과 연결합니다.

---

## 출처/저작권 메모

설계는 다음 프로젝트 자료를 기반으로 정리되었습니다.

- `MBCT-L-Participant-Workbook.pdf`
- `MindWalking 1-8회기 전체 시나리오 및 액션.pdf`
- `02_2단계_공통_연구설명서(3).docx`
- 기존 1–8회기 한국어 자료

Oxford Mindfulness Centre workbook의 문구를 공개 사이트에 그대로 복제하지 않습니다.
실제 제품 문구는 **기능과 학습 의도를 보존한 자체 한국어 표현**으로 작성합니다.

---

## 추천 개발 순서

### Phase A — UX prototype
- Next.js + TypeScript
- seed content
- local-only demo data
- 모든 핵심 flow 구현
- 실제 연구 데이터 저장 없음

### Phase B — content/visual review
- 연구팀이 1–8회기 문구 검토
- 회기별 visual asset 교체
- 모바일 실제 사용성 점검

### Phase C — research backend
IRB/연구 프로토콜에 맞춰 별도로 결정합니다.
- participant auth
- database
- research logs
- retention/deletion policy

**Phase A에서 임의로 민감한 reflection data를 서버에 저장하지 않습니다.**
