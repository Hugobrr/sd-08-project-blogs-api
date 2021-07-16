const userService = require('../services/userService');

const createUser = async (req, res) => {
  const { body } = req;
  const { status, response } = await userService.insertUser(body);
  return res.status(status).json(response);
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;
  const { status, response } = await userService.findAllUsers(authorization);
  return res.status(status).json(response);
};

module.exports = {
  createUser,
  getAllUsers,
};
