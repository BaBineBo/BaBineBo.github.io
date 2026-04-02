import { createFileRoute } from '@tanstack/react-router'
import { ChevronDown, ChevronRight } from 'react-swm-icon-pack'
import { PageCard, PageHeader } from '../components/page'

export const Route = createFileRoute('/product/cv')({
  component: CvPage,
})

const skills = [
  {
    title: 'Programming Languages & Frameworks',
    items:
      'CSS, Expo, Go, HTML, Javascript, Next.js, Node.js, Python, React, React Native, Typescript',
  },
  {
    title: 'Web & App Development',
    items:
      'Atomic Design Systems, Axios, CodePush, Deeplinking, Form Validation, Material UI, OTA Updates, Push Notifications, React Hook Form, React Query, Redux, Storybook, Tailwind CSS, Vite, WebView, Zod, i18n',
  },
  {
    title: 'Testing',
    items:
      'E2E Testing, Jest, Maestro, Playwright, React Testing Library, Vitest',
  },
  {
    title: 'Databases & API',
    items: 'Convex, MongoDB, PostgreSQL, REST, Swagger',
  },
  {
    title: 'CI/CD, DevOps & Infrastructure',
    items: 'Azure DevOps, Docker, GitHub Actions, Husky',
  },
  {
    title: 'Environments & Tools',
    items:
      'Android Studio, App Store Connect, Azure, Confluence, Docker, Expo Go, Figma, Firebase, GitHub, GitLab, Google Play Console, Jira, VS Code, XCode',
  },
]

const deviesExperience = [
  {
    role: 'Frontend Lead',
    company: 'SMT Data',
    period: '2025 Q3 - ongoing',
    summary:
      'Owns the frontend for ITBI, a multitenant SaaS platform for IT cost and capacity optimization. Works independently in a backend-heavy team, building features, shaping UI, fixing bugs, and driving frontend architecture decisions.',
    highlights: [
      'Built with React, TypeScript, and Vite using file-based routing and a Bulletproof React-inspired structure.',
      'Handles authentication, role access, and session logic through Zitadel in a multitenant environment.',
      'Implemented a message bridge between the portal and embedded TARGIT dashboards for real-time communication.',
      'Uses Playwright and Vitest for testing and contributes to SOC 2 Type II and ISO 27001 readiness.',
      'Developed reusable AI-agent skills and taught teammates how to use agent-assisted development effectively.',
    ],
    meta: 'React, Typescript, Vite, React Router, Zitadel, TARGIT',
  },
  {
    role: 'Fullstack Developer',
    company: 'Lea Bank',
    period: '2025 Q1 - 2025 Q2',
    summary:
      'Worked on digital flows for loans and credit cards in a stateless Next.js setup communicating with bank systems through external APIs.',
    highlights: [
      'Introduced atomic design thinking for the component library.',
      'Built major form flows with validation using React Hook Form and Zod.',
      'Strengthened E2E coverage with Playwright.',
      'Introduced Husky across repositories and improved CI/CD and environment setup.',
      'Took responsibility for daily planning in Azure DevOps during parts of the project.',
    ],
    meta: 'Next.js, Storybook, Typescript, React, React Query, React Hook Form, Docker, Playwright, Strapi, i18n, Material UI, Zod',
  },
]

