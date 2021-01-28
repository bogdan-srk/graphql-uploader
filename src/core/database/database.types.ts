import { IDatabaseProvider } from './database-provider.types';

export interface IDatabase {
  provider: IDatabaseProvider

  connect(uri: string): Promise<void>
  disconnect(): Promise<void>
}
