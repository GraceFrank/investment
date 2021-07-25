import Joi from 'joi';

export const assetFinanceSchema = Joi.object({
  category: Joi.string()
    .valid('electronics', 'automobile', 'computing/phone', 'fashion', 'others')
    .required()
    .trim(),
  brand: Joi.string().required().min(1).max(255),
  model: Joi.string().required().min(1).max(255),
  cost: Joi.number().required().min(10000).max(10000000),
  vendor_name: Joi.string().required().min(1).max(255),
  vendor_email: Joi.string().min(1).max(255).email(),
  vendor_phone: Joi.string()
    .pattern(/^\+[0-9]+$/, { name: 'numbers' })
    .required()
    .min(4)
    .max(15),
  vendor_website: Joi.string().uri(),
  vendor_street_address: Joi.string().required().min(1).max(255)
    .trim(),
  vendor_street_address2: Joi.string().min(1).max(255).trim(),
  vendor_city: Joi.string().required().min(1).max(255)
    .trim(),
  vendor_state: Joi.string().required().min(1).max(255)
    .trim(),
  vendor_country: Joi.string().required().min(1).max(255)
    .trim(),
}).required();

export const approvalSchema = Joi.object({
  status: Joi.string().valid('active', 'declined').required().trim(),
  decline_reason: Joi.string()
    .min(5)
    .max(255)
    .trim()
    .when('status', { is: 'declined', then: Joi.required() }),
}).required();

export const markAsPaidSchema = Joi.object({
  paymentStatus: Joi.string().valid('paid', 'declined').required().trim(),
}).required();
