# MindForest Home Practice 재설계 — Session Bundle 최종 정책

2026-10-05 최신 사용자 결정이 이전 접근 설계를 대체한다. **Session Complete → 해당 SessionPracticeBundle unlock → 과거 Regular 누적 유지 → S8에서 직접 선택한 Practice Kit**. 이 문서는 콘텐츠 정책이며 Bundle 접근 모델의 앱 적용 완료를 주장하지 않는다.

## 1. Scope와 두 가지 흐름

MindForest Home Practice는 MBCT-L 전체 home-practice curriculum의 디지털화가 아니다. MindForest에서 교육되는 MBCT-informed experiential functions를 일상으로 일반화하고 유지하는 between-session practice layer다. 정식 연구 프로토콜의 추가 MBCT 과제는 별도 intervention-protocol layer로 관리한다.

**사전 콘텐츠 감사:** 최신 V3.3 0903 시나리오 + 실제 GDTi/Unity 구현 + 정식 한국어 MBCT/Mindfulness for Life Practice Book → Game experience → Preserved Function/Fidelity Boundary → Everyday Generalization → SessionPracticeBundle 확정.

**사용자 런타임:** 해당 회기 완료 → 확정된 Bundle 전체 접근 → Regular 자동 누적(Repertoire) → S8 완료 후 사용자가 선택한 subset(Practice Kit).

Game action과 구현 증거는 무엇을 Bundle에 넣는지 판단하는 근거다. 참가자별 action 확인·receipt·연구자 인증은 접근 조건이 아니다. 회기 완료는 서비스 진행 상태이며 마음챙김 성공, 심리적 역량 또는 치료 효과의 증거로 해석하지 않는다. 특정 회기를 화면에서 여는 것과 실제 완료 상태는 구분한다.

## 2. Regular / Session-specific / Repertoire / Kit

- Regular Practice = **정식 MBCT Practice ∩ MindForest에서 실제 구현·교육되는 Practice**. 해당 회기 완료로 열리고 이후 회기와 과정 종료 후에도 유지된다.
- Session-Specific Practice / WeeklyTask = 게임 고유의 경험을 해당 주의 일상에서 일반화하는 제안. 회기 완료로 열리며 다음 회기에는 강조만 낮아진다. 과거 과제와 기록은 다시 볼 수 있다.
- Learned Repertoire = 완료된 회기 Bundle의 Regular 전체 자동 누적 집합. 저장 버튼이나 기록 없이 생긴다. 학습 성과 인증이 아니다.
- Practice Kit = S8 완료 후 Repertoire 중 사용자가 직접 고른 subset. cue / situation / personal reason을 선택적으로 연결한다. WeeklyTask·외부 catalog는 Kit 후보가 아니다.
- S1–7은 ‘지금까지 배운 연습 / 계속 가져갈 연습’이다. S7의 자기돌봄 선택 과제가 곧 Kit 저장을 뜻하지 않는다. S8에서는 새 Regular나 library를 열지 않는다.

## 3. 회기별 content policy와 누적

다음은 **출판 후보와 선정 원칙**이다. 정식 한국어 책의 관련 절차는 확인했으나 최신 시나리오와 실제 배포 흐름까지 교차 대응하기 전 Regular 출판을 확정하지 않는다. content pending을 참가자별 증빙 gate로 바꾸지 않는다. 확정 Bundle은 해당 회기 완료만으로 열린다. 상세 근거는 [SESSION_SOURCE_AUDIT.md](./SESSION_SOURCE_AUDIT.md), [IMPLEMENTED_PRACTICE_AUDIT.md](./IMPLEMENTED_PRACTICE_AUDIT.md), [KOREAN_MBCT_AUDIO_MAPPING.md](./KOREAN_MBCT_AUDIO_MAPPING.md)를 본다.

