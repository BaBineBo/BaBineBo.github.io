import { SectionTitle,  SlideShell, Spacer } from './SlideShell'
import type {SlideNextProps} from './SlideShell';

export function WorkSlide({ onNext, hasNext }: SlideNextProps) {
  return (
    <SlideShell
      title="Work"
      className="bg-papaya_whip-800 text-light_bronze-200"
      titleClassName="text-light_bronze-100"
      onNext={onNext}
      hasNext={hasNext}
    >
      <p className="max-w-xl text-base opacity-90">
        Share the projects you are most proud of. Keep it short and tangible:
        what you did, what changed, and what you learned.
      </p>
      <Spacer />
      <SectionTitle>Project list</SectionTitle>
      <ul className="list-disc pl-6 text-base opacity-90">
        <li className="mb-2">
          Project A — subtle brand system + single-page build.
        </li>
        <li className="mb-2">
          Project B — responsive slide deck with custom gestures.
        </li>
        <li>Project C — microsite refresh and accessibility updates.</li>
      </ul>
      <Spacer />
      <div className="grid gap-3 sm:grid-cols-2">
        {['Case study', 'Process notes'].map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-light_bronze-300/50 bg-beige-700 px-4 py-3 text-sm text-light_bronze-200"
          >
            {label}
          </div>
        ))}
      </div>
    </SlideShell>
  )
}
