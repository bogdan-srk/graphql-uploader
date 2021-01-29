import { IDatabase } from '../core/database';
import { createGraphQLServer } from '../core/graphql';
import { ImagesResolvers, ImagesSchema } from '../modules/images/graphql';
import { IServiceProvider } from '../core/service';
import { ServiceProvider } from '../core/service';
import { IServerSettings } from './server-settings';

export class Server {
  readonly database: IDatabase;
  readonly service: IServiceProvider;
  readonly settings: IServerSettings;

  constructor(settings: IServerSettings, database: IDatabase) {
    this.settings = settings;
    this.database = database;
    this.service = new ServiceProvider(this.database.provider, settings);
  }

  async start(): Promise<void> {
    await this.startDatabase();
    await this.startGraphQLServer();
  }

  private async startDatabase(): Promise<void> {
    await this.database.connect(this.settings.mongoUri);
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
