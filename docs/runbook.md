# Runbook

## API 키 등록

1. 운영자가 공식 API 키를 발급한다.
2. 로컬은 환경변수 `BIZINFO_API_KEY`로만 주입한다.
3. GitHub Actions는 Repository Secrets에 `BIZINFO_API_KEY`를 등록한다.
4. 키 값은 PR, 로그, 문서에 출력하지 않는다.

## PR 검토·병합

자동화는 Draft PR까지만 생성한다. main 병합 후에만 Pages 배포가 가능하다.

## 매일 운영 원칙

위키는 매일 공식 출처를 확인해 Draft PR을 만들 수 있다. 다만 main 병합, GitHub Pages 공개 배포, API 키/Secret 등록은 운영자 승인 후에만 수행한다.

예정 Pages URL: `https://ai4tenlab.github.io/biz-policy-radar/`

## GitHub Actions 적용 보류

현재 GitHub OAuth token에 `workflow` scope가 없어 `.github/workflows/*.yml` push가 거부될 수 있다. 이 경우 workflow 초안은 `docs/github-actions-templates/`에 보관하고, 운영자가 `workflow` scope를 포함해 재인증한 뒤 `.github/workflows/`로 복사해 PR로 적용한다.

## 자동 발행 승인 범위 — 2026-07-29 KST

운영자는 위키가 스타트업, 1인 사업자, 소상공인을 위해 매일 양질의 정책 콘텐츠를 운영·발행하는 것을 승인했다. 공식 API가 없으면 공식 RSS/Atom, 그 다음 허용형 공식 웹 수집 순서로 진행할 수 있다.

단, 자동 발행은 다음 조건을 모두 만족하는 항목에 한정한다.

- source registry에 등록된 공식 도메인이다.
- S/A 등급 출처다.
- robots, 약관, 라이선스/재이용권, 요청량 제한이 `allow`로 확인됐다.
- 로그인, CAPTCHA, 접근 우회, 비공식 API 호출이 필요 없다.
- 원문 전문/PDF/HWP/전체 HTML을 저장하지 않는다.
- 사실 필드는 공식 원문에서 직접 확인됐다.
- QA PASS이며 NEEDS_REVIEW/BLOCK/MANUAL_REVIEW가 아니다.

`unknown` 또는 `manual_review` 출처는 자동 발행하지 않는다.
