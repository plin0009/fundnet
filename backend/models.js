import mongoose, { Schema } from "mongoose";

export const User = mongoose.model(
  "User",
  new Schema({
    handle: { type: String, required: true },
    pass: {
      type: String,
      required: true,
    },
  })
);
