const express = require('express');
const { userRouter } = require('./routes');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
