# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (`packageManager: pnpm@10.34.5` in package.json) — use `pnpm`, not `npm`/`yarn`.

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`)

There is no test runner configured in this project yet.

## Architecture

This is a Next.js App Router project, currently just the unmodified `create-next-app` scaffold (single "Initial commit" so far, no portfolio content added).

- `app/layout.tsx` — root layout; loads the Geist/Geist Mono fonts via `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`). Note it types its props as `LayoutProps<"/">`, a Next.js-generated helper type, not a hand-written interface.
- `app/page.tsx` — home page (still the default template content).
- `app/globals.css` — Tailwind v4 is imported via `@import "tailwindcss"` (no `tailwind.config.js`); theme tokens (`--color-background`, `--color-foreground`, fonts) are declared inline with `@theme inline`, and dark mode is handled with a `prefers-color-scheme` media query rather than a class strategy.
- Path alias `@/*` → project root (see `tsconfig.json`), TypeScript `strict` mode is on.

Since this Next.js version (16.3.2) diverges from Claude's training data (see `AGENTS.md`), consult `node_modules/next/dist/docs/` for the relevant guide before relying on remembered Next.js APIs/conventions, especially around App Router types like `LayoutProps`.
