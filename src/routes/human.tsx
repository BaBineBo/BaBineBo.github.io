import { Outlet, createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '../components/page'

export const Route = createFileRoute('/human')({
  component: HumanLayout,
})

function HumanLayout() {
  const palette = 'lightBronze' as const

  return (
    <PageLayout palette={palette}>
      <Outlet />
    </PageLayout>
  )
}
