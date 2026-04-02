import { Link, createFileRoute } from '@tanstack/react-router'
import { PageCard, PageHeader } from '../components/page'

export const Route = createFileRoute('/product/')({
  component: ProductIndexPage,
})

function ProductIndexPage() {
  const palette = 'teaGreen' as const

  return (
    <>
      <PageHeader
        palette={palette}
        title="Professional worklife experience"
        description="This page will hold the professional version: work history, projects, strengths, and the way Sabine operates in teams."
      />
      <section className="grid gap-4 sm:grid-cols-2">
        <PageCard palette={palette} title="Coming Soon">
          Role history, selected work, technical range, and what Sabine is
          especially good at.
        </PageCard>
        <Link to="/product/cv" className="block transition hover:-translate-y-0.5">
          <PageCard palette={palette} title="CV">
            Open the structured CV page with experience, skills, education, and
            the same visual language as the site.
          </PageCard>
        </Link>
        <PageCard palette={palette} title="We Can Add">
          CV material, case studies, skills, references, and a sharper value
          proposition once you are ready.
        </PageCard>
      </section>
    </>
  )
}
