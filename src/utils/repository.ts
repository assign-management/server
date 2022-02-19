import { Knex } from 'knex';
import pool from '../pool';
import { ValidateFunction, ValidationFunctions } from './validation';

interface CountResult {
  count: number;
}

type OrderBy<T> = {
  column: keyof T;
  order?: 'asc' | 'desc';
  nulls?: 'first' | 'last';
};

export interface RepositoryValidationFunctions extends ValidationFunctions {
  create: ValidateFunction;
  update: ValidateFunction;
  where: ValidateFunction;
}

export abstract class Repository<T = any, P = any> {
  knex = pool.knex;
  constructor(
    protected readonly tableName: string,
    protected readonly returnedColumns: (keyof T)[],
    protected readonly validationFunctions: RepositoryValidationFunctions,
    protected readonly tableAlias: string = tableName[0],
  ) {}

  getBuilder(): Knex.QueryBuilder<T> {
    return pool.knex({ [this.tableAlias]: this.tableName });
  }

  queryTable() {
    return this.getBuilder().column(this.returnedColumns);
  }

  async count(): Promise<number> {
    const { count } = await this.getBuilder().count().first<CountResult>();
    return count;
  }

  async findOne(where: Partial<T> = {}): Promise<T> {
    if (where) this.validationFunctions.where(where);
    return this.getBuilder().select().where(where).first<T>() as Promise<T>;
  }

  async create(args: P): Promise<T> {
    this.validationFunctions.create(args);
    const [project] = (await this.getBuilder().insert(args as any, this.returnedColumns as readonly string[])) as T[];
    return project;
  }

  async delete(where: Partial<T> = {}): Promise<T> {
    if (where) this.validationFunctions.where(where);
    const [project] = await this.getBuilder()
      .where(where)
      .delete(this.returnedColumns as readonly string[]);
    return project;
  }

  async update(where: Partial<T> = {}, args: Partial<P> = {}): Promise<T> {
    if (where) this.validationFunctions.where(where);
    this.validationFunctions.update(args);
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
      this.validationFunctions.where(where);
      query.where(where);
    }
    if (take) query.limit(take);
    if (skip) query.offset(skip);
    if (orderBy) query.orderBy(orderBy);
    return query;
  }
}
