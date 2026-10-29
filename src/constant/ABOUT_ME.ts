export interface CareerProject {
  name: string;
  subtitle: string;
  period: string;
  stack: string[];
  summary: string;
  caseHref?: string;
  caseTitle?: string;
}

export interface Career {
  company: string;
  role: string;
  period: string;
  summary: string;
  projects: CareerProject[];
}

const ABOUT_ME = {
  name: "정우기",
  avatar: "https://avatars.githubusercontent.com/u/113000290?v=4",
  avatarBack: "/images/avatar-back.jpg",
  role: "서비스 철학을 기술 로직으로 실현하는 프론트엔드 엔지니어",
  address: "대한민국 경기도",
  email: "jungwk1020@gmail.com",
  github: "https://github.com/WooGi1020",

  description:
    "기술의 원리를 깊이 파고들어 탐구하는 과정과 이를 함께 나누며 최적의 결과를 위한 답을 찾아가는 여정이 정말 흥미롭고 즐겁습니다.\n제가 얻은 인사이트를 투명하게 공유하고, 피드백을 주고받으며 동료와 함께 성장하는 커뮤니케이션을 지향합니다.\n이러한 과정들이 엔지니어로서 느끼는 가장 큰 보람이며, 몰입과 공유의 가치를 바탕으로 어제보다 더 나은 스스로가 되고자 합니다.",

  careers: [
    {
      company: "(주)프롬프트타운",
      role: "프론트엔드 엔지니어",
      period: "2026.04 ~ 현재",
      summary:
        "AI 에이전트 플랫폼 Smoody를 만드는 회사에서 프론트엔드를 맡고 있습니다. 에이전트와 대화하는 제품 화면과 그 밑의 클라이언트 SDK, 사내 팀이 쓰는 마케팅 업무 도구(화면부터 서버·외부 서비스 연동·배포까지), 여러 제품이 공유하는 디자인 기준을 담당했습니다.",
      projects: [
        {
          name: "Smoody Platform FE",
          subtitle: "에이전트 대화 화면과 클라이언트 SDK",
          period: "2026.04 ~ 현재",
          stack: ["React", "TypeScript", "Vite", "SSE"],
          summary:
            "에이전트의 답변이 실시간으로 흘러오는 대화 화면과, 그 통신을 맡는 클라이언트 SDK를 만들었습니다. 화면 안의 훅 하나로 시작한 SDK를 별도 패키지로 독립시키고 계층을 나눠, 서버가 바뀌어도 화면이 흔들리지 않게 했습니다. 설치된 패키지 기준으로 검증을 자동화하고, 번들 크기를 예산으로 관리합니다.",
          caseHref: "/posts/Portfolio/chat-runtime-connection-vs-run",
          caseTitle: "SSE 연결이 끊기면 실행도 끝난 걸까?",
        },
        {
          name: "Smoody Scouter",
          subtitle: "마케팅 아웃리치 업무 도구 — 프론트·백엔드 통합 개발과 운영",
          period: "2026.10 ~ 현재",
          stack: ["Next.js", "React", "PostgreSQL", "OAuth 2.0", "AWS"],
          summary:
            "에이전트가 만든 초안을 사람이 검토하고 승인한 뒤에만 발송되는 업무 흐름을 화면부터 서버, 데이터 저장까지 만들었습니다. Gmail·YouTube·Meta 같은 외부 서비스 연동과 보안 검토, 배포와 운영 스케줄러까지 프론트와 백엔드를 한 흐름으로 맡았습니다.",
          caseHref: "/posts/Portfolio/human-approval-and-agent-writes",
          caseTitle: "내가 승인한 초안이 그대로 발송되려면",
        },
        {
          name: "Smoody Design System",
          subtitle: "여러 제품이 함께 쓰는 디자인 시스템",
          period: "2026.09 ~ 현재",
          stack: ["React", "Base UI", "Tailwind CSS", "Design Tokens"],
          summary:
            "색상과 간격 같은 디자인 기준을 한 곳에서 관리하고 코드로 배포하는 체계를 만들었습니다. 제품마다 요구가 달라지자, 모두가 공유할 것과 각 제품이 직접 가질 것의 경계를 다시 정해 운영 부담을 줄였습니다.",
          caseHref: "/posts/Portfolio/design-system-product-owned-ui",
          caseTitle: "공통 UI를 제품 코드로 옮긴 이유",
        },
      ],
    },
  ] satisfies Career[],

  skills: {
    "Language & Framework": [
      "TypeScript",
      "React 19",
      "Vite",
      "React Router 7",
      "Next.js 16(App Router)",
    ],
    "Realtime & State": ["SSE(Server-Sent Events)", "useSyncExternalStore selector", "Zustand"],
    "Server & Data": [
      "Next.js Route Handler",
      "PostgreSQL",
      "트랜잭션·멱등 키·버전 충돌 설계",
      "Zod → OpenAPI",
    ],
    "Integration & Security": ["OAuth 2.0 (Google·Meta)", "토큰 암호화 저장", "CSP·보안 헤더"],
    "Test & Verification": [
      "Vitest",
      "Playwright",
      "axe-core",
      "설치 패키지 기준 소비자 스모크",
      "import 예산·drift 검사",
      "변경 범위 기반 CI",
    ],
    "Package & Delivery": [
      "pnpm workspace",
      "Vite lib 빌드",
      "GitHub Packages",
      "GitHub Actions",
      "Docker · AWS ECR/ECS",
      "Vercel",
    ],
    "Design System": [
      "Design Tokens 생성 파이프라인",
      "Base UI",
      "Tailwind CSS v4",
      "CLI·MCP 문서 조회",
    ],
  },

  project: [
    {
      name: "Fresh Plate",
      description: "비건 & 알러지인들을 위한 외식 정보 제공 플랫폼 (졸업 프로젝트, 팀장)",
      link: "https://github.com/WooGi1020/fresh_plate",
      period: "2025-03 ~ 2025-11",
      tag: ["Next.js", "Tailwind", "Typescript", "Kakao-Map-API"],
      src: "/images/project/freshPlate.png",
    },
    {
      name: "GachTaxi",
      description: "가천대학교 학생들을 위한 택시 동승 서비스 (EventSourcePolyfill 기반 SSE 매칭)",
      link: "https://github.com/WooGi1020/GachTaxi-FE",
      period: "2024-12-14 ~ 2025-02-06",
      tag: ["React", "Tailwind", "Typescript", "Framer-Motion", "SSE"],
      src: "/images/project/gachtaxi.png",
    },
    {
      name: "Coworkers",
      description: "팀원들과 투두리스트를 공유하며 관리하는 웹서비스",
      link: "https://github.com/WooGi1020/CCC-coworkers",
      period: "2024-07-29 ~ 2024-08-28",
      tag: ["Next.js", "Tailwind", "Typescript", "Shadcn", "Pusher"],
      src: "/images/project/coworkers.png",
    },
    {
      name: "Wiki-Viki",
      description: "서로의 위키를 작성하고 공유하는 웹서비스",
      link: "https://github.com/WooGi1020/wiki-viki",
      period: "2024-06-21 ~ 2024-07-07",
      tag: ["Next.js", "Tailwind", "Typescript"],
      src: "/images/project/wikiViki.png",
    },
    {
      name: "Message-Bloom",
      description: "봄날의 선물같은 메세지를 공유하는 웹서비스",
      link: "https://github.com/WooGi1020/MessageBloom",
      period: "2024-04-30 ~ 2024-05-17",
      tag: ["React", "SCSS"],
      src: "/images/project/messageBloom.png",
    },
  ],

  history: [
    {
      do: "한신대학교 AI·SW 페스티벌 캡스톤 디자인 부문 입상",
      period: "2025-11",
    },
    {
      do: "정보처리기사 (한국산업인력공단)",
      period: "2025-09",
    },
    {
      do: "가천대학교 개발동아리 Leets 4기 (외부 협력 프론트엔드)",
      period: "2024-12-18 ~ 2025-02-06",
    },
    {
      do: "코드잇 스프린트 프론트엔드 엔지니어 6기 수료",
      period: "2024-03-07 ~ 2024-09-02",
    },
    {
      do: "SQLD (한국데이터산업진흥원)",
      period: "2023-10",
    },
    {
      do: "한신대학교 정보통신학부",
      period: "2019-03 ~ 2026-02",
    },
  ],
};

export default ABOUT_ME;
