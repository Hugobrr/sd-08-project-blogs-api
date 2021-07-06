const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use('/user', require('./controllers/userController'));
app.use('/login', require('./controllers/loginController'));
app.use('/categories', require('./controllers/categoriesController'));
app.use('/post', require('./controllers/blogPostsController'));

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
