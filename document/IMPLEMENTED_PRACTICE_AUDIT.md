# Implemented Practice Audit — 2026-10-05

## 조사 범위와 판정 원칙

실제 Unity 소스 루트는 `C:/Users/wjqwj/gDTi/gDTi`이다. `D:/2026/gDTi`는 실행 파일과 `gDTi2026_Data`가 있는 배포물 폴더이며 소스 프로젝트가 아니다. 아래 경로는 별도 표시가 없으면 Unity 소스 루트 기준이다.

`ProjectSettings/ProjectVersion.txt`는 Unity `6000.3.9f1`을 명시한다. `ProjectSettings/EditorBuildSettings.asset`에서 `Assets/_Scenes/Session_01.unity`부터 `Session_08.unity`까지 모두 enabled이다. 이것은 빌드 설정의 존재를 확인한 것이며 현재 연구용 배포 빌드가 이 소스와 일치한다는 증거는 아니다.

이번 감사는 파일 읽기만 수행했다. Unity 실행, 플레이, 재직렬화, 게임 코드 변경, 참여자별 행동 확인은 하지 않았다. 씬의 스크립트 GUID와 `.cs.meta`를 대조하고 주요 스크립트의 실행 경로·문구·fallback을 읽었다. 코드 존재, 씬 연결, 실제 플레이 검증은 구별한다. 검사하지 못한 prefab 내부나 동적 로딩 경로까지 완전하게 검증했다고 주장하지 않는다.

이 문서는 **SessionPracticeBundle을 사전 편집·승인하는 CONTENT AUDIT**이다. 사용자 runtime은 `Session Complete → 승인된 해당 bundle → Regular 누적 → S8 Kit`이며 action별 receipt나 participant exposure gate를 추가하지 않는다. 배포 버전과 콘텐츠를 확정할 책임은 제작/연구 단계에 있다.

최신 Google Drive `V3.3 0903 최종 시나리오`의 원문은 이 로컬 Unity 감사에서 확보하지 못했다. Downloads와 Unity 프로젝트에서 해당 이름의 로컬 시나리오를 확인하지 못했으며, 예전 A/B 시나리오를 최신 버전이라고 대체하지 않았다. 한국어 Practice Book 대응은 별도 원문 검토 결과와 합쳐야 한다. 아래 정식 연습 명칭은 **대조 후보**이며 정식 한국어 교재 판본·페이지의 확인을 대신하지 않는다.

한국어 원문 추가 확인: 『삶과 함께하는 마음챙김』(학지사, 2026, 윤성민·최정심 공역) p56 `바디 스캔`, p80 `마음챙김 걷기`, p83 `호흡 공간법`, pp89–90 `50 대 50 실천`을 대조했다. 요약·시간/빈도·음원 상태는 [KOREAN_MBCT_AUDIO_MAPPING.md](./KOREAN_MBCT_AUDIO_MAPPING.md)에 있다. 이 확인은 한국어 교재 측 근거를 보완하며 Unity의 누락 연결이나 실제 배포 여부까지 확인해 주지는 않는다. 지정된 별도 Practice Book과 동일한 자료인지도 구분한다.

## 회기별 정적 구현 증거와 bundle 판정

