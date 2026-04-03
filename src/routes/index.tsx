import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../features/root/HomePage'

export const Route = createFileRoute('/')({
  component: RootPage,
})

function RootPage() {
  return <HomePage />
}
