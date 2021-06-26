import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    amount_paid: {
      type: Number,
      required: true,
      min: 10000,
      max: 10000000,
    },
    amount_due: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [ 'active', 'pending', 'completed' ],
      required: 'true',
      default: 'pending',
    },

    duration: {
      type: Number,
      enum: [ 90, 180, 360 ],
      default: 90,
      required: true,
    },

    activation_date: {
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

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('investments', investmentSchema);
