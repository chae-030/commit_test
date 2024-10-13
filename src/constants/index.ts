import { JOB_TYPE } from "../types/constants";

export const JOBS: JOB_TYPE[] = [
  {
    title: "Front-end 개발자",
    description:
      "사용자가 상호작용하는 웹사이트나 앱의 UI를 개발하고, 시각적 요소와 사용자 경험을 최적화합니다.",
    details:
      "사용자가 직접 보고 상호작용하는 웹사이트나 애플리케이션의 UI를 개발하는 역할을 합니다. 프론트엔드 개발자는 HTML, CSS, JavaScript 등을 사용하여 시각적 요소와 사용자 경험을 최적화합니다.",
    skills: [
      "HTML, CSS, JavaScript",
      "프레임워크: React, Vue, Angular 등",
      "UI/UX 디자인 원칙",
      "반응형 웹 디자인",
    ],
    imgUrl: "front.jpg",
  },
  {
    title: "Back-end 개발자",
    description:
      "사용자가 상호작용하는 웹사이트나 앱의 UI를 개발하고, 시각적 요소와 사용자 경험을 최적화합니다.",
    details:
      "서버, 데이터베이스, API 및 애플리케이션 로직을 개발하고 유지 관리하는 역할을 합니다. 백엔드 개발자는 사용자가 웹사이트나 앱에서 수행하는 작업을 서버 측에서 처리하며, 데이터 저장 및 보안과 같은 기능도 담당합니다.",
    skills: [
      "프로그래밍 언어: Java, Python, Node.js, Ruby 등",
      "데이터베이스: MySQL, MongoDB, PostgreSQL 등",
      "서버: Express.js, Django, Spring 등",
      "API: RESTful, GraphQL 등",
    ],
    imgUrl: "back.jpg",
  },
  {
    title: "UI/UX 디자이너",
    description:
      "사용자 인터페이스를 설계하고 사용자 경험을 개선하여 더 나은 제품을 만듭니다.",
    details:
      "사용자 인터페이스(UI)를 설계하고 사용자 경험(UX)을 최적화하는 역할을 합니다. UI 디자이너는 웹사이트나 애플리케이션의 시각적 요소를 디자인하며, UX 디자이너는 사용자의 편의성과 만족도를 높이기 위해 구조와 흐름을 개선합니다.",
    skills: [
      "디자인 툴: Figma, Adobe XD, Sketch 등",
      "사용자 리서치",
      "프로토타이핑 및 와이어프레임",
      "사용성 테스트",
    ],
    imgUrl: "uiux.jpg",
  },
  {
    title: "프로덕트 매니저",
    description:
      "제품의 기획과 개발을 총괄하며, 비즈니스 목표와 사용자 요구를 반영한 제품 전략을 수립합니다.",
    details:
      "제품의 전반적인 기획과 개발을 관리하는 직무로, 고객의 요구와 비즈니스 목표를 반영하여 제품 전략을 수립하고 팀을 이끌어 나가는 역할을 합니다. 여러 팀 간 커뮤니케이션을 조율하고, 시장 조사 및 제품 로드맵을 계획합니다.",
    skills: [
      "시장 조사 및 데이터 분석",
      "제품 로드맵 작성",
      "비즈니스 전략",
      "커뮤니케이션 및 리더십 스킬",
    ],
    imgUrl: "product.jpg",
  },
  {
    title: "프로젝트 매니저",
    description:
      "프로젝트의 전 과정을 관리하여 목표를 시간과 예산 내에 달성하도록 이끌고 조율합니다.",
    details:
      "프로젝트의 계획, 실행, 모니터링, 그리고 완료까지의 전 과정을 책임지는 직무입니다. 주어진 시간과 예산 내에서 목표를 달성하도록 관리하며, 팀 간의 협업과 자원 배분을 조율합니다.",
    skills: [
      "프로젝트 계획 및 일정 관리",
      "자원 및 리스크 관리",
      "프로젝트 관리 툴: Jira, Trello 등",
      "커뮤니케이션 및 문제 해결 능력",
    ],
    imgUrl: "project.jpg",
  },
  {
    title: "QA 엔지니어",
    description:
      "소프트웨어의 결함을 찾아내고 테스트하여 품질을 보장하는 역할을 수행합니다.",
    details:
      "소프트웨어의 품질을 보장하는 역할을 합니다. 소프트웨어 테스트 계획을 세우고, 버그나 결함을 발견하여 수정하도록 피드백을 제공합니다. QA 엔지니어는 제품이 요구 사항을 충족하는지 확인하며, 최종 릴리스 전에 제품을 철저히 점검합니다.",
    skills: [
      "테스트 자동화 도구: Selenium, JUnit 등",
      "테스트 전략 및 계획 수립",
      "버그 트래킹 시스템: Bugzilla, Jira 등",
      "품질 관리 방법론",
    ],
    imgUrl: "qa.jpg",
  },
  {
    title: "데브옵스 엔지니어",
    description:
      "개발과 운영을 자동화하여 소프트웨어 배포와 시스템 운영을 효율적으로 관리합니다.",
    details:
      "개발(Development)과 운영(Operations) 간의 간극을 줄이기 위해 시스템 자동화 및 배포 파이프라인을 관리합니다. 데브옵스 엔지니어는 코드 배포, 인프라 관리, CI/CD 파이프라인 설정 등으로 효율적인 소프트웨어 배포와 운영을 돕습니다.",
    skills: [
      "클라우드 서비스: AWS, GCP, Azure 등",
      "자동화 도구: Jenkins, Docker, Kubernetes 등",
      "서버 관리 및 모니터링",
      "CI/CD 파이프라인 구축",
    ],
    imgUrl: "devops.jpg",
  },
];