| Session | 게임 경험 / 사전 감사 대상 | 보존할 기능 | Fidelity boundary | Regular 후보(교차 확인 후에만 포함) | Session-specific 제안 | Unlock / 이후 유지 / Kit |
|---|---|---|---|---|---|---|
| S1 | 실제 코드의 호두 관찰·먹기; 이전 자료의 도토리와 구분 | 자동 행동 잠시 끊기; 감각적 호기심 | 감각 정답·특별한 느낌 요구 아님 | 정식 먹기/감각 연습의 해당 절차 대응 미확정; 일반 감각카드를 임의 Regular로 만들지 않음 | 익숙한 행동 앞에서 멈추기 | S1 완료; 승인 Regular 지속·S8 선택 가능; 과제 재방문 |
| S2 | 기다림의 생각·감정·몸; Body Scan flow와 실제 연결 확인 | 생각 중심 처리에서 직접 몸 경험으로; 생각/감정/몸 구분 | 생각 고치기 아님; 짧은 scan을 정식 전체 과제와 동일시 금지 | 바디 스캔: 한국어 책 PDF p56 절차 확인; 실제 교육 연결 pending | 기다리는 동안 몸 살피기 | S2 완료; 위와 동일 |
| S3 | 걷기 중 주의 이탈과 발로 돌아오기; 세 단계 호흡 flow | 이탈 알아차림; 평가 없이 anchor 복귀 | 주의가 절대 흐트러지지 않기 아님; 호흡 세 단계 생략 금지 | 마음챙김 걷기(PDF p80) / 호흡 공간법(p83) 절차 대응; 배포 흐름 확인 후 승인 | 실제 이동 중 마음이 간 곳과 돌아온 감각 살피기 | S3 완료; 위와 동일 |
| S4 | 실제 active scene의 반응 관찰·responsive breathing-space; 판본 확인 | discomfort → urge → reaction 관찰; 선택 여지 | 충동 제거·도덕 평가 아님 | 3단계 호흡 공간 다시 마주하기(PDF p102)와 실제 controller 절차를 대조; 기존 연습 중복 추가 금지 | 반응의 흐름 돌아보기 | S4 완료; 과거 Regular 지속 |
| S5 | 실제 수문/anchor/불편함 흐름을 구현 감사로 확정 | 즉시 제거 반응 알아차림; 가능한 접촉과 anchor 복귀 | allowing ≠ 참기/견뎌야 함/좋아하게 만들기 | 독립 정식 연습 대응 없으면 신규 Regular 없음 | 가벼운 불편함 살펴보기 | S5 완료; 과거 Regular 지속 |
| S6 | 실제 event/state/interpretation 흐름; 다른 판본의 fact/inference 카드와 혼합 금지 | 사건/상태/해석 구분; 생각과 사실 사이 거리 | decentering ≠ 논박/삭제/긍정 대체 | 독립 정식 연습 대응 없으면 신규 Regular 없음 | 한 장면 나누어 보기 | S6 완료; 과거 Regular 지속 |
| S7 | 활동 영향과 자기돌봄 행동 선택 | 활동 영향 알아차림; 의도적 돌봄 선택 | 생산성 점수·좋은/나쁜 활동 고정 분류 아님 | 자기돌봄 선택을 임의 Regular로 등록하지 않음 | 오늘의 활동 돌아보기 | S7 완료; 과거 Regular 지속; Kit은 아직 구성하지 않음 |
| S8 | 배운 연습과 삶의 cue/개인 이유 연결 | 자기주도적 장기 실천으로 전환 | 새 technique/library·수행 성공 판정 금지 | 신규 없음 | 나에게 맞게 이어가기 | S8 완료; 열린 Regular 중 직접 선택해 Kit 구성 |

과거 R01–R08 목록은 확정 Regular 목록이 아니다. sensory/urge/allowing/thought/care의 게임 일반화는 우선 WeeklyTask로 둔다. 정식 책과 실제 구현의 교집합을 확인한 경우에만 별도 Regular로 승인한다. 새 Regular가 없는 회기도 가능하며 카드 수를 늘리려고 연습을 만들지 않는다.

### 용량·오디오·기록

