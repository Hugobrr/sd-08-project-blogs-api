const { Category } = require('../models');

const BAD_REQUEST = 400;

const validateName = (displayName) => {
    if (displayName.length < 8) return '"displayName" length must be at least 8 characters long';
    return false;
  };
  
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    if (!email) return '"email" is required';
    if (!regex.test(email)) return '"email" must be a valid email';
    return false;
  };

  const emailIsValid = (email) => {
    if (email === '') return '"email" is not allowed to be empty';
    if (!email) return '"email" is required';
    return false;
  };

  const passwordIsValid = (password) => {
    if (password === '') return '"password" is not allowed to be empty';
    if (!password) return '"password" is required';
    return false;
  };
  
  const validatePassword = (password) => {
    if (!password) return '"password" is required';
    if (password.length < 6) return '"password" length must be 6 characters long';
    return false;
  };

const userValidation = (req, res, next) => {
    const { displayName, email, password } = req.body;
    const validation = validateName(displayName) || validateEmail(email)
    || validatePassword(password) || false;
    if (validation) return res.status(BAD_REQUEST).json({ message: validation });
    next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const validate = emailIsValid(email) || passwordIsValid(password) || false;
  if (validate) return res.status(BAD_REQUEST).json({ message: validate });
  next();
};

const titleValidation = (title) => {
  if (!title) return '"title" is required';
  return false;
};

const contentValidation = (content) => {
  if (!content) return '"content" is required';
  return false;
};

const categoryIdsValidation = (categoryIds) => {
  if (!categoryIds) return '"categoryIds" is required';
  return false;
};

const postValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const validation = titleValidation(title) || contentValidation(content)
    || categoryIdsValidation(categoryIds) || false;
  if (validation) return res.status(BAD_REQUEST).json({ message: validation });
  next();
};

const categoryValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const categories = await Category.findAll();
  const idsFromCategories = categories.map(({ id }) => id);
  for (let i = 0; i < categoryIds.length; i += 1) {
    if (!idsFromCategories.includes(categoryIds[i])) {
      return res.status(BAD_REQUEST).json({ message: '"categoryIds" not found' });
    }
  }
  next();
};

module.exports = {
    userValidation,
    loginValidation,
    postValidation,
    categoryValidation,
};