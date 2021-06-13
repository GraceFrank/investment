import mongoose from "mongoose";

const BankDetailsSchema = new mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
      trim: true,
    },
    account_number: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 11,
      trim: true,
    },
    bank_name: {
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

export default mongoose.model("bank_details", BankDetailsSchema);
