const express = require('express');
const { User } = require('../models');
const { userValidation, tokenValidation } = require('../middlewares');

const router = express.Router();

const OK = 200;
const CREATED = 201;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

router.post('/', userValidation, async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) return res.status(CONFLICT).json({ message: 'User already registered' });
    await User.create(req.body);
    res.status(CREATED).json({ token: 'token' });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
});

router.get('/', tokenValidation, async (_req, res) => {
  const users = await User.findAll();
  res.status(OK).json(users);
});

module.exports = router;
