const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controller/userController');
const loginController = require('./controller/loginController');
const createUser = require('./middleware/createUser');
const loginUser = require('./middleware/loginUser');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (req, res) => {
  res.send();
});

console.log('aquiIndex');
app.post('/user', createUser.validUser, userController.createUsers);
app.post('/login', loginUser.validToken, loginController.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
