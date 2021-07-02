const express = require('express');

const UserRouter = require('./src/routes/userRouter');
const LoginRouter = require('./src/routes/loginRouter');
const CategoryRouter = require('./src/routes/categoryRouter');
const PostRouter = require('./src/routes/postRouter');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/categories', CategoryRouter);
app.use('/post', PostRouter);
// 🎸
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
