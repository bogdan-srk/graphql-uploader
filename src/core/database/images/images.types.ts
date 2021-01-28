import { Document, Model } from "mongoose";

export interface IImage {
  originalName: string
  size: number
  height: number
  width: number
  mimeType: string
  file: string
  uploadedAt?: Date
}

export interface IImageDocument extends IImage, Document {}

export interface IImageModel extends Model<IImageDocument> {}
