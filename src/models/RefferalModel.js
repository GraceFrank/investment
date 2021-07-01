import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema(
  {
    invested: {
      type: Boolean,
      require: true,
      default: false,
    },
    bonus: {
      type: Number,
      required: true,
      default: 0,
    },
    referrer: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    referee: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('referrals', ReferralSchema);
