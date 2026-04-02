import { createFileRoute } from '@tanstack/react-router'
import { PageCard, PageHeader, PageLayout } from '../components/page'

export const Route = createFileRoute('/human')({
  component: HumanPage,
})

function HumanPage() {
  const palette = 'lightBronze' as const

  return (
    <PageLayout palette={palette}>
      <PageHeader
        palette={palette}
        title="Get to know me"
        description="This page will be the more personal version: values, personality, interests, and the context around who Sabine is outside the CV."
      />
      <section className="grid gap-4 sm:grid-cols-2">
        <PageCard palette={palette} title="Coming Soon">
          Personal story, energy, interests, and the parts that do not fit
          neatly into a resume.
        </PageCard>
        <PageCard palette={palette} title="We Can Add">
          Photos, fun facts, motivations, values, and whatever makes this feel
          unmistakably like you.
        </PageCard>
      </section>
    </PageLayout>
  )
}
