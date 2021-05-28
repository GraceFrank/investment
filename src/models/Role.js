import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    title: {
      type: String, required: true, unique: true, lowercase: true
    },
  },
  { timestamps: true }
);

export default mongoose.model('roles', roleSchema);