`game duration`, `home duration`, `frequency`, `audio requirement`는 별개 필드다. 근거가 없으면 `unspecified`. 게임의 짧은 안내나 음원 길이에서 home 용량을 추론하지 않는다. Body Scan을 무조건 1–5분으로 압축하지 않는다. 호흡공간의 단계, S5의 중지/anchor 복귀, S6의 탈중심화 기능을 편의상 삭제하지 않는다. 화면은 짧게 나누되 경험 과정을 임의 축약하지 않는다. 한국어 명칭·정식 과제 구조·시간/빈도·공식 audio·이용 조건은 별도 mapping 문서에서 확인 상태를 구분한다. 『삶과 함께하는 마음챙김』 한국어판 PDF p56은 바디 스캔을 가능하면 매일 한 번 권하지만 분량은 명시하지 않는다. p80의 마음챙김 걷기는 매일 걷는 길의 맥락이며 횟수/분은 미명시다. p83 호흡 공간법과 p102 다시 마주하기의 횟수/분도 근거 없이 붙이지 않는다. 해당 책의 안내를 MindForest 연구 프로토콜의 처방으로 채택할지는 별도 결정한다.

기록 질문 제안: S1 무엇을 알아차렸나요? / S2 몸에서는 무엇이 느껴졌나요? / S3 마음은 어디로 갔고 무엇으로 돌아왔나요? / S4 무엇을 하고 싶었고 다음에 무엇을 선택했나요? / S5 돌아올 감각은 무엇이었나요? / S6 실제 일과 떠오른 설명은 무엇인가요? / S7 활동은 어떤 영향을 주었나요? / S8 언제 어떤 연습을 이어가고 싶나요? 모두 optional이며 미응답은 허용한다.

## 4. 사용자 언어 전체 수정안

아래 표는 명칭 제안 목록이며 출판 승인 목록이 아니다. 게임 고유의 sensory/urge/allowing/thought/care 항목은 기본 WeeklyTask로 분류한다. 아래는 콘텐츠 namespace다. 기술 ID·canonical label은 연구/개발 데이터에만 두고 사용자 화면에는 friendly copy를 사용한다. 변경은 개념 삭제가 아니라 표현 분리다.

### 회기

| internal_name | user_facing_name | short_description |
|---|---|---|
| automatic_pilot | 익숙한 순간, 새롭게 보기 | 늘 하던 행동 앞에서 잠시 멈추고 감각을 살펴봐요. |
| body_awareness | 생각에서 몸으로 돌아오기 | 생각과 함께 몸에서는 무엇이 느껴지는지 살펴봐요. |
| gathering_attention | 마음이 다른 곳에 갔을 때 | 마음이 간 곳을 알아차리고 지금 느껴지는 감각으로 돌아와요. |
| aversion_reactivity | 반응하기 전, 잠깐 멈추기 | 불편함 뒤에 무엇을 하고 싶어지는지 알아봐요. |
| allowing | 불편한 마음에 자리 내주기 | 바꾸고 싶은 느낌을 몸의 감각과 함께 살펴봐요. |
| thoughts_not_facts | 생각과 사실 사이 | 확인한 일과 마음이 붙인 설명을 나누어 봐요. |
| self_care | 나를 돌보는 작은 선택 | 지금 나에게 필요한 행동을 하나 골라봐요. |
| maintaining_learning | 내 일상에 가져갈 연습 | 배운 연습을 나의 상황에 맞게 이어가요. |

### 연습과 주간 과제

