import { AboutSlide } from './AboutSlide'
import { ContactSlide } from './ContactSlide'
import { HomeSlide } from './HomeSlide'
import { WorkSlide } from './WorkSlide'
import type { ReactNode } from 'react'

export type SlideRenderContext = {
  onNext?: () => void
  hasNext?: boolean
}

export type SlideDef = {
  id: string
  label: string
  render: (ctx: SlideRenderContext) => ReactNode
}

export const rootSlides: Array<SlideDef> = [
  {
    id: 'home',
    label: 'Home',
    render: ({ onNext, hasNext }) => (
      <HomeSlide onNext={onNext} hasNext={hasNext} />
    ),
  },
  {
    id: 'work',
    label: 'Work',
    render: ({ onNext, hasNext }) => (
      <WorkSlide onNext={onNext} hasNext={hasNext} />
    ),
  },
  {
    id: 'about',
    label: 'About',
    render: ({ onNext, hasNext }) => (
      <AboutSlide onNext={onNext} hasNext={hasNext} />
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    render: ({ onNext, hasNext }) => (
      <ContactSlide onNext={onNext} hasNext={hasNext} />
    ),
  },
]
