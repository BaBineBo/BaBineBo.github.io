import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ScrollCarousel } from '../layouts/slides'

export const Route = createFileRoute('/')({
  component: RootPage,
})

const NAV_H = 64

function RootPage() {
  const slideDefs = React.useMemo(
    () => [
      {
        id: 'home',
        label: 'Home',
        background: '#0b1220',
        node: (
          <Slide title="Home" background="#0b1220">
            <p className="opacity-80">This is the first slide.</p>
            <Spacer />
            <SectionTitle>Some content</SectionTitle>
            <p className="opacity-80">
              Add your intro, links, and whatever you want here.
            </p>
            <Spacer />
          </Slide>
        ),
      },
      {
        id: 'work',
        label: 'Work',
        background: '#0f172a',
        node: (
          <Slide title="Work" background="#0f172a">
            <p className="opacity-80">
              Put projects, roles, screenshots, etc. here.
            </p>
            <Spacer />
            <SectionTitle>Project list</SectionTitle>
            <ul className="list-disc pl-6 space-y-2 opacity-90">
              <li>Project A</li>
              <li>Project B</li>
              <li>Project C</li>
            </ul>
            <Spacer />
          </Slide>
        ),
      },
      {
        id: 'about',
        label: 'About',
        background: '#111827',
        node: (
          <Slide title="About" background="#111827">
            <p className="opacity-80">Bio, skills, fun facts.</p>
            <Spacer />
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Design Systems'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <Spacer />
          </Slide>
        ),
      },
      {
        id: 'contact',
        label: 'Contact',
        background: '#0b0f19',
        node: (
          <Slide title="Contact" background="#0b0f19">
            <p className="opacity-80">Links and ways to reach you.</p>
            <Spacer />
            <SectionTitle>Find me</SectionTitle>
            <div className="flex flex-col gap-2">
              <a
                className="underline underline-offset-4 opacity-90 hover:opacity-100"
                href="#"
              >
                GitHub
              </a>
              <a
                className="underline underline-offset-4 opacity-90 hover:opacity-100"
                href="#"
              >
                LinkedIn
              </a>
              <a
                className="underline underline-offset-4 opacity-90 hover:opacity-100"
                href="#"
              >
                Email
              </a>
            </div>
            <Spacer />
          </Slide>
        ),
      },
    ],
    [],
  )

  const slides = React.useMemo(() => slideDefs.map((s) => s.node), [slideDefs])

  const getIndexFromHash = React.useCallback(() => {
    const raw = window.location.hash.replace('#', '').trim()
    if (!raw) return 0
    const found = slideDefs.findIndex((s) => s.id === raw)
    return found >= 0 ? found : 0
  }, [slideDefs])

  const [active, setActive] = React.useState(() => getIndexFromHash())

  const setHashForIndex = React.useCallback(
    (i: number) => {
      const id = slideDefs[i]?.id
      if (!id) return
      const nextHash = `#${id}`
      if (window.location.hash === nextHash) return
      // replaceState avoids adding lots of entries while scrolling.
      window.history.replaceState(null, '', nextHash)
    },
    [slideDefs],
  )

  // Keep URL in sync when active slide changes (from scroll OR buttons)
  React.useEffect(() => {
    setHashForIndex(active)
  }, [active, setHashForIndex])

  // Allow back/forward and direct links to move the carousel.
  React.useEffect(() => {
    const onHash = () => {
      const next = getIndexFromHash()
      setActive((prev) => (prev === next ? prev : next))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [getIndexFromHash])

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-neutral-950 text-white">
      <div
        className="flex items-center justify-between px-4"
        style={{
          height: NAV_H,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="font-medium">Sabine Randow</div>
        <nav className="hidden gap-3 text-sm opacity-90 sm:flex">
          {slideDefs.map((s, i) => (
            <button
              key={s.id}
              className={
                'rounded-full px-3 py-1 transition ' +
                (active === i ? 'bg-white/10' : 'hover:bg-white/5')
              }
              onClick={() => setActive(i)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </nav>
        <button
          className="sm:hidden rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm"
          type="button"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      <div style={{ height: `calc(100dvh - ${NAV_H}px)` }}>
        <ScrollCarousel
          slides={slides}
          initialIndex={active}
          activeIndex={active}
          onIndexChange={(i) => setActive(i)}
        />
      </div>
    </div>
  )
}

function Slide({
  title,
  children,
  background,
}: {
  title: string
  children: React.ReactNode
  background?: string
}) {
  return (
    <div
      className="h-full px-5 py-8 sm:px-10"
      style={{ backgroundColor: background ?? 'transparent' }}
    >
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-medium opacity-95">{children}</h2>
}

function Spacer() {
  return <div className="h-24" />
}