const heloExperience = [
  {
    role: 'Frontend App/Web Lead',
    company: 'Chalmers Student Union',
    period: '2023 Q2 - 2025 Q1',
    summary:
      'Led frontend development for Kårappen and related interfaces in a small team, owning mobile app features and associated admin flows.',
    highlights: [
      'Implemented BankID login, Swish payments, notification management with Notifee, and OTA updates via CodePush.',
      'Introduced API-first collaboration and led technical design discussions between backend and UX/UI.',
      'Built the component library with Tailwind CSS and standardized form handling with React Hook Form.',
      'Owned form logic, local browser caching, and E2E coverage in the admin interface.',
      'Built GoBookGo from scratch as an embedded WebView-based front-end project inside the app.',
    ],
    meta: 'React Native, React, Playwright, Maestro, Swish, BankID, Notifee, Typescript, WebView, Redux, Vite, React Query, CodePush, Tailwind CSS',
  },
  {
    role: 'Frontend Developer',
    company: 'Allevi',
    period: '2024 Q1 - 2024 Q4',
    summary:
      'Contributed to both web and mobile applications for AiAi, a personal assistance system with complex scheduling, reporting, and chat functionality.',
    highlights: [
      'Implemented a nested datagrid-based time reporting flow with careful state and rendering optimization.',
      'Owned the real-time chat experience across web and mobile, including editing, deletion, push notifications, and local state updates.',
      'Worked with generated types and shared API clients from Swagger-based backend contracts.',
      'Set up Axios interceptors and user-friendly error handling patterns.',
      'Handled file-based navigation, deeplinking, and push notification flows in the Expo-based mobile app.',
    ],
    meta: 'React, React Native, Bryntum, WebSockets, SignalR, React Query, Typescript, Material UI, Vite, Expo, Axios, Deeplinking, Push Notifications, Vitest',
  },
  {
    role: 'Frontend Developer',
    company: 'SkiStar',
    period: '2023 Q4 - 2024 Q1',
    summary:
      'Worked primarily on the SkiStar 360 mobile app and also contributed to the admin portal for mountain experiences, bookings, and 3D resort maps.',
    highlights: [
      'Built in React Native with Unity-integrated 3D maps, booking flows, and internationalization.',
      'Quickly became self-sufficient in an existing project and delivered accurate implementation estimates.',
      'Repeatedly recognized for structured work and positive team energy.',
    ],
    meta: 'React Native, React, i18n, Typescript, React Query, Javascript, Git, Redux',
  },
  {
    role: 'Frontend Developer',
    company: 'Pulsen Group',
    period: '2024 Q3',
    summary:
      'Part of a small cross-functional team building Pulsentrappan, an app for elite women football players planning life after football.',
    highlights: [
      'Worked across screen structure, form flows, and presentation of quiz and career-plan views.',
      'Adapted and extended an existing app foundation under a tight three-month timeline.',
      'Collaborated closely with UX and backend around AI-powered result flows.',
    ],
    meta: 'React Native, Typescript',
  },
]

const operaExperience = [
  {
    role: 'React/Go Developer',
    company: 'Opera',
    period: '2022 Q3 - 2022 Q4',
    summary:
      'Built an internal tool during a summer internship, visualizing assets linked to different cryptocurrencies for the Opera Crypto browser context.',
    highlights: [
      'Owned the full chain from React frontend to Go backend.',
      'Worked independently with supervisor feedback in a Docker-based local environment.',
      'Gained early hands-on experience with professional production workflows during studies.',
    ],
    meta: 'Go, React, Typescript, Docker',
  },
]

type EmployerSectionProps = {
  heading: string
  summary: string
  href?: string
  items: Array<{
    role: string
    company: string
    period: string
    summary: string
    highlights: Array<string>
    meta: string
  }>
}

