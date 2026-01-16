const ABOUT_ME = {
  name: "정우기",
  avatar: "https://avatars.githubusercontent.com/u/113000290?v=4",
  role: "서비스 철학을 기술 로직으로 실현하는 프론트엔드 엔지니어",
  address: "대한민국 경기도",
  email: "jungwk1020@gmail.com",
  github: "https://github.com/WooGi1020",

  description:
    "기술의 원리를 깊이 파고들어 탐구하는 과정과 이를 함께 나누며 최적의 결과를 위한 답을 찾아가는 여정이 정말 흥미롭고 즐겁습니다.\n제가 얻은 인사이트를 투명하게 공유하고, 피드백을 주고받으며 동료와 함께 성장하는 커뮤니케이션을 지향합니다.\n이러한 과정들이 엔지니어로서 느끼는 가장 큰 보람이며, 몰입과 공유의 가치를 바탕으로 어제보다 더 나은 스스로가 되고자 합니다.",

  skills: {
    "Core Engineering": [
      "TypeScript",
      "JavaScript(ES6+)",
      "React",
      "Next.js(App Router",
      "Flutter",
    ],
    "Data & State Management": ["Zustand", "Tanstack Query", "SSE(Server-Sent Events)"],
    "Styling & Interaction": ["Tailwind CSS", "Framer Motion", "Shadcn UI", "Kakao Map API"],
    "DevOps & Collaboration": ["Git & GitHub", "Vercel", "CI/CD(GitHub Actions)", "Edge Runtime"],
  },

  project: [
    {
      name: "Message-Bloom",
      description: "봄날의 선물같은 메세지를 공유하는 웹서비스",
      link: "https://github.com/WooGi1020/MessageBloom",
      period: "2024-04-30 ~ 2024-05-17",
      tag: ["React", "SCSS"],
      src: "/images/project/messageBloom.png",
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
      name: "Coworkers",
      description: "팀원들과 투두리스트를 공유하며 관리하는 웹서비스",
      link: "https://github.com/WooGi1020/CCC-coworkers",
      period: "2024-07-29 ~ 2024-08-28",
      tag: ["Next.js", "Tailwind", "Typescript", "Shadcn", "Pusher"],
      src: "/images/project/coworkers.png",
    },
    {
      name: "GachTaxi",
      description: "가천대학교 학생들을 위한 택시 동승 서비스",
      link: "https://github.com/WooGi1020/GachTaxi-FE",
      period: "2024-12-14 ~ 2025-02-06",
      tag: ["React", "Tailwind", "Typescript", "Framer-Motion"],
      src: "/images/project/gachtaxi.png",
    },
    {
      name: "Fresh Plate",
      description: "비건 & 알러지인들을 위한 외식 정보 제공 플랫폼 (졸업 프로젝트)",
      link: "https://github.com/WooGi1020/fresh_plate",
      period: "2024-05-24 ~ 2025-11-11",
      tag: ["Next.js", "Tailwind", "Typescript", "Kakao-Map-API"],
      src: "/images/project/freshPlate.png",
    },
  ],

  history: [
    {
      do: "코드잇 스프린트 프론트엔드 6기",
      period: "2024-03-07 ~ 2024-09-02",
    },
    {
      do: "가천대학교 개발동아리 Leets 4기 (외부 협력)",
      period: "2024-12-18 ~ 2025-02-06",
    },
  ],
};

export default ABOUT_ME;