| 회기 | 실제 코드/씬에서 확인한 경험 | 파일·연결 증거 | 최신 V3.3 대조 | 정식 한국어 연습 대응 후보 | 현재 포함 판정 |
|---|---|---|---|---|---|
| S1 | 호두를 바로 먹기 전에 표면을 관찰하고, 안의 알맹이를 다시 관찰한 뒤 먹도록 안내 | `Assets/Workspaces/[1]Junbo_Chanbin/Scripts/Session01AcornStoryDirector.cs` 96–163행; `Session_01.unity`에 해당 script GUID와 `Session01StoryFlowSequence`, `TwoHandBlockController`, `FocusedObjectMouseRotator` 연결 | 원문 미확보. 기존 도토리 시나리오와 실제 호두 문구가 다름 | 감각적 관찰/마음챙김 먹기 대응 검토 | WeeklyTask의 게임 일반화 근거 있음. Regular 최종 포함은 정식 교재 대응·절차 검토 후 결정 |
| S2 | 기다림 인콰이어리 후 의자/블랙스크린 바디스캔 경로가 존재하나 필수 음성/sequence 직접 참조 없음 | `Assets/Workspaces/[2]Gyeongmin/Scripts/Session02StoryDirector.cs` 486–494, 2985–3046행; `Session_02.unity` 6723–6728행 | 원문 미확보 | 바디스캔 | **교육 구현 확인 보류**. 명칭·진행 callback만으로 Regular 포함 금지. 기다림의 몸·생각 관찰은 별도 WeeklyTask 후보 |
| S3 | 걷는 중 소리·빛·생각으로 주의가 옮겨갔음을 알아보고 발바닥 감각으로 돌아오기; 현재 경험→호흡→몸/주변의 세 단계 호흡공간 코드 | `Assets/Workspaces/[3]Jeongwan/Scripts/Session03StoryDirector.cs` 424–514, 1253–1305, 1452행 이후. `Session_03.unity`는 binary이며 `Assembly-CSharp::Session03StoryDirector` 및 해당 class 참조 문자열 확인 | 원문 미확보 | 걷기 명상, 3단계 호흡공간 | 강한 코드 후보. binary 씬의 참조 문자열은 활성화·도달성의 완전 검증이 아님. 정식 대응·배포 흐름 확인 후 bundle 승인 |
| S4 | 회피/열매 흐름, 몸·혐오 라벨링, 반응적 호흡공간, 이후 다시 선택하는 컨트롤러가 씬에 연결 | `Assets/Workspaces/[4]Jooyoung/Scripts/Session04_ResponsiveBreathingController.cs` 8–18, 40–52행; `Session_04.unity` 5647, 5679행. 같은 씬에서 `Session04_AvoidanceLoopDirector`, `Session04_BodyLabelingUIController`, `Session04_RechoiceController` GUID 확인 | 원문 미확보. 이전 A/B 중 하나와 동일하다고 단정하지 않음 | 반응적 호흡공간 대응 검토 | 호흡공간은 Regular 후보; 회피 흐름 일반화는 WeeklyTask. 곰·열매 버전을 고슴도치 시나리오와 섞지 않음 |
| S5 | 개정 흐름: 비를 피하려 큰 나무로 이동→수문→비/물웅덩이 감각 탐색→몸 anchor→인콰이어리. 손 감지 또는 키/마우스 hold fallback | `Assets/Workspaces/[5]Yoonki/Scripts/Session05InteractionDirector.cs` 188, 358–366, 427–439행; `Session05StoryExtensionCoordinator.cs` 236–238, 884–917행; `Session05RainReceivingInteraction.cs` 11–13, 38행. `Session_05.unity` 19220, 146789행 `useRevisedStoryFlow: 1` | 원문 미확보. 실제 활성 선택은 개정 흐름 | 어려움과 함께하기/몸 anchor와 기능적 대응 검토 | 게임 특유 감각 탐색은 WeeklyTask 후보. 손 hold 3초를 정식 allowing 수행·용량으로 간주하지 않음. 별도 formal Regular로 자동 승격 금지 |
| S6 | 동일 사건에 대한 상태/해석 대비, 사건·상태·해석 세 칸, 생각구름 | `Assets/Modules/TeamE_Map/Scripts/Session06StoryDirector.cs` 3–14, 246, 306–359, 465행; `Session_06.unity`에 director/event relay 연결 | 원문 미확보. 실제 코드가 사건/상태/해석 버전이며 확인/추론 기억카드 버전과 다름 | 생각과 사실 구분/탈중심화 대응 검토 | 사건 구분 일상 기록은 WeeklyTask 후보. 자체 명칭을 새 formal Regular로 만들지 않음 |
| S7 | 활동을 채워줌/지치게함/상황에 따라 다름/직접 묘사/모르겠음/건너뛰기로 분류하고 행동 계획 선택 | `Assets/Session07_Workspace/Scripts/Session07StoryDirector.cs` 26–81행; `Session_07.unity`에 해당 director 및 `Session07ActivityResultTracker`, `Session07ActionPlanResultTracker` 연결 | 원문 미확보 | 활동 알아차림/자기돌봄 행동 계획 대응 검토 | 일상 활동 영향과 자기돌봄 선택 WeeklyTask 후보. 그 행동을 모든 사용자 공통 formal Regular로 추가하지 않음 |
| S8 | 7개 회기 꽃 회고→현실 연결→Kit→마무리 코드. 누락 PracticeData를 1~7회기 기본 이름으로 채우는 fallback도 존재 | `Assets/Workspaces/[8]Hyejin/Scripts/Session08StudyFlowController.cs` 10, 315–338행; `Session_08.unity`에 `Session08StudyFlowController`, `Session08StudyUI`, `PracticeFlowerInteractable` 연결 | 원문 미확보 | 이전 연습 유지/통합 | 새로운 Regular 추가 없음. Home Kit에는 승인된 완료 bundle에서 누적된 Regular만 사용. Unity fallback 목록을 앞회기 교육 증거로 가져오지 않음 |

모든 행의 플레이 검증 상태는 `not_run`이다. 위 구현 발견을 `scenario_only`로 되돌릴 필요는 없지만, **정식 교재와 최신 시나리오를 포함한 bundle 출판 승인 `confirmed`와는 구별**한다. 자료 미확보 때문에 후보를 보류하는 것은 action-level 사용자 검증을 다시 요구한다는 뜻이 아니다.

## 특히 놓치면 안 되는 구현 경계

### S2 바디스캔은 이름만으로 확인 완료 처리할 수 없다

