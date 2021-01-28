import { Schema } from 'mongoose';

export const ImageSchema = new Schema({
  originalName: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
  },
  file: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});
