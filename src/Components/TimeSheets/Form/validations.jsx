import joi from 'joi';

export const schema = joi.object({
  description: joi
    .string()
    .trim()
    .min(20)
    .max(100)
    .pattern(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.base': 'Description must be a text.',
      'string.empty': 'Description cannot be empty.',
      'string.min': 'Description must have at least 20 characters.',
      'string.max': 'Description must have under 100 characters.',
      'string.pattern.base':
        'Description cannot be composed of numbers or special characters only.',
      'any.required': 'Description is required.'
    }),

  hours: joi.number().integer().positive().greater(0).max(12).required().messages({
    'number.base': 'Hours must be a number.',
    'number.integer': 'Hours must be rounded (no decimal digits).',
    'number.positive': 'Hours must be positive numbers.',
    'number.greater': 'Hours must be grater than 0.',
    'number.max': 'Hours must not be greater than 12.',
    'number.pattern.base': 'Hours cannot be composed of numbers or special characters only.',
    'any.required': 'Hours are required.'
  }),
  date: joi.date().required().messages({
    'date.base': 'Date must be correct & in a date format.',
    'date.empty': 'Date cannot be empty.',
    'any.required': 'Date is required.'
  }),

  // Validations to check that a value has been selected in selectors
  task: joi.string().alphanum().required().messages({
    'string.alphanum': 'You must select a task.',
    'string.empty': 'Task must not be an empty field.',
    'any.required': 'Task is required.'
  }),
  employee: joi.string().alphanum().required().messages({
    'string.alphanum': 'You must select an employee.',
    'string.empty': 'Employee must not be an empty field.',
    'any.required': 'Employee is required.'
  }),
  project: joi.string().alphanum().required().messages({
    'string.alphanum': 'You must select a project.',
    'string.empty': 'Project must not be an empty field.',
    'any.required': 'Project is required.'
  })
});
