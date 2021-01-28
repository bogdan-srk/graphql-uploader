import { IImagesService, ImagesService } from '../../modules/images';
import { IDatabaseProvider } from '../database';
import { IServiceProvider } from './service-provider.types';

export class ServiceProvider implements IServiceProvider {
  readonly ImagesService: IImagesService;

  constructor(database: IDatabaseProvider) {
    this.ImagesService = new ImagesService(database);
  }
}
