import * as yup from 'yup';

const ALLOWED_IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
const MAX_IMAGE_SIZE = 10000;

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


export type CreateImageInput = yup.InferType<typeof CreateImageInputSchema>;
export type MarkImageAsUploadedInput = yup.InferType<typeof MarkImageAsUploadedInputSchema>;
