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
    .pattern(new RegExp('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'))
    .messages({
      'string.pattern':
        '"password" must contain a number, a string and be at least 8 characters',
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(255),
  password: Joi.string().required().max(255),
});

// ensure that email to resend confirmation token to is valid
export const sendMailSchema = Joi.object({
  email: Joi.string().email().required().min(5)
    .max(500),
});

export const changePasswordSchema = Joi.object({
  password: Joi.string()
    .required()
    .max(255)
    .pattern(new RegExp('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}'))
    .messages({
      'string.pattern':
        '"password" must contain a number, a string and be at least 8 characters',
    }),
});
