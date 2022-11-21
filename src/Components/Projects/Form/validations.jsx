import joi from 'joi';

const employeeValidation = joi.object({
  employee: joi.string().min(3).max(50).required(),
  role: joi.string().valid('DEV', 'QA', 'TL').required(),
  rate: joi.number().required()
});

export const schema = joi.object({
  name: joi
    .string()
    .alphanum()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Name must not contain special characters.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be no longer than 50 characters.',
      'string.pattern.base': 'Name must have only letters.',
      'string.empty': 'Name must not be an empty field.',
      'any.required': 'Name is required.'
    }),
  clientName: joi
    .string()
    .alphanum()
    .trim()
    .min(3)
    .max(50)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Client name must not contain special characters.',
      'string.min': 'Client name must be at least 3 characters long.',
      'string.max': 'Client name must be no longer than 50 characters.',
      'string.pattern.base': 'Client name must have only letters.',
      'string.empty': 'Client name must not be an empty field.',
      'any.required': 'Client name is required.'
    }),
  description: joi
    .string()
    .trim()
    .min(10)
    .max(50)
    .pattern(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.base': 'Description must be a text.',
      'string.empty': 'Description cannot be empty.',
      'string.min': 'Description must have at least 10 characters.',
      'string.max': 'Description must have under 50 characters.',
      'string.pattern.base':
        'Description cannot be composed of numbers or special characters only.',
      'any.required': 'Description is required.'
    }),
  startDate: joi.date().required().messages({
    'date.base': 'Start date must be correct & in a date format.',
    'date.empty': 'Start date cannot be empty.',
    'any.required': 'Start date is required.'
  }),
  endDate: joi.date().greater(joi.ref('startDate')).required().messages({
    'date.base': 'End date must be correct & in a date format.',
    'date.greater': 'End date must be greater than the starting date',
    'date.empty': 'End date cannot be empty.',
    'any.required': 'End date is required.'
  }),
  employees: joi.array().items(employeeValidation)
});

/*
const validateCreation = (req, res, next) => {
  const employeeValidation = joi.object({
    employee: joi.string().min(3).max(50).required(),
    role: joi.string().valid('DEV', 'QA', 'TL').required(),
    rate: joi.number().required(),
  });
  const projectValidation = joi.object({
    name: joi.string().min(3).max(50).required(),
    startDate: joi.date().required(),
    endDate: joi.date().greater(joi.ref('startDate')),
    description: joi.string().min(10).max(50).required(),
    clientName: joi.string().min(3).max(50).required(),
    active: joi.boolean().required(),
    employees: joi.array().items(employeeValidation),
  });
  */
