import Joi from "joi";

export const nextOfKinSchema = Joi.object({
  full_name: Joi.string().required().min(1).max(255).trim(),
  relationship: Joi.string().required().min(1).max(255).trim(),
  email: Joi.string().required().min(1).max(255).trim().email(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: "numbers" })
    .required()
    .min(5)
    .max(11),
});
