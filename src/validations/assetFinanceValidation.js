import Joi from 'joi';

export const assetFinanceSchema = Joi.object({
  category: Joi.string()
    .valid('electronics', 'automobile', 'computing/phone', 'fashion', 'others')
    .required()
    .trim(),
  brand: Joi.string().required().min(1).max(255),
  amount: Joi.number().required().min(10000).max(10000000),
  status: Joi.string()
    .valid('active', 'pending', 'completed')
    .required()
    .default('pending'),

  vendor_name: Joi.string().required().min(1).max(255),
  vendor_email: Joi.string().min(1).max(255).email(),
  vendor_phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: 'numbers' })
    .required()
    .min(11)
    .max(11),
  vendor_address: Joi.object({
    street_address: Joi.string().required().min(1).max(255)
      .trim(),
    street_address2: Joi.string().min(1).max(255).trim(),
    city: Joi.string().required().min(1).max(255)
      .trim(),
    state: Joi.string().required().min(1).max(255)
      .trim(),
    country: Joi.string().required().min(1).max(255)
      .trim(),
  }),
});
