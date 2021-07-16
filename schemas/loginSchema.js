const validations = require('../helpers/validations');
const statusCode = require('../helpers/statusCode');
const errors = require('../helpers/errors');
const { User } = require('../models');

const result = (status, response) => ({ status, response });

const incompleteData = (data) => {
  const { isBlank } = validations;
  const { badRequest } = statusCode;
  const { noEmail, noPassword, emptyEmail, emptyPassword } = errors;

  if (isBlank(data.email)) return result(badRequest, emptyEmail);
  if (isBlank(data.password)) return result(badRequest, emptyPassword);
  if (!data.email) return result(badRequest, noEmail);
  if (!data.password) return result(badRequest, noPassword);

  return null;
};

const validUser = async (data) => {
  const { isWrongPassword } = validations;
  const { badRequest } = statusCode;
  const { invalidFields } = errors;

  const { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (!user) return result(badRequest, invalidFields);

  const { dataValues } = user;
  if (isWrongPassword(password, dataValues.password)) {
    return result(badRequest, invalidFields);
  }

  return dataValues;
};

module.exports = {
  incompleteData,
  validUser,
};