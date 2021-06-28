const express = require('express');
const errorMiddleware = require('./middlewares/error');
const userRoute = require('./routes/user');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRoute);

app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));