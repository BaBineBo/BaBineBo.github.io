import { Link, useLocation } from '@tanstack/react-router'
import { ChevronRight, Home1 } from 'react-swm-icon-pack'
import type { ReactNode } from 'react'

export type PagePaletteName = 'teaGreen' | 'lightBronze'

type PagePalette = {
  pageBackground: string
  pageText: string
  backLink: string
  backLinkHover: string
  eyebrow: string
  header: string
  subheader: string
  cardBackground: string
  cardBorder: string
  cardHeader: string
  cardBody: string
}

const pagePalettes: Record<PagePaletteName, PagePalette> = {
  teaGreen: {
    pageBackground: 'bg-tea_green-900',
    pageText: 'text-tea_green-100',
    backLink: 'text-tea_green-300',
    backLinkHover: 'hover:text-light_bronze-300',
    eyebrow: 'text-tea_green-300',
    header: 'text-light_bronze-300',
    subheader: 'text-tea_green-200',
    cardBackground: 'bg-tea_green-800/70',
    cardBorder: 'border-tea_green-700/60',
    cardHeader: 'text-tea_green-100',
    cardBody: 'text-tea_green-200',
  },
  lightBronze: {
    pageBackground: 'bg-light_bronze-900',
    pageText: 'text-light_bronze-100',
    backLink: 'text-light_bronze-300',
    backLinkHover: 'hover:text-tea_green-300',
    eyebrow: 'text-light_bronze-300',
    header: 'text-tea_green-200',
    subheader: 'text-light_bronze-200',
    cardBackground: 'bg-light_bronze-800/70',
    cardBorder: 'border-light_bronze-700/60',
    cardHeader: 'text-light_bronze-100',
    cardBody: 'text-light_bronze-200',
  },
}

function cx(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function getPagePalette(name: PagePaletteName) {
  return pagePalettes[name]
}

type PageLayoutProps = {
  children: ReactNode
  palette: PagePaletteName
  className?: string
}

export function PageLayout({ children, palette, className }: PageLayoutProps) {
  const colors = getPagePalette(palette)
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const labelMap: Record<string, string> = {
    product: 'Product',
    human: 'Human',
    cv: 'CV',
    music: 'Music',
    hobbies: 'Hobbies',
  }
  const breadcrumbs = pathParts.map((part, index) => ({
    label: labelMap[part] ?? part,
    to: `/${pathParts.slice(0, index + 1).join('/')}`,
  }))

  return (
    <main
      className={cx(
        'min-h-[100dvh] px-4 py-3 sm:px-8 sm:py-8 lg:px-10 lg:py-12',
        colors.pageBackground,
        colors.pageText,
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-[52rem] flex-col gap-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm font-bold uppercase tracking-[0.3em]">
          <Link
            to="/"
            aria-label="Home"
            className={cx(
              'inline-flex items-center justify-center rounded-full border px-3 py-2 transition',
              colors.cardBorder,
              colors.cardBackground,
              colors.backLink,
              colors.backLinkHover,
            )}
          >
            <Home1 className="h-4 w-4" color="currentColor" />
          </Link>
          {breadcrumbs.map((crumb) => (
            <span key={crumb.to} className="flex items-center gap-2">
              <ChevronRight
                className={cx('h-4 w-4', colors.backLink)}
                color="currentColor"
              />
              <Link
                to={crumb.to}
                className={cx(
                  'inline-flex items-center rounded-full border px-3 py-2 transition',
                  colors.cardBorder,
                  colors.cardBackground,
                  colors.backLink,
                  colors.backLinkHover,
                )}
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
        {children}
      </div>
    </main>
  )
}

type PageHeaderProps = {
  palette: PagePaletteName

  title: string
  description: string
}

export function PageHeader({
  palette,

  title,
  description,
}: PageHeaderProps) {
  const colors = getPagePalette(palette)

  return (
    <section className="space-y-4">
      <h1
        className={cx(
          'text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-none',
          colors.header,
        )}
      >
        {title}
      </h1>
      <p className={cx('max-w-2xl text-lg leading-relaxed', colors.subheader)}>
        {description}
      </p>
    </section>
  )
}

type PageCardProps = {
  palette: PagePaletteName
  title: string
  children: ReactNode
}

export function PageCard({ palette, title, children }: PageCardProps) {
  const colors = getPagePalette(palette)

  return (
    <article
      className={cx(
        'flex h-full flex-col rounded-3xl border p-6',
        colors.cardBorder,
        colors.cardBackground,
      )}
    >
      <h2 className={cx('text-xl font-semibold', colors.cardHeader)}>
        {title}
      </h2>
      <div
        className={cx('mt-3 flex-1 text-base leading-relaxed', colors.cardBody)}
      >
        {children}
      </div>
    </article>
  )
}
