import mongoose, { Schema } from "mongoose";
const bulletinSchema = {
  title: {
    type: String,
    required: true,
  },
  creator: Schema.Types.ObjectId,
  description: String,
  website: String,
  filters: {
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

    employmentHours: [
      {
        type: String,
        enum: ["FULL_TIME", "PART_TIME", "OTHER"],
      },
    ],
    employmentStatus: [
      {
        type: String,
        enum: ["EMPLOYEE", "WORKER", "SELF_EMPLOYED", "UNEMPLOYED", "OTHER"],
      },
    ],
    minIncome: Number,
    maxIncome: Number,
  },
};

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
    bulletins: [bulletinSchema],
  })
);

export const Org = mongoose.model(
  "Org",
  new Schema({
    handle: { type: String, required: true },
    pass: {
      type: String,
      required: true,
    },
    name: String,
    website: String,
    bulletins: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  })
);

export const Bulletin = mongoose.model("Bulletin", new Schema(bulletinSchema));