function EmployerSection({
  heading,
  summary,
  href,
  items,
}: EmployerSectionProps) {
  return (
    <details
      open
      className="collapsible-section rounded-[2rem] border border-tea_green-700/60 bg-tea_green-800/40 px-6 py-5"
    >
      <summary className="cursor-pointer list-none">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-2xl font-semibold text-light_bronze-300">
              {heading}
            </h2>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300 transition hover:text-light_bronze-300"
                onClick={(event) => event.stopPropagation()}
              >
                visit site
              </a>
            ) : null}
          </div>
          <span className="collapsible-indicator text-light_bronze-300">
            <ChevronRight
              className="collapsible-icon-closed h-5 w-5"
              color="currentColor"
            />
            <ChevronDown
              className="collapsible-icon-open h-5 w-5"
              color="currentColor"
            />
          </span>
        </div>
      </summary>
      <div className="mt-5 space-y-4">
        <p className="max-w-3xl text-base leading-relaxed text-tea_green-200">
          {summary}
        </p>
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={`${heading}-${item.company}-${item.period}`}
              className="rounded-3xl border border-tea_green-700/60 bg-tea_green-800/70 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300">
                    {item.role}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-light_bronze-300">
                    {item.company}
                  </h3>
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-tea_green-300">
                  {item.period}
                </p>
              </div>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-tea_green-200">
                {item.summary}
              </p>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-tea_green-200">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm uppercase tracking-[0.2em] text-tea_green-300">
                {item.meta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </details>
  )
}

function CvPage() {
  const palette = 'teaGreen' as const

  return (
    <>
      <PageHeader
        palette={palette}
        title="Frontend-focused fullstack developer"
        description="Master’s degree from Chalmers in High Performance Computer Systems. Production experience across banking, analytics, public services, and mobile products, with a consistent focus on frontend architecture, maintainability, and performance."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <PageCard palette={palette} title="What Stands Out">
          Frontend-led fullstack work, strong component and system design
          instincts, and repeated ownership of frontend direction in small
          teams.
        </PageCard>
        <PageCard palette={palette} title="How Sabine Works">
          Clear abstractions, purposeful tooling, reliable documentation, and a
          bias toward maintainable structure over short-lived hacks.
        </PageCard>
        <PageCard palette={palette} title="Performance & Quality">
          Proven experience improving performance, including a 90% reduction in
          input latency for a large-scale component according to the CV profile.
        </PageCard>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <PageCard palette={palette} title="Special Knowledge">
          <ul className="space-y-2">
            <li>Fullstack development with React and Next</li>
            <li>App development with React Native</li>
            <li>Design systems and component structure</li>
          </ul>
        </PageCard>
        <PageCard palette={palette} title="Education & Languages">
          <div className="space-y-4">
            <p>
              Chalmers University of Technology
              <br />
              B.Sc. Computer Science and Engineering
              <br />
              M.Sc. High Performance Computer Systems
            </p>
            <p>Swedish: Native</p>
            <p>English: Full professional proficiency</p>
          </div>
        </PageCard>
      </section>

      <details
        open
        className="collapsible-section rounded-[2rem] border border-tea_green-700/60 bg-tea_green-800/40 px-6 py-5"
      >
        <summary className="cursor-pointer list-none">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold uppercase tracking-[0.4em] text-tea_green-300">
              Skills
            </p>
            <span className="collapsible-indicator text-tea_green-300">
              <ChevronRight
                className="collapsible-icon-closed h-5 w-5"
                color="currentColor"
              />
              <ChevronDown
                className="collapsible-icon-open h-5 w-5"
                color="currentColor"
              />
            </span>
          </div>
        </summary>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <PageCard key={skill.title} palette={palette} title={skill.title}>
              {skill.items}
            </PageCard>
          ))}
        </div>
      </details>

      <section className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.4em] text-tea_green-300">
          Experience
        </p>
        <EmployerSection
          heading="Devies"
          summary="Placeholder summary about Devies. This section groups the assignments Sabine did while working through Devies, currently SMT Data and Lea Bank."
          href="https://www.devies.se/"
          items={deviesExperience}
        />
        <EmployerSection
          heading="Helo"
          summary="Placeholder summary about Helo. This section groups the consulting work Sabine did there across product teams, mobile apps, and frontend-heavy builds."
          href="https://www.helo.se/"
          items={heloExperience}
        />
        <EmployerSection
          heading="Opera"
          summary="This assignment sits separately from the consulting roles and reflects Sabine's internship experience during her studies."
          items={operaExperience}
        />
      </section>
    </>
  )
}
