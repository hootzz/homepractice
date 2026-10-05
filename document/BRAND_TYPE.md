# Brand type — MaruBuri

2026-10-06. Home Practice 전체(제목·본문·버튼·칩·라벨)는 **MaruBuri(마루 부리)** 한 가지 family를 쓴다.

## 왜 MaruBuri인가

새 폰트를 고르지 않았다. 게임이 이미 쓰는 폰트다: Unity 프로젝트 `Assets/Modules/TeamB_UI/interaction/Fonts/MaruBuri-*.ttf`(5 weights). NPC 대화(`NPCDialogueUI.prefab`, `LLMDialog.prefab`)와 생각풍선(`Startup Thought Bubble Prompt.prefab`, `S3_PlayerThoughtBubble.prefab`, S6 생각구름 빌드 스크립트)이 MaruBuri Bold TMP asset을 사용한다. 그래서 웹의 글자가 게임 속 말풍선과 같은 목소리로 읽힌다.

## 자체 호스팅

- `src/app/fonts/MaruBuri-Regular.woff2`, `MaruBuri-Bold.woff2` — Unity 원본 TTF를 fontTools로 subset(Latin, 문장부호·화살표·✓, 한글 호환 자모, **완성형 한글 11,172자 전체**) 후 woff2 변환. 각 약 350KB.
- `next/font/local`로 빌드 시 번들, `display: swap`, CSS 변수 `--font-maruburi`. 런타임 외부 폰트 요청 없음.
- 2 weights만 사용(400/700). 600 지정은 700으로 매칭된다.
- 가독성 규칙: 본문 17px / line-height 1.75, 가장 작은 라벨 14px, 버튼·칩은 700. 얇은 weight(ExtraLight/Light)는 쓰지 않는다.

## 라이선스 — 배포 전 확인 필요

- 폰트 name table: `© NAVER Corp. © NAVER Cultural Foundation Corp.`, License 필드(13/14) 비어 있음.
- Unity 프로젝트와 이 repo 어디에도 MaruBuri 라이선스 파일이 없다.
- 배포 사이트(산돌구름, hangulhub 등)는 SIL OFL / 상업 이용 가능으로 표기. 네이버 공식 배포 페이지(hangeul.naver.com)는 이번 환경에서 접근하지 못했다.
- **BLOCKER (public release):** 네이버 공식 페이지의 OFL 전문을 `src/app/fonts/OFL.txt`로 동봉하고 라이선스 조건을 확인한 뒤 공개 배포한다. OFL은 폰트 파일 단독 판매만 금지하며 subset·woff2 변환·웹 임베드를 허용하지만, 공식 원문 대조 전에는 확인 완료로 표시하지 않는다.
