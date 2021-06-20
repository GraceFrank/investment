import mongoose from 'mongoose';
import { addressSchema } from './ProfileModel';

const AssetFinanceSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        'electronics',
        'automobile',
        'computing/phone',
        'fashion',
        'others',
      ],
      required: 'true',
    },

    brand: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [ 'active', 'pending', 'completed' ],
      required: 'true',
    },

    vendor_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },

    vendor_email: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    vendor_phone: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },

    vendor_address: addressSchema,

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('assets', AssetFinanceSchema);
