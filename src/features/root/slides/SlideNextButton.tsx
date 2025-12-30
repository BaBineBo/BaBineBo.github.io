import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SlideNextButtonProps = {
  onClick?: () => void
  isVisible: boolean
  isHintVisible: boolean
}

export function SlideNextButton({
  onClick,
  isVisible,
  isHintVisible,
}: SlideNextButtonProps) {
  const opacityClass = isVisible
    ? isHintVisible
      ? 'opacity-100'
      : 'opacity-35'
    : 'pointer-events-none opacity-0'

  return (
    <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center">
      <button
        type="button"
        className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-tea_green-200/50 bg-tea_green-900/40 text-tea_green-200 shadow-sm transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 ${opacityClass}`}
        onClick={onClick}
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faArrowDown} size="lg" />
      </button>
    </div>
  )
}
