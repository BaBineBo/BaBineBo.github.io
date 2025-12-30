import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type ScrollCarouselProps = {
  slides: Array<ReactNode>
  /** 0-index */
  initialIndex?: number
  /** If provided, the carousel becomes controlled (source of truth for the current slide). */
  activeIndex?: number
  /** Called when active slide changes */
  onIndexChange?: (index: number) => void
  /** How far (in px) the user must “virtually scroll” before we switch slides */
  thresholdPx?: number
  /** Slide transition duration in ms */
  transitionMs?: number
  /** Clamp the drag offset to this many px for a rubber-band feel */
  maxDragPx?: number
}

/**
 * Virtual-scroll (vertical input) horizontal pager:
 * - Body/page stays non-scrollable (container overflow hidden)
 * - Trackpad wheel deltas accumulate into an offset
 * - When offset crosses threshold → switch slide
 * - Otherwise, when gesture ends → snap back
 */
export function ScrollCarousel({
  slides,
  initialIndex = 0,
  activeIndex,
  onIndexChange,
  thresholdPx = 140,
  transitionMs = 420,
  maxDragPx = 220,
}: ScrollCarouselProps) {
  const count = slides.length

  const [internalIndex, setInternalIndex] = useState(() =>
    clamp(initialIndex, 0, Math.max(0, count - 1)),
  )

  const currentIndex =
    activeIndex == null
      ? internalIndex
      : clamp(activeIndex, 0, Math.max(0, count - 1))

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < count - 1

  // If parent controls the index, animate when it changes.
  useEffect(() => {
    if (activeIndex == null) return
    const next = clamp(activeIndex, 0, Math.max(0, count - 1))
    if (next === internalIndex) return

    setIsAnimating(true)
    offsetRef.current = 0
    setInternalIndex(next)

    window.setTimeout(() => {
      setIsAnimating(false)
    }, transitionMs + 30)
  }, [activeIndex, count, internalIndex, transitionMs])

  const [isAnimating, setIsAnimating] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Gesture state in refs so we can handle high-frequency wheel events without rerender spam.
  const offsetRef = useRef(0)
  const wheelEndTimerRef = useRef<number | null>(null)

  // Touch state
  const touchStartYRef = useRef<number | null>(null)
  const touchLastYRef = useRef<number | null>(null)

  const clearWheelEndTimer = useCallback(() => {
    if (wheelEndTimerRef.current != null) {
      window.clearTimeout(wheelEndTimerRef.current)
      wheelEndTimerRef.current = null
    }
  }, [])

  const snapBack = useCallback(() => {
    offsetRef.current = 0
  }, [])

  const commitTo = useCallback(
    (nextIndex: number) => {
      const clamped = clamp(nextIndex, 0, Math.max(0, count - 1))
      if (clamped === currentIndex) {
        snapBack()
        return
      }

      setIsAnimating(true)
      offsetRef.current = 0
      setInternalIndex(clamped)
      onIndexChange?.(clamped)

      // Unlock after transition.
      window.setTimeout(() => {
        setIsAnimating(false)
      }, transitionMs + 30)
    },
    [count, currentIndex, onIndexChange, snapBack, transitionMs],
  )

  const commitIfThresholdCrossed = useCallback(() => {
    const o = offsetRef.current

    // scrolling DOWN (deltaY positive) makes content move UP, so offset becomes negative
    if (o <= -thresholdPx && canGoNext) {
      commitTo(currentIndex + 1)
      return true
    }
    // scrolling UP (deltaY negative) makes content move DOWN, so offset becomes positive
    if (o >= thresholdPx && canGoPrev) {
      commitTo(currentIndex - 1)
      return true
    }

    // If user tries to go beyond ends, just snap back.
    if (o <= -thresholdPx && !canGoNext) {
      snapBack()
      return true
    }
    if (o >= thresholdPx && !canGoPrev) {
      snapBack()
      return true
    }

    return false
  }, [canGoNext, canGoPrev, commitTo, currentIndex, snapBack, thresholdPx])

  const onGestureEnd = useCallback(() => {
    // If not committed, snap back with animation.
    if (!isAnimating) {
      snapBack()
    }
  }, [isAnimating, snapBack])

  const startGestureEndTimer = useCallback(() => {
    clearWheelEndTimer()
    // A short silence means the wheel/trackpad gesture ended.
    wheelEndTimerRef.current = window.setTimeout(() => {
      onGestureEnd()
    }, 120)
  }, [clearWheelEndTimer, onGestureEnd])

  // Wheel handling: install a real (non-passive) listener so preventDefault works reliably.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (count <= 1) return

      // Prevent the browser/page from scrolling.
      e.preventDefault()

      // While animating, swallow momentum.
      if (isAnimating) {
        return
      }

      // Ignore primarily-horizontal gestures (trackpad horizontal swipes often mean history/back).
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return
      }

      // Option A: no preview drag at the ends.
      // Scroll down (deltaY>0) attempts to go NEXT; scroll up (deltaY<0) attempts to go PREV.
      if (e.deltaY > 0 && !canGoNext) {
        // at last slide and trying to go next → swallow
        return
      }
      if (e.deltaY < 0 && !canGoPrev) {
        // at first slide and trying to go prev → swallow
        return
      }

      // Accumulate wheel into a bounded offset. Negative deltaY (scroll up) → positive offset.
      // Positive deltaY (scroll down) → negative offset.
      const next = clamp(offsetRef.current - e.deltaY, -maxDragPx, maxDragPx)
      offsetRef.current = next

      // If we cross threshold, commit immediately.
      const committed = commitIfThresholdCrossed()
      if (!committed) {
        // otherwise, when gesture ends, snap back.
        startGestureEndTimer()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel as EventListener)
    }
  }, [
    canGoNext,
    canGoPrev,
    commitIfThresholdCrossed,
    count,
    isAnimating,
    maxDragPx,
    startGestureEndTimer,
  ])

  // Touch swipe (mobile): drag up/down to page.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      if (count <= 1) return
      if (isAnimating) return
      const t = e.touches[0]
      touchStartYRef.current = t.clientY
      touchLastYRef.current = t.clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (count <= 1) return
      if (isAnimating) return
      const startY = touchStartYRef.current
      if (startY == null) return

      const t = e.touches[0]
      const y = t.clientY
      const lastY = touchLastYRef.current ?? y
      touchLastYRef.current = y

      const dy = y - lastY

      // prevent browser scrolling
      e.preventDefault()

      // Option A: no preview drag at the ends.
      // dy > 0 means the finger moved down → attempts PREV (positive offset).
      // dy < 0 means the finger moved up → attempts NEXT (negative offset).
      if (dy > 0 && !canGoPrev) {
        return
      }
      if (dy < 0 && !canGoNext) {
        return
      }

      const next = clamp(offsetRef.current + dy, -maxDragPx, maxDragPx)
      offsetRef.current = next

      commitIfThresholdCrossed()
    }

    const onTouchEnd = () => {
      touchStartYRef.current = null
      touchLastYRef.current = null
      onGestureEnd()
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchEnd)

    return () => {
      el.removeEventListener('touchstart', onTouchStart as EventListener)
      el.removeEventListener('touchmove', onTouchMove as EventListener)
      el.removeEventListener('touchend', onTouchEnd as EventListener)
      el.removeEventListener('touchcancel', onTouchEnd as EventListener)
    }
  }, [commitIfThresholdCrossed, count, isAnimating, maxDragPx, onGestureEnd])

  // Keyboard (nice backup)
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (isAnimating) return
      if (ev.key === 'ArrowDown' || ev.key === 'PageDown') {
        if (canGoNext) commitTo(currentIndex + 1)
      }
      if (ev.key === 'ArrowUp' || ev.key === 'PageUp') {
        if (canGoPrev) commitTo(currentIndex - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canGoNext, canGoPrev, commitTo, currentIndex, isAnimating])

  // Compute transform.
  const trackStyle = useMemo(() => {
    // translate percentages are relative to the TRACK width (which is count*100%).
    // One slide equals (100 / count)% of the track.
    const base = -(currentIndex * (100 / Math.max(1, count)))

    // We apply the virtual offset along X so slides come in from the sides.
    const translate = `translateX(${base}%)`

    return {
      height: '100%',
      width: `${count * 100}%`,
      transform: translate,
      transition: isAnimating
        ? `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : 'none',
      willChange: 'transform',
      display: 'flex',
      flexDirection: 'row' as const,
    }
  }, [count, currentIndex, isAnimating, transitionMs])

  return (
    <div
      ref={containerRef}
      style={{
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        // Helps ensure touch drag stays vertical.
        touchAction: 'pan-y',
      }}
    >
      <div style={trackStyle} aria-live="polite">
        {slides.map((node, i) => (
          <section
            key={i}
            style={{
              height: '100%',
              width: `${100 / count}%`,
              flex: '0 0 auto',
              overflow: 'hidden',
            }}
          >
            {node}
          </section>
        ))}
      </div>
    </div>
  )
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
