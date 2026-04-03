type HomeSideLoopItem = {
  kind: 'name' | 'dot' | 'saaas'
}

const HOME_SIDE_LOOP_ITEMS: Array<HomeSideLoopItem> = [
  { kind: 'dot' },
  { kind: 'name' },
  { kind: 'dot' },
  { kind: 'saaas' },
  { kind: 'dot' },
  { kind: 'name' },
  { kind: 'dot' },
  { kind: 'name' },
]
const HOME_SIDE_LOOP_REPEAT_COUNT = 4

/**
 * The side rails follow the duplicated-segment pattern from an infinite looper:
 * one complete segment is rendered twice, and the wrapper only moves by exactly
 * one segment. Letting the browser lay out the segment naturally is more stable
 * than trying to hand-compute positions for rotated text.
 */
function HomeSideLoopSegment({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`home-side-loop__segment home-side-loop__segment--${side}`}>
      {HOME_SIDE_LOOP_ITEMS.map((item, index) => {
        if (item.kind === 'dot') {
          return (
            <div key={`${item.kind}-${index}`} className="home-side-loop__item">
              <span className="home-side-loop__label home-side-loop__dot">
                •
              </span>
            </div>
          )
        }

        if (item.kind === 'saaas') {
          return (
            <div key={`${item.kind}-${index}`} className="home-side-loop__item">
              <span className="home-side-loop__label home-side-loop__saaas">
                SaaaS
              </span>
            </div>
          )
        }

        return (
          <div key={`${item.kind}-${index}`} className="home-side-loop__item">
            <span className="home-side-loop__label">
              <span className="home-side-loop__sabine">Sabine</span>{' '}
              <span className="home-side-loop__randow">Randow</span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function HomeSideLoop({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      className={`home-side-loop home-side-loop--${side} hidden md:flex`}
    >
      <div className="home-side-loop__content">
        {Array.from({ length: HOME_SIDE_LOOP_REPEAT_COUNT }, (_, index) => (
          <HomeSideLoopSegment key={`${side}-${index}`} side={side} />
        ))}
      </div>
    </div>
  )
}
