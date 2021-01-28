import { IImagesService } from '../../modules/images/service';

export interface IServiceProvider {
  readonly ImagesService: IImagesService,
}
