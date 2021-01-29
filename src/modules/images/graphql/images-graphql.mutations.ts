import { CreateImageInput, MarkImageAsUploadedInput } from './images-graphql.types';
import {
  CreateImageInputSchema,
  MarkImageAsUploadedInputSchema,
  validateContentType,
  validateImageDocExists
} from './images-graphql.validation';
import mime from 'mime-types';
import { ResolverFn } from '../../../core/graphql';

export const createImage: ResolverFn<{ input: CreateImageInput }> = async (
  _,
  { input },
  { service },
) => {
  await CreateImageInputSchema.validate(input, { abortEarly: false });

  const contentType = mime.contentType(input.filename) as string;
  validateContentType(contentType, input.mimeType);

  const imageDoc = await service.ImagesService.createImage(
    input.filename,
    input.size,
    input.height,
    input.width,
    input.mimeType,
  );

  return service.FilesStorageService.createPresignedPost({
    key: imageDoc.file,
    id: imageDoc._id,
  });
};

export const markImageAsUploaded: ResolverFn<{ input: MarkImageAsUploadedInput }> = async (
  _,
  { input },
  { database, service }
) => {
  await MarkImageAsUploadedInputSchema.validate(input, { abortEarly: false });

  const imageDoc = await database.ImageModel.findOne({ _id: input.imageId });

  validateImageDocExists(imageDoc);

  return await service.ImagesService.markImageAsUploaded(imageDoc?._id);
};
