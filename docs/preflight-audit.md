# Phase 0 — 읽기 전용 사전 감사 초안

- 기준일: 2026-07-29 KST
- 실행 노드: Cafe24 VPS / Hermes Agent 위키
- 작업 디렉터리: `/root/biz-policy-radar`
- 기존 지정 GitHub 저장소: 없음
- 운영 원칙: 새 저장소 생성, remote push, GitHub Secrets 등록, Pages 공개 배포는 운영자 승인 전 보류

## 환경 점검 결과

| 항목 | 결과 | 비고 |
|---|---|---|
| 현재 시작 CWD | `/root/hermes-system-backups-repo` | 새 프로젝트는 별도 디렉터리 `/root/biz-policy-radar`에 생성 |
| 기존 Git top | `/root/hermes-system-backups-repo` | 기존 백업 repo 훼손 방지를 위해 분리 |
| Node.js | `v22.22.3` | 사용 가능 |
| npm | `10.9.8` | pnpm 미확인/미설치 상태라 npm 사용 |
| Python | `3.11.15` | 보조 스크립트 사용 가능 |
| GitHub CLI | `gh 2.45.0` | 로그인 가능 여부만 확인 |
| Docker | 출력 없음 | Phase 0 기준 보류/필수 아님 |
| Hermes | `v0.19.0` | 실행 중 |
| GitHub auth | `ai4tenlab` 로그인 확인 | 토큰 값은 출력하지 않음 |
| BIZINFO_API_KEY | 미확인/없음 | 실제 API 호출 금지, fixture 기반 구현 |

## 보류 목록

- GitHub 저장소 생성 또는 remote 연결: 운영자 승인 필요
- GitHub Secrets 등록: 운영자 승인 및 API 키 필요
- GitHub Pages 공개 배포: 운영자 승인 필요
- 실제 기업마당 API 호출: `BIZINFO_API_KEY` 발급·등록 후 별도 승인 필요
- 각 공식기관 robots/약관/라이선스 최종 판정: 실제 URL 확인 전 `unknown` 또는 `manual_review`

## 패키지 설치 계획

| 패키지 | 목적 | 리스크 | 대응 |
|---|---|---|---|
| `astro` | 정적 사이트 빌드 | npm 공급망 리스크 | lockfile 유지, 최소 의존성 |
| `typescript` | 타입 검사 | 낮음 | lockfile 유지 |
| `@astrojs/check` | Astro 타입 검증 | 낮음 | 필요 시 CI에서 사용 |
| `@types/node` | Node 기반 Astro data loader 타입 검사 | 낮음 | devDependency로만 사용 |

## Phase 0 판단

- 새 로컬 디렉터리에서 MVP 스캐폴딩 가능
- 외부 API 호출 없이 fixture 기반 Phase 1~2 진행 가능
- 공개 배포와 원격 push는 승인 전 금지
