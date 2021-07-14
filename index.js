const express = require('express');
const bodyParser = require('body-parser');

const routerUser = require('./controllers/userControllers/userController');
const loginRouter = require('./controllers/loginControllers/loginController');
const categoriesRouter = require('./controllers/categoriesControllers/categoriesController.js');
const postRouter = require('./controllers/postControllers/postController');

const app = express();

app.use(bodyParser.json());

app.use('/user', routerUser);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
