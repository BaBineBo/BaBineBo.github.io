import { SectionTitle, SlideShell, Spacer } from './SlideShell'
import type { SlideNextProps } from './SlideShell'

export function ContactSlide({ onNext, hasNext }: SlideNextProps) {
  return (
    <SlideShell
      title="Contact"
      className="bg-beige-800 text-tea_green-200"
      titleClassName="text-tea_green-100"
      onNext={onNext}
      hasNext={hasNext}
    >
      <p className="max-w-xl text-base opacity-90">
        Leave a few easy ways to reach you. Keep it short and friendly.
      </p>
      <Spacer />
      <SectionTitle>Find me</SectionTitle>
      <div className="flex flex-col gap-3 text-base">
        {['GitHub', 'LinkedIn', 'Email'].map((label) => (
          <a
            key={label}
            className="inline-flex w-fit items-center gap-2 border-b border-transparent text-light_bronze-200 transition hover:border-light_bronze-300 hover:text-light_bronze-100"
            href="#"
          >
            {label}
          </a>
        ))}
      </div>
      <Spacer />
      <div className="text-sm text-light_bronze-200">
        Based in Copenhagen · Available for collaborations
      </div>
    </SlideShell>
  )
}
