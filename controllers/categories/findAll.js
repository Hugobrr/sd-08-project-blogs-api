const CategoryService = require('../../services/category');
const rescue = require('../../utils/rescue');

module.exports = rescue(async (_req, res, _next) => {
  const result = await CategoryService.findAll({ include: 'User' });
  res.status(200).json(result);
});