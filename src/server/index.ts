import { IDatabase } from '../core/database';
import { createGraphQLServer } from '../core/graphql';

const MONGO_URI =  'mongodb://localhost:27017/images-upload';

interface IServerSettings {
  database: IDatabase
}

export class Server {
  database: IDatabase;

  constructor(settings: IServerSettings) {
    this.database = settings.database;
  }

  async start(): Promise<void> {
    await this.startDatabase();
    await this.startGraphQLServer();
  }

  private async startGraphQLServer(): Promise<void> {
    const { url } = await createGraphQLServer(this.database.provider);
    console.log(`Graphql Server started at ${url}`);
  }

  private async startDatabase(): Promise<void> {
    await this.database.connect(MONGO_URI);
  }
}
