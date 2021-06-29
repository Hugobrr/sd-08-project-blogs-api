const jwt = require('jsonwebtoken');
const { User } = require('../models');
const validateEntries = require('./userValidations/validateEntries');

const { JWT_SECRET } = process.env;

const insertUser = async (displayName, email, password, image) => {
  try {
    const isValidEntries = await validateEntries(displayName, email, password);
    if (isValidEntries.err) return isValidEntries;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const user = { displayName, email, password, image };
    const token = jwt.sign({ data: user }, JWT_SECRET, jwtConfig);

    await User.create({ displayName, email, password, image });
    
    return { token };
  } catch (e) {
    return { message: 'erro verifique o console' };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (e) {
    return { message: 'erro verifique o console' };
  }
};

module.exports = {
  insertUser,
  getAllUsers,
};