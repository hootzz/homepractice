# MindForest Home Practice

모바일 웹 워크북. Session Complete → Bundle → 누적 Regular → S8 직접 선택 Practice Kit 흐름을 구현합니다.

## 실행

```sh
npm install
npm run dev
```

http://localhost:3000 에서 엽니다. 기본은 검토용 demo이며 `/demo`에서 회기 완료 예시를 추가합니다. 최초 demo는 S1–S3 완료 상태입니다. 실제 게임 진행으로 간주하지 않습니다.

`NEXT_PUBLIC_HOME_MODE=actual`을 설정하고 다시 실행/빌드하면 actual 저장 공간을 사용합니다. actual 콘텐츠 출판과 게임 완료 adapter는 아직 연결되지 않았습니다. 빈 화면에 임의 콘텐츠를 채우지 않습니다.

## 검증

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

## 데이터와 구현

`mindforest.home.v3.demo` / `mindforest.home.v3.actual`에 저장합니다. 이전 기록/계획의 원본 키와 snapshot을 보존하며 기존 계획은 새 Kit로 자동 변환하지 않습니다. 서버, 로그인, 분석, LLM을 추가하지 않았습니다. PDF는 브라우저에서 생성하며 이미지형 PDF입니다.

정책 우선순위는 `document/HOME_PRACTICE_REDESIGN.md`, `HOME_PRACTICE_DATA_SPEC.md`, `SESSION_SOURCE_AUDIT.md`, `IMPLEMENTED_PRACTICE_AUDIT.md`, `KOREAN_MBCT_AUDIO_MAPPING.md`, `PDF_EXPORT_VERIFICATION.md` 순입니다.

구현 파일, migration, 테스트 범위 및 미완료 연동은 [구현 보고서](document/IMPLEMENTATION_REPORT.md)에 있습니다. 실제 390px 화면과 PDF 다운로드는 **human visual check required** 상태입니다.
