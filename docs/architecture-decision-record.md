# Architecture Decision Record

## ADR-001: Astro 채택

- 결정: MVP 정적 사이트 프레임워크로 Astro를 사용한다.
- 이유: GitHub Pages 정적 배포에 적합하고, 콘텐츠 중심 페이지를 단순하게 구현할 수 있다.
- 대안: Jekyll, Next.js static export.
- 결론: 지시 기본값을 유지한다.


## ADR-002: Apple Newsroom × Policy Intelligence Dashboard 디자인

- 결정: 첫 화면은 고급 뉴스룸형 Read/Persuade, 하단은 정책 인텔리전스 Monitor 성격의 대시보드로 구성한다.
- 참고 원칙: Impeccable의 "모드 먼저 선택", 결정적 디자인 게이트, generic SaaS 패턴 회피, 순수 검정/회색 회피, 카드 남발 방지.
- 적용: warm paper, lacquer ink, kinpaku gold, patina accent를 정책 사이트에 맞게 변형했다. Apple 홈페이지를 복제하지 않고 큰 타이포그래피, 여백, sticky glass nav, 스크롤 reveal, 뉴스룸형 story hierarchy만 차용했다.
- 금지: 정책 사실을 꾸미기 위한 가짜 수치, 의미 없는 아이콘 그리드, 보라/파랑 gradient SaaS hero.
