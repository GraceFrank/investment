import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: [ 'Mr', 'Mrs', 'Miss', 'Ms' ],
      default: 'Mr',
    },

    marital_status: {
      type: String,
      enum: [ 'single', 'married', 'widowed', 'divorced', 'separated' ],
      default: 'single',
    },

    birthday: {
      type: Date,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },
    mothers_maiden_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    photo_url: { type: String, minlength: 7, maxlength: 255 },
    id_card_url: { type: String, minlength: 7, maxlength: 255 },
    id_type: {
      type: String,
      enum: [ 'voters_card', 'drivers_licence', 'NIN', 'passport' ],
    },

    bvn: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
    street_address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    street_address2: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    isDeleted: { type: Boolean, default: false },

    status: {
      type: String,
      enum: [ 'approved', 'declined', 'pending' ],
      default: 'pending',
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('profiles', profileSchema);
