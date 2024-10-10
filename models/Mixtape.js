import { Schema } from "mongoose";

const mixtapeItemSchema = new Schema({
  title: String,
  artist: String,
  url: String,
  thumbnail: String,
  isToggled: { type: Boolean, default: true },
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
});