| internal_name | user_facing_name | short_description |
|---|---|---|
| sensory_observation | 눈앞의 감각 살피기 | 익숙한 대상의 색과 닿는 느낌을 천천히 살펴봐요. |
| body_scan | 몸의 감각 따라가기 | 몸의 여러 부분으로 주의를 옮겨 지금의 감각을 느껴봐요. |
| walking_return | 걸으며 돌아오기 | 마음이 다른 곳으로 가면 발이 닿는 느낌으로 돌아와요. |
| breathing_space | 3단계로 돌아오기 | 지금의 경험을 살피고, 호흡에 모았다가 몸과 주변으로 넓혀요. |
| urge_pause | 하고 싶은 마음 알아차리기 | 바로 움직이기 전, 무엇을 하고 싶어지는지 살펴봐요. |
| allowing_anchor | 몸의 감각과 함께 머물기 | 가벼운 불편함을 살피며 필요하면 익숙한 감각으로 돌아와요. |
| thought_distance | 생각을 한 걸음 떨어져 보기 | 떠오른 설명을 확인한 사실과 나누어 바라봐요. |
| care_choice | 나를 돌보는 행동 고르기 | 지금의 나에게 맞는 작은 행동을 정해봐요. |
| week_1 | 익숙한 행동 앞에서 멈추기 | 이번 주의 익숙한 행동 하나에서 감각을 새롭게 느껴봐요. |
| week_2 | 기다리는 동안 몸 살피기 | 기다리는 순간의 생각과 몸의 반응을 알아봐요. |
| week_3 | 마음이 간 곳 알아보기 | 걷다가 마음이 옮겨간 곳과 돌아온 감각을 살펴봐요. |
| week_4 | 반응의 흐름 돌아보기 | 불편함 뒤에 한 행동과 그 이후의 경험을 돌아봐요. |
| week_5 | 가벼운 불편함 살펴보기 | 스스로 고른 가벼운 경험을 가능한 만큼 살펴봐요. |
| week_6 | 한 장면 나누어 보기 | 실제 일과 당시 상태, 떠오른 설명을 나누어 봐요. |
| week_7 | 오늘의 활동 돌아보기 | 오늘의 활동이 나에게 어떤 영향을 주었는지 살펴봐요. |
| week_8 | 나에게 맞게 이어가기 | 가지고 갈 연습과 상황, 이어가고 싶은 이유를 정리해요. |

`3단계로 돌아오기`는 호흡을 늦추거나 진정시켜야 한다는 지시가 아니다. 세 단계 본문에서 자연스러운 호흡과 감정이 바뀌지 않아도 된다는 점을 명확히 한다.

### 탐색·버튼·상태·안내

| internal_name | user_facing_name | short_description / 실제 보조 문구 |
|---|---|---|
| nav_home | 홈 | 지금 이어갈 연습을 살펴봐요. |
| nav_sessions | 이야기 | 경험한 회기의 장면을 다시 봐요. |
| nav_entries | 기록 | 남겨둔 경험을 다시 읽어요. |
| nav_kit | 나의 연습 | 지금까지 경험한 연습을 다시 볼 수 있어요. |
| repertoire_heading | 지금까지 배운 연습 | 이야기에서 직접 해본 연습이 차례로 담겨요. |
| kit_heading | 일상에 가져갈 연습 | 지금까지 배운 연습 중 내가 고른 것들이에요. |
| regular_heading | 계속 가져갈 연습 | 앞에서 배운 연습도 다시 할 수 있어요. |
| weekly_heading | 이번 이야기에서 이어가기 | 이번 회기의 경험을 일상에서 만나봐요. |
| home_current | 지금 이어갈 연습 | 이번 이야기에서 이어지는 작은 제안이에요. |
| home_recent | 최근 열린 연습 | 이야기에서 직접 해본 연습이에요. |
| home_story | 이야기로 돌아가기 | 그때의 장면과 경험을 다시 떠올려봐요. |
| start_practice | 연습해 보기 | 편한 때에 시작해요. |
| resume_practice | 이어서 보기 | 안내를 다시 볼 수 있어요. |
| start_weekly | 일상에서 해보기 | 익숙한 상황 하나를 골라봐요. |
| open_audio | 안내 듣기 | 확인된 안내가 있는 연습에서만 보여요. |
| audio_play | 재생 | 안내를 들어요. |
| audio_pause | 일시정지 | 원할 때 다시 이어서 들어요. |
| leave_practice | 여기서 마치기 | 충분히 살펴본 만큼 마쳐도 괜찮아요. |
| record_optional | 경험 남기기 | 남기고 싶은 것만 적어요. |
| skip_record | 기록 없이 돌아가기 | 기록하지 않아도 연습은 그대로 사용할 수 있어요. |
| save_record | 기록 저장 | 내 기기에 저장해요. |
| edit_record | 수정 | 남긴 내용을 바꿔요. |
| delete_record | 삭제 | 이 기록을 지워요. |
| confirm_delete | 기록 삭제 | 지운 기록은 되돌릴 수 없어요. |
| cancel | 취소 | 지금 화면으로 돌아가요. |
| save_to_kit | 일상에 가져갈 연습으로 고르기 | 다시 해보고 싶은 연습을 직접 골라요. |
| remove_from_kit | 선택에서 빼기 | 지금까지 배운 연습에서는 계속 볼 수 있어요. |
| edit_cue | 언제 해볼지 적기 | 내 일상에 맞는 순간을 정해요. |
| save_kit | 저장 | 상황과 연습을 연결해 둬요. |
| past_entry | 지난 경험 돌아보기 | 이어서 떠올리고 싶은 기록이 있나요? |
| skip | 지금은 건너뛰기 | 나중에 다시 볼 수 있어요. |
| unknown | 잘 모르겠어요 | 분명하지 않은 경험도 그대로 두어도 괜찮아요. |
| upcoming | 이후 이야기 | 해당 이야기를 마친 뒤 이어갈 수 있어요. |
| unavailable | 아직 열린 연습이 아니에요 | 지금 사용할 수 있는 연습으로 돌아가요. |
| session_not_complete | 이야기를 마친 뒤 이어가요 | 게임에서 해본 연습이 여기에 차례로 담겨요. |
| no_entries | 아직 남긴 기록이 없어요 | 적고 싶은 경험이 생기면 남겨주세요. |
| no_kit | 일상에 가져갈 연습을 골라보세요 | 지금까지 배운 연습 중에서 고를 수 있어요. |
| saved | 저장했어요 | 이 기기에서 다시 볼 수 있어요. |
| storage_error | 저장하지 못했어요 | 적은 내용은 화면에 남아 있어요. 다시 시도해 주세요. |
| demo_notice | 데모 · 실제 진행과 별개예요 | 예시 회기와 연습을 둘러보는 화면이에요. |
| allowing_notice | 필요하면 멈춰도 괜찮아요 | 위험하거나 해로운 상황에 머무르는 연습은 아니에요. |
| return_notice | 마음이 다른 곳에 가도 괜찮아요 | 알아차린 뒤 다시 돌아와요. |
| record_notice | 기록은 선택이에요 | 잘했는지 평가하지 않아도 괜찮아요. |

