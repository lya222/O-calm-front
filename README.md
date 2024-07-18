# **O'CALM**

O-Calm est une application web qui permet de trouver des endroits calmes près de chez sois tel que des parcs, jardins, etc grace à la colllaboration de ses utilisateurs.

## **Installation de Vite**

### Étape 1 : Installer Vite

- Exécutez la commande suivante dans votre terminal : `npm install` ou `yarn install`
  
  ```
  npm install vite 
  ```
  

### Étape 2 : Créer un projet avec vite

- Exécutez la commande suivante dans votre terminal : `npm create vite` ou `yarn create vite ` ou `pnpm create vite`

```
pnpm create vite 
```

### Étape 3 : Donner un nom à son projet

- Après la commande create vite vous devez préciser le nom de votre projet

```
? Project name: › vite-project

```

### Étape 4 : Installation des packages

- Vite vous demande si vous voulez d'avance installer des packages. Vous pouvez les nommer ou bien appuyez sur entrer pour passer à l'étape suivante

```
? Package name: › ''
```

### Étape 5 : Selectionner un framework

- Selectionnez React parmis les framework proposés par Vite.
  

```
 ? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others

```

### Étape 6 : Selectionner un variant

- Selectionnez TypeScript et SWC
  

```
? Select a variant: › - Use arrow-keys. Return to submit.
    TypeScript
❯   TypeScript + SWC
    JavaScript
    JavaScript + SWC
    Remix ↗


```

### Étape 7 : Lancer le projet

- Depuis votre projet faites `pnpm install`
  
- Et pour le lancer faites `pnpm dev`
  

### Construction du projet

- Pour build le projet faites la commande `pnpm build`

### Dépendances

```
"dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@googlemaps/js-api-loader": "^1.16.6",
    "@mui/icons-material": "^5.15.20",
    "@mui/material": "^5.16.0",
    "@mui/styles": "^5.15.20",
    "@reduxjs/toolkit": "^2.2.5",
    "@types/js-cookie": "^3.0.6",
    "@types/react-redux": "^7.1.33",
    "@vis.gl/react-google-maps": "^1.1.0",
    "axios": "^1.7.2",
    "dotenv": "^16.4.5",
    "framer-motion": "^11.2.13",
    "jose": "^5.6.3",
    "js-cookie": "^3.0.5",
    "material-ui-popup-state": "^5.1.2",
    "react": "^18.3.1",
    "react-auth-kit": "^3.1.3",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.52.1",
    "react-material-ui-carousel": "^3.4.2",
    "react-redux": "^9.1.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "react-router-dom": "^6.24.0",
    "sass": "^1.77.6",
    "typescript": "^5.2.2",
    "vite": "^5.3.3",
    "vite-plugin-env-compatible": "^2.0.1"
```

### Installation des dépendances sur votre projet

- Pour installer les dépendances sur votre projet faites la commande `pnpm install`ou `npm install` ou `yarn install` suivi des packages ci-dessous :
  

```
pnpm install @emotion/react@11.11.4 @emotion/styled@11.11.5 @googlemaps/js-api-loader@1.16.6 @mui/icons-material@5.15.20 @mui/material@5.16.0 @mui/styles@5.15.20 @reduxjs/toolkit@2.2.5 @types/js-cookie@3.0.6 @types/react-redux@7.1.33 @vis.gl/react-google-maps@1.1.0 axios@1.7.2 dotenv@16.4.5 framer-motion@11.2.13 jose@5.6.3 js-cookie@3.0.5 material-ui-popup-state@5.1.2 react@18.3.1 react-auth-kit@3.1.3 react-dom@18.3.1 react-hook-form@7.52.1 react-material-ui-carousel@3.4.2
```

- Pour installer les dépendances depuis notre projet faites la commande `pnpm install`ou `npm install`ou `yarn install`

## **Configuration**

Configurez vos variables d'environnement comme ceci :

```
VITE_API_URL=''
VITE_API_URL_PICTURE=''
VITE_API_SECRETKEYTOKEN=''
VITE_API_UPLOAD_PRESET=''
VITE_API_MAP_KEY= ''
```

##
