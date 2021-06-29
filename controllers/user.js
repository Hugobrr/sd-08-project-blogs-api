const user = require('../services/user');
const { STATUS } = require('../config/messages');

const createUser = async (req, res) => {
  const { body } = req;
  
  try {
    const result = await user.createUser(body);
    res.status(STATUS.created).json(result);
  } catch (error) {
    let code = STATUS.badRequest;
    if (error.message === 'User already registered') code = STATUS.conflict;

    console.log(error);
    res.status(code).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await user.getAllUsers();
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.unauthorized).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await user.getUserById(id);
    res.status(STATUS.ok).json(result);
  } catch (error) {
    console.log(error);
    res.status(STATUS.notFound).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};