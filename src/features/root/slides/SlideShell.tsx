import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { SlideNextButton } from './SlideNextButton'

type SlideShellProps = {
  title: string
  children: ReactNode
  className?: string
  titleClassName?: string
  contentClassName?: string
  stackClassName?: string
  onNext?: () => void
  hasNext?: boolean
  hideNextAfterMs?: number
}

export type SlideNextProps = Pick<
  SlideShellProps,
  'onNext' | 'hasNext'
>

export function SlideShell({
  title,
  children,
  className,
  titleClassName,
  contentClassName,
  stackClassName,
  onNext,
  hasNext = true,
  hideNextAfterMs = 1400,
}: SlideShellProps) {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const updateAtEnd = () => {
      const atEnd = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight
      setIsAtEnd(atEnd)
    }

    updateAtEnd()
    el.addEventListener('scroll', updateAtEnd, { passive: true })
    window.addEventListener('resize', updateAtEnd)

    return () => {
      el.removeEventListener('scroll', updateAtEnd)
      window.removeEventListener('resize', updateAtEnd)
    }
  }, [children])

  const showNext = Boolean(onNext) && hasNext && isAtEnd

  useEffect(() => {
    if (!showNext) {
      setHintVisible(false)
      return
    }

    setHintVisible(true)
    const timer = window.setTimeout(() => {
      setHintVisible(false)
    }, hideNextAfterMs)

    return () => window.clearTimeout(timer)
  }, [hideNextAfterMs, showNext])

  return (
    <div className={`relative h-full px-5 py-8 sm:px-10 ${className ?? ''}`}>
      <div className="flex h-full flex-col">
        <h1
          className={`text-2xl font-semibold tracking-tight ${titleClassName ?? ''}`}
        >
          {title}
        </h1>
        <div
          ref={contentRef}
          className={`mt-4 flex-1 overflow-y-auto pr-2 ${contentClassName ?? ''}`}
        >
          <div
            className={`flex min-h-full flex-col gap-4 ${stackClassName ?? ''}`}
          >
            {children}
          </div>
        </div>
      </div>
      <SlideNextButton
        isVisible={showNext}
        isHintVisible={hintVisible}
        onClick={onNext}
      />
    </div>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-medium tracking-wide">{children}</h2>
}

export function Spacer() {
  return <div className="h-16 sm:h-24" />
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-tea_green-200/40 bg-tea_green-900/60 px-3 py-1 text-sm">
      {children}
    </span>
  )
}
