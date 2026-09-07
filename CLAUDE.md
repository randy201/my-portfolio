# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@.claude/RULES.md

## Objectif du projet

Ce site est le portfolio personnel de l'utilisateur : une sorte de CV numérique présentant ses projets et ses compétences. Deux priorités transverses guident toutes les décisions techniques :

- **SEO** — élément crucial du projet (métadonnées, balises sémantiques, performance, accessibilité, sitemap, `robots.txt`, données structurées).
- **UI/UX** — expérience soignée : accessibilité, responsive, cohérence visuelle, temps de chargement.

Le design cible (structure éditoriale/magazine, palette claire/sombre, tokens de couleur) est documenté dans `.claude/PORTFOLIO_DESIGN.md` — s'y référer avant de modifier le hero, les tokens de thème ou la mise en page globale.

Voir `.claude/RULES.md` pour les règles de contribution et de commit à suivre impérativement (pas de mention de Claude comme contributeur, pas de `git push`, format de commit imposé).

## Commands

Package manager is **pnpm** (`packageManager: pnpm@10.34.5` in package.json) — use `pnpm`, not `npm`/`yarn`.

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`)

There is no test runner configured in this project yet.

## This Next.js version diverges from training data

Next.js 16.3.2 / React 19.2.8 predate most training data and change several App Router conventions used throughout this codebase. Before touching routing, layouts, params, or middleware-like logic, check `node_modules/next/dist/docs/` (resolved from the repo root; see `AGENTS.md`). Notable divergences already in use here:

- **`proxy.ts` replaces `middleware.ts`** — the locale-detection/redirect logic lives in `proxy.ts` at the repo root, exported as `proxy()`, not the old `middleware` export.
- **`next/root-params`** — Server Components read the current locale via `await locale()` from `next/root-params` (see `app/[locale]/page.tsx`, `app/[locale]/dictionaries.ts`) instead of reading `params` directly everywhere.
- **Generated route prop types** — layouts/pages are typed with generated helpers like `LayoutProps<"/[locale]">`, not hand-written `{ params }: { params: { locale: string } }` interfaces. `params` is a `Promise` and must be `await`ed.

## Architecture

Next.js App Router with locale-prefixed routing (`fr`/`en`), server-rendered content, and i18n dictionaries — no CMS or database; all content is hardcoded TypeScript.

- **Routing/i18n**: everything lives under `app/[locale]/`. `proxy.ts` (repo root) detects the visitor's locale (cookie → `Accept-Language` → `defaultLocale`) and redirects unprefixed paths to `/fr` or `/en`. `lib/i18n/config.ts` defines the locale union (`locales`, `defaultLocale`, `isLocale`). `app/[locale]/dictionaries.ts` loads the right dictionary (`app/[locale]/dictionaries/{fr,en}.ts`) at request time based on `next/root-params`'s `locale()`; the `Dictionary` shape is the contract in `types/dictionary.ts` — every UI string comes from it, never hardcoded in components.
- **Content layer**: `lib/content/*.ts` holds all portfolio data (`projects.ts`, `services.ts`, `skills.ts`, `tools.ts`, `site-config.ts`), typed via `types/content.ts`. Locale-dependent content (e.g. projects, services) is exposed through a `get*(locale)` function backed by a `Record<Locale, T[]>`; locale-independent content (skills, tools, contact info) is exported as a plain constant. Most content is still placeholder (`TODO` comments mark what needs real data — project descriptions, CV file, social links, domain name).
- **Page composition**: `app/[locale]/page.tsx` is a thin composition root — it resolves the dictionary + locale, fetches content from `lib/content/`, and renders `components/sections/*` in order (Hero → Projects → Skills → Services → Tools → ContactFooter) plus a fixed `Navbar`. Each section component takes `dict` (and its relevant content slice) as props rather than fetching anything itself.
- **Components**: `components/layout/` (Navbar, ThemeToggle, LocaleSwitcher — cross-page chrome), `components/sections/` (one component per homepage section, plus `ContactForm` as a client component using `useActionState` against the server action in `lib/actions/contact.ts`), `components/ui/` (small presentational primitives: `SectionHeading`, `NumberedLabel`, `VerticalLabel`).
- **Server actions**: `lib/actions/contact.ts` (`"use server"`) validates the contact form and currently only logs submissions — no email service is wired up yet (TODO notes Resend/SMTP as options).
- **Theming**: dark/light via a `.dark` class on `<html>`, not `prefers-color-scheme` media queries. `app/[locale]/layout.tsx` inlines a `beforeInteractive` script (`themeInitScript`) to read `localStorage.theme` and set the class before paint (avoids FOUC); `ThemeToggle` flips the class and persists the choice. Color tokens (`--background`, `--foreground`, `--accent`, `--muted`, `--border`, etc.) are defined for both `:root` and `.dark` in `app/globals.css`, then mapped into Tailwind via `@theme inline` (Tailwind v4, no `tailwind.config.js`). A custom `@custom-variant dark` targets `.dark` instead of Tailwind's default media-query dark mode.
- **SEO**: `app/[locale]/layout.tsx`'s `generateMetadata` builds locale-aware `<title>`/`description`/`alternates`/`openGraph` from the dictionary; `app/robots.ts` and `app/sitemap.ts` generate `robots.txt`/`sitemap.xml`; `lib/json-ld.ts` builds a schema.org `Person` JSON-LD block (injected in `page.tsx`) from `lib/content/site-config.ts`. `siteUrl` in `lib/json-ld.ts` is currently the Vercel preview URL (TODO: swap once a custom domain exists).
- Path alias `@/*` → project root (see `tsconfig.json`), TypeScript `strict` mode is on.
