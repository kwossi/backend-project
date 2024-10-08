import { Schema, model } from "mongoose";
import { mixtapesSchema } from "./Mixtape.js";

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
    unique: true,
  },
  mixtapesList: [mixtapesSchema],
});

export default model("User", userSchema);
