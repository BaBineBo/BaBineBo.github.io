import { Link } from '@tanstack/react-router'
import { Mail } from 'react-swm-icon-pack'
import { LinkedInIcon } from '@/lib/icons/LinkedInIcon'
import { SubstackIcon } from '@/lib/icons/SubstackIcon'

export function HomeSlide() {
  return (
    <main className="min-h-[100dvh] bg-tea_green-800 px-6 py-12 text-tea_green-100 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-6xl items-center justify-center text-center">
        <section className="flex w-full flex-col items-center justify-center gap-4 sm:gap-6">
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-semibold leading-none text-tea_green-100">
            Sabine
          </h1>
          <h5 className="text-[clamp(0.75rem,2.2vw,1.5rem)] uppercase tracking-[0.35em] text-tea_green-200">
            (as a service)
          </h5>
          <h1 className="text-[clamp(3.5rem,12vw,10rem)] font-semibold leading-none text-light_bronze-200">
            Randow
          </h1>
          <nav className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-x-6">
            <Link
              to="/product"
              className="text-center text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200 sm:justify-self-end"
            >
              sabine as a product
            </Link>
            <span
              aria-hidden="true"
              className="hidden h-5 w-px bg-tea_green-300/50 sm:block"
            />
            <Link
              to="/human"
              className="text-center text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200 sm:justify-self-start"
            >
              sabine as a human
            </Link>
          </nav>
          <div
            aria-hidden="true"
            className="mt-2 h-px w-[200px] max-w-[70vw] bg-tea_green-300/50 sm:mt-4"
          />
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:ping@saaas.se"
              aria-label="Email Sabine"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-tea_green-300/40 bg-tea_green-900/40 text-tea_green-200 transition hover:border-light_bronze-300/50 hover:text-light_bronze-200"
            >
              <Mail className="h-6 w-6" color="currentColor" />
            </a>
            <a
              href="https://www.linkedin.com/in/sabine-r-4a9217116/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sabine on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-tea_green-300/40 bg-tea_green-900/40 text-tea_green-200 transition hover:border-light_bronze-300/50 hover:text-light_bronze-200"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://substack.com/@babinebo"
              target="_blank"
              rel="noreferrer"
              aria-label="Sabine on Substack"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-tea_green-300/40 bg-tea_green-900/40 text-tea_green-200 transition hover:border-light_bronze-300/50 hover:text-light_bronze-200"
            >
              <SubstackIcon />
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
