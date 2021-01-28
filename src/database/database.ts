import Mongoose from 'mongoose';
import { IDatabaseProvider } from './database.types';
import { ImageModel } from './images';

let database: Mongoose.Connection;


export const connect = async (uri?: string): Promise<IDatabaseProvider> => {
  const connectionString = uri || 'mongodb://localhost:27017/images-upload';

  const provider: IDatabaseProvider = {
    ImageModel,
  };

  if (database) {
    return provider;
  }

  await Mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = Mongoose.connection;

  database.once('open', async () => {
    console.log('Connected to database');
  });

  database.on('error', () => {
    console.log('Error connecting to database');
  });

  return provider;
};

export const disconnect = async () => {
  if (!database) {
    return;
  }

  await Mongoose.disconnect();
};
