import { Knex } from 'knex';
import pool from '../pool';

interface CountResult {
  count: number;
}

type OrderBy<T> = {
  column: keyof T;
  order?: 'asc' | 'desc';
  nulls?: 'first' | 'last';
};

type ReturnedColumns<T> = (keyof T)[] | undefined;
interface RepositoryConfig<T, R> {
  readonly tableName: string;
  readonly returnedColumns?: ReturnedColumns<T>;
  readonly tableAlias?: string;
}

export abstract class Repository<T = any, R = any> {
  knex = pool.knex;

  public get tableName(): string {
    return this.repositoryConfig.tableName;
  }

  public get tableAlias(): string {
    return this.repositoryConfig.tableAlias || this.tableName.charAt(0);
  }

  public get returnedColumns(): ReturnedColumns<T> {
    return this.repositoryConfig.returnedColumns;
  }

  constructor(public repositoryConfig: RepositoryConfig<T, R>) {}
  getBuilder(): Knex.QueryBuilder<T> {
    return pool.knex({ [this.tableAlias]: this.tableName });
  }

  queryTable() {
    const query = this.getBuilder();

    if (this.returnedColumns) {
      query.column(this.returnedColumns);
    }

    return query;
  }

  mutateTable() {
    const query = this.getBuilder();

    return query;
  }

  async count(): Promise<number> {
    const { count } = await this.getBuilder().count().first<CountResult>();
    return count;
  }

  async findOne(where: Partial<T> = {}): Promise<T> {
    return this.getBuilder().select().where(where).first<T>() as Promise<T>;
  }

  async create(args: R): Promise<T> {
    const [project] = (await this.mutateTable().insert(args as any, this.returnedColumns as readonly string[])) as T[];
    return project;
  }

  async delete(where: Partial<T> = {}): Promise<T> {
    const [project] = await this.getBuilder()
      .where(where)
      .delete(this.returnedColumns as readonly string[]);
    return project;
  }

  async update(where: Partial<T> = {}, args: Partial<R> = {}): Promise<T> {
    const [project] = await this.getBuilder()
      .where(where)
      .update(args as any, this.returnedColumns as readonly string[]);
    return project;
  }

  async find({
    where,
    take,
    skip,
    orderBy,
  }: { where?: Partial<T>; take?: number; skip?: number; orderBy?: OrderBy<T>[] } = {}): Promise<T[]> {
    const query = this.queryTable().select();
    if (where) {
      query.where(where);
    }
    if (take) query.limit(take);
    if (skip) query.offset(skip);
    if (orderBy) query.orderBy(orderBy);
    return query;
  }
}
