import { IDatabaseProvider } from '../database';
import { IServiceProvider } from '../service/service-provider.types';

export interface IResolverContext {
  database: IDatabaseProvider
  service: IServiceProvider
}

export type ResolverFn<Args> = (parent: any, args: Args, ctx: IResolverContext) => any;

