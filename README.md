# Policy Fund Compass / 정책자금 나침반

스타트업, 1인 사업자, 소상공인을 위한 공식 출처 기반 사업자 정책 인텔리전스 MVP입니다. 위키(Hermes Agent)가 매일 양질의 정책 콘텐츠 초안을 만들되, 자동 공개 발행이 아니라 Draft PR 기반 검토 흐름을 기본값으로 합니다.

## 10분 Quick Start

```bash
npm install
npm run pipeline:fixture
npm run lint
npm run typecheck
npm test
npm run qa
npm run build
```

## 운영 원칙

- 실제 API 키는 `.env`에 커밋하지 않습니다.
- 원문 전문, PDF/HWP 전문, 전체 HTML raw payload를 Git에 저장하지 않습니다.
- `source-registry`에 등록되고 정책 게이트를 통과한 S/A 등급 출처만 자동 초안 후보가 됩니다.
- 자동화 결과는 Draft PR까지만 허용하며, 공개 배포는 `main` 병합 후 GitHub Pages workflow에서만 수행합니다.

## 운영자 역할

- 위키는 매일 공식 출처를 점검해 양질의 정책 콘텐츠 Draft PR을 준비합니다.
- 대표님 또는 지정 편집자가 검토·병합하기 전에는 공개 배포하지 않습니다.
- 독자 대상은 스타트업 대표, 1인 사업자, 소상공인입니다.
