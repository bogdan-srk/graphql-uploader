import Mongoose from 'mongoose';
import { IDatabase } from './database.types';
import { IDatabaseProvider } from './database-provider.types';
import { DatabaseProvider } from './database-provider';


export class Database implements IDatabase {
  public provider: IDatabaseProvider;

  private connection?: Mongoose.Connection;

  constructor() {
    this.connection = undefined;
    this.provider = new DatabaseProvider();
  }

  async connect(uri: string): Promise<void> {
    const connectionString = uri;

    if (this.connection) {
      return;
    }

    await Mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.connection = Mongoose.connection;

    this.connection.once('open', async () => {
      console.log('Connected to database');
    });

    this.connection.on('error', () => {
      console.log('Error connecting to database');
    });
  }

  async disconnect(): Promise<void> {
    if (!this.connection) {
      return
    }

    await Mongoose.disconnect()
  }
}
