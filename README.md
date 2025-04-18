인스타그램 형식을 사용해 사용자들이 자신의 이야기를 자유롭게 소통할 수 있는 창구를 만들려 합니다.

## 기술 스택

`next.js`, `next-auth`, `tailwind`, `sanity`

## 구현 기능 및 점검 내용

- 로그인
- 게시글 작성
- 게시글 좋아요, 북마크 토글
- 게시글 댓글 작성
- 사용자 프로필 페이지
- 사용자 검색
- 사용자 팔로우, 언팔로우
- 팔로우한 사용자 게시글 조회
- Lighthouse를 통한 접근성 개선

## 보완할 부분

- next-auth 로그인 시 user별 id 값 prisma 사용하여 값 고정
- sanity 접속 client 구분(client, freshClient)
- 사용자 프로필 페이지 로딩 시 화면
- sanity 이전 -> supabase 혹은 자체 db
- 익명 로그인 기능(or 이메일 인증 기능)
- 채널 별 데이터 저장
- 간단한 대화창