새 UI 문구를 추가할 때도 이 세 필드를 갖는다. streak, 달성률, 마음챙김 점수, 완료 압박, 성공/실패 토스트, 감정 개선 보상은 만들지 않는다.

### 4a. 장면 명사형 이름 · 단순화 (2026-10-06 사용자 결정, §4 회기/과제 이름을 대체)

메인 제목은 게임에서 실제로 본 사물·행동의 명사형이다. 추상 회기명과 MBCT 용어는 `internal_name`·`formalName` 메타데이터에 유지한다. 동물은 V3.3 기준이며 장면 memory cue로만 작게 표시한다(`S3 · 사슴`). authoritative release와 충돌하면 release를 따른다.

| Session | 동물 | user_facing_name (회기 = WeeklyTask) | 오늘 해볼 것 (한 문장) | 화면 조작 (최대 1) |
|---|---|---|---|---|
| S1 | 다람쥐 | 호두 관찰 | 늘 쓰던 물건 하나를 바로 쓰기 전에 보고 만져보기 | 물건 고르기 |
| S2 | 거북이 | 몸 살피기 | 기다리는 순간, 몸에서 느껴지는 곳 하나 찾기 | 기다림 고르기 |
| S3 | 사슴 | 발걸음 | 마음이 떠난 걸 알면 다음 몇 걸음의 발바닥으로 돌아오기 | 걸을 길 고르기 |
| S4 | 곰 | 반응의 흐름 | 불편했던 순간을 무슨 일→몸·마음→하고 싶던 것→한 것으로 따라가기 | 흐름 그림 한 장(입력 아님) |
| S5 | 개구리 | 비와 몸 | 가벼운 불편함을 바로 없애기 전 몸의 감각 하나 살펴보기 | 돌아올 감각 고르기 |
| S6 | 독수리 | 생각구름 | 있었던 일/그때의 상태/떠오른 생각 → 3단계로 돌아오기(접근 가능할 때) → 도움 되는 다음 행동 | 세 칸 그림 |
| S7 | 강아지 | 돌봄 행동 | 오늘 활동 하나의 영향을 살피고 작은 돌봄 하나 | 영향 고르기 |
| S8 | 꿀벌 | 나의 Practice Kit | Repertoire에서 가져갈 연습 직접 고르기 | Kit 고르기로 이동 |

