import { Link, createFileRoute } from '@tanstack/react-router'
import { PageCard, PageHeader } from '../components/page'

export const Route = createFileRoute('/human/')({
  component: HumanIndexPage,
})

function HumanIndexPage() {
  const palette = 'lightBronze' as const

  return (
    <>
      <PageHeader
        palette={palette}
        title="Get to know me"
        description="This page is the more personal version: values, personality, interests, and the context around who Sabine is outside the CV."
      />
      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/human/music"
          className="block h-full transition hover:-translate-y-0.5"
        >
          <PageCard palette={palette} title="Music">
            A living playlist and one of the easier ways to get a feel for my
            taste outside work.
          </PageCard>
        </Link>
        <Link
          to="/human/hobbies"
          className="block h-full transition hover:-translate-y-0.5"
        >
          <PageCard palette={palette} title="Hobbies">
            Longer sections for the things I keep returning to outside work,
            starting with sewing, interior design, and swing dancing.
          </PageCard>
        </Link>
        <PageCard palette={palette} title="Coming Soon">
          Personal story, energy, interests, and the parts that do not fit
          neatly into a resume.
        </PageCard>
        <PageCard palette={palette} title="We Can Add">
          Photos, fun facts, motivations, values, and whatever makes this feel
          unmistakably like you.
        </PageCard>
      </section>
    </>
  )
}
