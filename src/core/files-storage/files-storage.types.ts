export interface IFilesStorage {
  createPresignedPost(fields: { [key: string]: string }): void
}

export interface IS3StorageSettings {
  bucketName: string
  iamUserKey: string
  iamUserSecret: string
}
