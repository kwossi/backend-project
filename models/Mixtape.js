import { Schema, model } from "mongoose";

const mixtapeItemSchema = new Schema({
  title: String,
  artist: String,
  url: String,
  thumbnail: String,
});

export const mixtapesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  playlist: [mixtapeItemSchema],
  isToggled: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: false },
});

export default model("Mixtape", mixtapesSchema);
