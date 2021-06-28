const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  addUser,
} = require('../services/midlewares/userService');
const {
  CREATED,
} = require('../services/consts');
const { userRegisterValidations } = require('../services/validations');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

// 1 - Sua aplicação deve ter o endpoint POST /user

router.post('/',
rescue(userRegisterValidations),
rescue(addUser),
async (req, res) => {
  const { token } = req;
  return res.status(CREATED).json({ token });
});

module.exports = { router };