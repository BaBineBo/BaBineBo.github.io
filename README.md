# BaBineBo.github.io

Personal site built with Vite + React and TanStack Router.

## Tech Stack

- Vite 7 + React 19
- TanStack Router (file-based routing)
- Tailwind CSS 4
- TypeScript
- Vitest
- ESLint + Prettier

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server (port 3000):

```bash
pnpm dev
```

## Scripts

```bash
pnpm build    # Vite build + typecheck
pnpm preview  # Preview production build
pnpm test     # Run Vitest once
pnpm lint     # ESLint
pnpm format   # Prettier
pnpm format:check # Prettier check (no writes)
pnpm check    # Prettier write + ESLint fix
```

## Routing

Routes are file-based under `src/routes`. Add a new file to create a route.
Root layout lives in `src/routes/__root.tsx` and should render `<Outlet />`.

Learn more:

- https://tanstack.com/router
- https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing

## Styling

Tailwind CSS is configured via `tailwindcss` and the Vite plugin `@tailwindcss/vite`.
Custom colors live in the `@theme` block in `src/styles.css`.

## Node Version

This repo uses Node 22. If you use nvm, run:

```bash
nvm use
```

## GitHub Pages

This repository is a GitHub Pages user site. Deployment uses a GitHub Actions workflow that builds with pnpm and publishes `dist` on pushes to `main`.
