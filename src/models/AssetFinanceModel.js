import mongoose from 'mongoose';

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

    model: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      trim: true,
    },

    amount_paid: {
      type: Number,
      required: true,
    },

    cost: {
      type: Number,
      required: true,
      min: 10000,
      max: 10000000,
    },

    status: {
      type: String,
      enum: [ 'active', 'pending', 'completed', "declined" ],
      required: 'true',
      default: 'pending',
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

    vendor_street_address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    vendor_city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },

    vendor_state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    vendor_country: {
      type: String,
      // required: true,
      trim: true,
      maxlength: 255,
    },

    duration: {
      type: Number,
      default: 90,
      required: true,
    },

    activation_date: {
      type: Date,
    },
    due_date: {
      type: Date,
    },

    payment_proof: {
      url: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
      },

      public_id: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
      },
    },
    decline_reason: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },

    proforma_invoice: {
      url: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
      },

      public_id: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
      },
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('assets', AssetFinanceSchema);
