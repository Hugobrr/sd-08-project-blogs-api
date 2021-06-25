const express = require('express');

const usersController = require('./controllers/usersController');

const { error, userValidation } = require('./middlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', userValidation, usersController.createNewUser);

app.use(error);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
