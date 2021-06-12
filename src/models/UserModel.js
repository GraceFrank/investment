import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      lowercase: true,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },
    password: { type: String, require: true, maxlength: 255 },
    account_id: {
      type: String,
      required: true,
      maxlength: 45,
      unique: true,
    },

    role: {
      type: String,
      enum: [ 'superAdmin', 'admin', 'user' ],
      default: 'user',
    },

    isDeleted: { type: Boolean, default: false },
    verified_phone: { type: Boolean, default: false },
    verified_email: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function (details) {
  const secret = process.env.PRIVATE_KEY;
  const payload = details
    ? details.data
    : { account_id: this.account_id, role: this.role };
  const expiresIn = details ? details.expires : '2d';
  return jwt.sign(
    {
      ...payload,
    },
    secret,
    { expiresIn }
  );
};

userSchema.methods.validatePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};

// generate account Id before saving
userSchema.pre('validate', function (next) {
  if (this.account_id) return next();
  this.account_id = nanoid(6);
  return next();
});

// hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  return next();
});

export default mongoose.model('users', userSchema);
