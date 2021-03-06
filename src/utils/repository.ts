import { Knex } from 'knex';
import pool from '../pool';
import { FilterArgs } from '../types/common';

interface CountResult {
  count: number;
}

type OrderBy<T> = {
  column: keyof T;
  order?: 'asc' | 'desc';
  nulls?: 'first' | 'last';
};

type ReturnedColumns<T> = (keyof T)[] | undefined;
interface RepositoryConfig<T, C> {
  readonly tableName: string;
  readonly returnedColumns?: ReturnedColumns<T>;
  readonly tableAlias?: string;
}

export interface FindProps<T> {
  where?: Partial<T>;
  limit?: number;
  offset?: number;
  orderBy?: OrderBy<T>[];
  filter?: FilterArgs<T>;
}

const CHUCK_SIZE = 1000;

export abstract class Repository<T = any, C = any, U = any> {
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

  constructor(public repositoryConfig: RepositoryConfig<T, C>) {}

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

  findOne(where: Partial<T> = {}): Knex.QueryBuilder<T> {
    return this.getBuilder().select().where(where).first<T>();
  }

  async create(args: C): Promise<T> {
    const [project] = (await this.mutateTable().insert(args as any, this.returnedColumns as readonly string[])) as T[];
    return project;
  }
  /**
   * @link https://knexjs.org/#Utility-BatchInsert
   * @param args array of arguments that required to create a row
   * @returns rows
   */
  async bulkCreate(args: C[]): Promise<T[]> {
    return pool.knex
      .batchInsert<C>(this.tableName, args as any, CHUCK_SIZE)
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

  async update(where: Partial<T> = {}, args: Partial<U> = {}): Promise<T> {
    const [project] = await this.getBuilder()
      .where(where)
      .update(args as any, this.returnedColumns as readonly string[]);
    return project;
  }

  handleFilter(query: Knex.QueryBuilder<T>, filter: FindProps<T>['filter']) {
    if (filter)
      filter.forEach(({ field, value }) => {
        query.whereILike(field as string, pool.knex.raw('?', `%${value.trim()}%`));
      });
  }

  find({ where, offset, limit, orderBy, filter }: FindProps<T> = {}): Knex.QueryBuilder<T, T[]> {
    const query = this.queryTable().select();
    if (where) {
      query.where(where);
    }
    this.handleFilter(query, filter);
    if (limit) query.limit(limit);
    if (offset) query.offset(offset);
    if (orderBy) query.orderBy(orderBy);
    return query;
  }

  async count(countColumn?: keyof T, queryBuilder?: Knex.QueryBuilder<T>): Promise<number> {
    const query = queryBuilder?.clone() ?? this.getBuilder();
    query.clear('offset').clear('limit').clear('columns');
    query.count(countColumn ?? 'id').first();
    const { count } = await query.count();
    return count;
  }
}
