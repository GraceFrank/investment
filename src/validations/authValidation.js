import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(255),
  phone: Joi.string().max(20).min(4).required(),
  firstName: Joi.string().required().min(1).max(255),
  lastName: Joi.string().required().min(1).max(255),
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});
