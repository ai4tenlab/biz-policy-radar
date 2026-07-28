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
