# 한국어 MBCT / Audio Mapping

검토일: 2026-10-05. 콘텐츠 사전 감사 자료이며 사용자별 접근 조건이 아니다. 런타임은 회기 완료와 확정된 SessionPracticeBundle만 사용한다.

## 확인 범위

로컬에서 **Willem Kuyken 저, 윤성민·최정심 공역, 『삶과 함께하는 마음챙김』(학지사, 한국어판 2026)** 원문을 확인했다. 파일: `C:/Users/wjqwj/Downloads/공유 금지_삶과 함께하는 마음챙김.pdf`(335쪽). PDF p2의 정식 번역 저작권 표기를 확인했다. 아래 쪽수는 PDF와 책 본문의 해당 쪽수가 일치한다. 원본은 복제·배포하지 않으며 짧은 명칭과 자체 요약만 남긴다.

이 책이 사용자가 지칭한 **별도 8회기 Practice Book과 동일한 자료인지**는 아직 확인되지 않았다. 한국어판에 실제 명시된 연습 이름·구조는 확인 근거로 사용하되, 명시되지 않은 회기별 home 처방을 발명하지 않는다. `[책]_마음챙김_실천법.pdf`(28쪽)는 정리 자료로 발견했으나 출판 원문을 우선했다.

- [성균관대학교 번역서 소개](https://skb.skku.edu/welfare/community/notice.do?articleNo=214073&mode=view): 윤성민 교수의 『삶과 함께하는 마음챙김』 번역서 소개를 확인했다. 이 소개만으로 사용자가 지정한 Practice Book과 같은 자료인지, 회기별 공식 처방이 무엇인지 확정할 수 없다.
- [한국어 MBCT-L 과정 제공자 안내](https://bmindful.imweb.me/mbct-l): 제공자는 한국어 음원 제공 및 번역 자료에 관해 안내한다. 이는 공급 경로 후보이며, 개별 음원 URL·가이드 내용·길이·우리 앱 사용 허락을 확인한 것이 아니다.
- [Oxford 공식 무료 연습 자료](https://courses.oxfordmindfulness.org/events-and-resources): Body Scan, Breathing Space, Mindful Walking, Sitting 녹음의 존재를 확인했다. 기존 앱의 영문 녹음을 한국어 공식 음원으로 취급하지 않는다. 녹음 존재 자체도 번들 포함 근거가 아니다.

## Practice별 대응 상태

최종 포함 여부는 [IMPLEMENTED_PRACTICE_AUDIT.md](./IMPLEMENTED_PRACTICE_AUDIT.md)의 실제 구현 근거와 지정 한국어 Practice Book의 대응이 모두 확인된 뒤 확정한다. 이 표는 새 연습 catalog를 추가하지 않는다.

| 검토 대상 | 정식 한국어 명칭 | 정식 home-practice 구조 | Home duration | Frequency | Audio requirement | 한국어 공식 audio / 사용 가능 여부 | 현재 처리 |
|---|---|---|---|---|---|---|---|
| Body Scan | `바디 스캔` (p56) | 몸의 각 부분에 주의를 차례로 옮겨 감각을 살피고, 방황을 알아차리면 몸으로 돌아옴. 짧은 게임 장면과 full formal 안내의 동등성을 뜻하지 않음 | unspecified | p56: 가능하면 하루 한 번을 제안; MindForest 연구 처방으로 채택 여부는 별도 | unspecified | 검증된 asset 없음; 링크·임베드·재배포 가능 여부 미확인 | S2의 sequence/audio 누락·무음 fallback 때문에 구현 교육 확인 보류 |
| Mindful Walking | `마음챙김 걷기` (p80) | 걷는 동안 발바닥·발·다리 움직임을 느끼고 주의가 떠나면 감각으로 되돌림 | unspecified | p80: 매일 걷는 길을 적용 맥락으로 제시; 정량 횟수 unspecified | unspecified | 검증된 asset 없음; 사용 가능 여부 미확인 | S3 코드·씬 참조 후보와 기능 대응. 실제 활성/배포 확인 후 번들 확정 |
| Three-step Breathing Space | `호흡 공간법` (p83); `3단계 호흡 공간 다시 마주하기` (p102) | 현재 몸·감정·생각 등을 인식 → 호흡 감각에 주의를 모음 → 몸 전체로 주의를 넓혀 다음 활동으로 이어감 | unspecified | unspecified | unspecified | 검증된 한국어 asset 없음; 기존 영문 asset으로 대체 확정하지 않음 | S3 단계 코드/S4 연결 근거와 대조. 최초 도입 회기 사전 확정; ‘3분’을 자동 home 처방으로 쓰지 않음 |
| Fifty-fifty attention | `50 대 50 실천` (pp89–90) | 하고 있는 일과 몸의 감각을 함께 알아차림; 정확한 반반 배분을 성공 조건으로 삼지 않음 | unspecified | unspecified | unspecified | 검증된 한국어 asset 없음 | 책의 존재만으로 포함하지 않음. Unity 실제 교육 대응을 확인할 때까지 보류 |
| Mindful routine / sensory observation 대응 후보 | 정식 독립 practice와의 동일성 미확인 | 현재 Unity 호두 관찰의 일상 일반화는 WeeklyTask 후보; 책의 감각적 실천과 유사하다는 이유만으로 동일 practice라고 확정하지 않음 | unspecified | unspecified | unspecified | 검증된 asset 없음 | 감각 관찰 기능만으로 Regular 승격 금지 |
| S4 반응의 흐름 / S5 허용·닻 / S6 사실·해석 / S7 돌봄 선택 / S8 통합 | 게임 고유 안내명; 정식 practice 이름으로 표시하지 않음 | 각 회기의 실제 구현된 경험을 일상에 옮기는 WeeklyTask; 정식 home curriculum 전체로 확장하지 않음 | unspecified | unspecified | unspecified | 별도 formal audio 자동 연결 없음 | Session-specific 후보; Regular 목록에 자동 편입하지 않음 |

## 제외 및 보류

감사, 친절, 스트레칭, mindful movement, generic sitting은 workbook이나 audio catalog에 있다는 이유로 포함하지 않는다. 50:50 역시 최신 구현 감사와 정식 한국어 대응을 함께 확인하기 전 확정하지 않는다. 이전 문서의 pending 표시는 새 구현 증거로 재검토할 수 있으나, 시나리오 요약만으로 확정하지 않는다.

## 확정 시 남길 필드

각 후보마다 `canonicalKoreanName`, `bookTitle`, `edition`, `pageOrSection`, `homePracticeStructure`, `homeDuration`, `frequency`, `audioRequirement`를 기록한다. 별도로 게임의 `gameDuration`을 둔다. 한국어 음원은 `sourcePageUrl`, `assetUrl`, `language`, `teacher`, `durationSeconds`, `instructionMatch`, `usagePermissionEvidence`, `accessConditions`를 확인한다. 빈 근거는 `unspecified`/`unverified`로 남긴다.

공개 청취, 외부 링크, 앱 내 재생, 파일 재배포는 같은 이용 범위가 아니다. 사용 범위가 확인되지 않으면 허가가 있다고 추정하거나 파일을 복제하지 않는다. 강의 전체의 일일 연습량을 개별 MindForest 연습의 권장 시간으로 전용하지 않는다. 녹음 길이도 home dosage가 아니다.

## 남은 확인

- [x] 로컬 정식 한국어 『삶과 함께하는 마음챙김』 p2, 56, 80, 83–84, 89–90, 102 확인.
- [ ] 이 책과 사용자가 지정한 별도 Practice Book의 동일성/프로토콜상 지위.
- [ ] V3.3 0903 최종 시나리오와 실제 배포 Unity build의 대응.
- [ ] 각 Regular 후보의 정식 한국어 명칭·home 절차·duration/frequency.
- [ ] 한국어 공식 음원의 개별 자산·내용·언어·사용 범위.
- [ ] 확인된 후보만 확정 SessionPracticeBundle에 포함; 런타임에서 참가자별 action 증거를 다시 요구하지 않음.

## 앱 적용 (2026-10-06, 갱신)

오디오는 앱 안에서만 재생한다(외부 사이트 이동 링크 없음). `Practice.audio.guide`(`file` 로컬 mp3 또는 `youtube` 임베드)에 `practiceMatch: true`와 `usageConfirmed: true`가 모두 있을 때만 플레이어가 보이고 정식 연습의 시작 버튼이 `안내와 함께 해보기 ▶`가 된다(`src/lib/audio.ts`). 정식 명칭 확인(`mbct`)만으로는 오디오가 생기지 않는다. 현재 두 Regular 모두 아래 한국어 안내를 앱 안에서 재생한다(YouTube 플레이어 임베드, `youtube-nocookie.com`, 파일 복제·재호스팅 없음). S6 숨 고르기 단계에서 3단계 호흡 공간을 펼칠 때도 같은 안내가 나온다.

| Regular | 영상 | 길이 | 절차 대조(2026-10-06, 한국어 자막 기준) |
|---|---|---|---|
| 3단계 호흡 공간 | 한국MBSR마음챙김연구소 · 안희영 「3분 호흡공간 명상」 `n5Sg3KDaw64` | 5:29 | 자세 → 지금 경험(생각을 정신적 사건으로, 느낌, 신체감각) 알아차림 → 배의 호흡 감각으로 주의를 모음 → 몸 전체로 확장(불편감 부위로 호흡). MBCT 호흡 공간 3단계와 일치 |
| 마음챙김 걷기 | 같은 채널 「마음챙김 걷기」 `5ZXdug0sL0o` | 18:06 | 발이 바닥에 닿는 느낌 → 들기·나아가기·내려놓기 → 마음이 다른 곳에 가면 확인하고 발 감각으로 돌아옴 → 몸 전체·주변으로 확장 → 일상 걷기에 적용. 『삶과 함께하는 마음챙김』 p80 구조와 일치 |

이용 근거: 공개 영상이며 업로더가 임베드를 허용(`playableInEmbed: true`), YouTube 서비스 약관 범위의 임베드 재생만 사용. 안희영 박사는 MBSR·MBCT 국제 인증 지도자 트레이너이자 공식 MBCT 워크북 한국어판 역자. 연구 배포 전 연구소(02-525-1588, mbsr88@daum.net)에 연구용 앱 내 임베드 사용을 알리고 동의를 받아 두기를 권장. 영상이 비공개로 바뀌거나 임베드가 막히면 플레이어 대신 글 안내만 보이도록 `audio.guide`를 제거한다. 같은 채널의 「전신 마음챙김 명상」 `lmPvYqZ5stM`(바디 스캔)은 S2 바디 스캔이 Bundle에 승인될 때의 후보다.

### 한국어 음원 탐색 결과 (2026-10-06)

| 후보 | 언어 | 대응 연습 | 앱 안 재생 | 이용 조건 | 판단 |
|---|---|---|---|---|---|
| 마음친구출판사 YouTube — 『마음챙김으로 우울을 지나는 법』(Williams·Teasdale·Segal·Kabat-Zinn) 명상 안내음성, 카밧진 안내 + 번역자 통역 | 한국어 통역 | 공개: (1)개요 `_4wyWn3tAWc`, (2)바디스캔 `BK8FjCQc0Fw`, (3)요가 `hor7SJLviis`, (4)호흡 마음챙김 `vkBjgJebyq0`, (5)호흡과 몸 `Z6gKAQeV_fQ`. **(7)3분 숨고르기·(추가2)걷기 명상은 비공개(책 QR 전용)** | 공개 영상은 임베드 허용(`playableInEmbed: true`) | YouTube 임베드. 출판사 별도 허락 문구 없음 | 3단계 호흡 공간·마음챙김 걷기에 맞는 공개 영상이 없음. 바디스캔은 S2 Bundle 승인 시 바로 연결 가능 |
| 불광출판사 『8주 마음챙김(MBCT) 워크북』(안희영 역) | 한국어 | 3분 호흡 공간 포함 | 불가(자료실 구매자용) | 구매자 대상 | 출판사 허락 시 후보 |
| 국가트라우마센터 마음프로그램 | 한국어 | 복식호흡·근육이완·호흡마음챙김(트라우마 안정화) | 앱 다운로드 중단 | 공공누리 4유형 | 절차 불일치 — 사용하지 않음 |
| Guilford — *Mindfulness for Life* 공식 음원(한국어판 p.21이 안내하는 원음원) Track 9 Mindful Walking, Track 10 The Breathing Space | 영어 | 정확히 일치 | 가능(브라우저 교차 재생 확인, 191초) | 개별 구매자의 개인 사용 또는 내담자와의 사용, 재배포·방송 금지 | 영어 · 구매자 라이선스 범위 확인 필요 |
| Oxford Mindfulness free meditations (Breathing Space, Mindful walking) | 영어 | 일치 | 불가(타 사이트 재생 차단, Oxford 페이지에서만 재생) | 별도 문구 없음 | 파일 복제 없이는 앱 내 재생 불가 — 사용하지 않음 |

**결론:** 위 한국MBSR마음챙김연구소 영상을 사용한다. 마음친구·불광·Guilford·Oxford는 대체 후보로 기록만 남긴다.

