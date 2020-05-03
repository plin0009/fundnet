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

    homeOwner: Boolean,
    autoOwner: Boolean,
    student: Boolean,
    veteran: Boolean,
    pregnant: Boolean,
    parent: Boolean,
    physicalCondition: Boolean,
    mentalCondition: Boolean,

    employmentHours: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "OTHER"],
    },
    employmentStatus: {
      type: String,
      enum: ["EMPLOYEE", "WORKER", "SELF_EMPLOYED", "UNEMPLOYED", "OTHER"],
    },
    income: Number,
  })
);
