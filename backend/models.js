import mongoose, { Schema } from "mongoose";

export const User = mongoose.model(
  "User",
  new Schema({
    handle: { type: String, required: true },
    pass: {
      type: String,
      required: true,
    },
    minAge: Number,
    maxAge: Number,
    employment: {
      hours: {
        type: String,
        enum: ["FULL_TIME", "PART_TIME", "UNEMPLOYED"],
      },
      status: {
        type: String,
        enum: ["EMPLOYEE", "WORKER", "SELF_EMPLOYED"],
      },
      income: Number,
    },
  })
);
