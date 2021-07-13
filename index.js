const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/User');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', User);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
