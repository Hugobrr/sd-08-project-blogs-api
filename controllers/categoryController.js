const rescue = require('express-rescue');
const categoriesService = require('../services/categoriesService');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const insertCategory = rescue(async (req, res, next) => {
  const { name } = req.body;
  const result = await categoriesService.insertCategory(name);

  if (result.err) return next(result);
  
  return res.status(CREATED_STATUS).json(result);
});

const getAllCategories = rescue(async (req, res, next) => {
  const result = await categoriesService.getAllCategories();

  if (result.err) return next(result);
  
  return res.status(OK_STATUS).json(result);
});

module.exports = {
  insertCategory,
  getAllCategories,
};