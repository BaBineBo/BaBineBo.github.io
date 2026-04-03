import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Mail } from 'react-swm-icon-pack'
import { GitHubIcon } from '@/lib/icons/GitHubIcon'
import { LinkedInIcon } from '@/lib/icons/LinkedInIcon'
import { SubstackIcon } from '@/lib/icons/SubstackIcon'

const PRODUCT_ROUTE_LABEL = 'sabine as a product'
const HUMAN_ROUTE_LABEL = 'sabine as a human'
const CONTACT_BUTTON_CLASS_NAME =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-tea_green-300/40 bg-tea_green-900/40 text-tea_green-200 transition hover:border-light_bronze-300/50 hover:text-light_bronze-200'

const CONTACT_HINTS = {
  email: 'Ping the service (send me an email)',
  linkedin: 'Watch me try to interact with professionals on LinkedIn',
  substack: 'Watch me interact with everyone else on Substack',
  github: 'Takes you to the website repo',
} as const

const CONTACT_LINKS = {
  email: 'mailto:ping@saaas.se',
  linkedin: 'https://www.linkedin.com/in/sabine-r-4a9217116/',
  substack: 'https://substack.com/@babinebo',
  github: 'https://github.com/BaBineBo/BaBineBo.github.io',
} as const

export function HomePage() {
  const [activeContact, setActiveContact] = useState<string | null>(null)

  return (
    <main className="min-h-[100dvh] bg-tea_green-800 px-6 py-12 text-tea_green-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-6xl items-center justify-center text-center">
        <section className="flex w-full flex-col items-center justify-center gap-4 sm:gap-6">
          <h1 className="select-none text-[clamp(3rem,10vw,8rem)] font-semibold leading-none text-tea_green-100">
            Sabine
          </h1>
          <h5 className="select-none text-[clamp(0.75rem,2.2vw,1.5rem)] uppercase tracking-[0.35em] text-tea_green-200">
            (as a service)
          </h5>
          <h1 className="select-none pt-2 text-[clamp(3.5rem,12vw,10rem)] font-semibold leading-none text-light_bronze-200">
            Randow
          </h1>
          <nav className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-x-6">
            <Link
              to="/product"
              className="select-none text-center text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200 sm:justify-self-end"
            >
              {PRODUCT_ROUTE_LABEL}
            </Link>
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-tea_green-300/50 sm:block"
            />
            <Link
              to="/human"
              className="select-none text-center text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200 sm:justify-self-start"
            >
              {HUMAN_ROUTE_LABEL}
            </Link>
          </nav>
          <div
            aria-hidden="true"
            className="mt-2 h-px w-[200px] max-w-[70vw] bg-tea_green-300/50 sm:mt-4"
          />
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={CONTACT_LINKS.email}
              aria-label="Email Sabine"
              className={CONTACT_BUTTON_CLASS_NAME}
              onMouseEnter={() => setActiveContact(CONTACT_HINTS.email)}
              onMouseLeave={() => setActiveContact(null)}
              onFocus={() => setActiveContact(CONTACT_HINTS.email)}
              onBlur={() => setActiveContact(null)}
            >
              <Mail className="h-6 w-6" color="currentColor" />
            </a>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Sabine on LinkedIn"
              className={CONTACT_BUTTON_CLASS_NAME}
              onMouseEnter={() => setActiveContact(CONTACT_HINTS.linkedin)}
              onMouseLeave={() => setActiveContact(null)}
              onFocus={() => setActiveContact(CONTACT_HINTS.linkedin)}
              onBlur={() => setActiveContact(null)}
            >
              <LinkedInIcon />
            </a>
            <a
              href={CONTACT_LINKS.substack}
              target="_blank"
              rel="noreferrer"
              aria-label="Sabine on Substack"
              className={CONTACT_BUTTON_CLASS_NAME}
              onMouseEnter={() => setActiveContact(CONTACT_HINTS.substack)}
              onMouseLeave={() => setActiveContact(null)}
              onFocus={() => setActiveContact(CONTACT_HINTS.substack)}
              onBlur={() => setActiveContact(null)}
            >
              <SubstackIcon />
            </a>
            <a
              href={CONTACT_LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Sabine on GitHub"
              className={CONTACT_BUTTON_CLASS_NAME}
              onMouseEnter={() => setActiveContact(CONTACT_HINTS.github)}
              onMouseLeave={() => setActiveContact(null)}
              onFocus={() => setActiveContact(CONTACT_HINTS.github)}
              onBlur={() => setActiveContact(null)}
            >
              <GitHubIcon />
            </a>
          </div>
          <p className="min-h-6 text-center text-sm italic text-tea_green-200/90">
            {activeContact ?? ''}
          </p>
        </section>
      </div>
    </main>
  )
}
