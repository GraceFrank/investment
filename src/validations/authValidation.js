import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

export const signupSchema = Joi.object({
  email: Joi.string().email().required().min(5).max(255),
  phone: Joi.string().max(20).min(4).required(),
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

export const loginSchema = Joi.object({
  email: Joi.string().email().required().min(5).max(255),
  password: Joi.string().required().max(255),
});

// ensure that email to resend confirmation token to is valid
export const sendMailSchema = Joi.object({
  email: Joi.string().email().required().min(5).max(500),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().max(255).required(),
  newPassword: new PasswordComplexity({
    required: true,
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  }).required(),
});

export const forgotPasswordSchema = Joi.object({
  newPassword: new PasswordComplexity({
    min: 8,
    max: 25,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  }).required(),
});
