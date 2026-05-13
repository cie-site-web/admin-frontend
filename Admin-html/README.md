# Urbix Admin Dashboard — Version HTML statique

Version HTML pure du template Urbix Admin, convertie depuis Symfony/Twig.
Compatible avec l'extension **Live Server** de VS Code (ou tout serveur statique).

## Démarrage rapide

### Option 1 — Live Server (VS Code)

1. Installer l'extension **Live Server** de Ritwick Dey dans VS Code.
2. Ouvrir le dossier `Admin/` dans VS Code.
3. Clic droit sur `index.html` → **Open with Live Server**.
4. Le site s'ouvre sur `http://127.0.0.1:5500/index.html`.

### Option 2 — Python (sans installation)

```bash
cd Admin
python3 -m http.server 8000
```

Puis ouvrir <http://localhost:8000/index.html>

### Option 3 — Node.js

```bash
cd Admin
npx serve .
```

> **Important :** il faut un vrai serveur HTTP. Ouvrir les `.html` directement
> via `file://` ne fonctionne **pas** (les composants ne se chargeront pas à
> cause de la sécurité CORS du navigateur).

## Structure du projet

```
Admin/
├── index.html                 # Page d'accueil
├── auth-signin.html           # Toutes les autres pages (~114 pages)
├── dashboard-analytics.html
├── apps-*.html
├── pages-*.html
├── ui-*.html
├── ...
│
├── partials/                  # Composants HTML réutilisables
│   ├── header.html            # Barre du haut
│   ├── sidebar.html           # Menu latéral
│   ├── horizontal.html        # Menu horizontal
│   ├── switcher.html          # Panneau de personnalisation
│   ├── footer.html            # Pied de page
│   ├── scroll-to-top.html     # Bouton "remonter"
│   ├── auth-background.html   # Fond des pages d'auth
│   └── auth-header.html       # Header des pages d'auth
│
├── js/
│   └── components-loader.js   # Système d'inclusion des composants
│
└── assets/                    # CSS, JS, images, polices, libs tierces
    ├── css/
    ├── js/
    ├── images/
    ├── fonts/
    └── libs/
```

## Comment fonctionnent les composants réutilisables

Chaque page HTML contient des **placeholders** du type :

```html
<div data-include="partials/header.html"></div>
<div data-include="partials/sidebar.html"></div>
```

Le fichier `js/components-loader.js` (chargé en début de `<body>`, avant les
scripts vendor) parcourt ces éléments et remplace chaque placeholder par le
contenu du fichier HTML correspondant, de façon **synchrone** (via
`XMLHttpRequest`), ce qui garantit que les scripts tiers (Simplebar, Bootstrap,
etc.) trouvent le DOM complet au moment de leur initialisation.

### Modifier un composant

Modifier `partials/header.html` → la modification s'applique **automatiquement
sur les 110+ pages** qui l'utilisent. C'est le principal avantage par rapport
à du HTML 100 % inliné.

### Ajouter un composant

1. Créer `partials/mon-composant.html` avec du HTML pur.
2. Dans n'importe quelle page : `<div data-include="partials/mon-composant.html"></div>`.

## Pages disponibles

Les 114 pages suivent la structure d'origine du template :

- **Dashboards** : `index.html`, `dashboard-analytics.html`,
  `dashboard-media.html`, `dashboard-school.html`
- **Authentification** : `auth-signin.html`, `auth-signup.html`,
  `auth-forgot-password.html`, etc.
- **Apps** : `apps-calendar.html`, `apps-chat.html`, `apps-email.html`,
  `apps-kanban.html`, `apps-ecommerce-*.html`, `apps-school-*.html`, etc.
- **Pages** : `pages-profile.html`, `pages-faqs.html`, `pages-pricing.html`,
  `pages-blog-*.html`, etc.
- **UI** : `ui-buttons.html`, `ui-cards.html`, `ui-modal.html`, etc. (plus de
  60 pages de démo)
- **Charts & Maps** : `chart-*.html`, `echart-chart.html`, `maps-*.html`,
  `google-maps.html`
- **Icons** : `icons-bootstrap.html`, `icons-remix.html`
- **Divers** : `error.html`, `coming-soon.html`, `under-maintenance.html`,
  `not-authorize.html`

## Ce qui a été retiré par rapport à la version Symfony

- `src/` (Controllers PHP)
- `config/`, `vendor/`, `var/`, `bin/` (structure Symfony)
- `composer.json`, `composer.lock`, `symfony.lock`
- `.env`, `.env.dev`
- `templates/` (Twig) → converti en HTML
- `public/` → `assets/` est maintenant à la racine du dossier `Admin/`
- `webpack.config.js`, `package.json`, `node_modules/` (bundling abandonné,
  les assets sont déjà compilés dans `assets/`)
