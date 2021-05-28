import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import nanoId from 'nanoid';
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
    password: { type: String, require: true, maxlength: 255 },
    account_id: {
      type: String, required: true, maxlength: 45, unique: true
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'roles',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = function () {
  const secret = process.env.PRIVATE_KEY;
  return jwt.sign({
    secret,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    data: { account_id: this.account_id, role: this.role },
  });
};

userSchema.methods.validatePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};

// generate account Id before saving
userSchema.pre('save', function (next) {
  this.account_id = nanoId(6);
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
