import * as yup from 'yup';
import { CreateImageInputSchema, MarkImageAsUploadedInputSchema } from './images-graphql.validation';

export type CreateImageInput = yup.InferType<typeof CreateImageInputSchema>;

export type MarkImageAsUploadedInput = yup.InferType<typeof MarkImageAsUploadedInputSchema>;
