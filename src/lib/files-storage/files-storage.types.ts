export interface IFilesStorage {
  createPresignedPost(fields: { [key: string]: string }): void
}

export interface IStorageSettings {
  [key: string]: string
}
