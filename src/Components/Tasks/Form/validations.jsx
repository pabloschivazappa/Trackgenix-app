import joi from 'joi';

export const schema = joi.object({
  description: joi
    .string()
    .trim()
    .min(10)
    .max(100)
    .pattern(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.base': 'Description must be a text.',
      'string.empty': 'Description cannot be empty.',
      'string.min': 'Description must have at least 10 characters.',
      'string.max': 'Description must have under 100 characters.',
      'string.pattern.base':
        'Description cannot be composed of numbers or special characters only.',
      'any.required': 'Description is required.'
    })
});
