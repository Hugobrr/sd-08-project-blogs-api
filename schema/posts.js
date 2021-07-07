const joi = require('joi');

module.exports = joi.object({
  title: joi
    .string()
    .required(),
  content: joi
    .string()
    .required(),
  categoryIds: joi
    .array()
    .items(joi
      .number()
      .integer())
    .required(),
})
  .messages({
    'any.required': '{#label} is required',
  });