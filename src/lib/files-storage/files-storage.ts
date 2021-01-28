import AWS from 'aws-sdk';
import { IFilesStorage, IStorageSettings } from './files-storage.types';


export class S3FilesStorageService implements IFilesStorage {
  private readonly bucketName: string;
  private readonly iamUserKey: string;
  private readonly iamUserSecret: string;
  private readonly s3: AWS.S3;

  constructor({ bucketName, iamUserKey, iamUserSecret }: IStorageSettings) {
    this.bucketName = bucketName;
    this.iamUserKey = iamUserKey;
    this.iamUserSecret = iamUserSecret;

    this.s3 = new AWS.S3({
      signatureVersion: 'v4',
      region: 'us-east-2',
      accessKeyId: this.iamUserKey,
      secretAccessKey: this.iamUserSecret,
    });
  }

  async createPresignedPost(fields: { [key: string]: string }): Promise<AWS.S3.PresignedPost> {
    return new Promise<AWS.S3.PresignedPost>((resolve, reject) => {
      const params = {
        Bucket: this.bucketName,
        Fields: fields,
      };

      this.s3.createPresignedPost(params, (error, presignedPost) => {
        if (error) {
          reject(error);
        } else {
          resolve(presignedPost);
        }
      });
    });
  }
}

export const FilesStorage = new S3FilesStorageService({
  bucketName: 'graphql-images-test',
  iamUserKey: 'AKIAWMKOAWUBY4W5A47P',
  iamUserSecret: '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',
});
