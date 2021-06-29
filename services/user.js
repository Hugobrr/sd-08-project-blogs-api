require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const { validateUser } = require('./userValidates');
const { ERR } = require('../config/messages');
const { jwtConfig } = require('../config/jwtConfig');

const createUser = async (data) => {
  validateUser(data);

  try {
    await Users.create(data);
    const token = jwt.sign(
      { email: data.email, password: data.password },
      process.env.JWT_SECRET,
      jwtConfig,
    );
    return { token };
  } catch (e) {
    throw new Error(ERR.userRegistered);
  }
};

const getAllUsers = async () => Users.findAll();

const getUserById = async (id) => {
  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) throw Error(ERR.userNotExists);
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};