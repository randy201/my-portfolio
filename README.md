# my-portfolio

Portfolio personnel — un CV numérique présentant projets et compétences, construit avec [Next.js](https://nextjs.org) (App Router), en français et en anglais.

Deux priorités transverses guident le projet :

- **SEO** — élément crucial (métadonnées, balises sémantiques, données structurées JSON-LD, performance, accessibilité, sitemap, `robots.txt`)
- **UI/UX** — expérience soignée (accessibilité, responsive, cohérence visuelle, thèmes clair/sombre)

Le design cible (structure éditoriale/magazine) est documenté dans `.claude/PORTFOLIO_DESIGN.md`.

## Stack technique

- **Next.js 16.3.2** (App Router) — ⚠️ version récente dont l'API peut diverger des connaissances d'entraînement d'un LLM ; se référer à `node_modules/next/dist/docs/` en cas de doute (voir `AGENTS.md`). Notamment : `proxy.ts` remplace `middleware.ts`, et le locale courant se lit via `next/root-params` plutôt que `params`.
- **React 19.2.8**
- **TypeScript** en mode `strict`
- **i18n** — routes préfixées par la locale (`/fr`, `/en`), détection automatique (cookie → `Accept-Language` → locale par défaut) via `proxy.ts`
- **Tailwind CSS v4** — importé via `@import "tailwindcss"` dans `app/globals.css`, thème déclaré en ligne avec `@theme inline` (pas de `tailwind.config.js`), dark mode via une classe `.dark` sur `<html>` (pas `prefers-color-scheme`)
- **ESLint 9** (config plate dans `eslint.config.mjs`)
- **pnpm** comme gestionnaire de paquets (`pnpm@10.34.5`)

## Prérequis

- [pnpm](https://pnpm.io/) (utiliser `pnpm`, pas `npm`/`yarn`)

## Démarrage

```bash
pnpm install
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir le résultat (redirection automatique vers `/fr` ou `/en`).

La page d'accueil se compose dans `app/[locale]/page.tsx`, à partir des sections de `components/sections/` et du contenu de `lib/content/`.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour charger les polices Geist / Geist Mono / Bebas Neue via `next/font/google`, exposées comme variables CSS (`--font-geist-sans`, `--font-geist-mono`, `--font-display`).

## Scripts disponibles

| Commande       | Description                          |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Démarre le serveur de développement   |
| `pnpm build`   | Build de production                   |
| `pnpm start`   | Lance le build de production          |
| `pnpm lint`    | Lance ESLint                          |

Aucun test runner n'est configuré pour le moment.

## Structure du projet

```
app/
  [locale]/
    layout.tsx        # Layout racine, polices, métadonnées SEO, script anti-FOUC du thème
    page.tsx           # Page d'accueil : compose les sections avec le contenu et le dictionnaire
    dictionaries.ts    # Charge le dictionnaire i18n selon la locale (next/root-params)
    dictionaries/
      fr.ts, en.ts      # Textes de l'interface par langue
  globals.css          # Tailwind v4 + tokens de thème clair/sombre
  robots.ts, sitemap.ts # SEO : robots.txt et sitemap.xml générés
proxy.ts               # Détection de la locale et redirection (remplace middleware.ts)
components/
  layout/              # Navbar, ThemeToggle, LocaleSwitcher
  sections/            # Une section par bloc de la page d'accueil (Hero, Projects, Skills...)
  ui/                  # Primitives présentationnelles (SectionHeading, NumberedLabel...)
lib/
  i18n/config.ts       # Locales supportées, locale par défaut
  content/             # Contenu du portfolio (projets, services, compétences, outils, contact)
  actions/contact.ts   # Server action de validation du formulaire de contact
  json-ld.ts           # Données structurées schema.org (Person)
types/
  content.ts, dictionary.ts # Contrats TypeScript du contenu et du dictionnaire i18n
public/                # Assets statiques (avatar, CV)
```

L'alias de chemin `@/*` pointe vers la racine du projet (voir `tsconfig.json`).

La plupart du contenu (`lib/content/`) est encore un placeholder — des commentaires `TODO` indiquent ce qui reste à remplacer par les vraies données (descriptions de projets, CV, liens sociaux, nom de domaine).

## Déploiement

Le projet est déployé sur Vercel : **[my-portfolio-five-sepia-90.vercel.app](https://my-portfolio-five-sepia-90.vercel.app/)**

Le plus simple pour déployer est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), créée par les auteurs de Next.js.

Voir la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Dépôt GitHub Next.js](https://github.com/vercel/next.js)

## Contribution

Les règles de contribution (format des commits, pas de mention de Claude comme contributeur, pas de push automatique) sont définies dans `.claude/RULES.md` et `CLAUDE.md`.

Format des messages de commit : `Type(Portée) : Description`, à l'impératif et sans point final, par exemple :

```
feat(header) : ajoute la navigation responsive
```
