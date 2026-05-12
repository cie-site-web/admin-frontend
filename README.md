## template agile docker architecture nextjs typeScript 

Ce projet est un template moderne pour démarrer rapidement un projet web avec Next.js, TypeScript et Docker, orienté architecture propre, développement agile et déploiement professionnel.

Il inclut :

Environnements dev et prod séparés

Docker & Docker Compose avec profils

Linting, tests unitaires et e2e

Architecture scalable

🧱 Stack Technique

⚛️ Next.js

🟦 TypeScript

🐳 Docker / Docker Compose

🧪 Jest (tests unitaires)

🎭 Playwright (tests e2e)

📏 ESLint

🎨 PostCSS

📁 Structure du projet
.
├── __tests__/
│   ├── e2e/
│   ├── integrations/
│   └── unit/
├── public/
├── src/
│   ├── app/                # App Router Next.js
│   ├── components/         # Composants UI
│   ├── config/             # Configurations
│   ├── context/hooks/      # Hooks & context
│   ├── services/           # Accès API / logique métier
│   ├── types/              # Types TypeScript
│   └── utils/              # Helpers
├── Dockerfile              # Image production
├── Dockerfile.dev          # Image développement
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md

⚙️ Prérequis

Node.js ≥ 18 (optionnel si Docker utilisé)

Docker ≥ 24

Docker Compose ≥ 2

🐳 Environnements Docker

Le projet fonctionne avec deux profils Docker Compose :

🔧 Développement (dev)

Hot reload

Volumes montés

Démarrage rapide

Lancer l’environnement dev :

docker-compose --profile dev up --build


Application accessible sur :

http://localhost:3000

🚀 Production (prod)

Build optimisé

Image légère

Pas de volumes montés

Lancer l’environnement prod :

docker-compose --profile prod up --build

📦 Commandes utiles
▶️ Démarrer
# Dev
docker-compose --profile dev up --build

# Prod
docker-compose --profile prod up --build

⛔ Arrêter
docker-compose down

🧹 Nettoyer complètement
docker-compose down -v
docker system prune -f

🧪 Tests
Tests unitaires
npm run test

Tests e2e (Playwright)
npm run test:e2e

📏 Lint
npm run lint