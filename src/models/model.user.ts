import mongoose from "mongoose";
import { UserDocument } from "../interface/IUser";
import HashPassword from '../pkg/bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

userSchema.pre<UserDocument>("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await HashPassword.hashPassword(this.password);
  });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;