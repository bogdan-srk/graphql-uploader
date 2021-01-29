import { IImagesService } from './images-service.types';
import { IDatabaseProvider, IImageDocument } from '../../../core/database';
import Mongoose from "mongoose";

export class ImagesService implements IImagesService {
  private readonly database: IDatabaseProvider;

  constructor(database: IDatabaseProvider) {
    this.database = database;
  };

  async createImage(
    filename: string,
    size: number,
    height: number,
    width: number,
    mimeType: string
  ): Promise<IImageDocument> {
    const key = new Mongoose.Types.ObjectId().toHexString();
    const extension = filename.split('.').pop();
    const imageDoc = new this.database.ImageModel({
      originalName: filename,
      size: size,
      height: height,
      width: width,
      file: `${ key }.${ extension }`,
      mimeType: mimeType,
    });

    await imageDoc.save();

    return imageDoc;
  }

  async markImageAsUploaded(id: string): Promise<boolean> {
    await this.database.ImageModel.updateOne({
      _id: id
    }, {
      $set: { uploadedAt: new Date()
    }});

    return true;
  }
}
