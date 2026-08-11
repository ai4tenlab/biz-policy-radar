# Architecture

Biz Policy Radar는 `source-registry → 정책 게이트 → 수집 → 정규화 → 중복/변경 탐지 → 검증 → Markdown/JSON 생성 → QA → Draft PR` 구조를 따른다.

## 원칙

- 자동 수집과 자동 공개 발행을 분리한다.
- MVP는 DB 없이 JSON, Markdown, manifest, log를 사용한다.
- API 미제공 기관은 RSS, 허용형 웹, 수동 큐 순서로만 보완한다.
- `unknown` 이용조건은 자동 수집 금지다.
