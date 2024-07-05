const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

// Import des données de recettes
const recipes = require('./list.json'); // Utilisation de require pour charger le JSON

// Initialisation de l'application Express
const app = express();
const port = 3001;
const jwtSecret =
  'OurSuperLongRandomSecretToSignOurJWTgre5ezg4jyt5j4ui64gn56bd4sfs5qe4erg5t5yjh46yu6knsw4q';

// Données des utilisateurs
const users = [
  {
    id: 1,
    pseudo: 'Alice',
    password: '1234',
    email: 'alice.smith@example.com',
  },
  {
    id: 2,
    pseudo: 'Bob',
    password: '1234',
    email: 'bob.johnson@example.com',
  },
  // Ajoutez d'autres utilisateurs au besoin
];

/* Middlewares */
// Parse le corps des requêtes en JSON
app.use(bodyParser.json());

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // Réponse aux requêtes de pré-vérification (preflight)
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware pour l'authentification JWT
const authorizationMiddleware = jwt({
  secret: jwtSecret,
  algorithms: ['HS256'],
});

/* Routes */
// Page d'accueil : GET /
app.get('/', (req, res) => {
  console.log('>> GET /');
  res.sendFile(__dirname + '/index.html');
});

// Liste des recettes : GET /places
app.get('/places', (req, res) => {
  console.log('>> GET /places');
  res.json(recipes);
});

// Détails d'une recette : GET /places/:idOrSlug
app.get('/places/:idOrSlug', (req, res) => {
  console.log(`>> GET /places/${req.params.idOrSlug}`);
  const recipe = recipes.find(
    (recipe) =>
      recipe.id === parseInt(req.params.idOrSlug) ||
      recipe.slug === req.params.idOrSlug
  );
  if (!recipe)
    return res
      .status(404)
      .send('The recipe with the given ID or Slug was not found.');
  res.json(recipe);
});

// Login : POST /login
app.post('/login', (req, res) => {
  const { pseudo, password } = req.body;

  // Recherche de l'utilisateur correspondant au pseudo et au mot de passe fournis
  const user = users.find(
    (user) => user.pseudo === pseudo && user.password === password
  );

  if (!user) {
    return res.status(401).send('Invalid pseudo or password');
  }

  // Création d'un token JWT avec une durée de validité de 1 heure (3600 secondes)
  const token = jsonwebtoken.sign({ userId: user.id }, jwtSecret, {
    expiresIn: '1h',
  });

  // Renvoi du token JWT en réponse
  res.json({ token, pseudo: user.pseudo });
});

// Login : GET /login
app.get('/login', (req, res) => {
  console.log('>> GET /login');
  res.json(users);
});

// Enregistrement d'un nouvel utilisateur : POST /register
app.post('/register', (req, res) => {
  console.log('>> POST /register', req.body);
  const { pseudo, email, password } = req.body;

  // Vérification de l'existence d'un utilisateur avec le même pseudo ou email
  const existingUser = users.find(
    (user) => user.pseudo === pseudo || user.email === email
  );

  if (existingUser) {
    return res
      .status(400)
      .send('A user with the given pseudo or email already exists.');
  }

  // Génération d'un nouvel ID (par exemple, en trouvant le plus grand ID existant et en ajoutant 1)
  const newUserId = Math.max(...users.map((user) => user.id)) + 1;

  // Création du nouvel utilisateur
  const newUser = {
    id: newUserId,
    pseudo,
    email,
    password,
  };

  // Ajout du nouvel utilisateur à la liste
  users.push(newUser);

  // Renvoi de la réponse avec le nouvel utilisateur
  res.status(201).json(newUser);
});

// Middleware pour les erreurs
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log('<< 401 UNAUTHORIZED - Invalid Token');
    res.status(401).send('Invalid token');
  }
});

/*
 * Démarrage du serveur
 */
app.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
