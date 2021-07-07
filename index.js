const express = require('express');

const user = require('./routes/user');
const { midError } = require('./helpers/helpers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', user);
app.use(midError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
