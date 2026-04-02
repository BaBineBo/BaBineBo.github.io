import { Link } from '@tanstack/react-router'

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
          <nav className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-8">
            <Link
              to="/product"
              className="text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200"
            >
              sabine as a product
            </Link>
            <Link
              to="/human"
              className="text-sm font-bold uppercase tracking-[0.4em] text-tea_green-200 transition hover:text-light_bronze-200"
            >
              sabine as a human
            </Link>
          </nav>
        </section>
      </div>
    </main>
  )
}
