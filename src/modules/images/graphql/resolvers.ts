import { CreateImageInput, CreateImageInputSchema, MarkImageAsUploadedInput } from './types';
import { ImageModel } from '../../../database/images';
import Mongoose from 'mongoose';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { FilesStorage } from '../../../lib/files-storage';
import mime from 'mime-types';
import { ValidationError } from 'apollo-server';


export const imagesResolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    _dummy: () => {
      return 'success';
    }
  },
  Mutation: {
    createImage: async (_: any, { input }: {input: CreateImageInput}) => {
      await CreateImageInputSchema.validate(input, { abortEarly: false });

      const extension = input.filename.split('.').pop();
      const contentType = mime.contentType(input.filename) as string;
      const key = new Mongoose.Types.ObjectId().toHexString();

      if (contentType !== input.mimeType) {
        throw new ValidationError("Content type doesn't match extension");
      }

      const imageDoc = new ImageModel({
        originalName: input.filename.toLowerCase(),
        size: input.size,
        height: input.height,
        width: input.width,
        file: `${key}.${extension}`,
        mimeType: input.mimeType,
      });

      await imageDoc.save();

      return await FilesStorage.createPresignedPost({
        key: imageDoc.file,
        id: imageDoc._id,
      });
    },

    markImageAsUploaded: async (_: any, { input }: { input: MarkImageAsUploadedInput }) => {
      const imageDoc = await ImageModel.findOne({ _id: input.imageId });
      let updated = false;

      if (!imageDoc) {
        throw new ValidationError('Image not found');
      }
      if (!imageDoc.uploadedAt) {
        imageDoc.uploadedAt = new Date();
        await imageDoc.save();
        updated = true;
      }

      return updated;
    }
  },
};
