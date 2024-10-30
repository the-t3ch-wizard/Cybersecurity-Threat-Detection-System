import { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { 
  timestamps: true,
})

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10)
  next();
})

export const User = model("User", UserSchema);
