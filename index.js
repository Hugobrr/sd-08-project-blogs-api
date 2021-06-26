const express = require('express');
const RouterUser = require('./src/router/user/router');
const error = require('./src/middlewares/error');

const app = express();
app.use(express.json());

app.use('/', RouterUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(error);
