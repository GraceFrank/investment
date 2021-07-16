import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

export const userSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(255),
  phone: Joi.string().max(20).min(4),
  firstName: Joi.string().required().min(1).max(255),
  lastName: Joi.string().required().min(1).max(255),
  password: new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  }).required(),
});
