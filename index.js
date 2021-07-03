const express = require('express');

const routes = require('./routes');
const middleware = require('./middlewares');

const app = express();

app.use(express.json());

app.use('/user', routes.user);

app.post('/login', middleware.login);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(middleware.error);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));