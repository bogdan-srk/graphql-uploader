import AWS from 'aws-sdk';
import { IFilesStorage, IS3StorageSettings } from './files-storage.types';


export class S3FilesStorageService implements IFilesStorage {
  private readonly bucketName: string;
  private readonly iamUserKey: string;
  private readonly iamUserSecret: string;
  private readonly s3: AWS.S3;

  constructor({ bucketName, iamUserKey, iamUserSecret }: IS3StorageSettings) {
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
