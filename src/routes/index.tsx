import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ScrollCarousel } from '../layouts/slides'
import { rootSlides } from '../features/root/slides'

export const Route = createFileRoute('/')({
  component: RootPage,
})

const NAV_H = 64

function RootPage() {
  const slideDefs = rootSlides

  const getIndexFromHash = React.useCallback(() => {
    const raw = window.location.hash.replace('#', '').trim()
    if (!raw) return 0
    const found = slideDefs.findIndex((s) => s.id === raw)
    return found >= 0 ? found : 0
  }, [slideDefs])

  const [active, setActive] = React.useState(() => getIndexFromHash())
  const slides = React.useMemo(
    () =>
      slideDefs.map((s, i) => {
        const hasNext = i < slideDefs.length - 1
        return s.render({
          hasNext,
          onNext: hasNext ? () => setActive(i + 1) : undefined,
        })
      }),
    [slideDefs, setActive],
  )

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
    <div className="h-[100dvh] w-full overflow-hidden bg-tea_green-900 text-tea_green-100">
      <div
        className="flex items-center justify-between border-b border-tea_green-700/60 bg-tea_green-900 px-4"
        style={{ height: NAV_H }}
      >
        <div className="font-medium text-tea_green-200">Sabine Randow</div>
        <nav className="hidden gap-3 text-sm text-tea_green-200 sm:flex">
          {slideDefs.slice(1).map((s, i) => (
            <button
              key={s.id}
              className={
                'rounded-full px-3 py-1 transition ' +
                (active === i + 1
                  ? 'bg-tea_green-700/60 text-tea_green-100'
                  : 'hover:bg-tea_green-800/70')
              }
              onClick={() => setActive(i + 1)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </nav>
        <button
          className="sm:hidden rounded-full border border-tea_green-600/40 bg-tea_green-800/70 px-3 py-1 text-sm text-tea_green-100"
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
