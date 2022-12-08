import Joi from 'joi';

export const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email.',
      'string.empty': 'Email must not be an empty field.',
      'any.required': 'Email is required.'
    }),
  password: Joi.string()
    .alphanum()
    .trim()
    .min(8)
    .max(50)
    .pattern(/^[a-zA-Z0-9]{8,50}$/)
    .required()
    .messages({
      'string.alphanum': 'Password must not contain special characters.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be no longer than 50 characters.',
      'string.pattern.base': 'Password must contain letters and numbers.',
      'string.empty': 'Password must not be an empty field.',
      'any.required': 'Password is required.'
    })
});
