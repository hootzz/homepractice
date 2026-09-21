# MindForest Home Practice

Phase A 모바일 웹 워크북. Source of truth는 `document/README.md`, `01_PRODUCT_SPEC.md`, `02_CONTENT_MODEL.md`, `03_IMPLEMENTATION_CONTRACT.md` 순서입니다.

## 실행

```sh
npm install
npm run dev
```

http://localhost:3000 에서 엽니다. 배포용 확인: `npm run typecheck`, `npm run lint`, `npm run build`, `npm start`.

## 회기 접근 설정

`src/lib/config.ts`의 `CURRENT_SESSION`(기본 3)을 1–8로 변경하세요. 7은 개인 연습 연결, 8은 이유를 포함한 Practice Kit를 엽니다. `COURSE_COMPLETED = true`이면 모든 회기를 열고 `/my-practice`를 기본 화면과 메뉴로 제공합니다. 변경 후 개발 서버 반영 또는 재빌드하세요. 제품 화면에는 진행률이나 개발 설정 메뉴가 없습니다.

## 데이터와 콘텐츠

기록과 계획은 `mindforest.entries.v1`, `mindforest.practicePlans.v1` localStorage에만 저장됩니다. 서버 데이터베이스, 로그인, 분석, LLM, 기록 전송이 없습니다. 브라우저 데이터 삭제 시 기록도 삭제됩니다. 실제 연구 참여자 데이터 수집용이 아닙니다.

`src/content/`의 typed data가 회기, 단일 연습 registry, 공통 기록 schema를 정의합니다. 대표 홈 프랙티스는 MindForest translation이며 MBCT 정전적 과제로 표시하지 않습니다. 1회기 기록 질문 2개는 콘텐츠 원문을 우선했습니다.

`public/session-art/`의 SVG는 교체용 상징 placeholder입니다. 공식 Oxford Mindfulness 영어 오디오 4개를 해당 연습에 연결했습니다. 글 안내를 함께 제공하며, 재생 실패 시 공식 원문 링크로 이동할 수 있습니다. 매핑 근거와 확인 범위는 `document/AUDIO_SOURCES.md`에 기록했습니다. Phase B에서 연구팀의 문구 검토와 최종 회기별 에셋 교체가 필요합니다.
