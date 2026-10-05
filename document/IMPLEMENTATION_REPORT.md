# MindForest Home Practice — 앱 구현 보고

2026-10-06. 승인된 Session Complete / Bundle 정책을 적용한 로컬 프런트엔드다. 콘텐츠 정책 문서는 재설계하지 않았다.

## 1. Current state

기존 Next.js/TypeScript의 홈, 회기 목록/상세, 연습 상세, 기록 목록/작성/상세, 나의 연습 화면을 새 상태 모델로 연결했다. 기존 고정 current-session 설정과 v1 계획 UI는 런타임에서 사용하지 않는다. 실제 게임 연동과 최종 콘텐츠 출판은 완료되지 않았다.

## 2. Implemented changes

typed content release, SessionPracticeBundle, Progress, 누적 Repertoire, S8 PracticeKit, schema 기반 선택 기록, localStorage v3를 구현했다. `/weekly/[taskId]`, `/demo`를 추가했다. 실제 사용 가능한 콘텐츠와 검토용 demo 콘텐츠는 별도 manifest와 저장 공간을 사용한다.

## 3. Interaction changes

단계별/전체 안내 펼치기, 추가 기록 질문 펼치기, Kit 선택/수정/제거, 180–200ms 피드백과 작은 눌림 효과를 적용했다. reduced-motion, 명시적 label/focus, 최소 16px 본문 및 44px 조작 영역을 반영했다. 성취 보상·수행률·자동 추천은 없다.

## 4. Progression / Bundle behavior

정확히 완료된 회기의 Bundle만 접근한다. 이전 Regular는 유지하며 S8에는 신규 Regular가 없다. URL/기록/audio/Kit은 completion을 생성하지 않는다. receipt나 참가자별 action 증빙은 접근 조건에 없다.

현재 demo에는 검토 후보 Regular 두 개(걸으며 돌아오기, 3단계로 돌아오기; S3)와 회기별 WeeklyTask가 있다. 최초 demo 완료 상태는 명시적인 S1–S3 fixture다. `/demo`는 선택한 회기만 추가한다. actual manifest는 최종 출판 근거가 확정되지 않아 비어 있다. 이는 참가자별 evidence gate가 아닌 콘텐츠 출판 미확정 상태다.

## 5. Practice Kit behavior

S8 이전에도 Repertoire를 볼 수 있다. 직접 선택 UI는 S8 완료 후 표시하며 열린 Regular만 선택한다. 개수 제한과 자동 선택이 없고 cue/situation/personalReason은 선택 입력이다. 제거해도 Repertoire는 유지한다. 게임 Kit와 웹 Kit는 동기화된 것으로 간주하지 않는다.

## 6. PDF / record behavior

모든 질문은 선택이며 공백만 있는 새 기록은 생성하지 않는다. ‘잘 모르겠어요’는 유효 응답이다. CRUD, 질문/연습 이름 snapshot, 이전 기록의 알 수 없는 필드 표시를 지원한다. 저장 실패 시 작성 폼을 유지한다.

PDF에는 생성일, 회기 순서의 작성 기록, 날짜/연습/질문/원문 답변과 새 PracticeKit을 넣는다. 원문을 서버로 전송하지 않는다. canvas 이미지형 PDF라 텍스트 검색/선택 및 PDF 접근성 한계가 있다. 기존 PracticePlan은 저장소에 보존하되 새 Kit로 자동 변환하지 않는다.

v1은 demo로, v2는 해당 namespace로 마이그레이션한다. 기존 키와 원문 snapshot을 보존한다. explicit completedSessionIds만 옮기며 receipts/currentSession은 진행으로 해석하지 않는다. 손상된 v3나 release 불일치는 덮어쓰지 않는다. localStorage는 인증·서버 보안 경계가 아니다.

## 7. Files changed

- `src/content/workbook.ts`: 회기/copy/검토 manifest/기록 schema.
- `src/lib/workbookTypes.ts`, `access.ts`, `config.ts`, `gameAdapter.ts`, `workbookStorage.ts`: 타입, 접근, namespace, adapter, migration.
- `src/components/WorkbookProvider.tsx`, `WorkbookScreens.tsx`, `WorkbookEntries.tsx`, `MyPractice.tsx`: 실제 화면과 상태.
- `src/components/RecordPdfExport.tsx`, `src/lib/recordPdf.ts`: 새 Kit PDF 연결.
- `src/app/` 경로, layout, CSS 및 Navigation: 화면 연결과 상호작용.
- `tests/workbook.test.cjs`, `package.json`, `README.md`, 이 보고서와 PDF 검증 문서.

