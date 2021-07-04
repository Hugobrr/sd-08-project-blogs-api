const { StatusCodes } = require('http-status-codes');
const postService = require('../services/postService');

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAll();
    res.status(StatusCodes.OK).send(posts);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: 'erro ao solicitar requisição' });
  }
};
const getAddPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;

  const { id: userId } = req.user.dataValues;

  const post = await postService.add({ title, content, userId, categoryIds });
  if (post === 'CATEGORIES_NOT_FOUND') {
   return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: '"categoryIds" not found' });
  }

  res.status(StatusCodes.CREATED).json(post);
};

module.exports = {
  getAllPosts,
  getAddPost,
};
