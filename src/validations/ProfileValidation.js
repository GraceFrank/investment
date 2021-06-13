import Joi from "joi";

export const signupSchema = Joi.object({
  title: Joi.string().valid("Mr", "Mrs", "Miss", "Mr").required(),
  birthday: Joi.date().less("now").required(),
  nationality: Joi.string().required().min(1).max(255),
  mothers_maiden_name: Joi.string().required().min(1).max(255),
  photo_url: Joi.string().uri().required(),
  id_type: Joi.string()
    .valid("voters_card", "drivers_licence", "NIN", "passport")
    .required(),
  bvn: Joi.string()
    .pattern(/^[0-9]+$/, { name: "numbers" })
    .required()
    .min(11)
    .max(11),
  id_card_url: Joi.string().uri().required(),
  address: Joi.object({
    street_address: Joi.string().required().min(1).max(255).trim(),
    street_address2: Joi.string().min(1).max(255).trim(),
    city: Joi.string().required().min(1).max(255).trim(),
    state: Joi.string().required().min(1).max(255).trim(),
    country: Joi.string().required().min(1).max(255).trim(),
  }),
});
