# Réflexes SEO — Checklist et bonnes pratiques

Guide de référence pour le référencement naturel (SEO) sur un site web, avec un focus sur les projets React / SPA et le multilingue.

---

## 1. Balisage HTML de base

- [ ] **`<title>`** : unique par page, 50–60 caractères, mot-clé principal + marque.
- [ ] **`<meta name="description">`** : unique par page, 150–160 caractères, incitatif et descriptif.
- [ ] **`<html lang="...">`** : refléter la langue de la page (ex. `fr`, `en`), mis à jour dynamiquement en SPA si besoin.
- [ ] **Un seul `<h1>` par page** : décrit le contenu principal, idéalement avec le mot-clé.
- [ ] **Hiérarchie des titres** : H1 → H2 → H3, sans sauter de niveau.

---

## 2. Structure des URLs

- [ ] **URLs courtes et lisibles** : mots-clés, pas d’IDs inutiles (`/projets` plutôt que `/p?id=1`).
- [ ] **Séparateur** : tirets (`mentions-legales`).
- [ ] **Minuscules** : préférer minuscules et pas d’accents dans les segments d’URL si possible.
- [ ] **Multilingue** : soit paramètre (`?lang=en`), soit segments dédiés (`/en/`, `/fr/`) ou sous-domaines ; rester cohérent.

---

## 3. Multilingue & international

- [ ] **`hreflang`** : `<link rel="alternate" hreflang="fr" href="...">` (et `en`, `x-default`) pour chaque version de page.
- [ ] **`og:locale`** (et `og:locale:alternate`) : aligné avec la langue de la page pour le partage social.
- [ ] **Canonical** : une URL canonique par version de langue pour éviter le duplicate content.
- [ ] **Contenu traduit** : titres, descriptions et textes importants traduits, pas seulement l’interface.

---

## 4. Open Graph & partage social

- [ ] **`og:title`** : titre percutant pour le partage (peut différer du `<title>`).
- [ ] **`og:description`** : résumé court pour les cartes de partage.
- [ ] **`og:image`** : image dédiée (recommandé 1200×630 px), URL absolue.
- [ ] **`og:url`** : URL canonique de la page.
- [ ] **`og:type`** : `website` ou `article` selon le cas.
- [ ] **Twitter Cards** : `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` au minimum.

---

## 5. Technique (SPA / React)

- [ ] **Rendu côté client** : s’assurer que le contenu important est bien dans le HTML (SSR ou pre-render si besoin pour le crawl).
- [ ] **Chemins des assets** : en production, `base` Vite (ou équivalent) correct pour sous-dossiers (ex. GitHub Pages `/repo/`).
- [ ] **Liens internes** : utiliser le routeur (`<Link>`) pour que les URLs soient crawlables et sans rechargement inutile.
- [ ] **Canonical** : généré avec l’URL réelle (origine + pathname) pour éviter doublons avec `?query` ou hash.

---

## 6. Contenu & sémantique

- [ ] **Contenu utile** : textes uniques par page, pas de pages vides ou “Coming soon” sans texte.
- [ ] **Mots-clés** : présents dans titre, H1, premier paragraphe et description, de façon naturelle.
- [ ] **Sections** : `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>` avec en-têtes pour structurer.
- [ ] **Images** : `alt` descriptif pour chaque image porteuse de sens (décoratives : `alt=""` ou `role="presentation"`).

---

## 7. Performance (indirectement SEO)

- [ ] **Core Web Vitals** : LCP, FID/INP, CLS corrects (images optimisées, polices, layout stable).
- [ ] **Images** : formats modernes (WebP/AVIF), dimensions adaptées, lazy-loading pour le below-the-fold.
- [ ] **CSS/JS** : minification, compression, mise en cache ; pas de blocage du rendu inutile.

---

## 8. Fichiers et outils

- [ ] **`robots.txt`** : autoriser les crawlers sur les zones utiles, éviter d’indexer admin / brouillons.
- [ ] **Sitemap XML** : lister les URLs importantes, mettre à jour après ajout/suppression de pages.
- [ ] **Google Search Console** : site vérifié, inspection d’URLs, suivi des erreurs d’indexation.
- [ ] **Schema.org** : balisage structuré (Organization, LocalBusiness, Article, etc.) si pertinent.

---

## 9. À éviter

- Contenu dupliqué entre pages ou entre langues sans `hreflang` / canonical.
- Titres ou descriptions vides ou identiques sur toutes les pages.
- URLs avec session IDs ou paramètres inutiles dans l’indexation.
- Pages “orphan” sans lien interne.
- Texte caché (display:none / tiny font) pour bourrer des mots-clés.
- Redirections en chaîne ou trop lentes.

---

## 10. Checklist rapide par nouvelle page

1. Titre et meta description uniques.
2. Un H1 cohérent avec le sujet.
3. URL propre et stable.
4. Si multilingue : `lang`, `hreflang`, canonical et contenu traduit.
5. OG + Twitter pour partage.
6. Liens internes depuis le menu ou le footer.
7. Images avec `alt` pertinent.

---

*Document de référence pour le projet Hiarte. À adapter selon l’hébergeur, le CMS ou le framework utilisé.*
