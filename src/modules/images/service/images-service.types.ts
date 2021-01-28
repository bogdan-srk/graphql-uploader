import { IImageDocument } from '../../../core/database/images';

export interface IImagesService {
  createImage(
    originalName: string,
    size: number,
    height: number,
    width: number,
    mimeType: string,
  ): Promise<IImageDocument>

  markImageAsUploaded(id: string): Promise<boolean>
}
