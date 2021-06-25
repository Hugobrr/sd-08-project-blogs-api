const express = require('express');
const bodyParser = require('body-parser');

const validEmail = require('./middlewares/validEmail');
const tokenValidation = require('./middlewares/tokenValidation');
const validPassword = require('./middlewares/validPassword');
const validPost = require('./middlewares/validPost');

const UserController = require('./controllers/UserController');
const Categories = require('./controllers/CategoryController');
const Posts = require('./controllers/PostsController');
const Login = require('./controllers/Login');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
  validEmail,
  validPassword,
  UserController.create);

app.get('/user',
  tokenValidation,
  UserController.getAll);

app.get('/user/:id',
  tokenValidation,
  UserController.getById);

app.post('/login',
  validEmail,
  validPassword,
  Login);

app.post('/categories',
  tokenValidation,
  Categories.create);

app.get('/categories',
  tokenValidation,
  Categories.getAll);

app.post('/post',
  tokenValidation,
  validPost,
  Posts.create);