기존 content 파일은 이전 기록의 이름/질문 복원용으로 유지한다. 현재 화면은 이전 전체 practice catalog를 사용하지 않는다.

## 8. Tests passed

`npm test` 13개 통과: manifest 무결성, 직접 접근 조건, exact-session 누적, S8 Kit, S8 단독 완료 시 후보 생성 금지, 기록 CRUD, actual/demo 분리, v1/v2 migration, 손상 데이터 및 저장 실패, PDF 내용과 페이지 구조. `npm run typecheck`, `npm run lint`, `npm run build` 모두 통과했다.

접근/CRUD 테스트는 실제 TypeScript 모듈과 메모리 저장소를 사용한 단위 검증이다. PDF 페이지 검증은 canvas 대역이며 실제 브라우저 시각 검증을 대체하지 않는다.

## 9. Human visual checks still required

**human visual check required**. 연결 브라우저가 없고 이전 headless Chrome 실행도 환경 오류로 실패했다. 390px 화면, 한글 줄바꿈, 키보드/스크린리더 사용, 실제 클릭 흐름, 긴 한글 PDF 다운로드와 페이지 렌더링을 사람이 확인해야 한다.

## 10. Blocked dependencies

- `BLOCKED_GAME_COMPLETION_SYNC`: 실제 게임 회기 완료 전달 계약.
- `BLOCKED_GAME_KIT_SYNC`: 게임/웹 Kit 동기화 계약.
- `BLOCKED_CONTENT_RELEASE`: 실제 배포용 Bundle 최종 확정.
- 검증된 한국어 공식 audio와 사용 권한. 현재 오디오 없이 글 안내로 동작한다.

## 11. Remaining content decisions

권위 있는 배포 버전 및 Drive V3.3 원본, S3 실제 도달 경로, S2 Body Scan 구현/용량, 50:50, S4 stale responsive-breathing controller, S5–S6 버전 차이, 공식 Practice Book/프로토콜 관계를 확정해야 한다. S4는 Recognize에 머물며 새 호흡 Regular를 추가하지 않았다. 시간/빈도/audio requirement는 근거가 없으면 unspecified다.

## 12. Next integration point

확정된 콘텐츠를 `getRelease('actual')`에 출판하고 `GameCompletionAdapter.subscribe`에 신뢰 가능한 회기 완료 이벤트를 연결한다. 배포 버전 전환 시 기존 contentReleaseId의 명시적 migration을 추가해야 한다. 임의 backend나 action-level gate는 도입하지 않는다.

## Addendum 2026-10-06 — Interactive presentation layer

[INTERACTIVE_REWRITE](./HOME_PRACTICE_INTERACTIVE_REWRITE.md)를 앱에 적용했다. 접근 모델·manifest·Bundle·Kit gate는 변경하지 않았다.

- `src/content/presentation.ts`: content id별 scene cue / interaction / stepTitles / reflectionKeys와 `guidedSteps()`. S6 3단계 안내는 `breathing_space`가 이미 접근 가능할 때만 렌더링하며 unlock하지 않는다.
- `src/components/GuidedPractice.tsx`: A 장면 cue → B 회기별 작은 조작(S1 겉/안 + 상황칩, S2 몸 카드 펼침, S3 길 선택, S4 반응 흐름 네 칸, S5 anchor 선택 + `익숙한 감각으로 돌아오기`, S6 사건/상태/해석 탭, S7 영향칩, S8 열린 연습 다시 보기, 호흡공간 세 단계 미리보기) → C 한 단계씩(이어서 살펴보기 / 앞의 안내 / 여기서 마치기 / 전체 안내 살펴보기, 단계 제목 focus 이동) → D 마지막 단계에서 선택 기록(rewrite의 질문 1–2개 먼저, 나머지는 `조금 더 남기기`).
- B 선택·단계 위치는 메모리 상태만이며 storage/Entry/Kit/completion에 쓰지 않는다(브라우저 QA로 확인).
- `SceneSketch.tsx`: “장면을 떠올리는 그림”으로 표기한 선화. 게임 캡처나 NPC 초상으로 표시하지 않는다. 미확정 NPC명(거북이)을 S2 memoryCue에서 제거. `public/session-art/*.svg` placeholder는 더 이상 화면에서 쓰지 않는다.
- `workbook.ts` WeeklyTask 단계 문구를 rewrite 문구로 교체(S2·S4·S5·S6 4단계). 기존 기록은 questionSnapshot으로 보존되므로 영향 없음.
- 저장 실패 시 전역 alert 중복 제거, 폼 옆 한국어 오류 + 입력 보존. Kit 항목 필드 라벨, `언제 해볼지 적기`, 선택 상태 텍스트 표시.

