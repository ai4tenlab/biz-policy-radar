# Security

- `.env`, API 키, GitHub token, 쿠키, 개인정보를 Git에 커밋하지 않는다.
- 원시 API 응답과 전체 HTML은 기본적으로 Git에 저장하지 않는다.
- 필요한 경우 해시, 수집 시각, 로컬 임시 경로만 로그에 남긴다.
- 수집 실패가 기존 공개 콘텐츠 삭제로 이어지지 않도록 close-expired는 Draft PR만 생성한다.
