## Structure de la page d’accueil (`HomePage.jsx`)

- **`div.page.page--home`**
  - **`div.home-main`** (colonne, contenu texte)
    - **`div.home-hero-row`** (ligne principale)
      - **`section.home-hero__text`**
        - `h1.home-hero__headline` avec 3 lignes : Design, Code, Impact
      - **`div.home-actions`**
        - Lien `home-frame` → « Explorer les services »
        - Lien `home-frame home-frame--outline` → « Démarrer un projet »
    - **`p.home-hero__tagline`** : phrase d’accroche
    - **`section.home-intro`** : paragraphe de présentation
  - **`div.home-center`** (bloc de l’image des mains)
    - `img.home-center__img`

## Comportement desktop (`App.css`)

- `.page--home` est un conteneur flex **en ligne** : texte à gauche, image centrée en fond, actions à droite.
- `.home-center` est **absolu** et couvre la hauteur disponible, l’image est centrée en bas (`align-items: flex-end`).

## Comportement téléphone (media query)

- Pour les écrans ≤ 800px :
  - `.page--home` devient une **colonne**, avec `gap` réduit.
  - `.home-main` (texte + boutons) est en **ordre 1**.
  - `.home-center` passe en **position statique**, `order: 2`, largeur 100 %, avec un `margin-top` léger : l’image est rendue **à la fin de la page home, juste au-dessus du footer**.
  - `.home-center__img` utilise `width: 100%`, `max-height: 65vh`, `object-fit: contain`, `object-position: bottom` pour maximiser la hauteur sans couper l’image.
  - `.home-actions .home-frame` ont une largeur homogène (100 % jusqu’à un `max-width`), ce qui aligne visuellement les deux boutons.

Ce fichier décrit la logique actuelle pour t’aider à ajuster facilement le layout (alignements, espacements, ordre des éléments) sans avoir à relire tout le CSS.

