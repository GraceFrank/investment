import Joi from 'joi';

export const investmentSchema = Joi.object({
  duration: Joi.number().required().valid(90, 180, 360),
  amount_paid: Joi.number().required().min(10000).max(10000000),
});
