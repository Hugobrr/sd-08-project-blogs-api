const express = require('express');
const middleware = require('./src/middleware');
const routes = require('./src/routes');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use('/user', routes.userRouter);
app.use(middleware.error);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
