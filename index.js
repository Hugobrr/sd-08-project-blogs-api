const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const UserController = require('./controller/User');
const auth = require('./middleware/auth');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', UserController.createUser);
app.get('/user', auth, UserController.getUser);
app.post('/login', UserController.userLogin);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
