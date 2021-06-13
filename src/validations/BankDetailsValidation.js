import Joi from 'joi';

export const bankDetailsSchema = Joi.object({
  account_name: Joi.string().required().min(1).max(255)
    .trim(),
  bank_name: Joi.string().required().min(1).max(255)
    .trim(),
  account_number: Joi.string()
    .pattern(/^[0-9]+$/, { name: 'numbers' })
    .required()
    .min(10)
    .max(11),
});
