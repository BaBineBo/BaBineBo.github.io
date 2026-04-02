import { Outlet, createFileRoute } from '@tanstack/react-router'
import { PageLayout } from '../components/page'

export const Route = createFileRoute('/product')({
  component: ProductLayout,
})

function ProductLayout() {
  const palette = 'teaGreen' as const

  return (
    <PageLayout palette={palette}>
      <Outlet />
    </PageLayout>
  )
}
