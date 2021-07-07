const express = require('express');
const middlewares = require('../middlewares');
const CategoryController = require('../controllers/category');

const { categories: categoriesMiddlewares } = middlewares;

const router = express.Router();

router.post('/', categoriesMiddlewares.validationCategory,
middlewares.auth, CategoryController.create);

router.get('/', middlewares.auth, CategoryController.getAll);

module.exports = router;