import mongoose from "mongoose";
import HashPassword from '../utils/bcrypt'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default: ''
  },
  apartment: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  }
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await HashPassword.hashPassword(this.password);
});

userSchema.virtual('id').get(function (this: { _id: any }) {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
})

const User = mongoose.model("User", userSchema);

export default User;