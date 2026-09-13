# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@.claude/RULES.md

## Objectif du projet

Ce site est le portfolio personnel de l'utilisateur : une sorte de CV numérique présentant ses projets et ses compétences. Deux priorités transverses guident toutes les décisions techniques :

- **SEO** — élément crucial du projet (métadonnées, balises sémantiques, performance, accessibilité, sitemap, `robots.txt`, données structurées).
- **UI/UX** — expérience soignée : accessibilité, responsive, cohérence visuelle, temps de chargement.

Le design cible est documenté en deux temps, les deux fiches étant à consulter avant de toucher au hero, aux tokens de thème ou à la mise en page :

- `.claude/PORTFOLIO_DESIGN-v2.md` — **la référence en vigueur pour la mise en page globale et la navigation** (rail latéral persistant, sommaire numéroté, barre mobile, tokens `--accent-strong` / `--rail-surface` / `--hatch`). La v2 est intégralement implémentée.
- `.claude/PORTFOLIO_DESIGN.md` — v1, conservée pour l'intention éditoriale/magazine seule (titre géant, labels rotés, numérotation, filets fins). Ce qu'elle dit du layout et de la navbar est périmé.

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
- **Content layer**: `lib/content/*.ts` holds all portfolio data (`projects.ts`, `services.ts`, `skills.ts`, `tools.ts`, `site-config.ts`), typed via `types/content.ts`. Locale-dependent content (e.g. projects, services) is exposed through a `get*(locale)` function backed by a `Record<Locale, T[]>`; locale-independent content (skills, tools, contact info) is exported as a plain constant. Contact details and social links are real; everything else is still placeholder (`TODO` comments mark what needs real data — projects, services, process steps, skills, tools, the CV file in `public/cv/`, and the domain name in `lib/json-ld.ts`).
- **Page composition**: `app/[locale]/page.tsx` is a thin composition root — it resolves the dictionary + locale, fetches content from `lib/content/`, and lays out `SkipLink` + `SideRail` + `MobileBar`, then a `<div className="lg:ml-[var(--rail-w)]">` holding `<main>` (Hero → Projects → Skills → Services → Tools) and the `<footer>` (ContactFooter). The rail width token `--rail-w` is set once on the page wrapper (inline style) so the fixed rail and the offset content stay aligned. Each section component takes `dict` (and its relevant content slice) as props rather than fetching anything itself.
- **Layout / navigation**: `SideRail` (Server Component) is the persistent identity column — monogram, avatar, availability pill, the page's single `<h1>`, role, tagline, both CTAs, the numbered contents list, then `LocaleSwitcher` + `ThemeToggle`. It is a normal in-flow block below `lg` and `position: fixed` from `lg` up. `MobileBar` (`lg:hidden`, sticky) carries the monogram, locale and theme controls plus the section links inside a native `<details>` — no JS. `SideRailNav` is the only client island of the layout: it highlights the active section with a single `IntersectionObserver` (no scroll listener) and sets `aria-current`; its `<a href="#…">` anchors are server-rendered, so navigation works without JavaScript. `lib/nav.ts` (`getNavSections(dict)`, `sectionNumber(index)`) is the single source of the five entries, shared by the rail and the mobile bar — display numbers are derived from position, never hardcoded.
- **Components**: `components/layout/` (`SideRail`, `SideRailNav`, `MobileBar`, `ThemeToggle`, `LocaleSwitcher` — cross-page chrome; there is no `Navbar`, it was removed with the v2 layout), `components/sections/` (one component per homepage section, plus `ContactForm` as a client component using `useActionState` against the server action in `lib/actions/contact.ts`), `components/ui/` (small presentational primitives: `SectionHeading`, `NumberedLabel`, `VerticalLabel`, `SkipLink`, `RailHatch`).
- **Server actions**: `lib/actions/contact.ts` (`"use server"`) validates the contact form and currently only logs submissions — no email service is wired up yet (TODO notes Resend/SMTP as options).
- **Theming**: dark/light via a `.dark` class on `<html>` — the CSS never uses `prefers-color-scheme` media queries, though the init script does read it as a fallback when no choice is stored. `app/[locale]/layout.tsx` inlines a `beforeInteractive` script (`themeInitScript`) that reads `localStorage.theme` (falling back to `matchMedia("(prefers-color-scheme: dark)")`) and sets the class before paint (avoids FOUC); `ThemeToggle` flips the class and persists the choice. Color tokens (`--background`, `--foreground`, `--accent`, `--accent-strong`, `--muted`, `--border`, `--rail-surface`, `--hatch`) are defined for both `:root` and `.dark` in `app/globals.css`, then mapped into Tailwind via `@theme inline` (Tailwind v4, no `tailwind.config.js`), alongside the `hide-scrollbar` `@utility`. A custom `@custom-variant dark` targets `.dark` instead of Tailwind's default media-query dark mode.
  - **Contrast rule (non-negotiable)**: `--accent` only ratios ~3.7:1 (light) / ~3.0:1 (dark) against the background, so it is reserved for fills, bars, dots and headings ≥ 24px. Any text below 24px — links, the `01…05` numbers, hover states, the active entry — must use `accent-strong`. Note that Tailwind v4 already applies opacity modifiers to hex tokens via `color-mix()`, so `bg-accent/12` and `bg-foreground/[0.04]` work as-is; there is no need to migrate the tokens to RGB channel triplets.
- **SEO**: `app/[locale]/layout.tsx`'s `generateMetadata` builds locale-aware `<title>`/`description`/`alternates`/`openGraph` from the dictionary; `app/robots.ts` and `app/sitemap.ts` generate `robots.txt`/`sitemap.xml`; `lib/json-ld.ts` builds a schema.org `Person` JSON-LD block (injected in `page.tsx`) from `lib/content/site-config.ts`. `siteUrl` in `lib/json-ld.ts` is currently the Vercel preview URL (TODO: swap once a custom domain exists). Structural invariants to preserve when editing the layout: exactly one `<h1>` (it lives in `SideRail`, not in `Hero`), one `header` / `main` / `footer` each, every nav target reachable through a real `<a href="#…">` in the served HTML, and every decorative element (`PORTFOLIO` wordmark, accent circle, hatch, grid dots) marked `aria-hidden`.
- Path alias `@/*` → project root (see `tsconfig.json`), TypeScript `strict` mode is on.
