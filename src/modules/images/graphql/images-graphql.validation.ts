import * as yup from 'yup';
import { ValidationError } from 'apollo-server-errors';
import { IImageDocument } from '../../../core/database/images';

export const ALLOWED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
export const MAX_IMAGE_SIZE = 10000;

export const CreateImageInputSchema = yup.object({
  filename: yup
    .string()
    .test('not-empty', 'Must be not empty', Boolean)
    .matches(new RegExp(`.+\.(${ ALLOWED_IMAGE_TYPES.join('|') })$`, 'i'))
    .required(),
  mimeType: yup
    .string()
    .test('not-empty', 'Must be not empty', Boolean)
    .matches(new RegExp(`^image\/(${ ALLOWED_IMAGE_TYPES.join('|') })$`, 'i'))
    .required(),
  size: yup
    .number()
    .positive()
    .integer()
    .max(MAX_IMAGE_SIZE)
    .required(),
  height: yup
    .number()
    .positive()
    .integer()
    .required(),
  width: yup
    .number()
    .required(),
});

export const MarkImageAsUploadedInputSchema = yup.object({
  imageId: yup
    .string()
    .test('not-empty', 'Must be not empty', Boolean)
    .required()
});

export const validateContentType = (contentType: string, inputMimeType: string) => {
  if (contentType !== inputMimeType) {
    throw new ValidationError("Content type doesn't match extension");
  }
};

export const validateImageDocExists = (imageDoc: IImageDocument | null) => {
  if (!imageDoc) {
    throw new ValidationError('Image not found');
  }
};
