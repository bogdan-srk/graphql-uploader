import { IImagesService } from '../../modules/images/service';
import { IFilesStorage } from '../files-storage';

export interface IServiceProvider {
  readonly ImagesService: IImagesService,
  readonly FilesStorageService: IFilesStorage,
}
