import Joi from 'joi';

export const profileSchema = Joi.object({
  title: Joi.string().valid('Mr', 'Mrs', 'Miss', 'Ms').required(),
  marital_status: Joi.string()
    .valid('single', 'married', 'widowed', 'divorced', 'separated')
    .required(),

  birthday: Joi.date().less('now').required(),
  nationality: Joi.string().required().min(1).max(255),
  mothers_maiden_name: Joi.string().required().min(1).max(255),
  bvn: Joi.string()
    .pattern(/^[0-9]+$/, { name: 'numbers' })
    .required()
    .min(11)
    .max(11),
  street_address: Joi.string().required().min(1).max(255)
    .trim(),
  street_address2: Joi.string().min(1).max(255).trim(),
  city: Joi.string().required().min(1).max(255)
    .trim(),
  state: Joi.string().required().min(1).max(255)
    .trim(),
  country: Joi.string().required().min(1).max(255)
    .trim(),
}).required();

export const uploadIdCardValidation = Joi.object({
  id_type: Joi.string()
    .valid('voters_card', 'drivers_licence', 'NIN', 'passport')
    .required(),
}).required();
