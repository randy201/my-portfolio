# my-portfolio

Portfolio personnel — un CV numérique présentant projets et compétences, construit avec [Next.js](https://nextjs.org) (App Router), en français et en anglais.

Deux priorités transverses guident le projet :

- **SEO** — élément crucial (métadonnées, balises sémantiques, données structurées JSON-LD, performance, accessibilité, sitemap, `robots.txt`)
- **UI/UX** — expérience soignée (accessibilité, responsive, cohérence visuelle, thèmes clair/sombre)

## Documentation

`CLAUDE.md` est le point d'entrée de la documentation technique : il indique, pour chaque type de tâche, quel document fait autorité. En résumé :

| Sujet | Document |
| ----- | -------- |
| Mise en page, rail latéral, navigation, tokens de couleur, accessibilité | `.claude/PORTFOLIO_DESIGN-v2.md` (référence en vigueur) |
| Intention éditoriale « magazine » d'origine | `.claude/PORTFOLIO_DESIGN.md` (historique, périmé sur le layout) |
| Règles de contribution et format des commits | `.claude/RULES.md` |
| Conventions et pièges de cette version de Next.js | `AGENTS.md` |

Ce README reste une présentation générale destinée aux humains ; il ne fait autorité sur aucun choix technique.

## Stack technique

- **Next.js 16.3.2** (App Router) — ⚠️ version récente dont l'API diverge des connaissances d'entraînement d'un LLM ; se référer à `node_modules/next/dist/docs/` en cas de doute (voir `AGENTS.md`). Notamment : `proxy.ts` remplace `middleware.ts`, et la locale courante se lit via `next/root-params` plutôt que `params`.
- **React 19.2.8**
- **TypeScript** en mode `strict`
- **i18n** — routes préfixées par la locale (`/fr`, `/en`), détection automatique (cookie → `Accept-Language` → locale par défaut) via `proxy.ts`
- **Tailwind CSS v4** — importé via `@import "tailwindcss"` dans `app/globals.css`, thème déclaré en ligne avec `@theme inline` (pas de `tailwind.config.js`), dark mode via une classe `.dark` sur `<html>` (pas `prefers-color-scheme`)
- **Resend** — envoi des messages du formulaire de contact (voir Variables d'environnement)
- **ESLint 9** (config plate dans `eslint.config.mjs`)
- **pnpm** comme gestionnaire de paquets (`pnpm@10.34.5`)

## Prérequis

- [pnpm](https://pnpm.io/) (utiliser `pnpm`, pas `npm`/`yarn`)

## Démarrage

```bash
pnpm install
cp .env.example .env.local   # puis renseigner les valeurs
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir le résultat (redirection automatique vers `/fr` ou `/en`).

La page d'accueil se compose dans `app/[locale]/page.tsx`, à partir des sections de `components/sections/` et du contenu de `lib/content/`.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour charger les polices Geist / Geist Mono / Bebas Neue via `next/font/google`, exposées comme variables CSS (`--font-geist-sans`, `--font-geist-mono`, `--font-display`).

## Variables d'environnement

Le site fonctionne sans configuration, à une exception près : **l'envoi du formulaire de contact**. Voir `.env.example` pour le détail.

| Variable | Obligatoire | Rôle |
| -------- | ----------- | ---- |
| `RESEND_API_KEY` | Oui, pour l'envoi | Clé d'API [Resend](https://resend.com/api-keys). Sans elle, le formulaire affiche une erreur au visiteur au lieu de prétendre que le message est parti. |
| `CONTACT_FROM_EMAIL` | Non | Expéditeur, sur un domaine vérifié dans Resend. À défaut, le domaine de test `onboarding@resend.dev` est utilisé — il n'autorise l'envoi que vers l'adresse du titulaire du compte. |
| `CONTACT_TO_EMAIL` | Non | Destinataire. À défaut, l'adresse de `lib/content/site-config.ts`. |

## Scripts disponibles

| Commande       | Description                          |
| -------------- | ------------------------------------- |
| `pnpm dev`     | Démarre le serveur de développement   |
| `pnpm build`   | Build de production                   |
| `pnpm start`   | Lance le build de production          |
| `pnpm lint`    | Lance ESLint                          |

Aucun test runner n'est configuré pour le moment : la recette est manuelle, décrite au §11 de `.claude/PORTFOLIO_DESIGN-v2.md`.

## Mise en page

Le site est organisé autour d'un **rail latéral persistant** plutôt que d'une barre de navigation horizontale. À partir du palier `lg`, une colonne fixe à gauche porte en permanence l'identité (nom, rôle, disponibilité, bouton CV) et un sommaire numéroté à section active ; la colonne de droite fait défiler les sections. Sous `lg`, une barre compacte prend le relais pour la navigation, et le bloc d'identité reste affiché dans le flux.

Le surlignage de la section active est le seul comportement qui dépend de JavaScript : sans JS, le rail, le sommaire, les cinq ancres et tout le contenu restent affichés et utilisables.

## Structure du projet

```
app/
  [locale]/
    layout.tsx        # Layout racine, polices, métadonnées SEO, script anti-FOUC du thème
    page.tsx          # Page d'accueil : compose le rail, les sections et le pied de page
    dictionaries.ts   # Charge le dictionnaire i18n selon la locale (next/root-params)
    dictionaries/
      fr.ts, en.ts    # Textes de l'interface par langue
  globals.css         # Tailwind v4 + tokens de thème clair/sombre
  robots.ts, sitemap.ts # SEO : robots.txt et sitemap.xml générés
proxy.ts              # Détection de la locale et redirection (remplace middleware.ts)
components/
  layout/             # SideRail, SideRailNav, MobileBar, ThemeToggle, LocaleSwitcher
  sections/           # Une section par bloc de la page d'accueil (Hero, Projects, Skills...)
  ui/                 # Primitives présentationnelles (SectionHeading, SkipLink, RailHatch...)
lib/
  i18n/config.ts      # Locales supportées, locale par défaut
  nav.ts              # Source unique des entrées de navigation et de leur numérotation
  content/            # Contenu du portfolio (projets, services, compétences, outils, contact)
  actions/contact.ts  # Server action : valide et envoie le formulaire via Resend
  json-ld.ts          # Données structurées schema.org (Person)
types/
  content.ts, dictionary.ts # Contrats TypeScript du contenu et du dictionnaire i18n
public/               # Assets statiques (avatar, CV)
```

L'alias de chemin `@/*` pointe vers la racine du projet (voir `tsconfig.json`).

## État du contenu

Les coordonnées de contact, les liens sociaux et le CV sont réels. Le reste de `lib/content/` est encore un placeholder — des commentaires `TODO` indiquent ce qui reste à remplacer : projets, services, étapes de process, compétences, outils, avatar, et le nom de domaine dans `lib/json-ld.ts`.

## Déploiement

Le projet est déployé sur Vercel : **[my-portfolio-five-sepia-90.vercel.app](https://my-portfolio-five-sepia-90.vercel.app/)**

Le plus simple pour déployer est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), créée par les auteurs de Next.js.

Voir la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Dépôt GitHub Next.js](https://github.com/vercel/next.js)

## Contribution

Les règles de contribution sont définies dans `.claude/RULES.md` et rappelées dans `CLAUDE.md` : pas de mention d'une IA comme contributeur, pas de `git push` automatique, format de commit imposé.

Format des messages de commit : `Type(Portée) : Description`, à l'impératif et sans point final, par exemple :

```
feat(header) : ajoute la navigation responsive
```
