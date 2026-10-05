# Home Practice UI copy table

> **2026-10-06 갱신:** 이 문서의 4블록·stepper·회기별 다중 인터랙션 설계는 [REDESIGN §4a](./HOME_PRACTICE_REDESIGN.md) 단순화 결정(장면 → 오늘 해보기 → 선택 기록, 조작 최대 1개, 명사형 제목)으로 대체되었다. 아래는 이력 기록이다.


2026-10-06. 표현 계층의 수정안이다. 현재 copy는 `src/content/workbook.ts`, `src/components/WorkbookScreens.tsx`, `WorkbookEntries.tsx`, `MyPractice.tsx` 기준이다. `신규`는 새 practice가 아닌 새 UI 요소다. 회기/과제 이름과 ID는 유지한다. 전체 단계·장면 근거는 [Interactive rewrite](./HOME_PRACTICE_INTERACTIVE_REWRITE.md), 동작 계약은 [Interaction pattern](./HOME_PRACTICE_INTERACTION_PATTERN.md)을 따른다.

## 공통 요소

| Session | Screen/Block | UI element | Current copy | Revised copy | Notes |
|---|---|---|---|---|---|
| 전체 | A 장면 | eyebrow | 이번 이야기에서 이어가기 | 이번 이야기에서 이어가기 | 유지 |
| 전체 | B 진입 | skip button | 신규 | 고르지 않고 이어가기 | 선택 없이도 동일한 안내 접근 |
| 전체 | C 안내 | next button | 다음 안내 펼치기 | 다음 안내 | 이전 카드를 쌓지 않고 현재 카드 교체; 단계 제목도 표시 |
| 전체 | C 안내 | back button | 신규 | 앞의 안내 | 선택/작성 초안 유지 |
| 전체 | C 안내 | exit button | 기록 없이 돌아가기 | 여기서 마치기 | 어느 단계에서든 가능; 수행 완료 데이터 생성 안 함 |
| 전체 | C 안내 | overview accordion | 안내 모두 보기 | 전체 안내 살펴보기 | 기본 닫힘; 읽기용 대체 경로, 필수 단계 클릭 검사 없음 |
| 전체 | D 기록 | reveal button | 경험 남기기 | 원하면 경험 남기기 | 기본 닫힘; 열어도 자동 기록 생성 안 함 |
| 전체 | D 기록 | subtitle | 남기고 싶은 것만 적어요. 모든 질문은 선택이고, 잘했는지 평가하지 않아요. | 남기고 싶은 만큼만 적어요. | 선택 표시는 각 label에 유지; 무평가 정책 유지 |
| 전체 | D 기록 | skip button | 기록 없이 돌아가기 | 기록 없이 돌아가기 | 유지; 눈에 보이는 별도 경로 |
| 전체 | D 기록 | unknown button | 잘 모르겠어요 | 잘 모르겠어요 | 유지; 선택 자체는 저장 아님 |
| 전체 | D 기록 | save button | 기록 저장 | 기록 저장 | 명시적으로 저장할 때만 Entry 생성 |
| 전체 | D 기록 | saved status | 저장했어요. | 저장했어요. | 기록 저장 사실만 안내, 연습 수행 평가 아님 |
| 전체 | D 기록 | error | 저장하지 못했어요. 적은 내용은 화면에 남아 있어요. | 저장하지 못했어요. 적은 내용은 화면에 남아 있어요. | 유지; 재시도 시 중복 생성 방지 |
| 전체 | audio | unavailable | 현재 연결된 오디오 안내는 없어요. 위의 글 안내로 연습할 수 있어요. | 연결된 오디오는 없어요. 글 안내로 이어가요. | 기본 텍스트 경로; 오디오 없음 자체가 잠금 아님 |
| 전체 | audio | verified external label | 안내 듣기 | 안내 듣기 · 영어 · 외부 음원 | 영어 자산의 매핑/사용 범위가 검증됐을 때만; 현재 신규 음원 연결 없음 |
| S1–S7 | 이어보기 | Repertoire link | 계속 가져갈 연습 | 지금까지 가져가는 연습 | 기존 열린 Regular만; Kit 선택 CTA 아님; 빈 슬롯 없음 |
| S8 | Kit | CTA | 일상에 가져갈 연습 고르기 | 일상에 가져갈 연습 고르기 | 유지; S8 완료 및 열린 Regular 조건 유지 |

## 회기별 대조

아래 표의 단계 문구는 구현용 최종 rewrite와 함께 사용한다. 한 행의 슬래시는 선택지 구분이며 문장 전체를 하나의 버튼에 넣지 않는다. 반영 시 기존 기록의 questionSnapshot을 바꾸지 않는다.
