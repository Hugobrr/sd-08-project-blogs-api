const express = require('express');
const bodyParser = require('body-parser');
const UsersRoutes = require('./routes/Users');
const LoginRoutes = require('./routes/Login');
const { error } = require('./middlewares/Error');

const app = express();

app.use(bodyParser.json());

app.use('/user', UsersRoutes);
app.use('/login', LoginRoutes);
app.use(error);
app.listen(3000, () => console.log('ouvindo porta 3000!'));

//
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
