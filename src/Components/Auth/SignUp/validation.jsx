import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Name must not contain numbers or special characters.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be no longer than 50 characters.',
      'string.pattern.base': 'Name must have only letters.',
      'string.empty': 'Name must not be an empty field.',
      'any.required': 'Name is required.'
    }),
  lastName: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Last name must not contain numbers or special characters.',
      'string.min': 'Last name must be at least 3 characters long.',
      'string.max': 'Last name must be no longer than 50 characters.',
      'string.pattern.base': 'Last name must have only letters.',
      'string.empty': 'Last name must not be an empty field.',
      'any.required': 'Last name is required.'
    }),
  phone: Joi.number().min(10000000).max(999999999999999).required().messages({
    'number.base': 'Phone must be a number.',
    'number.min': 'Phone must be at least 8 numbers long.',
    'number.max': 'Phone must be no longer than 15 numbers.',
    'number.unsafe': 'Phone must be no longer than 15 numbers.',
    'number.empty': 'Phone must not be an empty field.',
    'any.required': 'Phone is required.'
  }),
  dni: Joi.number().min(100000).max(999999999999).required().messages({
    'number.base': 'DNI must be a number.',
    'number.min': 'DNI must be at least 6 numbers long.',
    'number.max': 'DNI must be no longer than 12 numbers.',
    'number.unsafe': 'DNI must be no longer than 12 numbers.',
    'number.empty': 'DNI must not be an empty field.',
    'any.required': 'DNI is required.'
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.email': 'Invalid email (must end in .com or .net).',
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
