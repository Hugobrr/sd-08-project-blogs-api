const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const UserController = require('./controller/User');
const CategoriesController = require('./controller/Categorie.js');
const PostsController = require('./controller/Posts');
const auth = require('./middleware/auth');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', UserController.createUser);
app.get('/user', UserController.getUser);
app.get('/user/:id', auth, UserController.getUserById);
app.post('/login', UserController.userLogin);
app.post('/categories', auth, CategoriesController.createCategory);
app.get('/categories', auth, CategoriesController.getCategory);
app.post('/post', auth, PostsController.createPost);
app.get('/post', auth, PostsController.getPost);
app.get('/post/:id', auth, PostsController.getPostById);
app.listen(3000, () => console.log('ouvindo porta 3000!'));
