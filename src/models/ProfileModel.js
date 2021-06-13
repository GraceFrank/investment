import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: [ 'Mr', 'Mrs', 'Miss', 'Mr' ],
      default: 'Mr',
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
      required: true,
    },

    bvn: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('profiles', profileSchema);
