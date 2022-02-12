import pool from '../pool';
import { Project } from '../@types/project';
import { CreateProjectArgs } from '../generated/graphql';
import { Knex } from 'knex';

const FIRST_INDEX = 0;
const EMPTY_OBJECT = {};
class ProjectRepo {
  TABLE_NAME = 'projects';
  TABLE_ALIAS = 'p';
  RETURN_COLUMNS = ['id', 'title', 'accessibility', 'createdAt', 'updatedAt'];

  getBuilder(): Knex.QueryBuilder<Project> {
    return pool.knex<Project>({ [this.TABLE_ALIAS]: this.TABLE_NAME }).column(this.RETURN_COLUMNS);
  }

  async find(): Promise<Project[]> {
    return this.getBuilder().select();
  }

  async findById(id: string): Promise<Project> {
    return this.getBuilder().select().where({ id }).first<Project>();
  }

  async create(args: CreateProjectArgs): Promise<Project> {
    const [project] = await this.getBuilder().insert(args, this.RETURN_COLUMNS);
    return project;
  }

  async update(id: string, args: Partial<CreateProjectArgs>): Promise<Project> {
    const [project] = await this.getBuilder().where({ id }).update(args, this.RETURN_COLUMNS);
    return project;
  }

  async delete(id: string): Promise<Project> {
    const [project] = await this.getBuilder().where({ id }).delete(this.RETURN_COLUMNS);
    return project;
  }

  async count(): Promise<number> {
    const data = await this.getBuilder().count('id').first();
    if (typeof data === 'string') return Number.parseInt(data);
    if (typeof data === 'number') return data;
    return 0;
  }
}

export const ProjectRepository = new ProjectRepo();
