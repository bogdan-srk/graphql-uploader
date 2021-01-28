import { IDatabaseProvider } from './database-provider.types';
import { IImageModel, ImageModel } from './images';

export class DatabaseProvider implements IDatabaseProvider {
  public ImageModel: IImageModel;

  constructor() {
    this.ImageModel = ImageModel
  }
}