Home Practice 화면은 **장면 → 오늘 해보기 → 경험 남기기(선택, 접힘)** 세 덩어리다. WeeklyTask에는 stepper가 없다. stepper는 절차 자체가 순차적인 정식 연습(현재 3단계 호흡공간)에만 쓴다. 화면의 선택은 저장되지 않으며 기록을 열 때 해당 칸을 미리 채우는 데만 쓰인다. S8은 Kit의 언제·어떤 상황·왜 칸이 기록 역할을 하므로 별도 기록 블록을 두지 않는다(이전 integration 기록은 그대로 읽기·수정·PDF 가능). 회기 상세는 이번 회기에서 열린 Regular만 보이고, 누적 Repertoire는 홈과 `나의 연습`에서 본다. 기록 schema는 새 id(`*_v2`)로 바꾸고 이전 schema는 기존 기록용으로 유지한다.

### 4b. 한 페이지 · 점진적 펼침 (2026-10-06, §4a의 화면 구조를 대체)

회기 화면은 한 페이지이지만 세 순간을 차례로 펼친다. **REMEMBER**: 대표 장면 · `S# · 동물` · 명사 제목 · `숲에서 해본 걸, 오늘 한 번 더.`(회기 화면에서만, 한 번) · 게임에서 한 행동 한 문장 · `오늘 해보기`. **TRY**: 장면은 얇은 띠로 남고, 오늘 할 행동 한 문장 · 선택 control 하나 · 보조/안전 문장 하나 · (정식 연습이면) 오디오 · `경험 남기기 +`. 선택을 하면 `이제 화면은 닫아도 괜찮아요. …`가 나타나며 별도 확인 버튼은 없다. **REFLECT**: `경험 남기기 +`를 눌렀을 때만 핵심 질문 하나(선택으로 미리 채워진 맥락 칸은 보이게 함께), 나머지는 `더 남기기`. S4는 흐름 네 칸이 곧 기록, S8은 Kit 칸이 곧 기록이다.

정식 연습(Regular)은 WeeklyTask와 다른 층이다: 한국어 정식 명칭(마음챙김 걷기 / 3단계 호흡 공간), 작은 MBCT 출처 한 줄, `시작하기`, 절차가 순차적인 호흡 공간만 단계 이동. 회기 화면에서는 맨 아래 `다시 해볼 수 있는 연습`으로만 작게 연결한다. 오디오 상태(정식 명칭 확인 ≠ 한국어 공식 음원 확인 ≠ 이용 범위 확인)는 [KOREAN_MBCT_AUDIO_MAPPING](./KOREAN_MBCT_AUDIO_MAPPING.md) 적용 절. 서체는 게임 대화체와 같은 MaruBuri([BRAND_TYPE](./BRAND_TYPE.md)). 참고 서비스 분석은 [REFERENCE_FINDINGS](./REFERENCE_FINDINGS.md).

### 4c. 단계 복원 · 문구 정리 (2026-10-06, §4b 보완)

TRY는 다시 초기 rewrite처럼 **3–5단계를 한 번에 하나씩** 보여준다(제목 + 한두 문장, `다음`/`이전`). 회기의 선택 control은 해당 단계(대개 1단계)에 있고, 고른 것은 이후 단계에 작은 태그(`고른 물건 · 컵`, `정해둔 감각 · 발바닥`)로 이어진다. S4는 흐름 한 줄이 현재 위치를 표시하고 질문 자체가 단계 제목이다. S6의 숨 고르기 단계는 3단계 호흡 공간이 이미 열린 경우에만 나타나며, 화면을 떠나지 않고 세 단계 전체를 그 자리에서 펼친다. S8은 다시 만나기 → 가져가고 싶은 것 → 직접 고르기(Practice Kit 열기). `화면은 닫아도 괜찮아요` 문구는 모두 제거했다. 정식 연습 화면에서 출처·쪽수 줄(MBCT · 80쪽)은 표시하지 않고 데이터(`mbct`)에만 둔다. 오디오는 다른 사이트로 이동시키지 않고 앱 안에서만 재생하며, 확인된 음원이 없으면 글 안내만 보인다.

