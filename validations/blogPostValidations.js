const joi = require('joi');
const ErrorMessages = require('../messages/errorMessages');
const StatusCode = require('../messages/statusCodeMessages');
const CustomError = require('../error/customError');
const { Categorie, BlogPost } = require('../models');

// https://joi.dev/api/?v=17.4.0
const validateSchemaNewPost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
  userId: joi.number().required(),
});

const validateSchemaUpdateBlogPost = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

const validateNewBlogPost = (blogPost, userId) => {
  const { title, content, categoryIds } = blogPost;
  const { error } = validateSchemaNewPost.validate({ title, content, categoryIds, userId });

  if (error) {
    const { details: [{ message }] } = error;
    throw new CustomError(
      message,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateUpdateBlogPost = (blogPost) => {
  const { title, content } = blogPost;
  const { error } = validateSchemaUpdateBlogPost.validate({ title, content });

  if (error) {
    const { details: [{ message }] } = error;
    throw new CustomError(
      message,
      StatusCode.BAD_REQUEST,
    );
  }
};

// https://stackoverflow.com/questions/47546824/sequelize-configuration-to-retrieve-total-count-with-details
const validateAllCategoriesExists = async (categoriesIds) => {
  const totalCategoriesFound = await Categorie.count({
    where: { id: categoriesIds },
  });

  if (totalCategoriesFound !== categoriesIds.length) {
    throw new CustomError(
      ErrorMessages.categoryNotFound,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateBlogPostExists = async (blogPostId) => {
  const blogPostFound = await BlogPost.findByPk(blogPostId, {
    include: [
        { association: 'user' },
        { association: 'categories', through: { attributes: [] } },
      ],
  });

  if (!blogPostFound) {
    throw new CustomError(
      ErrorMessages.blogPostNotExist,
      StatusCode.NOT_FOUND,
    );
  }

  return blogPostFound;
};

const validateTryUpdateBlogPostCategories = (categoryIds) => {
  if (categoryIds) {
    throw new CustomError(
      ErrorMessages.blogPostCategoryNotUpdate,
      StatusCode.BAD_REQUEST,
    );
  }
};

const validateOwnUser = async (id, reqUserId) => {
  const { userId } = await BlogPost.findByPk(id);
  
  if (String(reqUserId) !== String(userId)) {
    throw new CustomError(
      ErrorMessages.userNotUnauthorized,
      StatusCode.UNAUTHORIZED,
    );
  }
};

module.exports = {
  validateNewBlogPost,
  validateUpdateBlogPost,
  validateAllCategoriesExists,
  validateBlogPostExists,
  validateTryUpdateBlogPostCategories,
  validateOwnUser,
};
