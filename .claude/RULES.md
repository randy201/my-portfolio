# Règles Claude — my-portfolio

Ces règles s'ajoutent à celles de `CLAUDE.md` et doivent être respectées à la lettre.

## Attribution

- Ne jamais mentionner Claude (ou toute IA) comme contributeur, co-auteur ou auteur, nulle part : commits, messages de commit, pull requests, README, code, documentation.
- Ne jamais ajouter de ligne du type `Co-Authored-By: Claude` dans un commit.

## Git

- Ne jamais exécuter `git push` (aucun push vers le remote), même si l'utilisateur a validé un commit — le push reste une action manuelle de l'utilisateur.
- Les commits peuvent être créés localement quand demandé, mais restent local uniquement.

### Format des messages de commit

```
Type(Portée) : Description
```

- **Type** : `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`...
- **Portée (scope)** : la partie du projet concernée (ex. `header`, `seo`, `readme`, `projets`)
- **Description** : à l'impératif ("ajoute", "corrige", "supprime", "renomme"...), sans point final

Exemples :

```
feat(header) : ajoute la navigation responsive
fix(seo) : corrige les balises meta manquantes
docs(readme) : met à jour les instructions d'installation
```

## Qualité du projet

- **SEO** : élément crucial — métadonnées (`title`, `description`, Open Graph), balises sémantiques, performance (Core Web Vitals), accessibilité, sitemap, `robots.txt`, données structurées (JSON-LD) si pertinent.
- **Bonnes pratiques** Next.js / React / TypeScript à respecter (voir `CLAUDE.md` et `AGENTS.md`).
- **UI/UX** : soigner l'accessibilité, le responsive, la cohérence visuelle et les temps de chargement.
