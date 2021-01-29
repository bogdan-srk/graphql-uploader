import { IImagesService, ImagesService } from '../../modules/images';
import { IDatabaseProvider } from '../database';
import { IServiceProvider } from './service-provider.types';
import { IFilesStorage, S3FilesStorageService } from '../files-storage';
import { IServerSettings } from '../../server/server-settings';

export class ServiceProvider implements IServiceProvider {
  readonly FilesStorageService: IFilesStorage;

  readonly ImagesService: IImagesService;

  constructor(database: IDatabaseProvider, settings: IServerSettings) {
    this.ImagesService = new ImagesService(database);
    this.FilesStorageService = new S3FilesStorageService(settings.s3);
  }
}
