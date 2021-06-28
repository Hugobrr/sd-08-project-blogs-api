const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const {
  UNAUTHORIZED,
} = require('../consts');
const { User } = require('../../models');
// const { getUser } = require('../models/recipesModel');

const app = express();
app.use(bodyParser.json());

const secret = process.env.JWT_SECRET;

const generateToken = (data) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, secret, jwtConfig);
  
  return token;
};

const getToken = (headers) => {
  const token = headers.authorization;
  if (!token) {
    throw Object.assign(
      new Error('missing auth token'),
      { status: UNAUTHORIZED },
   );
  }
  return token;
};

const decodeToken = async (req, res, next) => {
  try {
    const token = getToken(req.headers);
    const decodedToken = jwt.verify(token, secret);
    const { email } = decodedToken;
    const userFound = await User.findOne({ where: { email } });
    req.user = userFound;
    next();
  } catch (err) {
    if (err.message === 'missing auth token') {
      return res.status(err.status).json({ message: err.message });
    } 
      // Por algum motivo não estou conseguindo lançar o erro lá no getUser do recipesModel
      // Deve ser pq ele já lança o erro do verify primeiro.
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  generateToken,
  getToken,
  decodeToken,
  secret,
};