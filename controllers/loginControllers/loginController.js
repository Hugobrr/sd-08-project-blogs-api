const express = require('express');
const tokenCreate = require('../encrptoJwt');
const loginValidations = require('./loginValidations');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const userData = req.body;
  const validation = await loginValidations(userData);

  if (validation) {
    const { erro: { mensagem, code } } = validation;
    return res.status(code)
      .json({ message: mensagem });
  }

  const token = await tokenCreate(userData);
  res.status(200).json({ token });
});

module.exports = loginRouter;
