import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  date_created: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (possiblePassword) {
  if (!possiblePassword) throw new Error('Senha nao fornecida');
  return bcrypt.compare(possiblePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  const secret = process.env.JWT_SECRET || process.env.JWT_KEY;
  if (!secret) {
    throw new Error('JWT secret is not configured');
  }

  return jwt.sign(
    { userId: this._id, email: this.email, role: this.role },
    secret,
    { expiresIn: '1h' }
  );
};

export default mongoose.model('User', userSchema);
