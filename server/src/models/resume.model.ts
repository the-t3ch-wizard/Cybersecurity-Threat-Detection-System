import { model, models, Schema } from "mongoose";

export const ResumeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  format: {
    type: String,
    required: true,
  },
  resourceType: {
    type: String,
    required: true,
  },
  bytes: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
})

export const Resume = models.Resume || model("Resume", ResumeSchema);
