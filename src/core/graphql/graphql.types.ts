import { IDatabaseProvider } from '../database';

export interface IResolverContext {
  database: IDatabaseProvider
}

export type ResolverFn<Args> = (parent: any, args: Args, ctx: IResolverContext) => any;