### 4d. 끝 선택지와 언제든 연습 (2026-10-06)

경험 남기기는 화면 끝에 따라다니는 토글이 아니다. 마지막 단계에서만 `경험 남기기` / `여기서 마치기` 두 선택지가 같은 무게로 나온다. 남기기를 누르면 그 자리에 핵심 질문이 열리고 `남기지 않기`로 돌아갈 수 있다. 마치기는 홈으로 간다. S8은 `Practice Kit 열기` / `여기서 마치기`. 정식 Regular는 회기와 묶지 않는다: 화면 하단의 `언제든 할 수 있는 마음챙김 연습` 카드(이름, 한 줄, 한국어 안내 n분)로 보이고 출처 회기·동물 라벨은 없다. 정식 연습 화면의 eyebrow는 `마음챙김 연습`. 페르소나 점검 기록은 [PERSONA_WALKTHROUGHS](./PERSONA_WALKTHROUGHS.md).

## 5. Home IA

모바일 탐색은 홈 / 이야기 / 기록 / 나의 연습. ‘지금 이어갈 연습’은 완료된 회기의 WeeklyTask, ‘최근 열린 연습’은 완료된 Bundle의 Regular, ‘이야기로 돌아가기’는 해당 게임 회기 링크다. 최근 완료를 별도 저장하지 않으면 회기 순서로 정렬하고 가짜 완료 날짜를 만들지 않는다. 전체 catalog·점수·streak·수행률·실패 문구는 없다. S8 완료 후 Kit 바로가기를 더한다.

## 6. 회기 상세 IA

친화 제목 → 확정 버전의 장면 회상 → 이번 이야기에서 이어가기(WeeklyTask) → 계속 가져갈 연습(이번 Bundle 및 과거 Repertoire) → 선택적 경험 남기기. 미완료 회기는 연습 시작을 열지 않는다. 완료하면 Bundle 전체가 열리며 개별 action 인증 화면은 없다. Practice 화면은 장면 → 기능 → 검토된 절차 → 대응 audio가 있을 때 안내 듣기 → 일상 적용 → optional 기록 순서다.

## 7. 기록 IA와 PDF

날짜 역순 목록, 회기/연습 필터, 읽기·수정·삭제, **내 기록 PDF로 내보내기**. 모든 질문 optional, 공백뿐이면 record 생성 안 함, ‘잘 모르겠어요’는 유효 응답. 기록 없이도 연습 사용 가능. 자동 평가·감정 분석·AI 해석 없음.

PDF는 client-side 생성: 생성일 → Session 1–8 순서의 실제 작성 기록 → 각 기록의 날짜 / Practice 또는 과제 / 질문 / 원문 답변 → 마지막 개인 Practice Kit. 빈 기록·빈 답변·수행률·점수·streak·분석값 제외. 원문을 외부 서버에 보내지 않는다. 회기 미확인 legacy 기록은 별도 이전 기록 영역에 보존하며 회기를 추정하지 않는다. 과거 plan을 새 Kit으로 둔갑시키지 않는다.

## 8. Practice Kit IA

S8 완료 후 Repertoire에서 직접 선택한다. cue/상황/개인 이유는 선택 입력이다. 연습 시작·수정·선택에서 빼기를 제공한다. Kit에서 빼도 Repertoire는 유지된다. 강제 개수·수집 목표·자동 추천·기록 기반 자동 선택은 없다. 후보가 없으면 새 catalog를 제시하지 않는다. 과정 종료 뒤에도 수정·재사용 가능하다.

## 9. 삭제·보류·재분류

