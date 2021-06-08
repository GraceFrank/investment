import Joi from 'joi';

export const signupSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(255),
  phone: Joi.string().max(20).min(4).required(),
  firstName: Joi.string().required().min(1).max(255),
  lastName: Joi.string().required().min(1).max(255),
  password: Joi.string()
    .required()
    .max(255)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(255),
  password: Joi.string().required().max(255),
});

// Validation ensure that token was provided for email confirmation
export const verificationSchema = Joi.object({
  token: Joi.string().required().min(5).max(500),
});

// ensure that email to resend confirmation token to is valid
export const sendVerificationSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(500),
});
