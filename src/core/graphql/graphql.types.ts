import { IDatabaseProvider } from '../database';
import { IServiceProvider } from '../service';

export interface IResolverContext {
  database: IDatabaseProvider
  service: IServiceProvider
}

export type ResolverFn<Args> = (parent: any, args: Args, ctx: IResolverContext) => any;

