import { IDatabase } from '../core/database';
import { createGraphQLServer } from '../core/graphql';
import { ImagesResolvers, ImagesSchema } from '../modules/images/graphql';
import { IServiceProvider } from '../core/service';
import { ServiceProvider } from '../core/service';

const MONGO_URI =  'mongodb://localhost:27017/images-upload';

interface IServerSettings {
  database: IDatabase
}

export class Server {
  readonly database: IDatabase;
  readonly service: IServiceProvider;

  constructor(settings: IServerSettings) {
    this.database = settings.database;
    this.service = new ServiceProvider(this.database.provider);
  }

  async start(): Promise<void> {
    await this.startDatabase();
    await this.startGraphQLServer();
  }

  private async startDatabase(): Promise<void> {
    await this.database.connect(MONGO_URI);
  }

  private async startGraphQLServer(): Promise<void> {
    const { url } = await createGraphQLServer(
      this.database.provider,
      this.service,
      [ ImagesSchema ],
      [ ImagesResolvers ],
    );
    console.log(`Graphql Server started at ${url}`);
  }
}
