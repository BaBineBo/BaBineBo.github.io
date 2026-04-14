export type CvPeriod = {
  label: string
  start: Date
  end: Date | null
}

export type CvExperience = {
  role: string
  company: string
  href?: string
  period: CvPeriod
  summary: string
  description: Array<string>
  skills: Array<string>
}

export type CvEmployerSection = {
  heading: string
  summary: string
  href?: string
  items: Array<CvExperience>
}

export type CvExperienceRecord = {
  employerHeading: string
  employerSummary: string
  employerHref?: string
  experience: CvExperience
}

export const languages = [
  { label: 'Swedish', value: 'Native' },
  { label: 'English', value: 'Full professional proficiency' },
]

export const experienceSections: Array<CvEmployerSection> = [
  {
    heading: 'Devies',
    summary:
      'Assignments delivered through Devies, currently spanning analytics and banking products.',
    href: 'https://www.devies.se/',
    items: [
      {
        role: 'Frontend Lead',
        company: 'SMT Data',
        period: {
          label: '2025 Q3 - ongoing',
          start: new Date(2025, 6, 1),
          end: null,
        },
        summary:
          'Owns the frontend for ITBI, a multitenant SaaS platform for IT cost and capacity optimization.',
        description: [
          'Works independently in a backend-heavy team, building features, fixing bugs, and shaping frontend architecture decisions.',
          'Handles authentication, role access, and session logic through Zitadel in a multitenant environment.',
          'Implemented a message bridge between the portal and embedded TARGIT dashboards for real-time communication.',
          'Uses Playwright and Vitest for testing and contributes to SOC 2 Type II and ISO 27001 readiness.',
          'Developed reusable AI-agent skills and taught teammates how to use agent-assisted development effectively.',
        ],
        skills: [
          'AI Agents',
          'ISO 27001',
          'Multitenancy',
          'Playwright',
          'React',
          'React Router',
          'SOC 2',
          'TARGIT',
          'TypeScript',
          'Vite',
          'Vitest',
          'Zitadel',
        ],
      },
      {
        role: 'Fullstack Developer',
        company: 'Lea Bank',
        period: {
          label: '2025 Q1 - 2025 Q2',
          start: new Date(2025, 0, 1),
          end: new Date(2025, 5, 30),
        },
        summary:
          'Worked on digital flows for loans and credit cards in a stateless Next.js setup communicating with bank systems through external APIs.',
        description: [
          'Introduced atomic design thinking for the component library.',
          'Built major form flows with validation using React Hook Form and Zod.',
          'Strengthened E2E coverage with Playwright.',
          'Introduced Husky across repositories and improved CI/CD and environment setup.',
          'Took responsibility for daily planning in Azure DevOps during parts of the project.',
        ],
        skills: [
          'Atomic Design',
          'Azure DevOps',
          'Docker',
          'Husky',
          'i18n',
          'Material UI',
          'Next.js',
          'Playwright',
          'React',
          'React Hook Form',
          'React Query',
          'Storybook',
          'Strapi',
          'TypeScript',
          'Zod',
        ],
      },
    ],
  },
  {
    heading: 'Helo',
    summary:
      'Consulting work across product teams, mobile apps, and frontend-heavy builds.',
    href: 'https://www.helo.se/',
    items: [
      {
        role: 'Frontend App/Web Lead',
        company: 'Chalmers Student Union',
        period: {
          label: '2023 Q2 - 2025 Q1',
          start: new Date(2023, 3, 1),
          end: new Date(2025, 2, 31),
        },
        summary:
          'Led frontend development for Kårappen and related interfaces in a small team, owning mobile app features and associated admin flows.',
        description: [
          'Implemented BankID login, Swish payments, notification management with Notifee, and OTA updates via CodePush.',
          'Introduced API-first collaboration and led technical design discussions between backend and UX/UI.',
          'Built the component library with Tailwind CSS and standardized form handling with React Hook Form.',
          'Owned form logic, local browser caching, and E2E coverage in the admin interface.',
          'Built GoBookGo from scratch as an embedded WebView-based front-end project inside the app.',
        ],
        skills: [
          'API-first Collaboration',
          'BankID',
          'CodePush',
          'Maestro',
          'Notifee',
          'Playwright',
          'React',
          'React Hook Form',
          'React Native',
          'React Query',
          'Redux',
          'Swish',
          'Tailwind CSS',
          'TypeScript',
          'Vite',
          'WebView',
        ],
      },
      {
        role: 'Frontend Developer',
        company: 'Allevi',
        period: {
          label: '2024 Q1 - 2024 Q4',
          start: new Date(2024, 0, 1),
          end: new Date(2024, 11, 31),
        },
        summary:
          'Contributed to web and mobile applications for AiAi, a personal assistance system with complex scheduling, reporting, and chat functionality.',
        description: [
          'Implemented a nested datagrid-based time reporting flow with careful state and rendering optimization.',
          'Owned the real-time chat experience across web and mobile, including editing, deletion, push notifications, and local state updates.',
          'Worked with generated types and shared API clients from Swagger-based backend contracts.',
          'Set up Axios interceptors and user-friendly error handling patterns.',
          'Handled file-based navigation, deeplinking, and push notification flows in the Expo-based mobile app.',
        ],
        skills: [
          'Axios',
          'Deeplinking',
          'Expo',
          'Material UI',
          'Push Notifications',
          'React',
          'React Native',
          'React Query',
          'SignalR',
          'Swagger',
          'TypeScript',
          'Vite',
          'Vitest',
          'WebSockets',
        ],
      },
      {
        role: 'Frontend Developer',
        company: 'SkiStar',
        period: {
          label: '2023 Q4 - 2024 Q1',
          start: new Date(2023, 9, 1),
          end: new Date(2024, 2, 31),
        },
        summary:
          'Worked primarily on the SkiStar 360 mobile app and also contributed to the admin portal for mountain experiences, bookings, and 3D resort maps.',
        description: [
          'Built in React Native with Unity-integrated 3D maps, booking flows, and internationalization.',
          'Quickly became self-sufficient in an existing project and delivered accurate implementation estimates.',
          'Repeatedly recognized for structured work and positive team energy.',
        ],
        skills: [
          'Git',
          'i18n',
          'JavaScript',
          'React',
          'React Native',
          'React Query',
          'Redux',
          'TypeScript',
          'Unity',
        ],
      },
      {
        role: 'Frontend Developer',
        company: 'Pulsen Group',
        period: {
          label: '2024 Q3',
          start: new Date(2024, 6, 1),
          end: new Date(2024, 8, 30),
        },
        summary:
          'Part of a small cross-functional team building Pulsentrappan, an app for elite women football players planning life after football.',
        description: [
          'Worked across screen structure, form flows, and presentation of quiz and career-plan views.',
          'Adapted and extended an existing app foundation under a tight three-month timeline.',
          'Collaborated closely with UX and backend around AI-powered result flows.',
        ],
        skills: ['AI', 'React Native', 'TypeScript'],
      },
    ],
  },
  {
    heading: 'Opera',
    summary:
      "This assignment sits separately from the consulting roles and reflects Sabine's internship experience during her studies.",
    href: 'https://www.opera.com/',
    items: [
      {
        role: 'React/Go Developer',
        company: 'Opera',
        period: {
          label: '2022 Q3 - 2022 Q4',
          start: new Date(2022, 6, 1),
          end: new Date(2022, 11, 31),
        },
        summary:
          'Built an internal tool during a summer internship, visualizing assets linked to different cryptocurrencies for the Opera Crypto browser context.',
        description: [
          'Owned the full chain from React frontend to Go backend.',
          'Worked independently with supervisor feedback in a Docker-based local environment.',
          'Gained early hands-on experience with professional production workflows during studies.',
        ],
        skills: ['Docker', 'Go', 'React', 'TypeScript'],
      },
    ],
  },
  {
    heading: 'Chalmers',
    summary:
      'Education timeline entries. Placeholder data for now so degrees can be searched and filtered like the rest of the timeline.',
    href: 'https://www.chalmers.se/',
    items: [
      {
        role: 'nothing here',
        company: 'Bachelor in Computer Science',
        href: 'https://www.chalmers.se/utbildning/hitta-program/datateknik-civilingenjor/',
        period: {
          label: 'Placeholder period',
          start: new Date(2017, 7, 1),
          end: new Date(2020, 5, 30),
        },
        summary: 'Placeholder summary for the bachelor programme at Chalmers.',
        description: [
          'Placeholder description about coursework, systems thinking, and software engineering foundations.',
          'Placeholder description about project work, collaboration, and technical breadth.',
        ],
        skills: ['Algorithms', 'Computer Science', 'Placeholder Skill'],
      },
      {
        role: 'nothing here',
        company: 'Masters in High Performance Computer Systems',
        href: 'https://www.chalmers.se/utbildning/hitta-program/hogpresterande-datorsystem-masterprogram/',
        period: {
          label: 'Placeholder period',
          start: new Date(2020, 7, 1),
          end: new Date(2022, 5, 30),
        },
        summary:
          'Placeholder summary for the master programme in High Performance Computer Systems.',
        description: [
          'Placeholder description about performance, systems design, and advanced engineering topics.',
          'Placeholder description about deeper specialization and research-oriented work.',
        ],
        skills: [
          'Distributed Systems',
          'High Performance Computing',
          'Placeholder Skill',
        ],
      },
    ],
  },
]

export function getAllCvSkills() {
  return Array.from(
    new Set(
      experienceSections.flatMap((section) =>
        section.items.flatMap((item) => item.skills),
      ),
    ),
  ).sort((left, right) => left.localeCompare(right))
}

export function getAllCvExperienceRecords(): Array<CvExperienceRecord> {
  return experienceSections.flatMap((section) =>
    section.items.map((experience) => ({
      employerHeading: section.heading,
      employerSummary: section.summary,
      employerHref: section.href,
      experience,
    })),
  )
}
