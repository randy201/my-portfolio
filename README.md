# my-portfolio

Portfolio personnel — un CV numérique présentant projets et compétences, construit avec [Next.js](https://nextjs.org) (App Router) et initialisé avec `create-next-app`.

Deux priorités transverses guident le projet :

- **SEO** — élément crucial (métadonnées, balises sémantiques, performance, accessibilité, sitemap, `robots.txt`)
- **UI/UX** — expérience soignée (accessibilité, responsive, cohérence visuelle)

> **État actuel** : scaffold par défaut, aucun contenu de portfolio n'a encore été ajouté (`app/page.tsx` affiche toujours la page d'accueil générée par `create-next-app`).

## Stack technique

- **Next.js 16.3.2** (App Router) — ⚠️ version récente dont l'API peut diverger des connaissances d'entraînement d'un LLM ; se référer à `node_modules/next/dist/docs/` en cas de doute (voir `AGENTS.md`).
- **React 19.2.8**
- **TypeScript** en mode `strict`
- **Tailwind CSS v4** — importé via `@import "tailwindcss"` dans `app/globals.css`, thème déclaré en ligne avec `@theme inline` (pas de `tailwind.config.js`), dark mode via `prefers-color-scheme`
- **ESLint 9** (config plate dans `eslint.config.mjs`)
- **pnpm** comme gestionnaire de paquets (`pnpm@10.34.5`)

## Prérequis

- [pnpm](https://pnpm.io/) (utiliser `pnpm`, pas `npm`/`yarn`)

## Démarrage

```bash
pnpm install
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir le résultat.

La page se modifie dans `app/page.tsx` (rechargement automatique).

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour charger les polices Geist / Geist Mono via `next/font/google`, exposées comme variables CSS (`--font-geist-sans`, `--font-geist-mono`).

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
  layout.tsx    # Layout racine, polices Geist, typé LayoutProps<"/">
  page.tsx      # Page d'accueil (contenu par défaut create-next-app)
  globals.css   # Tailwind v4 + tokens de thème
public/         # Assets statiques (SVG)
```

L'alias de chemin `@/*` pointe vers la racine du projet (voir `tsconfig.json`).

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
