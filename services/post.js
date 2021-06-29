const Joi = require('joi');
const { Error400, Error500, Error404, Error401 } = require('../errors');

const { BlogPost, Category, User } = require('../models');

const ERROR_500_MESSAGE = 'Internal Error';

const postDataSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const editPostDataSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const checkFields = (postData, schema) => {
  const { error } = schema.validate(postData);
  if (error) {
    const { message } = error.details[0];
    throw new Error400(message);
  }
};

const checkCategoryIds = async (categoryIds) => {
  let registeredCategories;
  try {
    registeredCategories = await Category.findAll();
  } catch (err) {
    throw new Error500(ERROR_500_MESSAGE);
  }

  const registeredCategoriesIds = registeredCategories.map((category) => category.id);
  const everyCategoryExists = categoryIds.every((id) =>
    registeredCategoriesIds.includes(id));
  if (!everyCategoryExists) throw new Error400('"categoryIds" not found');
};

const validateUser = async (postId, userId) => {
  let response;
  try {
    response = await BlogPost.findByPk(postId);
  } catch (err) {
    throw new Error500(ERROR_500_MESSAGE);
  }
  if (!response) throw new Error404('Post does not exist');
  const postWriterId = response.userId;
  if (postWriterId !== userId) throw new Error401('Unauthorized user');
};

const add = async (postData, userData) => {
  checkFields(postData, postDataSchema);
  await checkCategoryIds(postData.categoryIds);
  try {
    const { categoryIds, ...toAddPostDetails } = postData;
    console.log('pre create');
    const post = await BlogPost.create({
      ...toAddPostDetails,
      userId: userData.id,
      published: new Date(),
      updated: new Date(),
    });
    await post.addCategory(categoryIds, { through: {} });
    const { published, updated, ...showPostData } = post.toJSON();
    return showPostData;
  } catch (err) {
    // console.log(err);
    throw new Error500(ERROR_500_MESSAGE);
  }
};

const getAll = async () => {
  try {
    const response = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
    return response;
  } catch (err) {
    throw new Error500(ERROR_500_MESSAGE);
  }
};

const getById = async (id) => {
  let response;
  try {
    response = await BlogPost.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: { excludes: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    });
  } catch (err) {
    throw new Error500(ERROR_500_MESSAGE);
  }
  if (!response) throw new Error404('Post does not exist');
  return response;
};

const updateById = async (postId, newPostData, userId) => {
  if (newPostData.categoryIds) throw new Error400('Categories cannot be edited');
  checkFields(newPostData, editPostDataSchema);
  await validateUser(postId, userId);
  await BlogPost.update(
    { ...newPostData, updated: new Date() },
    { where: { id: postId } },
  );
  const response = await BlogPost.findOne({
    where: { id: postId },
    attributes: { exclude: ['published', 'updated'] },
    include: { model: Category, as: 'categories' },
  });
  return response;
};

module.exports = {
  add,
  getAll,
  getById,
  updateById,
};
