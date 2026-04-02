import { createFileRoute } from '@tanstack/react-router'
import { HomeSlide } from '../features/root/slides/HomeSlide'

export const Route = createFileRoute('/')({
  component: RootPage,
})

function RootPage() {
  return <HomeSlide />
}
