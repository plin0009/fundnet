import mongoose, { Schema } from "mongoose";

const TimeOfDay = {
  morning: String,
  afternoon: String,
  evening: String,
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

    homeOwner: String,
    autoOwner: String,
    student: String,
    veteran: String,
    pregnant: String,
    parent: String,
    physicalCondition: String,
    mentalCondition: String,

    employmentHours: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "OTHER"],
    },
    employmentStatus: {
      type: String,
      enum: ["EMPLOYEE", "WORKER", "SELF_EMPLOYED", "UNEMPLOYED", "OTHER"],
    },
    income: Number,

    location: {
      coords: [Number],
      name: String,
    },
    availability: {
      sun: TimeOfDay,
      mon: TimeOfDay,
      tue: TimeOfDay,
      wed: TimeOfDay,
      thu: TimeOfDay,
      fri: TimeOfDay,
      sat: TimeOfDay,
      sun: TimeOfDay,
    },
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
    bulletins: [Schema.Types.ObjectId],
    postings: [Schema.Types.ObjectId],
  })
);

export const Bulletin = mongoose.model(
  "Bulletin",
  new Schema({
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

      homeOwner: String,
      autoOwner: String,
      student: String,
      veteran: String,
      pregnant: String,
      parent: String,
      physicalCondition: String,
      mentalCondition: String,

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
  })
);

// job posting
export const Posting = mongoose.model(
  "Posting",
  new Schema({
    title: { type: String, required: true },
    creator: Schema.Types.ObjectId,
    description: String,
    website: String,
    filters: {
      // location, availability
      geofence: {
        coords: [Number],
        distance: Number,
      },
      availabilities: [
        {
          sun: TimeOfDay,
          mon: TimeOfDay,
          tue: TimeOfDay,
          wed: TimeOfDay,
          thu: TimeOfDay,
          fri: TimeOfDay,
          sat: TimeOfDay,
          sun: TimeOfDay,
        },
      ],
    },
  })
);