### QA (이번 실행)

- `npm run typecheck`, `npm run lint`, `npm test`(16/16: presentation 무결성·S6 조건 단계·S4 Recognize 경계·금지 어휘/동물 NPC명 검사 추가), `npm run build` 통과.
- 로컬 Chrome headless(playwright-core, 390×844)로 production 서버 49개 시나리오 통과: S1–S8 흐름, 직접 URL 차단, 단계 이동/기록이 completion 불변, 빈 기록 미생성, 저장 실패 시 입력 유지·재시도 1건 저장, S8 이전 Kit 비노출, Kit 선택/필드/제거 후 Repertoire 유지, 기록 수정·삭제, PDF 다운로드(%PDF 헤더), 키보드 칩 선택, 44px 터치 대상, 390px 가로 스크롤 없음, 콘솔 오류 없음.
- 남은 human visual check: 실제 휴대폰 기기, 스크린리더 낭독, 200% zoom, PDF 안 한글 렌더링 육안 확인.

## Addendum 2026-10-06 (2) — 단순화: 장면 → 오늘 해보기 → 선택 기록

위 "Interactive presentation layer"의 4블록·stepper 구조를 대체했다. 결정은 [REDESIGN §4a](./HOME_PRACTICE_REDESIGN.md), 이미지 출처는 [SCENE_ASSETS](./SCENE_ASSETS.md).

- `/sessions/sN`이 곧 Home Practice 화면이다: 대표 장면 1장(실제 캡처 S1·S2·S3·S5·S6·S8, 선화 S4·S7) · `S3 · 사슴` · 명사형 제목 · 게임 한 줄 → `오늘 해보기`(1–3문장, 조작 최대 1개) → `경험 남기기 (선택)` 접힘. `/weekly/[taskId]`는 해당 회기로 redirect(접근 판정은 회기 화면에서 동일하게 수행).
- `GuidedPractice`(stepper/전체 안내/단계 패널) 제거 → `HomePractice`. stepper는 `breathing_space`에만 남음. `walking_return`은 짧은 목록.
- 선택칩은 화면 상태만이며, 기록을 열 때 해당 칸을 미리 채운다. 저장은 `기록 저장`에서만. S1·S2·S3·S5의 `오늘 해보기`는 "화면은 닫아도 괜찮아요" 상태로 바뀔 뿐 아무것도 저장하지 않는다.
- 기록 schema `*_v2` 신설, 이전 schema 유지(기존 기록 키·snapshot 보존). release id 불변으로 기존 v3 저장소 호환.
- Kit 화면을 Repertoire 단일 목록 + `가져가기`/`Kit에서 빼기` + `언제? / 어떤 상황에서? / 왜 가져가고 싶나요?`로 단순화. S8 회기 화면에는 중복 기록 블록 없음.
- 미사용 `public/session-art/*` placeholder(거북이·꿀단지 등)와 관련 CSS 삭제.

검증: typecheck, lint, `npm test` 18/18, production build. Chrome headless 390×844 실제 흐름 40개 통과(legacy v1 기록 보존, 선택→prefill→저장 실패 시 입력 유지→재시도 1건, 빈 기록 미생성, 잠긴 회기/redirect/기록 route 차단, completion 불변, 호흡공간 3단계, S4 입력 없는 흐름 그림, S6 정식 호흡 링크, S8 Kit 선택·필드·제거, PDF 다운로드, 수정, 44px, 키보드, 가로 스크롤 없음, 콘솔 오류 없음). S1–S8 화면 모두 스크롤 전 장면과 오늘 할 일 확인.

