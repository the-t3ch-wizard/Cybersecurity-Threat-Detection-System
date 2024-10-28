import { hash } from 'bcrypt';
import mongoose, { models } from 'mongoose';
import { Schema, model } from 'mongoose';

mongoose.Promise = global.Promise;

export const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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

export const User = models.User || model("User", UserSchema);