현재 `Session_02.unity`의 직렬화 값은 `bodyScanSequence: {fileID: 0}`, `bodyScanVoiceClip: {fileID: 0}`, `bodyScanSilentHoldSeconds: 3`이다. Director는 `BlackScreenVoiceSequence`를 자동 검색할 수 있고, 없으면 내장 블랙스크린을 사용한다. 내장 경로에서 음성이 없으면 설정된 시간만 기다린 뒤 완료로 넘어간다. `BlackScreenVoiceSequence.cs.meta`의 GUID `b3deefea07a425644b3a22955c3d222f`는 검사한 `_Scenes`와 TeamC의 텍스트 scene/prefab에서 발견되지 않았다.

따라서 코드의 `OnBodyScanFinished` 호출은 바디스캔 교육 내용이 실제 제공된다는 증거가 아니다. 동적 생성·외부/prefab 주입 여부와 실제 음성·신체부위 안내를 제작 단계에서 확인해야 한다. 이 확인은 bundle 구성 감사이며 사용자의 매번 수행 검증이 아니다. 3초 대기는 Home 바디스캔 권장 시간의 근거가 아니다.

### S3 호흡공간은 단순 미구현으로 남길 수 없다

실제 `Session03StoryDirector`에 세 단계 안내와 호출 경로가 있다. 별도의 `Assets/Scripts/BreathingPractice/Session3BreathingPracticeController.cs`도 존재하지만 그것을 실제 회기 연결의 근거로 대신 사용하지 않았다. 현재 씬이 binary라 YAML GUID 방식으로 활성 컴포넌트를 완전히 해석하지 못했다. 따라서 `코드 구현 발견 / 씬 class 참조 발견 / 실제 활성·도달성 미검증`을 정확히 유지한다.

### S5와 S6는 최신 시나리오 제목만 보고 혼합하지 않는다

S5의 오래된 반응 선택·StayTimer 경로가 남아 있어도 `useRevisedStoryFlow: 1`을 우선 읽었다. S5 감각적 anchor와 formal allowing 전체 절차를 동일시하지 않는다. S6은 현재 사건/상태/해석 구조를 근거로 삼고, 이전 다른 버전의 기억카드/사실·추론 UI를 이미 구현된 것으로 덧붙이지 않는다.

### S8의 fallback은 콘텐츠 감사 통과 목록이 아니다

`EnsureAllPracticeData`는 누락된 회기 데이터를 런타임 기본 이름으로 채운다. 이는 게임을 진행시키는 구현 방식일 뿐 앞회기별 교육 내용과 정식 MBCT 대응을 확인한 manifest가 아니다. Home은 별도로 승인한 `SessionPracticeBundle`만 사용한다.

## 제외·보류

- 50:50 attention: 검사한 자체 C#/JSON/CSV에서 `50:50`, `50대50`, `Fifty/fifty` 대응 구현을 찾지 못했다. 검색 실패만으로 전 프로젝트 미구현을 단정하지 않으며 현재는 pending이다.
- 감사·무작위 친절·스트레칭·마음챙김 움직임·일반 좌식명상: 이 감사에서 대응 회기의 교육/실행 흐름을 확립하지 않았다. 음원 존재, 일반 교재 수록, S8 이름만으로 추가하지 않는다.
- S2 바디스캔: 콘텐츠 안내 제공 여부 pending.
- 다른 정식 연습 후보도 한국어 교재와 최신 시나리오 대응이 확인되기 전에는 release bundle의 확정 항목이라고 주장하지 않는다.
- 게임 특유 pause/수문/생각구름/사건 구분/자기돌봄 선택의 일반화는 WeeklyTask로 검토한다. MBCT 기능과 유사하다는 이유만으로 formal Regular 이름을 신설하지 않는다.

## 남은 사전 확정 체크리스트

- [ ] authoritative 배포 빌드와 위 로컬 소스/씬이 일치하는가?
- [ ] Google Drive 최신 V3.3 0903 원문·수정일·회기별 locator를 확보했는가?
- [ ] 정식 한국어 MBCT/Mindfulness for Life Practice Book 판본·페이지와 Regular 절차를 대조했는가?
- [ ] S2 바디스캔 실제 안내 자산과 주입/재생 경로를 확인했는가?
- [ ] S3 binary 씬에서 걷기·3단계 호흡공간의 실제 활성/도달성을 확인했는가?
- [ ] 50:50의 실제 구현 여부와 bundle 포함 여부를 확정했는가?
- [ ] S4–6 실제 배포 버전을 최신 시나리오와 대조하고 혼합을 제거했는가?
- [ ] game duration과 Home duration/frequency/audio requirement를 분리했는가?
- [ ] 음원과 각 practice의 언어·절차·권리·버전을 확인했는가?
- [ ] 최종 승인 manifest만 Session Complete에 연결하고 action receipt gate는 두지 않았는가?

확인되지 않은 home dosage/frequency/audio는 `unspecified`이다. 정적 구현 경로는 심리적 학습 성공이나 치료 효과의 증거가 아니다. 정식 MBCT 교육과 MindForest의 일상 일반화 사이의 연구 프로토콜상 관계는 별도 확정해야 한다.
