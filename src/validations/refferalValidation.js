import Joi from 'joi';

export const searchSchema = Joi.object({
  invested: Joi.string().optional().trim().valid('true', 'false'),
  paid: Joi.string().optional().trim().valid('true', 'false'),
  page: Joi.number().optional().min(1).default(1),
});
