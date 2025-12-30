import { SlideShell } from './SlideShell'
import type { SlideNextProps } from './SlideShell'

export function HomeSlide({ onNext, hasNext }: SlideNextProps) {
  return (
    <SlideShell
      title="Home"
      className="bg-tea_green-800 text-tea_green-100"
      titleClassName="sr-only"
      stackClassName="items-center justify-center text-center sm:gap-6"
      onNext={onNext}
      hasNext={hasNext}
    >
      <h1 className="text-[clamp(3rem,10vw,8rem)] font-semibold leading-none text-tea_green-100">
        Sabine
      </h1>
      <h5 className="text-[clamp(0.75rem,2.2vw,1.5rem)] uppercase tracking-[0.35em] text-tea_green-200">
        (as a service)
      </h5>
      <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-semibold leading-none text-light_bronze-200">
        Randow
      </h1>
    </SlideShell>
  )
}
