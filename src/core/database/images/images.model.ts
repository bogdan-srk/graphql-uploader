import { model } from "mongoose";
import { IImageDocument } from './images.types';
import { ImageSchema } from './images.schema';

export const ImageModel = model<IImageDocument>('image', ImageSchema);
