const User = require('../database/models/Users');
const {
  nameValidator,
  emailValidator,
  passwordValidator,
  tokenGenerator,
} = require('../utils/helpers');
const { UserAlreadyExists } = require('../utils/errors');

module.exports = {
  async create(request, response) {
    try {
      const { displayName, email, password, image } = request.body;
      const user = await User.findOne({ where: { email } });
      if (user) throw new UserAlreadyExists();
      nameValidator(displayName);
      emailValidator(email);
      passwordValidator(password);
      await User.create({ displayName, email, password, image });
      const accessToken = tokenGenerator(email);
      return response.status(201).send({ token: accessToken });
    } catch (err) {
      return response.status(err.statusCode).send({ message: err.message });
    }
  },
};