| 기존 항목 | 결정 |
|---|---|
| s1_home–s8_home | 해당 WeeklyTask로 대응; 과거 record 보존 |
| sensory / mindful_routine | S1 게임 일반화 과제; 정식 대응 확인 전 Regular 확정 금지 |
| urge / working_with_reactivity | S4 WeeklyTask; 기존 Regular 가정 철회 |
| allowing / working_with_difficulty | S5 WeeklyTask; 독립 정식 연습 대응 전 Regular 아님 |
| thought / responding_skilfully | S6 WeeklyTask; 임의 generic technique 생성 금지 |
| care_choice | S7 WeeklyTask; Kit 항목 자동 생성 금지 |
| body_scan | S2 후보; 코드 존재만으로 실제 교육 완결 주장 금지 |
| daily_walking / breathing_space | 구현·정식책 교차 확인 후 도입 회기 확정 |
| 50:50 | pending; 기획 또는 코드 부재/미확인 상태에서 출판 금지 |
| gratitude / random kindness / stretching / mindful movement / generic sitting / pleasant_experience | 게임 교육 근거 없이 catalog에 있던 항목 제외 |
| experience_awareness | 별도 연습카드가 아닌 해당 과제의 optional reflection |

삭제는 새 노출 목록에서 제외한다는 뜻이며 기존 기록을 지우지 않는다.

## 10. 유지 요소와 개발 영향

모바일 최소 UI, 과거 Regular 재사용, schema-driven optional 기록, 수정·삭제, localStorage demo, 백엔드/auth/analytics/LLM 없는 원칙을 유지한다. 감사 자료와 runtime 접근은 분리한다. 데이터 계약은 [HOME_PRACTICE_DATA_SPEC.md](./HOME_PRACTICE_DATA_SPEC.md). 개발 순서: 콘텐츠 감사/Bundle 승인 → Progress 완료 연동 → Bundle/Repertoire 접근 → S8 Kit → 보존 migration → PDF 및 검증. 이 문서 수정만으로 앱 접근 구조가 교체된 것은 아니다.

## 11. 최종 self-audit — 정책 기준

| 검토 | 결과 |
|---|---|
| 완료된 회기의 확정 Bundle만 열리는가? | YES |
| action-level receipt/participant verification/researcher approval가 runtime에서 제거됐는가? | YES |
| Game action/구현 증거는 사전 콘텐츠 선정에만 쓰는가? | YES |
| Regular는 정식 Practice와 실제 교육의 교집합인가? | YES; 미확정 후보는 출판 보류 |
| Preserved Function/Fidelity Boundary가 유지되는가? | YES |
| 완료 후 과거 Regular가 유지되는가? | YES |
| Repertoire와 S8 직접 선택 Kit이 분리되는가? | YES |
| S8에 새 practice library를 열지 않는가? | YES |
| optional 기록·무평가 UX·기존 record 보존이 유지되는가? | YES |
| dosage/audio를 만들지 않고 버전을 혼합하지 않는가? | YES; 미확인 사항은 아래에 명시 |
| PDF는 실제 기록과 마지막 Kit만 로컬로 내보내는가? | YES; 앱 검증 결과는 별도 개발 보고 |

정책 적합 판정이며 실제 배포·치료효과 검증을 뜻하지 않는다.

## Unresolved checklist

- [ ] authoritative deployed game version과 최신 V3.3 0903 시나리오 원문 확보/대조.
- [ ] 실제 Unity 구현 목록과 scene binding/교육 완결의 미확인 항목.
- [ ] session-complete 전달 방식과 기존 명시적 완료 데이터 확인. 사용자별 action 검증은 요구하지 않음.
- [ ] S3 breathing space, 50:50의 사전 콘텐츠 감사.
- [ ] S4–6 authoritative scene/version 및 home steps 확정.
- [ ] 정식 한국어 Practice Book 판본·페이지와 Regular 대응.
- [ ] Body Scan home dosage/frequency; audio 실제 대응·한국어 공식 출처·사용허락.
- [ ] formal MBCT curriculum과 MindForest generalization layer의 연구 프로토콜 관계.
