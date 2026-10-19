# 키보드 두들기며 먹고살기

정우기의 기술 블로그이자 포트폴리오입니다. <https://keyboard-hit-blog.vercel.app>

- `/` 글 목록. 태그별 라우트는 `/posts/<tag>`
- `/posts/Portfolio` 실무 사례 3편. 문제 · 제약 · 선택지 · 결정 · 확인 결과 순서로 씁니다
- `/about` 경력 · 기술 · 보조 프로젝트 · 학력

## 스택

Next.js 16(App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Velite(MDX) · ESLint 10(flat config) · Vercel

글은 `src/posts/<Tag>/<slug>.mdx`에 두고, Velite가 `.velite/`로 변환합니다. 개발 중에는 `velite --watch`가 Next와 함께 돌고, 빌드 시에는 `velite`가 먼저 실행됩니다. front matter는 `title · description · tag · createdDate`(선택: `updatedDate · tags`)입니다. OG 이미지는 `/api/og`에서 글 제목과 태그로 생성합니다.

## 실행

```bash
pnpm install
pnpm dev
```

```bash
pnpm lint && pnpm typecheck && pnpm build
```

패키지 매니저는 pnpm만 허용합니다(`preinstall`). 커밋 시 `lint-staged`가 바뀐 파일에 Prettier와 ESLint를 실행합니다(husky).

## 환경 변수

`.env.example`을 복사해 `.env.local`을 만듭니다. 방문 통계(Upstash Redis) 변수가 없으면 통계는 0으로 표시되고 페이지는 정상 렌더됩니다.

## 구조

```
src/
  app/            라우트 (about, posts/[tag]/[slug], api/og, api/stats)
  components/     헤더 · 푸터 · 테마 · 통계 · giscus
  constant/       ABOUT_ME(경력·기술·프로젝트 데이터), META_DATA
  posts/          MDX 글 (태그 폴더별)
  utils/          메타데이터 · 태그 · 날짜 · 이미지 경로
velite.config.ts  Post 컬렉션 스키마와 remark/rehype 설정
```
