import { Schema, model } from "mongoose";
import { mixtapesSchema } from "./Mixtape.js";
import bcryptjs from "bcryptjs";

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
  mixtapesList: [mixtapesSchema],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
  }
  next();
});

userSchema.pre("findbyIdAndUpdate", async function (next) {
  if (this._update && this._update.password) {
    this._update.password = await bcryptjs.hash(this._update.password, 12);
  }
  next();
});

userSchema.methods.isPasswordMatching = async function (inputPW, storedPW) {
  return await bcryptjs.compare(inputPW, storedPW);
};

export default model("User", userSchema);
