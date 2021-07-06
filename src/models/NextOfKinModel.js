import mongoose from "mongoose";

const NextOfKin = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
      trim: true,
    },

    relationship: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      trim: true,
    },

    isDeleted: { type: Boolean, default: false },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("next_of_kins", NextOfKin);
