const express = require('express');
const postController = require('../controllers/postController');

const postRouter = express.Router();
postRouter.post('/', postController.createPost);
postRouter.get('/', postController.getAllPosts);

module.exports = postRouter;
