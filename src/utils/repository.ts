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

export interface FindProps<T> {
  where?: Partial<T>;
  take?: number;
  skip?: number;
  orderBy?: OrderBy<T>[];
}

const CHUCK_SIZE = 1000;

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

  public get table() {
    return { [this.tableAlias]: this.tableName };
  }

  constructor(public repositoryConfig: RepositoryConfig<T, R>) {}

  getBuilder(): Knex.QueryBuilder<T> {
    return pool.knex(this.table);
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

  findOne(where: Partial<T> = {}): Knex.QueryBuilder<T> {
    return this.getBuilder().select().where(where).first<T>();
  }

  async create(args: R): Promise<T> {
    const [project] = (await this.mutateTable().insert(args as any, this.returnedColumns as readonly string[])) as T[];
    return project;
  }
  /**
   * @link https://knexjs.org/#Utility-BatchInsert
   * @param args array of arguments that required to create a row
   * @returns rows
   */
  async bulkCreate(args: R[]): Promise<T[]> {
    return pool.knex
      .batchInsert<R>(this.tableName, args as any, CHUCK_SIZE)
      .returning<T[]>(this.returnedColumns as any) as Promise<T[]>;
  }

  async delete(where: Partial<T> = {}): Promise<T> {
    const [project] = await this.getBuilder()
      .where(where)
      .delete(this.returnedColumns as readonly string[]);
    return project;
  }

  async bulkDelete(column: keyof T, values: any[]) {
    return this.mutateTable()
      .whereIn(column as any, values as any)
      .delete();
  }

  async update(where: Partial<T> = {}, args: Partial<R> = {}): Promise<T> {
    const [project] = await this.getBuilder()
      .where(where)
      .update(args as any, this.returnedColumns as readonly string[]);
    return project;
  }

  find({ where, take, skip, orderBy }: FindProps<T> = {}): Knex.QueryBuilder<T> {
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
