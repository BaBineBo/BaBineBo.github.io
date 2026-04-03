import { createFileRoute } from '@tanstack/react-router'
import { PageHeader, getPagePalette } from '../components/page'

export const Route = createFileRoute('/human/hobbies')({
  component: HumanHobbiesPage,
})

const hobbySections = [
  {
    id: 'sewing',
    title: 'Sewing',
    body: 'A place for projects, materials, fits, and the pleasure of making something tangible from scratch. This section is here so it can grow into process notes, finished pieces, mistakes worth repeating, and whatever I learn along the way.',
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    body: 'An ongoing collection of spatial taste, atmosphere, practical decisions, and the details that make a room feel considered instead of merely arranged. There is more coming here once the references and thoughts are ready.',
  },
  {
    id: 'lindy-hop',
    title: 'Lindy Hop (and other swing dances)',
    body: 'This is the part of my life that is social, musical, physical, and a little bit obsessive in the best possible way. If you want a sense of the local scene, my dance club is ',
    linkLabel: 'WCJ',
    linkHref: 'https://wcj.se/',
    bodyAfterLink:
      ', and this section will eventually hold more about classes, socials, and why swing dances are hard to quit once they get under your skin.',
  },
] as const

function HumanHobbiesPage() {
  const palette = 'lightBronze' as const
  const colors = getPagePalette(palette)

  return (
    <>
      <PageHeader
        palette={palette}
        title="Hobbies"
        description="This page is for the interests that deserve more than a sentence or a card. It starts with a few sections and a quick way to jump straight to the one you want."
      />
      <nav
        aria-label="Hobbies sections"
        className="flex flex-wrap gap-3 rounded-3xl border border-light_bronze-700/60 bg-light_bronze-800/70 p-3"
      >
        {hobbySections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="inline-flex items-center rounded-full border border-light_bronze-700/60 bg-light_bronze-900 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-light_bronze-300 transition hover:border-tea_green-300/50 hover:text-tea_green-300"
          >
            {section.title}
          </a>
        ))}
      </nav>
      <div className="space-y-6">
        {hobbySections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-8 border-t border-light_bronze-700/60 pt-6 first:border-t-0 first:pt-0"
          >
            <h2 className={`text-3xl font-semibold ${colors.cardHeader}`}>
              {section.title}
            </h2>
            <div
              className={`mt-4 max-w-3xl text-lg leading-relaxed ${colors.cardBody}`}
            >
              <p>
                {section.body}
                {'linkLabel' in section ? (
                  <>
                    <a
                      href={section.linkHref}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline decoration-light_bronze-300/60 underline-offset-4 transition hover:text-tea_green-200"
                    >
                      {section.linkLabel}
                    </a>
                    {section.bodyAfterLink}
                  </>
                ) : null}
              </p>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