## Addendum 2026-10-06 (3) — 한 페이지 점진적 펼침 · MaruBuri · 오디오 상태

REDESIGN §4b 적용. `HomePractice`를 REMEMBER → TRY → REFLECT 상태로 재구성(첫 화면: 장면·S#·제목·브리지 문구·한 문장·`오늘 해보기`만, 폼/목록 숨김). 선택 시 "화면은 닫아도 괜찮아요" 줄로 마무리하고 별도 확인 버튼 제거. 기록은 `경험 남기기 +`로만 열리고 핵심 질문 하나를 먼저 보이며 열면 질문에 focus. Regular는 한국어 정식 명칭과 `mbct` 출처, `audioState()` 4-case 오디오 규칙. 게임 대화체와 같은 MaruBuri를 woff2 subset으로 자체 호스팅([BRAND_TYPE](./BRAND_TYPE.md)). `next/image` 최적화 srcset이 430px·데스크톱에서 요청되지 않던 결함을 발견해 사전 축소된 장면 JPEG를 `unoptimized`로 제공.

검증: typecheck, lint, `npm test` 21/21, build. Chrome 390/430/1280 실제 흐름 54개 통과(첫 화면 예산·숨김 상태, reveal 뒤 focus, 선택이 저장/완료에 영향 없음, 기록 접힘 시 초안 유지, 저장 실패 시 입력 유지, 정식 명칭·영어 외부 링크 표기·한국어 CTA 부재, 호흡공간 3단계, S4–S8, Kit, PDF, 수정, legacy, 키보드, 44px, 14px 이상, reduced motion, 가로 넘침 없음, 장면 이미지 실제 디코드, 콘솔 오류 없음).

## Addendum 2026-10-06 (4) — 단계 복원 · 문구 정리 · 앱 안 오디오

REDESIGN §4c. TRY를 3–5단계 step-through로 복원(초기 rewrite 기준), 선택은 해당 단계 칩 + 이후 단계 태그, S4 흐름 한 줄 + 질문 제목, S6 숨 고르기 단계에서 3단계 호흡 공간을 화면 이동 없이 펼침, S8 Kit 단계. `화면은 닫아도 괜찮아요` 전부 제거, 정식 연습의 출처·쪽수 줄 제거, 외부 이동 오디오 링크 제거 → 확인된 음원만 앱 안 플레이어(파일/YouTube 임베드). 사용자가 직접 써 보는 방식으로 S1–S8·정식 연습 단계별 스크린 점검 후 반복 문구·중복 제목·이탈 동선을 정리.

검증: typecheck, lint, `npm test` 21/21, build, Chrome 390/430/1280 흐름 57개 통과. 한국어 음원 탐색 결과와 남은 결정은 KOREAN_MBCT_AUDIO_MAPPING "앱 적용" 절.

## Addendum 2026-10-06 (5) — 한국어 안내 연결

3단계 호흡 공간·마음챙김 걷기에 한국MBSR마음챙김연구소(안희영) 공개 YouTube 안내를 앱 안 임베드로 연결(`n5Sg3KDaw64`, `5ZXdug0sL0o`). 한국어 자막으로 절차 일치를 확인했고, 브라우저에서 실제 재생(외부 이동 없음)과 S6 펼침 재생을 확인. 테스트 21/21, 브라우저 57개 통과. 근거·대체 후보는 KOREAN_MBCT_AUDIO_MAPPING.

## Addendum 2026-10-06 (6) — 끝 선택지 · 언제든 연습 카드 · 페르소나 점검

REDESIGN §4d. 마지막 단계의 `경험 남기기 / 여기서 마치기`, 하단 `언제든 할 수 있는 마음챙김 연습` 카드, 출처 회기 라벨 제거. 7개 페르소나 × 50회 자동 실행 2회(1회차 실패 6건은 테스트 스크립트 결함, 2회차 4,540개 검사 0 실패)와 화면 검토로 S8 버튼 배치·줄바꿈, S6 안전 문구, 기록 미리보기, 취소 후 focus, 빈 저장 후 버튼을 고침. typecheck, lint, 21/21, build, 회귀 57/57.
