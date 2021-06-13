import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
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
});

const profileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss", "Mr"],
      default: "Mr",
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
      enum: ["voters_card", "drivers_licence", "NIN", "passport"],
      required: true,
    },

    bvn: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
    address: {
      type: addressSchema,
      required: true,
    },

    isDeleted: { type: Boolean, default: false },

    role: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("profiles", profileSchema);
