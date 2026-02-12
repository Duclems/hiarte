# Hiarte

Application React moderne avec design atomique, incluant les pages Accueil, Projets, À propos et Contact.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## 🎨 Design

- **Couleur de fond** : `#EFF7FE` (bleu très clair)
- **Palette** : Tons bleus (#2563eb, #1d4ed8) pour les accents

## 📁 Architecture Atomique

Le projet suit la méthodologie **Atomic Design** pour une réutilisation maximale des composants :

```
src/
├── components/
│   ├── atoms/           # Composants les plus petits et réutilisables
│   │   ├── Button/      # Bouton générique (variants: primary, secondary, ghost)
│   │   └── Text/        # Texte stylisé (variants: h1, h2, h3, body, lead, small)
│   │
│   ├── molecules/       # Combinaisons d'atomes
│   │   └── NavButton/   # Bouton de navigation (NavLink + styles)
│   │
│   ├── organisms/       # Sections complexes
│   │   └── Header/      # Barre de navigation avec logo et liens
│   │
│   └── templates/       # Mise en page des pages
│       └── MainLayout/  # Header + zone de contenu (Outlet)
│
├── pages/               # Pages de l'application
│   ├── HomePage.jsx
│   ├── ProjectsPage.jsx
│   ├── AboutPage.jsx
│   └── ContactPage.jsx
│
└── App.jsx              # Routes et configuration
```

### Niveaux atomiques

| Niveau | Description | Exemples |
|--------|-------------|----------|
| **Atoms** | Éléments de base, non divisibles | `Button`, `Text` |
| **Molecules** | Assemblage de 2+ atoms | `NavButton` |
| **Organisms** | Blocs fonctionnels complets | `Header` |
| **Templates** | Structure de page | `MainLayout` |
| **Pages** | Contenu final avec données | `HomePage`, etc. |

## 📄 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Page d'accueil avec CTA |
| `/projects` | Projets | Liste des projets |
| `/about` | À propos | Présentation |
| `/contact` | Contact | Coordonnées et formulaire |

## 🧩 Réutilisation des composants

### Exemple : utiliser le Button

```jsx
import { Button } from './components/atoms/Button'

<Button variant="primary">Cliquez</Button>
<Button variant="secondary">Annuler</Button>
<Button variant="ghost">Lien discret</Button>
```

### Exemple : utiliser le Text

```jsx
import { Text } from './components/atoms/Text'

<Text as="h1" variant="h1">Titre principal</Text>
<Text variant="lead">Sous-titre</Text>
```

## 🛠 Technologies

- **React 18** + **Vite 5**
- **React Router 6** pour la navigation
