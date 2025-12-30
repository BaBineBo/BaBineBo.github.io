import {
  Pill,
  SectionTitle,
  
  SlideShell,
  Spacer
} from './SlideShell'
import type {SlideNextProps} from './SlideShell';

export function AboutSlide({ onNext, hasNext }: SlideNextProps) {
  return (
    <SlideShell
      title="About"
      className="bg-cornsilk-800 text-tea_green-200"
      titleClassName="text-tea_green-100"
      onNext={onNext}
      hasNext={hasNext}
    >
      <p className="max-w-xl text-base opacity-90">
        Share a short bio and a few notes on how you work. Make it feel human
        and grounded.
      </p>
      <Spacer />
      <SectionTitle>Skills</SectionTitle>
      <div className="flex flex-wrap gap-2 text-sm text-tea_green-200">
        {['React', 'TypeScript', 'UX', 'Design Systems'].map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <Spacer />
      <SectionTitle>Focus</SectionTitle>
      <p className="max-w-xl text-base opacity-90">
        Product storytelling, accessible UI, and calm interactions with a warm,
        earthy palette.
      </p>
    </SlideShell>
  )
}
