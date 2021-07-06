const { categorySchema } = require('../schema/CategorySchema');
const { postSchema, editingPostSchema } = require('../schema/PostSchema');
const { getTokenUser } = require('../utils/token');
const { categoryExists } = require('./validations');
const { BlogPosts } = require('../models');

const validateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    await categorySchema.validate({ name });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

const validatePost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    await postSchema.validate({ title, content, categoryIds });
    const exists = await categoryExists(req, res, next);
    if (!exists) {
      next();
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const validateEditPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    await editingPostSchema.validate({ title, content });
    if (req.body.categoryIds) {
      return res.status(400).json({ message: 'Categories cannot be edited' });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};

const verifyUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = getTokenUser(req.headers.authorization);
    const user = await BlogPosts.findOne({ where: { id } });
    if (userId !== user.userId) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  validateCategory,
  validatePost,
  validateEditPost,
  verifyUser,
};