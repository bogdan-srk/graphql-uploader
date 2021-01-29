import * as path from "path";
import yargs = require('yargs');
import { IS3StorageSettings } from '../core/files-storage';


export interface IServerSettings {
  mongoUri: string
  s3: IS3StorageSettings
}

export class ServerSettings implements IServerSettings {
  public readonly mongoUri: string;
  public readonly s3: IS3StorageSettings;

  constructor() {
    const argv: Record<string, any> = yargs(process.argv.splice(2)).argv;
    const settings = require(path.resolve(__dirname, '../../', argv.settings));

    this.mongoUri = settings.mongoUri;
    this.s3 = settings.s3;
  }
}
